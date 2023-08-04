import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getDatabase, ref } from 'firebase/database';

// mui
import { styled } from '@mui/system';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import MuiBox from '@mui/material/Box';
import MuiTypography from '@mui/material/Typography';
import MuiMenuItem from '@mui/material/MenuItem';
import MuiButton from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import ExpandMore from '@mui/icons-material/ExpandMore';
import NotificationsActiveRounded from '@mui/icons-material/NotificationsActiveRounded';

import { RootState } from 'store';
import { getAChatRoomInfo, updateALastRead } from 'apis/api/firebase';
import { snackbarActions } from 'store/snackbar-slice';
import NotiAccordionDetail from './NotiAccordionDetail';

type Member = {
  nickname: string;
  oauth2Id: string;
  notiToken: string | null;
};

type TChatRoomInfo = {
  content: string;
  createdBy: string;
  game: 'lol' | 'pubg' | 'overwatch';
  isDeleted: boolean;
  key: string;
  maxMember: number;
  members: Member[];
  roomId: string;
  timestamp: number | Date;
};

interface NotiAccordionProps {
  chatRoomId: string;
  timestamp: number;
  expanded: boolean;
  expandHandler: (
    panel: string,
  ) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  handleNotiClose: () => void;
}

const NotiAccordion = ({
  chatRoomId,
  timestamp,
  expanded,
  expandHandler,
  handleNotiClose,
}: NotiAccordionProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { oauth2Id } = useSelector((state: RootState) => state.user);
  const currentChatRoomMessages = useSelector(
    (state: RootState) => state.message.messages[chatRoomId],
  );

  // 파이어베이스에서 채팅방 정보 가져오는 로딩
  const [isLoading, setIsLoading] = useState(true);
  // 파이어베이스에서 가져온 chatRoomInfo의 state
  const [chatRoomInfo, setChatRoomInfo] = useState<TChatRoomInfo>();

  // firebase
  const chatRoomsRef = ref(getDatabase(), 'chatRooms');

  // 채팅방 정보 가져오기
  useEffect(() => {
    const getChatRoomInfo = async () => {
      setIsLoading(true);

      try {
        const fetchedChatRoomInfo = await getAChatRoomInfo(
          chatRoomId,
          chatRoomsRef,
        );
        setChatRoomInfo(fetchedChatRoomInfo);
      } catch (error) {
        dispatch(
          snackbarActions.OPEN_SNACKBAR({
            message:
              '채팅방 정보를 가져오는 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
            severity: 'error',
          }),
        );
      } finally {
        setIsLoading(false);
      }
    };

    getChatRoomInfo();
  }, []);

  const deleteNotification = async () => {
    await updateALastRead(oauth2Id, chatRoomId, Date.now());
  };

  if (chatRoomInfo) {
    return (
      <Accordion
        disableGutters
        expanded={expanded}
        onChange={expandHandler(`${chatRoomId}`)}
        sx={{
          border: '1px solid #e0e0e0',
          borderTop: 'none',
          borderBottomLeftRadius: '4px',
          borderBottomRightRadius: '4px',
        }}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <AccordionSummaryContent>
            <AccordionSummaryHeader>
              <MuiTypography
                noWrap
                sx={{
                  fontWeight: '600',
                  fontSize: '15px',
                }}
              >
                {`[${chatRoomInfo?.createdBy}] 님의 파티`}
              </MuiTypography>
              {currentChatRoomMessages?.length > 0 &&
                isLoading === false &&
                currentChatRoomMessages[currentChatRoomMessages.length - 1]
                  .timestamp > timestamp && (
                  <NotificationsActiveRounded
                    sx={{ color: 'orange', marginLeft: '4px' }}
                  />
                )}
            </AccordionSummaryHeader>
            <MuiTypography noWrap sx={{ fontSize: '13px' }}>
              {chatRoomInfo?.content}
            </MuiTypography>
          </AccordionSummaryContent>
        </AccordionSummary>
        <AccordionDetails sx={{ maxHeight: '240px', overflow: 'auto' }}>
          {currentChatRoomMessages &&
            [...currentChatRoomMessages].reverse().map((message) => {
              if (message.timestamp < timestamp) return null;
              return (
                <NotiAccordionDetail
                  key={message.timestamp}
                  message={message}
                  boardId={chatRoomInfo.roomId}
                  game={chatRoomInfo.game}
                />
              );
            })}
          <ButtonWrapper>
            <Button
              onClick={() => {
                navigate(`/${chatRoomInfo.game}/${chatRoomInfo.roomId}`);
                handleNotiClose();
              }}
            >
              <EnterParty>상세보기</EnterParty>
            </Button>
            <Button
              onClick={() => {
                deleteNotification();
              }}
            >
              <DeleteTypo>알림 지우기</DeleteTypo>
            </Button>
          </ButtonWrapper>
        </AccordionDetails>
      </Accordion>
    );
  }
  return <Skeleton variant="rectangular" sx={{ margin: '4px' }} height={40} />;
};

export default NotiAccordion;

const AccordionSummaryContent = styled(MuiBox)(() => ({
  display: 'block',
  maxWidth: '280px',
})) as typeof MuiBox;

const AccordionSummaryHeader = styled(MuiBox)(() => ({
  display: 'flex',
  alignItems: 'center',
})) as typeof MuiBox;

const ButtonWrapper = styled(MuiBox)(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '4px',
})) as typeof MuiBox;

const Button = styled(MuiButton)(() => ({
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
})) as typeof MuiMenuItem;

const DeleteTypo = styled(MuiTypography)(() => ({
  fontWeight: 'bold',
  color: 'orangered',
  fontSize: '12px',
})) as typeof MuiTypography;

const EnterParty = styled(MuiTypography)(() => ({
  fontWeight: 'bold',
  fontSize: '12px',
})) as typeof MuiTypography;
