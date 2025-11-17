// Client routes - routes dành cho người dùng cuối
// Các routes này sẽ sử dụng ClientLayout

import Home from "../../features/home/Home";

const ClientRoutes = [
  { path: "/", component: Home, protected: true },
  // { path: "/products", component: Products },
  // { path: "/product/:id", component: ProductDetail },
  // { path: "/cart", component: Cart },
  // { path: "/checkout", component: Checkout },
  // { path: "/profile", component: Profile, protected: true },
]

export default ClientRoutes

