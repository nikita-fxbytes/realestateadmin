import { Link } from 'react-router-dom';
import PropertyLogic from './PropertyLogic';
import PropertyMessage from '../PropertyMessage';
import CommonMessage from '../../../helper/message/CommonMessage';
import Confirmation from '../../../components/confirmation/Confirmation';
import Spinner from '../../../components/spinner/Spinner';
import { dateFormate } from '../../../helper/CommonFunction';
const PropertyList = () => {
  const {
    loader, allProperties, handleDelete, deleteLoader,  areUSureDelete, path, dialog,
    seach, current, handleSort, Pagination,handleNextPage, handlePreviousPage, statusSearch, Status,page,perPage, searchTerm, totalPages
  } = PropertyLogic();
  const {name, created_at, action, add, no_data_found, properties, search, status} = CommonMessage;
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
      <div className='row justify-content-end mb-3'>
            <div className='col-lg-4 col-md-2 col-12'>
              <div className='d-flex'>
                <Status handleChange={statusSearch} value=''/>
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
                    <th onClick={() => handleSort('price')} className='pe-auto'>
                      {price} 
                     <i  className="fa fa-sort ml-1"></i>
                    </th>
                    <th onClick={() => handleSort('propertyRealtor')} className='pe-auto'>
                      {propertyRealtor} 
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
                    <td className={property.status== 1 ? 'text-success text-center':'text-center text-danger'}>{property.statusText ??''}</td>
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
          {allProperties.length>0 && <Pagination currentPage={page} totalPages={totalPages}  perPage={perPage} handlePreviousPage={handlePreviousPage} handleNextPage={handleNextPage} current={current}/>}
          {dialog.isLoading && <Confirmation onDialog={areUSureDelete} message={dialog.message} deleteLoader={deleteLoader}/>}
        </div>
      </div>
    </div>
  </>
  );
};

export default PropertyList;