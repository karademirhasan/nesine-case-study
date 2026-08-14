import {CSSProperties, Fragment, memo, useCallback} from "react";
import {
    BETS_ODDS_GROUPS,
    BETS_TABLE_COLuMNS, DOUBLE_CHANCE_SELECTIONS, IBetsTableColumns,
    MATCH_RESULT_SELECTIONS,
    OVER_UNDER_SELECTIONS
} from "@/components/BetsTable/constant";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {updateBet} from "@/redux/slices/betsSlice";
import classNames from "classnames";
import {ICartBet} from "@/redux/types";

interface Props {
    dataBet: any
    rowStart: number
    rowSize: number
}
declare let itemBetColumn: IBetsTableColumns
declare let indexBetColumn: number

const BetsTableRow = memo(({ dataBet, rowStart = 0, rowSize = 0 } : Props) => {
    const dispatch = useAppDispatch()

    const selectedBet = useAppSelector(state => state?.betsSlice?.bets?.find((bet: ICartBet) => bet?.NID === dataBet?.NID))

    const onClickBet = (bet: ICartBet, selectedBetOddsGroup: any, selectedBetSelection: any) => {
        const payload = {
            bet,
            betGroup: selectedBetOddsGroup,
            betSelection: selectedBetSelection
        }
        dispatch(updateBet(payload))
    }

    const isSelectedOdds = (betGroup: any, betSelection: any, ) => {
        return selectedBet && selectedBet?.betGroup === betGroup && selectedBet?.betSelection === betSelection
    }
    return (
        <div
            className='bets-table-row-group'
            key={dataBet?.NID}
            style={{
                "--row-top": `${rowStart}px`,
                "--row-height": `${rowSize}px`,
            } as CSSProperties}>
            <div className='bets-table-row'>
                <For each='itemBetColumn' index='indexBetColumn' of={BETS_TABLE_COLuMNS}>
                    <Fragment key={indexBetColumn}>
                        <Choose>
                            <When condition={itemBetColumn.field === 'name'}>
                                <div
                                    className='bets-table-cell cell-match-name'>{dataBet?.D} {dataBet?.LN}</div>
                            </When>
                            <Otherwise>
                                <div className='bets-table-cell'>{itemBetColumn.title}</div>
                            </Otherwise>
                        </Choose>
                    </Fragment>
                </For>
            </div>
            <div className='bets-table-row'>
                <div className='bets-table-cell cell-match-name'>
                    <strong>{dataBet?.C}</strong>
                    <span>{dataBet?.T}</span>
                    <span>{dataBet?.N}</span>
                </div>
                <div className='bets-table-cell'>Yorumlar</div>
                <div
                    className={classNames('bets-table-cell')}>{dataBet?.OCG?.[BETS_ODDS_GROUPS.MATCH_RESULT]?.MBS}</div>

                <div
                    className={classNames('bets-table-cell cell-odds', { 'cell-selected': isSelectedOdds(BETS_ODDS_GROUPS.MATCH_RESULT, MATCH_RESULT_SELECTIONS.HOME) })}
                    onClick={() => onClickBet(dataBet, BETS_ODDS_GROUPS.MATCH_RESULT, MATCH_RESULT_SELECTIONS.HOME)}
                >
                    {dataBet?.OCG?.[BETS_ODDS_GROUPS.MATCH_RESULT]?.OC?.[MATCH_RESULT_SELECTIONS.HOME]?.O}
                </div>

                <div
                    className={classNames('bets-table-cell cell-odds', { 'cell-selected': isSelectedOdds(BETS_ODDS_GROUPS.MATCH_RESULT, MATCH_RESULT_SELECTIONS.DRAW) })}
                    onClick={() => onClickBet(dataBet, BETS_ODDS_GROUPS.MATCH_RESULT, MATCH_RESULT_SELECTIONS.DRAW)}
                >
                    {dataBet?.OCG?.[BETS_ODDS_GROUPS.MATCH_RESULT]?.OC?.[MATCH_RESULT_SELECTIONS.DRAW]?.O}
                </div>
                <div className='bets-table-cell'></div>
                <div
                    className={classNames('bets-table-cell cell-odds', { 'cell-selected': isSelectedOdds(BETS_ODDS_GROUPS.OVER_UNDER, OVER_UNDER_SELECTIONS.UNDER) })}
                    onClick={() => onClickBet(dataBet, BETS_ODDS_GROUPS.OVER_UNDER, OVER_UNDER_SELECTIONS.UNDER)}
                >
                    {dataBet?.OCG?.[BETS_ODDS_GROUPS.OVER_UNDER]?.OC?.[OVER_UNDER_SELECTIONS.UNDER]?.O}</div>
                <div
                    className={classNames('bets-table-cell cell-odds', { 'cell-selected': isSelectedOdds(BETS_ODDS_GROUPS.OVER_UNDER, OVER_UNDER_SELECTIONS.OVER) })}
                    onClick={() => onClickBet(dataBet, BETS_ODDS_GROUPS.OVER_UNDER, OVER_UNDER_SELECTIONS.OVER)}
                >
                    {dataBet?.OCG?.[BETS_ODDS_GROUPS.OVER_UNDER]?.OC?.[OVER_UNDER_SELECTIONS.OVER]?.O}</div>
                <div className='bets-table-cell'></div>
                <div className='bets-table-cell'></div>
                <div className='bets-table-cell'></div>
                <div className='bets-table-cell'></div>
                <div className='bets-table-cell'></div>
                <div
                    className={classNames('bets-table-cell cell-odds', { 'cell-selected': isSelectedOdds(BETS_ODDS_GROUPS.DOUBLE_CHANCE, DOUBLE_CHANCE_SELECTIONS.HOME_OR_DRAW) })}
                    onClick={() => onClickBet(dataBet, BETS_ODDS_GROUPS.DOUBLE_CHANCE, DOUBLE_CHANCE_SELECTIONS.HOME_OR_DRAW)}
                >{dataBet?.OCG?.[BETS_ODDS_GROUPS.DOUBLE_CHANCE]?.OC?.[DOUBLE_CHANCE_SELECTIONS.HOME_OR_DRAW]?.O}</div>
                <div
                    className={classNames('bets-table-cell cell-odds', { 'cell-selected': isSelectedOdds(BETS_ODDS_GROUPS.DOUBLE_CHANCE, DOUBLE_CHANCE_SELECTIONS.HOME_OR_AWAY) })}
                    onClick={() => onClickBet(dataBet, BETS_ODDS_GROUPS.DOUBLE_CHANCE, DOUBLE_CHANCE_SELECTIONS.HOME_OR_AWAY)}
                >{dataBet?.OCG?.[BETS_ODDS_GROUPS.DOUBLE_CHANCE]?.OC?.[DOUBLE_CHANCE_SELECTIONS.HOME_OR_AWAY]?.O}</div>
                <div
                    className={classNames('bets-table-cell cell-odds', { 'cell-selected': isSelectedOdds(BETS_ODDS_GROUPS.DOUBLE_CHANCE, DOUBLE_CHANCE_SELECTIONS.DRAW_OR_AWAY) })}
                    onClick={() => onClickBet(dataBet, BETS_ODDS_GROUPS.DOUBLE_CHANCE, DOUBLE_CHANCE_SELECTIONS.DRAW_OR_AWAY)}
                >{dataBet?.OCG?.[BETS_ODDS_GROUPS.DOUBLE_CHANCE]?.OC?.[DOUBLE_CHANCE_SELECTIONS.DRAW_OR_AWAY]?.O}</div>
                <div className='bets-table-cell'></div>
                <div className='bets-table-cell'></div>
                <div className='bets-table-cell'></div>
            </div>
        </div>
    )
})

export default BetsTableRow