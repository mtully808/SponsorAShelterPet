/* eslint-disable require-jsdoc */
import React, {useContext, useEffect, useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, Divider} from '@material-ui/core';
import DeleteOutlineOutlinedIcon from
  '@material-ui/icons/DeleteOutlineOutlined';


export default function DeleteButton() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // useEffect(() => {}, [allPets]);

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
          <Button onClick={handleClose}
            variant="contained" color="primary" autoFocus>
            Animal Adopted - delete from database!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
