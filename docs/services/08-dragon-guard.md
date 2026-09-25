# 08. Dragon Guard: triple-layer protection

Source: `8. Dragon Guard.pdf` (2 pages).

## In one sentence

A bundled cybersecurity package that protects the three places attacks come from: the
email domain (Sendmarc), the devices and internal network (Sophos), and the internet-facing edge
(Cloudflare).

## The three layers

### Layer 1: Email identity (Sendmarc), "the email authority"

Email is the most common way attacks start.

- **DMARC enforcement**: stops anyone sending mail pretending to be your domain (spoofing and
  phishing in your name).
- **Brand protection and deliverability**: proves to mail servers worldwide that your mail is
  genuine, so it lands in inboxes rather than spam.
- **Visibility**: a clear view of every service sending mail from your domain.

### Layer 2: Endpoints and network (Sophos), "the managed shield"

Once an attacker is inside, things move fast.

- **Intercept X endpoint protection**: deep-learning detection that stops malware never seen
  before, and ransomware before it runs.
- **Synchronised security**: firewall and endpoints share information; an infected device is
  automatically isolated from the network.
- **Managed Detection and Response (MDR)**: a 24/7 team of specialists hunting for threats.

### Layer 3: Edge (Cloudflare), "the global perimeter"

Shields the website, APIs and remote staff.

- **Zero trust**: replaces VPNs; only verified users on healthy devices reach internal apps.
- **DDoS mitigation**: keeps the business online through large attacks.
- **WAF**: blocks malicious traffic and exploits such as SQL injection and cross-site scripting.

## Positioning

Secure Business is the Cloudflare layer on its own. Dragon Guard is all three layers as one managed
package, for businesses that want email, endpoint and edge covered by one provider.

## How it appears on the site

`/services/dragon-guard`: three-layer scroll sequence (email → endpoint → edge), a
"how an attack is stopped at each layer" explainer, comparison with Secure Business.
