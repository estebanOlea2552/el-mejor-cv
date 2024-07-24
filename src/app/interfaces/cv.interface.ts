export interface AcademicBackgroundI {
    title: string;
    school: string;
    AcademicBackgroundInitDate: string,
    AcademicBackgroundEndDate: string,
    description: string;
}

export interface WorkExperienceI {
    position: string;
    company: string;
    WorkExperienceInitDate: string,
    WorkExperienceEndDate: string,
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