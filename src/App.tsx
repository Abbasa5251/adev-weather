import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/layout";
import { ThemeProvider } from "./context/theme-provider";
import Dashboard from "./pages/dashboard";
import City from "./pages/city";
import { ReactQueryClientProvider } from "./context/query-client-provider";

function App() {
	return (
		<ReactQueryClientProvider>
			<BrowserRouter>
				<ThemeProvider defaultTheme="dark">
					<Layout>
						<Routes>
							<Route path="/" element={<Dashboard />} />
							<Route path="/city/:cityName" element={<City />} />
						</Routes>
					</Layout>
				</ThemeProvider>
			</BrowserRouter>
		</ReactQueryClientProvider>
	);
}

export default App;
