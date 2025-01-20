# Process Receipts Service

This is an example service meant to showcase the ability to make two endpoints:
one responsible for writing a receipt to a datastore via POST request, and one
to fetch points associated with a given receipt ID

## To Run With Docker

```
# assuming you are in repo at the root node
docker build -t receipt-processor-app .
docker run -d -p 8080:8080 receipt-processor-app

# From there you can  use the postman collection included to do the POST and then the GET
```

## Notes

While I spent a lot of time writing golang from 2019-2022, I haven't written
golang since mid-2022 or so (before 2.x and generics and all that good stuff).
Rather than relearning the language for this assessment, I'd feel more
comfortable writing in flask (python) or express (JS/TS) which I have been using
a lot more recently. Since typescript is statically typed and will read a little
bit closer to golang syntactically/code flow wise, I'm going to use an express
server.

The general structure will be similar to how I would structure a repo in golang.

## Assumptions

- For the sake of the assignment I will be doing a write synchronously of the
  points, however if the rules engine were more complex or there was need for
  optimization I would probably delegate that via a go-routine OR (more likely)
  send to an asynchronous worker to process.
- I am assuming that we have confidence in the system that we only receive a
  given receipt once. If that assumption is not true, I would build a
  deterministic hash and use a SET to stores those values. If the hash is in
  that set already, reject with a 409 CONFLICT code. Else, continue with the
  existing logic we have.
  - note: if we were concerned about clashes, I would've also preferred a UUID5
    instead of UUID4 so we could make the UUID deterministically.
- Assuming we don't have the need to go to bigdecimal or some other instense
  precision metric for points calculation when dealing with price. If so, would
  use `import { Decimal } from 'decimal.js'`;
