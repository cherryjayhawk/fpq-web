const monthFormatter = new Intl.DateTimeFormat('id-ID', { month: 'long' });

export function dateFormatter(dt) {
  const dateObj = new Date(dt);

  const year = dateObj.getFullYear();
  const month = monthFormatter.format(dateObj);
  const day = dateObj.getDate();

  const hour = dateObj.getHours();
  const minute = dateObj.getMinutes();

  return `${day} ${month} ${year}, ${hour}:${minute} WIB`;
}
