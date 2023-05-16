import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import withAuth from '../../helper/middleware/withAuth';
const AuthProperty = lazy(() => import('./propertylist/PropertyList').then(module => ({ default: withAuth(module.default) })));
const AuthPropertyCreate = lazy(() => import('./propertycreate/PropertyCreate').then(module => ({ default: withAuth(module.default) })));
const AuthPropertyEdit = lazy(() => import('./propertyedit/PropertyEdit').then(module => ({ default: withAuth(module.default) })));
const AuthPropertyDetails = lazy(() => import('./propertydetails/PropertyDetails').then(module => ({ default: withAuth(module.default) })));

const PropertyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Suspense fallback={<div>Loading...</div>}><AuthProperty/></Suspense>} />
      <Route path="/create" element={<Suspense fallback={<div>Loading...</div>}><AuthPropertyCreate/></Suspense>} />
      <Route path="/edit/:id" element={<Suspense fallback={<div>Loading...</div>}><AuthPropertyEdit/></Suspense>} />
      <Route path="/details/:id" element={<Suspense fallback={<div>Loading...</div>}><AuthPropertyDetails/></Suspense>} />
    </Routes>
  )
}

export default PropertyRoutes;