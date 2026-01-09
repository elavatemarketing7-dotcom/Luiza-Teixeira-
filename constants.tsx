
import { Question } from './types';

export const EXPERT_NAME = "Dra. Luiza Teixeira";
export const PROFESSION = "Harmonização Facial";
export const WHATSAPP_URL = "https://api.whatsapp.com/send/?phone=5554999568188&text&type=phone_number&app_absent=0&utm_source=ig";
export const INSTAGRAM_URL = "https://www.instagram.com/dra.luizateixeira/";

export const IMAGES = {
  hero: "https://i.imgur.com/kpIMeJV.png",
  author1: "https://i.imgur.com/kpIMeJV.png", // Link reused for authority sections
  videoThumb: "https://i.imgur.com/kpIMeJV.png",
  videoUrl: "https://i.imgur.com/9JkR125.mp4",
  results: [
    "https://i.imgur.com/0mJ990h.png",
    "https://i.imgur.com/2K5dUPX.png",
    "https://i.imgur.com/mQgUkyj.png",
    "https://i.imgur.com/YgGfhNG.png",
    "https://i.imgur.com/t1D8XJy.png",
    "https://i.imgur.com/SUGrHep.png",
    "https://i.imgur.com/j0KVujy.png",
    "https://i.imgur.com/zMgVJzE.png",
    "https://i.imgur.com/moQr6xJ.png",
    "https://i.imgur.com/qOfsqbw.png",
    "https://i.imgur.com/hqGdkK3.png",
    "https://i.imgur.com/8Z6pELh.png",
    "https://i.imgur.com/279HYTt.png",
    "https://i.imgur.com/XGAxovh.png",
    "https://i.imgur.com/yj8Fj9r.png"
  ],
  harmonyGrid: [
    "https://i.imgur.com/SuLwXyV.png",
    "https://i.imgur.com/qkyhmw5.png",
    "https://i.imgur.com/BLkmuAx.png",
    "https://i.imgur.com/aWdreqg.png",
    "https://i.imgur.com/esav4Ze.png",
    "https://i.imgur.com/Q15vUJf.png"
  ],
  testimonials: [
    "https://i.imgur.com/kZc46r3.png",
    "https://i.imgur.com/CmhBIN4.png",
    "https://i.imgur.com/UnhIFHn.png",
    "https://i.imgur.com/TYuLWeV.png",
    "https://i.imgur.com/qG3vdc5.png",
    "https://i.imgur.com/bFcdTU8.png"
  ]
};

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "O que você mais deseja melhorar hoje?",
    options: ["Rugas e Linhas de Expressão", "Volume Labial", "Contorno do Rosto", "Qualidade da Pele"]
  },
  {
    id: 2,
    text: "Qual sua maior preocupação em um procedimento?",
    options: ["Ficar com aspecto artificial", "Sentir dor", "O tempo de recuperação", "O investimento"]
  },
  {
    id: 3,
    text: "Já realizou algum procedimento estético?",
    options: ["Sim, e amei", "Sim, mas não gostei do resultado", "Não, seria minha primeira vez"]
  },
  {
    id: 4,
    text: "Quão rápido você gostaria de iniciar sua transformação?",
    options: ["Imediatamente", "Nas próximas semanas", "Estou apenas pesquisando"]
  }
];
