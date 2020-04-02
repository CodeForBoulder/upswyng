# Event Logs

UpSwyng server has a framework used to record business events happening in the system
like Resources being created or Alerts going live. Events are recorded in the database
and are shown in the UI accessable by administrators. When an event is recorded the
`upswyngbot` on Slack can also send a message to its group.

## Creating a new Event Log kind

For this example, we'll setup logging for when an Alert goes live called `alert_live`.

### Create types

The types for the alerts are located in `TEventLog.ts` in the `@upswyng/upswyng-types`
package. The `TEventLog` interface represents any Event Log, and contains the user who initiated the action
which caused the event, as well as the kind of the event (`alert_live` in our case), as well as extra
details about the event which are specific to that kind of event. (For `alert_live` we'll add information like
the time the worker actually processed the event when it went live.)

To start, add the kind title to the `EventLogKind` object in `TEventLog.ts`:

```typescript
export const EventLogKind = {
  // .....
  alert_live: null,
  // .....
};
export type TEventLogKind = keyof typeof EventLogKind;
```

> A note about this technique: This code may look funny, but it provides some benefits over using
> a union of string literals (eg: `type TEventLogKind = "an_event" | "alert_live"`). Namely, since
> the object `EventLogKind` is exported, we can iterate over its keys at runtime. The schema for
> `EventLog` [uses the keys of the `EventLogKind` object as a way to ensure only valid `kind`s get inserted into
> the database](https://github.com/CodeForBoulder/upswyng/blob/73134434b689d28857494a355e7d5b04eb613475/packages/upswyng-server/src/models/EventLog.ts#L41).
> By using an object with dummy values we can ensure the Typescript type and the values at runtime
> stay in sync.

Next, create an interface to hold the details of your event. The detail interfaces follow the naming
convention `TEventLog<kind>Detail`, so for this example create `TEventLogAlertLiveDetail`. Objects of this
type get serialized to JSON and stored in the database with the rest of the Event Log. What fields you add
to this depend on the nature of the event, but the interface must have a `kind` key with the string from the
previous step; `alert_live` in this example. We'll also add the ID of the Alert, as well as the title. Our
interface therefore is:

```typescript
interface TEventLogAlertLiveDetail {
  kind: "alert_live";
  alertId: string;
  alertTitle: string;
}
```

Add the interface to the `TEventLogDetail` union type:

```typescript
export type TEventLogDetail =
  | TEventLogAlertLiveDetail
  /* ... */
  | TEventLogOtherEventDetail;
```
