Aula.io
====

This is a project that aims to collect all the best tech talks in a structured fashion, making it easy to discover interesting tech talks at [Aula.io](http://www.aula.io)



#### Please contribute by sending pull requests :heart:

The format for talks looks something like this:
```json

{
    "title": "A Whole New World",
    "key": "a-whole-new-world",
    "year": 2012,
    "url": "https://www.destroyallsoftware.com/talks/a-whole-new-world",
    "imageUrl": "https://www.destroyallsoftware.com/images/talks/a-whole-new-world.preview.png",
    "description": "This talk announces the most ambitious software project I've ever undertaken, then considers why its existence is so surprising (and in some cases frustrating) to people.",
    "tags": [
        {
            "title": "Invention",
            "key": "invention"
        },
        {
            "title": "History",
            "key": "history"
        }
    ],
    "speakers": [
        {
            "title": "Gary Bernhardt",
            "key": "gary-bernhardt"
        }
    ],
    "location": {
        "title": "Strange Loop",
        "key": "strange-loop"
    },
    "added": "2014-05-04T09:09:05.904Z"
}
```

Where all `key` fields are [slugged](http://blog.tersmitten.nl/slugify/) versions of their corresponding `title`. `added` is a ISO 8601 zulu timestamp from the time when the talk was added to this repo.

#### Contributors :raised_hands:
* [mateusz-fiolka](https://github.com/mateusz-fiolka)
* [snurra](https://github.com/snurra)
* [chids](https://github.com/chids)
* [kristiany](https://github.com/kristiany)
* [kagrela](https://github.com/kagrela)

#### Credits
Props to the creators of these fine pieces of code:
* [nedb](https://github.com/louischatriot/nedb)
* [routie](https://github.com/jgallen23/routie)
