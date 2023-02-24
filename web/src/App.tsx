import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react';

function App() {
  const { i18n } = useTranslation();

  const lang = navigator.language.startsWith('pt') ? 'pt' : 'en';

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [i18n, lang]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/register`} element={<Register lang={lang} />} />
        <Route path={`/login`} element={<Login lang={lang} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
