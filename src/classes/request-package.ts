export default class RequestPackage {
    requestid: number; // Update
    author: number;  // Update
    datesubmitted: Date; // Update
    description: string; // Update and Add
    status: number;  // Update
    type: number; // Update and Add
    imageurl: string; // Update

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