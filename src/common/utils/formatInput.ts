export const formatToCart = (value: string) => {
  return value.replace(/(\d{4})/g, "$1-").slice(0, 19);
};

export const formatToMoney = (value: string) => {
  // Format input as 3 digits from right separated by ","
  const sanitizedInput = value.replace(/[^0-9]/g, "");
  const length = sanitizedInput.length;

  if (length <= 3) {
    return sanitizedInput;
  }

  const formattedValue =
    sanitizedInput.slice(0, length % 3 || 3) +
    sanitizedInput.slice(length % 3 || 3).replace(/(\d{3})/g, ",$1");

  return formattedValue;
};
