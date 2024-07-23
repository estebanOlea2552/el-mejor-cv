export interface AcademicBackgroundI {
    title: string;
    school: string;
    date: string;
    description: string;
}

export interface WorkExperienceI {
    position: string;
    company: string;
    date: string;
    description: string;
}

export interface WorkerI {
    name: string;
    lastname: string;
    jobPosition: string;
    aboutMe: string;
    academicBackground: AcademicBackgroundI;
    workExperience: WorkExperienceI;
    skills: string;
}