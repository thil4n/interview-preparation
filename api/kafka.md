## What is Apache Kafka?

Apache Kafka is a distributed event streaming platform designed for high-throughput,
fault-tolerant, and real-time data streaming.
It is used for building real-time data pipelines and streaming applications.

## What are the core components of Kafka?

1. Producer: Sends messages to Kafka topics.
2. Consumer: Reads messages from topics.
3. Broker: Kafka server that stores and serves messages.
4. Topic: Logical channel to which messages are sent and from which consumers read.
5. Partition: A topic is divided into multiple partitions for parallelism and scalability.
6. Zookeeper: Manages metadata and cluster coordination (deprecated in newer versions).

## What is a Kafka topic?

A Kafka topic is a logical channel to which producers publish data and consumers read data.
Topics can have multiple partitions to scale horizontally.

## What is a Kafka partition, and why is it important?

A Kafka partition is a subset of a topic that allows parallel processing and ensures message ordering within the partition.
It improves throughput and fault tolerance.

## How does Kafka ensure message durability?

Kafka writes data to disk and replicates it across multiple brokers using a replication factor.
This ensures data is not lost even if a broker fails.

## What is the difference between Kafka Consumer Group and Consumer?

- Consumer: A client that reads messages from Kafka topics.
- Consumer Group: A group of consumers where each message is consumed by only one consumer in the group, enabling parallel consumption.

## What is an offset in Kafka?

An offset is a unique identifier for each record within a Kafka partition.
It allows consumers to track their position and resume reading from where they left off.

## What is Kafka retention policy?

Kafka’s retention policy determines how long messages are stored.
It can be configured by:

- Time-based: e.g., retain messages for 7 days.
- Size-based: e.g., retain up to 100 GB of data.

## How does Kafka handle failure?

- Replication: Messages are replicated across multiple brokers.
- Leader Election: If a broker fails, Kafka promotes a replica to leader.
- Consumer Offset Management: Allows consumers to resume processing after failures.

## What are the main APIs in Kafka?

1. Producer API: For publishing records.
2. Consumer API: For subscribing to topics.
3. Streams API: For processing and transforming data in real-time.
4. Admin API: For managing Kafka topics and brokers.
