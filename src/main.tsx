import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from "./App";
import { QueryProvider } from './lib/react-query/QueryProvider';
// CONTEXTS PROVIDERS
import AuthProvider from './context/AuthContext';
import DialogProvider from './context/DialogContext';


const domNode = document.getElementById('root')!;
const root = createRoot(domNode);

root.render(
    <BrowserRouter>
        <QueryProvider>
            <AuthProvider>
                <DialogProvider>
                    <App />
                </DialogProvider>
            </AuthProvider>
        </QueryProvider>
    </BrowserRouter>
);
