import { IoLogoLinkedin } from "react-icons/io"

export const Loader: React.FC = () => {
  return <div className="flex flex-col gap-2 items-center justify-center h-[45dvh]">
    <h1 className="flex items-center text-[35px] font-bold text-[#0A66C2]">Linked<IoLogoLinkedin className="text-[50px]" /></h1>
    <div className="relative h-1 w-[10rem] bg-gray-200 overflow-hidden rounded">
      <div className="absolute h-full w-[5rem] bg-blue-500 animate-slide"></div>
    </div>
  </div>
}