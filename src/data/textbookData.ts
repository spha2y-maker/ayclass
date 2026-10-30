export interface PdfMaterialItem {
  id: string;
  title: string;
  subtitle: string;
  pagesLabel: string;
  path: string;
  highlights: string[];
}

const BASE_URL = import.meta.env.BASE_URL || './';

export const PDF_MATERIALS: PdfMaterialItem[] = [
  {
    id: 'pdf-prelearning',
    title: '사전학습 활동지: 품사 vs 문장성분',
    subtitle: '문장의 짜임을 배우기 전 필수 기초 개념과 확인 문제',
    pagesLabel: '활동지 2쪽',
    path: `${BASE_URL}assets/aistudio/prelearning-worksheet.pdf`,
    highlights: [
      '단어의 태어난 신분 ‘품사(~사)’ 5언 9품사 정리표',
      '문장 속 직책 ‘문장 성분(~어)’ 7가지 핵심 역할',
      '“학생이 새 옷을 입었다.” / “귀여운 강아지가 밥을 맛있게 먹는다.” 실전 분석',
    ],
  },
  {
    id: 'pdf-textbook',
    title: '중학 국어 3-2 교과서 본문: (1) 문장의 짜임',
    subtitle: '소단원 (1) 문장의 짜임 본문·탐구 활동·학습 활동·우리말 달인 수록',
    pagesLabel: '교과서 114~134쪽 (경량화 원문)',
    path: `${BASE_URL}assets/aistudio/textbook-unit3-1.pdf`,
    highlights: [
      '118~123쪽: 문장의 기본 구조 3유형과 주성분·부속 성분·독립 성분 탐구',
      '124~128쪽: 홑문장과 겹문장, 이어진문장(대등·종속), 안은문장(명사·관형·부사·서술·인용절)',
      '129~134쪽: 학습 활동 총정리, 표현 의도에 따른 문장 짓기, 우리말 톡톡(설렘/빠져듦/없음)',
    ],
  },
  {
    id: 'pdf-exam',
    title: '실전 평가문제 자료: 3. 문장과 글쓰기 대비 평가',
    subtitle: '중간·기말 내신 대비 객관식 및 조건부 서술형 기출 유형 모음',
    pagesLabel: '평가문제 8쪽',
    path: `${BASE_URL}assets/aistudio/exam-questions.pdf`,
    highlights: [
      '서술어의 3유형, 주성분만으로 이루어진 문장 찾기, 관형어·부사어 수식 탐구',
      '홑문장/겹문장 순서도 분류 및 대등·종속 이어진문장 의미 관계 구별',
      '5가지 안긴문장(절) 판별 및 표현 의도·문장 호흡 효과 비교 문항',
    ],
  },
];

export interface ClauseSwapExperiment {
  id: string;
  clause1: string;
  connector: string;
  clause2: string;
  combinedNormal: string;
  combinedSwapped: string;
  relationType: '대등하게 이어진문장' | '종속적으로 이어진문장';
  meaningSubType: string;
  swappedNatural: boolean;
  explanation: string;
}

export const CLAUSE_SWAP_EXPERIMENTS: ClauseSwapExperiment[] = [
  {
    id: 'swap-1',
    clause1: '시아는 그림을 그린다.',
    connector: '-고',
    clause2: '찬호는 글을 쓴다.',
    combinedNormal: '시아는 그림을 그리고 찬호는 글을 쓴다.',
    combinedSwapped: '찬호는 글을 쓰고 시아는 그림을 그린다.',
    relationType: '대등하게 이어진문장',
    meaningSubType: '나열 (-고, -(으)며)',
    swappedNatural: true,
    explanation: '앞 절과 뒤 절의 순서를 바꾸어도 원래 문장과 의미가 똑같이 자연스러워요! 두 사실이 대등하게 나열되었기 때문이에요.',
  },
  {
    id: 'swap-2',
    clause1: '윤지는 웃었다.',
    connector: '-지만',
    clause2: '민서는 울었다.',
    combinedNormal: '윤지는 웃었지만 민서는 울었다.',
    combinedSwapped: '민서는 울었지만 윤지는 웃었다.',
    relationType: '대등하게 이어진문장',
    meaningSubType: '대조 (-지만, -(으)나)',
    swappedNatural: true,
    explanation: '두 사람의 상반된 행동을 대조하는 대등 관계이므로 앞뒤 절을 바꾸어도 대조의 의미가 그대로 유지됩니다.',
  },
  {
    id: 'swap-3',
    clause1: '공원에 놀이기구가 많다.',
    connector: '-아서',
    clause2: '동생의 기분이 좋다.',
    combinedNormal: '공원에 놀이기구가 많아서 동생의 기분이 좋다.',
    combinedSwapped: '동생의 기분이 좋아서 공원에 놀이기구가 많다. (어색!)',
    relationType: '종속적으로 이어진문장',
    meaningSubType: '원인·이유 (-아서/어서, -(으)니)',
    swappedNatural: false,
    explanation: '앞 절이 뒤 절의 ‘원인’이에요! 순서를 바꾸면 “동생 기분이 좋은 것이 공원에 놀이기구가 많은 원인”이 되어 인과관계가 깨집니다.',
  },
  {
    id: 'swap-4',
    clause1: '산이 높다.',
    connector: '-(으)면',
    clause2: '골짜기가 깊다.',
    combinedNormal: '산이 높으면 골짜기가 깊다.',
    combinedSwapped: '골짜기가 깊으면 산이 높다. (원래 조건 의미 변화!)',
    relationType: '종속적으로 이어진문장',
    meaningSubType: '조건·가정 (-(으)면, -거든)',
    swappedNatural: false,
    explanation: '앞 절이 뒤 절의 ‘조건’ 역할을 하는 종속적 연결 어미 ‘-으면’이 쓰여 앞뒤 절을 대등하게 바꿀 수 없어요.',
  },
  {
    id: 'swap-5',
    clause1: '동생은 운동을 한다.',
    connector: '-(으)려고',
    clause2: '동생은 일찍 일어난다.',
    combinedNormal: '동생은 운동을 하려고 일찍 일어난다.',
    combinedSwapped: '동생은 일찍 일어나려고 운동을 한다. (의도 정반대!)',
    relationType: '종속적으로 이어진문장',
    meaningSubType: '목적·의도 (-(으)러, -(으)려고)',
    swappedNatural: false,
    explanation: '주어가 같을 때 중복 주어를 생략하고 의도를 나타내는 ‘-려고’로 이었어요. 앞뒤를 바꾸면 목적과 행동이 뒤바뀝니다!',
  },
];

export interface EmbeddedClauseCard {
  id: string;
  name: string;
  koreanRole: string;
  clueEnding: string;
  innerSentence: string;
  outerTemplate: string;
  completedSentence: string;
  bracketedHighlight: string;
  keyTip: string;
  extraExamples: string[];
}

export const EMBEDDED_CLAUSE_CARDS: EmbeddedClauseCard[] = [
  {
    id: 'clause-noun',
    name: '명사절을 가진 안은문장',
    koreanRole: '문장에서 주어, 목적어, 부사어 등의 구실',
    clueEnding: '명사형 전성 어미: -(으)ㅁ, -기',
    innerSentence: '해가 떠오르다.',
    outerTemplate: '나는 [ ? ]을/를 기다린다.',
    completedSentence: '나는 해가 떠오르기를 기다린다.',
    bracketedHighlight: '해가 떠오르기',
    keyTip: '절 끝에 ‘-(으)ㅁ’이나 ‘-기’가 붙어 명사처럼 변신한 뒤 조사(이/가, 을/를, 에 등)와 결합해요!',
    extraExamples: [
      '지수가 그 일을 해냈음이 분명하다. (주어 역할)',
      '농부는 농사가 잘되기를 바란다. (목적어 역할)',
      '아직은 집에 가기에 이른 시간이다. (부사어 역할)',
    ],
  },
  {
    id: 'clause-attr',
    name: '관형절을 가진 안은문장',
    koreanRole: '문장에서 체언(명사 등)을 꾸미는 관형어 구실',
    clueEnding: '관형사형 전성 어미: -(으)ㄴ, -는, -(으)ㄹ, -던',
    innerSentence: '아기가 울다.',
    outerTemplate: '나는 [ ? ] 소리를 들었다.',
    completedSentence: '나는 아기가 우는 소리를 들었다.',
    bracketedHighlight: '아기가 우는',
    keyTip: '뒤에 오는 명사(소리, 책, 꽃 등)를 ‘어떤 ~’으로 꾸며 줘요! 겹치는 성분이 생략되기도 해요(예: [꽃이] 예쁜 꽃이 피었다).',
    extraExamples: [
      '이것은 [내가 읽은] 소설책이다. (목적어 생략)',
      '수아는 [은우가 노래를 부르는] 모습을 보았다.',
      '네가 좋아할 일이 생겼다. (‘네가 좋아할’ → ‘일’ 수식)',
    ],
  },
  {
    id: 'clause-adv',
    name: '부사절을 가진 안은문장',
    koreanRole: '문장에서 용언(서술어)을 꾸미는 부사어 구실',
    clueEnding: '부사형 전성 어미: -게, -도록 / 파생 접미사: -이(없이)',
    innerSentence: '땀이 나다.',
    outerTemplate: '민후는 [ ? ] 뛰었다.',
    completedSentence: '민후는 땀이 나게 뛰었다.',
    bracketedHighlight: '땀이 나게',
    keyTip: '서술어 앞에서 ‘어떻게’의 방식으로 동작이나 상태를 더 생생하게 꾸며 줘요!',
    extraExamples: [
      '빙수는 [이가 시리도록] 차가웠다.',
      '비가 [소리도 없이] 내린다.',
      '풍경이 [숨이 막히게] 아름다웠다.',
    ],
  },
  {
    id: 'clause-pred',
    name: '서술절을 가진 안은문장',
    koreanRole: '절 전체가 문장 전체 주어의 서술어 구실',
    clueEnding: '별도의 어미 없이 [작은 주어 + 서술어] 통째로!',
    innerSentence: '마음씨가 곱다.',
    outerTemplate: '승재는 [ ? ].',
    completedSentence: '승재는 마음씨가 곱다.',
    bracketedHighlight: '마음씨가 곱다',
    keyTip: '문장에 주어가 두 개(“승재는” + “마음씨가”)처럼 보이는 것이 핵심 힌트! 앞 주어 전체를 뒤의 절 통째가 풀이해요.',
    extraExamples: [
      '토끼는 [앞발이 짧다].',
      '기린은 [목이 길다].',
      '내 짝은 [마음이 넓다].',
    ],
  },
  {
    id: 'clause-quote',
    name: '인용절을 가진 안은문장',
    koreanRole: '남의 말이나 생각을 끌어와 안긴 절',
    clueEnding: '직접 인용 조사: “…”라고 / 간접 인용 조사: ~고',
    innerSentence: '할아버지께서 취미로 화초를 기르신다.',
    outerTemplate: '남주는 [ ? ] 말하였다.',
    completedSentence: '남주는 할아버지께서 취미로 화초를 기르신다고 말하였다.',
    bracketedHighlight: '할아버지께서 취미로 화초를 기르신다고',
    keyTip: '큰따옴표 그대로 옮기면 조사 ‘라고’(직접 인용), 말하는 사람 시점으로 풀어 쓰면 조사 ‘고’(간접 인용)가 붙어요!',
    extraExamples: [
      '민재는 “혁수의 말이 옳다.”라고 말하였다. (직접 인용)',
      '민재는 혁수의 말이 옳다고 말하였다. (간접 인용)',
      '민교는 “내가 청소를 할게.”라고 말하였다. → 민교는 자기가 청소를 하겠다고 말하였다.',
    ],
  },
];

export interface SpellingTokTokItem {
  id: string;
  sentenceBefore: string;
  correctForm: string;
  wrongForm: string;
  sentenceAfter: string;
  baseVerb: string;
  ruleNote: string;
}

export const SPELLING_TOKTOK_ITEMS: SpellingTokTokItem[] = [
  {
    id: 'spell-1',
    sentenceBefore: '선아는 마음이 (',
    correctForm: '설렘',
    wrongForm: '설레임',
    sentenceAfter: ')을 느꼈다.',
    baseVerb: '기본형: 설레다 (‘설레이다’ X)',
    ruleNote: '받침 없는 용언 어간 ‘설레-’ 뒤에 명사형 어미 ‘-ㅁ’이 붙어 ‘설렘’이 맞아요!',
  },
  {
    id: 'spell-2',
    sentenceBefore: '내 매력에 (',
    correctForm: '빠져듦',
    wrongForm: '빠져듬',
    sentenceAfter: ')은 피할 수 없다.',
    baseVerb: '기본형: 빠져들다 (‘ㄹ’ 받침 어간)',
    ruleNote: '‘ㄹ’ 받침 용언 어간 ‘빠져들-’ 뒤에는 명사형 어미 ‘-ㅁ’이 붙어 ‘빠져듦’으로 적어요!',
  },
  {
    id: 'spell-3',
    sentenceBefore: '그는 버스에 빈자리가 (',
    correctForm: '없음',
    wrongForm: '업슴',
    sentenceAfter: ')을 몰랐다.',
    baseVerb: '기본형: 없다 (‘ㄹ’ 제외 받침 있는 어간)',
    ruleNote: '어간 원형 ‘없-’을 밝혀 적고 명사형 어미 ‘-음’을 붙여 ‘없음’으로 적어야 해요!',
  },
];
