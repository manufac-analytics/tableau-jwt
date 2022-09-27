import { sign } from "jsonwebtoken";
import { randomUUID } from "crypto";

function getJWTToken(userName: string) {
  const clientID = "";
  const secretID = "";
  const token = sign(
    {
      /**
       * Added scopes that were present in the reference documentation.
       * Don't know much about what permissions they allow.
       */
      scope: ["tableau:views:embed", "tableau:metrics:embed"],
    },
    secretID,
    {
      issuer: clientID, // Tableau require it in header, but there is no attribute in header for 'issuer', so added here.
      subject: userName, // Username in Tableau
      audience: "tableau", // must be 'tableau'
      jwtid: randomUUID(), // The JWT ID claim provides a unique identifier for the JWT
      expiresIn: 3600, // 1 hour
      header: {
        alg: "HS256",
        kid: secretID, // Tableau require it in header. Ref: https://help.tableau.com/current/online/en-us/connected_apps.htm
      },
    }
  );
  return token;
}

getJWTToken("");
