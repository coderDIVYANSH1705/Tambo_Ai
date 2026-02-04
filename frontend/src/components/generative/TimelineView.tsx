import React from 'react';
import { Calendar, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/utils';

interface TimelineEvent {
  date: string;
  title: string;
  description?: string;
  type: 'deadline' | 'milestone' | 'renewal' | 'payment' | 'other';
  documentId?: string;
}

interface TimelineViewProps {
  title: string;
  events: TimelineEvent[];
  startDate?: string;
  endDate?: string;
}

export default function TimelineView({
  title,
  events,
}: TimelineViewProps) {
  const getEventColor = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'deadline':
        return 'bg-red-500';
      case 'milestone':
        return 'bg-blue-500';
      case 'renewal':
        return 'bg-yellow-500';
      case 'payment':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getEventIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'deadline':
        return <AlertCircle className="h-4 w-4" />;
      case 'renewal':
        return <Clock className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const isUpcoming = (date: string) => {
    const eventDate = new Date(date);
    const now = new Date();
    const daysUntil = Math.ceil(
      (eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysUntil >= 0 && daysUntil <= 60;
  };

  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

          {/* Events */}
          <div className="space-y-6">
            {sortedEvents.map((event, index) => (
              <div key={index} className="relative flex gap-4">
                {/* Timeline dot */}
                <div
                  className={cn(
                    'relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 border-background',
                    getEventColor(event.type)
                  )}
                >
                  <div className="text-white">{getEventIcon(event.type)}</div>
                </div>

                {/* Event content */}
                <div
                  className={cn(
                    'flex-1 rounded-lg border p-4 transition-all',
                    isUpcoming(event.date)
                      ? 'bg-yellow-50 border-yellow-200'
                      : 'bg-card'
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{event.title}</div>
                      {event.description && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {event.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {formatDate(event.date)}
                        </span>
                        <span
                          className={cn(
                            'text-xs px-2 py-0.5 rounded-full',
                            event.type === 'deadline' && 'bg-red-100 text-red-700',
                            event.type === 'milestone' && 'bg-blue-100 text-blue-700',
                            event.type === 'renewal' && 'bg-yellow-100 text-yellow-700',
                            event.type === 'payment' && 'bg-green-100 text-green-700',
                            event.type === 'other' && 'bg-gray-100 text-gray-700'
                          )}
                        >
                          {event.type}
                        </span>
                      </div>
                    </div>
                    {isUpcoming(event.date) && (
                      <div className="ml-4">
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full">
                          <AlertCircle className="h-3 w-3" />
                          Upcoming
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-sm text-muted-foreground">
          Showing {events.length} events
        </div>
      </CardContent>
    </Card>
  );
}
