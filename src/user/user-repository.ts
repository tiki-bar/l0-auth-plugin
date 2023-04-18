/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { UserRsp } from "./user-rsp";
import { UserReqUpdate } from "./user-req-update";
import { ErrorRsp } from "../utils/error-rsp";

export { UserRsp, UserReqUpdate };

export class UserRepository {
  host: string;

  constructor(host: string) {
    this.host = host;
  }

  async getUser(accessToken?: string): Promise<UserRsp> {
    const response = await fetch(this.host + "/api/latest/user", {
      method: "get",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + accessToken,
      },
    }).catch((error) => {
      return Promise.reject(error);
    });
    if (response.ok) {
      return await response.json();
    } else {
      const error: ErrorRsp = await response.json();
      return Promise.reject(error);
    }
  }

  async updateUser(
    userId: string,
    req: UserReqUpdate,
    accessToken?: string
  ): Promise<UserRsp> {
    const response = await fetch(this.host + "/api/latest/user/" + userId, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify(req),
    }).catch((error) => {
      return Promise.reject(error);
    });
    if (response.ok) {
      return await response.json();
    } else {
      const error: ErrorRsp = await response.json();
      return Promise.reject(error);
    }
  }
}
