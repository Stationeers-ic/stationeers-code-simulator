import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';
import {PrimeReactProvider} from "primereact/api";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <PrimeReactProvider>
            <App/>
        </PrimeReactProvider>
    </React.StrictMode>,
)
