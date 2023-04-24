import React from 'react'
import CommonMessage from '../../helper/message/CommonMessage';
import PageHeading from '../../components/pageheading/PageHeading';
import { Link } from 'react-router-dom';
import PropertyMessage from '../../helper/message/PropertyMessage';
const Property = () => {
  const {name, created_at, action, add} = CommonMessage;
  const {price, location, propertyRealtor, properties} = PropertyMessage;
   // HandleDelete
    const handleDelete = () => {
      // 
    }
    // End
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
                            <tr>
                              <td>nmae</td>
                              <td>price</td>
                              <td>location</td>
                              <td>propertyRealtor</td>
                              <td className='text-center'>created_at</td>
                              <td className='text-center'>
                                <Link to={'/properties/edit/'+1} className='text-success mr-2'><i className='fa fa-edit'></i></Link>
                                <a href='javascript:;' onClick={()=>handleDelete(1)} className='text-danger'>
                                  <i className='fa fa-trash'></i>
                                </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
  </>
  )
}

export default Property;


