import Confirmation from '../../../components/confirmation/Confirmation';
import PageHeading from '../../../components/pageheading/PageHeading';
import CommonMessage from '../../../helper/message/CommonMessage';
import { dateFormate } from '../../../helper/CommonFunction';
import Spinner from '../../../components/spinner/Spinner';
import UserMessage from '../UserMessage';
import { Link } from 'react-router-dom';
import UsersListLogic from './UsersListLogic';

const UsersList = () => {
    // Message 
     const {name, created_at, action, add, role, users, status, search} = CommonMessage;
    const {email, mobile} = UserMessage;
    // End
    //Logic function
    const { handleDelete, areUSureDelete, Pagination, seach, current, handleSort, handleNextPage, handlePreviousPage, statusSearch, Status,
        deleteLoader, dialog, loader, allUsers, path, page, perPage, searchTerm, totalPages,} = UsersListLogic();
    // End   
    return (
    <>
        <PageHeading heading={users}/>
        <div className="card shadow mb-4">
        <div className="card-header py-3">
            <div className="d-flex justify-content-between align-items-center">
                <h6 className="m-0 font-weight-bold text-primary">{users}</h6>
                <Link to={'/users/create'} className="btn btn-primary btn-user">{add}</Link>
            </div>
        </div>
        <div className="card-body">
            <div className="table-responsive">
            <div className='row justify-content-end mb-3'>
                <div className='col-lg-4 col-md-2 col-12'>
                <div className='d-flex'>
                    <Status handleChange={statusSearch} value=''/>
                    <input type="text" placeholder={search} className='form-control ml-2' value={searchTerm} onChange={seach}/>
                </div>
                
                </div>
            </div>
            {loader && <Spinner/>}
                <table className="table table-bordered" id="dataTable" width="100%" cellpacing="0">
                <thead>
                    <tr>
                        <th onClick={() => handleSort('name')} className='pe-auto'>
                            {name} 
                            <i  className="fa fa-sort ml-1"></i>
                        </th>
                        <th onClick={() => handleSort('email')} className='pe-auto'>
                            {email} 
                            <i  className="fa fa-sort ml-1"></i>
                        </th>
                        <th onClick={() => handleSort('mobile')} className='pe-auto text-center'>
                            {mobile} 
                            <i  className="fa fa-sort ml-1"></i>
                        </th>
                        <th onClick={() => handleSort('roleId')} className='pe-auto'>
                            {role} 
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
                        <th className='text-center'>{action}</th>
                    </tr>
                </thead>
                <tbody>
                    {allUsers.length>0 ? 
                    allUsers.map((user)=>(
                        <tr key={user._id}>      
                        <td>{user.name ? user.name:''}</td>
                        <td>{user.email ? user.email:''}</td>
                        <td  className='text-center'>{user.mobile ? user.mobile:''}</td>
                        <td>{user.roleId ? user.roleId.name:''}</td>
                        <td className={user.status== 1 ? 'text-success text-center':'text-center text-danger'}>{user.statusText ??''}</td>
                        <td className='text-center'>{dateFormate(user.createdAt)}</td>
                        <td className='text-center'>
                            <Link to={`${path}/edit/${user._id}`} className='text-success mr-2'><i className='fa fa-edit'></i></Link>
                            <button onClick={()=>handleDelete(user._id)} className='text-danger bg-transparent border-0'>
                            <i className='fa fa-trash'></i>
                            </button>
                        </td>
                        </tr>
                    )) 
                    :
                    <tr>
                    <td className='text-center' colSpan={6}>
                        No data found
                    </td>
                    </tr>
                        }
                </tbody>
                </table>
                {allUsers.length>0 && <Pagination currentPage={page} totalPages={totalPages}  perPage={perPage} handlePreviousPage={handlePreviousPage} handleNextPage={handleNextPage} current={current}/>}
                {dialog.isLoading && <Confirmation onDialog={areUSureDelete} message={dialog.message} deleteLoader={deleteLoader}/>}
            </div>
        </div>
        </div>
    </>
  )
}
export default UsersList;
