import { useProfile } from "@context"
import { SyncLoader } from "react-spinners"

export const EditFooter: React.FC<{ type?: "submit" | "reset" | "button" }> = ({ type }) => {
  const { isEditProfileLoading } = useProfile()

  return <div className="py-5 w-full relative flex p-3 border-t-[1px] justify-end border-gray-300">
    <button type={type} disabled={isEditProfileLoading} className="bg-[#0A66C2] text-white px-4 py-1 rounded-full hover:bg-opacity-70 transition-all duration-200"> {isEditProfileLoading ? <SyncLoader color="white" size={10} /> : "Save"}</button>
  </div>
}