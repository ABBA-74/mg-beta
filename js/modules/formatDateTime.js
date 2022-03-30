/////////////////////////////////////////////////////////////////////////
//////////// formatDateTime
export default function formatDateTime() {
  const dateToday = new Date();
  const dateTodayFr = dateToday.toLocaleDateString('fr-FR');
  const time = `${dateToday.getHours()}:${
    (dateToday.getMinutes() < 10 ? '0' : '') + dateToday.getMinutes()
  }`;
  return [dateTodayFr, time];
}
