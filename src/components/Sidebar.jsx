import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const { pathname } = useLocation();
  const Item = ({ to, label }) => (
    <Link
      to={to}
      className={`block px-4 py-2 rounded-lg mb-2 ${pathname===to ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
    >
      {label}
    </Link>
  );

  return (
    <aside className="w-64 border-r min-h-screen p-4">
      <h2 className="font-semibold mb-4">SuperAdmin</h2>
      <nav>
        <Item to="/dashboard" label="Dashboard" />
        <Item to="/companies" label="Enterprises" />
        <Item to="/drivers" label="Drivers" />
        <Item to="/vehicles" label="Vehicles" />
        <Item to="/trips" label="Trips" />
        <Item to="/bookings" label="Bookings" />
        <Item to="/passengers" label="Passengers" />
        <Item to="/profile" label="Profile" />
      </nav>
    </aside>
  );
}
