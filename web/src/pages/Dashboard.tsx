import { useTranslation } from 'react-i18next'

function Dashboard() {
    const { t } = useTranslation()

    return (
        <div className="py-12 flex flex-col w-5/6">
            <div className="py-8 w-full flex flex-col justify-center items-center gap-4" >
                <h1 className="text-violet-500 font-bold text-6xl">{t('title')}</h1>
                <h4 className="text-white font-bold text-3xl">{t('slogan')}</h4>
            </div>
        </div>
    )
}

export default Dashboard
