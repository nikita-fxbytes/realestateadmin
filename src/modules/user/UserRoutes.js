import { Routes, Route } from "react-router-dom";
import CreateUser from "./CreateUser";
import EditUSer from "./EditUSer";
import Users from "./Users";
const UserRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Users/>}></Route>
        <Route path="/create" element={<CreateUser/>}></Route>
        <Route path="/edit/:id" element={<EditUSer/>}></Route>
    </Routes>
  )
}

export default UserRoutes;
