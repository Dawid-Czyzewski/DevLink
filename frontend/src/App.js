import Header from './components/Header';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <Header />
    </LanguageProvider>
  );
}

export default App;
