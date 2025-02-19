import { FeedIdentityModule, NetworkContainers } from "@components"
import { useAuth, useNetwork, useProfile } from "@context"
import { titleChanger } from "@helpers"
import { useEffect } from "react"

export const NetworkPage: React.FC = () => {
  const { userData } = useAuth()
  const { networkSuggestions, industrySuggestions, isSuggestionLoading, isIndustryLoading, randomUsers, randomIndustryUsers, setIsIndustryLoading } = useProfile()
  const { setIsIndustryModalOpen, setIsSuggestionsModalOpen } = useNetwork()

  useEffect(() => {
    if (networkSuggestions.length === 0) {
      randomUsers("8")
    }
    if (industrySuggestions.length === 0 && userData?.industry) {
      randomIndustryUsers("8")
    } else {
      setIsIndustryLoading(false)
    }
  }, [userData?._id])

  useEffect(() => {
    titleChanger("Network")
  }, [])

  return <section className="grid md:grid-cols-[0.5fr_2fr] gap-5 lg:gap-0 grid-cols-1 pt-20 mx-auto w-full xl:max-w-[77%] max-w-[98%]">
    {/* First Column */}
    <div className="w-full max-w-full md:block hidden">
      <FeedIdentityModule data={userData} />
    </div>

    {/* Second Column */}
    <div className="w-full lg:max-w-[90%] max-w-full flex flex-col gap-4">
      <NetworkContainers heading="People you may know based on your recent activity" isIndustry={false} handleClick={() => setIsSuggestionsModalOpen(true)} data={networkSuggestions.slice(0, 7)} isLoading={isSuggestionLoading} />
      {userData?.industry &&
        <NetworkContainers heading={`People who are in the ${userData?.industry} industry also follow these people`} isIndustry={true} handleClick={() => setIsIndustryModalOpen(true)} data={industrySuggestions.slice(0, 7)} isLoading={isIndustryLoading} />
      }
    </div>
  </section>
}