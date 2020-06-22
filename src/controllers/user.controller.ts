import User, { IUser } from "../models/user.models";

interface ICreateUserInput {
  email: IUser['email'];
  firstName: IUser['firstName'];
  lastName: IUser['lastName'];
};

async function CreateUser({email, firstName, lastName} : ICreateUserInput): Promise<IUser> {
  return User.create({
    email,
    firstName,
    lastName
  }).then((data) => {
    return data;
  })
};

export default { CreateUser };