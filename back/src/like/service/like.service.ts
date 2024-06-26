import { BaseService } from "../../config/base.service";
import { LibraryEntity } from "../../library/entities/library.entity";
import { UserEntity } from "../../user/entities/user.entity";
import { LikeEntity } from "../entities/like.entity";
import { LikeAlreadyExistsException } from "../exception/like.already.exists";
import { LikeErrorException } from "../exception/like.error";

/**
 * @version 1.0.0
 * @author Emiliano Gonzalez
 * @class LikeService
 * @description Clase que se encarga de dar y quitar like a una libreria
 * @method likeLibrary - Método que se encarga de dar like a una libreria
 * @method unLikeLibrary - Método que se encarga de quitar like a una libreria
 * @method userLikeThisLibrary - Método que se encarga de verificar si un usuario ha dado like a una libreria
 * @method searchLikeUserInLibrary - Método que se encarga de buscar un like de un usuario en una libreria
 *
 */
export class LikeService extends BaseService<LikeEntity> {
  constructor() {
    super(LikeEntity);
  }

  /**
   * @description Método que se encarga de verificar si un usuario ha dado like a una libreria
   * @param userId - Id del usuario
   * @param libraryId - Id de la libreria
   * @returns Promise<boolean> - Retorna true si el usuario ha dado like a la libreria, false en caso contrario
   */
  public async userLikeThisLibrary(
    userId: number,
    libraryId: number
  ): Promise<boolean> {
    if (userId == 0) return false;
    const like = await (
      await this.execRepository
    ).findOne({
      where: { user: { id: userId }, library: { id: libraryId } },
    });

    return like != null ? like.liked : false;
  }

  /**
   * @description Método que se encarga de dar like a una libreria
   * @param user - Usuario que ha dado like
   * @param library - Libreria que ha dado like
   * @returns Promise<void>
   */
  public async likeLibrary(
    user: UserEntity,
    library: LibraryEntity
  ): Promise<LibraryEntity> {
    try {
      const like = await this.searchLikeUserInLibrary(user.id, library.id);
      if (like.liked) {
        throw new LikeAlreadyExistsException("User already liked this library");
      }
      like.liked = true;
      library.likesCount++;
      await (await this.execRepository).update(like.id, like);
      return library;
    } catch (error) {
      if (error instanceof LikeErrorException) {
        const newLike: LikeEntity = new LikeEntity(user, library);
        await (await this.execRepository).save(newLike);
        library.likesCount++;
        return library;
      }

      if (error instanceof LikeAlreadyExistsException) {
        throw error;
      }
    }
    return library;
  }

  /**
   * @description Método que se encarga de quitar like a una libreria
   * @param user - Usuario que ha dado like
   * @param library - Libreria que se le quita un like
   * @returns Promise<void>
   * @throws {LikeErrorException}
   *
   */
  public async unLikeLibrary(
    user: UserEntity,
    library: LibraryEntity
  ): Promise<LibraryEntity> {
    const likeEntity: LikeEntity = await this.searchLikeUserInLibrary(
      user.id,
      library.id
    );

    if (likeEntity.liked) {
      likeEntity.liked = false;
      library.likesCount--;
      await (await this.execRepository).update(likeEntity.id, likeEntity);
      return library;
    }

    throw new LikeErrorException("User not liked this library");
  }

  /**
   * @description Método que se encarga de buscar un like de un usuario en una libreria
   * @param userId - Id del usuario
   * @param libraryId - Id de la libreria
   * @returns Promise<LikeEntity>
   * @throws {LikeErrorException} - Error si el usuario no ha dado like a la libreria
   */
  private async searchLikeUserInLibrary(
    userId: number,
    libraryId: number
  ): Promise<LikeEntity> {
    const like = await (await this.execRepository)
      .createQueryBuilder("like")
      .where("like.user = :userId", { userId: userId })
      .andWhere("like.library = :libraryId", { libraryId: libraryId })
      .getOne();

    if (like == null) throw new LikeErrorException("User like does not exist");
    return like;
  }
}
