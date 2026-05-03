import type { CollectionConfig } from 'payload'

const isAdmin = ({ req }: { req: { user?: { collection?: string } | null } }) =>
  req.user?.collection === 'users'

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
    read: isAdmin,
    update: () => false,
    delete: isAdmin,
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
