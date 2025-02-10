import { DEFAULT_PIC } from "@assets"
import { useProfile, useSearch } from "@context"
import { IoSearchOutline } from "react-icons/io5"
import { Link } from "react-router-dom"

export const SearchBox: React.FC = () => {
  const { handleClick } = useProfile()
  const { searchData } = useSearch()

  return <div className="fixed bg-white rounded-lg border-[1px] lg:w-96 sm:w-[82vw] w-[90vw] h-fit top-14 lg:top-auto">
    {searchData.map((item, index) => (
      <Link to={`/${item.userName}`} key={index} onClick={() => handleClick(item)} className="py-2 flex gap-2 items-center px-4 justify-between hover:bg-gray-100 rounded-lg">
        <div className="flex gap-2 items-center">
          <IoSearchOutline className="text-[20px]" />
          <h1 className="font-semibold text-[#666]">{item.userName}</h1>
        </div>
        <img src={item.profilePic || DEFAULT_PIC} alt="Test User" className="w-10 h-10 rounded-full" />
      </Link>
    ))}
  </div>
}