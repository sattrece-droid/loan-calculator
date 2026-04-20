function calculateSimpleInterest() {
  const principal = parseFloat(document.getElementById("principal").value) || 0;
  const rate      = parseFloat(document.getElementById("rate").value) / 100 || 0;
  const years     = parseFloat(document.getElementById("years").value) || 0;

  if (principal <= 0 || rate <= 0 || years <= 0) {
    document.getElementById("totalInterest").textContent = fmt(0);
    document.getElementById("finalBalance").textContent  = fmt(0);
    document.getElementById("interestPct").textContent    = pct(0);
    return;
  }

  // Simple Interest Formula: I = P * R * T
  const totalInterest = principal * rate * years;
  const finalBalance  = principal + totalInterest;
  const interestPct   = (totalInterest / principal) * 100;

  document.getElementById("totalInterest").textContent = fmt(totalInterest);
  document.getElementById("finalBalance").textContent  = fmt(finalBalance);
  document.getElementById("interestPct").textContent    = pct(interestPct);
}

// Run on load
calculateSimpleInterest();