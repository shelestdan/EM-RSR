import type { CollectionConfig } from 'payload'

const isAdmin = ({ req }: { req: { user?: { collection?: string } | null } }) =>
  req.user?.collection === 'users'

export const MapWorkTypes: CollectionConfig = {
  slug: 'map-work-types',
  admin: {
    useAsTitle: 'label',
    group: 'Карта объектов',
    defaultColumns: ['label', 'slug', 'publicFilter', 'sortOrder', 'updatedAt'],
    description:
      'Направления/типы работ для фильтра карты, легенды и иконок меток. Новые записи идут первыми.',
  },
  labels: {
    singular: 'Направление карты',
    plural: 'Направления карты',
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
        description: 'Латиница без пробелов. Например: road-design.',
      },
    },
    {
      name: 'color',
      type: 'text',
      label: 'Цвет метки',
      defaultValue: '#546E7A',
      admin: {
        description: 'HEX-цвет. Например: #1565C0.',
      },
    },
    {
      name: 'shape',
      type: 'select',
      label: 'Форма метки',
      defaultValue: 'square',
      required: true,
      options: [
        { label: 'Квадрат', value: 'square' },
        { label: 'Круг в круге', value: 'circleInCircle' },
        { label: 'Ромб', value: 'diamond' },
        { label: 'Документ', value: 'document' },
        { label: 'Квадрат в квадрате', value: 'squareInSquare' },
        { label: 'Логотип', value: 'logo' },
      ],
    },
    {
      name: 'publicFilter',
      type: 'checkbox',
      label: 'Показывать в фильтре и легенде',
      defaultValue: true,
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
