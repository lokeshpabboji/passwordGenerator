import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setValue] = useState(8);
  const [charAllow, setCharAllow] = useState(false)
  const [numberAllow, setNumberAllow] = useState(false)
  const [password, setPassword] = useState("")
  const passRef = useRef<HTMLInputElement>(null)

  const copyPassword = useCallback(() => {
    passRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(charAllow) str += "~`!@#$%^&*()_{}[]\:;|'/?><,."
    if(numberAllow) str += "0123456789"
    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * str.length + 1)
      pass += str[index]
    }
    setPassword(pass)
  }, [length, numberAllow, charAllow, setPassword])

  useEffect(() => {
    passwordGenerator()
  },[length, charAllow, numberAllow])

  return (
    <div className='bg-black h-screen'>
      <div className='flex justify-center'>
        <div className='bg-gray-700 mt-16 mx-auto p-5 rounded-xl'>

          <div className='text-orange-600 text-3xl text-center pb-3'>Password Generator</div>

          <div className='flex mb-4 rounded-xl overflow-hidden'>
            <input type="text" ref={passRef}  className='w-full px-3 py-2 outline-none' readOnly placeholder='password' value={password} />
            <button onClick={copyPassword} className='bg-blue-400 px-3 py-2 hover:bg-blue-600 focus:bg-blue-900'>Copy</button>
          </div>

          <div className='flex text-white font-bold text-md'>

              <input type='range' min={6} max={30} value={length} onChange={(e) => {
                setValue(Number(e.target.value))
              }}/><label className='ml-2'>Value: {length}</label>

              <input type='checkbox' className='ml-6' onChange={() => {
                setCharAllow((pre) => !pre)
              }} /><label className='ml-2'>charAllowed</label>

              <input type='checkbox' className='ml-6' onChange={() => {
                setNumberAllow((pre) => !pre)
              }} /><label className='ml-2'>numberAllowed</label>

          </div>
        </div>
      </div>
    </div>
  )
}

export default App
