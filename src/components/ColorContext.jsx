import React, { useEffect, useState } from 'react';

export const ColorContext = React.createContext({});

export const ColorProvider = (props) => {
  const [colors, setColors] = useState();

  useEffect(() => {
    fetch('/dmc.json')
      .then((data) => data.json())
      .then(setColors);
  }, []);

  if (!colors) return null;

  return <ColorContext.Provider value={colors} {...props} />;
};
