import api from "../api";

export interface IBet {
    C:    string;
    N:    string;
    TYPE: string;
    NID:  string;
    D:    string;
    T:    string;
    DAY:  string;
    S:    string;
    LN:   string;
    IMF:  boolean;
    OCG:  any;
    HEC:  boolean;
}

export const getBets = async ()=> {
    try {
        const response = await api.get('/bets')
        return response
    } catch (error) {
        console.error(error)
    }
}
