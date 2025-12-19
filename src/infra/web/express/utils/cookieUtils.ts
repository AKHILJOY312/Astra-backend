import { Response } from "express";
import { REFRESH_TOKEN_COOKIE_CONFIG } from "@/config/cookie.config";

const { name, options } = REFRESH_TOKEN_COOKIE_CONFIG;

const setOptions = options;

const clearOptions = {
  path: options.path,
};

export function setRefreshTokenCookie(res: Response, token: string): void {
  res.cookie(name, token, setOptions);
}

export function clearRefreshTokenCookie(res: Response): void {
  res.clearCookie(name, clearOptions);
}
