import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    group: 'Контент',
    defaultColumns: ['title', 'order', 'updatedAt'],
  },
  labels: {
    singular: 'Услуга',
    plural: 'Услуги',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Название',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug (ЧПУ)',
      required: true,
      unique: true,
      admin: {
        description: 'URL-совместимый идентификатор, например: proektirovanie',
      },
    },
    {
      name: 'icon',
      type: 'text',
      label: 'Иконка (SVG код или название)',
      admin: {
        description: 'Название иконки из набора или SVG строка',
      },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Краткое описание (для карточки)',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Полное описание',
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Изображение',
      relationTo: 'media',
    },
    {
      name: 'order',
      type: 'number',
      label: 'Порядок отображения',
      defaultValue: 0,
      admin: {
        description: 'Меньший номер — выше в списке',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Отображать на главной',
      defaultValue: false,
    },
  ],
}
