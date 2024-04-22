import { useState } from "react";

const useHover = () =>{
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseOver = () => {
    setIsHovered(true);
  };
  const handleMouseOut = () => {
    setIsHovered(false);
  };
  return {
    isHovered,
    hoverEvents: {
      onMouseOver: handleMouseOver,
      onMouseOut: handleMouseOut
    }
  };
}

export default useHover;

// Example usage of useHover hook
// function App() {
//   const { isHovered, hoverEvents } = useHover();

//   return (
//     <div>
//       <button {...hoverEvents}>
//         {isHovered ? 'Hovered!' : 'Hover me!'}
//       </button>
//     </div>
//   );
// }
