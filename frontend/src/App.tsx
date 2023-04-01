import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import Login from './features/user/Login';
import Register from './features/user/Register';
import {useAppSelector} from './app/hooks';
import {selectUser} from './features/user/userSlice';
import Navbar from './features/Navbar/Navbar';
import Main from './contaiers/Main/Main';

const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <div className="App">

      <Navbar/>
      <Routes>

        <Route path="/" element={
          <Main/>
        }/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="*" element={<h2>Not Found !</h2>}/>
      </Routes>
    </div>
  );
}

export default App;

