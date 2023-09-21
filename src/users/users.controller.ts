import { Body, Controller, Delete, ForbiddenException, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { ListUsersDTO, UserDTO, UserGetOneDTO } from "./dto/users.dto";
import { UserEntity } from "./users.entity";
import { v4 as uuid } from "uuid";
import { UserServices } from "./users.services";
import { CompaniesServices } from "src/companies/companies.services";

@Controller('/users')
export class UserController {

    constructor (  private userServices: UserServices, private companyServices: CompaniesServices ) {}

    
    @Post()
    async createUser(@Body() data: UserDTO) {

        const userEntity = new UserEntity();
        userEntity.id = uuid();
        userEntity.first_name = data.first_name;
        userEntity.last_name = data.last_name;
        userEntity.email = data.email;
        userEntity.username = data.username;
        userEntity.password = data.password;
        userEntity.isAdmin = data.isAdmin;

        await this.userServices.save(userEntity);

        if(!data.isAdmin && data.matricula_company){

            const company = await this.companyServices.findMatricula(data.matricula_company);

            company.users.push(userEntity);

            await this.companyServices.save(company);

        }
        console.log(userEntity);

        return { status: "Criado com sucesso!", data: userEntity};
    }
    @Get(":id") // Captura o parâmetro 'id' da rota
    async getUser(@Param("id") id: string) {
        const user = await this.userServices.findOne(id);

        const userInfo = new UserGetOneDTO();
        userInfo.first_name = user.first_name;
        userInfo.last_name = user.last_name;
        userInfo.email = user.email;
        userInfo.username = user.username;
        userInfo.isAdmin = user.isAdmin;
        userInfo.company = user.company;

        if(!user) throw new NotFoundException("Usuário não encontrado.")
        
        return { status: "Retornado com sucesso!", data: userInfo};
    }

    @Get()
    async listValues() {
        const users = await this.userServices.list();
        const list = users.map((user) => new ListUsersDTO(
            user.id, 
            user.first_name,
            user.last_name,
            user.email,
            user.username,
            user.company,
            user.isAdmin
        ));

        return  {list};
    }

    // @Put('/:id') // Captura o parâmetro 'id' da rota
    // async updateValue(@Param('id') id: string, @Body() newData: ValueDevicesDTO) {
    //     const novoValor = await this.userServices.update(id, newData);
    //     return { status: "Alterado com sucesso!", data: novoValor };
    // }

    // @Delete('/:id') // Captura o parâmetro 'id' da rota
    // async deleteValue(@Param('id') id: string) {
    //     const deleteValor = await this.userServices.delete(id);
    //     return { status: "Deletado com sucesso!", data: deleteValor };
    // }

}