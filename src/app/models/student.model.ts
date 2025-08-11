export interface Subject {
    name: string;
    score: number | null;
}

export interface Course {
    name: string;
    subjects: string[];
}

export interface Student {
    id?: number;
    name: string;
    email: string;
    birthDate: string;
    course: string;
    subjects: Subject[];
}



