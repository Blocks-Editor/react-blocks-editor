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
