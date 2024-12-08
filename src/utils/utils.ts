import { format, toZonedTime } from 'date-fns-tz';

export const formatToIndonesianTime = (date: string | Date): string => {
  const timeZone = 'Asia/Jakarta';
  const zonedTime = toZonedTime(new Date(date), timeZone);
  return format(zonedTime, 'dd MMM yyyy, HH:mm:ss', { timeZone });
};

export const getPolylineColor = (paymentType: string): string => {
  switch (paymentType) {
    case 'CSH': return 'green';
    case 'CRD': return 'blue';
    case 'NOC': return 'red';
    case 'DIS': return 'purple';
    default: return 'gray';
  }
};

export const getPaymentTypeLabel = (paymentType: string): string => {
  switch (paymentType) {
    case 'CRD': return 'Credit Card';
    case 'CSH': return 'Cash';
    case 'NOC': return 'No Charge';
    case 'DIS': return 'Dispute';
    default: return 'Unknown';
  }
};