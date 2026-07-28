import React from 'react';

export const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: 'mailto:nehakohadsanjay@gmail.com' }
];

export function useActiveTab() {
  const [activeTab, setActiveTab] = React.useState(
    typeof window !== 'undefined' ? (window.location.hash || '#work') : '#work'
  );

  React.useEffect(() => {
    const handleHashChange = () => {
      setActiveTab(window.location.hash || '#work');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return activeTab;
}
