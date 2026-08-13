import './styles.scss'
import {useMemo} from "react";
import {ICartBet} from "@/redux/types";
import {useAppSelector} from "@/redux/hooks";


declare let bet: any

const Cart = () => {
    const { bets } = useAppSelector((state: any) => state.betsSlice)

    const totalAmount = useMemo(() => {
        if (!bets.length) return 0;

        return bets.reduce((acc: number, bet: ICartBet) => {
            return bet.odds * acc
        }, 1).toFixed(2)
    }, [bets])
    return (
        <div className="cart">
            <If condition={bets?.length > 0}>
                <div className="list-bets">
                    <For each='bet' of={bets}>
                        <div className='item-bet'>
                            <span>{bet.MBS}</span>
                            <span>Kod: {bet.code}</span>
                            <span>Maç: {bet.match}</span>
                            <strong>Oran: {bet.odds}</strong>
                        </div>
                    </For>
                </div>
            </If>
            <div className="total">
                Toplam Tutar: <strong>{totalAmount}</strong> TL
            </div>
        </div>
    )
}

export default Cart