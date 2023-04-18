/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { OtpReq } from "./otp-req";
import { OtpRsp } from "./otp-rsp";
import { TokenRsp } from "../utils/token-rsp";
import { ErrorRsp } from "../utils/error-rsp";

export class OtpRepository {
  host: string;

  constructor(host: string) {
    this.host = host;
  }

  async otp(email: string): Promise<OtpRsp> {
    const req: OtpReq = {
      email,
      notAnonymous: true,
    };
    const response = await fetch(this.host + "/api/latest/otp/start", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
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

  async grant(
    code: string,
    deviceId: string,
    scope: string
  ): Promise<TokenRsp> {
    const response = await fetch(this.host + "/api/latest/oauth/token", {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        grant_type: "password",
        scope,
        username: deviceId,
        password: code,
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
}
