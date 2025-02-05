import { IoMdClose } from "react-icons/io"

export const EditHead: React.FC<{ heading: string, handleClose: () => void }> = ({ heading, handleClose }) => {
  return <div className="p-3 flex justify-between items-center border-b-[1px]">
    <h1 className="text-[20px]">{heading}</h1>
    <button className="text-[25px] p-1.5 rounded-full hover:bg-gray-200 transition-all duration-200" onClick={handleClose}><IoMdClose /></button>
  </div>
}