const PHOTON_API_URL = 'https://photon.komoot.io/api/';

export const PhotonProvider = {
  name: 'photon',
  
  async search(query) {
    if (!query || query.trim().length < 3) {
      return [];
    }

    try {
      const response = await fetch(
        `${PHOTON_API_URL}?q=${encodeURIComponent(query)}&limit=5`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch address suggestions');
      }

      const data = await response.json();
      return this.mapResults(data.features);
    } catch (error) {
      console.error('Photon address search error:', error);
      return [];
    }
  },

  mapResults(features) {
    return features.map((feature) => {
      const props = feature.properties;
      
      const city = props.city || props.town || props.village || props.municipality || '';
      const area = props.suburb || props.neighbourhood || props.district || props.locality || '';
      const zipcode = props.postcode || '';
      const street = props.street || '';
      const houseNumber = props.housenumber || '';
      const name = props.name || '';
      const state = props.state || '';
      const country = props.country || '';

      let label = '';
      if (name && name !== street) {
        label = name;
      } else if (street) {
        label = houseNumber ? `${houseNumber} ${street}` : street;
      } else if (city) {
        label = city;
      }

      if (area && !label.includes(area)) {
        label += label ? `, ${area}` : area;
      }
      if (city && !label.includes(city)) {
        label += label ? `, ${city}` : city;
      }
      if (state && !label.includes(state)) {
        label += label ? `, ${state}` : state;
      }

      return {
        id: props.osm_id || Math.random().toString(36).substr(2, 9),
        label: label || 'Unknown location',
        location: name || street || (houseNumber ? `${houseNumber} ${street}` : '') || area || city,
        city,
        area,
        zipcode,
        state,
        country,
        coordinates: feature.geometry?.coordinates || null
      };
    });
  }
};

export default PhotonProvider;
