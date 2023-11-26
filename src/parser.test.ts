import { describe, it, expect } from '@jest/globals'
import Token from 'markdown-it/lib/token'
import { matchAlertType } from './parser'
import { AlertType } from './alert_type'

describe('Parser.ts', () => {
  it('Match alert type', () => {
    const token = new Token('inline', '', 0)

    // Note alert
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

    // Caution alert
    token.content = '[!CAUTION]\nHello, world'
    alertType = matchAlertType(token)
    expect(alertType).toBe(AlertType.CAUTION)

    // Tip alert
    token.content = '[!TIP]\nHello, world'
    alertType = matchAlertType(token)
    expect(alertType).toBe(AlertType.TIP)
  });

  it('Reject bad cases', () => {
    const token = new Token('inline', '', 0)
    let alertType = null

    // Single-line alert
    token.content = '[!NOTE] Hello, world'
    alertType = matchAlertType(token)
    expect(alertType).toBeNull()

    // First line not syntax
    token.content = 'This is a note!\n[!NOTE]\nHello, world'
    alertType = matchAlertType(token)
    expect(alertType).toBeNull()

    // First line not starting with [!
    token.content = 'Some [!NOTE]\nHello, world'
    alertType = matchAlertType(token)
    expect(alertType).toBeNull()

    // Unknown alert type
    token.content = '[!DEFINITION]\nHello, world'
    alertType = matchAlertType(token)
    expect(alertType).toBeNull()

  });
})
