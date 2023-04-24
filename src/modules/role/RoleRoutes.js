import { Routes, Route } from "react-router-dom";
import RoleCreate from "./RoleCreate";
import RoleEdit from "./RoleEdit";
import Role from "./Role";
const RoleRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Role/>}></Route>
        <Route path="/create" element={<RoleCreate/>}></Route>
        <Route path="/edit/:id" element={<RoleEdit/>}></Route>
    </Routes>
  )
}

export default RoleRoutes;
