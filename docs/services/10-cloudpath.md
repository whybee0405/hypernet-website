# 10. CloudPath: intelligent SD-WAN

Source: `10. CloudPath.pdf` (4 pages).

## In one sentence

A managed SD-WAN service that bonds several internet connections (fibre, LTE/5G, satellite,
Starlink) into one resilient, prioritised link, so the business keeps working when one link fails.

## The problem it answers

"Are you buying connectivity or business continuity?" A normal ISP line brings downtime,
performance dips and no way to put important traffic first, which means disrupted workflows,
frustrated customers and lost productivity. The brochure's diagram contrasts the problems
(downtime, performance issues, no application prioritisation, disrupted teams) with the outcomes
(high availability, optimised performance, application prioritisation, productive teams and happy
customers).

## Architecture idea

The SD-WAN layer and the security layer are kept separate. The customer can change firewall vendor
without rebuilding the network. (In the source this is also pitched to MSPs as a white-label
platform. Hypernet uses it as the managed service provider, so the site speaks to the end customer.)

## Core capabilities

- **Security-agnostic**: choose the firewall (pfSense, Fortinet, Cisco named) to suit the business.
- **Application-aware routing**: critical traffic prioritised, sub-second failover.
- **Carrier-independent**: fibre, 4G/5G, satellite or Starlink, whatever reaches the site.
- **Global reach**: 52+ international points of presence for low latency at remote sites.

## Management portal

- **Single pane of glass**: provision, monitor and support every site from one interface.
- **Zero-touch provisioning**: devices configure themselves from their MAC address when plugged in.
- **Full visibility**: Layer 7 deep packet inspection shows live bandwidth use by application and
  flags threats. (The brochure swaps the descriptions of these last two; the corrected version is
  used here.)

## Resilience features

- **Link bonding**: combines several connections into more total bandwidth and redundancy.
- **Instant failover**: if the primary drops, traffic moves to backup and the **static IP stays the
  same** (so VPNs, whitelists and hosted services don't break).
- **Bidirectional QoS**: traffic prioritised both up and down automatically, no manual tuning.

## Security

- **Dynamic threat mitigation**: built-in firewall and SASE (Secure Access Service Edge) detect and
  block threats in real time.
- **Encryption**: AES-128/256 with HMAC authentication for data in transit.
- **SecureConnect**: remote access to manage and troubleshoot devices on both sides of the SD-WAN
  box: upstream (modems) and downstream (printers, cameras). The brochure calls this
  industry-first.

## Positioning versus business internet

Business internet = the lines themselves. CloudPath = the intelligent layer that combines lines and
guarantees continuity. Best for multi-branch businesses, sites with poor single-line options, and
anyone for whom downtime is expensive.

## How it appears on the site

`/services/cloudpath`: "connectivity or continuity" hero, a scroll-driven failover demonstration
(line drops, traffic reroutes, IP stays), capabilities grid, portal and security sections.
