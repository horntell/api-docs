---
title: Horntell API Reference

language_tabs:
  - shell

includes:
  - errors

search: false
---

# Introduction

```shell
# Libraries in various languages, coming soon!
```

Welcome to the Horntell API. The API is organized around REST. Our API is designed to have predictable, resource-oriented URLs and uses HTTP response codes to indicate API errors.

We use built-in HTTP features, like HTTP authentication and HTTP verbs, which can be understood by off-the-shelf HTTP clients, and we support cross-origin resource sharing to allow you to interact securely with our API from a client-side web application (though you should remember that you should never expose your secret API key in any public website's client-side code).

JSON will be returned in all responses from the API, including errors (though if you're using API bindings, we will convert the response to the appropriate language-specific object).

We do not have libraries for various programming languages yet (PHP library coming soon), but making the calls to API shouldn't be different than making cURL requests in the language of your choice. The examples are given on the right hand side.

The base URL for all the API requests is: **https://api.horntell.com**

# Authentication

```shell
curl "https://api.horntell.com"
  -u hornokpleasekey:hornokpleasesecret
```

You authenticate to the Horntell API by providing your API key and secret in the request. You can manage your API key and secret from your account. Your API keys carry many privileges, so be sure to keep them secret!

Authentication to the API occurs via HTTP Basic Auth. Provide your API key as the basic auth username and your API secret as the basic auth password.

All API requests must be made over HTTPS. Calls made over plain HTTP will fail. You must authenticate for all requests.

<aside class="notice">
You must replace `hornokpleasekey` with your personal API key and `hornokpleasesecret` with your API secret.
</aside>

# Errors

Horntell uses conventional HTTP response codes to indicate success or failure of an API request. In general, codes in the 2xx range indicate success, codes in the 4xx range indicate an error that resulted from the provided information (e.g. a required parameter was missing, forbidden usage, etc.), and codes in the 5xx range indicate an error with Horntell's servers.

**Attributes**

Attribute | Description
--------- | -----------
type | The type of error returned. Can be `bad_request`, `unauthorized`, `forbidden`, `not_found`, `invalid_input` or `internal_error`.
code | This code is same as the HTTP status code for the response. It can be `400`, `401`, `403`, `404` or `500`.
message | The human readble message to give you more clarity about the error.

# Versioning

```shell
curl "https://api.horntell.com"
  -u hornokpleasekey:hornokpleasesecret
  -H "Accept: application/vnd.horntell.v1+json"
```

Horntell allows its API to be backward-compatible, and we allow this using the versioned API. Current version of the API is `v1`.

You have to specify the version of the API with each API request in the `Accept:` header. The example on the right is using the version `v1`. If version is not specified with a request, we will route that request to the latest verion of the API.

# Profiles

Profiles are the most important object in your app. These objects reflect your users directly (think of them as profiles for your users). Most of the things Horntell allows you to do are dependent on the profiles (after all, they are whom you want to see more engaged in your app).

### The profile object

**Attributes**

Attribute | Description
--------- | -----------

## Get All Kittens

```ruby
require 'kittn'

api = Kittn::APIClient.authorize!('meowmeowmeow')
api.kittens.get
```

```python
import 'kittn'

api = Kittn.authorize('meowmeowmeow')
api.kittens.get()
```

```shell
curl "http://example.com/api/kittens"
  -H "Authorization: meowmeowmeow"
```

> The above command returns JSON structured like this:

```json
[
  {
    "id": 1,
    "name": "Fluffums",
    "breed": "calico",
    "fluffiness": 6,
    "cuteness": 7
  },
  {
    "id": 2,
    "name": "Isis",
    "breed": "unknown",
    "fluffiness": 5,
    "cuteness": 10
  }
]
```

This endpoint retrieves all kittens.

### HTTP Request

`GET http://example.com/kittens`

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
include_cats | false | If set to true, the result will also include cats.
available | true | If set to false, the result will include kittens that have already been adopted.

<aside class="success">
Remember — a happy kitten is an authenticated kitten!
</aside>

## Get a Specific Kitten

```ruby
require 'kittn'

api = Kittn::APIClient.authorize!('meowmeowmeow')
api.kittens.get(2)
```

```python
import 'kittn'

api = Kittn.authorize('meowmeowmeow')
api.kittens.get(2)
```

```shell
curl "http://example.com/api/kittens/3"
  -H "Authorization: meowmeowmeow"
```

> The above command returns JSON structured like this:

```json
{
  "id": 2,
  "name": "Isis",
  "breed": "unknown",
  "fluffiness": 5,
  "cuteness": 10
}
```

This endpoint retrieves a specific kitten.

<aside class="warning">If you're not using an administrator API key, note that some kittens will return 403 Forbidden if they are hidden for admins only.</aside>

### HTTP Request

`GET http://example.com/kittens/<ID>`

### URL Parameters

Parameter | Description
--------- | -----------
ID | The ID of the cat to retrieve

