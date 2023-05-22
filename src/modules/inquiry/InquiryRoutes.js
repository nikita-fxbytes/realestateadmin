import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import withAuth from '../../helper/middleware/withAuth';
const AuthInquiry = lazy(() => import('./inquiry-list/InquiryList').then(module => ({ default: withAuth(module.default) })));
const AuthInquiryCreate = lazy(() => import('./inquiry-create/InquiryCreate').then(module => ({ default: withAuth(module.default) })));
const AuthInquiryEdit = lazy(() => import('./Inquiry-edit/InquiryEdit').then(module => ({ default: withAuth(module.default) })));
const InquiryRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Suspense fallback={<div>Loading...</div>}><AuthInquiry/></Suspense>} />
      <Route path="/create" element={<Suspense fallback={<div>Loading...</div>}><AuthInquiryCreate/></Suspense>} />
      <Route path="/edit/:id" element={<Suspense fallback={<div>Loading...</div>}><AuthInquiryEdit/></Suspense>} />
    </Routes>
  )
}
export default InquiryRoutes;