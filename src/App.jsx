import React from 'react';
import { ThemeProvider } from 'styled-components';

import Pokedex from 'components/Pokedex';
import theme from 'styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Pokedex />
    </ThemeProvider>
  );
};

export default App;
