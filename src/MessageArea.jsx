import MessageBubble from './MessageBubble.jsx'
function MessageArea({messages})
{
    const listMessages = messages.map((message)=>
        <li 
            key={message.id}
            className={message.from==="Me"? "mr-auto": "ml-auto"}
        >
            <MessageBubble from={message.from} body={message.body}/></li>
    
    );
    return(
        <div className="flex flex-col w-[90%] h-[700px] overflow-y-auto bg-white border shadow-lg rounded-lg">
            <ul className="flex flex-col gap-2 p-3" aria-live="polite">{listMessages}</ul>
        </div>
    )
}

export default MessageArea