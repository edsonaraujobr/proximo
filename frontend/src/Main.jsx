import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter} from 'react-router-dom';
import MainRoutes from './routes.jsx';
import { ClerkProvider } from './contexts/ClerkContext.jsx'; 
import { AdministratorProvider } from './contexts/AdministratorContext.jsx'; 
import { StudentProvider } from './contexts/StudentContext.jsx';
import { ServiceProvider } from './contexts/ServiceContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ServiceProvider>
      <ClerkProvider>
        <AdministratorProvider>
          <StudentProvider>
            <MainRoutes/>
          </StudentProvider>
        </AdministratorProvider>
      </ClerkProvider>
    </ServiceProvider>
  </BrowserRouter>
)
