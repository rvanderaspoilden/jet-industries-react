import UserService from "../services/user.service";
import AdminUserMock from "../mock/auth/user.mock";

describe("Test of User Service", () => {
    test('Should display fullname of a user', () => {
        expect(UserService.DisplayFullName(AdminUserMock)).toEqual("John Doe");
    });

    test('Should display initials of a user', () => {
        expect(UserService.DisplayInitials(AdminUserMock)).toEqual("JD");
    });
})
