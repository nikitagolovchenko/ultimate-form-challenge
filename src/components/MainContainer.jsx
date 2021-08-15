import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const MainContainer = ({ children, ...props }) => {
  const classes = useStyles();

  return (
    <Container
      className={classes.root}
      container='main'
      maxWidth='xs'
      {...props}
    >
      {children}
    </Container>
  );
};

export default MainContainer;
