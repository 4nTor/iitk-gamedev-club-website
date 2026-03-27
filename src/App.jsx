import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import GamesPage from './pages/GamesPage';
import TeamPage from './pages/TeamPage';
import EventsPage from './pages/EventsPage';
import LearningPage from './pages/LearningPage';
import BlogPage from './pages/BlogPage';
import GalleryPage from './pages/GalleryPage';
import GamePlayerPage from './pages/GamePlayerPage';

const App = () => {
  return (
    <div className="min-h-screen bg-ink text-slate-100">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/projects" element={<Navigate to="/games" replace />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/contact" element={<TeamPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/learning" element={<LearningPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/play/:slug" element={<GamePlayerPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;