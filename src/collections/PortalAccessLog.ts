import type { CollectionConfig } from 'payload'

export const PortalAccessLog: CollectionConfig = {
  slug: 'portal-access-log',
  admin: {
    useAsTitle: 'userEmail',
    group: 'Портал исполнителей',
    defaultColumns: ['userEmail', 'ip', 'event', 'createdAt'],
    description: 'Журнал входов в портал исполнителей',
  },
  labels: {
    singular: 'Запись журнала',
    plural: 'Журнал входов',
  },
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: () => false,
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'userEmail',
      type: 'text',
      label: 'Email пользователя',
    },
    {
      name: 'ip',
      type: 'text',
      label: 'IP адрес',
    },
    {
      name: 'userAgent',
      type: 'text',
      label: 'User Agent',
    },
    {
      name: 'event',
      type: 'select',
      label: 'Событие',
      options: [
        { label: 'Успешный вход', value: 'login_success' },
        { label: 'Неудачная попытка', value: 'login_failed' },
        { label: 'Выход', value: 'logout' },
        { label: 'Блокировка (превышение попыток)', value: 'locked_out' },
      ],
    },
  ],
}
