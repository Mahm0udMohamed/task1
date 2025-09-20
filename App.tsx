import React, { useState, useCallback, useEffect } from 'react';
import { GameState, Question } from './types';
import { generateQuizQuestions } from './services/geminiService';
import LoadingSpinner from './components/LoadingSpinner';
import QuizScreen from './components/QuizScreen';
import { TreasureChestIcon } from './components/icons';
import { playSound } from './services/soundService';

const StartScreen: React.FC<{ onStart: (topic: string) => void }> = ({ onStart }) => {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      playSound('click');
      onStart(topic.trim());
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-6xl md:text-8xl font-display text-amber-300 drop-shadow-lg text-shadow-wood">
        Quiz Quest
      </h1>
      <p className="text-xl md:text-2xl mt-4 mb-8 text-amber-100 font-bold drop-shadow-md">
        مغامرة الأسئلة في الأدغال!
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
        <label htmlFor="topic-input" className="text-lg font-bold text-amber-100">اختر موضوعاً للمغامرة</label>
        <input
          id="topic-input"
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="مثل: الأدغال، الكنوز، الأردن..."
          className="p-3 w-full max-w-sm text-center text-lg rounded-xl bg-[#2a221b] text-white border-4 border-amber-600/80 focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300/50 transition-all shadow-inner"
        />
        <button
          type="submit"
          disabled={!topic.trim()}
          className="w-full max-w-sm px-8 py-4 text-2xl font-bold text-white bg-lime-600 rounded-xl border-b-8 border-lime-800 transform transition-transform duration-150 hover:bg-lime-500 active:border-b-2 active:translate-y-1 disabled:bg-gray-500 disabled:border-gray-600 disabled:cursor-not-allowed disabled:hover:bg-gray-500"
        >
          ابدأ المغامرة
        </button>
      </form>
    </div>
  );
};

const ResultScreen: React.FC<{ score: number; total: number; onPlayAgain: () => void }> = ({ score, total, onPlayAgain }) => {
    const percentage = Math.round((score / total) * 100);
    let message = "لقد وجدت الكنز!";
    if (percentage < 50) message = "واصل البحث أيها المستكشف!";
    else if (percentage >= 80) message = "خبير أدغال حقيقي!";

    useEffect(() => {
        playSound('win');
    }, []);

    const handlePlayAgainClick = () => {
        playSound('click');
        onPlayAgain();
    }

  return (
    <div className="text-center text-white flex flex-col items-center gap-4">
      <TreasureChestIcon className="w-24 h-24 text-yellow-400 animate-float" />
      <h2 className="text-5xl font-display text-amber-300 drop-shadow-lg text-shadow-wood">
        {message}
      </h2>
       <div className="w-48 h-48 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex flex-col items-center justify-center text-white border-4 border-yellow-200/50 shadow-2xl my-4">
        <span className="text-lg">كنزك</span>
        <span className="font-display text-6xl text-white drop-shadow-lg">{score}/{total}</span>
      </div>
      <button
        onClick={handlePlayAgainClick}
        className="mt-2 px-8 py-4 text-2xl font-bold text-white bg-amber-500 rounded-xl border-b-8 border-amber-700 transform transition-transform duration-150 hover:bg-amber-400 active:border-b-2 active:translate-y-1"
      >
        مغامرة أخرى
      </button>
    </div>
  );
};


function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const handleStartQuiz = useCallback(async (topic: string) => {
    setGameState('loading');
    setError(null);
    try {
      const fetchedQuestions = await generateQuizQuestions(topic);
      if (fetchedQuestions.length > 0) {
        setQuestions(fetchedQuestions);
        setGameState('playing');
      } else {
        throw new Error("لم يتم العثور على أسئلة لهذا الموضوع.");
      }
    } catch (err: any) {
      setError(err.message || 'حدث خطأ غير متوقع.');
      setGameState('start');
    }
  }, []);

  const handleQuizComplete = useCallback((finalScore: number) => {
    setScore(finalScore);
    setGameState('finished');
  }, []);

  const handlePlayAgain = useCallback(() => {
    setQuestions([]);
    setScore(0);
    setGameState('start');
  }, []);

  const renderContent = () => {
    switch (gameState) {
      case 'start':
        return <StartScreen onStart={handleStartQuiz} />;
      case 'loading':
        return <LoadingSpinner />;
      case 'playing':
        return <QuizScreen questions={questions} onQuizComplete={handleQuizComplete} />;
      case 'finished':
        return <ResultScreen score={score} total={questions.length} onPlayAgain={handlePlayAgain} />;
      default:
        return <StartScreen onStart={handleStartQuiz} />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto p-2 rounded-2xl bg-[#4A3F35] border-8 border-[#6B5A4B] shadow-2xl shadow-black/50" style={{boxShadow: 'inset 0 0 15px rgba(0,0,0,0.6)'}}>
        <main className="w-full bg-[#625141]/30 rounded-[10px] p-6 md:p-8 relative">
          {error && gameState === 'start' && (
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-3/4 bg-red-800/90 border-4 border-yellow-800/60 text-white p-2 rounded-xl shadow-lg" role="alert">
              <p className="font-bold text-center">{error}</p>
            </div>
          )}
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;
