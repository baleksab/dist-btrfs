---
title: Btrfs Backup System API v1.0.0
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="btrfs-backup-system-api">Btrfs Backup System API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

API documentation

<h1 id="btrfs-backup-system-api-remoteservers">RemoteServers</h1>

## post__api_servers

> Code samples

```shell
# You can also use wget
curl -X POST /api/servers \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /api/servers HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "name": "string",
  "ipAddress": "string",
  "port": 22,
  "username": "string",
  "password": "string",
  "isPrimary": false
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/servers',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post '/api/servers',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('/api/servers', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','/api/servers', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/api/servers");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/api/servers", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/servers`

Add a new remote server configuration. Request body must conform to the server creation schema; returns the created server object on success.

> Body parameter

```json
{
  "name": "string",
  "ipAddress": "string",
  "port": 22,
  "username": "string",
  "password": "string",
  "isPrimary": false
}
```

<h3 id="post__api_servers-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CreateNewServerRequest](#schemacreatenewserverrequest)|false|none|

> Example responses

> 200 Response

```json
{
  "uid": "string",
  "ipAddress": "string",
  "port": 22,
  "isPrimary": false
}
```

<h3 id="post__api_servers-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|[CreateNewServerResponse](#schemacreatenewserverresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## get__api_servers

> Code samples

```shell
# You can also use wget
curl -X GET /api/servers \
  -H 'Accept: application/json'

```

```http
GET /api/servers HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/servers',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/api/servers',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/servers', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','/api/servers', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/api/servers");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/api/servers", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/servers`

Return a list of configured remote servers and their connection metadata.

> Example responses

> 200 Response

```json
[
  {
    "uid": "string",
    "name": "string",
    "ipAddress": "string",
    "port": 22,
    "isPrimary": false
  }
]
```

<h3 id="get__api_servers-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|[GetAllServersResponse](#schemagetallserversresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## delete__api_servers_{uid}

> Code samples

```shell
# You can also use wget
curl -X DELETE /api/servers/{uid}

```

```http
DELETE /api/servers/{uid} HTTP/1.1

```

```javascript

fetch('/api/servers/{uid}',
{
  method: 'DELETE'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.delete '/api/servers/{uid}',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.delete('/api/servers/{uid}')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','/api/servers/{uid}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/api/servers/{uid}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "/api/servers/{uid}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /api/servers/{uid}`

Remove the remote server identified by `uid` from the system and delete its stored configuration.

<h3 id="delete__api_servers_{uid}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|uid|path|string|true|none|

<h3 id="delete__api_servers_{uid}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## put__api_servers_{uid}

> Code samples

```shell
# You can also use wget
curl -X PUT /api/servers/{uid} \
  -H 'Content-Type: application/json'

```

```http
PUT /api/servers/{uid} HTTP/1.1

Content-Type: application/json

```

```javascript
const inputBody = '{
  "name": "string",
  "ipAddress": "string",
  "port": 22,
  "username": "string",
  "password": "string",
  "isPrimary": false
}';
const headers = {
  'Content-Type':'application/json'
};

fetch('/api/servers/{uid}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json'
}

result = RestClient.put '/api/servers/{uid}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.put('/api/servers/{uid}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','/api/servers/{uid}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/api/servers/{uid}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "/api/servers/{uid}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /api/servers/{uid}`

Update the configuration of an existing remote server identified by `uid`. Request body must match the update schema.

> Body parameter

```json
{
  "name": "string",
  "ipAddress": "string",
  "port": 22,
  "username": "string",
  "password": "string",
  "isPrimary": false
}
```

<h3 id="put__api_servers_{uid}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|uid|path|string|true|none|
|body|body|[UpdateServerRequest](#schemaupdateserverrequest)|false|none|

<h3 id="put__api_servers_{uid}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## get__api_servers_healthCheck

> Code samples

```shell
# You can also use wget
curl -X GET /api/servers/healthCheck \
  -H 'Accept: application/json'

```

```http
GET /api/servers/healthCheck HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/servers/healthCheck',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/api/servers/healthCheck',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/servers/healthCheck', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','/api/servers/healthCheck', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/api/servers/healthCheck");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/api/servers/healthCheck", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/servers/healthCheck`

Run health checks for all configured remote servers and return their current connectivity/status results.

> Example responses

> 200 Response

```json
[
  {
    "uid": "string",
    "online": false
  }
]
```

<h3 id="get__api_servers_healthcheck-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|[HealthCheckAllResponse](#schemahealthcheckallresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## post__api_servers_validate

> Code samples

```shell
# You can also use wget
curl -X POST /api/servers/validate \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /api/servers/validate HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "ipAddress": "string",
  "port": 22,
  "username": "string",
  "password": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/servers/validate',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post '/api/servers/validate',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('/api/servers/validate', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','/api/servers/validate', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/api/servers/validate");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/api/servers/validate", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/servers/validate`

Validate provided server connection details without persisting them; returns a health check result describing whether the connection succeeded.

> Body parameter

```json
{
  "ipAddress": "string",
  "port": 22,
  "username": "string",
  "password": "string"
}
```

<h3 id="post__api_servers_validate-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[HealthCheckRequest](#schemahealthcheckrequest)|false|none|

> Example responses

> 200 Response

```json
{
  "uid": "string",
  "online": false
}
```

<h3 id="post__api_servers_validate-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|[HealthCheckResponse](#schemahealthcheckresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Server error|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="btrfs-backup-system-api-btrfs">Btrfs</h1>

## get__api_btrfs_subvolumes

> Code samples

```shell
# You can also use wget
curl -X GET /api/btrfs/subvolumes \
  -H 'Accept: application/json'

```

```http
GET /api/btrfs/subvolumes HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/btrfs/subvolumes',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/api/btrfs/subvolumes',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/btrfs/subvolumes', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','/api/btrfs/subvolumes', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/api/btrfs/subvolumes");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/api/btrfs/subvolumes", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/btrfs/subvolumes`

List all Btrfs subvolumes. Optionally filter by `serverUid` to return subvolumes from a specific server.

<h3 id="get__api_btrfs_subvolumes-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|serverUid|query|string|false|none|

> Example responses

> 200 Response

```json
[
  {
    "id": 0,
    "gen": "string",
    "topLevel": "string",
    "path": "string"
  }
]
```

<h3 id="get__api_btrfs_subvolumes-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|[BtrfsSubvolumesResponse](#schemabtrfssubvolumesresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## get__api_btrfs_subvolumes_config

> Code samples

```shell
# You can also use wget
curl -X GET /api/btrfs/subvolumes/config \
  -H 'Accept: application/json'

```

```http
GET /api/btrfs/subvolumes/config HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/btrfs/subvolumes/config',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/api/btrfs/subvolumes/config',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/btrfs/subvolumes/config', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','/api/btrfs/subvolumes/config', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/api/btrfs/subvolumes/config");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/api/btrfs/subvolumes/config", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/btrfs/subvolumes/config`

Retrieve configuration for all known subvolumes.

> Example responses

> 200 Response

```json
[
  {
    "id": "string",
    "serverUid": "string",
    "subvolPath": "string",
    "snapshotIntervalSeconds": 0,
    "isEnabled": false,
    "exists": false
  }
]
```

<h3 id="get__api_btrfs_subvolumes_config-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|[BtrfsSubvolumeConfigAllResponse](#schemabtrfssubvolumeconfigallresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## get__api_btrfs_subvolumes_retention_config

> Code samples

```shell
# You can also use wget
curl -X GET /api/btrfs/subvolumes/retention/config \
  -H 'Accept: application/json'

```

```http
GET /api/btrfs/subvolumes/retention/config HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/btrfs/subvolumes/retention/config',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/api/btrfs/subvolumes/retention/config',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/btrfs/subvolumes/retention/config', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','/api/btrfs/subvolumes/retention/config', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/api/btrfs/subvolumes/retention/config");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/api/btrfs/subvolumes/retention/config", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/btrfs/subvolumes/retention/config`

Retrieve retention configuration for all subvolumes.

> Example responses

> 200 Response

```json
[
  {
    "id": "string",
    "serverUid": "string",
    "subvolPath": "string",
    "type": "daily",
    "keep": 1,
    "retentionIntervalSeconds": 0,
    "exists": false,
    "isEnabled": false
  }
]
```

<h3 id="get__api_btrfs_subvolumes_retention_config-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|[BtrfsSubvolumeRetentionConfigAllResponse](#schemabtrfssubvolumeretentionconfigallresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## get__api_btrfs_subvolumes_{subvolume}_config

> Code samples

```shell
# You can also use wget
curl -X GET /api/btrfs/subvolumes/{subvolume}/config \
  -H 'Accept: application/json'

```

```http
GET /api/btrfs/subvolumes/{subvolume}/config HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/btrfs/subvolumes/{subvolume}/config',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/api/btrfs/subvolumes/{subvolume}/config',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/btrfs/subvolumes/{subvolume}/config', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','/api/btrfs/subvolumes/{subvolume}/config', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/api/btrfs/subvolumes/{subvolume}/config");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/api/btrfs/subvolumes/{subvolume}/config", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/btrfs/subvolumes/{subvolume}/config`

Get configuration for a specific subvolume identified by the `subvolume` path parameter.

<h3 id="get__api_btrfs_subvolumes_{subvolume}_config-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|subvolume|path|string|true|none|

> Example responses

> 200 Response

```json
{
  "id": "string",
  "serverUid": "string",
  "subvolPath": "string",
  "snapshotIntervalSeconds": 0,
  "isEnabled": false,
  "exists": false
}
```

<h3 id="get__api_btrfs_subvolumes_{subvolume}_config-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|[BtrfsSubvolumeConfigResponse](#schemabtrfssubvolumeconfigresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## post__api_btrfs_subvolumes_{subvolume}_config

> Code samples

```shell
# You can also use wget
curl -X POST /api/btrfs/subvolumes/{subvolume}/config \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /api/btrfs/subvolumes/{subvolume}/config HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "snapshotIntervalSeconds": 0,
  "isEnabled": false
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/btrfs/subvolumes/{subvolume}/config',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post '/api/btrfs/subvolumes/{subvolume}/config',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('/api/btrfs/subvolumes/{subvolume}/config', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','/api/btrfs/subvolumes/{subvolume}/config', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/api/btrfs/subvolumes/{subvolume}/config");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/api/btrfs/subvolumes/{subvolume}/config", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/btrfs/subvolumes/{subvolume}/config`

Set or update configuration for the specified subvolume. Request body must match the subvolume config schema.

> Body parameter

```json
{
  "snapshotIntervalSeconds": 0,
  "isEnabled": false
}
```

<h3 id="post__api_btrfs_subvolumes_{subvolume}_config-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|subvolume|path|string|true|none|
|body|body|[BtrfsSubvolumeSetConfigRequest](#schemabtrfssubvolumesetconfigrequest)|false|none|

> Example responses

> 200 Response

```json
{
  "id": "string",
  "serverUid": "string",
  "subvolPath": "string",
  "snapshotIntervalSeconds": 0,
  "isEnabled": false,
  "exists": false
}
```

<h3 id="post__api_btrfs_subvolumes_{subvolume}_config-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|[BtrfsSubvolumeConfigResponse](#schemabtrfssubvolumeconfigresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## get__api_btrfs_subvolumes_{subvolume}_retention_config

> Code samples

```shell
# You can also use wget
curl -X GET /api/btrfs/subvolumes/{subvolume}/retention/config \
  -H 'Accept: application/json'

```

```http
GET /api/btrfs/subvolumes/{subvolume}/retention/config HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/btrfs/subvolumes/{subvolume}/retention/config',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/api/btrfs/subvolumes/{subvolume}/retention/config',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/btrfs/subvolumes/{subvolume}/retention/config', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','/api/btrfs/subvolumes/{subvolume}/retention/config', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/api/btrfs/subvolumes/{subvolume}/retention/config");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/api/btrfs/subvolumes/{subvolume}/retention/config", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/btrfs/subvolumes/{subvolume}/retention/config`

Get retention configuration for the specified subvolume.

<h3 id="get__api_btrfs_subvolumes_{subvolume}_retention_config-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|subvolume|path|string|true|none|

> Example responses

> 200 Response

```json
{
  "id": "string",
  "serverUid": "string",
  "subvolPath": "string",
  "type": "daily",
  "keep": 1,
  "retentionIntervalSeconds": 0,
  "exists": false,
  "isEnabled": false
}
```

<h3 id="get__api_btrfs_subvolumes_{subvolume}_retention_config-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|[BtrfsSubvolumeRetentionConfigResponse](#schemabtrfssubvolumeretentionconfigresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## post__api_btrfs_subvolumes_{subvolume}_retention_config

> Code samples

```shell
# You can also use wget
curl -X POST /api/btrfs/subvolumes/{subvolume}/retention/config \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /api/btrfs/subvolumes/{subvolume}/retention/config HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "type": "daily",
  "keep": 1,
  "retentionIntervalSeconds": 0,
  "isEnabled": false
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/btrfs/subvolumes/{subvolume}/retention/config',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post '/api/btrfs/subvolumes/{subvolume}/retention/config',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('/api/btrfs/subvolumes/{subvolume}/retention/config', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','/api/btrfs/subvolumes/{subvolume}/retention/config', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/api/btrfs/subvolumes/{subvolume}/retention/config");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/api/btrfs/subvolumes/{subvolume}/retention/config", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/btrfs/subvolumes/{subvolume}/retention/config`

Create or update retention configuration for the specified subvolume. Request body must match the retention config schema.

> Body parameter

```json
{
  "type": "daily",
  "keep": 1,
  "retentionIntervalSeconds": 0,
  "isEnabled": false
}
```

<h3 id="post__api_btrfs_subvolumes_{subvolume}_retention_config-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|subvolume|path|string|true|none|
|body|body|[BtrfsSubvolumeSetRetentionConfigRequest](#schemabtrfssubvolumesetretentionconfigrequest)|false|none|

> Example responses

> 200 Response

```json
{
  "id": "string",
  "serverUid": "string",
  "subvolPath": "string",
  "type": "daily",
  "keep": 1,
  "retentionIntervalSeconds": 0,
  "exists": false,
  "isEnabled": false
}
```

<h3 id="post__api_btrfs_subvolumes_{subvolume}_retention_config-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|[BtrfsSubvolumeRetentionConfigResponse](#schemabtrfssubvolumeretentionconfigresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## get__api_btrfs_subvolumes_{subvolume}_health

> Code samples

```shell
# You can also use wget
curl -X GET /api/btrfs/subvolumes/{subvolume}/health \
  -H 'Accept: application/json'

```

```http
GET /api/btrfs/subvolumes/{subvolume}/health HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/btrfs/subvolumes/{subvolume}/health',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/api/btrfs/subvolumes/{subvolume}/health',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/btrfs/subvolumes/{subvolume}/health', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','/api/btrfs/subvolumes/{subvolume}/health', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/api/btrfs/subvolumes/{subvolume}/health");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/api/btrfs/subvolumes/{subvolume}/health", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/btrfs/subvolumes/{subvolume}/health`

Check whether the specified subvolume exists on the target server. Returns `true` if present, `false` otherwise. Optionally specify `serverUid`.

<h3 id="get__api_btrfs_subvolumes_{subvolume}_health-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|subvolume|path|string|true|none|
|serverUid|query|string|false|none|

> Example responses

> 200 Response

```json
true
```

<h3 id="get__api_btrfs_subvolumes_{subvolume}_health-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|boolean|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## get__api_btrfs_storageMetrics

> Code samples

```shell
# You can also use wget
curl -X GET /api/btrfs/storageMetrics \
  -H 'Accept: application/json'

```

```http
GET /api/btrfs/storageMetrics HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/btrfs/storageMetrics',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/api/btrfs/storageMetrics',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/btrfs/storageMetrics', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','/api/btrfs/storageMetrics', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/api/btrfs/storageMetrics");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/api/btrfs/storageMetrics", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/btrfs/storageMetrics`

Retrieve aggregated storage metrics for Btrfs filesystems. Optionally filter metrics by `serverUid`.

<h3 id="get__api_btrfs_storagemetrics-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|serverUid|query|string|false|none|

> Example responses

> 200 Response

```json
{
  "totalBytes": 0,
  "usedBytes": 0,
  "freeBytes": 0,
  "data": {
    "total": 0,
    "used": 0
  },
  "metadata": {
    "total": 0,
    "used": 0
  },
  "system": {
    "total": 0,
    "used": 0
  },
  "chart": [
    {
      "name": "string",
      "value": 0,
      "color": "string"
    }
  ]
}
```

<h3 id="get__api_btrfs_storagemetrics-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|[BtrfsStorageMetricsResponse](#schemabtrfsstoragemetricsresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## get__api_btrfs_subvolumes_{subvolume}_storageMetrics

> Code samples

```shell
# You can also use wget
curl -X GET /api/btrfs/subvolumes/{subvolume}/storageMetrics \
  -H 'Accept: application/json'

```

```http
GET /api/btrfs/subvolumes/{subvolume}/storageMetrics HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/btrfs/subvolumes/{subvolume}/storageMetrics',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/api/btrfs/subvolumes/{subvolume}/storageMetrics',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/btrfs/subvolumes/{subvolume}/storageMetrics', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','/api/btrfs/subvolumes/{subvolume}/storageMetrics', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/api/btrfs/subvolumes/{subvolume}/storageMetrics");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/api/btrfs/subvolumes/{subvolume}/storageMetrics", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/btrfs/subvolumes/{subvolume}/storageMetrics`

Retrieve detailed storage metrics for the specified subvolume. Optionally provide `serverUid` to query a remote server.

<h3 id="get__api_btrfs_subvolumes_{subvolume}_storagemetrics-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|subvolume|path|string|true|none|
|serverUid|query|string|false|none|

> Example responses

> 200 Response

```json
{
  "filesystem": {
    "totalBytes": 0,
    "usedBytes": 0,
    "freeBytes": 0
  },
  "subvolume": {
    "path": "string",
    "name": "string",
    "referencedBytes": 0,
    "exclusiveBytes": 0,
    "snapshotCount": 0,
    "totalSnapshotExclusiveBytes": 0
  },
  "snapshots": [
    {
      "path": "string",
      "name": "string",
      "timestamp": "2019-08-24T14:15:22Z",
      "referencedBytes": 0,
      "exclusiveBytes": 0,
      "efficiency": 0
    }
  ]
}
```

<h3 id="get__api_btrfs_subvolumes_{subvolume}_storagemetrics-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|[BtrfsSubvolumeDetailedMetricsResponse](#schemabtrfssubvolumedetailedmetricsresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Server error|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="btrfs-backup-system-api-snapshots">Snapshots</h1>

## get__api_snapshots_{subvolume}

> Code samples

```shell
# You can also use wget
curl -X GET /api/snapshots/{subvolume} \
  -H 'Accept: application/json'

```

```http
GET /api/snapshots/{subvolume} HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/snapshots/{subvolume}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/api/snapshots/{subvolume}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/snapshots/{subvolume}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','/api/snapshots/{subvolume}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/api/snapshots/{subvolume}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/api/snapshots/{subvolume}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/snapshots/{subvolume}`

List snapshots for the specified subvolume. Optionally include `serverUid` to list snapshots from a specific remote server.

<h3 id="get__api_snapshots_{subvolume}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|subvolume|path|string|true|none|
|serverUid|query|string|false|none|

> Example responses

> 200 Response

```json
[
  {
    "name": "string",
    "path": "string",
    "createdAt": "string",
    "sizeBytes": 0
  }
]
```

<h3 id="get__api_snapshots_{subvolume}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|[BtrfsSnapshotsResponse](#schemabtrfssnapshotsresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## post__api_snapshots_{subvolume}

> Code samples

```shell
# You can also use wget
curl -X POST /api/snapshots/{subvolume} \
  -H 'Accept: application/json'

```

```http
POST /api/snapshots/{subvolume} HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/snapshots/{subvolume}',
{
  method: 'POST',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.post '/api/snapshots/{subvolume}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.post('/api/snapshots/{subvolume}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','/api/snapshots/{subvolume}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/api/snapshots/{subvolume}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/api/snapshots/{subvolume}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/snapshots/{subvolume}`

Create a new snapshot for the specified subvolume and return its metadata.

<h3 id="post__api_snapshots_{subvolume}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|subvolume|path|string|true|none|

> Example responses

> 200 Response

```json
{
  "name": "string",
  "path": "string",
  "createdAt": "string",
  "sizeBytes": 0
}
```

<h3 id="post__api_snapshots_{subvolume}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|[BtrfsSnapshotResponse](#schemabtrfssnapshotresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## delete__api_snapshots_{subvolume}

> Code samples

```shell
# You can also use wget
curl -X DELETE /api/snapshots/{subvolume} \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
DELETE /api/snapshots/{subvolume} HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "type": "daily",
  "keep": 1
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/snapshots/{subvolume}',
{
  method: 'DELETE',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.delete '/api/snapshots/{subvolume}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.delete('/api/snapshots/{subvolume}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','/api/snapshots/{subvolume}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/api/snapshots/{subvolume}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "/api/snapshots/{subvolume}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /api/snapshots/{subvolume}`

Clean up snapshots for the specified subvolume according to the provided cleanup rules; returns the cleanup result.

> Body parameter

```json
{
  "type": "daily",
  "keep": 1
}
```

<h3 id="delete__api_snapshots_{subvolume}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|subvolume|path|string|true|none|
|body|body|[BtrfsSnapshotCleanupRequest](#schemabtrfssnapshotcleanuprequest)|false|none|

> Example responses

> 200 Response

```json
{
  "cleaned": true,
  "kept": [
    "string"
  ],
  "deletedSnapshots": [
    "string"
  ],
  "totalBefore": 0,
  "totalAfter": 0
}
```

<h3 id="delete__api_snapshots_{subvolume}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|[BtrfsSnapshotCleanupResponse](#schemabtrfssnapshotcleanupresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## delete__api_snapshots_{subvolume}_{snapshot}

> Code samples

```shell
# You can also use wget
curl -X DELETE /api/snapshots/{subvolume}/{snapshot} \
  -H 'Accept: application/json'

```

```http
DELETE /api/snapshots/{subvolume}/{snapshot} HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/snapshots/{subvolume}/{snapshot}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.delete '/api/snapshots/{subvolume}/{snapshot}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.delete('/api/snapshots/{subvolume}/{snapshot}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','/api/snapshots/{subvolume}/{snapshot}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/api/snapshots/{subvolume}/{snapshot}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "/api/snapshots/{subvolume}/{snapshot}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /api/snapshots/{subvolume}/{snapshot}`

Delete a single snapshot identified by the `snapshot` path parameter from the given subvolume.

<h3 id="delete__api_snapshots_{subvolume}_{snapshot}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|subvolume|path|string|true|none|
|snapshot|path|string|true|none|

> Example responses

> 200 Response

```json
{
  "path": "string",
  "deleted": true,
  "message": "string"
}
```

<h3 id="delete__api_snapshots_{subvolume}_{snapshot}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|[BtrfsSnapshotDeleteResponse](#schemabtrfssnapshotdeleteresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## post__api_snapshots_{subvolume}_{snapshot}_restore

> Code samples

```shell
# You can also use wget
curl -X POST /api/snapshots/{subvolume}/{snapshot}/restore \
  -H 'Accept: application/json'

```

```http
POST /api/snapshots/{subvolume}/{snapshot}/restore HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/snapshots/{subvolume}/{snapshot}/restore',
{
  method: 'POST',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.post '/api/snapshots/{subvolume}/{snapshot}/restore',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.post('/api/snapshots/{subvolume}/{snapshot}/restore', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','/api/snapshots/{subvolume}/{snapshot}/restore', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/api/snapshots/{subvolume}/{snapshot}/restore");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/api/snapshots/{subvolume}/{snapshot}/restore", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/snapshots/{subvolume}/{snapshot}/restore`

Restore the specified snapshot into its subvolume. Returns the result of the restore operation.

<h3 id="post__api_snapshots_{subvolume}_{snapshot}_restore-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|subvolume|path|string|true|none|
|snapshot|path|string|true|none|

> Example responses

> 200 Response

```json
{
  "restored": "string",
  "snapshotUsed": "string",
  "newSubvolume": "string"
}
```

<h3 id="post__api_snapshots_{subvolume}_{snapshot}_restore-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|[BtrfsSnapshotRestoreResponse](#schemabtrfssnapshotrestoreresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## post__api_snapshots_{subvolume}_{snapshot}_replication_full

> Code samples

```shell
# You can also use wget
curl -X POST /api/snapshots/{subvolume}/{snapshot}/replication/full \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /api/snapshots/{subvolume}/{snapshot}/replication/full HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "secondaryServers": [
    "string"
  ]
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/snapshots/{subvolume}/{snapshot}/replication/full',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post '/api/snapshots/{subvolume}/{snapshot}/replication/full',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('/api/snapshots/{subvolume}/{snapshot}/replication/full', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','/api/snapshots/{subvolume}/{snapshot}/replication/full', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/api/snapshots/{subvolume}/{snapshot}/replication/full");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/api/snapshots/{subvolume}/{snapshot}/replication/full", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/snapshots/{subvolume}/{snapshot}/replication/full`

Start a full replication of the specified snapshot to a configured remote target. Request body specifies replication options.

> Body parameter

```json
{
  "secondaryServers": [
    "string"
  ]
}
```

<h3 id="post__api_snapshots_{subvolume}_{snapshot}_replication_full-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|subvolume|path|string|true|none|
|snapshot|path|string|true|none|
|body|body|[BtrfsSnapshotFullReplicationRequest](#schemabtrfssnapshotfullreplicationrequest)|false|none|

> Example responses

> 200 Response

```json
{
  "snapshotPath": "string",
  "results": [
    {
      "serverUid": "string",
      "address": "string",
      "port": 22,
      "status": "ok",
      "error": "string"
    }
  ]
}
```

<h3 id="post__api_snapshots_{subvolume}_{snapshot}_replication_full-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|[BtrfsSnapshotFullReplicationResponse](#schemabtrfssnapshotfullreplicationresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## post__api_snapshots_{subvolume}_{snapshot}_replication_incremental

> Code samples

```shell
# You can also use wget
curl -X POST /api/snapshots/{subvolume}/{snapshot}/replication/incremental \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /api/snapshots/{subvolume}/{snapshot}/replication/incremental HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "secondaryServer": "string",
  "secondaryServersSnapshot": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/snapshots/{subvolume}/{snapshot}/replication/incremental',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post '/api/snapshots/{subvolume}/{snapshot}/replication/incremental',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('/api/snapshots/{subvolume}/{snapshot}/replication/incremental', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','/api/snapshots/{subvolume}/{snapshot}/replication/incremental', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/api/snapshots/{subvolume}/{snapshot}/replication/incremental");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/api/snapshots/{subvolume}/{snapshot}/replication/incremental", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/snapshots/{subvolume}/{snapshot}/replication/incremental`

Start an incremental replication for the specified snapshot. Request body contains incremental replication parameters.

> Body parameter

```json
{
  "secondaryServer": "string",
  "secondaryServersSnapshot": "string"
}
```

<h3 id="post__api_snapshots_{subvolume}_{snapshot}_replication_incremental-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|subvolume|path|string|true|none|
|snapshot|path|string|true|none|
|body|body|[BtrfsSnapshotIncrementalReplicationRequest](#schemabtrfssnapshotincrementalreplicationrequest)|false|none|

> Example responses

> 200 Response

```json
{
  "snapshotPath": "string",
  "results": [
    {
      "serverUid": "string",
      "address": "string",
      "port": 22,
      "status": "ok",
      "error": "string"
    }
  ]
}
```

<h3 id="post__api_snapshots_{subvolume}_{snapshot}_replication_incremental-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|[BtrfsSnapshotFullReplicationResponse](#schemabtrfssnapshotfullreplicationresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## get__api_snapshots_{subvolume}_{snapshot}_health

> Code samples

```shell
# You can also use wget
curl -X GET /api/snapshots/{subvolume}/{snapshot}/health \
  -H 'Accept: application/json'

```

```http
GET /api/snapshots/{subvolume}/{snapshot}/health HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/snapshots/{subvolume}/{snapshot}/health',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/api/snapshots/{subvolume}/{snapshot}/health',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/snapshots/{subvolume}/{snapshot}/health', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','/api/snapshots/{subvolume}/{snapshot}/health', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/api/snapshots/{subvolume}/{snapshot}/health");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/api/snapshots/{subvolume}/{snapshot}/health", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/snapshots/{subvolume}/{snapshot}/health`

Return replication health and status information for the specified snapshot.

<h3 id="get__api_snapshots_{subvolume}_{snapshot}_health-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|subvolume|path|string|true|none|
|snapshot|path|string|true|none|

> Example responses

> 200 Response

```json
{
  "snapshotPath": "string",
  "primary": {
    "status": "ok",
    "meta": {
      "name": "string",
      "uuid": "string",
      "receivedUuid": "string",
      "parentUuid": "string",
      "creationTime": "string",
      "generation": "string",
      "subvolumeId": "string",
      "flags": "string",
      "size": {
        "total": "string",
        "exclusive": "string",
        "shared": "string"
      },
      "ageSeconds": 0,
      "lagSeconds": 0
    }
  },
  "replicas": [
    {
      "serverUid": "string",
      "address": "string",
      "port": 22,
      "status": "ok",
      "foundPath": "string",
      "meta": {
        "name": "string",
        "uuid": "string",
        "receivedUuid": "string",
        "parentUuid": "string",
        "creationTime": "string",
        "generation": "string",
        "subvolumeId": "string",
        "flags": "string",
        "size": {
          "total": "string",
          "exclusive": "string",
          "shared": "string"
        },
        "ageSeconds": 0,
        "lagSeconds": 0
      }
    }
  ],
  "overall": "ok"
}
```

<h3 id="get__api_snapshots_{subvolume}_{snapshot}_health-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|[BtrfsSnapshotReplicationHealthResponse](#schemabtrfssnapshotreplicationhealthresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Server error|None|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_CreateNewServerResponse">CreateNewServerResponse</h2>
<!-- backwards compatibility -->
<a id="schemacreatenewserverresponse"></a>
<a id="schema_CreateNewServerResponse"></a>
<a id="tocScreatenewserverresponse"></a>
<a id="tocscreatenewserverresponse"></a>

```json
{
  "uid": "string",
  "ipAddress": "string",
  "port": 22,
  "isPrimary": false
}

```

Response returned after creating a new remote server.

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|uid|string|true|none|Unique identifier assigned to the created server|
|ipAddress|string|true|none|IP address or hostname of the created server|
|port|integer|false|none|SSH port for the created server|
|isPrimary|boolean|false|none|Whether this server is primary|

<h2 id="tocS_CreateNewServerRequest">CreateNewServerRequest</h2>
<!-- backwards compatibility -->
<a id="schemacreatenewserverrequest"></a>
<a id="schema_CreateNewServerRequest"></a>
<a id="tocScreatenewserverrequest"></a>
<a id="tocscreatenewserverrequest"></a>

```json
{
  "name": "string",
  "ipAddress": "string",
  "port": 22,
  "username": "string",
  "password": "string",
  "isPrimary": false
}

```

Payload to create and register a new remote server configuration.

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|Human-readable server name|
|ipAddress|string|true|none|IP address or hostname of the remote server|
|port|integer|false|none|SSH port on the remote server|
|username|string|true|none|Username used for SSH authentication|
|password|string|true|none|Password used for SSH authentication|
|isPrimary|boolean|false|none|Whether this server is the primary/preferred target|

<h2 id="tocS_GetAllServersResponse">GetAllServersResponse</h2>
<!-- backwards compatibility -->
<a id="schemagetallserversresponse"></a>
<a id="schema_GetAllServersResponse"></a>
<a id="tocSgetallserversresponse"></a>
<a id="tocsgetallserversresponse"></a>

```json
[
  {
    "uid": "string",
    "name": "string",
    "ipAddress": "string",
    "port": 22,
    "isPrimary": false
  }
]

```

List of configured remote servers and their connection metadata.

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|uid|string|true|none|Server unique identifier|
|name|string|true|none|Server display name|
|ipAddress|string|true|none|Server IP or hostname|
|port|integer|false|none|SSH port|
|isPrimary|boolean|false|none|Whether this server is primary|

<h2 id="tocS_UpdateServerRequest">UpdateServerRequest</h2>
<!-- backwards compatibility -->
<a id="schemaupdateserverrequest"></a>
<a id="schema_UpdateServerRequest"></a>
<a id="tocSupdateserverrequest"></a>
<a id="tocsupdateserverrequest"></a>

```json
{
  "name": "string",
  "ipAddress": "string",
  "port": 22,
  "username": "string",
  "password": "string",
  "isPrimary": false
}

```

Payload to update an existing server; all fields are optional.

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|false|none|Human-readable server name|
|ipAddress|string|false|none|IP address or hostname of the remote server|
|port|integer|false|none|SSH port on the remote server|
|username|string|false|none|Username used for SSH authentication|
|password|string|false|none|Password used for SSH authentication|
|isPrimary|boolean|false|none|Whether this server is the primary/preferred target|

<h2 id="tocS_HealthCheckResponse">HealthCheckResponse</h2>
<!-- backwards compatibility -->
<a id="schemahealthcheckresponse"></a>
<a id="schema_HealthCheckResponse"></a>
<a id="tocShealthcheckresponse"></a>
<a id="tocshealthcheckresponse"></a>

```json
{
  "uid": "string",
  "online": false
}

```

Health/check status result for a server.

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|uid|string|true|none|Server unique identifier|
|online|boolean|false|none|Whether the server is currently reachable/online|

<h2 id="tocS_HealthCheckAllResponse">HealthCheckAllResponse</h2>
<!-- backwards compatibility -->
<a id="schemahealthcheckallresponse"></a>
<a id="schema_HealthCheckAllResponse"></a>
<a id="tocShealthcheckallresponse"></a>
<a id="tocshealthcheckallresponse"></a>

```json
[
  {
    "uid": "string",
    "online": false
  }
]

```

Array of health check results for all configured servers.

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[HealthCheckResponse](#schemahealthcheckresponse)]|false|none|Array of health check results for all configured servers.|

<h2 id="tocS_HealthCheckRequest">HealthCheckRequest</h2>
<!-- backwards compatibility -->
<a id="schemahealthcheckrequest"></a>
<a id="schema_HealthCheckRequest"></a>
<a id="tocShealthcheckrequest"></a>
<a id="tocshealthcheckrequest"></a>

```json
{
  "ipAddress": "string",
  "port": 22,
  "username": "string",
  "password": "string"
}

```

Request payload to validate server connection details without persisting them.

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ipAddress|string|true|none|IP address or hostname to validate|
|port|integer|false|none|SSH port to validate|
|username|string|true|none|Username for validation attempt|
|password|string|true|none|Password for validation attempt|

<h2 id="tocS_BtrfsSubvolumesResponse">BtrfsSubvolumesResponse</h2>
<!-- backwards compatibility -->
<a id="schemabtrfssubvolumesresponse"></a>
<a id="schema_BtrfsSubvolumesResponse"></a>
<a id="tocSbtrfssubvolumesresponse"></a>
<a id="tocsbtrfssubvolumesresponse"></a>

```json
[
  {
    "id": 0,
    "gen": "string",
    "topLevel": "string",
    "path": "string"
  }
]

```

Array of Btrfs subvolumes returned by listing endpoints

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|number|true|none|Numeric identifier for the subvolume record|
|gen|string|true|none|Filesystem generation identifier for this subvolume|
|topLevel|string|true|none|Top-level identifier for the subvolume|
|path|string|true|none|Filesystem path where the subvolume is mounted or located|

<h2 id="tocS_BtrfsSubvolumeConfigResponse">BtrfsSubvolumeConfigResponse</h2>
<!-- backwards compatibility -->
<a id="schemabtrfssubvolumeconfigresponse"></a>
<a id="schema_BtrfsSubvolumeConfigResponse"></a>
<a id="tocSbtrfssubvolumeconfigresponse"></a>
<a id="tocsbtrfssubvolumeconfigresponse"></a>

```json
{
  "id": "string",
  "serverUid": "string",
  "subvolPath": "string",
  "snapshotIntervalSeconds": 0,
  "isEnabled": false,
  "exists": false
}

```

Persisted configuration for a single subvolume

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|Unique identifier for the stored subvolume configuration|
|serverUid|string|true|none|UID of the server where the subvolume resides|
|subvolPath|string|true|none|Path of the subvolume on the server|
|snapshotIntervalSeconds|number|true|none|Configured snapshot interval in seconds|
|isEnabled|boolean|false|none|Whether automatic snapshotting/replication is enabled|
|exists|boolean|false|none|Indicates whether the subvolume currently exists on the target server|

<h2 id="tocS_BtrfsSubvolumeConfigAllResponse">BtrfsSubvolumeConfigAllResponse</h2>
<!-- backwards compatibility -->
<a id="schemabtrfssubvolumeconfigallresponse"></a>
<a id="schema_BtrfsSubvolumeConfigAllResponse"></a>
<a id="tocSbtrfssubvolumeconfigallresponse"></a>
<a id="tocsbtrfssubvolumeconfigallresponse"></a>

```json
[
  {
    "id": "string",
    "serverUid": "string",
    "subvolPath": "string",
    "snapshotIntervalSeconds": 0,
    "isEnabled": false,
    "exists": false
  }
]

```

List of persisted subvolume configurations

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[BtrfsSubvolumeConfigResponse](#schemabtrfssubvolumeconfigresponse)]|false|none|List of persisted subvolume configurations|

<h2 id="tocS_BtrfsSubvolumeRetentionConfigResponse">BtrfsSubvolumeRetentionConfigResponse</h2>
<!-- backwards compatibility -->
<a id="schemabtrfssubvolumeretentionconfigresponse"></a>
<a id="schema_BtrfsSubvolumeRetentionConfigResponse"></a>
<a id="tocSbtrfssubvolumeretentionconfigresponse"></a>
<a id="tocsbtrfssubvolumeretentionconfigresponse"></a>

```json
{
  "id": "string",
  "serverUid": "string",
  "subvolPath": "string",
  "type": "daily",
  "keep": 1,
  "retentionIntervalSeconds": 0,
  "exists": false,
  "isEnabled": false
}

```

Persisted retention configuration for a subvolume

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|Identifier for the retention policy record|
|serverUid|string|true|none|UID of the server the policy applies to|
|subvolPath|string|true|none|Subvolume path the retention policy targets|
|type|string|true|none|Retention policy cadence/type|
|keep|number|true|none|Number of snapshots to keep according to the policy|
|retentionIntervalSeconds|number|true|none|Interval in seconds between retention applications|
|exists|boolean|false|none|Indicates if the target subvolume currently exists|
|isEnabled|boolean|false|none|Whether the retention policy is active|

#### Enumerated Values

|Property|Value|
|---|---|
|type|daily|
|type|weekly|
|type|monthly|

<h2 id="tocS_BtrfsSubvolumeRetentionConfigAllResponse">BtrfsSubvolumeRetentionConfigAllResponse</h2>
<!-- backwards compatibility -->
<a id="schemabtrfssubvolumeretentionconfigallresponse"></a>
<a id="schema_BtrfsSubvolumeRetentionConfigAllResponse"></a>
<a id="tocSbtrfssubvolumeretentionconfigallresponse"></a>
<a id="tocsbtrfssubvolumeretentionconfigallresponse"></a>

```json
[
  {
    "id": "string",
    "serverUid": "string",
    "subvolPath": "string",
    "type": "daily",
    "keep": 1,
    "retentionIntervalSeconds": 0,
    "exists": false,
    "isEnabled": false
  }
]

```

List of retention policies for all subvolumes

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[BtrfsSubvolumeRetentionConfigResponse](#schemabtrfssubvolumeretentionconfigresponse)]|false|none|List of retention policies for all subvolumes|

<h2 id="tocS_BtrfsSubvolumeSetConfigRequest">BtrfsSubvolumeSetConfigRequest</h2>
<!-- backwards compatibility -->
<a id="schemabtrfssubvolumesetconfigrequest"></a>
<a id="schema_BtrfsSubvolumeSetConfigRequest"></a>
<a id="tocSbtrfssubvolumesetconfigrequest"></a>
<a id="tocsbtrfssubvolumesetconfigrequest"></a>

```json
{
  "snapshotIntervalSeconds": 0,
  "isEnabled": false
}

```

Request payload to create or update a subvolume's configurable fields

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|snapshotIntervalSeconds|number|true|none|Configured snapshot interval in seconds|
|isEnabled|boolean|false|none|Whether automatic snapshotting/replication is enabled|

<h2 id="tocS_BtrfsSubvolumeSetRetentionConfigRequest">BtrfsSubvolumeSetRetentionConfigRequest</h2>
<!-- backwards compatibility -->
<a id="schemabtrfssubvolumesetretentionconfigrequest"></a>
<a id="schema_BtrfsSubvolumeSetRetentionConfigRequest"></a>
<a id="tocSbtrfssubvolumesetretentionconfigrequest"></a>
<a id="tocsbtrfssubvolumesetretentionconfigrequest"></a>

```json
{
  "type": "daily",
  "keep": 1,
  "retentionIntervalSeconds": 0,
  "isEnabled": false
}

```

Request payload to create or update a subvolume's retention policy fields

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|true|none|Retention policy cadence/type|
|keep|number|true|none|Number of snapshots to keep according to the policy|
|retentionIntervalSeconds|number|true|none|Interval in seconds between retention applications|
|isEnabled|boolean|false|none|Whether the retention policy is active|

#### Enumerated Values

|Property|Value|
|---|---|
|type|daily|
|type|weekly|
|type|monthly|

<h2 id="tocS_BtrfsStorageMetricsResponse">BtrfsStorageMetricsResponse</h2>
<!-- backwards compatibility -->
<a id="schemabtrfsstoragemetricsresponse"></a>
<a id="schema_BtrfsStorageMetricsResponse"></a>
<a id="tocSbtrfsstoragemetricsresponse"></a>
<a id="tocsbtrfsstoragemetricsresponse"></a>

```json
{
  "totalBytes": 0,
  "usedBytes": 0,
  "freeBytes": 0,
  "data": {
    "total": 0,
    "used": 0
  },
  "metadata": {
    "total": 0,
    "used": 0
  },
  "system": {
    "total": 0,
    "used": 0
  },
  "chart": [
    {
      "name": "string",
      "value": 0,
      "color": "string"
    }
  ]
}

```

Aggregated storage metrics for a Btrfs filesystem

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|totalBytes|number|true|none|Total filesystem capacity in bytes|
|usedBytes|number|true|none|Total used bytes across the filesystem|
|freeBytes|number|true|none|Free bytes available in the filesystem|
|data|object|true|none|Data space metrics|
|» total|number|true|none|Data subvolume total bytes|
|» used|number|true|none|Data subvolume used bytes|
|metadata|object|true|none|Metadata space metrics|
|» total|number|true|none|Metadata space total bytes|
|» used|number|true|none|Metadata space used bytes|
|system|object|true|none|System space metrics|
|» total|number|true|none|System space total bytes|
|» used|number|true|none|System space used bytes|
|chart|[object]|true|none|Optional chart-friendly breakdown of metrics|
|» name|string|true|none|Label for chart item|
|» value|number|true|none|Numeric value for chart item|
|» color|string|true|none|Hex or named color for chart item|

<h2 id="tocS_BtrfsSubvolumeDetailedMetricsResponse">BtrfsSubvolumeDetailedMetricsResponse</h2>
<!-- backwards compatibility -->
<a id="schemabtrfssubvolumedetailedmetricsresponse"></a>
<a id="schema_BtrfsSubvolumeDetailedMetricsResponse"></a>
<a id="tocSbtrfssubvolumedetailedmetricsresponse"></a>
<a id="tocsbtrfssubvolumedetailedmetricsresponse"></a>

```json
{
  "filesystem": {
    "totalBytes": 0,
    "usedBytes": 0,
    "freeBytes": 0
  },
  "subvolume": {
    "path": "string",
    "name": "string",
    "referencedBytes": 0,
    "exclusiveBytes": 0,
    "snapshotCount": 0,
    "totalSnapshotExclusiveBytes": 0
  },
  "snapshots": [
    {
      "path": "string",
      "name": "string",
      "timestamp": "2019-08-24T14:15:22Z",
      "referencedBytes": 0,
      "exclusiveBytes": 0,
      "efficiency": 0
    }
  ]
}

```

Detailed storage metrics for a single subvolume, including snapshots and filesystem totals

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|filesystem|object|true|none|Filesystem-level metrics for the subvolume's filesystem|
|» totalBytes|number|true|none|Filesystem total bytes|
|» usedBytes|number|true|none|Filesystem used bytes|
|» freeBytes|number|true|none|Filesystem free bytes|
|subvolume|object¦null|true|none|Metrics for the specific subvolume, or null if not found|
|» path|string|true|none|Filesystem path of the subvolume|
|» name|string|true|none|Subvolume name|
|» referencedBytes|number|true|none|Bytes referenced by the subvolume|
|» exclusiveBytes|number|true|none|Bytes exclusive to the subvolume|
|» snapshotCount|integer|true|none|Number of snapshots associated with the subvolume|
|» totalSnapshotExclusiveBytes|number|true|none|Total exclusive bytes across all snapshots|
|snapshots|[object]|true|none|Array of snapshot metrics for the subvolume|
|» path|string|true|none|Filesystem path of the snapshot|
|» name|string|true|none|Snapshot name|
|» timestamp|string(date-time)¦null|true|none|ISO timestamp when snapshot was taken, or null|
|» referencedBytes|number|true|none|Bytes referenced by the snapshot|
|» exclusiveBytes|number|true|none|Bytes exclusive to this snapshot|
|» efficiency|number|true|none|Snapshot space-efficiency metric (ratio or score)|

<h2 id="tocS_BtrfsSnapshotResponse">BtrfsSnapshotResponse</h2>
<!-- backwards compatibility -->
<a id="schemabtrfssnapshotresponse"></a>
<a id="schema_BtrfsSnapshotResponse"></a>
<a id="tocSbtrfssnapshotresponse"></a>
<a id="tocsbtrfssnapshotresponse"></a>

```json
{
  "name": "string",
  "path": "string",
  "createdAt": "string",
  "sizeBytes": 0
}

```

Metadata describing a single Btrfs snapshot.

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|Snapshot name or identifier|
|path|string|true|none|Filesystem path of the snapshot|
|createdAt|string|false|none|Timestamp when the snapshot was created, if available|
|sizeBytes|number|false|none|Size of the snapshot in bytes, if available|

<h2 id="tocS_BtrfsSnapshotsResponse">BtrfsSnapshotsResponse</h2>
<!-- backwards compatibility -->
<a id="schemabtrfssnapshotsresponse"></a>
<a id="schema_BtrfsSnapshotsResponse"></a>
<a id="tocSbtrfssnapshotsresponse"></a>
<a id="tocsbtrfssnapshotsresponse"></a>

```json
[
  {
    "name": "string",
    "path": "string",
    "createdAt": "string",
    "sizeBytes": 0
  }
]

```

Array of snapshot metadata objects for a subvolume.

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[BtrfsSnapshotResponse](#schemabtrfssnapshotresponse)]|false|none|Array of snapshot metadata objects for a subvolume.|

<h2 id="tocS_BtrfsSnapshotCleanupResponse">BtrfsSnapshotCleanupResponse</h2>
<!-- backwards compatibility -->
<a id="schemabtrfssnapshotcleanupresponse"></a>
<a id="schema_BtrfsSnapshotCleanupResponse"></a>
<a id="tocSbtrfssnapshotcleanupresponse"></a>
<a id="tocsbtrfssnapshotcleanupresponse"></a>

```json
{
  "cleaned": true,
  "kept": [
    "string"
  ],
  "deletedSnapshots": [
    "string"
  ],
  "totalBefore": 0,
  "totalAfter": 0
}

```

Result of running snapshot cleanup according to provided rules.

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|cleaned|boolean|true|none|Whether any snapshots were cleaned/deleted|
|kept|[string]|true|none|Array of snapshot identifiers that were kept|
|deletedSnapshots|[string]|true|none|Array of snapshot identifiers that were deleted|
|totalBefore|number|true|none|Total number of snapshots before cleanup|
|totalAfter|number|true|none|Total number of snapshots after cleanup|

<h2 id="tocS_BtrfsSnapshotCleanupRequest">BtrfsSnapshotCleanupRequest</h2>
<!-- backwards compatibility -->
<a id="schemabtrfssnapshotcleanuprequest"></a>
<a id="schema_BtrfsSnapshotCleanupRequest"></a>
<a id="tocSbtrfssnapshotcleanuprequest"></a>
<a id="tocsbtrfssnapshotcleanuprequest"></a>

```json
{
  "type": "daily",
  "keep": 1
}

```

Request payload describing snapshot cleanup rules to apply to a subvolume.

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|true|none|Cleanup cadence to apply|
|keep|number|true|none|Number of snapshots to retain for the given cadence|

#### Enumerated Values

|Property|Value|
|---|---|
|type|daily|
|type|weekly|
|type|monthly|

<h2 id="tocS_BtrfsSnapshotDeleteResponse">BtrfsSnapshotDeleteResponse</h2>
<!-- backwards compatibility -->
<a id="schemabtrfssnapshotdeleteresponse"></a>
<a id="schema_BtrfsSnapshotDeleteResponse"></a>
<a id="tocSbtrfssnapshotdeleteresponse"></a>
<a id="tocsbtrfssnapshotdeleteresponse"></a>

```json
{
  "path": "string",
  "deleted": true,
  "message": "string"
}

```

Result of a snapshot deletion request.

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|path|string|true|none|Path of the snapshot that was requested for deletion|
|deleted|boolean|true|none|Whether the snapshot was deleted successfully|
|message|string|true|none|Optional message describing the result of the delete operation|

<h2 id="tocS_BtrfsSnapshotRestoreResponse">BtrfsSnapshotRestoreResponse</h2>
<!-- backwards compatibility -->
<a id="schemabtrfssnapshotrestoreresponse"></a>
<a id="schema_BtrfsSnapshotRestoreResponse"></a>
<a id="tocSbtrfssnapshotrestoreresponse"></a>
<a id="tocsbtrfssnapshotrestoreresponse"></a>

```json
{
  "restored": "string",
  "snapshotUsed": "string",
  "newSubvolume": "string"
}

```

Response returned after attempting to restore a snapshot.

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|restored|string|true|none|Identifier or path of the restored entity|
|snapshotUsed|string|true|none|Snapshot identifier that was used for the restore|
|newSubvolume|string|true|none|Path of the newly created/restored subvolume, if applicable|

<h2 id="tocS_BtrfsSnapshotFullReplicationResponse">BtrfsSnapshotFullReplicationResponse</h2>
<!-- backwards compatibility -->
<a id="schemabtrfssnapshotfullreplicationresponse"></a>
<a id="schema_BtrfsSnapshotFullReplicationResponse"></a>
<a id="tocSbtrfssnapshotfullreplicationresponse"></a>
<a id="tocsbtrfssnapshotfullreplicationresponse"></a>

```json
{
  "snapshotPath": "string",
  "results": [
    {
      "serverUid": "string",
      "address": "string",
      "port": 22,
      "status": "ok",
      "error": "string"
    }
  ]
}

```

Results from a full replication operation for a snapshot.

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|snapshotPath|string|true|none|Path of the snapshot that was replicated|
|results|[object]|true|none|Array of replication results per target server|
|» serverUid|string|true|none|UID of the target server for replication|
|» address|string|true|none|Address of the target server|
|» port|number|false|none|Port used for replication/connection|
|» status|string|true|none|Replication result status for this server|
|» error|string|false|none|Optional error message when status is failed|

#### Enumerated Values

|Property|Value|
|---|---|
|status|ok|
|status|failed|

<h2 id="tocS_BtrfsSnapshotFullReplicationRequest">BtrfsSnapshotFullReplicationRequest</h2>
<!-- backwards compatibility -->
<a id="schemabtrfssnapshotfullreplicationrequest"></a>
<a id="schema_BtrfsSnapshotFullReplicationRequest"></a>
<a id="tocSbtrfssnapshotfullreplicationrequest"></a>
<a id="tocsbtrfssnapshotfullreplicationrequest"></a>

```json
{
  "secondaryServers": [
    "string"
  ]
}

```

Request to start a full replication of a snapshot to one or more secondary servers.

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|secondaryServers|[string]|true|none|Array of server UIDs to which the snapshot should be fully replicated|

<h2 id="tocS_BtrfsSnapshotIncrementalReplicationRequest">BtrfsSnapshotIncrementalReplicationRequest</h2>
<!-- backwards compatibility -->
<a id="schemabtrfssnapshotincrementalreplicationrequest"></a>
<a id="schema_BtrfsSnapshotIncrementalReplicationRequest"></a>
<a id="tocSbtrfssnapshotincrementalreplicationrequest"></a>
<a id="tocsbtrfssnapshotincrementalreplicationrequest"></a>

```json
{
  "secondaryServer": "string",
  "secondaryServersSnapshot": "string"
}

```

Request to perform an incremental replication using a base snapshot on the secondary server.

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|secondaryServer|string|true|none|UID of the secondary server to replicate to|
|secondaryServersSnapshot|string|true|none|Identifier or path of the snapshot on the secondary server to use as base for incremental replication|

<h2 id="tocS_BtrfsSnapshotReplicationHealthResponse">BtrfsSnapshotReplicationHealthResponse</h2>
<!-- backwards compatibility -->
<a id="schemabtrfssnapshotreplicationhealthresponse"></a>
<a id="schema_BtrfsSnapshotReplicationHealthResponse"></a>
<a id="tocSbtrfssnapshotreplicationhealthresponse"></a>
<a id="tocsbtrfssnapshotreplicationhealthresponse"></a>

```json
{
  "snapshotPath": "string",
  "primary": {
    "status": "ok",
    "meta": {
      "name": "string",
      "uuid": "string",
      "receivedUuid": "string",
      "parentUuid": "string",
      "creationTime": "string",
      "generation": "string",
      "subvolumeId": "string",
      "flags": "string",
      "size": {
        "total": "string",
        "exclusive": "string",
        "shared": "string"
      },
      "ageSeconds": 0,
      "lagSeconds": 0
    }
  },
  "replicas": [
    {
      "serverUid": "string",
      "address": "string",
      "port": 22,
      "status": "ok",
      "foundPath": "string",
      "meta": {
        "name": "string",
        "uuid": "string",
        "receivedUuid": "string",
        "parentUuid": "string",
        "creationTime": "string",
        "generation": "string",
        "subvolumeId": "string",
        "flags": "string",
        "size": {
          "total": "string",
          "exclusive": "string",
          "shared": "string"
        },
        "ageSeconds": 0,
        "lagSeconds": 0
      }
    }
  ],
  "overall": "ok"
}

```

Health and replication status information for a snapshot across primary and replica servers.

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|snapshotPath|string|true|none|Path of the snapshot being checked|
|primary|object|true|none|Primary snapshot health information|
|» status|string|true|none|Primary snapshot status|
|» meta|object|false|none|Optional metadata for the primary snapshot|
|»» name|string|false|none|Snapshot name, if present|
|»» uuid|string|false|none|Snapshot UUID|
|»» receivedUuid|string|false|none|Received UUID for transferred snapshots|
|»» parentUuid|string|false|none|Parent snapshot UUID, if any|
|»» creationTime|string|false|none|Raw creation timestamp|
|»» generation|string|false|none|Filesystem generation string|
|»» subvolumeId|string|false|none|Subvolume identifier|
|»» flags|string|false|none|Filesystem flags associated with snapshot|
|»» size|object|false|none|Size breakdown for the snapshot|
|»»» total|string|false|none|Total size representation (human or bytes)|
|»»» exclusive|string|false|none|Exclusive size representation|
|»»» shared|string|false|none|Shared size representation|
|»» ageSeconds|number|false|none|Age of the snapshot in seconds|
|»» lagSeconds|number|false|none|Replication lag in seconds, if applicable|
|replicas|[object]|true|none|Array of replica health entries|
|» serverUid|string|true|none|UID of the replica server|
|» address|string|true|none|Address of the replica server|
|» port|number|false|none|Port used to reach the replica server|
|» status|string|true|none|Replica health status|
|» foundPath|string|false|none|Path where the snapshot was found on the replica, if any|
|» meta|object|false|none|Optional metadata about the replica snapshot|
|»» name|string|false|none|Snapshot name, if present|
|»» uuid|string|false|none|Snapshot UUID|
|»» receivedUuid|string|false|none|Received UUID for transferred snapshots|
|»» parentUuid|string|false|none|Parent snapshot UUID, if any|
|»» creationTime|string|false|none|Raw creation timestamp|
|»» generation|string|false|none|Filesystem generation string|
|»» subvolumeId|string|false|none|Subvolume identifier|
|»» flags|string|false|none|Filesystem flags associated with snapshot|
|»» size|object|false|none|Size breakdown for the snapshot|
|»»» total|string|false|none|Total size representation (human or bytes)|
|»»» exclusive|string|false|none|Exclusive size representation|
|»»» shared|string|false|none|Shared size representation|
|»» ageSeconds|number|false|none|Age of the snapshot in seconds|
|»» lagSeconds|number|false|none|Replication lag in seconds, if applicable|
|overall|string|true|none|Overall replication health summary|

#### Enumerated Values

|Property|Value|
|---|---|
|status|ok|
|status|missing|
|status|error|
|status|ok|
|status|missing|
|status|error|
|overall|ok|
|overall|degraded|
|overall|failed|

