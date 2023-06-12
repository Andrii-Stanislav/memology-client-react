import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

type Props = {
  title: string;
  text: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  confirnText?: string;
};

export const ConfirmDialog = ({
  title,
  text,
  open,
  onClose,
  onConfirm,
  confirnText,
}: Props) => {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>{text}</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClose}>
          Відмінити
        </Button>
        <Button variant="outlined" color="error" onClick={onConfirm}>
          {confirnText ?? 'Підтерджую'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
