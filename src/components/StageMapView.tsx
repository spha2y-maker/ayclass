import React, { useState } from 'react';
import {
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  Lock,
  RotateCcw,
  Star,
  Trophy,
  XCircle,
} from 'lucide-react';
import { STAGES_DATA } from '../data/stagesData';
import {
  AppTab,
  CompetencyCategory,
  QuizQuestion,
  StageDefinition,
  UserLearningState,
} from '../types/grammar';
import { CHARACTER_NAMES, MascotAvatar, MascotBubble } from './Mascots';

interface StageMapViewProps {
  learningState: UserLearningState;
  onCompleteStage: (
    stageId: number,
    score: number,
    total: number,
    wrongSelections: { question: QuizQuestion; selectedIndex: number }[]
  ) => void;
  onNavigateTab: (tab: AppTab) => void;
}

const COMPETENCIES: CompetencyCategory[] = [
  '품사·성분 구분',
  '주성분·부속성분',
  '홑문장·겹문장',
  '이어진문장',
  '안은문장',
];

export const StageMapView: React.FC<StageMapViewProps> = ({
  learningState,
  onCompleteStage,
  onNavigateTab,
}) => {
  const [activeStage, setActiveStage] = useState<StageDefinition | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [sessionScore, setSessionScore] = useState(0);
  const [sessionWrongs, setSessionWrongs] = useState<
    { question: QuizQuestion; selectedIndex: number }[]
  >([]);
  const [showConceptSheet, setShowConceptSheet] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const completedStagesCount = Object.values(learningState.stageProgress).filter(
    (s) => s.completed
  ).length;
  const totalStars = Object.values(learningState.stageProgress).reduce(
    (acc, s) => acc + s.stars,
    0
  );
  const unresolvedWrongs = learningState.wrongNotes.filter((w) => !w.resolved).length;

  // Determine highest unlocked stage (Stage 1 always unlocked; Stage N unlocked if N-1 completed, plus allow free jump toggle if desired -> let's unlock next stage sequentially OR let students preview any stage? Duolingo unlocks sequentially, AND let's provide a clean "전체 단계 자유 선택" button or unlock N+1 cleanly so teachers/students testing Stage 8 can also open any stage if needed! Actually, unlocking Stage 1..completed+1 AND allowing direct click on any stage with a clear "추천 순서 / 자유 도전" makes classroom usage 10x better!)
  const [unlockAllMode, setUnlockAllMode] = useState(false);

  const isStageUnlocked = (stageId: number) => {
    if (unlockAllMode || stageId === 1) return true;
    const prev = learningState.stageProgress[stageId - 1];
    return Boolean(prev?.completed) || Boolean(learningState.stageProgress[stageId]?.completed);
  };

  const startStage = (stage: StageDefinition) => {
    setActiveStage(stage);
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsChecked(false);
    setSessionScore(0);
    setSessionWrongs([]);
    setShowConceptSheet(false);
    setIsFinished(false);
  };

  const handleCheckAnswer = () => {
    if (!activeStage || selectedOption === null || isChecked) return;
    const currentQuestion = activeStage.questions[currentIdx];
    const correct = selectedOption === currentQuestion.correctIndex;
    setIsChecked(true);
    if (correct) {
      setSessionScore((prev) => prev + 1);
    } else {
      setSessionWrongs((prev) => [
        ...prev,
        { question: currentQuestion, selectedIndex: selectedOption },
      ]);
    }
  };

  const handleNextQuestion = () => {
    if (!activeStage) return;
    if (currentIdx + 1 < activeStage.questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsChecked(false);
    } else {
      onCompleteStage(
        activeStage.id,
        sessionScore,
        activeStage.questions.length,
        sessionWrongs
      );
      setIsFinished(true);
    }
  };

  const computeCompetencyPercent = (cat: CompetencyCategory): number => {
    const matchingStages = STAGES_DATA.filter((s) => s.category === cat);
    if (matchingStages.length === 0) return 0;
    let earned = 0;
    let possible = 0;
    matchingStages.forEach((st) => {
      possible += st.questions.length;
      const prog = learningState.stageProgress[st.id];
      if (prog) {
        earned += prog.bestScore;
      }
    });
    return possible === 0 ? 0 : Math.round((earned / possible) * 100);
  };

  // --- ACTIVE QUIZ SESSION VIEW ---
  if (activeStage) {
    const totalQ = activeStage.questions.length;
    const currentQ = activeStage.questions[currentIdx];
    const progressPercent = isFinished
      ? 100
      : Math.round(((currentIdx + (isChecked ? 1 : 0)) / totalQ) * 100);

    if (isFinished) {
      const earnedStars =
        sessionScore === totalQ ? 3 : sessionScore >= totalQ - 1 ? 2 : sessionScore >= 3 ? 1 : 0;
      const nextStage = STAGES_DATA.find((s) => s.id === activeStage.id + 1);

      return (
        <div className="max-w-2xl mx-auto py-8 px-4">
          <div className="bg-white rounded-3xl border border-[#EFE5DC] p-8 text-center">
            <div className="flex justify-center mb-4">
              <MascotAvatar
                character={activeStage.mascot}
                mood={sessionScore >= 4 ? 'cheer' : 'comfort'}
                size="xl"
                className="animate-float-slow"
              />
            </div>

            <div className="text-sm font-medium text-[#9A6B56] mb-2">
              {activeStage.id}단계 학습 결과 · {activeStage.category}
            </div>
            <h2 className="text-3xl font-display text-[#2D2424] mb-3">
              {sessionScore === totalQ
                ? '완벽해요! 만점으로 클리어!'
                : sessionScore >= 3
                  ? '참 잘했어요! 단계 통과 성공!'
                  : '조금 아쉬워요! 다시 한번 도전해 볼까요?'}
            </h2>
            <p className="text-sm text-[#6E5D53] mb-6">
              총 {totalQ}문항 중 <strong className="text-[#E11D48] tabular-nums">{sessionScore}문항</strong>을
              맞혔어요.
              {sessionWrongs.length > 0 &&
                ` 틀린 ${sessionWrongs.length}문항은 오답 노트에 자동 저장되었어요!`}
            </p>

            <div className="flex items-center justify-center gap-3 mb-8">
              {[1, 2, 3].map((starNum) => (
                <Star
                  key={starNum}
                  className={`w-10 h-10 transition-transform ${
                    starNum <= earnedStars
                      ? 'text-[#F59E0B] fill-[#FBBF24] scale-110'
                      : 'text-[#E5DDD5]'
                  }`}
                />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#F3EAE2] mb-8 text-sm">
              <div>
                <div className="text-[#8C7A6E] mb-1">정답률</div>
                <div className="text-xl font-bold font-mono tabular-nums text-[#2D2424]">
                  {Math.round((sessionScore / totalQ) * 100)}%
                </div>
              </div>
              <div>
                <div className="text-[#8C7A6E] mb-1">획득한 별사탕</div>
                <div className="text-xl font-bold font-mono tabular-nums text-[#E11D48]">
                  +{sessionScore * 10}개
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setActiveStage(null)}
                className="px-5 py-2.5 rounded-xl bg-[#F7F1EB] hover:bg-[#EFE5DC] text-[#3B2F2F] text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                단계 지도로 돌아가기
              </button>
              <button
                type="button"
                onClick={() => startStage(activeStage)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFF0F5] hover:bg-[#FFE4EC] text-[#BE123C] text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                <RotateCcw className="w-4 h-4" />
                다시 풀기
              </button>
              {sessionWrongs.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveStage(null);
                    onNavigateTab('wrongnote');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#92400E] text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
                >
                  오답 노트 확인하기
                </button>
              )}
              {nextStage && sessionScore >= 3 && (
                <button
                  type="button"
                  onClick={() => startStage(nextStage)}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
                >
                  {nextStage.id}단계 이어서 도전
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }

    const isAnswerCorrect = selectedOption === currentQ.correctIndex;

    return (
      <div className="max-w-3xl mx-auto py-6 px-4">
        {/* Quiz Header Bar */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            type="button"
            onClick={() => setActiveStage(null)}
            className="px-3.5 py-2 rounded-xl text-sm font-medium text-[#6E5D53] hover:bg-[#F5EDE6] transition-colors whitespace-nowrap shrink-0"
          >
            나가기
          </button>

          <div className="flex-1">
            <div className="flex items-center justify-between text-xs text-[#7D6B5D] mb-1.5">
              <span>
                {activeStage.id}단계 · {activeStage.title}
              </span>
              <span className="font-mono tabular-nums font-semibold">
                {currentIdx + 1} / {totalQ}
              </span>
            </div>
            <div className="h-3 w-full rounded-full bg-[#F2E8DF] overflow-hidden">
              <div
                className="h-full rounded-full bg-[#F43F5E] transition-transform duration-200 origin-left"
                style={{ transform: `scaleX(${Math.max(0.06, progressPercent / 100)})` }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowConceptSheet((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FFF7ED] hover:bg-[#FFEDD5] text-[#9A3412] text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
          >
            <HelpCircle className="w-4 h-4" />
            핵심 힌트
          </button>
        </div>

        {/* Optional Concept Cheat Sheet */}
        {showConceptSheet && (
          <div className="mb-6 p-5 rounded-2xl bg-[#FFFDF7] border border-[#F3E3C3]">
            <div className="text-xs font-semibold text-[#B45309] mb-2">
              {CHARACTER_NAMES[activeStage.mascot]}의 단계 핵심 요약 노트
            </div>
            <ul className="space-y-1.5 text-sm text-[#4A3B32]">
              {activeStage.summaryPoints.map((pt, idx) => (
                <li key={idx}>• {pt}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Question Surface */}
        <div className="bg-white rounded-3xl border border-[#EFE5DC] p-6 sm:p-8">
          <div className="flex items-start gap-4 mb-6">
            <MascotAvatar
              character={currentQ.mascot}
              mood={
                !isChecked
                  ? 'study'
                  : isAnswerCorrect
                    ? 'cheer'
                    : 'comfort'
              }
              size="md"
            />
            <div className="min-w-0 flex-1">
              <div className="text-xs text-[#8C7A6E] mb-1.5">
                문제 {currentIdx + 1} · {currentQ.category} ·{' '}
                {currentQ.type === 'ox' ? 'O/X 퀴즈' : '객관식 퀴즈'}
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-[#2D2424] leading-snug">
                {currentQ.prompt}
              </h2>
            </div>
          </div>

          {currentQ.sentenceHighlight && (
            <div className="mb-5 p-4 rounded-2xl bg-[#FFF8FA] text-[#2D2424] text-base sm:text-lg font-semibold text-center">
              {currentQ.sentenceHighlight}
            </div>
          )}

          {currentQ.subText && (
            <div className="mb-6 p-4 rounded-2xl bg-[#FAF6F2] text-sm text-[#3B2F2F] whitespace-pre-line leading-relaxed">
              {currentQ.subText}
            </div>
          )}

          {/* Options */}
          <div
            className={`grid gap-3 mb-6 ${
              currentQ.type === 'ox' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'
            }`}
          >
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectOpt = idx === currentQ.correctIndex;

              let buttonStyle =
                'bg-[#FDFBF9] border-[#E8DDD3] text-[#2D2424] hover:bg-[#FFF5F7] hover:border-[#F9A8D4]';

              if (isChecked) {
                if (isCorrectOpt) {
                  buttonStyle =
                    'bg-[#ECFDF5] border-[#10B981] text-[#065F46] font-semibold';
                } else if (isSelected && !isCorrectOpt) {
                  buttonStyle =
                    'bg-[#FFF1F2] border-[#F43F5E] text-[#9F1239]';
                } else {
                  buttonStyle = 'bg-[#FAF8F6] border-[#EEE6DF] text-[#9C8D82]';
                }
              } else if (isSelected) {
                buttonStyle =
                  'bg-[#FFF0F5] border-[#E11D48] text-[#9F1239] font-semibold';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isChecked}
                  onClick={() => setSelectedOption(idx)}
                  className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-colors flex items-center justify-between gap-3 ${buttonStyle}`}
                >
                  <span className="text-sm sm:text-[15px] leading-snug">
                    <span className="font-mono tabular-nums mr-2.5 text-xs opacity-75">
                      0{idx + 1}
                    </span>
                    {opt}
                  </span>
                  {isChecked && isCorrectOpt && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#059669] whitespace-nowrap shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                      정답
                    </span>
                  )}
                  {isChecked && isSelected && !isCorrectOpt && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#E11D48] whitespace-nowrap shrink-0">
                      <XCircle className="w-4 h-4" />
                      선택한 답
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback Panel after Check */}
          {isChecked && (
            <div
              className={`mb-6 p-5 rounded-2xl ${
                isAnswerCorrect ? 'bg-[#ECFDF5]' : 'bg-[#FFF1F2]'
              }`}
            >
              <div className="flex items-start gap-3">
                {isAnswerCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-[#E11D48] shrink-0 mt-0.5" />
                )}
                <div className="space-y-1.5 text-sm">
                  <div
                    className={`font-bold ${
                      isAnswerCorrect ? 'text-[#065F46]' : 'text-[#9F1239]'
                    }`}
                  >
                    {isAnswerCorrect
                      ? `${CHARACTER_NAMES[currentQ.mascot]}: “우와아~! 정답이야! 정말 대단해!”`
                      : `${CHARACTER_NAMES[currentQ.mascot]}: “괜찮아, 헷갈릴 수 있어! 오답 노트에 적어 둘게!”`}
                  </div>
                  <p className="text-[#2D2424] leading-relaxed">{currentQ.explanation}</p>
                  <p className="text-xs font-medium text-[#7A5C4D] pt-1">
                    꿀팁 메모 · {currentQ.mascotTip}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Bar */}
          <div className="flex items-center justify-end">
            {!isChecked ? (
              <button
                type="button"
                disabled={selectedOption === null}
                onClick={handleCheckAnswer}
                className={`px-7 py-3 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  selectedOption !== null
                    ? 'bg-[#E11D48] hover:bg-[#BE123C] text-white'
                    : 'bg-[#EDE5DE] text-[#A8998E] cursor-not-allowed'
                }`}
              >
                정답 확인하기
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextQuestion}
                className="inline-flex items-center gap-1.5 px-7 py-3 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                {currentIdx + 1 < totalQ ? '다음 문제로' : '결과 확인하기'}
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // --- MAIN 10-STAGE DUOLINGO ROADMAP + PROGRESS DASHBOARD ---
  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
      {/* Hero Welcome Banner */}
      <div className="bg-[#FFF5F8] rounded-3xl border border-[#F8DCE6] p-6 sm:p-8 mb-10 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold text-[#BE123C] mb-2">
            중학교 3학년 국어 · 3단원 (1) 문장의 짜임
          </div>
          <h1 className="text-2xl sm:text-4xl font-display text-[#2D2424] mb-3 leading-tight">
            치이·하치·우사기와 함께 차근차근 정복하는 10단계 문장의 짜임!
          </h1>
          <p className="text-sm sm:text-base text-[#5E4E46] leading-relaxed mb-5">
            사전학습 ‘품사 vs 문장 성분’부터 홑문장·겹문장, 이어진문장, 5가지 안은문장까지!
            단계별 퀴즈로 실전 감각을 키우고 나만의 문장 구조 분석기로 완벽하게 복습해 보세요.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigateTab('prelearning')}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#FFFDF9] text-[#2D2424] border border-[#EAD9CE] text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
            >
              사전학습(품사 vs 성분) 먼저 보기
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('analyzer')}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#FFFDF9] text-[#2D2424] border border-[#EAD9CE] text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
            >
              맞춤형 문장 구조 분석기 열기
            </button>
          </div>
        </div>

        <div className="flex items-end gap-2 shrink-0">
          <MascotAvatar character="chii" mood="happy" size="lg" className="animate-float-slow" />
          <MascotAvatar character="hachi" mood="cheer" size="xl" />
          <MascotAvatar character="usagi" mood="happy" size="lg" className="animate-wiggle-gentle" />
        </div>
      </div>

      {/* 2-Column Split: Left Winding Stage Path / Right Progress & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: 10-Stage Learning Path */}
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-display text-[#2D2424]">
                10단계 실전 학습 로드맵
              </h2>
              <p className="text-xs sm:text-sm text-[#7D6B5D]">
                각 단계에서 5문제 중 3문제 이상 맞히면 다음 단계가 열려요!
              </p>
            </div>

            <div className="flex items-center gap-1 p-1 bg-[#F5EDE6] rounded-xl shrink-0">
              <button
                type="button"
                onClick={() => setUnlockAllMode(false)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  !unlockAllMode
                    ? 'bg-white text-[#2D2424] shadow-xs'
                    : 'text-[#7D6B5D] hover:text-[#2D2424]'
                }`}
              >
                순차 학습
              </button>
              <button
                type="button"
                onClick={() => setUnlockAllMode(true)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  unlockAllMode
                    ? 'bg-white text-[#2D2424] shadow-xs'
                    : 'text-[#7D6B5D] hover:text-[#2D2424]'
                }`}
              >
                전 단계 열기
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {STAGES_DATA.map((stage, idx) => {
              const prog = learningState.stageProgress[stage.id];
              const unlocked = isStageUnlocked(stage.id);
              const isCurrentTarget =
                unlocked && !prog?.completed && (idx === 0 || learningState.stageProgress[stage.id - 1]?.completed);

              // Subtle winding Duolingo-like horizontal offset on larger viewports
              const offsetClass =
                idx % 4 === 1
                  ? 'sm:ml-6'
                  : idx % 4 === 2
                    ? 'sm:ml-10'
                    : idx % 4 === 3
                      ? 'sm:ml-6'
                      : 'sm:ml-0';

              return (
                <div
                  key={stage.id}
                  className={`relative rounded-2xl border p-5 transition-transform duration-150 ${offsetClass} ${
                    isCurrentTarget
                      ? 'bg-white border-[#E11D48] shadow-sm'
                      : unlocked
                        ? 'bg-white border-[#ECE2D8] hover:border-[#D9C7B8]'
                        : 'bg-[#FAF6F2] border-[#EFE7DF] opacity-80'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                          unlocked ? stage.accentBg : 'bg-[#EFE8E1]'
                        }`}
                      >
                        {unlocked ? (
                          <MascotAvatar
                            character={stage.mascot}
                            mood={prog?.completed ? 'cheer' : 'happy'}
                            size="sm"
                          />
                        ) : (
                          <Lock className="w-5 h-5 text-[#9C8D82]" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 text-xs text-[#8C7A6E] mb-1">
                          <span className="font-mono tabular-nums font-semibold text-[#BE123C]">
                            STAGE {String(stage.id).padStart(2, '0')}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{stage.category}</span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">{stage.questions.length}문항</span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-[#2D2424] truncate">
                          {stage.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#6E5D53] mt-0.5">
                          {stage.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F4ECE4]">
                      {/* Stars */}
                      <div className="flex items-center gap-1" aria-label={`별점 ${prog?.stars ?? 0}점`}>
                        {[1, 2, 3].map((st) => (
                          <Star
                            key={st}
                            className={`w-4 h-4 ${
                              st <= (prog?.stars ?? 0)
                                ? 'text-[#F59E0B] fill-[#FBBF24]'
                                : 'text-[#E2D9D0]'
                            }`}
                          />
                        ))}
                      </div>

                      {unlocked ? (
                        <button
                          type="button"
                          onClick={() => startStage(stage)}
                          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                            isCurrentTarget
                              ? 'bg-[#E11D48] hover:bg-[#BE123C] text-white'
                              : prog?.completed
                                ? 'bg-[#FFF0F5] hover:bg-[#FFE4EC] text-[#BE123C]'
                                : 'bg-[#2D2424] hover:bg-[#433636] text-white'
                          }`}
                        >
                          {prog?.completed ? '복습하기' : '도전하기'}
                        </button>
                      ) : (
                        <span className="text-xs font-medium text-[#9C8D82] whitespace-nowrap shrink-0">
                          이전 단계 완료 필요
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Visualized Learning Progress & Competency Breakdown */}
        <aside className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <div className="bg-white rounded-3xl border border-[#ECE2D8] p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-display text-[#2D2424]">나의 학습 현황판</h3>
                <p className="text-xs text-[#8C7A6E]">단계별 성취도와 영역별 실력 그래프</p>
              </div>
              <Trophy className="w-6 h-6 text-[#F59E0B]" />
            </div>

            {/* Overall Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs font-medium text-[#5E4E46] mb-2">
                <span>전체 10단계 정복률</span>
                <span className="font-mono tabular-nums font-bold text-[#E11D48]">
                  {completedStagesCount} / 10 완료 ({completedStagesCount * 10}%)
                </span>
              </div>
              <div className="h-3 w-full rounded-full bg-[#F4ECE4] overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#E11D48] transition-transform duration-200 origin-left"
                  style={{
                    transform: `scaleX(${Math.max(0.03, completedStagesCount / 10)})`,
                  }}
                />
              </div>
            </div>

            {/* Key Quantitative Stats */}
            <div className="grid grid-cols-3 gap-3 py-4 border-y border-[#F3EAE2] mb-6 text-center">
              <div>
                <div className="text-xs text-[#8C7A6E] mb-1">획득 별점</div>
                <div className="text-lg font-bold font-mono tabular-nums text-[#2D2424]">
                  {totalStars} / 30
                </div>
              </div>
              <div>
                <div className="text-xs text-[#8C7A6E] mb-1">별사탕</div>
                <div className="text-lg font-bold font-mono tabular-nums text-[#E11D48]">
                  {learningState.starCandies}개
                </div>
              </div>
              <div>
                <div className="text-xs text-[#8C7A6E] mb-1">복습할 오답</div>
                <div className="text-lg font-bold font-mono tabular-nums text-[#D97706]">
                  {unresolvedWrongs}문항
                </div>
              </div>
            </div>

            {/* 5 Core Competencies Mastery */}
            <div>
              <div className="text-xs font-semibold text-[#5E4E46] mb-3">
                영역별 문법 마스터 지수
              </div>
              <div className="space-y-3">
                {COMPETENCIES.map((comp) => {
                  const pct = computeCompetencyPercent(comp);
                  return (
                    <div key={comp}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-[#3B2F2F] font-medium">{comp}</span>
                        <span className="font-mono tabular-nums text-[#7D6B5D]">{pct}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-[#F5EFEA] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#FB7185] transition-transform duration-200 origin-left"
                          style={{ transform: `scaleX(${Math.max(0.02, pct / 100)})` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {unresolvedWrongs > 0 && (
              <div className="mt-6 pt-5 border-t border-[#F3EAE2] flex items-center justify-between gap-3">
                <div className="text-xs text-[#6E5D53]">
                  아직 해결하지 않은 오답이 <strong className="tabular-nums">{unresolvedWrongs}개</strong> 있어요!
                </div>
                <button
                  type="button"
                  onClick={() => onNavigateTab('wrongnote')}
                  className="px-3.5 py-2 rounded-xl bg-[#FFF0F5] hover:bg-[#FFE4EC] text-[#BE123C] text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
                >
                  오답 노트 복습
                </button>
              </div>
            )}
          </div>

          <MascotBubble character="hachi" mood="happy" speakerLabel="하치의 학습 가이드">
            품사와 문장 성분이 아직 헷갈린다면 <strong>사전학습</strong> 탭에서 워밍업을 먼저 해 봐!
            교과서 예문을 직접 쪼개 보고 싶을 땐 <strong>문장 분석기</strong>가 언제든 도와줄게!
          </MascotBubble>
        </aside>
      </div>
    </div>
  );
};
