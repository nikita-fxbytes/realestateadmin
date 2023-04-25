import MessageContext from '../../components/message/context/MessageContext';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Confirmation from '../../components/confirmation/Confirmation';
import PageHeading from '../../components/pageheading/PageHeading';
import CommonMessage from '../../helper/message/CommonMessage';
import { dateFormate } from '../../helper/CommonFunction';
import Spinner from '../../components/spinner/Spinner';
import { Link } from 'react-router-dom';
import api from '../../api/Api';

const Role = () => {
  const path = '/roles';//url
  const {name, created_at, action, role, add, delete_role_message, success, danger} = CommonMessage;
  const {showMessage} = useContext(MessageContext);  //show message
  const [loader, setLoader]= useState(false)// lodader
  const [roles, setRoles] = useState([])
  useEffect(()=>{
    getRole();
  },[])
   // Get Role
   const getRole = async() =>{
    setLoader(true);
    try {
      const res = await api.get(path)
      const resData = res.data;
      if(resData.status === true){
        setLoader(false);
        setRoles(resData.roles)
      }
    } catch (error) {
      setLoader(false)
      const message = error.response.data.message;
        showMessage({
            message: message,
            type: danger
        });
    }
  }
  // End


  // Delete role
  // Dialog box
  const [dialog, setDiaLog] = useState({
    message:'',
    isLoading: false
  });
  const [deleteLoader, setDeleteLoader] = useState(false)
  // end
  const idRoleRef = useRef();
  const handleDiaLog = (message, isLoading)=>{
    setDiaLog({
      message:message,
      isLoading:isLoading
    })
  }
  
  const handleDelete = (id) =>{
    handleDiaLog(delete_role_message, true)
    idRoleRef.current = id;
  }
  const areUSureDelete = async (choose) =>{
    if(choose){
      setDeleteLoader(true);
      try {
        const res = await api.delete(`${path}/${idRoleRef.current}`);
        const resData = res.data;
        if(resData.status === true){
          const newRole = roles.filter((role)=>role._id !==idRoleRef.current)
          setRoles(newRole);
          showMessage({
            message:resData.message,
            type:success
          });
          setDeleteLoader(false);
        }
      
      } catch (error) {
        const message = error.response.data.message;
        showMessage({
            message:message,
            type:danger
        });
        setDeleteLoader(false);
      }
      handleDiaLog("", false)
    }else{
      handleDiaLog("", false)
    }
  }
  // end
  return (
    <>
      <PageHeading heading={role}/>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
            <div className="d-flex justify-content-between align-items-center">
                <h6 className="m-0 font-weight-bold text-primary">{role}</h6>
                <Link to={'/roles/create'} className="btn btn-primary btn-user">{add}</Link>
            </div>
        </div>
        <div className="card-body">
            <div className="table-responsive">
            {loader && <Spinner/>}
              <table className="table table-bordered" id="dataTable" width="100%" cellpacing="0">
                  <thead>
                      <tr>
                          <th>{name}</th>
                          <th className='text-center'>{created_at}</th>
                          <th className='text-center'>{action}</th>
                      </tr>
                  </thead>
                  <tbody>
                  
                    {roles.length>0 ? 
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
export default Role;