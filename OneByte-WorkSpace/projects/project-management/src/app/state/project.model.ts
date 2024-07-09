export interface Project {
    id: any;
    projectId: number;
    name: string;
    duration: string;
    front_end: string;
    back_end: string;
    start_date:Date;
    end_date:Date;
    employees: number[]; // Array of employee IDs
}