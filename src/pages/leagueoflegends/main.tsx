/* eslint-disable react/button-has-type */
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// mui
import { styled } from '@mui/system';
import MuiPagination from '@mui/material/Pagination';
import { SelectChangeEvent } from '@mui/material/Select';

import Layout from 'components/Layout';
import ErrorFallback from 'components/errorFallback/ErrorFallback';
import Circular from 'components/loading/Circular';
import { RootState } from 'store';
import { cardActions } from 'store/card-slice';
import CardFilter from './CardFilter';
import CardListFetcher from './CardListFetcher';
import CardListContainer from './CardListContainer';

const Main = () => {
  const dispatch = useDispatch();

  const [queueType, setQueueType] = React.useState('ALL');
  const [tier, setTier] = React.useState('ALL');
  const [lane, setLane] = React.useState<string>('ALL');

  const { totalPage, currentPage } = useSelector(
    (state: RootState) => state.card,
  );

  const handleQueueType = (event: SelectChangeEvent) => {
    if (event.target.value === 'ARAM') {
      setTier('ALL');
      setLane('ALL');
    }

    dispatch(cardActions.SET_CURRENT_PAGE(0));
    setQueueType(event.target.value);
  };

  const handleTier = (event: SelectChangeEvent) => {
    dispatch(cardActions.SET_CURRENT_PAGE(0));
    setTier(event.target.value);
  };

  const handleLane = (
    event: React.MouseEvent<HTMLElement>,
    newLane: string,
  ) => {
    if (newLane !== null) {
      dispatch(cardActions.SET_CURRENT_PAGE(0));
      setLane(() => {
        return newLane;
      });
    }
  };

  const handlePage = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(cardActions.SET_CURRENT_PAGE(value - 1));
    window.scrollTo(0, 0);
  };

  const filterProps = {
    queueType,
    handleQueueType,
    tier,
    handleTier,
    lane,
    handleLane,
  };

  const fetcherProps = {
    lane,
    queueType,
    tier,
  };

  return (
    <>
      <Layout currentGame="lol">
        <CardFilter filterProps={filterProps} />
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense
            fallback={
              <Circular text="게시글을 불러오는 중입니다." height="500px" />
            }
          >
            <CardListFetcher fetcherProps={fetcherProps}>
              <CardListContainer />
            </CardListFetcher>
          </Suspense>
        </ErrorBoundary>
        <Pagination
          count={totalPage}
          page={currentPage + 1}
          color="primary"
          onChange={handlePage}
        />
      </Layout>
      <Outlet />
    </>
  );
};

export default Main;

const Pagination = styled(MuiPagination)(() => ({
  margin: '20px 0 40px 0',
}));
