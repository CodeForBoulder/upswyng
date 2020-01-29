import { ResourceSchedule, TScheduleItem } from "@upswyng/upswyng-core";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { RRule } from "rrule";
import React from "react";
import { TResourceScheduleData } from "@upswyng/upswyng-types";
import Typography from "@material-ui/core/Typography";

interface ScheduleProps {
  schedule: TResourceScheduleData;
}

const days = {
  sunday: "SU",
  monday: "MO",
  tuesday: "TU",
  wednesday: "WE",
  thursday: "TH",
  friday: "FR",
  saturday: "SA",
};

function capitalize(x: string): string {
  return x.charAt(0).toUpperCase() + x.slice(1);
}

const groupByRRuleText = (items: TScheduleItem[]) =>
  items.reduce(
    (groupedItems: { [key: string]: TScheduleItem[] }, item: TScheduleItem) => {
      const currentKey = item.recurrenceRule.toText();
      const currentGroup = groupedItems[currentKey] || [];
      return {
        ...groupedItems,
        [currentKey]: [...currentGroup, item],
      };
    },
    {}
  );

const MonthlySchedule = ({ items }: { items: TScheduleItem[] }) => {
  const monthlyItems = items.filter(
    (item: TScheduleItem) => item.recurrenceRule.options.freq === RRule.MONTHLY
  );

  if (!monthlyItems.length) {
    return null;
  }

  const compareNextOpenDate = (item1: TScheduleItem, item2: TScheduleItem) =>
    item1.recurrenceRule.all()[0].getTime() -
    item2.recurrenceRule.all()[0].getTime();
  const compareFromTime = (item1: TScheduleItem, item2: TScheduleItem) =>
    parseInt(item1.fromTime.value) - parseInt(item2.fromTime.value);
  const sortedMonthlyItems = items.sort(
    (item1, item2) =>
      compareNextOpenDate(item1, item2) || compareFromTime(item1, item2)
  );

  const groupedMonthlyItems = groupByRRuleText(sortedMonthlyItems);

  return (
    <Grid container spacing={3}>
      {Object.entries(groupedMonthlyItems).map(([rRuleText, items]) => {
        if (!items.length) {
          return null;
        }

        const nextOccurenceDate = items[0].recurrenceRule
          .all()[0]
          .toLocaleString(undefined, { month: "short", day: "numeric" });
        return (
          <Grid item xs={12} key={rRuleText}>
            <Grid container spacing={6}>
              <Grid item xs={6}>
                <Typography component="h3">{nextOccurenceDate}</Typography>
                <Typography variant="caption">repeats {rRuleText}</Typography>
              </Grid>
              <Grid item xs={6}>
                {items.map(item => (
                  <Typography
                    key={`${item.fromTime.value}${item.toTime.value}`}
                  >
                    {item.fromTime.label} - {item.toTime.label}
                  </Typography>
                ))}
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};

const WeeklySchedule = ({ items }: { items: TScheduleItem[] }) => {
  const dayItemsMap = Object.entries(days).map(([label, key]) => {
    return {
      day: label,
      items: items.filter(
        item =>
          item.recurrenceRule.options.freq === RRule.WEEKLY &&
          item.recurrenceRule.options.byweekday.includes(
            (RRule as any)[key]["weekday"]
          )
      ),
    };
  });

  return (
    <Grid container spacing={1}>
      {dayItemsMap
        .filter(x => x.items.length)
        .map(x => (
          <Grid item xs={12} key={x.day}>
            <Grid container spacing={6}>
              <Grid item xs={6}>
                <Typography component="h3" variant="subtitle2">
                  {capitalize(x.day)}:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {x.items.map(i => (
                  <Typography key={`${i.fromTime.value}${i.toTime.value}`}>
                    {i.fromTime.label} - {i.toTime.label}
                  </Typography>
                ))}
              </Grid>
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
};

const Schedule = ({ schedule }: ScheduleProps) => {
  try {
    const scheduleItems = ResourceSchedule.parse(schedule).getItems();

    if (!scheduleItems.length) {
      return null;
    }

    // group together schedule items that have the same comments
    const commentMap = scheduleItems.reduce((result, item) => {
      const comment = item.comment || "_no_comment_";
      result[comment as keyof typeof days] = [
        ...(result[comment as keyof typeof days] || []),
        item,
      ];
      return result;
    }, {} as Record<keyof typeof days, TScheduleItem[]>);

    return (
      <Grid container direction="column" spacing={5} wrap="nowrap">
        {Object.entries(commentMap).map(([comment, items]) => (
          <React.Fragment key={comment}>
            <Grid item>
              <WeeklySchedule items={items as TScheduleItem[]} />
            </Grid>
            <Grid item>
              <Divider />
            </Grid>
            <Grid item>
              <MonthlySchedule items={items as TScheduleItem[]} />
            </Grid>
            {comment !== "_no_comment_" && <div>{comment}</div>}
          </React.Fragment>
        ))}
      </Grid>
    );
  } catch {
    return null;
  }
};

export default Schedule;
