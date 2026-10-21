# VPS deployment

Public origin: https://hypernet.co.za
Admin: https://hypernet.co.za/admin
Repository: /var/www/html

The admin email is hello@hypernet.co.za. The randomly generated initial password
and signing secrets are in `.env` (mode 0600). Keep this file private and preserve
the signing secrets across updates. The public origin uses HTTPS with a Let’s Encrypt certificate.

## Resource budget

The host has a persistent 4 GiB swap file. All Docker containers, Docker and
containerd share `docker-workload.slice`, capped at 75% of one CPU, 1300 MiB RAM
and 3 GiB swap. MemoryHigh is 1100 MiB. The BuildKit worker has one concurrent
build step, 1100 MiB RAM, 3500 MiB combined RAM/swap and 65% CPU. Runtime web
limits: 768 MiB RAM, 1536 MiB combined RAM/swap and 60% CPU. Seed limits: 900 MiB
RAM, 2500 MiB combined RAM/swap and 60% CPU. Aggregate limits apply even if
multiple containers run together. These budgets reserve capacity for the host;
they do not guarantee responsiveness under every possible workload.

Container logs rotate at 10 MiB with three files. Database and uploads persist
in `hypernet_db-data` and `hypernet_media-data`. Never run `docker compose down -v`
unless deliberately deleting website content.

## Update

```bash
cd /var/www/html
git pull --ff-only
./ops/deploy.sh
```

The script builds one target at a time using the limited BuildKit worker and
starts Compose without any additional build. Local Dockerfile and .dockerignore
changes may need reconciliation if upstream changes the same files.

```bash
docker compose ps -a
docker compose logs --tail=100 web
docker stats --no-stream
systemctl status docker-workload.slice
```

## Back up

For a consistent backup, stop web briefly and archive both volume directories
with sudo into a private backup directory, then `docker compose start web`.
Use `docker volume inspect hypernet_db-data hypernet_media-data` to locate them.
Also preserve `.env`. Keep backups outside this VPS.

An initial consistent snapshot and copy of `.env` are stored in the root-only
`/var/backups/hypernet` directory. This is a local snapshot, not an offsite backup.

The repository ships placeholder content and no outbound email adapter. Enquiries
are saved in the CMS; email delivery and password reset emails require an email
adapter and provider credentials.

## Domain and HTTPS

DNS for hypernet.co.za and www.hypernet.co.za points to 41.222.37.130.
The canonical origin is https://hypernet.co.za. HTTP and HTTPS www requests
redirect to that origin, preserving the path and query string.

HYPERNET_PUBLIC_URL in `.env` is https://hypernet.co.za. Rebuild after changing
this value because Next.js embeds public URLs at build time.

Nginx configuration: /etc/nginx/sites-available/hypernet (enabled by symlink).
Nginx terminates TLS and proxies to the loopback-only app port 127.0.0.1:3060.
The CMS authentication cookie is Secure, HttpOnly and SameSite=Lax.

Certificate and private key: /etc/letsencrypt/live/hypernet.co.za/.
The certificate covers both domain names. certbot.timer renews automatically;
the Nginx installer reloads the server after renewal. Keep ports 80 and 443
reachable for public traffic and HTTP certificate validation.

```bash
sudo certbot certificates
systemctl status certbot.timer
sudo certbot renew --dry-run
sudo nginx -t
```

The pre-HTTPS Nginx configuration is backed up at
/etc/nginx/sites-available/hypernet.pre-https. The previous environment is
stored privately at /var/backups/hypernet/env.pre-https.
