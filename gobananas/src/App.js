import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Typography } from '@material-ui/core';
import SearchBar from './SearchBar';
import UserTable from './UserTable';

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) => {
    return user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           user.email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">User List</Typography>
      </Grid>
      <Grid item xs={12}>
        <SearchBar value={searchTerm} onChange={handleSearch} />
      </Grid>
      <Grid item xs={12}>
        <UserTable users={filteredUsers} />
      </Grid>
    </Grid>
  );
}

export default App;