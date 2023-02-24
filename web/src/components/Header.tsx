import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'
import Logout from './Logout'

function Header({ currentPage }: { currentPage: String }) {
    const { t } = useTranslation()

    return (
        <div className='w-full py-4 flex justify-between items-center px-8 h-16 bg-dark'>
            <div className="flex items-center gap-4">
                <Link to={"/"} className="text-white font-bold text-2xl" >{t('title')}</Link>
                <div className="pl-8 flex items-center gap-4">
                    <Link to={"/"} className={`${currentPage == "dashboard" ? "text-violet-500 font-bold" : "text-white font-medium"} text-xl cursor-pointer hover:text-violet-600`} >{t('pages.home')}</Link>
                </div>
            </div>
            <div className="flex items-center">
                <Logout />
            </div>
        </div >
    )
}

export default Header
