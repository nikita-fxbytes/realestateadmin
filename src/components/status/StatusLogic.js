import { useState } from "react"
import { STATUS } from "../../helper/Constent"

const StatusLogic = () => {
    const [getStatus, setStatus] = useState(STATUS)
    return {
        getStatus
    }
}
export default StatusLogic;