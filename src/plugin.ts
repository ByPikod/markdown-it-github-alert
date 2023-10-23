import type MarkdownIt from 'markdown-it'
import type StateCore from 'markdown-it/lib/rules_core/state_core'
import { classNameToAlertType } from './alert_type'
import { renderToken } from './renderer'
import { filterAlerts } from './parser'

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
  md.renderer.rules.alert = (tokens, idx) => {
    // Get alert type from token
    const token = tokens[idx]

    // Get alert attribute from token
    const alertClassName = token.attrGet('alertType')
    if (typeof alertClassName !== 'string') throw new Error('alertType is not a string')

    // Alert attribute to alert type
    const alertType = classNameToAlertType(alertClassName)
    if (alertType === null) throw new Error('alertType is undefined')

    // Render the token to HTML
    return renderToken(alertType, token.content)
  }

  // We push a new rule to the MarkdownIt instance
  // that will be called when the MarkdownIt
  // instance is used to parse Markdown to Tokens
  // https://markdown-it.github.io/markdown-it/#Ruler.push
  md.core.ruler.push('alert', (state: StateCore) => {
    filterAlerts(state.tokens)
  })
}
