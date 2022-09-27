import { sign } from "jsonwebtoken";
import type { JwtHeader } from "jsonwebtoken";
import { randomUUID } from "crypto";

// ENV Variables
const connectedAppClientId = "69cbbd39-32f4-4035-848e-2d22a9c349a0";
const connectedAppSecretId = "7d4ffeb3-6ff9-4e56-9e6e-963018f0f291";
const connectedAppSecretValue = "sDpIcz8HLOQ3Ou+HmQ9oo53BxyUsJmQkdrwk0H/+UWU=";

/**
 * How to encode? https://help.tableau.com/current/online/en-us/connected_apps.htm#jwt
 * How to troubleshoot? https://help.tableau.com/current/online/en-us/connected_apps_troubleshoot.htm
 * @param userName 
 * @returns 
 */
function getJWTToken(userName: string) {  
  const header: JwtHeader = {
    alg: "HS256",
    kid: connectedAppSecretId, // Tableau require it in header. Ref: https://help.tableau.com/current/online/en-us/connected_apps.htm
    // @ts-expect-error `iss` is needed as per Tableau docs but there is type mismatch as per `jsonwebtoken` library
    iss: connectedAppClientId
  };
  const token = sign(
    {
      scp: ["tableau:views:embed", "tableau:metrics:embed"],
    },
    connectedAppSecretValue,
    {
      audience: "tableau", // must be 'tableau'
      subject: userName, // Username in Tableau
      issuer: connectedAppClientId, // Tableau require it in header, but there is no attribute in header for 'issuer', so added here.
      jwtid: randomUUID(), // The JWT ID claim provides a unique identifier for the JWT
      expiresIn: 600, // 10 minutes (max limit set by Tableau)
      header,
    }
  );
  return token;
}

console.log(getJWTToken("mgoyal@manufacanalytics.com"));
