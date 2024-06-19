import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
// import { UserNotFoundException } from "../../user/exceptions/user.notfound.exception";
// import { UserService } from "../../user/services/user.service";
import {  LibraryUpdateDTO } from "../entities/library.dto";
import { LibraryEntity } from "../entities/library.entity";

export class LibraryService extends BaseService<LibraryEntity> {
  constructor(
    // private readonly userService: UserService = new UserService(),
  ) {
    super(LibraryEntity);
  }

  async findAll(): Promise<LibraryEntity[]> {
    return (await this.execRepository).find();
  }

  async findAllActive(): Promise<LibraryEntity[]> {
    return (await this.execRepository).find({
      where: {
        isActive: true,
      },
    });
  }

  async findById(id: number): Promise<LibraryEntity | null> {
    return (await this.execRepository).findOneBy({ id: id });
  }


  async findByIdActive(id: number): Promise<LibraryEntity | null> {
    return (await this.execRepository).findOneBy({ id: id, isActive: true });
  }


//   async create(library: LibraryCreateDTO, idUsuario: number): Promise<LibraryEntity> {
//     const user = await this.userService.findById(idUsuario);

//     if (!user) {
//       throw new UserNotFoundException("User not found");
//     }

//     return (await this.execRepository).save(library);
//   }
  async update(id: number, library: LibraryUpdateDTO): Promise<UpdateResult> {
    return (await this.execRepository).update(id, library);
  }

  async restore(id: number): Promise<UpdateResult> {
    return (await this.execRepository).update(id, { isActive: true });
  }

  async deleteLogic(id: number): Promise<UpdateResult> {
    return (await this.execRepository).update(id, { isActive: false });
  }
  
  async delete(id: number): Promise<DeleteResult> {
    return (await this.execRepository).delete(id);
  }
}
