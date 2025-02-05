import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components"

export const Years: React.FC<{ label: string, setSelectYear: React.Dispatch<React.SetStateAction<string>>, }> = ({ label, setSelectYear }) => {
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 2000 + 1 }, (_, i) => (2000 + i).toString());

  return <Select onValueChange={(val) => setSelectYear(val)}>
    <SelectTrigger className="border-black">
      <SelectValue placeholder={label} />
    </SelectTrigger>
    <SelectContent>
      {years.map((item, index) => (
        <SelectItem key={index} value={item}>{item}</SelectItem>
      ))}
    </SelectContent>
  </Select>
}