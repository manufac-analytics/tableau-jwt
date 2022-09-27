import { sign } from "jsonwebtoken";
import type { JwtHeader } from "jsonwebtoken";
import { randomUUID } from "crypto";

/**
 * How to encode? https://help.tableau.com/current/online/en-us/connected_apps.htm#jwt
 * How to troubleshoot? https://help.tableau.com/current/online/en-us/connected_apps_troubleshoot.htm
 * @param userName
 * @returns
 */
export function getTableauToken(userName: string) {
  const header: JwtHeader = {
    alg: "HS256",
    kid: process.env.CONNECTED_APP_SECRET_ID, // Tableau require it in header. Ref: https://help.tableau.com/current/online/en-us/connected_apps.htm
    // @ts-expect-error `iss` is needed as per Tableau docs but there is type mismatch as per `jsonwebtoken` library
    iss: process.env.CONNECTED_APP_CLIENT_ID,
  };
  const token = sign(
    {
      scp: ["tableau:views:embed", "tableau:metrics:embed"],
    },
    process.env.CONNECTED_APP_SECRET_VALUE ?? "",
    {
      audience: "tableau", // must be 'tableau'
      subject: userName, // Username in Tableau
      issuer: process.env.CONNECTED_APP_CLIENT_ID, // Tableau require it in header, but there is no attribute in header for 'issuer', so added here.
      jwtid: randomUUID(), // The JWT ID claim provides a unique identifier for the JWT
      expiresIn: 600, // 10 minutes (max limit set by Tableau)
      header,
    }
  );
  return token;
}
