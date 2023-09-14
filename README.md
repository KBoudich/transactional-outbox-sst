# The Transactional Outbox Pattern with DynamoDB and Kinesis Streams

This repository provides an implementation of the Transactional Outbox Pattern using DynamoDB and Kinesis Streams, offering a solution to the challenges posed by the CAP theorem in distributed systems.

## Overview

In distributed systems, the CAP theorem dictates that only two out of the three guarantees: Consistency, Availability, and Partition tolerance can be achieved. This project showcases how the Transactional Outbox Pattern, combined with DynamoDB Streams and Kinesis Streams, can effectively navigate these constraints.

## Features

- **Transactional Outbox Pattern**: Store local events in an "outbox" table for reliable and consistent data propagation.
- **DynamoDB Streams**: Capture item-level modifications in real-time.
- **Kinesis Streams Integration**: Enables large-scale, real-time processing and analytics.

## Implementation

The implementation showcases an order creation system. The complete system flow and code structure can be found in this repository.

### Prerequisites

- An AWS account
- An AWS profile set (default profile used is `eu-west-1`, but you can configure your specific region)

### Key Components

1. **DynamoDB Configuration**: Set up primary (orders) and outbox (events) tables.
2. **Kinesis Integration**: Create a Kinesis stream and add a lambda consumer.
3. **Data Processing**: AWS Lambda function for processing data captured by Kinesis.
4. **API Gateway**: Endpoint for processing order creation requests.
5. **Request Processor**: Lambda function for processing order creation requests.

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/KBoudich/transactional-outbox-sst.git
   cd transactional-outbox-sst
   pnpm install
   pnpm run dev --stage outbox
   ```

## Conclusion

By integrating the Transactional Outbox Pattern with DynamoDB Streams and Kinesis Streams, this project offers an elegant, scalable, and resilient solution to the CAP theorem challenges. The minimal codebase, thanks to the SST framework, ensures simplicity in implementation.
