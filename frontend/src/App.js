import Header from './components/Header';
import Footer from './components/Footer';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {/* Main content will go here */}
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
