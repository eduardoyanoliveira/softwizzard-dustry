import React, { createContext } from 'react';
import usePersistedState from '../../Utils/usePersistedState';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import darkTheme from '../themes/dark';
import lightTheme from '../themes/light';

export const ThemeContext =  createContext({
  isDarkTheme: false,
  toggleTheme: () => {},
});

function ThemeProvider({children}) {

  const [dark, setDark] = usePersistedState('is_dark', true);

  const toggleTheme = () => {
    setDark(!dark);
  };
  
  return (
    <ThemeContext.Provider
        value={{
        isDarkTheme: dark,
        toggleTheme,
        }}
    >
    <StyledThemeProvider theme={dark ? darkTheme : lightTheme}>
      {children}
    </StyledThemeProvider>
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;