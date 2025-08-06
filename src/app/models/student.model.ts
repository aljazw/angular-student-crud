export const SUBJECTS = [
    'Math',
    'Physics',
    'Chemistry',
    'Biology',
    'History',
    'Geography',
    'English'
] as const;

export type SubjectName = (typeof SUBJECTS)[number];

export interface Subject {
    name: SubjectName;
    score: number | null;
}

export interface Student {
    id: number;
    name: string;
    email: string;
    birtDate: string;
    subjects: Subject[];
}