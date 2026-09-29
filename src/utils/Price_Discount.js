export const calculateTotals = (cartItems) => {
  return cartItems.reduce(
    (acc, item) => {
      const price = Number(item.price) * Number(item.quantity) || 0;
      const discountAmount = price * (item.discount / 100) || 0;

      acc.totalMRP += price;
      acc.totalDiscount += discountAmount;

      return acc;
    },
    { totalMRP: 0, totalDiscount: 0 }
  );
};