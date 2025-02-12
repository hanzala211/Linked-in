export const isoToLocalDate = (data: string | number | undefined) => {
  const date = new Date(data || "")
  const formatDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })
  return formatDate
}