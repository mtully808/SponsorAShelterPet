/* eslint-disable require-jsdoc */
import React, {useContext, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {ProductContext} from './context.js';

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
            primary={pet.name}
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
