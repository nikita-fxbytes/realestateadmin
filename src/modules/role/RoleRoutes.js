import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import withAuth from '../../helper/middleware/withAuth';
const AuthRole = lazy(() => import('./rolelist/RoleList').then(module => ({ default: withAuth(module.default) })));
const AuthRoleCreate = lazy(() => import('./rolecreate/RoleCreate').then(module => ({ default: withAuth(module.default) })));
const AuthRoleEdit = lazy(() => import('./roleedit/RoleEdit').then(module => ({ default: withAuth(module.default) })));
const RoleRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Suspense fallback={<div>Loading...</div>}><AuthRole/></Suspense>} />
      <Route path="/create" element={<Suspense fallback={<div>Loading...</div>}><AuthRoleCreate/></Suspense>} />
      <Route path="/edit/:id" element={<Suspense fallback={<div>Loading...</div>}><AuthRoleEdit/></Suspense>} />
    </Routes>
  )
}
export default RoleRoutes;
