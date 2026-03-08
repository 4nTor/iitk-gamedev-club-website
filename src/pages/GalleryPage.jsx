import Card from '../components/Card';
import SectionHeader from '../components/SectionHeader';
import { galleryImages } from '../utils/content';

const GalleryPage = () => {
  return (
    <div>
      <SectionHeader title="Gallery" subtitle="Snapshots from workshops, game jams, and showcases." />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {galleryImages.map(([src, alt]) => (
          <Card key={src} className="p-2">
            <img src={src} alt={alt} loading="lazy" className="h-64 w-full rounded-xl object-cover" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;