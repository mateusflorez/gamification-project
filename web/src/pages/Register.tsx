import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast, ToastContainer, ToastOptions } from "react-toastify"
import { registerRoute } from "../utils/APIRoutes"
import axios from "axios"
import "react-toastify/dist/ReactToastify.css"
import { useTranslation } from "react-i18next"

function Register() {
    const { t } = useTranslation()

    const toastOptions: ToastOptions = {
        position: 'bottom-right',
        autoClose: 5000,
        pauseOnHover: true,
        theme: 'dark'
    }

    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate("/")
        }
    })

    function handleChange(e: any) {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e: any) {
        e.preventDefault()
        if (handleValidation()) {
            const { password, username, email } = values
            const request = await axios.post(registerRoute, {
                username,
                email,
                password
            })
            if (request.data.status === false) {
                toast.error(`${t(request.data.message)}`, toastOptions)
            } else {
                localStorage.setItem('user', JSON.stringify(request.data.user))
                navigate("/")
            }
        }
    }

    function handleValidation() {
        const { password, confirmPassword, username, email } = values
        if (password !== confirmPassword) {
            toast.error(`${t('validation.passworddiff')}`, toastOptions)
            return false
        }
        if (username.length < 6) {
            toast.error(`${t('validation.smallusername')}`, toastOptions)
            return false
        }
        if (password.length < 8) {
            toast.error(`${t('validation.smallpassword')}`, toastOptions)
            return false
        }
        if (email === "") {
            toast.error(`${t('validation.noemail')}`, toastOptions)
            return false
        }
        return true
    }

    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center bg-dark">
            <div className="pt-1 bg-rainbow-gradient rounded-lg overflow-hidden">
                <form className="flex flex-col gap-8 rounded-t-lg bg-cloudy py-12 px-20" onSubmit={(e) => { handleSubmit(e) }}>
                    <div className="flex justify-center items-center gap-4">
                        <h1 className="text-white font-bold text-4xl">{t('title')}</h1>
                    </div>
                    <input type="text" placeholder={`${t('userAuthForm.username')}`} name="username" className="placeholder:text-zinc-600 text-white bg-zinc-900 p-4 rounded w-full h-14 focus:outline-none focus:bg-zinc-600 transition" onChange={e => handleChange(e)} />
                    <input type="email" placeholder={`${t('userAuthForm.email')}`} name="email" className="placeholder:text-zinc-600 text-white bg-zinc-900 p-4 rounded w-full h-14 focus:outline-none focus:bg-zinc-600 transition" onChange={e => handleChange(e)} />
                    <input type="password" placeholder={`${t('userAuthForm.password')}`} name="password" className="placeholder:text-zinc-600 text-white bg-zinc-900 p-4 rounded w-full h-14 focus:outline-none focus:bg-zinc-600 transition" onChange={e => handleChange(e)} />
                    <input type="password" placeholder={`${t('userAuthForm.confirmpassword')}`} name="confirmPassword" className="placeholder:text-zinc-600 text-white bg-zinc-900 p-4 rounded w-full h-14 focus:outline-none focus:bg-zinc-600 transition" onChange={e => handleChange(e)} />
                    <button type="submit" className="bg-violet-500 rounded font-bold text-white py-4 px-8 border-none cursor-pointer transition hover:bg-violet-600">{t('buttons.signup')}</button>
                    <span className="text-white">{t('userAuthForm.alreadyhave')} <Link to="/login" className="text-violet-500 hover:text-violet-600 font-bold no-underline">{t('buttons.login')}</Link></span>
                </form>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    )
}

export default Register
