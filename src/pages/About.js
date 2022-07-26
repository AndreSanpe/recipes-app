/* eslint-disable react/jsx-max-depth */
import React from 'react';
import Footer from '../components/Footer';
import logoLinkedin from '../images/logoLinkedin.png';

function About() {
  return (
    <>
      <main className="flex flex-column items-center gap-y-8 mb-20">
        <h2
          className="font-bold underline
          text-start text-orange-600 my-4"
        >
          About us!

        </h2>
        <a href="https://www.linkedin.com/in/andresantospereira/" target="_blank" rel="noreferrer">
          <div className="w-60 bg-stone-100 rounded-[10px] shadow-lg">
            <img className="rounded-t-[20px]" src="https://ca.slack-edge.com/TMDDFEPFU-U032HR83UUW-c5ef10d86175-512" alt="Imagem da André" />
            <div className="flex align-items-center p-2 justify-between">
              <h3
                className="text-lg font-semibold m-0 pt-3
          text-start text-orange-500"
              >
                André Santos Pereira

              </h3>
              <img
                className="w-6 justify-self-end"
                src={ logoLinkedin }
                alt="Logo Linkedin"
              />
            </div>
          </div>
        </a>
        <a href="https://www.linkedin.com/in/claudiohaas/" target="_blank" rel="noreferrer">
          <div className="w-60 bg-stone-100 rounded-[10px] shadow-lg">
            <img className="rounded-t-[20px]" src="https://ca.slack-edge.com/TMDDFEPFU-U027SMUK7MJ-0d1a18d5bf4d-512" alt="Imagem da Cláudio" />
            <div className="flex align-items-center p-2 justify-between">
              <h3
                className="text-lg font-semibold m-0 pt-3
          text-start text-orange-500"
              >
                Cláudio Júnior Haas

              </h3>
              <img
                className="w-6 justify-self-end"
                src={ logoLinkedin }
                alt="Logo Linkedin"
              />
            </div>
          </div>
        </a>
        <a href="https://www.linkedin.com/search/results/all/?keywords=eduardo%20p.&origin=RICH_QUERY_SUGGESTION&position=1&searchId=5e3ce416-735e-4650-9580-49e096d52f5b&sid=-ag" target="_blank" rel="noreferrer">
          <div className="w-60 bg-stone-100 rounded-[10px] shadow-lg">
            <img className="rounded-t-[20px]" src="https://ca.slack-edge.com/TMDDFEPFU-U032QFJPN1H-572c38b56f5b-512" alt="Imagem da Eduardo" />
            <div className="flex align-items-center p-2 justify-between">
              <h3
                className="text-lg font-semibold m-0 pt-3
          text-start text-orange-500"
              >
                Eduardo Prado

              </h3>
              <img
                className="w-6 justify-self-end"
                src={ logoLinkedin }
                alt="Logo Linkedin"
              />
            </div>
          </div>
        </a>
        <a href="https://www.linkedin.com/search/results/all/?keywords=gabriela%20menezes&origin=RICH_QUERY_SUGGESTION&position=3&searchId=3ed18ed5-a823-4ba6-94c8-374253359fda&sid=AMS" target="_blank" rel="noreferrer">
          <div className="w-60 bg-stone-100 rounded-[10px] shadow-lg">
            <img className="rounded-t-[20px]" src="https://ca.slack-edge.com/TMDDFEPFU-U02U2V34S4T-d3126f6e7be3-512" alt="Imagem da Gabriela" />
            <div className="flex align-items-center p-2 justify-between">
              <h3
                className="text-lg font-semibold m-0 pt-3
          text-start text-orange-500"
              >
                Gabriela Menezes
              </h3>
              <img
                className="w-6 justify-self-end"
                src={ logoLinkedin }
                alt="Logo Linkedin"
              />
            </div>
          </div>
        </a>
        <a href="https://www.linkedin.com/in/calvitoria/" target="_blank" rel="noreferrer">
          <div className="w-60 bg-stone-100 rounded-[10px] shadow-lg">
            <img className="rounded-t-[20px]" src="https://ca.slack-edge.com/TMDDFEPFU-U032MJ2A5D3-55836e561498-512" alt="Imagem da Vitória" />
            <div className="flex align-items-center p-2 justify-between">
              <h3
                className="text-lg font-semibold m-0 pt-3
          text-start text-orange-500"
              >
                Vitória Calvi Meinerz
              </h3>
              <img
                className="w-6"
                src={ logoLinkedin }
                alt="Logo Linkedin"
              />
            </div>
          </div>
        </a>
      </main>
      <Footer />
    </>
  );
}

export default About;
