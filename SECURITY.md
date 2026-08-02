# Security Policy: NVMesh interop-db

NVIDIA is dedicated to the security and trust of our software products and
services, including all source code repositories managed through our
organization.

If you need to report a security issue, please use the appropriate contact
points outlined below. **Please do not report security vulnerabilities through
GitHub/GitLab issues or pull requests.**

## Reporting a Vulnerability

To report a potential security vulnerability in the NVMesh Upgrade Agent:

* **Web (preferred):** [NVIDIA Vulnerability Disclosure Program](https://www.nvidia.com/en-us/security/)
  — the preferred method for reporting security concerns across all NVIDIA
  products.
* **E-Mail:** [psirt@nvidia.com](mailto:psirt@nvidia.com)
  - We encourage you to use the following PGP key for secure email
    communication: [NVIDIA public PGP Key](https://www.nvidia.com/en-us/security/pgp-key)
* **GitHub:** Use this repository's **Security** tab > **Report a vulnerability**
  to submit a report directly.

If a security vulnerability is reported through public channels (issues, pull
requests, or discussions), maintainers may limit public discussion and redirect
the reporter to the appropriate private disclosure channels.

### What to Include in Your Report

Detailed reports help NVIDIA evaluate and address issues faster. Please include:

- Product/project name and version or branch affected
- Type of vulnerability (e.g., command injection, privilege escalation, denial
  of service)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept code or exploit (if available)
- Potential impact assessment

**Detailed

## Security Architecture & Context

NVMesh `interop-db` is the **compatibility-matrix and upgrade-transition database** for
NVMesh (NVIDIA's distributed block storage). It stores which component versions
(kernel, OFED, operating system, CPU architecture, platform) are compatible with
which NVMesh releases, and encodes the upgrade paths used for managed
non-disruptive upgrades (mNDU). The data lives in a SQLite database
(`InteropDB`), whose tracked source of truth is the SQL dump
`InteropDB.dump.sql`.

This software operates at the **Library / data-package** level. It has **no
network interface, HTTP/gRPC server, or listening socket of its own** — the
public entry point (`index.js`) exposes callback-style wrappers around an
internal Sequelize query layer (`dbAPI.js`), and is imported in-process by the
NVMesh management server (`require('interop-db')`). Its primary security
responsibility is the **integrity and correctness of the compatibility/upgrade
data** that downstream components rely on to decide which artifacts to install
and which upgrade paths are permitted.

**Packaging note:** the `nvmesh-interopdb` RPM built from this repo
(`RPM/nvmesh-interopdb.spec`) ships **only** the built SQLite database
(`/opt/nvmesh/interop-db/InteropDB`, generated from `InteropDB.dump.sql` at
`%build`) and a `version` file. The JavaScript access layer in this repo
(`index.js`, `dbAPI.js`, `Models/`, `consts.js`) is **not** included in that
RPM; it is consumed as an in-process dependency of the NVMesh management server
and is distributed with the **management** RPM. Consequently, the code-path
threats below (SQL injection, ReDoS, connection handling, destructive writes)
execute inside the management server process, whereas the `nvmesh-interopdb`
RPM's own payload is limited to the database and version files.

**Repository Exposure Classification:** Public.
Basis: the project is Apache-2.0 licensed (`LICENSE`, per-file SPDX headers) and
is published to a public open-source mirror referenced in `README.md` and
`AGENTS.md`; this document is written to public-safe detail 
(internal hostnames, ticket IDs, and internal tooling URLs are omitted).

**Service Exposure Classification:** External / Regulated (high confidence).
Basis: the database is externally distributed as part of a commercial NVMesh
product release (RPM packaging in `RPM/`) and is published via a public
open-source mirror, and it is a runtime production dependency of the management
server used to gate upgrade eligibility. It handles no credentials or personal
data — only product build/compatibility metadata (RPM/DEB artifact names,
version strings, platform descriptors seen in `InteropDB.dump.sql`).

### Trust boundaries and data flow

- **Untrusted-to-this-library input:** query objects (`sort`, `filter`, `skip`,
  `limit`) and entity payloads passed by the caller into `index.js` exports and
  normalized by `parseQueryObj` in `dbAPI.js`.
- **Trusted data at rest:** the SQLite file and `InteropDB.dump.sql`, which are
  treated as authoritative and are the security-critical asset.
- **Trust assumption:** the library trusts its single in-process caller (the
  management server) to authenticate and authorize requests; it performs none of
  its own.

### Threat Model

`interop-db` has **no network-reachable interface**, and each NVMesh management
instance accesses **its own local `InteropDB` on the same host**, in-process.
None of the scenarios below are remotely exploitable over the network: every one
presupposes either local access to the management host and its filesystem, write
access to this repository or the RPM build pipeline, or an already-compromised
management server process (the library's single in-process caller). The threats
are therefore best read as **local privilege/integrity concerns**, not remote
attack vectors.

With that precondition, the following scenarios represent the primary security
concerns for this project (including its packaging and data-restore paths):

1. **SQL injection via unsanitized `sort` keys:** In `dbAPI.js`,
   `convertSortToOrder` interpolates caller-supplied sort *keys* directly into a
   raw `Sequelize.literal()` ORDER BY expression (backtick-wrapped column/
   association names). Unlike filter *values*, these keys are not parameterized,
   so a caller that can influence the `sort` object could break out of the
   quoting and inject SQL into queries built by `getAll*` functions.
2. **Regular-expression denial of service (ReDoS) from stored patterns:**
   `getReleaseArtificatsForMachine` → `platformMatchKernelAndOfed` →
   `isRegexMatch` in `dbAPI.js` compiles kernel/OFED version strings stored in
   the database as regexes (`new RegExp(...).test(...)`, for values wrapped in
   `/.../`) and evaluates them against caller-reported kernel/OFED strings. A
   malformed or maliciously crafted pattern in the compatibility data can cause
   catastrophic backtracking, stalling the in-process caller during upgrade
   resolution.
3. **Compatibility-data tampering / supply-chain integrity:**
   `InteropDB.dump.sql` is the tracked source of truth and is executed verbatim
   as SQL to rebuild the database (`scripts/restore.sh`, and the `%build` step of
   `RPM/nvmesh-interopdb.spec` run `sqlite3 < InteropDB.dump.sql`). A tampered
   dump merged into the repo executes arbitrary SQLite statements at build/
   restore time and poisons the matrix the management server trusts, potentially
   steering nodes toward incorrect or malicious upgrade artifacts.
4. **Untrusted database path in `connect`/`reconnect`:** `dbAPI.js`'s `connect`
   passes the caller-provided path straight into
   `new Sequelize({ dialect: 'sqlite', storage: dbPath })` with no validation.
   A caller pointed at an attacker-controlled or unexpected file location would
   have SQLite open (or create) that file and treat its contents as the
   authoritative compatibility database (data-source spoofing).
5. **Unauthenticated destructive write operations:** `index.js` exports
   create/update/delete operations (`createArtifact`, `deleteReleases`,
   `updateUpgrade`, `deletePlatforms`, `createComponentVersion`, etc.) with no
   authentication, authorization, or schema validation of the entity payloads.
   Any code path that can reach these exports can mutate or delete
   upgrade-eligibility data, so the library depends entirely on its caller to
   enforce access control and input validation.

### Critical Security Assumptions

- **Pre-authenticated, pre-authorized caller:** Assumes its sole consumer (the
  NVMesh management server, in-process) has already authenticated and authorized
  every request; the library exports in `index.js` perform no access control.
- **Trusted, well-formed query input:** Assumes callers pass trusted query
  objects; input handling in `parseQueryObj`/`convertSortToOrder`/
  `convertFilterToWhere` does not sanitize `sort` keys or defend against hostile
  query shapes.
- **Trusted and integrity-protected data artifacts:** Assumes `InteropDB.dump.sql`
  and the resulting SQLite file are vetted through code review and the build
  pipeline; there is no signature or checksum verification at load
  (`connect`) or restore (`scripts/restore.sh`) time.
- **Trusted regex authors:** Assumes kernel/OFED regex patterns stored in the
  database are authored by trusted maintainers and are non-catastrophic;
  `isRegexMatch` compiles and runs them without complexity limits or timeouts.
- **Filesystem and OS enforce access control:** Assumes the host OS protects the
  SQLite file path supplied to `storage` and the RPM-installed
  `/opt/nvmesh/interop-db/InteropDB` (owned by the packaging service account);
  the library relies on filesystem permissions rather than its own controls.
- **Network protection provided by the host process:** Assumes any TLS,
  transport security, and network isolation are provided by the consuming
  process, since this library exposes no network surface itself.

## Supported Versions

Security fixes are delivered against the latest released version of the NVMesh
product line that bundles this database. Report issues against the most recent
release or the current `master`.
