# tableau-jwt

Generates JWT to be used by Tableau Embedding API v3 for embedding dashboards.

#### Usage

```ts
// NodeJS
import { getTableauToken } from "@manufac/tableau-jwt";

const token = getTableauToken("abc@xyz.com");
```

#### ENV Varaibles

Make sure to provide the following ENV variables before running the function:

```
CONNECTED_APP_CLIENT_ID="some-string"
CONNECTED_APP_SECRET_ID="some-other-string"
CONNECTED_APP_SECRET_VALUE="some-other-other-string"
```
