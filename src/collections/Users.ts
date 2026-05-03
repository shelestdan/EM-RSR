import type { CollectionConfig } from 'payload'

const isAdmin = ({ req }: { req: { user?: { collection?: string } | null } }) =>
  req.user?.collection === 'users'

const isAdminOrFirstUser = async ({ req }: { req: { user?: { collection?: string } | null; payload: any } }) => {
  if (req.user?.collection === 'users') return true
  const count = await req.payload.count({ collection: 'users', overrideAccess: true })
  return count.totalDocs === 0
}

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 2700,
    maxLoginAttempts: 5,
    lockTime: 900000,
    useAPIKey: false,
  },
  admin: {
    useAsTitle: 'email',
    group: 'Администрирование',
  },
  access: {
    read: isAdmin,
    create: isAdminOrFirstUser,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Имя',
      required: true,
    },
  ],
}
