import * as React from "react";

export const InfoBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ padding: '1rem', backgroundColor: '#e0f2fe', borderLeft: '4px solid #3b82f6' }}>
    {children}
  </div>
)