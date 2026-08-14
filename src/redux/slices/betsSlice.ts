import {createSlice, current} from "@reduxjs/toolkit";
import {ICartBet} from "@/redux/types";


const initialState: {
    bets: ICartBet[];
} = {
    bets: []
}

const betsSlice = createSlice({
    name: "betsSlice",
    initialState,
    reducers: {
        updateBet: (state, action) => {
            const {bet, betGroup, betSelection} = action.payload;

            const existsBetIndex = state.bets.findIndex(
                (item: ICartBet) => item.NID === bet.NID
            );

            const existsBet = state.bets[existsBetIndex];

            const isSameBet = existsBet?.betGroup === betGroup && existsBet?.betSelection === betSelection

            const newBet: ICartBet = {
                NID: bet.NID,
                MBS: bet?.OCG?.[betGroup]?.MBS,
                match: bet.N,
                code: bet.C,
                odds: bet?.OCG?.[betGroup]?.OC?.[betSelection]?.O,
                betGroup: betGroup,
                betSelection: betSelection,
            }

            if(existsBetIndex === -1) {
                state.bets.push(newBet);
            } else {
                if(isSameBet) {
                    state.bets.splice(existsBetIndex, 1);
                } else {
                    state.bets[existsBetIndex] = newBet;
                }
            }
        }
    }
})

export const { updateBet } = betsSlice.actions;
export default betsSlice.reducer