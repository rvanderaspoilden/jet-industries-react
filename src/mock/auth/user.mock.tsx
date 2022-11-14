import {User, UserRole} from "../../models/user.model";

const AdminUserMock: User = {
    email: "test@email.fr",
    password: "password",
    firstName: "John",
    lastName: "Doe",
    role: UserRole.ADMIN,
    uniqueId: "UUID"
}

export default AdminUserMock;