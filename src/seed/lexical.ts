/**
 * Minimal Lexical document builders for the seed script.
 *
 * Payload stores rich text as Lexical's serialised editor state. These helpers
 * emit the exact node shape the editor expects so seeded articles open and edit
 * normally in the admin rather than showing up as corrupt state.
 */

type TextNode = {
  type: 'text'
  detail: number
  format: number
  mode: 'normal'
  style: string
  text: string
  version: number
}

const text = (value: string, format = 0): TextNode => ({
  type: 'text',
  detail: 0,
  format,
  mode: 'normal',
  style: '',
  text: value,
  version: 1,
})

export const p = (value: string) => ({
  type: 'paragraph',
  children: [text(value)],
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  textFormat: 0,
  version: 1,
})

export const h = (tag: 'h2' | 'h3' | 'h4', value: string) => ({
  type: 'heading',
  tag,
  children: [text(value)],
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  version: 1,
})

export const ul = (items: string[]) => ({
  type: 'list',
  listType: 'bullet' as const,
  tag: 'ul' as const,
  start: 1,
  children: items.map((item, index) => ({
    type: 'listitem',
    value: index + 1,
    checked: undefined,
    children: [text(item)],
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
  })),
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  version: 1,
})

export const quote = (value: string) => ({
  type: 'quote',
  children: [text(value)],
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  version: 1,
})

/** Wrap nodes in a Lexical root. */
export const doc = (children: unknown[]) => ({
  root: {
    type: 'root',
    children,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
  },
})
