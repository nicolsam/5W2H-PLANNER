function formatDate(date: any) {
    if (!date) return null;

    // Extract the date portion using the toISOString() method
    return date.toISOString().split('T')[0];
}

export function formatToBrazil(dateString: string) {
    const formattedDate = `${dateString}T03:00:00.000Z`;
    return formattedDate;
}

export default formatDate;
