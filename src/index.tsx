import React from 'react';
import ReactDOM from 'react-dom/client';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import {MJ} from './MJ';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<MJ />} />
      </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
