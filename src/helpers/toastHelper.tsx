import { RxCross2 } from "react-icons/rx";
import { toast } from "sonner";

export const successToast = (status: string) => {
  toast.success(status, {
    action: {
      label: <button className="p-1 rounded text-black bg-white hover:bg-gray-200"> <RxCross2 className="w-4 h-4" /></button >,
      onClick: () => null,
    },
  });
}

export const errorToast = (status: string) => {
  toast.error(status, {
    action: {
      label: <button className="p-1 rounded text-black bg-white hover:bg-gray-200"> <RxCross2 className="w-4 h-4" /></button >,
      onClick: () => null,
    },
  });
}

export const infoToast = (status: string) => {
  toast.error(status, {
    action: {
      label: <button className="p-1 rounded text-black bg-white hover:bg-gray-200"> <RxCross2 className="w-4 h-4" /></button >,
      onClick: () => null,
    },
  });
}