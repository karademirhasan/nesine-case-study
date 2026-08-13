import "./styles.scss";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import BetsTable from "./components/BetsTable";
import {Provider} from "react-redux";
import {store} from "@/redux/store";
import Cart from "@/components/Cart";
declare function Choose(props: any): any;
const App = () => {
    const queryClient = new QueryClient()

    return (
        <div className="app">
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <BetsTable />
                    <Cart />
                </QueryClientProvider>
            </Provider>
        </div>
    );
}

export default App;