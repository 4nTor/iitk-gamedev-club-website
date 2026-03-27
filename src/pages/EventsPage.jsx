import { useEffect, useMemo, useState } from 'react';
import Card from '../components/Card';
import SectionHeader from '../components/SectionHeader';
import { fetchCsv } from '../utils/csv';

const EventsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchCsv('/data/events.csv')
      .then(setEvents)
      .catch((error) => console.error(error));
  }, []);

  const [upcomingEvents, pastEvents] = useMemo(() => {
    const now = new Date();
    const upcoming = [];
    const past = [];

    events.forEach((event) => {
      if (new Date(event.date) >= now) {
        upcoming.push(event);
      } else {
        past.push(event);
      }
    });

    upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));
    past.sort((a, b) => new Date(b.date) - new Date(a.date));

    return [upcoming, past];
  }, [events]);

  const renderEventCard = (event) => (
    <Card key={`${event.title}-${event.date}`}>
      <img src={event.image} alt={event.title} loading="lazy" className="mb-4 h-44 w-full rounded-xl object-cover" />
      <p className="text-sm text-accent">{new Date(event.date).toDateString()}</p>
      <h3 className="mt-2 text-lg font-semibold">{event.title}</h3>
      <p className="mt-2 text-sm text-slate-300">{event.description}</p>
    </Card>
  );

  return (
    <div className="space-y-12">
      <SectionHeader title="Events" subtitle="Workshops, showcases, game jams, talks, and club sessions across the year." />

      <section>
        <h2 className="mb-5 text-2xl font-semibold">Upcoming</h2>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{upcomingEvents.map(renderEventCard)}</div>
      </section>

      <section>
        <h2 className="mb-5 text-2xl font-semibold">Past</h2>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{pastEvents.map(renderEventCard)}</div>
      </section>
    </div>
  );
};

export default EventsPage;