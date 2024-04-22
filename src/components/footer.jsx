export function Footer({bg, font}){
  return(<>
    <footer className={`d-flex align-items-end justify-content-center ${bg}`}>
       <p className={`rights ${font}`}>© 2024 TEIENBIYORI - All Rights Reserved Worldwide.</p>
    </footer>
  </>)
}