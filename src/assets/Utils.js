export const Tools = {
    Fahrenheit2Celsius : (degree) => {
        return Math.round((degree - 32) * 5/9);
    },
    Mile2Km : (distance) => {
        return distance * 1,609;
    }
}
