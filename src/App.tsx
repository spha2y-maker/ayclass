/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { AnalyzerView } from './components/AnalyzerView';
import { PreLearningView } from './components/PreLearningView';
import { StageMapView } from './components/StageMapView';
import { TextbookView } from './components/TextbookView';
import { WrongNoteView } from './components/WrongNoteView';
import {
  AppTab,
  QuizQuestion,
  UserLearningState,
  WrongAnswerEntry,
} from './types/grammar';

const STORAGE_KEY = 'jjaim_toktok_learning_state_v1';

const DEFAULT_STATE: UserLearningState = {
  stageProgress: {},
  wrongNotes: [],
  starCandies: 0,
  streakCount: 1,
  prelearningCompletedIds: [],
  examScores: {},
};

function loadInitialState(): UserLearningState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return DEFAULT_STATE;
    const parsed = JSON.parse(saved) as Partial<UserLearningState>;
    return {
      ...DEFAULT_STATE,
      ...parsed,
      stageProgress: parsed.stageProgress ?? {},
      wrongNotes: Array.isArray(parsed.wrongNotes) ? parsed.wrongNotes : [],
    };
  } catch {
    return DEFAULT_STATE;
  }
}

const NAV_ITEMS: { id: AppTab; label: string }[] = [
  { id: 'stages', label: '단계별 학습' },
  { id: 'prelearning', label: '사전학습' },
  { id: 'textbook', label: '교과서 배움터' },
  { id: 'analyzer', label: '문장 분석기' },
  { id: 'wrongnote', label: '오답 노트' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('stages');
  const [learningState, setLearningState] = useState<UserLearningState>(loadInitialState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(learningState));
    } catch {
      // Ignore storage quota errors in sandboxed iframes
    }
  }, [learningState]);

  const upsertWrongNotes = (
    existing: WrongAnswerEntry[],
    newWrongs: { question: QuizQuestion; selectedIndex: number }[]
  ): WrongAnswerEntry[] => {
    const nextList = [...existing];
    const nowIso = new Date().toISOString();

    newWrongs.forEach(({ question, selectedIndex }) => {
      const idx = nextList.findIndex((item) => item.questionId === question.id);
      if (idx >= 0) {
        nextList[idx] = {
          ...nextList[idx],
          selectedOptionIndex: selectedIndex,
          wrongCount: nextList[idx].wrongCount + 1,
          resolved: false,
          lastWrongAt: nowIso,
        };
      } else {
        nextList.unshift({
          questionId: question.id,
          stageId: question.stageId,
          category: question.category,
          prompt: question.prompt,
          subText: question.subText,
          sentenceHighlight: question.sentenceHighlight,
          options: question.options,
          selectedOptionIndex: selectedIndex,
          correctIndex: question.correctIndex,
          explanation: question.explanation,
          mascotTip: question.mascotTip,
          mascot: question.mascot,
          wrongCount: 1,
          resolved: false,
          lastWrongAt: nowIso,
        });
      }
    });

    return nextList;
  };

  const handleCompleteStage = (
    stageId: number,
    score: number,
    total: number,
    wrongSelections: { question: QuizQuestion; selectedIndex: number }[]
  ) => {
    const stars = score === total ? 3 : score >= total - 1 ? 2 : score >= 3 ? 1 : 0;
    const passed = score >= 3;

    setLearningState((prev) => {
      const prevStage = prev.stageProgress[stageId];
      const bestScore = Math.max(prevStage?.bestScore ?? 0, score);
      const bestStars = Math.max(prevStage?.stars ?? 0, stars);

      return {
        ...prev,
        starCandies: prev.starCandies + score * 10,
        stageProgress: {
          ...prev.stageProgress,
          [stageId]: {
            completed: Boolean(prevStage?.completed) || passed,
            bestScore,
            totalQuestions: total,
            stars: bestStars,
            attempts: (prevStage?.attempts ?? 0) + 1,
          },
        },
        wrongNotes: upsertWrongNotes(prev.wrongNotes, wrongSelections),
      };
    });
  };

  const handleResolveWrongNote = (questionId: string) => {
    setLearningState((prev) => ({
      ...prev,
      starCandies: prev.starCandies + 5,
      wrongNotes: prev.wrongNotes.map((w) =>
        w.questionId === questionId ? { ...w, resolved: true } : w
      ),
    }));
  };

  const handleRemoveWrongNote = (questionId: string) => {
    setLearningState((prev) => ({
      ...prev,
      wrongNotes: prev.wrongNotes.filter((w) => w.questionId !== questionId),
    }));
  };

  const handleRecordExamWrong = (question: QuizQuestion, selectedIndex: number) => {
    setLearningState((prev) => ({
      ...prev,
      wrongNotes: upsertWrongNotes(prev.wrongNotes, [{ question, selectedIndex }]),
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9] text-[#2D2424]">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-30 bg-[#FFFDF9]/95 backdrop-blur-xs border-b border-[#EFE5DC]">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
          {/* Zone 1: Single text element wordmark */}
          <button
            type="button"
            onClick={() => setActiveTab('stages')}
            className="text-xl font-display tracking-tight text-[#E11D48] whitespace-nowrap shrink-0 cursor-pointer"
          >
            짜임톡톡
          </button>

          {/* Zone 2: 5 concise single-line text navigation links */}
          <nav
            aria-label="주요 학습 메뉴"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#6E5D53]"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                    isActive
                      ? 'text-[#2D2424] font-bold border-[#E11D48]'
                      : 'border-transparent hover:text-[#2D2424] hover:border-[#F9A8D4]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('analyzer')}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#E11D48] hover:bg-[#BE123C] rounded-xl transition-colors whitespace-nowrap shrink-0"
            >
              문장 분석하기
            </button>
          </div>
        </div>

        {/* Mobile Secondary Horizontal Tab Strip (keeps mobile height well within 15% cap) */}
        <div className="md:hidden flex items-center gap-4 overflow-x-auto px-4 py-2 border-t border-[#F4ECE4] text-xs font-medium text-[#6E5D53]">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`py-1 whitespace-nowrap shrink-0 ${
                  isActive ? 'text-[#E11D48] font-bold underline underline-offset-4' : ''
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {activeTab === 'stages' && (
          <StageMapView
            learningState={learningState}
            onCompleteStage={handleCompleteStage}
            onNavigateTab={setActiveTab}
          />
        )}
        {activeTab === 'prelearning' && <PreLearningView onNavigateTab={setActiveTab} />}
        {activeTab === 'textbook' && <TextbookView onNavigateTab={setActiveTab} />}
        {activeTab === 'analyzer' && <AnalyzerView />}
        {activeTab === 'wrongnote' && (
          <WrongNoteView
            wrongNotes={learningState.wrongNotes}
            onResolveWrongNote={handleResolveWrongNote}
            onRemoveWrongNote={handleRemoveWrongNote}
            onRecordExamWrong={handleRecordExamWrong}
            onNavigateTab={setActiveTab}
          />
        )}
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-[#EFE5DC] py-6 px-4 sm:px-6 text-center text-xs text-[#8C7A6E]">
        중학교 3학년 국어 3단원 (1) 문장의 짜임 맞춤형 학습터 · 사전학습 · 단계별 퀴즈 · 문장 구조 분석기 · 오답 노트
      </footer>
    </div>
  );
}
