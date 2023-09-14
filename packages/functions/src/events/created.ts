import { KinesisStreamEvent, KinesisStreamRecordPayload } from "aws-lambda";

export const handler = async (event: KinesisStreamEvent) => {
  for (const record of event.Records) {
    const kinesisRecord: KinesisStreamRecordPayload = record.kinesis;

    const payload: string = Buffer.from(kinesisRecord.data, "base64").toString(
      "utf8"
    );
    const jsonPayload = JSON.parse(payload);

    console.log(
      `Order creation event received: ${JSON.stringify(
        jsonPayload.dynamodb.NewImage,
        null,
        2
      )}`
    );

    // TODO: Process the event data ....
  }
};
