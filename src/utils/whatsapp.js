import { WHATSAPP_NUMBER } from "./config";

/**
 * Builds a wa.me click-to-chat URL with a pre-filled message.
 * @param {string} message
 * @param {string} [number] override the default configured number
 */
export function buildWhatsAppUrl(message, number = WHATSAPP_NUMBER) {
  const digitsOnly = String(number).replace(/[^\d]/g, "");
  const params = new URLSearchParams({ text: message });
  return `https://wa.me/${digitsOnly}?${params.toString()}`;
}

export function carEnquiryMessage(car, { fromDate, toDate } = {}) {
  const name = car?.name || "your car";
  if (fromDate && toDate) {
    return `Hi, I am interested in renting the ${name} from ${fromDate} to ${toDate}. Please confirm availability and price.`;
  }
  return `Hi, I am interested in renting the ${name}. Please share the availability and rental details.`;
}

export function generalEnquiryMessage() {
  return "Hi, I would like to know more about your car rental services.";
}
