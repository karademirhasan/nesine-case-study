import "./styles.scss";
import {QueryClientProvider, QueryClient, useQuery} from "@tanstack/react-query";
import {getBets} from "./service";
import BetsTable from "./components/BetsTable";
declare function Choose(props: any): any;
const App = () => {
    const queryClient = new QueryClient()

    return (
        <div className="app">
            <QueryClientProvider client={queryClient}>
                <BetsTable />
            </QueryClientProvider>
        </div>
    );
}

export default App;