import axios from 'axios';
export default axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0MTcxZjk2ODAyZjY1NjE5ZDc5Y2NhIn0sImlhdCI6MTY4MjI1NTc0OH0.otzGFezGDDDrpbRxthhdBpSjOxj9hlUU2ykn8QWFg3I"
      }
});
