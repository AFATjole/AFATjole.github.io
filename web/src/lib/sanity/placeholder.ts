// Placeholder content used until Sanity is connected. Safe to delete once
// real content exists (and make `load` in ./client.ts require a project).
import type {Category, Expertise, Home, Page, Settings, TeamMember, WorkCard} from './types'
import type {PageId} from './content'

// Minimal Portable Text builder for sample rich text.
let key = 0
const block = (text: string, style: 'normal' | 'h2' = 'normal') => ({
  _type: 'block',
  _key: `b${key++}`,
  style,
  markDefs: [],
  children: [{_type: 'span', _key: `s${key++}`, text, marks: []}],
})

// Sample long-form copy to preview body typography. Not real company copy.
const introZh = [
  block('我们为品牌打造从概念到交付的一站式包装与周边解决方案。从高端礼盒、定制包袋，到零售陈列与美妆配套，每一件作品都源于对材质、结构与细节的反复推敲。'),
  block('我们相信，好的包装不只是保护产品的外壳，更是品牌与消费者之间的第一次对话。打开礼盒的那一刻，纸张的触感、磁吸的力度、内衬的贴合度，都在无声地讲述品牌的故事。'),
  block('关于我们的工作方式', 'h2'),
  block('每个项目都从倾听开始。我们与客户一起梳理品牌定位、目标人群与使用场景，再由设计、结构与生产团队协同推进打样、测试与量产。我们在可持续材料上持续投入，尽可能使用可回收纸材、减少塑料与不必要的装饰，让美观与责任并行。'),
  block('多年来，我们服务过美妆、珠宝、食品与生活方式等多个行业的品牌，交付过从几百套限量礼盒到数十万件常规产品的订单。无论规模大小，我们都以同样的标准对待每一个细节。'),
]
const introEn = [
  block('We create end-to-end packaging and merchandise solutions for brands, from concept to delivery. From premium gift sets and custom bags to retail displays and beauty essentials, every piece comes from careful iteration on material, structure and detail.'),
  block('We believe good packaging is more than a protective shell. It is the first conversation between a brand and its customer. The moment a box is opened, the feel of the paper, the pull of a magnetic closure and the fit of the insert all quietly tell the brand’s story.'),
  block('How we work', 'h2'),
  block('Every project starts with listening. We work with our clients to define positioning, audience and use cases, then our design, engineering and production teams move together through prototyping, testing and mass production. We keep investing in sustainable materials, favouring recyclable paper and cutting plastic and unnecessary embellishment, so that beauty and responsibility go hand in hand.'),
  block('Over the years we have served brands across beauty, jewellery, food and lifestyle, delivering everything from limited runs of a few hundred gift sets to orders of hundreds of thousands of units. Whatever the scale, every detail gets the same care.'),
]

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
    intro: {zh: introZh, en: introEn},
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
