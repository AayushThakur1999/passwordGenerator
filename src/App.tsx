import { useCallback, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify'

function App() {
  const [length, setLength] = useState(6);
  const [numbersAllowed, setNumbersAllowed] = useState(false)
  const [charsAllowed, setCharsAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"

    if (numbersAllowed) str += "1234567890"
    if (charsAllowed) str += "!@#$^&*()-=_+"

    for (let i = 0; i < length; i++) {
      const index = Math.ceil(Math.random() * str.length);
      pass += str.charAt(index)
    }
    setPassword(pass)
  }, [length, charsAllowed, numbersAllowed])

  useEffect(() => {
    passwordGenerator();
  }, [length, charsAllowed, numbersAllowed, passwordGenerator])

  const copyToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password)
    toast.success('Successfully copied to clipboard')
  }, [password])

  return (
    <div className='w-full h-screen bg-gradient-to-br from-[#fc354c] to-[#0abfbc] py-8 px-6'>
      <ToastContainer position='top-center' />
      <div className="flex flex-col max-w-2xl mx-auto rounded-lg text-orange-400 bg-slate-600">
        <h1 className='text-3xl mx-auto my-4'>Password Generator</h1>
        <div className='px-6 my-4'>
          <div className='flex items-center mb-8'>
            <input
              type="text"
              value={password}
              className='w-full px-3 py-2 rounded-s-3xl outline-none'
              placeholder='password'
              readOnly
            />
            <button
              className='bg-blue-700 hover:bg-blue-500 rounded-e-3xl px-3 py-2'
              onClick={copyToClipboard}
            >
              copy
            </button>
          </div>
          <div className="mx-auto flex flex-wrap justify-between gap-x-2">
            <div className='flex items-center gap-x-1'>
              <input
                type="range"
                min={6}
                max={100}
                value={length}
                onChange={e => setLength(Number(e.target.value))}
                className='cursor-pointer'
              />
              <label>Length:{length}</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input
                type="checkbox"
                id="numberInput"
                defaultChecked={numbersAllowed}
                onClick={() => setNumbersAllowed(prev => !prev)}
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input
                type="checkbox"
                id="charInput"
                defaultChecked={charsAllowed}
                onClick={() => setCharsAllowed(prev => !prev)}
              />
              <label htmlFor="charInput">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
