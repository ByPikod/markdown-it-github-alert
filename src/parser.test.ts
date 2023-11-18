import { describe, it, expect } from '@jest/globals'
import Token from 'markdown-it/lib/token'
import { matchAlertType } from './parser'
import { AlertType } from './alert_type'

describe('Parser.ts', () => {
  it('Match alert type', () => {
    // Note alert
    const token = new Token('inline', '', 0)
    token.content = '[!NOTE]\nHello, world'
    let alertType = matchAlertType(token)
    expect(alertType).toBe(AlertType.NOTE)

    // Warning alert
    token.content = '[!WARNING]\nHello, world'
    alertType = matchAlertType(token)
    expect(alertType).toBe(AlertType.WARNING)

    // Important alert
    token.content = '[!IMPORTANT]\nHello, world'
    alertType = matchAlertType(token)
    expect(alertType).toBe(AlertType.IMPORTANT)

    // Important alert
    token.content = '[!CAUTION]\nHello, world'
    alertType = matchAlertType(token)
    expect(alertType).toBe(AlertType.CAUTION)

    // Important alert
    token.content = '[!TIP]\nHello, world'
    alertType = matchAlertType(token)
    expect(alertType).toBe(AlertType.TIP)
  })
})
