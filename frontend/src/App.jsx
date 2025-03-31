import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./routes";
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";

import { Provider } from "react-redux";
import store from "./redux/store";

const queryClient = new QueryClient();

const getSubdomain = () => {
  const host = window.location.hostname; // e.g., "admin.localhost"
  const parts = host.split(".");
  if (parts.length > 1) {
    return parts[0]; // Extract "admin" from "admin.localhost"
  }
  return "home"; // Default to home
};


export default function App() {
  const subdomain = getSubdomain();

  return (
    <Provider store={store}>
      <PrimeReactProvider value={{ unstyled: false, pt: Tailwind, ripple: true }}>
        <QueryClientProvider client={queryClient}>
        {subdomain === "admin" ? <>ADMIN</> : <AppRoutes />}
        </QueryClientProvider>
      </PrimeReactProvider>
    </Provider>
  );
}
