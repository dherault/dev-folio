export const portfolioSections = [
  'hero',
  'skills',
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

export const skillCategories = [
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
  'other',
] as const

export const skillCategoryLabels: Record<typeof skillCategories[number], string> = {
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
  other: 'Other',
}
