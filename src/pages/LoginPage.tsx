import { IoLogoLinkedin } from "react-icons/io"
import { Link } from "react-router-dom"
import { AuthContainer, AuthFooter } from "@components"
import { useAuth } from "@context"
import { FormScheemaLogin, formScheemaLogin } from "@types"
import { SubmitHandler } from "react-hook-form"
import { useEffect } from "react"
import { titleChanger } from "@helpers"

export const LoginPage: React.FC = () => {
    const { login, setErrorMessage } = useAuth()


    useEffect(() => {
        titleChanger("Login")
    }, [])

    const onSubmit: SubmitHandler<FormScheemaLogin> = (e) => {
        login(e)
    }

    const signInInput = [
        {
            name: "email",
            type: "email",
            text: "Email"
        },
        {
            name: "password",
            type: "password",
            text: "Password"
        },
    ]
    return <div className="min-h-screen bg-white flex flex-col justify-around">
        <nav className="md:mx-12 mx-5">
            <Link to="/login" className="flex w-fit items-center text-[#0A66C2] text-[26px] font-extrabold">
                Linked<IoLogoLinkedin className="text-[35px]" />
            </Link>
        </nav>
        <section className="flex flex-col gap-10 items-center justify-center my-20">
            <AuthContainer<FormScheemaLogin> className="" authInputForm={signInInput} onSubmit={onSubmit} authBtnText="Sign in" linkText="Forgot Password?" text={null} formSchema={formScheemaLogin} />
            <div className="flex gap-2 items-center">
                <p>New to LinkedIn?</p>
                <Link to="/signup" onClick={() => setErrorMessage("")} className="text-[#0A66C2] font-medium hover:underline text-[17px]  hover:bg-[#D0E8FF] transition-all duration-200 py-1 px-1.5 rounded-full">Join now</Link>
            </div>
        </section>
        <AuthFooter />
    </div>
} 