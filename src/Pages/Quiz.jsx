import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  ClipboardCheck,
  Loader2,
  RefreshCw,
  RotateCcw,
  Timer,
  Trophy,
  XCircle,
} from "lucide-react";
import FpasSidebar from "../component/FpasSidebar";
import FsmsSidebar from "../component/FsmsSidebar";
import NavBar from "../component/IntroNav/NavBar";
import IntroFooter from "../component/IntroFooter/IntroFooter";
import { fetchCourseMaterials, generateQuizFromMaterials } from "../utils/quizGenerator";

const Quiz = () => {
  const user = useMemo(() => {
    try {
      const localUser = localStorage.getItem("user");
      return localUser ? JSON.parse(localUser) : null;
    } catch {
      return null;
    }
  }, []);

  const userFaculty = (user?.faculty || "fpas").toLowerCase();
  const isFsms = userFaculty === "fsms";

  const [quizQuestions, setQuizQuestions] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [generationProgress, setGenerationProgress] = useState(null);

  const loadGeneratedQuiz = useCallback(async () => {
    setStatus("loading");
    setError("");
    setGenerationProgress(null);
    setCurrentIndex(0);
    setAnswers({});
    setShowResults(false);

    try {
      const courseMaterials = await fetchCourseMaterials(userFaculty);
      setMaterials(courseMaterials);

      if (!courseMaterials.length) {
        setQuizQuestions([]);
        setStatus("empty");
        return;
      }

      setStatus("generating");
      const generatedQuestions = await generateQuizFromMaterials(courseMaterials, setGenerationProgress);
      setQuizQuestions(generatedQuestions);
      setSelectedCourse((currentCourse) =>
        currentCourse === "All" || generatedQuestions.some((question) => question.course === currentCourse)
          ? currentCourse
          : "All"
      );
      setStatus(generatedQuestions.length ? "ready" : "empty");
    } catch (loadError) {
      console.error("Unable to generate quiz from course materials", loadError);
      setQuizQuestions([]);
      setStatus("error");
      setError("Unable to generate quiz questions from the uploaded course materials.");
    } finally {
      setGenerationProgress(null);
    }
  }, [userFaculty]);

  useEffect(() => {
    loadGeneratedQuiz();
  }, [loadGeneratedQuiz]);

  const courses = useMemo(() => ["All", ...new Set(quizQuestions.map((item) => item.course))], [quizQuestions]);

  const filteredQuestions = useMemo(() => {
    if (selectedCourse === "All") return quizQuestions;
    const questions = quizQuestions.filter((item) => item.course === selectedCourse);
    return questions.length ? questions : quizQuestions;
  }, [quizQuestions, selectedCourse]);

  const activeQuestion = filteredQuestions[currentIndex] || null;
  const answeredCount = filteredQuestions.filter((_, index) => answers[index] !== undefined).length;
  const score = filteredQuestions.reduce((total, question, index) => {
    return total + (answers[index] === question.answer ? 1 : 0);
  }, 0);
  const progress = filteredQuestions.length ? Math.round((answeredCount / filteredQuestions.length) * 100) : 0;
  const isBusy = status === "loading" || status === "generating";
  const levelCount = new Set(materials.map((material) => material.level)).size;

  const handleCourseChange = (course) => {
    setSelectedCourse(course);
    setCurrentIndex(0);
    setAnswers({});
    setShowResults(false);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setAnswers({});
    setShowResults(false);
  };

  const page = (
    <div className="min-h-screen bg-gray-100 text-gray-800 transition-colors duration-300">
      <main className={`${user ? "ml-0 md:ml-64 pt-16 md:pt-8" : "pt-24"} px-4 md:px-8 pb-12`}>
        <div className="mx-auto max-w-6xl space-y-6">
          <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl bg-white p-6 shadow-md">
              <div className="flex items-center gap-3 text-[#006666]">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#edf8f6]">
                  <ClipboardCheck size={22} />
                </span>
                <p className="text-sm font-black uppercase tracking-wide">Practice quiz</p>
              </div>
              <h1 className="mt-5 text-3xl font-black text-gray-800 md:text-4xl">
                Generated practice from uploaded course materials.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
                Questions are created from the files added under your faculty courses across 100 to 400 level.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-md">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <p className="text-xs font-bold text-gray-500">Score</p>
                  <p className="mt-1 text-2xl font-black">{score}/{filteredQuestions.length}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500">Materials</p>
                  <p className="mt-1 text-2xl font-black">{materials.length}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500">Levels</p>
                  <p className="mt-1 text-2xl font-black">{levelCount}</p>
                </div>
              </div>
              <div className="mt-5 h-2 rounded-full bg-gray-200">
                <div className="h-full rounded-full bg-[#006666]" style={{ width: `${progress}%` }} />
              </div>
              <button
                type="button"
                onClick={loadGeneratedQuiz}
                disabled={isBusy}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#006666] px-4 py-2.5 text-sm font-black text-white shadow-md shadow-[#006666]/20 transition hover:bg-[#004f4f] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RefreshCw size={16} className={isBusy ? "animate-spin" : ""} />
                Refresh From Materials
              </button>
            </div>
          </section>

          {quizQuestions.length > 0 && (
            <section className="rounded-2xl bg-white p-4 shadow-md">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {courses.map((course) => (
                  <button
                    key={course}
                    type="button"
                    onClick={() => handleCourseChange(course)}
                    className={`shrink-0 rounded-xl border px-4 py-2 text-sm font-black transition ${
                      selectedCourse === course
                        ? "border-[#006666] bg-[#006666] text-white"
                        : "border-gray-200 bg-white text-gray-600 hover:border-[#006666]"
                    }`}
                  >
                    {course}
                  </button>
                ))}
              </div>
            </section>
          )}

          {isBusy ? (
            <section className="rounded-2xl bg-white p-8 text-center shadow-md">
              <Loader2 className="mx-auto animate-spin text-[#006666]" size={34} />
              <h2 className="mt-4 text-2xl font-black text-gray-800">
                {status === "loading" ? "Reading course materials" : "Generating quiz questions"}
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-gray-600">
                {generationProgress
                  ? `${generationProgress.current} of ${generationProgress.total}: ${generationProgress.fileName}`
                  : "Checking uploaded files across all available levels."}
              </p>
            </section>
          ) : status === "error" ? (
            <section className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
              <p className="font-black">{error}</p>
              <button
                type="button"
                onClick={loadGeneratedQuiz}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-black text-white"
              >
                <RefreshCw size={16} />
                Try Again
              </button>
            </section>
          ) : status === "empty" ? (
            <section className="rounded-2xl bg-white p-8 text-center shadow-md">
              <BookOpenCheck className="mx-auto text-[#006666]" size={36} />
              <h2 className="mt-4 text-2xl font-black text-gray-800">
                No generated quiz yet
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-gray-600">
                Add course material files for this faculty, then refresh this page to build the quiz bank.
              </p>
            </section>
          ) : !showResults && activeQuestion ? (
            <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
              <aside className="rounded-2xl bg-white p-4 shadow-md">
                <div className="flex items-center gap-2 text-sm font-black text-gray-600">
                  <Timer size={16} />
                  Questions
                </div>
                <div className="mt-4 grid grid-cols-5 gap-2 lg:grid-cols-4">
                  {filteredQuestions.map((question, index) => (
                    <button
                      key={question.id || `${question.course}-${question.question}`}
                      type="button"
                      onClick={() => setCurrentIndex(index)}
                      className={`h-10 rounded-xl border text-sm font-black transition ${
                        currentIndex === index
                          ? "border-[#006666] bg-[#006666] text-white"
                          : answers[index] !== undefined
                            ? "border-[#006666]/30 bg-[#edf8f6] text-[#006666]"
                            : "border-gray-200 text-gray-600"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </aside>

              <article className="rounded-2xl bg-white p-6 shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full bg-[#edf8f6] px-3 py-1 text-xs font-black text-[#006666]">
                    {activeQuestion.course} - {activeQuestion.level} Level
                  </span>
                  {activeQuestion.sourceTitle && (
                    <span className="rounded-full border border-gray-200 px-3 py-1 text-xs font-black text-gray-600">
                      {activeQuestion.sourceTitle}
                    </span>
                  )}
                  <span className="text-sm font-bold text-gray-600">
                    Question {currentIndex + 1} of {filteredQuestions.length}
                  </span>
                </div>

                <h2 className="mt-5 text-xl font-black leading-8 text-gray-800">
                  {activeQuestion.question}
                </h2>

                <div className="mt-6 space-y-3">
                  {activeQuestion.options.map((option, optionIndex) => {
                    const isSelected = answers[currentIndex] === optionIndex;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setAnswers((prev) => ({ ...prev, [currentIndex]: optionIndex }))}
                        className={`flex w-full items-center justify-between rounded-xl border p-4 text-left text-sm font-bold transition ${
                          isSelected
                            ? "border-[#006666] bg-[#edf8f6] text-[#006666]"
                            : "border-gray-200 bg-white text-gray-700 hover:border-[#006666]"
                        }`}
                      >
                        <span>{option}</span>
                        {isSelected && <CheckCircle2 size={18} />}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 pt-5">
                  <button
                    type="button"
                    onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                    disabled={currentIndex === 0}
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-black text-gray-600 transition disabled:opacity-40"
                  >
                    <ArrowLeft size={16} />
                    Previous
                  </button>

                  {currentIndex === filteredQuestions.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => setShowResults(true)}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#006666] px-5 py-2.5 text-sm font-black text-white shadow-md shadow-[#006666]/20 transition hover:bg-[#004f4f]"
                    >
                      <Trophy size={16} />
                      Submit Quiz
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, filteredQuestions.length - 1))}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#006666] px-5 py-2.5 text-sm font-black text-white shadow-md shadow-[#006666]/20 transition hover:bg-[#004f4f]"
                    >
                      Next
                      <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              </article>
            </section>
          ) : (
            <section className="rounded-2xl bg-white p-6 shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-black uppercase tracking-wide text-[#006666]">Quiz complete</p>
                  <h2 className="mt-2 text-3xl font-black">You scored {score} of {filteredQuestions.length}</h2>
                </div>
                <button
                  type="button"
                  onClick={handleRestart}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#006666] px-5 py-2.5 text-sm font-black text-white"
                >
                  <RotateCcw size={16} />
                  Try Again
                </button>
              </div>

              <div className="mt-6 space-y-3">
                {filteredQuestions.map((question, index) => {
                  const isCorrect = answers[index] === question.answer;
                  return (
                    <div key={question.id || question.question} className="rounded-xl border border-gray-200 p-4">
                      <div className="flex items-start gap-3">
                        {isCorrect ? (
                          <CheckCircle2 className="mt-1 text-[#006666]" size={18} />
                        ) : (
                          <XCircle className="mt-1 text-red-500" size={18} />
                        )}
                        <div>
                          <p className="font-black text-gray-800">{question.question}</p>
                          <p className="mt-2 text-sm text-gray-600">
                            Correct answer: <span className="font-black">{question.options[question.answer]}</span>
                          </p>
                          <p className="mt-1 text-sm text-gray-600">{question.explanation}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );

  return (
    <>
      {user ? (isFsms ? <FsmsSidebar /> : <FpasSidebar />) : <NavBar />}
      {page}
      {!user && <IntroFooter />}
    </>
  );
};

export default Quiz
