import { format, formatDistanceToNow } from "date-fns";

export function getStartedDisplay(startedAt?: string, endAt?: string): string {
  if (!startedAt) return "Start time not available";

  const startedDate = new Date(startedAt);

  if (endAt) {
    return format(startedDate, "MMMM d, yyyy h:mm a"); // e.g. September 9, 2025 10:30 PM
  }

  return `Started ${formatDistanceToNow(startedDate, { addSuffix: true })}`; // e.g. Started 2 days ago
}
