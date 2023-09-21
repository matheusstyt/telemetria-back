import { Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./users.entity";
import { UserDTO } from "./dto/users.dto";

@Injectable()
export class UserServices {
    constructor (
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async save(value : UserEntity) {
        await this.userRepository.save(value);
    }

    async findOne(id : string): Promise<UserEntity | undefined> {
        return this.userRepository.findOne({where: { id }, relations:[ "company" ]});
    }
    async findUserName(username : string): Promise<UserEntity | undefined> {
        return this.userRepository.findOne({where: { username }, relations:[ "company" ]});
    }

    async list() {
        const users = await this.userRepository.find();
        return users;
    }

    async update(id: string, newData: UserDTO){
        await this.userRepository.update(id, newData);
    }

    async delete(id: string) {
        await this.userRepository.delete(id);
    }
}