/**
 * Indian Currency and Measurement Formatters
 */

// Formats number to Indian Currency string (e.g. ₹30,00,000)
export const formatINR = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  const rounded = Math.round(Number(amount));
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(rounded);
};

// Formats in Indian words (e.g. ₹35 Lakhs, ₹1.45 Cr)
export const formatCompactINR = (amount) => {
  if (!amount || isNaN(amount)) return '₹0';
  const val = Number(amount);
  if (val >= 10000000) {
    const cr = (val / 10000000).toFixed(2);
    return `₹${cr.replace(/\.00$/, '')} Cr`;
  }
  if (val >= 100000) {
    const lakh = (val / 100000).toFixed(2);
    return `₹${lakh.replace(/\.00$/, '')} Lakh`;
  }
  if (val >= 1000) {
    return `₹${(val / 1000).toFixed(1)}k`;
  }
  return formatINR(val);
};

// Formats area with commas and sq.ft suffix
export const formatSqFt = (area) => {
  if (!area) return '0 sq.ft';
  const num = Number(area);
  return `${new Intl.NumberFormat('en-IN').format(num)} sq.ft`;
};

// Automatic Land Cost calculation: Total Area in Sq. Ft. × Price Per Sq. Ft.
export const calculateLandCost = (areaSqFt, pricePerSqFt) => {
  const area = Number(areaSqFt) || 0;
  const price = Number(pricePerSqFt) || 0;
  return area * price;
};

// Converts sq.ft to Odisha measurement units (1 Guntha ≈ 1,089 sq.ft, 1 Decimal ≈ 435.6 sq.ft)
export const getOdishaLandMetrics = (sqFt) => {
  const num = Number(sqFt) || 0;
  const guntha = (num / 1089).toFixed(2);
  const decimal = (num / 435.6).toFixed(2);
  const acres = (num / 43560).toFixed(3);
  return {
    guntha: `${guntha} Guntha`,
    decimal: `${decimal} Dec`,
    acres: num >= 20000 ? `${acres} Acre` : null,
  };
};

// Generates unique IDs
export const generateReferenceId = (prefix = 'LH') => {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${year}-${rand}`;
};
