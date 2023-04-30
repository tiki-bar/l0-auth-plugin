/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { L0AuthConfig } from "./l0-auth-config";
import { AppRepository, AppReqUpdate, AppRsp } from "./app/app-repository";
import { OrgRepository, OrgRsp } from "./org/org-repository";
import { OtpRepository } from "./otp/otp-repository";
import { RefreshRepository } from "./refresh/refresh-repository";
import { UserRepository, UserReqUpdate, UserRsp } from "./user/user-repository";
import { ApiKeyRepository } from "./api-key/api-key-repository";
import { TokenRsp } from "./utils/token-rsp";
import { ApiKeyRsp } from "./api-key/api-key-rsp";
import { ApiKeySecretRsp } from "./api-key/api-key-secret-rsp";
import { OtpRsp } from "./otp/otp-rsp";
import * as LocalStore from "./utils/local-store";
import { UsageRepository, UsageRsp } from "./usage/usage-repository";

export { L0AuthConfig };

export class L0Auth {
  appRepository: AppRepository;
  orgRepository: OrgRepository;
  otpRepository: OtpRepository;
  refreshRepository: RefreshRepository;
  userRepository: UserRepository;
  apiKeyRepository: ApiKeyRepository;
  usageRepository: UsageRepository;

  constructor(config: L0AuthConfig) {
    this.appRepository = new AppRepository(config.host);
    this.orgRepository = new OrgRepository(config.host);
    this.otpRepository = new OtpRepository(config.host);
    this.refreshRepository = new RefreshRepository(config.host);
    this.userRepository = new UserRepository(config.host);
    this.apiKeyRepository = new ApiKeyRepository(config.host);
    this.usageRepository = new UsageRepository(config.host);
  }

  createApp = (req: AppReqUpdate, accessToken?: string): Promise<AppRsp> =>
    this.appRepository.createApp(req, accessToken);

  getApp = (appId: string, accessToken?: string): Promise<AppRsp> =>
    this.appRepository.getApp(appId, accessToken);

  updateApp = (
    appId: string,
    req: AppReqUpdate,
    accessToken?: string
  ): Promise<AppRsp> => this.appRepository.updateApp(appId, req, accessToken);

  deleteApp = (appId: string, accessToken?: string): Promise<void> =>
    this.appRepository.deleteApp(appId, accessToken);

  getOrg = (orgId: string, accessToken?: string): Promise<OrgRsp> =>
    this.orgRepository.getOrg(orgId, accessToken);

  getUser = (accessToken?: string): Promise<UserRsp> =>
    this.userRepository.getUser(accessToken);

  updateUser = (
    userId: string,
    req: UserReqUpdate,
    accessToken?: string
  ): Promise<UserRsp> =>
    this.userRepository.updateUser(userId, req, accessToken);

  createKey = (
    appId: string,
    isPublic: boolean,
    accessToken?: string
  ): Promise<ApiKeyRsp | ApiKeySecretRsp> =>
    this.apiKeyRepository.createKey(appId, isPublic, accessToken);

  getKeys = (appId: string, accessToken?: string): Promise<ApiKeyRsp[]> =>
    this.apiKeyRepository.getKeys(appId, accessToken);

  deleteKey = (keyId: string, accessToken?: string): Promise<void> =>
    this.apiKeyRepository.deleteKey(keyId, accessToken);

  refreshToken = (refreshToken: string): Promise<TokenRsp> =>
    this.refreshRepository.refresh(refreshToken);

  revokeToken = (refreshToken: string, accessToken?: string): Promise<void> =>
    this.refreshRepository.revoke(refreshToken, accessToken);

  async requestOtp(email: string): Promise<OtpRsp> {
    const rsp = await this.otpRepository.otp(email).catch((error) => {
      return Promise.reject(error);
    });
    LocalStore.save("otp", rsp);
    return rsp;
  }

  redeemOtp(code: string, scope: string): Promise<TokenRsp> {
    const otp = LocalStore.get<OtpRsp>("otp");
    if (otp != null) {
      return this.otpRepository.grant(code, otp.deviceId, scope);
    } else {
      return Promise.reject(Error("Missing OtpRsp from local storage"));
    }
  }

  getUsage = (
    accessToken?: string,
    month?: number,
    year?: number
  ): Promise<UsageRsp> =>
    this.usageRepository.getUsage(accessToken, month, year);
}
