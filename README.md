# react-blocks-editor

> Embed the [Blocks Editor](https://github.com/Blocks-Editor/blocks) anywhere using a React component.

[![NPM](https://img.shields.io/npm/v/react-blocks-editor.svg)](https://www.npmjs.com/package/react-blocks-editor) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-blocks-editor
```

## Quick Start

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import BlocksEditor from 'react-blocks-editor'

ReactDOM.render(
  <BlocksEditor />,
  document.getElementById('root'),
)
```

## Advanced Usage

```tsx
import React from 'react'
import { BlocksEditor, EditorState } from 'react-blocks-editor'

const App = () => {

  // Called whenever the user changes (or manually saves) the editor state
  const handleSave = (state: EditorState) => {
    console.log('Editor state:', state)
  }

  return (
    <BlocksEditor
      style={{ height: '100vh' }}
      options={{
        theme: 'dark',
        menu: 'hidden',
        tutorial: 'hello-world'
      }}
      onSave={handleSave}>

      {({ loadState }) => {
        console.log('Loaded editor iframe.')

        // Load a specific project state (.blocks JSON format).
        loadState({
          name: 'Project name',
          description: 'Project description',
          nodes: {
            // Text block
            'message': {
              type: 'LiteralText',
              position: [0, 0],
              data: {
                value: 'Hello world!'
              },
              outputs: {
                value: [{
                  // Reference to 'motoko' node and 'value' input socket
                  node: 'motoko',
                  input: 'input'
                }]
              }
            },
            // Motoko compiler block
            'motoko': {
              type: 'CompileMotoko',
              position: [250, 0]
            }
          }
        })
      }}
    </BlocksEditor>
  )
}

export default App
```

---

This project was made possible via the [DFINITY Developer Grant Program](https://dfinity.org/grants/).
