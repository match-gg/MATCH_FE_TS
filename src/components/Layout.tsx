import React from 'react';

// mui
import styled from '@mui/system/styled';
import MuiBox from '@mui/material/Box';
import MuiContainer from '@mui/material/Container';
import MuiTypography from '@mui/material/Typography';

import Header from './header';
import Footer from './Footer';

import { gameList, GAME_ID, GAME } from '../assets/Games.data';

interface LayoutProps {
  children: React.ReactNode;
  currentGame: GAME_ID | null;
}

const Layout = ({ children, currentGame }: LayoutProps) => {
  const gameInfo: GAME = gameList.find(
    (game) => game.id === currentGame,
  ) as GAME;

  return (
    <LayoutContainer>
      <Header currentGame={currentGame} />
      <ContentWrapper maxWidth="lg">
        {gameInfo && <GameTypo>{gameInfo.name}</GameTypo>}
        {children}
      </ContentWrapper>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;

// styled-components
const LayoutContainer = styled(MuiBox)(() => ({
  width: '100%',
  backgroundColor: '#f3f3f3',
})) as typeof MuiBox;

const GameTypo = styled(MuiTypography)(({ theme }) => ({
  fontSize: 32,
  textAlign: 'center',
  fontStyle: 'italic',
  fontWeight: '600',
  margin: '0 20px 20px 20px',
  [theme.breakpoints.up('sm')]: {
    fontSize: 48,
  },
  [theme.breakpoints.up('md')]: {
    fontSize: 56,
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: 64,
  },
})) as typeof MuiTypography;

const ContentWrapper = styled(MuiContainer)(() => ({
  padding: '120px 0 0 0',
  minHeight: 'calc(100vh)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: '#f3f3f3',
})) as typeof MuiContainer;
