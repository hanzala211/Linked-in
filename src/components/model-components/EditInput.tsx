import { FieldErrors, Path, UseFormRegister, FieldValues } from "react-hook-form";

interface EditInputProps<T extends FieldValues> {
  label: string;
  type: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  className?: string;
}

export const EditInput = <T extends FieldValues>({
  label,
  type,
  name,
  register,
  errors,
  className,
}: EditInputProps<T>) => {
  return (
    <div className="flex flex-col gap-1 group">
      <label htmlFor={name as string} className="text-[#666] text-[13px]">
        {label}
      </label>
      <input
        type={type}
        {...register(name, { required: true })}
        id={name as string}
        className={`border-[1px] group-hover:outline-1 outline outline-0 border-black rounded-sm py-1 px-2 ${className} text-[14px]`}
      />
      <p className="text-red-400 text-[13px]">
        {errors[name]?.message as string}
      </p>
    </div>
  );
};
