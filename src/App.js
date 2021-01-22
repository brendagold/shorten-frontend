import React from 'react';
import './App.css';
import HeadNav from './components/Navbar';

import Routes from './routes';

function App() {
  return (
    <div className="App">
      <HeadNav />
      <Routes />
    </div>
  );
}

export default App;
