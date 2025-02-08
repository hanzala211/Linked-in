import { useEffect, useRef, useState } from "react"
import { RxCross2 } from "react-icons/rx"
import { CiCirclePlus } from "react-icons/ci"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components"
import { MdDelete } from "react-icons/md"
import { HiOutlineDocumentDuplicate } from "react-icons/hi"
import { usePost } from "@context"
import { overFlowHidder } from "@helpers"

export const ImageCreator: React.FC = () => {
  const { setSelectedImage, selectedImage, currentIndex, setCurrentIndex, isImageCreatorOpen, setIsImageCreatorOpen, setIsPostCreatorOpen } = usePost()
  const [isSelectingImage, setIsSelectingImage] = useState<boolean>(true)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    overFlowHidder(isImageCreatorOpen)
  }, [isImageCreatorOpen])


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const files = Array.from(event.target.files);
    const imageUrls = files
      .filter((file) => file.type.startsWith("image/"))
      .map((file) => URL.createObjectURL(file));

    if (imageUrls.length > 0) {
      setSelectedImage((prev: string[]) => [...prev, ...imageUrls]);
      setIsSelectingImage(false);
    } else {
      alert("Please select an image file");
    }
  };

  const handleFile = () => {
    fileInputRef.current?.click();
  };

  const handleClose = () => {
    setIsImageCreatorOpen(false)
    setSelectedImage([])
    setIsSelectingImage(true)
    setCurrentIndex(0)
  }
  const handleDelete = () => {
    setSelectedImage(selectedImage.filter((_, index) => index !== currentIndex))
    if (selectedImage.length === 1) {
      handleClose()
    }
  }

  const handleDuplicate = () => {
    const duplicatedImg = selectedImage[currentIndex]
    setSelectedImage((prev) => [...prev, duplicatedImg])
  }

  const handleNext = () => {
    setIsImageCreatorOpen(false)
    setIsPostCreatorOpen(true)
    setIsSelectingImage(true)
    setCurrentIndex(0)
  }

  const postFeatures = [
    {
      func: handleDuplicate,
      icon: HiOutlineDocumentDuplicate,
      text: "Duplicate"
    },
    {
      func: handleDelete,
      icon: MdDelete,
      text: "Delete"
    },
    {
      func: handleFile,
      icon: CiCirclePlus,
      text: "Add"
    },
  ]

  return <>
    <div onClick={handleClose} className={`${isImageCreatorOpen ? "opacity-100" : "opacity-0 pointer-events-none"} transition-all duration-200 overlay z-20`}></div>
    <div className={`${isImageCreatorOpen ? "opacity-100" : "opacity-0 pointer-events-none"} fixed transition-all duration-200 inset-0 rounded-lg bg-white z-50 w-full flex flex-col justify-between xl:max-w-[60%] max-w-full left-1/2 -translate-x-1/2 h-full max-h-[90%] top-[5%]`}>
      <div className="flex justify-between py-2 border-b-[1px] items-center px-4">
        <h1 className="text-[18px] font-semibold">Editor</h1>
        <button onClick={handleClose} className="hover:bg-slate-100 p-3 rounded-full text-[25px]">
          <RxCross2 />
        </button>
      </div>
      {isSelectingImage ?
        <div className="bg-[#F8FAFD] flex flex-col items-center gap-2 justify-center h-full">
          <img src="images/imageSelector.svg" alt="Image Post Selector" />
          <h1 className="text-[23px] font-semibold">Select files to begin</h1>
          <p className="text-[#666]">Share images in your post.</p>
          <button onClick={handleFile} className="text-white p-2 rounded-lg hover:bg-opacity-70 transition-all duration-200 bg-[#0A66C2]">Upload from Computer</button>
          <input type="file" ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
            multiple={true} />
        </div>
        :
        <div className="bg-[#F8FAFD] md:h-screen sm:h-[85%] h-[81%] flex md:flex-row flex-col items-center md:items-start md:gap-0 gap-4 justify-between">
          <div className="md:w-[65%] w-[75%] mt-2 md:mt-0 h-1/2 md:h-full flex justify-center">
            <img
              src={selectedImage[currentIndex]}
              alt="Selected Image"
              className="max-w-full max-h-full object-contain"
            />
          </div>

          <div className="md:w-[34%] flex justify-between flex-col overflow-y-auto h-[15rem] md:h-[46rem] w-full bg-white center p-6">
            <div>
              <p className="text-[13px] text-[#666]">{currentIndex + 1} of {selectedImage.length}</p>
              <div className="grid grid-cols-2 mt-4 gap-2">
                {selectedImage.map((item, index) => (
                  <div onClick={() => setCurrentIndex(index)} key={index} className={`flex cursor-pointer items-center justify-center h-32 ${index === currentIndex ? "border-[2px]" : ""}`}>
                    <img src={item} alt="Selected Image" className="w-full h-full object-contain" />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-evenly mt-5">
              {postFeatures.map((item, index) => (
                <button key={index} onClick={item.func} className="hover:opacity-70 rounded-full transition-all text-[#666] duration-200 text-[35px]">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger><item.icon /></TooltipTrigger>
                      <TooltipContent className="bg-white border-[1px] shadow-sm shadow-slate-400 text-black">
                        <p>{item.text}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </button>
              ))}

              <input type="file" ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
                multiple={true} />
            </div>
          </div>
        </div>
      }

      <div className="border-t-[2px] relative py-6">
        <button onClick={handleNext} disabled={selectedImage.length === 0} className={`px-4 py-1.5 absolute right-2 top-[10%] hover:bg-opacity-70 transition-all duration-200 rounded-3xl ${selectedImage.length > 0 ? "bg-[#0A66C2] text-white" : "bg-[#E8E8E8] opacity-70"}`}>Next</button>
      </div>
    </div>
  </>
}