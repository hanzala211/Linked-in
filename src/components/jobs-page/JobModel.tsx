import { DEFAULT_EXPERIENCE_PIC } from "@assets"
import { Link } from "react-router-dom"

export const JobModel: React.FC = () => {
  return <Link to="#" className="flex group items-start gap-2">
    <img src={DEFAULT_EXPERIENCE_PIC} alt="Test Image" className="w-16" />
    <div>
      <h1 className="text-[#0A66C2] group-hover:underline font-semibold">Title</h1>
      <p className="text-[13px]">Raf Hiring and Tech Partners · Pakistan (Remote)</p>
      <p className="text-[#666] text-[13px]">Pakistan (Remote)</p>
      <p className="flex gap-2 text-[12px] items-center mt-2 text-[#666]"><img src="/images/favico.png" alt="Easy apply icon" className="w-4 h-4" /> Easy Apply</p>
    </div>
  </Link>
}