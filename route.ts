import { NextResponse } from 'next/server';

export async function GET() {
  // Google OAuth configuration
  const clientId = process.env.GOOGLE_CLIENT_ID;
  
  if (!clientId) {
    return NextResponse.json(
      { 
        error: 'Google OAuth not configured',
        message: 'Please set up GOOGLE_CLIENT_ID in your environment variables. See SETUP_ENV.md for instructions.'
      },
      { status: 500 }
    );
  }
  
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/auth/callback`;
  const scope = 'https://www.googleapis.com/auth/calendar.readonly';
  
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}&access_type=offline&prompt=consent`;
  
  return NextResponse.json({ authUrl });
}

