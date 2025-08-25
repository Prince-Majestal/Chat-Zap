import { useState } from 'react'
function ChatInput(props) {
    const [text, setText] = useState("")
    
    function onSend(e)
    {
        e.preventDefault()
        if(!text.trim())
            return
        props.handleSend(text)
        setText("")
    }

    return (

        <form onSubmit={onSend}>
            <div className="flex w-full items-stretch justify-between">
                {
                    props.status === "Disconnected"?
                     <button type="button" onClick={props.handleStart} className="cursor-pointer bg-green-500 hover:bg-green-600 active:scale-95 font-semibold text-white py-10 px-10">START</button>
                    :<button type="button" onClick={props.handleStop} className="cursor-pointer bg-red-500 hover:bg-red-600 active:scale-95 font-semibold text-white py-10 px-10">STOP</button>
                   
                    
                }
                <button type="button" onClick={props.handleNext} disabled={props.status === "Disconnected" || props.status === "Searching" } className="cursor-pointer bg-yellow-500 hover:bg-yellow-600 enabled:active:scale-95 font-semibold py-10 text-white px-10 disabled:bg-gray-400 disabled:cursor-not-allowed">NEXT</button>
                <input type="text" disabled={props.status === "Disconnected" || props.status === "Searching" } value={text} onChange={(e)=>setText(e.target.value)} placeholder="Type here!" className="border p-2 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed bg-white grow"/>
                <button type="submit" disabled={props.status === "Disconnected" || props.status === "Searching" } className="cursor-pointer bg-blue-500 hover:bg-blue-700 enabled:active:scale-95 font-semibold text-white py-10 px-10 disabled:bg-gray-400 disabled:cursor-not-allowed">SEND</button>
            </div>
        </form>
    )

}

export default ChatInput