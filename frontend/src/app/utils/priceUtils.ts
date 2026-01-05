function roundUpFriendly(value: number) {
  // Round up to a friendly step: 10 for low values, 20 for mid, 50 for higher
  const step = value < 200 ? 10 : value < 500 ? 20 : 50;
  return Math.ceil(value / step) * step;
}

export function getPromoPricing(productId: string, basePrice: number) {
  // Deterministic pseudo-random discount between 10% and 30% based on product id
  const hash = Array.from(productId).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const targetDiscountPercent = 10 + (hash % 21); // 10..30 inclusive
  const multiplier = 1 - targetDiscountPercent / 100;

  // Compute target original, then round it up to a friendlier price point
  const targetOriginal = basePrice / multiplier;
  const originalPrice = roundUpFriendly(targetOriginal);

  // Recompute displayed discount to stay aligned to the rounded original, clamped to 10..30
  const computedDiscount = Math.round((1 - basePrice / originalPrice) * 100);
  const discountPercent = Math.min(30, Math.max(10, computedDiscount));

  return {
    originalPrice,
    discountPercent,
  };
}
