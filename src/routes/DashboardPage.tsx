import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import {
  FaArrowUp,
  FaBell,
  FaChartLine,
  FaCloudDownloadAlt,
  FaCog,
  FaDownload,
  FaExclamationTriangle,
  FaEye,
  FaEyeSlash,
  FaFileInvoice,
  FaHome,
  FaListUl,
  FaMinus,
  FaPlus,
  FaSearch,
  FaSignOutAlt,
  FaUserShield
} from "react-icons/fa"
import { useAuth } from '../components/Auth/useAuth'
import { ProtectedRoute } from '@/components/Auth/ProtectedRoute'

// Mock user data
const MOCK_USER = {
  email: 'adminclient',
  name: 'Client Administrateur',
  account: '00012345',
  balance: 9300000,
  totalValue: 124500000,
  ytdPerformance: 8.6,
  riskProfile: 'Modéré'
}

// Mock portfolio data
const MOCK_POSITIONS = [
  { id: 1, symbol: 'SONATEL', name: 'Sonatel', quantity: 120, avgPrice: 20100, currentPrice: 21500, value: 2430000, performance: 6.4, allocation: 34 },
  { id: 2, symbol: 'BICIS', name: 'BICIS', quantity: 210, avgPrice: 7450, currentPrice: 7600, value: 1564500, performance: 2.1, allocation: 21 },
  { id: 3, symbol: 'PALMCI', name: 'Palm Côte d\'Ivoire', quantity: 300, avgPrice: 6000, currentPrice: 5925, value: 1800000, performance: -1.2, allocation: 18 },
  { id: 4, symbol: 'OAT2028', name: 'OAT SN 2028 6.2%', quantity: 40, avgPrice: 100000, currentPrice: 100800, value: 4160000, performance: 0.8, allocation: 27 }
]

// Mock transactions
const MOCK_TRANSACTIONS = [
  { id: 1, date: '2024-01-12', type: 'Achat', instrument: 'SONATEL', quantity: 120, price: 20500, amount: 2460000, status: 'Exécutée', fee: 1230 },
  { id: 2, date: '2024-01-10', type: 'Vente', instrument: 'PALMCI', quantity: 300, price: 6250, amount: 1875000, status: 'Partielle', fee: 937 },
  { id: 3, date: '2024-01-05', type: 'Coupon', instrument: 'OAT SN 6.2%', quantity: null, price: null, amount: 249600, status: 'Réglée', fee: 0 },
  { id: 4, date: '2023-12-28', type: 'Achat', instrument: 'BICIS', quantity: 210, price: 7450, amount: 1564500, status: 'Exécutée', fee: 782 },
  { id: 5, date: '2023-12-15', type: 'Vente', instrument: 'ORANGE CI', quantity: 150, price: 12800, amount: 1920000, status: 'Exécutée', fee: 960 }
]

// Mock alerts
const MOCK_ALERTS = [
  { id: 1, type: 'warning', message: 'Position PALMCI en baisse de 1.2%', timestamp: '2024-01-12T10:30:00Z' },
  { id: 2, type: 'info', message: 'Coupon OAT SN 6.2% versé', timestamp: '2024-01-05T09:00:00Z' },
  { id: 3, type: 'success', message: 'Ordre SONATEL exécuté', timestamp: '2024-01-12T14:15:00Z' }
]

// Sparkline component for mini charts
const Sparkline: React.FC<{ points: Array<number>; stroke?: string; fill?: string; className?: string }> = ({
  points,
  stroke = "#B68D40",
  fill = "rgba(182,141,64,0.15)",
  className = ""
}) => {
  const width = 120;
  const height = 36;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = Math.max(1, max - min);
  const stepX = width / (points.length - 1);
  const normalized = points.map((p, i) => {
    const x = i * stepX;
    const y = height - ((p - min) / range) * height;
    return `${x},${y}`;
  });
  const polygon = `0,${height} ${normalized.join(" ")} ${width},${height}`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={`block ${className}`}>
      <polyline points={normalized.join(" ")} fill="none" stroke={stroke} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <polygon points={polygon} fill={fill} />
    </svg>
  );
};

const DashboardPageContent = () => {
  const navigate = useNavigate()
  const { user: authUser, signOut: authSignOut, isLoading: authLoading } = useAuth()
  const [user] = useState(MOCK_USER)
  const [positions] = useState(MOCK_POSITIONS)
  const [transactions, _setTransactions] = useState(MOCK_TRANSACTIONS)
  const [alerts] = useState(MOCK_ALERTS)
  const [activeView, setActiveView] = useState('dashboard')
  const [searchTerm, setSearchTerm] = useState('')
  const [transactionFilter, setTransactionFilter] = useState('all')
  const [showBalance, setShowBalance] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date())
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  // Authentication is now handled by ProtectedRoute component

  const handleLogout = async () => {
    try {
      await authSignOut()
    } catch (error) {
      console.warn('Signout error (non-critical):', error)
      // Continue with logout even if there's an error
    } finally {
      // Always navigate to auth page, regardless of signout success/failure
      navigate({ to: '/auth' })
    }
  }

  const filteredTransactions = transactions.filter(t => {
    if (transactionFilter === 'all') return true
    return t.type.toLowerCase() === transactionFilter.toLowerCase()
  }).filter(t =>
    t.instrument.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPortfolioValue = positions.reduce((sum, pos) => sum + pos.value, 0) + user.balance
  const totalCash = user.balance

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA'
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fr-FR').format(num)
  }

  const navigationItems = [
    { icon: <FaHome />, label: "Tableau de bord", id: 'dashboard', active: activeView === 'dashboard' },
    { icon: <FaChartLine />, label: "Positions", id: 'positions', active: activeView === 'positions' },
    { icon: <FaListUl />, label: "Transactions", id: 'transactions', active: activeView === 'transactions' },
    { icon: <FaFileInvoice />, label: "Relevés", id: 'reports', active: activeView === 'reports' },
    { icon: <FaCloudDownloadAlt />, label: "Téléchargements", id: 'downloads', active: activeView === 'downloads' },
    { icon: <FaBell />, label: "Alertes", id: 'alerts', active: activeView === 'alerts' },
    { icon: <FaCog />, label: "Préférences", id: 'settings', active: activeView === 'settings' },
  ]

  const renderDashboard = () => (
    <>
      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          {
            label: "Valeur totale",
            value: formatCurrency(totalPortfolioValue),
            delta: "+1,2%",
            trend: [92, 95, 93, 98, 105, 110, 124],
            icon: <FaChartLine />
          },
          {
            label: "Perf. YTD",
            value: `+${user.ytdPerformance}%`,
            delta: "+0,3%",
            trend: [2, 3, 2, 4, 5, 7, 8.6],
            icon: <FaArrowUp />
          },
          {
            label: "Liquidités",
            value: showBalance ? formatCurrency(totalCash) : '••••••••',
            delta: "=",
            trend: [7, 7.5, 8, 8.6, 9, 9.3, 9.3],
            icon: <FaUserShield />
          },
          {
            label: "Risque",
            value: user.riskProfile,
            delta: "Stable",
            trend: [60, 58, 59, 57, 58, 58, 58],
            icon: <FaExclamationTriangle />
          },
        ].map((k, i) => (
          <div key={i} className="rounded-lg p-4 bg-[var(--white-smoke)] border border-[var(--night)]/10 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="text-secondary text-xs">{k.label}</div>
              <div className="text-[var(--gold-metallic)]">{k.icon}</div>
            </div>
            <div className="flex items-end justify-between mt-1">
              <div className="font-display text-lg">{k.value}</div>
              <div className="text-[10px] px-1.5 py-0.5 rounded bg-white/80 border border-[var(--night)]/10 text-secondary">{k.delta}</div>
            </div>
            <div className="mt-2 opacity-80">
              <Sparkline points={k.trend} />
            </div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Positions table */}
        <div className="xl:col-span-2 rounded-xl p-4 border border-[var(--night)]/10 bg-white/70">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-display">Positions</div>
            <div className="flex items-center gap-2">
              <button className="btn-secondary text-xs px-3 py-1">
                <FaPlus className="inline mr-1" />
                Acheter
              </button>
              <div className="text-xs text-secondary">Mise à jour: {lastUpdate.toLocaleTimeString('fr-FR')}</div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-secondary">
                  <th className="py-2">Titre</th>
                  <th className="py-2">Qté</th>
                  <th className="py-2">Prix moy.</th>
                  <th className="py-2">Cours</th>
                  <th className="py-2">Valeur</th>
                  <th className="py-2">Perf.</th>
                  <th className="py-2">Alloc.</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="align-top">
                {positions.map((pos) => (
                  <tr key={pos.id} className="border-t border-[var(--night)]/10 hover:bg-[var(--white-smoke)]/50">
                    <td className="py-3 font-medium">{pos.symbol}</td>
                    <td className="py-3">{formatNumber(pos.quantity)}</td>
                    <td className="py-3">{formatCurrency(pos.avgPrice)}</td>
                    <td className="py-3">{formatCurrency(pos.currentPrice)}</td>
                    <td className="py-3 font-medium">{formatCurrency(pos.value)}</td>
                    <td className={`py-3 ${pos.performance < 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                      {pos.performance > 0 ? '+' : ''}{pos.performance}%
                    </td>
                    <td className="py-3">
                      <div className="w-20 h-1.5 rounded bg-[var(--white-smoke)]">
                        <div className="h-1.5 rounded" style={{ width: `${pos.allocation}%`, background: 'var(--gold-metallic)' }} />
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex gap-1">
                        <button className="p-1 text-[var(--gold-metallic)] hover:bg-[var(--gold-metallic)]/10 rounded">
                          <FaPlus className="text-xs" />
                        </button>
                        <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                          <FaMinus className="text-xs" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Allocation donut + alerts */}
        <div className="space-y-4">
          <div className="rounded-xl p-4 border border-[var(--night)]/10 bg-white/70">
            <div className="text-sm font-display mb-3">Répartition</div>
            <div className="flex items-center gap-4">
              <div className="relative w-28 h-28 shrink-0 rounded-full"
                   style={{
                     background: 'conic-gradient(var(--gold-metallic) 0 58%, rgba(182,141,64,0.25) 58% 92%, rgba(182,141,64,0.12) 92% 100%)',
                     mask: 'radial-gradient(circle 20px at center, transparent 20px, black 21px)'
                   }}
              />
              <div className="text-sm flex-1">
                <div className="flex items-center gap-2 mb-1"><span className="inline-block w-3 h-3 rounded bg-[var(--gold-metallic)]" /> Actions: 58%</div>
                <div className="flex items-center gap-2 mb-1"><span className="inline-block w-3 h-3 rounded bg-[var(--gold-metallic)]/40" /> Obligations: 34%</div>
                <div className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded bg-[var(--gold-metallic)]/20" /> Monétaire: 8%</div>
              </div>
            </div>
            <div className="mt-4 text-xs text-secondary">Profil de risque: {user.riskProfile} • Devise: FCFA</div>
          </div>

          {/* Recent alerts */}
          <div className="rounded-xl p-4 border border-[var(--night)]/10 bg-white/70">
            <div className="text-sm font-display mb-3">Alertes récentes</div>
            <div className="space-y-2">
              {alerts.slice(0, 3).map((alert) => (
                <div key={alert.id} className={`flex items-start gap-2 p-2 rounded text-xs ${
                  alert.type === 'warning' ? 'bg-amber-50 text-amber-800' :
                  alert.type === 'success' ? 'bg-emerald-50 text-emerald-800' :
                  'bg-blue-50 text-blue-800'
                }`}>
                  <FaBell className="mt-0.5 flex-shrink-0" />
                  <div>
                    <div>{alert.message}</div>
                    <div className="text-[10px] opacity-70 mt-1">
                      {new Date(alert.timestamp).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )

  const renderTransactions = () => (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" />
            <input
              type="text"
              placeholder="Rechercher un instrument..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-[var(--night)]/10 rounded-lg bg-white/70 text-sm focus:ring-2 focus:ring-[var(--gold-metallic)]/30 outline-none"
            />
          </div>
          <select
            value={transactionFilter}
            onChange={(e) => setTransactionFilter(e.target.value)}
            className="px-3 py-2 border border-[var(--night)]/10 rounded-lg bg-white/70 text-sm focus:ring-2 focus:ring-[var(--gold-metallic)]/30 outline-none"
          >
            <option value="all">Tous les types</option>
            <option value="achat">Achats</option>
            <option value="vente">Ventes</option>
            <option value="coupon">Coupons</option>
          </select>
        </div>
        <button className="btn-secondary text-sm px-4 py-2">
          <FaDownload className="inline mr-2" />
          Exporter
        </button>
      </div>

      {/* Transactions table */}
      <div className="rounded-xl p-4 border border-[var(--night)]/10 bg-white/70">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-secondary">
                <th className="py-2">Date</th>
                <th className="py-2">Type</th>
                <th className="py-2">Instrument</th>
                <th className="py-2">Qté</th>
                <th className="py-2">Prix</th>
                <th className="py-2">Montant</th>
                <th className="py-2">Frais</th>
                <th className="py-2">Statut</th>
              </tr>
            </thead>
            <tbody className="align-top">
              {filteredTransactions.map((t) => (
                <tr key={t.id} className="border-t border-[var(--night)]/10 hover:bg-[var(--white-smoke)]/50">
                  <td className="py-3">{new Date(t.date).toLocaleDateString('fr-FR')}</td>
                  <td className="py-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                      t.type === 'Achat' ? 'bg-emerald-100 text-emerald-800' :
                      t.type === 'Vente' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {t.type}
                    </span>
                  </td>
                  <td className="py-3 font-medium">{t.instrument}</td>
                  <td className="py-3">{t.quantity ? formatNumber(t.quantity) : '-'}</td>
                  <td className="py-3">{t.price ? formatCurrency(t.price) : '-'}</td>
                  <td className="py-3 font-medium">{formatCurrency(t.amount)}</td>
                  <td className="py-3">{formatCurrency(t.fee)}</td>
                  <td className="py-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full border text-[10px] ${
                      t.status === 'Exécutée' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      t.status === 'Partielle' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      'bg-[var(--white-smoke)] text-secondary border-[var(--night)]/10'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--pure-white)] to-[var(--white-smoke)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--gold-metallic)] mx-auto"></div>
          <p className="mt-4 text-secondary">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--pure-white)] to-[var(--white-smoke)]">
      {/* App chrome */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--night)]/10 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <img src="/logo-everest.png" alt="Everest" className="h-6" />
          <div className="text-sm font-display">Portail Client</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--white-smoke)]/60 border border-[var(--night)]/10">
            <FaSearch className="text-secondary" />
            <input aria-label="Rechercher" placeholder="Rechercher…" className="bg-transparent text-sm outline-none placeholder:text-secondary/70" />
          </div>
          <div className="text-xs text-secondary">Bienvenue, {authUser?.name || user.name}</div>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="p-2 hover:bg-[var(--night)]/5 rounded-lg"
          >
            {showBalance ? <FaEyeSlash /> : <FaEye />}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-sm text-secondary hover:text-[var(--night)] hover:bg-[var(--night)]/5 rounded-lg transition-colors"
          >
            <FaSignOutAlt />
            Déconnexion
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 min-h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <aside className="col-span-12 lg:col-span-2 xl:col-span-2 border-r border-[var(--night)]/10 bg-white/50 p-4">
          <nav className="space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                  item.active
                    ? 'bg-[var(--night)] text-[var(--pure-white)]'
                    : 'hover:bg-[var(--white-smoke)] text-secondary'
                }`}
              >
                <span className="opacity-80">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-8 p-4 rounded-lg bg-[var(--gold-metallic)]/10 border border-[var(--gold-metallic)]/20">
            <div className="text-xs text-secondary mb-1">Solde espèces</div>
            <div className="font-display text-lg">
              {showBalance ? formatCurrency(user.balance) : '••••••••'}
            </div>
            <div className="text-xs text-secondary mt-1">Compte: {user.account}</div>
          </div>
        </aside>

        {/* Content */}
        <div className="col-span-12 lg:col-span-10 p-6">
          {/* Header row */}
          <div className="flex items-center justify-between mb-6">
            <div className="font-display text-xl">
              {navigationItems.find(item => item.id === activeView)?.label || 'Tableau de bord'}
            </div>
            <div className="flex items-center gap-3 text-xs text-secondary">
              <div>Dernière mise à jour: {lastUpdate.toLocaleTimeString('fr-FR')}</div>
              <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[var(--white-smoke)] border border-[var(--night)]/10">
                <FaBell className="opacity-70" />
                <span>{alerts.length}</span>
              </div>
            </div>
          </div>

          {/* Content based on active view */}
          {activeView === 'dashboard' && renderDashboard()}
          {activeView === 'transactions' && renderTransactions()}
          {activeView === 'positions' && renderDashboard()} {/* For now, show same as dashboard */}
          {activeView === 'reports' && (
            <div className="text-center py-12">
              <FaFileInvoice className="text-4xl text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-display mb-2">Relevés et rapports</h3>
              <p className="text-secondary mb-6">Téléchargez vos relevés mensuels et rapports de performance.</p>
              <button className="btn-primary">
                <FaDownload className="inline mr-2" />
                Télécharger le relevé
              </button>
            </div>
          )}
          {activeView === 'downloads' && (
            <div className="text-center py-12">
              <FaCloudDownloadAlt className="text-4xl text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-display mb-2">Centre de téléchargement</h3>
              <p className="text-secondary mb-6">Accédez à tous vos documents et fichiers.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <button className="btn-secondary p-4 text-left">
                  <FaFileInvoice className="inline mr-2" />
                  Relevés bancaires
                </button>
                <button className="btn-secondary p-4 text-left">
                  <FaChartLine className="inline mr-2" />
                  Rapports de performance
                </button>
              </div>
            </div>
          )}
          {activeView === 'alerts' && (
            <div className="space-y-4">
              <h3 className="text-lg font-display mb-4">Centre de notifications</h3>
              {alerts.map((alert) => (
                <div key={alert.id} className={`p-4 rounded-lg border ${
                  alert.type === 'warning' ? 'bg-amber-50 border-amber-200' :
                  alert.type === 'success' ? 'bg-emerald-50 border-emerald-200' :
                  'bg-blue-50 border-blue-200'
                }`}>
                  <div className="flex items-start gap-3">
                    <FaBell className="mt-1" />
                    <div className="flex-1">
                      <div className="font-medium">{alert.message}</div>
                      <div className="text-sm text-secondary mt-1">
                        {new Date(alert.timestamp).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeView === 'settings' && (
            <div className="max-w-2xl">
              <h3 className="text-lg font-display mb-6">Préférences</h3>
              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-white/70 border border-[var(--night)]/10">
                  <h4 className="font-display mb-3">Notifications</h4>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="accent-[var(--gold-metallic)]" />
                      <span className="text-sm">Alertes de performance</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="accent-[var(--gold-metallic)]" />
                      <span className="text-sm">Notifications de transactions</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" className="accent-[var(--gold-metallic)]" />
                      <span className="text-sm">Rapports mensuels par email</span>
                    </label>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-white/70 border border-[var(--night)]/10">
                  <h4 className="font-display mb-3">Sécurité</h4>
                  <div className="space-y-3">
                    <button className="btn-secondary text-sm">
                      <FaUserShield className="inline mr-2" />
                      Changer le mot de passe
                    </button>
                    <button className="btn-secondary text-sm">
                      Activer l'authentification à deux facteurs
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export const DashboardPage = () => {
  return (
    <ProtectedRoute requiredRole="client"> 
      <DashboardPageContent />
    </ProtectedRoute>
  )
}
