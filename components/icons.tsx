import React from 'react';

export const StarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export const TreasureChestIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v4c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-4h1c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8-2h4v2h-4V4z" />
    <path d="M5 12H3V9.5C3 8.67 3.67 8 4.5 8S6 8.67 6 9.5V12H5zm14 0h-2V9.5C17 8.67 17.67 8 18.5 8S20 8.67 20 9.5V12h-1zM18 16H6v-3h12v3z"/>
    <circle cx="12" cy="14" r="1.5"/>
  </svg>
);

export const CompassIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.32V14h-2v2.32c-2.84-.48-5-2.94-5-5.82h2.5L12 7l3.5 3.5H18c0 2.88-2.16 5.34-5 5.82z" />
    <path d="M12 12l-1.5-1.5H8v3h2.5L12 12zm0 0l1.5 1.5H16v-3h-2.5L12 12z" fillOpacity=".5"/>
  </svg>
);

export const LeafIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66C7.64 17.3 9 11 17 8zM17 7c-3.33 0-5.62 2.14-7.37 3.54C7.88 12.11 7 14.33 7 17c0 1.66 1.34 3 3 3h.18c-1.1-1.63-1.18-3.65-.18-5.32C11.4 12.38 13.88 11 17 11c1.5 0 3 .5 3 2 0 .5-.5 1-1 1s-1-.5-1-1c0-.17-.11-.42-.32-.62C17.38 11.08 17.11 11 17 11s-.11 0-.17.02c-.06.02-.12.04-.18.06-.06.02-.12.05-.18.08-.06.03-.12.07-.17.11-.05.04-.1.08-.14.13-.04.05-.08.1-.11.16-.03.06-.06.12-.08.18-.02.06-.04.12-.05.19-.01.07-.02.13-.02.2s0 .13.01.19c.01.06.02.12.04.18.02.06.04.12.07.18s.06.11.1.17.09.11.14.16.11.09.18.14.13.08.2.12.14.07.22.1.16.05.25.06.18.02.28.02.2-.01.29-.02c.1-.01.19-.03.28-.06.09-.03.18-.07.26-.12.08-.05.16-.11.23-.18s.13-.15.18-.23c.05-.08.1-.17.13-.27.03-.1.05-.2.06-.31.01-.11.02-.22.02-.33 0-1.5-1.5-3-3-3z" />
  </svg>
);


export const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export const XIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);