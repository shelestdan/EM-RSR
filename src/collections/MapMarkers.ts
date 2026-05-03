import type { CollectionConfig } from 'payload'

const isAdmin = ({ req }: { req: { user?: { collection?: string } | null } }) =>
  req.user?.collection === 'users'

export const MapMarkers: CollectionConfig = {
  slug: 'map-markers',
  admin: {
    useAsTitle: 'title',
    group: 'Карта объектов',
    defaultColumns: ['title', 'workTypeRef', 'regionRef', 'yearRef', 'updatedAt'],
    description:
      'Метки публичной карты. Регион, год и направление берутся из админ-списков карты.',
  },
  labels: {
    singular: 'Метка на карте',
    plural: 'Метки на карте',
  },
  access: {
    read: isAdmin,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
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
      name: 'regionRef',
      type: 'relationship',
      label: 'Регион из списка карты',
      relationTo: 'map-regions',
      admin: {
        description: 'Основное поле фильтра региона. Новые регионы создаются в «Регионы карты».',
      },
    },
    {
      name: 'yearRef',
      type: 'relationship',
      label: 'Год из списка карты',
      relationTo: 'map-years',
      admin: {
        description: 'Основное поле фильтра года. Новые годы создаются в «Годы карты».',
      },
    },
    {
      name: 'workTypeRef',
      type: 'relationship',
      label: 'Направление из списка карты',
      relationTo: 'map-work-types',
      admin: {
        description:
          'Основное поле фильтра направления и иконки. Новые направления создаются в «Направления карты».',
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
      label: 'Fallback категория / обозначение на карте',
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
        description:
          'Для старых меток без «Направления из списка карты». Новые метки лучше связывать с админ-списком.',
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
      label: 'Fallback регион',
      options: [
        { label: 'Краснодарский край', value: 'krasnodar' },
        { label: 'Санкт-Петербург', value: 'spb' },
        { label: 'Ленинградская область', value: 'lenobl' },
        { label: 'Ростовская область', value: 'rostov' },
        { label: 'Ставропольский край', value: 'stavropol' },
        { label: 'Другой', value: 'other' },
      ],
      admin: {
        description: 'Для старых меток без «Регион из списка карты».',
      },
    },
    {
      name: 'year',
      type: 'number',
      label: 'Fallback год',
      min: 2000,
      max: 2035,
      admin: {
        description: 'Для старых меток без «Год из списка карты».',
      },
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
