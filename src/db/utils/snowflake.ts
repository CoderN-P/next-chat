// Generates snowflake ids

function generateSnowflake() {
    const epoch = 1546300800000;
    const time = Date.now() - epoch;
    const random = Math.floor(Math.random() * 1000);
    return ((time * 1000) + random).toString();
}

export {generateSnowflake};
