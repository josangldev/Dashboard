import Confetti from "react-confetti";
import { useEffect, useState } from "react";

export default function ConfettiEffect({ active }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (active) {
      setShow(true);
      const t = setTimeout(() => setShow(false), 2500);
      return () => clearTimeout(t);
    }
  }, [active]);

  if (!show) return null;
  return <Confetti width={window.innerWidth} height={window.innerHeight} />;
} 