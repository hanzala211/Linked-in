import { DEFAULT_PIC } from "@assets"
import { useAuth, usePost } from "@context"
import { FaImage } from "react-icons/fa"
import { RiPagesLine, RiVideoFill } from "react-icons/ri"

export const CreatePostFeed: React.FC = () => {
  const { userData } = useAuth()
  const { setIsPostCreatorOpen, setIsImageCreatorOpen } = usePost()

  const createPosts = [
    {
      icon: <FaImage className="text-[#378FE9] text-[20px]" />,
      text: "Photo",
      onClick: () => setIsImageCreatorOpen(true)
    },
    {
      icon: <RiVideoFill className="text-[#5F9B41] text-[22px]" />,
      text: "Video",
      onClick: () => setIsImageCreatorOpen(true)
    },
    {
      icon: <RiPagesLine className="text-[#E06847] text-[22px]" />,
      text: "Write Article",
      onClick: () => setIsPostCreatorOpen(true)

    },
  ]

  return <div className="bg-white flex flex-col gap-3 py-2 px-4 border-[1px] rounded-lg border-[#DFDEDA]" >
    <div className="flex gap-4 items-center w-full">
      <img src={userData?.profilePic || DEFAULT_PIC} className="rounded-full w-12 h-12" alt="User" />
      <button onClick={() => setIsPostCreatorOpen(true)} className="px-6 hover:bg-[#F3F3F3] transition-all duration-200 py-3 border-[1px] text-left font-medium text-[15px] border-[#B2B2B2] w-full rounded-full">Start a Post</button>
    </div>
    <div className="w-full flex justify-between max-w-[95%] md:max-w-[90%] mx-auto">
      {createPosts.map((item, index) => (
        <button onClick={item.onClick} key={index} className="flex items-center gap-3 hover:bg-[#F3F3F3] px-2 py-3 rounded-md">
          {item.icon}
          <h1 className="font-medium text-[15px] text-[#404040]">{item.text}</h1>
        </button>
      ))}
    </div>
  </div>
}