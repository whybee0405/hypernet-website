import { pageMetadata } from '@/lib/seo'
import { PageHero } from '@/components/site/PageHero'
import { Reveal } from '@/components/site/Reveal'
import { getSiteSettings } from '@/lib/payload'

export const metadata = pageMetadata({ path: '/legal/privacy' })

const EFFECTIVE_DATE = '3 November 2026'

/**
 * Every statement here must match what the site actually does. If you change
 * the contact form, analytics (src/collections/AnalyticsEvents.ts,
 * src/components/analytics), browser storage or Nginx logging, update this
 * page and its effective date in the same change.
 */
export default async function PrivacyPage() {
  const settings = await getSiteSettings()
  const address = settings.addressLines?.map((entry) => entry.line).filter(Boolean).join(', ')
  const email = <a href={`mailto:${settings.email}`}>{settings.email}</a>
  const phone = <a href={settings.phoneHref}>{settings.phone}</a>

  return (
    <>
      <PageHero
        title="Privacy"
        accent="policy"
        lead="What personal information we collect, why we hold it, and how to have it changed or removed."
      />
      <section className="dusk">
      <div className="shell py-20 lg:py-28">
        <Reveal delay={0.06}>
          <div className="prose-hypernet mx-auto max-w-[68ch]">
            <p>
              <strong>Effective date:</strong> {EFFECTIVE_DATE}
            </p>
            <p>
              This policy explains how Hypernet (Pty) Ltd handles personal information collected
              through hypernet.co.za and through enquiries made to us, in line with the Protection of
              Personal Information Act 4 of 2013 (POPIA).
            </p>

            <h2>1. Who we are</h2>
            <p>
              Hypernet (Pty) Ltd, registration number 2018/376463/07, operates this website. Our
              address is {address}. In this policy, &ldquo;Hypernet&rdquo;, &ldquo;we&rdquo; and
              &ldquo;us&rdquo; refer to that company.
            </p>
            <p>
              For privacy questions and requests, contact our Information Officer by email at {email},
              by phone on {phone}, or by post to the address above marked &ldquo;Attention:
              Information Officer&rdquo;.
            </p>

            <h2>2. What we collect</h2>
            <p>
              <strong>Enquiries.</strong> When you use the form on this site we collect your name,
              email address, phone number and the service you are interested in, plus your business
              name and message if you choose to give them. We also record which page you sent the
              enquiry from and track its progress internally. If you call, email or WhatsApp us, we
              keep the contact details and information you share in that conversation. Please do not
              send passwords, identity documents, banking or card details in an enquiry.
            </p>
            <p>
              <strong>Customers.</strong> If you become a customer, we also hold the details needed to
              provide and bill your service, such as your installation address, the equipment on site,
              your service configuration and billing details. Your service agreement may give further
              detail.
            </p>
            <p>
              <strong>Website analytics.</strong> We run our own analytics on our own server; no
              third-party analytics or advertising service receives this data. For each page visit we
              record the page address (without any query string), how long the page was visible
              (capped at 30 minutes), the website you came from (the site name only, never the full
              address or search terms), whether an enquiry was sent, and whether a WhatsApp link was
              clicked and where it was placed. A random session ID links the pages you view in one
              browser tab and is discarded when you close that tab. Your IP address and browser
              details are combined with a secret value into a one-way code that changes every day.
              We use it for approximate visitor counts and to block abuse. Your raw IP address is not
              stored with analytics records, and this information is not used to identify you.
            </p>
            <p>
              <strong>Server logs.</strong> Like most websites, our web server records each request:
              the IP address, date and time, the page or file requested (without any query string),
              the response and the browser&rsquo;s user-agent string. We use these logs to run,
              secure and troubleshoot the site.
            </p>

            <h2>3. Why we use it</h2>
            <p>
              We use enquiry information to reply to you, prepare quotes, and keep a record of our
              conversation. We use customer information to provide, support and bill your service. We
              use analytics to understand which pages are useful and to improve the site. We use
              server logs to keep the site working and secure.
            </p>
            <p>
              We process this information because you asked us to take steps towards a service, to
              perform our agreement with you, to meet legal obligations, or for our legitimate
              interests in running and improving a secure website. We do not sell your information,
              build advertising profiles, or use it to make automated decisions about you.
            </p>

            <h2>4. No marketing without your permission</h2>
            <p>
              Sending an enquiry does not subscribe you to a mailing list. We use your details to
              handle that enquiry, including reasonable follow-up about it. We will not send you
              marketing unless you have agreed to receive it, and any marketing we send will include
              a way to opt out.
            </p>

            <h2>5. Your choices</h2>
            <p>
              The form asks for your name, email address, phone number and service interest so that
              we can respond properly. Without them we may not be able to help. You can also contact
              us directly by phone or email.
            </p>
            <p>
              If your browser sends a Global Privacy Control or Do Not Track signal, our analytics does
              not run and records nothing about your visit. You can also block or clear site storage
              in your browser settings.
            </p>

            <h2>6. Who receives your information</h2>
            <p>
              Only Hypernet staff who need it to handle your enquiry or service can see it. We share
              information with:
            </p>
            <ul>
              <li>
                service providers who host, maintain, secure and back up our website and systems,
                and who provide our email;
              </li>
              <li>
                network and voice providers, only to the extent needed to check availability, install,
                provision and support your service;
              </li>
              <li>professional advisers, where needed; and</li>
              <li>authorities, where the law requires it.</li>
            </ul>
            <p>
              Anyone who processes information on our behalf may use it only for that purpose and must
              keep it confidential and secure.
            </p>

            <h2>7. Where it is stored</h2>
            <p>
              This website, including enquiries and analytics, is hosted on a server in South Africa.
              Some of our service providers, such as email providers, may store or access information
              outside South Africa. Where that happens, we only transfer information as permitted by
              section 72 of POPIA, for example to a country or provider with adequate protection or
              under a binding agreement.
            </p>

            <h2>8. How long we keep it</h2>
            <ul>
              <li>Enquiries that do not lead to a service: up to two years after our last contact.</li>
              <li>
                Customer records: for as long as your service runs, then for the period tax,
                company and telecommunications laws require.
              </li>
              <li>Analytics events: 14 months.</li>
              <li>Web server logs: 14 days.</li>
              <li>Backups: overwritten on a regular rotation.</li>
            </ul>
            <p>
              When the period ends, we delete the information or make sure it can no longer identify
              you.
            </p>

            <h2>9. Your rights</h2>
            <p>
              You may ask whether we hold information about you and request a copy, ask us to correct
              or delete it, object to how we use it, or withdraw any consent you gave. Some rights
              have legal limits. For example, we may need to keep certain records by law. We may ask
              you to confirm your identity before we act on a request. Send requests to the
              Information Officer at {email} or {phone}. Requests for records may also be made
              under the Promotion of Access to Information Act; our PAIA manual is available on
              request.
            </p>

            <h2>10. Cookies and browser storage</h2>
            <p>We do not set cookies for website visitors. We use the following browser storage:</p>
            <ul>
              <li>
                <strong>hypernet-analytics-session</strong> (session storage): the random analytics
                session ID described above. Deleted when you close the tab.
              </li>
              <li>
                <strong>hypernet-enquiry-conversion</strong> (session storage): stops a page reload
                being counted as a second enquiry. Deleted when you close the tab.
              </li>
              <li>
                <strong>hypernet-theme</strong> (local storage): remembers whether you chose light or
                dark mode. It stays until you clear it.
              </li>
            </ul>
            <p>
              Authorised Hypernet staff who sign in to the site&rsquo;s admin area receive a secure
              sign-in cookie. Links to other services, such as WhatsApp, are governed by those
              services&rsquo; own privacy policies.
            </p>

            <h2>11. Security</h2>
            <p>
              We use reasonable technical and organisational safeguards, including encrypted
              connections, restricted staff access and regular backups. No system can be guaranteed
              completely secure. If a security compromise affects your personal information, we will
              notify you and the Information Regulator as POPIA requires. To report a suspected issue,
              contact us at {email}.
            </p>

            <h2>12. Children</h2>
            <p>
              This website is for business enquiries. We do not knowingly collect information from
              children. If you believe a child has sent us information, contact us and we will
              remove it.
            </p>

            <h2>13. Complaints</h2>
            <p>
              Please raise any concern with our Information Officer first, so that we can try to
              resolve it. You also have the right to complain to South Africa&rsquo;s Information
              Regulator at any time: email{' '}
              <a href="mailto:POPIAComplaints@inforegulator.org.za">POPIAComplaints@inforegulator.org.za</a>{' '}
              or visit{' '}
              <a href="https://inforegulator.org.za/contact-us/" target="_blank" rel="noopener noreferrer">
                inforegulator.org.za
              </a>
              .
            </p>

            <h2>14. Changes to this policy</h2>
            <p>
              We will publish any changes on this page and update the effective date above. If a
              change affects how we use information you have already given us, we will tell you
              where the law requires it.
            </p>
          </div>
        </Reveal>
      </div>
      </section>
    </>
  )
}
