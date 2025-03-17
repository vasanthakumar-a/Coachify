import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./routes";

import { Provider } from "react-redux";
import store from "./redux/store";

const queryClient = new QueryClient();

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    </Provider>
  );
}
