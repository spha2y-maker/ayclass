import React, { useState } from 'react';
import { CheckCircle2, RotateCcw, Search, Sparkles } from 'lucide-react';
import {
  SentenceComponentType,
} from '../types/grammar';
import {
  analyzeKoreanSentence,
  PRESET_SENTENCES,
} from '../utils/sentenceAnalyzer';
import { MascotBubble } from './Mascots';

const ALL_COMPONENTS: SentenceComponentType[] = [
  '주어',
  '서술어',
  '목적어',
  '보어',
  '관형어',
  '부사어',
  '독립어',
];

const COMPONENT_COLOR_MAP: Record<
  SentenceComponentType,
  { bg: string; text: string; border: string }
> = {
  주어: { bg: 'bg-[#FFF0F5]', text: 'text-[#BE123C]', border: 'border-[#FBCFE8]' },
  서술어: { bg: 'bg-[#EFF8FF]', text: 'text-[#0369A1]', border: 'border-[#BAE6FD]' },
  목적어: { bg: 'bg-[#ECFDF5]', text: 'text-[#047857]', border: 'border-[#A7F3D0]' },
  보어: { bg: 'bg-[#FEF9C3]', text: 'text-[#A16207]', border: 'border-[#FDE047]' },
  관형어: { bg: 'bg-[#F3E8FF]', text: 'text-[#7E22CE]', border: 'border-[#E9D5FF]' },
  부사어: { bg: 'bg-[#FFF7ED]', text: 'text-[#C2410C]', border: 'border-[#FED7AA]' },
  독립어: { bg: 'bg-[#F1F5F9]', text: 'text-[#334155]', border: 'border-[#CBD5E1]' },
};

export const AnalyzerView: React.FC = () => {
  const [inputSentence, setInputSentence] = useState('나는 해가 떠오르기를 기다린다.');
  const [submittedSentence, setSubmittedSentence] = useState('나는 해가 떠오르기를 기다린다.');
  const [mode, setMode] = useState<'auto' | 'practice'>('auto');
  const [activeEojeolIdx, setActiveEojeolIdx] = useState<number>(0);
  const [userTags, setUserTags] = useState<Record<number, SentenceComponentType>>({});
  const [practiceChecked, setPracticeChecked] = useState(false);

  const analysis = analyzeKoreanSentence(submittedSentence);

  const handleAnalyzeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputSentence.trim()) return;
    setSubmittedSentence(inputSentence.trim());
    setActiveEojeolIdx(0);
    setUserTags({});
    setPracticeChecked(false);
  };

  const handleSelectPreset = (sent: string) => {
    setInputSentence(sent);
    setSubmittedSentence(sent);
    setActiveEojeolIdx(0);
    setUserTags({});
    setPracticeChecked(false);
  };

  const handleTagEojeol = (comp: SentenceComponentType) => {
    if (practiceChecked) return;
    setUserTags((prev) => ({ ...prev, [activeEojeolIdx]: comp }));
    if (activeEojeolIdx + 1 < analysis.eojeols.length) {
      setActiveEojeolIdx(activeEojeolIdx + 1);
    }
  };

  const allTagged =
    analysis.eojeols.length > 0 &&
    analysis.eojeols.every((_, idx) => Boolean(userTags[idx]));

  const correctTagCount = analysis.eojeols.filter(
    (ej, idx) => userTags[idx] === ej.component
  ).length;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#EFE5DC]">
        <div>
          <div className="text-xs font-semibold text-[#BE123C] mb-2">
            맞춤형 문장 구조 분석 연구소
          </div>
          <h1 className="text-2xl sm:text-4xl font-display text-[#2D2424] mb-2">
            어절별 문장 성분 & 문장의 짜임 분석기
          </h1>
          <p className="text-sm sm:text-base text-[#5E4E46]">
            원하는 우리말 문장을 직접 입력하거나 교과서 핵심 예문을 클릭하면 어절별 성분·품사·주술 호응·짜임을 한눈에 분석해 드려요!
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1 p-1 bg-[#F5EDE6] rounded-xl shrink-0">
          <button
            type="button"
            onClick={() => setMode('auto')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
              mode === 'auto'
                ? 'bg-white text-[#2D2424] shadow-xs'
                : 'text-[#6E5D53] hover:text-[#2D2424]'
            }`}
          >
            자동 구조 분석 보기
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('practice');
              setUserTags({});
              setActiveEojeolIdx(0);
              setPracticeChecked(false);
            }}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
              mode === 'practice'
                ? 'bg-white text-[#2D2424] shadow-xs'
                : 'text-[#6E5D53] hover:text-[#2D2424]'
            }`}
          >
            내가 직접 성분 태그하기
          </button>
        </div>
      </div>

      {/* Input Form & Quick Presets */}
      <div className="bg-white rounded-3xl border border-[#ECE2D8] p-6 space-y-5">
        <form onSubmit={handleAnalyzeSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-[#9C8D82] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={inputSentence}
              onChange={(e) => setInputSentence(e.target.value)}
              placeholder="분석하고 싶은 문장을 입력하세요 (예: 토끼는 앞발이 짧다.)"
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#FAF6F2] border border-[#E5D9CE] text-sm sm:text-base text-[#2D2424] focus:outline-none focus:border-[#E11D48]"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#E11D48] hover:bg-[#BE123C] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            문장 구조 분석하기
          </button>
        </form>

        <div>
          <div className="text-xs font-semibold text-[#7D6B5D] mb-2.5">
            교과서·평가문제 대표 문장 빠르게 불러오기 ({PRESET_SENTENCES.length}선)
          </div>
          <div className="flex flex-wrap gap-2">
            {PRESET_SENTENCES.map((item, idx) => {
              const isSelected = submittedSentence === item.sentence;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectPreset(item.sentence)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-[#FFF0F5] border-[#E11D48] text-[#BE123C] font-semibold'
                      : 'bg-[#FDFBF9] border-[#EAE0D6] text-[#4A3B32] hover:border-[#F43F5E]'
                  }`}
                >
                  <span className="text-[#9A6B56] mr-1.5">{item.category} ·</span>
                  {item.sentence}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* MODE A: AUTO VISUAL ANALYSIS */}
      {mode === 'auto' ? (
        <div className="space-y-6">
          {/* Top Verdict Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-white rounded-3xl border border-[#ECE2D8] p-6 sm:p-8 space-y-4">
              <div className="text-xs text-[#8C7A6E]">
                문장의 짜임 최종 판정 · 주어-서술어 관계 {analysis.predicateCount}회
              </div>
              <div className="flex flex-wrap items-baseline gap-3">
                <h2 className="text-2xl sm:text-3xl font-display text-[#E11D48]">
                  {analysis.detailedType}
                </h2>
                <span className="text-sm font-semibold text-[#5E4E46]">
                  ({analysis.structureCategory})
                </span>
              </div>
              <p className="text-sm sm:text-base text-[#3B2F2F] leading-relaxed">
                {analysis.subRelationNote}
              </p>

              {analysis.embeddedOrLinkedPart && (
                <div className="p-4 rounded-2xl bg-[#FFF8FA] space-y-1 text-sm">
                  <div className="text-xs font-semibold text-[#BE123C]">
                    핵심 절·연결 구조 포인트
                  </div>
                  <div className="font-bold text-[#2D2424]">{analysis.embeddedOrLinkedPart}</div>
                  {analysis.embeddedFunction && (
                    <div className="text-xs text-[#6E5D53]">{analysis.embeddedFunction}</div>
                  )}
                </div>
              )}

              <div className="pt-3 border-t border-[#F3EAE2] text-xs sm:text-sm text-[#5E4E46]">
                <strong className="text-[#2D2424]">표현 효과:</strong> {analysis.expressionEffect}
              </div>
            </div>

            {/* Subject-Predicate Pairs */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-[#ECE2D8] p-6 flex flex-col justify-between gap-5">
              <div>
                <h3 className="text-lg font-display text-[#2D2424] mb-1">
                  주어 ↔ 서술어 호응 짝꿍
                </h3>
                <p className="text-xs text-[#7D6B5D] mb-4">
                  누가/무엇이 어떻게 하는지 호응 짝을 확인해 보세요.
                </p>

                <div className="space-y-3">
                  {analysis.pairs.map((pair, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[#FAF6F2] space-y-1.5">
                      <div className="text-xs text-[#8C7A6E] font-mono tabular-nums">
                        짝꿍 0{idx + 1} · {pair.note}
                      </div>
                      <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-[#2D2424]">
                        <span className="text-[#BE123C]">{pair.subject}</span>
                        <span className="text-[#9C8D82]">↔</span>
                        <span className="text-[#0369A1]">{pair.predicate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <MascotBubble character="chii" mood="cheer" speakerLabel="치이의 한 줄 코멘트">
                {analysis.mascotComment}
              </MascotBubble>
            </div>
          </div>

          {/* Eojeol-by-Eojeol Breakdown */}
          <div className="bg-white rounded-3xl border border-[#ECE2D8] p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-xl font-display text-[#2D2424]">
                어절별 문장 성분 & 품사 정밀 해부 ({analysis.eojeols.length}어절)
              </h3>
              <p className="text-xs sm:text-sm text-[#6E5D53]">
                각 어절의 문장 속 역할(~어)과 단어 자체의 품사(~사) 구성을 함께 비교해 보세요.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {analysis.eojeols.map((ej, idx) => {
                const palette = COMPONENT_COLOR_MAP[ej.component];
                return (
                  <div
                    key={idx}
                    className={`rounded-2xl border p-5 space-y-2.5 ${palette.bg} ${palette.border}`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono tabular-nums text-[#7D6B5D]">
                        {idx + 1}어절 · {ej.componentGroup}
                      </span>
                      <span className={`font-bold ${palette.text}`}>{ej.component}</span>
                    </div>

                    <div className="text-xl font-bold text-[#2D2424]">{ej.eojeol}</div>

                    <div className="space-y-1 text-xs text-[#4A3B32] pt-2 border-t border-black/5">
                      <div>
                        <strong>품사 구성:</strong> {ej.posBreakdown}
                      </div>
                      <div>
                        <strong>문장 역할:</strong> {ej.roleNote}
                      </div>
                      {ej.clauseTag && (
                        <div className="font-semibold text-[#BE123C]">
                          절 표지 · {ej.clauseTag}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* MODE B: STUDENT SELF-TAGGING PRACTICE */
        <div className="bg-white rounded-3xl border border-[#ECE2D8] p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-display text-[#2D2424]">
                직접 어절마다 문장 성분을 붙여 보세요!
              </h2>
              <p className="text-xs sm:text-sm text-[#6E5D53]">
                위 어절 카드를 선택한 뒤 아래 7가지 문장 성분 버튼 중 알맞은 역할을 눌러 보세요.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setUserTags({});
                setActiveEojeolIdx(0);
                setPracticeChecked(false);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F5EDE6] hover:bg-[#EAE0D7] text-[#3B2F2F] text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              태그 초기화
            </button>
          </div>

          {/* Interactive Eojeol Slots */}
          <div className="flex flex-wrap gap-3 py-4">
            {analysis.eojeols.map((ej, idx) => {
              const picked = userTags[idx];
              const isCurrent = activeEojeolIdx === idx && !practiceChecked;
              const isRight = picked === ej.component;

              let borderCls = 'border-[#E5D9CE] bg-[#FAF6F2]';
              if (practiceChecked) {
                borderCls = isRight
                  ? 'border-[#10B981] bg-[#ECFDF5]'
                  : 'border-[#F43F5E] bg-[#FFF1F2]';
              } else if (isCurrent) {
                borderCls = 'border-[#E11D48] bg-[#FFF0F5]';
              } else if (picked) {
                borderCls = 'border-[#BAE6FD] bg-[#EFF8FF]';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => !practiceChecked && setActiveEojeolIdx(idx)}
                  className={`px-5 py-4 rounded-2xl border-2 text-left transition-colors min-w-[120px] ${borderCls}`}
                >
                  <div className="text-xs text-[#7D6B5D] mb-1 font-mono tabular-nums">
                    {idx + 1}어절
                  </div>
                  <div className="text-lg font-bold text-[#2D2424] mb-2">{ej.eojeol}</div>
                  <div className="text-xs font-bold text-[#BE123C]">
                    {picked ? `선택: ${picked}` : '미선택 (?)'}
                  </div>
                  {practiceChecked && !isRight && (
                    <div className="text-xs font-bold text-[#059669] mt-1">
                      정답: {ej.component}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* 7 Component Picker Buttons */}
          {!practiceChecked && (
            <div className="space-y-3 pt-2 border-t border-[#F3EAE2]">
              <div className="text-xs font-semibold text-[#5E4E46]">
                현재 선택된 ‘{analysis.eojeols[activeEojeolIdx]?.eojeol}’의 문장 성분은 무엇일까요?
              </div>
              <div className="flex flex-wrap gap-2.5">
                {ALL_COMPONENTS.map((comp) => (
                  <button
                    key={comp}
                    type="button"
                    onClick={() => handleTagEojeol(comp)}
                    className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#FFF0F5] border border-[#E2D5C8] hover:border-[#E11D48] text-sm font-bold text-[#2D2424] transition-colors whitespace-nowrap shrink-0"
                  >
                    {comp}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Check Button / Practice Result */}
          <div className="flex items-center justify-between pt-4 border-t border-[#F3EAE2]">
            {practiceChecked ? (
              <div className="flex items-center gap-2 text-sm font-bold text-[#2D2424]">
                <CheckCircle2 className="w-5 h-5 text-[#059669]" />
                <span>
                  총 {analysis.eojeols.length}어절 중{' '}
                  <strong className="text-[#E11D48] tabular-nums">{correctTagCount}어절</strong>을
                  정확히 분석했어요! (문장의 짜임: {analysis.detailedType})
                </span>
              </div>
            ) : (
              <div className="text-xs text-[#7D6B5D]">
                모든 어절에 성분 태그를 붙이면 채점 버튼이 활성화됩니다.
              </div>
            )}

            {!practiceChecked ? (
              <button
                type="button"
                disabled={!allTagged}
                onClick={() => setPracticeChecked(true)}
                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  allTagged
                    ? 'bg-[#E11D48] hover:bg-[#BE123C] text-white'
                    : 'bg-[#EDE5DE] text-[#A8998E] cursor-not-allowed'
                }`}
              >
                분석 채점하기
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setMode('auto')}
                className="px-5 py-2.5 rounded-xl bg-[#2D2424] hover:bg-[#433636] text-white text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                상세 해설 보기
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
