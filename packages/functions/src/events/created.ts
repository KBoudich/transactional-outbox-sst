import { KinesisStreamEvent, KinesisStreamRecordPayload } from "aws-lambda";

export const handler = async (event: KinesisStreamEvent) => {
  for (const record of event.Records) {
    const kinesisRecord: KinesisStreamRecordPayload = record.kinesis;

    const payload: string = Buffer.from(kinesisRecord.data, "base64").toString(
      "utf8"
    );
    const jsonPayload = JSON.parse(payload);

    console.log(jsonPayload.dynamodb.NewImage);

    // TODO: Process the event data ....
  }
};
