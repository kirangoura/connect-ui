import addressProvider from './addressProviders';

let debounceTimer = null;

export const searchAddresses = (query) => {
  return new Promise((resolve) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    if (!query || query.trim().length < 3) {
      resolve([]);
      return;
    }

    debounceTimer = setTimeout(async () => {
      try {
        const suggestions = await addressProvider.search(query);
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

export const getPlaceDetails = async (placeId) => {
  if (addressProvider.getPlaceDetails) {
    return addressProvider.getPlaceDetails(placeId);
  }
  return null;
};

export const getCurrentProviderName = () => {
  return addressProvider.name;
};

export { addressProvider };
