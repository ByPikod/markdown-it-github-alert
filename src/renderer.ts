import {
  type AlertType,
  alertTypeToClassName,
  alertTypeToString,
  alertTypeToIcon
} from './alert_type'

/**
 * Renders the token opening to HTML.
 * @param alertType Alert type
 * @returns HTML string
 */
export function renderOpening (alertType: AlertType): string {
  const alertClassName = alertTypeToClassName(alertType)
  const alertText = alertTypeToString(alertType)
  const alertIcon = alertTypeToIcon(alertType)

  return '' +
    `<div class="markdown-alert ${alertClassName}" dir="auto">
      <span>
        <svg class="markdown-alert-icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
          <path d="${alertIcon}">
          </path>
        </svg>
        ${alertText}
      </span>`
}

/**
 * Renders the token ending to HTML.
 * @returns HTML string
 */
export function renderClosing (): string {
  return '</div>'
}
