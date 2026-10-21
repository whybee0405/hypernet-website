# Cookie banner and preferences draft

**Draft wording and behaviour specification — not implemented or published.** The text is suitable only once the analytics controls actually match it. Confirm the technology inventory before choosing the final version.

## C1. First-visit banner

**Your privacy choices**

We use necessary technology to operate and secure this site. With your permission, our custom analytics measures site visits and clicks on buttons and links, helping us improve the site. Analytics data is hosted in South Africa. You can reject analytics and still browse or contact us. Change your choice at any time in Cookie settings.

**[Accept analytics]  [Reject analytics]**

[Privacy policy] → `/legal/privacy`  
[Cookie settings] → opens the preferences panel

If the inventory confirms that analytics uses cookies or browser storage, replace “our custom analytics measures” with “our custom analytics uses cookies or similar browser storage to measure”. If it does not, do not claim that it does: the choice must still control the optional measurement itself.

## C2. Preferences panel

**Cookie and analytics settings**

**Necessary — always active**  
Supports essential site operation, security and remembering your privacy choice. See the privacy policy for exact technology names and expiry periods.

**Analytics — off by default**  
Measures visits and CTA clicks to help improve this website. Analytics data is hosted in South Africa. Turn this on only if you agree to optional analytics described in the privacy policy.

[Analytics: Off / On]

**[Save choices]  [Reject analytics]  [Accept analytics]**

Choosing Reject turns analytics off. Choosing Save applies the toggle selection. Any genuinely optional preference storage, such as a saved display theme, needs its own classification and control if it is not justified as necessary; it must not be silently bundled into “Necessary”.

## C3. Required implementation behaviour

- Accept and Reject must be visible together with comparable prominence and the same number of steps. No preselected analytics toggle.
- Before a decision, reject by default. Closing or ignoring the banner, scrolling or continuing to browse must not enable optional analytics.
- Gate optional page-visit events as well as CTA events, scripts, requests, identifiers and browser storage. A banner alone does not achieve this. Server-side analytics must honour the choice too.
- After Reject, the enquiry form, navigation and content must remain usable. Keep only justified essential processing and the minimum preference record; do not classify general behavioural analytics as security logging.
- On withdrawal, stop future optional collection, stop associated timers/listeners, and remove accessible optional identifiers or storage. Explain how previously collected identifiable data is handled through privacy requests and the retention rules.
- Put a persistent “Cookie settings” control in the footer. Honour the saved choice across navigation and reloads.
- Record only the evidence needed for the choice: decision, time and notice version. Verify whether server-side consent evidence is needed and how to minimise its identifiers.
- Set a documented preference lifetime of [APPROVED_PREFERENCE_LIFETIME]. Revisit consent when the relevant purposes or technology materially change; a normal deployment should not erase a rejection.
- Do not record form contents, email addresses, telephone numbers or sensitive query parameters in CTA events or URLs. Avoid reconstructing a visitor's identity from other data after a rejection.
- Link the banner to a completed cookie/storage inventory in the privacy policy. This banner is not permission for newsletters, advertising, sharing data with unrelated parties or materially different analytics.
- Keep essential operational/security logs limited to their justified purpose and disclosed separately; rejection need not disable genuinely necessary security measures.
