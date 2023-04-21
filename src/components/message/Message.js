import { useContext } from "react";
import MessageContext from "./context/MessageContext";
const Message = () => {
    const context = useContext(MessageContext);
    const {message} = context;
  return (
    <div className='mt-5 pt-2'  style={{height:'75px'}}>
             {message && <div className={`alert alert-${message.type} mt-1`} role="alert">
            {
                (typeof(message.message) ==='object' && message.message.length>0)?
                    <ul className='mb-0'>
                        {message.message.map((e, i)=>{
                            return <li key={i}>
                                {e.msg}
                            </li>
                        })
                        }
                    </ul>
                :message.message
            }
        </div> }
    </div>
  )
}

export default Message
