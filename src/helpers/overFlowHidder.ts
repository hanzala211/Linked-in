export const overFlowHidder = (isOpen: boolean) => {
  if (typeof document !== "undefined") {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }
};