import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./routes";
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";

import { Provider } from "react-redux";
import store from "./redux/store";

const queryClient = new QueryClient();

export default function App() {
  return (
    <Provider store={store}>
      <PrimeReactProvider value={{ unstyled: false, pt: Tailwind, ripple: true }}>
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
        </QueryClientProvider>
      </PrimeReactProvider>
    </Provider>
  );
}
