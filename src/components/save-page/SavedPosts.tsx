import { DEFAULT_PIC, DotSVG } from "@assets"
import { useAuth, usePost } from "@context"
import { formatDate } from "@helpers"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { IoBookmark, IoBookmarkOutline, IoEarth } from "react-icons/io5"
import { Link } from "react-router-dom"

export const SavedPosts: React.FC = () => {
  const { userData } = useAuth()
  const { savedPosts, savePost, unSavePost } = usePost()

  const handleSave = (id?: string) => {
    if (userData?.savedPosts.includes(id || "")) {
      unSavePost(id || "")
    } else {
      savePost(id || "")
    }
  }

  return <>
    <div className="bg-white border-[1px] rounded-lg">
      <h1 className="text-[24px] p-5 border-b-[1px]">Saved Posts</h1>
      <div className="p-5 flex flex-col gap-2">
        {savedPosts.length > 0 ? savedPosts.map((item, index, arr) => (
          <div key={index} className={`${index !== arr.length - 1 ? "border-b-[1px]" : ""}`}>
            <div className="flex justify-between items-start">
              <Link to={`/${item.postBy.userName}`} className="flex gap-2 items-start">
                <img src={item.postBy.profilePic || DEFAULT_PIC} alt="Test Img" className="rounded-full w-12 h-12" />
                <div className="space-y-0.5">
                  <h1 className="hover:underline font-semibold">{item.postBy.firstName} {item.postBy.lastName}</h1>
                  <p className="text-[#666] text-[14px]">headline</p>
                  <p className="flex gap-1 items-center text-[#666] text-[11px]">{formatDate(item.createdAt)} •<IoEarth /></p>
                </div>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger className="hover:bg-gray-100 transition-all duration-200 text-[25px] p-2 rounded-full">
                  <DotSVG />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white shadow-md rounded-md border-[1px] hover:bg-gray-100 transition-all duration-200 mt-5 lg:mt-2 mr-10 lg:mr-56 p-2 w-60">
                  <DropdownMenuItem onClick={() => handleSave(item._id)} className="cursor-pointer flex items-center gap-2 p-2 rounded-md outline-none">
                    <span>{userData?.savedPosts.includes(item._id) ? <IoBookmark /> : <IoBookmarkOutline />}</span>{userData?.savedPosts.includes(item._id) ? "Unsave" : "Save"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="p-5">
              {item.isArticle ? <Link to={`/${item.postBy.userName}/update/urn:li:activity/${item._id}`} className="bg-[#EDF3F8] block px-4 py-5 rounded-lg w-52">
                <h1 className="text-[14px]">{item.title}</h1>
                <div
                  className="text-[12px] text-[#666]"
                  dangerouslySetInnerHTML={{ __html: item.articleContent || "" }}
                />
              </Link> :
                <Link to={`/${item.postBy.userName}/update/urn:li:activity/${item._id}`} className="flex gap-3">
                  <img src={item.imageUrls[0]} alt="Test Img" className="w-24 h-24 rounded-md object-cover" />
                  <p className="max-w-md text-[13px] text-[#666]">{item.caption}</p>
                </Link>
              }
            </div>
          </div>
        ))
          : <h1 className="flex mt-2 justify-center">You have not saved any post yet.</h1>}
      </div>
    </div>
    <div className="bg-white h-fit lg:block hidden rounded-lg border-[1px]">
      <Link to="/jobs"><img src="/images/jobImg.png" alt="Jobs Page" className="rounded-lg h-fit" /></Link>
    </div>
  </>
}