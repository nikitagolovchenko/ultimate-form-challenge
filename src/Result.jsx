import React, { useState } from 'react';
import MainContainer from './components/MainContainer';
import PrimaryButton from './components/PrimaryButton';
import { useData } from './DataContext';
import { Link } from 'react-router-dom';
import { InsertDriveFile } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import Swal from 'sweetalert2';
import Confetti from 'react-confetti';

const useStyles = makeStyles({
  root: {
    marginTop: '24px',
    marginBottom: '30px',
  },
});

const Result = () => {
  const [success, setSuccess] = useState(false);
  const { data, setValues } = useData();
  const entries = Object.entries(data).filter(entry => entry[0] !== 'files');
  const { files } = data;
  const classes = useStyles();

  const onSubmit = async () => {
    const formData = new FormData();

    if (data.files) {
      data.files.forEach(file => {
        formData.append('files', file, file.name);
      });
    }

    entries.forEach(entry => {
      formData.append(entry[0], entry[1]);
    });

    const res = await fetch('http://localhost:4000/', {
      method: 'POST',
      body: formData,
    });

    if (res.status === 200) {
      Swal.fire('Great job!', "You've passed the challenge", 'success');
      setSuccess(true);
    }
  };

  if (success) {
    return <Confetti />;
  }

  return (
    <MainContainer>
      <Typography component='h2' variant='h5'>
        📋 Form Values
      </Typography>

      <TableContainer className={classes.root} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Field</TableCell>
              <TableCell align='right'>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map(entry => (
              <TableRow key={entry[0]}>
                <TableCell>{entry[0]}</TableCell>
                <TableCell align='right'>{entry[1].toString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {files && (
        <>
          <Typography component='h2' variant='h5'>
            📦 Files
          </Typography>
          <List>
            {files.map((f, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <InsertDriveFile />
                </ListItemIcon>
                <ListItemText primary={f.name} secondary={f.size} />
              </ListItem>
            ))}
          </List>
        </>
      )}

      <PrimaryButton onClick={onSubmit}>Submit</PrimaryButton>
      <PrimaryButton color='secondary' component={Link} to='/'>
        Start over
      </PrimaryButton>
    </MainContainer>
  );
};

export default Result;
