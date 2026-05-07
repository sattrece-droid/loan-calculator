let chart = null;

function calculateCompound() {
  const principal    = parseFloat(document.getElementById("principal").value) || 0;
  const rate         = parseFloat(document.getElementById("rate").value) / 100 || 0;
  const years        = parseFloat(document.getElementById("years").value) || 0;
  const n            = parseInt(document.getElementById("frequency").value) || 12; // compounds/year
  const contribution = parseFloat(document.getElementById("contribution").value) || 0;

  // A = P(1 + r/n)^(nt) + PMT * [((1 + r/n)^(nt) - 1) / (r/n)]
  const exp        = Math.pow(1 + rate / n, n * years);
  const futureP    = principal * exp;
  const futureC    = contribution * ((exp - 1) / (rate / n));
  const total      = futureP + futureC;
  const totalContr = principal + contribution * 12 * years;
  const earned     = total - totalContr;

  document.getElementById("finalBalance").textContent  = fmt(total);
  document.getElementById("totalContrib").textContent  = fmt(totalContr);
  document.getElementById("interestEarned").textContent = fmt(earned);

  renderYearlyChart(principal, rate, n, years, contribution);
}

function renderYearlyChart(principal, rate, n, years, contribution) {
  const labels = [];
  const dataPoints = [];

  for (let i = 0; i <= years; i++) {
    labels.push(`Year ${i}`);
    // Use the exact FV formula for each year so chart matches the summary results
    const exp = Math.pow(1 + rate / n, n * i);
    const yearBalance = (rate === 0)
      ? principal + contribution * n * i
      : principal * exp + contribution * ((exp - 1) / (rate / n));
    dataPoints.push(yearBalance);
  }

  const ctx = document.getElementById("compoundChart").getContext("2d");
  
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Balance",
          data: dataPoints,
          borderColor: "#1e3a8a",
          backgroundColor: "#1e3a8a",
          fill: false,
          tension: 0.1
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: "Year"
          }
        },
        y: {
          title: {
            display: true,
            text: "Balance ($)"
          },
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return fmt(value);
            }
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || "";
              if (label) {
                label += ": ";
              }
              label += fmt(context.raw);
              return label;
            }
          }
        }
      }
    }
  });
}

// Run on load
calculateCompound();