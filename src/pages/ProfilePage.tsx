import { useAuth, useProfile, useSearch } from "@context"
import { useEffect } from "react"
import { titleChanger } from "@helpers"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, FeedSuggestions, Footer, PostLoader, ProfilePost, ProfileSection } from "@components"
import { FaLongArrowAltRight } from "react-icons/fa"
import { DEFAULT_EXPERIENCE_PIC } from "@assets"
import { useParams } from "react-router-dom"

export const ProfilePage: React.FC = () => {
  const { userData } = useAuth()
  const { getSixPosts, firstPosts, isPostsLoading } = useProfile()
  const { selectedProfile, handleSearch, setSelectedProfile } = useSearch()
  const params = useParams()
  const isCurrentProfile = params.username === userData?.userName;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      if (params.username !== userData?.userName && selectedProfile === null) {
        try {
          const data = await handleSearch(signal, params.username || "");
          console.log(data);
          setSelectedProfile(data[0])
        } catch (error) {
          console.log(error)
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
    getSixPosts((isCurrentProfile ? userData?._id : selectedProfile?._id) || "")
  }, [userData?._id, selectedProfile?._id, params.username])

  return <><section className="grid md:grid-cols-[2fr_1fr] grid-cols-1 pt-20 w-full xl:max-w-[70%] gap-6 max-w-[98%] mx-auto">
    {/* First Column */}
    <div className="w-full flex flex-col gap-4">
      <ProfileSection isCurrentProfile={isCurrentProfile} />

      <div className="w-full rounded-lg relative bg-white p-4">
        <h1 className="md:text-[22px] text-[18px]">About</h1>
        <p className="text-[#666] md:text-[15px] text-[13px]">{isCurrentProfile ? userData?.headline : selectedProfile?.headline}</p>
      </div>


      {(isCurrentProfile ? userData?.postsCount && userData?.postsCount > 0 : selectedProfile?.postsCount && selectedProfile?.postsCount > 0) && (
        <div className="w-full px-3 rounded-lg relative bg-white pt-4">
          <h1 className="md:text-[22px] text-[18px]">Activity</h1>
          <div style={{ maxWidth: '850px', margin: '0 auto' }}>
            <Carousel className="relative">
              <CarouselContent className="flex">
                {!isPostsLoading ? firstPosts.map((item, index, arr) => (
                  <CarouselItem key={index} className={`${arr.length > 1 ? "lg:basis-1/2" : "lg:basis-2/3"}`}>
                    <ProfilePost isCurrentProfile={isCurrentProfile} item={item} />
                  </CarouselItem>
                )) : Array.from({ length: 4 }, (_, i) => (
                  <CarouselItem className="lg:basis-2/3 ">
                    <PostLoader key={i} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-5 top-1/2 -translate-y-1/2 bg-black text-white p-1 text-[20px] rounded-full" />
              <CarouselNext className="absolute right-5 top-1/2 -translate-y-1/2 bg-black p-1 text-[20px] text-white rounded-full" />
            </Carousel>
          </div>

          <button className="w-full py-2.5 flex text-[#666] transition-all border-t-[1px] mt-4 duration-200 items-center justify-center gap-2 hover:bg-gray-50 rounded-b-lg">Show all posts <FaLongArrowAltRight /></button>
        </div>
      )}

      {(isCurrentProfile ? userData?.experience && userData?.experience.length > 0 : selectedProfile?.experience && selectedProfile.experience.length > 0) &&
        <div className="w-full rounded-lg relative bg-white p-4">
          <h1 className="md:text-[22px] text-[18px]">Experience</h1>
          {(isCurrentProfile ? userData?.experience : selectedProfile?.experience)?.map((item, index, arr) => (
            <div key={index} className={`flex gap-3 items-start ${index !== arr.length - 1 ? " border-b-[1px]" : ""} py-3`}>
              <img src={item.companyImg || DEFAULT_EXPERIENCE_PIC} alt="Experiences image" className="w-12" />
              <div>
                <h1 className="text-[14px] font-semibold">{item.employmentType}</h1>
                <p className="text-[13px] text-[#666]">{item.companyName}</p>
                <p className="text-[12px] text-[#666]">{item.startDate} - {item.endDate}</p>
                <p className="text-[12px] text-[#666]">{item.location}</p>
              </div>
            </div>
          ))
          }
        </div>
      }

      {(isCurrentProfile ? userData?.education && userData?.education.length > 0 : selectedProfile?.education && selectedProfile.education.length > 0) &&
        <div className="w-full rounded-lg relative bg-white p-4">
          <h1 className="md:text-[22px] text-[18px]">Education</h1>
          {(isCurrentProfile ? userData?.education : selectedProfile?.education)?.map((item, index, arr) => (
            <div key={index} className={`flex gap-3 items-start ${index !== arr.length - 1 ? "border-b-[1px]" : ""} py-3`}>
              <img src={item?.schoolImg || DEFAULT_EXPERIENCE_PIC} alt="School image" className="w-12" />
              <div>
                <h1 className="text-[14px] font-semibold">{item.schoolName}</h1>
                <p className="text-[12px] text-[#666]">{item.degree}</p>
                <p className="text-[12px] text-[#666]">{item.startDate} - {item.endDate}</p>
                <p className="text-[12px] text-[#666]">{item.location}</p>
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