import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { cardActions } from 'store/card-slice';
import { fetchCardList } from 'apis/api/battlegrounds';
import { RootState } from 'store';

interface CardListFetcherProps {
  fetcherProps: {
    platform: string;
    type: string;
    tier: string;
  };
  children: React.ReactNode;
}

const CardListFetcher = ({
  children,
  fetcherProps: { platform, type, tier },
}: CardListFetcherProps) => {
  const dispatch = useDispatch();

  const { currentPage } = useSelector((state: RootState) => state.card);

  const config = {
    params: {
      size: 12,
      page: currentPage || 0,
      platform,
      type,
      tier,
    },
  };

  const deps = [platform, type, tier, currentPage];

  const cardList: any = fetchCardList('/api/pubg/boards', config, deps);

  useEffect(() => {
    dispatch(cardActions.SET_TOTAL_PAGE(cardList?.totalPage));

    dispatch(
      cardActions.SET_CARDS({ game: 'pubg', cardList: cardList?.content }),
    );
  }, [cardList, dispatch]);

  return <div>{children}</div>;
};

export default CardListFetcher;