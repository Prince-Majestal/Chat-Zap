import { useState } from 'react'
import { useEffect } from 'react'
import NavBar from './NavBar.jsx'
import MessageArea from './MessageArea.jsx'
import ChatInput from './ChatInput.jsx'

function App() {

  const [status, changeStatus] = useState("Disconnected")
  const [messages, changeMessages] = useState([])

  useEffect(()=>{
    const ws = new WebSocket('ws://localhost:3001');
    ws.onopen = ()=>{
      console.log("Connection established.");
    };

    ws.onmessage = (message) =>{
      console.log("Server sent: ", message.data);
      ws.send("This is the client. K bye!");
    };

    ws.onclose = () => {
      console.log("Connection with server terminated.");
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)
      {
        ws.close();
      }
    };

      
  }, []);

  let count = 0
  
  
  function handleStart() //Timeout for temporary purposes
  {
    changeStatus("Searching")
    setTimeout(()=>{
      changeStatus("Connected");
      changeMessages([]);
    }, 5000);
    
  }

  function handleStop()
  {
    changeStatus("Disconnected")
  }

  function handleNext()
  {
    changeStatus("Searching")
    setTimeout(()=>{
      changeStatus("Connected");
      changeMessages([]);
     }, 5000);
  }

  function handleSend(newMessage)
  {
    count = count +1  
    changeMessages(prev => {
      const next = [...prev, {id: count, from: "Me", body: newMessage}]
      return next
    })

    //Simulates a response from stranger
    setTimeout(() => {
      handleReceive()
    }, 2000);
    
  }

  function handleReceive() //Updates state with new message from stranger. Only says "message received" for now.
  {
    count = count +1
    changeMessages(prev => {
      const next = [...prev, {id: count, from: "Stranger", body: "Message received."}]
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
