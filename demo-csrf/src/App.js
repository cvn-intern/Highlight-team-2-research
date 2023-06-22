import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Login from './Login';
import Spinner from 'react-bootstrap/Spinner';
import Home from './Home'

import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [doneFirstLoad, setDoneFirstLoad] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  ///////////////////-----------CSRF PREVENTION---------------////////////////////////////////
  // const refreshUser = useCallback(() => {
  //   return fetch('/user')
  //     .then(response => response.json())
  //     .then(user => {
  //       setLoading(false);
  //       if(user){
  //         setUser(user.user);
  //         localStorage.setItem('token', user.token);
  //       }
        
  //       if (!user) {
  //         navigate('/login');
  //       }
  //     });
  // }, [navigate, setUser, setLoading]);
  ///////////////////-------------------END------------------////////////////////////////////

  


   ///////////////////-----------CSRF---------------////////////////////////////////
  const refreshUser = useCallback(() => {
    return fetch('/user')
      .then(response => response.json())
      .then(user => {
        setLoading(false);
        setUser(user);

        if (!user) {
          navigate('/login');
        }
      });
  }, [navigate, setUser, setLoading]);
  ///////////////////-------------------END------------------////////////////////////////////


  // useEffect(() => {
  //   const intervalID = setInterval(refreshUser, 5000);

  //   return () => {
  //     clearInterval(intervalID);
  //   };
  // }, [refreshUser]);

  useEffect(() => {
    if (!doneFirstLoad || location.pathname === '/') {
      refreshUser();
      setDoneFirstLoad(true);
    }
  }, [location.pathname, refreshUser]);

  return (
    <div className="App">
      <div className="header">
        <h1>Highlight Bank</h1>
      </div>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <Routes>
          <Route path="/login" element={<Login user={user}/>}/>
          <Route path="/" element={<Home user={user} setUser={setUser}/>}/>
        </Routes>
      )}
    </div>
  );
}

export default App;
