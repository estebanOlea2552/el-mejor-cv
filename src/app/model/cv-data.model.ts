export interface AcademicBackground {
    grade: string;
    school: string;
    academicBackgroundInitDate: string,
    academicBackgroundEndDate: string,
    description: string;
}

export interface WorkExperience {
    position: string;
    company: string;
    workExperienceInitDate: string,
    workExperienceEndDate: string,
    description: string;
}

export interface cvData {
    name: string;
    lastname: string;
    jobPosition: string;
    aboutMe: string;
    academicBackground: AcademicBackground[];
    workExperience: WorkExperience[];
    skills: string[];
}