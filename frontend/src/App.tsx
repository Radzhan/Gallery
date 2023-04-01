import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import Login from './features/user/Login';
import Register from './features/user/Register';
import Navbar from './features/Navbar/Navbar';
import Main from './contaiers/Main/Main';
import AuthorPage from './contaiers/AuthorPage/AuthorPage';

const App = () => {

  return (
    <div className="App">

      <Navbar/>
      <Routes>

        <Route path="/" element={
          <Main/>
        }/>
        <Route path="/:author/:id" element={<AuthorPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="*" element={<h2>Not Found !</h2>}/>
      </Routes>
    </div>
  );
}

export default App;

