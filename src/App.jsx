import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import NavBar from './NavBar.jsx'
import MessageArea from './MessageArea.jsx'
import ChatInput from './ChatInput.jsx'

function App() {

  const [status, changeStatus] = useState("Disconnected")
  const [messages, changeMessages] = useState([])

  const ws = useRef(null)
  
  const count = useRef(0)

  function createSocket()
  {
    if(ws.current)
      return
    ws.current = new WebSocket("ws://localhost:3001")
    
    ws.current.onopen = () => {
      changeStatus("Connected");
      changeMessages([]);
      console.log("Connected to server")
    }

    ws.current.onmessage = (message) => {
      const data = JSON.parse(message.data)
      console.log("Server sent: ", data.body)
      handleReceive(data)
    }

    ws.current.onclose = () => {
      changeStatus("Disconnected")
      ws.current = null
      console.log("Connection with server terminated")
    }
  }
  
  function handleStart() //Timeout for temporary purposes
  {
    changeStatus("Searching")
    setTimeout(()=>{
      try{
        createSocket()
      } catch (e) {console.log(e)}
    }, 5000);
    
  }

  function handleStop()
  {
    if (ws.current && (ws.current.readyState === WebSocket.OPEN || ws.current.readyState === WebSocket.CONNECTING))
        ws.current.close();
  
  }

  function handleNext()
  {
    ws.current.close()
    changeStatus("Searching")
    setTimeout(()=>{
      try{
        createSocket()
      } catch (e) {console.log(e)}
     }, 5000);
  }

  function handleSend(newMessageBody)
  {
    const newMessage = {id: count.current, from: "Me", body: newMessageBody}
    ws.current.send(JSON.stringify(newMessage))
    count.current += 1
    changeMessages(prev => {
      const next = [...prev, newMessage]
      return next
    })

  }

  function handleReceive(message) //Updates state with new message from stranger. Only says "message received" for now.
  {
    count.current += 1
    changeMessages(prev => {
      const next = [...prev, message]
      return next
    })

  }

  return (
    <div className="flex flex-col bg-emerald-300 min-h-screen">

      <NavBar status = {status}/>
      
      <div className='flex flex-grow items-center justify-center'>
         <MessageArea messages={messages}/>
      </div>
       

      <ChatInput status={status} handleStart={handleStart} handleStop={handleStop} handleNext={handleNext} handleSend={handleSend}/>

      
    </div>
  )
}

export default App
