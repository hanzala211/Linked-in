import { useAuth, usePost, useProfile, useSearch } from "@context"
import { useEffect } from "react"
import { titleChanger } from "@helpers"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, FeedSuggestions, Footer, ProfilePost, ProfilePostLoader, ProfileSection } from "@components"
import { FaLongArrowAltRight } from "react-icons/fa"
import { DEFAULT_EXPERIENCE_PIC } from "@assets"
import { Link, useParams } from "react-router-dom"

export const ProfilePage: React.FC = () => {
  const { userData } = useAuth()
  const { selectedProfile, setSelectedProfile } = useProfile()
  const { handleSearch } = useSearch()
  const { firstPosts, isPostsLoading, getSixPosts } = usePost()
  const params = useParams()
  const isCurrentProfile = params.username === userData?.userName;

  useEffect(() => {
    if (!params.username || params.username === userData?.userName) return;

    const controller = new AbortController();
    const fetchProfile = async () => {
      if (!selectedProfile) {
        try {
          const data = await handleSearch(controller.signal, params.username || "");
          setSelectedProfile(data[0] || null);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };

    fetchProfile();
    return () => controller.abort();
  }, [params.username])

  useEffect(() => {
    if (userData !== null) {
      titleChanger(`${isCurrentProfile ? userData?.firstName : selectedProfile?.firstName} ${isCurrentProfile ? userData?.lastName : selectedProfile?.lastName}`)
    }
    const userId = isCurrentProfile ? userData?._id : selectedProfile?._id;
    if (!userId) return;

    getSixPosts(userId)
  }, [userData?._id, selectedProfile?._id, params.username])

  return <><section className="grid md:grid-cols-[2fr_1fr] grid-cols-1 pt-20 w-full xl:max-w-[78%] lg:gap-6 md:max-w-full max-w-[98%] mx-auto">
    {/* First Column */}
    <div className="w-full flex flex-col gap-4">
      <ProfileSection isCurrentProfile={isCurrentProfile} />

      <div className="w-full rounded-lg relative bg-white p-4">
        <h1 className="md:text-[22px] text-[18px]">About</h1>
        <p className="text-[#666] md:text-[15px] text-[13px]">{isCurrentProfile ? userData?.headline : selectedProfile?.headline}</p>
      </div>

      {(isCurrentProfile ? (userData?.postsCount ?? 0) > 0 : (selectedProfile?.postsCount ?? 0) > 0) && (
        <div className="w-full px-3 rounded-lg relative bg-white pt-4">
          <h1 className="md:text-[22px] text-[18px]">Activity</h1>
          <div className="w-full max-w-[100vw] sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw] xl:max-w-[900px] mx-auto overflow-hidden">
            <Carousel className="relative w-full">
              <CarouselContent className="flex w-full">
                {!isPostsLoading ? (
                  firstPosts.map((item, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 pl-2 basis-full">
                      <ProfilePost isCurrentProfile={isCurrentProfile} item={item} />
                    </CarouselItem>
                  ))
                ) : (
                  Array.from({ length: 2 }, (_, i) => (
                    <CarouselItem key={i} className="md:basis-1/2 mt-2 basis-full">
                      <ProfilePostLoader />
                    </CarouselItem>
                  ))
                )}
              </CarouselContent>
              <CarouselPrevious className="absolute md:left-5 left-0 top-1/2 -translate-y-1/2 bg-black text-white p-1 text-[20px] rounded-full" />
              <CarouselNext className="absolute md:right-5 right-0 top-1/2 -translate-y-1/2 bg-black p-1 text-[20px] text-white rounded-full" />
            </Carousel>
          </div>
          <Link to={`/${isCurrentProfile ? userData?.userName : selectedProfile?.userName}/recent-activity/all`} className="w-full py-2.5 flex text-[#666] transition-all border-t-[1px] mt-4 duration-200 items-center justify-center gap-2 hover:bg-gray-50 rounded-b-lg">
            Show all posts <FaLongArrowAltRight />
          </Link>
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
      <div className="bg-white w-full xl:max-w-[75%] lg:max-w-[70%] rounded-lg p-3">
        <div className="border-b-[1px] py-2 space-y-2">
          <h1 className="text-[20px]">Profile language</h1>
          <p className="text-[#666] text-[13px]">English</p>
        </div>
        <div className="py-2 space-y-2">
          <h1 className="text-[18px]">Public profile & URL</h1>
          <p className="text-[#666] text-[13px] break-words whitespace-pre-wrap w-full">
            {document.URL}</p>
        </div>
      </div>
      <FeedSuggestions className="w-full xl:max-w-[75%] lg:max-w-[70%]" />
    </div>

  </section>
    <Footer />
  </>
}