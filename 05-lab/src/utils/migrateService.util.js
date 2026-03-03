/* task 12: migrate old data to include new fields */
export const migrateService = (s) => ({
  ...s,
  description: s.description || '',
  tags: s.tags || [],
})
