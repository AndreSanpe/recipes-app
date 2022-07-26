import React from 'react';
import Footer from '../components/Footer';
import logoLinkedin from '../images/logoLinkedin.png';

function About() {
  return (
    <>
      <main>
        <div className="w-56">
          <img src="https://ca.slack-edge.com/TMDDFEPFU-U032HR83UUW-c5ef10d86175-512" alt="Imagem da André" />
          <div className="flex align-items-center">
            <a href="https://www.linkedin.com/in/andresantospereira/" target="_blank" rel="noreferrer">
              <img className="w-12" src={ logoLinkedin } alt="Logo Linkedin" />
            </a>
            <h3>André Santos Pereira</h3>
          </div>
        </div>
        <div>
          <img src="https://ca.slack-edge.com/TMDDFEPFU-U027SMUK7MJ-0d1a18d5bf4d-512" alt="Imagem da Cláudio" />
          <a href="https://www.linkedin.com/in/andresantospereira/" target="_blank" rel="noreferrer">
            <img src={ logoLinkedin } alt="Logo Linkedin" />
          </a>
          <h3>Cláudio Júnior Haas</h3>
        </div>
        <div>
          <img src="https://ca.slack-edge.com/TMDDFEPFU-U032QFJPN1H-572c38b56f5b-512" alt="Imagem da Eduardo" />
          <a href="https://www.linkedin.com/search/results/all/?keywords=eduardo%20p.&origin=RICH_QUERY_SUGGESTION&position=1&searchId=5e3ce416-735e-4650-9580-49e096d52f5b&sid=-ag" target="_blank" rel="noreferrer">
            <img src={ logoLinkedin } alt="Logo Linkedin" />
          </a>
          <h3>Eduardo Prado</h3>
        </div>
        <div>
          <img src="https://ca.slack-edge.com/TMDDFEPFU-U02U2V34S4T-d3126f6e7be3-512" alt="Imagem da Gabriela" />
          <a href="https://www.linkedin.com/search/results/all/?keywords=gabriela%20menezes&origin=RICH_QUERY_SUGGESTION&position=3&searchId=3ed18ed5-a823-4ba6-94c8-374253359fda&sid=AMS" target="_blank" rel="noreferrer">
            <img src={ logoLinkedin } alt="Logo Linkedin" />
          </a>
          <h3>Gabriela Menezes</h3>
        </div>
        <div>
          <img src="https://ca.slack-edge.com/TMDDFEPFU-U032MJ2A5D3-55836e561498-512" alt="Imagem da Vitória" />
          <a href="https://www.linkedin.com/in/calvitoria/" target="_blank" rel="noreferrer">
            <img src={ logoLinkedin } alt="Logo Linkedin" />
          </a>
          <h3>Vitória Calvi Meinerz</h3>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default About;
