---
title: Horntell API Reference

language_tabs:
- shell

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

### Attributes

Attribute | Description
--------- | -----------
type | *`string`* <br /> The type of error returned. Can be `bad_request`, `unauthorized`, `forbidden`, `not_found`, `invalid_input` or `internal_error`.
code | *`number`* <br /> This code is same as the HTTP status code for the response. It can be `400`, `401`, `403`, `404` or `500`.
message | *`string`* <br /> The human readble message to give you more clarity about the error.

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

## The profile object

```json
{
    "id": "53a1626b28d56e6708f9dd35",
    "uid": "720974375",
    "name": "John Doe",
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
    "activities_summary": {
        "paid_subscription_fees": {
            "count": 3,
            "first_at": "2014-05-03 10:08:21",
            "last_at": "2014-07-03 10:08:21"
        },
        "invited_a_team_member": {
            "count": 2,
            "first_at": "2014-06-18 10:08:37",
            "last_at": "2014-06-18 10:11:20"
        },
        "asked_a_question_on_forum": {
            "count": 56,
            "first_at": "2014-05-10 10:39:40",
            "last_at": "2014-07-01 23:58:15"
        }
    },
    "campaigns_summary": {
        "53bf732028d56edc0b8b4567": {
            "count": 1,
            "first_at": "2014-05-03 10:10:10",
            "last_at": "2014-05-03 10:10:10"
        }
    },
    "created_at": "2014-05-01 09:56:59",
    "stats": {
        "total_activities": 61,
        "total_revenue": 334.54,
        "total_campaigns": 1
    },
    "segments": ["all", "new", "loyal"]
}
```

### Attributes

Attribute | Description
--------- | -----------
id | *`string`* <br /> This is the primary identifier that Horntell gives to every profile that is created in the system. This identifier is unique all wide the Horntell.
app_id | *`string`* <br /> This is the primary identifier for your app to which the profile belongs.
uid | *`string`* <br /> This is the identifer which is the primary identifier for the user in your app.
name | *`string`* <br /> User's full name.
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
activities_summary | *`object`* <br /> The summary about the activities the user performed in your app. Each activity is summarized in three fields: `count`, `first_at` and `last_at`.
campaigns_summary | *`object`* <br /> The summary about the automatic campaigns that were fired for the user. Each campaign is summarized in three fields: `count`, `first_at` and `last_at`.
created_at | *`string`* *`yyyy-mm-dd hh:mm:ss`*
stats | *`object`* <br /> This object keeps track of the important data points for the user. The three stats that you'll find here are the `total_activities`, `total_revenue` and `total_campaigns`.
segments | *`array`* <br />  The list of segments to which the user belongs.

## Create a New Profile

> POST https://api.horntell.com/profiles

```shell
curl "https://api.horntell.com/profiles"
    -X POST
    -u hornokpleasekey:hornokpleasesecret
    -H "Accept: application/vnd.horntell.v1+json"
    -H "Content-Type: application/json"
    -d '{"uid": "720974375", "first_name": "John", "last_name": "Doe", "email": "john@example.com", "signedup_at": 1387977193, "gender": "male", "custom_attributes": {"type": "earlybird"}}'
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
signedup_at | *`string`* *`yyyy-mm-dd hh:mm:ss`* *`required`* <br /> The time at which the user signed up for your app.
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

## Update a Profile

> PUT https://api.horntell.com/profiles/{uid}

```shell
# This will update the first name of the profile with the `uid` = 720974375

curl "https://api.horntell.com/profiles/720974375"
    -X PUT
    -u hornokpleasekey:hornokpleasesecret
    -H "Accept: application/vnd.horntell.v1+json"
    -H "Content-Type: application/json"
    -d '{"first_name": "Johnny"}'
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

curl "https://api.horntell.com/profiles/720974375"
    -X GET
    -u hornokpleasekey:hornokpleasesecret
    -H "Accept: application/vnd.horntell.v1+json"
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

curl "https://api.horntell.com/profiles/720974375"
    -X DELETE
    -u hornokpleasekey:hornokpleasesecret
    -H "Accept: application/vnd.horntell.v1+json"
```

The following endpoint deletes the profile against the `uid` passed. On successful request, it will return a HTTP 204 (No Content) response.

### Endpoint

`DELETE https://api.horntell.com/profiles/{uid}`

# Activities

Activities is the way you track the behaviour of a user in your app. By tracking behaviour, we are not encouraging you to track each little thing he does in your app, but the important actions that determine the behaviour of the user. Some examples of actions that can be considered as activity can be: inviting a friend, activating his account, upgraded the subscription plan, etc.

## The activity object

```json
{
    "id": "53d2406f28d56eff078b4567",
    "app_id": "539855de9016382d3b8b07d7",
    "profile_uid": "720974375",
    "name": "Purchased A Cat",
    "direction": "inbound",
    "revenue": 34.54,
    "context": {
        "breed": "Street Cat",
        "weight": "2kg"
    },
    "created_at": "2014-07-25 11:33:03"
}
```

### Attributes

Attribute | Description
--------- | -----------
id | *`string`* <br /> This is the primary identifier that Horntell gives to every activity that is created in the system. This identifier is unique all wide the Horntell.
app_id | *`string`* <br /> This is the primary identifier for your app to which the activity belongs.
profile_uid | *`string`* <br /> This is the identifer which is the primary identifier for the user in your app.
name | *`string`* <br /> Activity's complete name.
direction | *`string`* <br /> It's value can either be `inbound` or `outbound`. Inbound activity means the activity has happened from user towards the app (eg. most of the activities). Outbound activity means the activity thas happened from app towards the user (eg. refunds).
revenue | *`float`* <br /> This is the amount of revenue that this activity has brought to your business. This is particularly helpful when properly segmenting your profiles.
created_at | *`string`* *`yyyy-mm-dd hh:mm:ss`* <br /> This timestamp in your timezone when the activity was created.
context | *`hash`* The hash of the custom data you want to save for the activity. You can have upto 5 such custom attributes for each activity.

## Create a New Activity

> POST https://api.horntell.com/profiles/{uid}/activities

```shell
curl "https://api.horntell.com/profiles/720974375/activities"
    -X POST
    -u hornokpleasekey:hornokpleasesecret
    -H "Accept: application/vnd.horntell.v1+json"
    -H "Content-Type: application/json"
    -d '{"name": "purchased a cat", "direction": "inbound", "revenue": 34.54, "context": {"breed": "Streeet Cat", "weight": "2kg"}}'
```

> You will get the following in response

```json
{
    "id": "53d2406f28d56eff078b4567",
    "app_id": "539855de9016382d3b8b07d7",
    "profile_uid": "720974375",
    "name": "Purchased A Cat",
    "direction": "inbound",
    "revenue": 34.54,
    "context": {
        "breed": "Street Cat",
        "weight": "2kg"
    },
    "created_at": "2014-07-25 11:33:03"
}
```

### Attributes

Attribute | Description
--------- | -----------
name | *`string`* *`required`* <br /> Activity's complete name.
direction | *`string`* *`required`* <br /> It's value can either be `inbound` or `outbound`. Inbound activity means the activity has happened from user towards the app (eg. most of the activities). Outbound activity means the activity thas happened from app towards the user (eg. refunds).
revenue | *`float`* <br /> This is the amount of revenue that this activity has brought to your business. This is particularly helpful when properly segmenting your profiles.
context | *`hash`* <br /> The hash of the custom data you want to save for the activity. You can have upto 5 such custom attributes for each activity.

### Calibration

We calibrate the several data points in the activity, which should be properly understood. These calibrations help you to use Horntell in a more robust way. Here are some important things to take care of.

1. The name of activity can be passed as a normal human-readable string, but we will calibrate it into an underscored entity by removed all the special characters. This means that all of these activities mean the same thing to us:
    - Purchased A Cat
    - purchased a cat
    - Purchased A CAT
    - purchased_a_cat
    - purchased-a-cat

    All of these will be calibrated into `purchased_a_cat`, which will the key used at most of the places (eg. in the `activities_summary` of profiles).

    When showing these activities in the dashboard, we convert them to human readable version (`Purchased A Cat`) for better readability.

    What this means to you is that you can stop worrying about keeping the activity names strict around the system as we do the work to calibrate them.

2. Calibration also happens in the `context` hash. All the keys in the hash are calibrated. So, if you pass two keys in the context which yield the same calibrated version, only the first one will be considered and others will be ignored. Suppose you pass in the following keys in the `context` hash:
    - `"product id": "ping-pong"`
    - `"Product Id": "bingo"`

    We will save `product_id` as `ping-pong` and ignore every key that yields that same the calibrated value.

# Horns

Horns are the notifications in the Horntell's terminology. A horn is the primary way of keeping your users engaged in the app. Horns can be sent to a particular profile. An horn can be of one of four formats:

- **Simple**: Horns of this format do not have anything special about them. They are useful for notifying users about some activity in their account. They cannot interact with these horns. Of course, you can add the links through custom HTML, but we do not take responsibility of their interaction.

- **Ask**: Horns of this format provides you ability to add upto 3 buttons for your users to interact with. These can be used to have a single question surveys.

- **Link**: Horns of this format provides you the ability to provide a clickable notification, which will take the user to a diffferent page. This format works best for notifications.

- **Talk**: Horns of this type comes with an input box under them. Users can type in anything and talk to you directly through the horn. These are very useful to build trust among users or to collect some small pieces of information like their email addresses.

<aside class="notice">
    The easiest way to remember these formats is through the acronym **SALT**, which stands for Simple, Ask, Link, Talk.
</aside>

<aside class="notice">
    Horns of each of these formats can also be a **Bubble Horn**. Bubble horns are the horns that opens automatically upon being pushed to your users. Bubbles give you power to get better responses against your horns. But as with every other power, it comes with responsibility. If you send too many bubbles, your users might get frustrated, thus, it is advised to keep these for important things.
</aside>

## Create a New Horn

> POST https://api.horntell.com/profiles/{uid}/horns

```shell
curl "https://api.horntell.com/profiles/720974375/horns"
    -X POST
    -u hornokpleasekey:hornokpleasesecret
    -H "Accept: application/vnd.horntell.v1+json"
    -H "Content-Type: application/json"
    -d '
    {
        "format": "link",
        "type": "info",
        "bubble": true,
        "text": "Welcome campaign was fired.",
        "html": "<strong>Welcome</strong> campaign was fired.",
        "link": "http://example.com/campaigns/welcome"
    }'
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

- **Talk**

    There are no extra attributes for this format.