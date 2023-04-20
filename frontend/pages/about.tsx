
function About() {
    const name = 'Bryan Rodriguez';
    return (
      //class heading for img
        <>

        <section className="contenedor">
        <div className="about">

          <div className="about-margin"> 

            <h1>Serphp </h1>
            <p className="about-text"> {name} </p>
            </div>

            <div className="about-content">
              <p> 
                
                Hola, <br/>
                Bienvenido a mi blog :) 
                
              </p>
            </div>
           
        <img src="/" alt="" className="image-28"></img>
      </div>
      </section>
        </>
    )
}

export default About;