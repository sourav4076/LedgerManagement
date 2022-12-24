import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import AccountDetailsPage from './pages/AccountDetailsPage';
import CreateAccountPage from './pages/CreateAccountPage';
import MyNavBar from './MyNavBar';



const root = ReactDOM.createRoot(document.getElementById('root'));
const AlertContext = React.createContext({
  type:'',
  message:''
});
root.render(
  <React.StrictMode>
  <BrowserRouter>
    <MyNavBar/>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/account/add" element={<CreateAccountPage />} />
      <Route path="/account/details" element={<AccountDetailsPage />} />
    </Routes>
  </BrowserRouter>
   
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
