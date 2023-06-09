import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { login } from 'apis/api/user';

import Linear from 'components/loading/Linear';
import { snackbarActions } from 'store/snackbar-slice';

const Redirect = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = new URL(document.URL).searchParams;
  const code = params.get('code');

  if (code) {
    try {
      login(code, navigate, dispatch);
    } catch (error: any) {
      if (error?.response?.status === 404) {
        dispatch(
          snackbarActions.OPEN_SNACKBAR({
            message: '일치하는 회원정보가 없습니다.\n회원가입을 진행해주세요.',
            severity: 'error',
          }),
        );
        navigate('/register');
      } else {
        dispatch(
          snackbarActions.OPEN_SNACKBAR({
            message: '로그인에 실패했습니다.',
            severity: 'error',
          }),
        );
      }
    }
  }

  return (
    <Linear height="100vh" text="로그인 중입니다. 잠시만 기다려 주세요." />
  );
};

export default Redirect;
