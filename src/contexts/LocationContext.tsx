import React, { useState, createContext } from 'react';

export interface ICoordinate {
  latitude: number;
  longitude: number;
}

const defaultValue: ICoordinate[] = [];

export const LocationContext = createContext<{
  coordinates: ICoordinate[];
  updateCoordinates: (coordinates: ICoordinate[]) => void;
  pushCoordinate: (coordinated: ICoordinate) => void;
}>({
  coordinates: defaultValue,
  updateCoordinates: () => {},
  pushCoordinate: () => {}
});

export const LocationProvider = ({ children }: { children: React.ReactNode }) => {
  const [coordinates, updateCoordinates] = useState([...defaultValue]);

  const pushCoordinate = (coordinate: ICoordinate) => {
    const newCoordinates = [...coordinates, coordinate];
    updateCoordinates(newCoordinates);
  }

  return <LocationContext.Provider value={{ coordinates, updateCoordinates, pushCoordinate }}>{children}</LocationContext.Provider>;
};
