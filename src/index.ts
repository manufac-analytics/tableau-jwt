import { sign } from "jsonwebtoken";
import type { JwtHeader } from "jsonwebtoken";
import { randomUUID } from "crypto";

function getJWTToken(userName: string) {
  const connectedAppClientId = "clientID";
  const connectedAppSecretId = "secretID";
  const connectedAppSecretValue = "secretValue";
  
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
      expiresIn: 3600, // 1 hour
      header,
    }
  );
  return token;
}

console.log(getJWTToken(""));
