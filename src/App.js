import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import UserList from './components/Users/UserList';
import UserForm from './components/Users/UserForm';
import ProfilePictureUpload from './components/Users/ProfilePictureUpload';
import Home from './components/Home';
import TestJwtDecode from './components/TestJwtDecode'; 
import { AuthProvider } from './context/AuthContext'; 

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/add" element={<UserForm />} />
            <Route path="/users/edit/:id" element={<UserForm />} />
            <Route path="/profile-picture" element={<ProfilePictureUpload />} />
            <Route path="/" element={<Home />} />
            <Route path="/test-jwt-decode" element={<TestJwtDecode />} /> 
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
