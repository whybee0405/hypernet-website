import type { ServiceModule as Kind } from '@/content/services'
import { ProcessModule } from './ProcessModule'
import { FailoverModule } from './FailoverModule'
import { PortingModule } from './PortingModule'
import { CompareModule } from './CompareModule'
import { ChannelsModule } from './ChannelsModule'
import { ZeroTrustModule } from './ZeroTrustModule'
import { LayersModule } from './LayersModule'
import { RecipesModule } from './RecipesModule'

/** The bespoke middle section of each service page. */
export function ServiceModule({ kind }: { kind: Kind }) {
  switch (kind) {
    case 'process':
      return <ProcessModule />
    case 'failover':
      return <FailoverModule />
    case 'porting':
      return <PortingModule />
    case 'compare':
      return <CompareModule />
    case 'channels':
      return <ChannelsModule />
    case 'zero-trust':
      return <ZeroTrustModule />
    case 'layers':
      return <LayersModule />
    case 'recipes':
      return <RecipesModule />
    default:
      return null
  }
}
