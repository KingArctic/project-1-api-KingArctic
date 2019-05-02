export default class RequestPackage {
    requestid: number;
    author: number;
    datesubmitted: Date;
    description: string;
    status: number; 
    type: number;
    imageurl: string;

    constructor(requestid: number, author: number, datesubmitted: Date, description: string, status: number, type: number, imageurl: string) {
        this.requestid = requestid;
        this.author = author;
        this.datesubmitted = datesubmitted;
        this.description = description;
        this.status = status;
        this.type = type;
        this.imageurl = imageurl;
    }
}