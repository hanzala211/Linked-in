import { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Heading from '@tiptap/extension-heading';
import Blockquote from '@tiptap/extension-blockquote';
import { FaArrowRight } from 'react-icons/fa';
import { usePost, useProfile } from '@context';
import { DEFAULT_PIC } from '@assets';
import { IUser } from '@types';
import Mention from "@tiptap/extension-mention";
import { errorToast } from '@helpers';

const CustomMention = Mention.extend({
  addAttributes() {
    return {
      id: {},
      label: {},
      username: {},
    };
  },

  renderHTML({ node }) {
    return [
      "a",
      {
        class: "mention bg-blue-100 text-blue-600 px-1 rounded",
        href: `/${node.attrs.username}`,
        target: "_blank",
        rel: "noopener noreferrer",
      },
      `@${node.attrs.label}`,
    ];
  },
}).configure({
  HTMLAttributes: {
    class: "mention",
  },
});

const NestedHeading = Heading.extend({
  renderHTML({ node, HTMLAttributes }) {
    const level = node.attrs.level;
    return [
      `h${level}`,
      { ...HTMLAttributes, class: `nested-heading-level-${level}` },
      0,
    ];
  },
});

const NestedBlockquote = Blockquote.extend({
  renderHTML({ HTMLAttributes }) {
    return ['blockquote', { ...HTMLAttributes, class: 'nested-blockquote' }, 0];
  },
});

export const ArticlePage: React.FC = () => {
  const { getFollow, followData } = useProfile()
  const { title, setTitle, editorContent, setEditorContent, setMentions, setIsPostCreatorOpen, setIsArticleCreator, selectedArticle, setCaptionValue, isEditingArticle } = usePost()
  const [isMentionOpen, setIsMentionOpen] = useState<boolean>(false)

  useEffect(() => {
    if (editor && selectedArticle?.mentions && isEditingArticle) {
      setTitle(selectedArticle?.title || "")
      setEditorContent(selectedArticle?.articleContent || "")
      setMentions(selectedArticle?.mentions || [])
      selectedArticle?.mentions.forEach((item) => {
        editor?.commands.insertContent({
          type: "mention",
          attrs: {
            id: item._id,
            label: `${item.firstName} ${item.lastName}`,
            username: item.userName
          },
        });
        if (selectedArticle.articleContent) {
          const mentionedIndex = selectedArticle?.articleContent.indexOf("@")
          const beforeText = selectedArticle?.articleContent.slice(0, mentionedIndex);
          const afterText = selectedArticle?.articleContent.slice(mentionedIndex).replace(`@${item.firstName} ${item.lastName}`, "");
          editor.commands.setContent(`${beforeText}${afterText}`)
        }
      })
    } else {
      setTitle("")
      setEditorContent("")
      setMentions([])
    }
  }, [selectedArticle])


  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false, blockquote: false }),
      Bold,
      Italic,
      NestedHeading,
      NestedBlockquote,
      TextAlign.configure({ types: ["paragraph", "heading", "blockquote", "codeBlock", "listItem"] }),
      Placeholder.configure({ placeholder: "Write here. You can also include @mentions" }),
      CustomMention,
    ],
    content: ``,
    onUpdate: ({ editor }) => {
      setEditorContent(editor.getHTML());

      const htmlText = editor.getHTML();
      const atIndex = htmlText.lastIndexOf("@");
      const afterText = htmlText.slice(atIndex + 1);
      const firstSpace = afterText.indexOf(" ");

      if (firstSpace === -1 && atIndex !== -1) {
        setIsMentionOpen(true);
        if (followData.length === 0) {
          getFollow();
        }
      } else {
        setIsMentionOpen(false);
      }
      setMentions((prev) =>
        prev.filter((item: IUser) =>
          htmlText.includes(item.firstName || item.lastName || "")
        )
      );
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    editor?.chain().focus();
    if (value === 'heading1') {
      editor?.chain().toggleHeading({ level: 1 }).run();
    } else if (value === 'heading2') {
      editor?.chain().toggleHeading({ level: 2 }).run();
    } else if (value === 'heading3') {
      editor?.chain().toggleHeading({ level: 3 }).run();
    } else if (value === 'blockquote') {
      editor?.chain().toggleBlockquote().run();
    } else if (value === 'code') {
      editor?.chain().toggleCodeBlock().run();
    } else {
      editor?.chain().setParagraph().run();
    }
  }

  const handleClick = (fullName: string, item: IUser) => {
    const { from } = editor!.state.selection;
    const atIndex = editor?.getText().lastIndexOf("@", from);

    if (atIndex !== -1) {
      editor?.commands.deleteRange({ from: atIndex || 0, to: from });
    }
    setMentions((prev: IUser[]) => [...prev, item]);

    editor?.commands.insertContent({ // it inserts contnent to node for the custom mentions and the styling is in index.css
      type: "mention",
      attrs: {
        id: item._id,
        label: fullName,
        username: item.userName
      },
    });

    setIsMentionOpen(false);
  };

  const handlePostOpen = () => {
    if (title.length > 0 && editorContent.length > 0) {
      setIsPostCreatorOpen(true)
      setIsArticleCreator(true)
      if (selectedArticle?.caption) {
        setCaptionValue(selectedArticle.caption)
      }
    } else {
      errorToast("Title And Body Can't be empty")
    }
  }

  if (!editor) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-14 w-full">

      <div className="bg-white p-4 rounded-t-lg border flex items-center justify-around">

        <div className="flex gap-2">
          <select
            className="px-3 py-1 border rounded bg-white"
            onChange={handleChange}
          >
            <option value="paragraph">Paragraph</option>
            <option value="heading1">Heading 1</option>
            <option value="heading2">Heading 2</option>
            <option value="heading3">Heading 3</option>
            <option value="blockquote">Blockquote</option>
            <option value="code">Code Block</option>
          </select>

          <div className="flex space-x-2">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`px-3 py-1 rounded transition ${editor.isActive('bold') ? 'bg-gray-300 font-bold' : 'hover:bg-gray-100'
                }`}
              aria-label="Toggle Bold"
            >
              <strong>B</strong>
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`px-3 py-1 rounded transition ${editor.isActive('italic') ? 'bg-gray-300 italic' : 'hover:bg-gray-100'
                }`}
              aria-label="Toggle Italic"
            >
              <em>I</em>
            </button>
          </div>
        </div>

        <button onClick={handlePostOpen} className="bg-[#0A66C2] flex items-center gap-2 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
          Next
          <FaArrowRight />
        </button>
      </div>

      <div className="w-full max-w-3xl mx-auto">

        <div className="bg-transparent p-3 mt-10">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full bg-transparent text-4xl font-light focus:outline-none placeholder-gray-400"
            maxLength={20}
          />
        </div>

        <div className="bg-transparent p-4 border rounded-lg shadow-sm relative">
          <EditorContent
            editor={editor}
            className="prose prose-sm outline-none [&_h1]:font-bold [&_h2]:font-bold [&_h3]:font-bold [&_p]:font-normal "
          />
          {isMentionOpen && followData.length > 0 &&
            <div className='absolute h-fit w-96 top-14 left-0 overflow-auto bg-white z-20 border-[1px] rounded-lg'>
              {followData.map((item, index, arr) => (
                <div onClick={() => handleClick(`${item.firstName} ${item.lastName}`, item)} key={index} className={`flex hover:bg-gray-100 transition-all duration-200 cursor-pointer items-center gap-4 py-4 px-4 ${index !== arr.length - 1 ? "border-b-[1px]" : ""}`}>
                  <img src={item.profilePic || DEFAULT_PIC} alt={`${item.firstName} Profile`} className='w-12 h-12 rounded-full' />
                  <div className=''>
                    <h1>{item.firstName} {item.lastName}</h1>
                    <p className='text-[#666]'>{item.headline}</p>
                  </div>
                </div>
              ))}
            </div>
          }
        </div>

        <div className="mt-4 p-2 bg-gray-100 border rounded">
          <h3 className="font-semibold">Editor Content:</h3>
          <div
            dangerouslySetInnerHTML={{ __html: editorContent }}
          />
        </div>
      </div>
    </div>
  );
};