export default class Authentication {
    constructor() {}

    static async loginAndData(url, userData) {
        return new Promise(async (resolve, reject) => {
            try {
                const returnedRes = await fetch(url, {
                    headers: {
                        "Content-type": "application/json",
                    },
                    method: "POST",
                    mode: "cors",
                    body: JSON.stringify(userData),
                });

                const returnedData = await returnedRes.json();
                if (returnedData) {
                    const finalUser = {
                        isLoggedIn: returnedData.isLoggedIn,
                        ...returnedData?.user,
                        token: returnedData?.token,
                    };
                    resolve(finalUser);
                } else {
                    const error = new Error("Logging in failed. please provide right data");
                    reject(error);
                }
            } catch (e) {
                reject(e);
            }
        });
    }

    static async signupAndData(url, userData) {
        return new Promise(async (resolve, reject) => {
            try {
                const returnedResponse = fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                });
                const returnedData = (await returnedResponse).json();

                if (returnedData) {
                    resolve(returnedData);
                } else {
                    const error = new Error("failed to register a user. Please provide correct data");
                    reject(error);
                }
            } catch (e) {
                reject(e);
            }
        });
    }
}
