// Placeholder content used until Sanity is connected. Safe to delete once
// real content exists (and make `load` in ./client.ts require a project).
import type {Category, Expertise, Home, Page, Settings, TeamMember, WorkCard} from './types'
import type {PageId} from './content'

const page = (zh: string, en: string): Page => ({
  title: {zh, en},
  intro: {zh: '内容即将上线，敬请期待。', en: 'Content coming soon.'},
})

const categories: Category[] = [
  {_id: 'gift-sets', slug: 'gift-sets', title: {zh: '礼盒套装', en: 'Gift Sets'}, count: 1},
  {_id: 'bags-cases', slug: 'bags-cases', title: {zh: '包袋与收纳', en: 'Bags & Cases'}, count: 1},
  {_id: 'retail-beauty', slug: 'retail-beauty', title: {zh: '零售与美妆配套', en: 'Retail & Beauty Essentials'}, count: 1},
]

const works: WorkCard[] = categories.map((c) => ({
  _id: `sample-${c.slug}`,
  slug: `sample-${c.slug}`,
  title: {zh: `示例作品 · ${c.title?.zh}`, en: `Sample project · ${c.title?.en}`},
  summary: {zh: '这是一条占位作品，连接 Sanity 后会被真实内容替换。', en: 'Placeholder project, replaced by real content once Sanity is connected.'},
  year: 2026,
  category: {title: c.title, slug: c.slug},
}))

export const placeholder = {
  settings: {
    siteName: {zh: 'AFATjole', en: 'AFATjole'},
    tagline: {zh: '网站建设中', en: 'Website under construction'},
    contact: {email: 'hello@example.com'},
  } satisfies Settings,
  home: {
    hero: {
      heading: {zh: '网站建设中', en: 'Coming soon'},
      subheading: {zh: '新网站正在搭建，内容即将上线。', en: 'Our new website is on its way.'},
    },
    featured: works,
  } satisfies Home,
  pages: {
    'page-work': page('作品', 'Our Work'),
    'page-expertise': page('专业能力', 'Expertise'),
    'page-team': page('团队', 'The Team'),
    'page-csr': page('企业责任', 'CSR'),
    'page-about': page('关于', 'About'),
    'page-contact': page('联系', 'Contact'),
  } satisfies Record<PageId, Page>,
  categories,
  works,
  expertise: [] as Expertise[],
  team: [] as TeamMember[],
}
