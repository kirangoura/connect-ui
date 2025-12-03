import PhotonProvider from './photonProvider';
import GooglePlacesProvider from './googlePlacesProvider';

const PROVIDER_PHOTON = 'photon';
const PROVIDER_GOOGLE = 'google';

const getProviderName = () => {
  return import.meta.env.VITE_ADDRESS_PROVIDER || PROVIDER_PHOTON;
};

const getProvider = () => {
  const providerName = getProviderName();
  
  switch (providerName) {
    case PROVIDER_GOOGLE:
      const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
      if (!apiKey) {
        console.warn('Google Places API key not found, falling back to Photon');
        return PhotonProvider;
      }
      GooglePlacesProvider.init(apiKey);
      return GooglePlacesProvider;
    
    case PROVIDER_PHOTON:
    default:
      return PhotonProvider;
  }
};

export const addressProvider = getProvider();

export { PhotonProvider, GooglePlacesProvider };
export default addressProvider;
