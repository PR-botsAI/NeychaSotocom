import { useEffect } from "react";
import { useLocation } from "wouter";

export const useScrollTop = () => {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }, [location]);
};