import type { CollectionConfig } from 'payload'

export const MapMarkers: CollectionConfig = {
  slug: 'map-markers',
  admin: {
    useAsTitle: 'title',
    group: 'Карта объектов',
    defaultColumns: ['title', 'category', 'region', 'year', 'updatedAt'],
    description:
      'Заготовка будущей админки меток. Сейчас публичная карта берёт данные из staticMarkers, источник — DOCX со ссылками на Yandex constructor.',
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
      label: 'Legacy тип объекта',
      options: [
        { label: 'Проектирование', value: 'proektirovanie' },
        { label: 'Изыскания', value: 'izyskaniya' },
        { label: 'Авторский надзор', value: 'nadzor' },
        { label: 'Газификация домовладений', value: 'gasification' },
      ],
      admin: {
        description: 'Служебное поле для совместимости со старой схемой.',
      },
    },
    {
      name: 'category',
      type: 'select',
      label: 'Категория / обозначение на карте',
      required: true,
      options: [
        { label: 'Проектные работы и изыскательские работы', value: 'combined' },
        { label: 'Инженерные изыскания и кадастр', value: 'surveys' },
        { label: 'Водоснабжение', value: 'water' },
        { label: 'Канализация', value: 'sewer' },
        { label: 'Газоснабжение', value: 'gas' },
        { label: 'Электроснабжение', value: 'electricity' },
        { label: 'Теплотрасса', value: 'heating' },
        { label: 'Котельные', value: 'boiler' },
        { label: 'Иные объекты', value: 'other' },
        { label: 'Авторский надзор', value: 'authorSupervision' },
        { label: 'Сопровождение', value: 'support' },
      ],
      admin: {
        description: 'Значения и обозначения соответствуют файлу «Обозначение на карте объектов».',
      },
    },
    {
      name: 'contractType',
      type: 'select',
      label: 'Формат участия',
      options: [
        { label: 'ГЕНПОДРЯД', value: 'ГЕНПОДРЯД' },
        { label: 'СУБПОДРЯД', value: 'СУБПОДРЯД' },
        { label: 'ПО ДОГОВОРУ', value: 'ПО ДОГОВОРУ' },
        { label: 'В СОСТАВЕ КОМАНДЫ', value: 'В СОСТАВЕ КОМАНДЫ' },
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
      label: 'Описание работ',
      admin: {
        description: 'Будущее поле popup: выполняемые работы.',
      },
    },
    {
      name: 'positiveConclusion',
      type: 'textarea',
      label: 'Положительное заключение',
      admin: {
        description: 'Опционально. Если пусто, в popup блок не выводится.',
      },
    },
    {
      name: 'conclusionUrl',
      type: 'text',
      label: 'Ссылка на заключение',
    },
    {
      name: 'yandexMapsUrl',
      type: 'text',
      label: 'Ссылка «Открыть в Яндекс.Картах»',
      admin: {
        description: 'Если пусто, публичная карта сможет собрать ссылку из координат.',
      },
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
