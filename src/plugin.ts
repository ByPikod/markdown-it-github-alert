import type MarkdownIt from 'markdown-it'
import type StateCore from 'markdown-it/lib/rules_core/state_core'

/**
 * This is the event handler for the activition of the plugin.
 * @see https://markdown-it.github.io/markdown-it/#MarkdownIt.use
 * @param md MarkdownIt instance
 */
export function alertPlugin (md: MarkdownIt): void {
  // We add a new renderer to the MarkdownIt instance
  // That will be called when the MarkdownIt tries to render
  // the alert token we are creating in the next step
  // https://markdown-it.github.io/markdown-it/#MarkdownIt.renderer
  md.renderer.rules.alert_open = (tokens, idx) => {
    // Render the token to HTML
    return 'hello'
  }
  // We add a renderer for the closing tag as well
  md.renderer.rules.alert_close = () => {
    // Render the token to HTML
    return 'world'
  }

  // We push a new rule to the MarkdownIt instance
  // that will be called when the MarkdownIt
  // instance is used to parse Markdown to Tokens
  // https://markdown-it.github.io/markdown-it/#Ruler.push
  md.core.ruler.before('fence', 'alert', (state: StateCore) => {
    return true
  }, {
    alt: [
      'paragraph',
      'reference',
      'blockquote',
      'list'
    ]
  })
}
