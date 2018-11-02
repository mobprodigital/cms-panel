import { UserRole } from "../enums/user-roles.enum";

export class UserRoleModel {
    constructor(public roleId: string, public roleName: UserRole) { }
}