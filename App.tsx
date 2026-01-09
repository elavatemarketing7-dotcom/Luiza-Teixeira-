
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  CheckCircle, 
  Instagram, 
  MessageCircle, 
  Play, 
  MapPin, 
  Star, 
  ShieldCheck, 
  ArrowRight,
  Menu,
  X
} from 'lucide-react';
import { AppState } from './types';
import { EXPERT_NAME, PROFESSION, WHATSAPP_URL, INSTAGRAM_URL, IMAGES, QUIZ_QUESTIONS } from './constants';

export default function App() {
  const [appState, setAppState] = useState<AppState>(AppState.WELCOME);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showLightbox, setShowLightbox] = useState<string | null>(null);

  // Scroll to section helper
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 60; // Offset for the marquee height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleNextQuestion = (answer: string) => {
    const nextAnswers = [...answers, answer];
    setAnswers(nextAnswers);
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setAppState(AppState.ANALYZING);
      setTimeout(() => setAppState(AppState.RESULT), 2500);
    }
  };

  const shareQuizResults = () => {
    const text = `Olá Dra. Luiza! Concluí o quiz de avaliação personalizada. %0A%0ARespostas:%0A${QUIZ_QUESTIONS.map((q, i) => `- ${q.text}: ${answers[i]}`).join('%0A')}`;
    window.location.href = `https://api.whatsapp.com/send/?phone=5554999568188&text=${text}`;
  };

  const NavItem = ({ label, target }: { label: string, target: string }) => (
    <button 
      onClick={() => scrollTo(target)} 
      className="hover:text-[#c5a17e] transition-colors cursor-pointer px-4"
    >
      {label}
    </button>
  );

  const MarqueeContent = () => (
    <>
      <NavItem label="Início" target="hero" />
      <span className="opacity-30">/</span>
      <NavItem label="Sobre Mim" target="sobre" />
      <span className="opacity-30">/</span>
      <NavItem label="Prova Visual" target="resultados" />
      <span className="opacity-30">/</span>
      <NavItem label="Harmonização de 💚" target="harmony" />
      <span className="opacity-30">/</span>
      <NavItem label="Onde nos Encontrar" target="onde" />
      <span className="opacity-30">/</span>
      <NavItem label="Contato" target="contato" />
      <span className="opacity-30">/</span>
    </>
  );

  return (
    <div className="relative min-h-screen">
      {/* Marquee Navigation - Only visible when on main site */}
      {appState === AppState.MAIN_SITE && (
        <div className="fixed top-0 left-0 w-full z-50 bg-black/95 text-white py-3 overflow-hidden border-b border-white/10 shadow-lg">
          <div className="animate-marquee inline-flex whitespace-nowrap gap-8 text-[10px] uppercase tracking-[0.2em] font-bold">
            <MarqueeContent />
            <MarqueeContent />
            <MarqueeContent />
            <MarqueeContent />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {appState === AppState.WELCOME && (
          <motion.div 
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-[#fdfbf7]"
          >
            <div className="max-w-md w-full glass-card rounded-3xl p-8 text-center space-y-8 shadow-2xl">
              <div className="relative inline-block">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#c5a17e] shadow-lg mx-auto">
                   <img src={IMAGES.hero} alt={EXPERT_NAME} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1.5 border-2 border-white">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-3xl font-serif text-[#4a3b31]">{EXPERT_NAME}</h2>
                <p className="text-gray-600 leading-relaxed">
                  Prepare-se para uma experiência de beleza personalizada e exclusiva. Escolha como deseja prosseguir:
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => setAppState(AppState.QUIZ)}
                  className="w-full py-5 bg-[#4a3b31] text-white rounded-2xl font-semibold flex items-center justify-center gap-3 transition-transform hover:scale-105 active:scale-95 shadow-xl"
                >
                  <Star className="w-5 h-5 text-[#c5a17e]" />
                  Fazer Avaliação Personalizada
                </button>
                <button 
                  onClick={() => setAppState(AppState.MAIN_SITE)}
                  className="w-full py-4 border-2 border-[#4a3b31] text-[#4a3b31] rounded-2xl font-semibold flex items-center justify-center gap-2"
                >
                  Ir direto para o site
                </button>
                <button 
                  onClick={() => window.location.href = WHATSAPP_URL}
                  className="text-sm font-medium text-gray-500 hover:text-[#4a3b31] underline underline-offset-4"
                >
                  Chamar no WhatsApp agora
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {appState === AppState.QUIZ && (
          <motion.div 
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
          >
            <div className="max-w-md w-full bg-[#fdfbf7] rounded-3xl p-6 relative overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                   <img src={IMAGES.hero} className="w-10 h-10 rounded-full object-cover border-2 border-[#c5a17e]" />
                   <div>
                     <p className="text-[10px] uppercase tracking-tighter text-[#c5a17e] font-bold">Avaliando seu Perfil</p>
                     <p className="text-xs font-serif italic">{EXPERT_NAME}</p>
                   </div>
                </div>
                <button onClick={() => setAppState(AppState.WELCOME)} className="text-gray-400"><X /></button>
              </div>

              <div className="mb-6">
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                    className="h-full bg-[#c5a17e]"
                  />
                </div>
                <p className="text-right text-[10px] mt-2 font-bold text-gray-400">PASSO {currentQuestion + 1} DE {QUIZ_QUESTIONS.length}</p>
              </div>

              <h3 className="text-2xl font-serif text-[#4a3b31] mb-8 leading-tight">
                {QUIZ_QUESTIONS[currentQuestion].text}
              </h3>

              <div className="grid gap-3">
                {QUIZ_QUESTIONS[currentQuestion].options.map((opt, i) => (
                  <button 
                    key={i}
                    onClick={() => handleNextQuestion(opt)}
                    className="w-full p-4 rounded-2xl bg-white border border-gray-100 shadow-sm text-left hover:border-[#c5a17e] hover:bg-gray-50 transition-all active:scale-95 text-gray-700 font-medium flex justify-between items-center group"
                  >
                    {opt}
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#c5a17e]" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {appState === AppState.ANALYZING && (
          <motion.div 
            key="analyzing"
            className="fixed inset-0 z-[60] bg-[#fdfbf7] flex flex-col items-center justify-center p-8"
          >
            <div className="w-24 h-24 mb-8 border-4 border-[#c5a17e]/20 border-t-[#c5a17e] rounded-full animate-spin" />
            <h2 className="text-2xl font-serif text-[#4a3b31] mb-2">Analisando Respostas...</h2>
            <p className="text-gray-500 text-center max-w-xs">Buscando as melhores técnicas para o seu perfil exclusivo.</p>
          </motion.div>
        )}

        {appState === AppState.RESULT && (
          <motion.div 
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-[#4a3b31] p-0 sm:p-4 overflow-y-auto"
          >
            <div className="w-full h-full sm:h-auto sm:max-w-md bg-[#fdfbf7] sm:rounded-3xl flex flex-col items-center p-8 space-y-6 text-center">
              <div className="bg-green-100 text-green-700 px-6 py-2 rounded-full font-bold uppercase tracking-widest text-[10px] animate-bounce">
                Perfil Compatível. Você é a Paciente ideal.
              </div>

              <div className="w-40 h-40 rounded-full overflow-hidden border-8 border-white shadow-2xl rotate-3">
                <img src={IMAGES.hero} className="w-full h-full object-cover" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-serif text-[#4a3b31]">Pronto para Começar?</h3>
                <p className="text-gray-600 text-sm px-4">
                  Com base nas suas respostas, o Método da <b>{EXPERT_NAME}</b> consegue entregar exatamente a naturalidade e segurança que você procura.
                </p>
              </div>

              <div className="flex flex-col gap-3 w-full">
                <button 
                  onClick={shareQuizResults}
                  className="w-full py-5 bg-[#c5a17e] text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-[#c5a17e]/30"
                >
                  <CheckCircle className="w-5 h-5" />
                  1- ENVIAR MINHA AVALIAÇÃO A DRA.
                </button>
                <button 
                  onClick={() => window.location.href = WHATSAPP_URL}
                  className="w-full py-4 border-2 border-green-600 text-green-600 rounded-2xl font-bold"
                >
                  2- CHAMAR NO WHATSAPP SEM COMPROMISSO
                </button>
                <button 
                  onClick={() => setAppState(AppState.MAIN_SITE)}
                  className="w-full py-4 text-gray-400 text-sm font-medium underline"
                >
                  3- NÃO ENVIAR E CONTINUAR NO SITE
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Landing Page Content */}
      <main className={`${appState === AppState.MAIN_SITE ? 'block' : 'hidden'} pt-12`}>
        {/* HERO SECTION */}
        <section id="hero" className="relative pt-10 pb-20 overflow-hidden px-6">
          <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-8 order-2 md:order-1"
            >
              <h1 className="text-5xl md:text-7xl font-serif leading-tight text-[#4a3b31]">
                Olá, eu sou a <br/>
                <span className="italic font-light">{EXPERT_NAME}</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                Minha missão é realçar sua beleza de forma natural, segura e com foco na sua identidade única. Sem exageros, apenas a sua melhor versão.
              </p>
              <div className="space-y-4 pt-4">
                <button 
                  onClick={() => window.location.href = WHATSAPP_URL}
                  className="w-full sm:w-auto px-10 py-5 bg-[#4a3b31] text-white rounded-full font-bold text-lg flex items-center justify-center gap-3 shadow-2xl hover:scale-105 transition-transform"
                >
                  Agendar consulta no WhatsApp
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="relative order-1 md:order-2"
            >
              <div className="absolute inset-0 bg-[#c5a17e] rounded-[100px] rotate-6 scale-95 opacity-20" />
              <img src={IMAGES.hero} alt={EXPERT_NAME} className="relative z-10 w-full rounded-[100px] border-8 border-white shadow-2xl" />
            </motion.div>
          </div>
        </section>

        {/* VIDEO SECTION */}
        <section className="py-20 px-6 bg-white">
          <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
             <div className="relative group cursor-pointer overflow-hidden rounded-[40px] shadow-2xl aspect-video">
                <video 
                  controls
                  className="w-full h-full object-cover"
                  poster={IMAGES.hero}
                >
                  <source src={IMAGES.videoUrl} type="video/mp4" />
                </video>
             </div>
             <div className="space-y-6">
               <h3 className="text-3xl font-serif text-[#4a3b31]">Descubra como a beleza pode ser realçada com técnica e sensibilidade.</h3>
               <p className="text-gray-600 leading-relaxed italic">
                 "Aperte o play e sinta a diferença de ser cuidada por quem entende que sua beleza é única, e merece atenção especial."
               </p>
               <div className="flex items-center gap-4 text-[#c5a17e] font-bold uppercase tracking-widest text-xs">
                 <div className="h-[1px] w-12 bg-[#c5a17e]" />
                 Resultados reais e transformadores
               </div>
             </div>
          </div>
        </section>

        {/* QUEM SOU EU SECTION */}
        <section id="sobre" className="py-24 px-6 bg-[#fdfbf7]">
          <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img src={IMAGES.hero} className="rounded-3xl shadow-xl w-full" />
              <div className="absolute -bottom-10 -right-10 hidden lg:block w-64 p-6 glass-card rounded-2xl shadow-2xl">
                <p className="font-serif italic text-lg text-[#4a3b31]">"Beleza é harmonia, não perfeição."</p>
              </div>
            </div>
            <div className="space-y-8">
              <div className="inline-block px-4 py-1 bg-[#c5a17e]/10 text-[#c5a17e] rounded-full text-xs font-bold uppercase tracking-widest">Autoridade</div>
              <h2 className="text-4xl md:text-5xl font-serif text-[#4a3b31]">Especialista em Naturalidade</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Com anos de experiência em Harmonização Facial, desenvolvi um olhar criterioso que prioriza a elegância e o equilíbrio. Minha abordagem não é padronizada; cada paciente recebe um planejamento único.
              </p>
              <ul className="grid gap-4">
                {[
                  "Avaliação individualizada e minuciosa",
                  "Uso exclusivo de produtos de alta performance",
                  "Protocolos de segurança rigorosos",
                  "Foco total em resultados discretos e naturais"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-[#4a3b31] font-medium">
                    <div className="p-1 bg-[#c5a17e] rounded-full"><CheckCircle className="w-4 h-4 text-white" /></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* GALERIA RESULTADOS REAIS */}
        <section id="resultados" className="py-24 px-6 bg-white">
          <div className="container mx-auto text-center mb-16 space-y-4">
             <h2 className="text-4xl md:text-5xl font-serif text-[#4a3b31]">Resultados Reais</h2>
             <p className="text-gray-500 max-w-2xl mx-auto">Galeria exclusiva de transformações baseadas no Método {EXPERT_NAME}.</p>
          </div>
          
          <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {IMAGES.results.map((src, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setShowLightbox(src)}
                className="aspect-square relative group cursor-zoom-in overflow-hidden rounded-2xl"
              >
                <img src={src} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <div className="p-3 bg-white/50 backdrop-blur rounded-full text-white"><Star className="w-6 h-6" /></div>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-[10px] uppercase font-bold text-gray-300 mt-12 tracking-[0.2em]">⚠️ Aviso: Resultados podem variar de pessoa para pessoa.</p>
        </section>

        {/* POR QUE CONFIAR */}
        <section className="py-24 px-6 bg-[#4a3b31]">
           <div className="container mx-auto">
             <div className="grid md:grid-cols-3 gap-8">
               {[
                 { title: "Avaliação Honesta", desc: "Só indico o que realmente trará benefício para sua harmonia facial.", icon: <ShieldCheck className="w-8 h-8"/> },
                 { title: "Atendimento Exclusivo", desc: "Todo o procedimento é realizado pessoalmente por mim, com calma e precisão.", icon: <Star className="w-8 h-8"/> },
                 { title: "Transparência Total", desc: "Você entenderá cada etapa, produto e expectativa real do seu resultado.", icon: <MessageCircle className="w-8 h-8"/> }
               ].map((card, i) => (
                 <div key={i} className="p-8 bg-white/5 rounded-3xl border border-white/10 text-white space-y-4 hover:bg-white/10 transition-colors">
                   <div className="text-[#c5a17e]">{card.icon}</div>
                   <h3 className="text-xl font-serif">{card.title}</h3>
                   <p className="text-gray-400 leading-relaxed text-sm">{card.desc}</p>
                 </div>
               ))}
             </div>
           </div>
        </section>

        {/* HARMONIZAÇÃO DE CORAÇÃO */}
        <section id="harmony" className="py-24 px-6 bg-[#fdfbf7]">
          <div className="container mx-auto">
             <div className="text-center mb-16">
               <h2 className="text-4xl font-serif text-[#4a3b31]">Harmonização Facial de 💚</h2>
               <p className="text-gray-500 mt-4">Transformações feitas com alma e propósito.</p>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {IMAGES.harmonyGrid.map((src, i) => (
                  <div key={i} className="aspect-square rounded-3xl overflow-hidden shadow-lg">
                    <img src={src} className="w-full h-full object-cover" />
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section className="py-24 px-6 bg-white">
          <div className="container mx-auto max-w-4xl">
             <h2 className="text-3xl font-serif text-[#4a3b31] text-center mb-16">Como funciona a sua primeira consulta?</h2>
             <div className="grid gap-12">
               {[
                 { step: "01", title: "Primeiro Contato", desc: "Ao clicar no botão, você falará com minha equipe para tirar dúvidas iniciais." },
                 { step: "02", title: "Agendamento VIP", desc: "Reservamos um horário exclusivo para que possamos conversar com calma." },
                 { step: "03", title: "Avaliação 360º", desc: "Na consulta, analisamos sua face em todos os ângulos para criar seu plano mestre." }
               ].map((item, i) => (
                 <div key={i} className="flex gap-8 items-start group">
                   <span className="text-4xl font-serif italic text-[#c5a17e]/30 group-hover:text-[#c5a17e] transition-colors">{item.step}</span>
                   <div className="space-y-2">
                     <h3 className="text-xl font-bold text-[#4a3b31]">{item.title}</h3>
                     <p className="text-gray-600">{item.desc}</p>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </section>

        {/* DEPOIMENTOS / COMENTARIOS */}
        <section className="py-24 px-6 bg-[#f5f0e9]">
           <div className="container mx-auto overflow-hidden">
              <h2 className="text-3xl font-serif text-[#4a3b31] text-center mb-12">O que as pacientes dizem</h2>
              <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x">
                {IMAGES.testimonials.map((src, i) => (
                  <div key={i} className="min-w-[280px] snap-center bg-white p-4 rounded-3xl shadow-xl flex-shrink-0">
                    <img src={src} className="w-full rounded-2xl" />
                  </div>
                ))}
              </div>
           </div>
        </section>

        {/* MAPA E ENDEREÇO */}
        <section id="onde" className="py-24 px-6 bg-white">
           <div className="container mx-auto max-w-5xl">
              <div className="text-center mb-12">
                <MapPin className="w-10 h-10 text-[#c5a17e] mx-auto mb-4" />
                <h2 className="text-3xl font-serif text-[#4a3b31]">Onde nos Encontrar</h2>
                <p className="text-gray-500 mt-2">Harmonização Facial - {EXPERT_NAME}</p>
              </div>
              <div className="rounded-[40px] overflow-hidden shadow-2xl h-[400px] bg-gray-100 border-8 border-white">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3493.5654326543!2d-52.41!3d-28.26!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDE1JzM2LjAiUyA1MsKwMjQnMzYuMCJX!5e0!3m2!1spt-BR!2sbr!4v1234567890" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                />
              </div>
              <div className="mt-8 text-center space-y-4">
                 <p className="text-lg font-medium text-gray-700">Passo Fundo - Rio Grande do Sul</p>
                 <a href={INSTAGRAM_URL} target="_blank" className="inline-flex items-center gap-2 text-[#c5a17e] hover:underline font-bold">
                   <Instagram className="w-5 h-5" /> @dra.luizateixeira
                 </a>
              </div>
           </div>
        </section>

        {/* CTA FINAL / CONTATO */}
        <section id="contato" className="py-24 px-6 bg-[#4a3b31] text-white text-center">
           <div className="container mx-auto space-y-8">
             <h2 className="text-4xl md:text-5xl font-serif leading-tight">Chegou a hora de investir no seu <br/> maior patrimônio: <span className="italic">Você.</span></h2>
             <p className="text-gray-300 max-w-lg mx-auto">Reserve sua primeira consulta sem compromisso e comece sua transformação.</p>
             <button 
               onClick={() => window.location.href = WHATSAPP_URL}
               className="inline-flex items-center gap-3 px-12 py-6 bg-[#c5a17e] rounded-full text-white font-bold text-xl shadow-2xl hover:scale-105 transition-transform"
             >
               Quero minha Avaliação Gratuita
               <MessageCircle className="w-6 h-6" />
             </button>
             <p className="text-xs text-gray-400 mt-4 italic">Fale diretamente com nossa equipe no WhatsApp.</p>
           </div>
        </section>

        {/* FOOTER */}
        <footer className="py-12 px-6 bg-white border-t border-gray-100 text-center space-y-6">
           <h3 className="font-signature text-5xl text-[#4a3b31]">{EXPERT_NAME}</h3>
           <div className="space-y-2">
             <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">{PROFESSION}</p>
             <p className="text-xs text-gray-400">© 2024 Todos os direitos reservados.</p>
           </div>
           <div className="flex justify-center gap-6 text-gray-400">
             <Instagram className="w-5 h-5 cursor-pointer hover:text-[#c5a17e]" />
             <MessageCircle className="w-5 h-5 cursor-pointer hover:text-[#c5a17e]" />
           </div>
        </footer>
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {showLightbox && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLightbox(null)}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
          >
             <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={showLightbox} 
              className="max-w-full max-h-full rounded-2xl shadow-2xl"
             />
             <button className="absolute top-8 right-8 text-white"><X className="w-8 h-8" /></button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent CTA Button Mobile */}
      {appState === AppState.MAIN_SITE && (
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-6 right-6 z-50 md:hidden"
        >
          <button 
            onClick={() => window.location.href = WHATSAPP_URL}
            className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl border-4 border-white animate-bounce"
          >
            <MessageCircle className="w-8 h-8 fill-current" />
          </button>
        </motion.div>
      )}
    </div>
  );
}
