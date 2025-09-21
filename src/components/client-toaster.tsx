'use client';
import { Toaster } from 'sonner';

/** Mounts Sonner on the client only */
export default function ClientToaster() {
  return <Toaster richColors position="top-right" closeButton />;
}
