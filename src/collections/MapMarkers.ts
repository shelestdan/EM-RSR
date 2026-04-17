import type { CollectionConfig } from 'payload'

export const MapMarkers: CollectionConfig = {
  slug: 'map-markers',
  admin: {
    useAsTitle: 'title',
    group: 'Карта объектов',
    defaultColumns: ['title', 'type', 'region', 'year', 'updatedAt'],
    description: 'Метки на интерактивной карте выполненных объектов',
  },
  labels: {
    singular: 'Метка на карте',
    plural: 'Метки на карте',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Название объекта',
      required: true,
    },
    {
      name: 'lat',
      type: 'number',
      label: 'Широта (lat)',
      required: true,
      admin: {
        description: 'Например: 45.0355',
      },
    },
    {
      name: 'lng',
      type: 'number',
      label: 'Долгота (lng)',
      required: true,
      admin: {
        description: 'Например: 38.9753',
      },
    },
    {
      name: 'type',
      type: 'select',
      label: 'Тип объекта',
      required: true,
      options: [
        { label: '🏗 Капстроительство (с экспертизой)', value: 'capital_with_expertise' },
        { label: '🏛 Капстроительство (без экспертизы)', value: 'capital_no_expertise' },
        { label: '💧 Водоснабжение (линейный)', value: 'water_supply' },
        { label: '🔥 Газоснабжение (линейный)', value: 'gas_supply' },
        { label: '👁 Авторский надзор', value: 'author_supervision' },
        { label: '🏠 Газификация домовладений', value: 'gasification' },
      ],
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
      name: 'description',
      type: 'textarea',
      label: 'Описание (для всплывающего окна)',
    },
    {
      name: 'project',
      type: 'relationship',
      label: 'Связанный проект',
      relationTo: 'projects',
      admin: {
        description: 'Опционально — ссылка на страницу проекта',
      },
    },
  ],
}
