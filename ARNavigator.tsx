'use client';

import { useEffect, useRef, useState } from 'react';

interface ARNavigatorProps {
  targetLocation: string;
  onClose: () => void;
}

export default function ARNavigator({ targetLocation, onClose }: ARNavigatorProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [compassHeading, setCompassHeading] = useState<number | null>(null);
  const [distance, setDistance] = useState<number>(0);

  useEffect(() => {
    // Request camera access
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error('Camera access error:', err);
        setError('Camera access denied. Please enable camera permissions.');
      });

    // Request device orientation for compass
    if (window.DeviceOrientationEvent) {
      const handleOrientation = (event: DeviceOrientationEvent) => {
        if (event.alpha !== null) {
          setCompassHeading(event.alpha);
        }
      };
      
      window.addEventListener('deviceorientation', handleOrientation);
      
      return () => {
        window.removeEventListener('deviceorientation', handleOrientation);
      };
    } else {
      setError('Device orientation not supported. Using simulated navigation.');
    }

    // Simulate distance calculation (in a real app, use actual location data)
    const interval = setInterval(() => {
      // Simulate distance to room (random for demo)
      setDistance(Math.floor(Math.random() * 50) + 10);
    }, 2000);

    return () => {
      clearInterval(interval);
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Draw AR overlay
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // Draw compass arrow
        if (compassHeading !== null) {
          ctx.save();
          ctx.translate(centerX, centerY);
          ctx.rotate((compassHeading * Math.PI) / 180);
          ctx.strokeStyle = '#00ff00';
          ctx.lineWidth = 5;
          ctx.beginPath();
          ctx.moveTo(0, -50);
          ctx.lineTo(-20, 20);
          ctx.lineTo(0, 10);
          ctx.lineTo(20, 20);
          ctx.closePath();
          ctx.stroke();
          ctx.restore();
        }

        // Draw target indicator
        ctx.fillStyle = 'rgba(255, 0, 0, 0.7)';
        ctx.beginPath();
        ctx.arc(centerX, centerY - 100, 30, 0, 2 * Math.PI);
        ctx.fill();

        // Draw distance and location text (mobile-optimized sizing)
        const fontSize = Math.min(canvas.width / 15, 24);
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.textAlign = 'center';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3;
        
        // Draw location with outline for better visibility
        ctx.strokeText(targetLocation, centerX, centerY - 100);
        ctx.fillText(targetLocation, centerX, centerY - 100);
        
        // Draw distance
        ctx.strokeText(`${distance}m ahead`, centerX, centerY + 150);
        ctx.fillText(`${distance}m ahead`, centerX, centerY + 150);
      }
      requestAnimationFrame(draw);
    };

    video.addEventListener('loadedmetadata', () => {
      draw();
    });
  }, [compassHeading, distance, targetLocation]);

  return (
    <div className="fixed inset-0 z-50 bg-black ar-fullscreen">
      <div className="relative w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
        />
        
        {/* UI Overlay - Mobile Optimized */}
        <div className="absolute top-0 left-0 right-0 p-2 sm:p-4 bg-black/70 text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-base sm:text-xl font-bold truncate flex-1 mr-2">{targetLocation}</h2>
            <button
              onClick={onClose}
              className="px-3 sm:px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 active:bg-red-800 text-sm sm:text-base font-semibold touch-manipulation whitespace-nowrap"
            >
              Close
            </button>
          </div>
          <p className="text-xs sm:text-sm mt-1 sm:mt-2">Distance: {distance}m</p>
        </div>

        {error && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-yellow-600 text-white">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

