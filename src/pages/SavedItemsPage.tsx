import { Footer } from "@components"
import { FaBookmark } from "react-icons/fa"
import { NavLink, Outlet } from "react-router-dom"

export const SavedItemsPage: React.FC = () => {
  return <><section className="grid lg:grid-cols-[1fr_2fr_1fr] md:grid-cols-[1fr_2fr] gap-4 lg:gap-8 grid-cols-1 pt-20 mx-auto w-full xl:max-w-[70%] max-w-[98%]">
    <div className="bg-white border-[1px] h-[10.3rem] text-[#666] rounded-lg">
      <div className="flex gap-2 items-center px-3 border-b-[1px] py-2">
        <FaBookmark />
        My items
      </div>
      <NavLink
        to="posted-jobs"
        className={({ isActive }) =>
          `block px-3 py-2 border-b-[1px] ${isActive ? "text-[#0A66C2] border-l-[4px] border-l-[#0A66C2]" : ""}`
        }
      >
        Posted Jobs
      </NavLink>
      <NavLink
        to="saved-jobs"
        className={({ isActive }) =>
          `block px-3 py-2 border-b-[1px] ${isActive ? "text-[#0A66C2] border-l-[4px] border-l-[#0A66C2]" : ""}`
        }
      >
        Saved Jobs
      </NavLink>
      <NavLink
        to="saved-posts"
        className={({ isActive }) =>
          `block px-3 py-2 ${isActive ? "text-[#0A66C2] border-l-[4px] border-l-[#0A66C2]" : ""}`
        }
      >
        Saved posts and articles
      </NavLink>
    </div>

    <Outlet />

  </section>
    <Footer />
  </>
}