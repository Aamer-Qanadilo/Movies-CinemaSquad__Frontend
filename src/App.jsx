import logo from './logo.svg';
import './App.css';
import { Route, Routes , Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import ScrollToTop from "react-scroll-to-top";

import { APIContextProvider } from './Components/APIContext/APIContext';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import Movies from './Components/Movies/Movies';
import NotFound from './Components/NotFound/NotFound';
import Networks from './Components/Networks/Networks';
import TvShows from './Components/TvShows/TvShows';
import People from './Components/People/People';
import WatchInfo from './Components/Details/WatchInfo';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Logout from './Components/logout/Logout';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loadingForm, setLoadingForm] = useState(false);

  useEffect(()=>{
    let token = localStorage.getItem('token');
    if(token && (token.length > 0)){
      setIsLoggedIn(true);
      // In normal cases, the token would need to be decoded using jwt-decode first
      setUser(token);
    }
  }, []);

  return (
    <React.Fragment>
      <ScrollToTop style={{borderRadius: '50%'}} />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="container-fluid">
        <Navbar isLoggedIn={isLoggedIn} />
      </div>
      <div className="container">
        <APIContextProvider>
          <Routes >
          
              {isLoggedIn ?
                  <>
                    <Route path='/home' element={<Home />}></Route>
                    <Route path='/about' element={<About />}></Route>
                    <Route path='/movies' element={<Movies />}></Route>
                    <Route path='/watch' element={<WatchInfo />}></Route>
                    <Route path='/networks' element={<Networks />}></Route>
                    <Route path='/tvshows' element={<TvShows />}></Route>
                    <Route path='/people' element={<People />}></Route>
                    <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn}/>}></Route>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='*' element={<NotFound />}></Route>
                  </>:
                    <>
                      <Route path='/register' element={<Register loadingForm={loadingForm} setLoadingForm={setLoadingForm}/>}></Route>
                      <Route path='/login' element={<Login loadingForm={loadingForm} setLoadingForm={setLoadingForm} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}></Route>
                      <Route path='*' element={<Navigate to={'/login'}></Navigate>}></Route>
                    </>
              }
          </Routes>
        </APIContextProvider>
      </div>
    </React.Fragment>
  );
}

export default App;
