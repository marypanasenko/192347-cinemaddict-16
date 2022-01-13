import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
export const toTimeFormat = (minutes) => dayjs.duration(minutes, 'minutes').format('H[h] mm[min]');
export const toDateFormat = (date) => dayjs(date).format('DD MMMM YYYY');
export const toDateAndTimeFormat = (date) => dayjs(date).format('YYYY/MM/DD HH:mm');
