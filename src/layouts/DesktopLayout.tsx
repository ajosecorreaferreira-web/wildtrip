import { Outlet, NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Plane, Users, BarChart3 } from 'lucide-react'

const navItems = [
  { to: '/traveler', icon: Plane, label: 'Viajes' },
  { to: '/manager', icon: Users, label: 'Manager' },
  { to: '/finance', icon: BarChart3, label: 'Finanzas' },
]

export function DesktopLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-60 shrink-0 bg-sidebar flex flex-col">
        <div className="px-6 py-8">
          <span className="font-display text-2xl text-white tracking-tight">Wildtrip</span>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-sans transition-colors',
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                )
              }
            >
              <Icon size={20} strokeWidth={1.5} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto px-8 py-8 max-w-7xl">
        <Outlet />
      </main>
    </div>
  )
}
