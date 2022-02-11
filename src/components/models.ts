export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Job {
  title: string,
  location: string,
  salary: number,
  id: string
}

// union type
export type OrderTerm = 'location' | 'title' | 'salary'

// union type = function takes an array or string
// the object passed through as a parameter should either be an arr or str

/*
function getlength(obj: string | string[]){
  return obj.length
}
*/
