import PropertyLogic from './PropertyLogic';
import { Link } from 'react-router-dom';
import PropertyMessage from '../PropertyMessage';
import CommonMessage from '../../../helper/message/CommonMessage';
import Confirmation from '../../../components/confirmation/Confirmation';
import Spinner from '../../../components/spinner/Spinner';
import { dateFormate } from '../../../helper/CommonFunction';
const PropertyList = () => {
  const {
    loader,
    allProperties,
    handleDelete,
    deleteLoader,
    areUSureDelete,
    path,
    dialog
  } = PropertyLogic();
  const {name, created_at, action, add, no_data_found, properties} = CommonMessage;
  const {price, propertyRealtor} = PropertyMessage;
  return (
    <>
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
  );
};

export default PropertyList;