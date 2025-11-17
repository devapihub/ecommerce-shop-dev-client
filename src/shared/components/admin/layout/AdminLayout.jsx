import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h2 className="text-xl font-bold">Admin Panel</h2>
        </div>
        <nav className="mt-4">
          {/* TODO: Add admin navigation items */}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-100">
        {/* Top bar */}
        <header className="bg-white shadow-sm p-4">
          {/* TODO: Add admin header content */}
        </header>

        {/* Page content */}
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AdminLayout

