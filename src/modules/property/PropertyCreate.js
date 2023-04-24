import { Link } from "react-router-dom";
import PageHeading from "../../components/pageheading/PageHeading";
import CommonMessage from "../../helper/message/CommonMessage";
import PropertyMessage from '../../helper/message/PropertyMessage';
const PropertyCreate = () => {
  const {enter_name, submit, cancel, name} = CommonMessage;
  const {add_a_new_property, price, location, squareFeet, garage, bedrooms, bathrooms, propertyRealtor, enter_price, enter_location, enter_square_feet, enter_garage, enter_bedrooms, enter_bathrooms, select_property_realtor} = PropertyMessage;
  return (
    <>
      <PageHeading heading={add_a_new_property}/>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">{add_a_new_property}</h6>
        </div>
        <form>
          <div className="card-body">
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <div className="form-group mb-2">
                    <label>{name}<span className="text-danger">*</span></label>
                    <input type="text" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder={enter_name}/>
                  </div>              
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group mb-2">
                    <label>{price}<span className="text-danger">*</span></label>
                    <input type="text" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder={enter_price}/>
                  </div>              
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group mb-2">
                    <label>{location}</label>
                    <input type="text" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder={enter_location}/>
                  </div>              
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group mb-2">
                    <label>{squareFeet}</label>
                    <input type="text" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder={enter_square_feet}/>
                  </div>              
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group mb-2">
                    <label>{garage}</label>
                    <input type="text" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder={enter_garage}/>
                  </div>              
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group mb-2">
                    <label>{bedrooms}</label>
                    <input type="text" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder={enter_bedrooms}/>
                  </div>              
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group mb-0">
                    <label>{bathrooms}</label>
                    <input type="text" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder={enter_bathrooms}/>
                  </div>              
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group mb-0">
                    <label>{propertyRealtor}<span className="text-danger">*</span></label>
                    <select className="form-control">
                      <option>{select_property_realtor}</option>
                    </select>
                  </div>              
                </div>
              </div>
          </div>
          <div className="card-footer">
            <Link to='/properties' className="btn btn-outline-primary mr-2">{cancel}</Link>
            <button type="submit" className="btn btn-primary btn-user">{submit}</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default PropertyCreate

