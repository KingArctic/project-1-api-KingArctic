export default class Role {
    roleId: number; // primary key
    role: string; // not null, unique

    constructor(roleId: number = -1, role: string = `No Role`) {
        this.roleId = roleId;
        this.role = role;
    }
}