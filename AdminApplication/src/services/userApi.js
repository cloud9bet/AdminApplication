import { Api } from "../apiService";

//alt logges lige nu men skal ændres til at return stuff når de er testet

export async function GetAllUserDepositAsync() {
    try {
        const response = await Api.get(`/deposit`);
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.error(error.message);
        return false;
    }
}

export async function GetAllUserTransactionAsync() {
    try {
        const response = await Api.get(`/User/transaction`); // skal ændres  med (User/transaction)
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.error(error.message);
        return false;
    }

}
