import { FileText, FileDown, Filter, Download } from 'lucide-react'
import { Button } from '@/components/wildtrip/atoms/Button'
import { Avatar } from '@/components/wildtrip/atoms/Avatar'
import { BottomNav } from '@/components/wildtrip/BottomNav'

const KPIS = [
  { label: 'GASTADO', value: '4.840€', accent: false, danger: false },
  { label: 'BUDGET', value: '78%', accent: true, danger: false },
  { label: 'ALERTAS', value: '3', accent: false, danger: true },
]

const EXPENSES = [
  {
    initials: 'RV',
    name: 'Roc Vilaplana',
    concept: 'Vuelo LON · 18 jun',
    amount: '320€',
    badge: 'Verificado',
    badgeBg: 'var(--success-muted)',
    badgeColor: 'var(--success-text)',
    avatarColor: undefined,
  },
  {
    initials: 'AG',
    name: 'Ana García',
    concept: 'Restaurante Domus · A Coruña · 16 jun',
    amount: '67€',
    badge: 'Revisión',
    badgeBg: 'var(--warning-muted)',
    badgeColor: 'var(--warning-text)',
    avatarColor: 'var(--accent)',
  },
  {
    initials: 'LF',
    name: 'Laia Ferrer',
    concept: 'Hotel BIL · 2N · 18–20 jun',
    amount: '280€',
    badge: 'Sin just.',
    badgeBg: 'var(--destructive-muted)',
    badgeColor: 'var(--destructive)',
    avatarColor: 'var(--info)',
  },
  {
    initials: 'MP',
    name: 'Marc Pi',
    concept: 'Taxi · 20 jun',
    amount: '18€',
    badge: 'Verificado',
    badgeBg: 'var(--success-muted)',
    badgeColor: 'var(--success-text)',
    avatarColor: 'var(--muted-foreground)',
  },
  {
    initials: 'JM',
    name: 'Joan Mas',
    concept: 'Tren AMS · 19 jun',
    amount: '94€',
    badge: 'Verificado',
    badgeBg: 'var(--success-muted)',
    badgeColor: 'var(--success-text)',
    avatarColor: 'var(--color-chart-4)',
  },
]

export function FinancePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="bg-primary px-4 pt-12 pb-5 shrink-0">
        <div className="flex items-center justify-between mb-1">
          <p className="font-sans text-[10px] font-semibold uppercase tracking-widest text-primary-foreground/50">
            Finanzas · Grupo Jungle
          </p>
          <div className="flex items-center gap-2">
            <button
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-primary-foreground hover:bg-white/20 transition-colors"
              aria-label="Filtrar"
            >
              <Filter size={20} strokeWidth={1.5} />
            </button>
            <button
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-primary-foreground hover:bg-white/20 transition-colors"
              aria-label="Descargar"
            >
              <Download size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <h1 className="font-display text-[28px] font-normal text-primary-foreground">
          Junio 2026
        </h1>
        <p className="font-sans text-xs text-primary-foreground/50 mt-0.5">
          1–30 jun · 8 viajeros activos
        </p>

        <div className="flex gap-2 mt-4">
          {KPIS.map((kpi) => (
            <div key={kpi.label} className="flex-1 bg-white/10 rounded-xl px-3 py-2">
              <p className="font-sans text-[9px] font-semibold uppercase tracking-widest text-primary-foreground/50">
                {kpi.label}
              </p>
              <p
                className="font-sans text-lg font-bold leading-tight mt-0.5"
                style={{
                  color: kpi.danger
                    ? 'var(--destructive)'
                    : kpi.accent
                    ? 'var(--accent)'
                    : 'var(--primary-foreground)',
                }}
              >
                {kpi.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <main className="flex-1 overflow-y-auto pb-nav">
        <div className="bg-card border border-border rounded-2xl p-4 mx-4 mt-4">
          <div className="flex items-center justify-between">
            <span className="font-sans text-sm font-semibold text-foreground">
              Cumplimiento de política
            </span>
            <span className="font-sans text-sm font-bold text-accent">94%</span>
          </div>
          <div className="h-2 w-full rounded-full overflow-hidden flex mt-2">
            <div className="bg-success" style={{ width: '85%' }} />
            <div className="bg-warning" style={{ width: '9%' }} />
            <div className="bg-destructive" style={{ width: '6%' }} />
          </div>
          <div className="flex items-center gap-4 mt-2">
            <span className="font-sans text-xs text-muted-foreground flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-success" />
              Correcto
            </span>
            <span className="font-sans text-xs text-muted-foreground flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-warning" />
              Revisión
            </span>
            <span className="font-sans text-xs text-muted-foreground flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-destructive" />
              Sin justificante
            </span>
          </div>
        </div>

        <div className="mt-4 px-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-sans text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Viajero / Concepto
            </span>
            <div className="flex gap-4">
              <span className="font-sans text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Importe
              </span>
              <span className="font-sans text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Estado
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {EXPENSES.map((exp) => (
              <div
                key={exp.name}
                className="bg-card border border-border rounded-xl p-3 flex items-center gap-3"
              >
                <Avatar name={exp.name} size="sm" color={exp.avatarColor} />
                <div className="flex-1 min-w-0">
                  <p className="font-sans text-sm font-semibold text-foreground leading-tight">
                    {exp.name}
                  </p>
                  <p className="font-sans text-xs text-muted-foreground mt-0.5 truncate">
                    {exp.concept}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-sans text-sm font-semibold text-foreground">
                    {exp.amount}
                  </span>
                  <span
                    className="font-sans text-[10px] font-semibold rounded-full px-2 py-0.5"
                    style={{
                      backgroundColor: exp.badgeBg,
                      color: exp.badgeColor,
                    }}
                  >
                    {exp.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sticky-cta flex gap-3 mt-4">
          <Button
            variant="ghost"
            size="base"
            className="flex-1"
            iconLeft={<FileText size={16} strokeWidth={1.5} />}
            onClick={() => console.log('Exportar CSV')}
          >
            Exportar CSV
          </Button>
          <Button
            variant="primary"
            size="base"
            className="flex-1"
            iconLeft={<FileDown size={16} strokeWidth={1.5} />}
            onClick={() => console.log('Exportar PDF')}
          >
            Exportar PDF
          </Button>
        </div>
      </main>

      <BottomNav role="finance" />
    </div>
  )
}
