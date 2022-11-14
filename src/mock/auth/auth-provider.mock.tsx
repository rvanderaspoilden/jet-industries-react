import {User} from "../../models/user.model";
import UserMock from "./user.mock";

const authProviderMock = {
    isAuthenticated: false,
    signIn(email: string, password: string, callback: (user: User) => void) {
        this.isAuthenticated = true;

        setTimeout(() => {
            callback(UserMock)
        }, 100); // Fake async
    },
    signUp(callback: (success: boolean) => void) {
        this.isAuthenticated = true;

        setTimeout(() => {
            callback(true)
        }, 100); // Fake async
    },
    signOut(callback: VoidFunction) {
        this.isAuthenticated = false;
        setTimeout(callback, 100); // Fake async
    }
}

export default authProviderMock;