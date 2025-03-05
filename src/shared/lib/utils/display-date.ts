export const displayDate = (date: string) => {
  const dateObject = new Date(date)

  return `${dateObject.getDate().toString().padStart(2, '0')}.${(
    dateObject.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}.${dateObject.getFullYear()}`
}
