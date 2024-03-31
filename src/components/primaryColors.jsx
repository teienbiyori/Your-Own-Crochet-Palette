export default function PrimaryColors({first, second, third, fourth, fifth, anime }){
  return(
    <>
     <div className={`square-container d-flex ${anime}`}>
      <div className="square"><div className="hex-code">{first}</div></div>
      <div className="square"><div className="hex-code">{second}</div></div>
      <div className="square"><div className="hex-code">{third}</div></div>
      <div className="square"><div className="hex-code">{fourth}</div></div>
      <div className="square"><div className="hex-code">{fifth}</div></div>
    </div>
    </>
  )
}