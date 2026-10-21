/** Run only against a disposable clone: DATABASE_URI=file:/tmp/security-clone.db. */
import assert from 'node:assert/strict'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { RichText } from '../src/components/site/RichText'
import { randomUUID } from 'node:crypto'
import { getPayload } from 'payload'
import config from '../src/payload.config'

if (process.env.DATABASE_URI !== 'file:/tmp/security-clone.db') throw new Error('Disposable security database required')
const payload = await getPayload({ config })
const suffix = randomUUID()
const admin = await payload.create({ collection: 'users', data: { name: 'Security admin', email: `admin-${suffix}@example.invalid`, password: randomUUID(), role: 'admin' } })
const editor = await payload.create({ collection: 'users', data: { name: 'Security editor', email: `editor-${suffix}@example.invalid`, password: randomUUID(), role: 'editor' } })
const actor = { ...editor, collection: 'users' as const }
let checks = 0
async function denied(fn: () => Promise<unknown>) {
  let blocked = false
  try { await fn() } catch (error) { blocked = [401, 403, 404].includes((error as { status?: number }).status || 0) }
  assert.ok(blocked, 'Operation must be denied')
  checks++
}
await denied(() => payload.update({ collection: 'users', id: admin.id, data: { name: 'Compromised' }, user: actor, overrideAccess: false }))
await denied(() => payload.update({ collection: 'users', id: admin.id, data: { password: randomUUID() }, user: actor, overrideAccess: false }))
await denied(() => payload.create({ collection: 'users', data: { name: 'Other', email: `other-${suffix}@example.invalid`, password: randomUUID(), role: 'admin' }, user: actor, overrideAccess: false }))
const self = await payload.update({ collection: 'users', id: editor.id, data: { name: 'Editor self update', role: 'admin' }, user: actor, overrideAccess: false })
assert.equal(self.name, 'Editor self update'); assert.equal(self.role, 'editor'); checks += 2
const other = await payload.findByID({ collection: 'users', id: admin.id, user: actor, overrideAccess: false })
assert.equal(other.email, undefined); checks++
await denied(() => payload.find({ collection: 'users', overrideAccess: false }))
await denied(() => payload.find({ collection: 'leads', overrideAccess: false }))
await denied(() => payload.create({ collection: 'leads', data: { name: 'Blocked public REST', email: 'nobody@example.invalid', phone: '0000000000', interest: 'other', status: 'new' }, overrideAccess: false }))
const publicPosts = await payload.find({ collection: 'posts', overrideAccess: false })
assert.ok(publicPosts.docs.every(doc => doc._status === 'published')); checks++
assert.deepEqual(payload.collections.media.config.upload && payload.collections.media.config.upload.mimeTypes, ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']); checks++
const markup = renderToStaticMarkup(createElement(RichText, { data: { root: { children: [
  { type: 'heading', tag: 'script', children: [{ type: 'text', text: 'alert(1)' }] },
  ...['javascript:alert(1)', 'data:text/html,<script>alert(1)</script>', '//untrusted.example', '/\\untrusted.example'].map(url => ({ type: 'link', fields: { url }, children: [{ type: 'text', text: 'unsafe' }] })),
  { type: 'link', fields: { url: '/services' }, children: [{ type: 'text', text: 'safe' }] },
] } } }));
assert.ok(!markup.includes('<script')); assert.ok(!markup.includes('href="javascript:'));assert.ok(!markup.includes('href="data:'));assert.ok(!markup.includes('href="//'));assert.ok(markup.includes('href="/services"'));checks += 5
console.log(JSON.stringify({ passed: checks, disposableDatabase: true }))
await payload.destroy()
