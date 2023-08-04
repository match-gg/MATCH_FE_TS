import React from 'react';
import { useLocation, Route, Routes } from 'react-router-dom';

import Main from './main';
import CardDetail from './CardDetail';
import CreateCard from './CreateCard';
import EditCard from './EditCard';

const Overwatch = () => {
  const location = useLocation();
  const background = '/overwatch';

  return (
    <>
      <Routes location={background}>
        <Route path="/*" element={<Main />}>
          <Route path="new" element={<CreateCard />} />
          <Route path=":id" element={<CardDetail />} />
          <Route path=":id/edit" element={<EditCard />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route path="new" element={<CreateCard />} />
          <Route path=":id" element={<CardDetail />} />
          <Route path=":id/edit" element={<EditCard />} />
        </Routes>
      )}
    </>
  );
};

export default Overwatch;
