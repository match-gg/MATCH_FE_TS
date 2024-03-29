import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// mui
import { styled } from '@mui/system';
import MuiButton from '@mui/material/Button';

import { finishCard } from 'apis/api/common';
import { RootState } from 'store';
import { snackbarActions } from 'store/snackbar-slice';
import { refreshActions } from 'store/refresh-slice';
import { getCurrentGame } from 'functions/commons';
import { GAME_ID } from 'types/games';

const FinishBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentGame: GAME_ID = getCurrentGame();

  const { currentCard } = useSelector((state: RootState) => state.card);

  const nickname = useSelector(
    (state: RootState) =>
      state.user.games[`${currentGame as 'overwatch' | 'pubg' | 'lol'}`],
  );
  const { isLogin } = useSelector((state: RootState) => state.user);

  const { id, finished } = useSelector(
    (state: RootState) => state.card.currentCard,
  );

  const [isPending, setIsPending] = React.useState<boolean>(false);

  const handleFinishBtn = async () => {
    const userCheck = window.confirm(
      '실제로 인게임에서 서로 확인한 경우에 모집 완료를 눌러주세요.\n모집 완료 이후, 리뷰 페이지로 넘어가게 됩니다.',
    );

    if (userCheck) {
      dispatch(refreshActions.REFRESH_CARD());

      await handleFinish();
    }
    return null;
  };

  const handleFinish = async () => {
    try {
      setIsPending(true);
      await finishCard(currentGame, id, currentCard.chatRoomId);
    } catch (error) {
      dispatch(
        snackbarActions.OPEN_SNACKBAR({
          message:
            '요청을 처리하는 도중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
          severity: 'error',
        }),
      );
    } finally {
      setIsPending(false);
      navigate(`/${currentGame}/${id}/review`);
    }
  };

  return (
    <Button
      variant="outlined"
      size="small"
      onClick={handleFinishBtn}
      disabled={
        !isLogin ||
        !nickname ||
        isPending ||
        finished === 'true' ||
        currentCard.memberList.length === 1
      }
    >
      모집 완료
    </Button>
  );
};

export default FinishBtn;

const Button = styled(MuiButton)(() => ({
  p: 1,
  width: '32%',
  mt: 1,
  height: 40,
  borderColor: '#CCCCCC',
  color: '#5C5C5C',
  fontWeight: 700,
  ':hover': {
    borderColor: '#dddddd',
    backgroundColor: '#f3f3f3',
  },
})) as typeof MuiButton;
