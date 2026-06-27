import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min?url";

GlobalWorkerOptions.workerSrc = pdfWorker;

const API_BASE = "http://localhost/pidify/pidify";
const LEVELS = ["100", "200", "300", "400"];

export const COURSE_CATALOG = {
  fpas: [
    { label: "Computer Science", type: "pdf_comp" },
    { label: "Software Engineering", type: "pdf_soft" },
    { label: "Cyber Security", type: "pdf_cyber" },
    { label: "Micro-Biology", type: "pdf_micro" },
    { label: "Bio-Chemistry", type: "pdf_bio" },
  ],
  fsms: [
    { label: "Economics", type: "pdf_economics" },
    { label: "Accounting", type: "pdf_accounting" },
    { label: "International Relations", type: "pdf_inter_rel" },
    { label: "Business Administration", type: "pdf_business_admin" },
    { label: "Mass Communication", type: "pdf_mass_com" },
  ],
};

const cleanFileName = (name = "") =>
  name
    .replace(/^\d+_/, "")
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .trim();

const isPdf = (file) =>
  file?.type?.toLowerCase().includes("pdf") || file?.name?.toLowerCase().endsWith(".pdf");

const shuffle = (items) => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const truncate = (text, limit = 150) => {
  if (text.length <= limit) return text;
  return `${text.slice(0, limit).trim()}...`;
};

const normalizeText = (text) =>
  text
    .replace(/\s+/g, " ")
    .replace(/[^\S\r\n]+/g, " ")
    .trim();

const getSentences = (text) => {
  const normalized = normalizeText(text);
  return normalized
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length >= 60 && sentence.length <= 260)
    .filter((sentence) => /[a-zA-Z]{4,}/.test(sentence));
};

const getFileBytes = async (fileName) => {
  const response = await fetch(`${API_BASE}/getFileContent.php?file=${encodeURIComponent(fileName)}`);
  if (!response.ok) throw new Error("Unable to read uploaded file.");
  return response.arrayBuffer();
};

const extractPdfText = async (file) => {
  const data = await getFileBytes(file.name);
  const pdf = await getDocument({ data }).promise;
  const pageLimit = Math.min(pdf.numPages, 8);
  const pages = [];

  for (let pageNumber = 1; pageNumber <= pageLimit; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    const pageText = content.items.map((item) => item.str).join(" ");
    pages.push(pageText);
  }

  return pages.join(" ");
};

const makeOptions = (correct, pool) => {
  const distractors = pool
    .filter((item) => item !== correct)
    .map((item) => truncate(item, 120))
    .filter(Boolean);

  const options = shuffle([truncate(correct, 120), ...shuffle(distractors).slice(0, 3)]);
  const answer = options.findIndex((option) => option === truncate(correct, 120));
  return { options, answer };
};

const buildStatementQuestions = (sentences, file, course) => {
  if (sentences.length < 4) return [];

  return sentences.slice(0, 5).map((sentence, index) => {
    const { options, answer } = makeOptions(sentence, sentences);

    return {
      id: `${file.id || file.name}-statement-${index}`,
      course: course.label,
      level: file.level || "Unknown",
      fileName: file.name,
      sourceTitle: cleanFileName(file.name),
      question: `Which statement is supported by ${cleanFileName(file.name)}?`,
      options,
      answer,
      explanation: truncate(sentence, 180),
    };
  });
};

const buildDefinitionQuestions = (sentences, file, course) => {
  const definitionPattern = /^(.{4,70}?)\s+(is|are|means|refers to|can be defined as)\s+(.{25,180})/i;

  return sentences
    .map((sentence, index) => {
      const match = sentence.match(definitionPattern);
      if (!match) return null;

      const term = match[1].replace(/^(the|a|an)\s+/i, "").trim();
      const definition = match[3].replace(/[.;:]$/, "").trim();
      if (term.split(" ").length > 8 || definition.length < 25) return null;

      const terms = sentences
        .map((candidate) => candidate.match(definitionPattern)?.[1])
        .filter(Boolean)
        .map((candidate) => candidate.replace(/^(the|a|an)\s+/i, "").trim())
        .filter((candidate) => candidate.length >= 4 && candidate !== term);

      const fallbackTerms = ["Course material", "Lecture note", "Academic concept", "Study guide"];
      const { options, answer } = makeOptions(term, [...terms, ...fallbackTerms]);

      return {
        id: `${file.id || file.name}-definition-${index}`,
        course: course.label,
        level: file.level || "Unknown",
        fileName: file.name,
        sourceTitle: cleanFileName(file.name),
        question: `According to ${cleanFileName(file.name)}, what ${match[2].toLowerCase()} ${truncate(definition, 110)}?`,
        options,
        answer,
        explanation: truncate(sentence, 180),
      };
    })
    .filter(Boolean)
    .slice(0, 4);
};

const buildFileFallbackQuestion = (file, course) => {
  const correctOption = cleanFileName(file.name);
  const options = shuffle([
    cleanFileName(file.name),
    `${course.label} reference note`,
    `${file.level || "Selected"} level study outline`,
    "General course archive",
  ]);

  return {
    id: `${file.id || file.name}-file-fallback`,
    course: course.label,
    level: file.level || "Unknown",
    fileName: file.name,
    sourceTitle: cleanFileName(file.name),
    question: "Which uploaded course material is this quiz item based on?",
    options,
    answer: options.findIndex((option) => option === correctOption),
    explanation: `This question was generated from the uploaded file record: ${cleanFileName(file.name)}.`,
  };
};

export const fetchCourseMaterials = async (faculty) => {
  const courses = COURSE_CATALOG[faculty] || COURSE_CATALOG.fpas;
  const requests = courses.flatMap((course) =>
    LEVELS.map(async (level) => {
      const response = await fetch(`${API_BASE}/getFiles.php?level=${level}&type=${course.type}`);
      if (!response.ok) return [];
      const files = await response.json();
      return (files || []).map((file) => ({
        ...file,
        level,
        course: course.label,
        courseType: course.type,
      }));
    })
  );

  const groups = await Promise.all(requests);
  return groups.flat();
};

export const generateQuizFromMaterials = async (materials, onProgress) => {
  const questions = [];

  for (let index = 0; index < materials.length; index += 1) {
    const file = materials[index];
    const course = { label: file.course, type: file.courseType };
    onProgress?.({ current: index + 1, total: materials.length, fileName: file.name });

    try {
      if (!isPdf(file)) {
        questions.push(buildFileFallbackQuestion(file, course));
        continue;
      }

      const text = await extractPdfText(file);
      const sentences = getSentences(text);
      const generated = [
        ...buildDefinitionQuestions(sentences, file, course),
        ...buildStatementQuestions(sentences, file, course),
      ];

      if (generated.length) {
        questions.push(...generated);
      } else {
        questions.push(buildFileFallbackQuestion(file, course));
      }
    } catch (error) {
      console.error("Quiz generation failed for", file.name, error);
      questions.push(buildFileFallbackQuestion(file, course));
    }
  }

  return shuffle(questions).slice(0, 40);
};
