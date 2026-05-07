let chart = null;

function calculateCreditCardPayoff() {
  const currentBalance = parseFloat(document.getElementById("currentBalance").value) || 0;
  const apr            = parseFloat(document.getElementById("apr").value) / 100 || 0;
  const monthlyPayment = parseFloat(document.getElementById("monthlyPayment").value) || 0;
  const minPayment     = parseFloat(document.getElementById("minPayment").value) || 0;

  const monthlyRate = apr / 12;

  let monthsToPayoff = 0;
  let totalInterestPaid = 0;
  let balance = currentBalance;
  const payments = [];
  const dates = [];

  const startDate = new Date();

  if (currentBalance <= 0 || monthlyPayment <= 0 || monthlyPayment <= (currentBalance * monthlyRate)) {
    document.getElementById("monthsToPayoff").textContent = 0;
    document.getElementById("totalInterestPaid").textContent = fmt(0);
    document.getElementById("payoffDate").textContent = "-";
    document.getElementById("minPaymentComparison").classList.add("hidden");
    if (chart) chart.destroy();
    return;
  }

  while (balance > 0 && monthsToPayoff < 1200) { // Max 100 years to prevent infinite loop
    const interestForMonth = balance * monthlyRate;
    const principalPaid = monthlyPayment - interestForMonth;

    balance -= principalPaid;
    totalInterestPaid += interestForMonth;
    monthsToPayoff++;

    payments.push(Math.max(0, balance));
    dates.push(new Date(startDate.getFullYear(), startDate.getMonth() + monthsToPayoff, 1).toLocaleDateString("en-US", { year: "numeric", month: "short" }));

    if (balance <= 0) {
      balance = 0;
      break;
    }
  }

  const payoffDate = new Date(startDate.getFullYear(), startDate.getMonth() + monthsToPayoff, 1);

  document.getElementById("monthsToPayoff").textContent = monthsToPayoff;
  document.getElementById("totalInterestPaid").textContent = fmt(totalInterestPaid);
  document.getElementById("payoffDate").textContent = payoffDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  // Minimum payment comparison
  if (minPayment > 0 && monthlyPayment > minPayment) {
    // Guard: if min payment can't cover interest, debt never clears — show warning
    if (minPayment <= currentBalance * monthlyRate) {
      document.getElementById("minPayoffMonths").textContent = "Never (payment too low)";
      document.getElementById("interestSaved").textContent = "-";
      document.getElementById("minPaymentComparison").classList.remove("hidden");
    } else {
      let minPayoffMonths = 0;
      let minTotalInterestPaid = 0;
      let minBalance = currentBalance;

      while (minBalance > 0 && minPayoffMonths < 1200) {
        const interestForMonth = minBalance * monthlyRate;
        const principalPaid = minPayment - interestForMonth;

        minBalance -= principalPaid;
        minTotalInterestPaid += interestForMonth;
        minPayoffMonths++;

        if (minBalance <= 0) {
          minBalance = 0;
          break;
        }
      }
      document.getElementById("minPayoffMonths").textContent = `${minPayoffMonths} months`;
      document.getElementById("interestSaved").textContent = fmt(minTotalInterestPaid - totalInterestPaid);
      document.getElementById("minPaymentComparison").classList.remove("hidden");
    }
  } else {
    document.getElementById("minPaymentComparison").classList.add("hidden");
  }

  renderPayoffChart(dates, payments);
}

function renderPayoffChart(labels, data) {
  const ctx = document.getElementById("payoffChart").getContext("2d");
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Remaining Balance",
          data: data,
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
            text: "Date"
          },
          ticks: {
            autoSkip: true,
            maxRotation: 0,
            minRotation: 0,
            maxTicksLimit: 10
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
calculateCreditCardPayoff();