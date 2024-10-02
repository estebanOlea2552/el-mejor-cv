export interface PersonalInfo {
    name: string,
    lastname: string,
    jobPosition: string,
    email: string,
    phone: string,
    country: string,
    stateProvince: string,
    city: string,
    nationality: string,
    age: string
    professionalSummary: string,
}

export interface Education {
    grade: string,
    school: string,
    type: string,
    average: string,
    edInitMonth: string,
    edInitYear: string,
    edEndMonth: string,
    edEndYear: string,
    inCourse: string,
    description: string
}

export interface WorkExperience {
    position: string,
    organization: string,
    location: string;
    workingDay: string;
    wExpInitMonth: string,
    wExpInitYear: string,
    wExpEndMonth: string,
    wExpEndYear: string,
    inCourse: string,
    description: string
}

export interface Certification {
    title: string;
    institution: string
    average: string;
}

export interface Skill {
    skill: string;
    level: string;
}

export interface Language {
    language: string;
    level: string;
}

export interface VolunteerWork {
    position: string;
    organization: string;
    vWInitMonth: string;
    vWInitYear: string;
    vWEndMonth: string;
    vWEndYear: string;
    inCourse: string;
    description: string;
}

export interface Reference {
    name: string;
    organization: string;
    email: string;
    phone: string;
}

export interface Link {
    link: string;
}

export interface cvData {
    personalInfo: PersonalInfo,
    education: Education[],
    workExperience: WorkExperience[],
    certifications: Certification[],
    skills: Skill[],
    languages: Language[],
    volunteerWorks: VolunteerWork[],
    references: Reference[],
    links: Link[]
}