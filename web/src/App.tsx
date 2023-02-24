import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const urlLanguage = window.location.pathname.split('/')[1];

    if (urlLanguage) {
      changeLanguage(urlLanguage);
    }
  }, [])

  const changeLanguage = (language: any) => {
    i18n.changeLanguage(language);
  }

  const lang = i18n.language.startsWith('pt') ? 'pt' : 'en';

  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/${lang}/register`} element={<Register lang={lang} />} />
        <Route path={`/${lang}/login`} element={<Login lang={lang} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
