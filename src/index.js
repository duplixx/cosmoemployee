import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {NextUIProvider} from "@nextui-org/react";
import Navbar from './components/navbar';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <NextUIProvider> 
    <Navbar/>
    <main className="text-foreground bg-background">
      <Routes/>
    </main>
    </NextUIProvider>
    </BrowserRouter>
  </React.StrictMode>
);



