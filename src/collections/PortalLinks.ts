import type { CollectionConfig } from 'payload'

const isSignedIn = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)
const isAdmin = ({ req }: { req: { user?: { collection?: string } | null } }) =>
  req.user?.collection === 'users'

export const PortalLinks: CollectionConfig = {
  slug: 'portal-links',
  admin: {
    useAsTitle: 'title',
    group: 'Портал исполнителей',
    defaultColumns: ['title', 'category', 'order', 'updatedAt'],
    description: 'Ссылки на папки Synology Drive для исполнителей',
  },
  labels: {
    singular: 'Ссылка',
    plural: 'Ссылки',
  },
  access: {
    read: isSignedIn,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Название папки / раздела',
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      label: 'Ссылка (Synology Drive)',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Описание',
    },
    {
      name: 'category',
      type: 'select',
      label: 'Категория',
      options: [
        { label: 'Проектная документация', value: 'project_docs' },
        { label: 'Рабочая документация', value: 'working_docs' },
        { label: 'Сметы', value: 'estimates' },
        { label: 'Акты и договоры', value: 'contracts' },
        { label: 'Фотоматериалы', value: 'photos' },
        { label: 'Общее', value: 'general' },
      ],
      defaultValue: 'general',
    },
    {
      name: 'order',
      type: 'number',
      label: 'Порядок',
      defaultValue: 0,
    },
  ],
}
