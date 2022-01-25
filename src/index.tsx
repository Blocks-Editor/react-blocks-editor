import React, { useEffect } from 'react'
import { stringify } from 'query-string'

const DEFAULT_URL =
  process.env.BLOCKS_URL ?? 'https://blocks-editor.github.io/blocks'

// TODO: Rete.js node type checking
type Node = any

export interface EditorState {
  name: string
  description: string
  version: string
  language: string
  output: string
  nodes: Record<string, Node>
}

interface LocalMessage {
  type: 'load'
  state: Partial<EditorState>
}

interface RemoteMessage {
  type: 'save'
  state: EditorState
}

interface LoadArgs {
  sendMessage: (message: LocalMessage) => void
  loadState: (state: Partial<EditorState>) => void
}

interface QueryOptions {
  menu: 'hidden' | 'load' | 'tutorials' | 'settings' | 'social'
  theme: 'dark' | 'grey'
  familiarity: boolean
  tutorial: string
}

export interface EditorPropTypes {
  url?: string
  onSave?: (state: EditorState) => void
  options?: Partial<QueryOptions>
  children?: (args: LoadArgs) => void

  [x: string]: any
}

export const BlocksEditor = ({
  url = DEFAULT_URL,
  onSave,
  options,
  style,
  children,
  ...rest
}: EditorPropTypes) => {
  let iframeRef: HTMLIFrameElement
  const setIframeRef = (ref: HTMLIFrameElement) => (iframeRef = ref)

  useEffect(() => {
    const handleMessage = ({
      source,
      data
    }: MessageEvent & { data: RemoteMessage }) => {
      const childWindow = iframeRef?.contentWindow
      if (source === childWindow) {
        if (data.type === 'save' && onSave) {
          onSave(data.state)
        }
      }
    }
    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  })

  const handleLoad = () => {
    const sendMessage = (message: LocalMessage) => {
      if (iframeRef && iframeRef.contentWindow) {
        iframeRef.contentWindow.postMessage(JSON.stringify(message), '*')
      }
    }
    const loadState = (state: Partial<EditorState>) => {
      sendMessage({ type: 'load', state })
    }

    if (children) {
      children({
        sendMessage,
        loadState
      })
    }
  }

  return (
    <iframe
      ref={setIframeRef}
      style={{ border: '0px', width: '100%', height: 500, ...style }}
      onLoad={handleLoad}
      src={options ? `${url}?${stringify(options)}` : url}
      {...(rest as object)}
    />
  )
}
