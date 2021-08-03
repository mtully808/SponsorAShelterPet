/* eslint-disable require-jsdoc */
import React, {useEffect, useContext} from 'react';
import axios from 'axios';
import {ProductContext} from './context.js';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Carousel from 'react-material-ui-carousel';
import Divider from '@material-ui/core/Divider';
import pink from '@material-ui/core/colors/pink';
// import { createTheme } from '@material-ui/core/styles';

// const theme = createTheme({
//   palette: {
//     primary: blue[500],
//     secondary: orange[400],
//   },
// });

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
  },
  rootContainer: {
    flexGrow: 1,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));


export default function AnimalInfoCards() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState({});
  const [heartClicked, setHeartclicked] = React.useState({});
  const {allPets, updateAllPets,
    favorites, updateFavorites} = useContext(ProductContext);


  const fetchAllPets = () => {
    // const dupeObjHeartsClicked = {...heartClicked};
    axios.get(`/shelterPets`)
        .then((response) => {
          updateAllPets(response.data);
          response.data.map((pet) => (
            expanded[pet.name] = false,
            heartClicked[pet.name] = false
          ));
          updateFavorites(0);
          // console.log(Object.keys(heartClicked).length);
          // if (Object.keys(heartClicked).length === 0) {
          //   console.log('inside initial load of heart clicked object');
          //   response.data.map((pet) => (
          //     heartClicked[pet.name] = false));
          // } else {
          //   console.log('inside loop if heart clicked is already filled');
          //   console.log('dupeObjHeartsclicked', dupeObjHeartsClicked),
          //   response.data.map((pet) => (
          //     setHeartclicked({...heartClicked,
          //       [pet.name]: (dupeObjHeartsClicked[pet.name] === true)})
          //   ));
          // response.data.forEach((pet) => {
          //   if (heartClicked[pet.name] === undefined) {
          //     heartClicked[pet.name] = false;
          //   }
          // });
          // }
          // response.data.map((pet) => (

          // ))
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const handleExpandClick = (petName) => {
    const currentlyExpanded = expanded[petName];
    setExpanded({...expanded, [petName]: !currentlyExpanded});
  };

  const handleHeartClick = (petName) => {
    event.preventDefault();

    const currentlyHearted = heartClicked[petName];
    setHeartclicked({...heartClicked, [petName]: !currentlyHearted});

    if (!currentlyHearted) {
      const increaseFavoritesCount = 1 + favorites;
      updateFavorites(increaseFavoritesCount);
    } else {
      const decreaseFavoritesCount = favorites - 1;
      updateFavorites(decreaseFavoritesCount);
    }
  };

  useEffect(() => {
    fetchAllPets();
  }, []);

  return (
    <Grid container className={classes.rootContainer} spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={4}>
          {allPets.map((pet) => (
            <Grid key={pet.id} item>
              <Card className={classes.root}>
                <Carousel
                  autoPlay={false}
                >
                  {[pet.photo1ofme,
                    pet.photo2ofme,
                    pet.photo3ofme,
                    pet.photo4ofme,
                    pet.photo5ofme].map((image) => {
                    if (image !== '') {
                      return <CardMedia
                        key={image}
                        component="img"
                        height="400"
                        image={image}
                      />;
                    }
                  })}
                </Carousel>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Hi! My name is {pet.name}!
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p">
                    {pet.description}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites" onClick={() => handleHeartClick(pet.name)}>
                    <FavoriteIcon
                      style={heartClicked[pet.name] ? {color: '#f50057'} : {color: 'grey'}}/>
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded[pet.name],
                    })}
                    onClick={() => handleExpandClick(pet.name)}
                    aria-expanded={expanded[pet.name]}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
                <Collapse in={expanded[pet.name]} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography variant="subtitle1">
                      <strong>My Name:</strong> {pet.name}
                    </Typography>
                    <Divider />
                    <Typography variant="subtitle1">
                      <strong>I am this old:</strong> {pet.age}
                    </Typography>
                    <Divider variant="middle" />
                    <Typography variant="subtitle1">
                      <strong>My Energy Level:</strong>
                      <br/>
                      1 (couch potato) - 10 (endless energy!)
                      <br/>
                      {pet.energylevel}
                    </Typography>
                    <Divider />
                    <Typography variant="subtitle1">
                      <strong>Skills I Know:</strong>
                      <ul>
                        {[pet.skill1known,
                          pet.skill2known,
                          pet.skill3known].map(
                            (skillKnown) => {
                              if (skillKnown !== '') {
                                return <li key={skillKnown}>
                                  {skillKnown} </li>;
                              }
                            })}
                      </ul>
                    </Typography>
                    <Divider />
                    <Typography variant="subtitle1">
                      <strong>Skills I am Eager To Work On:</strong>
                      <ul>
                        {[pet.skill1tolearn,
                          pet.skill2tolearn,
                          pet.skill3tolearn].map(
                            (skillToWorkOn) => {
                              if (skillToWorkOn !== '') {
                                return <li key={skillToWorkOn}>
                                  {skillToWorkOn} </li>;
                              }
                            })}
                      </ul>
                    </Typography>
                    <Divider />
                    <Typography variant="subtitle1">
                      <strong>Comfortability with Cats/Dogs/Kids:</strong> <br/>
                      0 (Unknown) <br/> 1 (not a fan!) -
                      10 (love/ignore them!):
                      <ul>
                        <li> Cats: </li>
                        <ul>
                          <li> {pet.comfortwithcats} </li>
                        </ul>
                        <li> Dogs: </li>
                        <ul>
                          <li> {pet.comfortwithdogs} </li>
                        </ul>
                        <li> Kids: </li>
                        <ul>
                          <li> {pet.comfortwithkids} </li>
                        </ul>
                      </ul>
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>

  );
}
