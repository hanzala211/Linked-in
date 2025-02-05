import { HiOutlinePlusSmall } from "react-icons/hi2"

interface EditButtonProps {
  heading: string,
  btnText: string,
  onClick?: () => void,
  type: "submit" | "reset" | "button"
}

export const EditButton: React.FC<EditButtonProps> = ({ heading, btnText, onClick, type }) => {
  return <div className="flex flex-col gap-4">
    <h2 className="text-[18px]">{heading}</h2>
    <button type={type} onClick={onClick} className="w-fit flex items-center gap-2 text-[#0A66C2] hover:bg-[#EBF4FD] hover:text-[#004182] p-1 transition-all duration-200"><HiOutlinePlusSmall className="text-[20px]" />{btnText}</button>
  </div>
}