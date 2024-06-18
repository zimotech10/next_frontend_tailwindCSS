export const formatAddress = (address: string | undefined): string => {
  if (!address) return "";
  const start = address.slice(0, 6);
  const end = address.slice(-5);
  return `${start}....${end}`;
};
