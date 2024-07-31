import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
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


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
