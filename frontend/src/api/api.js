
export const suggest = async (userInput) => {
    return fetch('/suggest', {
        method: 'POST',
        body: JSON.stringify(userInput),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((response) => {
        if(response.status !== 200) {
            throw Error('Unable to fetch data!');
        }
        return response.json();
    });
};

export const weeklyTrend = async () => {

    return fetch('/weeklytrend', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
};