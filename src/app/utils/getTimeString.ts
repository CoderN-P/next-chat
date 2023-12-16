// Converts a UTC ISO date string into a string: "Today at 12:00 AM"

function getTimeString(date: string, useDate=true) {
    const utcDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const dateStr = utcDate.toLocaleDateString();
    const todayStr = today.toLocaleDateString();
    const yesterdayStr = yesterday.toLocaleDateString();

    if (!useDate) {
        // return just the time without seconds

        return utcDate.toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'});
    }

    if (dateStr === todayStr) {
        return `Today at ${utcDate.toLocaleTimeString()}`;
    } else if (dateStr === yesterdayStr) {
        return `Yesterday at ${utcDate.toLocaleTimeString()}`;
    } else {
        return `${dateStr} ${utcDate.toLocaleTimeString()}`;
    }
}

export default getTimeString;