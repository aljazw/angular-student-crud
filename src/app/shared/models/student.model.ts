export interface Course {
    name: string;
    subjects: string[];   
}

export interface StudentSubject {
    name: string;
    score: number | null;
}

export interface Student {
    id?: number;
    name: string;
    email: string;
    birthDate: string;
    course: Course;
    subjects: StudentSubject[];  
}



