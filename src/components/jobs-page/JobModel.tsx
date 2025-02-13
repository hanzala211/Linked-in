import { DEFAULT_EXPERIENCE_PIC } from "@assets"
import { JobType } from "@types"
import { Link } from "react-router-dom"

export const JobModel: React.FC<{ item: JobType }> = ({ item }) => {
  return <Link to={`/jobs/search?jobId=${item._id}`} className="flex group items-start gap-2">
    <img src={item.company.companyImg || DEFAULT_EXPERIENCE_PIC} alt={`${item.company.companyName} Image`} className="w-16" />
    <div>
      <h1 className="text-[#0A66C2] group-hover:underline font-semibold">{item.title}</h1>
      <p className="text-[13px]">{item.company.companyName} · {item.country} ({item.employmentType})</p>
      <p className="text-[#666] text-[13px]">{item.region}, {item.country} ({item.employmentType})</p>
      <p className="flex gap-2 text-[12px] items-center mt-2 text-[#666]"><img src="/images/favico.png" alt="Easy apply icon" className="w-4 h-4" /> Easy Apply</p>
    </div>
  </Link>
}