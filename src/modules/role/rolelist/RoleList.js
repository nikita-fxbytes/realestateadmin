
import Confirmation from '../../../components/confirmation/Confirmation';
import CommonMessage from '../../../helper/message/CommonMessage';
import { dateFormate } from '../../../helper/CommonFunction';
import Spinner from '../../../components/spinner/Spinner';
import { Link } from 'react-router-dom';
import RoleLogic from './RoleListLogic';
const RoleList = () => {
    const {name, created_at, action, role, add} = CommonMessage;// Message
    //Logic function
    const {areUSureDelete, handleDelete, deleteLoader, dialog, loader, roles, path,  searchTerm,
      seach, handleSort}= RoleLogic();   // End   
  return (
    <>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
            <div className="d-flex justify-content-between align-items-center">
                <h6 className="m-0 font-weight-bold text-primary">{role}</h6>
                <Link to={`${path}/create`} className="btn btn-primary btn-user">{add}</Link>
            </div>
        </div>
        <div className="card-body">
            <div className="table-responsive">
            {loader && <Spinner/>}
            <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => seach(e.target.value)}
      />
              <table className="table table-bordered" id="dataTable" width="100%" cellpacing="0">
                  <thead>
                      <tr>
                          <th onClick={() => handleSort('name')} className='pe-auto'>{name} <i  className="fa fa-sort"></i></th>
                          <th className='text-center' onClick={() => handleSort('createdAt')}>{created_at} <i  className="fa fa-sort"></i></th>
                          <th className='text-center'>{action}</th>
                      </tr>
                  </thead>
                  <tbody>
                    {
                    roles.length>0 ? 
                      roles.map((role)=>(
                        <tr key={role._id}>      
                          <td>{role.name ? role.name:''}</td>
                          <td className='text-center'>{dateFormate(role.createdAt)}</td>
                          <td className='text-center'>
                            <Link to={`${path}/edit/${role._id}`} className='text-success mr-2'><i className='fa fa-edit'></i></Link>
                            <button onClick={()=>handleDelete(role._id)} className='text-danger bg-transparent border-0'>
                              <i className='fa fa-trash'></i>
                            </button>
                            </td>
                        </tr>
                      )) 
                    :
                    <tr>
                      <td className='text-center' colSpan={3}>
                        No data found
                      </td>
                    </tr>
                  }
                  </tbody>
              </table>
              {dialog.isLoading && <Confirmation onDialog={areUSureDelete} message={dialog.message} deleteLoader={deleteLoader}/>}
            </div>
        </div>
      </div>
    </>
  )
}
export default RoleList;