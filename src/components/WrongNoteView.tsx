import React, { useState } from 'react';
import {
  BookMarked,
  CheckCircle2,
  ClipboardCheck,
  RotateCcw,
  Trash2,
  XCircle,
} from 'lucide-react';
import { EXAM_CHALLENGE_QUESTIONS } from '../data/stagesData';
import {
  AppTab,
  CompetencyCategory,
  QuizQuestion,
  WrongAnswerEntry,
} from '../types/grammar';
import { CHARACTER_NAMES, MascotAvatar, MascotBubble } from './Mascots';

interface WrongNoteViewProps {
  wrongNotes: WrongAnswerEntry[];
  onResolveWrongNote: (questionId: string) => void;
  onRemoveWrongNote: (questionId: string) => void;
  onRecordExamWrong: (question: QuizQuestion, selectedIndex: number) => void;
  onNavigateTab: (tab: AppTab) => void;
}

const FILTER_CATEGORIES: ('전체' | CompetencyCategory)[] = [
  '전체',
  '품사·성분 구분',
  '주성분·부속성분',
  '홑문장·겹문장',
  '이어진문장',
  '안은문장',
];

export const WrongNoteView: React.FC<WrongNoteViewProps> = ({
  wrongNotes,
  onResolveWrongNote,
  onRemoveWrongNote,
  onRecordExamWrong,
  onNavigateTab,
}) => {
  const [subMode, setSubMode] = useState<'wrongnote' | 'exam'>('wrongnote');
  const [selectedCategory, setSelectedCategory] = useState<'전체' | CompetencyCategory>('전체');
  const [showResolved, setShowResolved] = useState(false);

  // Interactive retry state per wrong note
  const [retryPickMap, setRetryPickMap] = useState<Record<string, number>>({});

  // Mock Exam state
  const [examSelections, setExamSelections] = useState<Record<string, number>>({});
  const [examSubmitted, setExamSubmitted] = useState(false);

  const filteredNotes = wrongNotes.filter((note) => {
    if (!showResolved && note.resolved) return false;
    if (selectedCategory !== '전체' && note.category !== selectedCategory) return false;
    return true;
  });

  const handleRetryOption = (note: WrongAnswerEntry, optIdx: number) => {
    setRetryPickMap((prev) => ({ ...prev, [note.questionId]: optIdx }));
    if (optIdx === note.correctIndex && !note.resolved) {
      onResolveWrongNote(note.questionId);
    }
  };

  const handleExamSubmit = () => {
    setExamSubmitted(true);
    EXAM_CHALLENGE_QUESTIONS.forEach((q) => {
      const picked = examSelections[q.id];
      if (picked !== undefined && picked !== q.correctIndex) {
        onRecordExamWrong(q, picked);
      }
    });
  };

  const examAnsweredCount = Object.keys(examSelections).length;
  const examScore = EXAM_CHALLENGE_QUESTIONS.filter(
    (q) => examSelections[q.id] === q.correctIndex
  ).length;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#EFE5DC]">
        <div>
          <div className="text-xs font-semibold text-[#BE123C] mb-2">
            약점 보완 & 내신 대비 실전 연습
          </div>
          <h1 className="text-2xl sm:text-4xl font-display text-[#2D2424] mb-2">
            맞춤 오답 노트 & 실전 평가문제
          </h1>
          <p className="text-sm sm:text-base text-[#5E4E46]">
            단계별 학습과 평가문제에서 틀린 문항만 모아 다시 풀어 보고, 실제 내신 기출 유형 모의고사로 실력을 점검하세요!
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-[#F5EDE6] rounded-xl shrink-0">
          <button
            type="button"
            onClick={() => setSubMode('wrongnote')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
              subMode === 'wrongnote'
                ? 'bg-white text-[#2D2424] shadow-xs'
                : 'text-[#6E5D53] hover:text-[#2D2424]'
            }`}
          >
            <BookMarked className="w-4 h-4" />
            나의 오답 노트 ({wrongNotes.filter((w) => !w.resolved).length})
          </button>
          <button
            type="button"
            onClick={() => setSubMode('exam')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
              subMode === 'exam'
                ? 'bg-white text-[#2D2424] shadow-xs'
                : 'text-[#6E5D53] hover:text-[#2D2424]'
            }`}
          >
            <ClipboardCheck className="w-4 h-4" />
            실전 평가문제 모의고사
          </button>
        </div>
      </div>

      {/* SUBMODE 1: WRONG ANSWER NOTEBOOK */}
      {subMode === 'wrongnote' && (
        <div className="space-y-6">
          {/* Filter Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5">
              {FILTER_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-[#2D2424] border-[#2D2424] text-white'
                      : 'bg-white border-[#E5D9CE] text-[#5E4E46] hover:border-[#2D2424]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowResolved((prev) => !prev)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 ${
                showResolved
                  ? 'bg-[#ECFDF5] border-[#10B981] text-[#065F46]'
                  : 'bg-white border-[#E5D9CE] text-[#5E4E46]'
              }`}
            >
              {showResolved ? '복습 완료된 문항도 표시 중' : '미해결 오답만 보기'}
            </button>
          </div>

          {filteredNotes.length === 0 ? (
            <div className="bg-white rounded-3xl border border-[#ECE2D8] p-12 text-center space-y-4">
              <div className="flex justify-center">
                <MascotAvatar character="chii" mood="cheer" size="xl" className="animate-float-slow" />
              </div>
              <h2 className="text-2xl font-display text-[#2D2424]">
                {wrongNotes.length === 0
                  ? '아직 기록된 오답이 하나도 없어요!'
                  : '선택한 조건에 남아 있는 미해결 오답이 없어요!'}
              </h2>
              <p className="text-sm text-[#6E5D53] max-w-md mx-auto">
                10단계 학습이나 실전 평가문제에서 틀린 문제가 생기면 치이와 하치가 이곳에 자동으로 차곡차곡 정리해 줘요.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigateTab('stages')}
                  className="px-5 py-2.5 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
                >
                  10단계 퀴즈 도전하기
                </button>
                <button
                  type="button"
                  onClick={() => setSubMode('exam')}
                  className="px-5 py-2.5 rounded-xl bg-[#F5EDE6] hover:bg-[#EAE0D7] text-[#2D2424] text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
                >
                  실전 평가문제 풀어보기
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {filteredNotes.map((note) => {
                const retryPicked = retryPickMap[note.questionId];
                const retryRight = retryPicked === note.correctIndex;

                return (
                  <div
                    key={note.questionId}
                    className="bg-white rounded-3xl border border-[#ECE2D8] p-6 sm:p-7 space-y-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[#8C7A6E] mb-1.5">
                          <span>
                            {note.stageId > 0 ? `${note.stageId}단계 퀴즈` : '실전 평가문제'}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{note.category}</span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">누적 오답 {note.wrongCount}회</span>
                          <span aria-hidden="true">·</span>
                          <span
                            className={`font-semibold ${
                              note.resolved ? 'text-[#059669]' : 'text-[#E11D48]'
                            }`}
                          >
                            {note.resolved ? '복습 완료' : '복습 필요'}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-[#2D2424] leading-snug">
                          {note.prompt}
                        </h3>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveWrongNote(note.questionId)}
                        className="p-2 rounded-xl text-[#9C8D82] hover:text-[#E11D48] hover:bg-[#FFF1F2] transition-colors shrink-0"
                        aria-label="오답 노트에서 삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {note.sentenceHighlight && (
                      <div className="p-4 rounded-2xl bg-[#FFF8FA] text-base font-semibold text-[#2D2424]">
                        {note.sentenceHighlight}
                      </div>
                    )}

                    {note.subText && (
                      <div className="p-4 rounded-2xl bg-[#FAF6F2] text-sm text-[#3B2F2F] whitespace-pre-line">
                        {note.subText}
                      </div>
                    )}

                    <div className="text-xs text-[#9F1239]">
                      지난번 내가 고른 오답: <strong>{note.options[note.selectedOptionIndex]}</strong>
                    </div>

                    {/* Retry Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {note.options.map((opt, idx) => {
                        const isPicked = retryPicked === idx;
                        const isAns = idx === note.correctIndex;
                        let style =
                          'bg-[#FDFBF9] border-[#E8DDD3] hover:border-[#F43F5E] text-[#2D2424]';
                        if (retryPicked !== undefined) {
                          if (isAns) {
                            style = 'bg-[#ECFDF5] border-[#10B981] text-[#065F46] font-semibold';
                          } else if (isPicked) {
                            style = 'bg-[#FFF1F2] border-[#F43F5E] text-[#9F1239]';
                          }
                        }

                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleRetryOption(note, idx)}
                            className={`text-left px-4 py-3 rounded-xl border text-xs sm:text-sm transition-colors flex items-center justify-between gap-2 ${style}`}
                          >
                            <span>
                              <span className="font-mono tabular-nums mr-2 opacity-70">
                                0{idx + 1}
                              </span>
                              {opt}
                            </span>
                            {retryPicked !== undefined && isAns && (
                              <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                            )}
                            {retryPicked !== undefined && isPicked && !isAns && (
                              <XCircle className="w-4 h-4 text-[#E11D48] shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {retryPicked !== undefined && (
                      <div
                        className={`p-4 rounded-2xl text-xs sm:text-sm space-y-1 ${
                          retryRight
                            ? 'bg-[#ECFDF5] text-[#065F46]'
                            : 'bg-[#FFF1F2] text-[#9F1239]'
                        }`}
                      >
                        <div className="font-bold">
                          {retryRight
                            ? `${CHARACTER_NAMES[note.mascot]}: “완벽하게 극복했어! 복습 완료 도장 쾅!”`
                            : `${CHARACTER_NAMES[note.mascot]}: “해설을 천천히 읽고 다시 눌러 보자!”`}
                        </div>
                        <p className="text-[#2D2424] leading-relaxed">{note.explanation}</p>
                        <p className="text-xs text-[#6E5D53]">핵심 팁 · {note.mascotTip}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* SUBMODE 2: AUTHENTIC EXAM CHALLENGE (FROM EVALUATION PDF) */}
      {subMode === 'exam' && (
        <div className="space-y-6">
          <MascotBubble character="hachi" mood="study" speakerLabel="하치의 내신 대비 평가문제 안내">
            제공된 <strong>《중학 국어 3-2 3. 문장과 글쓰기 평가문제》</strong>에서 가장 중요한 핵심 기출 6문항을 엄선했어!
            모두 풀고 채점하면 틀린 문항은 자동으로 나의 오답 노트에 추가돼!
          </MascotBubble>

          {examSubmitted && (
            <div className="bg-[#FFF5F8] rounded-3xl border border-[#F8DCE6] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-[#BE123C] mb-1">
                  실전 평가문제 채점 결과
                </div>
                <div className="text-2xl font-display text-[#2D2424]">
                  총 {EXAM_CHALLENGE_QUESTIONS.length}문항 중{' '}
                  <span className="text-[#E11D48] tabular-nums">{examScore}문항</span> 정답! (
                  {Math.round((examScore / EXAM_CHALLENGE_QUESTIONS.length) * 100)}점)
                </div>
                <p className="text-xs sm:text-sm text-[#5E4E46] mt-1">
                  틀린 문항이 있다면 ‘나의 오답 노트’ 탭에서 언제든 다시 복습할 수 있어요.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setExamSelections({});
                  setExamSubmitted(false);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#E5D9CE] hover:border-[#E11D48] text-[#2D2424] text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                <RotateCcw className="w-4 h-4" />
                모의고사 다시 풀기
              </button>
            </div>
          )}

          <div className="space-y-5">
            {EXAM_CHALLENGE_QUESTIONS.map((q) => {
              const picked = examSelections[q.id];
              return (
                <div
                  key={q.id}
                  className="bg-white rounded-3xl border border-[#ECE2D8] p-6 sm:p-7 space-y-4"
                >
                  <div className="text-xs text-[#8C7A6E]">
                    실전 내신 유형 · {q.category}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#2D2424]">{q.prompt}</h3>

                  {q.sentenceHighlight && (
                    <div className="p-4 rounded-2xl bg-[#FFF8FA] text-base font-semibold text-[#2D2424]">
                      {q.sentenceHighlight}
                    </div>
                  )}

                  {q.subText && (
                    <div className="p-4 rounded-2xl bg-[#FAF6F2] text-xs sm:text-sm text-[#3B2F2F] whitespace-pre-line leading-relaxed">
                      {q.subText}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt, oIdx) => {
                      const isSelected = picked === oIdx;
                      const isAns = oIdx === q.correctIndex;
                      let cls =
                        'bg-[#FDFBF9] border-[#E8DDD3] hover:border-[#F43F5E] text-[#2D2424]';

                      if (examSubmitted) {
                        if (isAns) {
                          cls = 'bg-[#ECFDF5] border-[#10B981] text-[#065F46] font-semibold';
                        } else if (isSelected) {
                          cls = 'bg-[#FFF1F2] border-[#F43F5E] text-[#9F1239]';
                        }
                      } else if (isSelected) {
                        cls = 'bg-[#FFF0F5] border-[#E11D48] text-[#9F1239] font-semibold';
                      }

                      return (
                        <button
                          key={oIdx}
                          type="button"
                          disabled={examSubmitted}
                          onClick={() =>
                            setExamSelections((prev) => ({ ...prev, [q.id]: oIdx }))
                          }
                          className={`text-left px-4 py-3 rounded-xl border text-xs sm:text-sm transition-colors flex items-center justify-between gap-2 ${cls}`}
                        >
                          <span>
                            <span className="font-mono tabular-nums mr-2 opacity-70">
                              0{oIdx + 1}
                            </span>
                            {opt}
                          </span>
                          {examSubmitted && isAns && (
                            <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                          )}
                          {examSubmitted && isSelected && !isAns && (
                            <XCircle className="w-4 h-4 text-[#E11D48] shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {examSubmitted && (
                    <div className="p-4 rounded-2xl bg-[#FAF6F2] text-xs sm:text-sm text-[#3B2F2F] space-y-1">
                      <div className="font-bold text-[#2D2424]">해설</div>
                      <p className="leading-relaxed">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!examSubmitted && (
            <div className="flex items-center justify-between p-5 rounded-2xl bg-white border border-[#ECE2D8]">
              <div className="text-xs sm:text-sm text-[#5E4E46]">
                현재 <strong className="tabular-nums">{examAnsweredCount}</strong> /{' '}
                {EXAM_CHALLENGE_QUESTIONS.length}문항 선택 완료
              </div>
              <button
                type="button"
                disabled={examAnsweredCount === 0}
                onClick={handleExamSubmit}
                className={`px-7 py-3 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  examAnsweredCount > 0
                    ? 'bg-[#E11D48] hover:bg-[#BE123C] text-white'
                    : 'bg-[#EDE5DE] text-[#A8998E] cursor-not-allowed'
                }`}
              >
                일괄 채점 및 오답 저장하기
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
