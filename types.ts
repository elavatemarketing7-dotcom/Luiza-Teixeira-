
export interface Question {
  id: number;
  text: string;
  options: string[];
}

export enum AppState {
  WELCOME = 'welcome',
  QUIZ = 'quiz',
  ANALYZING = 'analyzing',
  RESULT = 'result',
  MAIN_SITE = 'main_site'
}
