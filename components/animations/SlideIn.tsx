import React, { useEffect, useRef, useState } from 'react';

interface SlideInProps {
    children: React.ReactNode;
    direction?: 'left' | 'right' | 'up' | 'down';
    delay?: number;
    duration?: number;
    className?: string;
}

export const SlideIn: React.FC<SlideInProps> = ({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.6,
    className = ''
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);

    const getTransform = () => {
        const distance = '40px';
        const transforms = {
            left: `translateX(-${distance})`,
            right: `translateX(${distance})`,
            up: `translateY(${distance})`,
            down: `translateY(-${distance})`
        };
        return isVisible ? 'translate(0, 0)' : transforms[direction];
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={elementRef}
            className={className}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: getTransform(),
                transition: `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s`,
            }}
        >
            {children}
        </div>
    );
};
