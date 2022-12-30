export interface Group {
    id: string,
    name: string,
    subject: string,
    educationType: EducationType,
    schoolYear: SchoolYear,
    isNew: boolean,
}

export enum EducationType {
    Havo,
    Mavo,
    Mbo,
    Hbo,
    Basisschool,
    Bijles,
    Vmbo,
    Vwo,
    Universiteit,
    Overig,
}

export enum SchoolYear {
    One,
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine
}