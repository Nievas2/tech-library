import { BaseService } from "../../config/base.service";
import { LibraryEntity } from "../../library/entities/library.entity";
import { UserEntity } from "../../user/entities/user.entity";
import { LikeEntity } from "../entities/like.entity";
import { LikeErrorException } from "../exception/like.error";

export class LikeService extends BaseService<LikeEntity> {
  constructor() {
    super(LikeEntity);
  }

  public async userLikeThisLibrary(
    userId: number,
    libraryId: number
  ): Promise<boolean> {
    const like = await (await this.execRepository)
      .createQueryBuilder("like")
      .where("like.user = :userId", { userId: userId })
      .andWhere("like.library = :libraryId", { libraryId: libraryId })
      .getOne();

    return like != null ? like.liked : false;
  }

  public async likeLibrary(
    user: UserEntity,
    library: LibraryEntity
  ): Promise<void> {
    const like = await this.searchLikeUserInLibrary(user.id, library.id);
    if (like == null) {
        const newLike : LikeEntity = new LikeEntity(user, library);
        await (await this.execRepository).save(newLike);
    }

    if (like != null) {
      like.liked = true;
      await (await this.execRepository).update(like.id, like);
    }
  }

  public async unLikeLibrary(
    user: UserEntity,
    library: LibraryEntity
  ): Promise<void> {
    const isLiked = await this.searchLikeUserInLibrary(user.id, library.id);

    if (isLiked != null) {
      isLiked.liked = false;
      await (await this.execRepository).update(isLiked.id, isLiked);
    }

    if (isLiked == null) {
        throw new LikeErrorException("User not liked this library");
    }
    
  }

  private async searchLikeUserInLibrary(
    userId: number,
    libraryId: number
  ): Promise<LikeEntity | null> {
    const like = await (await this.execRepository)
      .createQueryBuilder("like")
      .where("like.user = :userId", { userId: userId })
      .andWhere("like.library = :libraryId", { libraryId: libraryId })
      .getOne();

    return like;
  }
}
