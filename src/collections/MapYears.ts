import type { CollectionConfig } from 'payload'

const isAdmin = ({ req }: { req: { user?: { collection?: string } | null } }) =>
  req.user?.collection === 'users'

export const MapYears: CollectionConfig = {
  slug: 'map-years',
  admin: {
    useAsTitle: 'year',
    group: 'Карта объектов',
    defaultColumns: ['year', 'sortOrder', 'updatedAt'],
    description:
      'Годы для фильтра карты. Новые годы добавляются в начало списка на сайте.',
  },
  labels: {
    singular: 'Год карты',
    plural: 'Годы карты',
  },
  access: {
    read: isAdmin,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'year',
      type: 'number',
      label: 'Год',
      required: true,
      unique: true,
      min: 2000,
      max: 2035,
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
