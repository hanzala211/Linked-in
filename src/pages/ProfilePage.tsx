import { useAuth, useSearch } from "@context"
import { useEffect } from "react"
import { titleChanger } from "@helpers"
import { FeedSuggestions, Footer, ProfileSection } from "@components"
import { FaLongArrowAltRight } from "react-icons/fa"
import { DEFAULT_EXPERIENCE_PIC } from "@assets"
import { useParams } from "react-router-dom"

export const ProfilePage: React.FC = () => {
  const { userData } = useAuth()
  const { selectedProfile, handleSearch, setSelectedProfile } = useSearch()
  const params = useParams()
  const isCurrentProfile = params.username === userData?.userName;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      if (params.username !== userData?.userName && selectedProfile === null) {
        try {
          const data = await handleSearch(signal, params.username);
          console.log(data);
          setSelectedProfile(data[0])
        } catch (error) {
          if (error.name !== "AbortError") {
            console.error("Fetch error:", error);
          }
        }
      }
    };
    fetchData();
    return () => controller.abort();
  }, [params.username, userData]);


  useEffect(() => {
    if (userData !== null) {
      titleChanger(`${userData?.firstName} ${userData?.lastName}`)
    }
  }, [])

  return <><section className="grid md:grid-cols-[2fr_1fr] grid-cols-1 pt-20 w-full xl:max-w-[70%] gap-6 md:max-w-[95%] max-w-full mx-auto">
    {/* First Column */}
    <div className="w-full flex flex-col gap-4">
      <ProfileSection isCurrentProfile={isCurrentProfile} />

      <div className="w-full rounded-lg relative bg-white p-4">
        <h1 className="text-[22px]">About</h1>
        <p className="text-[#666] text-[15px]">{isCurrentProfile ? userData?.headline : selectedProfile?.headline}</p>
      </div>


      {(isCurrentProfile ? userData?.postsCount && userData?.postsCount > 0 : selectedProfile?.postsCount && selectedProfile?.postsCount > 0) &&
        <div className="w-full rounded-lg relative bg-white pt-4">

          <div className="px-4">
            <h1 className="text-[22px]">Activity</h1>
            <p className="text-[#666] mt-1 text-[13px]">{(37172499).toLocaleString()} followers</p>
            <div className="border-b-[1px]">
              <p className="text-[12px] text-[#666] mt-2"><span className="text-[#333] text-[13px]">You</span> posted this • 1d</p>
              <div className="flex gap-3 items-start mt-2">
                <img src="https://media.licdn.com/dms/image/v2/D5605AQGoMXy-sz3Q4w/feedshare-thumbnail_720_1280/B56ZTCxLZpGoBA-/0/1738434459992?e=1739206800&v=beta&t=fZiABA-sflsui2gS9Qi6le3AtBT88FeukGGuA16mcvI" className="w-14 h-14 object-cover rounded-lg" alt="" />
                <p className="text-[13px] text-[#666]">My new memoir Source Code is the story of my life before Microsoft. Of my earliest successes and failures. And of not fitting in, playing cards, sneaking out, hiking mountains, and forming friendships that changed my life. I hope you enjoy it:</p>
              </div>
              <div className="my-3 flex justify-between">
                <div className="flex gap-1 items-center">
                  <img src="images/likeSVG.svg" className="w-4" alt="" />
                  <p className="text-[13px] text-[#666]">{(5143).toLocaleString()}</p>
                </div>
                <p className="text-[13px] text-[#666]">{(4132).toLocaleString()} comments</p>
              </div>
            </div>
          </div>

          <button className="w-full py-2.5 flex text-[#666] transition-all duration-200 items-center justify-center gap-2 hover:bg-gray-50 rounded-b-lg">Show all posts <FaLongArrowAltRight /></button>
        </div>
      }

      {(isCurrentProfile ? userData?.experience && userData?.experience.length > 0 : selectedProfile?.experience && selectedProfile.experience.length > 0) &&
        <div className="w-full rounded-lg relative bg-white p-4">
          <h1 className="text-[22px]">Experience</h1>
          {(isCurrentProfile ? userData?.experience : selectedProfile?.experience)?.map((item, index, arr) => (
            <div key={index} className={`flex gap-3 items-start ${index !== arr.length - 1 ? " border-b-[1px]" : ""} py-3`}>
              <img src={item.companyImg || DEFAULT_EXPERIENCE_PIC} alt="Experiences image" className="w-12" />
              <div>
                <h1 className="text-[14px] font-semibold">{item.employmentType}</h1>
                <p className="text-[13px] text-[#666]">{item.companyName}</p>
                <p className="text-[12px] text-[#666]">{item.startDate} - {item.endDate}</p>
              </div>
            </div>
          ))
          }
        </div>
      }

      {(isCurrentProfile ? userData?.education && userData?.education.length > 0 : selectedProfile?.education && selectedProfile.education.length > 0) &&
        <div className="w-full rounded-lg relative bg-white p-4">
          <h1 className="text-[22px]">Education</h1>
          {(isCurrentProfile ? userData?.education : selectedProfile?.education)?.map((item, index, arr) => (
            <div key={index} className={`flex gap-3 items-start ${index !== arr.length - 1 ? "border-b-[1px]" : ""} py-3`}>
              <img src={item?.schoolImg || DEFAULT_EXPERIENCE_PIC} alt="School image" className="w-12" />
              <div>
                <h1 className="text-[14px] font-semibold">{item.schoolName}</h1>
                <p className="text-[12px] text-[#666]">{item.startDate} - {item.endDate}</p>
              </div>
            </div>
          ))
          }
        </div>
      }
    </div>

    <div className="w-full md:flex flex-col hidden gap-4">
      <div className="bg-white w-full xl:max-w-[65%] max-w-[90%] rounded-lg p-3">
        <div className="border-b-[1px] py-2 space-y-2">
          <h1 className="text-[20px]">Profile language</h1>
          <p className="text-[#666] text-[13px]">English</p>
        </div>
        <div className="py-2 space-y-2">
          <h1 className="text-[18px]">Public profile & URL</h1>
          <p className="text-[#666] text-[13px]">{document.URL}</p>
        </div>
      </div>
      <FeedSuggestions className="w-full xl:max-w-[65%] max-w-[90%]" />
    </div>

  </section>
    <Footer />
  </>
}