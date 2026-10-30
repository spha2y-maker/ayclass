import React, { useState } from 'react';
import { ArrowLeftRight, BookOpen, CheckCircle2, Download, FileText, Sparkles } from 'lucide-react';
import {
  CLAUSE_SWAP_EXPERIMENTS,
  EMBEDDED_CLAUSE_CARDS,
  PDF_MATERIALS,
  SPELLING_TOKTOK_ITEMS,
} from '../data/textbookData';
import { AppTab } from '../types/grammar';
import { MascotAvatar, MascotBubble } from './Mascots';

interface TextbookViewProps {
  onNavigateTab: (tab: AppTab) => void;
}

type TextbookSubSection = 'concepts' | 'swap-lab' | 'embedded-lab' | 'pdf-library';

export const TextbookView: React.FC<TextbookViewProps> = ({ onNavigateTab }) => {
  const [activeSub, setActiveSub] = useState<TextbookSubSection>('concepts');
  const [swappedMap, setSwappedMap] = useState<Record<string, boolean>>({});
  const [selectedClauseId, setSelectedClauseId] = useState<string>(EMBEDDED_CLAUSE_CARDS[0].id);
  const [mergedMap, setMergedMap] = useState<Record<string, boolean>>({});
  const [spellingPicks, setSpellingPicks] = useState<Record<string, string>>({});
  const [selectedPdfId, setSelectedPdfId] = useState<string>(PDF_MATERIALS[0].id);

  const activeClause =
    EMBEDDED_CLAUSE_CARDS.find((c) => c.id === selectedClauseId) ?? EMBEDDED_CLAUSE_CARDS[0];
  const activePdf =
    PDF_MATERIALS.find((p) => p.id === selectedPdfId) ?? PDF_MATERIALS[0];

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#EFE5DC]">
        <div>
          <div className="text-xs font-semibold text-[#BE123C] mb-2">
            중학 국어 3-2 · 3단원 (1) 문장의 짜임 교과서 배움터
          </div>
          <h1 className="text-2xl sm:text-4xl font-display text-[#2D2424] mb-2">
            문장의 짜임 개념 탐구 & 원문 자료실
          </h1>
          <p className="text-sm sm:text-base text-[#5E4E46]">
            교과서 핵심 계통도, 이어진문장 순서 바꾸기 실험, 안은문장 5종 합체 실험과 원문 PDF 자료를 한곳에 모았어요.
          </p>
        </div>

        {/* Sub-navigation segmented buttons */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-[#F5EDE6] rounded-xl shrink-0">
          <button
            type="button"
            onClick={() => setActiveSub('concepts')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              activeSub === 'concepts'
                ? 'bg-white text-[#2D2424] shadow-xs'
                : 'text-[#6E5D53] hover:text-[#2D2424]'
            }`}
          >
            전체 체계도
          </button>
          <button
            type="button"
            onClick={() => setActiveSub('swap-lab')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              activeSub === 'swap-lab'
                ? 'bg-white text-[#2D2424] shadow-xs'
                : 'text-[#6E5D53] hover:text-[#2D2424]'
            }`}
          >
            이어진문장 실험
          </button>
          <button
            type="button"
            onClick={() => setActiveSub('embedded-lab')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              activeSub === 'embedded-lab'
                ? 'bg-white text-[#2D2424] shadow-xs'
                : 'text-[#6E5D53] hover:text-[#2D2424]'
            }`}
          >
            안은문장 5종
          </button>
          <button
            type="button"
            onClick={() => setActiveSub('pdf-library')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              activeSub === 'pdf-library'
                ? 'bg-white text-[#2D2424] shadow-xs'
                : 'text-[#6E5D53] hover:text-[#2D2424]'
            }`}
          >
            원문 PDF 자료실
          </button>
        </div>
      </div>

      {/* SUB 1: OVERALL TAXONOMY & SPELLING TOKTOK */}
      {activeSub === 'concepts' && (
        <div className="space-y-10">
          <MascotBubble character="hachi" mood="happy" speakerLabel="하치의 교과서 핵심 요약">
            문장의 짜임은 제일 먼저 <strong>“주어와 서술어의 짝이 몇 번 나타나는가?”</strong>를 세어 보면 돼!
            딱 1번이면 <strong>홑문장</strong>, 2번 이상이면 <strong>겹문장</strong>이야. 그리고 겹문장은 나란히 이어진{' '}
            <strong>이어진문장</strong>과 절을 품에 안은 <strong>안은문장</strong>으로 나뉘어!
          </MascotBubble>

          {/* Visual Hierarchy Tree */}
          <div className="bg-white rounded-3xl border border-[#ECE2D8] p-6 sm:p-8 space-y-8">
            <h2 className="text-xl font-display text-[#2D2424]">
              01. 문장의 짜임 한눈에 보는 분류표 (교과서 130쪽)
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Simple Sentence */}
              <div className="lg:col-span-4 rounded-2xl bg-[#FFF8F5] p-6 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-semibold text-[#BE123C] mb-1">
                    주어 + 서술어 1회
                  </div>
                  <h3 className="text-xl font-display text-[#2D2424] mb-3">홑문장</h3>
                  <p className="text-sm text-[#5E4E46] leading-relaxed mb-4">
                    주어와 서술어의 관계가 한 번만 나타나는 문장이에요. 호흡이 빠르고 간결하며 각 사건이 독립된 느낌을 줍니다.
                  </p>
                </div>
                <div className="space-y-2 text-xs sm:text-sm text-[#3B2F2F] pt-4 border-t border-[#F2E2DA]">
                  <div>• 제비꽃은 정말 예쁘다.</div>
                  <div>• 나는 어제 극장에서 친구를 만났다.</div>
                  <div>• 물이 얼음이 되었다. (보어 포함 홑문장!)</div>
                </div>
              </div>

              {/* Complex/Compound Sentences */}
              <div className="lg:col-span-8 rounded-2xl bg-[#F8FAFC] p-6 space-y-6">
                <div>
                  <div className="text-xs font-semibold text-[#0369A1] mb-1">
                    주어 + 서술어 2회 이상
                  </div>
                  <h3 className="text-xl font-display text-[#2D2424] mb-1">겹문장</h3>
                  <p className="text-sm text-[#5E4E46]">
                    사건들이 서로 관련되어 있는 느낌을 주며, 결합 방식에 따라 두 갈래로 나뉩니다.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-[#E2E8F0]">
                  <div className="space-y-2.5">
                    <div className="font-bold text-[#2D2424] text-base">
                      ① 이어진문장 (나란히 결합)
                    </div>
                    <p className="text-xs text-[#5E4E46] leading-relaxed">
                      둘 이상의 홑문장이 연결 어미로 이어진 문장
                    </p>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-[#3B2F2F]">
                      <li>
                        <strong>대등하게:</strong> 나열(-고), 대조(-지만), 선택(-거나)
                      </li>
                      <li>
                        <strong>종속적으로:</strong> 원인(-아서), 조건(-으면), 의도(-려고)
                      </li>
                    </ul>
                    <button
                      type="button"
                      onClick={() => setActiveSub('swap-lab')}
                      className="mt-2 text-xs font-semibold text-[#0369A1] hover:underline"
                    >
                      순서 바꾸기 실험하러 가기 →
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    <div className="font-bold text-[#2D2424] text-base">
                      ② 안은문장 (속에 품어 결합)
                    </div>
                    <p className="text-xs text-[#5E4E46] leading-relaxed">
                      한 문장이 다른 문장을 절(안긴문장) 형태로 안고 있는 문장
                    </p>
                    <ul className="space-y-1 text-xs sm:text-sm text-[#3B2F2F]">
                      <li>• <strong>명사절:</strong> -(으)ㅁ, -기 (주어·목적어 등)</li>
                      <li>• <strong>관형절:</strong> -(으)ㄴ, -는, -(으)ㄹ, -던 (관형어)</li>
                      <li>• <strong>부사절:</strong> -게, -도록, -이 (부사어)</li>
                      <li>• <strong>서술절:</strong> 절 전체가 서술어 (토끼는 앞발이 짧다)</li>
                      <li>• <strong>인용절:</strong> “…”라고(직접) / ~고(간접)</li>
                    </ul>
                    <button
                      type="button"
                      onClick={() => setActiveSub('embedded-lab')}
                      className="mt-2 text-xs font-semibold text-[#BE123C] hover:underline"
                    >
                      안은문장 합체 실험하러 가기 →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Spelling TokTok Interactive Section (Textbook p. 134) */}
          <div className="bg-white rounded-3xl border border-[#ECE2D8] p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-[#BE123C] mb-1">
                  교과서 134쪽 · 도전! 우리말 달인
                </div>
                <h2 className="text-xl font-display text-[#2D2424]">
                  02. 명사형 어미 ‘-ㅁ’과 ‘-음’ 바른 표기 고르기
                </h2>
              </div>
              <MascotAvatar character="usagi" mood="cheer" size="sm" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SPELLING_TOKTOK_ITEMS.map((item) => {
                const chosen = spellingPicks[item.id];
                const options = [item.correctForm, item.wrongForm].sort();
                return (
                  <div key={item.id} className="p-5 rounded-2xl bg-[#FFFDF8] border border-[#F2E6D8] space-y-3">
                    <div className="text-xs text-[#8C7A6E]">{item.baseVerb}</div>
                    <div className="text-sm sm:text-base font-bold text-[#2D2424] leading-relaxed">
                      {item.sentenceBefore}
                      <span className="text-[#E11D48] underline underline-offset-4 px-1">
                        {chosen ?? ' ? '}
                      </span>
                      {item.sentenceAfter}
                    </div>
                    <div className="flex items-center gap-2">
                      {options.map((opt) => {
                        const isPicked = chosen === opt;
                        const isRight = opt === item.correctForm;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() =>
                              setSpellingPicks((prev) => ({ ...prev, [item.id]: opt }))
                            }
                            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-colors whitespace-nowrap shrink-0 ${
                              isPicked
                                ? isRight
                                  ? 'bg-[#ECFDF5] border-[#10B981] text-[#065F46]'
                                  : 'bg-[#FFF1F2] border-[#F43F5E] text-[#9F1239]'
                                : 'bg-white border-[#E5D9CE] hover:border-[#F43F5E] text-[#2D2424]'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {chosen && (
                      <p className="text-xs text-[#5E4E46] leading-relaxed pt-1">
                        {chosen === item.correctForm ? '정답! ' : '아차! '}
                        {item.ruleNote}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SUB 2: LINKED SENTENCE CLAUSE-SWAP EXPERIMENT */}
      {activeSub === 'swap-lab' && (
        <div className="space-y-6">
          <MascotBubble character="usagi" mood="happy" speakerLabel="우사기의 앞뒤 절 뒤집기 실험실">
            대등하게 이어진문장과 종속적으로 이어진문장을 1초 만에 구별하는 비법!{' '}
            <strong>[앞뒤 절 순서 바꾸기]</strong> 버튼을 눌러 문장이 자연스러운지 직접 확인해 봐!
          </MascotBubble>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CLAUSE_SWAP_EXPERIMENTS.map((exp) => {
              const isSwapped = Boolean(swappedMap[exp.id]);
              return (
                <div
                  key={exp.id}
                  className="bg-white rounded-3xl border border-[#ECE2D8] p-6 flex flex-col justify-between gap-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#8C7A6E]">
                      <span>{exp.relationType}</span>
                      <span>{exp.meaningSubType}</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#FAF6F2] text-xs sm:text-sm text-[#5E4E46]">
                      <div>앞 절: {isSwapped ? exp.clause2 : exp.clause1}</div>
                      <div className="font-semibold text-[#BE123C] my-1">
                        연결 어미: {exp.connector}
                      </div>
                      <div>뒤 절: {isSwapped ? exp.clause1 : exp.clause2}</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#FFF8FA] text-base font-bold text-[#2D2424]">
                      {isSwapped ? exp.combinedSwapped : exp.combinedNormal}
                    </div>

                    {isSwapped && (
                      <p
                        className={`text-xs leading-relaxed p-3 rounded-xl ${
                          exp.swappedNatural
                            ? 'bg-[#ECFDF5] text-[#065F46]'
                            : 'bg-[#FFF1F2] text-[#9F1239]'
                        }`}
                      >
                        <strong>
                          {exp.swappedNatural
                            ? '순서를 바꿔도 자연스러워요! → 대등!'
                            : '순서를 바꾸니 의미가 어색해요! → 종속!'}
                        </strong>{' '}
                        {exp.explanation}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setSwappedMap((prev) => ({ ...prev, [exp.id]: !prev[exp.id] }))
                    }
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#2D2424] hover:bg-[#433636] text-white text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                    {isSwapped ? '원래 순서로 되돌리기' : '앞뒤 절 순서 바꾸기 테스트'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB 3: 5 EMBEDDED CLAUSES INTERACTIVE BUILDER */}
      {activeSub === 'embedded-lab' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            {EMBEDDED_CLAUSE_CARDS.map((card) => (
              <button
                key={card.id}
                type="button"
                onClick={() => setSelectedClauseId(card.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-colors whitespace-nowrap shrink-0 ${
                  selectedClauseId === card.id
                    ? 'bg-[#E11D48] border-[#E11D48] text-white'
                    : 'bg-white border-[#E5D9CE] text-[#3B2F2F] hover:border-[#F43F5E]'
                }`}
              >
                {card.name.replace('을 가진 안은문장', '')}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-3xl border border-[#ECE2D8] p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#F3EAE2]">
              <div>
                <div className="text-xs font-semibold text-[#BE123C] mb-1">
                  {activeClause.clueEnding}
                </div>
                <h2 className="text-2xl font-display text-[#2D2424]">{activeClause.name}</h2>
                <p className="text-sm text-[#5E4E46] mt-1">{activeClause.koreanRole}</p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setMergedMap((prev) => ({
                    ...prev,
                    [activeClause.id]: !prev[activeClause.id],
                  }))
                }
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                <Sparkles className="w-4 h-4" />
                {mergedMap[activeClause.id] ? '분리해서 다시 보기' : '안긴문장으로 쏙 합체하기!'}
              </button>
            </div>

            {!mergedMap[activeClause.id] ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#FFF7ED]">
                  <div className="text-xs font-semibold text-[#B45309] mb-2">
                    안길 문장 (재료 홑문장)
                  </div>
                  <div className="text-lg font-bold text-[#2D2424]">
                    {activeClause.innerSentence}
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-[#EFF8FF]">
                  <div className="text-xs font-semibold text-[#0369A1] mb-2">
                    안아 줄 바깥 문장 틀
                  </div>
                  <div className="text-lg font-bold text-[#2D2424]">
                    {activeClause.outerTemplate}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-[#FFF0F5] text-center space-y-2">
                <div className="text-xs font-semibold text-[#BE123C]">
                  합체 완료! 대괄호 부분이 안긴문장(절)이에요!
                </div>
                <div className="text-xl sm:text-2xl font-bold text-[#2D2424]">
                  {activeClause.completedSentence
                    .split(activeClause.bracketedHighlight)
                    .map((seg, i, arr) => (
                      <React.Fragment key={i}>
                        {seg}
                        {i < arr.length - 1 && (
                          <span className="px-2 py-0.5 mx-1 rounded-lg bg-white text-[#E11D48] underline decoration-2 underline-offset-4">
                            [{activeClause.bracketedHighlight}]
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                </div>
              </div>
            )}

            <MascotBubble character="chii" mood="study" speakerLabel="치이의 판별 포인트">
              {activeClause.keyTip}
            </MascotBubble>

            <div className="pt-2">
              <div className="text-xs font-semibold text-[#6E5D53] mb-3">
                교과서 & 시험 빈출 예문 더 보기
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {activeClause.extraExamples.map((ex, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-[#FAF6F2] text-xs sm:text-sm text-[#2D2424] font-medium flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                    <span>{ex}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB 4: ORIGINAL PDF MATERIALS VIEWER */}
      {activeSub === 'pdf-library' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PDF_MATERIALS.map((pdf) => {
              const selected = pdf.id === selectedPdfId;
              return (
                <button
                  key={pdf.id}
                  type="button"
                  onClick={() => setSelectedPdfId(pdf.id)}
                  className={`text-left p-5 rounded-2xl border transition-colors flex flex-col justify-between gap-3 ${
                    selected
                      ? 'bg-[#FFF5F8] border-[#E11D48]'
                      : 'bg-white border-[#ECE2D8] hover:border-[#D6C3B3]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#8C7A6E] mb-1.5">
                      <span>제공 학습 자료</span>
                      <span>{pdf.pagesLabel}</span>
                    </div>
                    <h3 className="text-base font-bold text-[#2D2424] mb-1">{pdf.title}</h3>
                    <p className="text-xs text-[#6E5D53] leading-relaxed">{pdf.subtitle}</p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#BE123C]">
                    <BookOpen className="w-3.5 h-3.5" />
                    {selected ? '현재 열람 중' : '원문 바로 보기'}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="bg-white rounded-3xl border border-[#ECE2D8] p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <FileText className="w-6 h-6 text-[#E11D48] shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-[#2D2424]">
                    {activePdf.title}
                  </h2>
                  <ul className="mt-1.5 space-y-1 text-xs text-[#5E4E46]">
                    {activePdf.highlights.map((h, idx) => (
                      <li key={idx}>• {h}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={activePdf.path}
                  download={`${activePdf.title}.pdf`}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#2D2424] hover:bg-[#433636] text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
                >
                  <Download className="w-4 h-4" />
                  PDF 다운로드
                </a>
                <button
                  type="button"
                  onClick={() => onNavigateTab('stages')}
                  className="px-4 py-2.5 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
                >
                  단계별 문제 풀기
                </button>
              </div>
            </div>

            <div className="w-full h-[640px] rounded-2xl overflow-hidden border border-[#E5D9CE] bg-[#FAF6F2]">
              <iframe
                key={activePdf.path}
                src={activePdf.path}
                title={activePdf.title}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
