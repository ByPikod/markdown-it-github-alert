import type Token from 'markdown-it/lib/token'
import { type AlertType, classNameToAlertType, alertTypeToString } from './alert_type'

export const REGEXP_ALERT = /^\[[!](note|warning|important)\]$/

export function filterAlerts (tokens: Token[]): Token[] {
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]

    // Check if the token is an alert token
    const alertType = matchAlertType(token)
    if (alertType === null) continue

    // Match parents
    matchParents(tokens, i)
  }
  return tokens
}

/**
 * Matches the token to an alert token and returns the alert type.
 * If the token is not an alert token, null is returned.
 *
 * @param token Token to check
 * @returns Alert type or null if not an alert token
 */
export function matchAlertType (token: Token): AlertType | null {
  // Only look for inline tokens
  if (token.type !== 'inline') return null

  // Content must be at least 2 lines
  const lines = token.content.split('\n')
  if (lines.length <= 1) return null

  // First line must start with [!
  const firstLine = lines[0]
  if (!firstLine.startsWith('[!')) return null

  // Parse the alert type with regex
  const matches: RegExpMatchArray | null = firstLine.toLowerCase().match(REGEXP_ALERT)
  if (matches === null) return null

  // Make sure the alert type is valid
  const alertType = classNameToAlertType(matches[1])
  return alertType
}

export function matchParents (tokens: Token[], index: number): boolean {
  // Parent expected to be a paragraph
  const paragraph = tokens[index - 1]
  if (paragraph.type !== 'paragraph_open') return false
  const paragraphClose = tokens[index + 1]
  if (paragraphClose.type !== 'paragraph_close') return false
  // Grand Parent expected to be a blockquote
  const blockQuote = tokens[index - 1]
  if (blockQuote.type !== 'blockquote_open') return false
  const blockQuoteClose = tokens[index + 1]
  if (blockQuoteClose.type !== 'blockquote_close') return false

  return true
}
