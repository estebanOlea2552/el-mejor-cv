/* These interfaces need revision
They are limited for all the cases 
and users who want to make their
personal curriculum */

export interface AcademicBackground {
    grade: string,
    school: string,
    aBInitDate: string,
    aBEndDate: string,
    description: string
}

export interface WorkExperience {
    position: string,
    company: string,
    wExpInitDate: string,
    wExpEndDate: string,
    description: string
}

export interface cvData {
    name: string,
    lastname: string,
    jobPosition: string,
    aboutMe: string,
    academicBackground: AcademicBackground[],
    workExperience: WorkExperience[],
    skills: string[]
}