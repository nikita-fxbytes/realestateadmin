import { Link, useNavigate } from "react-router-dom";
import PageHeading from "../../components/pageheading/PageHeading";
import CommonMessage from "../../helper/message/CommonMessage";
import PropertyMessage from '../../helper/message/PropertyMessage';
import MessageContext from "../../components/message/context/MessageContext";
import { useContext, useEffect, useState } from "react";
import api from "../../api/Api";
import { propertiesValidaions } from "./PropertyValidations";
const PropertyCreate = () => {
  const {enter_name, submit, cancel, name, danger, success} = CommonMessage;
  const {add_a_new_property, price, location, squareFeet, garage, bedrooms, bathrooms, propertyRealtor, enter_price, enter_location, enter_square_feet, enter_garage, enter_bedrooms, enter_bathrooms, select_property_realtor} = PropertyMessage;
  const path = '/properties';
  const userPath = '/users'
  const navigate = useNavigate();
  const {showMessage} = useContext(MessageContext);//Show message
  const [loader, setLoader] = useState(false);//Loader
  const [users, setUsers] = useState([]); //roles
  // Get role
  useEffect(()=>{
    getUser();
  },[]);
  // End
  // Get role Api
  const getUser = async() =>{
    // setLoader(true);
    try {
      const res = await api.get(`${userPath}?roleName=propertyrealtor`)
      const resData = res.data;
      if(resData.status === true){
        // setLoader(false);
        setUsers(resData.users)
      }
    } catch (error) {
      // setLoader(false)
      const message = error.response.data.message;
        showMessage({
            message: message,
            type: danger
        });
    }
  }
  // End
  // Form value
  const intialValues = {
    name: '',
    price: '',
    location: '',
    squareFeet: '',
    garage: '',
    bedrooms: '',
    bathrooms: '',
    propertyRealtor: ''
  }
  const [formValues, setFormValues] = useState(intialValues);
  const [errors, setErrors] = useState({});//Error
  // End
  // Input change
  const handleChange = (e) =>{
    const{name, value} = e.target;
    setFormValues({...formValues, [name]: value});
    if (Object.keys(errors).length > 0) {
      setErrors({ ...errors, [name]: '' });
    }
  }
  // End
  // Submit Form
  const handleSubmit = (e) =>{
    e.preventDefault();
    const errors = propertiesValidaions(formValues);
    setErrors(errors);
    if(Object.keys(errors).length ===0){
      const {name, price, location, squareFeet, garage, bedrooms, bathrooms, propertyRealtor } = formValues;
      const properties = {name, price, location, squareFeet, garage, bedrooms, bathrooms, propertyRealtor}
      addProperty(properties);
    }
  }
  // End
  // Add user api
  const addProperty = async(formValues) => {
    setLoader(true);
    try {
      const res = await api.post(path, formValues)
      const resData = res.data;
      if(resData.status === true){
        setLoader(false);
        showMessage({
          message: resData.message,
          type: success
        });
        navigate(path);
      }
      
    } catch (error) {
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
      <PageHeading heading={add_a_new_property}/>
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
                  </div>              
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group mb-2">
                    <label>{price}<span className="text-danger">*</span></label>
                    <input type="text" className="form-control form-control-user" name="price" placeholder={enter_price} onChange={handleChange}/>
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
                    <label>{squareFeet}</label>
                    <input type="text" className="form-control form-control-user" name="squareFeet" placeholder={enter_square_feet} onChange={handleChange}/>
                  </div>              
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group mb-2">
                    <label>{garage}</label>
                    <input type="text" className="form-control form-control-user" name="garage" placeholder={enter_garage} onChange={handleChange}/>
                  </div>              
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group mb-2">
                    <label>{bedrooms}</label>
                    <input type="text" className="form-control form-control-user" name="bedrooms" placeholder={enter_bedrooms} onChange={handleChange}/>
                  </div>              
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group mb-0">
                    <label>{bathrooms}</label>
                    <input type="text" className="form-control form-control-user" name="bathrooms" placeholder={enter_bathrooms} onChange={handleChange}/>
                  </div>              
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group mb-0">
                    <label>{propertyRealtor}<span className="text-danger">*</span></label>
                    <select className="form-control" name="propertyRealtor" onChange={handleChange}>
                      <option>{select_property_realtor}</option>
                      {users && users.length>0 ?
                       users.map((user)=>(
                        <option value={user._id} key={user._id}>{user ? user.name:''}</option>
                       ))
                        :
                        ''}
                    </select>
                    {errors.roleId && <label className="text-danger mb-0"> {errors.propertyRealtor}</label>}
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

