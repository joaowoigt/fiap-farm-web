/**
 * Implementação melhorada do UserRepository usando abstrações
 * Segue os princípios SOLID e Clean Architecture
 */

import { UserRepository } from "../../domain/repositories/user-repository";
import { DatabaseService } from "../../domain/services/DatabaseService";
import {
  Result,
  Success,
  Failure,
  ValidationError,
  DatabaseError,
} from "../../domain/common/Result";
import { UserId } from "../../domain/valueObjects/ValueObjects";
import User from "../../domain/models/farm/user/User";
import { mapUser } from "../../domain/mappers/farm/UserMapper";
import UserResponse from "../responses/farm/user/UserResponse";

export class ImprovedUserRepository implements UserRepository {
  constructor(private databaseService: DatabaseService) {}

  async getUserByUid(uid: string): Promise<Result<User>> {
    try {
      // Validação usando Value Object
      const userId = new UserId(uid);

      const userResult = await this.databaseService.getDocument<UserResponse>(
        "users",
        userId.getValue()
      );

      if (userResult.isFailure) {
        // Se usuário não existe, criar um novo
        if (userResult.error.name === "NotFoundError") {
          return this.createNewUser(userId.getValue());
        }
        return userResult;
      }

      const userData = userResult.value;
      const mappedUser = mapUser(userData);

      return Success.create(mappedUser);
    } catch (error) {
      if (error instanceof ValidationError) {
        return Failure.create(error);
      }
      console.error("Erro ao buscar usuário:", error);
      return Failure.create(
        new DatabaseError("Falha ao buscar dados do usuário")
      );
    }
  }

  private async createNewUser(userId: string): Promise<Result<User>> {
    try {
      const emptyUser: UserResponse = {
        sales: [],
        production: [],
        goals: {
          productionGoals: [],
          salesGoals: [],
        },
      };

      const saveResult = await this.databaseService.setDocument(
        "users",
        userId,
        emptyUser
      );

      if (saveResult.isFailure) {
        return Failure.create(saveResult.error);
      }

      return Success.create(mapUser(emptyUser));
    } catch (error) {
      console.error("Erro ao criar novo usuário:", error);
      return Failure.create(new DatabaseError("Falha ao criar novo usuário"));
    }
  }
}
