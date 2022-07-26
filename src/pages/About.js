/* eslint-disable react/jsx-max-depth */
import React from 'react';
import Footer from '../components/Footer';
import logoLinkedin from '../images/logoLinkedin.png';

function About() {
  return (
    <>
      {/* talvez o melhor seria colocar todas as imagens na msm pagina bolinha e o nome */}
      <p
        className="font-semibold underline text-xl
          text-start text-orange-600 mt-3 mb-3 font-sans text-center"
      >
        About us!

      </p>
      <main
        className="flex items-center gap-y-2 mb-20 flex-wrap
       justify-around font-sans"
      >
        <div className="w-32 bg-stone-100 rounded-[10px] shadow-lg py-6">
          <img className="rounded-t-[20px]" src="https://user-images.githubusercontent.com/95686401/180876245-922933e5-bddf-4cb1-ad82-699906bdb89d.png" alt="Imagem da André" />
          <div className="flex align-items-center p-2 justify-between" />
        </div>

        <a href="https://www.linkedin.com/in/andresantospereira/" target="_blank" rel="noreferrer">
          <div className="w-32 bg-stone-100 rounded-[10px] shadow-lg">
            <img className="rounded-t-[20px]" src="https://ca.slack-edge.com/TMDDFEPFU-U032HR83UUW-c5ef10d86175-512" alt="Imagem da André" />
            <div className="flex align-items-center p-2 justify-between">
              <p
                className="text-normal font-semibold m-0 pt-1
          text-start text-orange-500"
              >
                André

              </p>
              <img
                className="w-6 justify-self-end"
                src={ logoLinkedin }
                alt="Logo Linkedin"
              />
            </div>
          </div>
        </a>
        <a href="https://www.linkedin.com/in/claudiohaas/" target="_blank" rel="noreferrer">
          <div className="w-32 bg-stone-100 rounded-[10px] shadow-lg">
            <img className="rounded-t-[20px]" src="https://ca.slack-edge.com/TMDDFEPFU-U027SMUK7MJ-0d1a18d5bf4d-512" alt="Imagem da Cláudio" />
            <div className="flex align-items-center p-2 justify-between">
              <p
                className="text-normal font-semibold m-0 pt-1
          text-start text-orange-500"
              >
                Cláudio

              </p>
              <img
                className="w-6 justify-self-end"
                src={ logoLinkedin }
                alt="Logo Linkedin"
              />
            </div>
          </div>
        </a>
        <a href="https://www.linkedin.com/search/results/all/?keywords=eduardo%20p.&origin=RICH_QUERY_SUGGESTION&position=1&searchId=5e3ce416-735e-4650-9580-49e096d52f5b&sid=-ag" target="_blank" rel="noreferrer">
          <div className="w-32 bg-stone-100 rounded-[10px] shadow-lg">
            <img className="rounded-t-[20px]" src="https://ca.slack-edge.com/TMDDFEPFU-U032QFJPN1H-572c38b56f5b-512" alt="Imagem da Eduardo" />
            <div className="flex align-items-center p-2 justify-between">
              <p
                className="text-normal font-semibold m-0 pt-1
          text-start text-orange-500"
              >
                Eduardo

              </p>
              <img
                className="w-6 justify-self-end"
                src={ logoLinkedin }
                alt="Logo Linkedin"
              />
            </div>
          </div>
        </a>
        <a href="https://www.linkedin.com/search/results/all/?keywords=gabriela%20menezes&origin=RICH_QUERY_SUGGESTION&position=3&searchId=3ed18ed5-a823-4ba6-94c8-374253359fda&sid=AMS" target="_blank" rel="noreferrer">
          <div className="w-32 bg-stone-100 rounded-[10px] shadow-lg">
            <img className="rounded-t-[20px]" src="https://ca.slack-edge.com/TMDDFEPFU-U02U2V34S4T-d3126f6e7be3-512" alt="Imagem da Gabriela" />
            <div className="flex align-items-center p-2 justify-between">
              <p
                className="text-normal font-semibold m-0 pt-1
          text-start text-orange-500"
              >
                Gabriela
              </p>
              <img
                className="w-6 justify-self-end"
                src={ logoLinkedin }
                alt="Logo Linkedin"
              />
            </div>
          </div>
        </a>
        <a href="https://www.linkedin.com/in/calvitoria/" target="_blank" rel="noreferrer">
          <div className="w-32 bg-stone-100 rounded-[10px] shadow-lg">
            <img className="rounded-t-[20px]" src="https://ca.slack-edge.com/TMDDFEPFU-U032MJ2A5D3-55836e561498-512" alt="Imagem da Vitória" />
            <div className="flex align-items-center p-2 justify-between">
              <p
                className="text-normal font-semibold m-0 pt-1
          text-start text-orange-500"
              >
                Vitória
              </p>
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
