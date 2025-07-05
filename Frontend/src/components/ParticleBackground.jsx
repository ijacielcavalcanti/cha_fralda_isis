// frontend/src/components/ParticleBackground.jsx
import React, { useCallback } from 'react';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import petalaImagem from '../assets/petala.png'; // Importa nossa imagem da pétala

function ParticleBackground() {
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  const options = {
    // Posição do fundo
    fullScreen: {
      enable: true,
      zIndex: -1 // MUITO IMPORTANTE: coloca as partículas atrás de todo o conteúdo
    },
    particles: {
      number: {
        value: 40, // Quantidade de pétalas na tela. Aumente para mais, diminua para menos.
        density: {
          enable: true,
          value_area: 800
        }
      },
      // Configuração da forma da partícula para usar nossa imagem
      shape: {
        type: "image",
        image: {
          src: petalaImagem, // A imagem que importamos
          width: 200,
          height: 200
        }
      },
      // Opacidade sutil e com variação
      opacity: {
        value: { min: 0.2, max: 0.6 },
        animation: {
          enable: true,
          speed: 0.5,
          sync: false
        }
      },
      // Tamanho com variação
      size: {
        value: { min: 30, max: 150 }
      },
      // O movimento da "brisa suave"
      move: {
        enable: true,
        speed: 2, // Velocidade da queda
        direction: "bottom-left", // Direção geral
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    detectRetina: true
  };

  return <Particles id="tsparticles" init={particlesInit} options={options} />;
};

export default ParticleBackground;