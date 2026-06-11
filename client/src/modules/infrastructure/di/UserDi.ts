import { CreateNewUserUc } from "../../application/User/CreateNewUserUc";
import { LoginUserUc } from "../../application/User/LoginUserUc";
import { UserApiRepository } from "../http/UserApiRepository";

// Repositories
const userRepository = new UserApiRepository();

// UseCases
const createNewUserUc = new CreateNewUserUc(userRepository);
const loginUserUc = new LoginUserUc(userRepository);

// exports
export { createNewUserUc, loginUserUc }