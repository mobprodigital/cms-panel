import { NavMenuItem } from "./nav-menu-item.model";

export class NavMenu {
    constructor(
        public name: string = "",
        public menuItems: NavMenuItem[] = [],
        public icon?: string
    ) { }

}