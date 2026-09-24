export default function LoadingSpinner({ className = "", size = "md" }) {
  const sizes = { sm: "h-5 w-5 border-2", md: "h-8 w-8 border-[3px]", lg: "h-12 w-12 border-4" };
  return (
    <div className={`flex items-center justify-center ${className}`} role="status" aria-label="Loading">
      <div className={`animate-spin rounded-full border-gold-200 border-t-gold-500 ${sizes[size]}`} />
    </div>
  );
}
