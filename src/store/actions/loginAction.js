/* eslint-disable */
export const addLogin = (data) => {
    return {
        type: "ADD",
        payload: data
    };
}

export const delLogin = (data) => (
    {
        type: "DEL",
        payload: data
    }
);