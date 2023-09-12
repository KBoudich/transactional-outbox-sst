import { SSTConfig } from "sst";
import { OUTBOX } from "./stacks/Outbox";

export default {
  config(_input) {
    return {
      name: "transactional-outbox-sst",
      region: "eu-west-1",
    };
  },
  stacks(app) {
    app.stack(OUTBOX);
  },
} satisfies SSTConfig;
