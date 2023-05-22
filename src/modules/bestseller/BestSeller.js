import CommonMessage from '../../helper/message/CommonMessage';
import Spinner from '../../components/spinner/Spinner';
import Pagination from '../../components/pagination/Pagination'
import BestSellerLogic from './BestSellerLogic';
import InquiryMessages from '../inquiry/InquiryMessages';
const BestSeller = () => {
  const {name, no_data_found, search, email, mobile} = CommonMessage;
  const {best_seller} = InquiryMessages;
  const { seach, current, handleSort ,handleNextPage, handlePreviousPage, 
    loader, allRetator ,page, perPage, searchTerm, totalPages,} = BestSellerLogic();
  return (
    <>
    <div className="card shadow mb-4">
      <div className="card-header py-3">
          <div className="d-flex justify-content-between align-items-center">
              <h6 className="m-0 font-weight-bold text-primary">{best_seller}</h6>
          </div>
      </div>
      <div className="card-body">
      <div className='row justify-content-end mb-3'>
            <div className='col-lg-4 col-md-2 col-12'>
              <div className='d-flex'>
                <input type="text" placeholder={search} className='form-control ml-2' value={searchTerm} onChange={seach}/>
              </div>
              
            </div>
          </div>
        <div className="table-responsive">
          
          {loader && <Spinner/>}
          <table className="table table-bordered" id="dataTable" width="100%" cellpacing="0">
            <thead>
                <tr>
                    <th onClick={() => handleSort('realtor.name')} className='pe-auto'>
                      {name} 
                     <i  className="fa fa-sort ml-1"></i>
                    </th>
                    <th onClick={() => handleSort('realtor.email')} className='pe-auto'>
                      {email} 
                     <i  className="fa fa-sort ml-1"></i>
                    </th>
                    <th onClick={() => handleSort('realtor.mobile')} className='pe-auto'>
                      {mobile} 
                     <i  className="fa fa-sort ml-1"></i>
                    </th>
                </tr>
            </thead>
            <tbody>
              {
              allRetator.length>0 ? 
              allRetator.map((retator)=>(
                  <tr key={retator.id}>      
                    <td>{retator.name ? retator.name:''}</td>
                    <td>{retator.email? retator.email:''}</td>
                    <td>{retator.mobile? retator.mobile:''}</td>
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
          {allRetator.length>0 && <Pagination currentPage={page} totalPages={totalPages}  perPage={perPage} handlePreviousPage={handlePreviousPage} handleNextPage={handleNextPage} current={current}/>}
        
        </div>
      </div>
    </div>
  </>
  );
}

export default BestSeller

