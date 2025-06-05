import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./features/counter/store.ts";

const container = document.getElementById("root");

if (container) {
    const root = createRoot(container);

    root.render(
        <Provider store={store}>
            <StrictMode>
                <App />
            </StrictMode>
        </Provider>,
    );
} else {
    throw new Error(
        "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
    );
}

// createRoot(document.getElementById("root")!).render(
//     <StrictMode>
//         <App />
//     </StrictMode>,
// );
