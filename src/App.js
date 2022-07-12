import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from "@material-ui/styles";

import LandingPage from './pages/LandingPage';
import mainTheme from './utilities/theme/mainTheme';

import './App.css';

function App() {
  React.useEffect(() => {
    document.title = process.env.REACT_APP_NAME;
  });

  return (<>
    <ThemeProvider theme={mainTheme}>
      <CssBaseline/>
      <LandingPage />
    </ThemeProvider>
  </>);
}

export default App;
