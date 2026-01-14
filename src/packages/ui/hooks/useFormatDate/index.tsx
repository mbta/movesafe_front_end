function useFormattedDate() {
    const formatDate = (dateString?: string): string => {
        const date = dateString ? new Date(dateString) : new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    const formatDateTime = (dateString?: string): string => {
        const date = dateString ? new Date(dateString) : new Date();
        const offset = -4 * 60; // Boston GMT-4 
        const localTime = date.getTime();
        const localOffset = date.getTimezoneOffset() * 60000;
        const utc = localTime + localOffset;
        const newDate = new Date(utc + (60000 * offset));

        const year = newDate.getFullYear();
        const month = String(newDate.getMonth() + 1).padStart(2, '0');
        const day = String(newDate.getDate()).padStart(2, '0');
        const hours = newDate.getHours();
        const minutes = String(newDate.getMinutes()).padStart(2, '0');
        const period = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;

        return `${month}/${day}/${year} ${formattedHours}:${minutes} ${period}`;
    };

    function formatSlashDate(dateStr: string): string {
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    }
    
    function formatAmPmTime(dateStr: string): string {
        const date = new Date(dateStr);
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; 
        const minutesStr = String(minutes).padStart(2, '0');
        return `${hours}:${minutesStr} ${ampm}`;
    }

    return { formatDate, formatDateTime, formatSlashDate, formatAmPmTime };
}

export default useFormattedDate;