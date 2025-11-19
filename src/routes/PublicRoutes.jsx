// Public routes - routes không cần authentication
// Các routes này sử dụng ClientLayout

import Auth from "../features/auth/Auth";
import Home from "../features/home/Home";
import Products from "../features/products/Products";
import ProductDetail from "../features/products/ProductDetail";

const PublicRoutes = [
  { path: "/", component: Home },
  { path: "/auth", component: Auth },
  { path: "/products", component: Products },
  { path: "/products/:id", component: ProductDetail },
  // { path: "/about", component: About },
  // { path: "/contact", component: Contact },
]

export default PublicRoutes

