export const calculateOrderTotal = (orderId, products = [], currentSymbol) => {
  if (!products || !Array.isArray(products)) return 0;

  return products
    .filter((product) => Number(product.order) === Number(orderId))
    .reduce((sum, product) => {
      const price = product.price?.find((p) => p.symbol === currentSymbol);
      return sum + (price ? price.value : 0);
    }, 0);
};

export const getOrderProductsCount = (orderId, products = []) => {
  if (!products || !Array.isArray(products)) return 0;

  return products.filter((product) => Number(product.order) === Number(orderId))
    .length;
};

export const formatDate = (dateString) => {
  if (!dateString) return { short: "", full: "-", compact: "-" };

  const normalizedDateStr = dateString.includes("T")
    ? dateString
    : dateString.replace(" ", "T");
  const date = new Date(normalizedDateStr);

  if (isNaN(date.getTime()))
    return { short: dateString, full: dateString, compact: dateString };

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

 const monthsEn = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

  return {
    short: `${day} / ${month}`,
    full: `${day} / ${monthsEn[date.getMonth()]} / ${year}`,
    compact: `${day} / ${month} / ${year}`,
  };
};
