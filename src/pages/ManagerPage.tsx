import * as React from 'react'
import { Search, Bell, CheckCircle2, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/wildtrip/atoms/Button'
import { Avatar } from '@/components/wildtrip/atoms/Avatar'
import { BottomNav } from '@/components/wildtrip/BottomNav'

type Tab = 'pendientes' | 'viajes' | 'gastos'

const TAB_LABELS: Record<Tab, string> = {
  pendientes: 'Pendientes 3',
  viajes: 'Viajes',
  gastos: 'Gastos',
}

export function ManagerPage() {
  const [activeTab, setActiveTab] = React.useState<Tab>('pendientes')
  const [cards, setCards] = React.useState<string[]>(['roc', 'ana', 'marc'])

  function dismiss(id: string) {
    setCards((prev) => prev.filter((c) => c !== id))
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="bg-primary px-4 pt-12 pb-4 shrink-0">
        <div className="flex items-center justify-between mb-1">
          <p className="font-sans text-xs text-primary-foreground/60">
            Equipo Jungle · Vie 20 jun
          </p>
          <div className="flex items-center gap-2">
            <button
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-primary-foreground hover:bg-white/20 transition-colors"
              aria-label="Buscar"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button
              className="relative w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-primary-foreground hover:bg-white/20 transition-colors"
              aria-label="Notificaciones"
            >
              <Bell size={20} strokeWidth={1.5} />
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-destructive text-destructive-foreground font-sans text-[9px] font-bold flex items-center justify-center leading-none">
                3
              </span>
            </button>
          </div>
        </div>

        <h1 className="font-display text-[28px] font-normal text-primary-foreground">
          3 pendientes
        </h1>

        <div className="flex gap-2 mt-3">
          {[
            { label: 'EN VIAJE', value: '4', accent: false },
            { label: 'GASTADO', value: '1.807€', accent: false },
            { label: 'BUDGET', value: '68%', accent: true },
          ].map((kpi) => (
            <div key={kpi.label} className="flex-1 bg-white/10 rounded-xl px-3 py-2">
              <p className="font-sans text-[9px] font-semibold uppercase tracking-widest text-primary-foreground/50">
                {kpi.label}
              </p>
              <p
                className={cn(
                  'font-sans text-lg font-bold leading-tight mt-0.5',
                  kpi.accent ? 'text-accent' : 'text-primary-foreground'
                )}
              >
                {kpi.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-background border-b border-border shrink-0">
        <div className="flex px-4">
          {(Object.keys(TAB_LABELS) as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'flex-1 font-sans text-sm font-semibold py-3 text-center transition-colors duration-150',
                'border-b-2',
                activeTab === tab
                  ? 'text-foreground border-accent'
                  : 'text-muted-foreground border-transparent hover:text-foreground'
              )}
            >
              {TAB_LABELS[tab]}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 overflow-y-auto pb-nav px-4 pt-4">
        {activeTab === 'pendientes' ? (
          <div className="flex flex-col gap-3">
            {cards.includes('roc') && (
              <div className="border border-border rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <Avatar name="Roc Vilaplana" size="base" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-sans text-sm font-semibold text-foreground">
                        Roc Vilaplana
                      </span>
                      <span className="font-sans text-xs bg-muted text-muted-foreground rounded-full px-2 py-0.5">
                        Viaje
                      </span>
                      <span className="font-sans text-xs text-muted-foreground ml-auto">
                        hace 2 min
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-muted rounded-xl p-3 mt-2">
                  <p className="font-sans text-sm font-semibold text-foreground">
                    Londres · 18–22 jun
                  </p>
                  <p className="font-sans text-xs text-muted-foreground mt-0.5">
                    Vuelo + hotel · 4 noches · 680€
                  </p>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button variant="primary" className="flex-1" onClick={() => dismiss('roc')}>
                    Aprobar
                  </Button>
                  <Button variant="ghost" className="flex-1" onClick={() => dismiss('roc')}>
                    Rechazar
                  </Button>
                </div>
              </div>
            )}

            {cards.includes('ana') && (
              <div
                className="rounded-2xl p-4"
                style={{
                  border: '2px solid var(--warning)',
                  backgroundColor: 'color-mix(in oklch, var(--warning-muted) 40%, transparent)',
                }}
              >
                <div className="flex items-center gap-3">
                  <Avatar name="Ana García" size="base" color="var(--accent)" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-sans text-sm font-semibold text-foreground">
                        Ana García
                      </span>
                      <span
                        className="font-sans text-xs rounded-full px-2 py-0.5"
                        style={{
                          backgroundColor: 'var(--warning-muted)',
                          color: 'var(--warning-text)',
                        }}
                      >
                        Ampliación
                      </span>
                    </div>
                    <p className="font-sans text-xs text-muted-foreground mt-0.5">
                      hace 3 min · A Coruña
                    </p>
                  </div>
                </div>
                <div className="rounded-xl p-3 mt-2" style={{ backgroundColor: 'var(--warning-muted)' }}>
                  <p
                    className="font-sans text-sm font-semibold"
                    style={{ color: 'var(--warning-text)' }}
                  >
                    +30€ en Comida · Día 2
                  </p>
                  <p
                    className="font-sans text-xs mt-0.5"
                    style={{ color: 'var(--warning-text)', opacity: 0.75 }}
                  >
                    Comida de cliente con Marc López y Sara Fernández · Inditex
                  </p>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button variant="accent" className="flex-1" onClick={() => dismiss('ana')}>
                    Aprobar
                  </Button>
                  <Button variant="ghost" className="flex-1" onClick={() => dismiss('ana')}>
                    Rechazar
                  </Button>
                </div>
              </div>
            )}

            {cards.includes('marc') && (
              <div className="border border-border rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <Avatar
                    name="Marc Pi"
                    size="base"
                    color="var(--muted-foreground)"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="font-sans text-sm font-semibold text-foreground">
                        Marc Pi
                      </span>
                      <span className="font-sans text-sm text-muted-foreground">· Gasto</span>
                    </div>
                    <p className="font-sans text-xs text-muted-foreground mt-0.5">
                      Taxi · 18,40€ · hace 1h
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => dismiss('marc')}
                      className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-success-muted transition-colors"
                      aria-label="Aprobar gasto Marc Pi"
                    >
                      <CheckCircle2 size={20} strokeWidth={1.5} className="text-success" />
                    </button>
                    <button
                      onClick={() => dismiss('marc')}
                      className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-destructive-muted transition-colors"
                      aria-label="Rechazar gasto Marc Pi"
                    >
                      <XCircle size={20} strokeWidth={1.5} className="text-destructive" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {cards.length === 0 && (
              <div className="text-center py-16">
                <p className="font-sans text-sm text-muted-foreground">Sin pendientes.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="font-sans text-sm text-muted-foreground">Próximamente.</p>
          </div>
        )}
      </main>

      <BottomNav role="manager" />
    </div>
  )
}
