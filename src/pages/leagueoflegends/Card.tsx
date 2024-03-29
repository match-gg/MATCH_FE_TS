import React from 'react';

// mui
import { styled } from '@mui/system';
import MuiBox from '@mui/material/Box';
import MuiTypography from '@mui/material/Typography';
import MuiDivider from '@mui/material/Divider';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import MuiToolTip from '@mui/material/Tooltip';
import CheckIcon from '@mui/icons-material/Check';
import MicIcon from '@mui/icons-material/Mic';

import CardContainer from 'components/CardContainer';
import Timer from 'components/CountDownTimer';
import { EXPIRE_TIME } from 'types/commons';
import { LOL_POSITIONS_ID } from 'types/games';
import { positionList, queueTypeList, tierList } from './data';

interface CardProps {
  item: {
    id: number;
    oauth2Id: string;
    name: string;
    type: string;
    tier: string;
    position: LOL_POSITIONS_ID;
    voice: 'Y' | 'N';
    content: string;
    expire: EXPIRE_TIME;
    expired: string;
    created: string;
    finished: string;
    author: {
      queueType: string;
      summonerName: string;
      tier: string;
      rank: string;
      leaguePoints: number;
      wins: number;
      losses: number;
      mostChampion: string[];
      mostLane: string;
    };
    chatRoomId: string;
    memberList: [];
    banList: [];
  };
  expired: boolean;
}

const Card = ({ item, expired }: CardProps) => {
  const [isHover, setIsHover] = React.useState<boolean>(false);

  const position = positionList.find(
    (aPosition) => aPosition.value === item.position,
  );

  const tier = tierList.find((aTier) => aTier.value === item.tier);

  const queueType = queueTypeList.find(
    (aQueueType) => aQueueType.value === item.type,
  );

  // author info
  const mostLane = positionList.find(
    (aPosition) => aPosition.value === item.author.mostLane,
  );

  const authorTier = tierList.find((aTier) => aTier.value === item.author.tier);

  const totalPlayed = item.author.wins + item.author.losses;
  const winRate = Math.round((item.author.wins / totalPlayed) * 100);

  const authorRank = (item: { author: { rank: string } }) => {
    switch (item.author.rank) {
      case 'I':
        return 1;
      case 'II':
        return 2;
      case 'III':
        return 3;
      case 'IV':
        return 4;
      default:
        return 4;
    }
  };

  const maxMember = queueType?.maxMember || 5;
  const currentMember = item.memberList.length;

  const arrayForMemberStatus = new Array(maxMember)
    .fill(0)
    .map((value, i) => `member_${i}`);

  // unranked info
  const unranked =
    item.author.tier === 'UNRANKED' && item.author.rank === 'UNRANKED';

  return (
    <div
      onMouseOver={() => {
        setIsHover(true);
      }}
      onFocus={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => setIsHover(false)}
    >
      <CardContainer expired={expired} finished={item.finished === 'true'}>
        <CardTitleWrapper>
          <img
            src={position?.imageUrl || ''}
            alt="position_to_find"
            loading="lazy"
            height="40px"
            width="40px"
          />
          <CardTitle>
            <TopInfo>
              <TopInfoTypo>#{queueType?.label || '모든큐'}</TopInfoTypo>
              <TopInfoTypo color={tier?.color || '#000000'}>
                #{tier?.label || '모든티어'}
              </TopInfoTypo>
            </TopInfo>
            <Description>{` ${item.content}`}</Description>
          </CardTitle>
        </CardTitleWrapper>
        {/* ------------------------------------------------------ */}
        <CardCenterWrapper>
          {isHover && (
            <GuideWrapper>
              <GuideTypo>클릭해서 상세보기</GuideTypo>
            </GuideWrapper>
          )}
          {!isHover && (
            <RecruitStatusWrapper>
              <MemberInfo>
                <RecruitStatusTypo>모집 현황</RecruitStatusTypo>
                {arrayForMemberStatus.map((value, index) => {
                  return (
                    <Check
                      key={value}
                      sx={{
                        color:
                          index < currentMember
                            ? 'primary.contrastText'
                            : '#d9d9d9',
                        backgroundColor:
                          index < currentMember ? 'primary.light' : '#d9d9d9',
                      }}
                    />
                  );
                })}
              </MemberInfo>
              <TimerWrapper>
                {!expired && (
                  <Timer expire={item.expire} created={item.created} />
                )}
              </TimerWrapper>
            </RecruitStatusWrapper>
          )}
        </CardCenterWrapper>
        {/* ------------------------------------------------------ */}
        <MuiDivider sx={{ my: 1 }} />
        <AuthorInfoWrapper>
          <AuthorSection>
            <SectionName>작성자</SectionName>
            <SectionContent>
              <Author>{item.author.summonerName}</Author>
              {item.voice === 'Y' && (
                <MicIcon
                  fontSize="small"
                  sx={{
                    border: '1px solid black',
                    borderRadius: '50%',
                    margin: '0 0 0 4px',
                  }}
                />
              )}
            </SectionContent>
          </AuthorSection>
          <AuthorSection>
            <SectionName>주 포지션</SectionName>
            <SectionContent>
              {mostLane ? (
                <>
                  <img
                    src={mostLane?.imageUrl}
                    alt={mostLane?.value}
                    width="24px"
                    height="24px"
                  />
                  <SectionTypo>{mostLane?.label}</SectionTypo>
                </>
              ) : (
                <MuiToolTip
                  title="플레이 수가 부족하여 포지션 정보를 불러올 수 없습니다."
                  placement="bottom-start"
                >
                  <SectionTypo>정보없음</SectionTypo>
                </MuiToolTip>
              )}
            </SectionContent>
          </AuthorSection>
          <AuthorSection>
            <SectionName>티어</SectionName>
            <SectionContent>
              <RankEmblemWrapper
                sx={{
                  backgroundColor: expired ? '#ffffff' : '',
                }}
              >
                <img
                  src={authorTier?.imageUrl}
                  alt={mostLane?.value}
                  width="28px"
                  height="20px"
                />
              </RankEmblemWrapper>
              <TierWinRateWrapper>
                {!unranked && (
                  <>
                    <SectionTypo sx={{ color: authorTier?.color }}>
                      {authorTier?.acronym}
                      {authorRank(item)}-{item.author.leaguePoints}LP
                    </SectionTypo>
                    <MatchPlayed>
                      {item.author?.wins}승 {item.author?.losses}패
                      <WinRate
                        component="span"
                        sx={{ color: winRate >= 50 ? '#d31f45' : '#5383e8' }}
                      >
                        ({winRate}%)
                      </WinRate>
                    </MatchPlayed>
                  </>
                )}
                {unranked && (
                  <SectionTypo sx={{ color: '#9e9e9e' }}>Unranked</SectionTypo>
                )}
              </TierWinRateWrapper>
            </SectionContent>
          </AuthorSection>
          <AuthorSection>
            <SectionName>모스트 챔피언</SectionName>
            <SectionContent>
              <ImageList sx={{ m: 0, p: 0 }} cols={3} gap={1}>
                {item.author.mostChampion.map((aChampion, index) => {
                  return (
                    <ImageListItem
                      key={`most_${index + 1}_${aChampion}`}
                      sx={{
                        width: '44px',
                        height: '44px',
                        gap: 1,
                      }}
                    >
                      <img
                        src={
                          aChampion === 'poro'
                            ? 'https://cdn.match-gg.kr/lol/champions/poro.png?w=44&h=44'
                            : `https://cdn.match-gg.kr/lol/champions/${aChampion}.png?w=44&h=44`
                        }
                        alt={aChampion}
                        loading="lazy"
                      />
                    </ImageListItem>
                  );
                })}
              </ImageList>
            </SectionContent>
          </AuthorSection>
        </AuthorInfoWrapper>
      </CardContainer>
    </div>
  );
};

export default React.memo(Card, (prevProps, nextProps) => {
  return prevProps.item.id === nextProps.item.id;
});

const CardTitleWrapper = styled(MuiBox)(() => ({
  width: '100%',
  height: '48px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
})) as typeof MuiBox;

const CardTitle = styled(MuiBox)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  margin: '0 0 0 4px',
})) as typeof MuiBox;

const TopInfo = styled(MuiBox)(() => ({
  display: 'flex',
})) as typeof MuiBox;

const TopInfoTypo = styled(MuiTypography)(() => ({
  fontSize: '12px',
  fontWeight: '700',
  margin: '0 4px 0 0',
})) as typeof MuiTypography;

const Description = styled(MuiTypography)(() => ({
  fontSize: '14px',
  fontWeight: '500',
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 1,
})) as typeof MuiTypography;

const CardCenterWrapper = styled(MuiBox)(() => ({
  width: '100%',
  height: '20px',
  display: 'flex',
})) as typeof MuiBox;

const GuideWrapper = styled(MuiBox)(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})) as typeof MuiBox;

const GuideTypo = styled(MuiTypography)(() => ({
  fontSize: '14px',
  color: '#5383e8',
  fontWeight: '700',
})) as typeof MuiTypography;

const RecruitStatusWrapper = styled(MuiBox)(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  padding: '0 0 0 44px',
  justifyContent: 'space-between',
})) as typeof MuiBox;

const MemberInfo = styled(MuiBox)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
})) as typeof MuiBox;

const RecruitStatusTypo = styled(MuiTypography)(() => ({
  fontSize: '14px',
  fontWeight: '700',
  color: '#878888',
  margin: '0 10px 0 0',
})) as typeof MuiTypography;

const Check = styled(CheckIcon)(() => ({
  fontSize: '12px',
  width: '16px',
  height: '16px',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 6px 0 0',
}));

const TimerWrapper = styled(MuiBox)(() => ({})) as typeof MuiBox;

const AuthorInfoWrapper = styled(MuiBox)(() => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
})) as typeof MuiBox;

const AuthorSection = styled(MuiBox)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
})) as typeof MuiBox;

const SectionName = styled(MuiTypography)(() => ({
  minWidth: '160px',
  fontSize: '12px',
  fontWeight: '700',
  color: '#999999',
  margin: '0 0 4px 0',
})) as typeof MuiTypography;

const SectionContent = styled(MuiBox)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '4px',
})) as typeof MuiBox;

const Author = styled(MuiTypography)(() => ({
  fontSize: '16px',
  fontWeight: '600',
  color: '#000000',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})) as typeof MuiTypography;

const SectionTypo = styled(MuiTypography)(() => ({
  fontSize: '14px',
  fontWeight: '500',
  color: '#000000',
})) as typeof MuiTypography;

const RankEmblemWrapper = styled(MuiBox)(() => ({
  backgroundColor: '#eeeeee',
  borderRadius: '50%',
  width: '44px',
  height: '44px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})) as typeof MuiBox;

const TierWinRateWrapper = styled(MuiBox)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  padding: '0 0 0 4px',
})) as typeof MuiBox;

const MatchPlayed = styled(MuiTypography)(() => ({
  fontSize: '12px',
  fontWeight: '500',
  color: '#000000',
})) as typeof MuiTypography;

const WinRate = styled(MuiTypography)(() => ({
  fontSize: '12px',
  fontWeight: '600',
  padding: '0 0 0 2px',
})) as typeof MuiTypography;
