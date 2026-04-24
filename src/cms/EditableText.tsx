import type { CSSProperties, ElementType, ReactNode } from "react";
import { useCMS } from "./CMSProvider";
import { useContent } from "./useContent";

interface EditableTextProps {
  id: string;
  /** Fallback content when no override exists. Typically a string. */
  children?: ReactNode;
  /** Tag to render as (default `span`). */
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

/**
 * Renders either the CMS override for `id` or the provided fallback `children`.
 *
 * When edit mode is active for an admin, the element is visually outlined so
 * editors can locate editable regions; clicks still behave normally (edits
 * happen in the side panel, not inline).
 */
export function EditableText({
  id,
  children,
  as,
  className,
  style,
}: EditableTextProps) {
  const override = useContent(id);
  const { editMode } = useCMS();

  const Tag = (as ?? "span") as ElementType;

  const content: ReactNode =
    override?.value !== undefined && override.value !== ""
      ? override.value
      : children;

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
    <Tag
      className={className}
      style={editStyle}
      data-cms-id={id}
      title={editMode ? `CMS: ${id}` : undefined}
    >
      {content}
    </Tag>
  );
}
