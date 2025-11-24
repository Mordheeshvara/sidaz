// Example usage of the UserProfileCard component

import { UserProfileCard } from '@/components/ui/user-profile-card';

// Basic usage example
export function TeamProfileExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UserProfileCard
        name="Ravikanth"
        role="Senior Developer"
        imageUrl="/images/team/raka.png"
        linkedinUrl="https://linkedin.com/in/ravikanth"
        instagramUrl="https://instagram.com/ravikanth"
      />
      
      <UserProfileCard
        name="Sarathy"
        role="UI/UX Designer"
        imageUrl="/images/team/sara.png"
        linkedinUrl="https://linkedin.com/in/sarathy"
        instagramUrl="https://instagram.com/sarathy"
      />
      
      <UserProfileCard
        name="Mordheesh"
        role="Full Stack Developer"
        imageUrl="/images/team/mothy.png"
        linkedinUrl="https://linkedin.com/in/mordheesh"
        instagramUrl="https://instagram.com/mordheesh"
      />
    </div>
  );
}

// Component Features:
// 1. Dark theme with glassmorphism effects
// 2. Profile image with hover scale animation
// 3. Purple theme integration with hover effects
// 4. Pill-shaped social container with:
//    - Initial state: Subtle placeholder dots
//    - Hover state: Social icons slide up with fade-in
//    - Individual icon hover effects (scale, glow, color change)
// 5. Fully responsive design
// 6. Accessibility features (aria-labels, keyboard navigation)

// Props interface:
// - name: string (required)
// - role: string (required) 
// - imageUrl: string (required)
// - linkedinUrl?: string (optional, defaults to '#')
// - instagramUrl?: string (optional, defaults to '#')
// - className?: string (optional, for additional styling)