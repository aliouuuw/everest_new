import type { CSSProperties, ImgHTMLAttributes } from "react";
import { useCMS } from "./CMSProvider";
import { useContent } from "./useContent";

interface EditableImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  id: string;
  src: string;
}

/**
 * Renders an <img> using the CMS override URL for `id` when available,
 * falling back to the hardcoded `src`. Follows the same edit-mode outline
 * convention as EditableText and EditableRichText.
 */
export function EditableImage({ id, src, className, style, alt, ...rest }: EditableImageProps) {
  const override = useContent(id);
  const { editMode } = useCMS();

  const resolvedSrc =
    override?.value !== undefined && override.value !== "" ? override.value : src;

  const editStyle: CSSProperties | undefined = editMode
    ? {
        outline: "1px dashed rgba(59, 130, 246, 0.6)",
        outlineOffset: "2px",
        cursor: "help",
        ...style,
      }
    : style;

  return (
    <img
      {...rest}
      src={resolvedSrc}
      alt={alt}
      className={className}
      style={editStyle}
      data-cms-id={id}
      title={editMode ? `CMS: ${id}` : undefined}
    />
  );
}
