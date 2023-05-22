import React from 'react'
import CommonMessage from '../../../helper/message/CommonMessage';
import InquiryMessages from '../InquiryMessages';
import InquiryEditLogic from './InquiryEditLogic';
import { Link } from 'react-router-dom';

const InquiryEdit = () => {
  //Messages 
  const {enter_name, update, cancel, name, email, enter_email, mobile, enter_mobile} = CommonMessage;
  const {add_a_new_inquiry, property, write_message, select_property, message} = InquiryMessages;
  //  End
  // Logic function
  const{handleUpdate, handleChange, path,propertyLoader, loader, errors, properties, formValues} =InquiryEditLogic()
  // End
  return (
    <>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">{add_a_new_inquiry}</h6>
        </div>
        <form onSubmit={handleUpdate}>
          <div className="card-body">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div className="form-group mb-2">
                  <label>{name}<span className="text-danger">*</span></label>
                  <input type="text" className="form-control form-control-user" name="name" placeholder={enter_name} onChange={handleChange} value={formValues.name}/>
                  { errors.name && <label className="text-danger mb-0"> {errors.name}</label>}
                </div>              
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="form-group mb-2">
                  <label>{email}<span className="text-danger">*</span></label>
                  <input type="email" className="form-control form-control-user" name="email" placeholder={enter_email} onChange={handleChange} value={formValues.email}/>
                  {errors.email && <label className="text-danger mb-0"> {errors.email}</label>}
                </div>              
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="form-group mb-2">
                  <label>{mobile}<span className="text-danger">*</span></label>
                  <input type="text" className="form-control form-control-user" name="mobile" placeholder={enter_mobile} onChange={handleChange} value={formValues.mobile}/>
                  {errors.mobile && <label className="text-danger mb-0"> {errors.mobile}</label>}
                </div>              
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="form-group">
                  <label>{property}<span className="text-danger">*</span></label>
                  <div className="d-flex align-items-center ">
                    <select className="form-control" name="property" value={formValues.property !=undefined && formValues.property !=null ? formValues.property._id:''} onChange={handleChange}>
                      <option>{select_property}</option>
                      {properties && properties.length>0 ?
                      properties.map((property)=>(
                        <option value={property._id} key={property._id}>{property ? property.name:''}</option>
                      ))
                        :
                        ''}
                    </select>
                    {propertyLoader && <span className="spinner-border spinner-border-sm ml-n3"></span>}
                  </div>
                  {errors.property && <label className="text-danger mb-0"> {errors.property}</label>}
                </div>              
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="form-group mb-2">
                  <label>{message}</label>
                  <textarea type="text" className="form-control form-control-user" name="message" placeholder={write_message} onChange={handleChange} value={formValues.message}></textarea>
                  {errors.message && <label className="text-danger mb-0"> {errors.message}</label>}
                </div>              
              </div>
            </div>
          </div>
          <div className="card-footer">
            <Link to={path} className="btn btn-outline-primary mr-2">{cancel}</Link>
            <button type="submit" className="btn btn-primary btn-user" disabled={loader}>
              {loader && <span className="spinner-border spinner-border-sm me-1"></span>}
              {update}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default InquiryEdit

