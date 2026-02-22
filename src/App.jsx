import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import PackageDetail from './pages/PackageDetail';
import ProjectDetail from './pages/ProjectDetail';
import Contacts from './pages/Contacts';
import About from './pages/About';

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      <Header />
      <main className="flex-grow w-full overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/package/:id" element={<PackageDetail />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
      </div>
  );
}

export default App;
