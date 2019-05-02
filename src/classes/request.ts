export default class StudentRequest {
    requestid: number;
    authorid: number;
    authorfirst: string; 
    authorlast: string; 
    datesubmitted: Date;
    dateresolved: Date;
    description: string;
    resolverfirst: string;
    resolverlast: string;
    status: string; 
    type: string;
    imageurl: string;

    constructor(requestid: number, authorid: number, authorfirst: string, authorlast: string, datesubmitted: Date, dateresolved: Date, 
        description: string, resolverfirst: string, resolverlast: string, status: string, type: string, imageurl: string) {
        this.requestid = requestid;
        this.authorid = authorid;
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