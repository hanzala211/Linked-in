import { FaPlus } from "react-icons/fa"
import { FaArrowRightLong } from "react-icons/fa6"
import { Link } from "react-router-dom"

export const FeedSuggestions: React.FC<{ className?: string }> = ({ className }) => {

  const feedUsers = [
    {
      heading: "Bill Gates",
      description: "Company • Non-profit Organizations.",
      img: "images/userTest.jpeg"
    },
    {
      heading: "Bill Gates",
      description: "Company • Non-profit Organizations.",
      img: "images/userTest.jpeg"
    },
    {
      heading: "Bill Gates",
      description: "Company • Non-profit Organizations.",
      img: "images/userTest.jpeg"
    },
  ]

  return <div className={`bg-white flex flex-col border-[1px] px-4 py-3 gap-3 rounded-lg ${className}`}>
    <h1 className="font-semibold text-[15px]">Add to your feed</h1>
    {feedUsers.map((item, index) => (
      <div key={index}>
        <Link to="#" className="flex gap-2">
          <img src={item.img} className="rounded-full w-12 h-12" alt="User" />
          <div className="flex flex-col gap-0.5">
            <h1 className="hover:underline">{item.heading}</h1>
            <p className="text-[#666666] text-[12px]">{item.description}</p>
          </div>
        </Link>
        <button className="mx-12 flex gap-2 items-center hover:bg-[#F3F3F3] hover:outline hover:outline-1 outline-black mt-2 px-2 border-[1px] border-black rounded-full text-[14px] py-1">
          <FaPlus /> Follow
        </button>
      </div>
    ))}
    <Link to="/mynetwork" className="flex gap-2 items-center text-[#666] text-[14px] hover:bg-gray-100 transition-all duration-200 px-2 py-1 rounded-lg w-fit">View all recommendations <FaArrowRightLong /></Link>
  </div>
}