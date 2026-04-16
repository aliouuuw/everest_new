import { useRef, useCallback } from 'react';
import type { ProfileResult } from './types';

interface ProfileReportProps {
  result: ProfileResult;
  firstName: string;
  lastName: string;
  email: string;
  generatedAt: string;
}

export const ProfileReport: React.FC<ProfileReportProps> = ({
  result,
  firstName,
  lastName,
  email,
  generatedAt,
}) => {
  const reportRef = useRef<HTMLDivElement>(null);

  const handlePrint = useCallback(() => {
    const printWindow = window.open('', '_blank');
    if (!printWindow || !reportRef.current) return;

    const reportContent = reportRef.current.innerHTML;
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Votre Profil d'Investisseur - Everest Finance</title>
          <style>
            @page { size: A4; margin: 20mm; }
            * { box-sizing: border-box; }
            body { 
              font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
              line-height: 1.6;
              color: #0a0a0a;
              margin: 0;
              padding: 0;
              background: #ffffff;
            }
            .report-container { max-width: 210mm; margin: 0 auto; padding: 30px; }
            .header { 
              background: linear-gradient(135deg, #461D4C 0%, #2a1435 100%);
              color: white;
              padding: 40px;
              border-radius: 16px;
              margin-bottom: 30px;
              text-align: center;
            }
            .header h1 { margin: 0 0 10px 0; font-size: 28px; font-weight: 700; }
            .header p { margin: 0; opacity: 0.8; font-size: 14px; }
            .profile-card {
              background: ${result.color}08;
              border: 2px solid ${result.color}30;
              border-radius: 16px;
              padding: 30px;
              margin-bottom: 30px;
              text-align: center;
            }
            .profile-badge {
              display: inline-block;
              padding: 6px 16px;
              background: ${result.color}15;
              color: ${result.color};
              border-radius: 20px;
              font-size: 12px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.1em;
              margin-bottom: 16px;
            }
            .profile-title { font-size: 36px; font-weight: 700; color: ${result.color}; margin: 0 0 8px 0; }
            .profile-subtitle { font-size: 16px; color: #666; margin: 0; }
            .section { margin-bottom: 30px; }
            .section-title {
              font-size: 14px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.1em;
              color: #461D4C;
              margin-bottom: 16px;
              padding-bottom: 8px;
              border-bottom: 2px solid #f0eee9;
            }
            .info-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 16px;
            }
            .info-item {
              background: #faf8f4;
              padding: 16px;
              border-radius: 12px;
            }
            .info-label {
              font-size: 11px;
              color: #666;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              margin-bottom: 4px;
            }
            .info-value {
              font-size: 15px;
              font-weight: 600;
              color: #0a0a0a;
            }
            .risk-bar {
              display: flex;
              gap: 8px;
              margin-top: 12px;
            }
            .risk-segment {
              height: 8px;
              flex: 1;
              border-radius: 4px;
              background: #e5e5e5;
            }
            .risk-segment.active {
              background: ${result.color};
            }
            .allocation-bar {
              display: flex;
              height: 32px;
              border-radius: 16px;
              overflow: hidden;
              margin-bottom: 16px;
            }
            .allocation-segment {
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 12px;
              font-weight: 600;
            }
            .allocation-legend {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 8px;
            }
            .legend-item {
              display: flex;
              align-items: center;
              gap: 8px;
              font-size: 13px;
            }
            .legend-dot {
              width: 12px;
              height: 12px;
              border-radius: 50%;
            }
            .traits-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 12px;
            }
            .trait-item {
              display: flex;
              align-items: center;
              gap: 10px;
              padding: 12px;
              background: #faf8f4;
              border-radius: 10px;
              font-size: 13px;
            }
            .trait-check {
              width: 20px;
              height: 20px;
              background: ${result.color};
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 12px;
              font-weight: 700;
              flex-shrink: 0;
            }
            .recommendation {
              background: ${result.color}08;
              border-left: 4px solid ${result.color};
              padding: 20px;
              border-radius: 0 12px 12px 0;
            }
            .recommendation h4 {
              font-size: 12px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.1em;
              color: ${result.color};
              margin: 0 0 8px 0;
            }
            .recommendation p {
              margin: 0;
              font-size: 14px;
              line-height: 1.6;
            }
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #f0eee9;
              text-align: center;
              font-size: 12px;
              color: #666;
            }
            .footer strong { color: #461D4C; }
            .print-button {
              position: fixed;
              bottom: 30px;
              right: 30px;
              padding: 14px 28px;
              background: #461D4C;
              color: white;
              border: none;
              border-radius: 30px;
              font-size: 14px;
              font-weight: 600;
              cursor: pointer;
              box-shadow: 0 4px 20px rgba(70,29,76,0.3);
              transition: all 0.3s ease;
            }
            .print-button:hover {
              background: #2a1435;
              transform: translateY(-2px);
            }
            @media print {
              .print-button { display: none; }
              body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>
          ${reportContent}
          <button class="print-button" onclick="window.print()">Imprimer / Enregistrer PDF</button>
        </body>
      </html>
    `);
    
    printWindow.document.close();
  }, [result]);

  return (
    <div className="space-y-4">
      {/* Hidden report content for printing */}
      <div ref={reportRef} style={{ display: 'none' }}>
        <div className="report-container">
          <div className="header">
            <h1>Profil d'Investisseur Personnalisé</h1>
            <p>Généré le {generatedAt} pour {firstName} {lastName}</p>
          </div>

          <div className="profile-card">
            <div className="profile-badge">Votre profil</div>
            <h2 className="profile-title">{result.title}</h2>
            <p className="profile-subtitle">{result.subtitle}</p>
          </div>

          <div className="section">
            <h3 className="section-title">Informations du profil</h3>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-label">Profil d'investisseur</div>
                <div className="info-value">{result.title}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Niveau de risque</div>
                <div className="info-value">{result.riskLevel} sur 5</div>
                <div className="risk-bar">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`risk-segment ${level <= result.riskLevel ? 'active' : ''}`}
                    />
                  ))}
                </div>
              </div>
              <div className="info-item">
                <div className="info-label">Nom</div>
                <div className="info-value">{firstName} {lastName}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Email</div>
                <div className="info-value">{email}</div>
              </div>
            </div>
          </div>

          <div className="section">
            <h3 className="section-title">Allocation recommandée</h3>
            <div className="allocation-bar">
              {result.allocation.map((item) => (
                <div
                  key={item.label}
                  className="allocation-segment"
                  style={{
                    width: `${item.percentage}%`,
                    background: item.color,
                  }}
                >
                  {item.percentage > 10 && `${item.percentage}%`}
                </div>
              ))}
            </div>
            <div className="allocation-legend">
              {result.allocation.map((item) => (
                <div key={item.label} className="legend-item">
                  <div className="legend-dot" style={{ background: item.color }} />
                  <span>{item.label} : {item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="section">
            <h3 className="section-title">Caractéristiques</h3>
            <div className="traits-grid">
              {result.traits.map((trait, index) => (
                <div key={index} className="trait-item">
                  <div className="trait-check">✓</div>
                  <span>{trait}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="recommendation">
            <h4>Notre recommandation</h4>
            <p>{result.recommendation}</p>
          </div>

          <div className="footer">
            <p><strong>Everest Finance SGI</strong></p>
            <p>Agrément AMF-UMOA · SGI/DA/2016/60</p>
            <p>contact@everest-finance.com · everest-finance.com</p>
            <p style={{ marginTop: '16px', fontSize: '11px', color: '#999' }}>
              Ce document est fourni à titre informatif et ne constitue pas un conseil en investissement personnalisé. 
              Les performances passées ne préjugent pas des performances futures.
            </p>
          </div>
        </div>
      </div>

      {/* Preview card */}
      <div className="bg-[var(--summit-ivory)] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-[12px] tracking-[0.1em] uppercase font-bold text-[var(--night)]" style={{ fontFamily: 'var(--font-primary)' }}>
            Aperçu du rapport
          </h4>
          <span className="text-[11px] text-[var(--night-40)]">PDF personnalisé</span>
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-black/5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: `${result.color}15` }}
            >
              <span style={{ color: result.color, fontSize: '18px' }}>📊</span>
            </div>
            <div>
              <div className="text-[13px] font-bold text-[var(--night)]" style={{ fontFamily: 'var(--font-primary)' }}>
                Profil {result.title}
              </div>
              <div className="text-[11px] text-[var(--night-40)]">
                5 pages · Allocation · Recommandations
              </div>
            </div>
          </div>
          
          <div className="h-2 bg-black/5 rounded-full overflow-hidden flex">
            {result.allocation.map((a) => (
              <div
                key={a.label}
                style={{ width: `${a.percentage}%`, background: a.color }}
              />
            ))}
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="w-full mt-4 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[var(--mauve)] hover:bg-[var(--night)] text-white transition-all duration-300 text-[12px] font-bold tracking-[0.1em] uppercase"
          style={{ fontFamily: 'var(--font-primary)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Télécharger le rapport PDF
        </button>
      </div>
    </div>
  );
};

export default ProfileReport;
