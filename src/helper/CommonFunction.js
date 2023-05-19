import { TOKEN } from "./Constent";

// Date Formate
export const dateFormate = (date) =>{
  const formattedDate =new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
  });
  return formattedDate;
}
// End
// Set user token
export const setUserToken = (token) =>{
  return localStorage.setItem(TOKEN,token);
}
// End
// Get user token
export const getUserToken = ()=>{
  return localStorage.getItem(TOKEN);
}
// End
// Remove user token
export const removeUserToken =()=> {
  localStorage.removeItem(TOKEN);
}
// End
// Logout user
export const logout = ()=> {
  removeUserToken();
}
// End
