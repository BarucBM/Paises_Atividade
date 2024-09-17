export interface ApiResponse<T> {
    message?: string;
    data: T;
  }

export interface Post{
    id: number,

    title:string,

    category:string,

    descriptions:string,

    imageUrl:string, 

    createdAt: Date
}