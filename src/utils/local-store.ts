/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

export function save(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function get<T>(key: string): T | undefined {
  const value = localStorage.getItem(key);
  return value != null ? JSON.parse(value) : undefined;
}
