import { ComponentProps } from 'react'

const InputField = (props: ComponentProps<'input'>) => {
  return <input type="text" className="text-black" {...props} required />
}

export default InputField
