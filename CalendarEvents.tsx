'use client';

import { useEffect, useState } from 'react';
import ARNavigator from './ARNavigator';

interface CalendarEvent {
  id: string;
  title: string;
  location: string;
  startTime: string;
  endTime: string;
  description: string;
}

export default function CalendarEvents() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchEvents();
  }, []);

  const checkAuth = () => {
    // Check if user is authenticated (has access token cookie)
    fetch('/api/events')
      .then(res => {
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(() => setIsAuthenticated(false));
  };

  const handleAuth = async () => {
    try {
      const res = await fetch('/api/auth');
      const data = await res.json();
      
      if (data.error) {
        setError(data.message || data.error);
        return;
      }
      
      if (data.authUrl) {
        window.location.href = data.authUrl;
      } else {
        setError('Failed to get authentication URL');
      }
    } catch (err) {
      setError('Failed to initiate authentication. Please check your Google OAuth setup.');
    }
  };
  
  const useDemoMode = () => {
    // Demo mode with sample meeting rooms
    const demoEvents: CalendarEvent[] = [
      {
        id: 'demo-1',
        title: 'Team Standup',
        location: 'Conference Room A',
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 3600000).toISOString(),
        description: 'Daily team standup meeting'
      },
      {
        id: 'demo-2',
        title: 'Client Presentation',
        location: 'Meeting Room 301',
        startTime: new Date(Date.now() + 7200000).toISOString(),
        endTime: new Date(Date.now() + 10800000).toISOString(),
        description: 'Quarterly business review'
      },
      {
        id: 'demo-3',
        title: 'Design Review',
        location: 'Creative Space B',
        startTime: new Date(Date.now() + 14400000).toISOString(),
        endTime: new Date(Date.now() + 18000000).toISOString(),
        description: 'UI/UX design discussion'
      }
    ];
    setEvents(demoEvents);
    setIsAuthenticated(true);
    setLoading(false);
  };

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/events');
      
      if (res.status === 401) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      
      if (!res.ok) {
        throw new Error('Failed to fetch events');
      }
      
      const data = await res.json();
      setEvents(data.events || []);
      setIsAuthenticated(true);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch calendar events');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="p-4 sm:p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Google Calendar AR Navigation</h2>
        <p className="mb-3 sm:mb-4 text-sm sm:text-base text-gray-600">
          Connect your Google Calendar to navigate to meeting rooms using AR.
        </p>
        
        {error && (
          <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 font-semibold mb-2 text-sm sm:text-base">⚠️ Setup Required</p>
            <p className="text-yellow-700 text-xs sm:text-sm mb-2">{error}</p>
            <p className="text-yellow-700 text-xs sm:text-sm">
              To use Google Calendar, you need to set up OAuth credentials. 
              See <code className="bg-yellow-100 px-1 rounded">SETUP_ENV.md</code> for instructions.
            </p>
          </div>
        )}
        
        <div className="space-y-3">
          <button
            onClick={handleAuth}
            className="w-full px-4 sm:px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 font-semibold text-sm sm:text-base touch-manipulation"
          >
            Sign in with Google
          </button>
          
          <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-xs sm:text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          
          <button
            onClick={useDemoMode}
            className="w-full px-4 sm:px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 active:bg-green-800 font-semibold text-sm sm:text-base touch-manipulation"
          >
            🎮 Try Demo Mode (No Setup Required)
          </button>
          <p className="text-xs text-gray-500 text-center px-2">
            Demo mode lets you test the AR navigation feature with sample meeting rooms
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">Loading calendar events...</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">No Upcoming Meetings</h2>
        <p className="text-gray-600">
          You don't have any meetings with room locations scheduled for today.
        </p>
        <button
          onClick={fetchEvents}
          className="mt-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3 sm:space-y-4">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h2 className="text-xl sm:text-2xl font-bold">Today's Meetings</h2>
          <button
            onClick={fetchEvents}
            className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-200 rounded-lg hover:bg-gray-300 active:bg-gray-400 touch-manipulation"
          >
            Refresh
          </button>
        </div>
        
        {events.map((event) => (
          <div
            key={event.id}
            className="p-3 sm:p-4 bg-white rounded-lg shadow-md border border-gray-200"
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-2">{event.title}</h3>
            <div className="space-y-1 text-sm sm:text-base text-gray-600">
              <p>
                <span className="font-medium">Location:</span> {event.location || 'No location'}
              </p>
              <p>
                <span className="font-medium">Time:</span> {formatTime(event.startTime)} - {formatTime(event.endTime)}
              </p>
            </div>
            {event.location && (
              <button
                onClick={() => setSelectedEvent(event)}
                className="mt-3 sm:mt-4 w-full px-4 sm:px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 font-semibold flex items-center justify-center gap-2 text-sm sm:text-base touch-manipulation"
              >
                <span>🧭</span>
                Navigate with AR
              </button>
            )}
          </div>
        ))}
      </div>

      {selectedEvent && (
        <ARNavigator
          targetLocation={selectedEvent.location}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </>
  );
}

