export function Rainbow({ path, first, second, third, fourth}){
  return(<>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%" viewBox="0 0 605 605" style={{shapeRendering:"geometricPrecision", textRendering:"geometricPrecision", imageRendering:"optimizeQuality", fillRule:"evenodd", clipRule:"evenodd"}} className={path}>
<g className="third"><path style={{opacity:1, fill:third}} d="M -0.5,-0.5 C 35.8333,-0.5 72.1667,-0.5 108.5,-0.5C 108.5,201.167 108.5,402.833 108.5,604.5C 72.1667,604.5 35.8333,604.5 -0.5,604.5C -0.5,402.833 -0.5,201.167 -0.5,-0.5 Z"/></g>
<g className="first"><path style={{opacity:1, fill:first}} d="M 108.5,-0.5 C 166.5,-0.5 224.5,-0.5 282.5,-0.5C 282.5,201.167 282.5,402.833 282.5,604.5C 224.5,604.5 166.5,604.5 108.5,604.5C 108.5,402.833 108.5,201.167 108.5,-0.5 Z"/></g>
<g className="fourth"><path style={{opacity:1, fill:fourth}} d="M 282.5,-0.5 C 368.167,-0.5 453.833,-0.5 539.5,-0.5C 539.5,201.167 539.5,402.833 539.5,604.5C 453.833,604.5 368.167,604.5 282.5,604.5C 282.5,402.833 282.5,201.167 282.5,-0.5 Z"/></g>
<g className="second"><path style={{opacity:1, fill:second}} d="M 539.5,-0.5 C 561.167,-0.5 582.833,-0.5 604.5,-0.5C 604.5,201.167 604.5,402.833 604.5,604.5C 582.833,604.5 561.167,604.5 539.5,604.5C 539.5,402.833 539.5,201.167 539.5,-0.5 Z"/></g>
</svg>
  </>)
}


