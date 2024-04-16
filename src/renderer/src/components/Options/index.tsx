import Button from '../Button'
import { IoClose } from 'react-icons/io5'
import { FaMinus } from 'react-icons/fa'
import { TbCaretLeftRightFilled } from 'react-icons/tb'
import { twMerge } from 'tailwind-merge'
// const { ipcRenderer } = window.electron

const WindowOptions = ({ className }: { className?: string }) => {
  return (
    <div className={twMerge('flex mx-1 gap-1 mt-2 mb-2', className)}>
      <Button
        className="bg-[#ff5c59] hover:bg-[#ff5c59] border-none rounded-full size-4"
        icon={<IoClose className="text-black size-3" />}
        // onClick={() => ipcRenderer.send('close-window')}
      />
      <Button
        className="bg-[#ffbc35] hover:bg-[#ffbc35] border-none rounded-full size-4"
        icon={<FaMinus className="text-black size-3" />}
        // onClick={() => ipcRenderer.send('minimize-window')}
      />

      <Button
        className="bg-[#00cc4a] hover:bg-[#00cc4a] border-none rounded-full size-4"
        icon={<TbCaretLeftRightFilled className="rotate-45 text-black size-3" />}
        // onClick={() => ipcRenderer.send('toggle-full-screen')}
      />
    </div>
  )
}

export default WindowOptions
