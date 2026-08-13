import {useQuery} from "@tanstack/react-query";
import {getBets} from "@/service";
import {QUERY_KEYS} from "@/constant";


import ImageLoading from '@/assets/images/loading.gif'

import './styles.scss'
import {BETS_TABLE_COLuMNS} from "@/components/BetsTable/constant";
import {Fragment, useRef} from "react";
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


    const rowVirtualizer = useVirtualizer({
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
                            <div className="bets-table-body" style={{
                                height: `${rowVirtualizer.getTotalSize()}px`,
                                position: "relative",
                            }}>
                                <For each='virtualItemBet' of={rowVirtualizer.getVirtualItems()}>
                                    <With itemBet={dataBets[virtualItemBet.index]}>
                                        <div
                                            className='bets-table-row-group'
                                             key={itemBet.NID}
                                             style={{
                                                 height: `${virtualItemBet.size * 2}px`,
                                                 transform: `translateY(${virtualItemBet.start * 2}px)`,
                                             }}>
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
                                                <div className='bets-table-cell'>{itemBet?.['OCG']?.[1]?.['MBS']}</div>
                                                <div className='bets-table-cell'>{itemBet?.['OCG']?.[1]?.['OC']?.[0]?.['O']}</div>
                                                <div className='bets-table-cell'>{itemBet?.['OCG']?.[1]?.['OC']?.[1]?.['O']}</div>
                                                <div className='bets-table-cell'></div>
                                                <div className='bets-table-cell'>{itemBet?.['OCG']?.[5]?.['OC']?.[25]?.['O']}</div>
                                                <div className='bets-table-cell'>{itemBet?.['OCG']?.[5]?.['OC']?.[26]?.['O']}</div>
                                                <div className='bets-table-cell'></div>
                                                <div className='bets-table-cell'></div>
                                                <div className='bets-table-cell'></div>
                                                <div className='bets-table-cell'></div>
                                                <div className='bets-table-cell'></div>
                                                <div className='bets-table-cell'>{itemBet?.['OCG']?.[2]?.['OC']?.[3]?.['O']}</div>
                                                <div className='bets-table-cell'>{itemBet?.['OCG']?.[2]?.['OC']?.[4]?.['O']}</div>
                                                <div className='bets-table-cell'>{itemBet?.['OCG']?.[2]?.['OC']?.[5]?.['O']}</div>
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