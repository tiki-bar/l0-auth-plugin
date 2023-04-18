/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

export interface OrgRsp {
  orgId: string;
  billingId: string;
  users?: Array<string>;
  apps?: Array<string>;
  modified: Date;
  created: Date;
}
