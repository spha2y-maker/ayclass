import {
  EojeolAnalysis,
  PredicatePair,
  SentenceComponentType,
  SentenceStructureResult,
} from '../types/grammar';

export interface PresetSentenceOption {
  category: string;
  sentence: string;
}

export const PRESET_SENTENCES: PresetSentenceOption[] = [
  { category: '사전학습', sentence: '학생이 새 옷을 입었다.' },
  { category: '사전학습', sentence: '귀여운 강아지가 밥을 맛있게 먹는다.' },
  { category: '홑문장·보어', sentence: '물이 얼음이 되었다.' },
  { category: '홑문장·보어', sentence: '진우는 막내가 아니다.' },
  { category: '홑문장·부속', sentence: '범수가 모든 유리창을 깨끗이 닦았다.' },
  { category: '홑문장·독립', sentence: '경식아, 저 강아지 정말 귀엽다.' },
  { category: '홑문장', sentence: '나는 어제 극장에서 친구를 만났다.' },
  { category: '대등 이어진', sentence: '정우는 영화를 보고 희수는 책을 읽는다.' },
  { category: '대등 이어진', sentence: '윤지는 웃었지만 민서는 울었다.' },
  { category: '종속 이어진', sentence: '공원에 놀이기구가 많아서 동생의 기분이 좋다.' },
  { category: '종속 이어진', sentence: '산이 높으면 골짜기가 깊다.' },
  { category: '종속 이어진', sentence: '동생은 운동을 하려고 일찍 일어난다.' },
  { category: '명사절 안은', sentence: '나는 해가 떠오르기를 기다린다.' },
  { category: '명사절 안은', sentence: '지수가 그 일을 해냈음이 분명하다.' },
  { category: '관형절 안은', sentence: '이것은 내가 읽은 소설책이다.' },
  { category: '관형절 안은', sentence: '나는 아기가 우는 소리를 들었다.' },
  { category: '부사절 안은', sentence: '빙수는 이가 시리도록 차가웠다.' },
  { category: '부사절 안은', sentence: '민후는 땀이 나게 뛰었다.' },
  { category: '서술절 안은', sentence: '토끼는 앞발이 짧다.' },
  { category: '서술절 안은', sentence: '승재는 마음씨가 곱다.' },
  { category: '직접 인용절', sentence: '민재는 “혁수의 말이 옳다.”라고 말하였다.' },
  { category: '간접 인용절', sentence: '남주는 할아버지께서 취미로 화초를 기르신다고 말하였다.' },
];

const CURATED_DB: Record<string, SentenceStructureResult> = {
  '학생이 새 옷을 입었다.': {
    sentence: '학생이 새 옷을 입었다.',
    structureCategory: '홑문장',
    detailedType: '홑문장',
    subRelationNote: '주어(학생이)와 서술어(입었다)의 관계가 한 번만 나타나는 홑문장입니다.',
    predicateCount: 1,
    pairs: [{ subject: '학생이', predicate: '입었다', note: '누가 어찌하다 (동사 서술어)' }],
    eojeols: [
      { eojeol: '학생이', component: '주어', componentGroup: '주성분', posBreakdown: '명사(학생) + 주격 조사(이)', roleNote: '동작의 주체' },
      { eojeol: '새', component: '관형어', componentGroup: '부속 성분', posBreakdown: '관형사(새)', roleNote: '체언 ‘옷’을 꾸밈 (절이 아님!)' },
      { eojeol: '옷을', component: '목적어', componentGroup: '주성분', posBreakdown: '명사(옷) + 목적격 조사(을)', roleNote: '‘입었다’의 동작 대상' },
      { eojeol: '입었다.', component: '서술어', componentGroup: '주성분', posBreakdown: '동사(입다의 활용형)', roleNote: '주어의 동작 풀이' },
    ],
    expressionEffect: '짧고 호흡이 빠르며 사건이 간결하고 명확하게 전달됩니다.',
    mascotComment: '‘새’는 활용하지 않는 순수 관형사라서 관형절이 아니야! 그래서 깔끔한 홑문장이지!',
  },
  '귀여운 강아지가 밥을 맛있게 먹는다.': {
    sentence: '귀여운 강아지가 밥을 맛있게 먹는다.',
    structureCategory: '겹문장',
    detailedType: '관형절을 가진 안은문장',
    subRelationNote: '‘(강아지가) 귀엽다’가 관형사형 어미 ‘-운’을 통해 ‘강아지’를 꾸미는 관형절로 안겨 있습니다.',
    embeddedOrLinkedPart: '귀여운',
    embeddedFunction: '체언 ‘강아지’를 수식하는 관형어 역할 (주어 ‘강아지가’ 생략)',
    predicateCount: 2,
    pairs: [
      { subject: '(강아지가)', predicate: '귀여운(귀엽다)', note: '안긴 관형절의 주어·서술어' },
      { subject: '강아지가', predicate: '먹는다', note: '전체 문장의 주어·서술어' },
    ],
    eojeols: [
      { eojeol: '귀여운', component: '관형어', componentGroup: '부속 성분', posBreakdown: '형용사(귀엽다 + -ㄴ)', roleNote: '체언 ‘강아지’를 꾸미는 관형절', clauseTag: '관형절' },
      { eojeol: '강아지가', component: '주어', componentGroup: '주성분', posBreakdown: '명사(강아지) + 주격 조사(가)', roleNote: '문장 전체의 주어' },
      { eojeol: '밥을', component: '목적어', componentGroup: '주성분', posBreakdown: '명사(밥) + 목적격 조사(을)', roleNote: '‘먹는다’의 대상' },
      { eojeol: '맛있게', component: '부사어', componentGroup: '부속 성분', posBreakdown: '형용사(맛있다 + -게)', roleNote: '용언 ‘먹는다’를 꾸밈' },
      { eojeol: '먹는다.', component: '서술어', componentGroup: '주성분', posBreakdown: '동사(먹다 + -는다)', roleNote: '문장 전체의 서술어' },
    ],
    expressionEffect: '강아지의 생김새와 먹는 모습을 한 문장 안에서 입체적이고 구체적으로 묘사합니다.',
    mascotComment: '‘귀여운’의 품사는 형용사지만 문장 성분은 관형어, ‘맛있게’도 품사는 형용사지만 성분은 부사어야!',
  },
  '물이 얼음이 되었다.': {
    sentence: '물이 얼음이 되었다.',
    structureCategory: '홑문장',
    detailedType: '홑문장',
    subRelationNote: '‘이’가 두 번 나오지만 ‘얼음이’는 ‘되다’ 앞의 보어이므로 주어-서술어 관계가 1번인 홑문장입니다!',
    predicateCount: 1,
    pairs: [{ subject: '물이', predicate: '되었다', note: '보어(얼음이)를 필수 요구하는 서술어' }],
    eojeols: [
      { eojeol: '물이', component: '주어', componentGroup: '주성분', posBreakdown: '명사(물) + 주격 조사(이)', roleNote: '상태 변화의 주체' },
      { eojeol: '얼음이', component: '보어', componentGroup: '주성분', posBreakdown: '명사(얼음) + 보격 조사(이)', roleNote: '‘되었다’의 불완전한 의미 보충' },
      { eojeol: '되었다.', component: '서술어', componentGroup: '주성분', posBreakdown: '동사(되다의 과거형)', roleNote: '주어의 변화를 풀이' },
    ],
    expressionEffect: '주성분만으로 이루어져 군더더기 없이 명확하고 간결한 인상을 줍니다.',
    mascotComment: '서술절 안은문장과 절대 헷갈리면 안 돼! ‘되다/아니다’ 앞은 보어니까 홑문장이야!',
  },
  '진우는 막내가 아니다.': {
    sentence: '진우는 막내가 아니다.',
    structureCategory: '홑문장',
    detailedType: '홑문장',
    subRelationNote: '‘아니다’ 앞의 ‘막내가’는 보어이며, 주어-서술어 관계가 1번만 나타나는 홑문장입니다.',
    predicateCount: 1,
    pairs: [{ subject: '진우는', predicate: '아니다', note: '보어(막내가)를 요구하는 형용사 서술어' }],
    eojeols: [
      { eojeol: '진우는', component: '주어', componentGroup: '주성분', posBreakdown: '명사(진우) + 보조사(는)', roleNote: '문장의 주어' },
      { eojeol: '막내가', component: '보어', componentGroup: '주성분', posBreakdown: '명사(막내) + 보격 조사(가)', roleNote: '‘아니다’가 요구하는 필수 보어' },
      { eojeol: '아니다.', component: '서술어', componentGroup: '주성분', posBreakdown: '형용사(아니다)', roleNote: '부정 지정을 나타내는 서술어' },
    ],
    expressionEffect: '주성분 3개만으로 구성되어 단정하고 간결한 느낌을 줍니다.',
    mascotComment: '‘진우는 아니다’만 쓰면 불완전하지? 그래서 ‘막내가(보어)’가 꼭 필요해!',
  },
  '범수가 모든 유리창을 깨끗이 닦았다.': {
    sentence: '범수가 모든 유리창을 깨끗이 닦았다.',
    structureCategory: '홑문장',
    detailedType: '홑문장',
    subRelationNote: '관형어(모든)와 부사어(깨끗이)가 더해졌지만 주어-서술어는 한 번뿐인 홑문장입니다.',
    predicateCount: 1,
    pairs: [{ subject: '범수가', predicate: '닦았다', note: '누가 무엇을 어찌하다' }],
    eojeols: [
      { eojeol: '범수가', component: '주어', componentGroup: '주성분', posBreakdown: '명사(범수) + 주격 조사(가)', roleNote: '동작의 주체' },
      { eojeol: '모든', component: '관형어', componentGroup: '부속 성분', posBreakdown: '관형사(모든)', roleNote: '체언 ‘유리창’을 수식' },
      { eojeol: '유리창을', component: '목적어', componentGroup: '주성분', posBreakdown: '명사(유리창) + 목적격 조사(을)', roleNote: '‘닦았다’의 동작 대상' },
      { eojeol: '깨끗이', component: '부사어', componentGroup: '부속 성분', posBreakdown: '부사(깨끗이)', roleNote: '용언 ‘닦았다’를 수식' },
      { eojeol: '닦았다.', component: '서술어', componentGroup: '주성분', posBreakdown: '동사(닦다의 과거형)', roleNote: '주어의 동작 풀이' },
    ],
    expressionEffect: '부속 성분(‘모든’, ‘깨끗이’) 덕분에 주성분만 있을 때보다 훨씬 자세하고 생생합니다.',
    mascotComment: '‘모든’은 어떤 유리창인지(관형어), ‘깨끗이’는 어떻게 닦았는지(부사어) 꾸며 줘!',
  },
  '경식아, 저 강아지 정말 귀엽다.': {
    sentence: '경식아, 저 강아지 정말 귀엽다.',
    structureCategory: '홑문장',
    detailedType: '홑문장',
    subRelationNote: '부름의 독립어 ‘경식아’가 포함된 홑문장입니다.',
    predicateCount: 1,
    pairs: [{ subject: '강아지(가)', predicate: '귀엽다', note: '무엇이 어떠하다 (형용사 서술어)' }],
    eojeols: [
      { eojeol: '경식아,', component: '독립어', componentGroup: '독립 성분', posBreakdown: '명사(경식) + 호격 조사(아)', roleNote: '부름을 나타내는 독립 성분' },
      { eojeol: '저', component: '관형어', componentGroup: '부속 성분', posBreakdown: '관형사(저)', roleNote: '체언 ‘강아지’ 수식' },
      { eojeol: '강아지', component: '주어', componentGroup: '주성분', posBreakdown: '명사(강아지, 주격 조사 생략)', roleNote: '상태의 주체' },
      { eojeol: '정말', component: '부사어', componentGroup: '부속 성분', posBreakdown: '부사(정말)', roleNote: '형용사 ‘귀엽다’ 수식' },
      { eojeol: '귀엽다.', component: '서술어', componentGroup: '주성분', posBreakdown: '형용사(귀엽다)', roleNote: '주어의 상태 풀이' },
    ],
    expressionEffect: '독립어로 듣는 이의 주의를 환기하며 친근하고 생동감 있게 감정을 전달합니다.',
    mascotComment: '‘경식아’는 감탄사가 아니라 명사+호격 조사로 이루어진 독립어야! 주의해!',
  },
  '나는 어제 극장에서 친구를 만났다.': {
    sentence: '나는 어제 극장에서 친구를 만났다.',
    structureCategory: '홑문장',
    detailedType: '홑문장',
    subRelationNote: '시간·장소 부사어가 포함되어 문장이 길어 보이지만 주어-서술어는 1번뿐인 대표적인 홑문장입니다.',
    predicateCount: 1,
    pairs: [{ subject: '나는', predicate: '만났다', note: '주어 + 서술어 1회 호응' }],
    eojeols: [
      { eojeol: '나는', component: '주어', componentGroup: '주성분', posBreakdown: '대명사(나) + 보조사(는)', roleNote: '동작의 주체' },
      { eojeol: '어제', component: '부사어', componentGroup: '부속 성분', posBreakdown: '부사/명사(시간 부사어)', roleNote: '만난 시간을 꾸밈' },
      { eojeol: '극장에서', component: '부사어', componentGroup: '부속 성분', posBreakdown: '명사(극장) + 부사격 조사(에서)', roleNote: '만난 장소를 꾸밈' },
      { eojeol: '친구를', component: '목적어', componentGroup: '주성분', posBreakdown: '명사(친구) + 목적격 조사(를)', roleNote: '만난 대상' },
      { eojeol: '만났다.', component: '서술어', componentGroup: '주성분', posBreakdown: '동사(만나다의 과거형)', roleNote: '주어의 동작 풀이' },
    ],
    expressionEffect: '한 가지 사건의 시간·장소·대상을 간결한 단일 호흡으로 명확하게 전달합니다.',
    mascotComment: '문장이 5어절로 길어도 서술어가 ‘만났다’ 딱 하나뿐이니까 홑문장이야!',
  },
  '정우는 영화를 보고 희수는 책을 읽는다.': {
    sentence: '정우는 영화를 보고 희수는 책을 읽는다.',
    structureCategory: '겹문장',
    detailedType: '대등하게 이어진문장',
    subRelationNote: '대등적 연결 어미 ‘-고(나열)’를 통해 두 홑문장이 대등한 자격으로 이어졌습니다.',
    embeddedOrLinkedPart: '정우는 영화를 보고 + 희수는 책을 읽는다',
    embeddedFunction: '나열 관계 (앞뒤 절의 순서를 바꾸어도 의미가 자연스럽게 유지됨)',
    predicateCount: 2,
    pairs: [
      { subject: '정우는', predicate: '보고(보다)', note: '앞 절의 주어·서술어' },
      { subject: '희수는', predicate: '읽는다', note: '뒤 절의 주어·서술어' },
    ],
    eojeols: [
      { eojeol: '정우는', component: '주어', componentGroup: '주성분', posBreakdown: '명사(정우) + 보조사(는)', roleNote: '앞 절의 주어' },
      { eojeol: '영화를', component: '목적어', componentGroup: '주성분', posBreakdown: '명사(영화) + 목적격 조사(를)', roleNote: '앞 절의 목적어' },
      { eojeol: '보고', component: '서술어', componentGroup: '주성분', posBreakdown: '동사 어간(보-) + 대등 연결 어미(-고)', roleNote: '앞 절 서술어(나열)', clauseTag: '대등 연결(-고)' },
      { eojeol: '희수는', component: '주어', componentGroup: '주성분', posBreakdown: '명사(희수) + 보조사(는)', roleNote: '뒤 절의 주어' },
      { eojeol: '책을', component: '목적어', componentGroup: '주성분', posBreakdown: '명사(책) + 목적격 조사(을)', roleNote: '뒤 절의 목적어' },
      { eojeol: '읽는다.', component: '서술어', componentGroup: '주성분', posBreakdown: '동사(읽다 + -는다)', roleNote: '뒤 절의 서술어' },
    ],
    expressionEffect: '두 인물의 행동을 나란히 엮어 한눈에 비교·연결하여 보여 줍니다.',
    mascotComment: '“희수는 책을 읽고 정우는 영화를 본다.”로 뒤집어도 완전 자연스럽지? 대등 이어진문장 확정!',
  },
  '윤지는 웃었지만 민서는 울었다.': {
    sentence: '윤지는 웃었지만 민서는 울었다.',
    structureCategory: '겹문장',
    detailedType: '대등하게 이어진문장',
    subRelationNote: '대등적 연결 어미 ‘-지만(대조)’으로 상반된 두 사건을 대등하게 연결했습니다.',
    embeddedOrLinkedPart: '윤지는 웃었지만 + 민서는 울었다',
    embeddedFunction: '대조 관계 (앞뒤 절 위치 교환 가능)',
    predicateCount: 2,
    pairs: [
      { subject: '윤지는', predicate: '웃었지만', note: '앞 절 주어·서술어' },
      { subject: '민서는', predicate: '울었다', note: '뒤 절 주어·서술어' },
    ],
    eojeols: [
      { eojeol: '윤지는', component: '주어', componentGroup: '주성분', posBreakdown: '명사 + 보조사(는)', roleNote: '앞 절 주어' },
      { eojeol: '웃었지만', component: '서술어', componentGroup: '주성분', posBreakdown: '동사 + 대등 연결 어미(-지만)', roleNote: '앞 절 서술어(대조)', clauseTag: '대등 연결(-지만)' },
      { eojeol: '민서는', component: '주어', componentGroup: '주성분', posBreakdown: '명사 + 보조사(는)', roleNote: '뒤 절 주어' },
      { eojeol: '울었다.', component: '서술어', componentGroup: '주성분', posBreakdown: '동사(울다의 과거형)', roleNote: '뒤 절 서술어' },
    ],
    expressionEffect: '두 인물의 상반된 반응이 한 문장 속에서 선명하게 대비됩니다.',
    mascotComment: '‘-지만, -(으)나’는 대조를 나타내는 대등적 연결 어미야!',
  },
  '공원에 놀이기구가 많아서 동생의 기분이 좋다.': {
    sentence: '공원에 놀이기구가 많아서 동생의 기분이 좋다.',
    structureCategory: '겹문장',
    detailedType: '종속적으로 이어진문장',
    subRelationNote: '종속적 연결 어미 ‘-아서(원인·이유)’가 쓰여 앞 절이 뒤 절의 원인이 됩니다.',
    embeddedOrLinkedPart: '공원에 놀이기구가 많아서(원인) → 동생의 기분이 좋다(결과)',
    embeddedFunction: '원인·이유 관계 (앞뒤 절 순서를 바꾸면 인과관계가 어색해짐)',
    predicateCount: 2,
    pairs: [
      { subject: '놀이기구가', predicate: '많아서', note: '앞 절(원인)의 주어·서술어' },
      { subject: '기분이', predicate: '좋다', note: '뒤 절(결과)의 주어·서술어' },
    ],
    eojeols: [
      { eojeol: '공원에', component: '부사어', componentGroup: '부속 성분', posBreakdown: '명사 + 부사격 조사(에)', roleNote: '장소를 나타내는 부사어' },
      { eojeol: '놀이기구가', component: '주어', componentGroup: '주성분', posBreakdown: '명사 + 주격 조사(가)', roleNote: '앞 절 주어' },
      { eojeol: '많아서', component: '서술어', componentGroup: '주성분', posBreakdown: '형용사 + 종속 연결 어미(-아서)', roleNote: '앞 절 서술어(원인)', clauseTag: '종속 연결(-아서)' },
      { eojeol: '동생의', component: '관형어', componentGroup: '부속 성분', posBreakdown: '명사 + 관형격 조사(의)', roleNote: '체언 ‘기분’ 수식' },
      { eojeol: '기분이', component: '주어', componentGroup: '주성분', posBreakdown: '명사 + 주격 조사(이)', roleNote: '뒤 절 주어' },
      { eojeol: '좋다.', component: '서술어', componentGroup: '주성분', posBreakdown: '형용사(좋다)', roleNote: '뒤 절 서술어' },
    ],
    expressionEffect: '원인과 결과를 논리적으로 긴밀하게 연결하여 설명하는 효과가 있습니다.',
    mascotComment: '앞뒤를 바꿔 “동생 기분이 좋아서 놀이기구가 많다”라고 하면 말이 이상하지? 종속 이어진문장이야!',
  },
  '산이 높으면 골짜기가 깊다.': {
    sentence: '산이 높으면 골짜기가 깊다.',
    structureCategory: '겹문장',
    detailedType: '종속적으로 이어진문장',
    subRelationNote: '종속적 연결 어미 ‘-(으)면(조건)’으로 앞 절이 뒤 절의 조건 역할을 합니다.',
    embeddedOrLinkedPart: '산이 높으면(조건) → 골짜기가 깊다(결과)',
    embeddedFunction: '조건 관계',
    predicateCount: 2,
    pairs: [
      { subject: '산이', predicate: '높으면', note: '앞 절(조건) 주어·서술어' },
      { subject: '골짜기가', predicate: '깊다', note: '뒤 절 주어·서술어' },
    ],
    eojeols: [
      { eojeol: '산이', component: '주어', componentGroup: '주성분', posBreakdown: '명사 + 주격 조사(이)', roleNote: '앞 절 주어' },
      { eojeol: '높으면', component: '서술어', componentGroup: '주성분', posBreakdown: '형용사 + 종속 연결 어미(-으면)', roleNote: '앞 절 서술어(조건)', clauseTag: '종속 연결(-으면)' },
      { eojeol: '골짜기가', component: '주어', componentGroup: '주성분', posBreakdown: '명사 + 주격 조사(가)', roleNote: '뒤 절 주어' },
      { eojeol: '깊다.', component: '서술어', componentGroup: '주성분', posBreakdown: '형용사(깊다)', roleNote: '뒤 절 서술어' },
    ],
    expressionEffect: '조건과 그에 따른 필연적 결과를 설득력 있게 연결합니다.',
    mascotComment: '‘-(으)면, -거든’이 보이면 조건의 종속 이어진문장!',
  },
  '동생은 운동을 하려고 일찍 일어난다.': {
    sentence: '동생은 운동을 하려고 일찍 일어난다.',
    structureCategory: '겹문장',
    detailedType: '종속적으로 이어진문장',
    subRelationNote: '동일한 주어(‘동생은’)가 뒤 절에서 생략되었고, 목적·의도를 나타내는 ‘-려고’로 이어진 문장입니다.',
    embeddedOrLinkedPart: '동생은 운동을 하려고(목적·의도) → (동생은) 일찍 일어난다',
    embeddedFunction: '목적·의도 관계 (중복 주어 생략)',
    predicateCount: 2,
    pairs: [
      { subject: '동생은', predicate: '하려고(하다)', note: '앞 절(의도) 주어·서술어' },
      { subject: '(동생은)', predicate: '일어난다', note: '뒤 절 주어(생략)·서술어' },
    ],
    eojeols: [
      { eojeol: '동생은', component: '주어', componentGroup: '주성분', posBreakdown: '명사 + 보조사(은)', roleNote: '공통 주어' },
      { eojeol: '운동을', component: '목적어', componentGroup: '주성분', posBreakdown: '명사 + 목적격 조사(을)', roleNote: '‘하다’의 대상' },
      { eojeol: '하려고', component: '서술어', componentGroup: '주성분', posBreakdown: '동사 + 종속 연결 어미(-려고)', roleNote: '앞 절 서술어(의도)', clauseTag: '종속 연결(-려고)' },
      { eojeol: '일찍', component: '부사어', componentGroup: '부속 성분', posBreakdown: '부사(일찍)', roleNote: '‘일어난다’ 수식' },
      { eojeol: '일어난다.', component: '서술어', componentGroup: '주성분', posBreakdown: '동사(일어나다 + -ㄴ다)', roleNote: '뒤 절 서술어' },
    ],
    expressionEffect: '행동의 의도와 실행을 한 문장으로 자연스럽고 매끄럽게 표현합니다.',
    mascotComment: '주어가 1개처럼 보여도 ‘하려고’ + ‘일어난다’ 서술어가 2개니까 겹문장이야!',
  },
  '나는 해가 떠오르기를 기다린다.': {
    sentence: '나는 해가 떠오르기를 기다린다.',
    structureCategory: '겹문장',
    detailedType: '명사절을 가진 안은문장',
    subRelationNote: '‘해가 떠오르다’에 명사형 어미 ‘-기’가 붙어 전체 문장의 목적어 역할을 하고 있습니다.',
    embeddedOrLinkedPart: '해가 떠오르기',
    embeddedFunction: '전체 문장에서 목적어 역할 (조사 ‘를’ 결합)',
    predicateCount: 2,
    pairs: [
      { subject: '해가', predicate: '떠오르기(떠오르다)', note: '안긴 명사절의 주어·서술어' },
      { subject: '나는', predicate: '기다린다', note: '안은문장 전체의 주어·서술어' },
    ],
    eojeols: [
      { eojeol: '나는', component: '주어', componentGroup: '주성분', posBreakdown: '대명사 + 보조사(는)', roleNote: '전체 문장의 주어' },
      { eojeol: '해가', component: '주어', componentGroup: '주성분', posBreakdown: '명사 + 주격 조사(가)', roleNote: '명사절 속의 주어', clauseTag: '명사절 내부' },
      { eojeol: '떠오르기를', component: '목적어', componentGroup: '주성분', posBreakdown: '동사(떠오르-) + 명사형 어미(-기) + 조사(를)', roleNote: '명사절이 목적어로 쓰임', clauseTag: '명사절(-기)' },
      { eojeol: '기다린다.', component: '서술어', componentGroup: '주성분', posBreakdown: '동사(기다리다 + -ㄴ다)', roleNote: '전체 문장의 서술어' },
    ],
    expressionEffect: '기다리는 대상을 단순 사물이 아닌 하나의 구체적인 사건(절)으로 생생하게 담아냅니다.',
    mascotComment: '【나는 [해가 떠오르기]를 기다린다.】 명사절 안은문장의 교과서 대표 예문이야!',
  },
  '지수가 그 일을 해냈음이 분명하다.': {
    sentence: '지수가 그 일을 해냈음이 분명하다.',
    structureCategory: '겹문장',
    detailedType: '명사절을 가진 안은문장',
    subRelationNote: '‘지수가 그 일을 해냈다’에 명사형 어미 ‘-음’이 붙어 전체 문장의 주어 역할을 합니다.',
    embeddedOrLinkedPart: '지수가 그 일을 해냈음',
    embeddedFunction: '전체 문장에서 주어 역할 (주격 조사 ‘이’ 결합)',
    predicateCount: 2,
    pairs: [
      { subject: '지수가', predicate: '해냈음(해냈다)', note: '안긴 명사절의 주어·서술어' },
      { subject: '[지수가 그 일을 해냈음]이', predicate: '분명하다', note: '안은문장 전체의 주어·서술어' },
    ],
    eojeols: [
      { eojeol: '지수가', component: '주어', componentGroup: '주성분', posBreakdown: '명사 + 주격 조사(가)', roleNote: '명사절 속의 주어', clauseTag: '명사절 내부' },
      { eojeol: '그', component: '관형어', componentGroup: '부속 성분', posBreakdown: '관형사(그)', roleNote: '체언 ‘일’ 수식', clauseTag: '명사절 내부' },
      { eojeol: '일을', component: '목적어', componentGroup: '주성분', posBreakdown: '명사 + 목적격 조사(을)', roleNote: '명사절 속의 목적어', clauseTag: '명사절 내부' },
      { eojeol: '해냈음이', component: '주어', componentGroup: '주성분', posBreakdown: '동사(해냈-) + 명사형 어미(-음) + 조사(이)', roleNote: '명사절 전체가 주어 역할', clauseTag: '명사절(-음)' },
      { eojeol: '분명하다.', component: '서술어', componentGroup: '주성분', posBreakdown: '형용사(분명하다)', roleNote: '전체 문장의 서술어' },
    ],
    expressionEffect: '사실 전체를 하나의 주어 덩어리로 묶어 객관적이고 명확하게 판단을 제시합니다.',
    mascotComment: '명사형 어미 ‘-음’ 뒤에 주격 조사 ‘이’가 붙어 통째로 주어가 되었어!',
  },
  '이것은 내가 읽은 소설책이다.': {
    sentence: '이것은 내가 읽은 소설책이다.',
    structureCategory: '겹문장',
    detailedType: '관형절을 가진 안은문장',
    subRelationNote: '‘내가 (소설책을) 읽다’가 관형사형 어미 ‘-은’을 통해 체언 ‘소설책’을 꾸미는 관형절로 안겨 있습니다.',
    embeddedOrLinkedPart: '내가 읽은',
    embeddedFunction: '체언 ‘소설책’을 꾸미는 관형어 역할 (목적어 ‘소설책을’ 생략)',
    predicateCount: 2,
    pairs: [
      { subject: '내가', predicate: '읽은(읽다)', note: '안긴 관형절의 주어·서술어' },
      { subject: '이것은', predicate: '소설책이다', note: '전체 문장의 주어·서술어' },
    ],
    eojeols: [
      { eojeol: '이것은', component: '주어', componentGroup: '주성분', posBreakdown: '대명사(이것) + 보조사(은)', roleNote: '전체 문장의 주어' },
      { eojeol: '내가', component: '주어', componentGroup: '주성분', posBreakdown: '대명사(내) + 주격 조사(가)', roleNote: '관형절 속의 주어', clauseTag: '관형절 내부' },
      { eojeol: '읽은', component: '관형어', componentGroup: '부속 성분', posBreakdown: '동사(읽-) + 관형사형 어미(-은)', roleNote: '체언 ‘소설책’ 수식', clauseTag: '관형절(-은)' },
      { eojeol: '소설책이다.', component: '서술어', componentGroup: '주성분', posBreakdown: '명사(소설책) + 서술격 조사(이다)', roleNote: '전체 문장의 서술어(무엇이다)' },
    ],
    expressionEffect: '그냥 소설책이 아니라 ‘어떤 소설책’인지 구체적인 정보를 압축하여 전달합니다.',
    mascotComment: '‘내가 읽은’이 뒤의 명사 ‘소설책’을 착 꾸며 주는 관형절이야!',
  },
  '나는 아기가 우는 소리를 들었다.': {
    sentence: '나는 아기가 우는 소리를 들었다.',
    structureCategory: '겹문장',
    detailedType: '관형절을 가진 안은문장',
    subRelationNote: '‘아기가 울다’에 관형사형 어미 ‘-는’이 붙어 ‘소리’를 수식하는 관형절로 안겼습니다.',
    embeddedOrLinkedPart: '아기가 우는',
    embeddedFunction: '체언 ‘소리’를 수식하는 관형어 역할',
    predicateCount: 2,
    pairs: [
      { subject: '아기가', predicate: '우는(울다)', note: '안긴 관형절의 주어·서술어' },
      { subject: '나는', predicate: '들었다', note: '전체 문장의 주어·서술어' },
    ],
    eojeols: [
      { eojeol: '나는', component: '주어', componentGroup: '주성분', posBreakdown: '대명사 + 보조사(는)', roleNote: '전체 문장의 주어' },
      { eojeol: '아기가', component: '주어', componentGroup: '주성분', posBreakdown: '명사 + 주격 조사(가)', roleNote: '관형절 속의 주어', clauseTag: '관형절 내부' },
      { eojeol: '우는', component: '관형어', componentGroup: '부속 성분', posBreakdown: '동사(울-) + 관형사형 어미(-는)', roleNote: '체언 ‘소리’ 수식', clauseTag: '관형절(-는)' },
      { eojeol: '소리를', component: '목적어', componentGroup: '주성분', posBreakdown: '명사 + 목적격 조사(를)', roleNote: '‘들었다’의 대상' },
      { eojeol: '들었다.', component: '서술어', componentGroup: '주성분', posBreakdown: '동사(듣다의 과거형)', roleNote: '전체 문장의 서술어' },
    ],
    expressionEffect: '소리의 구체적인 내용을 관형절로 생생하게 묘사합니다.',
    mascotComment: '‘울다’의 ‘ㄹ’이 탈락하고 ‘-는’이 붙어 ‘우는’이 되었어!',
  },
  '빙수는 이가 시리도록 차가웠다.': {
    sentence: '빙수는 이가 시리도록 차가웠다.',
    structureCategory: '겹문장',
    detailedType: '부사절을 가진 안은문장',
    subRelationNote: '‘이가 시리다’에 부사형 어미 ‘-도록’이 붙어 서술어 ‘차가웠다’를 꾸미는 부사절로 안겼습니다.',
    embeddedOrLinkedPart: '이가 시리도록',
    embeddedFunction: '용언 ‘차가웠다’의 정도를 꾸미는 부사어 역할',
    predicateCount: 2,
    pairs: [
      { subject: '이가', predicate: '시리도록(시리다)', note: '안긴 부사절의 주어·서술어' },
      { subject: '빙수는', predicate: '차가웠다', note: '전체 문장의 주어·서술어' },
    ],
    eojeols: [
      { eojeol: '빙수는', component: '주어', componentGroup: '주성분', posBreakdown: '명사 + 보조사(는)', roleNote: '전체 문장의 주어' },
      { eojeol: '이가', component: '주어', componentGroup: '주성분', posBreakdown: '명사(이) + 주격 조사(가)', roleNote: '부사절 속의 주어', clauseTag: '부사절 내부' },
      { eojeol: '시리도록', component: '부사어', componentGroup: '부속 성분', posBreakdown: '형용사(시리-) + 부사형 어미(-도록)', roleNote: '‘차가웠다’를 꾸미는 부사절', clauseTag: '부사절(-도록)' },
      { eojeol: '차가웠다.', component: '서술어', componentGroup: '주성분', posBreakdown: '형용사(차갑다의 과거형)', roleNote: '전체 문장의 서술어' },
    ],
    expressionEffect: '얼마나 차가운지를 감각적인 비유·정도로 생생하게 강조합니다.',
    mascotComment: '‘-게, -도록, -이(없이)’가 붙은 절이 서술어를 꾸미면 부사절!',
  },
  '민후는 땀이 나게 뛰었다.': {
    sentence: '민후는 땀이 나게 뛰었다.',
    structureCategory: '겹문장',
    detailedType: '부사절을 가진 안은문장',
    subRelationNote: '‘땀이 나다’에 부사형 어미 ‘-게’가 붙어 ‘뛰었다’를 수식하는 부사절로 안겼습니다.',
    embeddedOrLinkedPart: '땀이 나게',
    embeddedFunction: '서술어 ‘뛰었다’를 꾸미는 부사어 역할',
    predicateCount: 2,
    pairs: [
      { subject: '땀이', predicate: '나게(나다)', note: '안긴 부사절의 주어·서술어' },
      { subject: '민후는', predicate: '뛰었다', note: '전체 문장의 주어·서술어' },
    ],
    eojeols: [
      { eojeol: '민후는', component: '주어', componentGroup: '주성분', posBreakdown: '명사 + 보조사(는)', roleNote: '전체 문장의 주어' },
      { eojeol: '땀이', component: '주어', componentGroup: '주성분', posBreakdown: '명사 + 주격 조사(이)', roleNote: '부사절 속의 주어', clauseTag: '부사절 내부' },
      { eojeol: '나게', component: '부사어', componentGroup: '부속 성분', posBreakdown: '동사(나-) + 부사형 어미(-게)', roleNote: '‘뛰었다’를 꾸미는 부사절', clauseTag: '부사절(-게)' },
      { eojeol: '뛰었다.', component: '서술어', componentGroup: '주성분', posBreakdown: '동사(뛰다의 과거형)', roleNote: '전체 문장의 서술어' },
    ],
    expressionEffect: '열심히 뛴 정도를 구체적인 상태와 결합해 실감 나게 전달합니다.',
    mascotComment: '어떻게 뛰었어? → [땀이 나게] 뛰었다! 교과서 127쪽 핵심 부사절이야!',
  },
  '토끼는 앞발이 짧다.': {
    sentence: '토끼는 앞발이 짧다.',
    structureCategory: '겹문장',
    detailedType: '서술절을 가진 안은문장',
    subRelationNote: '전체 주어 ‘토끼는’의 특징을 ‘앞발이 짧다’라는 절 전체가 서술어처럼 풀이하고 있습니다.',
    embeddedOrLinkedPart: '앞발이 짧다',
    embeddedFunction: '전체 주어 ‘토끼는’에 대한 서술어 역할',
    predicateCount: 2,
    pairs: [
      { subject: '앞발이', predicate: '짧다', note: '서술절 내부의 작은 주어·서술어' },
      { subject: '토끼는', predicate: '[앞발이 짧다]', note: '전체 주어 + 서술절 통째 호응!' },
    ],
    eojeols: [
      { eojeol: '토끼는', component: '주어', componentGroup: '주성분', posBreakdown: '명사 + 보조사(는)', roleNote: '전체 문장의 큰 주어' },
      { eojeol: '앞발이', component: '주어', componentGroup: '주성분', posBreakdown: '명사 + 주격 조사(이)', roleNote: '서술절 속의 작은 주어', clauseTag: '서술절 내부' },
      { eojeol: '짧다.', component: '서술어', componentGroup: '주성분', posBreakdown: '형용사(짧다)', roleNote: '서술절의 서술어', clauseTag: '서술절 완성' },
    ],
    expressionEffect: '대상의 전체적인 주제(토끼)를 먼저 제시한 뒤 세부 특징(앞발이 짧다)을 또렷하게 부각합니다.',
    mascotComment: '주어가 두 개처럼 보이고 뒤에 ‘되다/아니다’가 아니면 서술절 안은문장!',
  },
  '승재는 마음씨가 곱다.': {
    sentence: '승재는 마음씨가 곱다.',
    structureCategory: '겹문장',
    detailedType: '서술절을 가진 안은문장',
    subRelationNote: '전체 주어 ‘승재는’에 대하여 ‘마음씨가 곱다’ 전체가 서술어 구실을 하는 서술절 안은문장입니다.',
    embeddedOrLinkedPart: '마음씨가 곱다',
    embeddedFunction: '전체 문장의 서술어 역할',
    predicateCount: 2,
    pairs: [
      { subject: '마음씨가', predicate: '곱다', note: '서술절 내부 주어·서술어' },
      { subject: '승재는', predicate: '[마음씨가 곱다]', note: '전체 주어·서술어(서술절)' },
    ],
    eojeols: [
      { eojeol: '승재는', component: '주어', componentGroup: '주성분', posBreakdown: '명사 + 보조사(는)', roleNote: '전체 문장의 큰 주어' },
      { eojeol: '마음씨가', component: '주어', componentGroup: '주성분', posBreakdown: '명사 + 주격 조사(가)', roleNote: '서술절 속의 작은 주어', clauseTag: '서술절 내부' },
      { eojeol: '곱다.', component: '서술어', componentGroup: '주성분', posBreakdown: '형용사(곱다)', roleNote: '서술절의 서술어', clauseTag: '서술절 완성' },
    ],
    expressionEffect: '인물의 성품을 자연스럽고 따뜻한 우리말 특유의 구조로 서술합니다.',
    mascotComment: '내 짝은 마음이 넓다 / 코끼리는 코가 길다 / 승재는 마음씨가 곱다 모두 서술절 가족이야!',
  },
  '민재는 “혁수의 말이 옳다.”라고 말하였다.': {
    sentence: '민재는 “혁수의 말이 옳다.”라고 말하였다.',
    structureCategory: '겹문장',
    detailedType: '인용절을 가진 안은문장',
    subRelationNote: '큰따옴표와 직접 인용 격조사 ‘라고’를 사용하여 인물의 말을 그대로 안은 문장입니다.',
    embeddedOrLinkedPart: '“혁수의 말이 옳다.”라고',
    embeddedFunction: '직접 인용절 (부사어 구실)',
    predicateCount: 2,
    pairs: [
      { subject: '말이', predicate: '옳다', note: '인용절 내부의 주어·서술어' },
      { subject: '민재는', predicate: '말하였다', note: '전체 문장의 주어·서술어' },
    ],
    eojeols: [
      { eojeol: '민재는', component: '주어', componentGroup: '주성분', posBreakdown: '명사 + 보조사(는)', roleNote: '전체 문장의 주어' },
      { eojeol: '“혁수의', component: '관형어', componentGroup: '부속 성분', posBreakdown: '명사 + 관형격 조사(의)', roleNote: '인용절 속 관형어', clauseTag: '직접 인용절' },
      { eojeol: '말이', component: '주어', componentGroup: '주성분', posBreakdown: '명사 + 주격 조사(이)', roleNote: '인용절 속 주어', clauseTag: '직접 인용절' },
      { eojeol: '옳다.”라고', component: '부사어', componentGroup: '부속 성분', posBreakdown: '형용사(옳다) + 직접 인용 조사(라고)', roleNote: '직접 인용절 완성', clauseTag: '직접 인용(라고)' },
      { eojeol: '말하였다.', component: '서술어', componentGroup: '주성분', posBreakdown: '동사(말하다의 과거형)', roleNote: '전체 문장의 서술어' },
    ],
    expressionEffect: '원래 한 말을 큰따옴표로 살려 현장감과 생생함을 높여 줍니다.',
    mascotComment: '큰따옴표가 있으면 조사 ‘라고’가 붙는 직접 인용절!',
  },
  '남주는 할아버지께서 취미로 화초를 기르신다고 말하였다.': {
    sentence: '남주는 할아버지께서 취미로 화초를 기르신다고 말하였다.',
    structureCategory: '겹문장',
    detailedType: '인용절을 가진 안은문장',
    subRelationNote: '따옴표 없이 간접 인용 조사 ‘고’를 붙여 다른 사람의 말을 전달하는 간접 인용절 안은문장입니다.',
    embeddedOrLinkedPart: '할아버지께서 취미로 화초를 기르신다고',
    embeddedFunction: '간접 인용절 (부사어 구실)',
    predicateCount: 2,
    pairs: [
      { subject: '할아버지께서', predicate: '기르신다(고)', note: '인용절 내부의 주어·서술어' },
      { subject: '남주는', predicate: '말하였다', note: '전체 문장의 주어·서술어' },
    ],
    eojeols: [
      { eojeol: '남주는', component: '주어', componentGroup: '주성분', posBreakdown: '명사 + 보조사(는)', roleNote: '전체 문장의 주어' },
      { eojeol: '할아버지께서', component: '주어', componentGroup: '주성분', posBreakdown: '명사 + 높임 주격 조사(께서)', roleNote: '인용절 속 주어', clauseTag: '간접 인용절' },
      { eojeol: '취미로', component: '부사어', componentGroup: '부속 성분', posBreakdown: '명사 + 부사격 조사(로)', roleNote: '인용절 속 부사어', clauseTag: '간접 인용절' },
      { eojeol: '화초를', component: '목적어', componentGroup: '주성분', posBreakdown: '명사 + 목적격 조사(를)', roleNote: '인용절 속 목적어', clauseTag: '간접 인용절' },
      { eojeol: '기르신다고', component: '부사어', componentGroup: '부속 성분', posBreakdown: '동사 활용형 + 간접 인용 조사(고)', roleNote: '간접 인용절 완성', clauseTag: '간접 인용(고)' },
      { eojeol: '말하였다.', component: '서술어', componentGroup: '주성분', posBreakdown: '동사(말하다의 과거형)', roleNote: '전체 문장의 서술어' },
    ],
    expressionEffect: '말하는 사람의 시점으로 매끄럽게 녹여 정보를 차분하게 전달합니다.',
    mascotComment: '따옴표 없이 ‘~다고/냐고/자고/라고 + 말하다’가 오면 간접 인용절이야!',
  },
};

const PURE_DETERMINERS = new Set([
  '새', '헌', '옛', '모든', '온갖', '맨', '순', '이', '그', '저', '어느', '무슨', '어떤', '한', '두', '세', '네', '여러', '첫',
]);

const PURE_ADVERBS = new Set([
  '매우', '정말', '참', '아주', '너무', '가장', '제일', '빨리', '천천히', '부지런히', '깨끗이', '열심히', '일찍', '자꾸', '겨우', '몹시', '활짝', '펑펑', '보글보글', '뭉게뭉게', '과연', '설마', '다행히', '그러나', '그래서', '그리고', '하지만', '어제', '오늘', '내일', '함께', '같이', '뒤늦게', '하염없이', '특히', '더',
]);

const INTERJECTIONS = new Set([
  '우아', '와', '세상에', '어머나', '아', '야', '네', '응', '아니', '예', '그래', '어머',
]);

function getComponentGroup(comp: SentenceComponentType): '주성분' | '부속 성분' | '독립 성분' {
  if (comp === '주어' || comp === '서술어' || comp === '목적어' || comp === '보어') return '주성분';
  if (comp === '관형어' || comp === '부사어') return '부속 성분';
  return '독립 성분';
}

function cleanPunct(word: string): string {
  return word.replace(/[.!?,"“”'‘’]+$/g, '').replace(/^["“”'‘’]+/g, '');
}

function isComplementPredicate(cleanedWord: string): boolean {
  return /^(되다|된다|되었다|되었어|됐어|됐다|되니|되면|되어야|아니다|아니야|아니었다|아니래|아닙니다|아니니)$/.test(cleanedWord);
}

export function analyzeKoreanSentence(rawInput: string): SentenceStructureResult {
  const normalized = rawInput.trim().replace(/\s+/g, ' ');
  if (!normalized) {
    return CURATED_DB['학생이 새 옷을 입었다.'];
  }

  // Exact match or match without trailing period
  if (CURATED_DB[normalized]) {
    return CURATED_DB[normalized];
  }
  const withPeriod = normalized.endsWith('.') || normalized.endsWith('?') || normalized.endsWith('!')
    ? normalized
    : `${normalized}.`;
  if (CURATED_DB[withPeriod]) {
    return CURATED_DB[withPeriod];
  }

  // Smart rule-based morphological & syntactic analyzer for arbitrary user sentences
  const tokens = normalized.split(' ').filter(Boolean);
  const eojeols: EojeolAnalysis[] = [];
  let detailedType: SentenceStructureResult['detailedType'] = '홑문장';
  let subRelationNote = '주어와 서술어의 호응 관계가 한 번 나타나는 홑문장입니다.';
  let embeddedOrLinkedPart: string | undefined;
  let embeddedFunction: string | undefined;

  const lastIdx = tokens.length - 1;

  for (let i = 0; i < tokens.length; i++) {
    const raw = tokens[i];
    const clean = cleanPunct(raw);
    const nextClean = i < lastIdx ? cleanPunct(tokens[i + 1]) : '';
    const isLast = i === lastIdx;

    // 1. Last token is almost always main 서술어
    if (isLast) {
      const isIda = clean.endsWith('이다') || clean.endsWith('이야') || clean.endsWith('입니다');
      eojeols.push({
        eojeol: raw,
        component: '서술어',
        componentGroup: '주성분',
        posBreakdown: isIda ? '체언 + 서술격 조사(이다)' : '용언(동사·형용사 활용형)',
        roleNote: '문장 전체를 마무리하며 풀이하는 서술어',
      });
      continue;
    }

    // 2. First token check for 독립어 (comma or vocative/interjection)
    if (
      i === 0 &&
      (raw.endsWith(',') || INTERJECTIONS.has(clean) || /^[가-힣]{2,4}(아|야|님|선생님)$/.test(clean))
    ) {
      if (INTERJECTIONS.has(clean) || /[아야],?$/.test(raw) || clean.endsWith('선생님')) {
        eojeols.push({
          eojeol: raw,
          component: '독립어',
          componentGroup: '독립 성분',
          posBreakdown: INTERJECTIONS.has(clean) ? '감탄사' : '체언 + 호격 조사/부름말',
          roleNote: '부름·감탄·응답을 나타내는 독립 성분',
        });
        continue;
      }
    }

    // 3. Check direct/indirect quote token before speech verb
    if (
      (raw.includes('”라고') || raw.includes('"라고') || clean.endsWith('라고')) &&
      /^(말하|말했|물었|외쳤|대답했|생각했|전했)/.test(nextClean)
    ) {
      detailedType = '인용절을 가진 안은문장';
      embeddedOrLinkedPart = tokens.slice(1, i + 1).join(' ');
      embeddedFunction = '다른 사람의 말을 인용한 인용절(부사어 기능)';
      eojeols.push({
        eojeol: raw,
        component: '부사어',
        componentGroup: '부속 성분',
        posBreakdown: '인용절 + 인용 격조사(라고)',
        roleNote: '서술어를 꾸미는 인용절',
        clauseTag: '인용절(라고)',
      });
      continue;
    }

    if (
      /(다고|냐고|자고|으라고)$/.test(clean) &&
      /^(말하|말했|물었|생각했|전했|느꼈|했다)/.test(nextClean)
    ) {
      detailedType = '인용절을 가진 안은문장';
      embeddedOrLinkedPart = clean;
      embeddedFunction = '간접 인용절(조사 ‘고’ 결합, 부사어 기능)';
      eojeols.push({
        eojeol: raw,
        component: '부사어',
        componentGroup: '부속 성분',
        posBreakdown: '용언 종결형 + 간접 인용 조사(고)',
        roleNote: '간접 인용 부사어',
        clauseTag: '간접 인용절(고)',
      });
      continue;
    }

    // 4. Coordinate / Subordinate conjunctive endings (이어진문장)
    if (/(지만|으나|거나|든지)$/.test(clean) || (clean.endsWith('고') && !clean.endsWith('그리고') && clean.length >= 2 && !PURE_ADVERBS.has(clean))) {
      // Distinguish coordinate vs subordinate
      if (/(지만|으나|거나|든지|고|며)$/.test(clean)) {
        detailedType = '대등하게 이어진문장';
        embeddedOrLinkedPart = `${tokens.slice(0, i + 1).join(' ')} + ${tokens.slice(i + 1).join(' ')}`;
        embeddedFunction = '나열·대조·선택의 대등적 의미 관계';
        eojeols.push({
          eojeol: raw,
          component: '서술어',
          componentGroup: '주성분',
          posBreakdown: '용언 어간 + 대등적 연결 어미',
          roleNote: '앞 절의 서술어 (뒤 절과 대등 연결)',
          clauseTag: '대등 연결',
        });
        continue;
      }
    }

    if (/(아서|어서|여서|으니까|으니|으면|거든|으러|러|으려고|려고|더라도)$/.test(clean) || (clean.length >= 2 && /(서|면)$/.test(clean) && !clean.endsWith('에서') && !clean.endsWith('로서'))) {
      detailedType = '종속적으로 이어진문장';
      embeddedOrLinkedPart = `${tokens.slice(0, i + 1).join(' ')} → ${tokens.slice(i + 1).join(' ')}`;
      embeddedFunction = '원인·조건·의도의 종속적 의미 관계';
      eojeols.push({
        eojeol: raw,
        component: '서술어',
        componentGroup: '주성분',
        posBreakdown: '용언 어간 + 종속적 연결 어미',
        roleNote: '앞 절의 서술어 (뒤 절에 종속 연결)',
        clauseTag: '종속 연결',
      });
      continue;
    }

    // 5. Nominal clause (명사절: ~기를, ~기가, ~기에, ~음을, ~음이, ~ㅁ을, ~ㅁ이)
    if (/(기를|기가|기는|기에|기도|음을|음이|음은|했음을|했음이|았음을|았음이|었음을|었음이)$/.test(clean)) {
      detailedType = '명사절을 가진 안은문장';
      embeddedOrLinkedPart = clean.replace(/(를|가|는|에|도|을|이|은)$/, '');
      const comp: SentenceComponentType = /(를|을)$/.test(clean)
        ? '목적어'
        : /(에)$/.test(clean)
          ? '부사어'
          : '주어';
      embeddedFunction = `명사형 어미 결합 후 전체 문장에서 ${comp} 역할`;
      eojeols.push({
        eojeol: raw,
        component: comp,
        componentGroup: getComponentGroup(comp),
        posBreakdown: '용언 어간 + 명사형 전성 어미(-(으)ㅁ/-기) + 조사',
        roleNote: `명사절로서 ${comp} 역할 수행`,
        clauseTag: '명사절',
      });
      continue;
    }

    // 6. Pure determiner & genitive 조사 '의' (관형어)
    if (PURE_DETERMINERS.has(clean)) {
      eojeols.push({
        eojeol: raw,
        component: '관형어',
        componentGroup: '부속 성분',
        posBreakdown: `관형사(${clean})`,
        roleNote: `뒤의 체언 ‘${nextClean}’ 수식`,
      });
      continue;
    }
    if (clean.endsWith('의') && clean.length >= 2) {
      eojeols.push({
        eojeol: raw,
        component: '관형어',
        componentGroup: '부속 성분',
        posBreakdown: '체언 + 관형격 조사(의)',
        roleNote: `뒤의 체언 ‘${nextClean}’ 수식`,
      });
      continue;
    }

    // 7. Pure adverbs (부사어)
    if (PURE_ADVERBS.has(clean)) {
      eojeols.push({
        eojeol: raw,
        component: '부사어',
        componentGroup: '부속 성분',
        posBreakdown: `부사(${clean})`,
        roleNote: '용언 또는 문장 수식',
      });
      continue;
    }

    // 8. Adverbial clause / derived adverbial (~게, ~도록, 없이)
    if (/(도록|없이)$/.test(clean) || (clean.endsWith('게') && clean.length >= 2 && !clean.endsWith('에게'))) {
      const prevWasSubject = eojeols.length > 0 && eojeols[eojeols.length - 1].component === '주어' && eojeols.filter((e) => e.component === '주어').length >= 2;
      if (prevWasSubject || clean.endsWith('도록') || clean === '없이') {
        if (detailedType === '홑문장') {
          detailedType = '부사절을 가진 안은문장';
          embeddedOrLinkedPart = prevWasSubject ? `${eojeols[eojeols.length - 1].eojeol} ${clean}` : clean;
          embeddedFunction = '서술어를 꾸미는 부사절(부사어 역할)';
        }
      }
      eojeols.push({
        eojeol: raw,
        component: '부사어',
        componentGroup: '부속 성분',
        posBreakdown: '용언 어간 + 부사형 어미(-게/-도록)',
        roleNote: '뒤의 서술어를 꾸미는 부사어',
        clauseTag: detailedType === '부사절을 가진 안은문장' ? '부사절' : undefined,
      });
      continue;
    }

    // 9. Complement (보어) right before 되다 / 아니다
    if (/(이|가)$/.test(clean) && isComplementPredicate(nextClean)) {
      eojeols.push({
        eojeol: raw,
        component: '보어',
        componentGroup: '주성분',
        posBreakdown: '체언 + 보격 조사(이/가)',
        roleNote: `서술어 ‘${nextClean}’가 요구하는 보어`,
      });
      continue;
    }

    // 10. Object (목적어: ~을/를)
    if (/(을|를)$/.test(clean) && clean.length >= 2) {
      eojeols.push({
        eojeol: raw,
        component: '목적어',
        componentGroup: '주성분',
        posBreakdown: '체언 + 목적격 조사(을/를)',
        roleNote: '서술어 동작의 대상',
      });
      continue;
    }

    // 11. Adverbial postpositions (~에, ~에서, ~에게, ~으로, ~로, ~와, ~과, ~보다, ~처럼)
    if (/(에서|에게|한테|으로|보다|처럼|부터|까지)$/.test(clean) || (clean.length >= 2 && /(에|로|와|과)$/.test(clean))) {
      eojeols.push({
        eojeol: raw,
        component: '부사어',
        componentGroup: '부속 성분',
        posBreakdown: '체언 + 부사격 조사',
        roleNote: '장소·대상·수단 등을 나타내는 부사어',
      });
      continue;
    }

    // 12. Subject (~이/가, ~은/는, ~께서, ~도) vs Relative Clause (~은/는/을/던 before noun!)
    if (/(께서|이|가)$/.test(clean)) {
      eojeols.push({
        eojeol: raw,
        component: '주어',
        componentGroup: '주성분',
        posBreakdown: '체언 + 주격 조사',
        roleNote: '동작이나 상태의 주체',
      });
      continue;
    }

    // Distinguish topic 주어 (~은/는) vs 관형절 (~은/는/던/을 modifying next noun)
    if (/(은|는|던)$/.test(clean)) {
      // Heuristic: first token ending with 은/는 or common pronouns (나는, 너는, 그는, 우리는, 이것은, 그녀는) -> 주어!
      const isTopicPronounOrFirst =
        i === 0 ||
        /^(나는|너는|그는|그녀는|우리는|이것은|그것은|저것은|동생은|언니는|형은|누나는|선생님은|철수는|영희는|수아는|민지는)$/.test(clean);

      if (!isTopicPronounOrFirst && i < lastIdx) {
        if (detailedType === '홑문장') {
          detailedType = '관형절을 가진 안은문장';
          embeddedOrLinkedPart = clean;
          embeddedFunction = `뒤의 체언 ‘${nextClean}’을 꾸미는 관형절(관형어 역할)`;
        }
        eojeols.push({
          eojeol: raw,
          component: '관형어',
          componentGroup: '부속 성분',
          posBreakdown: '용언 어간 + 관형사형 어미(-(으)ㄴ/-는/-던)',
          roleNote: `체언 ‘${nextClean}’을 꾸미는 관형절`,
          clauseTag: '관형절',
        });
        continue;
      }

      eojeols.push({
        eojeol: raw,
        component: '주어',
        componentGroup: '주성분',
        posBreakdown: '체언 + 보조사(은/는)',
        roleNote: '문장의 화제이자 주체(주어)',
      });
      continue;
    }

    // Common Korean relative endings with ㄴ/ㄹ batchim (예쁜, 맑은, 작은, 읽은, 그린, 좋아할, 방문한, 유명한, 사나운, 어려운, 귀여운, 멋진)
    if (/[가-힣]+(한|된|진|운|은|린|긴|본|산|온|간|난|던|할|볼|갈|올|살|먹을|입을|읽을|예쁜|맑은|작은|높은|깊은|넓은|짧은|붉은|푸른|하얀|검은|멋진)$/.test(clean) && i < lastIdx) {
      if (detailedType === '홑문장') {
        detailedType = '관형절을 가진 안은문장';
        embeddedOrLinkedPart = clean;
        embeddedFunction = `뒤의 체언 ‘${nextClean}’을 수식하는 관형절`;
      }
      eojeols.push({
        eojeol: raw,
        component: '관형어',
        componentGroup: '부속 성분',
        posBreakdown: '용언 어간 + 관형사형 전성 어미',
        roleNote: `체언 ‘${nextClean}’을 꾸미는 관형어`,
        clauseTag: '관형절',
      });
      continue;
    }

    // Fallback: if first token -> 주어, otherwise 관형어/부사어
    eojeols.push({
      eojeol: raw,
      component: i === 0 ? '주어' : '부사어',
      componentGroup: i === 0 ? '주성분' : '부속 성분',
      posBreakdown: i === 0 ? '체언(조사 생략)' : '수식 성분',
      roleNote: i === 0 ? '문장의 주체' : '서술어 수식',
    });
  }

  // Post-check for 서술절을 가진 안은문장:
  // Two 주어s (e.g. [토끼는] + [앞발이] + [짧다]) and only 1 explicit 서술어, and no 이어진/안은 detected yet!
  const subjectEojeols = eojeols.filter((e) => e.component === '주어');
  const predEojeols = eojeols.filter((e) => e.component === '서술어');
  if (detailedType === '홑문장' && subjectEojeols.length >= 2 && predEojeols.length === 1) {
    detailedType = '서술절을 가진 안은문장';
    const secondSubjIdx = eojeols.findIndex((e, idx) => idx > 0 && e.component === '주어');
    if (secondSubjIdx !== -1) {
      embeddedOrLinkedPart = tokens.slice(secondSubjIdx).join(' ');
      embeddedFunction = `전체 주어 ‘${subjectEojeols[0].eojeol}’를 풀이하는 서술절(서술어 역할)`;
      eojeols[secondSubjIdx].clauseTag = '서술절 내부 주어';
      eojeols[eojeols.length - 1].clauseTag = '서술절 완성';
    }
  }

  const structureCategory: '홑문장' | '겹문장' = detailedType === '홑문장' ? '홑문장' : '겹문장';
  const pairs: PredicatePair[] = [];

  if (structureCategory === '홑문장') {
    pairs.push({
      subject: subjectEojeols[0]?.eojeol ?? '(생략된 주어)',
      predicate: predEojeols[0]?.eojeol ?? tokens[tokens.length - 1],
      note: '주어와 서술어 1회 호응',
    });
    subRelationNote = '주어와 서술어의 관계가 한 번만 나타나는 홑문장입니다.';
  } else {
    subRelationNote = `주어와 서술어의 관계가 두 번 이상 나타나는 겹문장(${detailedType})입니다.`;
    if (detailedType === '서술절을 가진 안은문장' && subjectEojeols.length >= 2) {
      pairs.push({
        subject: subjectEojeols[1].eojeol,
        predicate: predEojeols[0].eojeol,
        note: '안긴 서술절의 주어·서술어',
      });
      pairs.push({
        subject: subjectEojeols[0].eojeol,
        predicate: `[${embeddedOrLinkedPart ?? ''}]`,
        note: '전체 문장의 큰 주어 + 서술절 호응',
      });
    } else if (predEojeols.length >= 2) {
      pairs.push({
        subject: subjectEojeols[0]?.eojeol ?? '(주어)',
        predicate: predEojeols[0].eojeol,
        note: '앞 절의 주어·서술어',
      });
      pairs.push({
        subject: subjectEojeols[1]?.eojeol ?? `(${subjectEojeols[0]?.eojeol ?? '생략된 주어'})`,
        predicate: predEojeols[1].eojeol,
        note: '뒤 절의 주어·서술어',
      });
    } else {
      pairs.push({
        subject: subjectEojeols.length > 1 ? subjectEojeols[1].eojeol : '(안긴절 주어)',
        predicate: embeddedOrLinkedPart ?? '안긴절 서술어',
        note: '안긴문장(절)의 주어·서술어',
      });
      pairs.push({
        subject: subjectEojeols[0]?.eojeol ?? '(전체 주어)',
        predicate: predEojeols[predEojeols.length - 1]?.eojeol ?? tokens[tokens.length - 1],
        note: '안은문장 전체의 주어·서술어',
      });
    }
  }

  return {
    sentence: normalized,
    structureCategory,
    detailedType,
    subRelationNote,
    embeddedOrLinkedPart,
    embeddedFunction,
    predicateCount: structureCategory === '홑문장' ? 1 : Math.max(2, pairs.length),
    pairs,
    eojeols,
    expressionEffect:
      structureCategory === '홑문장'
        ? '호흡이 빠르고 간결하며, 전달하려는 핵심 사건이 명확하게 드러납니다.'
        : '두 개 이상의 사건이나 구체적인 수식 관계를 한 문장 안에 짜임새 있게 묶어 풍부한 의미를 전달합니다.',
    mascotComment:
      structureCategory === '홑문장'
        ? '서술어가 딱 한 번 쓰인 깔끔한 홑문장이야! 각 어절의 역할도 살펴봐!'
        : `짜잔! 이 문장은 ‘${detailedType}’ 구조를 가진 겹문장이야!`,
  };
}
