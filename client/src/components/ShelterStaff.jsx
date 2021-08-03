/* eslint-disable require-jsdoc */
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AddShelterPetForm from './AddShelterPet.jsx';
import ListOfPets from './ListOfPets.jsx';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function ShelterStaffPage() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center">
          <AddShelterPetForm/>
        </Grid>
        <br/>
        <Grid container justifyContent="center">
          <h2>Quick Overview of Pets in the System</h2>
          <ListOfPets/>
        </Grid>
      </Grid>
    </Grid>
  );
}
