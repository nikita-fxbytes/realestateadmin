
import Confirmation from '../../../components/confirmation/Confirmation';
import CommonMessage from '../../../helper/message/CommonMessage';
import { dateFormate } from '../../../helper/CommonFunction';
import Spinner from '../../../components/spinner/Spinner';
import { Link } from 'react-router-dom';
import RoleLogic from './RoleListLogic';

const RoleList = () => {
  const {name, created_at, action, role, add, search, status, no_data_found} = CommonMessage;// Message
  //Logic function
  const { 
    seach, current, handleSort, Pagination, handleDelete, areUSureDelete, handleNextPage, handlePreviousPage, statusSearch, Status,
    page, path, roles, dialog, loader, perPage, searchTerm, totalPages, deleteLoader, currentStatus, getStatus }= RoleLogic();   // End   
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
          <div className='row justify-content-end mb-3'>
            <div className='col-lg-4 col-md-2 col-12'>
              <div className='d-flex'>
                <Status handleChange={statusSearch} value={currentStatus} data={getStatus}/>
                <input type="text" placeholder={search} className='form-control ml-2' value={searchTerm} onChange={seach}/>
              </div>
              
            </div>
          </div>
          <div className="table-responsive">
            {loader && <Spinner/>}
            <table className="table table-bordered" id="dataTable" width="100%" cellpacing="0">
              <thead>
                <tr>
                  <th onClick={() => handleSort('name')} className='pe-auto'>
                    {name} 
                     <i  className="fa fa-sort ml-1"></i>
                  </th>
                  <th className='text-center pe-auto' onClick={() => handleSort('status')}>
                    {status} 
                     <i  className="fa fa-sort ml-1"></i>
                  </th>
                  <th className='text-center pe-auto' onClick={() => handleSort('createdAt')}>
                    {created_at} 
                     <i  className="fa fa-sort ml-1"></i>
                  </th>
                  <th className='text-center'>
                    {action}
                  </th>
                </tr>
              </thead>
              <tbody>
                {roles.length>0 ? 
                  roles.map((role)=>(
                    <tr key={role._id}>      
                      <td>{role.name ? role.name:''}</td>
                      <td className={role.status== 1 ? 'text-success text-center':'text-center text-danger'}>{role.statusText ??''}</td>
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
                    <td className='text-center' colSpan={4}>
                      {no_data_found}
                    </td>
                  </tr>
                }
              </tbody>
            </table>
            {roles.length>0 && <Pagination currentPage={page} totalPages={totalPages}  perPage={perPage} handlePreviousPage={handlePreviousPage} handleNextPage={handleNextPage} current={current}/>}
            {dialog.isLoading && <Confirmation onDialog={areUSureDelete} message={dialog.message} deleteLoader={deleteLoader}/>}
          </div>
        </div>
      </div>
    </>
  )
}
export default RoleList;