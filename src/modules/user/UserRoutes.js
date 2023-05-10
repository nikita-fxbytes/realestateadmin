import { lazy, Suspense } from 'react';
import { Routes, Route } from "react-router-dom";
import withAuth from '../../helper/middleware/withAuth ';
const AuthUser = lazy(() => import('./userlist/UsersList').then(module => ({ default: withAuth(module.default) })));
const AuthUserCreate = lazy(() => import('./createuser/CreateUser').then(module => ({ default: withAuth(module.default) })));
const AuthUserEdit = lazy(() => import('./edituSer/EditUSer').then(module => ({ default: withAuth(module.default) })));
const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Suspense fallback={<div>Loading...</div>}><AuthUser/></Suspense>} />
      <Route path="/create" element={<Suspense fallback={<div>Loading...</div>}><AuthUserCreate/></Suspense>} />
      <Route path="/edit/:id" element={<Suspense fallback={<div>Loading...</div>}><AuthUserEdit/></Suspense>} />
    </Routes>
  )
}

export default UserRoutes;
