# Loan / Interest Calculator — Complete Build Plan

> **Goal:** Launch a fast, SEO-optimised loan and interest calculator site monetised with Google AdSense and affiliate links. Target: $500–$1,500/month by Month 6.

---

## Table of Contents

1. [Site Concept & Scope](#1-site-concept--scope)
2. [Domain & Branding](#2-domain--branding)
3. [Tech Stack](#3-tech-stack)
4. [Hosting & Infrastructure](#4-hosting--infrastructure)
5. [Project File Structure](#5-project-file-structure)
6. [Calculator Features — Full Spec](#6-calculator-features--full-spec)
7. [Code Implementation](#7-code-implementation)
8. [SEO Strategy](#8-seo-strategy)
9. [Monetisation Setup](#9-monetisation-setup)
10. [Analytics & Tracking](#10-analytics--tracking)
11. [Launch Checklist](#11-launch-checklist)
12. [Growth Roadmap](#12-growth-roadmap)
13. [Cost Summary](#13-cost-summary)

---

## 1. Site Concept & Scope

### What we're building
A clean, fast, mobile-first calculator site covering the most-searched loan and interest calculation use cases. Single domain, multiple calculator pages, each targeting a specific long-tail keyword cluster.

### Why this niche
- Finance ads pay **$5–$50+ CPC** vs $0.50 for generic tools
- "Loan calculator" = **1.2M+ monthly US searches**; "mortgage calculator" = 3.4M+
- Compound interest, personal loan, and car loan calculators are all high-intent, high-RPM pages
- Affiliate lead-gen (mortgage broker referral) pays **$85–$250 per qualified lead** — 3–5x AdSense alone

### Calculators to build (Phase 1 launch)

| # | Calculator | Target Keyword | Monthly US Searches (est.) |
|---|-----------|---------------|---------------------------|
| 1 | Personal Loan Calculator | personal loan calculator | 450K |
| 2 | Compound Interest Calculator | compound interest calculator | 550K |
| 3 | Car Loan Calculator | car loan calculator | 480K |
| 4 | Mortgage Calculator | mortgage calculator | 3.4M |
| 5 | Simple Interest Calculator | simple interest calculator | 120K |
| 6 | Amortization Schedule | amortization schedule calculator | 180K |
| 7 | Credit Card Payoff Calculator | credit card payoff calculator | 200K |
| 8 | Home Affordability Calculator | how much house can I afford | 320K |

**Phase 2 additions (Month 2):** Investment return, retirement savings, debt-to-income ratio, refinance break-even.

---

## 2. Domain & Branding

### Domain name ideas (check availability on Namecheap)
- `calcloan.com`
- `loancalc.io`
- `interestcalc.net`
- `finacalc.com`
- `quickloancalc.com`
- `smartloancalc.com`

**Rules:**
- Prefer `.com` — higher trust for finance
- Include "loan" or "calc" in domain for exact-match SEO signal
- Keep it under 15 characters, easy to spell
- Avoid hyphens

**Domain cost:** ~$12–$15/year on Namecheap

### Branding
- **Colour palette:** Deep navy `#1A237E` + emerald `#00897B` + white — professional, trustworthy
- **Font:** Inter (Google Fonts, free) — clean and readable on mobile
- **Logo:** Simple wordmark — no need to pay for logo design at launch
- **Tagline:** "Fast, free financial calculators."

---

## 3. Tech Stack

### Recommendation: Static HTML/CSS/JS — No framework needed

| Layer | Choice | Why |
|-------|--------|-----|
| HTML | Vanilla HTML5 | Zero build step, instant deploy, Google crawls it perfectly |
| CSS | Tailwind CSS (CDN) | Utility-first, fast to write, small final size |
| JavaScript | Vanilla JS (ES6+) | All calculator logic is client-side math — no library needed |
| Charts | Chart.js (CDN) | Amortisation pie + bar charts, 60KB, no build step |
| Hosting | Cloudflare Pages | Free tier, global CDN, auto HTTPS, 500 deploys/month free |
| Version control | GitHub (free) | Auto-deploy to Cloudflare Pages on push |

**Why not React/Next.js?** Overkill. Calculators are deterministic math — pure JS is faster to ship, easier to maintain, and gets better Core Web Vitals scores (critical for AdSense RPM).

---

## 4. Hosting & Infrastructure

### Option A — Cloudflare Pages (Recommended, Free)

**Best for:** Static HTML sites with no backend.

```
Cost: $0/month
Speed: Global CDN (200+ PoPs worldwide)
HTTPS: Automatic, included
Deploy: Push to GitHub → live in ~30 seconds
Limits: Unlimited bandwidth, 500 builds/month, 100K requests/day (free tier)
Custom domain: Yes, free
```

**Setup steps:**
1. Push code to GitHub repo
2. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
3. Connect GitHub repo → select branch `main`
4. Build command: leave empty (static site)
5. Output directory: `/` or `/dist`
6. Add custom domain in Cloudflare DNS settings

### Option B — Netlify (Free, alternative)

```
Cost: $0/month
Speed: CDN, slightly fewer PoPs than Cloudflare
Deploy: GitHub auto-deploy
Limits: 100GB bandwidth/month free
```

### Option C — VPS (For future Phase 2 with backend features)

```
Provider: Hetzner Cloud (cheapest good VPS)
Spec: CX22 — 2 vCPU, 4GB RAM
Cost: ~$6/month
Use case: If you add email capture, PDF export API, or a server-side lead-gen form
```

**Recommendation: Start with Cloudflare Pages (free). Migrate to VPS only if you add backend features.**

### SSL / HTTPS
Cloudflare Pages provides free automatic HTTPS via Let's Encrypt. Required for AdSense approval.

### CDN for assets
Cloudflare Pages serves from CDN by default. No extra setup needed.

---

## 5. Project File Structure

```
loan-calculator/
├── index.html                    # Homepage — links to all calculators
├── personal-loan-calculator.html
├── compound-interest-calculator.html
├── car-loan-calculator.html
├── mortgage-calculator.html
├── simple-interest-calculator.html
├── amortization-schedule.html
├── credit-card-payoff-calculator.html
├── home-affordability-calculator.html
├── simple-interest-calculator.html
├── about.html
├── privacy-policy.html           # Required for AdSense
├── terms-of-service.html         # Recommended for financial disclaimer
├── sitemap.xml                   # Submit to Google Search Console
├── robots.txt
├── css/
│   └── style.css                 # Global styles + Tailwind overrides
├── js/
│   ├── personal-loan.js
│   ├── compound-interest.js
│   ├── car-loan.js
│   ├── mortgage.js
│   ├── amortization.js
│   ├── credit-card-payoff.js
│   ├── home-affordability.js
│   └── utils.js                  # Shared: formatCurrency, formatPercent, etc.
├── img/
│   └── logo.svg
└── .github/
    └── workflows/
        └── deploy.yml            # Optional: CI/CD if you add build steps
```

---

## 6. Calculator Features — Full Spec

### All calculators share:
- Mobile-responsive layout (inputs stack vertically on mobile)
- Real-time calculation (updates on every keystroke, no "Calculate" button needed)
- Currency formatting with locale (`$1,234.56`)
- Input validation with helpful error messages
- Result summary card with key figures
- Chart visualisation (Chart.js)
- "Copy result" button
- Print / Save as PDF button (browser native `window.print()`)
- Schema.org structured data for SEO

---

### 6.1 Personal Loan Calculator

**Inputs:**
- Loan amount ($)
- Annual interest rate (%)
- Loan term (months or years toggle)

**Outputs:**
- Monthly payment
- Total payment
- Total interest paid
- Interest as % of loan
- Bar chart: Principal vs Interest breakdown
- Full amortisation schedule table (collapsible)

**Affiliate placement:** "Compare personal loan rates →" (LendingTree, Bankrate affiliate)

---

### 6.2 Compound Interest Calculator

**Inputs:**
- Principal amount ($)
- Annual interest rate (%)
- Compounding frequency (daily / monthly / quarterly / annually)
- Time period (years)
- Optional: monthly contribution ($)

**Outputs:**
- Final balance
- Total contributions
- Total interest earned
- Year-by-year growth table
- Line chart: balance over time

**Affiliate placement:** "Open a high-yield savings account →" (Marcus, Ally Bank affiliate)

---

### 6.3 Car Loan Calculator

**Inputs:**
- Vehicle price ($)
- Down payment ($)
- Trade-in value ($)
- Sales tax rate (%)
- Annual interest rate (%)
- Loan term (months: 24 / 36 / 48 / 60 / 72 / 84)

**Outputs:**
- Loan amount (after down + trade-in + tax)
- Monthly payment
- Total interest paid
- Total cost of vehicle
- Pie chart: Principal / Interest / Tax breakdown
- Amortisation table

**Affiliate placement:** "Get pre-approved for a car loan →" (Capital One Auto, LightStream)

---

### 6.4 Mortgage Calculator

**Inputs:**
- Home price ($)
- Down payment ($ or %)
- Loan term (15 / 20 / 30 years)
- Annual interest rate (%)
- Property tax (annual $ or % of home value)
- Home insurance (annual $)
- PMI rate (% — auto-enable if down payment < 20%)
- HOA fees (monthly $, optional)

**Outputs:**
- Monthly PITI breakdown (Principal, Interest, Tax, Insurance)
- Total payment over loan life
- Total interest paid
- Pie chart: payment breakdown
- Amortisation schedule with equity milestones
- "Afford this?" summary vs standard 28% rule

**Affiliate placement:** "Get today\"s mortgage rates →" → LendingTree or Bankrate affiliate link ($85–$250/lead)

---

### 6.5 Simple Interest Calculator

**Inputs:**
- Principal amount ($)
- Annual interest rate (%)
- Time period (years)

**Outputs:**
- Total interest earned
- Final balance
- Interest as % of principal

**Affiliate placement:** "Open a high-yield savings account →" (Marcus, Ally Bank affiliate)

---

### 6.6 Amortization Schedule

**Inputs:**
- Loan amount, rate, term (same as personal loan)
- Optional: extra monthly payment

**Outputs:**
- Full month-by-month table (payment #, payment, principal, interest, balance)
- With extra payment: years saved + interest saved highlighted
- Download as CSV button

---

### 6.6 Credit Card Payoff Calculator

**Inputs:**
- Current balance ($)
- Annual interest rate / APR (%)
- Strategy toggle: Fixed monthly payment OR pay off by date
- Minimum payment info (optional)

**Outputs:**
- Months to payoff
- Total interest paid
- Payoff date
- Comparison: minimum payment vs user's payment (interest saved, time saved)
- Line chart: balance over time

**Affiliate placement:** "0% APR balance transfer cards →" (affiliate)

---

### 6.7 Home Affordability Calculator

**Inputs:**
- Annual household income ($)
- Monthly debt payments ($) — car, student loans, etc.
- Down payment available ($)
- Current mortgage rate (%)
- Loan term
- Property tax rate (%)
- Insurance estimate

**Outputs:**
- Maximum home price (28% rule and 36% rule)
- Recommended price range
- Required income for a target home price
- Debt-to-income ratio indicator

---

## 7. Code Implementation

### 7.1 Base HTML Template (shared across all pages)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Personal Loan Calculator — Free Monthly Payment Calculator</title>
  <meta name="description" content="Calculate your monthly personal loan payment instantly. Enter loan amount, rate, and term to see total interest, payment schedule, and amortization table.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://yourdomain.com/personal-loan-calculator">
  
  <!-- Open Graph (for social sharing) -->
  <meta property="og:title" content="Personal Loan Calculator">
  <meta property="og:description" content="Free online personal loan calculator. Instant results.">
  <meta property="og:type" content="website">
  <meta property="og:image" content="https://yourdomain.com/img/social-share.jpg"> <!-- Recommended: 1200x630 image -->
  
  <!-- Favicon -->
  <link rel="icon" href="/img/favicon.ico" sizes="any">
  <link rel="icon" href="/img/icon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/img/apple-touch-icon.png"> <!-- 180x180 -->
  <link rel="manifest" href="/manifest.webmanifest">

  <!-- Schema.org structured data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Personal Loan Calculator",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Calculate monthly payments, total interest, and amortization schedule for personal loans."
  }
  </script>

<!-- Google AdSense (add after approval) -->
  <!-- <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXX" crossorigin="anonymous"></script> -->

  <!-- Cookie Consent Banner (Google-certified CMP required for AdSense in EEA/UK) -->
  <!-- Example: Add your CMP script here, e.g., from OneTrust, Cookiebot, etc. -->
  <!-- <script src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js" type="text/javascript" charset="UTF-8" data-domain-script="YOUR_DOMAIN_ID"></script> -->

  <!-- Tailwind CSS via CDN (swap for compiled CSS in production) -->
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- Chart.js -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>

  <link rel="stylesheet" href="/css/style.css">
</head>
<body class="bg-gray-50 text-gray-800 font-sans">

  <!-- Navigation -->
  <nav class="bg-indigo-900 text-white px-4 py-3 flex items-center justify-between">
    <a href="/" class="font-bold text-lg tracking-tight">CalcLoan</a>
    <div class="hidden md:flex gap-6 text-sm">
      <a href="/personal-loan-calculator" class="hover:text-emerald-300">Personal Loan</a>
      <a href="/mortgage-calculator" class="hover:text-emerald-300">Mortgage</a>
      <a href="/car-loan-calculator" class="hover:text-emerald-300">Car Loan</a>
      <a href="/compound-interest-calculator" class="hover:text-emerald-300">Compound Interest</a>
    </div>
  </nav>

  <!-- AdSense — leaderboard top -->
  <div class="flex justify-center py-2 bg-white border-b">
    <!-- ins class="adsbygoogle" ... -->
  </div>

  <!-- Main content -->
  <main class="max-w-3xl mx-auto px-4 py-8">

    <h1 class="text-3xl font-bold text-indigo-900 mb-2">Personal Loan Calculator</h1>
    <p class="text-gray-500 mb-6">Enter your loan details to instantly calculate your monthly payment, total interest, and full amortization schedule.</p>

    <!-- Calculator card -->
    <div class="bg-white rounded-2xl shadow-sm border p-6 mb-6">
      <div class="grid md:grid-cols-3 gap-4">

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Loan Amount</label>
          <div class="relative">
            <span class="absolute left-3 top-2.5 text-gray-400">$</span>
            <input id="loanAmount" type="number" value="10000" min="100" max="10000000"
              class="w-full pl-7 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              oninput="calculate()">
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Annual Interest Rate</label>
          <div class="relative">
            <input id="interestRate" type="number" value="7.5" min="0.1" max="100" step="0.1"
              class="w-full pr-8 pl-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              oninput="calculate()">
            <span class="absolute right-3 top-2.5 text-gray-400">%</span>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Loan Term</label>
          <div class="flex gap-2">
            <input id="loanTerm" type="number" value="36" min="1" max="600"
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              oninput="calculate()">
            <select id="termUnit" onchange="calculate()"
              class="px-2 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none">
              <option value="months">Mo</option>
              <option value="years">Yr</option>
            </select>
          </div>
        </div>

      </div>
    </div>

    <!-- Results card -->
    <div id="results" class="bg-indigo-900 text-white rounded-2xl p-6 mb-6">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div>
          <div class="text-xs text-indigo-300 uppercase tracking-wide mb-1">Monthly Payment</div>
          <div id="monthlyPayment" class="text-2xl font-bold">$0.00</div>
        </div>
        <div>
          <div class="text-xs text-indigo-300 uppercase tracking-wide mb-1">Total Payment</div>
          <div id="totalPayment" class="text-xl font-semibold">$0.00</div>
        </div>
        <div>
          <div class="text-xs text-indigo-300 uppercase tracking-wide mb-1">Total Interest</div>
          <div id="totalInterest" class="text-xl font-semibold">$0.00</div>
        </div>
        <div>
          <div class="text-xs text-indigo-300 uppercase tracking-wide mb-1">Interest %</div>
          <div id="interestPct" class="text-xl font-semibold">0%</div>
        </div>
      </div>
    </div>

    <!-- Chart -->
    <div class="bg-white rounded-2xl shadow-sm border p-6 mb-6">
      <h2 class="text-lg font-semibold text-gray-700 mb-4">Payment Breakdown</h2>
      <div class="flex justify-center">
        <canvas id="breakdownChart" width="280" height="280"></canvas>
      </div>
    </div>

    <!-- AdSense — mid-page rectangle -->
    <div class="flex justify-center my-4">
      <!-- ins class="adsbygoogle" ... -->
    </div>

    <!-- Affiliate CTA -->
    <div class="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 mb-6">
      <p class="font-semibold text-emerald-800 mb-1">Ready to apply?</p>
      <p class="text-sm text-emerald-700 mb-3">Compare personal loan rates from top lenders — check your rate without affecting your credit score.</p>
      <a href="YOUR_AFFILIATE_LINK" target="_blank" rel="noopener sponsored"
        class="inline-block bg-emerald-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-emerald-700 transition">
        Compare Loan Rates →
      </a>
    </div>

    <!-- Amortization table -->
    <div class="bg-white rounded-2xl shadow-sm border p-6 mb-6">
      <h2 class="text-lg font-semibold text-gray-700 mb-4">Amortization Schedule
        <button onclick="toggleAmort()" class="text-sm text-indigo-600 ml-2">[show/hide]</button>
      </h2>
      <div id="amortTable" class="hidden overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th class="px-3 py-2 text-left">Month</th>
              <th class="px-3 py-2 text-right">Payment</th>
              <th class="px-3 py-2 text-right">Principal</th>
              <th class="px-3 py-2 text-right">Interest</th>
              <th class="px-3 py-2 text-right">Balance</th>
            </tr>
          </thead>
          <tbody id="amortBody" class="divide-y divide-gray-100"></tbody>
        </table>
      </div>
    </div>

    <!-- SEO content section -->
    <article class="prose prose-gray max-w-none">
      <h2>How to Use This Personal Loan Calculator</h2>
      <p>Enter your loan amount, annual interest rate, and term to instantly see your monthly payment. The calculator uses the standard amortization formula to give you exact figures...</p>
      <h3>How Personal Loan Interest Works</h3>
      <p>Personal loans use simple amortization: each monthly payment covers accrued interest first, then reduces the principal...</p>
      <h3>What Is a Good Personal Loan Rate?</h3>
      <p>As of 2026, average personal loan APRs range from 8%–36% depending on credit score. Borrowers with excellent credit (720+) typically qualify for rates under 12%...</p>
    </article>

  </main>

  <!-- Footer -->
  <footer class="bg-gray-800 text-gray-400 text-sm py-8 mt-12">
    <div class="max-w-3xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-4">
      <div>
        <p class="font-semibold text-white mb-1">CalcLoan</p>
        <p>Free financial calculators for smarter decisions.</p>
      </div>
      <div class="flex gap-6">
<a href="/about" class="hover:text-white">About</a>
<a href="/privacy-policy" class="hover:text-white">Privacy Policy</a>
<a href="/terms-of-service" class="hover:text-white">Terms of Service</a>
      </div>
    </div>
  </footer>

  <script src="/js/utils.js"></script>
  <script src="/js/personal-loan.js"></script>
</body>
</html>
```

---

### 7.2 Core Calculator Logic — `js/personal-loan.js`

```javascript
let chart = null;

function calculate() {
  const amount  = parseFloat(document.getElementById('loanAmount').value) || 0;
  const rate    = parseFloat(document.getElementById('interestRate').value) || 0;
  const term    = parseFloat(document.getElementById('loanTerm').value) || 0;
  const unit    = document.getElementById('termUnit').value;
  const months  = unit === 'years' ? term * 12 : term;

  if (amount <= 0 || rate <= 0 || months <= 0) return;

  const monthlyRate = rate / 100 / 12;

  // Standard amortization formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
  const monthly = amount * (monthlyRate * Math.pow(1 + monthlyRate, months))
                          / (Math.pow(1 + monthlyRate, months) - 1);
  const totalPayment  = monthly * months;
  const totalInterest = totalPayment - amount;

  document.getElementById('monthlyPayment').textContent = fmt(monthly);
  document.getElementById('totalPayment').textContent   = fmt(totalPayment);
  document.getElementById('totalInterest').textContent  = fmt(totalInterest);
  document.getElementById('interestPct').textContent    = pct(totalInterest / totalPayment * 100);

  renderChart(amount, totalInterest);
  renderAmortTable(amount, monthlyRate, monthly, months);
}

function renderChart(principal, interest) {
  const ctx = document.getElementById('breakdownChart').getContext('2d');
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Principal', 'Interest'],
      datasets: [{
        data: [principal, interest],
        backgroundColor: ['#1e3a8a', '#10b981'],
        borderWidth: 0,
        hoverOffset: 6
      }]
    },
    options: {
      cutout: '65%',
      plugins: {
        legend: { position: 'bottom' },
        tooltip: {
          callbacks: {
            label: ctx => ` ${ctx.label}: ${fmt(ctx.raw)}`
          }
        }
      }
    }
  });
}

function renderAmortTable(principal, monthlyRate, monthly, months) {
  const body = document.getElementById('amortBody');
  body.innerHTML = '';
  let balance = principal;
  for (let m = 1; m <= months; m++) {
    const interest  = balance * monthlyRate;
    const princ     = monthly - interest;
    balance        -= princ;
    const row = `<tr class="hover:bg-gray-50">
      <td class="px-3 py-2 text-gray-500">${m}</td>
      <td class="px-3 py-2 text-right">${fmt(monthly)}</td>
      <td class="px-3 py-2 text-right text-indigo-700">${fmt(princ)}</td>
      <td class="px-3 py-2 text-right text-red-500">${fmt(interest)}</td>
      <td class="px-3 py-2 text-right font-medium">${fmt(Math.max(0, balance))}</td>
    </tr>`;
    body.insertAdjacentHTML('beforeend', row);
  }
}

function toggleAmort() {
  const t = document.getElementById('amortTable');
  t.classList.toggle('hidden');
}

// Run on load
calculate();
```

### 7.3 Shared Utilities — `js/utils.js`

```javascript
function fmt(n) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', minimumFractionDigits: 2
  }).format(n);
}

function pct(n) {
  return n.toFixed(1) + '%';
}
```

### 7.4 Compound Interest Calculator Logic

```javascript
function calculateCompound() {
  const principal    = parseFloat(document.getElementById('principal').value) || 0;
  const rate         = parseFloat(document.getElementById('rate').value) / 100 || 0;
  const years        = parseFloat(document.getElementById('years').value) || 0;
  const n            = parseInt(document.getElementById('frequency').value) || 12; // compounds/year
  const contribution = parseFloat(document.getElementById('contribution').value) || 0;

  // A = P(1 + r/n)^(nt) + PMT * [((1 + r/n)^(nt) - 1) / (r/n)]
  const exp        = Math.pow(1 + rate / n, n * years);
  const futureP    = principal * exp;
  const futureC    = contribution * ((exp - 1) / (rate / n));
  const total      = futureP + futureC;
  const totalContr = principal + contribution * 12 * years;
  const earned     = total - totalContr;

  document.getElementById('finalBalance').textContent  = fmt(total);
  document.getElementById('totalContrib').textContent  = fmt(totalContr);
  document.getElementById('interestEarned').textContent = fmt(earned);

  renderYearlyChart(principal, rate, n, years, contribution);
}
```

---

## 8. SEO Strategy

### On-page SEO — Per calculator page

Each page should have:

```
Title:     Personal Loan Calculator — Free Monthly Payment Calculator [2026]
H1:        Personal Loan Calculator
Meta desc: Calculate your monthly payment, total interest, and amortization schedule 
           for any personal loan. Free, instant, no sign-up required.
URL:       /personal-loan-calculator   (no trailing slash, no .html)
```

**Keyword targeting per page:**

| Page | Primary Keyword | Secondary Keywords |
|------|----------------|-------------------|
| Personal Loan Calc | personal loan calculator | loan calculator monthly payment, loan payment calculator |
| Compound Interest | compound interest calculator | compound interest formula, daily compound interest calculator |
| Simple Interest | simple interest calculator | interest calculator, basic interest calculator |
| Mortgage | mortgage calculator | mortgage payment calculator, home loan calculator |
| Car Loan | car loan calculator | auto loan calculator, car payment calculator |
| Credit Card Payoff | credit card payoff calculator | credit card interest calculator, pay off credit card calculator |

### Content blocks (required on every page)
Each calculator page needs **400–600 words** of supporting content below the tool:
1. "How to use this calculator" (short, 3-step)
2. "How [X] interest works" (explain the formula in plain English)
3. "What is a good [X] rate?" (current market rates — update quarterly)
4. FAQ section with 4–5 questions using FAQ schema markup

### FAQ Schema example (add to every page)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How is a monthly loan payment calculated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Monthly payments are calculated using the amortization formula: M = P × [r(1+r)^n] / [(1+r)^n - 1], where P is the principal, r is the monthly interest rate, and n is the number of payments."
      }
    }
  ]
}
</script>
```

### Technical SEO checklist
- [ ] `sitemap.xml` listing all calculator URLs
- [ ] `robots.txt` allowing all crawlers
- [ ] Canonical tags on every page
- [ ] Mobile-responsive (Google mobile-first indexing)
- [ ] Page speed score > 90 on PageSpeed Insights
- [ ] Core Web Vitals: LCP < 2.5s, CLS < 0.1, FID < 100ms
- [ ] Internal linking: every calculator links to 2–3 related calculators
- [ ] HTTPS (Cloudflare handles this)
- [ ] Implement cookie consent banner (required for AdSense in EEA/UK)
- [ ] Ensure all interactive elements are keyboard-navigable and have ARIA attributes for accessibility

### Link building (Month 2–3)
- Submit to free tool directories: AlternativeTo, ProductHunt, ToolFinder
- Guest post on personal finance blogs with a link back to the mortgage calculator
- Answer questions on Reddit r/personalfinance and r/financialindependence (no spamming — genuine help, link in bio)
- List on GitHub "awesome-tools" lists if you open-source the code

---

## 9. Monetisation Setup

### Step 1 — Google AdSense

**Requirements before applying:**
- Site live with at least 5–10 pages of content
- Privacy Policy page present (required)
- Site has been live for at least 2–4 weeks
- No copyrighted content, no placeholder text

**Ad placement strategy:**

| Position | Ad Unit | Notes |
|----------|---------|-------|
| Top of page (leaderboard) | 728×90 desktop / 320×50 mobile | Above calculator inputs |
| Mid-page (after results) | 336×280 rectangle | Highest CTR position |
| Bottom of page | Responsive unit | After content section |
| Sidebar (desktop only) | 300×600 half-page | If layout has sidebar |

**Important:** Do NOT place ads inside the calculator input area or results card. Google will reject or ban for policy violations.

**Expected RPM once approved:**
- First month: $5–$10 RPM (Google learning period)
- Month 3–6: $15–$30 RPM (finance niche premium kicks in)
- With US traffic focus: up to $40 RPM possible

---

### Step 2 — Affiliate Programs

Sign up for these (all free):

| Program | Product | Commission | Sign Up |
|---------|---------|------------|---------|
| LendingTree | Loan comparison | $15–$70 per lead | lendingtree.com/affiliate |
| Bankrate | Mortgage / loans | $20–$100 per lead | bankrate.com/partner |
| Credit Karma | Credit / loans | $5–$30 per lead | creditkarma.com/affiliate |
| LightStream | Personal loans | ~$50–$100 per funded loan | lightstream.com/partner |
| Capital One Auto | Car loans | Per application | Impact.com |
| Ally Bank | Savings / invest | Flat fee per open account | allybankaffiliate.com |

**Placement rules:**
- Mark all affiliate links with `rel="noopener sponsored"` (Google requirement)
- Add a one-sentence disclosure above affiliate CTAs: *"We may earn a commission if you apply through our links — at no cost to you."*
- Place affiliate CTA below results card, never above the calculator

---

### Step 3 — Optional: Lead-Gen Form (Month 3+)

Add a simple form after the mortgage/personal loan results:

```
"Want a personalised rate? Get matched with lenders."
[ First Name ] [ Email ] [ Loan Amount ] [ Credit Score range ]
[ Get My Rates → ]
```

Sell leads to a mortgage broker directly or route through LendingTree/Bankrate lead-gen API. Pays $85–$250 per qualified lead.

---

## 10. Analytics & Tracking

### Google Analytics 4 (GA4)

```html
<!-- Add to <head> of every page -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Events to track:**
```javascript
// Fire when user gets a result
gtag('event', 'calculator_used', {
  calculator_type: 'personal_loan',
  loan_amount: amount,
  loan_term_months: months
});

// Fire on affiliate link click
gtag('event', 'affiliate_click', {
  affiliate_name: 'LendingTree',
  calculator_type: 'personal_loan'
});
```

### Google Search Console
- Verify domain via Cloudflare DNS TXT record
- Submit `sitemap.xml`
- Monitor: Impressions, clicks, average position per page
- Check Core Web Vitals report weekly

### Key metrics to watch weekly
| Metric | Target (Month 6) |
|--------|-----------------|
| Monthly organic visitors | 25,000+ |
| Average session duration | > 90 seconds |
| Pages per session | > 1.8 |
| AdSense RPM | > $15 |
| Affiliate CTR | > 2% |

---

## 11. Launch Checklist

### Week 1 — Development
- [ ] Register domain on Namecheap
- [ ] Create GitHub repo (`loan-calculator` or site name)
- [ ] Connect repo to Cloudflare Pages
- [ ] Build `index.html` homepage with all calculator links
- [ ] Build Personal Loan Calculator (highest ROI for dev time)
- [ ] Build Compound Interest Calculator
- [ ] Build Simple Interest Calculator
- [ ] Add `privacy-policy.html` (required for AdSense — use a free generator like termly.io)
- [ ] Add `terms-of-service.html` with financial disclaimer
- [ ] Add `robots.txt` and `sitemap.xml`
- [ ] Add `favicon.ico`, `icon.svg`, and `apple-touch-icon.png`
- [ ] Test all calculators on mobile (Chrome DevTools)
- [ ] Run Lighthouse audit — fix any score below 85

### Week 2 — Content & SEO
- [ ] Write 400-word content blocks for each calculator page (total 8 calculators)
- [ ] Add FAQ schema to each page
- [ ] Add structured data (WebApplication schema)
- [ ] Add canonical tags and Open Graph meta tags (including `og:image`)
- [ ] Internal link all calculators to each other
- [ ] Build remaining 5 calculators (total 8 for Phase 1)
- [ ] Submit sitemap to Google Search Console
- [ ] Apply for Google AdSense

### Week 3 — Monetisation
- [ ] Apply for LendingTree affiliate program
- [ ] Apply for Bankrate affiliate program
- [ ] Add affiliate CTAs to mortgage and personal loan pages (tasteful, one CTA per page)
- [ ] Add AdSense code once approved (usually 2–4 weeks after applying)
- [ ] Set up GA4 event tracking for calculator use + affiliate clicks

### Week 4 — Distribution
- [ ] Post to r/personalfinance (share the tool, add genuine value)
- [ ] Submit to ProductHunt
- [ ] Submit to AlternativeTo.net
- [ ] Tweet about launch (even small reach helps indexing)
- [ ] Email 2–3 personal finance bloggers — offer it as a free embeddable tool for their readers

---

## 12. Growth Roadmap

### Month 1–2: Foundation
- All 8 calculators live
- AdSense approved and showing ads
- 2 affiliate programs active
- Google indexing all pages
- Expected traffic: 0–2,000/month
- Expected revenue: $0–$30

### Month 3–4: SEO Traction
- Start seeing long-tail keyword traffic
- Update content with current rate data (boosts freshness signal)
- Add 4 Phase 2 calculators: investment return, retirement, debt-to-income, refinance break-even
- Expected traffic: 5,000–15,000/month
- Expected revenue: $75–$450

### Month 5–6: Scaling
- Switch AdSense to Ezoic (requires 10K sessions/month) — can 2x RPM
- Add lead-gen form to mortgage calculator
- Start link-building: 2 guest posts on finance blogs per month
- Expected traffic: 20,000–50,000/month
- Expected revenue: **$500–$1,500/month**

### Month 9–12: Optimise & Expand
- A/B test affiliate CTA placement with Google Optimize
- Add calculator embedding widget (other sites embed your calculator → backlinks + traffic)
- Expand to Spanish-language versions (`/es/calculadora-de-prestamo`) — underserved market
- Expected traffic: 80,000–200,000/month
- Expected revenue: **$2,000–$6,000/month**

---

## 13. Cost Summary

| Item | Cost | Frequency |
|------|------|-----------|
| Domain name (.com) | ~$13 | Annual |
| Cloudflare Pages hosting | $0 | Monthly |
| GitHub (public repo) | $0 | Monthly |
| Tailwind CSS CDN | $0 | Monthly |
| Chart.js CDN | $0 | Monthly |
| Google Analytics | $0 | Monthly |
| Google AdSense | $0 (revenue share) | — |
| Affiliate programs | $0 (commission only) | — |
| Ezoic (Month 6+) | Revenue share (~10%) | Monthly |
| **Total Year 1** | **~$13** | |

**There is virtually no upfront cost beyond the domain name.**

---

## Quick Start Commands

```bash
# 1. Clone/init the repo
mkdir loan-calculator && cd loan-calculator
git init
git remote add origin https://github.com/YOUR_USERNAME/loan-calculator.git

# 2. Create base files
touch index.html personal-loan-calculator.html compound-interest-calculator.html
touch mortgage-calculator.html car-loan-calculator.html
touch privacy-policy.html robots.txt sitemap.xml
mkdir -p css js img

# 3. Push to GitHub (Cloudflare Pages picks it up automatically)
git add .
git commit -m "Initial commit"
git push -u origin main
```

---

*Plan created: April 2026 | Based on market research from SimilarWeb, Semrush, Ahrefs, and AdSense community data.*
