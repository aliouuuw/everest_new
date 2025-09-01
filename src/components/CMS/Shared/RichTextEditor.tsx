import React, { useRef, useCallback } from 'react';
import { FaBold, FaItalic, FaUnderline, FaListUl, FaListOl, FaQuoteLeft } from 'react-icons/fa';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Start writing...',
  className = ''
}) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const execCommand = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  }, [handleInput]);

  const insertLink = useCallback(() => {
    const url = prompt('Enter URL:');
    if (url) {
      execCommand('createLink', url);
    }
  }, [execCommand]);

  const insertImage = useCallback(() => {
    const url = prompt('Enter image URL:');
    if (url) {
      execCommand('insertImage', url);
    }
  }, [execCommand]);

  return (
    <div className={`border border-gray-300 rounded-lg overflow-hidden ${className}`}>
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
        <button
          type="button"
          onClick={() => execCommand('bold')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Bold"
        >
          <FaBold className="text-sm" />
        </button>

        <button
          type="button"
          onClick={() => execCommand('italic')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Italic"
        >
          <FaItalic className="text-sm" />
        </button>

        <button
          type="button"
          onClick={() => execCommand('underline')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Underline"
        >
          <FaUnderline className="text-sm" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => execCommand('insertUnorderedList')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Bullet List"
        >
          <FaListUl className="text-sm" />
        </button>

        <button
          type="button"
          onClick={() => execCommand('insertOrderedList')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Numbered List"
        >
          <FaListOl className="text-sm" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => execCommand('formatBlock', 'blockquote')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Quote"
        >
          <FaQuoteLeft className="text-sm" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <select
          onChange={(e) => execCommand('formatBlock', e.target.value)}
          className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-200 transition-colors"
          title="Heading"
        >
          <option value="div">Normal</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
        </select>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={insertLink}
          className="px-3 py-1 text-sm hover:bg-gray-200 rounded transition-colors"
          title="Insert Link"
        >
          Link
        </button>

        <button
          type="button"
          onClick={insertImage}
          className="px-3 py-1 text-sm hover:bg-gray-200 rounded transition-colors"
          title="Insert Image"
        >
          Image
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        dangerouslySetInnerHTML={{ __html: value }}
        onInput={handleInput}
        className="min-h-[300px] p-4 focus:outline-none prose max-w-none"
        data-placeholder={placeholder}
        style={{
          // Add placeholder styling
          position: 'relative'
        }}
      />

      {/* Placeholder styling */}
      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          font-style: italic;
          pointer-events: none;
          position: absolute;
          top: 1rem;
          left: 1rem;
        }

        [contenteditable]:focus {
          outline: none;
        }

        .prose {
          line-height: 1.6;
        }

        .prose h1 {
          font-size: 2rem;
          font-weight: bold;
          margin: 1rem 0 0.5rem 0;
        }

        .prose h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 1rem 0 0.5rem 0;
        }

        .prose h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 1rem 0 0.5rem 0;
        }

        .prose h4 {
          font-size: 1.125rem;
          font-weight: bold;
          margin: 1rem 0 0.5rem 0;
        }

        .prose p {
          margin: 0.5rem 0;
        }

        .prose ul, .prose ol {
          margin: 0.5rem 0;
          padding-left: 1.5rem;
        }

        .prose blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1rem;
          margin: 0.5rem 0;
          font-style: italic;
          color: #6b7280;
        }

        .prose a {
          color: #3b82f6;
          text-decoration: underline;
        }

        .prose img {
          max-width: 100%;
          height: auto;
          margin: 0.5rem 0;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
