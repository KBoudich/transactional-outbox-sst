import { ApiHandler } from "sst/node/api";
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { ulid } from "ulid";
import { Table } from "sst/node/table";

export const handler = ApiHandler(async (event) => {
  const data = JSON.parse(event.body!);
  const orderId = ulid();

  const params = {
    TransactItems: [
      {
        Put: {
          TableName: Table.orders.tableName,
          Item: {
            orderId,
            description: data.description,
          },
        },
      },
      {
        Put: {
          TableName: Table.events.tableName,
          Item: {
            eventId: `evt_${orderId}`,
            timestamp: Date.now(),
            type: "ORDER_CREATED",
            relatedOrderId: orderId,
          },
        },
      },
    ],
  };

  try {
    const client = new DynamoDB({});
    const ddbDocClient = DynamoDBDocument.from(client);

    await ddbDocClient.transactWrite(params);
    console.log("Transaction Successful!");
  } catch (err) {
    console.error("Error executing transaction:", err);
  }

  return {
    statusCode: 200,
    body: `Order #${orderId} created successfully !!`,
  };
});
