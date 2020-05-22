# How to create a new job for the worker, UpswyngBot

> See [PR #310](https://github.com/CodeForBoulder/upswyng/pull/310)
> for an example of creating a new worker job

> See [PR #380](https://github.com/CodeForBoulder/upswyng/pull/380)
> for an example of creating a new worker job which can be invoked
> from Slack

## Create types

To start, you'll need to add two types to `workerTypes.ts`: a
`Data` interface and a `Result` interface. If the title of your job is "Wash",
they'll be named `TJobWashData` and `TJobWashResult`. Both interfaces will
have a `kind` key, whose value is the unique string of your job title.
The `Result` interface will contain the job name. Ex:

```typescript
export interface TJobWashData {
  kind: "wash"; // snake case
  userId: string; // ID of user starting the job
}
```

```typescript
export interface TJobWashResult {
  kind: "wash";
  jobName: string; // needed to display the job in the UI
  // add more result fields as necessary
}
```

From there, you may add additional fields to the `Data` type which contain
inputs for your job, and additional fields to the `Result` type which hold
the outputs of the job.

Finally, add you new interfaces to the union types `TJobData` and `TJobResult`.

## Create the processor

Next, you'll make the processor: a function which will read your `Data` type,
do some work, and return your `Return` type.

Create a new file for the function. To continue our example, we'll name it
`processJobWash.ts`.

Create and export your function:

```typescript
// processJobWash.ts

import { Job } from "bullmq";

export async function processJobWash(
  job: Job<TJobWashData, TJobWashResult>
): Promise<TJobWashResult> {
  // do some things
  //
  // you can call `job.updateProgress()` with number between 0 and 100 to send a completion
  // percentage which will show up in the worker UI
  // ex: job.updateProgress(Math.min(progress, 100));
}
```

## Add the processor to the worker logic

`packages/server/src/worker.ts` contains the logic for the worker; a node app separate from the server
which runs in its own VM to execute long-running tasks. The `start` function contains a `switch` which
ensures each job is processed with the correct logic according to its `kind`. Import `processJobWash` and
add a `case` to the `switch` so that jobs with `kind` `wash` are sent to `processJobWash`.

## Create a helper method to add a job

For convenience and consistency, add a helper function to `mq.ts` to create
an instance of your job (don't forget to export it):

```typescript
async function addJobWash(
  name: string = getName("-"),
  userId
): Promise<Job<TJobWashData, TJobWashResult>> {
  return queue.add(
    name,
    { kind: "wash", userId },
    // https://github.com/taskforcesh/bullmq/blob/master/src/interfaces/jobs-options.ts
    {
      priority: 69, // lower number is higher priority
      jobId: new ObjectID().toHexString(),
    }
  );
}
```
