import {useQuery} from "@tanstack/react-query";
import {getBets} from "@/service";
import {QUERY_KEYS} from "@/constant";


import ImageLoading from '@/assets/images/loading.gif'

import './styles.scss'

const BetsTable = () => {

    const {data: dataBets, isLoading: isLoadingBets} = useQuery({
        queryKey: [QUERY_KEYS.GET_BETS],
        queryFn: getBets
    })

    return (
        <div className='page-bets-table'>
            <Choose>
                <When condition={isLoadingBets}>
                    <div className='loading'>
                        <img src={ImageLoading} alt='loading' />
                    </div>
                </When>
                <Otherwise>
                    <div className="bets-table">
                        <table>
                            <thead>
                            <tr>

                            </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                </Otherwise>
            </Choose>

        </div>
    )
}

export default BetsTable;