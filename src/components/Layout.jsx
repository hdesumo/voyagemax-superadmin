import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="ml-64 flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
