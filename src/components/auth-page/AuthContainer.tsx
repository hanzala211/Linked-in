import { Link } from "react-router-dom";
import { AuthPageButton, AuthPageInput } from "@components";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "@context";
import { FormTypes } from "@types";
import { FadeLoader } from "react-spinners";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface AuthContainerProps<T extends Record<string, unknown>> {
    authInputForm: FormTypes[];
    onSubmit: SubmitHandler<T>;
    authBtnText: string;
    linkText: string | null;
    className: string;
    text: string | null;
    formSchema: z.ZodSchema<T>;
}

export const AuthContainer = <T extends Record<string, unknown>>({
    authInputForm,
    onSubmit,
    authBtnText,
    linkText,
    className,
    text,
    formSchema,
}: AuthContainerProps<T>) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<T>({
        resolver: zodResolver(formSchema),
    });

    const { isLoading, errorMessage } = useAuth();

    return (
        <div
            className={`flex ${className} ${isLoading ? "opacity-50" : ""} gap-5 flex-col shadow w-[22rem] p-4 relative rounded-lg shadow-gray-400`}
        >
            {isLoading && (
                <div className="absolute left-1/2 -translate-x-1/2 z-10 top-1/2 -translate-y-1/2">
                    <FadeLoader color="#0A66C2" />
                </div>
            )}
            <h1 className="text-[34px] font-medium">{authBtnText}</h1>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                {authInputForm.map((item, index) => (
                    <AuthPageInput<T>
                        key={index}
                        register={register}
                        watch={watch}
                        item={item}
                        errors={errors}
                    />
                ))}
                {linkText && (
                    <div>
                        <Link
                            to="#"
                            className="text-[#0A66C2] font-medium hover:underline hover:bg-[#D0E8FF] transition-all duration-200 py-1 px-1.5 rounded-full"
                        >
                            {linkText}
                        </Link>
                    </div>
                )}
                {text && <p className="text-[13px] text-[#666] text-center">{text}</p>}
                {errorMessage.length > 0 && (
                    <p className="text-red-500">{errorMessage}</p>
                )}
                <AuthPageButton text={authBtnText} />
            </form>
        </div>
    );
};