export type AppTab = 'stages' | 'prelearning' | 'textbook' | 'analyzer' | 'wrongnote';

export type CharacterId = 'chii' | 'hachi' | 'usagi';

export type MascotMood = 'happy' | 'cheer' | 'study' | 'surprised' | 'comfort';

export type CompetencyCategory =
  | '품사·성분 구분'
  | '주성분·부속성분'
  | '홑문장·겹문장'
  | '이어진문장'
  | '안은문장';

export interface QuizQuestion {
  id: string;
  stageId: number;
  category: CompetencyCategory;
  type: 'choice' | 'ox' | 'select-token';
  prompt: string;
  subText?: string;
  sentenceHighlight?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  mascotTip: string;
  mascot: CharacterId;
}

export interface StageDefinition {
  id: number;
  title: string;
  subtitle: string;
  category: CompetencyCategory;
  mascot: CharacterId;
  accentBg: string;
  accentText: string;
  summaryPoints: string[];
  questions: QuizQuestion[];
}

export interface StageProgress {
  completed: boolean;
  bestScore: number;
  totalQuestions: number;
  stars: number; // 0 to 3
  attempts: number;
}

export interface WrongAnswerEntry {
  questionId: string;
  stageId: number;
  category: CompetencyCategory;
  prompt: string;
  subText?: string;
  sentenceHighlight?: string;
  options: string[];
  selectedOptionIndex: number;
  correctIndex: number;
  explanation: string;
  mascotTip: string;
  mascot: CharacterId;
  wrongCount: number;
  resolved: boolean;
  lastWrongAt: string;
}

export interface UserLearningState {
  stageProgress: Record<number, StageProgress>;
  wrongNotes: WrongAnswerEntry[];
  starCandies: number;
  streakCount: number;
  prelearningCompletedIds: string[];
  examScores: Record<string, number>;
}

export type SentenceComponentType =
  | '주어'
  | '서술어'
  | '목적어'
  | '보어'
  | '관형어'
  | '부사어'
  | '독립어';

export interface EojeolAnalysis {
  eojeol: string;
  component: SentenceComponentType;
  componentGroup: '주성분' | '부속 성분' | '독립 성분';
  posBreakdown: string;
  roleNote: string;
  clauseTag?: string;
}

export interface PredicatePair {
  subject: string;
  predicate: string;
  note: string;
}

export interface SentenceStructureResult {
  sentence: string;
  structureCategory: '홑문장' | '겹문장';
  detailedType:
    | '홑문장'
    | '대등하게 이어진문장'
    | '종속적으로 이어진문장'
    | '명사절을 가진 안은문장'
    | '관형절을 가진 안은문장'
    | '부사절을 가진 안은문장'
    | '서술절을 가진 안은문장'
    | '인용절을 가진 안은문장';
  subRelationNote: string;
  embeddedOrLinkedPart?: string;
  embeddedFunction?: string;
  predicateCount: number;
  pairs: PredicatePair[];
  eojeols: EojeolAnalysis[];
  expressionEffect: string;
  mascotComment: string;
}
