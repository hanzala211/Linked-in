import { DotSVG } from "@assets"
import { FeedIdentityModule } from "@components"
import { useAuth } from "@context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { MdDelete } from "react-icons/md"
import { Link } from "react-router-dom"

export const NotificationPage: React.FC = () => {
  const { userData } = useAuth()

  return <section className="grid lg:grid-cols-[1fr_2fr_1fr] md:grid-cols-[1fr_2fr] gap-5 lg:gap-0 grid-cols-1 pt-20 mx-auto w-full xl:max-w-[77%] max-w-[98%]">
    <div>
      <FeedIdentityModule data={userData} />
    </div>

    <div className="bg-white border-[1px] rounded-lg w-full max-w-[98%] border-gray-300">
      <div className="p-3 flex justify-between hover:bg-gray-200 rounded-t-lg border-b-[1px] cursor-pointer">
        <div className="flex items-center gap-2">
          <img src="/images/userTest.jpeg" alt="Test Img" className="w-12" />
          <p className="text-[14px]">Notification Text</p>
        </div>
        <div className="flex items-center flex-col ">
          <p className="text-[13px] text-[#666]">2h</p>
          <DropdownMenu>
            <DropdownMenuTrigger className="hover:bg-gray-100 p-2 rounded-full outline-none"><DotSVG /></DropdownMenuTrigger>
            <DropdownMenuContent className="w-60 md:-translate-x-24 -translate-x-10 translate-y-2 rounded-lg border-[1px] bg-white outline-none z-50">
              <DropdownMenuItem className="flex rounded-lg items-center gap-2 text-[17px] text-gray-700 hover:text-black transition-all duration-200 hover:bg-gray-100 outline-none cursor-pointer p-2"><MdDelete /> Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>

    <div className="bg-white h-fit lg:block hidden rounded-lg border-[1px] max-w-[70%]">
      <Link to="/jobs"><img src="/images/jobImg.png" alt="Jobs Page" className="rounded-lg h-fit" /></Link>
    </div>
  </section>
}