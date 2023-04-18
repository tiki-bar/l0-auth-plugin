/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

export interface UserRsp {
  userId: string;
  email: string;
  orgId: string;
  modified: Date;
  created: Date;
}
