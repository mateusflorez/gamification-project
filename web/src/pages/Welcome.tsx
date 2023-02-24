import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer, ToastOptions } from "react-toastify"
import { updateUserRoute } from "../utils/APIRoutes"
import { useTranslation } from "react-i18next"
import axios from "axios"
import "react-toastify/dist/ReactToastify.css"

function Welcome() {
    const [currentUser, setCurrentUser] = useState<any>()
    const [profession, setProfession] = useState("")

    const { t } = useTranslation()
    const navigate = useNavigate()

    const toastOptions: ToastOptions = {
        position: 'bottom-right',
        autoClose: 5000,
        pauseOnHover: true,
        theme: 'dark'
    }

    useEffect(() => {
        const checkCurrentUser = async () => {
            const user = localStorage.getItem('user')
            if (!user) {
                navigate('/login')
            } else {
                setCurrentUser(await JSON.parse(user).user)
            }
        }
        checkCurrentUser()
    }, [])

    useEffect(() => {
        const getAllUsers = async () => {
            if (currentUser) {
                if (currentUser.profession !== "") {
                    navigate('/dashboard')
                }
            }
        }
        getAllUsers()
    }, [currentUser])

    function handleChange(e: any) {
        setProfession(e.target.value)
    }

    async function handleSubmit(e: any) {
        e.preventDefault()
        if (handleValidation()) {
            const request = await axios.put(`${updateUserRoute}/${currentUser.id}`, {
                "user": {
                    "profession": profession
                }
            })
            localStorage.setItem('user', JSON.stringify(request.data.user))
            navigate("/")
        }
    }

    function handleValidation() {
        if (profession === "") {
            toast.error(`${t('validation.noprofession')}`, toastOptions)
            return false
        }
        return true
    }

    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center bg-dark">
            <div className="flex flex-col justify-center items-center gap-6 px-60">
                <h1 className="text-white font-bold text-5xl">{t("welcome.title")}<span className='bg-rainbow-gradient text-transparent bg-clip-text'>{currentUser?.username}</span></h1>
                <h1 className="text-white text-center font-bold text-xl">{t("welcome.text1")}</h1>
                <h1 className="text-white text-center font-bold text-xl">{t("welcome.text2")}</h1>
            </div>
            <form
                className="flex flex-col gap-8 rounded-t-lg bg-dark py-12 px-20"
                onSubmit={(e) => {
                    handleSubmit(e)
                }}
            >
                <input
                    type="text"
                    placeholder={`${t("userAuthForm.profession")}`}
                    name="profession"
                    value={profession}
                    className="placeholder:text-zinc-600 text-white bg-zinc-900 p-4 rounded w-full h-14 focus:outline-none focus:bg-zinc-600 transition"
                    onChange={e => handleChange(e)}
                />
                <button
                    type="submit"
                    className="bg-violet-500 rounded font-bold text-white py-4 px-8 border-none cursor-pointer transition hover:bg-violet-600"
                >
                    {t("buttons.save")}
                </button>
            </form>
            <ToastContainer></ToastContainer>
        </div>
    )
}

export default Welcome
