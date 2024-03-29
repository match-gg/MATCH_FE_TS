import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { mypageActions } from 'store/mypage-slice';
import { RootState } from 'store';

import { getUserInfo } from 'apis/api/user';
import { fetchMemberHistory as getSummonerInfo } from 'apis/api/leagueoflegends';
import {
  fetchMemberHistory as getPubgPlayerInfo,
  getPlatform,
} from 'apis/api/pubg';
import { fetchMemberHistory as getOWPlayerInfo } from 'apis/api/overwatch';
import { fetchMemberHistory } from 'apis/api/valorant';

interface UserInfoFetcherProps {
  children: React.ReactNode;
}

const UserInfoFetcher = ({ children }: UserInfoFetcherProps) => {
  const dispatch = useDispatch();

  const userInfo: any = getUserInfo();

  useEffect(() => {
    dispatch(mypageActions.SET_MYPAGE({ ...userInfo }));
  }, [userInfo, dispatch]);

  const { games } = useSelector((state: RootState) => state.user);

  const {
    refreshLolInfo,
    refreshPubgInfo,
    refreshOverwatchInfo,
    refreshValorantInfo,
  } = useSelector((state: RootState) => state.mypage);

  // lol update
  useEffect(() => {
    const getLolData = async () => {
      const duoRankInfo = await getSummonerInfo(games.lol, 'DUO_RANK');
      const freeRankInfo = await getSummonerInfo(games.lol, 'FREE_RANK');
      dispatch(mypageActions.SET_LOLINFO({ duoRankInfo, freeRankInfo }));
    };

    if (games.lol) {
      getLolData();
    }
  }, [games.lol, refreshLolInfo]);

  // pubg update
  useEffect(() => {
    const getPubgData = async () => {
      const platform = await getPlatform(games.pubg);
      const duoInfo = await getPubgPlayerInfo(games.pubg, platform, 'DUO');
      const squadInfo = await getPubgPlayerInfo(games.pubg, platform, 'SQUAD');
      const rankedSquadInfo = await getPubgPlayerInfo(
        games.pubg,
        platform,
        'RANKED_SQUAD',
      );
      dispatch(
        mypageActions.SET_PUBGINFO({ duoInfo, squadInfo, rankedSquadInfo }),
      );
    };

    if (games.pubg) {
      getPubgData();
    }
  }, [games.pubg, refreshPubgInfo]);

  // overwatch update
  useEffect(() => {
    const getOverwatchData = async () => {
      const rankInfo = await getOWPlayerInfo(games.overwatch, 'RANKED');
      const normalInfo = await getOWPlayerInfo(games.overwatch, 'NORMAL');
      dispatch(mypageActions.SET_OVERWATCHINFO({ rankInfo, normalInfo }));
    };

    if (games.overwatch) {
      getOverwatchData();
    }
  }, [games.overwatch, refreshOverwatchInfo]);

  // valorant update
  useEffect(() => {
    const getValorantData = async () => {
      const rankInfo = await fetchMemberHistory(games.valorant, 'COMPETITIVE');
      const normalInfo = await fetchMemberHistory(games.valorant, 'STANDARD');
      dispatch(mypageActions.SET_VALORANTINFO({ rankInfo, normalInfo }));
    };

    if (games.lol) {
      getValorantData();
    }
  }, [games.valorant, refreshValorantInfo]);

  return <div>{children}</div>;
};

export default UserInfoFetcher;
