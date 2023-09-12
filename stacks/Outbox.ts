import { StackContext, Api, Table, KinesisStream } from "sst/constructs";

export function OUTBOX({ stack }: StackContext) {
  const orderTable = new Table(stack, "orders", {
    fields: {
      orderId: "string",
    },
    primaryIndex: { partitionKey: "orderId" },
  });

  const stream = new KinesisStream(stack, "Stream", {
    consumers: {
      created: "packages/functions/src/events/created.handler",
    },
  });

  const eventTable = new Table(stack, "events", {
    fields: {
      eventId: "string",
    },
    primaryIndex: { partitionKey: "eventId" },
    kinesisStream: stream,
    stream: "new_image",
  });

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        bind: [orderTable, eventTable],
      },
    },
    routes: {
      "POST /": "packages/functions/src/orders/create.handler",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
