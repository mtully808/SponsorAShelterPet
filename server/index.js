const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const db = require('../database/index.js');
// const addNewPet = require('../database/controllers/addNewPet.js');
const updatePetInfo = require('../database/models/petInfo.js');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/shelterPets', (req, res) => {
  updatePetInfo.getAllPets(
      function(err, results) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(201).send(results);
        }
      });
});

app.get('/shelterPets/:name', (req, res) => {
  const petName = req.params.name;

  updatePetInfo.getOnePet(petName,
      function(err, results) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(201).send(results);
        }
      });
});

app.post('/shelterPets', (req, res) => {
  const petName = req.body.name;
  const shortDescription = req.body.shortDescription;
  const petAge = req.body.age;
  const petBreed = req.body.breed;
  const energyLevel = req.body.energyLevel;
  const skill1Known = req.body['1skillKnown'];
  const skill2Known = req.body['2skillKnown'];
  const skill3Known = req.body['3skillKnown'];
  const skill1ToLearn = req.body['1skillToLearn'];
  const skill2ToLearn = req.body['2skillToLearn'];
  const skill3ToLearn = req.body['3skillToLearn'];
  const photo1OfMe = req.body['1photoOfMe'];
  const photo2OfMe = req.body['2photoOfMe'];
  const photo3OfMe = req.body['3photoOfMe'];
  const photo4OfMe = req.body['4photoOfMe'];
  const photo5OfMe = req.body['5photoOfMe'];
  const comfortWithCats = req.body.comfortWithCats;
  const comfortWithDogs = req.body.comfortWithDogs;
  const comfortWithKids = req.body.comfortWithKids;

  updatePetInfo.postPet(
      petName,
      shortDescription,
      petAge,
      petBreed,
      energyLevel,
      skill1Known,
      skill2Known,
      skill3Known,
      skill1ToLearn,
      skill2ToLearn,
      skill3ToLearn,
      photo1OfMe,
      photo2OfMe,
      photo3OfMe,
      photo4OfMe,
      photo5OfMe,
      comfortWithCats,
      comfortWithDogs,
      comfortWithKids,
      function(err, results) {
        if (err) {
          console.log('error: ', err);
          res.status(400).send(err);
        } else {
          res.status(200).send('Success adding new pet! :)');
        }
      });
});

app.delete('/animalAdopted', (req, res) => {
  const petID = req.query.petId;
  console.log('pet id in server side index', petID);
  updatePetInfo.deletePet(
      petID,
      function(err, results) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(204).send('successfully removed pet from database');
        }
      });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
