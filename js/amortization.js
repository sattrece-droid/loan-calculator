
function calculateAmortization() {
  const loanAmount    = parseFloat(document.getElementById("loanAmount").value) || 0;
  const interestRate  = parseFloat(document.getElementById("interestRate").value) / 100 || 0;
  const loanTermYears = parseInt(document.getElementById("loanTermYears").value) || 0;
  const extraPayment  = parseFloat(document.getElementById("extraPayment").value) || 0;

  const loanTermMonths = loanTermYears * 12;
  const monthlyRate = interestRate / 12;

  let monthlyPayment = 0;
  if (loanAmount > 0 && interestRate > 0 && loanTermMonths > 0) {
    monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths)) /
                     (Math.pow(1 + monthlyRate, loanTermMonths) - 1);
  } else if (loanAmount > 0 && loanTermMonths > 0) {
    monthlyPayment = loanAmount / loanTermMonths; // 0% interest
  }

  let currentBalance = loanAmount;
  let totalInterestPaid = 0;
  let monthsTaken = 0;
  let totalPaymentsMade = 0;
  let amortizationData = [];

  const initialMonthlyPayment = monthlyPayment;

  for (let month = 1; currentBalance > 0 && monthsTaken <= loanTermMonths + 1000; month++) { // +1000 to prevent infinite loop on edge cases
    let interestForMonth = currentBalance * monthlyRate;
    let effectiveMonthlyPayment = monthlyPayment + extraPayment;

    // Cap at remaining balance + interest so we never overpay
    if (effectiveMonthlyPayment > currentBalance + interestForMonth) {
      effectiveMonthlyPayment = currentBalance + interestForMonth;
    }

    let principalForMonth = effectiveMonthlyPayment - interestForMonth;

    // Guard: if payment can't cover interest (negative amortization), all goes to interest
    if (principalForMonth < 0) {
      interestForMonth = effectiveMonthlyPayment;
      principalForMonth = 0;
    }

    currentBalance -= principalForMonth;
    totalInterestPaid += interestForMonth;
    totalPaymentsMade += effectiveMonthlyPayment;
    monthsTaken = month;

    amortizationData.push({
      month: month,
      payment: effectiveMonthlyPayment,
      extra: extraPayment,
      principal: principalForMonth,
      interest: interestForMonth,
      balance: Math.max(0, currentBalance) // Ensure balance doesn't go negative in display
    });

    if (Math.round(currentBalance * 100) / 100 <= 0.01) {
      currentBalance = 0; // Close to zero, consider it paid off
    }
  }

  const yearsSaved = loanTermYears - (monthsTaken / 12);
  const interestSaved = (initialMonthlyPayment * loanTermMonths) - totalInterestPaid;

  document.getElementById("monthlyPayment").textContent = fmt(initialMonthlyPayment);
  document.getElementById("totalInterest").textContent = fmt(totalInterestPaid);
  document.getElementById("yearsSaved").textContent = yearsSaved.toFixed(1);
  document.getElementById("interestSaved").textContent = fmt(Math.max(0, interestSaved));

  renderAmortizationTable(amortizationData);
}

function renderAmortizationTable(data) {
  const body = document.getElementById("amortBody");
  body.innerHTML = "";

  const cells = [
    ["px-3 py-2 text-gray-500",        r => r.month],
    ["px-3 py-2 text-right",           r => fmt(r.payment)],
    ["px-3 py-2 text-right text-emerald-600", r => fmt(r.extra)],
    ["px-3 py-2 text-right text-indigo-700",  r => fmt(r.principal)],
    ["px-3 py-2 text-right text-red-500",     r => fmt(r.interest)],
    ["px-3 py-2 text-right font-medium",      r => fmt(r.balance)],
  ];
  data.forEach(row => {
    const tr = document.createElement("tr");
    cells.forEach(([cls, val]) => {
      const td = document.createElement("td");
      td.className = cls;
      td.textContent = val(row);
      tr.appendChild(td);
    });
    body.appendChild(tr);
  });
}

function downloadCSV() {
  const loanAmount    = parseFloat(document.getElementById("loanAmount").value) || 0;
  const interestRate  = parseFloat(document.getElementById("interestRate").value) / 100 || 0;
  const loanTermYears = parseInt(document.getElementById("loanTermYears").value) || 0;
  const extraPayment  = parseFloat(document.getElementById("extraPayment").value) || 0;

  const loanTermMonths = loanTermYears * 12;
  const monthlyRate = interestRate / 12;

  let monthlyPayment = 0;
  if (loanAmount > 0 && interestRate > 0 && loanTermMonths > 0) {
    monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths)) /
                     (Math.pow(1 + monthlyRate, loanTermMonths) - 1);
  } else if (loanAmount > 0 && loanTermMonths > 0) {
    monthlyPayment = loanAmount / loanTermMonths;
  }

  let currentBalance = loanAmount;
  let amortizationData = [];

  for (let month = 1; currentBalance > 0 && month <= loanTermMonths + 1000; month++) {
    let interestForMonth = currentBalance * monthlyRate;
    let effectiveMonthlyPayment = monthlyPayment + extraPayment;

    if (effectiveMonthlyPayment > currentBalance + interestForMonth) {
      effectiveMonthlyPayment = currentBalance + interestForMonth;
    }

    let principalForMonth = effectiveMonthlyPayment - interestForMonth;

    if (principalForMonth < 0) {
      interestForMonth = effectiveMonthlyPayment;
      principalForMonth = 0;
    }

    currentBalance -= principalForMonth;

    amortizationData.push({
      month: month,
      payment: effectiveMonthlyPayment,
      extra: extraPayment,
      principal: principalForMonth,
      interest: interestForMonth,
      balance: Math.max(0, currentBalance)
    });
    if (Math.round(currentBalance * 100) / 100 <= 0.01) {
      currentBalance = 0;
    }
  }

  let csvContent = "Month,Payment,Extra Payment,Principal Paid,Interest Paid,Remaining Balance\n";
  amortizationData.forEach(row => {
    csvContent += `${row.month},${row.payment.toFixed(2)},${row.extra.toFixed(2)},${row.principal.toFixed(2)},${row.interest.toFixed(2)},${row.balance.toFixed(2)}\n`;
  });

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  if (link.download !== undefined) { // feature detection
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "amortization_schedule.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// Run on load
calculateAmortization();