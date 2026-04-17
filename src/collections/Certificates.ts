import type { CollectionConfig } from 'payload'

export const Certificates: CollectionConfig = {
  slug: 'certificates',
  admin: {
    useAsTitle: 'title',
    group: 'Контент',
    defaultColumns: ['title', 'validUntil', 'updatedAt'],
  },
  labels: {
    singular: 'Сертификат / СРО',
    plural: 'Сертификаты и СРО',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Название',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      label: 'Тип',
      options: [
        { label: 'ISO сертификат', value: 'iso' },
        { label: 'СРО', value: 'sro' },
        { label: 'Другое', value: 'other' },
      ],
    },
    {
      name: 'number',
      type: 'text',
      label: 'Номер документа',
    },
    {
      name: 'validFrom',
      type: 'date',
      label: 'Дата начала действия',
    },
    {
      name: 'validUntil',
      type: 'date',
      label: 'Дата окончания действия',
    },
    {
      name: 'file',
      type: 'upload',
      label: 'Файл PDF',
      relationTo: 'media',
    },
    {
      name: 'coverImage',
      type: 'upload',
      label: 'Превью изображение',
      relationTo: 'media',
    },
    {
      name: 'order',
      type: 'number',
      label: 'Порядок',
      defaultValue: 0,
    },
  ],
}
