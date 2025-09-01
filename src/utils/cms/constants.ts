// CMS Constants

export const PUBLICATION_CATEGORIES = [
  { value: 'revues-hebdo', label: 'Revue Hebdomadaire' },
  { value: 'revues-mensuelles', label: 'Revue Mensuelle' },
  { value: 'teaser-dividende', label: 'Teaser Dividende' },
  { value: 'marches', label: 'Marchés' },
  { value: 'analyses', label: 'Analyses' },
] as const;

export const PUBLICATION_STATUS = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'archived', label: 'Archived' },
] as const;

export const USER_ROLES = [
  { value: 'admin', label: 'Administrator' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' },
] as const;

export const MEDIA_TYPES = [
  { value: 'image', label: 'Image' },
  { value: 'video', label: 'Video' },
  { value: 'document', label: 'Document' },
] as const;

// Pagination
export const ITEMS_PER_PAGE = 20;
export const MAX_ITEMS_PER_PAGE = 100;

// File upload limits
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const ALLOWED_DOCUMENT_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
