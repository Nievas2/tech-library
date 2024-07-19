export const formatGoogleUsername = (username: string): string => {
  const cleanedName = username.replace(/-\d+/, "")
  return cleanedName
}