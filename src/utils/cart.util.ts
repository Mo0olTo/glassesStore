export const calculateTotal = (items: any[]) => {
  return items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
};