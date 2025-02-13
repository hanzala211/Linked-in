import { useJob } from '@context';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { AiOutlineBold, AiOutlineItalic, AiOutlineUnorderedList } from 'react-icons/ai';

export const JobContentEditor: React.FC = () => {
  const { setJobContent } = useJob()

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'tiptap-bullet-list',
          },
        },
      }),
      Bold,
      Italic,
    ],
    content: ``,
    onUpdate: ({ editor }) => {
      setJobContent(editor.getHTML())
    }
  });

  if (!editor) {
    return <p>Loading editor...</p>;
  }

  return (
    <div className="border border-gray-300 rounded-lg p-4 w-full mx-auto mt-2 bg-white">
      <div className="flex gap-2 p-2 border-b-[1px]">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded border border-gray-300 ${editor.isActive('bold') ? 'bg-gray-300' : 'bg-white'
            }`}
        >
          <AiOutlineBold size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded border border-gray-300 ${editor.isActive('italic') ? 'bg-gray-300' : 'bg-white'
            }`}
        >
          <AiOutlineItalic size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded border border-gray-300 ${editor.isActive('bulletList') ? 'bg-gray-300' : 'bg-white'
            }`}
        >
          <AiOutlineUnorderedList size={18} />
        </button>
      </div>
      {/* Editor Content */}
      <EditorContent
        editor={editor}
        className="max-w-none tiptap-editor p-3 h-96 rounded-lg mt-2"
      />
    </div>
  );
};