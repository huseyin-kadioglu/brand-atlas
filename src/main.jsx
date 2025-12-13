import { StrictMode } from 'react';
// createRoot yerine hydrateRoot'u import edin
import { createRoot, hydrateRoot } from 'react-dom/client'; 
import './index.css';
import App from './App.jsx';

// Root elementi al
const rootElement = document.getElementById('root');

if (rootElement.hasChildNodes()) {
  // Pre-render edilmiş statik HTML üzerine olay dinleyicilerini ekler
  hydrateRoot(
    rootElement,
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  // Geleneksel istemci tarafı renderlama
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

// React-snap'in çalışması için App'i dışa aktarmaya devam edin
export { App };