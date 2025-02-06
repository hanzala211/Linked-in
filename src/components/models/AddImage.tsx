import { EditHead } from "@components"
import { useProfile } from "@context"
import { overFlowHidder } from "@helpers"
import { useEffect, useRef } from "react"
import { SyncLoader } from "react-spinners"

export const AddImage: React.FC = () => {
  const { isAddingProfile, setIsAddingProfile, setSelectedProfilePic, selectedProfilePic, updateProfilePic, isUpdatingProfilePic, deleteProfilePic } = useProfile()
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    overFlowHidder(isAddingProfile)
  }, [isAddingProfile])

  const handleClose = () => {
    setIsAddingProfile(false)
    setTimeout(() => {
      setSelectedProfilePic([])
    }, 200)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const files = Array.from(event.target.files);
    const imageUrls = files
      .filter((file) => file.type.startsWith("image/"))
      .map((file) => URL.createObjectURL(file));

    if (imageUrls.length > 0) {
      setSelectedProfilePic((prev: string[]) => [...prev, ...imageUrls]);
    } else {
      alert("Please select an image file");
    }
  };

  const handleFile = () => {
    fileInputRef.current?.click();
  };



  return <>
    <div onClick={handleClose} className={`transition-all duration-200 overlay z-20 ${isAddingProfile ? "opacity-100" : "opacity-0 pointer-events-none"}`}></div>
    <div className={`fixed ${isAddingProfile ? "opacity-100" : "opacity-0 pointer-events-none"} transition-all duration-200 inset-0 rounded-lg bg-white z-50 w-full flex flex-col xl:max-w-[40%] md:max-w-[70%] max-w-[98%] left-1/2 shadow shadow-slate-200 -translate-x-1/2 h-full max-h-[60%] top-[5%]`}>
      <EditHead heading="Add Photo" handleClose={handleClose} />
      {selectedProfilePic[0] === undefined ?

        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="max-w-sm text-center md:text-[22px] text-[15px]">No professional headshot needed!
            Just something that represents you.</h1>
          <img src="images/profileCreator.png" alt="Profile Creator" className="w-72 md:w-auto" />
          <p className="text-center max-w-lg text-[#666] text-[13px]">On LinkedIn, we require members to use their real identities, so take or upload a photo of yourself. Then crop, filter, and adjust it to perfection.</p>
        </div>
        :
        <div className="h-[77%]">
          <img src={selectedProfilePic[0]} alt="Profile Image" className="w-full h-full object-contain" />
        </div>
      }

      <div className="p-4 flex justify-between items-start border-t-[1px] relative">
        <button onClick={selectedProfilePic[0] === undefined ? deleteProfilePic : () => setSelectedProfilePic([])} className="text-[#666] font-semibold">Delete Profile</button>
        <button onClick={selectedProfilePic[0] === undefined ? handleFile : updateProfilePic} className="text-white bg-[#0A66C2] hover:bg-opacity-80 transition-all duration-200 py-1.5 px-4 rounded-full absolute right-2 top-[20%]">{isUpdatingProfilePic ? <SyncLoader color="white" /> : "Upload Photo"}</button>
        <input type="file" ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
          multiple={false} />
      </div>
    </div>
  </>
}