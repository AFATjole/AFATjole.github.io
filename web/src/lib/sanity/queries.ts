import {defineQuery} from 'groq'

// Reusable projections
const figure = /* groq */ `{..., asset->{_id, url, metadata{lqip, dimensions}}}`
const video = /* groq */ `{"url": file.asset->url, poster${figure}, caption}`
const workCard = /* groq */ `{
  _id, title, summary, client, year,
  "slug": slug.current,
  "category": category->{title, "slug": slug.current},
  coverImage${figure}
}`

export const settingsQuery = defineQuery(`*[_id == "siteSettings"][0]{
  siteName, tagline, contact, social, seo
}`)

export const homeQuery = defineQuery(`*[_id == "homePage"][0]{
  hero{heading, subheading, image${figure}, video${video}},
  intro,
  "featured": select(
    count(featuredWorks) > 0 => featuredWorks[]->${workCard},
    *[_type == "work" && featured == true] | order(order asc, year desc)[0...6]${workCard}
  ),
  seo
}`)

export const pageQuery = defineQuery(`*[_id == $id][0]{
  title, intro, heroImage${figure}, body, seo
}`)

export const categoriesQuery = defineQuery(`*[_type == "workCategory" && defined(slug.current)] | order(order asc){
  _id, title, description, coverImage${figure},
  "slug": slug.current,
  "count": count(*[_type == "work" && references(^._id)])
}`)

export const worksQuery = defineQuery(`*[_type == "work" && defined(slug.current)] | order(order asc, year desc)${workCard}`)

export const workQuery = defineQuery(`*[_type == "work" && slug.current == $slug][0]{
  _id, title, summary, body, client, year, seo,
  "slug": slug.current,
  "category": category->{title, "slug": slug.current},
  coverImage${figure},
  gallery[]{
    _key, _type,
    _type == "figure" => ${figure},
    _type == "video" => ${video}
  }
}`)

export const expertiseQuery = defineQuery(`*[_type == "expertise"] | order(order asc){
  _id, title, summary, body, image${figure}
}`)

export const teamQuery = defineQuery(`*[_type == "teamMember"] | order(order asc){
  _id, name, role, bio, photo${figure}
}`)
