/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { TokenRsp } from "../utils/token-rsp";
import { ErrorRsp } from "../utils/error-rsp";

export class RefreshRepository {
  host: string;

  constructor(host: string) {
    this.host = host;
  }

  async refresh(refreshToken: string): Promise<TokenRsp> {
    const response = await fetch(this.host + "/api/latest/oauth/token", {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        grant_type: "password",
        refresh_token: refreshToken,
      }),
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

  async revoke(refreshToken: string, accessToken?: string): Promise<void> {
    const response = await fetch(this.host + "/api/latest/oauth/revoke", {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: new URLSearchParams({
        token: refreshToken,
      }),
    }).catch((error) => {
      return Promise.reject(error);
    });
    if (!response.ok) {
      const error: ErrorRsp = await response.json();
      return Promise.reject(error);
    }
  }
}
