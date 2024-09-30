import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

const projects = [
  {
    id: 1,
    title: "Elegant E-commerce Platform",
    description: "A high-end e-commerce solution with seamless user experience and secure payment integration.",
    image: "/placeholder.svg?height=400&width=600",
    tech: ["React", "Node.js", "MongoDB", "Stripe"]
  },
  {
    id: 2,
    title: "AI-Powered Financial Advisor",
    description: "An intelligent system that provides personalized financial advice using advanced machine learning algorithms.",
    image: "/placeholder.svg?height=400&width=600",
    tech: ["Python", "TensorFlow", "Flask", "PostgreSQL"]
  },
  {
    id: 3,
    title: "Immersive VR Art Exhibition",
    description: "A virtual reality platform showcasing digital art in an interactive and immersive environment.",
    image: "/placeholder.svg?height=400&width=600",
    tech: ["Unity", "C#", "WebGL", "Three.js"]
  },
  {
    id: 4,
    title: "Smart Home Automation System",
    description: "An IoT-based solution for comprehensive home automation and energy management.",
    image: "/placeholder.svg?height=400&width=600",
    tech: ["IoT", "Raspberry Pi", "MQTT", "Node-RED"]
  },
  {
    id: 5,
    title: "Blockchain-based Supply Chain",
    description: "A transparent and secure supply chain management system leveraging blockchain technology.",
    image: "/placeholder.svg?height=400&width=600",
    tech: ["Ethereum", "Solidity", "Web3.js", "React"]
  },
  {
    id: 6,
    title: "AI-Driven Content Recommendation",
    description: "A sophisticated content recommendation engine powered by machine learning algorithms.",
    image: "/placeholder.svg?height=400&width=600",
    tech: ["Python", "TensorFlow", "AWS", "Kubernetes"]
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
      audioRef.current.volume = 0.3; // Set volume to 30% (adjust as needed)
    }
  }, []);

  const confettiEffect = () => {
    if (!confettiReady || typeof window === 'undefined' || !window.confetti) return;

    const colors = ["#ffffff", "#ffd700"]; // White and gold

    // Left side confetti
    window.confetti({
      particleCount: 100,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors: colors,
    });

    // Right side confetti
    window.confetti({
      particleCount: 100,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors: colors,
    });

    // Play sound effect
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset audio to start
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
        className="w-full h-64 object-cover"
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
  const rowRefs = useRef([])
  const confettiEffect = useConfetti()
  const triggeredRows = useRef(new Set())

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

  return (
    <div className="min-h-screen bg-white text-gray-800">
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
            Luxurious Project Showcase
          </h1>
          <p className="text-yellow-700">Elevating digital craftsmanship to an art form</p>
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
    </div>
  )
}