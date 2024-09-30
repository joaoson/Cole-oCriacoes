
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useAnimation, useInView } from 'framer-motion'

declare global {
  interface Window {
    confetti: any; // ou use o tipo correto se souber qual é
  }
}

const projects = [
  {
    id: 1,
    title: "Li-mão: Plataforma de Aprendizado de Libras",
    description: "Plataforma que utiliza modelos pré-treinados de machine learning para verificar e traduzir a linguagem de sinais. Esse projeto me proporcionou aprendizados valiosos sobre design, trabalho em equipe e os desafios enfrentados por pessoas com deficiência auditiva.",
    image: "/design.jpg",
    tech: ["TensorFlowJS", "Node.js", "React", "Javascript"]
  },
  {
    id: 2,
    title: "Automação de Pagamentos Integrada em Python",
    description: "Automação de pagamento de notas fiscais em Python, integrando diversas áreas da VOLVO. Este projeto, com mais de 2000 linhas de código, trouxe um retorno financeiro anual de 150K Coroas Suecas (75K Reais), sendo uma das realizações mais gratificantes da minha carreira profissional.",
    image: "/images (2).png",
    tech: ["Python", "Selenium", "Azure", "Databricks"]
  },
  {
    id: 3,
    title: "Liderança de Equipe em Reforma Escolar",
    description: "Coordenação da reforma completa da Escola Estadual Alcindo Fanaya Júnior para surdos, incluindo pintura, formatação de computadores, substituição de fiação/lâmpadas e reparo de ventiladores. Este projeto foi uma excelente oportunidade para aprimorar minhas habilidades de liderança e gestão de equipes",
    image: "/fanaya.jpg",
    tech: ["Comunicação", "Liderança"]
  },
  {
    id: 4,
    title: "Caminho do Itupava: Desafio de 44 km",
    description: "Trilha de 44 km, partindo de Quatro Barras, na região próxima a Curitiba, até Morretes. A caminhada de 12 horas passa por túneis, trilhos de trem e despenhadeiros, sendo uma das experiências mais desafiadoras fisicamente que já enfrentei.",
    image: "/itupava.jpg",
    tech: ["Natureza", "Adrenalina"]
  },
  {
    id: 5,
    title: "Experiência de Trilhas no Canadá: Stein Valley ",
    description: "articipação em um acampamento de 7 dias em Stein Valley, Canadá, percorrendo uma média de 15 km por dia com uma mochila de 20 kg. Uma das experiências mais marcantes e desafiadoras durante minha estadia no exterior.",
    image: "/stein.jpg",
    tech: ["Hiking", "Natureza"]
  },
  {
    id: 6,
    title: "Monitoria e Palestrante no Projeto Pescar",
    description: "Monitoria e palestras no Projeto Pescar, focado em ensinar adolescentes em situações de vulnerabilidade habilidades técnicas em áreas como programação e computação. Participei também da feira de profissões, apresentando diversas áreas da computação e tecnologia.",
    image: "/pescar.jpg",
    tech: ["Python", "Lógica", "Carreira"]
  },
  {
    id: 7,
    title: "PolePositionPlus: Plataforma de Entretenimento F1",
    description: "Site de entretenimento relacionado à Fórmula 1, onde jogadores podem apostar moedas fictícias em pilotos. Utiliza web scrapers em Python para coletar informações atualizadas, além de modelagem 3D com Three.js para criar uma interface interativa e imersiva",
    tech: ["Python", " Web Scraping", "Three.js", "3D Modeling"]
  },
  {
    id: 8,
    title: "Dungeon Escape: Jogo 2D RPG Imersivo ",
    description: "Jogo 2D RPG, desenvolvido inteiramente em JavaScript e HTML Canvas. Inspirado em Dungeons & Dragons, o jogo oferece uma experiência imersiva com trilha sonora, inúmeros personagens e muita diversão",
    tech: ["JavaScript", "HTML Canvas", "Design de Jogos"]
  },
  {
    id: 9,
    title: "Jogo da Forca: Primeiro Grande Projeto em C",
    description: "Desenvolvi este jogo da forca em C como meu primeiro grande projeto de programação em 2019, para a disciplina de computação na UTFPR. Foi uma experiência desafiadora e gratificante, com mais de 1000 linhas de código",
    image: "/hang.jpg",
    tech: ["C", "Programação Estrutural", "Design de Jogos"]
  }
]

const useConfetti = () => {
  const [confettiReady, setConfettiReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!window.confetti) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.3/tsparticles.confetti.bundle.min.js';
        script.async = true;
        script.onload = () => setConfettiReady(true);
        document.body.appendChild(script);
      } else {
        setConfettiReady(true);
      }

      audioRef.current = new Audio('./balloon-pop-48030.mp3');
      audioRef.current.volume = 0.3;
    }
  }, []);

  const confettiEffect = () => {
    if (!confettiReady || typeof window === 'undefined' || !window.confetti) return;

    const colors = ["#ffffff", "#ffd700"];

    window.confetti({
      particleCount: 100,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors: colors,
    });

    window.confetti({
      particleCount: 100,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors: colors,
    });

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => console.error("Audio playback failed:", error));
    }
  };

  return confettiEffect;
};

const ProjectCard = ({ project, isHovered, setHoveredProject }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg overflow-hidden shadow-lg border border-yellow-200"
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setHoveredProject(project.id)}
      onHoverEnd={() => setHoveredProject(null)}
    >
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-64 object-fit"
      />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-yellow-700">{project.title}</h2>
        <p className="text-gray-600 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech, techIndex) => (
            <motion.span
              key={techIndex}
              className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isHovered ? 1 : 0.7, scale: 1 }}
              transition={{ duration: 0.2, delay: techIndex * 0.1 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function LuxuryProjectGallery() {
  const [hoveredProject, setHoveredProject] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showGallery, setShowGallery] = useState(false)
  const rowRefs = useRef([])
  const confettiEffect = useConfetti()
  const triggeredRows = useRef(new Set())

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const observers = rowRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !triggeredRows.current.has(index)) {
              confettiEffect();
              triggeredRows.current.add(index);
            }
          });
        },
        { threshold: 0.5 }
      );

      if (ref) observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [confettiEffect]);

  const chunkedProjects = projects.reduce((resultArray, item, index) => { 
    const chunkIndex = Math.floor(index / 3)
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []
    }
    resultArray[chunkIndex].push(item)
    return resultArray
  }, [])

  const handleExplore = () => {
    setShowGallery(true)
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 relative overflow-hidden">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="absolute inset-0 bg-black z-50 flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="text-4xl text-white font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Bem-vindo(a) minha coleção de criações!
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && !showGallery && (
        <motion.div
          className="absolute inset-0 bg-yellow-100 z-40 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={handleExplore}
            className="text-2xl px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
          >
            Vamos Explorar
          </button>
        </motion.div>
      )}

      <AnimatePresence>
        {showGallery && (
          <>
            <motion.div
              className="absolute inset-0 bg-yellow-200 z-40"
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
              style={{ originY: 0 }}
            />

            <motion.div
              className="absolute inset-0 bg-yellow-200 z-40"
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
              style={{ originY: 1 }}
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <header className="bg-gradient-to-b from-yellow-100 to-yellow-200 p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
                <div className="relative z-10">
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-64 bg-gradient-to-b from-yellow-300 to-yellow-100 rounded-t-full"></div>
                    <div className="w-20 h-64 bg-gradient-to-b from-yellow-300 to-yellow-100 rounded-t-full mx-4"></div>
                    <div className="w-20 h-64 bg-gradient-to-b from-yellow-300 to-yellow-100 rounded-t-full"></div>
                  </div>
                  <h1 className="text-4xl font-bold mb-2 text-yellow-800">
                    Coleção de criações do João Freitas
                  </h1>
                  <p className="text-yellow-700">Transformando minha realidade por meio de experiências</p>
                </div>
              </header>

              <div className="container mx-auto p-8">
                {chunkedProjects.map((row, rowIndex) => (
                  <div 
                    key={rowIndex} 
                    ref={el => rowRefs.current[rowIndex] = el}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8"
                  >
                    {row.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        isHovered={hoveredProject === project.id}
                        setHoveredProject={setHoveredProject}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}