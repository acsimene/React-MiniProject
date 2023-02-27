import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddUser from './component/addEmployee';
import "bulma/css/bulma.css";
import EditUser from './component/editEmployee';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    
    <Provider store={store}>  
    <BrowserRouter>
    <div className="container">
    <h1 className="title is-1 has-text-centered " >Employee Database</h1>
    </div>
      <div className="container">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="add" element={<AddUser />} />
          <Route path="edit/:id" element={<EditUser />} />
        </Routes>
      </div>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
