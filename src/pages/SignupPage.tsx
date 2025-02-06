import { IoLogoLinkedin } from "react-icons/io"
import { Link } from "react-router-dom"
import { AuthContainer, AuthFooter } from "@components"
import { useAuth } from "@context"
import { SubmitHandler } from "react-hook-form"
import { formScheemaSignup, FormScheemaSignup } from "@types"
import { useEffect } from "react"
import { titleChanger } from "@helpers"

export const SignupPage: React.FC = () => {
    const { signup, setErrorMessage } = useAuth()

    useEffect(() => {
        titleChanger("Signup")
    }, [])

    const onSubmit: SubmitHandler<FormScheemaSignup> = (e) => {
        signup(e)
    }

    const signupForm = [
        {
            name: "email",
            type: "email",
            text: "Email"
        },
        {
            name: "userName",
            type: "text",
            text: "Username"
        },
        {
            name: "password",
            type: "password",
            text: "Password"
        },
    ]
    return <>
        <div className="flex flex-col min-h-[92vh]">
            <nav className="md:mx-56 mx-5 my-16">
                <Link to="/login" className="flex w-fit items-center text-[#0A66C2] text-[32px] font-extrabold">
                    Linked<IoLogoLinkedin className="text-[42px]" />
                </Link>
            </nav>
            <section className="flex flex-col gap-10 items-center justify-center my-20">
                <AuthContainer<FormScheemaSignup> text="By clicking Agree & Join or Continue, you agree to the LinkedIn User Agreement, Privacy Policy, and Cookie Policy." className="bg-white" authInputForm={signupForm} onSubmit={onSubmit} authBtnText="Sign up" formSchema={formScheemaSignup} linkText={null} />
                <div className="flex gap-2 items-center">
                    <p>Already on LinkedIn?</p>
                    <Link to="/login" onClick={() => setErrorMessage("")} className="text-[#0A66C2] font-medium hover:underline text-[17px] hover:bg-[#D0E8FF] transition-all duration-200 py-1 px-1.5 rounded-full">Sign in</Link>
                </div>
            </section>
        </div>
        <AuthFooter />
    </>
}