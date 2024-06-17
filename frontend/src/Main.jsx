import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter} from 'react-router-dom';
import MainRoutes from './routes.jsx';
import { AtendenteProvider } from './contexts/AtendenteContext.jsx'; 
import { AdministradorProvider } from './contexts/AdministradorContext.jsx'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AtendenteProvider>
      <AdministradorProvider>
        <MainRoutes/>
      </AdministradorProvider>
    </AtendenteProvider>
  </BrowserRouter>
)
