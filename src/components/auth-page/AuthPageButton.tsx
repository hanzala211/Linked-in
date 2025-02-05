import { useAuth } from "@context"


export const AuthPageButton: React.FC<{ text: string }> = ({ text }) => {
    const { isLoading } = useAuth()
    return <button type="submit" disabled={isLoading} className="w-full py-3 hover:bg-[#004182] transition-all duration-200 text-[18px] rounded-full bg-[#0A66C2] text-white">{text}</button>
}