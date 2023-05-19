
import createAPI from "../../../api/Api";
import {STATUSCODE} from "../../../helper/Constent";
import {useContext, useEffect, useState} from "react";
import AuthContext from "../../../helper/auth/AuthContext";
import LogOutLogic from "../../../helper/auth/LogOutLogic";
import CommonMessage from "../../../helper/message/CommonMessage";
import MessageContext from "../../../components/message/context/MessageContext";

const HeaderLogic = () => {
    // Api 
    const apiCreator = createAPI(); 
    const api = apiCreator(); 
    //End 
    const {logOut} = LogOutLogic();//logout 
    const {showMessage} = useContext(MessageContext);//Show message
    const {danger} = CommonMessage;//Message
    const [loader, setLoader] = useState(false);//Loader
    const {userName, setUserName} = useContext(AuthContext);//Set user name
    useEffect(()=>{
        getProfileDetails();// Get profile
      },[]);
     // Get Profile
    const getProfileDetails = async() =>{
        setLoader(true);
        try {
            const res = await api.get('/profile')
            const resData = res.data;
            if(resData.status === true){
                setUserName(resData.user.name)
            }else if(resData.status === false){
                showMessage({
                    message: resData.message,
                    type: danger
                });
            }else {
                showMessage({
                    message: resData.message,
                    type: danger
                });
            }
        } catch (error) {
            const errorResponse = error.response.data;
            if(errorResponse.status=== STATUSCODE.UNAUTHENTICATED){
                logOut();
            }
            const message = errorResponse.message;
            showMessage({
                message:message,
                type: danger
            });
        }finally{
            setLoader(false)
        }
    }
    return {logOut, loader, userName}
}
export default HeaderLogic;
