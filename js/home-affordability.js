function calculateAffordability() {
  const annualIncome    = parseFloat(document.getElementById("annualIncome").value) || 0;
  const monthlyDebt     = parseFloat(document.getElementById("monthlyDebt").value) || 0;
  const downPayment     = parseFloat(document.getElementById("downPayment").value) || 0;
  const mortgageRate    = parseFloat(document.getElementById("mortgageRate").value) / 100 || 0;
  const loanTermYears   = parseInt(document.getElementById("loanTerm").value) || 0;
  const propertyTaxRate = parseFloat(document.getElementById("propertyTaxRate").value) / 100 || 0;
  const annualInsurance = parseFloat(document.getElementById("annualInsurance").value) || 0;

  const monthlyIncome = annualIncome / 12;
  const loanTermMonths = loanTermYears * 12;
  const monthlyRate = mortgageRate / 12;

  // 28% Rule: Housing expenses should not exceed 28% of gross monthly income
  const maxMonthlyHousing28 = monthlyIncome * 0.28;
  // 36% Rule: Total debt payments (housing + other debts) should not exceed 36% of gross monthly income
  const maxTotalDebt36 = monthlyIncome * 0.36;

  // Calculate maximum loan amount based on maxMonthlyHousing28
  let maxLoanAmount28 = 0;
  if (mortgageRate > 0 && loanTermMonths > 0) {
    maxLoanAmount28 = maxMonthlyHousing28 * (Math.pow(1 + monthlyRate, loanTermMonths) - 1) /
                      (monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths));
  } else if (loanTermMonths > 0) {
    maxLoanAmount28 = maxMonthlyHousing28 * loanTermMonths;
  }

  // Account for property tax and insurance in max monthly housing payment
  const monthlyPropertyTax = (annualIncome * propertyTaxRate) / 12; // Simplified: based on income for affordability
  const monthlyInsurance = annualInsurance / 12;

  // Adjust max loan amount based on these fixed costs
  const adjustedMaxMonthlyHousing28 = maxMonthlyHousing28 - monthlyPropertyTax - monthlyInsurance;
  let maxLoanAmount28Adjusted = 0;
  if (mortgageRate > 0 && loanTermMonths > 0) {
    maxLoanAmount28Adjusted = adjustedMaxMonthlyHousing28 * (Math.pow(1 + monthlyRate, loanTermMonths) - 1) /
                              (monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths));
  } else if (loanTermMonths > 0) {
    maxLoanAmount28Adjusted = adjustedMaxMonthlyHousing28 * loanTermMonths;
  }


  // Calculate max loan amount based on maxTotalDebt36 (PITI + other debts)
  const maxMonthlyDebtPayment36 = maxTotalDebt36 - monthlyDebt;
  let maxLoanAmount36 = 0;
  if (mortgageRate > 0 && loanTermMonths > 0) {
    maxLoanAmount36 = (maxMonthlyDebtPayment36 - monthlyPropertyTax - monthlyInsurance) * (Math.pow(1 + monthlyRate, loanTermMonths) - 1) /
                      (monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths));
  } else if (loanTermMonths > 0) {
    maxLoanAmount36 = (maxMonthlyDebtPayment36 - monthlyPropertyTax - monthlyInsurance) * loanTermMonths;
  }

  // Combine with down payment to get max home price
  const maxHomePrice28 = (maxLoanAmount228Adjusted > 0 ? maxLoanAmount28Adjusted : 0) + downPayment;
  const maxHomePrice36 = (maxLoanAmount36 > 0 ? maxLoanAmount36 : 0) + downPayment;

  const finalMaxHomePrice28 = Math.max(0, maxHomePrice28);
  const finalMaxHomePrice36 = Math.max(0, maxHomePrice36);

  // Recommended range is the lower of the two rules
  const recommendedMaxPrice = Math.min(finalMaxHomePrice28, finalMaxHomePrice36);
  const recommendedMinPrice = (recommendedMaxPrice * 0.8).toFixed(0); // A common heuristic for a range

  // Debt-to-Income Ratio (DTI)
  const estimatedMonthlyMortgage = (finalMaxHomePrice28 - downPayment > 0 && mortgageRate > 0 && loanTermMonths > 0) ?
                                   (finalMaxHomePrice28 - downPayment) * (monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths)) /
                                   (Math.pow(1 + monthlyRate, loanTermMonths) - 1) : 0;
  const totalMonthlyDebt = estimatedMonthlyMortgage + monthlyPropertyTax + monthlyInsurance + monthlyDebt;
  const dtiRatio = (totalMonthlyDebt / monthlyIncome) * 100;


  document.getElementById("maxHomePrice28").textContent = fmt(finalMaxHomePrice28);
  document.getElementById("maxHomePrice36").textContent = fmt(finalMaxHomePrice36);
  document.getElementById("recommendedRange").textContent = `${fmt(recommendedMinPrice)} - ${fmt(recommendedMaxPrice)}`;
  document.getElementById("dtiRatio").textContent = pct(Math.min(100, dtiRatio)); // Cap at 100% for display
}

// Run on load
calculateAffordability();