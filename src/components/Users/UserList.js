import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../../services/userService';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Typography, CircularProgress
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../context/AuthContext';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await userService.getUsers();
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users');
        toast.error('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (id) => {
    navigate(`/users/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await userService.deleteUser(id);
      setUsers(users.filter(user => user._id !== id));
      toast.success('User deleted successfully');
    } catch (err) {
      setError('Failed to delete user');
      toast.error('Failed to delete user');
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        User List
      </Typography>
      {loading && <CircularProgress />} {/* loading indicator */}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.age}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(user._id)}>Edit</Button>
                    <Button onClick={() => handleDelete(user._id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <ToastContainer />
    </div>
  );
};

export default UserList;
