import { useLocation, useNavigate } from 'react-router-dom'
import { Home, Receipt, Plane, User, CheckSquare, Users, BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils'

type Role = 'traveler' | 'manager' | 'finance'

interface NavTab {
  icon: React.ElementType
  label: string
  path: string
  disabled?: boolean
}

const TRAVELER_TABS: NavTab[] = [
  { icon: Home,    label: 'Inicio',  path: '/traveler' },
  { icon: Receipt, label: 'Gastos',  path: '/traveler/gastos' },
  { icon: Plane,   label: 'Viajes',  path: '/traveler/timeline' },
  { icon: User,    label: 'Perfil',  path: '/profile', disabled: true },
]

const MANAGER_TABS: NavTab[] = [
  { icon: Home,        label: 'Inicio',        path: '/manager' },
  { icon: CheckSquare, label: 'Aprobaciones',  path: '/manager/approve/req-001' },
  { icon: Users,       label: 'Equipo',        path: '/manager', disabled: true },
  { icon: BarChart3,   label: 'Reports',       path: '/finance' },
]

const FINANCE_TABS: NavTab[] = [
  { icon: Home,        label: 'Inicio',        path: '/finance' },
  { icon: CheckSquare, label: 'Aprobaciones',  path: '/manager', disabled: true },
  { icon: Users,       label: 'Equipo',        path: '/manager', disabled: true },
  { icon: BarChart3,   label: 'Reports',       path: '/finance' },
]

const TABS_BY_ROLE: Record<Role, NavTab[]> = {
  traveler: TRAVELER_TABS,
  manager:  MANAGER_TABS,
  finance:  FINANCE_TABS,
}

interface BottomNavProps {
  role: Role
}

export function BottomNav({ role }: BottomNavProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const tabs = TABS_BY_ROLE[role]

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border pb-safe"
    >
      <div className="max-w-md mx-auto h-[64px] flex items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = !tab.disabled && (
            tab.path === '/traveler'
              ? location.pathname === '/traveler'
              : location.pathname.startsWith(tab.path)
          )

          return (
            <button
              key={tab.label}
              onClick={() => !tab.disabled && navigate(tab.path)}
              disabled={tab.disabled}
              aria-label={tab.label}
              className={cn(
                'flex-1 flex flex-col items-center justify-center gap-1 h-full',
                'transition-colors duration-150',
                isActive
                  ? 'text-accent border-t-2 border-accent -mt-px'
                  : 'text-muted-foreground hover:text-foreground',
                tab.disabled && 'opacity-35 cursor-not-allowed'
              )}
            >
              <Icon size={20} strokeWidth={1.5} />
              <span className="font-sans text-[10px] font-semibold uppercase tracking-widest leading-none">
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
