import { UseFormRegister, UseFormWatch, FieldErrors } from "react-hook-form";
import { FormTypes } from "@types";

interface AuthPageInputProps<T> {
    item: FormTypes;
    register: UseFormRegister<T>;
    watch: UseFormWatch<T>;
    errors: FieldErrors<T>;
}

export const AuthPageInput = <T,>({ item, register, watch, errors }: AuthPageInputProps<T>) => {
    return (
        <div className="relative group">
            <label
                htmlFor={item.name}
                className={`text-[#666666] absolute left-3 top-1/2 transition-all duration-200 cursor-text ${watch(item.name)?.length > 0 ? "top-2.5 text-[14px]" : "group-focus-within:top-2.5"
                    } -translate-y-1/2`}
            >
                {item.text}
            </label>
            <input
                type={item.type}
                {...register(item.name)}
                autoComplete="off"
                id={item.name}
                className="px-3 py-3.5 border-[1px] text-[18px] group-focus-within:outline-[1px] border-[#666666] rounded-md w-full"
            />
            {errors[item.name] && <p className="text-red-500 text-sm mt-1">{(errors[item.name]?.message as string) || "Invalid input"}</p>}
        </div>
    );
};
