import type { CollectionConfig } from 'payload'

const isAdmin = ({ req }: { req: { user?: { collection?: string } | null } }) =>
  req.user?.collection === 'users'

export const MapRegions: CollectionConfig = {
  slug: 'map-regions',
  admin: {
    useAsTitle: 'label',
    group: 'Карта объектов',
    defaultColumns: ['label', 'slug', 'sortOrder', 'updatedAt'],
    description:
      'Список регионов для фильтра карты. Новые регионы показываются на сайте первыми.',
  },
  labels: {
    singular: 'Регион карты',
    plural: 'Регионы карты',
  },
  access: {
    read: isAdmin,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      label: 'Название в фильтре',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Системный код',
      required: true,
      unique: true,
      admin: {
        description: 'Латиница без пробелов. Например: moskovskaya-oblast.',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      label: 'Порядок',
      defaultValue: 0,
      admin: {
        description:
          'Меньше число = выше. При одинаковом порядке новые записи идут первыми.',
      },
    },
  ],
}
