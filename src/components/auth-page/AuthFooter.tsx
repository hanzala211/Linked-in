import { IoLogoLinkedin } from "react-icons/io"

export const AuthFooter: React.FC = () => {
    const footerItems: string[] = ["User Agreement", "Privacy Policy", "Community Guidelines", "Cookie Policy", "Copyright Policy", "Send Feedback"]

    return <footer className="flex w-full flex-wrap items-center gap-2 justify-center">
        <h1 className="flex items-center font-semibold">Linked<IoLogoLinkedin className="text-[25px]    " /></h1>
        <p className="text-[#666] text-[13px]">© 2025</p>
        {footerItems.map((item: string, index: number) => (
            <p key={index} className="text-[#666666] hover:underline transition-all duration-200 text-[13px] cursor-pointer">{item}</p>
        ))}
    </footer>
}