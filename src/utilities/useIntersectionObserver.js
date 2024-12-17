import { useEffect } from "react";

const useIntersectionObserver = (elements, threshold = 0.2) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        elements.forEach((element) => {
          const { ref, visibleClass, hiddenClass } = element;
          if (entry.target === ref.current) {
            ref.current.className = entry.isIntersecting
              ? `${visibleClass}`
              : `${hiddenClass}`;
          }
        });
      },
      { threshold }
    );

    elements.forEach((element) => {
      const { ref } = element;
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      elements.forEach((element) => {
        const { ref } = element;
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [elements, threshold]);
};

export default useIntersectionObserver;
