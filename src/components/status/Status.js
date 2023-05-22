import CommonMessage from "../../helper/message/CommonMessage";

const Status = ({handleChange, value, data}) => {
    const {select_status} = CommonMessage
  return (
    <>
        {data.length>0 && <select name="status" className='form-control' value={value} onChange={handleChange}>
            <option value="">{select_status}</option>
            {data.map((status)=>(
            <option value={status.id} key={status.id}>{status.name??''}</option>
            ))}
        </select>}
    </>
      
  )
}

export default Status
