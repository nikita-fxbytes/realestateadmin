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
     const {name, created_at, action, add, role, users} = CommonMessage;
    const {email, mobile} = UserMessage;
    // End
    //Logic function
    const {handleDelete, areUSureDelete, deleteLoader, dialog, loader, allUsers, path} = UsersListLogic();
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
            {loader && <Spinner/>}
                <table className="table table-bordered" id="dataTable" width="100%" cellpacing="0">
                <thead>
                    <tr>
                        <th>{name}</th>
                        <th>{email}</th>
                        <th className='text-center'>{mobile}</th>
                        <th>{role}</th>
                        <th className='text-center'>{created_at}</th>
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
                {dialog.isLoading && <Confirmation onDialog={areUSureDelete} message={dialog.message} deleteLoader={deleteLoader}/>}
            </div>
        </div>
        </div>
    </>
  )
}
export default UsersList;
