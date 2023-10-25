import type Token from 'markdown-it/lib/token'
import { type AlertType, classNameToAlertType } from './alert_type'

export const REGEXP_ALERT = /^\[[!](note|warning|important)\]$/

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
