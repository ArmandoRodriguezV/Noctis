export function timeAgo(timestamp: number): string {
    const now = Date.now();
    const diff = now - timestamp;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) {
        return `Hace ${seconds} segundo${seconds !== 1 ? "s" : ""}`;
    }

    if (minutes < 60) {
        return `Hace ${minutes} minuto${minutes !== 1 ? "s" : ""}`;
    }

    if (hours < 24) {
        return `Hace ${hours} hora${hours !== 1 ? "s" : ""}`;
    }

    if (days < 30) {
        return `Hace ${days} día${days !== 1 ? "s" : ""}`;
    }

    if (months < 12) {
        return `Hace ${months} mes${months !== 1 ? "es" : ""}`;
    }

    return `Hace ${years} año${years !== 1 ? "s" : ""}`;
}