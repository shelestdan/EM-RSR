import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    group: 'Контент',
    defaultColumns: ['title', 'region', 'year', 'type', 'updatedAt'],
  },
  labels: {
    singular: 'Проект',
    plural: 'Проекты',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Название объекта',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
    },
    {
      name: 'location',
      type: 'text',
      label: 'Адрес / Место',
      required: true,
    },
    {
      name: 'region',
      type: 'select',
      label: 'Регион',
      required: true,
      options: [
        { label: 'Краснодарский край', value: 'krasnodar' },
        { label: 'Санкт-Петербург', value: 'spb' },
        { label: 'Ленинградская область', value: 'lenobl' },
        { label: 'Ростовская область', value: 'rostov' },
        { label: 'Ставропольский край', value: 'stavropol' },
        { label: 'Другой', value: 'other' },
      ],
    },
    {
      name: 'year',
      type: 'number',
      label: 'Год',
      required: true,
      min: 2000,
      max: 2030,
    },
    {
      name: 'type',
      type: 'select',
      label: 'Тип работ',
      required: true,
      options: [
        { label: 'Объект капстроительства (с экспертизой)', value: 'capital_with_expertise' },
        { label: 'Объект капстроительства (без экспертизы)', value: 'capital_no_expertise' },
        { label: 'Линейный объект водоснабжения', value: 'water_supply' },
        { label: 'Линейный объект газоснабжения', value: 'gas_supply' },
        { label: 'Авторский надзор', value: 'author_supervision' },
        { label: 'Газификация домовладений', value: 'gasification' },
      ],
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Описание',
    },
    {
      name: 'coverImage',
      type: 'upload',
      label: 'Главное фото',
      relationTo: 'media',
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Галерея',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Подпись',
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Показывать на главной',
      defaultValue: false,
    },
    {
      name: 'hasPositiveExpertise',
      type: 'checkbox',
      label: 'Получено положительное заключение экспертизы',
      defaultValue: false,
    },
  ],
}
