import type { CSSProperties, ReactNode } from "react";
import DOMPurify from "dompurify";
import { useCMS } from "./CMSProvider";
import { useContent } from "./useContent";

interface EditableRichTextProps {
  id: string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function EditableRichText({
  id,
  children,
  className,
  style,
}: EditableRichTextProps) {
  const override = useContent(id);
  const { editMode } = useCMS();

  const raw =
    override?.value !== undefined && override.value !== ""
      ? override.value
      : null;

  const sanitized = raw !== null ? DOMPurify.sanitize(raw) : null;

  const editStyle: CSSProperties | undefined = editMode
    ? {
        outline: "1px dashed rgba(59, 130, 246, 0.6)",
        outlineOffset: "2px",
        borderRadius: 2,
        cursor: "help",
        ...style,
      }
    : style;

  return (
    <div
      className={className}
      style={editStyle}
      data-cms-id={id}
      title={editMode ? `CMS: ${id}` : undefined}
    >
      {sanitized !== null ? (
        <div dangerouslySetInnerHTML={{ __html: sanitized }} />
      ) : (
        children
      )}
    </div>
  );
}
