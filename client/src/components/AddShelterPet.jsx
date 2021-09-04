/* eslint-disable require-jsdoc */
import React, {useContext} from 'react';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {ProductContext} from './context.js';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();

  return {
    top: `${top}%`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  div: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    padding: '4px',
  },
  rootCard: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

export default function AddShelterPetForm() {
  const {newPet, updateNewPet,
    updateAllPets} = useContext(ProductContext);

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  function changeHandler(event) {
    updateNewPet({...newPet, [event.target.name]: event.target.value});
  };

  const fetchAllPets = () => {
    console.log('inside fetch all pets after form submit');
    axios.get(`/shelterPets`)
        .then((response) => {
          updateAllPets(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  function handleAddPetSubmit(event) {
    // handleChange(event, 1);
    event.preventDefault();
    axios.post('/shelterPets', newPet)
        .then((response) => {
          console.log('response from adding new pet!', response);
          alert('You\'ve successfully added a new pet! :) Thank You!');
        });
    updateNewPet({
      'name': '',
      'shortDescription': '',
      'age': '',
      'breed': '',
      'energyLevel': 0,
      '1skillKnown': '',
      '2skillKnown': '',
      '3skillKnown': '',
      '1skillToLearn': '',
      '2skillToLearn': '',
      '3skillToLearn': '',
      '1photoOfMe': '',
      '2photoOfMe': '',
      '3photoOfMe': '',
      '4photoOfMe': '',
      '5photoOfMe': '',
      'comfortWithCats': 0,
      'comfortWithDogs': 0,
      'comfortWithKids': 0,
    });
    fetchAllPets();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Card className={classes.rootCard} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2" textAlign="center">
            Adding a New Shelter Animal?
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Click the button below to fill out the New Pet form
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="large" onClick={handleOpen}
            style={{backgroundColor: '#fca311'}}>Add Pet Here!</Button>
        </CardActions>
      </Card>
      <Modal
        style={{display: 'flex', alignItems: 'center',
          justifyContent: 'center'}}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <form className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleAddPetSubmit}
          style={modalStyle}>
          <Paper variant="outlined"
            style={{display: 'flex', alignItems: 'center',
              justifyContent: 'center'}}
            elevation={3}>
            <div style={modalStyle}>
              <h2>Adding a New Shelter Animal?</h2>
              <TextField
                required
                id="animalName"
                name="name"
                label="Animal's Name"
                variant="outlined"
                value={newPet.name}
                onChange={changeHandler}
              />
              <TextField
                required
                id="animalAge"
                name="age"
                label="Animal's Age"
                variant="outlined"
                value={newPet.age}
                onChange={changeHandler}
              />
              <TextField
                required
                id="animalBreed"
                name="breed"
                label="Animal's Breed"
                variant="outlined"
                value={newPet.breed}
                onChange={changeHandler}
              />
              <h5>3 Skills I know:</h5>
              <TextField
                id="1skillKnown"
                name="1skillKnown"
                label="Skill I Know"
                variant="outlined"
                value={newPet['1skillKnown']}
                onChange={changeHandler}
              />
              <TextField
                id="2skillKnown"
                name="2skillKnown"
                label="Skill I Know"
                variant="outlined"
                value={newPet['2skillKnown']}
                onChange={changeHandler}
              />
              <TextField
                id="3skillKnown"
                name="3skillKnown"
                label="Skill I Know"
                variant="outlined"
                value={newPet['3skillKnown']}
                onChange={changeHandler}
              />
              <h5>3 Skills I am Eager to Learn:</h5>
              <TextField
                id="1skillToLearn"
                name="1skillToLearn"
                label="Skill To Learn"
                variant="outlined"
                value={newPet['1skillToLearn']}
                onChange={changeHandler}
              />
              <TextField
                id="2skillToLearn"
                name="2skillToLearn"
                label="Skill To Learn"
                variant="outlined"
                value={newPet['2skillToLearn']}
                onChange={changeHandler}
              />
              <TextField
                id="3skillToLearn"
                name="3skillToLearn"
                label="Skill To Learn"
                variant="outlined"
                value={newPet['3skillToLearn']}
                onChange={changeHandler}
              />
              <h5>5 Photos of Me Looking Adorable:</h5>
              <TextField
                id="1photoOfMe"
                name="1photoOfMe"
                label="Link to an Adorable Photo of Me!"
                variant="outlined"
                value={newPet['1photoOfMe']}
                onChange={changeHandler}
              />
              <TextField
                id="2photoOfMe"
                name="2photoOfMe"
                label="Link to an Adorable Photo of Me!"
                variant="outlined"
                value={newPet['2photoOfMe']}
                onChange={changeHandler}
              />
              <TextField
                id="3photoOfMe"
                name="3photoOfMe"
                label="Link to an Adorable Photo of Me!"
                variant="outlined"
                value={newPet['3photoOfMe']}
                onChange={changeHandler}
              />
              <TextField
                id="4photoOfMe"
                name="4photoOfMe"
                label="Link to an Adorable Photo of Me!"
                variant="outlined"
                value={newPet['4photoOfMe']}
                onChange={changeHandler}
              />
              <TextField
                id="5photoOfMe"
                name="5photoOfMe"
                label="Link to an Adorable Photo of Me!"
                variant="outlined"
                value={newPet['5photoOfMe']}
                onChange={changeHandler}
              />
              <br/>
              <TextField
                id="energyLevel"
                name="energyLevel"
                label="Energy Level (Scale 1 - 10)"
                type="number"
                InputProps={{
                  inputProps: {min: 1, max: 10},
                }}
                helperText=
                  "Scale 1 - 10,
                  1 being 'love the couch potato life' to
                  10 being 'I need rigorous daily exercise'"
                variant="outlined"
                value={newPet.energyLevel}
                onChange={changeHandler}
              />
              <TextField
                id="catFriendliness"
                name="comfortWithCats"
                label="My Friendliness with Cats"
                type="number"
                InputProps={{
                  inputProps: {min: 1, max: 10},
                }}
                helperText=
                  "Scale 1 - 10,
                  1 being 'should not live with cats' to
                  10 being 'cats don't phase me'"
                variant="outlined"
                value={newPet.comfortWithCats}
                onChange={changeHandler}
              />
              <TextField
                id="dogFriendliness"
                label="My Friendliness with Dogs"
                name="comfortWithDogs"
                type="number"
                InputProps={{
                  inputProps: {min: 1, max: 10},
                }}
                helperText=
                  "Scale 1 - 10,
                  1 being 'should not live with dogs' to
                  10 being 'dogs don't phase me'"
                variant="outlined"
                value={newPet.comfortWithDogs}
                onChange={changeHandler}
              />
              <TextField
                id="kidFriendliness"
                label="My Friendliness with kids"
                name="comfortWithKids"
                type="number"
                InputProps={{
                  inputProps: {min: 1, max: 10},
                }}
                helperText=
                  "Scale 1 - 10,
                  1 being 'should not live with kids' to
                  10 being 'kids don't phase me'"
                variant="outlined"
                value={newPet.comfortWithKids}
                onChange={changeHandler}
              />
              <TextField
                required
                id="shortDescription"
                label="My Elevator Pitch"
                name="shortDescription"
                multiline
                rows={6}
                helperText="Sum up my personality in 1-2 sentences"
                variant="outlined"
                value={newPet.shortDescription}
                onChange={changeHandler}
              />
              <br/>
              <Button variant="contained" color="primary" type="submit">
                Submit!
              </Button>
            </div>
          </Paper>
        </form>
      </Modal>
    </div>
  );
}
