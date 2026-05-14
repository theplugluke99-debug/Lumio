const s = {
  wrapper: { backgroundColor: '#FAF7F2', padding: '0', margin: '0' } as React.CSSProperties,
  table: { maxWidth: '600px', width: '100%', margin: '0 auto', backgroundColor: '#FAF7F2', borderCollapse: 'collapse' as const },
  logoCell: { textAlign: 'center' as const, padding: '32px 32px 4px 32px' },
  wordmark: { fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: 'italic', fontSize: '28px', color: '#1A1814', letterSpacing: '0.06em', marginTop: '2px', lineHeight: '1', display: 'block' },
  taglineCell: { textAlign: 'center' as const, padding: '8px 32px 0 32px' },
  tagline: { fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '13px', color: '#8A8278', fontStyle: 'italic' },
  dividerCell: { padding: '20px 32px 0 32px' },
  divider: { height: '1px', backgroundColor: '#DDD5C5', fontSize: '0', lineHeight: '0' },
  contactCell: { textAlign: 'center' as const, padding: '20px 32px 0 32px' },
  name: { fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px', fontWeight: 'bold', color: '#1A1814', marginBottom: '8px' },
  contactLine: { fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '13px', marginBottom: '4px' },
  emailLink: { color: '#C4973F', textDecoration: 'none', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '13px' },
  siteLink: { color: '#8A8278', textDecoration: 'none', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '13px' },
  ctaCell: { textAlign: 'center' as const, padding: '20px 32px 24px 32px' },
  ctaButton: { display: 'inline-block', backgroundColor: '#C4973F', color: '#FFFFFF', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '13px', fontWeight: 'bold', textDecoration: 'none', padding: '12px 24px', borderRadius: '24px', letterSpacing: '0.03em' } as React.CSSProperties,
  legalCell: { textAlign: 'center' as const, padding: '16px 32px 8px 32px' },
  legal: { fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '11px', color: '#AAA099', lineHeight: '1.7' },
  legalLink: { color: '#AAA099', textDecoration: 'none', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '11px' },
  linksCell: { textAlign: 'center' as const, padding: '8px 32px 28px 32px' },
  linksSep: { color: '#AAA099', padding: '0 6px' },
  underlineLink: { color: '#AAA099', textDecoration: 'underline', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '11px' },
};

export default function EmailFooter() {
  return (
    <div style={s.wrapper}>
      <table style={s.table} cellPadding={0} cellSpacing={0}>

        {/* Logo */}
        <tbody>
          <tr>
            <td style={s.logoCell}>
              <svg width="60" height="9" viewBox="0 0 80 12" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', margin: '0 auto' }}>
                <path d="M 8 10 Q 40 2 72 10" stroke="#C4973F" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
              <span style={s.wordmark}>Lumio</span>
            </td>
          </tr>

          {/* Tagline */}
          <tr>
            <td style={s.taglineCell}>
              <span style={s.tagline}>Work flows differently in the right light.</span>
            </td>
          </tr>

          {/* Divider */}
          <tr>
            <td style={s.dividerCell}>
              <div style={s.divider} />
            </td>
          </tr>

          {/* Contact */}
          <tr>
            <td style={s.contactCell}>
              <div style={s.name}>Luke &nbsp;|&nbsp; Founder, Lumio</div>
              <div style={s.contactLine}>
                <a href="mailto:hello@lumio.london" style={s.emailLink}>hello@lumio.london</a>
              </div>
              <div>
                <a href="https://lumio.london" style={s.siteLink}>lumio.london</a>
              </div>
            </td>
          </tr>

          {/* CTA */}
          <tr>
            <td style={s.ctaCell}>
              <a href="https://lumio.london/audit" style={s.ctaButton}>
                Get your free Revenue Reveal →
              </a>
            </td>
          </tr>

          {/* Divider */}
          <tr>
            <td style={{ padding: '0 32px' }}>
              <div style={s.divider} />
            </td>
          </tr>

          {/* Legal text */}
          <tr>
            <td style={s.legalCell}>
              <div style={s.legal}>
                © {new Date().getFullYear()} Favours Technologies Ltd trading as Lumio<br />
                Registered in England &amp; Wales (Co. No. 16265679)<br />
                <a href="https://lumio.london" style={s.legalLink}>lumio.london</a>
                {' · '}
                <a href="mailto:hello@lumio.london" style={s.legalLink}>hello@lumio.london</a>
              </div>
            </td>
          </tr>

          {/* Legal links */}
          <tr>
            <td style={s.linksCell}>
              <a href="https://lumio.london/unsubscribe" style={s.underlineLink}>Unsubscribe</a>
              <span style={s.linksSep}>|</span>
              <a href="https://lumio.london/privacy" style={s.underlineLink}>Privacy Policy</a>
              <span style={s.linksSep}>|</span>
              <a href="https://lumio.london/terms" style={s.underlineLink}>Terms</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
