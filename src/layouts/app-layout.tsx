import { AddBanner, AddImage, EditEducation, EditPosition, EditProfile, ImageCreator, Nav, NetworkModel, PostCreator } from "@components"
import { useSearch } from "@context"
import { Outlet } from "react-router-dom"

export const AppLayout: React.FC = () => {
  const { isFocused } = useSearch()

  return <>
    <Nav />
    <div className={`${isFocused ? "overlay z-10" : ""}`}></div>
    <Outlet />
    <PostCreator />
    <ImageCreator />
    <EditProfile />
    <AddImage />
    <AddBanner />
    <EditPosition />
    <EditEducation />
    <NetworkModel />
  </>
}