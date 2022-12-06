export interface User {
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    userName: string,
    role: number,
    
    isNew: boolean,
}

export enum UserRole {
    Student,
    Teacher,
    Admin,
}