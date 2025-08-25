function MessageBubble(props)
{
   
    return(
         <div className="flex-col">
            <p className="font-bold">{props.from}</p>
            <div className={props.from ==="Me"? "border rounded-lg px-3 py-2 inline-block bg-blue-100 max-w-sm break-words" :
            "border rounded-lg px-3 py-2 inline-block bg-red-100 max-w-sm break-words"}>
                <p>{props.body}</p>
            </div>
        </div>
    )
}

export default MessageBubble