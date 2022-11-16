import {User} from "../models/user.model";

export default class UserService {
    static DisplayInitials(user: User): string {
        return `${user.firstName.substring(0, 1)}${user.lastName.substring(0, 1)}`;
    }

    static DisplayFullName(user: User, withRole?: boolean): string {
        return `${user.firstName} ${user.lastName}`;
    }
}
