# Light CMS and Convex backend

This document describes the in-app content system used on the public site: how editors work, how content is stored in Convex, and how that differs from other tooling (for example the admin blog).

## Purpose

The goal is to let authenticated staff update marketing and informational copy, images, and some structured blocks (such as hero sliders and rich text) **without** deploying a code change. The site stays a normal React application; editable regions are identified by stable string IDs, and the database holds overrides. Where no override exists, the page falls back to the default text or markup baked into the components.

## High-level architecture

**URL-driven edit state.** Whether “edit mode” and the “edit panel” are active is encoded in the query string on the current page. That makes mode shareable via link and restorable on refresh, while keeping the rest of the routing unchanged.

**Authentication gates writes and UI.** Being logged in is necessary to turn on edit mode, open the panel, and persist changes. The application treats “editing allowed” as the combination of authenticated session plus edit mode in the URL, so a visitor could see edit-related query parameters but cannot act on them.

**A provider wraps the public app.** The edit provider only mounts the floating controls on non-admin routes. It coordinates session behavior (for example leaving edit mode if the session ends), a toggle for edit mode, a button to open the side panel, and the panel itself.

**Two editing concepts coexist.** The primary path is a structured side panel that lists every editable field for the current page. A secondary “live edit” prototype can attach to DOM nodes marked with a specific data attribute; that path is parallel to the panel and is not the main workflow unless those markers are present in the markup.

**Convex is the system of record.** The client subscribes to content queries and sends mutations to update or upload assets. The exact Convex module definitions live in your Convex project; the front end depends on content and media operations with predictable names and shapes.

## Content model

**Stable IDs.** Every editable string or asset is named with a stable ID (for example scoped by page and section, such as hero title or mission body). The same ID appears in the page registry, in the display components that render public content, and in the panel editors.

**Page registry.** A central registry file maps each logical page (home, about, contact, program pages, and so on) to groups of items: section, human-readable label, field type, and the ID. The edit panel uses this list to know which controls to show and which IDs to load or save. Adding a new field means adding a registry entry and wiring a display component to that ID on the page.

**Field types.** The system supports plain text, images, image slider collections (often stored as structured data such as a list of image URLs), and rich text. Rich text is sanitized on save to reduce unsafe markup.

**Display layer.** Public pages use display components that query Convex for a given ID. If a value exists, it is shown; if not, the component renders the static fallback content supplied in the page tree. Rich text and plain text are distinguished so HTML can be rendered when appropriate, with a fallback heuristic when type metadata is ambiguous.

## Edit panel workflow

**Panel visibility.** The panel is only relevant when edit mode is on. Opening the panel adds another query flag so the URL reflects “panel open” as well. Closing the panel clears the panel flag; leaving edit mode clears both the panel and edit flags.

**Data loading.** For efficiency, the panel loads all content for the current logical page in one request, then matches rows to the registry. Editors show current values, track dirty state, and save through a small set of mutation calls.

**Text and rich text.** Short text often uses a simple text area with an explicit save action when there are changes. Rich text uses the shared rich text editor, with save after edits and sanitization on submit.

**Images and sliders.** Image fields integrate with a media selector and storage flow: selecting or uploading an asset can create or reference a media record, then the content record is updated to point at the new URL and metadata. Sliders are edited as groups of images according to the same ID scheme.

**Sanitization and safety.** User-authored HTML in rich text is cleaned before persistence to align with what the site is willing to render.

## Live edit prototype (secondary path)

A separate class scans the document for elements carrying a specific data attribute tying the node to a content ID. In edit mode it highlights those elements and lets the user open a lightweight inline editor; saves go through the same content mutation as the panel, inferring the current page from the window location. This path duplicates some behavior of the panel but does not require opening the panel. It only activates for elements that are explicitly marked; if the public components do not set that attribute, the scanner finds nothing and this path is effectively unused.

**Sync note.** The live edit object maintains its own notion of on or off, while the app also keeps edit mode in the URL. The provider keeps those two in line when the user is authenticated.

## Convex backend (conceptual)

From the client’s perspective, the backend exposes at least: fetching a single item by ID, fetching all items for a page, fetching everything (useful for bulk or dev tooling), and updating content with a type and page for namespacing. Media upload flows through storing a media record and linking it from a content field.

**Authorization.** Server-side rules should ensure only authenticated, authorized roles can mutate content and media, even if the client hides UI for anonymous users.

**Data shape.** Each content row ties together the stable ID, the page key, a type discriminator, the payload (string or structured depending on type), and optional media references and alt text for images.

## How this differs from the blog admin

Long-form school journal or blog posts are handled in a dedicated admin experience with its own forms and storage patterns. The light CMS is for **site chrome and static-style pages** (headlines, CTAs, hero assets, program blurbs) driven by the registry and display components, not for full article management unless you explicitly connect them.

## Operational notes

**Path and page key alignment.** The hook that maps the browser path to a logical page key and any legacy code that infers a page from the path should stay consistent; drift causes saves to be attributed to the wrong page or wrong bucket in Convex.

**Session expiry.** The UI is designed to exit edit mode and notify the user if authentication drops (for example expired session), to avoid half-edited state with no ability to save.

**Admin routes.** The floating edit UI is suppressed on admin URLs so the marketing CMS does not fight with back-office tools.

**Editor experience caveats.** Some flows still use simple alerts for auth or error messaging; a future improvement would be a proper toast or inline validation layer.

This document is descriptive only; refer to the registry file, the edit provider, the edit panel, the display components, and your Convex functions for the authoritative behavior as the codebase evolves.
