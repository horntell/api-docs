---
title: Horntell API Reference

language_tabs:
- shell
- php
- ruby
- javascript
- python

search: false
---

# Introduction

```shell
# PHP library available at https://github.com/horntell/php-sdk.
# Ruby library available ar https://github.com/horntell/ruby-sdk
# Node library available ar https://github.com/horntell/node-sdk
# Python library available ar https://github.com/horntell/python-sdk
```

Welcome to the Horntell API. The API is organized around REST. Our API is designed to have predictable, resource-oriented URLs and uses HTTP response codes to indicate API errors.

We use built-in HTTP features, like HTTP authentication and HTTP verbs, which can be understood by off-the-shelf HTTP clients, and we support cross-origin resource sharing to allow you to interact securely with our API from a client-side web application (though you should remember that you should never expose your secret API key in any public website's client-side code).

JSON will be returned in all responses from the API, including errors (though if you're using API bindings, we will convert the response to the appropriate language-specific object).

We have a library for [PHP](https://github.com/horntell/php-sdk), [Ruby](https://github.com/horntell/ruby-sdk), [Node](https://github.com/horntell/node-sdk) and [Python](https://github.com/horntell/python-sdk) ready, but making the calls to API in others shouldn't be different than making cURL requests in the language of your choice. The examples are given on the right hand side.

The base URL for all the API requests is: **https://api.horntell.com**

# Authentication

```shell
curl "https://api.horntell.com" \
-u hornokpleasekey:hornokpleasesecret
```

```php
<?php
Horntell\App::init('hornokpleasekey', 'hornokpleasesecret');
```

```ruby
Horntell::App.init('hornokpleasekey', 'hornokpleasesecret');
```

```javascript
var Horntell = require('horntell');
Horntell.app.init('hornokpleasekey', 'hornokpleasesecret');
```

```python
import horntell
horntell.App().init('hornokpleasekey', 'hornokpleasesecret')
```

You authenticate to the Horntell API by providing your API key and secret in the request. You can manage your API key and secret from your account. Your API keys carry many privileges, so be sure to keep them secret!

Authentication to the API occurs via HTTP Basic Auth. Provide your API key as the basic auth username and your API secret as the basic auth password.

All API requests must be made over HTTPS. Calls made over plain HTTP will fail. You must authenticate for all requests.

<aside class="notice">
    You must replace `hornokpleasekey` with your personal API key and `hornokpleasesecret` with your API secret.
</aside>

# Errors

Horntell uses conventional HTTP response codes to indicate success or failure of an API request. In general, codes in the 2xx range indicate success, codes in the 4xx range indicate an error that resulted from the provided information (e.g. a required parameter was missing, forbidden usage, etc.), and codes in the 5xx range indicate an error with Horntell's servers.

### Attributes

Attribute | Description
--------- | -----------
type | *`string`* <br /> The type of error returned. Can be `bad_request`, `unauthorized`, `forbidden`, `not_found`, `invalid_input` or `internal_error`.
code | *`number`* <br /> This code is same as the HTTP status code for the response. It can be `400`, `401`, `403`, `404` or `500`.
message | *`string`* <br /> The human readble message to give you more clarity about the error.

```php
<?php
try {
    // Use SDK for PHP
} catch(Horntell\Errors\ForbiddenError $e) {
    /* you were successfully authenticated but not allowed to do what you were trying to do.*/
} catch(Horntell\Errors\NotFoundError $e) {
    /* the resource you wanted to work with was not found. eg. creating horn for a profile that doesn't exist.*/
} catch(Horntell\Errors\InvalidRequestError $e) {
    /* any errors (Forbidden, NotFound, etc.) that are thrown due to invalid request extend from this error, and thus, it can be used to catch all such errors instead of catching all of them individually.*/
} catch(Horntell\Errors\AuthenticationError $e) {
    /* the request couldn't be authenticated properly, please verify your app's credentials in such case.*/
} catch(Horntell\Errors\ServiceError $e) {
    /* this error is thrown when something wrong goes on Horntell's servers. Ideally, it should never be thrown. But if it does, we are pinged and we get on fixing it immediately.*/
} catch(Horntell\Errors\NetworkError $e) {
    /* this error is thrown when some network issue arises and the request couldn't be sent to Horntell. Please check your network connection in such case.*/
} catch(Horntell\Errors\Error $e) {
    /* of course, you can be a little lazy and simply catch just this one error, which is the parent of each of the above errors.*/
}
```

```ruby
begin
    # Use SDK for Ruby
rescue Horntell::Errors::ForbiddenError => error
    # you were successfully authenticated but not allowed to do what you were trying to do.
rescue Horntell::Errors::NotFoundError => error
    # the resource you wanted to work with was not found. eg. creating horn for a profile that doesn't exist.
rescue Horntell::Errors::InvalidRequestError => error
    # any errors (Forbidden, NotFound, etc.) that are thrown due to invalid request extend from this error, and thus, it can be used to catch all such errors instead of catching all of them individually.
rescue Horntell::Errors::AuthenticationError => error
    # the request couldn't be authenticated properly, please verify your app's credentials in such case.
rescue Horntell::Errors::ServiceError => error
    # this error is thrown when something wrong goes on Horntell's servers. Ideally, it should never be thrown. But if it does, we are pinged and we get on fixing it immediately.
rescue Horntell::Errors::NetworkError => error
    # this error is thrown when some network issue arises and the request couldn't be sent to Horntell. Please check your network connection in such case.
rescue Horntell::Errors::Error => error
    # of course, you can be a little lazy and simply catch just this one error, which is the parent of each of the above errors.
end
```

```javascript
// Sample error callback function
// Every error object has three methods: getMessage(), getCode(), getType()
function(error) {
    if(error instanceof Horntell.errors.ForbiddenError) {
        /* you were successfully authenticated but not allowed to do what you were trying to do.*/
    } else if(error instanceof Horntell.errors.NotFoundError) {
        /* the resource you wanted to work with was not found. eg. creating horn for a profile that doesn't exist.*/
    } else if(error instanceof Horntell.errors.InvalidRequestError) {
        /* any errors (Forbidden, NotFound, etc.) that are thrown due to invalid request extend from this error, and thus, it can be used to catch all such errors instead of catching all of them individually.*/
    } else if(error instanceof Horntell.errors.AuthenticationError) {
        /* the request couldn't be authenticated properly, please verify your app's credentials in such case.*/
    } else if(error instanceof Horntell.errors.ServiceError) {
        /* this error is thrown when something wrong goes on Horntell's servers. Ideally, it should never be thrown. But if it does, we are pinged and we get on fixing it immediately.*/
    } else if(error instanceof Horntell.errors.NetworkError) {
        /* this error is thrown when some network issue arises and the request couldn't be sent to Horntell. Please check your network connection in such case.*/
    } else if(error instanceof Horntell.errors.Error) {
        /* of course, you can be a little lazy and simply catch just this one error, which is the parent of each of the above errors.*/
    }
}
```

```python
try:
    # Use SDK for Python
except horntell.errors.ForbiddenError, error:
    # you were successfully authenticated but not allowed to do what you were trying to do.
except horntell.errors.NotFoundError, error:
    # the resource you wanted to work with was not found. eg. creating horn for a profile that doesn't exist.
except horntell.errors.InvalidRequestError, error:
    # any errors (Forbidden, NotFound, etc.) that are thrown due to invalid request extend from this error, and thus, it can be used to catch all such errors instead of catching all of them individually.
except horntell.errors.AuthenticationError, error:
    # the request couldn't be authenticated properly, please verify your app's credentials in such case.
except horntell.errors.ServiceError, error:
    # this error is thrown when something wrong goes on Horntell's servers. Ideally, it should never be thrown. But if it does, we are pinged and we get on fixing it immediately.
except horntell.errors.NetworkError, error:
    # this error is thrown when some network issue arises and the request couldn't be sent to Horntell. Please check your network connection in such case.
except horntell.errors.Error, error:
    # of course, you can be a little lazy and simply catch just this one error, which is the parent of each of the above errors.
```

### Handling Errors

Our SDKs can throw exceptions/errors for many reasons, like network issues, validation errors, authentication errors, etc. We strongly recommend always trying to gracefully handle these exceptions.

# Versioning

```shell
curl "https://api.horntell.com" \
-u hornokpleasekey:hornokpleasesecret \
-H "Accept: application/vnd.horntell.v1+json"
```

```php
<?php
// it already defaults to v1, so this can be skipped
Horntell\App::setVersion('v1');
```

```ruby
# it already defaults to v1, so this can be skipped
Horntell::App.set_version('v1');
```

```javascript
// it already defaults to v1, so this can be skipped
Horntell.app.setVersion('v1');
```

```python
# it already defaults to v1, so this can be skipped
horntell.App().set_version('v1')
```

Horntell allows its API to be backward-compatible, and we allow this using the versioned API. Current version of the API is `v1`.

You have to specify the version of the API with each API request in the `Accept:` header. The example on the right is using the version `v1`. If version is not specified with a request, we will route that request to the latest verion of the API.

# Hashing

```shell
# not required in shell
```

```php
<?php
// returns correct uid_hash to be used in JS widget
Horntell\App::hash($uid);
```

```ruby
# returns correct uid_hash to be used in JS widget
Horntell::App.hash(uid);
```

```javascript
// returns correct uid_hash to be used in JS widget
Horntell.app.hash(uid);
```

```python
# returns correct uid_hash to be used in JS widget
horntell.App().hash(uid)
```

[Horntell Center](http://docs.horntell.com/help/articles/how-to-integrate-horntell-center/) needs you to pass a variable called `uid_hash` when configuring. This hash is HMAC SHA256 value of the `uid` using your app's secret key, and is responsible in making sure that the notifications are loaded for the correct user.

Because the hash is needed to be computed on server side, it becomes quite a task to do so. Thus, our SDKs in various languages provides a handy `hash()` method that does it for you. You'll only need to pass in the `uid` and the `hash()` method will return the correct `uid_hash` for that `uid`.

# Profiles

Profiles are the most important object in your app. These objects reflect your users directly (think of them as profiles for your users). Most of the things Horntell allows you to do are dependent on the profiles (after all, they are whom you want to see more engaged in your app).

## The profile object

```json
{
    "id": "53a1626b28d56e6708f9dd35",
    "uid": "720974375",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "signedup_at": "2013-12-25 13:13:13",
    "avatar_url": "http://example.com/johndoe.jpg",
    "gender": "Male",
    "position": "Founder & CEO",
    "company": "Acme, Inc.",
    "industry": "Computer Softwares",
    "location": "San Fransisco, USA",
    "headline": "Everyone's example!",
    "birthday": "1977-02-26",
    "custom_attributes": {
        "first_referral_at": "2014-01-10 00:00:00",
        "type": "earlybird"
    },
    "app_id": "539855de9016382d3b8b07d7",
    "last_seen_at": "2014-07-10 11:27:54",
    "campaigns_summary": {
        "53bf732028d56edc0b8b4567": {
            "count": 1,
            "first_at": "2014-05-03 10:10:10",
            "last_at": "2014-05-03 10:10:10"
        }
    },
    "created_at": "2014-05-01 09:56:59",
    "stats": {
        "total_campaigns": 1,
        "total_horns": 23
    },
    "segments": ["all", "new"]
}
```

### Attributes

Attribute | Description
--------- | -----------
id | *`string`* <br /> This is the primary identifier that Horntell gives to every profile that is created in the system. This identifier is unique all wide the Horntell.
app_id | *`string`* <br /> This is the primary identifier for your app to which the profile belongs.
uid | *`string`* <br /> This is the identifer which is the primary identifier for the user in your app.
first_name | *`string`*
last_name | *`string`*
email | *`string`*
signedup_at | *`string`* *`yyyy-mm-dd hh:mm:ss`* <br /> The timestamp at which the user signed up for your app.
avatar_url | *`string`* *`url`*
gender | *`string`* <br /> Either `Male` or `Female`.
position | *`string`* <br /> The position of the user at his company.
company | *`string`* <br /> The company where the user works.
industry | *`string`*
location | *`string`*
headline | *`string`* <br /> The small description/bio about the user.
birthday | *`string`* *`yyyy-mm-dd`*
custom_attributes | *`hash`* <br /> The hash of custom key-value pairs.
last_seen_at | *`string`* *`yyyy-mm-dd hh:mm:ss`* <br /> This is the last time the user was seen in your app.
campaigns_summary | *`object`* <br /> The summary about the campaigns that were fired for the user. Each campaign is summarized in three fields: `count`, `first_at` and `last_at`.
created_at | *`string`* *`yyyy-mm-dd hh:mm:ss`*
stats | *`object`* <br /> This object keeps track of the important data points for the user. The three stats that you'll find here are the `total_campaigns`, `total_horns`.
segments | *`array`* <br />  The list of segments to which the user belongs.

## Create a New Profile

> POST https://api.horntell.com/profiles

```shell
curl "https://api.horntell.com/profiles" \
    -X POST \
    -u hornokpleasekey:hornokpleasesecret \
    -H "Accept: application/vnd.horntell.v1+json" \
    -H "Content-Type: application/json" \
    -d '{"uid": "720974375", "first_name": "John", "last_name": "Doe", "email": "john@example.com", "signedup_at": 1387977193, "gender": "male", "custom_attributes": {"type": "earlybird"}}'
```

```php
<?php
(new Horntell\Profile)->create(array(
    'uid' => '720974375',
    'first_name' => 'John',
    'last_name' => 'Doe',
    'email' => 'john@example.com',
    'signedup_at' => 1387977193,
    'gender' => 'male',
    'custom_attributes' => array('type' => 'earlybird')
));
```

```ruby
Horntell::Profile.create({
    :uid => '720974375',
    :first_name => 'John',
    :last_name => 'Doe',
    :email => 'john@example.com',
    :signedup_at => 1387977193,
    :gender => 'male',
    :custom_attributes => {:type => 'earlybird'}
})
```

```javascript
Horntell.profile.create({
    uid: '720974375',
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@example.com',
    signedup_at: 1387977193,
    gender: 'male',
    custom_attributes: {type: 'earlybird'}
}).then(successCallback, errorCallback);
```

```python
horntell.Profile().create({
    'uid': '720974375',
    'first_name': 'John',
    'last_name': 'Doe',
    'email': 'john@example.com',
    'signedup_at': 1387977193,
    'gender': 'male',
    'custom_attributes': {'type': 'earlybird'}
})
```

> You will get the following in response

```json
{
    "data": {
        "uid": "720974375",
        "first_name": "John",
        "last_name": "Doe",
        "email": "john@example.com",
        "signedup_at": "2013-12-25 13:13:13",
        "avatar_url": null,
        "gender": "Male",
        "position": null,
        "company": null,
        "industry": null,
        "location": null,
        "birthday": null,
        "headline": null,
        "last_seen_at": "2013-12-25 13:13:13",
        "custom_attributes": {
            "type": "earlybird"
        }
    }
}
```

Creates a new profile.

### Endpoint

`POST https://api.horntell.com/profiles`

### Arguments

Argument | Description
-------- | -----------
uid | *`string`* *`required`* <br /> The primary identifier for the user in your app.
first_name | *`string`* <br /> First name of the user in your app.
last_name | *`string`* <br /> Last name of the user in your app.
email | *`string`* <br /> The valid email address for the user. This email address is used to send the campaign emails to the profile.
signedup_at | *`string`* *`yyyy-mm-dd hh:mm:ss`* <br /> The time at which the user signed up for your app.
avatar_url | *`string`* *`url`* <br /> The URL at which the Horntell can find the profile picture for the profile. This makes your dashboard look good.
gender | *`string`* <br /> Gender can either be `male` or `female` (all lowercase).
position | *`string`* <br /> The position at which the user works at his company.
company | *`string`* <br /> The company at which the user works.
industry | *`string`* <br /> The industry in which the user works.
location | *`string`* <br /> The geographical place where the user lives.
headline | *`string`* <br /> The small description/bio about the user.
birthday | *`string`* *`yyyy-mm-dd`* <br /> Happy birthday to you!
custom_attributes | *`hash`* <br /> The hash of custom key-value pairs. Any arrays and objects will return in an error.

<aside class="notice">
    The more information you put in the profile, the better your account looks.
</aside>

### Custom Attributes

Horntell allows you to add any amount of custom attributes to your profiles to later filter upon. However, the concept of adding custom attributes is simple (simply pass in hash of data), there are a few things to understand to make most out of it.

The true value of custom attributes is extracted when using them in filtering your profiles. You can compare (`starts_with`, `contains`, etc.) these custom attributes just like the default attributes (`first_name`, `gender`, etc.). The comparison operators that you get corresponding to each attribute depends on the type of attribute it is. For example, a attribute with data type `number` will have comparison operators like `greater than`, `less than`, which makes no sense when working with `string` attributes.

Thus, data type of custom attributes become crucial when it comes to using them for filtering. By default, custom attribute will be considered as a `string` and will receive comparison rules for `string` attribute. However, using these tips, you can make Horntell comprehend corret data type for your attributes.

- If an attribute is seen with either of these values `'true'` (string), `'false'` (string), `true` (boolean), `false` (boolean), it is considered to be a boolean attribute.
- If an attribute's data type is `int` or `float`, it is considered to be a `number` attribute.
- If an attribute's data type is `int` type and the `key` ends with `_at` (eg. `account_activated_at`), it is assumed to be an UNIX timestamp in UTC, and will be typecasted into `date` attribute.

## Update a Profile

> PUT https://api.horntell.com/profiles/{uid}

```shell
# This will update the first name of the profile with the `uid` = 720974375

curl "https://api.horntell.com/profiles/720974375" \
    -X PUT \
    -u hornokpleasekey:hornokpleasesecret \
    -H "Accept: application/vnd.horntell.v1+json" \
    -H "Content-Type: application/json" \
    -d '{"first_name": "Johnny"}'
```

```php
<?php
// This will update the first name of the profile with the `uid` = 720974375

(new Horntell\Profile)->update('720974375', array(
    'first_name' => 'Johnny'
));
```

```ruby
# This will update the first name of the profile with the `uid` = 720974375

Horntell::Profile.update('720974375', {
    :first_name => 'Johnny'
})
```

```javascript
Horntell.profile.update('720974375', {
    first_name: 'Johnny',
}).then(successCallback, errorCallback);
```

```python
horntell.Profile().update('720974375', {
    'first_name': 'Johnny',
})
```

> You will get the following in response

```json
{
    "data": {
        "uid": "720974375",
        "first_name": "Johnny",
        "last_name": "Doe",
        "email": "john@example.com",
        "signedup_at": "2013-12-25 13:13:13",
        "avatar_url": null,
        "gender": "Male",
        "position": null,
        "company": null,
        "industry": null,
        "location": null,
        "birthday": null,
        "headline": null,
        "last_seen_at": "2013-12-25 13:13:13",
        "custom_attributes": {
            "type": "earlybird"
        }
    }
}
```

The following endpoint updates the profile with the new information. The fields that you send with the update request overwrites the older values for the fields.

<aside class="warning">
    You cannot modify the `uid` of a profile. If you want to update the `uid` itself, consider creating a new profile with the new `uid`.
</aside>

### Endpoint

`PUT https://api.horntell.com/profiles/{uid}`

### Arguments

Argument | Description
-------- | -----------
first_name | *`string`* <br /> First name of the user in your app.
last_name | *`string`* <br /> Last name of the user in your app.
email | *`string`* <br /> The valid email address for the user. This email address is used to send the campaign emails to the profile.
signedup_at | *`string`* *`yyyy-mm-dd hh:mm:ss`* <br /> The time at which the user signed up for your app.
avatar_url | *`string`* *`url`* <br /> The URL at which the Horntell can find the profile picture for the profile. This makes your dashboard look good.
gender | *`string`* <br /> Gender can either be `male` or `female` (all lowercase).
position | *`string`* <br /> The position at which the user works at his company.
company | *`string`* <br /> The company at which the user works.
industry | *`string`* <br /> The industry in which the user works.
location | *`string`* <br /> The geographical place where the user lives.
headline | *`string`* <br /> The small description/bio about the user.
birthday | *`string`* *`yyyy-mm-dd`* <br /> Happy birthday to you!
custom_attributes | *`hash`* The hash of custom key-value pairs.

## Get a Profile

> GET https://api.horntell.com/profiles/{uid}

```shell
# This will fetch the profile with the `uid` = 720974375

curl "https://api.horntell.com/profiles/720974375" \
    -X GET \
    -u hornokpleasekey:hornokpleasesecret \
    -H "Accept: application/vnd.horntell.v1+json" \
```

```php
<?php
// This will fetch the profile with the `uid` = 720974375

(new Horntell\Profile)->find('720974375');
```

```ruby
# This will fetch the profile with the `uid` = 720974375

Horntell::Profile.find('720974375')
```

```javascript
// This will fetch the profile with the `uid` = 720974375

Horntell.profile.find('720974375')
    .then(successCallback, errorCallback);
```

```python
# This will fetch the profile with the `uid` = 720974375

horntell.Profile().find('720974375')
```

> You will get the following in response

```json
{
    "data": {
        "uid": "720974375",
        "first_name": "Johnny",
        "last_name": "Doe",
        "email": "john@example.com",
        "signedup_at": "2013-12-25 13:13:13",
        "avatar_url": null,
        "gender": "Male",
        "position": null,
        "company": null,
        "industry": null,
        "location": null,
        "birthday": null,
        "headline": null,
        "last_seen_at": "2013-12-25 13:13:13",
        "custom_attributes": {
            "type": "earlybird"
        }
    }
}
```

The following endpoint fetches the profile against the `uid` passed.

### Endpoint

`GET https://api.horntell.com/profiles/{uid}`


## Delete a Profile

> DELETE https://api.horntell.com/profiles/{uid}

```shell
# This will delete the profile with the `uid` = 720974375

curl "https://api.horntell.com/profiles/720974375" \
    -X DELETE \
    -u hornokpleasekey:hornokpleasesecret \
    -H "Accept: application/vnd.horntell.v1+json" \
```

```php
<?php
// This will delete the profile with the `uid` = 720974375

(new Horntell\Profile)->delete('720974375');
```

```ruby
# This will delete the profile with the `uid` = 720974375

Horntell::Profile.delete('720974375')
```

```javascript
// This will delete the profile with the `uid` = 720974375

Horntell.profile.delete('720974375')
    .then(successCallback, errorCallback);
```

```python
# This will delete the profile with the `uid` = 720974375

horntell.Profile().delete('720974375')
```

The following endpoint deletes the profile against the `uid` passed. On successful request, it will return a HTTP 204 (No Content) response.

### Endpoint

`DELETE https://api.horntell.com/profiles/{uid}`

# Horns

Horns are the notifications in the Horntell's terminology. A horn is the primary way of keeping your users engaged in the app. Horns can be sent to a particular profile or multiple profiles. An horn can be of one of four formats:

- **Simple**: Horns of this format do not have anything special about them. They are useful for notifying users about some activity in their account. They cannot interact with these horns. Of course, you can add the links through custom HTML, but we do not take responsibility of their interaction.

- **Ask**: Horns of this format provides you ability to add upto 3 buttons for your users to interact with. These can be used to have a single question surveys.

- **Link**: Horns of this format provides you the ability to provide a clickable notification, which will take the user to a diffferent page. This format works best for notifications.

- **Talk**: Horns of this type comes with an input box under them. Users can type in anything and talk to you directly through the horn. These are very useful to build trust among users or to collect some small pieces of information like their email addresses.

<aside class="notice">
    The easiest way to remember these formats is through the acronym **SALT**, which stands for Simple, Ask, Link, Talk.
</aside>

<aside class="notice">
    Horns of each of these formats can also be a **Bubble Horn**. Bubble horns are the horns that opens automatically upon being pushed to your users. Bubbles give you power to get better responses against your horns. But as with every other power, it comes with responsibility. If you send too many bubbles, your users might get frustrated, thus, it is advised to keep these for important/urgent things.
</aside>

## Create a New Horn

> POST https://api.horntell.com/profiles/{uid}/horns

```shell
curl "https://api.horntell.com/profiles/720974375/horns" \
    -X POST \
    -u hornokpleasekey:hornokpleasesecret \
    -H "Accept: application/vnd.horntell.v1+json" \
    -H "Content-Type: application/json" \
    -d '
    {
        "format": "link",
        "type": "info",
        "bubble": true,
        "text": "Welcome campaign was fired.",
        "html": "<strong>Welcome</strong> campaign was fired.",
        "link": "http://example.com/campaigns/welcome",
        "new_window": true
    }'
```

```php
<?php
(new Horntell\Horn)->toProfile('720974375', array(
    'format' => 'link',
    'type' => 'info',
    'bubble' => true,
    'text' => 'Welcome campaign was fired.',
    'html' => '<strong>Welcome</strong> campaign was fired.',
    'link' => 'http://app.example.com/campaigns/welcome',
    'new_window' => true
));
```

```ruby
Horntell::Horn.to_profile('720974375', {
    :format => 'link',
    :type => 'info',
    :bubble => true,
    :text => 'Welcome campaign was fired.',
    :html => '<strong>Welcome</strong> campaign was fired.',
    :link => 'http://app.example.com/campaigns/welcome',
    :new_window => true
})
```

```javascript
Horntell.horn.toProfile('720974375', {  
    format: 'link',
    type: 'info',
    bubble: true,
    text: 'Welcome campaign was fired.',
    html: '<strong>Welcome</strong> campaign was fired.',
    link: 'http://app.example.com/campaigns/welcome',
    new_window: true
}).then(successCallback, errorCallback);
```

```python
horntell.Horn().to_profile('720974375', {  
    'format': 'link',
    'type': 'info',
    'bubble': True,
    'text': 'Welcome campaign was fired.',
    'html': '<strong>Welcome</strong> campaign was fired.',
    'link': 'http://app.example.com/campaigns/welcome',
    'new_window': True
    'new_window': True
})
```

> You will get the HTTP 204 (No Content) in response for the successful request.

### Attributes

The following are the attributes which are same for all formats of horns. There are some extra attributes, for each format of horns, which are discussed below.

Attribute | Description
--------- | -----------
format | *`string`* *`required`* <br /> It should be one of these: `simple`, `ask`, `link` or `talk`.
type | *`string`* *`required`* <br /> You can give a color to your horn depending upon the situation. For instance, account expiry warning can be red colored, while simple heads up can be blue colored. The available types are: `info` (blue), `success` (green), `warning` (orange), `danger` (red).
text | *`string`* *`required`* <br /> This is the plain text version of the horn. We require this to show something in situations where HTML cannot be rendered.
bubble | *`boolean`* When set to `true`, the horn will be opened automatically when pushed to the user.
html | *`string`* <br /> When available, this string will be rendered as HTML rather than the `text` string. We parse the HTMl and clean it for all XSS attempts. We have a very strict whitelist of the tags that you can use in your html. You have the following tags available to use: `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`, `<strong>`, `<em>`, `<sub>`, `<sup>`, `<small>`, `<code>`, `<pre>`, `<strike>`, `<table>`, `<thead>`, `<tbody>`, `<tfoot>`, `<tr>`, `<th>`, `<td>`, `<ul>`, `<ol>`, `<li>`, `<a>`, `<img>`, `<iframe>`.

### Special Attributes

Each format comes with some extra attributes that allows you to control the interaction of horn with the user. Here we detail the extra attributes that horn of each format can have.

- **Simple**

    There are no extra attributes for this format.

- **Ask**

    Attribute | Description
    --------- | -----------
    options | *`array`* *`required`* <br /> It is an array which contains details about the buttons to render for the horn. It can have maximum of 3 elements, where each element can either be a string (text on the button) or be an object with two keys: `type` and `text`. The `text` is the text to the shown on button and `type` can be one of these values to denote the color of button: `default` (white), `success` (green), `warning` (orange), `danger` (red).

- **Link**

    Attribute | Description
    --------- | -----------
    link | *`string`* *`url`* *`required`* <br /> It is the URL of the page where the user should be sent to upon clicking.
    new_window | *`boolean`* <br /> When set to `true`, the notification created will open the links in new window.

- **Talk**

    There are no extra attributes for this format.

# Campaigns

There's a problem when you hard-code the content of horns in your codebase, commit it and push it to production. The problem is that, if you want to change the content of horns, you'll have to repeat the whole cycle of **code - commit - ship** to get it done. This sucks. And campaigns solve this problem.

Campaigns allow you to keep the horns stored as templates in your account and when you need to send a horn, simply use API endpoint to run a particular campaign. This has two benefits over hard-coding horn's data in the codebase:

- You can modify horn's content really quickly from your Horntell dashboard - without touching your codebase ever.
- The stats to all the horns under one campaign can be seen together for analysis.

<aside class="success">
    While using campaigns, horn's content can be personalized using placeholders (eg. `{first_name}`), which will be parsed and replaced whenever creating horns for a profile.
</aside>

## Run Campaign for a Single Profile

> POST https://api.horntell.com/profiles/{uid}/campaigns/{campaign_id}

```shell
curl "https://api.horntell.com/profiles/720974375/campaigns/54afd3259f17f6b9468b4567" \
    -X POST \
    -u hornokpleasekey:hornokpleasesecret \
    -H "Accept: application/vnd.horntell.v1+json" \
    -H "Content-Type: application/json"
    -d '
    {
        "meta": {
            "friend_name": "Alley Doe"
        }
    }'
```

```php
<?php
(new Horntell\Campaign)->toProfile('720974375', '54afd3259f17f6b9468b4567',
    array('friend_name' => 'Alley Doe')
);
```

```ruby
Horntell::Campaign.to_profile('720974375', '54afd3259f17f6b9468b4567',
    {:friend_name => 'Alley Doe'}
)
```

```javascript
Horntell.campaign.toProfile('720974375', '54afd3259f17f6b9468b4567',
    {friend_name: 'Alley Doe'}
).then(successCallback, errorCallback);
```

```python
horntell.Campaign().to_profile('720974375', '54afd3259f17f6b9468b4567',
    {'friend_name': 'Alley Doe'}
)
```

> You will get the HTTP 204 (No Content) in response for the successful request.

If you've specified some **meta variables** (using content like this: `{meta.friend_name}`) in your campaigns, then, you'll need to pass in the hash of those meta variables with their corresponding values. Horntell will then replace those meta variables with the values passed to create final compiled notification's content.

If there're no meta variables in your campaign's content, you don't need to pass in anything.

### Attributes

Attribute | Description
--------- | -----------
meta | *`array`* <br /> If your campaign contains meta variables, you'll need to pass the values of those variables when firing the campaign.

## Run Campaign for a Multiple Profiles

> POST https://api.horntell.com/profiles/campaigns/{campaign_id}

```shell
curl "https://api.horntell.com/profiles/campaigns/54afd3259f17f6b9468b4567" \
    -X POST \
    -u hornokpleasekey:hornokpleasesecret \
    -H "Accept: application/vnd.horntell.v1+json" \
    -H "Content-Type: application/json"
    -d '
    {
        "profile_uids": ["720974375", "720974376", "720974377"],
        "meta": {
            "friend_name": "Alley Doe"
        }
    }'
```

```php
<?php
(new Horntell\Campaign)->toProfiles(
    array("720974375", "720974376", "720974377"), '54afd3259f17f6b9468b4567',
    array('friend_name' => 'Alley Doe')
);
```

```ruby
Horntell\Campaign::to_profiles(
    ["720974375", "720974376", "720974377"], '54afd3259f17f6b9468b4567',
    {:friend_name => 'Alley Doe'}
)
```

```javascript
Horntell.campaign.toProfiles(
    ["720974375", "720974376", "720974377"], '54afd3259f17f6b9468b4567',
    {friend_name: 'Alley Doe'}
).then(successCallback, errorCallback);
```

```python
horntell.Campaign().to_profiles(
    ["720974375", "720974376", "720974377"], '54afd3259f17f6b9468b4567',
    {'friend_name': 'Alley Doe'}
)
```

> You will get the HTTP 204 (No Content) in response for the successful request.

What if you would want to run a campaign for 100 users? Making 100 API calls is not a good way to do it. Better way is to use this end-point which accepts an array of `profile_uid`'s and runs the campaign for all of those.

### Attributes

When running a campaign for multiple profiles, we need these attributes.

Attribute | Description
--------- | -----------
profile_uids | *`array`* *`required`* <br /> It will be an array of `profile_uid`'s.
meta | *`array`* <br /> If your campaign contains meta variables, you'll need to pass the values of those variables when firing the campaign.