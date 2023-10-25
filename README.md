# Markdown It Github Alert

This is a plugin for [Markdown It](https://github.com/markdown-it/markdown-it) Javascript Markdown parser library that adds support for Github style alert boxes.

I want to admit it was really hard to get this working.  Since there is no documentation for plugin development, I had to read the source code of markdown-it and a couple of plugins to understand how to make it work. I hope this plugin will help you to save time.

## Installation

With NPM:

```bash
npm install markdown-it-github-alert
```

With Yarn:

```bash
yarn add markdown-it-github-alert
```

## Getting Started

```js
import MarkdownIt from 'markdown-it'
import { alertPlugin } from 'markdown-it-github-alert'

const md = new MarkdownIt()
md.use(alertPlugin) // <-- This is the line that adds the plugin to MarkdownIt

const markdownText = '> [!NOTE]' + '\n> Hello, world'
const result = md.render(markdownText)
console.log(result)
```

Output:

```html
<div class=\"markdown-alert markdown-alert-note\" dir=\"auto\">
    <span>
        <svg class=\"markdown-alert-icon\" viewBox=\"0 0 16 16\" version=\"1.1\" width=\"16\" height=\"16\" aria-hidden=\"true\">
            <path d=\"M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 
0 0 1 0 2Z\"></path>
        </svg>
        Note
    </span>
    <p>Hello, world</p>
</div>
```

## How is this plugin working?

Since I couldn't find any documentation for plugin development I would like to explain how this plugin works to help you to understand how to develop your own plugins.

Plugin changes the rule "blockquote" with a new one that supports Github style alert boxes. The new rule is based on the original one, so it supports all the features of the original rule. The only difference is that it detects the first line of the blockquote and adds a metadata to the token. This metadata is used by the renderer to render alert box. If metadata not found, the renderer will render the blockquote as usual.

Check the source code of the plugin for more details.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Also, please make sure to update tests as appropriate.

Make sure tests pass before submitting a pull request:

```bash
npm run test
```

## Copyright

This project is licensed under the terms of the MIT License.

You are free to use this project in compliance with the MIT License. If you decide to use, modify, or redistribute this software, you must include a copy of the original license and copyright notice in all copies or substantial portions of the software.

For more information about the MIT License, visit: [MIT License](LICENSE).
