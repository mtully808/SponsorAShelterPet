// import connection to psql database
const psqlConnection = require('../index.js');

const postPet = function(
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
    callback) {
  const addPet =
  `INSERT INTO
    pets(
      "name",
      "description",
      "age",
      "breed",
      "energylevel",
      "skill1known",
      "skill2known",
      "skill3known",
      "skill1tolearn",
      "skill2tolearn",
      "skill3tolearn",
      "photo1ofme",
      "photo2ofme",
      "photo3ofme",
      "photo4ofme",
      "photo5ofme",
      "comfortwithcats",
      "comfortwithdogs",
      "comfortwithkids"
    )
  VALUES ($1, $2, $3, $4, $5, $6, $7,
    $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19
  );`;

  psqlConnection.query(
      addPet,
      [petName,
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
        comfortWithKids],
      function(err, results) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, results);
        }
      });
};

const getAllPets = function(callback) {
  const selectAllPets =
    `SELECT
      *
    FROM
      pets;`;

  psqlConnection.query(
      selectAllPets,
      function(err, results) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, results.rows);
        }
      });
};

const getOnePet = function(petName, callback) {
  const selectOnePet =
    `SELECT
      *
    FROM
      pets
    WHERE
      name=$1;`;

  psqlConnection.query(
      selectOnePet,
      [petName],
      function(err, results) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, results.rows);
        }
      });
};

module.exports = {
  postPet,
  getAllPets,
  getOnePet,
};




// const mongoose = require('mongoose');
// const db = require('../index.js');

// const Schema = mongoose.Schema;

// const addPetInfoSchema = new Schema({
//   petName: String,
//   petAge: Number,
//   energyLevel: Number,
//   skillsKnown: String,
//   skillsToLearn: String,
//   comfortWithCats: Number,
//   comfortWithDogs: Number,
//   comfortWithKids: Number,
// });

// const PetInfo = db.model('PetInfo', addPetInfoSchema);

// module.exports = PetInfo;
