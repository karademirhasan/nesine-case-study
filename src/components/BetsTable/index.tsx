import {useQuery} from "@tanstack/react-query";
import {getBets} from "@/service";
import {QUERY_KEYS} from "@/constant";


// @ts-ignore
import ImageLoading from "@/assets/images/loading.gif"

import './styles.scss'
import {
    BETS_TABLE_COLuMNS, IBetsTableColumns
} from "@/components/BetsTable/constant";
import {CSSProperties, Fragment, useRef} from "react";
import {useVirtualizer} from "@tanstack/react-virtual";
import BetsTableRow from "@/components/BetsTable/components/BetsTableRow";

declare let itemBetColumn: IBetsTableColumns
declare let indexBetColumn: number

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
        count: dataBets?.length ?? 0,
        getScrollElement: () => containerRef.current,
        estimateSize: () => 100,
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
                                    <For each='itemBetColumn' index='indexBetColumn' of={BETS_TABLE_COLuMNS}>
                                        <Fragment key={indexBetColumn}>
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
                                        </Fragment>
                                    </For>
                                </div>
                            </div>
                            <div className="bets-table-body"
                                 style={{
                                     '--total-height': `${dataBetsVirtualizer.getTotalSize()}px`
                                 } as CSSProperties}>
                                <For each='virtualItemBet' of={dataBetsVirtualizer.getVirtualItems()}>
                                    <Fragment key={virtualItemBet.index}>
                                        <With itemBet={dataBets[virtualItemBet.index]}>
                                            <BetsTableRow
                                                dataBet={itemBet}
                                                rowStart={virtualItemBet.start}
                                                rowSize={virtualItemBet.size}/>
                                        </With>
                                    </Fragment>
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