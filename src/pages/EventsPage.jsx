import Card from '../components/Card';
import SectionHeader from '../components/SectionHeader';

const EventsPage = () => {
  return (
    <div>
      <SectionHeader title="Events" />
      <Card className="text-center">
        <p className="text-2xl font-semibold text-white">Coming Soon!</p>
      </Card>
    </div>
  );
};

export default EventsPage;
