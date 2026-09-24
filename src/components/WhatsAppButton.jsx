import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl, generalEnquiryMessage } from "../utils/whatsapp";

/**
 * Reusable WhatsApp click-to-chat button.
 *
 * variant: "solid" (filled pill, with label) | "icon" (circular icon-only) | "outline"
 * size: "sm" | "md" | "lg"
 */
export default function WhatsAppButton({
  message,
  variant = "solid",
  size = "md",
  label = "Chat on WhatsApp",
  className = "",
  fullWidth = false,
}) {
  const href = buildWhatsAppUrl(message || generalEnquiryMessage());

  const sizes = {
    sm: "text-sm px-3.5 py-2 gap-1.5",
    md: "text-sm px-5 py-3 gap-2",
    lg: "text-base px-7 py-3.5 gap-2.5",
  };

  const iconSizes = { sm: "h-4 w-4", md: "h-4.5 w-4.5", lg: "h-5 w-5" };

  if (variant === "icon") {
    const iconBox = { sm: "h-9 w-9", md: "h-11 w-11", lg: "h-13 w-13" };
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className={`inline-flex items-center justify-center rounded-full bg-whatsapp text-white shadow-soft transition-colors hover:bg-whatsapp-dark ${iconBox[size]} ${className}`}
      >
        <MessageCircle className={iconSizes[size]} fill="currentColor" strokeWidth={0} />
      </a>
    );
  }

  if (variant === "outline") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center rounded-full border-2 border-whatsapp font-semibold text-whatsapp transition-colors hover:bg-whatsapp hover:text-white ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      >
        <MessageCircle className={iconSizes[size]} fill="currentColor" strokeWidth={0} />
        {label}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-full bg-whatsapp font-semibold text-white shadow-soft transition-colors hover:bg-whatsapp-dark ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
    >
      <MessageCircle className={iconSizes[size]} fill="currentColor" strokeWidth={0} />
      {label}
    </a>
  );
}
