import type { Metadata } from 'next';
import { GlobalPresence } from '@/components/GlobalPresence';

export const metadata: Metadata = {
  title: 'Global Presence | Shanvai Technologies',
  description:
    'Shanvai Technologies presence across Europe, Middle East & Africa, Asia & Australia, and the Americas.',
};

export default function PresencePage() {
  return (
    <div className="pt-16">
      <GlobalPresence />
    </div>
  );
}
