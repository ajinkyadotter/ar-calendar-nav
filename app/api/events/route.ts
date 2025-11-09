import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

async function getAccessToken(request: NextRequest): Promise<string | null> {
  const accessToken = request.cookies.get('access_token')?.value;
  if (accessToken) return accessToken;
  
  // Try to refresh token
  const refreshToken = request.cookies.get('refresh_token')?.value;
  if (!refreshToken) return null;
  
  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        refresh_token: refreshToken,
        client_id: clientId!,
        client_secret: clientSecret!,
        grant_type: 'refresh_token',
      }),
    });
    
    const tokens = await tokenResponse.json();
    return tokens.access_token || null;
  } catch (error) {
    console.error('Token refresh error:', error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  const accessToken = await getAccessToken(request);
  
  if (!accessToken) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  
  try {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });
    
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    
    // Get current time and end of day
    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);
    
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: now.toISOString(),
      timeMax: endOfDay.toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });
    
    const events = response.data.items || [];
    
    // Extract meeting rooms from events
    const meetingRooms = events
      .filter(event => {
        const location = event.location || event.summary || '';
        // Check if event has a location that might be a room
        return location && (
          location.toLowerCase().includes('room') ||
          location.toLowerCase().includes('conference') ||
          location.toLowerCase().includes('meeting')
        );
      })
      .map(event => ({
        id: event.id,
        title: event.summary || 'Untitled Event',
        location: event.location || '',
        startTime: event.start?.dateTime || event.start?.date || '',
        endTime: event.end?.dateTime || event.end?.date || '',
        description: event.description || '',
      }));
    
    return NextResponse.json({ events: meetingRooms });
  } catch (error: any) {
    console.error('Calendar API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events', details: error.message },
      { status: 500 }
    );
  }
}

