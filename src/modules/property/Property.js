import MessageContext from '../../components/message/context/MessageContext';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Confirmation from '../../components/confirmation/Confirmation';
import PageHeading from '../../components/pageheading/PageHeading';
import CommonMessage from '../../helper/message/CommonMessage';
import { dateFormate } from '../../helper/CommonFunction';
import Spinner from '../../components/spinner/Spinner';
import PropertyMessage from './PropertyMessage';
import { Link } from 'react-router-dom';
import api from '../../api/Api';
const Property = () => {
  // Base path
  const path = '/properties';
  // End

  const {showMessage} = useContext(MessageContext);//Show message

  // Message
  const {name, created_at, action, add, success, danger, no_data_found, properties} = CommonMessage;
  const {price, location, propertyRealtor, delete_property_message} = PropertyMessage;
  // End

  const [loader, setLoader]= useState(false)// lodader
  const [allProperties, setAllProperties] = useState([])

  // Get property
  useEffect(()=>{
    getProperties();
  },[])
  // End
   // Get property api
   const getProperties = async() =>{
    setLoader(true);
    try {
      const res = await api.get(path)
      const resData = res.data;
      if(resData.status === true){
        setLoader(false);
        setAllProperties(resData.properties)
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

  // Delete property
  // Dialog box
  const [dialog, setDiaLog] = useState({
    message:'',
    isLoading: false
  });
  const [deleteLoader, setDeleteLoader] = useState(false)
  // end
  const idPropertyRef = useRef();
  const handleDiaLog = (message, isLoading)=>{
    setDiaLog({
      message:message,
      isLoading:isLoading
    })
  }
  
  const handleDelete = (id) =>{
    handleDiaLog(delete_property_message, true)
    idPropertyRef.current = id;
  }
  const areUSureDelete = async (choose) =>{
    if(choose){
      setDeleteLoader(true);
      try {
        const res = await api.delete(`${path}/${idPropertyRef.current}`);
        const resData = res.data;
        if(resData.status === true){
          const newProperties = allProperties.filter((property)=>property._id !==idPropertyRef.current)
          setAllProperties(newProperties);
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
    <PageHeading heading={properties}/>
    <div className="card shadow mb-4">
      <div className="card-header py-3">
          <div className="d-flex justify-content-between align-items-center">
              <h6 className="m-0 font-weight-bold text-primary">{properties}</h6>
              <Link to={'/properties/create'} className="btn btn-primary btn-user">{add}</Link>
          </div>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          {loader && <Spinner/>}
          <table className="table table-bordered" id="dataTable" width="100%" cellpacing="0">
            <thead>
                <tr>
                    <th>{name}</th>
                    <th>{price}</th>
                    <th>{location}</th>
                    <th>{propertyRealtor}</th>
                    <th className='text-center'>{created_at}</th>
                    <th className='text-center'>{action}</th>
                </tr>
            </thead>
            <tbody>
              {
              allProperties.length>0 ? 
                allProperties.map((property)=>(
                  <tr key={property._id}>      
                    <td>{property.name ? property.name:''}</td>
                    <td>{property.price ? "₹" + property.price.toLocaleString("en-IN"): 0}</td>
                    <td>{property.location ? property.location:''}</td>
                    <td>
                      {property.propertyRealtor && <p className='mb-0'>
                      { property.propertyRealtor.name  ? property.propertyRealtor.name:''}
                      </p>}
                    {property.propertyRealtor && <span><i>({ property.propertyRealtor.mobile  ? property.propertyRealtor.mobile:''})</i></span>}
                    </td>
                    <td className='text-center'>{dateFormate(property.createdAt)}</td>
                    <td className='text-center'>
                    <Link to={`${path}/details/${property._id}`} className='text-primary mr-2'><i className='fa fa-eye'></i></Link>
                      <Link to={`${path}/edit/${property._id}`} className='text-success mr-2'><i className='fa fa-edit'></i></Link>
                      <button onClick={()=>handleDelete(property._id)} className='text-danger bg-transparent border-0'>
                        <i className='fa fa-trash'></i>
                      </button>
                    </td>
                  </tr>
                )) 
              :
                <tr>
                  <td className='text-center' colSpan={6}>
                    {no_data_found}
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
export default Property;


