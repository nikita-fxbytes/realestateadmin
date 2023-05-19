import { Link } from "react-router-dom";
import PropertyMessage from '../PropertyMessage';
import PropertyCreateLogic from "./PropertyCreateLogic";
import CommonMessage from "../../../helper/message/CommonMessage";
const PropertyCreate = () => {
  //Messages 
  const {enter_name, submit, cancel, name, status} = CommonMessage;
  const {add_a_new_property, price, location, square_feet, garage, bedrooms, bathrooms, property_realtor, enter_price, enter_location, enter_square_feet, enter_garage, enter_bedrooms, enter_bathrooms, select_property_realtor} = PropertyMessage;
  //  End
  // Logic function
  const{handleSubmit, handleChange, Status, path,userLoader, loader, errors, users, formValues} =PropertyCreateLogic()
  // End
  return (
    <>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">{add_a_new_property}</h6>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div className="form-group mb-2">
                  <label>{name}<span className="text-danger">*</span></label>
                  <input type="text" className="form-control form-control-user" name="name" placeholder={enter_name} onChange={handleChange}/>
                  { errors.name && <label className="text-danger mb-0"> {errors.name}</label>}
                </div>              
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="form-group mb-2">
                  <label>{price}<span className="text-danger">*</span></label>
                  <input type="text" className="form-control form-control-user" name="price" placeholder={enter_price} onChange={handleChange} value={formValues.price}/>
                  {errors.price && <label className="text-danger mb-0"> {errors.price}</label>}
                </div>              
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="form-group mb-2">
                  <label>{location}</label>
                  <input type="text" className="form-control form-control-user" name="location" placeholder={enter_location} onChange={handleChange}/>
                </div>              
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="form-group mb-2">
                  <label>{square_feet}</label>
                  <input type="text" className="form-control form-control-user" name="squareFeet" placeholder={enter_square_feet} onChange={handleChange} value={formValues.squareFeet}/>
                </div>              
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="form-group mb-2">
                  <label>{garage}</label>
                  <input type="text" className="form-control form-control-user" name="garage" placeholder={enter_garage} onChange={handleChange} value={formValues.garage}/>
                </div>              
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="form-group mb-2">
                  <label>{bedrooms}</label>
                  <input type="text" className="form-control form-control-user" name="bedrooms" placeholder={enter_bedrooms} onChange={handleChange} value={formValues.bedrooms}/>
                </div>              
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="form-group">
                  <label>{bathrooms}</label>
                  <input type="text" className="form-control form-control-user" name="bathrooms" placeholder={enter_bathrooms} onChange={handleChange} value={formValues.bathrooms}/>
                </div>              
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="form-group">
                  <label>{property_realtor}<span className="text-danger">*</span></label>
                  <div className="d-flex align-items-center ">
                    <select className="form-control" name="propertyRealtor" onChange={handleChange}>
                      <option>{select_property_realtor}</option>
                      {users && users.length>0 ?
                      users.map((user)=>(
                        <option value={user._id} key={user._id}>{user ? user.name:''}</option>
                      ))
                        :
                        ''}
                    </select>
                    {userLoader && <span className="spinner-border spinner-border-sm ml-n3"></span>}
                  </div>
                  
                  { errors.propertyRealtor && <label className="text-danger mb-0"> {errors.propertyRealtor}</label>}
                </div>              
              </div>
              <div className="col-lg-6 col-md-6">
                  <div className="form-group mb-0">
                    <label>{status}<span className="text-danger">*</span></label>
                    <Status handleChange={handleChange} value={formValues.status}/>
                    {errors.status && <label className="text-danger mb-0"> {errors.status}</label>}
                  </div>              
              </div>
            </div>
          </div>
          <div className="card-footer">
            <Link to={path} className="btn btn-outline-primary mr-2">{cancel}</Link>
            <button type="submit" className="btn btn-primary btn-user" disabled={loader}>
              {loader && <span className="spinner-border spinner-border-sm me-1"></span>}
              {submit}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default PropertyCreate

