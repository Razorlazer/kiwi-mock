import React from 'react';
import LandingPage from './pages/LandingPage';

import './App.css';

function App() {
  React.useEffect(() => {
    document.title = process.env.REACT_APP_NAME;
  });

  return (<>
      <LandingPage />
  </>);
}

export default App;
