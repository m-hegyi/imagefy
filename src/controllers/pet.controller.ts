import { IUser } from "../models/user.models";
import Pet, { IPet } from "../models/pet.models";

interface ICreatePetInput {
  owner: IUser['id'];
  name: IPet['name']
};

async function CreatePet({owner, name}: ICreatePetInput): Promise<IPet> {
  return Pet.create({ name, owner })
    .then((pet) => {
      return pet;
    })
};

export default { CreatePet };