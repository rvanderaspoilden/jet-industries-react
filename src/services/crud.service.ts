import axios from "axios";

export class CrudService<Type> {
    baseUri: string;

    constructor(baseUri: string) {
        this.baseUri = baseUri;
    }

    retrieveAll<Type>(): Promise<Type[]> {
        return axios.get<Type[]>(`${process.env.REACT_APP_API_URI}${this.baseUri}`).then(res => res.data);
    }

    retrieveOne<Type>(id: string): Promise<Type> {
        return axios.get<Type>(`${process.env.REACT_APP_API_URI}${this.baseUri}/${id}`).then(res => res.data);
    }

    create<Type>(body: Type): Promise<Type> {
        return axios.post<Type>(`${process.env.REACT_APP_API_URI}${this.baseUri}`, body).then(res => res.data);
    }

    delete(id: string): Promise<Response> {
        return axios.delete(`${process.env.REACT_APP_API_URI}${this.baseUri}/${id}`);
    }

    update<Type>(id: string, body: Type): Promise<Type> {
        return axios.put<Type>(`${process.env.REACT_APP_API_URI}${this.baseUri}/${id}`, body).then(res => res.data);
    }
}
