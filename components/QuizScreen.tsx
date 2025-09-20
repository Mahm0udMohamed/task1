import React, { useState, useEffect } from 'react';
import { Question, AnswerStatus } from '../types';
import { CheckIcon, XIcon, LeafIcon } from './icons';
import { playSound } from '../services/soundService';

interface QuizScreenProps {
  questions: Question[];
  onQuizComplete: (finalScore: number) => void;
}

const VineProgressBar: React.FC<{ current: number; total: number }> = ({ current, total }) => {
  const progressPercentage = (current / total) * 100;
  return (
    <div className="w-full bg-black/30 rounded-full h-6 border-2 border-lime-900/50 p-1 shadow-inner">
      <div
        className="bg-gradient-to-r from-lime-500 to-green-600 h-full rounded-full transition-all duration-500 ease-out flex items-center justify-end"
        style={{ width: `${progressPercentage}%` }}
      >
        {progressPercentage > 5 && <LeafIcon className="w-5 h-5 text-lime-200 -mr-2" />}
      </div>
    </div>
  );
};

const buttonColors = [
  'bg-amber-600 border-amber-800 hover:bg-amber-500',
  'bg-lime-700 border-lime-900 hover:bg-lime-600',
  'bg-sky-700 border-sky-900 hover:bg-sky-600',
  'bg-rose-700 border-rose-900 hover:bg-rose-600',
];

const QuizScreen: React.FC<QuizScreenProps> = ({ questions, onQuizComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [answerStatus, setAnswerStatus] = useState<AnswerStatus>('unanswered');

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (selectedAnswerIndex !== null) {
      const timer = setTimeout(() => {
        const nextIndex = currentQuestionIndex + 1;
        if (nextIndex < questions.length) {
          setCurrentQuestionIndex(nextIndex);
          setSelectedAnswerIndex(null);
          setAnswerStatus('unanswered');
        } else {
          onQuizComplete(score);
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [selectedAnswerIndex, currentQuestionIndex, questions.length, score, onQuizComplete]);

  const handleAnswerClick = (index: number) => {
    if (selectedAnswerIndex !== null) return;
    
    playSound('click');
    setSelectedAnswerIndex(index);

    if (index === currentQuestion.correctAnswerIndex) {
      setScore(score + 1);
      setAnswerStatus('correct');
      playSound('correct');
    } else {
      setAnswerStatus('incorrect');
      playSound('incorrect');
    }
  };

  const getButtonClass = (index: number) => {
    if (selectedAnswerIndex === null) {
      return `${buttonColors[index % buttonColors.length]}`;
    }

    const isCorrect = index === currentQuestion.correctAnswerIndex;
    const isSelected = index === selectedAnswerIndex;

    if (isCorrect) {
      return 'bg-lime-500 border-lime-700 animate-pulse-correct';
    }
    if (isSelected && !isCorrect) {
      return 'bg-red-700 border-red-900 animate-shake-incorrect';
    }
    
    return 'bg-stone-600 border-stone-800 opacity-50 cursor-not-allowed';
  };

  return (
    <div className="w-full text-center">
      <div className="flex items-center gap-4 mb-4">
        <div className="text-white font-bold bg-black/20 px-3 py-1 rounded-md">
           {currentQuestionIndex + 1} / {questions.length}
        </div>
        <VineProgressBar current={currentQuestionIndex} total={questions.length} />
      </div>
      <div className="bg-amber-50/90 rounded-lg p-6 my-6 shadow-lg relative border-4 border-amber-900/20">
        <LeafIcon className="w-12 h-12 text-green-800/20 absolute -top-5 -left-5 transform -rotate-45" />
        <LeafIcon className="w-16 h-16 text-green-800/20 absolute -bottom-6 -right-6 transform rotate-[120deg]" />
        <h2 className="text-2xl md:text-3xl font-bold pt-4 text-stone-800 text-center" style={{ minHeight: '80px' }}>
          {currentQuestion.questionText}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(index)}
            disabled={selectedAnswerIndex !== null}
            className={`
              w-full p-4 text-white text-xl font-bold rounded-xl
              border-b-8 transform transition-all duration-150
              flex items-center justify-center gap-3
              hover:-translate-y-1
              ${getButtonClass(index)}
              ${selectedAnswerIndex === null ? 'active:border-b-2 active:translate-y-1' : ''}
            `}
          >
            <span className="flex-1">{option}</span>
            {selectedAnswerIndex === index && answerStatus === 'correct' && <CheckIcon className="w-8 h-8 bg-white/30 rounded-full p-1" />}
            {selectedAnswerIndex === index && answerStatus === 'incorrect' && <XIcon className="w-8 h-8 bg-white/30 rounded-full p-1" />}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizScreen;
