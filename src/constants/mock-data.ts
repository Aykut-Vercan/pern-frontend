import { Subject } from "@/types";

export const MOCK_SUBJECTS: Subject[] = [
    {
        id: 1,
        code: "CS101",
        name: "Introduction to Computer Science",
        department: "Computer Science",
        description: "Fundamental concepts of computing, algorithms, and programming. Covers basic data structures, control structures, and problem-solving techniques using a modern programming language.",
        createdAt: new Date().toISOString()
    },
    {
        id: 2,
        code: "MATH201",
        name: "Calculus and Linear Algebra",
        department: "Mathematics",
        description: "Differential and integral calculus of single variable functions combined with fundamentals of linear algebra including vectors, matrices, and systems of linear equations.",
        createdAt: new Date().toISOString()
    },
    {
        id: 3,
        code: "ENG102",
        name: "Academic Writing and Research",
        department: "English",
        description: "Development of academic writing skills with emphasis on research methods, source evaluation, thesis development, and proper citation techniques across various disciplines.",
        createdAt: new Date().toISOString()
    },
    {
        id: 4,
        code: "PHY103",
        name: "General Physics",
        department: "Physics",
        description: "Introduction to mechanics, thermodynamics, and electromagnetism. Covers fundamental principles of motion, energy, and forces with practical laboratory experiments.",
        createdAt: new Date().toISOString()
    },
    {
        id: 5,
        code: "CHEM201",
        name: "Organic Chemistry",
        department: "Chemistry",
        description: "Study of the structure, properties, and reactions of organic compounds. Focuses on functional groups, reaction mechanisms, and organic synthesis methods.",
        createdAt: new Date().toISOString()
    },
    {
        id: 6,
        code: "HIST101",
        name: "World History: 20th Century",
        department: "History",
        description: "Comprehensive study of major global events, political movements, and cultural developments from 1900 to the present day.",
        createdAt: new Date().toISOString()
    },
    {
        id: 7,
        code: "PSY150",
        name: "Introduction to Psychology",
        department: "Psychology",
        description: "Overview of psychological principles, theories, and research methods. Covers topics including cognition, development, personality, and abnormal psychology.",
        createdAt: new Date().toISOString()
    }
];