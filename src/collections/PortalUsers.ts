import type { CollectionConfig } from 'payload'

export const PortalUsers: CollectionConfig = {
  slug: 'portal-users',
  auth: {
    tokenExpiration: 2700, // 45 min in seconds
    maxLoginAttempts: 5,
    lockTime: 900000, // 15 min in ms
    useAPIKey: false,
  },
  admin: {
    useAsTitle: 'email',
    group: 'Портал исполнителей',
    defaultColumns: ['email', 'name', 'updatedAt'],
    description: 'Внешние исполнители с доступом к порталу',
  },
  labels: {
    singular: 'Исполнитель',
    plural: 'Исполнители',
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Имя / Компания',
      required: true,
    },
    {
      name: 'active',
      type: 'checkbox',
      label: 'Активен',
      defaultValue: true,
    },
    {
      name: 'note',
      type: 'textarea',
      label: 'Заметка (для администратора)',
    },
  ],
}
