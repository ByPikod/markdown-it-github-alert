import type MarkdownIt from 'markdown-it'
import type Renderer from 'markdown-it/lib/renderer'
import type Token from 'markdown-it/lib/token'
import { matchAlertType } from './parser'
import { renderClosing, renderOpening } from './renderer'
import type StateBlock from 'markdown-it/lib/rules_block/state_block'

/**
 * Renders the token opening to HTML.
 * @param token Tokens
 * @param idx Token index
 * @param options MarkdownIt options
 * @param env Environment
 * @param self Renderer
 */
export function renderBlockquoteOpen (
  tokens: Token[],
  idx: number,
  options: MarkdownIt.Options,
  env: any,
  self: Renderer
): string {
  // Check if the token is an alert token
  const token = tokens[idx]
  if (token.meta !== null && token.meta.alertType !== null) return renderOpening(token.meta.alertType)

  // Return the default closing tag if it is not an alert token
  return '<blockquote>'
}

/**
 * Renders the token closing to HTML.
 * @param token Tokens
 * @param idx Token index
 * @param options MarkdownIt options
 * @param env Environment
 * @param self Renderer
 */
export function renderBlockquoteClose (
  tokens: Token[],
  idx: number,
  options: MarkdownIt.Options,
  env: any,
  self: Renderer
): string {
  // Check if the token is an alert token
  const token = tokens[idx]
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
  // Add the custom renderers
  md.renderer.rules.blockquote_open = renderBlockquoteOpen
  md.renderer.rules.blockquote_close = renderBlockquoteClose

  // Find actual blockquote function
  const actualBlockquote = md.block.ruler
    .getRules('')
    .find((val) => val.name === 'blockquote')
  if (actualBlockquote === undefined) throw new Error('Blockquote rule not found!')

  // Change it with the custom one
  md.block.ruler.at(
    'blockquote',
    (
      state: StateBlock,
      startLine: number,
      endLine: number,
      silent: boolean
    ): boolean => {
      // We gotta call the actual blockquote function first
      // to check if it is a blockquote or not
      const result = actualBlockquote(state, startLine, endLine, silent)
      if (!result) return false // If it is not a blockquote, we should return false

      // Last token expected to be blockquote_close if it is not silent and successful
      const tokens = state.tokens
      const lastToken = tokens[tokens.length - 1 /* array length */]
      // If it was silent or not successful, we should return the result
      if (lastToken.type !== 'blockquote_close') return result

      // At this point we are sure that it is a blockquote
      // We should check if it is an alert
      let i = tokens.length - 1 /* array length */ - 1 /* blockquote_close */
      for (;; i--) {
        const token = tokens[i]
        if (token === null) throw new Error('Opening tag not found for blockquote!')
        if (token.type === 'blockquote_open') break
      }

      // As we found opening tag, we should check if it is an alert
      // Match alert type checks if "inline" token matches the alert syntax
      const inlineToken = tokens[i + 2]
      const alertType = matchAlertType(inlineToken)
      if (alertType === null) return result

      // As we are sure that it is an alert, we should remove the [!INFO] from the content
      inlineToken.content = inlineToken.content.split('\n').slice(1).join('\n')

      // And we should put identifiers to both opening and closing tags
      // to check if it is an alert or not when rendering
      tokens[i].meta = {
        isAlert: true,
        alertType
      }
      lastToken.meta = {
        isAlert: true
      }

      return result
    },
    { alt: ['paragraph', 'reference', 'blockquote', 'list'] }
  )
}
