import React from 'react';
import ReactDOM from 'react-dom/client';
import { PhoneBook } from 'components/App';
import { GlobalStyle } from './components/Style/Global';
import { ThemeProvider } from 'styled-components';
import { theme } from './components/Theme';
import 'modern-normalize';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <PhoneBook />
    </ThemeProvider>
  </React.StrictMode>
);
