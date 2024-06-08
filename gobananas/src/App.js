import React, { useState, useEffect } from 'react';
import { Container, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, AppBar, Toolbar, Typography, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function App() {
  const [dogs, setDogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const dogPromises = Array.from({ length: 50 }, () =>
          fetch('https://dog.ceo/api/breeds/image/random').then(response => response.json())
        );
        const dogResponses = await Promise.all(dogPromises);
        setDogs(dogResponses.map((response, index) => ({ id: index, url: response.message })));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchDogs();
  }, []);

  const filteredDogs = dogs.filter(dog => 
    dog.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            GoBananas Dog Gallery
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <TextField
          label="Search by URL"
          variant="outlined"
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Image URL</TableCell>
                <TableCell>Thumbnail</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDogs.map(dog => (
                <TableRow key={dog.id}>
                  <TableCell>{dog.id}</TableCell>
                  <TableCell>{dog.url}</TableCell>
                  <TableCell>
                    <img src={dog.url} alt={`dog-${dog.id}`} style={{ width: '50px', height: '50px' }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default App;
