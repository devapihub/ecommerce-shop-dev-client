// Public routes - routes không cần authentication
// Các routes này sử dụng ClientLayout

import Auth from "../features/auth/Auth";

const PublicRoutes = [
  { path: "/auth", component: Auth },
  // { path: "/about", component: About },
  // { path: "/contact", component: Contact },
]

export default PublicRoutes

