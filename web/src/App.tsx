import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Welcome from './pages/Welcome'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react';
import Static from './pages/Static';

function App() {
  const { i18n } = useTranslation();

  const lang = navigator.language.startsWith('pt') ? 'pt' : 'en';

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [i18n, lang]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/register`} element={<Register />} />
        <Route path={`/login`} element={<Login />} />
        <Route path={`/welcome`} element={<Welcome />} />
        <Route path="/" element={<Static page="dashboard" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
