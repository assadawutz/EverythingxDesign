
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({ children, className = '' }) => {
  return (
    // Vertical spacing is handled by utility class 'fluid-py' defined in index.css
    <section className={`w-full fluid-py ${className}`}>
      {children}
    </section>
  );
};
