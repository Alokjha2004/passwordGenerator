import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current.select()
    passwordRef.current.setSelectionRange(0, password.length)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])


  return (
    <div className='w-full max-w-2xl mx-auto shadow-lg rounded-xl px-8 py-6 my-12 text-orange-500 bg-gray-900 border border-gray-700'>
      <h1 className='text-white text-center text-2xl font-semibold my-4'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-6 bg-gray-800 p-2'>
        <input
          type="text"
          value={password}
          className='outline-none w-full py-3 px-4 bg-white text-lg h-14 rounded-md'
          placeholder='Generated Password'
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-5 py-3 shrink-0 text-lg font-semibold rounded-md hover:bg-blue-600 transition'
        >
          Copy
        </button>
      </div>
      <div className='flex flex-col sm:flex-row text-sm gap-4 items-center justify-between'>
        <div className='flex items-center gap-x-2'>
          <input
            type="range"
            min={6}
            max={25}
            value={length}
            className='cursor-pointer w-36'
            onChange={(e) => setLength(parseInt(e.target.value))}
          />
          <label className='text-white text-lg'>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-2'>
          <input
            type="checkbox"
            checked={numberAllowed}
            id='numberInput'
            className='w-5 h-5'
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label htmlFor="numberInput" className='text-white text-lg'>Include Numbers</label>
        </div>
        <div className='flex items-center gap-x-2'>
          <input
            type="checkbox"
            checked={charAllowed}
            id='characterInput'
            className='w-5 h-5'
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label htmlFor="characterInput" className='text-white text-lg'>Include Symbols</label>
        </div>
      </div>
    </div>
  );
}

export default App
