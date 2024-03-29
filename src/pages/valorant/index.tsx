import { useLocation, Route, Routes } from 'react-router-dom';

import Review from 'components/Review';
import Main from './main';
import CreateCard from './CreateCard';
import CardDetail from './CardDetail';
import EditCard from './EditCard';

const Valorant = () => {
  const location = useLocation();
  const background = '/valorant';

  return (
    <>
      <Routes location={background}>
        <Route path="/*" element={<Main />}>
          <Route path="new" element={<CreateCard />} />
          <Route path=":id" element={<CardDetail />} />
          <Route path=":id/edit" element={<EditCard />} />
          <Route path=":id/review" element={<Review />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route path="new" element={<CreateCard />} />
          <Route path=":id" element={<CardDetail />} />
          <Route path=":id/edit" element={<EditCard />} />
          <Route path=":id/review" element={<Review />} />
        </Routes>
      )}
    </>
  );
};

export default Valorant;
