export const GooglePlacesProvider = {
  name: 'google',
  apiKey: null,

  init(apiKey) {
    this.apiKey = apiKey;
  },
  
  async search(query) {
    if (!query || query.trim().length < 3) {
      return [];
    }

    if (!this.apiKey) {
      console.error('Google Places API key not configured');
      return [];
    }

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&key=${this.apiKey}&types=address`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch address suggestions from Google');
      }

      const data = await response.json();
      
      if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
        console.error('Google Places API error:', data.status);
        return [];
      }

      return this.mapResults(data.predictions || []);
    } catch (error) {
      console.error('Google Places search error:', error);
      return [];
    }
  },

  mapResults(predictions) {
    return predictions.map((prediction) => {
      const terms = prediction.terms || [];
      
      const city = terms.length > 1 ? terms[terms.length - 3]?.value || '' : '';
      const state = terms.length > 2 ? terms[terms.length - 2]?.value || '' : '';
      const country = terms.length > 0 ? terms[terms.length - 1]?.value || '' : '';
      
      return {
        id: prediction.place_id,
        label: prediction.description,
        location: prediction.structured_formatting?.main_text || prediction.description,
        city,
        area: '',
        zipcode: '',
        state,
        country,
        coordinates: null,
        placeId: prediction.place_id
      };
    });
  },

  async getPlaceDetails(placeId) {
    if (!this.apiKey || !placeId) {
      return null;
    }

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=address_components,geometry&key=${this.apiKey}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch place details');
      }

      const data = await response.json();
      
      if (data.status !== 'OK') {
        return null;
      }

      const components = data.result?.address_components || [];
      const geometry = data.result?.geometry;

      const getComponent = (type) => {
        const comp = components.find(c => c.types.includes(type));
        return comp?.long_name || '';
      };

      return {
        city: getComponent('locality') || getComponent('administrative_area_level_2'),
        area: getComponent('neighborhood') || getComponent('sublocality'),
        zipcode: getComponent('postal_code'),
        state: getComponent('administrative_area_level_1'),
        country: getComponent('country'),
        coordinates: geometry?.location ? [geometry.location.lng, geometry.location.lat] : null
      };
    } catch (error) {
      console.error('Google Places details error:', error);
      return null;
    }
  }
};

export default GooglePlacesProvider;
