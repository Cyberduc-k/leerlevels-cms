export interface User {
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    userName: string,
    role: number,
}

export enum UserRole {
    Student,
    Teacher,
    Admin,
}