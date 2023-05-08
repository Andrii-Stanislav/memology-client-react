import { ReactNode } from "react";
import { Dialog } from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal = ({ open, onClose, children }: Props) => {
  return (
    <Dialog open={open} onClose={onClose} closeAfterTransition>
      {children}
    </Dialog>
  );
};

export default Modal;
