import { FeedIdentityModule, SuggestionsLoader } from "@components"
import { IUser } from "@types"

interface NetworkContainersProps {
  heading: string,
  isLoading: boolean,
  data: IUser[],
  handleClick: () => void
}

export const NetworkContainers: React.FC<NetworkContainersProps> = ({ heading, isLoading, data, handleClick }) => {
  return <div className="bg-white w-full rounded-lg p-3">
    <div className="flex justify-between items-center">
      <h1 className="text-[17px]">{heading}</h1>
      <button onClick={handleClick} className="text-gray-600 hover:text-black transition-all duration-150 font-semibold hover:bg-gray-100 p-2  rounded-lg">Show All</button>
    </div>
    <div className="grid lg:grid-cols-4 grid-cols-2 gap-2 mt-3">
      {!isLoading ? data.map((item, index) => (
        <FeedIdentityModule data={item} key={index} />
      ))
        : Array.from({ length: 8 }, (_, i) => (
          <SuggestionsLoader key={i} />
        ))}
    </div>
  </div>
}