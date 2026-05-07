let chart = null;

function calculateMortgage() {
  const homePrice    = parseFloat(document.getElementById("homePrice").value) || 0;
  const downPayment  = parseFloat(document.getElementById("downPayment").value) || 0;
  const loanTermYears = parseInt(document.getElementById("loanTerm").value) || 0;
  const interestRate = parseFloat(document.getElementById("interestRate").value) / 100 || 0;
  const propertyTaxAnnual = parseFloat(document.getElementById("propertyTax").value) || 0;
  const homeInsuranceAnnual = parseFloat(document.getElementById("homeInsurance").value) || 0;
  const hoaFeesMonthly = parseFloat(document.getElementById("hoaFees").value) || 0;
  let pmiRate = parseFloat(document.getElementById("pmiRate").value) / 100 || 0;

  const loanAmount = homePrice - downPayment;
  const loanTermMonths = loanTermYears * 12;

  let monthlyPrincipalInterest = 0;
  if (loanAmount > 0 && interestRate > 0 && loanTermMonths > 0) {
    const monthlyRate = interestRate / 12;
    monthlyPrincipalInterest = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths)) /
                               (Math.pow(1 + monthlyRate, loanTermMonths) - 1);
  } else if (loanAmount > 0 && loanTermMonths > 0) {
    // If interest rate is 0, simple division
    monthlyPrincipalInterest = loanAmount / loanTermMonths;
  }

  const monthlyTax = propertyTaxAnnual / 12;
  const monthlyInsurance = homeInsuranceAnnual / 12;

  // Calculate PMI only if down payment is less than 20%
  let monthlyPMI = 0;
  if (downPayment < homePrice * 0.2) {
    monthlyPMI = (loanAmount * pmiRate) / 12;
  }

  const totalMonthlyPayment = monthlyPrincipalInterest + monthlyTax + monthlyInsurance + monthlyPMI + hoaFeesMonthly;
  const totalInterestPaid = (monthlyPrincipalInterest * loanTermMonths) - loanAmount;
  const totalPITI = monthlyPrincipalInterest + monthlyTax + monthlyInsurance + monthlyPMI;

  document.getElementById("monthlyPayment").textContent = fmt(totalMonthlyPayment);
  document.getElementById("totalInterest").textContent = fmt(Math.max(0, totalInterestPaid)); // Ensure non-negative
  document.getElementById("totalPITI").textContent = fmt(totalPITI);
  document.getElementById("monthlyTax").textContent = fmt(monthlyTax);
  document.getElementById("monthlyInsurance").textContent = fmt(monthlyInsurance);
  document.getElementById("monthlyPMI").textContent = fmt(monthlyPMI);
  document.getElementById("monthlyHOA").textContent = fmt(hoaFeesMonthly);

  renderMortgageChart(monthlyPrincipalInterest, monthlyTax, monthlyInsurance, monthlyPMI, hoaFeesMonthly);
}

function renderMortgageChart(principalInterest, tax, insurance, pmi, hoa) {
  const ctx = document.getElementById("mortgageChart").getContext("2d");
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Principal & Interest", "Property Tax", "Home Insurance", "PMI", "HOA Fees"],
      datasets: [{
        data: [principalInterest, tax, insurance, pmi, hoa],
        backgroundColor: ["#1e3a8a", "#10b981", "#f59e0b", "#ef4444", "#6366f1"],
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
calculateMortgage();