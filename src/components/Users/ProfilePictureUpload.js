import React, { useState } from 'react';
import userService from '../../services/userService';
import { Container, Typography, Button, Box, Alert } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const ProfilePictureUpload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { auth } = useAuth();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('profilePicture', file);

    try {
      await userService.uploadProfilePicture(formData, auth.token);
      setSuccess('Profile picture uploaded successfully');
      setError('');
    } catch (err) {
      setError('Failed to upload profile picture');
      setSuccess('');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Upload Profile Picture
        </Typography>
        <form onSubmit={handleUpload}>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }}
            id="upload-button"
          />
          <label htmlFor="upload-button">
            <Button variant="contained" component="span">
              Choose File
            </Button>
          </label>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Upload
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ProfilePictureUpload;
