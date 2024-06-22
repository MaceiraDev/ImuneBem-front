import { IUser } from "./IUser";

// Tipagem para as props do componente Users
export interface UsersProps extends IUser {
    users: IUser[]; // Array de usuários
    token: string;
}
