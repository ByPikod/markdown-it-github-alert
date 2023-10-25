/**
 * Alert Type enum is assigned
 * to token attributes.
 * And used to determine the class name, icon and stuff like that.
 * @see https://markdown-it.github.io/markdown-it/#Token.attrSet
 */
export enum AlertType {
  NOTE,
  IMPORTANT,
  WARNING,
}

/**
 * These are the SVG icon paths that are used for the different alert types.
 */
const ICON_INFO = 'M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z'
const ICON_IMPORTANT = 'M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z'
const ICON_WARNING = 'M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z'

/**
 * Returns the class name for the alert type.
 * @param alertType AlertType enum
 * @returns The class name for the alert type
 */
export function alertTypeToClassName (alertType: AlertType): string {
  switch (alertType) {
    case AlertType.NOTE:
      return 'note'
    case AlertType.IMPORTANT:
      return 'important'
    case AlertType.WARNING:
      return 'warning'
    default:
      return 'note'
  }
}

/**
* Returns the SVG icon path for the alert type.
* @param alertType AlertType enum
* @returns The SVG icon path for the alert type
*/
export function alertTypeToIcon (alertType: AlertType): string {
  switch (alertType) {
    case AlertType.NOTE:
      return ICON_INFO
    case AlertType.IMPORTANT:
      return ICON_IMPORTANT
    case AlertType.WARNING:
      return ICON_WARNING
    default:
      return ICON_INFO
  }
}

/**
 * Returns the alert type as a string.
 * @param alertType AlertType enum
 * @returns Alert type as a string
 */
export function alertTypeToString (alertType: AlertType): string {
  switch (alertType) {
    case AlertType.NOTE:
      return 'Note'
    case AlertType.IMPORTANT:
      return 'Important'
    case AlertType.WARNING:
      return 'Warning'
    default:
      return 'Note'
  }
}
