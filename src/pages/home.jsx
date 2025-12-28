import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronDown, Rocket, Users, Calendar, Trophy, Zap, ArrowRight, Check, Mail, User, School, MessageCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const GorillaCharacter = ({ className = "" }) => (
  <svg viewBox="0 0 200 220" className={className}>
    {/* Body */}
    <ellipse cx="100" cy="150" rx="60" ry="55" fill="#2d2d2d"/>
    {/* Head */}
    <circle cx="100" cy="75" r="50" fill="#3d3d3d"/>
    {/* Face */}
    <ellipse cx="100" cy="85" rx="30" ry="25" fill="#8B7355"/>
    {/* Eyes */}
    <ellipse cx="85" cy="70" rx="10" ry="12" fill="white"/>
    <ellipse cx="115" cy="70" rx="10" ry="12" fill="white"/>
    <circle cx="87" cy="72" r="5" fill="#0031A7"/>
    <circle cx="117" cy="72" r="5" fill="#0031A7"/>
    <circle cx="88" cy="70" r="2" fill="white"/>
    <circle cx="118" cy="70" r="2" fill="white"/>
    {/* Nose */}
    <ellipse cx="100" cy="88" rx="12" ry="8" fill="#5c4a3a"/>
    <circle cx="95" cy="88" r="3" fill="#3d3d3d"/>
    <circle cx="105" cy="88" r="3" fill="#3d3d3d"/>
    {/* Mouth - Smile */}
    <path d="M 85 100 Q 100 115 115 100" stroke="#3d3d3d" strokeWidth="3" fill="none"/>
    {/* Ears */}
    <circle cx="48" cy="70" r="12" fill="#3d3d3d"/>
    <circle cx="48" cy="70" r="7" fill="#8B7355"/>
    <circle cx="152" cy="70" r="12" fill="#3d3d3d"/>
    <circle cx="152" cy="70" r="7" fill="#8B7355"/>
    {/* Arms */}
    <ellipse cx="40" cy="140" rx="20" ry="40" fill="#2d2d2d"/>
    <ellipse cx="160" cy="140" rx="20" ry="40" fill="#2d2d2d"/>
    {/* Hands */}
    <ellipse cx="35" cy="175" rx="12" ry="10" fill="#3d3d3d"/>
    <ellipse cx="165" cy="175" rx="12" ry="10" fill="#3d3d3d"/>
    {/* Chest */}
    <ellipse cx="100" cy="145" rx="25" ry="20" fill="#4a4a4a"/>
    {/* Eyebrows */}
    <path d="M 75 55 Q 85 50 95 55" stroke="#2d2d2d" strokeWidth="4" fill="none"/>
    <path d="M 105 55 Q 115 50 125 55" stroke="#2d2d2d" strokeWidth="4" fill="none"/>
  </svg>
);

const FloatingElement = ({ children, delay = 0, duration = 3 }) => (
  <motion.div
    animate={{ y: [-10, 10, -10] }}
    transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

const QuestionReveal = ({ question, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const x = useTransform(scrollYProgress, [0, 0.5], [index % 2 === 0 ? -100 : 100, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, x }}
      className="py-16 md:py-24"
    >
      <h2 className="text-2xl md:text-4xl lg:text-5xl font-light text-white leading-tight">
        {question}
      </h2>
    </motion.div>
  );
};

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    grade: '',
    experience: '',
    idea: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  const inspiringQuestions = [
    "Do you ever notice problems on campus that no one seems to be fixing?",
    "Ever thought, \"Why hasn't someone built an app for this yet?\"",
    "Do systems around you feel outdated, inefficient, or unfair?",
    "Have you ever been frustrated by how hard it is to turn an idea into action?",
    "Do you want to build something meaningful?"
  ];

  const faqs = [
    {
      question: "What is a hackathon?",
      answer: "A hackathon is a week-long coding event where students come together to brainstorm, design, and build innovative solutions to real problems. It's not about 'hacking' in the security sense—it's about creative problem-solving and bringing ideas to life with more time to develop meaningful MVPs."
    },
    {
      question: "Who can participate?",
      answer: "GungaHacks is open to all Phillips Academy students. Whether you're a seasoned coder or have never written a line of code, you're welcome to join. We'll have mentors and resources to help everyone contribute."
    },
    {
      question: "Do I need to know how to code?",
      answer: "Not at all! Teams need designers, project managers, presenters, and creative thinkers just as much as they need coders. You'll learn a lot throughout the week, and we'll have mentorship sessions and workshops to help you get started."
    },
    {
      question: "How do teams work?",
      answer: "Teams can have 2-4 members. You can come with a team already formed, or we'll help you find teammates at the event. Some of the best projects come from people who just met!"
    },
    {
      question: "What can I build?",
      answer: "Anything that solves a problem you've observed on campus! Apps to manage stress, tools for building connections, scheduling helpers, study aids—if you've noticed an issue, you can build a solution for it."
    },
    {
      question: "What do I need to bring?",
      answer: "Just bring your laptop, charger, and your creativity. We'll provide food, snacks, drinks, and all the inspiration you need."
    },
    {
      question: "Is there a cost to participate?",
      answer: "GungaHacks is completely free! We want to make this accessible to everyone."
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.grade) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Submit to backend API (which handles Google Sheets submission)
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          grade: formData.grade.trim(),
          experience: formData.experience?.trim() || '',
          idea: formData.idea?.trim() || '',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ API Error:', errorData);
        throw new Error(errorData.error || 'Form submission failed');
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("✅ Registration submitted! Check your email.");
      console.log('✅ Form submitted successfully');
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({ name: '', email: '', grade: '', experience: '', idea: '' });
        setIsSubmitted(false);
      }, 3000);
      
    } catch (error) {
      setIsSubmitting(false);
      toast.error("Error submitting form. Please try again.");
      console.error('❌ Form submission error:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div ref={containerRef} className="bg-[#0a0a1a] min-h-screen overflow-x-hidden">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <GorillaCharacter className="w-10 h-10" />
            <span className="text-white font-bold text-xl">GungaHacks</span>
          </motion.div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-white/70 hover:text-white transition-colors">About</a>
            <a href="#details" className="text-white/70 hover:text-white transition-colors">Details</a>
            <a href="#faq" className="text-white/70 hover:text-white transition-colors">FAQ</a>
            <Button 
              className="bg-[#44b8f3] hover:bg-[#44b8f3]/90 text-white rounded-full px-6"
              onClick={() => document.getElementById('register').scrollIntoView({ behavior: 'smooth' })}
            >
              Register Now
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section 
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#0031A7]/20 blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-40 right-20 w-48 h-48 rounded-full bg-[#44b8f3]/20 blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.div 
            className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-[#0031A7]/30 blur-2xl"
            animate={{ y: [-20, 20, -20] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </div>

        {/* Floating Gorilla */}
        <FloatingElement delay={0} duration={4}>
          <div className="absolute bottom-10 right-10 md:right-20 opacity-40">
            <GorillaCharacter className="w-32 h-32 md:w-48 md:h-48" />
          </div>
        </FloatingElement>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <FloatingElement duration={5}>
              <GorillaCharacter className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6" />
            </FloatingElement>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4"
          >
            <span className="bg-gradient-to-r from-[#44b8f3] via-white to-[#0031A7] bg-clip-text text-transparent">
              GungaHacks
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-[#44b8f3] font-light mb-8"
          >
            Spring 2026 • Phillips Academy
          </motion.p>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12"
          >
            One week. 60-80 students. Infinite possibilities.
            <br />
            Build apps that solve real campus problems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              size="lg"
              className="bg-[#0031A7] hover:bg-[#0031A7]/90 text-white rounded-full px-8 py-6 text-lg"
              onClick={() => document.getElementById('register').scrollIntoView({ behavior: 'smooth' })}
            >
              Register Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-[#44b8f3] text-[#44b8f3] hover:bg-[#44b8f3]/10 hover:text-[#44b8f3] rounded-full px-8 py-6 text-lg"
              onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </Button>
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-white/50" />
        </motion.div>
      </motion.section>

      {/* Inspiring Questions Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto">
          {inspiringQuestions.map((question, index) => (
            <QuestionReveal key={index} question={question} index={index} />
          ))}
        </div>
        
        {/* Floating gorilla accent */}
        <FloatingElement delay={1} duration={5}>
          <div className="absolute left-5 top-1/3 opacity-20 hidden lg:block">
            <GorillaCharacter className="w-24 h-24" />
          </div>
        </FloatingElement>
      </section>

      {/* Answer Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            It's time to <span className="text-[#44b8f3]">build</span> the solution.
          </h2>
          <p className="text-xl text-white/70">
            Join GungaHacks and turn your ideas into reality.
          </p>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                What is <span className="text-[#44b8f3]">GungaHacks</span>?
              </h2>
              <p className="text-lg text-white/70 mb-6 leading-relaxed">
                GungaHacks is a student-run Phillips Academy hackathon designed to let contributors turn their web and mobile application ideas into real solutions for our school.
              </p>
              <p className="text-lg text-white/70 mb-6 leading-relaxed">
                Over one week, 60–80 students will come together with their friends, form teams, and develop computer apps to solve problems they've seen around campus.
              </p>
              <p className="text-lg text-white/70 leading-relaxed">
                Whether it's managing stress, building connections on a busy campus, or fixing outdated systems—if you've noticed a problem, you can build the solution.
              </p>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-[#0031A7]/30 to-[#44b8f3]/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
                <FloatingElement duration={4}>
                  <GorillaCharacter className="w-48 h-48 mx-auto mb-6" />
                </FloatingElement>
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-4xl font-bold text-[#44b8f3]">60-80</div>
                    <div className="text-white/60">Students</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-[#44b8f3]">1</div>
                    <div className="text-white/60">Week</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-[#44b8f3]">2-4</div>
                    <div className="text-white/60">Per Team</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-[#44b8f3]">∞</div>
                    <div className="text-white/60">Possibilities</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Details Section */}
      <section id="details" className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
          >
            Event <span className="text-[#44b8f3]">Details</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Calendar, title: "When", desc: "Spring 2026", sub: "One Week" },
              { icon: Users, title: "Who", desc: "60-80 Students", sub: "PA Students Only" },
              { icon: Trophy, title: "Prizes", desc: "$400 Worth", sub: "Tech & Tools" },
              { icon: Zap, title: "Format", desc: "Teams of 2-4", sub: "Build & Present" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-[#0031A7]/30 flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-8 h-8 text-[#44b8f3]" />
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-[#44b8f3] font-bold text-xl mb-1">{item.desc}</p>
                    <p className="text-white/50 text-sm">{item.sub}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Prizes Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white text-center mb-4"
          >
            Win Amazing <span className="text-[#44b8f3]">Prizes</span>
          </motion.h2>
          <p className="text-white/60 text-center mb-16 text-lg">
            Over $400 worth of tech gear and learning resources
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 border-white/10 h-full hover:bg-white/10 transition-all">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-xl bg-[#44b8f3]/20 flex items-center justify-center mb-4">
                    <Trophy className="w-7 h-7 text-[#44b8f3]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Top Prizes</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-white/80">
                      <Check className="w-5 h-5 text-[#44b8f3] mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">Mechanical Keyboards</strong> - Premium Keychron C3 Pro for top teams</span>
                    </li>
                    <li className="flex items-start gap-3 text-white/80">
                      <Check className="w-5 h-5 text-[#44b8f3] mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">Raspberry Pi Pico Starter Kits</strong> - Hands-on hardware learning</span>
                    </li>
                    <li className="flex items-start gap-3 text-white/80">
                      <Check className="w-5 h-5 text-[#44b8f3] mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">Arduino Starter Kit</strong> - Encourage continued innovation</span>
                    </li>
                    <li className="flex items-start gap-3 text-white/80">
                      <Check className="w-5 h-5 text-[#44b8f3] mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">Brilliant Subscription</strong> - Ongoing educational resource</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 border-white/10 h-full hover:bg-white/10 transition-all">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-xl bg-[#44b8f3]/20 flex items-center justify-center mb-4">
                    <Zap className="w-7 h-7 text-[#44b8f3]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Everyone Wins</h3>
                  <p className="text-white/80 mb-6 leading-relaxed">
                    All participants receive valuable experience, mentorship, and the chance to bring their ideas to life.
                  </p>
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[#44b8f3]/20 flex items-center justify-center">
                        <Check className="w-5 h-5 text-[#44b8f3]" />
                      </div>
                      <h4 className="text-white font-semibold text-lg">Certificates</h4>
                    </div>
                    <p className="text-white/70">
                      All winners receive professionally printed certificates recognizing their achievements and innovation.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 px-6 relative">
        <div className="max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white text-center mb-4"
          >
            Frequently Asked <span className="text-[#44b8f3]">Questions</span>
          </motion.h2>
          <p className="text-white/60 text-center mb-16">
            Everything you need to know about GungaHacks
          </p>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <AccordionItem 
                  value={`item-${index}`}
                  className="bg-white/5 border border-white/10 rounded-2xl px-6 overflow-hidden"
                >
                  <AccordionTrigger className="text-white text-lg font-medium hover:text-[#44b8f3] transition-colors py-6 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/70 pb-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0031A7]/10 to-[#0031A7]/20" />
        
        <div className="max-w-2xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <FloatingElement duration={4}>
              <GorillaCharacter className="w-20 h-20 mx-auto mb-6" />
            </FloatingElement>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to <span className="text-[#44b8f3]">Build</span>?
            </h2>
            <p className="text-white/60 text-lg">
              Register your interest for GungaHacks Spring 2026
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 space-y-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Full Name *</Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-white/10 border-white/20 text-white pl-12 h-12 rounded-xl focus:border-[#44b8f3] focus:ring-[#44b8f3]"
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-white/10 border-white/20 text-white pl-12 h-12 rounded-xl focus:border-[#44b8f3] focus:ring-[#44b8f3]"
                      placeholder="your.email@andover.edu"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="grade" className="text-white">Grade *</Label>
                  <div className="relative">
                    <School className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <select
                      id="grade"
                      name="grade"
                      value={formData.grade}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 text-white pl-12 h-12 rounded-xl focus:border-[#44b8f3] focus:ring-[#44b8f3] appearance-none"
                    >
                      <option value="" className="bg-[#0a0a1a]">Select your grade</option>
                      <option value="9th" className="bg-[#0a0a1a]">9th Grade (Junior)</option>
                      <option value="10th" className="bg-[#0a0a1a]">10th Grade (Lower)</option>
                      <option value="11th" className="bg-[#0a0a1a]">11th Grade (Upper)</option>
                      <option value="12th" className="bg-[#0a0a1a]">12th Grade (Senior)</option>
                      <option value="PG" className="bg-[#0a0a1a]">Post-Graduate</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-white">Coding Experience</Label>
                  <div className="relative">
                    <Rocket className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 text-white pl-12 h-12 rounded-xl focus:border-[#44b8f3] focus:ring-[#44b8f3] appearance-none"
                    >
                      <option value="" className="bg-[#0a0a1a]">Select your experience level</option>
                      <option value="None" className="bg-[#0a0a1a]">No experience (that's okay!)</option>
                      <option value="Beginner" className="bg-[#0a0a1a]">Beginner (some coding classes)</option>
                      <option value="Intermediate" className="bg-[#0a0a1a]">Intermediate (built a few projects)</option>
                      <option value="Advanced" className="bg-[#0a0a1a]">Advanced (comfortable building apps)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="idea" className="text-white">Any project ideas? (Optional)</Label>
                  <div className="relative">
                    <MessageCircle className="absolute left-4 top-4 w-5 h-5 text-white/40" />
                    <Textarea
                      id="idea"
                      name="idea"
                      value={formData.idea}
                      onChange={handleInputChange}
                      className="bg-white/10 border-white/20 text-white pl-12 min-h-[100px] rounded-xl focus:border-[#44b8f3] focus:ring-[#44b8f3] resize-none"
                      placeholder="What problems have you noticed on campus that you'd like to solve?"
                    />
                  </div>
                </div>

                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0031A7] hover:bg-[#0031A7]/90 text-white rounded-xl h-14 text-lg font-medium"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    <>Register Interest <ArrowRight className="ml-2 h-5 w-5" /></>
                  )}
                </Button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="w-20 h-20 rounded-full bg-[#44b8f3]/20 flex items-center justify-center mx-auto mb-6"
                >
                  <Check className="w-10 h-10 text-[#44b8f3]" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-4">You're on the list!</h3>
                <p className="text-white/60 mb-8">
                  We'll send you updates about GungaHacks Spring 2026. Get ready to build something amazing!
                </p>
                <FloatingElement duration={3}>
                  <GorillaCharacter className="w-24 h-24 mx-auto" />
                </FloatingElement>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <GorillaCharacter className="w-8 h-8" />
            <span className="text-white font-semibold">GungaHacks</span>
          </div>
          <p className="text-white/50 text-sm text-center md:text-left">
            A student-run hackathon at Phillips Academy
          </p>
          <div className="flex items-center gap-2">
            <span className="text-white/30 text-sm">Spring 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
