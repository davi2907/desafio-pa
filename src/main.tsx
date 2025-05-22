import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import Home from './pages/Home';
import Script1 from './pages/Script1';
import Script2 from './pages/Script2';
import Script3 from './pages/Script3';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/script1" element={<Script1 />} />
        <Route path="/script2" element={<Script2 />} />
        <Route path="/script3" element={<Script3 />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
