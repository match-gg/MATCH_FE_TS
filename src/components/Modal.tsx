import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// mui
import { styled } from '@mui/system';
import MuiBox from '@mui/material/Box';

interface ModalProps {
  children: React.ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <ModalContainer onClick={(e) => e.stopPropagation()}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalWrapper>
    </ModalContainer>
  );
};

export default Modal;

const ModalContainer = styled(MuiBox)(() => ({
  position: 'fixed',
  overflow: 'hidden',
  top: '0',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1100,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
})) as typeof MuiBox;

const ModalWrapper = styled(MuiBox)(() => ({
  backgroundColor: '#fafafa',
  borderRadius: '4px',
  minHeight: '100px',
  minWidth: '100px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '16px',
})) as typeof MuiBox;
