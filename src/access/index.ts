import type { Access, FieldAccess } from 'payload'

/** Anyone can read. Used for public marketing content. */
export const anyone: Access = () => true

/** Only signed-in users of the Users collection. */
export const authenticated: Access = ({ req }) => Boolean(req.user)

/**
 * Public visitors only ever see published documents.
 * Signed-in editors see drafts too, which is what powers the live preview.
 */
export const publishedOrAuthenticated: Access = ({ req }) => {
  if (req.user) return true

  return {
    _status: {
      equals: 'published',
    },
  }
}

/** Field-level: only admins may change this value. */
export const adminFieldAccess: FieldAccess = ({ req }) => req.user?.role === 'admin'

/** Collection-level: only admins. */
export const adminsOnly: Access = ({ req }) => req.user?.role === 'admin'
