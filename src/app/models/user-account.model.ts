import { UserRoleModel } from "./user-role.model";
import { ClientModel } from "./client.model";

export class UserAccountModel {
    public firstName: string = "";
    public lastName: string = "";
    public email: string = "";
    public phone: string = "";
    public role: UserRoleModel;
    public userId: string = "";
    public clientId: string = "";
    public clientInfo : ClientModel = new ClientModel();
    public assignedPortals: string[] = [];
    public address: string = '';


    /** Full name of user */
    public get fullName(): string {
        return this.firstName + (this.lastName ? ' ' + this.lastName : '');
    }

}


