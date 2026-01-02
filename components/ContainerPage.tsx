
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

interface ContainerPageProps {
  children: React.ReactNode;
  className?: string;
}

export const ContainerPage: React.FC<ContainerPageProps> = ({ children, className = '' }) => {
  return (
    // Max width 1440px (standard large screen)
    // Padding is handled by fluid-px class derived from --spacing-container-px
    <div className={`w-full max-w-[1440px] mx-auto fluid-px ${className}`}>
      {children}
    </div>
  );
};
