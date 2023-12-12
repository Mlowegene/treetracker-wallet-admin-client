import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { AvatarSvgIcon, ArrowSvgIcon, TokenICon } from './SvgIcon';
import { Box, Stack, IconButton } from '@mui/material';

export default function ConfirmDialog({
  open,
  onConfirm,
  onClose,
  receiverWallet,
  senderWallet,
  tokensAmount,
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogContent
        width="fit-content"
        sx={{ padding: '20px 50px 50px 50px' }}
      >
        <Typography
          variant="p"
          fontWeight={600}
          style={{ fontSize: '14px', fontWeight: '700' }}
        >
          Are you sure to make this transfer?
        </Typography>

        <div
          style={{
            position: 'absolute',
            top: '34%',
            left: '42%',
            zIndex: 2,
          }}
        >
          <TokenICon sx={{ margin: '0', height: '50px', width: '50px' }} />
        </div>

        <div
          style={{ position: 'absolute', top: '30%', left: '40%', zIndex: 1 }}
        >
          <TokenICon sx={{ margin: '0', height: '50px', width: '50px' }} />
        </div>

        <div
          style={{ position: 'absolute', top: '37%', left: '39%', zIndex: 3 }}
        >
          <TokenICon sx={{ margin: '0', height: '50px', width: '50px' }} />
        </div>

        <Box
          mt={15}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Stack direction="row" spacing={6} mt={40}>
            <Stack
              direction="row"
              alignItems="center"
              style={{ justifyContent: 'spaceArround', gap: '4px' }}
            >
              <Stack
                direction="row"
                alignItems="center"
                style={{
                  borderRadius: '50%',
                  backgroundColor: 'rgba(128, 128, 128, 0.438)',
                  width: '50px',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <AvatarSvgIcon />
              </Stack>
              <Typography
                variant="p"
                style={{ fontSize: '15px', fontWeight: '500' }}
              >{`Source ${senderWallet}`}</Typography>
            </Stack>

            <IconButton disableRipple>
              <ArrowSvgIcon />
            </IconButton>

            <Stack
              direction="row"
              alignItems="center"
              style={{ justifyContent: 'spaceArround', gap: '4px' }}
            >
              <Stack
                direction="row"
                alignItems="center"
                style={{
                  borderRadius: '50%',
                  backgroundColor: 'rgba(128, 128, 128, 0.438)',
                  width: '50px',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <AvatarSvgIcon />
              </Stack>
              <Typography
                variant="p"
                style={{ fontSize: '15px', fontWeight: '500' }}
              >{`Source ${receiverWallet}`}</Typography>
            </Stack>
          </Stack>

          <Typography
            variant="p"
            mt={0}
            mb={10}
            style={{ color: 'rgb(110, 175, 13)', fontWeight: '500' }}
          >
            {tokensAmount.current.value}
          </Typography>

          <Stack
            direction="row"
            mb={10}
            spacing={2}
            style={{
              position: 'absolute',
              bottom: 0,
              right: '50px',
              margin: '16px',
              marginBottom: '20px',
            }}
          >
            <Button
              variant="outlined"
              style={{ color: 'rgb(110, 175, 13)' }}
              onClick={onClose}
            >
              No
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: 'rgb(110, 175, 13)' }}
              onClick={onConfirm}
            >
              Yes
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
