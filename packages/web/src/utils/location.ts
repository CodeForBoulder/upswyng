export const getUserCoordinates = async () => {
  const pos = (await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  })) as Position;

  return {
    longitude: pos.coords.longitude,
    latitude: pos.coords.latitude,
  };
};
