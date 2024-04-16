import React from 'react'
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin
} from '@mdxeditor/editor'
import { IMDXEditorProps } from './types'

const Editor: React.FC<IMDXEditorProps> = (props: IMDXEditorProps) => {
  const { selectedNote } = props

  if (!selectedNote) return null

  return (
    <MDXEditor
      key={selectedNote.id}
      markdown={selectedNote.content}
      plugins={[headingsPlugin(), listsPlugin(), quotePlugin(), markdownShortcutPlugin()]}
      contentEditableClassName="outline-none min-h-screen max-w-none text-lg px-8 py-1 caret-yellow-500 prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content=['']"
    />
  )
}

export default Editor
