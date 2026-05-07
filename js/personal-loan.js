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
  document.getElementById('interestPct').textContent    = pct(totalInterest / amount * 100);

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