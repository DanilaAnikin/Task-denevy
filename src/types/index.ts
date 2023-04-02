export interface Todo {
    id: number,
    name: string,
    description: string,
    category: Category
}
export enum Category{
    NONE = 'None',
    GENERAL = 'General',
    IMPORTANT = 'Important',
    FAMILY = 'Family',
    WORK = 'Work'
}

export type CreateTodo = Pick<Todo, 'name'|'description'|'category'> & {id?: number}

export const categories: Category[] = [Category.GENERAL, Category.IMPORTANT, Category.FAMILY, Category.WORK]
