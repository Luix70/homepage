import { useEffect } from "react";

export default function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    const els = document.querySelectorAll("[data-animate]");
    els.forEach(el => obs.observe(el));

    return () => obs.disconnect(); // limpia al desmontar
  }, []);
}
