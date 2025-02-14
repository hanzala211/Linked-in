import { DEFAULT_PIC } from "@assets"
import { EditHead } from "@components"
import { useAuth, useJob } from "@context"
import { useEffect, useRef } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { SyncLoader } from "react-spinners";

export const JobApplyForm: React.FC = () => {
  const { userData } = useAuth()
  const { email, setEmail, phone, setPhone, isApplicationModelOpen, setIsApplicationModelOpen, selectedJob, fileName, setFileName, selectedFile, setSelectedFile, isApplying, applyToJob, isAddingPDF, setIsAddingPDF } = useJob()

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    setEmail(userData?.email || "")
  }, [userData])


  const handleClose = () => {
    setIsApplicationModelOpen(false)
    setIsAddingPDF(false)
    setSelectedFile([])
    setFileName("")
    setPhone("")
  }


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const files = Array.from(event.target.files);
    setFileName(files[0].name)
    const filePath = files
      .filter((file) => file.type.startsWith("application/"))
      .map((file) => URL.createObjectURL(file));

    if (filePath.length > 0) {
      setSelectedFile(filePath)
    } else {
      alert("Please select PDF file");
    }
  };

  const handleFile = () => {
    fileInputRef.current?.click();
  };

  return <>
    <div onClick={handleClose} className={`transition-all duration-200 overlay z-20 ${isApplicationModelOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}></div>
    <div className={`fixed inset-x-0 top-10 mx-auto w-full max-w-[95%] md:max-w-[70%] ${isApplicationModelOpen ? "opacity-100" : "opacity-0 pointer-events-none"} xl:max-w-[30%] rounded-lg bg-white shadow-lg z-50 flex flex-col h-auto max-h-[80%] md:max-h-[60%] overflow-hidden`}>
      <EditHead heading={`Apply to ${selectedJob?.title}`} handleClose={handleClose} />
      {!isAddingPDF ? <div className="p-5 overflow-y-auto flex-grow">
        <h1 className="text-lg font-semibold">Contact Info</h1>
        <div className="flex gap-3 mt-3 items-center">
          <img src={userData?.profilePic || DEFAULT_PIC} alt={`${userData?.firstName} profile`} className="w-14 h-14 rounded-full object-cover" />
          <div>
            <h1 className="text-md font-medium">{userData?.firstName} {userData?.lastName}</h1>
            <p className="text-sm text-gray-700">{userData?.headline}</p>
            <p className="text-xs text-gray-500">{userData?.region}, {userData?.country}</p>
          </div>
        </div>
        <div className="flex flex-col mt-4 gap-1 group">
          <label htmlFor="email" className="text-sm text-gray-600">Email address*</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`border-[1px] group-hover:outline-1 outline outline-0 border-black rounded-sm py-1 px-2 text-[14px]`}
          />
        </div>
        <div className="flex flex-col mt-4 gap-1">
          <label htmlFor="phone" className="text-sm text-gray-600">Mobile phone number*</label>
          <PhoneInput
            country="eg"
            enableSearch={true}
            value={phone}
            onChange={(phone) => setPhone(phone)}
          />
        </div>
      </div> :
        <div className="p-5 overflow-y-auto flex-grow">
          <h1 className="text-lg font-semibold">Resume</h1>
          <p className="text-[14px] text-[#666]">Be sure to include an updated resume *</p>
          <div className="rounded-lg flex gap-2 border-[1px] border-black">
            <div className="bg-[#CB112D] font-semibold rounded-l-lg text-white flex items-center justify-center p-5">
              PDF
            </div>
            <h1 className="flex items-center">{selectedFile.length === 0 ? userData?.resume?.resumeName : fileName}</h1>
          </div>
          <button onClick={handleFile} className="p-2 border-[#0A66C2] border-[1px] rounded-lg hover:bg-[#0A66C2] hover:text-white mt-5 transition-all duration-200 bg-transparent text-[#0A66C2]">Upload from Computer</button>
          <input type="file" ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
            multiple={true} />
        </div>
      }
      <p className="text-xs text-gray-500 px-5 pb-3">Submitting this application won’t change your LinkedIn profile. Application powered by LinkedIn.</p>
      <div className="py-3 px-5 border-t border-gray-300 flex justify-end bg-gray-50">
        <button disabled={email.length === 0 || phone.length < 4} onClick={() => {
          if (!isAddingPDF) {
            setIsAddingPDF(true)
          } else {
            applyToJob()
          }
        }} className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-500 transition-all duration-200">{isApplying ? <SyncLoader color="white" size={10} /> : "Next"}</button>
      </div>
    </div>
  </>
}