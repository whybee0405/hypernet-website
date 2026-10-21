import Link from './SiteLink'

export function RecoveryLinks() {
  return <nav aria-label="Find your way" className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
    {[['/', 'Homepage'], ['/services', 'Services'], ['/pricing', 'Plans and pricing'], ['/about', 'About Hypernet'], ['/insights', 'Insights'], ['/case-studies', 'Case studies'], ['/contact', 'Contact us']].map(([href, label]) => <Link key={href} href={href} className="btn btn-secondary">{label}</Link>)}
  </nav>
}
