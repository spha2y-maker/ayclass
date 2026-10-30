export interface PosRow {
  id: string;
  group: string;
  name: string;
  rolePrefix: string;
  blankAnswer: string;
  roleSuffix: string;
  examples: string;
}

export interface ComponentRow {
  id: string;
  group: '주성분' | '부속 성분' | '독립 성분';
  blankName: string;
  description: string;
  examples: string;
}

export const POS_WORKSHEET_ROWS: PosRow[] = [
  {
    id: 'pos-noun',
    group: '체언',
    name: '명사',
    rolePrefix: '사람이나 사물의 (',
    blankAnswer: '이름',
    roleSuffix: ')을/를 나타내는 말',
    examples: '하늘, 학생, 사과, 담양',
  },
  {
    id: 'pos-pronoun',
    group: '체언',
    name: '대명사',
    rolePrefix: '이름을 (',
    blankAnswer: '대신하여',
    roleSuffix: ') 가리키는 말',
    examples: '나, 너, 우리, 이것, 여기',
  },
  {
    id: 'pos-numeral',
    group: '체언',
    name: '수사',
    rolePrefix: '수량이나 (',
    blankAnswer: '순서',
    roleSuffix: ')를 나타내는 말',
    examples: '하나, 둘, 첫째, 둘째',
  },
  {
    id: 'pos-verb',
    group: '용언',
    name: '동사',
    rolePrefix: '사람이나 사물의 (',
    blankAnswer: '움직임/동작',
    roleSuffix: ')을 나타내는 말',
    examples: '먹다, 달려가다, 웃다',
  },
  {
    id: 'pos-adj',
    group: '용언',
    name: '형용사',
    rolePrefix: '사람이나 사물의 (',
    blankAnswer: '상태',
    roleSuffix: ')나 성질을 나타내는 말',
    examples: '예쁘다, 높다, 친절하다',
  },
  {
    id: 'pos-det',
    group: '수식언',
    name: '관형사',
    rolePrefix: '(',
    blankAnswer: '체언',
    roleSuffix: ')을 앞에서 꾸며 주는 말',
    examples: '새 책, 헌 옷, 모든 사람',
  },
  {
    id: 'pos-adv',
    group: '수식언',
    name: '부사',
    rolePrefix: '주로 (',
    blankAnswer: '용언',
    roleSuffix: ')을 꾸며 주는 말',
    examples: '매우 예쁘다, 천천히 걸어가다',
  },
  {
    id: 'pos-post',
    group: '관계언',
    name: '조사',
    rolePrefix: '단어 뒤에 붙어 다른 말과의 (',
    blankAnswer: '문법적 관계',
    roleSuffix: ')를 나타내는 말',
    examples: '이/가, 을/를, 은/는, 에서',
  },
  {
    id: 'pos-interj',
    group: '독립언',
    name: '감탄사',
    rolePrefix: '느낌, 응답, 부름 등을 나타내는 (',
    blankAnswer: '독립된',
    roleSuffix: ') 말',
    examples: '아!, 야!, 네, 어머나',
  },
];

export const COMPONENT_WORKSHEET_ROWS: ComponentRow[] = [
  {
    id: 'comp-subj',
    group: '주성분',
    blankName: '주어',
    description: '(~이/가, 은/는 붙음): 문장에서 ‘누가/무엇이’에 해당하는 주체',
    examples: '강아지가 달린다. / 하늘이 맑다.',
  },
  {
    id: 'comp-pred',
    group: '주성분',
    blankName: '서술어',
    description: '주어의 동작이나 상태를 풀이하는 말 (‘어찌하다/어떠하다/무엇이다’)',
    examples: '새가 노래한다. / 달이 밝다. / 내일이 토요일이다.',
  },
  {
    id: 'comp-obj',
    group: '주성분',
    blankName: '목적어',
    description: '서술어(타동사)의 동작 대상이 되는 말 (‘무엇을/누구를’)',
    examples: '선호가 숙제를 끝냈다. / 아기가 우유를 먹는다.',
  },
  {
    id: 'comp-comp',
    group: '주성분',
    blankName: '보어',
    description: '‘되다’, ‘아니다’ 앞에서 주어 외에 의미를 보충해 주는 말 (‘무엇이’)',
    examples: '물이 얼음이 되었다. / 진우는 막내가 아니다.',
  },
  {
    id: 'comp-attr',
    group: '부속 성분',
    blankName: '관형어',
    description: '체언(명사·대명사·수사)을 앞에서 꾸며 주는 역할 (‘어떤/무슨’)',
    examples: '찬미가 새 모자를 썼다. / 가을은 독서의 계절이다.',
  },
  {
    id: 'comp-adv',
    group: '부속 성분',
    blankName: '부사어',
    description: '주로 서술어(용언)나 관형어, 다른 부사어, 문장 전체를 꾸며 주는 역할',
    examples: '개미가 먹이를 부지런히 나른다. / 과연 그는 훌륭하다.',
  },
  {
    id: 'comp-indep',
    group: '독립 성분',
    blankName: '독립어',
    description: '문장의 다른 성분과 직접적인 관계없이 독립적으로 쓰이는 말 (부름·감탄·응답)',
    examples: '경식아, 저 강아지 정말 귀엽다. / 우아, 눈이 내리네!',
  },
];

export interface ChameleonWordCase {
  id: string;
  baseWord: string;
  fixedPos: string;
  variations: {
    sentence: string;
    highlightedToken: string;
    component: string;
    reason: string;
  }[];
}

export const CHAMELEON_WORDS: ChameleonWordCase[] = [
  {
    id: 'pretty',
    baseWord: '예쁘다',
    fixedPos: '형용사 (상태·성질을 나타내는 타고난 신분!)',
    variations: [
      {
        sentence: '꽃이 예쁘다.',
        highlightedToken: '예쁘다',
        component: '서술어',
        reason: '주어 ‘꽃이’의 상태를 풀이하는 역할을 해요! (품사는 여전히 형용사)',
      },
      {
        sentence: '예쁜 꽃이 피었다.',
        highlightedToken: '예쁜',
        component: '관형어',
        reason: '관형사형 어미 ‘-ㄴ’이 붙어 뒤의 체언 ‘꽃’을 꾸며 주는 역할을 해요! (품사는 여전히 형용사)',
      },
      {
        sentence: '꽃이 예쁘게 피었다.',
        highlightedToken: '예쁘게',
        component: '부사어',
        reason: '부사형 어미 ‘-게’가 붙어 용언 ‘피었다’를 꾸며 주는 역할을 해요! (품사는 여전히 형용사)',
      },
    ],
  },
  {
    id: 'student',
    baseWord: '학생',
    fixedPos: '명사 (사람의 이름을 나타내는 타고난 신분!)',
    variations: [
      {
        sentence: '학생이 새 옷을 입었다.',
        highlightedToken: '학생이',
        component: '주어',
        reason: '주격 조사 ‘이’가 붙어 문장의 주체(누가) 역할을 해요! (명사+조사)',
      },
      {
        sentence: '선생님께서 학생을 부르셨다.',
        highlightedToken: '학생을',
        component: '목적어',
        reason: '목적격 조사 ‘을’이 붙어 동작의 대상(누구를) 역할을 해요! (명사+조사)',
      },
      {
        sentence: '수호는 중학교 학생이다.',
        highlightedToken: '학생이다',
        component: '서술어',
        reason: '서술격 조사 ‘이다’가 붙어 ‘무엇이다’로 풀이하는 서술어 역할을 해요!',
      },
      {
        sentence: '동생은 아직 학생이 아니다.',
        highlightedToken: '학생이',
        component: '보어',
        reason: '‘아니다’ 앞에서 불완전한 의미를 보충하는 보어 역할을 해요!',
      },
    ],
  },
  {
    id: 'glasses',
    baseWord: '안경을 꾸미는 세 가지 말',
    fixedPos: '관형사 vs 형용사 vs 명사+조사 → 모두 문장 성분은 관형어!',
    variations: [
      {
        sentence: '수아가 새 안경을 꼈다.',
        highlightedToken: '새',
        component: '관형어 (품사: 관형사)',
        reason: '형태가 변하지 않고 원래부터 체언만 꾸미는 품사 ‘관형사’가 관형어가 된 경우예요.',
      },
      {
        sentence: '수아가 멋진 안경을 꼈다.',
        highlightedToken: '멋진',
        component: '관형어 (품사: 형용사)',
        reason: '기본형 ‘멋지다(형용사)’가 활용되어 체언 ‘안경’을 꾸미는 관형어가 되었어요!',
      },
      {
        sentence: '수아가 준서의 안경을 꼈다.',
        highlightedToken: '준서의',
        component: '관형어 (품사: 명사+조사)',
        reason: '명사 ‘준서’에 관형격 조사 ‘의’가 결합해 체언 ‘안경’을 꾸미는 관형어가 되었어요!',
      },
    ],
  },
];

export interface PrelearningMiniQuiz {
  id: string;
  question: string;
  sentence?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const PRELEARNING_CHECK_QUIZZES: PrelearningMiniQuiz[] = [
  {
    id: 'pre-q1',
    question: '다음 문장에서 “강아지가”의 품사 구성과 문장 성분을 바르게 짝지은 것은?',
    sentence: '귀여운 강아지가 밥을 맛있게 먹는다.',
    options: [
      '품사: 명사 + 조사 / 문장 성분: 주어',
      '품사: 대명사 + 조사 / 문장 성분: 목적어',
      '품사: 주어 / 문장 성분: 명사',
      '품사: 명사 / 문장 성분: 관형어',
    ],
    correctIndex: 0,
    explanation: '‘강아지’는 이름을 나타내는 명사, ‘가’는 주격 조사이며, 문장 안에서는 동작의 주체인 ‘주어’ 역할을 합니다.',
  },
  {
    id: 'pre-q2',
    question: '같은 문장 “귀여운 강아지가 밥을 맛있게 먹는다.”에서 “맛있게”의 품사와 문장 성분은?',
    sentence: '귀여운 강아지가 밥을 맛있게 먹는다.',
    options: [
      '품사: 부사 / 문장 성분: 서술어',
      '품사: 형용사 / 문장 성분: 부사어',
      '품사: 동사 / 문장 성분: 관형어',
      '품사: 부사어 / 문장 성분: 형용사',
    ],
    correctIndex: 1,
    explanation: '기본형이 ‘맛있다’이므로 타고난 품사는 변함없이 ‘형용사’이고, 문장 속에서는 ‘먹는다’를 꾸며 주므로 ‘부사어’입니다!',
  },
  {
    id: 'pre-q3',
    question: '[O/X 확인] ‘동사’, ‘형용사’, ‘명사’는 문장 성분의 이름이다.',
    options: ['O (맞다)', 'X (틀리다)'],
    correctIndex: 1,
    explanation: '틀렸습니다(X)! ‘~사’로 끝나는 동사·형용사·명사는 단어의 갈래인 ‘품사’이고, 문장 성분은 ‘주어·서술어·목적어’처럼 ‘~어’로 끝납니다.',
  },
  {
    id: 'pre-q4',
    question: '[O/X 확인] 하나의 품사는 문장 안에서 상황에 따라 다른 문장 성분(역할)으로 쓰일 수 있다.',
    options: ['O (맞다)', 'X (틀리다)'],
    correctIndex: 0,
    explanation: '맞습니다(O)! 사람이 학교에서는 학생, 집에서는 자녀가 되듯 하나의 단어도 문장 속 위치와 조사·어미에 따라 주어, 목적어, 관형어 등 다양한 성분이 될 수 있어요.',
  },
];
