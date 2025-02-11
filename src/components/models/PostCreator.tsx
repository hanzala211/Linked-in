import { EmojiIcon } from "@assets";
import { Toaster, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components";
import { usePost } from "@context";
import { overFlowHidder } from "@helpers";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { FaImage } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { SyncLoader } from "react-spinners";


export const PostCreator: React.FC = () => {
  const { isPostCreatorOpen, setIsPostCreatorOpen, selectedImage, setIsImageCreatorOpen, setSelectedImage, captionValue, setCaptionValue, createPost, isCreatingLoading, isEditingPost, editPost, isArticleCreator, setIsArticleCreator, title, createArticle } = usePost()
  const [isEmojiPicker, setIsEmojiPicker] = useState<boolean>(false)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const emojiIconRef = useRef<HTMLButtonElement | null>(null)
  const emojiPickerRef = useRef<HTMLDivElement | null>(null)


  useEffect(() => {
    window.addEventListener("click", handleClick)
    overFlowHidder(isPostCreatorOpen)
    return () => {
      window.removeEventListener("click", handleClick)
    }
  }, [isPostCreatorOpen])

  function handleClick(e: MouseEvent) {
    if (emojiIconRef.current && emojiPickerRef.current && !emojiIconRef.current.contains(e.target as Node) && !emojiPickerRef.current.contains(e.target as Node)) {
      setIsEmojiPicker(false);
    }
  }

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height to recalculate
      const maxHeight = selectedImage.length === 0 ? 500 : 190; // Maximum height in pixels
      if (textarea.scrollHeight > maxHeight) {
        textarea.style.height = `${maxHeight}px`;
        textarea.style.overflowY = "auto"; // Enable scrolling
      } else {
        textarea.style.height = `${textarea.scrollHeight}px`;
        textarea.style.overflowY = "hidden"; // Hide scrolling when not needed
      }
    }
  };

  const handleClose = () => {
    setIsPostCreatorOpen(false)
    setCaptionValue("")
    setSelectedImage([])
    setIsArticleCreator(false)
  }

  const handleSubmit = () => {
    if (isArticleCreator && !isEditingPost) {
      createArticle();
    } else if (!isEditingPost) {
      createPost();
    } else {
      editPost();
    }

  }

  return (
    <>
      <div onClick={handleClose} className={`${isPostCreatorOpen ? "opacity-100" : "opacity-0 pointer-events-none"} transition-all duration-200 overlay z-20`}></div>
      <div className={`${isPostCreatorOpen ? "opacity-100" : "opacity-0 pointer-events-none"} fixed transition-all duration-200 inset-0 rounded-lg bg-white z-50 w-full flex flex-col justify-between xl:max-w-[40%] sm:max-w-[70%] max-w-full left-1/2 -translate-x-1/2 h-full max-h-[65%] top-[5%] py-4`}>
        <div className="border-b-[2px] py-5">
          <button onClick={handleClose} className="hover:bg-slate-100 p-3 rounded-full absolute right-1 text-[25px] top-1">
            <RxCross2 />
          </button>
        </div>
        <div className="h-full">
          <textarea
            ref={textareaRef}
            name="postValue"
            id="postValue"
            value={captionValue}
            onChange={(e) => setCaptionValue(e.target.value)}
            placeholder="What do you want to talk about?"
            className="resize-none w-full mt-5 outline-none px-8 text-[20px] overflow-hidden max-h-[350px]"
            onInput={adjustHeight}
          ></textarea>
          <button ref={emojiIconRef} className="hover:opacity-50 duration-200 px-8" onClick={() => setIsEmojiPicker(true)}><EmojiIcon /></button>
          {isArticleCreator &&
            <div className="w-[75%] mt-2 mx-auto">
              <img src="/images/articleCreator.png" alt="Article Creator" className="w-full rounded-t-lg" />
              <div className="bg-[#0A66C3] text-white rounded-b-lg p-3">
                <h2 className="font-semibold">{title}</h2>
              </div>
            </div>
          }
          {isEmojiPicker &&
            <div className="absolute md:left-5 left-0" ref={emojiPickerRef}>
              <EmojiPicker width={350} height={400} onEmojiClick={(emoji) => setCaptionValue((prev) => prev + emoji.emoji)} />
            </div>
          }
        </div>
        {selectedImage.length > 0 &&
          <div className="w-full border-[1px] rounded-lg overflow-y-auto flex h-full justify-center relative">
            <button onClick={() => setSelectedImage([])} className="absolute right-2 text-white bg-black rounded-full p-1 top-1">
              <RxCross2 />
            </button>
            <img src={selectedImage[0]} alt="SelectedImage" />
          </div>
        }

        {!isArticleCreator && selectedImage.length === 0 &&
          <button onClick={() => setIsImageCreatorOpen(true)} className="px-8 w-fit mb-5 text-left">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger><FaImage className="text-[#666] text-[22px] cursor-pointer" /></TooltipTrigger>
                <TooltipContent className="bg-white border-[1px] shadow-sm shadow-slate-400 text-black">
                  <p>Add a photo</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </button>
        }

        <div className="py-5 w-full relative border-gray-300 border-t-[1px]">
          <button onClick={handleSubmit} disabled={!isCreatingLoading ? captionValue.length === 0 : isCreatingLoading} className={`px-4 py-1.5 absolute right-2 top-[20%] rounded-3xl ${captionValue.length > 0 ? "bg-[#0A66C2] text-white" : "bg-[#E8E8E8] opacity-70"}`}> {isCreatingLoading ? <SyncLoader color="white" size={10} /> : isEditingPost ? "Update" : "Post"}</button>
        </div>
      </div>

      <Toaster richColors position="bottom-left" theme="light" />
    </>
  );
};
