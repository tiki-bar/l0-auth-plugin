/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

export interface ErrorRsp {
  status: number;
  statusText: string;
  id?: string;
  message?: string;
  detail?: string;
  help?: string;
  properties?: Map<string, string>;
}
