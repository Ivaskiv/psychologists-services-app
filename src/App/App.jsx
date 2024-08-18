//App.jsx
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { fetchAllPsychologists } from '../../src/redux/psychologitsts/psychologistsOperation.js';

const Home = lazy(() => import('../../src/pages/home/Home.jsx'));
const Header = lazy(() => import('../../src/pages/header/Header.jsx'));
const Psychologists = lazy(() => import('../../src/pages/psychologists/Psychologists.jsx'));
const Favorites = lazy(() => import('../../src/pages/favorites/Favorites.jsx'));

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllPsychologists());
  }, [dispatch]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/psychologists" element={<Psychologists />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={1000} hideProgressBar={true} theme="light" />
    </Suspense>
  );
};

export default App;
