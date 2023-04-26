import { Link, useNavigate, useParams } from "react-router-dom";
import PageHeading from "../../components/pageheading/PageHeading";
import CommonMessage from "../../helper/message/CommonMessage";
import PropertyMessage from './PropertyMessage';
import { useContext, useEffect, useState } from "react";
import MessageContext from "../../components/message/context/MessageContext";
import { propertiesValidaions } from "./PropertyValidations";
import api from '../../api/Api'
const PropertyEdit = () => {
  // Base path
  const path = '/properties';
  const userPath = '/users';
  // End

  // Redirect url
  const navigate = useNavigate();
  // End
  
  const { id } = useParams();//Get id

  const {showMessage} = useContext(MessageContext);//Show message

  // Message
  const {enter_name, update, cancel, name, danger, success} = CommonMessage;
  const {edit_property, price, location, square_feet, garage, bedrooms, bathrooms, property_realtor, enter_price, enter_location, enter_square_feet, enter_garage, enter_bedrooms, enter_bathrooms, select_property_realtor} = PropertyMessage;
  // End

  const [userLoader, setUserLoader] = useState(false);//Loader
  const [users, setUsers] = useState([]); //User loader

  // Get role
  useEffect(()=>{
    getUsers();
    getProperty(id);
  },[])
  // End

  // Get user api
  const getUsers = async() =>{
    setUserLoader(true);
    try {
      const res = await api.get(`${userPath}?roleName=propertyrealtor`)
      const resData = res.data;
      if(resData.status === true){
        setUserLoader(false);
        setUsers(resData.users)
      }
    } catch (error) {
      setUserLoader(false)
      const message = error.response.data.message;
        showMessage({
            message: message,
            type: danger
        });
    }
  }
  // End

   // Get property
   const [loader, setLoader] = useState(false);//Loader
   const getProperty = async(propertyId) =>{
    setLoader(true);
    try {
      const res = await api.get(`${path}/${propertyId}`)
      const resData = res.data;
      if(resData.status === true){
        setLoader(false);
        setFormValues(resData.property)
      }
    } catch (error) {
      setLoader(false)
      const message = error.response.data.message;
        showMessage({
            message:message,
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
      updateProperty(properties);
    }
  }
  // End
  // Update property api
  const updateProperty = async(formValues) => {
    setLoader(true);
    try {
      const res = await api.put(`${path}/${id}`, formValues)
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
      setLoader(false);
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
      <PageHeading heading={edit_property}/>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">{edit_property}</h6>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div className="form-group mb-2">
                  <label>{name}<span className="text-danger">*</span></label>
                  <input type="text" className="form-control form-control-user" name="name" placeholder={enter_name} onChange={handleChange} value={formValues.name}/>
                  {errors.name && <label className="text-danger mb-0"> {errors.name}</label>}
                </div>              
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="form-group mb-2">
                  <label>{price}<span className="text-danger">*</span></label>
                  <input type="number" className="form-control form-control-user" name="price" placeholder={enter_price} onChange={handleChange} value={formValues.price}/>
                  {errors.price && <label className="text-danger mb-0"> {errors.price}</label>}
                </div>              
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="form-group mb-2">
                  <label>{location}</label>
                  <input type="text" className="form-control form-control-user" name="location" placeholder={enter_location} onChange={handleChange} value={formValues.location}/>
                </div>              
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="form-group mb-2">
                  <label>{square_feet}</label>
                  <input type="number" className="form-control form-control-user" name="squareFeet" placeholder={enter_square_feet} onChange={handleChange} value={formValues.enter_square_feet}/>
                </div>              
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="form-group mb-2">
                  <label>{garage}</label>
                  <input type="number" className="form-control form-control-user" name="garage" placeholder={enter_garage} onChange={handleChange} value={formValues.enter_garage}/>
                </div>              
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="form-group mb-2">
                  <label>{bedrooms}</label>
                  <input type="number" className="form-control form-control-user" name="bedrooms" placeholder={enter_bedrooms} onChange={handleChange} value={formValues.enter_bedrooms}/>
                </div>              
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="form-group mb-0">
                  <label>{bathrooms}</label>
                  <input type="number" className="form-control form-control-user" name="bathrooms" placeholder={enter_bathrooms} onChange={handleChange} value={formValues.enter_bathrooms}/>
                </div>              
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="form-group mb-0">
                  <label>{property_realtor}<span className="text-danger">*</span></label>
                  <div className="d-flex align-items-center ">
                    <select className="form-control" name="propertyRealtor" onChange={handleChange} value={formValues.propertyRealtor}>
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
                  
                  {errors.propertyRealtor && <label className="text-danger mb-0"> {errors.propertyRealtor}</label>}
                </div>              
              </div>
            </div>
          </div>
          <div className="card-footer">
            <Link to='/properties' className="btn btn-outline-primary mr-2">{cancel}</Link>
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

export default PropertyEdit;
