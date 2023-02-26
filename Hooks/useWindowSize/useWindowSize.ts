import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const [size, setSize] = useState<number>();
  useEffect(() => {
    const handleResize = () => {
      setSize(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return size;
};
