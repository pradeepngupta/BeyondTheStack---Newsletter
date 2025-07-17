# 🧨 Stop Logging Everything — Kafka Already Has the Truth

Track the complete lifecycle of Kafka messages — from publish to process — using only Kafka-native features. No code changes. No shared schemas. Just clean observability.


## 🧩 The Problem: Tracking Messages the Old Way

Most modern systems rely on Kafka to connect microservices, stream events, and process data in real time. But as soon as message flows become non-trivial, every team hits the same pain point:

> ❓“Where did the message go?”
>
> ❓“Was it published? Was it processed? Who consumed it?”

To answer that, teams often:

* Create logging around publish/consume events.
* Maintain `msg_status` tables in producer and consumer databases.
* Share message schemas across services.
* Manually join logs or databases to debug failures.

It works — but it’s fragile, redundant, and hard to scale.


## 🎯 The Goal: Full Lifecycle Message Tracking, Without Touching Services

What if you could track every Kafka message’s journey like this:

| Stage      | Status  | How to Detect                                 |
| ---------- | ------- | --------------------------------------------- |
| Produced   | `PUB` | Message appears in Kafka topic                |
| Broker ACK | `ACK` | Log append timestamp (`record.timestamp()`) |
| Consumed   | `CON` | Consumer reads the message                    |
| Processed  | `PRC` | Offset committed to Kafka by the consumer     |

And you could do it:

* **Without modifying producer/consumer logic**
* **Without forcing all services to share a database**
* **Using only Kafka metadata and internal topics**

---

## 🧠 The Insight: Kafka Already Logs Everything

Kafka doesn’t just move messages — it *remembers* what happened to every one of them:

* When a message was appended to a topic
* Which consumer groups read it
* When those consumer groups committed their offsets

It’s all there. You just need to listen.


## 🛠️ The Architecture: Kafka-Powered Audit Service

Here’s what a **decoupled audit tracker** looks like:

    ┌───────────────┐
                 │ Producer App  │
           └──────┬────────┘
                             │
                   Produce to Kafka
                             │
           ┌──────▼────────────┐
                 │  Kafka Cluster     │
           └──────┬────────────┘
                             │_______________________________________________

    |							                                    |

    ┌──────▼─────┐
                 │ Consumer   │
           └────────────┘                                                                           ┌────────▼──────────┐
                                                                                                      │ Audit Tracker     │
                                                                                                     │ (Spring Boot App) │
                                                                                              └────────┬──────────┘
                                                                                                                     │
                                                                                                       Insert into Audit DB


## 🧰 What the Audit Tracker Does

Your Audit Service is just a Spring Boot Kafka consumer — but smartly configured to observe and correlate Kafka metadata:

### ✅ `PUB`: Message received

* Listen to target topics with a dedicated audit group.
* Log message key, topic, partition, offset, and timestamp.

`@KafkaListener(topics = "orders", groupId = "audit-tracker")
public void onMessage(ConsumerRecord<String, String> record) {
    auditRepo.save(new MsgAudit(
        record.key(),
        record.topic(),
        record.partition(),
        record.offset(),
        Instant.now(), // ts_pub
        Instant.ofEpochMilli(record.timestamp()), // ts_ack
        null, null, null, "PUB"
    ));
}`


### ✅ `ACK`: Broker write complete

* Use `record.timestamp()` as Kafka **log append time** (which happens *after* broker ACKs the message).
* This serves as a proxy for ACK — without needing producer logs.

---

### ✅ `PRC`: Message processed

Kafka tracks consumer progress using offset commits — stored in a special internal topic called `__consumer_offsets`.

You can:

* Use **Burrow** or **Kafka Lag Exporter** to monitor offset commits.
* Correlate offset positions to infer that a message was processed.

`Consumer group `

A scheduled task in your audit service can periodically check offsets and update your audit table.


---



## 📊 Bonus: What You Unlock With This Approach

* 🔍 **End-to-End Message Visibility**

  Know exactly where each message is and what happened to it.
* 🔔 **Latency Metrics**

  Measure time from `PUB` to `PRC` across consumers.
* 🧯 **Dead Message Detection**

  Alert on messages stuck in `PUB` or `CON` state for too long.
* 📉 **Eliminate Redundant Logs**

  Services don’t need to log Kafka metadata or insert into shared tracking tables.


## ✍️ Closing Thoughts

Kafka isn't just a message bus — it's a living, breathing audit log.

If you’re building distributed systems and struggling with tracking, logging, and monitoring — stop chasing messages manually. Start listening to what Kafka already knows.


### 🔗 Want the Code?

I’m working on an open-source Spring Boot template for this audit service. Drop me a reply or follow [@pradgupt](https://www.linkedin.com/in/pradgupt) on LinkedIn to get notified when it drops.

Until next time,

**Stay curious, go beyond the stack.**
