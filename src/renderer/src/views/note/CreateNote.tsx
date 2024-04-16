import { useState } from 'react'
import { ICreateNoteProps } from './types'
import { useAppDispatch } from '@renderer/redux/store'
import { Button, InputField, Modal } from '@renderer/components'
import { createNote } from '@renderer/redux/actions/noteActions'

const CreateNote: React.FC<ICreateNoteProps> = (props: ICreateNoteProps) => {
  const { setSelectedNote, openModal, setOpenModal } = props
  const [formData, setFormData] = useState<{ title: string; content: string }>({
    title: '',
    content: ''
  })

  const handleChange = (e) => {
    const { value, name } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const dispatch = useAppDispatch()
  const submitHandler = async () => {
    if (formData.title == '' || formData.content == '') {
      return alert('Fill the fields!')
    }
    const data = {
      id: Math.floor(10000 + Math.random() * 90000),
      ...formData,
      lastEditTime: new Date().toDateString()
    }
    if (await dispatch(createNote(data))) {
      setSelectedNote(data)
      setOpenModal(!openModal)
      setFormData({
        title: '',
        content: ''
      })
    }
  }

  return (
    <Modal
      title="Create New Note"
      isOpen={openModal}
      onClose={() => {
        setOpenModal(!openModal)
      }}
    >
      <div className="flex flex-col items-center justify-center  gap-2">
        <label htmlFor="title" className="text-black text-sm">
          Note Title
          <InputField
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="bg-gray-800 rounded-md py-1 w-full caret-white text-white outline-none px-1"
            required={true}
          />
        </label>

        <label htmlFor="title" className="text-black text-sm">
          Note Content
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="bg-gray-800 rounded-md py-1 h-20 w-full caret-white text-white outline-none px-1"
            required={true}
          />
        </label>

        <Button
          className="bg-gray-800 w-40 h-8 rounded-md hover:bg-green-900"
          onClick={submitHandler}
        >
          Create Note
        </Button>
      </div>
    </Modal>
  )
}

export default CreateNote
