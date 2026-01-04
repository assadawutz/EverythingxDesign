
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
    // STRICT RULE: Use .container class from globals.css which handles 
    // breakpoint logic and padding overrides !important
    <div className={`container ${className}`}>
      {children}
    </div>
  );
};
