
import CommonMessage from '../../../helper/message/CommonMessage';
import Spinner from '../../../components/spinner/Spinner';
import { Link } from 'react-router-dom';
import PropertyMessage from '../PropertyMessage';
import PropertyDetailsLogic from './PropertyDetailsLogic';
const PropertyDetails = () => {
  // Message
  const {name, edit, no_data_found, status} = CommonMessage;
  const {price,location, square_feet, garage, bedrooms, bathrooms, property_realtor, propert_details, property_realtor_mobile_number, description} = PropertyMessage;
  // End
    const {path,  loader, properties, id} = PropertyDetailsLogic()

  return (
  <>
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
                {properties.location &&
                    <div className="col-lg-4 col-md-4 col-12">
                        <div className='form-group'>
                            <label>{location}</label>
                            <p>{properties.location}</p>
                        </div>
                    </div>
                }
                {properties.squareFeet && 
                    <div className="col-lg-4 col-md-4 col-12">
                        <div className='form-group'>
                            <label>{square_feet}</label>
                            <p>{properties.squareFeet}</p>
                        </div>
                    </div>
                }
                {properties.garage && 
                    <div className="col-lg-4 col-md-4 col-12">
                        <div className='form-group'>
                            <label>{garage}</label>
                            <p>{properties.garage}</p>
                        </div>
                    </div>
                }
                {properties.bedrooms && 
                    <div className="col-lg-4 col-md-4 col-12">
                        <div className='form-group'>
                            <label>{bedrooms}</label>
                            <p>{properties.bedrooms}</p>
                        </div>
                    </div>
                }
                {properties.bathrooms && 
                    <div className="col-lg-4 col-md-4 col-12">
                        <div className='form-group'>
                            <label>{bathrooms}</label>
                            <p>{properties.bathrooms}</p>
                        </div>
                    </div>
                }
                
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
                <div className="col-lg-4 col-md-4 col-12">
                    <div className='form-group'>
                        <label>{status}</label>
                        <p className={properties.status== 1 ? 'text-success':'text-danger'}>{properties.statusText ??''}</p>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-12">
                    <div className='form-group'>
                        <label>{description}</label>
                        <p>{properties.description??''}</p>
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