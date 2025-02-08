import { DEFAULT_PIC, HomeSVG, JobSVG, MessageSVG, NetworkSVG } from "@assets"
import { IoLogoLinkedin } from "react-icons/io"
import { IoSearchOutline } from "react-icons/io5"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { useAuth, useSearch } from "@context"
import { useEffect, useRef, useState } from "react"
import { SearchBox } from "@components"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { FaSortDown } from "react-icons/fa"


export const Nav: React.FC = () => {
  const { searchValue, setSearchValue, setIsFocused, isFocused, searchData } = useSearch()
  const { userData, setIsMainPageLoading } = useAuth()
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const searchIconRef = useRef<HTMLSpanElement | null>(null)
  const searchInputRef = useRef<HTMLInputElement | null>(null)
  const navigate = useNavigate()

  const navLinks = [
    {
      NavIcon: HomeSVG,
      navLink: "/feed",
      text: "Home"
    },
    {
      NavIcon: NetworkSVG,
      navLink: "/mynetwork",
      text: "My Network"
    },
    {
      NavIcon: JobSVG,
      navLink: "/jobs",
      text: "Jobs"
    },
    {
      NavIcon: MessageSVG,
      navLink: "/messaging",
      text: "Messaging"
    },
  ]

  useEffect(() => {
    window.addEventListener("click", handleClickOutside)
    return () => window.removeEventListener("click", handleClickOutside)
  }, [])

  function handleClickOutside(event: MouseEvent) {
    if (searchInputRef.current && searchIconRef.current && !searchInputRef.current.contains(event.target as Node) && !searchIconRef.current.contains(event.target as Node)) {
      setIsExpanded(false);
      setIsFocused(false)
    }
  }

  const handleExpansion = () => {
    if (window.innerWidth < 1024) {
      setIsExpanded(true)
      setIsFocused(true)
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem("token")
    setIsMainPageLoading(true)
    navigate("/login")
    location.reload()
  }

  return <nav className="flex bg-white items-center w-full justify-evenly fixed z-20 lg:pt-2 pt-1 lg:pb-[2px] border-b-[1px]">

    <div className="flex items-center sm:w-[40%] w-[40%] xl:w-[27%]">
      <IoLogoLinkedin className="text-[50px] text-[#0A66C2]" />
      <div className="relative lg:w-full w-full">
        <span ref={searchIconRef} onClick={handleExpansion}>
          <IoSearchOutline className={`absolute z-10 top-1/2 -translate-y-1/2 left-2 ${isExpanded ? "absolute top-1/2 -translate-y-1/2 left-2 z-20" : ""} text-[20px] text-gray-500 lg:text-black hover:text-black cursor-pointer lg:cursor-auto transition-all duration-200`} />
        </span>
        <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} onFocus={() => setIsFocused(true)} ref={searchInputRef} type="text" className={`lg:border-[2px] border-[#EDF3F8] lg:px-7 py-1 placeholder:text-gray-500 lg:w-72 w-0 focus-within:border-black lg:focus-within:pl-10 lg:focus-within:w-96 rounded-md lg:transition-all lg:duration-200 bg-[#EDF3F8] outline-none ${isExpanded ? "absolute w-[90vw] sm:w-[82vw] z-10 top-1/2 -translate-y-1/2 border-black py-2.5 border-[2px] px-9" : "absolute lg:relative"}`} placeholder="Search" />
        {isFocused && searchData.length > 0 && <SearchBox />}
      </div>
    </div>

    <div className="flex gap-5 xl:space-x-4 lg:space-x-1 space-x-1.5 justify-center sm:space-x-3 sm:w-[40%] w-full xl:w-[30%]">
      {navLinks.map((item, index) => (
        <NavLink
          key={index} className={({ isActive }) =>
            `flex flex-col group items-center relative before:content-[''] before:absolute lg:before:bottom-[-5px] before:bottom-[-10px] before:h-[2px] before:rounded-full before:bg-black before:left-1/2 before:-translate-x-1/2 before:transition-all before:duration-200 ${isActive ? "md:before:w-20 before:w-14" : "before:w-0"
            }`
          } to={item.navLink} >
          {({ isActive }) => (<>
            <item.NavIcon
              className={`${isActive ? "text-black" : "text-gray-500"
                } group-hover:text-black transition-all duration-200`}
            />
            <p className={`${isActive ? "text-black" : "text-gray-500"
              } group-hover:text-black text-[13px] lg:block hidden transition-all duration-200`}>
              {item.text}
            </p>
          </>
          )}
        </NavLink>
      ))}
      <DropdownMenu>
        <DropdownMenuTrigger className="flex outline-none flex-col items-center group">
          <img src={userData?.profilePic || DEFAULT_PIC} alt="User Profile" className="w-7 h-7 rounded-full" />
          <p className="text-gray-500 group-hover:text-black text-[13px] lg:flex hidden transition-all duration-200">
            Me <FaSortDown />
          </p>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white shadow-md rounded-md mt-5 lg:mt-2 mr-10 lg:mr-56 p-2 w-60">
          <DropdownMenuItem className="cursor-pointer border-b-[1px] p-2 rounded-md outline-none">
            <Link to={`/${userData?.userName}`}>
              <div className="flex gap-3 items-center">
                <img src={userData?.profilePic || DEFAULT_PIC} alt="User Profile" className="w-8 h-8 rounded-full" />
                <div>
                  <h1 className="font-semibold">{userData?.firstName} {userData?.lastName}</h1>
                  <p className="text-[#666] text-[14px] line-clamp-1">{userData?.headline}</p>
                </div>
              </div>
              <button className="w-full text-[#0A66C2] hover:bg-[#EBF4FD] border-[1px] rounded-full transition-all duration-200 mt-5 border-[#0A66C2]">View Profile</button>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-[#666] text-[14px] px-4 mt-4 cursor-pointer outline-none"><button>Settings & Privacy</button></DropdownMenuItem>
          <DropdownMenuItem className="text-[#666] text-[14px] px-4 mt-4 cursor-pointer outline-none"><button>Help</button></DropdownMenuItem>
          <DropdownMenuItem className="text-[#666] text-[14px] px-4 mt-4 cursor-pointer outline-none"><button onClick={handleSignOut}>Sign Out</button></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </nav >
}