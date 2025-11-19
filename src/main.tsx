import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '@/store';
import '@/styles/index.scss';
import App from '@/components/App';

if (!document.getElementById('root')) {
  const rootDiv = document.createElement('div');
  rootDiv.id = 'root';
  document.body.appendChild(rootDiv);
  console.log('Root element not found. Created a new one.');
}

/**
 * Application entry point.
 * Creates a React root and renders the App component in StrictMode.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
