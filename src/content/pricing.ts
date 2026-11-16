/**
 * Published package prices, supplied by Hypernet (November 2026).
 *
 * Hypernet is not VAT registered, so these are the full monthly amounts and no
 * VAT is added. Change prices here only with the client's written confirmation.
 */

export type MobileDataTier = {
  name: string
  /** Fair-use allowance in GB before speed drops to THROTTLED_SPEED. */
  fairUseGb: number
  /** Monthly price for a SIM only, used in the customer's own router. */
  simOnly: number
  /** Monthly price including a router, on MTN, Vodacom or Telkom. */
  withRouter: number
}

export const MOBILE_DATA = {
  heading: '5G and LTE data',
  intro:
    'Uncapped 5G and LTE data for your business. Use our SIM in your own router, or take a package that includes a router on the MTN, Vodacom or Telkom network.',
  throttledSpeed: '2Mbps',
  networks: 'MTN, Vodacom or Telkom',
  tiers: [
    { name: 'Starter', fairUseGb: 150, simOnly: 499, withRouter: 599 },
    { name: 'Starter Plus', fairUseGb: 300, simOnly: 599, withRouter: 699 },
    { name: 'Advanced', fairUseGb: 450, simOnly: 799, withRouter: 899 },
    { name: 'Max', fairUseGb: 600, simOnly: 899, withRouter: 999 },
    { name: 'Max Plus', fairUseGb: 1000, simOnly: 1199, withRouter: 1299 },
  ] satisfies MobileDataTier[],
  notes: [
    'All packages are uncapped. After the fair-use allowance, speed changes to 2Mbps.',
    'Speed depends on your 5G router and on available capacity at the 5G or LTE tower your device connects to.',
    'Minimum contract term of 12 months, depending on the network provider.',
    'Prices are monthly. Hypernet is not VAT registered, so no VAT is added.',
  ],
}

export type HostedUcTier = {
  name: string
  extensions: number
  monthly: number
}

export const HOSTED_UC = {
  intro:
    'Hosted phone extensions for your team. Every extension works on the mobile app, the PC app and a desk phone.',
  tiers: [
    { name: 'SME Starter', extensions: 1, monthly: 75 },
    { name: 'SME Starter Plus', extensions: 2, monthly: 100 },
    { name: 'SME Advanced', extensions: 4, monthly: 150 },
    { name: 'SME Advanced Plus', extensions: 6, monthly: 200 },
    { name: 'SME Max', extensions: 8, monthly: 300 },
    { name: 'SME Max Plus', extensions: 10, monthly: 400 },
  ] satisfies HostedUcTier[],
  included: [
    { title: 'Auto attendant', detail: 'A virtual reception that answers and routes your calls.' },
    { title: 'Call recording', detail: 'Recordings are kept for 30 days.' },
    { title: 'Extension-to-extension calls', detail: 'Free calls between your extensions.' },
    { title: 'Inter-branch calls', detail: 'Free calls between your branches.' },
    { title: 'A geographic number', detail: 'One local number included free.' },
  ],
  notes: [
    'Month to month, with one calendar month\u2019s notice.',
    'Need a number of extensions in between packages? Each extra extension is R50 a month. More than 10 extensions are priced to your requirements.',
    'Call rates: show us a written call rate from another provider and we will beat it.',
    'Keep your existing numbers: porting costs R250 once-off per number. Additional geographic numbers cost R250 once-off each.',
    'Desk phones are sold separately. Ask us for current prices.',
    'Video and team meetings are available on the same platform at an additional cost.',
    'Prices are monthly. Hypernet is not VAT registered, so no VAT is added.',
  ],
}

export const formatRand = (amount: number) => `R${amount.toLocaleString('en-ZA')}`
