import { LOL_POSITION } from 'types/games';

export const queueTypeList = [
  { value: 'ALL', label: '모든 큐', maxMember: 5 },
  { value: 'DUO_RANK', label: '솔로랭크', maxMember: 2 }, // RANKED_SOLO_5x5
  { value: 'FREE_RANK', label: '자유랭크', maxMember: 5 }, // RANKED_FLEX_SR
  { value: 'NORMAL', label: '일반게임', maxMember: 5 }, // NORMAL
  { value: 'ARAM', label: '칼바람나락', maxMember: 5 }, // ARAM
];

export const tierList = [
  {
    value: 'ALL',
    label: '모든 티어',
    color: '#000000',
    acronym: 'ALL',
    imageUrl: 'https://cdn.match-gg.kr/lol/ranked_emblems/unranked.png',
  },
  {
    value: 'CHALLENGER',
    label: '챌린저',
    color: '#F4C875',
    acronym: 'C',
    imageUrl: 'https://cdn.match-gg.kr/lol/ranked_emblems/challenger.png',
  },
  {
    value: 'GRANDMASTER',
    label: '그랜드마스터',
    color: '#CD4545',
    acronym: 'GM',
    imageUrl: 'https://cdn.match-gg.kr/lol/ranked_emblems/grandmaster.png',
  },
  {
    value: 'MASTER',
    label: '마스터',
    color: '#9A4E80',
    acronym: 'M',
    imageUrl: 'https://cdn.match-gg.kr/lol/ranked_emblems/master.png',
  },
  {
    value: 'DIAMOND',
    label: '다이아몬드',
    color: '#576BCE',
    acronym: 'D',
    imageUrl: 'https://cdn.match-gg.kr/lol/ranked_emblems/diamond.png',
  },
  {
    value: 'EMERALD',
    label: '에메랄드',
    color: '#009e54',
    acronym: 'E',
    imageUrl: 'https://cdn.match-gg.kr/lol/ranked_emblems/emerald.png',
  },
  {
    value: 'PLATINUM',
    label: '플래티넘',
    color: '#4E9996',
    acronym: 'P',
    imageUrl: 'https://cdn.match-gg.kr/lol/ranked_emblems/platinum.png',
  },
  {
    value: 'GOLD',
    label: '골드',
    color: '#CD8837',
    acronym: 'G',
    imageUrl: 'https://cdn.match-gg.kr/lol/ranked_emblems/gold.png',
  },
  {
    value: 'SILVER',
    label: '실버',
    color: '#80989D',
    acronym: 'S',
    imageUrl: 'https://cdn.match-gg.kr/lol/ranked_emblems/silver.png',
  },
  {
    value: 'BRONZE',
    label: '브론즈',
    color: '#8C513A',
    acronym: 'B',
    imageUrl: 'https://cdn.match-gg.kr/lol/ranked_emblems/bronze.png',
  },
  {
    value: 'IRON',
    label: '아이언',
    color: '#51484A',
    acronym: 'I',
    imageUrl: 'https://cdn.match-gg.kr/lol/ranked_emblems/iron.png',
  },
  {
    value: 'UNRANKED',
    label: '언랭크드',
    color: '#000000',
    acronym: 'U',
    imageUrl: 'https://cdn.match-gg.kr/lol/ranked_emblems/unranked.png',
  },
];

export const positionList: LOL_POSITION[] = [
  {
    value: 'ALL',
    label: '전체',
    imageUrl: 'https://cdn.match-gg.kr/lol/lane_icons/ALL.png',
  },
  {
    value: 'TOP',
    label: '탑',
    imageUrl: 'https://cdn.match-gg.kr/lol/lane_icons/TOP.png',
  },
  {
    value: 'JUNGLE',
    label: '정글',
    imageUrl: 'https://cdn.match-gg.kr/lol/lane_icons/JUG.png',
  },
  {
    value: 'MIDDLE',
    label: '미드',
    imageUrl: 'https://cdn.match-gg.kr/lol/lane_icons/MID.png',
  },
  {
    value: 'BOTTOM',
    label: '원딜',
    imageUrl: 'https://cdn.match-gg.kr/lol/lane_icons/ADC.png',
  },
  {
    value: 'UTILITY',
    label: '서포터',
    imageUrl: 'https://cdn.match-gg.kr/lol/lane_icons/SUP.png',
  },
];

export const expiredTimeList = [
  { value: 'FIFTEEN_M', label: '15분', time: 15 * 60 * 1000 },
  { value: 'THIRTY_M', label: '30분', time: 30 * 60 * 1000 },
  { value: 'ONE_H', label: '1시간', time: 60 * 60 * 1000 },
  { value: 'TWO_H', label: '2시간', time: 2 * 60 * 60 * 1000 },
  { value: 'THREE_H', label: '3시간', time: 3 * 60 * 60 * 1000 },
  { value: 'SIX_H', label: '6시간', time: 6 * 60 * 60 * 1000 },
  { value: 'TWELVE_H', label: '12시간', time: 12 * 60 * 60 * 1000 },
  { value: 'TWENTY_FOUR_H', label: '24시간', time: 24 * 60 * 60 * 1000 },
];
