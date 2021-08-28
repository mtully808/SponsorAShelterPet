/* eslint-disable require-jsdoc */
import React, {useContext} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {ProductContext} from './context.js';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle} from '@material-ui/core';
import DeleteOutlineOutlinedIcon from
  '@material-ui/icons/DeleteOutlineOutlined';


export default function DeleteButton(props) {
  const [open, setOpen] = React.useState(false);

  const {refreshPets, removePetToggle} = useContext(ProductContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeletion = () => {
    event.preventDefault();
    console.log('in handle delete, pre-axios client side');
    axios.delete(`/animalAdopted`, {
      params: {
        petId: props.id,
      },
    })
        .then((response) => {
          console.log('inside then statement????');
          removePetToggle(!refreshPets);
        })
        .catch((err) => {
          console.log(err);
        });

    setOpen(false);
  };

  return (
    <div>
      {/* Trash Icon */}
      <Button onClick={handleClickOpen}>
        <DeleteOutlineOutlinedIcon
          fontSize="small" color="disabled"/>
      </Button>


      {/* Dialog to confirm deletion */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Are you sure you want to delete this animal from the database?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Did this animal get adopted?!?! Yay!!!!
            If so, go ahead and click
              &apos;Animal Adopted - delete from database!&apos;
            If you didn&apos;t mean to click the trash button,
              click &apos;Cancel&apos;.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}
            variant="contained" color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeletion}
            variant="contained" color="primary" autoFocus>
            Animal Adopted - delete from database!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

DeleteButton.propTypes = {
  id: PropTypes.number,
};
