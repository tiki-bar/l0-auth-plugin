/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

export interface TokenRsp {
  access_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
  expires_in: number;
}
