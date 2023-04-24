import { useState } from "react";
import MessageContext from "./MessageContext";
const MessageState = (props)=>{
    const [message, setMessage] = useState(null);
    const showMessage = (message)=>{
        setMessage({
            message: message.message,
            type: message.type
        })
        setTimeout(()=>{
            setMessage(null)
        }, 1500);
        
    }
    return(
        <MessageContext.Provider value={{message, showMessage}}>
            {props.children}
        </MessageContext.Provider>
    )
}
export default MessageState;