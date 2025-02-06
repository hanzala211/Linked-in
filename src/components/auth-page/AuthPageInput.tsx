import { UseFormRegister, UseFormWatch, FieldErrors, Path } from "react-hook-form";
import { FormTypes } from "@types";

interface AuthPageInputProps<T extends Record<string, unknown>> {
    item: FormTypes;
    register: UseFormRegister<T>;
    watch: UseFormWatch<T>;
    errors: FieldErrors<T>;
}

export const AuthPageInput = <T extends Record<string, unknown>>({ item, register, watch, errors }: AuthPageInputProps<T>) => {
    const watchedValue = watch(item.name as Path<T>) as string | undefined;

    return (
        <div className="relative group">
            <label
                htmlFor={item.name}
                className={`text-[#666666] absolute left-3 top-1/2 transition-all duration-200 cursor-text ${watchedValue?.length ? "top-2.5 text-[14px]" : "group-focus-within:top-2.5"
                    } -translate-y-1/2`}
            >
                {item.text}
            </label>
            <input
                type={item.type}
                {...register(item.name as Path<T>)}
                autoComplete="off"
                id={item.name}
                className="px-3 py-3.5 border-[1px] text-[18px] group-focus-within:outline-[1px] border-[#666666] rounded-md w-full"
            />
            {errors[item.name] && (
                <p className="text-red-500 text-sm mt-1">
                    {(errors[item.name]?.message as string) || "Invalid input"}
                </p>
            )}
        </div>
    );
};
