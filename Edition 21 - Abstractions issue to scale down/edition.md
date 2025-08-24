# When Abstractions Become the Problem — Knowing When to Scale Down


**"Simplicity is the ultimate sophistication." — Leonardo da Vinci**

In engineering, we’ve been taught to think upward — scale up, automate more, orchestrate everything. But what if the most mature move isn’t scaling up... but scaling  *down* ?

This week, we dive into a counterintuitive truth:

> **Sometimes the best way to scale is to remove the thing you added to scale.**

We look into real-world scenarios where engineering teams removed layers of complexity — and found more control, cost-efficiency, and clarity.

This is a story of:

* Shedding unnecessary orchestration
* Opting for managed simplicity over DIY chaos
* Choosing “boring but predictable” over “complex but powerful”

We’ll unpack:

* The hidden cost of abstractions
* The signal that your platform is doing *too much*
* Why simplicity is not regression, but evolution

## The hidden cost of abstractions


Kubernetes is a powerful tool. But it’s also a powerful abstraction. When abstractions become invisible glue, we forget they carry weight:

* **Cognitive overhead**
* **Steep learning curves**
* **Tooling sprawl**
* **Inefficiency at small-to-medium scale**

Sometimes, choosing a simpler stack doesn’t mean you’re scaling back — it means you’re scaling  **right** .

## The signal that your platform is doing *too much*

**“You don’t need a rocket launcher when all you have is a paper target.”**

We’ve reached a point in modern infrastructure where Kubernetes is often seen as the  **default platform** , rather than a considered decision. But in recent months, we’ve seen a subtle shift — some engineering teams are moving away from Kubernetes in favor of simpler, leaner solutions.

Today, let’s explore 3 real-world examples where companies walked back from Kubernetes — and why it wasn’t a failure, but a  **maturity checkpoint** .

We explore five companies that moved away from orchestration-heavy platforms — not because they failed, but because they evolved.

### ⚙️ 1. Juspay: Kubernetes to EC2 — Cutting Complexity for Scale

 **Context** : Juspay, a fintech company handling billions of transactions, initially embraced Kubernetes to orchestrate microservices. Over time, they ran into the usual suspects:

* Steep operational learning curve
* Debugging nightmares
* Steady rise in infra cost and team fatigue

 **The Pivot** : Juspay moved to a more **tightly controlled EC2 setup** — one that gave them operational stability with less cognitive and tooling overload.

 **Why It Worked** :

* Static workloads didn’t need elastic orchestration
* In-house ops maturity made direct VM provisioning efficient
* Custom tooling replaced what Kubernetes was doing with more control and less abstraction

 **Lesson** : Not all scale needs orchestration. Sometimes, owning fewer moving parts can bring better reliability.

---

### ☁️ 2. ThreeKit: Kubernetes to Google Cloud Run — Lean into Serverless

 **Context** : ThreeKit helps brands offer 3D and AR product visualizations. They initially ran containerized workloads on Kubernetes for flexibility and performance.

 **The Problem** :

* Idle pods drove up cost
* Devs spent more time maintaining infra than shipping features
* Scaling felt overengineered for spiky, stateless workloads

 **The Pivot** : Moved their microservices to **Google Cloud Run** — a fully managed, event-driven platform that scales to zero.

 **Why It Worked** :

* Perfect for request-based burst traffic
* No cluster management
* Pay-as-you-go = direct savings

 **Lesson** : Kubernetes is infrastructure you manage. Serverless is infrastructure you forget.

---

### 🔧 3. Gitpod: Kubernetes to Custom Control Plane — Build What You Need

 **Context** : Gitpod, a cloud-based developer workspace, originally ran on Kubernetes. As their product matured, Kubernetes started to **get in the way** — especially when they needed to tightly control dev environment startup times.

 **The Pivot** : Replaced Kubernetes with a **custom control plane** — specifically tailored to the unique needs of ephemeral dev environments.

 **Why It Worked** :

* Full control over lifecycle events
* Avoided limitations of K8s primitives
* Tighter coupling between orchestration and product experience

 **Lesson** : If Kubernetes is your bottleneck, and your use case is narrow but deep — it may be worth writing your own orchestrator.

---

### 📦 4. Dropbox: Skipped Kubernetes for Custom Infra

Dropbox runs one of the largest distributed storage infrastructures in the world. Interestingly, they  **never adopted Kubernetes** . When evaluating container orchestration, they realized they needed **deeper, deterministic control** than Kubernetes could offer. Instead, they built a custom stack that closely aligned with their performance and storage requirements.

🔁  **The pivot** : Directly to custom orchestration with VMs.

🧠  **Why** : Performance, reliability, and low-level system control.

📌  **Lesson** : At massive scale, bespoke infra can outperform generic abstractions.

---

## ⚙️ 5. Segment: Moved to ECS for Developer Velocity

Segment started on Kubernetes but found that their  **developer workflows slowed down** . Teams struggled with debugging pods, writing complex manifests, and managing cluster-level incidents. They eventually moved to  **AWS ECS** , integrated with Terraform and GitOps — which improved productivity and reduced toil.

🔁  **The pivot** : ECS with Terraform instead of Kubernetes.

🧠  **Why** : Simpler deployment model, better fit for internal platform.

📌  **Lesson** : If your team is spending more time *on* the platform than *with* the product — simplify it.

---



### 🚫 Kubernetes is a Platform — Not a Panacea

These stories highlight a growing realization:

> Kubernetes is great — **if** you need what it offers, **and** you're prepared for the complexity it brings.

For teams with a narrow scope, spiky workloads, or specialized orchestration needs, Kubernetes might be the wrong tool for the job.

---

### 🧠 Thought Experiment

Before spinning up another cluster, ask:

* Are your workloads dynamic enough to need orchestration?
* Do you have the ops maturity to manage its complexity?
* Can managed services or VMs solve the problem with less effort?

---

### 📌 Closing Thought

In engineering, **choosing the right abstraction** is more important than chasing the latest tool. Kubernetes is a powerful tool — but it’s not always the right one.

Let’s design systems for  **clarity** , not just  **complexity** .

Until next time,
