export class ClientModel {
    public firstName: string = "";
    public lastName: string = "";
    public id: string = "";
    public email: string = "";
    public password: string = "";
    public agreemtnTenure: number = 0;
    public portalAssigned: number[] = [];
    public address: string = "";


    public get name(): string {
        return this.firstName + (this.lastName ? ' ' + this.lastName : '');
    }


}