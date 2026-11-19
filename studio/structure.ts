import type {StructureResolver} from 'sanity/structure'
import {CogIcon} from '@sanity/icons/Cog'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {HomeIcon} from '@sanity/icons/Home'
import {fixedPages} from './schemaTypes/documents/page'

const singleton = (S: Parameters<StructureResolver>[0], type: string, id: string, title: string, icon?: any) =>
  S.listItem()
    .title(title)
    .id(id)
    .icon(icon)
    .child(S.document().schemaType(type).documentId(id).title(title))

export const structure: StructureResolver = (S) =>
  S.list()
    .title('内容 Content')
    .items([
      singleton(S, 'siteSettings', 'siteSettings', '站点设置 Site settings', CogIcon),
      singleton(S, 'homePage', 'homePage', '首页 Home', HomeIcon),
      S.listItem()
        .title('页面 Pages')
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title('页面 Pages')
            .items(fixedPages.map((p) => singleton(S, 'page', p.id, p.title, DocumentTextIcon))),
        ),
      S.divider(),
      S.documentTypeListItem('work').title('作品 Works'),
      S.listItem()
        .title('作品（按分类）Works by category')
        .child(
          S.documentTypeList('workCategory')
            .title('分类 Categories')
            .child((categoryId) =>
              S.documentList()
                .title('作品 Works')
                .filter('_type == "work" && category._ref == $categoryId')
                .params({categoryId}),
            ),
        ),
      S.documentTypeListItem('workCategory').title('作品分类 Categories'),
      S.divider(),
      S.documentTypeListItem('expertise').title('专业能力 Expertise'),
      S.documentTypeListItem('teamMember').title('团队成员 Team'),
    ])
