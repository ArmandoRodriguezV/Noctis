import { CreateNewUserUc } from "../../application/User/CreateNewUserUc";
import { UserApiRepository } from "../http/UserApiRepository";

// Repositories
const userRepository = new UserApiRepository();

// UseCases
const createNewUserUc = new CreateNewUserUc(userRepository);

// exports
export { createNewUserUc }