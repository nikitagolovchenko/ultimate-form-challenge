import React from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3, 0, 2)
  }
}))

const PrimaryButton = ({children, props}) => {
  const classes = useStyles();

  return (
    <Button className={classes.root} type='submit' variant="contained" fullWidth color="primary" {...props}>
      {children}
    </Button>
  );
};

export default PrimaryButton;
