export class CrudService<Type> {
    baseUri: string;

    constructor(baseUri: string) {
        this.baseUri = baseUri;
    }

    retrieveAll<Type>(): Promise<Type[]> {
        return fetch(`${process.env.REACT_APP_API_URI}${this.baseUri}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res);
        });
    }

    retrieveOne<Type>(id: string): Promise<Type> {
        return fetch(`${process.env.REACT_APP_API_URI}${this.baseUri}/${id}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res);
        });
    }

    create<Type>(body: Type): Promise<Type> {
        return fetch(`${process.env.REACT_APP_API_URI}${this.baseUri}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res);
        });
    }

    delete<Type>(id: string): Promise<Response> {
        return fetch(`${process.env.REACT_APP_API_URI}${this.baseUri}/${id}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
    }

    update<Type>(body: Type): Promise<Type> {
        return fetch(`${process.env.REACT_APP_API_URI}${this.baseUri}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res);
        });
    }
}
