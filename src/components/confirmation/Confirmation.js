
const DiaLogBox = ({message, onDialog, deleteLoader}) => {
    return (
      <div className="position-fixed top-0 start-0 bottom-0 end-0  " style={{
        backgroundColor:"rgba(0,0,0,0.5"
    }}>
        <div className="text-center position-absolute bg-white rounded p-5 top-50 start-50 translate-middle-x">
            <h5 className="mb-4">{message}</h5>
            <div>
                <button  onClick={()=>onDialog(false)} className="me-3 btn btn-primary btn-user"> No</button>
                <button   onClick={()=>onDialog(true)} className='btn btn-danger btn-user' disabled={deleteLoader}>{deleteLoader && <span className="spinner-border spinner-border-sm me-1"></span>} Yes</button>
            </div>
        </div>
    </div>
    );
  }
  export default DiaLogBox
