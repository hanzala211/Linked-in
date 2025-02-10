import { EditHead, FeedIdentityModule } from "@components";
import { useAuth, useNetwork, useProfile } from "@context";
import InfiniteScroll from "react-infinite-scroll-component";

export const NetworkModel: React.FC = () => {
  const { userData } = useAuth()
  const { suggestions, industrySuggestions, randomUsers, randomIndustryUsers } = useProfile()
  const { isIndustryModalOpen, isSuggestionsModalOpen, setIsSuggestionsModalOpen, setIsIndustryModalOpen } = useNetwork()

  const handleClose = () => {
    setIsIndustryModalOpen(false)
    setIsSuggestionsModalOpen(false)
  }

  const handleMore = () => {
    if (isSuggestionsModalOpen) {
      randomUsers("4")
    } else {
      randomIndustryUsers("4")
    }
    console.log('Check')
  }

  return (
    <>
      <div onClick={handleClose} className={`transition-all duration-200 ${isIndustryModalOpen || isSuggestionsModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"} overlay z-20`}></div>
      <div className={`fixed transition-all ${isIndustryModalOpen || isSuggestionsModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"} duration-200 inset-0 rounded-lg bg-white z-50 w-full flex flex-col gap-4 xl:max-w-[40%] max-w-full left-1/2 -translate-x-1/2 h-full max-h-[93%] top-[5%]`}>
        <EditHead heading={isSuggestionsModalOpen ? "People you may know based on your recent activity" : `People who are in the ${userData?.industry} industry also follow these people`} handleClose={handleClose} />
        <div className="overflow-y-auto h-full">
          <InfiniteScroll
            dataLength={isSuggestionsModalOpen ? suggestions.length : industrySuggestions.length}
            next={handleMore}
            hasMore={true}
            loader={<h1 className="absolute bottom-0 left-1/2 -translate-x-1/2">Loading</h1>}
            className="grid md:grid-cols-3 grid-cols-2 md:gap-y-2 gap-y-1 md:gap-0 gap-2 p-3"
          >
            {(isSuggestionsModalOpen ? suggestions : industrySuggestions).map((item, index) => (
              <FeedIdentityModule data={item} key={index} />
            ))
            }
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
};
