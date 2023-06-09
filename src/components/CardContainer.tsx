import React from 'react';

// mui
import styled from '@emotion/styled';
import MuiCard from '@mui/material/Card';
import MuiCardContent from '@mui/material/CardContent';

interface CardProps {
  children: React.ReactNode;
  expired: boolean;
}

const CardContainer = ({ children, expired = false }: CardProps) => {
  return (
    <CardLayout>
      <CardContent
        sx={{
          backgroundColor: expired ? '#e9e8e8c4' : '#ffffff',
        }}
      >
        {children}
      </CardContent>
    </CardLayout>
  );
};

export default CardContainer;

const CardLayout = styled(MuiCard)(() => ({
  width: '360px',
  borderRadius: '8px',
  boxShadow: 'none',
  border: '1px solid #dddddd',
  margin: '0 8px 8px 0',
  '&:hover': {
    boxShadow: '0 0 0 1px #dddddd',
    transform: 'translateY(-1px)',
    transition: 'all 0.1s ease-in-out',
  },
})) as typeof MuiCard;

const CardContent = styled(MuiCardContent)(() => ({
  width: '100%',
  height: '100%',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
})) as typeof MuiCardContent;
