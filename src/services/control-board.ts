import type { CollectionSlug, GlobalSlug } from 'payload'

export const ROLES_WITH_ADMIN_ACCESS = ['admin', 'editor'] as const
export const DASHBOARD_SLUG = 'dashboard'

export const SITE_NAME_SHORT = 'Nexweb' as const
export const SITE_NAME = 'Nexweb Studio' as const

export const LINKABLE_COLLECTIONS: CollectionSlug[] = [
  'pages',
  'posts',
] as const
export const PREVIEWABLE_COLLECTIONS: CollectionSlug[] = [
  'pages',
  'posts',
] as const
export const RELATABLE_COLLECTIONS: CollectionSlug[] = [
  'pages',
  'posts',
  'categories',
] as const
export type RELATABLE_COLLECTIONS_TYPES = 'posts'

export const ENABLED_PLUGINS = {
  storage: true,
  formBuilder: true,
  seo: true,
  redirects: true,
  nestedDocs: true,
  search: true,
} as const

/* ----------------------------------- SEO ---------------------------------- */
export const SEO_ENABLED_COLLECTIONS: CollectionSlug[] = [
  'pages',
  'posts',
] as const
export const SEO_ENABLED_GLOBALS: GlobalSlug[] = [
  // 'get-started',
  // 'home-page',
] as const
/* --------------------------------- Search --------------------------------- */
export const INDEXED_COLLECTIONS: CollectionSlug[] = ['posts'] as const
export const INDEXED_TAXONOMY_COLLECTIONS: CollectionSlug[] = [] as const
/* -------------------------------- Redirects ------------------------------- */
export const REDIRECTABLE_COLLECTIONS: CollectionSlug[] = [
  'pages',
  'posts',
] as const
/* ------------------------------- Nested Docs ------------------------------ */
export const NESTED_COLLECTIONS: CollectionSlug[] = ['categories'] as const
/* ------------------------------- Page Blocks ------------------------------ */
// export const ENABLED_PAGE_BLOCKS = {
//   CardGrid: false,
//   Slider: false,
//   Statement: false,
//   CodeFeature: false,
//   StickyHighlights: false,
//   Callout: false,
//   Steps: false,
//   CallToAction: false,
//   Content: false,
//   ContentGrid: false,
//   FormBlock: false,
//   HoverCards: false,
//   HoverHighlights: false,
//   LinkGrid: false,
//   MediaContent: false,
//   MediaContentAccordion: false,
//   LogoGrid: false,
//   PortfolioCards: false,
//   PortfolioHighlight: false,
//   PortfolioParallax: false,
//   PricingBlock: false,
//   ReusableContent: false,
//   //
//   MediaBlock: false,
//   ExampleTabs: false,
// } as const

/* ---------------------------------- Keys ---------------------------------- */
// export const COOKIE_PREFIX = 'piker-cookie' as const
// export const COOKIE_STORE_KEY = `${COOKIE_PREFIX}-token` as const
// export const THEME_LOCAL_STORAGE_KEY = `${COOKIE_PREFIX}` as const
