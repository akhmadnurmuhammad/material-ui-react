export const addAuth = (data) => (
    {
        type: "ADD",
        payload: data
    }
);

export const delAuth = (data) => (
    {
        type: "DEL",
        payload: data
    }
);