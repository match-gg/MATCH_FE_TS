import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// mui
import { styled } from '@mui/system';
import MuiBox from '@mui/material/Box';
import MuiTypography from '@mui/material/Typography';
import MuiTextField from '@mui/material/TextField';
import MuiButton from '@mui/material/Button';
import MuiToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import MuiToggleButton from '@mui/material/ToggleButton';
import MuiSelect, { SelectChangeEvent } from '@mui/material/Select';
import MuiMenuItem from '@mui/material/MenuItem';

import MuiOutlinedInput from '@mui/material/OutlinedInput';
import { RootState } from 'store';
import { Button, ButtonGroup, Divider } from '@mui/material';
import GameIcon from 'components/GameIcon';
import { gameList } from 'assets/Games.data';

type GameFilterProps = {
  selectedGame: string;
  setSelectedGame: Dispatch<SetStateAction<string>>;
};

const GameFilterBar = ({ selectedGame, setSelectedGame }: GameFilterProps) => {
  return (
    <>
      <GameSelector>
        {gameList.map((aGame) => {
          return (
            <GameSelectorItem
              key={aGame.id}
              onClick={() => setSelectedGame(aGame.id)}
              selected={selectedGame === aGame.id}
            >
              <GameIcon
                item={aGame.id}
                id={aGame.id}
                size={{
                  width: '24px',
                  height: '22px',
                }}
              />
              <GameTypo selected={selectedGame === aGame.id}>
                {aGame.name_kor}
              </GameTypo>
            </GameSelectorItem>
          );
        })}
      </GameSelector>
      <Divider />
    </>
  );
};

type GameProps = {
  label: string;
  value: string;
};

const Game = ({ label, value }: GameProps) => {
  const nickname = useSelector(
    (state: RootState) =>
      state.user.games[value as 'lol' | 'pubg' | 'overwatch'],
  );

  const [nicknameInput, setNicknameInput] = useState<string>('');
  useEffect(() => {
    setNicknameInput(nickname);
  }, [nickname]);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNicknameInput(e.target.value);
  };

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleCertify = () => {
    setIsLoading(true);
    // 서버에서 인증 받는 API 호출
    // 이후 유저 정보 수정 요청 API 호출
    setIsLoading(false);
  };

  return (
    <Section>
      <SectionTitle>{label}</SectionTitle>
      <InputWrapper>
        <NicknameTextField
          value={nicknameInput || ''}
          disabled={!isEdit}
          size="small"
          onChange={handleInput}
          endAdornment={
            isEdit && (
              <CertifyButton onClick={handleCertify}>인증하기</CertifyButton>
            )
          }
        />
        <ControlButton onClick={handleEdit}>
          {isEdit ? '취소하기' : '변경하기'}
        </ControlButton>
      </InputWrapper>
    </Section>
  );
};

const Games = () => {
  const { representative } = useSelector((state: RootState) => state.user);
  const [selectedGame, setSelectedGame] = useState<string>(representative);

  return (
    <>
      <GameFilterBar
        selectedGame={selectedGame}
        setSelectedGame={setSelectedGame}
      />
      {gameList.map((game) => (
        <Game key={game.id} label={game.name_kor} value={game.id} />
      ))}
    </>
  );
};

export default Games;

const GameSelector = styled(MuiBox)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  gap: '6px',
  padding: '0 4px 0 4px',
})) as typeof MuiBox;

interface GameSelectorItem {
  selected: boolean;
}

const GameSelectorItem = styled(MuiBox, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<GameSelectorItem>(({ selected }) => ({
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px',
  '&:hover': {
    cursor: 'pointer',
  },
  '& > img': {
    filter: selected ? '' : 'contrast(10%) opacity(50%)',
    webkitFilter: selected ? '' : 'contrast(10%) opacity(50%)',
  },
}));

const HeaderTypo = styled(MuiTypography)(({ theme }) => ({
  padding: '8px',
  fontSize: '15px',
  fontWeight: 'bold',
  color: theme.palette.primary.main,
})) as typeof MuiTypography;

const NoPartyTypo = styled(MuiTypography)(({ theme }) => ({
  padding: '8px',
  fontSize: '14px',
  fontWeight: 'bold',
  color: theme.palette.primary.main,
})) as typeof MuiTypography;

interface GameTypoProps {
  selected: boolean;
}

const GameTypo = styled(MuiTypography, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<GameTypoProps>(({ selected }) => ({
  fontSize: selected ? '13px' : '12px',
  fontWeight: selected ? '600' : '400',
  color: selected ? '' : 'grey',
}));

const GameFilterTypo = styled(MuiTypography)(() => ({
  fontSize: '24px',
}));

const GameFilterBarWrapper = styled(MuiBox)(() => ({
  width: '50%',
  padding: '12px',
  display: 'flex',
  flexDirection: 'row',
}));

const Container = styled(MuiBox)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  gap: '16px',
}));

const MenuTitle = styled(MuiTypography)(() => ({
  width: '100%',
  borderBottom: '1px solid #969393',
  fontSize: '22px',
  fontWeight: '700',
  padding: '0 0 0 8px',
})) as typeof MuiTypography;

const Section = styled(MuiBox)(({ theme }) => ({
  marginBottom: '16px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  padding: '8px 0 0 16px',
  gap: '8px',
}));

const SectionTitle = styled(MuiTypography)(() => ({
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '4px',
}));

const SectionContentTypo = styled(MuiTypography)(() => ({
  fontSize: '16px',
  fontWeight: '500',
  padding: '0 0 0 16px',
}));

const NicknameTextField = styled(MuiOutlinedInput)(() => ({
  maxWidth: '280px',
  minWidth: '280px',
  '& .MuiInputBase-root': {
    height: '40px',
    padding: '0',
  },
}));

const CertifyButton = styled(MuiButton)(() => ({
  height: '40px',
  width: '80px',
  fontSize: '14px',
  fontWeight: 'bold',
  borderRadius: '0',
  padding: '0',
})) as typeof MuiButton;

const InputWrapper = styled(MuiBox)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: '0 8px 0 0',
  gap: '4px',
})) as typeof MuiBox;

const ControlButton = styled(MuiButton)(() => ({
  height: '40px',
  width: '80px',
  fontSize: '14px',
  fontWeight: 'bold',
  borderRadius: '0',
  padding: '0',
})) as typeof MuiButton;

const PubgPlatformToggle = styled(MuiToggleButtonGroup)(() => ({
  '& .MuiToggleButton-root': {
    height: '40px',
    fontSize: '14px',
    fontWeight: 'bold',
    borderRadius: '4px',
    padding: '0 8px',
  },
})) as typeof MuiToggleButtonGroup;

const Platform = styled(MuiToggleButton)(() => ({})) as typeof MuiToggleButton;
