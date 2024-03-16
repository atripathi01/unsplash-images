import { Box, Modal, ModalProps } from '@mui/material'
import React, { ReactNode } from 'react'

interface CustomModalProps extends Omit<ModalProps, 'children' | 'open' | 'onClose'> {
    children: ReactNode;
    open: boolean;
    handleClose: () => void;
    handleOpen?: () => void; // Optional prop
}


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 2,
    p: 4,
  };




const CustomModal: React.FC<CustomModalProps>  = ({children, handleClose, handleOpen,open}) => {
  return (
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      {children}
    </Box>
  </Modal>
  )
}

export default CustomModal