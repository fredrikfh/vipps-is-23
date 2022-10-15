# Backend

This is the backend for the [frontend](../frontend).

Requires node.js to run.

For simplicty, the server is configured to launch on port `8080`.

## How to run

- `npm install`
- `node .`

## Functionalities

- `GET /article/` searches for article:

  - Parameters:

    - `searchString (string)` The name of the article to search for

  - Responses:

    - `200 OK` Article found

      - `article (string)` The article
      - `status (string)` The status of the search
      - `data (JSON)` The article in HTML
      - `occurences (number)` The number of occurences of the article-name in the article

    - `404 Not Found` Article not found

      - `article (string)` The article
      - `status (string)` The error message
