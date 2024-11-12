export interface Task {
    _id:           string;
    title:         string;
    description:   string;
    state:         string;
    assigned_user: string;
    createdAt:     Date;
    updatedAt:     Date;
    __v:           number;
}

