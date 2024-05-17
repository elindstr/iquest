import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';

function App() {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
}

export default App;
