"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  ArrowRightIcon,
  CalculatorIcon,
  PencilIcon,
  DocumentChartBarIcon,
  AcademicCapIcon,
  SparklesIcon,
  UserIcon,
  UserPlusIcon,
  CalculatorIcon as CalcIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import calc from "../../assets/calc.png";
import showcase2 from "../../assets/showcase2.png";
import showcase1 from "../../assets/showcase1.png";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";
import { BackgroundLines } from "@/components/ui/background-lines";
import { CardSpotlight } from "@/components/ui/card-spotlight";


const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Data Scientist",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "UX Designer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    name: "Tyler Durden",
    designation: "Soap Developer",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  },
  {
    id: 6,
    name: "Dora",
    designation: "The Explorer",
    image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
  },
];

const FloatingIconSquare = ({
  icon: Icon,
  initialX,
  initialY,
}: {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  initialX: number;
  initialY: number;
}) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: [initialX, initialX + 40, initialX - 40, initialX],
      y: [initialY, initialY - 40, initialY + 40, initialY],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 20,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    });
  }, [controls, initialX, initialY]);

  return (
    
    <motion.div animate={controls} className="absolute">
      <div className="bg-purple-600 bg-opacity-20 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-purple-400">
        <Icon className="w-12 h-12 text-purple-300" />
      </div>
    </motion.div>
  );
};

const MacScreen = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-gray-800 rounded-2xl p-4 shadow-2xl max-w-6xl mx-auto z-10">
    <div className="bg-gray-900 rounded-xl overflow-hidden">
      <div className="bg-gray-800 p-2 flex items-center space-x-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  </div>
);

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}) => (
    <CardSpotlight className=" bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition-all duration-200" >

    <Icon className="w-12 h-12 text-purple-500 mb-4 z-50" />
    <h3 className="text-xl font-bold text-white mb-2 z-20">{title}</h3>
    <p className="text-gray-300 z-20">{description}</p>

    </CardSpotlight>

);

const AnimatedText = ({
  text,
  className,
}: {
  text: string;
  className: string;
}) => (
  <div className={`flex flex-wrap justify-center ${className}`}>
    {text.split("").map((char: string, index: number) => (
      <motion.span
        key={index}
        className="inline-block"
        whileHover={{
          scale: 1.2,
          rotate: 5,
          color: "#a855f7",
          transition: { duration: 0.1 },
        }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </div>
);

const StatCard = ({
  icon: Icon,
  value,
  label,
}: {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  value: string;
  label: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-purple-800 bg-opacity-30 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-purple-400 flex flex-col items-center"
  >
    <Icon className="w-12 h-12 text-purple-300 mb-4" />
    <motion.span
      className="text-4xl font-bold text-white mb-2"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {value}
    </motion.span>
    <span className="text-purple-200">{label}</span>
  </motion.div>
);

const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-gray-700 p-6 rounded-xl shadow-lg transition-all duration-300 ease-in-out hover:bg-gray-600"
  >
    <h3 className="text-xl font-bold text-white mb-2">{question}</h3>
    <p className="text-gray-300">{answer}</p>
  </motion.div>
);

const ScrollAnimatedSection = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
};

export default function LandingPage() {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white">
      <nav className="w-full p-6 flex justify-between items-center bg-gray-800 bg-opacity-50 backdrop-blur-md fixed top-0 z-50">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-purple-300"
        >
          SnapSolver
        </motion.h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-purple-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg"
        >
          Sign Up
        </motion.button>
      </nav>

      <main className="pt-24">
        <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
          <FloatingIconSquare
            icon={CalculatorIcon}
            initialX={-600}
            initialY={-100}
          />
          <FloatingIconSquare
            icon={PencilIcon}
            initialX={500}
            initialY={-150}
          />
          <FloatingIconSquare
            icon={DocumentChartBarIcon}
            initialX={-150}
            initialY={250}
          />

          <div className="max-w-5xl w-full text-center z-10">
          <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 bg-transparent ">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
            >
              Revolutionize Your Calculations
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-purple-200 mb-12"
            >
              SnapSolver harnesses the power of AI to transform how you approach
              mathematics.
            </motion.p>
            </BackgroundLines>
            <Link to={"/canvas"}>
              <motion.div
                className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg text-lg flex items-center mx-auto w-fit z-20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
              >
                Start Calculating
                <motion.div
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </motion.div>
              </motion.div>
            </Link>
          </div>
        </section>

        <ScrollAnimatedSection>
          <section className="py-24 px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-12"
              >
                <AnimatedText
                  text="Unlock the Power of AI-Driven Mathematics"
                  className="text-4xl md:text-5xl font-bold text-center"
                />
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <FeatureCard
                  icon={SparklesIcon}
                  title="Intelligent Problem Solving"
                  description="Our AI analyzes and solves complex mathematical problems, providing step-by-step explanations."
                />
                <FeatureCard
                  icon={DocumentChartBarIcon}
                  title="Advanced Visualization"
                  description="Transform abstract concepts into interactive visual representations for deeper understanding."
                />
                <FeatureCard
                  icon={AcademicCapIcon}
                  title="Personalized Learning"
                  description="Adaptive learning algorithms tailor problems and explanations to your skill level."
                />
              </div>
            </div>
          </section>
        </ScrollAnimatedSection>

        <ScrollAnimatedSection>
          <section className="py-24 w-full rounded-md bg-slate-900 relative flex flex-col items-center justify-center antialiased">
            <div className="max-w-6xl mx-auto flex flex-col gap-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center z-10">
                See SnapSolver in Action
              </h2>
              <MacScreen>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <img
                    src={showcase2}
                    alt="SnapSolver Interface"
                    className="w-full rounded-lg shadow-lg"
                  />
                </motion.div>
              </MacScreen>

              <MacScreen>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <img
                    src={showcase1}
                    alt="SnapSolver Interface"
                    className="w-full rounded-lg shadow-lg"
                  />
                </motion.div>
              </MacScreen>
            </div>
            <BackgroundBeams/>
          </section>
        </ScrollAnimatedSection>

        <ScrollAnimatedSection>
          <section className="py-24 px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-3xl p-12 shadow-2xl"
              >
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="mb-8 md:mb-0 md:mr-8">
                    <h3 className="text-3xl font-bold text-white mb-4">
                      Experience the Future of Calculation
                    </h3>
                    <p className="text-purple-200 mb-6">
                      Join thousands of students and professionals who have
                      transformed their mathematical capabilities with
                      SnapSolver.
                    </p>
                    <Link to={"/canavs"}>
                      <motion.div
                        className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold shadow-lg flex items-center w-fit"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 17,
                        }}
                        onHoverStart={() => setIsHovered(true)}
                        onHoverEnd={() => setIsHovered(false)}
                      >
                        Start Free Trial
                        <motion.div
                          animate={{ x: isHovered ? 5 : 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 10,
                          }}
                        >
                          <ArrowRightIcon className="w-5 h-5 ml-2" />
                        </motion.div>
                      </motion.div>
                    </Link>
                  </div>
                  <motion.div
                    animate={{
                      y: [0, -15, 0],
                      transition: { repeat: Infinity, duration: 3 },
                    }}
                    className="w-64 h-64"
                  >
                    <img src={calc} alt="SnapSolver App Interface" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>
        </ScrollAnimatedSection>

        <ScrollAnimatedSection>
          <section className="py-24 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
                SnapSolver by the Numbers
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StatCard
                  icon={UserIcon}
                  value="1M+"
                  label="Website Visitors"
                />
                <StatCard
                  icon={UserPlusIcon}
                  value="500K+"
                  label="Registered Users"
                />
                <StatCard
                  icon={CalcIcon}
                  value="10M+"
                  label="Calculations Performed"
                />
              </div>
            </div>
          </section>
        </ScrollAnimatedSection>

        <ScrollAnimatedSection>
          <section className="py-24 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                What Our Users Say
              </motion.h2>
              <div className="flex flex-row items-center justify-center mb-10 w-full">
                <AnimatedTooltip items={people} />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-gray-800 p-8 rounded-xl shadow-lg"
              >
                <p className="text-xl text-purple-200 mb-4">
                  "SnapSolver has completely changed how I approach complex
                  calculations. It's like having a brilliant math tutor
                  available 24/7!"
                </p>
                <p className="font-semibold text-white">
                  - Sarah J., Engineering Student
                </p>
              </motion.div>
            </div>
          </section>
        </ScrollAnimatedSection>

        <ScrollAnimatedSection>
          <section className="py-24 px-4 bg-gray-800 relative w-full overflow-hidden flex flex-col items-center justify-center rounded-lg">

          <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
 
          <Boxes />
            
        
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className={cn("md:text-4xl text-xl text-white relative z-20 mb-9")}
              >
                Frequently Asked Questions
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto z-10">
                <FAQItem
                  question="How accurate is SnapSolver?"
                  answer="Our AI is trained on vast datasets and continuously updated, ensuring high accuracy across various mathematical domains."
                />
                <FAQItem
                  question="Can SnapSolver handle advanced mathematics?"
                  answer="SnapSolver is equipped to handle problems from basic arithmetic to advanced calculus and beyond."
                />
              </div>
            
          </section>
        </ScrollAnimatedSection>
      </main>

      <footer className="bg-gray-900 py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <h3 className="text-2xl font-bold text-purple-300 mb-2">
              SnapSolver
            </h3>
            <p className="text-gray-400">
              Empowering mathematical minds with AI
            </p>
          </div>
          <nav className="flex gap-8">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Pricing
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>
        <div className="mt-8 text-center text-gray-500">
          <p>made with ❤️ by Phani Bhusan</p>
        </div>
      </footer>
    </div>
  );
}
