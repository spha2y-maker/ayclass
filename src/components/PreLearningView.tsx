import React, { useState } from 'react';
import { CheckCircle2, Eye, RotateCcw, Sparkles, XCircle } from 'lucide-react';
import {
  CHAMELEON_WORDS,
  COMPONENT_WORKSHEET_ROWS,
  POS_WORKSHEET_ROWS,
  PRELEARNING_CHECK_QUIZZES,
} from '../data/prelearningData';
import { AppTab } from '../types/grammar';
import { MascotBubble } from './Mascots';

interface PreLearningViewProps {
  onNavigateTab: (tab: AppTab) => void;
}

export const PreLearningView: React.FC<PreLearningViewProps> = ({ onNavigateTab }) => {
  const [revealedPosIds, setRevealedPosIds] = useState<Record<string, boolean>>({});
  const [revealedCompIds, setRevealedCompIds] = useState<Record<string, boolean>>({});
  const [selectedChameleonId, setSelectedChameleonId] = useState<string>(CHAMELEON_WORDS[0].id);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});

  const revealAllPos = () => {
    const next: Record<string, boolean> = {};
    POS_WORKSHEET_ROWS.forEach((r) => {
      next[r.id] = true;
    });
    setRevealedPosIds(next);
  };

  const revealAllComp = () => {
    const next: Record<string, boolean> = {};
    COMPONENT_WORKSHEET_ROWS.forEach((r) => {
      next[r.id] = true;
    });
    setRevealedCompIds(next);
  };

  const activeChameleon =
    CHAMELEON_WORDS.find((c) => c.id === selectedChameleonId) ?? CHAMELEON_WORDS[0];

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#EFE5DC]">
        <div>
          <div className="text-xs font-semibold text-[#BE123C] mb-2">
            사전학습 활동지 · 문장의 짜임을 배우기 전 필수 워밍업!
          </div>
          <h1 className="text-2xl sm:text-4xl font-display text-[#2D2424] mb-2">
            품사 vs 문장 성분 완벽 구별하기
          </h1>
          <p className="text-sm sm:text-base text-[#5E4E46]">
            단어의 타고난 신분인 ‘품사(~사)’와 문장 속 역할인 ‘문장 성분(~어)’을 빈칸 활동과 변신 실험으로 익혀 보세요.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigateTab('stages')}
          className="px-5 py-2.5 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
        >
          1단계 실전 퀴즈 풀러 가기
        </button>
      </div>

      {/* Section 1: Core Comparison Table */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-display text-[#2D2424]">
          01. 품사 vs 문장 성분 한눈에 비교하기
        </h2>
        <MascotBubble character="chii" mood="study" speakerLabel="치이의 비유 노트">
          사람도 태어난 <strong>‘이름’</strong>은 평생 변하지 않지만, 학교에 가면 <strong>‘학생’</strong>,
          동아리에 가면 <strong>‘부장’</strong>, 집에서는 <strong>‘자녀’</strong>로 역할이 바뀌지?
          단어의 이름·신분이 바로 <strong>품사(~사)</strong>이고, 문장 속 직책·역할이 바로{' '}
          <strong>문장 성분(~어)</strong>이야!
        </MascotBubble>

        <div className="bg-white rounded-2xl border border-[#ECE2D8] overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-[#FFF8F5] border-b border-[#ECE2D8] text-[#4A3B32]">
                <th className="py-3.5 px-5 font-semibold w-28">비교 기준</th>
                <th className="py-3.5 px-5 font-semibold text-[#BE123C]">
                  품사 (단어의 태어난 신분)
                </th>
                <th className="py-3.5 px-5 font-semibold text-[#0369A1]">
                  문장 성분 (문장 속 직책·역할)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3EAE2]">
              <tr>
                <td className="py-3.5 px-5 font-semibold text-[#6E5D53]">핵심 질문</td>
                <td className="py-3.5 px-5">“이 단어의 태생·성질은 무엇인가?”</td>
                <td className="py-3.5 px-5">“이 단어가 문장 안에서 무슨 역할을 하는가?”</td>
              </tr>
              <tr>
                <td className="py-3.5 px-5 font-semibold text-[#6E5D53]">이름의 특징</td>
                <td className="py-3.5 px-5">
                  끝 글자가 모두 <strong>‘~사’</strong>로 끝남 (명사, 동사, 형용사, 관형사, 부사 등 9품사)
                </td>
                <td className="py-3.5 px-5">
                  끝 글자가 모두 <strong>‘~어’</strong>로 끝남 (주어, 서술어, 목적어, 보어, 관형어, 부사어, 독립어)
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-5 font-semibold text-[#6E5D53]">변화 여부</td>
                <td className="py-3.5 px-5">문장이 바뀌어도 단어 자체의 품사는 절대 변하지 않음</td>
                <td className="py-3.5 px-5">문장 구조나 결합하는 조사·어미에 따라 역할이 바뀔 수 있음</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 2: Interactive Blank Worksheet - 9 Parts of Speech & 7 Sentence Components */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: 9 POS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-display text-[#2D2424]">02. 5언 9품사 빈칸 채우기</h2>
              <p className="text-xs text-[#7D6B5D]">빈칸 버튼을 눌러 정답을 확인해 보세요!</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={revealAllPos}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FFF0F5] hover:bg-[#FFE4EC] text-[#BE123C] text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                <Eye className="w-3.5 h-3.5" />
                전체 정답 보기
              </button>
              <button
                type="button"
                onClick={() => setRevealedPosIds({})}
                className="p-1.5 rounded-lg bg-[#F5EDE6] hover:bg-[#EAE0D7] text-[#5E4E46] transition-colors"
                aria-label="빈칸 초기화"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#ECE2D8] divide-y divide-[#F3EAE2]">
            {POS_WORKSHEET_ROWS.map((row) => {
              const opened = Boolean(revealedPosIds[row.id]);
              return (
                <div key={row.id} className="p-4 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs text-[#8C7A6E]">
                    <span>
                      {row.group} · <strong className="text-[#2D2424] text-sm">{row.name}</strong>
                    </span>
                    <span>예: {row.examples}</span>
                  </div>
                  <div className="text-sm text-[#3B2F2F] flex flex-wrap items-center gap-1">
                    <span>{row.rolePrefix}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setRevealedPosIds((prev) => ({ ...prev, [row.id]: !prev[row.id] }))
                      }
                      className={`px-2.5 py-0.5 rounded-md text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                        opened
                          ? 'bg-[#FFE4EC] text-[#BE123C]'
                          : 'bg-[#F3EAE2] hover:bg-[#E8DBD0] text-[#7D6B5D]'
                      }`}
                    >
                      {opened ? row.blankAnswer : '클릭해서 확인'}
                    </button>
                    <span>{row.roleSuffix}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: 7 Sentence Components */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-display text-[#2D2424]">03. 7가지 문장 성분 빈칸 채우기</h2>
              <p className="text-xs text-[#7D6B5D]">설명에 맞는 ‘~어’ 직책을 맞혀 보세요!</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={revealAllComp}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#EFF8FF] hover:bg-[#E0F2FE] text-[#0369A1] text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                <Eye className="w-3.5 h-3.5" />
                전체 정답 보기
              </button>
              <button
                type="button"
                onClick={() => setRevealedCompIds({})}
                className="p-1.5 rounded-lg bg-[#F5EDE6] hover:bg-[#EAE0D7] text-[#5E4E46] transition-colors"
                aria-label="빈칸 초기화"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#ECE2D8] divide-y divide-[#F3EAE2]">
            {COMPONENT_WORKSHEET_ROWS.map((row) => {
              const opened = Boolean(revealedCompIds[row.id]);
              return (
                <div key={row.id} className="p-4 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setRevealedCompIds((prev) => ({ ...prev, [row.id]: !prev[row.id] }))
                        }
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                          opened
                            ? 'bg-[#E0F2FE] text-[#0369A1]'
                            : 'bg-[#F3EAE2] hover:bg-[#E8DBD0] text-[#6E5D53]'
                        }`}
                      >
                        {opened ? row.blankName : '? 무슨 ~어'}
                      </button>
                      <span className="text-xs text-[#8C7A6E]">{row.group}</span>
                    </div>
                    <span className="text-xs text-[#8C7A6E] truncate">{row.examples}</span>
                  </div>
                  <p className="text-sm text-[#3B2F2F]">{row.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3: Chameleon Word Lab */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-display text-[#2D2424]">
              04. 카멜레온 단어 변신 실험실
            </h2>
            <p className="text-sm text-[#6E5D53]">
              같은 단어가 문장 속에서 어떻게 다른 문장 성분으로 변신하는지 클릭해 보세요!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1 p-1 bg-[#F5EDE6] rounded-xl">
            {CHAMELEON_WORDS.map((cw) => (
              <button
                key={cw.id}
                type="button"
                onClick={() => setSelectedChameleonId(cw.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  selectedChameleonId === cw.id
                    ? 'bg-white text-[#2D2424] shadow-xs'
                    : 'text-[#6E5D53] hover:text-[#2D2424]'
                }`}
              >
                {cw.baseWord}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-[#ECE2D8] p-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#BE123C] mb-5">
            <Sparkles className="w-4 h-4" />
            <span>고정 정보 · {activeChameleon.fixedPos}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeChameleon.variations.map((v, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#FFF9FB] space-y-2">
                <div className="flex items-center justify-between text-xs text-[#8C7A6E]">
                  <span className="font-mono tabular-nums">예문 0{idx + 1}</span>
                  <span className="font-bold text-[#BE123C]">역할: {v.component}</span>
                </div>
                <div className="text-lg font-bold text-[#2D2424]">
                  {v.sentence.split(v.highlightedToken).map((part, pIdx, arr) => (
                    <React.Fragment key={pIdx}>
                      {part}
                      {pIdx < arr.length - 1 && (
                        <span className="underline decoration-[#F43F5E] decoration-2 underline-offset-4 text-[#E11D48]">
                          {v.highlightedToken}
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#5E4E46] leading-relaxed">{v.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Prelearning Check Quizzes from Worksheet Page 2 */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-display text-[#2D2424]">
          05. 사전학습 활동지 확인 문제 직접 풀어보기
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PRELEARNING_CHECK_QUIZZES.map((quiz, qIdx) => {
            const picked = quizAnswers[quiz.id];
            const answered = picked !== undefined;
            const isCorrect = picked === quiz.correctIndex;

            return (
              <div key={quiz.id} className="bg-white rounded-2xl border border-[#ECE2D8] p-6 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-[#8C7A6E] mb-1.5 font-mono tabular-nums">
                    확인 문제 0{qIdx + 1}
                  </div>
                  <h3 className="text-base font-bold text-[#2D2424] mb-3 leading-snug">
                    {quiz.question}
                  </h3>
                  {quiz.sentence && (
                    <div className="mb-4 px-4 py-2.5 rounded-xl bg-[#FAF6F2] text-sm font-semibold text-[#3B2F2F]">
                      문장: “{quiz.sentence}”
                    </div>
                  )}

                  <div className="space-y-2 mb-4">
                    {quiz.options.map((opt, oIdx) => {
                      let cls =
                        'bg-[#FDFBF9] border-[#E8DDD3] hover:border-[#F43F5E] text-[#2D2424]';
                      if (answered) {
                        if (oIdx === quiz.correctIndex) {
                          cls = 'bg-[#ECFDF5] border-[#10B981] text-[#065F46] font-semibold';
                        } else if (oIdx === picked) {
                          cls = 'bg-[#FFF1F2] border-[#F43F5E] text-[#9F1239]';
                        }
                      }
                      return (
                        <button
                          key={oIdx}
                          type="button"
                          onClick={() =>
                            setQuizAnswers((prev) => ({ ...prev, [quiz.id]: oIdx }))
                          }
                          className={`w-full text-left px-4 py-2.5 rounded-xl border text-xs sm:text-sm transition-colors flex items-center justify-between gap-2 ${cls}`}
                        >
                          <span>{opt}</span>
                          {answered && oIdx === quiz.correctIndex && (
                            <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                          )}
                          {answered && oIdx === picked && oIdx !== quiz.correctIndex && (
                            <XCircle className="w-4 h-4 text-[#E11D48] shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {answered && (
                  <div
                    className={`p-3.5 rounded-xl text-xs leading-relaxed ${
                      isCorrect
                        ? 'bg-[#ECFDF5] text-[#065F46]'
                        : 'bg-[#FFF1F2] text-[#9F1239]'
                    }`}
                  >
                    <strong>{isCorrect ? '정답이에요!' : '다시 확인해 봐요!'}</strong>{' '}
                    {quiz.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
