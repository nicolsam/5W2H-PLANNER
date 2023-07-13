function formatDate(date: any) {
    if (!date) return null;

    // Extract the date portion using the toISOString() method
    return date.toISOString().split('T')[0];
}

export function formatToBrazil(dateString: string) {
    const formattedDate = `${dateString}T03:00:00.000Z`;
    return formattedDate;
}

export function extractDateAndFormatToBrazil(date: string) {

    if(!date) return

    const extractedDate = date.split('T')[0];

    return convertDateFormat(extractedDate);


}

function convertDateFormat(dateString: string) {
    // Split the input date string into year, month, and day
    const [year, month, day] = dateString.split('-');

    // Create a new date string in the 'day-month-year' format
    const newDateString = `${day}/${month}/${year}`;

    return newDateString;
}

export default formatDate;
