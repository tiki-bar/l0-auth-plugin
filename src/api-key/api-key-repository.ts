/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { ApiKeyRsp } from "./api-key-rsp";
import { ApiKeySecretRsp } from "./api-key-secret-rsp";
import { ErrorRsp } from "../utils/error-rsp";

export { ApiKeyRsp, ApiKeySecretRsp };

export class ApiKeyRepository {
  host: string;

  constructor(host: string) {
    this.host = host;
  }

  async createKey(
    appId: string,
    isPublic: boolean,
    accessToken?: string
  ): Promise<ApiKeyRsp | ApiKeySecretRsp> {
    const response = await fetch(
      this.host + "/api/latest/app/" + appId + "/key",
      {
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          Authorization: "Bearer " + accessToken,
        },
        body: new URLSearchParams({
          isPublic: String(isPublic),
        }),
      }
    ).catch((error) => {
      return Promise.reject(error);
    });
    if (response.ok) {
      return await response.json();
    } else {
      const error: ErrorRsp = await response.json();
      return Promise.reject(error);
    }
  }

  async getKeys(appId: string, accessToken?: string): Promise<ApiKeyRsp[]> {
    const response = await fetch(
      this.host + "/api/latest/app/" + appId + "/key",
      {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    ).catch((error) => {
      return Promise.reject(error);
    });
    if (response.ok) {
      return await response.json();
    } else {
      const error: ErrorRsp = await response.json();
      return Promise.reject(error);
    }
  }

  async deleteKey(keyId: string, accessToken?: string): Promise<void> {
    const response = await fetch(this.host + "/api/latest/key/" + keyId, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + accessToken,
      },
    }).catch((error) => {
      return Promise.reject(error);
    });
    if (!response.ok) {
      const error: ErrorRsp = await response.json();
      return Promise.reject(error);
    }
  }
}
