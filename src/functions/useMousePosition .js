import { useState, useEffect } from "react";

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  const updateMousePosition = ev => {
    setMousePosition({ x: ev.clientX, y: ev.clientY });
  };

  

  useEffect(() => {
    window.addEventListener("mousedown", updateMousePosition);

    return () => window.removeEventListener("mousedown", updateMousePosition);
  }, []);

  return mousePosition;
};

const MousePosition = () => {
    const { x, y } = useMousePosition();
  
    const hasMovedCursor = typeof x === "number" && typeof y === "number";
  
    return (
      <div className="App">
        <h1>
          {hasMovedCursor
            ? `Your cursor is at ${x}, ${y}.`
            : "Move your mouse around."}
        </h1>
      </div>
    );
}

export default MousePosition;