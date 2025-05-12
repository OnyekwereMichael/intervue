"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Logo_ from '../../../public/logo.svg';
import Image from "next/image";

const phrases = [
  "Empowering interviews, one question at a time.",
  "Crafting better conversations for success.",
  "Elevate your confidence with every answer.",
];

export default function Logo() {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      const updatedCharIndex = isDeleting ? charIndex - 1 : charIndex + 1;
      setText(currentPhrase.substring(0, updatedCharIndex));
      setCharIndex(updatedCharIndex);

      if (!isDeleting && updatedCharIndex === currentPhrase.length) {
        setTimeout(() => setIsDeleting(true), 1500); // pause before deleting
      } else if (isDeleting && updatedCharIndex === 0) {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex]);

  return (
    <div className="flex flex-col items-center justify-center gap-2 py-14 px-10">
      <div className="flex items-center gap-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image src={Logo_} alt="Logo" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-400 tracking-tight"
        >
          Inter<span className="text-purple-600">vue</span>
        </motion.h1>
      </div>

      <p className="text-sm md:text-base text-gray-500 text-center h-6 md:h-7">
        {text}
        <span className="animate-pulse">|</span>
      </p>
    </div>
  );
}
