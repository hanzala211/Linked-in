import { FieldErrors, UseFormRegister } from "react-hook-form"

interface EditInputProps<T> {
  label: string,
  type: string,
  name: string,
  register: UseFormRegister<T>,
  errors: FieldErrors<T>,
  className?: string
}

export const EditInput: React.FC<T,> = ({ label, type, name, register, errors, className }: EditInputProps<T>) => {
  return <div className="flex flex-col gap-1 group">
    <label htmlFor={name} className="text-[#666] text-[13px]">{label}</label>
    <input type={type} {...register(name, { required: true })} id={name} className={`border-[1px] group-hover:outline-1 outline outline-0 border-black rounded-sm py-1 px-2 ${className} text-[14px]`} />
    <p className="text-red-400 text-[13px]">{errors[name]?.message}</p>
  </div>
}