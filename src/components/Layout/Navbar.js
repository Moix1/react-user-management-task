import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate(); // Initialize navigate

  const handleLogout = () => {
    logout(); // Logout the user
    navigate('/login'); // Redirect to the login page
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          User Management App
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        {auth && (
          <Button color="inherit" component={Link} to="/users">
            Users
          </Button>
        )}
        <Button color="inherit" component={Link} to="/profile-picture">
          Profile Picture
        </Button>
        {!auth && (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </>
        )}
        {auth && (
          <Button color="inherit" onClick={handleLogout}> {/* Update onClick to handleLogout */}
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
