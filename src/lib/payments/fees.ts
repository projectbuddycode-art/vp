export const DEFAULT_VISIT_FEE = 10000;
export const DEFAULT_VISIT_TOKEN = 1000;
export const PHONE_FEE = 1000;
export const PHONE_TOKEN = 250;

export type FeeSplit = {
  total: number;
  token: number;
  remaining: number;
};

export function splitFee(total: number, token: number): FeeSplit {
  const safeTotal = Math.max(0, Math.round(Number(total) || 0));
  const requested = Math.max(0, Math.round(Number(token) || 0));
  const safeToken = Math.min(safeTotal, requested);
  return { total: safeTotal, token: safeToken, remaining: safeTotal - safeToken };
}

export function visitFees(total = DEFAULT_VISIT_FEE, token = DEFAULT_VISIT_TOKEN) {
  return splitFee(total, token);
}

export function phoneFees() {
  return splitFee(PHONE_FEE, PHONE_TOKEN);
}
