function fmt(n) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', minimumFractionDigits: 2
  }).format(n);
}

function pct(n) {
  return n.toFixed(1) + '%';
}