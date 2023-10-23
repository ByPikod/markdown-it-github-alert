import { describe, it, expect } from '@jest/globals'
import MarkdownIt from 'markdown-it'
import { alertPlugin } from '.'
import { renderToken } from './renderer'
import { AlertType } from './alert_type'

// This is a test that verifies that our plugin works as expected
// Can be run with `npm test`
// or with `npx jest`
describe('Test alert syntax', () => {
  it('test it', () => {
    // Arrange
    const md = new MarkdownIt()
    md.use(alertPlugin) // <-- This is our plugin. It adds the alert syntax to MarkdownIt

    // Act
    const markdownText = // <-- This is the Markdown syntax we want to render
      '> [!NOTE]' +
      '\n> Hello, world'

    const expectedHtml = renderToken(AlertType.NOTE, 'Hello, world') // <-- This is the expected HTML
    const actualHtml = md.render(markdownText) // Render the Markdown text to HTML

    // Assert
    expect(actualHtml).toBe(expectedHtml) // Test that the actual HTML matches the expected HTML
  })
})
