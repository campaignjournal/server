## server
Powers the most fantastical app on the web.

## basic structure 

![FlowChart](/asset/campaignjournal.png)

## deployment

https://campaign-journal-api.herokuapp.com/

## tech stack: 

node | express | knex | sqlite3 | bycryptjs | jsonwebtoken 

## end points

### USERS

/api/users/register (POST)

* Request body:

```
  {
    "username": "one111", //required
    "password": "one111", //required
    "email": "abc@gmail.com", //required
  }

```

/api/users/login (POST)

* Request body:

```
  {
    "username": "one111", //required
    "password": "one111", //required
  }

```
/api/users (GET)

* Request header:

```
  {
    "Authorization": token, //required
  }
```

/api/users/:id (GET)

* Request header:

```
  {
    "Authorization": token, //required
  }
```

/api/users/:id (PUT)

* Request body:

```
  {
    "username": "one111", //required
    "password": "one111", //required
    "email": "abc@gmail.com", //required
  }

```

/api/users/:id (DELETE)

* Request header:

```
  {
    "Authorization": token, //required
  }
```

### CAMPAIGNS 

/api/campaigns (POST)

* Request body:

```
  {
    "name": "journey to the west", //required
    "description": "a very good time", //required
    "user_id": 1, //required
  }
```

/api/campaigns (GET)

* Request header:

```
  {
    "Authorization": token, //required
  }
```

/api/campaigns/:userid (GET)

* Request header:

```
  {
    "Authorization": token, //required
  }
```

/api/campaigns/:id (GET)

* Request header:

```
  {
    "Authorization": token, //required
  }
```

/api/campaigns/:id (PUT)

* Request body:

```
  {
    "name": "journey to the west", //required
    "description": "a very good time", //required
    "user_id": 1, //required
  }
```

/api/campaigns/:id (DELETE)

* Request header:

```
  {
    "Authorization": token, //required
  }
```

### CHARACTERS 

/api/campaigns/:id/characters (POST)

* Request body:

```
  {
    "name": "Grugnak", //required
    "description": "tall and green", //required
    "ancestry": "orc", //required
    "class": "wizard", //required
    "level": 1, //required
    "campaign_id": 1, //required
  }
```

/api/campaigns/:id/characters (GET)

* Request header:

```
  {
    "Authorization": token, //required
  }
```

/api/campaigns/:id/characters/:characterid (GET)

* Request header:

```
  {
    "Authorization": token, //required
  }
```

/api/campaigns/:id/characters/:characterid (PUT)

* Request body:

```
  {
    "name": "Grugnak", //required
    "description": "tall and green", //required
    "ancestry": "orc", //required
    "class": "wizard", //required
    "level": 1, //required
    "campaign_id": 1, //required
  }
```

/api/campaigns/:id/characters/:characterid (DELETE)

* Request header:

```
  {
    "Authorization": token, //required
  }
```

### COUNTRIES

/api/campaigns/:id/countries (POST)

* Request body:

```
  {
    "name": "United States", //required
    "description": "land of the free, home of the brave, inventors of the super soaker", //required
    "founded": "1776", //required
    "ruler": "Abraham Lincoln's Holy Ghost", //required
    "campaign_id": 1, //required
  }
```

/api/campaigns/:id/countries (GET)

* Request header:

```
  {
    "Authorization": token, //required
  }
```

/api/campaigns/:id/countries/:countryid (GET)

* Request header:

```
  {
    "Authorization": token, //required
  }
```

/api/campaigns/:id/countries/:countryid (PUT)

* Request body:

```
  {
    "name": "United States", //required
    "description": "land of the free, home of the brave, inventors of the super soaker", //required
    "founded": "1776", //required
    "ruler": "Abraham Lincoln's Holy Ghost", //required
    "campaign_id": 1, //required
  }
```

/api/campaigns/:id/countries/:countryid (DELETE)

* Request header:

```
  {
    "Authorization": token, //required
  }
```

### WORLDS 

/api/campaigns/:id/worlds (POST)

* Request body:

```
  {
    "name": "Earf", //required
    "description": "a beautiful blue marble for sure", //required
    "campaign_id": 1, //required
  }
```

/api/campaigns/:id/worlds (GET)

* Request header:

```
  {
    "Authorization": token, //required
  }
```

/api/campaigns/:id/worlds/:worldid (GET)

* Request header:

```
{

"Authorization": token, //required

}
```

/api/campaigns/:id/worlds/:worldid (PUT)

* Request body:

```
  {
    "name": "Earf", //required
    "description": "a beautiful blue marble for sure", //required
    "campaign_id": 1, //required
  }
```

/api/campaigns/:id/worlds/:worldid (DELETE)

* Request header:

```
  {
    "Authorization": token, //required
  }
```

### HISTORY 

/api/campaigns/:id/worlds/:worldid/history (POST)

* Request body:

```
  {
    "name": "siege of Athens", //required
    "date": "ancient times", //required
    "description": "definitely not a good time", //required
    "world_id": 1, //required
  }
```

/api/campaigns/:id/worlds/:worldid/history (GET)

* Request header:

```
  {
    "Authorization": token, //required
  }
```

/api/campaigns/:id/worlds/:worldid/history/:eventid (GET)

* Request header:

```
  {
    "Authorization": token, //required
  }
```

/api/campaigns/:id/worlds/:worldid/history/:eventid (PUT)

* Request body:

```
  {
    "name": "siege of Athens", //required
    "date": "ancient times", //required
    "description": "definitely not a good time", //required
    "world_id": 1, //required
  }
```

/api/campaigns/:id/worlds/:worldid/history/:eventid (DELETE)

* Request header:

```
  {
    "Authorization": token, //required
  }
```

### RELIGIONS

/api/campaigns/:id/worlds/:worldid/religions (POST)

* Request body:

```
  {
    "name": "Dodekatheism", //required
    "gods": "Zeus, Aphrodite, Pan, etc.", //required
    "doctrines": "be excellent", //required
    "description": "the one true faith", //required
    "world_id": 1, //required
  }
```

/api/campaigns/:id/worlds/:worldid/religions (GET)

* Request header:

```
  {
    "Authorization": token, //required
  }
```

/api/campaigns/:id/worlds/:worldid/religions/:relid (GET)

* Request header:

```
  {
    "Authorization": token, //required
  }
```

/api/campaigns/:id/worlds/:worldid/religions/:relid (PUT)

* Request body:

```
  {
    "name": "Dodekatheism", //required
    "gods": "Zeus, Aphrodite, Pan, etc.", //required
    "doctrines": "be excellent", //required
    "description": "the one true faith", //required
    "world_id": 1, //required
  }
```

/api/campaigns/:id/worlds/:worldid/religions/:relid (DELETE)

* Request header:

```
  {
    "Authorization": token, //required
  }
```
