import { IoLogoLinkedin } from "react-icons/io"
import { Link } from "react-router-dom"
import { AuthContainer, AuthFooter } from "@components"
import { useAuth } from "@context"
import { SubmitHandler } from "react-hook-form"
import { FormScheemaName, formScheemaName } from "@types"
import { useEffect } from "react"
import { titleChanger } from "@helpers"

export const UpdateNamePage: React.FC = () => {
  const { updateName } = useAuth()

  useEffect(() => {
    titleChanger("Update")
  }, [])


  const onSubmit: SubmitHandler<FormScheemaName> = (e) => {
    updateName(e)
  }

  const userNameForm = [
    {
      name: "firstName",
      type: "text",
      text: "First Name"
    },
    {
      name: "lastName",
      type: "text",
      text: "Last Name"
    }
  ]

  return <>
    <div className="flex flex-col min-h-[92vh]">
      <nav className="md:mx-56 mx-5 my-16">
        <Link to="/login" className="flex w-fit items-center text-[#0A66C2] text-[32px] font-extrabold">
          Linked<IoLogoLinkedin className="text-[42px]" />
        </Link>
      </nav>
      <section className="flex flex-col gap-10 items-center justify-center my-20">
        <AuthContainer<FormScheemaName> text="By clicking Agree & Join or Continue, you agree to the LinkedIn User Agreement, Privacy Policy, and Cookie Policy." className="bg-white" authInputForm={userNameForm} onSubmit={onSubmit} authBtnText="Apply & Join" linkText={null} formSchema={formScheemaName} />
      </section>
    </div>
    <AuthFooter />
  </>
} 