---
title: Embeded C
currentMenu: datahub-sdk-embededc
parent2: datahub-sdk
parent1: dsd-datahub
---

# Data Hub Embeded C SDK

## Getting Started

To get started head over to our [QuickStart](/quickstart.html) which will help you install IoT Data Analytics tracking your devices, applications and your site in just a few minutes. Once you’ve installed the library, read on for the detailed API reference!

## Identify

The **identify** method is how you tie one of your users and their actions to a recognizable userId and traits. You can read more about how to set it up or about how it works.

*Note*: You won’t need to call identify for anonymous users of your devices or  visitors to your services. We’ll automatically assign them an anonymousId, so just calling page and track will still work just fine without **identify**.

Here’s what an **identify** call looks like, along with its method signature:

```
dsdSourceIdentify("43loelgopw8", "{\"name\":\"Barco You\",\"email\":\"barco@dasudian.com\",\"gender\":\"mail\"}", NULL);
```
> int dsdSourceIdentify(char *userId, char *traits, char *options);


**userId**
The unique identifier for the user, which is stored in your Database or fetched from 3rd party services (e.g. Facebook or Wechat). If you don’t know who the user is yet, you can omit the userId and just record traits. You can read more about identities in the identify reference.

**traits**
A dictionary of traits you know about the user, like their email or name. You can read more about traits in the identify reference.

**options**
A dictionary of options, that let you do things like enable or disable specific integrations for the call. Note: If you do not pass a properties object, pass an empty object (ie, NULL) before options

The userId is optional. So you can omit the userId if you want to associate traits with the currently identified user, anonymous or not, like so:

```
dsdSourceIdentify(NULL, "{\"email\":\"barco@dasudian.com\",\"newsletter\":\"true\",\"industry\":\"Technology\"}", NULL);
```

We’ll store those traits internally, and carry them over the next time you call **identify** with a *userId*. For example, you might do that when someone signs up for a newsletter but hasn’t yet created an account on your site.

Record
------

The **record** method lets you record any envents generated by your devcies or actions your users perform. You can read more about how to set it up or about how it works.

Here’s a basic example, along with the **record** method signature:

```
dsdSourceRecord("Power on", "{\"type\":\"Start Engine\",\"duration\":\"12.1s\",\"maxVoltage\":\"13\",\"stableVoltage\":\"8\",\"maxCurrency\": \"100mA\",\"stableCurrency\":\"80mA\"}", NULL, 0, NULL);
```
> void dsdSourceRecord(char *event, char *properties, char *options, DSDCallback callback);

**event**
The name of the event recordd by your devices or applications that you hope to track. You can read more about the track method and what event names we recommend.

**properties**
A dictionary of properties for the event. If the event was 'Added to Cart', it might have properties like price and productType.

**options**
A dictionary of options, that let you do things like enable or disable specific integrations for the call. Note: If you do not pass a properties object, pass an empty object (ie, NULL) before options

**callback**
A callback function that gets called after a short timeout, giving the browser time to make the track requests first. Also checkout our dedicated trackLink and trackForm helpers.

Track
----

The **track** method lets you track the position of your devices along with optional extra information about the position in real-time.

Here’s a basic example, along with the track method signature:

```
dsdSourceTrack("Languang Building", "{\"latitude\":\"24.597\",\"Longitude\":\"-24.455\"}", 0, NULL);
```

> void dsdSourceTrack(char *name, char *location, char *options, DSDCallback callback);

**name**
The name of the of the position, for example "Languang Building".

**location**
A dictionary of latitude and longitude properties of the position. 

**options**
A dictionary of options, that let you do things like enable or disable specific integrations for the call. Note: If you do not pass a properties object, pass an empty object (ie, ‘{}’) before options

**callback**
A callback function that gets called after a short timeout, giving the browser time to make outbound requests first.

## Alias

The **alias** method combines two previously unassociated user/client/device identities. This comes in handy if the same user visits from two different services or your devices changed identifiers for different services, and you want to combine their history.

Some providers also don’t alias automatically for you when an anonymous user signs up (like Mixpanel), so you need to call alias manually right after sign up with their brand new userId.

Here’s a basic example along with the alias method signature:

> int dsdSourceAlias(char *Id, char *previousId, char *options, DSDCallback callback);

**Id**
The new User/Client/Device ID you want to associate the user/client/device with.

**previousId**
The previous ID that the user/client/device was recognized by. This defaults to the currently identified user’s ID if you don’t pass one. In most cases you don’t need to worry about this argument.

**options**
A dictionary of options, that let you do things like enable or disable specific integrations for the call.

**callback**
A callback function that gets called after a short timeout, giving the browser time to make the alias requests first.

Group
-----

The **group** method associates an user or a device with a group. The group can be a company, organization, account, project, workspace, team or any other name you came up with for the same concept.

A user/device can be in more than one group; however, not all platforms support multiple groups. It also lets you record custom traits about the group, like industry or number of employees. Calling group is a slightly more advanced feature, but it’s helpful if you have accounts with multiple users.

Here’s a basic example along with the group method signature:

```
dsdSourceGroup("IoT_Aliiance", \"{\"name\": \"Dasudian\",\"industry\": \"Technology\",\"employees\": \"120\"}", NULL, NULL);
```

> void dsdSourceGroup(char *groupId, char *traits, char *options, DSDCallback callback);

**groupId**
The new Group ID you want to create and associate the currently identified or anonymous user/device with.

**traits**
A dictionary of traits for the group. Example traits for a group include address, website and employees.

**options**
A dictionary of options, that let you do things like enable or disable specific integrations for the call. Note: If you do not pass a properties object, pass an empty object (ie, NULL) before options

**callback**
A callback function that gets called after a short timeout, giving the browser time to make the track requests first. Also checkout our dedicated trackLink and trackForm helpers.

Selecting Integrations
----------------------

Filtering events calls can be done right from the [Dasudian Developer's Portal](https://dev.dasudian.com) on your project schema page. We recommend using the UI if possible since it’s a much simpler way of managing your filters and can be updated with no code changes on your side.

The alias, group, identify, page and record calls can all be passed an object of options that lets you turn certain integrations on or off.

Here’s an example showing an identify call that only goes to Mixpanel and KISSmetrics:

```
dsdSourceIdentify("019mr8mf4r", "{\"email\": \"barco@dasudian.com\",\"plan\": \"Premium\"}", 
"{\"integrations\": {\"All\": \"false\",\"Mixpanel\":\"true\",\"KISSmetrics\":\"true\"}}");
```
In this case, we’re specifying that we want this identify to only go to Mixpanel and KISSmetrics. 'All': false says that no integration should be enabled unless otherwise specified. 'Mixpanel': true turns on Mixpanel, etc. Note, you must use an Integration’s formal, case sensitive name (i.e. “AdLearn Open Platform”, “awe.sm”, “MailChimp”, etc.), which is also the title of the integration’s documentation.
