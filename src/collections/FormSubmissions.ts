import type { CollectionConfig } from 'payload'

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  admin: {
    useAsTitle: 'name',
    group: 'Заявки',
    defaultColumns: ['name', 'company', 'phone', 'createdAt'],
    description: 'Заявки с форм сайта',
  },
  labels: {
    singular: 'Заявка',
    plural: 'Заявки',
  },
  access: {
    create: () => true,
    read: ({ req }) => {
      // Only admins can read submissions
      return Boolean(req.user)
    },
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Имя',
      required: true,
    },
    {
      name: 'company',
      type: 'text',
      label: 'Компания',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Телефон',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Сообщение',
    },
    {
      name: 'consentGiven',
      type: 'checkbox',
      label: 'Согласие на обработку ПД',
      defaultValue: false,
    },
    {
      name: 'consentTimestamp',
      type: 'date',
      label: 'Время дачи согласия',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'ipAddress',
      type: 'text',
      label: 'IP адрес',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'source',
      type: 'text',
      label: 'Источник (страница)',
      admin: {
        readOnly: true,
      },
    },
  ],
}
