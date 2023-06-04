migrate((db) => {
  const collection = new Collection({
    "id": "b9jd6vpwic42r0l",
    "created": "2023-06-03 04:45:31.904Z",
    "updated": "2023-06-03 04:45:31.904Z",
    "name": "nft",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ohyddg3w",
        "name": "url",
        "type": "url",
        "required": false,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
        }
      },
      {
        "system": false,
        "id": "twdtvqle",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "zadej778",
        "name": "price",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("b9jd6vpwic42r0l");

  return dao.deleteCollection(collection);
})
