import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components"

export const Years: React.FC<{ label: string, setSelectYear: React.Dispatch<React.SetStateAction<string>>, isPresent: boolean }> = ({ label, setSelectYear, isPresent }) => {
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 2000 + 1 }, (_, i) => (2000 + i).toString());

  const handleChange = (val: string) => {
    if (!isPresent) {
      setSelectYear(val)
    }
  }

  return <Select onValueChange={handleChange}>
    <SelectTrigger disabled={isPresent} className="border-black">
      <SelectValue placeholder={label} />
    </SelectTrigger>
    <SelectContent>
      {years.map((item, index) => (
        <SelectItem disabled={isPresent} key={index} value={item}>{item}</SelectItem>
      ))}
    </SelectContent>
  </Select>
}