import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import TeamPage from './pages/TeamPage';
import RenderMondaysPage from './pages/RenderMondaysPage';
import EventsPage from './pages/EventsPage';
import LearningPage from './pages/LearningPage';
import BlogPage from './pages/BlogPage';
import GalleryPage from './pages/GalleryPage';
import SponsorsPage from './pages/SponsorsPage';
import ContactPage from './pages/ContactPage';
import GamePlayerPage from './pages/GamePlayerPage';

const App = () => {
  return (
    <div className="min-h-screen bg-ink text-slate-100">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/rendermondays" element={<RenderMondaysPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/learning" element={<LearningPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/sponsors" element={<SponsorsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/play/:slug" element={<GamePlayerPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;