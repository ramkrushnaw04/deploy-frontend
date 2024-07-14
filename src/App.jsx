import { useState, useRef, useEffect } from 'react'
import './App.css'
import { v4 } from 'uuid'
import { io } from 'socket.io-client'

function App() {
  const [messages, setMessages] = useState(['m1', 'm2'])
  const [message, setMessage] = useState("")
  const socket = useRef(null)
  const serverLink = import.meta.env.VITE_SERVER_LINK

  useEffect(() => {
    socket.current = io(serverLink)
    console.log(serverLink)

    socket.current.on('message-response', messageRes => {
      // setMessages([...messages, messageRes])
      setMessages(preMessages => [...preMessages, messageRes])
    })
  
    return () => {
      socket.current.disconnect()
    }
  }, [])
  

  function handleMessageChange(e) {
    setMessage(e.target.value)
  }

  function formSubmitted(e) {
    e.preventDefault()

    socket.current.emit('message', message)
    setMessage('')
  }

  return (
    <>

      <h1>app deployment testing</h1>

      <form action="" onSubmit={formSubmitted}>
        <input type="text" placeholder='this is input' value={message} onChange={handleMessageChange}/>
        <button type='submit'>send message</button>
      </form>

      <section>
        {
          messages.map(message => ( <p key={v4()} >{message}</p> ))
        }
      </section>
    </>
  )
}

export default App
