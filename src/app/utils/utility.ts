export const formatDateLocal = (isoString: string) => {
  return new Date(isoString).toLocaleString() // format date in the current locale.
}