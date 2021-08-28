/* eslint-disable require-jsdoc */
import React, {useContext, useEffect} from 'react';
import DeleteButton from './DeleteButton.jsx';
import {makeStyles} from '@material-ui/core/styles';
import {List, ListItem, ListItemText, ListItemAvatar, Grid, Divider,
  Avatar, Typography, Button, ButtonGroup} from '@material-ui/core';
import {ProductContext} from './context.js';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function ListOfPets() {
  const classes = useStyles();
  const {allPets} = useContext(ProductContext);

  useEffect(() => {}, [allPets]);



  return (
    <List className={classes.root}>
      {allPets.map((pet) => (
        <ListItem key={pet.id} alignItems="flex-start">
          <ListItemAvatar>
            <Avatar src={pet.photo1ofme} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Grid
                container
                direction="row-reverse"
                justifyContent="space-between"
                alignItems="center"
              >
                <ButtonGroup
                  variant="text" color="disabled" size="small"
                  aria-label="text primary button group" >
                  {/* <Button onClick={handleAnimalDeletion()}>
                    <DeleteOutlineOutlinedIcon
                      fontSize="small" color="disabled"/>
                  </Button> */}
                  <DeleteButton />
                  <Button>
                    <EditOutlinedIcon
                      fontSize="small" color="disabled"/>
                  </Button>
                </ButtonGroup>
                <Typography>
                  {pet.name}
                </Typography>
              </Grid>
            }
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {pet.age}, {pet.breed}
                  <br/>
                </Typography>
                {pet.description}
              </React.Fragment>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}
