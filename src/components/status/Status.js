import CommonMessage from "../../helper/message/CommonMessage";
import StatusLogic from "./StatusLogic"

const Status = ({handleChange, value}) => {
    const {select_status} = CommonMessage
    const {getStatus} = StatusLogic();
  return (
    <>
        {getStatus.length>0 && <select name="status" className='form-control' value={value} onChange={handleChange}>
            <option value="">{select_status}</option>
            {getStatus.map((status)=>(
            <option value={status.id} key={status.id}>{status.name??''}</option>
            ))}
        </select>}
    </>
      
  )
}

export default Status
