import { describe, it, expect } from '@jest/globals'
import MarkdownIt from 'markdown-it'
import { alertPlugin } from './plugin'
import { renderClosing, renderOpening } from './renderer'
import { AlertType, alertTypeToString } from './alert_type'

// This is a test that verifies that our plugin works as expected
// Can be run with `npm test`
// or with `npx jest`
describe('Test alert syntax', () => {
  it('Render test', () => {
    const md = new MarkdownIt()
    md.use(alertPlugin)

    Object.keys(AlertType).forEach((key) => {
      const alertType = AlertType[key as keyof typeof AlertType]
      const alertString = alertTypeToString(alertType)
      const markdownText =
        `> [!${alertString}]` +
        '\n> Hello, world'

      const actualHtml = md.render(markdownText)
      const expected = renderOpening(alertType) + '<p>Hello, world</p>\n' + renderClosing() // <-- This is the expected HTML

      // Assert
      expect(actualHtml).toBe(expected)
    })
  })

  it('Check if there is any error with regular blockquote.', () => {
    // Arrange
    const md = new MarkdownIt()
    md.use(alertPlugin)
    // any error should be thrown
    md.render('>')
    md.render('> ')
    md.render('> Hello, world')
    md.render('> [!NOTE]')
    md.render('> Hello \n [!NOTE]')
    md.render('> Hello \n [!NOTE] \n > Hello')
  })
})
