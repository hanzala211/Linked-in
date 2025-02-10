import { FeedIdentityModule, SuggestionsLoader } from "@components"
import { useProfile } from "@context"
import { IUser } from "@types"

interface NetworkContainersProps {
  heading: string,
  isLoading: boolean,
  data: IUser[],
  handleClick: () => void,
  isIndustry: boolean
}

export const NetworkContainers: React.FC<NetworkContainersProps> = ({ heading, isLoading, data, handleClick, isIndustry }) => {
  const { setHasMore } = useProfile()

  const handleButton = () => {
    handleClick()
    setHasMore(true)
  }
  return <div className="bg-white w-full rounded-lg p-3">
    <div className="flex justify-between items-center">
      <h1 className="md:text-[17px] text-[14px]">{heading}</h1>
      <button onClick={handleButton} className="text-gray-600 w-fit md:text-[16px] text-[12px] hover:text-black transition-all duration-150 font-semibold hover:bg-gray-100 p-2  rounded-lg">Show All</button>
    </div>
    <div className="grid lg:grid-cols-4 grid-cols-2 gap-2 mt-3">
      {!isLoading ? data.map((item, index) => (
        <FeedIdentityModule data={item} key={index} isIndustry={isIndustry} isNetwork={true} />
      ))
        : Array.from({ length: 8 }, (_, i) => (
          <SuggestionsLoader key={i} />
        ))}
    </div>
  </div>
}