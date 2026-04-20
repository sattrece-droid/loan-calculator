let chart = null;

function calculateCarLoan() {
  const vehiclePrice = parseFloat(document.getElementById("vehiclePrice").value) || 0;
  const downPayment  = parseFloat(document.getElementById("downPayment").value) || 0;
  const tradeInValue = parseFloat(document.getElementById("tradeInValue").value) || 0;
  const salesTaxRate = parseFloat(document.getElementById("salesTax").value) / 100 || 0;
  const interestRate = parseFloat(document.getElementById("interestRate").value) / 100 || 0;
  const loanTerm     = parseInt(document.getElementById("loanTerm").value) || 0;

  // Calculate actual loan amount
  const taxableAmount = vehiclePrice - downPayment - tradeInValue;
  const salesTax      = taxableAmount * salesTaxRate;
  const principal     = taxableAmount + salesTax;

  if (principal <= 0 || interestRate <= 0 || loanTerm <= 0) {
    document.getElementById("loanAmount").textContent = fmt(0);
    document.getElementById("monthlyPayment").textContent = fmt(0);
    document.getElementById("totalInterest").textContent = fmt(0);
    document.getElementById("totalCost").textContent = fmt(0);
    if (chart) chart.destroy();
    return;
  }

  const monthlyRate = interestRate / 12;
  const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) /
                         (Math.pow(1 + monthlyRate, loanTerm) - 1);
  const totalPayment  = monthlyPayment * loanTerm;
  const totalInterest = totalPayment - principal;
  const totalVehicleCost = vehiclePrice + totalInterest + salesTax - tradeInValue;

  document.getElementById("loanAmount").textContent = fmt(principal);
  document.getElementById("monthlyPayment").textContent = fmt(monthlyPayment);
  document.getElementById("totalInterest").textContent = fmt(totalInterest);
  document.getElementById("totalCost").textContent = fmt(totalVehicleCost);

  renderCarLoanChart(principal, totalInterest, salesTax, downPayment + tradeInValue);
}

function renderCarLoanChart(principal, interest, tax, paidUpfront) {
  const ctx = document.getElementById("carLoanChart").getContext("2d");
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Principal", "Interest", "Sales Tax", "Paid Upfront"],
      datasets: [{
        data: [principal, interest, tax, paidUpfront],
        backgroundColor: ["#1e3a8a", "#10b981", "#f59e0b", "#6366f1"],
        borderWidth: 0,
        hoverOffset: 6
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
        tooltip: {
          callbacks: {
            label: ctx => ` ${ctx.label}: ${fmt(ctx.raw)}`
          }
        }
      }
    }
  });
}

// Run on load
calculateCarLoan();