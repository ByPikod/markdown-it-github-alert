import {
  type AlertType,
  alertTypeToClassName,
  alertTypeToString,
  alertTypeToIcon
} from './alert_type'

/**
 * Renders the token to HTML. Assigned to the MarkdownIt instance.
 * @see https://markdown-it.github.io/markdown-it/#Renderer.rules
 * @param tokens
 * @param idx
 * @returns
 */
export function renderToken (alertType: AlertType, content: string): string {
  const alertClassName = alertTypeToClassName(alertType)
  const alertText = alertTypeToString(alertType)
  const alertIcon = alertTypeToIcon(alertType)

  return '' +
    `<div class="markdown-alert markdown-alert-${alertClassName}" dir="auto">
      <p dir="auto">
        <span>
          <svg class="markdown-alert-icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
            <path d="${alertIcon}">
            </path>
          </svg>
          ${alertText}
        </span>
        <br>
        ${content}
      </p>
    </div>`
}
