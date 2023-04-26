import MessageContext from '../../components/message/context/MessageContext';
import PageHeading from '../../components/pageheading/PageHeading';
import React, { useContext, useEffect, useState } from 'react';
import CommonMessage from '../../helper/message/CommonMessage';
import { dateFormate } from '../../helper/CommonFunction';
import Spinner from '../../components/spinner/Spinner';
import { Link, useParams } from 'react-router-dom';
import PropertyMessage from './PropertyMessage';
import api from '../../api/Api';
const PropertyDetails = () => {
  // Base path
  const path = '/properties';
  // End
  const { id } = useParams();//Get id

  const {showMessage} = useContext(MessageContext);//Show message

  // Message
  const {name, created_at, edit,  danger, no_data_found} = CommonMessage;
  const {price,location, square_feet, garage, bedrooms, bathrooms, property_realtor, propert_details, property_realtor_mobile_number} = PropertyMessage;
  // End

  const [loader, setLoader]= useState(false)// lodader
  const [properties, setProperty] = useState()

  // Get property
  useEffect(()=>{
    getProperty(id);
  },[])
  // End
   // Get property api
   const getProperty = async(propertyId) =>{
    setLoader(true);
    try {
        const res = await api.get(`${path}/${propertyId}`)
        const resData = res.data;
        if(resData.status === true){
            setLoader(false);
            setProperty(resData.property)
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
  return (
  <>
    <PageHeading heading={propert_details}/>
    <div className="card shadow mb-4">
        <div className="card-header py-3">
            <div className="d-flex justify-content-between align-items-center">
                <h6 className="m-0 font-weight-bold text-primary">{propert_details}</h6>
                <Link to={`${path}/edit/${id}`} className="btn btn-primary btn-user">{edit}</Link>
            </div>
        </div>
        <div className="card-body">
            {loader && <Spinner/>}
           {properties ? <div className='row'>
                <div className="col-lg-4 col-md-4 col-12">
                    <div className='form-group'>
                        <label>{name}</label>
                        <p>{properties.name ? properties.name: ''}</p>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-12">
                    <div className='form-group'>
                        <label>{price}</label>
                        <p>{properties.price ? properties.price: ''}</p>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-12">
                    <div className='form-group'>
                        <label>{location}</label>
                        <p>{properties.location ? properties.location: ''}</p>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-12">
                    <div className='form-group'>
                        <label>{square_feet}</label>
                        <p>{properties.squareFeet ? properties.squareFeet: ''}</p>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-12">
                    <div className='form-group'>
                        <label>{garage}</label>
                        <p>{properties.garage ? properties.garage: ''}</p>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-12">
                    <div className='form-group'>
                        <label>{bedrooms}</label>
                        <p>{properties.bedrooms ? properties.bedrooms: ''}</p>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-12">
                    <div className='form-group'>
                        <label>{bathrooms}</label>
                        <p>{properties.bathrooms ? properties.bathrooms: ''}</p>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-12">
                    <div className='form-group'>
                        <label>{property_realtor}</label>
                        <p>{properties.propertyRealtor && properties.propertyRealtor.name ?  properties.propertyRealtor.name: ''}</p>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-12">
                    <div className='form-group'>
                        <label>{property_realtor_mobile_number}</label>
                        <p>{properties.propertyRealtor && properties.propertyRealtor.mobile ?  properties.propertyRealtor.mobile: ''}</p>
                    </div>
                </div>
            </div>:
            <div className='text-center'>{no_data_found}</div>}
            
        </div>
    </div>
  </>
  )
}
export default PropertyDetails;