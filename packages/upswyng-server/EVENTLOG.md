# Event Logs

UpSwyng server has a framework used to record business events happening in the system
like Service Providers being created or Alerts going live. Events are recorded in the database
and are shown in the UI accessable by administrators. When an event is recorded the
`upswyngbot` on Slack can also send a message to its group.

**See [PR #326](https://github.com/CodeForBoulder/upswyng/pull/326) for the implementation of the steps in this document**

## Creating a new Event Log kind

For this example, we'll setup logging for when an Alert goes live. The worker job checks regularly
for Alerts whose start time has recently passed and marks them as "processed" (eventually it will send
push notifications).

### Create types

The types for Event Logs are located in `TEventLog.ts` in the `@upswyng/upswyng-types`
package. The `TEventLog` interface represents any Event Log. It contains the user who initiated the action
which caused the event, as well as the kind of the event (we'll use `AlertLive` for this case), plus extra
details which are specific to that kind of event.

To start, add the kind name to the `EventLogKind` enum in `TEventLog.ts`:

```typescript
export enum EventLogKind {
  // ...
  AlertLive = "alert_live",
  // ...
}
```

Next, we create an interface to hold the details of the event. The detail interfaces follow the naming
convention `TEventLog<kind>Detail`, so for this example create `TEventLogAlertLiveDetail`. Objects of this
type get serialized to JSON and stored in the database with the rest of the Event Log. What fields you add
to this depend on the nature of the event, but the interface must have a `kind` key with the string from the
previous step; `AlertLive` in this example. We'll also add the ID of the Alert, as well as the title. The
interface is:

```typescript
interface TEventLogAlertLiveDetail {
  alertId: string;
  alertTitle: string;
  kind: EventLogKind.AlertLive;
}
```

Add the interface to the `TEventLogDetail` union type:

```typescript
export type TEventLogDetail =
  | TEventLogAlertLiveDetail
  /* ... */
  | TEventLogOtherEventDetail;
```

### Add the logic to create the Event Log

Event Logs are added to the database just like any other MongoDB document.
Where the logic goes depends on the nature of the Event. Most often that will
be in an API endpoint, but for some events it could be in the worker code.

> Take a minute to consider failure cases. Most often, if creating the Event Log fails
> but the rest of the code succeeds, the API endpoint, for instance, should still return
> a success response. In this case the Event Log logic should come last and any errors
> can just be logged. However, there may be a situation where an Event Log is a requirement
> and the rest of the code shouldn't run unless and Event Log has been successfully created.
> Modify your approach accordingly.

Here's what the code to create our `AlertLive` Event Log might look like. (Note that
the `kind` appears in both the top level of the object and in the `detail`. The top level is
used for indexed database lookups and the `detail` `kind` is used for switching on a
`TEventLogDetail` object.)

```typescript
try {
  await new EventLog({
    actor: user._id,
    detail: {
      kind: EventLogKind.AlertLive,
      alertId: alert._id,
      alertTitle: alert.title,
    },
    kind: EventLogKind.AlertLive,
  }).save();
} catch (e) {
  console.error(
    `Error creating Event Log \`AlertLive\` for Alert ${_id}: ${e}`
  );
}
```

### Modify UI to display the Event Log

The code behind the Event Logs page fetches recent Event Logs and displays a timeline
where each Event Log is rendered by `EventLogItem.svelte`. The component contains a wrapper
`div` around `if`-`else` statements which check the `kind`. We'll add a branch to the `if`-`else`s
for `AlertLive`. We can copy-paste the `.timeline-marker` `div` and the `.timeline-content.heading`
from one of the other `kind`s and pick an icon from [FontAwesome](https://www.fontawesome.com)
to represent our Event Log `kind`. The second `p` of `div.timeline-content` will be specific to our
Event Log. We'll just show the title and a link to the Alert, but some Event Logs will require
more. Check out the "Event Log" page and the code to render some of the other `kind`s for ideas.

Once done, the `EventLogItem` component body will look like:

```html
<div class="timeline-item">
  {#if eventLog.detail.kind === EventLogKind.SomeOtherEvent}
    <!-- ... -->
  {:else if eventLog.detail.kind === EventLogKind.AlertLive}
    <div class="timeline-marker is-icon">
      <i class="fas fa-exclamation" />
    </div>
    <div class="timeline-content">
      <p class="heading">
        {#if timeAgo}{timeAgo.format(new Date(eventLog.createdAt))}{/if}
      </p>
      <p>
        Alert
        <a href={`/alert?id=${eventLog.detail.alertId}`} rel="prefetch">
          <span class="has-text-weight-semibold">
            {eventLog.detail.alertTitle}
          </span>
        </a>
        is now live
      </p>
    </div>
  {:else if eventLog.detail.kind === EventLogKind.AnotherEvent}
    <!-- ... -->
  {/if}
</div>
```

### Make `upswyngbot` message the Slack group

There are just two simple steps to do to enable messaging to Slack.

First we'll add a `case` to the `switch` in the `createTextForEventLog`
function in `utility/slackbot.ts` to translate the Event Log to the message that will be sent to Slack. Check out some of
the other `case`s to get an idea of what the logic should look like. Note that if you want to add an emoji you use the Slack
format `:<emoji-name>:`. Slack uses [custom markup](https://api.slack.com/reference/surfaces/formatting) to add style and
links to text.

Next, add a call to `postEventLogMessage` from `utility/slackbot.ts` where appropriate, most commonly just after where you
created and saved the Event Log.

> If you don't want `upswyngbot` to send a message to Slack for the event you still need to add a `case`
> to the `switch` statement from above. It should throw an error because it shouldn't ever get called:
>
> ```
> case EventLogKind.EventWithNoSlackMessage:
>   throw new Error("Attempted to send a slack message for event kind EventWithNoSlackMessage");
> ```
