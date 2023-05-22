
import CommonMessage from '../../../helper/message/CommonMessage';
import Confirmation from '../../../components/confirmation/Confirmation';
import Spinner from '../../../components/spinner/Spinner';
import { dateFormate } from '../../../helper/CommonFunction';
import Pagination from '../../../components/pagination/Pagination'
import InquiryMessages from '../InquiryMessages';
import InquiryListLogic from './InquiryListLogic';
import { Link } from 'react-router-dom';
const InquiryList = () => {
  const {name, created_at, action, add, no_data_found, search, status, email, mobile} = CommonMessage;
  const {inquiries, property, message} = InquiryMessages;
  const {handleDelete, seach, current, handleSort ,handleNextPage, handlePreviousPage, statusSearch, Status,areUSureDelete, handleMarkAsRead, 
    loader, allInquiries, deleteLoader, path, dialog ,page,perPage, searchTerm, totalPages, getStatus, currentStatus} = InquiryListLogic();
  return (
    <>
    <div className="card shadow mb-4">
      <div className="card-header py-3">
          <div className="d-flex justify-content-between align-items-center">
              <h6 className="m-0 font-weight-bold text-primary">{inquiries}</h6>
              <Link to={'/inquiries/create'} className="btn btn-primary btn-user">{add}</Link>
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
                    <th onClick={() => handleSort('email')} className='pe-auto'>
                      {email} 
                     <i  className="fa fa-sort ml-1"></i>
                    </th>
                    <th onClick={() => handleSort('mobile')} className='pe-auto'>
                      {mobile} 
                     <i  className="fa fa-sort ml-1"></i>
                    </th>
                    <th onClick={() => handleSort('propertyRealtor')} className='pe-auto'>
                      {property} 
                     <i  className="fa fa-sort ml-1"></i>
                    </th>
                    <th onClick={() => handleSort('propertyRealtor')} className='pe-auto'>
                      {message} 
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
              allInquiries.length>0 ? 
              allInquiries.map((inquiry)=>(
                  <tr key={inquiry._id}>      
                    <td>{inquiry.name ? inquiry.name:''}</td>
                    <td>{inquiry.email? inquiry.email:''}</td>
                    <td>{inquiry.mobile? inquiry.mobile:''}</td>
                    <td>
                      {inquiry.property && <>{ inquiry.property.name  ? inquiry.property.name:''}</>}
                    </td>
                    <td>{inquiry.message? inquiry.message:''}</td>
                    <td className={inquiry.read== true ? 'text-success text-center':'text-center text-danger'}>{inquiry.statusText ??''}</td>
                    <td className='text-center'>{dateFormate(inquiry.createdAt)}</td>
                    <td className='text-center'>
                      <button onClick={()=>handleMarkAsRead(inquiry._id)} className='text-primary bg-transparent border-0'>
                        <i className={inquiry.read ? 'fa fa-eye-slash': 'fa fa-eye'}></i>
                      </button>
                      <Link to={`${path}/edit/${inquiry._id}`} className='text-success mx-2'><i className='fa fa-edit'></i></Link>
                      <button onClick={()=>handleDelete(inquiry._id)} className='text-danger bg-transparent border-0 px-0'>
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
          {allInquiries.length>0 && <Pagination currentPage={page} totalPages={totalPages}  perPage={perPage} handlePreviousPage={handlePreviousPage} handleNextPage={handleNextPage} current={current}/>}
          {dialog.isLoading && <Confirmation onDialog={areUSureDelete} message={dialog.message} deleteLoader={deleteLoader}/>}
        </div>
      </div>
    </div>
  </>
  );
}

export default InquiryList
