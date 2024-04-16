import React from 'react'
import { IModalProps } from './types'
import { IoClose } from 'react-icons/io5'

const Modal: React.FC<IModalProps> = (props: IModalProps) => {
  const { title, isOpen, onClose, children } = props

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-2 rounded-lg shadow-lg w-[30%]">
        <div className="flex justify-between items-center">
          <h5 className="text-gray-800 font-sans font-bold">{title}</h5>
          <button className=" bg-red-900 rounded-md hover:bg-red-800" onClick={onClose}>
            <IoClose className="text-white size-4" />
          </button>
        </div>
        <div className="py-2">{children}</div>
      </div>
    </div>
  )
}

export default Modal
