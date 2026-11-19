// Placeholder values let the studio boot (and schema extraction run) before
// a Sanity project exists. Replace them via studio/.env.
export const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'placeholder'
export const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
export const studioHost = process.env.SANITY_STUDIO_HOST || undefined
