import { createContext } from 'react';
import type { ColorMap } from '~/types';
import { useFetch } from '../hooks/useFetch';

export const ColorContext = createContext({});

export type ColorProviderProps = {
  children: React.ReactNode;
};

export const ColorProvider = (props: ColorProviderProps) => {
  const { data: colors } = useFetch<ColorMap>('/dmc.json');

  if (!colors) return null;

  return <ColorContext.Provider value={colors} {...props} />;
};
