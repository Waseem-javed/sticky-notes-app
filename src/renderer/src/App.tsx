import { useRef, useState } from 'react'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'
import { Draggable, Editor, InputField, WindowOptions, Button } from './components'
import { Content, RootLayout, Sidebar, FloatingNoteTitle, PreviewList, CreateNote } from './views'

import { INote } from './types/ReduxTypes/note'
import { useAppDispatch } from './redux/store'
import { deleteNote } from './redux/actions/noteActions'
const { dialog } = window.electron

const App = () => {
  const dispatch = useAppDispatch()

  const contentContainerRef = useRef<HTMLDivElement>(null)

  const [search, setSearch] = useState<string>('')
  const [selectedNote, setSelectedNote] = useState<INote | null>(null)
  const [openModal, setOpenModal] = useState<boolean>(false)

  const resetScroll = () => {
    contentContainerRef.current?.scrollTo(0, 0)
  }

  return (
    <>
      <Draggable />
      <CreateNote
        setSelectedNote={setSelectedNote}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
      <RootLayout>
        <Sidebar className="px-1 z-index-100 bg-black-400/50   text-black">
          <WindowOptions />
          <section className="flex items-center justify-evenly">
            <Button
              className="bg-zinc-900 rounded-md h-6 w-6"
              data-ripple-light="true"
              data-dialog-target="animated-dialog"
              icon={<FaPencilAlt className="text-white h-3" />}
              onClick={() => setOpenModal(true)}
            />
            <InputField
              className="w-40 rounded-full outline-none border focus:border-1  px-1 focus:border-black"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              className="bg-zinc-900 rounded-md h-6 w-6"
              icon={<FaTrashAlt className="text-white h-3" />}
              onClick={() => {
                dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] })
                if (selectedNote) {
                  dispatch(deleteNote(selectedNote?.id))
                  setSelectedNote(null)
                }
              }}
            />
          </section>
          <PreviewList
            search={search}
            setSelectedNote={setSelectedNote}
            resetScroll={resetScroll}
          />
        </Sidebar>
        <Content
          ref={contentContainerRef}
          className="border-l bg-zinc-900 border-l-white/20 rounded-l-2xl"
        >
          <FloatingNoteTitle selectedNote={selectedNote} className="mt-2" />
          {selectedNote && <Editor selectedNote={selectedNote} />}
        </Content>
      </RootLayout>
    </>
  )
}

export default App
