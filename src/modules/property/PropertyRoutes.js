import { Routes, Route } from "react-router-dom";
import PropertyCreate from "./PropertyCreate";
import PropertyEdit from "./PropertyEdit";
import Property from "./Property";
const PropertyRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Property/>}></Route>
        <Route path="/properties/create" element={<PropertyCreate/>}></Route>
        <Route path="/properties/edit/:id" element={<PropertyEdit/>}></Route>
    </Routes>
  )
}
export default PropertyRoutes;
