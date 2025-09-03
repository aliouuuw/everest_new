import React, { useCallback, useEffect, useRef } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import { Table }  from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import { 
  FaBold, 
  FaCode, 
  FaImage, 
  FaItalic,
  FaLink,
  FaListOl,
  FaListUl,
  FaQuoteLeft,
  FaRedo,
  FaStrikethrough,
  FaTable,
  FaUnderline,
  FaUndo,
  FaUnlink
} from 'react-icons/fa';

interface EnhancedRichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  onImageUpload?: (file: File) => Promise<string>;
  placeholder?: string;
  className?: string;
  readOnly?: boolean;
}

const EnhancedRichTextEditor: React.FC<EnhancedRichTextEditorProps> = ({
  value,
  onChange,
  onImageUpload,
  className = '',
  readOnly = false
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6]
        }
      }),
      Underline,
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg shadow-md mx-auto my-4'
        }
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 hover:text-blue-800 underline'
        }
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'border-collapse border border-gray-300 my-4'
        }
      }),
      TableRow,
      TableCell.configure({
        HTMLAttributes: {
          class: 'border border-gray-300 px-4 py-2'
        }
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: 'border border-gray-300 px-4 py-2 bg-gray-100 font-semibold'
        }
      })
    ],
    content: value,
    onUpdate: ({ editor: editorInstance }) => {
      onChange(editorInstance.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[400px] p-4'
      }
    },
    editable: !readOnly
  });

  const handleImageUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onImageUpload) {
      try {
        const imageUrl = await onImageUpload(file);
        editor.chain().focus().setImage({ src: imageUrl }).run();
      } catch (error) {
        console.error('Image upload failed:', error);
        // You could add a toast notification here
      }
    }
    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [onImageUpload, editor]);

  const insertTable = useCallback(() => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  }, [editor]);

  const addColumnBefore = useCallback(() => {
    editor.chain().focus().addColumnBefore().run();
  }, [editor]);

  const addColumnAfter = useCallback(() => {
    editor.chain().focus().addColumnAfter().run();
  }, [editor]);

  const deleteColumn = useCallback(() => {
    editor.chain().focus().deleteColumn().run();
  }, [editor]);

  const addRowBefore = useCallback(() => {
    editor.chain().focus().addRowBefore().run();
  }, [editor]);

  const addRowAfter = useCallback(() => {
    editor.chain().focus().addRowAfter().run();
  }, [editor]);

  const deleteRow = useCallback(() => {
    editor.chain().focus().deleteRow().run();
  }, [editor]);

  const deleteTable = useCallback(() => {
    editor.chain().focus().deleteTable().run();
  }, [editor]);

  const setLink = useCallback(() => {
    const url = window.prompt('Enter URL');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  }, [editor]);

  const unsetLink = useCallback(() => {
    editor.chain().focus().unsetLink().run();
  }, [editor]);

  // Update editor content when value prop changes (for editing existing publications)
  useEffect(() => {
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  // Enhanced toolbar with more formatting options
  const Toolbar = () => (
    <div className="bg-gray-50 border-b border-gray-300 p-3 flex flex-wrap gap-2 items-center">
      {/* Undo/Redo */}
      <div className="flex gap-1 mr-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-2 hover:bg-gray-200 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Undo"
        >
          <FaUndo className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-2 hover:bg-gray-200 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Redo"
        >
          <FaRedo className="w-4 h-4" />
        </button>
      </div>

      <div className="w-px h-6 bg-gray-300" />

      {/* Text Formatting */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 hover:bg-gray-200 rounded transition-colors ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
        title="Bold"
      >
        <FaBold className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 hover:bg-gray-200 rounded transition-colors ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
        title="Italic"
      >
        <FaItalic className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-2 hover:bg-gray-200 rounded transition-colors ${editor.isActive('underline') ? 'bg-gray-200' : ''}`}
        title="Underline"
      >
        <FaUnderline className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`p-2 hover:bg-gray-200 rounded transition-colors ${editor.isActive('strike') ? 'bg-gray-200' : ''}`}
        title="Strikethrough"
      >
        <FaStrikethrough className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={`p-2 hover:bg-gray-200 rounded transition-colors ${editor.isActive('code') ? 'bg-gray-200' : ''}`}
        title="Code"
      >
        <FaCode className="w-4 h-4" />
      </button>
      
      <div className="w-px h-6 bg-gray-300" />

      {/* Headings */}
      <select
        onChange={(e) => {
          const level = parseInt(e.target.value);
          if (level === 0) {
            editor.chain().focus().setParagraph().run();
          } else {
            editor.chain().focus().toggleHeading({ level: level as any }).run();
          }
        }}
        value={editor.isActive('heading', { level: 1 }) ? '1' : 
               editor.isActive('heading', { level: 2 }) ? '2' : 
               editor.isActive('heading', { level: 3 }) ? '3' : 
               editor.isActive('heading', { level: 4 }) ? '4' : 
               editor.isActive('heading', { level: 5 }) ? '5' : 
               editor.isActive('heading', { level: 6 }) ? '6' : '0'}
        className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-200 transition-colors"
        title="Heading"
      >
        <option value="0">Normal</option>
        <option value="1">Heading 1</option>
        <option value="2">Heading 2</option>
        <option value="3">Heading 3</option>
        <option value="4">Heading 4</option>
        <option value="5">Heading 5</option>
        <option value="6">Heading 6</option>
      </select>

      <div className="w-px h-6 bg-gray-300" />

      {/* Lists */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 hover:bg-gray-200 rounded transition-colors ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
        title="Bullet List"
      >
        <FaListUl className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 hover:bg-gray-200 rounded transition-colors ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
        title="Numbered List"
      >
        <FaListOl className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-gray-300" />

      {/* Quote */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 hover:bg-gray-200 rounded transition-colors ${editor.isActive('blockquote') ? 'bg-gray-200' : ''}`}
        title="Quote"
      >
        <FaQuoteLeft className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-gray-300" />

      {/* Links */}
      <button
        type="button"
        onClick={setLink}
        className={`p-2 hover:bg-gray-200 rounded transition-colors ${editor.isActive('link') ? 'bg-gray-200' : ''}`}
        title="Insert Link"
      >
        <FaLink className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={unsetLink}
        disabled={!editor.isActive('link')}
        className="p-2 hover:bg-gray-200 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title="Remove Link"
      >
        <FaUnlink className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-gray-300" />

      {/* Media */}
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="p-2 hover:bg-gray-200 rounded transition-colors"
        title="Insert Image"
      >
        <FaImage className="w-4 h-4" />
      </button>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      <div className="w-px h-6 bg-gray-300" />

      {/* Tables */}
      <button
        type="button"
        onClick={insertTable}
        className="p-2 hover:bg-gray-200 rounded transition-colors"
        title="Insert Table"
      >
        <FaTable className="w-4 h-4" />
      </button>

      {/* Table Controls - only show when cursor is in a table */}
      {editor.isActive('table') && (
        <>
          <div className="w-px h-6 bg-gray-300" />
          <div className="flex gap-1">
            <button
              type="button"
              onClick={addColumnBefore}
              className="px-2 py-1 text-xs bg-blue-100 hover:bg-blue-200 rounded transition-colors"
              title="Add Column Before"
            >
              +Col
            </button>
            <button
              type="button"
              onClick={addColumnAfter}
              className="px-2 py-1 text-xs bg-blue-100 hover:bg-blue-200 rounded transition-colors"
              title="Add Column After"
            >
              Col+
            </button>
            <button
              type="button"
              onClick={deleteColumn}
              className="px-2 py-1 text-xs bg-red-100 hover:bg-red-200 rounded transition-colors"
              title="Delete Column"
            >
              -Col
            </button>
            <button
              type="button"
              onClick={addRowBefore}
              className="px-2 py-1 text-xs bg-blue-100 hover:bg-blue-200 rounded transition-colors"
              title="Add Row Before"
            >
              +Row
            </button>
            <button
              type="button"
              onClick={addRowAfter}
              className="px-2 py-1 text-xs bg-blue-100 hover:bg-blue-200 rounded transition-colors"
              title="Add Row After"
            >
              Row+
            </button>
            <button
              type="button"
              onClick={deleteRow}
              className="px-2 py-1 text-xs bg-red-100 hover:bg-red-200 rounded transition-colors"
              title="Delete Row"
            >
              -Row
            </button>
            <button
              type="button"
              onClick={deleteTable}
              className="px-2 py-1 text-xs bg-red-100 hover:bg-red-200 rounded transition-colors"
              title="Delete Table"
            >
              -Table
            </button>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className={`border border-gray-300 rounded-lg overflow-hidden ${className}`}>
      {!readOnly && <Toolbar />}
      <EditorContent editor={editor} />
      
      {/* Enhanced styling for the editor content */}
      <style>{`
        .ProseMirror {
          outline: none;
          min-height: 400px;
          padding: 1rem;
        }

        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
        }

        .ProseMirror h1 {
          font-size: 2rem;
          font-weight: bold;
          margin: 1.5rem 0 1rem 0;
          color: #1f2937;
        }

        .ProseMirror h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 1.25rem 0 0.75rem 0;
          color: #374151;
        }

        .ProseMirror h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 1rem 0 0.5rem 0;
          color: #4b5563;
        }

        .ProseMirror h4, .ProseMirror h5, .ProseMirror h6 {
          font-size: 1.125rem;
          font-weight: bold;
          margin: 0.75rem 0 0.5rem 0;
          color: #6b7280;
        }

        .ProseMirror p {
          margin: 0.75rem 0;
          line-height: 1.6;
        }

        .ProseMirror ul {
          margin: 0.75rem 0;
          padding-left: 1.5rem;
          list-style-type: disc;
        }

        .ProseMirror ol {
          margin: 0.75rem 0;
          padding-left: 1.5rem;
          list-style-type: decimal;
        }

        .ProseMirror ul ul {
          list-style-type: circle;
        }

        .ProseMirror ul ul ul {
          list-style-type: square;
        }

        .ProseMirror li {
          margin: 0.25rem 0;
          display: list-item;
        }

        .ProseMirror li p {
          margin: 0;
        }

        .ProseMirror blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: #6b7280;
          background-color: #f9fafb;
          padding: 1rem;
          border-radius: 0.375rem;
        }

        .ProseMirror a {
          color: #3b82f6;
          text-decoration: underline;
        }

        .ProseMirror a:hover {
          color: #1d4ed8;
        }

        .ProseMirror img {
          max-width: 100%;
          height: auto;
          margin: 1rem auto;
          display: block;
        }

        .ProseMirror code {
          background-color: #f3f4f6;
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 0.875rem;
        }

        .ProseMirror pre {
          background-color: #1f2937;
          color: #f9fafb;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1rem 0;
        }

        .ProseMirror pre code {
          background-color: transparent;
          padding: 0;
          color: inherit;
        }

        .ProseMirror table {
          border-collapse: collapse;
          margin: 1rem 0;
          width: 100%;
        }

        .ProseMirror th,
        .ProseMirror td {
          border: 1px solid #d1d5db;
          padding: 0.5rem;
          text-align: left;
        }

        .ProseMirror th {
          background-color: #f9fafb;
          font-weight: 600;
        }

        .ProseMirror .selectedCell:after {
          background: rgba(200, 200, 255, 0.4);
          content: "";
          left: 0; right: 0; top: 0; bottom: 0;
          pointer-events: none;
          position: absolute;
          z-index: 2;
        }

        .ProseMirror .column-resize-handle {
          background-color: #adf;
          bottom: -2px;
          position: absolute;
          right: -2px;
          pointer-events: none;
          top: 0;
          width: 4px;
        }

        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
        }
      `}</style>
    </div>
  );
};

export default EnhancedRichTextEditor;
