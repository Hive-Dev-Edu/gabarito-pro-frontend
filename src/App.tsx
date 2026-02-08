import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </GoogleOAuthProvider>
    );
}

export default App;
