import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import userService from '../../services/userService';
import { Container, Typography, Avatar, Box, CircularProgress } from '@mui/material';

const UserDetail = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userService.getUser(id);
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch user');
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          User Detail
        </Typography>
        <Avatar
          alt={user.name}
          src={`http://localhost:5000/${user.profilePicture}`}
          sx={{ width: 100, height: 100, margin: '0 auto' }}
        />
        <Typography variant="h6">{user.name}</Typography>
        <Typography>Email: {user.email}</Typography>
        <Typography>Age: {user.age}</Typography>
        <Typography>Role: {user.role}</Typography>
      </Box>
    </Container>
  );
};

export default UserDetail;
