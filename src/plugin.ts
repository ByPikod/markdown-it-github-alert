import type MarkdownIt from 'markdown-it'
import type Renderer from 'markdown-it/lib/renderer'
import type Token from 'markdown-it/lib/token'
import { matchAlertType } from './parser'
import { renderClosing, renderOpening } from './renderer'

export function renderBlockquoteOpen (
  tokens: Token[],
  idx: number,
  options: MarkdownIt.Options,
  env: any,
  self: Renderer
): string {
  // Check if the token is an alert token
  const alertType = matchAlertType(tokens[idx + 2])
  if (alertType === null) return '<blockquote>'

  // Before we render the opening tag, we need to remove [!INFO] from the content.
  const token = tokens[idx + 2]
  token.content = token.content.split('\n').slice(1).join('\n')

  // Let's have a identifier special to alert for the closing tag.
  tokens[idx].meta = {
    isAlert: true
  }

  // Render the opening tag if it is an alert token
  return renderOpening(alertType)
}

export function renderBlockquoteClose (
  tokens: Token[],
  idx: number,
  options: MarkdownIt.Options,
  env: any,
  self: Renderer
): string {
  /* We will check if opening was an alert token. */
  // First we gotta find where opening tag is.
  let i = idx - 1
  for (;; i--) {
    const token = tokens[i]
    if (token === null) throw new Error('Opening tag not found for blockquote!')
    if (token.type === 'blockquote_open') break
  }

  console.log(tokens)

  // Then we should check if it is an alert token with the identifier we put in the opening tag.
  const token = tokens[i]
  if (token.meta !== null && token.meta.isAlert !== null) return renderClosing()

  // Return the default closing tag if it is not an alert token
  return '</blockquote>'
}

/**
 * This is the event handler for the activition of the plugin.
 * @see https://markdown-it.github.io/markdown-it/#MarkdownIt.use
 * @param md MarkdownIt instance
 */
export function alertPlugin (md: MarkdownIt): void {
  md.renderer.rules.blockquote_open = renderBlockquoteOpen
  md.renderer.rules.blockquote_close = renderBlockquoteClose
}
