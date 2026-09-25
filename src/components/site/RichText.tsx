import { Fragment } from 'react'
import { cn } from '@/lib/utils'

/**
 * Renders Payload's Lexical editor state.
 *
 * Deliberately a small hand-rolled walker rather than the full converter
 * package: the editor is configured with a known, narrow feature set, so this
 * covers everything an author can actually produce and nothing they cannot.
 */

type LexicalNode = {
  type: string
  tag?: string
  text?: string
  format?: number | string
  listType?: string
  fields?: Record<string, unknown>
  children?: LexicalNode[]
  url?: string
  [key: string]: unknown
}

type LexicalState = { root?: { children?: LexicalNode[] } } | null | undefined

const IS_BOLD = 1
const IS_ITALIC = 1 << 1
const IS_STRIKETHROUGH = 1 << 2
const IS_UNDERLINE = 1 << 3
const IS_CODE = 1 << 4

function renderText(node: LexicalNode, key: number) {
  const format = typeof node.format === 'number' ? node.format : 0
  let content: React.ReactNode = node.text ?? ''

  if (format & IS_CODE) {
    content = (
      <code className="rounded-[4px] bg-sunken px-1.5 py-0.5 font-mono text-[0.875em]">
        {content}
      </code>
    )
  }
  if (format & IS_BOLD) content = <strong>{content}</strong>
  if (format & IS_ITALIC) content = <em>{content}</em>
  if (format & IS_UNDERLINE) content = <u>{content}</u>
  if (format & IS_STRIKETHROUGH) content = <s>{content}</s>

  return <Fragment key={key}>{content}</Fragment>
}

function renderNodes(nodes: LexicalNode[] | undefined): React.ReactNode {
  if (!nodes?.length) return null

  return nodes.map((node, index) => {
    switch (node.type) {
      case 'text':
        return renderText(node, index)

      case 'linebreak':
        return <br key={index} />

      case 'paragraph': {
        if (!node.children?.length) return null
        return <p key={index}>{renderNodes(node.children)}</p>
      }

      case 'heading': {
        const Tag = (node.tag ?? 'h2') as 'h2' | 'h3' | 'h4'
        return <Tag key={index}>{renderNodes(node.children)}</Tag>
      }

      case 'list': {
        const Tag = node.listType === 'number' ? 'ol' : 'ul'
        return <Tag key={index}>{renderNodes(node.children)}</Tag>
      }

      case 'listitem':
        return <li key={index}>{renderNodes(node.children)}</li>

      case 'quote':
        return <blockquote key={index}>{renderNodes(node.children)}</blockquote>

      case 'horizontalrule':
        return <hr key={index} />

      case 'link':
      case 'autolink': {
        const fields = (node.fields ?? {}) as { url?: string; newTab?: boolean }
        const href = fields.url ?? node.url ?? '#'
        return (
          <a
            key={index}
            href={href}
            {...(fields.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {renderNodes(node.children)}
          </a>
        )
      }

      case 'block': {
        const fields = (node.fields ?? {}) as {
          blockType?: string
          quote?: string
          attribution?: string
          title?: string
          body?: string
        }

        if (fields.blockType === 'pullQuote') {
          return (
            /* Top rule, not a side stripe. See the blockquote note in globals.css. */
            <figure key={index} className="my-12 border-t-2 border-[color:var(--brand-coral)] pt-6">
              <p className="font-display text-[1.5rem] font-extrabold leading-snug tracking-[-0.025em] text-ink">
                {fields.quote}
              </p>
              {fields.attribution ? (
                <figcaption className="mt-3 text-[0.9375rem] text-slate">
                  {fields.attribution}
                </figcaption>
              ) : null}
            </figure>
          )
        }

        if (fields.blockType === 'callout') {
          return (
            <aside key={index} className="my-10 rounded-card bg-accent-soft p-7">
              <p className="t-card text-ink">{fields.title}</p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-slate">{fields.body}</p>
            </aside>
          )
        }

        return null
      }

      default:
        return node.children ? <Fragment key={index}>{renderNodes(node.children)}</Fragment> : null
    }
  })
}

export function RichText({ data, className }: { data: LexicalState; className?: string }) {
  const children = data?.root?.children
  if (!children?.length) return null

  return <div className={cn('prose-hypernet', className)}>{renderNodes(children)}</div>
}
