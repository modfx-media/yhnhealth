# AI Implementation Brief: Your Health Now (yhnhealth.com)
## Functional Medicine Telehealth Expansion (2 â†’ 9 states) + PSEO Cleanup

> Paste this whole file into your AI agent / MCP session. It contains the full context, Brennen's implementation plan, what is ALREADY DONE (do not redo), and the exact remaining work with acceptance criteria.

---

## 0. Role & rules for the AI

- You are working on the yhnhealth.com codebase (production build via `npm run build`; 308 permanent redirects suggest Next.js `redirects()` in `next.config.*`. Confirm before editing).
- Do NOT touch: physical office info (Merchantville, NJ and Chalfont, PA addresses/phones/hours), existing service pages, blog, admin/CMS, booking flow (Jane App).
- Do NOT redo anything listed in Section 2 (already done and live).
- Do NOT invent licensing, lab, or pricing facts. Leave those as clearly marked placeholders (`TODO: needs client info`) until the client provides them.
- Kansas is explicitly EXCLUDED. Do not add a Kansas page or mention.
- After every change: run `npm run build` with zero errors, then verify on the deployed site (not just the build output).

---

## 1. Context

- **Client:** Your Health Now (YHN), Dr. Chris Chianese, MS, DC, CPSC, IFM FMCP. Doctor-led chiropractic + functional medicine.
- **Physical clinics (only two, unchanged):**
  - Merchantville, NJ: 5 W Chestnut Ave, Merchantville, NJ 08109 Â· (856) 532-2063
  - Chalfont, PA: 350 N Main St #201, Chalfont, PA 18914 Â· (609) 651-7436
  - Hours: Monâ€“Fri 7:30amâ€“8pm Â· info@yhnhealth.com
- **Booking link (free 30-min functional medicine consult):** https://yourhealthnow.janeapp.com/locations/yhn/book#staff_member/2
- **Goal:** Functional medicine telehealth coverage expands from "PA & NJ only" to **9 states**, and the old thin PSEO cityÃ—service grid is retired.
- **The 9 states (final list):**

| State | URL | Notes |
|---|---|---|
| New Jersey | /functional-medicine/new-jersey | Mentions Merchantville, NJ office |
| Pennsylvania | /functional-medicine/pennsylvania | Mentions Chalfont, PA office |
| Florida | /functional-medicine/florida | Telehealth only |
| Delaware | /functional-medicine/delaware | Telehealth only |
| Vermont | /functional-medicine/vermont | Telehealth only |
| Arizona | /functional-medicine/arizona | Telehealth only |
| Idaho | /functional-medicine/idaho | Telehealth only |
| Washington | /functional-medicine/washington | Telehealth only |
| Washington, D.C. | /functional-medicine/washington-dc | Telehealth only |

---

## 2. ALREADY DONE by Nargis (verified live Oct 2, 2026). DO NOT REDO

- [x] All 9 state pages are live at `/functional-medicine/{state}` with: unique SEO title + meta description, direct-answer intro, sections (availability, licensing, lab logistics, what needs in-person, cost/insurance), state FAQ block, Dr. Chris byline + "Medically reviewed Â· Last reviewed 2026-10-02", schema (MedicalWebPage, FAQPage, breadcrumbs), "Book a Free 30-Minute Consult" CTA.
- [x] `/llms.txt` is live and lists pillars, offices, doctors, all 9 state pages, booking + contact links.
- [x] Functional Medicine pillar page has a "States We Serve" section at `/functional-medicine#states` (anchor behavior still needs fixing, see Task 2).
- [x] Kansas excluded.
- [x] Licensing / labs / pricing left as safe generic placeholder language (not guessed).

---

## 3. REMAINING WORK (do in this order)

### Task 1: Deploy the full build + purge cache  [HIGHEST PRIORITY]
Brennen's doc states the work was "committed to the repository, not yet deployed/pushed." The live site is only partially updated (state pages + llms.txt live; site-wide copy and redirects NOT live).
- Confirm the latest commit containing the messaging updates, template removal, and redirects is on the production branch.
- Deploy, then purge CDN/host cache.
- **Acceptance:** Tasks 3â€“5 checks below pass on the LIVE site. If they already pass after deploy, mark them done and skip.

### Task 2: Fix the `#states` anchor (Jessie's feedback)
Links to `/functional-medicine#states` must land EXACTLY on the states list. The user should not have to scroll.
- Put `id="states"` on the states list container itself (not a wrapper far above it).
- Add `scroll-margin-top` equal to the sticky header height (e.g. `scroll-margin-top: 120px;` or Tailwind `scroll-mt-[120px]`; measure the real header height, including the top info bar).
- If smooth-scroll JS is used, make sure it respects the offset.
- **Acceptance:** Opening `https://yhnhealth.com/functional-medicine#states` in a fresh tab, desktop + mobile, shows the "States We Serve" heading and list at the top of the viewport, not hidden under the header.

### Task 3: List all 9 states on the HOMEPAGE (Jessie's feedback)
The homepage "Functional medicine, wherever you are" block currently shows pills: `PENNSYLVANIA` Â· `NEW JERSEY` Â· `SECURE VIDEO VISITS`.
- Replace with all 9 state pills (same pill style), each linking to its `/functional-medicine/{state}` page. Keep a "Secure video visits" pill, or a "See all states" link to `/functional-medicine#states`.
- **Acceptance:** All 9 states are visible and clickable on the homepage; every link resolves 200.

### Task 4: Replace every "PA & NJ only" telehealth claim (site-wide)
These strings are STILL LIVE as of Oct 2. Update each to 9-state messaging, linking to `/functional-medicine#states` where natural. Do NOT change physical-office references.

| Location | Current live text | Change to (suggested) |
|---|---|---|
| Homepage Â· FM banner bullet | "In-office & secure telehealth across PA & NJ" | "In-office & secure telehealth in 9 states" |
| Homepage Â· hero/telehealth block | "Doctor-led functional medicine care delivered across all of Pennsylvania & New Jersey via secure video." | "...delivered via secure video to patients in 9 states, including PA, NJ, FL, DE, VT, AZ, ID, WA & D.C." |
| Homepage Â· Book Functional Medicine | "Telehealth visits open to PA & NJ residents." | "Telehealth visits open to residents of 9 states." |
| Homepage Â· Free 30-Min Consult | "Open to residents anywhere in Pennsylvania & New Jersey." | "Open to residents in all 9 states we serve." |
| Homepage Â· consult side card | "Functional medicine telehealth visits available across all of Pennsylvania & New Jersey." + "Telehealth Coverage: All of PA & NJ" | "...available in 9 states." + "Telehealth Coverage: 9 states" (link to #states) |
| Homepage Â· reviews line | "Read 100+ verified five-star reviews from our patients across NJ & PA." | LEAVE AS-IS (true statement about reviews) |
| Homepage Â· telehealth hours block | "Available across all of PA & NJ." / "Open to residents anywhere in PA & NJ" | "Available in 9 states." |
| Homepage Â· map section | "...or see Dr. Chris from anywhere in Pennsylvania & New Jersey via secure functional medicine telehealth." + "Available everywhere in PA & NJ" | "...from any of the 9 states we serve via secure telehealth." + "Telehealth in 9 states" |
| Contact page Â· FM consult card | "...telehealth consult with Dr. Chris, available across all of PA & NJ." | "...available in 9 states." + link to #states |
| Locations page | Currently NO telehealth section at all | Add a short "Functional Medicine Telehealth Â· 9 states" block linking to `/functional-medicine#states` (per Brennen's plan) |
| Footer (promo strip + quick links) | Verify | Promo strip says 9 states; quick links include `/functional-medicine#states` |

- After editing, run a repo-wide search for: `PA & NJ`, `PA &amp; NJ`, `Pennsylvania & New Jersey`, `NJ & PA`, `all of PA`. Fix every telehealth-coverage instance; leave office/clinic/review references.
- **Acceptance:** No live page describes telehealth as PA & NJ only.

### Task 5: Retire the old `/areas-we-serve/` PSEO grid (redirects NOT live)
Still live as of Oct 2: `/areas-we-serve` (full city Ã— service grid) and city pages like `/areas-we-serve/burlington-nj/chiropractic-care` return 200 with full thin content.
Brennen's plan:
- Remove the 3 template files that generate the ~1,081 pages (~30 cities Ã— ~35 services).
- Add **37 permanent (308) redirects**:

| Old URL pattern | Redirect to |
|---|---|
| /areas-we-serve | /locations |
| /areas-we-serve/{city} | /locations |
| /areas-we-serve/{city}/chiropractic-care | /locations |
| /areas-we-serve/{city}/{other-service} | The matching real service page (34 services mapped), e.g. /webster-technique, /lower-back, /athletic-care, /head-and-neck, /functional-medicine |

- Remove all grid URLs from `sitemap.xml` and the human-readable `/sitemap` page.
- Update every internal link that pointed into `/areas-we-serve/...`.
- Cities in the old grid, for testing: NJ: Merchantville, Pennsauken, Cherry Hill, Camden, Collingswood, Haddonfield, Haddon Township, Voorhees, Maple Shade, Moorestown, Mount Laurel, Marlton, Medford, Willingboro, Burlington. PA: Chalfont, Doylestown, New Britain, Warrington, Warminster, Lansdale, Hatfield, Montgomeryville, North Wales, Souderton, Telford, Perkasie, Sellersville, Quakertown, Horsham.
- **Acceptance:** `curl -I https://yhnhealth.com/areas-we-serve/burlington-nj/chiropractic-care` returns `308` to `/locations`; spot-check 10 random city/service URLs return 308 to the correct service page; no 404s; sitemap has zero `/areas-we-serve` URLs.

### Task 6: Fix the "D.C.." double-period bug
On `/functional-medicine/washington-dc`, the H1 reads "Functional Medicine Telehealth in Washington, D.C.." and the licensing answer ends "...specific to Washington, D.C..".
- Fix the template so names already ending in "." don't get a second period (e.g. `name.endsWith('.') ? name : name + '.'`).
- **Acceptance:** No "D.C.." anywhere on the site.

### Task 7: Client info placeholders (BLOCKED, do not guess)
Leave `TODO: needs client info` placeholders until Jessie/Dr. Chris provide:
1. **Telehealth licensing:** exact state-by-state licensing/compact confirmation for Dr. Chris.
2. **Lab logistics:** which lab/draw-site network is used in each state.
3. **Pricing & insurance:** current self-pay telehealth price and insurance/superbill policy.
When provided, swap them into the matching sections on all 9 state pages (content-only update, no rebuild of structure).

### Task 8: Post-launch SEO
- Resubmit `sitemap.xml` in Google Search Console.
- Request indexing for the 9 state pages and `/functional-medicine`.
- Confirm `/llms.txt` still returns 200 after deploy.

---

## 4. Final verification checklist (report back on each)

- [ ] Production deploy done + cache purged
- [ ] `/functional-medicine#states` lands on the list (desktop + mobile)
- [ ] Homepage shows all 9 states, each linked
- [ ] Zero "PA & NJ only" telehealth claims on Homepage, Contact, Locations, Footer
- [ ] Locations page has a telehealth / 9-states block
- [ ] `/areas-we-serve/*` returns 308 to the correct targets; sitemap is clean; internal links updated
- [ ] No "D.C.." typo
- [ ] `npm run build` passes with zero errors
- [ ] Client info placeholders still marked TODO (until provided)
- [ ] Sitemap resubmitted in GSC

Source: Brennen's implementation doc (shared by Nargis, Oct 2) + live-site check on Oct 2, 2026. Task: "Added Cities to Site/PSEO".