import { Routes, Route } from "react-router-dom";
import PropertyCreate from "./PropertyCreate";
import PropertyEdit from "./PropertyEdit";
import Property from "./Property";
import PropertyDetails from "./PropertyDetails";
const PropertyRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Property/>}></Route>
        <Route path="/create" element={<PropertyCreate/>}></Route>
        <Route path="/edit/:id" element={<PropertyEdit/>}></Route>
        <Route path="/details/:id" element={<PropertyDetails/>}></Route>
    </Routes>
  )
}
export default PropertyRoutes;
