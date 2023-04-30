/*
 *  Copyright (c) TIKI Inc.
 *  MIT license. See LICENSE file in root directory.
 */

import { UsageRsp } from "./usage-rsp";
import { UsageRspApp } from "./usage-rsp-app";
import { ErrorRsp } from "../utils/error-rsp";

export { UsageRsp, UsageRspApp };

export class UsageRepository {
  host: string;

  constructor(host: string) {
    this.host = host;
  }

  async getUsage(
    accessToken?: string,
    month?: number,
    year?: number
  ): Promise<UsageRsp> {
    const now = new Date();
    if (month == null) month = now.getMonth();
    if (year == null) year = now.getFullYear();
    const response = await fetch(
      this.host + `/api/latest/usage?month=${month}&year=${year}`,
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
}
