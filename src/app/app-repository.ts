/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { AppReqUpdate } from "./app-req-update";
import { AppRsp } from "./app-rsp";
import { ErrorRsp } from "../utils/error-rsp";

export { AppRsp, AppReqUpdate };

export class AppRepository {
  host: string;

  constructor(host: string) {
    this.host = host;
  }

  async createApp(req: AppReqUpdate, accessToken?: string): Promise<AppRsp> {
    const response = await fetch(this.host + "/api/latest/app", {
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

  async getApp(appId: string, accessToken?: string): Promise<AppRsp> {
    const response = await fetch(this.host + "/api/latest/app/" + appId, {
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

  async deleteApp(appId: string, accessToken?: string): Promise<void> {
    const response = await fetch(this.host + "/api/latest/app/" + appId, {
      method: "delete",
      headers: {
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

  async updateApp(
    appId: string,
    req: AppReqUpdate,
    accessToken?: string
  ): Promise<AppRsp> {
    const response = await fetch(this.host + "/api/latest/app/" + appId, {
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
