import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

// mui
import { styled } from '@mui/system';
import MuiBox from '@mui/material/Box';
import MuiTypography from '@mui/material/Typography';
import MuiTooltip from '@mui/material/Tooltip';
import MuiIconButton from '@mui/material/IconButton';
import MuiMenu from '@mui/material/Menu';
import MuiMenuItem from '@mui/material/MenuItem';
import MuiDivider from '@mui/material/Divider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

import { logout } from 'apis/api/user';
import { RootState } from 'store';
import { snackbarActions } from 'store/snackbar-slice';
import { chatroomActions } from 'store/chatroom-slice';
import { tokenActions } from 'store/token-slice';
import { notificationActions } from 'store/notification-slice';
import { userActions } from 'store/user-slice';

const UserMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { profileImage, nickname } = useSelector(
    (state: RootState) => state.user,
  );

  const [userMenuAnchor, setUserMenuAnchor] =
    React.useState<null | HTMLElement>(null);
  const isUserMenuOpen = Boolean(userMenuAnchor);

  const openUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const closeUserMenu = () => {
    setUserMenuAnchor(null);
  };

  const logoutBtnHandler = async () => {
    try {
      await logout();

      dispatch(userActions.DELETE_USER());
      dispatch(notificationActions.DELETE_NOTIFICATION());
      dispatch(tokenActions.DELETE_TOKEN());
      dispatch(chatroomActions.REMOVE_ALL_JOINED_CHATROOMS_ID());
      dispatch(
        snackbarActions.OPEN_SNACKBAR({
          message: '로그아웃 되었습니다.',
          severity: 'success',
        }),
      );

      navigate('/login');
    } catch (error: any) {
      dispatch(
        snackbarActions.OPEN_SNACKBAR({
          message: '로그아웃에 실패했습니다. 잠시 후 다시 시도해주세요.',
          severity: 'error',
        }),
      );
    } finally {
      closeUserMenu();
    }
  };

  return (
    <>
      <UserMenuBtn>
        <MuiTooltip title="사용자 메뉴">
          <MuiIconButton onClick={openUserMenu}>
            <ProfileImageWrapper>
              <img
                src={
                  profileImage ||
                  'https://cdn.match-gg.kr/lol/champions/poro.png?w=40&h=40'
                }
                alt="profile_image"
                width="40px"
                height="40px"
              />
            </ProfileImageWrapper>
          </MuiIconButton>
        </MuiTooltip>
      </UserMenuBtn>
      <MuiMenu
        anchorEl={userMenuAnchor}
        id="user_menu"
        open={Boolean(userMenuAnchor)}
        onClose={closeUserMenu}
        onClick={closeUserMenu}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 22,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MuiMenuItem
          component={RouterLink}
          to="/mypage"
          onClick={() => {
            closeUserMenu();
          }}
        >
          <AccountCircleIcon />
          <MenuItemText>{nickname}</MenuItemText>
        </MuiMenuItem>
        <MuiDivider />
        <MuiMenuItem onClick={logoutBtnHandler}>
          <LogoutIcon />
          <MenuItemText>로그아웃</MenuItemText>
        </MuiMenuItem>
      </MuiMenu>
    </>
  );
};

export default UserMenu;

const UserMenuBtn = styled(MuiBox)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})) as typeof MuiBox;

const ProfileImageWrapper = styled(MuiBox)(() => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  overflow: 'hidden',
})) as typeof MuiBox;

const MenuItemText = styled(MuiTypography)(() => ({
  fontSize: '14px',
  fontWeight: '500',
  padding: '0 8px',
})) as typeof MuiTypography;
