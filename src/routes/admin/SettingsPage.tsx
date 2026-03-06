import React from 'react';
import { FaCloud, FaCog, FaDatabase, FaShieldAlt } from 'react-icons/fa';

const SettingsPage: React.FC = () => {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display-aptos)', color: 'var(--night)' }}>Paramètres</h1>
        <p className="mt-2 text-sm" style={{ color: 'var(--night-60)', fontFamily: 'var(--font-primary)' }}>Configurez les paramètres du CMS</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* General Settings */}
        <div style={{ background: 'var(--pure-white)', border: '1px solid rgba(70,29,76,0.12)' }}>
          <div className="p-6" style={{ borderBottom: '1px solid rgba(70,29,76,0.08)' }}>
            <div className="flex items-center gap-3">
              <FaCog style={{ color: 'var(--mauve)' }} />
              <h2 className="text-xl font-semibold" style={{ fontFamily: 'var(--font-display-aptos)', color: 'var(--night)' }}>Paramètres généraux</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] tracking-[0.08em] uppercase mb-2" style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night-60)' }}>
                  Titre du site
                </label>
                <input
                  type="text"
                  defaultValue="Everest Finance CMS"
                  className="w-full px-3 py-2 text-sm outline-none transition-all duration-300"
                  style={{ border: '1px solid rgba(70,29,76,0.2)', fontFamily: 'var(--font-primary)', color: 'var(--night)' }}
                />
              </div>
              <div>
                <label className="block text-[11px] tracking-[0.08em] uppercase mb-2" style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night-60)' }}>
                  Langue par défaut
                </label>
                <select className="w-full px-3 py-2 text-sm outline-none transition-all duration-300" style={{ border: '1px solid rgba(70,29,76,0.2)', fontFamily: 'var(--font-primary)', color: 'var(--night)' }}>
                  <option value="en">English</option>
                  <option value="fr">French</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Database Settings */}
        <div style={{ background: 'var(--pure-white)', border: '1px solid rgba(70,29,76,0.12)' }}>
          <div className="p-6" style={{ borderBottom: '1px solid rgba(70,29,76,0.08)' }}>
            <div className="flex items-center gap-3">
              <FaDatabase style={{ color: 'var(--mauve)' }} />
              <h2 className="text-xl font-semibold" style={{ fontFamily: 'var(--font-display-aptos)', color: 'var(--night)' }}>Base de données</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="p-4" style={{ background: 'rgba(70,29,76,0.04)', border: '1px solid rgba(70,29,76,0.15)', borderLeft: '3px solid var(--mauve)' }}>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <div className="w-3 h-3 rounded-full" style={{ background: 'var(--mauve)' }}></div>
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ fontFamily: 'var(--font-primary)', color: 'var(--mauve)' }}>Connecté à ConvexDB</p>
                  <p className="text-sm" style={{ fontFamily: 'var(--font-primary)', color: 'var(--night-60)' }}>Base de données temps-réel opérationnelle</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Media Settings */}
        <div style={{ background: 'var(--pure-white)', border: '1px solid rgba(70,29,76,0.12)' }}>
          <div className="p-6" style={{ borderBottom: '1px solid rgba(70,29,76,0.08)' }}>
            <div className="flex items-center gap-3">
              <FaCloud style={{ color: 'var(--jaune-or)' }} />
              <h2 className="text-xl font-semibold" style={{ fontFamily: 'var(--font-display-aptos)', color: 'var(--night)' }}>Stockage médias</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="p-4" style={{ background: 'rgba(202,148,47,0.04)', border: '1px solid rgba(202,148,47,0.2)', borderLeft: '3px solid var(--jaune-or)' }}>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <div className="w-3 h-3 rounded-full" style={{ background: 'var(--jaune-or)' }}></div>
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ fontFamily: 'var(--font-primary)', color: 'var(--jaune-or)' }}>Connecté à Uploadthing</p>
                  <p className="text-sm" style={{ fontFamily: 'var(--font-primary)', color: 'var(--night-60)' }}>Stockage de fichiers et CDN opérationnel</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-[11px] tracking-[0.08em] uppercase mb-3" style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night-60)' }}>Limites de téléchargement</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs mb-1" style={{ color: 'var(--night-60)', fontFamily: 'var(--font-primary)' }}>Images</label>
                  <div className="text-sm font-medium">4 MB max</div>
                </div>
                <div>
                  <label className="block text-xs mb-1" style={{ color: 'var(--night-60)', fontFamily: 'var(--font-primary)' }}>Vidéos</label>
                  <div className="text-sm font-medium">16 MB max</div>
                </div>
                <div>
                  <label className="block text-xs mb-1" style={{ color: 'var(--night-60)', fontFamily: 'var(--font-primary)' }}>Documents</label>
                  <div className="text-sm font-medium">8 MB max</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div style={{ background: 'var(--pure-white)', border: '1px solid rgba(70,29,76,0.12)' }}>
          <div className="p-6" style={{ borderBottom: '1px solid rgba(70,29,76,0.08)' }}>
            <div className="flex items-center gap-3">
              <FaShieldAlt style={{ color: 'var(--mauve)' }} />
              <h2 className="text-xl font-semibold" style={{ fontFamily: 'var(--font-display-aptos)', color: 'var(--night)' }}>Sécurité</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ fontFamily: 'var(--font-primary)', color: 'var(--night)' }}>Authentification à deux facteurs</p>
                  <p className="text-sm" style={{ fontFamily: 'var(--font-primary)', color: 'var(--night-60)' }}>Ajoutez une couche de sécurité supplémentaire</p>
                </div>
                <button className="px-4 py-2 text-[11px] tracking-[0.15em] uppercase transition-all duration-300" style={{ background: 'var(--mauve)', color: 'var(--pure-white)', fontFamily: 'var(--font-primary)', fontWeight: 500 }}>
                  Activer 2FA
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ fontFamily: 'var(--font-primary)', color: 'var(--night)' }}>Gestion des sessions</p>
                  <p className="text-sm" style={{ fontFamily: 'var(--font-primary)', color: 'var(--night-60)' }}>Gérez les sessions actives et l'historique</p>
                </div>
                <button className="px-4 py-2 text-[11px] tracking-[0.15em] uppercase transition-all duration-300" style={{ border: '1px solid rgba(70,29,76,0.25)', color: 'var(--night-60)', fontFamily: 'var(--font-primary)', fontWeight: 500 }}>
                  Voir les sessions
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="px-6 py-2 text-[11px] tracking-[0.2em] uppercase transition-all duration-300" style={{ background: 'var(--mauve)', color: 'var(--pure-white)', fontFamily: 'var(--font-primary)', fontWeight: 500 }}>
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
