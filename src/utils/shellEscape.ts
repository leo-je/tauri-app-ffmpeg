export function escapeBashArg(value: string): string {
  return "'" + value.replace(/'/g, "'\\''") + "'";
}

export function escapePowerShellArg(value: string): string {
  return "'" + value.replace(/'/g, "''") + "'";
}
