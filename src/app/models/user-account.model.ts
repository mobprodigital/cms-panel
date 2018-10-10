
export class UserAccountModel {
    public firstName: string = "";
    public lastName: string = "";
    public email: string = "";
    public phone: string = "";
    public role: string = "";
    public id: string = ""

    /** Get full name of user */
    public get name(): string {
        return this.firstName + (this.lastName ? ' ' + this.lastName : '');
    }

}


