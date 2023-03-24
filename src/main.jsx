import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
TimeAgo.addDefaultLocale(en)
import { Provider } from 'react-redux'
import store from './redux/store'
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import axios from 'axios'
axios.defaults.baseURL = import.meta.env.VITE_APP_BACKEND_URL;


let persistor = persistStore(store)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
    <BrowserRouter>
    <Routes>
      <Route  path="/*" element={<App />}/> 
    </Routes>
    </BrowserRouter>
    </PersistGate>
  </Provider>
  </React.StrictMode>
)
