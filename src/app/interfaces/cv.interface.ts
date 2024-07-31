export interface AcademicBackgroundI {
    grade: string;
    school: string;
    academicBackgroundInitDate: string,
    academicBackgroundEndDate: string,
    description: string;
}

export interface WorkExperienceI {
    position: string;
    company: string;
    workExperienceInitDate: string,
    workExperienceEndDate: string,
    description: string;
}

export interface WorkerI {
    name: string;
    lastname: string;
    jobPosition: string;
    aboutMe: string;
    academicBackground: AcademicBackgroundI[];
    workExperience: WorkExperienceI[];
    skills: string[];
}