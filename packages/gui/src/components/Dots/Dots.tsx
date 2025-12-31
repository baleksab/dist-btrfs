import { useEffect, useState } from "react";

export const Dots = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const id = setInterval(() => {
      setDots((prev) => (prev.length === 6 ? "" : prev + "."));
    }, 50);

    return () => clearInterval(id);
  }, []);

  return dots;
};
