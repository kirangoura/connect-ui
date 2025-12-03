const PHOTON_API_URL = 'https://photon.komoot.io/api/';

let debounceTimer = null;

export const searchAddresses = (query) => {
  return new Promise((resolve, reject) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    if (!query || query.trim().length < 3) {
      resolve([]);
      return;
    }

    debounceTimer = setTimeout(async () => {
      try {
        const response = await fetch(
          `${PHOTON_API_URL}?q=${encodeURIComponent(query)}&limit=5`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch address suggestions');
        }

        const data = await response.json();

        const suggestions = data.features.map((feature) => {
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
            id: feature.properties.osm_id || Math.random().toString(36).substr(2, 9),
            label: label || 'Unknown location',
            fullAddress: label,
            location: name || street || (houseNumber ? `${houseNumber} ${street}` : '') || area || city,
            city: city,
            area: area,
            zipcode: zipcode,
            state: state,
            country: country,
            coordinates: feature.geometry?.coordinates || null
          };
        });

        resolve(suggestions);
      } catch (error) {
        console.error('Address search error:', error);
        resolve([]);
      }
    }, 300);
  });
};

export const cancelSearch = () => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
    debounceTimer = null;
  }
};
