import {useQuery} from "@tanstack/react-query";
import {getBets} from "@/service";
import {QUERY_KEYS} from "@/constant";


import ImageLoading from '@/assets/images/loading.gif'

import './styles.scss'
import {
    BETS_ODDS_GROUPS,
    BETS_TABLE_COLuMNS, DOUBLE_CHANCE_SELECTIONS,
    MATCH_RESULT_SELECTIONS,
    OVER_UNDER_SELECTIONS
} from "@/components/BetsTable/constant";
import {CSSProperties, Fragment, useRef} from "react";
import {useVirtualizer} from "@tanstack/react-virtual";

declare let itemBetColumn: {
    field: string
    title: string
}[]

declare let itemBet: any
declare let virtualItemBet: any




const BetsTable = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const {data: dataBets, isLoading: isLoadingBets} = useQuery({
        queryKey: [QUERY_KEYS.GET_BETS],
        queryFn: getBets,
        staleTime: 1000 * 60 * 5,
        select: (data) => data?.data,
        retry: 2,
        refetchOnWindowFocus: false,
    })


    const dataBetsVirtualizer = useVirtualizer({
        count: dataBets?.length,
        getScrollElement: () => containerRef.current,
        estimateSize: () => 50,
        overscan: 10,
    });

    return (
        <div className='page-bets-table'>
            <Choose>
                <When condition={isLoadingBets}>
                    <div className='loading'>
                        <img src={ImageLoading} alt='loading'/>
                    </div>
                </When>
                <Otherwise>
                    <div className="bets-table-container">
                        <div className="bets-table" ref={containerRef}>
                            <div className="bets-table-header">
                                <div className='bets-table-row'>
                                    <For each='itemBetColumn' of={BETS_TABLE_COLuMNS}>
                                        <Choose>
                                            <When condition={itemBetColumn.field === 'name'}>
                                                <div className='bets-table-cell cell-match-name'>
                                                    Event Count: {dataBets?.length}
                                                </div>
                                            </When>
                                            <Otherwise>
                                                <div className='bets-table-cell'>{itemBetColumn.title}</div>
                                            </Otherwise>
                                        </Choose>
                                    </For>
                                </div>
                            </div>
                            <div className="bets-table-body"
                                 style={{
                                '--total-height': `${dataBetsVirtualizer.getTotalSize()}px`
                            } as CSSProperties}>
                                <For each='virtualItemBet' of={dataBetsVirtualizer.getVirtualItems()}>
                                    <With itemBet={dataBets[virtualItemBet.index]}>
                                        <div
                                            className='bets-table-row-group'
                                            key={itemBet.NID}
                                            style={{
                                                "--row-top": `${virtualItemBet.start * 2}px`,
                                                "--row-height": `${virtualItemBet?.size * 2}px`,
                                            } as CSSProperties}>
                                            <div className='bets-table-row'>
                                                <For each='itemBetColumn' of={BETS_TABLE_COLuMNS}>
                                                    <Choose>
                                                        <When condition={itemBetColumn.field === 'name'}>
                                                            <div className='bets-table-cell cell-match-name'>{itemBet.D} {itemBet.LN}</div>
                                                        </When>
                                                        <Otherwise>
                                                            <div className='bets-table-cell'>{itemBetColumn.title}</div>
                                                        </Otherwise>
                                                    </Choose>
                                                </For>
                                            </div>
                                            <div className='bets-table-row'>
                                                <div className='bets-table-cell cell-match-name'>
                                                    <strong>{itemBet.C}</strong>
                                                    <span>{itemBet.T}</span>
                                                    <span>{itemBet.N}</span>
                                                </div>
                                                <div className='bets-table-cell'>Yorumlar</div>
                                                <div className='bets-table-cell'>{itemBet?.OCG?.[BETS_ODDS_GROUPS.MATCH_RESULT]?.MBS}</div>
                                                <div
                                                    className='bets-table-cell'>{itemBet?.OCG?.[BETS_ODDS_GROUPS.MATCH_RESULT]?.OC?.[MATCH_RESULT_SELECTIONS.HOME]?.O}</div>
                                                <div
                                                    className='bets-table-cell'>{itemBet?.OCG?.[BETS_ODDS_GROUPS.MATCH_RESULT]?.OC?.[MATCH_RESULT_SELECTIONS.DRAW]?.O}</div>
                                                <div className='bets-table-cell'></div>
                                                <div
                                                    className='bets-table-cell'>{itemBet?.OCG?.[BETS_ODDS_GROUPS.OVER_UNDER]?.OC?.[OVER_UNDER_SELECTIONS.UNDER]?.O}</div>
                                                <div
                                                    className='bets-table-cell'>{itemBet?.OCG?.[BETS_ODDS_GROUPS.OVER_UNDER]?.OC?.[OVER_UNDER_SELECTIONS.OVER]?.O}</div>
                                                <div className='bets-table-cell'></div>
                                                <div className='bets-table-cell'></div>
                                                <div className='bets-table-cell'></div>
                                                <div className='bets-table-cell'></div>
                                                <div className='bets-table-cell'></div>
                                                <div
                                                    className='bets-table-cell'>{itemBet?.OCG?.[BETS_ODDS_GROUPS.DOUBLE_CHANCE]?.OC?.[DOUBLE_CHANCE_SELECTIONS.HOME_OR_DRAW]?.O}</div>
                                                <div
                                                    className='bets-table-cell'>{itemBet?.OCG?.[BETS_ODDS_GROUPS.DOUBLE_CHANCE]?.OC?.[DOUBLE_CHANCE_SELECTIONS.HOME_OR_AWAY]?.O}</div>
                                                <div
                                                    className='bets-table-cell'>{itemBet?.OCG?.[BETS_ODDS_GROUPS.DOUBLE_CHANCE]?.OC?.[DOUBLE_CHANCE_SELECTIONS.DRAW_OR_AWAY]?.O}</div>
                                                <div className='bets-table-cell'></div>
                                                <div className='bets-table-cell'></div>
                                                <div className='bets-table-cell'></div>
                                            </div>
                                        </div>
                                    </With>
                                </For>
                            </div>
                        </div>
                    </div>
                </Otherwise>
            </Choose>

        </div>
    )
}

export default BetsTable;