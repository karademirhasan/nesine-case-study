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
            const selectedBet = action?.payload;
            const existsBet: any = state?.bets?.find((bet: ICartBet) => bet.NID === selectedBet.bet?.NID);

            const addBet = () => {
                const newBet: ICartBet = {
                    NID: selectedBet.bet.NID,
                    MBS: selectedBet.bet?.OCG?.[selectedBet.betGroup]?.MBS,
                    match: selectedBet.bet.N,
                    code: selectedBet.bet.C,
                    odds: selectedBet.bet?.OCG?.[selectedBet.betGroup]?.OC[selectedBet.betSelection]?.O,
                    betGroup: selectedBet.betGroup,
                    betSelection: selectedBet.betSelection,
                }
                state.bets.push(newBet);
            }
            const removeBet = () => {
                state.bets = state?.bets.filter((bet) => bet.NID !== selectedBet.bet?.NID);
            }

            const isSameBet = existsBet?.betGroup === selectedBet.betGroup && existsBet?.betSelection === selectedBet.betSelection

            if (existsBet) {
                if (isSameBet) {
                    removeBet()
                } else {
                    removeBet()
                    addBet()
                }
            } else {
                addBet()
            }
        }
    }
})

export const { updateBet } = betsSlice.actions;
export default betsSlice.reducer