export default class StudentRequest {
    requestid: number;
    authorfirst: string; 
    authorlast: string; 
    datesubmitted: number;
    dateresolved: number;
    description: string;
    resolverfirst: string;
    resolverlast: string;
    status: string; 
    type: string;
    imageurl: string;

    constructor(requestid: number, authorfirst: string, authorlast: string, datesubmitted: number, dateresolved: number, 
        description: string, resolverfirst: string, resolverlast: string, status: string, type: string, imageurl: string) {
        this.requestid = requestid;
        this.authorfirst = authorfirst;
        this.authorlast = authorlast;
        this.datesubmitted = datesubmitted;
        this.dateresolved = dateresolved;
        this.description = description;
        this.resolverfirst = resolverfirst;
        this.resolverlast = resolverlast;
        this.status = status;
        this.type = type;
        this.imageurl = imageurl;
    }
}