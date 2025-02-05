import { EditHead } from "@components"
import { useProfile } from "@context"
import { useRef } from "react"
import { SyncLoader } from "react-spinners"

export const AddBanner: React.FC = () => {
  const { isAddingBanner, setIsAddingBanner, setSelectedBanner, selectedBanner, isUpdatingProfileBanner, uploadBanner, deleteProfileBanner } = useProfile()
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleClose = () => {
    setIsAddingBanner(false)
    setTimeout(() => {
      setSelectedBanner([])
    }, 200)
  }

  const handleFileChange = (event: any) => {
    const files = Array.from(event.target.files);
    const imageUrls = files
      .filter((file) => file.type.startsWith('image/'))
      .map((file) => URL.createObjectURL(file));
    if (imageUrls.length > 0) {
      setSelectedBanner((prev) => [...prev, ...imageUrls]);
    } else {
      alert('Please select an image file');
    }
  }

  const handleFile = () => {
    fileInputRef.current.click();
  }


  return <>
    <div onClick={handleClose} className={`transition-all duration-200 overlay z-20 ${isAddingBanner ? "opacity-100" : "opacity-0 pointer-events-none"}`}></div>
    <div className={`fixed ${isAddingBanner ? "opacity-100" : "opacity-0 pointer-events-none"} transition-all duration-200 inset-0 rounded-lg bg-white z-50 w-full flex flex-col xl:max-w-[40%] md:max-w-[70%] max-w-full left-1/2 shadow shadow-slate-200 -translate-x-1/2 h-full max-h-[60%] top-[5%]`}>
      <EditHead heading="Add Banner" handleClose={handleClose} />
      {selectedBanner[0] === undefined ?

        <div className="flex flex-col items-center justify-center h-full">
          <img src="images/imageBanner.svg" alt="Profile Creator" />
          <h1 className="max-w-lg my-1 text-center text-[22px]">Showcase your personality, interests, team moments or notable milestones</h1>
          <p className="text-center max-w-lg text-[#666] text-[13px]">A good background photo will help you stand out.</p>
        </div>
        :
        <div className="h-[77%]">
          <img src={selectedBanner[0]} alt="Profile Image" className="w-full h-full object-contain" />
        </div>

      }

      <div className="p-4 flex justify-between relative border-t-[1px]">
        <button onClick={selectedBanner[0] === undefined ? deleteProfileBanner : () => setSelectedBanner([])} className="text-[#666] font-semibold">Delete Banner</button>
        <button onClick={selectedBanner[0] === undefined ? handleFile : uploadBanner} className="text-white bg-[#0A66C2] hover:bg-opacity-80 transition-all duration-200 py-1.5 px-4 rounded-full absolute right-2 top-[20%]">{isUpdatingProfileBanner ? <SyncLoader color="white" /> : "Upload Banner"}</button>
        <input type="file" ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
          multiple={false} />
      </div>
    </div>
  </>
}