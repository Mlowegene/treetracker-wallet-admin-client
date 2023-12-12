import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import {AvatarSvgIcon, ArrowSvgIcon, TokenICon} from './SvgIcon';

export default function ConfirmDialog({
  open,
  onConfirm,
  onClose,
  receiverWallet,
  senderWallet,
}){



  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure to make this transfer?
        </DialogTitle>
        <DialogContent sx= {{display: 'flex'}}>
            <TokenICon />
            <AvatarSvgIcon sx={{ width: 50, height: 50 }} />
            <Typography variant="h5">{`Source ${senderWallet}`}</Typography>
            <ArrowSvgIcon  />
            <AvatarSvgIcon sx={{ width: 50, height: 50 }} />
            <Typography variant="h5">{`Destination ${receiverWallet}`}</Typography>
            
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>NO</Button>
          <Button onClick={onConfirm} autoFocus>
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
