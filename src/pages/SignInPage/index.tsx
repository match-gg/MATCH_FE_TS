import React from 'react';

// mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Divider from 'components/Divider';

// mui styled components
import { styled } from '@mui/material/styles';

const Wrapper = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '100vh',
  padding: '40px 0 10px',
  [theme.breakpoints.up('md')]: {
    margin: '100px auto',
    height: '80vh',
    minHeight: '560px',
    border: '1px solid #dddddd',
    borderRadius: '8px',
  },
}));

const LogoTitle = styled(Typography)(({ theme }) => ({
  fontSize: '32px',
  fontStyle: 'italic',
  fontWeight: 700,
  [theme.breakpoints.up('sm')]: {
    fontSize: '44px',
  },
}));

const ButtonWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 20,
}));

const Typo = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 500,
  [theme.breakpoints.up('sm')]: {
    fontSize: '22px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '26px',
  },
}));

const KakaoLoginBtn = styled(Button)(({ theme }) => ({
  width: '300px',
  height: '44px',
  backgroundColor: '#FEE500',
  color: '#000000',
  borderRadius: '8px',
  fontSize: '16px',
  fontWeight: 600,
  gap: 10,
  [theme.breakpoints.up('sm')]: {
    fontSize: '18px',
    width: '340px',
    height: '46px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '20px',
    width: '380px',
    height: '48px',
  },
  '&: hover': {
    backgroundColor: '#e3cd07',
  },
}));

const RegisterBtn = styled(Button)(({ theme }) => ({
  width: '300px',
  height: '44px',
  backgroundColor: '#dbdbdb',
  color: '#000000',
  borderRadius: '8px',
  fontSize: '16px',
  fontWeight: 600,
  gap: 10,
  textTransform: 'none',
  [theme.breakpoints.up('sm')]: {
    fontSize: '18px',
    width: '340px',
    height: '46px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '20px',
    width: '380px',
    height: '48px',
  },
}));

const CopyRight = styled(Typography)(() => ({
  fontSize: '16px',
  fontWeight: 500,
}));

const SignIn = () => {
  return (
    <Wrapper maxWidth="sm">
      <LogoTitle variant="h1">MatchGG</LogoTitle>
      <ButtonWrapper>
        <Typo>
          이미 <i>MatchGG</i> 의 회원이라면
        </Typo>
        <KakaoLoginBtn>
          <img
            src="https://d18ghgbbpc0qi2.cloudfront.net/assets/kakao_login_symbol.png"
            alt="kakao_login_symbol"
            width="20px"
          />
          카카오 로그인
        </KakaoLoginBtn>
        <Divider>or</Divider>
        <Typo>
          아직 <i>MatchGG</i> 의 회원이 아니라면
        </Typo>
        <RegisterBtn>
          <i>MatchGG</i> 회원가입
        </RegisterBtn>
      </ButtonWrapper>
      <CopyRight>© 2023 MatchGG. All rights reserved.</CopyRight>
    </Wrapper>
  );
};

export default SignIn;
