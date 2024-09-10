export const portfolioSections = [
  'about',
  'technologies',
  'projects',
  'contact',
] as const

export const socialMedias = [
  'github',
  'x',
  'linkedin',
  'youtube',
  'tiktok',
  'website',
] as const

export const technologyCategories = [
  'language',
  'basic',
  'frontend',
  'backend',
  'mobile',
  'database',
  'devops',
  'testing',
  'tooling',
  'machine-learning',
  'design',
  'other',
] as const

export const technologyCategoryLabels: Record<typeof technologyCategories[number], string> = {
  basic: 'Basic',
  language: 'Languages',
  frontend: 'Frontend',
  backend: 'Backend',
  mobile: 'Mobile',
  database: 'Database',
  devops: 'DevOps',
  testing: 'Testing',
  tooling: 'Tooling',
  'machine-learning': 'Machine Learning',
  design: 'Design',
  other: 'Other',
}
