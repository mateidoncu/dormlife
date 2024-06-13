export type User = {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    about: string | null;
    _createdAt: string;
    faculty: string | null;
    yearOfStudy: number;
  };