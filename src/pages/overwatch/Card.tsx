import React from 'react';

// mui
import { styled } from '@mui/system';
import MuiBox from '@mui/material/Box';
import MuiTypography from '@mui/material/Typography';
import MuiDivider from '@mui/material/Divider';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import CheckIcon from '@mui/icons-material/Check';
import MicIcon from '@mui/icons-material/Mic';

import CardContainer from 'components/CardContainer';
import Timer from 'components/CountDownTimer';
import { EXPIRE_TIME } from 'types/commons';
import { OVERWATCH_POSITIONS_ID } from 'types/games';
import { positionList, queueTypeList, tierList } from './data';

interface CardProps {
  item: {
    id: number;
    oauth2Id: string;
    name: string;
    type: string;
    tier: string;
    position: OVERWATCH_POSITIONS_ID;
    voice: 'Y' | 'N';
    content: string;
    expired: string;
    finished: string;
    expire: EXPIRE_TIME;
    created: string;
    author: {
      name: string;
      battletag: number;
      type: string;
      tank_tier: string | 'none';
      tank_rank: string | 'none';
      damage_tier: string | 'none';
      damage_rank: string | 'none';
      support_tier: string | 'none';
      support_rank: string | 'none';
      wins: number;
      losses: number;
      kills: number;
      deaths: number;
      mostHero: string[];
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
  const authorNickname = item.author.name.split('#')[0];

  type calcedInfo = {
    value: number;
    color: string;
  };

  const calcKDInfo = (): calcedInfo => {
    const kd: number =
      item.author.kills === 0 || item.author.deaths === 0
        ? 0
        : Number((item.author.kills / item.author.deaths).toFixed(2));
    let color = '#000';
    if (kd >= 4) {
      color = 'red';
    } else if (kd >= 2.5) {
      color = 'orange';
    } else {
      color = '#000';
    }
    return {
      value: kd,
      color,
    };
  };

  const tank =
    item.author.tank_tier === 'none'
      ? 'UNRANKED'
      : item.author.tank_tier.toUpperCase();
  const damage =
    item.author.damage_tier === 'none'
      ? 'UNRANKED'
      : item.author.damage_tier.toUpperCase();
  const support =
    item.author.support_tier === 'none'
      ? 'UNRANKED'
      : item.author.support_tier.toUpperCase();

  const authorTankTier = tierList.find((aTier) => aTier.value === tank);
  const authorDamageTier = tierList.find((aTier) => aTier.value === damage);
  const authorSupportTier = tierList.find((aTier) => aTier.value === support);
  const totalPlayed = item.author.wins + item.author.losses;
  const winRate = Math.round((item.author.wins / totalPlayed) * 100);
  const authorKDTypo = (item.author.kills / item.author.deaths).toFixed(2);
  const maxMember = queueType?.maxMember || 5;
  const currentMember = item.memberList.length;

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
          <ImgWrapper>
            <img
              src={position?.imageUrl || ''}
              alt="game_img"
              loading="lazy"
              height="28px"
              width="28px"
            />
          </ImgWrapper>
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
                {new Array(maxMember).fill(0).map((_, index) => {
                  return (
                    <Check
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
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
            <AuthorSectionName>작성자</AuthorSectionName>
            <SectionContent>
              <Author>{authorNickname}</Author>
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
            <WinRateSectionName>승률</WinRateSectionName>
            <ChildSectionContent>
              {item.author.wins + item.author.losses === 0 ? (
                <MatchPlayed>
                  <WinRate component="span">정보없음</WinRate>
                </MatchPlayed>
              ) : (
                <MatchPlayed>
                  <WinRate
                    component="span"
                    sx={{
                      color: winRate >= 50 ? '#d31f45' : '#5383e8',
                    }}
                  >
                    {winRate}%
                  </WinRate>
                  ({item.author?.wins}승 {item.author?.losses}패)
                </MatchPlayed>
              )}
            </ChildSectionContent>
          </AuthorSection>
          <AuthorSection>
            <KDSectionName>K/D</KDSectionName>
            <ChildSectionContent>
              {item.author.kills + item.author.deaths === 0 ? (
                <KDTypo>정보없음</KDTypo>
              ) : (
                <KDTypo sx={{ color: calcKDInfo().color }}>
                  {authorKDTypo}
                </KDTypo>
              )}
            </ChildSectionContent>
          </AuthorSection>
          <AuthorSection>
            <SectionName>티어</SectionName>
            <SectionContent>
              <PositionRankSection>
                <PositionEmblemWrapper>
                  <img
                    src={positionList[1].imageUrl}
                    alt={positionList[1]?.value}
                    width="12px"
                    height="12px"
                  />
                </PositionEmblemWrapper>
                <RankWrapper>
                  <img
                    src={authorTankTier?.imageUrl}
                    alt={authorTankTier?.value}
                    width={
                      authorTankTier?.value === 'GRANDMASTER' ||
                      authorTankTier?.value === 'MASTER'
                        ? '42px'
                        : '50px'
                    }
                    height={
                      authorTankTier?.value === 'GRANDMASTER' ||
                      authorTankTier?.value === 'MASTER'
                        ? '42px'
                        : '50px'
                    }
                  />
                </RankWrapper>
                <TierTypo sx={{ color: authorTankTier?.color }}>
                  {authorTankTier?.acronym}
                  {item.author.tank_rank === 'none'
                    ? ''
                    : item.author.tank_rank}
                </TierTypo>
              </PositionRankSection>
              <MuiDivider orientation="vertical" flexItem />
              <PositionRankSection>
                <PositionEmblemWrapper>
                  <img
                    src={positionList[2].imageUrl}
                    alt={positionList[2]?.value}
                    width="12px"
                    height="12px"
                  />
                </PositionEmblemWrapper>
                <RankWrapper>
                  <img
                    src={authorDamageTier?.imageUrl}
                    alt={authorDamageTier?.value}
                    width={
                      authorDamageTier?.value === 'GRANDMASTER' ||
                      authorDamageTier?.value === 'MASTER'
                        ? '42px'
                        : '50px'
                    }
                    height={
                      authorDamageTier?.value === 'GRANDMASTER' ||
                      authorDamageTier?.value === 'MASTER'
                        ? '42px'
                        : '50px'
                    }
                  />
                </RankWrapper>
                <TierTypo sx={{ color: authorDamageTier?.color }}>
                  {authorDamageTier?.acronym}
                  {item.author.damage_rank === 'none'
                    ? ''
                    : item.author.damage_rank}
                </TierTypo>
              </PositionRankSection>
              <MuiDivider orientation="vertical" flexItem />
              <PositionRankSection>
                <PositionEmblemWrapper>
                  <img
                    src={positionList[3].imageUrl}
                    alt={positionList[3]?.value}
                    width="12px"
                    height="12px"
                  />
                </PositionEmblemWrapper>
                <RankWrapper>
                  <img
                    src={authorSupportTier?.imageUrl}
                    alt={authorSupportTier?.value}
                    width={
                      authorSupportTier?.value === 'GRANDMASTER' ||
                      authorSupportTier?.value === 'MASTER'
                        ? '42px'
                        : '50px'
                    }
                    height={
                      authorSupportTier?.value === 'GRANDMASTER' ||
                      authorSupportTier?.value === 'MASTER'
                        ? '42px'
                        : '50px'
                    }
                  />
                </RankWrapper>
                <TierTypo sx={{ color: authorSupportTier?.color }}>
                  {authorSupportTier?.acronym}
                  {item.author.support_rank === 'none'
                    ? ''
                    : item.author.support_rank}
                </TierTypo>
              </PositionRankSection>
            </SectionContent>
          </AuthorSection>
          <MostHeroSection>
            <SectionName>모스트 영웅</SectionName>
            <SectionContent>
              <ImageList sx={{ m: '8px 0 0 0', p: 0 }} cols={3} gap={4}>
                {item.author.mostHero.map((aHero, index) => {
                  return (
                    <ImageListItem
                      key={`most_${index + 1}_${aHero}`}
                      sx={{
                        width: '44px',
                        height: '44px',
                        gap: 1,
                        border: '2px solid black',
                      }}
                    >
                      <img
                        src={`https://cdn.match-gg.kr/overwatch/heroes/${aHero.toLowerCase()}.png`}
                        alt={aHero}
                        loading="lazy"
                      />
                    </ImageListItem>
                  );
                })}
              </ImageList>
            </SectionContent>
          </MostHeroSection>
        </AuthorInfoWrapper>
      </CardContainer>
    </div>
  );
};

export default React.memo(Card, (prevProps, nextProps) => {
  return prevProps.item.id === nextProps.item.id;
});

const ImgWrapper = styled(MuiBox)(() => ({
  width: '36px',
  height: '36px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})) as typeof MuiBox;

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
  minHeight: '55px',
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

const AuthorSectionName = styled(MuiTypography)(() => ({
  minWidth: '120px',
  fontSize: '12px',
  fontWeight: '700',
  color: '#999999',
  margin: '0 0 4px 0',
})) as typeof MuiTypography;

const WinRateSectionName = styled(MuiTypography)(() => ({
  minWidth: '140px',
  fontSize: '12px',
  fontWeight: '700',
  color: '#999999',
  margin: '0 0 4px 0',
})) as typeof MuiTypography;

const KDSectionName = styled(MuiTypography)(() => ({
  minWidth: '60px',
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

const ChildSectionContent = styled(MuiBox)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  gap: '2px',
})) as typeof MuiBox;

const Author = styled(MuiTypography)(() => ({
  fontSize: '16px',
  fontWeight: '600',
  color: '#000000',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})) as typeof MuiTypography;

const MatchPlayed = styled(MuiTypography)(() => ({
  fontSize: '11px',
  fontWeight: '400',
  color: '#000000',
})) as typeof MuiTypography;

const WinRate = styled(MuiTypography)(() => ({
  fontSize: '15px',
  fontWeight: '600',
  padding: '0 0 0 2px',
})) as typeof MuiTypography;

const KDTypo = styled(MuiTypography)(() => ({
  fontSize: '15px',
  fontWeight: '600',
  padding: '0 0 0 2px',
})) as typeof MuiTypography;

const PositionRankSection = styled(MuiBox)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
})) as typeof MuiBox;

const RankWrapper = styled(MuiBox)(() => ({
  width: '40px',
  height: '30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
})) as typeof MuiBox;

const PositionEmblemWrapper = styled(MuiBox)(() => ({
  width: '20px',
  height: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})) as typeof MuiBox;

const TierTypo = styled(MuiTypography)(() => ({
  width: '100%',
  fontSize: '12px',
  fontWeight: '600',
  textAlign: 'center',
})) as typeof MuiTypography;

const MostHeroSection = styled(MuiBox)(() => ({
  minHeight: '90px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
})) as typeof MuiBox;
