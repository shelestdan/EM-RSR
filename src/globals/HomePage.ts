import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  admin: {
    group: 'Контент',
  },
  label: 'Главная страница',
  fields: [
    {
      name: 'heroTagline',
      type: 'text',
      label: 'Слоган (Hero)',
      defaultValue: 'Проектирование и строительство инженерных систем',
    },
    {
      name: 'heroSubtext',
      type: 'textarea',
      label: 'Подзаголовок (Hero)',
      defaultValue:
        'Комплексные решения в области проектирования, строительства и авторского надзора объектов капитального строительства',
    },
    {
      name: 'heroCta',
      type: 'text',
      label: 'Текст кнопки CTA',
      defaultValue: 'Оставить заявку',
    },
    {
      name: 'principles',
      type: 'array',
      label: '3 ключевых принципа компании',
      minRows: 3,
      maxRows: 3,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Заголовок принципа',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Описание',
          required: true,
        },
        {
          name: 'icon',
          type: 'text',
          label: 'Иконка (название)',
        },
      ],
    },
    {
      name: 'stats',
      type: 'group',
      label: 'Статистика (счётчики)',
      fields: [
        {
          name: 'objectsCount',
          type: 'number',
          label: 'Выполненных объектов',
          defaultValue: 150,
        },
        {
          name: 'yearsExperience',
          type: 'number',
          label: 'Лет опыта',
          defaultValue: 3,
        },
        {
          name: 'regionsCount',
          type: 'number',
          label: 'Регионов присутствия',
          defaultValue: 5,
        },
        {
          name: 'gasificationCount',
          type: 'number',
          label: 'Проектов газификации',
          defaultValue: 524,
        },
      ],
    },
    {
      name: 'seoTitle',
      type: 'text',
      label: 'SEO: title',
    },
    {
      name: 'seoDescription',
      type: 'textarea',
      label: 'SEO: description',
    },
  ],
}
