/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { OrgRsp } from "./org-rsp";
import { ErrorRsp } from "../utils/error-rsp";

export { OrgRsp };

export class OrgRepository {
  host: string;

  constructor(host: string) {
    this.host = host;
  }

  async getOrg(orgId: string, accessToken?: string): Promise<OrgRsp> {
    const response = await fetch(this.host + "/api/latest/org/" + orgId, {
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
}
