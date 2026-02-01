import React, { useEffect, useState } from 'react';

interface PageTransitionProps {
    children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger animation on mount
        setIsVisible(true);

        // Reset on unmount
        return () => setIsVisible(false);
    }, []);

    return (
        <div
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
            }}
        >
            {children}
        </div>
    );
};
