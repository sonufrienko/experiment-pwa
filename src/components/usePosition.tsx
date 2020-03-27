import { useState, useEffect } from 'react';
import { ICoordinate } from '../contexts/LocationContext';

const usePosition = () => {
  const [position, setPosition] = useState<ICoordinate | null>(null);
  const [error, setError] = useState<string>('');

  const onChange = ({ coords }: Position) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude
    });
  };

  const onError = (error: PositionError) => {
    setError(error.message);
  };

  useEffect(() => {
    const { geolocation } = navigator;
    if (!geolocation) {
      setError('Geolocation is not supported');
      return;
    }
    const watcher = geolocation.watchPosition(onChange, onError);
    return () => geolocation.clearWatch(watcher);
  }, []);

  return { position, error };
};

export default usePosition;
