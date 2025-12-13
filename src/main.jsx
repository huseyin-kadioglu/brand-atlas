import { StrictMode } from 'react'
import { render, hydrate } from 'react-dom' // Değişiklik burada
import './index.css'
import App from './App.jsx'

// Root elementi al
const rootElement = document.getElementById('root');

if (rootElement.hasChildNodes()) {
  // Eğer kök elementi çocuk düğümlere sahipse (pre-render edilmiş HTML), hydrate kullan.
  // Bu, DOM'u tekrar oluşturmaz, sadece olay dinleyicilerini ekler.
  hydrate(
    <StrictMode>
      <App />
    </StrictMode>,
    rootElement
  );
} else {
  // Eğer kök elementi boşsa (geleneksel tarayıcı yüklemesi), render kullan.
  render(
    <StrictMode>
      <App />
    </StrictMode>,
    rootElement
  );
}

// React-snap'in uygulamanızı dışa aktararak erişebilmesi için gereklidir.
export { App };