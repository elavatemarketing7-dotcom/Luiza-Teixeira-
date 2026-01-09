
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  CheckCircle, 
  Instagram, 
  MessageCircle, 
  MapPin, 
  Star, 
  ShieldCheck, 
  ArrowRight,
  X
} from 'lucide-react';
import { AppState } from './types';
import { EXPERT_NAME, PROFESSION, WHATSAPP_URL, INSTAGRAM_URL, IMAGES, QUIZ_QUESTIONS } from './constants';

export default function App() {
  const [appState, setAppState] = useState<AppState>(AppState.WELCOME);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showLightbox, setShowLightbox] = useState<string | null>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 60;
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

  const openWhatsApp = () => {
    window.open(WHATSAPP_URL, '_blank');
  };

  const shareQuizResults = () => {
    const text = encodeURIComponent(`Olá Dra. Luiza! Concluí o quiz de avaliação personalizada.\n\nRespostas:\n${QUIZ_QUESTIONS.map((q, i) => `- ${q.text}: ${answers[i]}`).join('\n')}`);
    const url = `https://api.whatsapp.com/send/?phone=5554999568188&text=${text}&type=phone_number&app_absent=0&utm_source=ig`;
    window.open(url, '_blank');
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

  const isOverlayActive = [AppState.QUIZ, AppState.ANALYZING, AppState.RESULT].includes(appState);

  return (
    <div className="relative min-h-screen">
      {appState !== AppState.WELCOME && (
        <div className="fixed top-0 left-0 w-full z-[70] bg-black/95 text-white py-3 overflow-hidden border-b border-white/10 shadow-lg">
          <div className="animate-marquee inline-flex whitespace-nowrap gap-8 text-[10px] uppercase tracking-[0.2em] font-bold">
            <MarqueeContent />
            <MarqueeContent />
            <MarqueeContent />
            <MarqueeContent />
          </div>
        </div>
      )}

      <AnimatePresence>
        {appState === AppState.WELCOME && (
          <motion.div 
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#fdfbf7]"
          >
            <div className="max-w-md w-full glass-card rounded-3xl p-8 text-center space-y-8 shadow-2xl">
              <div className="relative inline-block">
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#c5a17e] shadow-lg mx-auto">
                   <img src={IMAGES.hero} alt={EXPERT_NAME} className="w-full h-full object-cover object-top" />
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
                  onClick={openWhatsApp}
                  className="text-sm font-medium text-gray-500 hover:text-[#4a3b31] underline underline-offset-4"
                >
                  Chamar no WhatsApp agora
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {appState === AppState.QUIZ && (
          <motion.div 
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
          >
            <div className="max-w-md w-full bg-[#fdfbf7] rounded-3xl p-6 relative overflow-hidden shadow-2xl border border-[#c5a17e]/20">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                   <div className="relative">
                      <img src={IMAGES.hero} className="w-12 h-12 rounded-full object-cover object-top border-2 border-[#c5a17e]" />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#c5a17e] rounded-full border-2 border-white flex items-center justify-center">
                        <Star className="w-2 h-2 text-white fill-current" />
                      </div>
                   </div>
                   <div>
                     <p className="text-[10px] uppercase tracking-tighter text-[#c5a17e] font-bold">Avaliando seu Perfil</p>
                     <p className="text-sm font-serif italic text-[#4a3b31]">{EXPERT_NAME}</p>
                   </div>
                </div>
                <button onClick={() => setAppState(AppState.MAIN_SITE)} className="text-gray-400 p-2 hover:bg-gray-100 rounded-full transition-colors"><X className="w-5 h-5"/></button>
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
      </AnimatePresence>

      <AnimatePresence>
        {appState === AppState.ANALYZING && (
          <motion.div 
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-[#fdfbf7]/90 backdrop-blur-xl flex flex-col items-center justify-center p-8"
          >
            <div className="relative w-32 h-32 mb-8">
               <div className="absolute inset-0 border-4 border-[#c5a17e]/10 border-t-[#c5a17e] rounded-full animate-spin" />
               <img src={IMAGES.hero} className="absolute inset-4 w-24 h-24 rounded-full object-cover object-top filter grayscale opacity-50" />
            </div>
            <h2 className="text-2xl font-serif text-[#4a3b31] mb-2">Analisando Respostas...</h2>
            <p className="text-gray-500 text-center max-w-xs font-medium">Buscando as melhores técnicas para o seu perfil exclusivo.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {appState === AppState.RESULT && (
          <motion.div 
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 backdrop-blur-lg p-0 sm:p-4 overflow-y-auto"
          >
            <div className="w-full h-full sm:h-auto sm:max-w-md bg-[#fdfbf7] sm:rounded-3xl flex flex-col items-center p-8 space-y-6 text-center shadow-2xl relative">
              <button onClick={() => setAppState(AppState.MAIN_SITE)} className="absolute top-4 right-4 text-gray-400"><X /></button>
              
              <div className="bg-green-100 text-green-700 px-6 py-2 rounded-full font-bold uppercase tracking-widest text-[10px] animate-bounce">
                Perfil Compatível. Você é a Paciente ideal.
              </div>

              <div className="relative">
                <div className="w-44 h-44 rounded-full overflow-hidden border-8 border-white shadow-2xl transform hover:rotate-2 transition-transform">
                  <img src={IMAGES.hero} className="w-full h-full object-cover object-top" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white p-3 rounded-full shadow-lg">
                   <Star className="w-6 h-6 text-[#c5a17e] fill-current" />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-serif text-[#4a3b31]">Pronto para Começar?</h3>
                <p className="text-gray-600 text-sm px-4 leading-relaxed">
                  Com base nas suas respostas, o Método da <b>{EXPERT_NAME}</b> consegue entregar exatamente a naturalidade e segurança que você procura.
                </p>
              </div>

              <div className="flex flex-col gap-3 w-full pt-4">
                <button 
                  onClick={shareQuizResults}
                  className="w-full py-5 bg-[#c5a17e] text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-[#c5a17e]/30 hover:bg-[#b38f6d] transition-all"
                >
                  <CheckCircle className="w-5 h-5" />
                  1- ENVIAR MINHA AVALIAÇÃO A DRA.
                </button>
                <button 
                  onClick={openWhatsApp}
                  className="w-full py-4 border-2 border-green-600 text-green-600 rounded-2xl font-bold hover:bg-green-50 transition-all"
                >
                  2- CHAMAR NO WHATSAPP SEM COMPROMISSO
                </button>
                <button 
                  onClick={() => setAppState(AppState.MAIN_SITE)}
                  className="w-full py-4 bg-gray-100 text-gray-500 rounded-2xl font-bold hover:bg-gray-200 transition-all"
                >
                  3- NÃO ENVIAR E CONTINUAR NO SITE
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className={`transition-all duration-700 ${appState === AppState.WELCOME ? 'opacity-0' : 'opacity-100'} ${isOverlayActive ? 'blur-md pointer-events-none scale-95' : 'blur-0 pointer-events-auto scale-100'} pt-12`}>
        <section id="hero" className="relative pt-16 pb-24 overflow-hidden px-6 bg-[#fdfbf7]">
          <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-8 order-2 md:order-1 relative z-10"
            >
              <div className="inline-block px-4 py-1 bg-[#c5a17e]/10 text-[#c5a17e] rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                Especialista em Harmonização
              </div>
              <h1 className="text-5xl md:text-8xl font-serif leading-[1.1] text-[#4a3b31]">
                Olá, eu sou a <br/>
                <span className="italic font-light">{EXPERT_NAME}</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                Minha missão é realçar sua beleza de forma natural, segura e com foco na sua identidade única. Sem exageros, apenas a sua melhor versão.
              </p>
              <div className="space-y-4 pt-6">
                <button 
                  onClick={openWhatsApp}
                  className="w-full sm:w-auto px-12 py-6 bg-[#4a3b31] text-white rounded-full font-bold text-lg flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(74,59,49,0.3)] hover:scale-105 transition-transform"
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
              className="relative order-1 md:order-2 flex justify-center"
            >
              <div className="relative w-full max-w-[500px]">
                <div className="absolute -inset-6 bg-[#c5a17e]/10 rounded-[100px] rotate-6 scale-95 blur-3xl" />
                <div className="relative z-10 p-2 bg-white rounded-[80px] shadow-2xl overflow-hidden border border-gray-100">
                  <img src={IMAGES.hero} alt={EXPERT_NAME} className="w-full h-full object-cover object-top rounded-[72px]" />
                </div>
                <div className="absolute -bottom-6 -left-6 z-20 bg-white p-6 rounded-3xl shadow-2xl border border-gray-50 space-y-2 hidden md:block">
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-[#c5a17e] fill-current" />)}
                  </div>
                  <p className="text-xs font-bold text-[#4a3b31]">+500 Pacientes Satisfeitas</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-24 px-6 bg-white overflow-hidden">
          <div className="container mx-auto max-w-[1280px]">
            <div className="grid md:grid-cols-12 gap-12 items-center">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 className="md:col-span-8 relative group cursor-pointer overflow-hidden rounded-[40px] md:rounded-[60px] shadow-[0_40px_80px_rgba(0,0,0,0.15)] aspect-video border-[10px] md:border-[16px] border-white bg-black ring-1 ring-gray-100"
               >
                  <video 
                    controls
                    className="w-full h-full object-cover"
                    poster={IMAGES.hero}
                  >
                    <source src={IMAGES.videoUrl} type="video/mp4" />
                  </video>
                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-[10px] font-bold uppercase tracking-widest hidden md:block">
                    High Definition 720p
                  </div>
               </motion.div>
               <div className="md:col-span-4 space-y-8">
                 <div className="space-y-6">
                   <h3 className="text-4xl md:text-5xl font-serif text-[#4a3b31] leading-[1.2]">Descubra a beleza em alta definição.</h3>
                   <p className="text-gray-600 leading-relaxed italic text-xl border-l-4 border-[#c5a17e] pl-6 py-2">
                     "Aperte o play e sinta a diferença de ser cuidada por quem entende que sua beleza é única e merece atenção especial."
                   </p>
                 </div>
                 <div className="flex items-center gap-4 text-[#c5a17e] font-bold uppercase tracking-[0.2em] text-[10px]">
                   <div className="h-[2px] w-12 bg-[#c5a17e]" />
                   Técnica, Sensibilidade e Propósito
                 </div>
               </div>
            </div>
          </div>
        </section>

        <section id="sobre" className="py-32 px-6 bg-[#fdfbf7]">
          <div className="container mx-auto grid md:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="relative z-10 bg-white p-4 rounded-3xl shadow-2xl border border-gray-100">
                <img src={IMAGES.hero} className="rounded-2xl shadow-inner w-full h-[600px] object-cover object-top" />
              </div>
              <div className="absolute -bottom-10 -right-10 hidden lg:block w-72 p-8 glass-card rounded-3xl shadow-2xl border border-white/50">
                <p className="font-serif italic text-xl text-[#4a3b31] leading-relaxed">"A verdadeira beleza está na harmonia que reflete quem você é."</p>
                <div className="mt-4 font-signature text-3xl text-[#c5a17e]">{EXPERT_NAME}</div>
              </div>
            </div>
            <div className="space-y-10">
              <div className="inline-block px-4 py-1 bg-[#c5a17e]/10 text-[#c5a17e] rounded-full text-xs font-bold uppercase tracking-widest">Trajetória e Propósito</div>
              <h2 className="text-5xl md:text-6xl font-serif text-[#4a3b31] leading-tight">Especialista em Naturalidade</h2>
              <p className="text-gray-600 leading-relaxed text-xl">
                Com anos de dedicação exclusiva à Harmonização Facial, meu foco é devolver o que o tempo tirou, sem transformar você em outra pessoa. Minha técnica é baseada em ciência, sensibilidade e um olhar artístico individualizado.
              </p>
              <ul className="grid gap-6">
                {[
                  "Avaliação individualizada e minuciosa",
                  "Uso exclusivo de produtos de alta performance",
                  "Protocolos de segurança rigorosos",
                  "Foco total em resultados discretos e elegantes"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-5 text-[#4a3b31] font-semibold text-lg">
                    <div className="p-2 bg-[#c5a17e] rounded-xl shadow-lg shadow-[#c5a17e]/20"><CheckCircle className="w-5 h-5 text-white" /></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="resultados" className="py-32 px-6 bg-white">
          <div className="container mx-auto text-center mb-20 space-y-6">
             <h2 className="text-5xl md:text-6xl font-serif text-[#4a3b31]">Galeria de Resultados</h2>
             <p className="text-gray-500 max-w-2xl mx-auto text-lg italic">"A naturalidade é a sofisticação máxima." — Confira transformações reais.</p>
          </div>
          
          <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {IMAGES.results.map((src, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setShowLightbox(src)}
                className="aspect-[4/5] relative group cursor-zoom-in overflow-hidden rounded-[32px] shadow-lg border-4 border-white"
              >
                <img src={src} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-6 text-center">
                   <div className="p-4 bg-white/20 backdrop-blur rounded-full text-white mb-4"><Star className="w-8 h-8 fill-current" /></div>
                   <p className="text-white text-xs font-bold uppercase tracking-widest">Ver Detalhes</p>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-[10px] uppercase font-bold text-gray-300 mt-16 tracking-[0.3em]">⚠️ Nota: Cada face é única. Resultados são personalizados e variam entre pacientes.</p>
        </section>

        <section id="harmony" className="py-32 px-6 bg-[#fdfbf7]">
          <div className="container mx-auto">
             <div className="text-center mb-20 space-y-4">
               <h2 className="text-5xl font-serif text-[#4a3b31]">Harmonização de 💚</h2>
               <p className="text-gray-500 text-lg italic">Momentos e transformações que marcam vidas.</p>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {IMAGES.harmonyGrid.map((src, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ y: -10 }}
                    className="aspect-square rounded-[40px] overflow-hidden shadow-2xl border-8 border-white"
                  >
                    <img src={src} className="w-full h-full object-cover" />
                  </motion.div>
                ))}
             </div>
          </div>
        </section>

        <section id="onde" className="py-32 px-6 bg-white">
           <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-16 space-y-4">
                <div className="w-20 h-20 bg-[#c5a17e]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-10 h-10 text-[#c5a17e]" />
                </div>
                <h2 className="text-5xl font-serif text-[#4a3b31]">Onde nos Encontrar</h2>
                <p className="text-gray-500 text-lg">Ambiente exclusivo planejado para seu total conforto e segurança.</p>
              </div>
              <div className="rounded-[60px] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.1)] h-[500px] bg-gray-100 border-[12px] border-white">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3493.5654326543!2d-52.41!3d-28.26!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDE1JzM2LjAiUyA1MsKwMjQnMzYuMCJX!5e0!3m2!1spt-BR!2sbr!4v1234567890" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                />
              </div>
              <div className="mt-12 text-center space-y-6">
                 <p className="text-2xl font-serif text-[#4a3b31]">Passo Fundo - Rio Grande do Sul</p>
                 <a href={INSTAGRAM_URL} target="_blank" className="inline-flex items-center gap-3 px-8 py-3 bg-white shadow-xl rounded-full text-[#c5a17e] hover:scale-105 transition-transform font-bold border border-gray-100">
                   <Instagram className="w-6 h-6" /> @dra.luizateixeira
                 </a>
              </div>
           </div>
        </section>

        <section id="contato" className="py-32 px-6 bg-[#4a3b31] text-white text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
           <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#c5a17e]/10 rounded-full translate-x-1/4 translate-y-1/4 blur-3xl" />
           
           <div className="container mx-auto space-y-10 relative z-10">
             <h2 className="text-5xl md:text-7xl font-serif leading-tight">Chegou a hora de investir no seu <br/> maior patrimônio: <span className="italic">Você.</span></h2>
             <p className="text-gray-300 max-w-lg mx-auto text-xl font-light">Sua beleza merece o cuidado de quem entende que o detalhe faz toda a diferença.</p>
             <button 
               onClick={openWhatsApp}
               className="inline-flex items-center gap-4 px-14 py-7 bg-[#c5a17e] rounded-full text-white font-bold text-2xl shadow-[0_30px_60px_rgba(197,161,126,0.3)] hover:scale-105 transition-transform"
             >
               Quero minha Avaliação Gratuita
               <MessageCircle className="w-8 h-8 fill-current" />
             </button>
             <div className="pt-8 flex flex-col items-center gap-4 opacity-50">
                <p className="text-xs uppercase tracking-[0.3em] font-bold">Atendimento via WhatsApp</p>
                <div className="flex gap-2">
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                </div>
             </div>
           </div>
        </section>

        <footer className="py-20 px-6 bg-white border-t border-gray-100 text-center space-y-10">
           <h3 className="font-signature text-6xl text-[#4a3b31]">{EXPERT_NAME}</h3>
           <div className="space-y-4">
             <p className="text-xs font-bold tracking-[0.4em] text-gray-400 uppercase">{PROFESSION}</p>
             <div className="w-12 h-[2px] bg-[#c5a17e] mx-auto opacity-30" />
             <p className="text-xs text-gray-400 font-medium">© 2024 • Todos os direitos reservados • Premium Experience</p>
           </div>
           <div className="flex justify-center gap-10 text-gray-400">
             <a href={INSTAGRAM_URL} target="_blank" className="hover:text-[#c5a17e] transition-colors"><Instagram className="w-6 h-6" /></a>
             <button onClick={openWhatsApp} className="hover:text-[#c5a17e] transition-colors"><MessageCircle className="w-6 h-6" /></button>
           </div>
        </footer>
      </main>

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
              className="max-w-full max-h-full rounded-2xl shadow-2xl border-4 border-white/10"
             />
             <button className="absolute top-8 right-8 text-white bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"><X className="w-8 h-8" /></button>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOverlayActive && appState !== AppState.WELCOME && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-8 right-8 z-[60] md:hidden"
        >
          <button 
            onClick={openWhatsApp}
            className="w-18 h-18 bg-green-500 text-white rounded-full flex items-center justify-center shadow-[0_20px_40px_rgba(34,197,94,0.4)] border-4 border-white active:scale-90 transition-transform"
          >
            <MessageCircle className="w-10 h-10 fill-current" />
          </button>
        </motion.div>
      )}
    </div>
  );
}
