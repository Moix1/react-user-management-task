import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import userService from '../../services/userService';
import { Container, TextField, Button, Typography, Box, Alert, MenuItem } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const UserForm = () => {
  const [user, setUser] = useState({ name: '', email: '', age: '', role: 'user' });
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const response = await userService.getUser(id);
          setUser(response.data);
        } catch (err) {
          setError('Failed to fetch user');
        }
      };

      fetchUser();
    }
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await userService.updateUser(id, user);
      } else {
        await userService.createUser(user);
      }
      navigate('/users');
    } catch (err) {
      setError('Failed to save user');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {id ? 'Edit User' : 'Add User'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Age"
            type="number"
            name="age"
            value={user.age}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          {auth?.role === 'admin' && (
            <TextField
              label="Role"
              select
              name="role"
              value={user.role}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </TextField>
          )}
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Save
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default UserForm;
