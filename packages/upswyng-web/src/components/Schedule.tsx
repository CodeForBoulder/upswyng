import { ResourceSchedule, TScheduleItem } from "@upswyng/upswyng-core";
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
    <Grid container justify="space-between" spacing={5}>
      {Object.entries(groupedMonthlyItems).map(([rRuleText, items]) => {
        if (!items.length) {
          return null;
        }

        const nextOccurenceDate = items[0].recurrenceRule
          .all()[0]
          .toLocaleString(undefined, { month: "short", day: "numeric" });
        return (
          <React.Fragment key={rRuleText}>
            <Grid item xs={5}>
              <Typography component="h3">{nextOccurenceDate}</Typography>
              <Typography variant="caption">repeats {rRuleText}</Typography>
            </Grid>
            <Grid item xs={6}>
              {items.map(item => (
                <Typography key={`${item.fromTime.value}${item.toTime.value}`}>
                  {item.fromTime.label} - {item.toTime.label}
                </Typography>
              ))}
            </Grid>
          </React.Fragment>
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
    <div>
      {dayItemsMap
        .filter(x => x.items.length)
        .map(x => (
          <Grid container key={x.day}>
            <Grid item xs={4}>
              <Typography component="h3" variant="subtitle2">
                {capitalize(x.day)}:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              {x.items.map(i => (
                <Typography key={`${i.fromTime.value}${i.toTime.value}`}>
                  {i.fromTime.label} - {i.toTime.label}
                </Typography>
              ))}
            </Grid>
          </Grid>
        ))}
    </div>
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
      <>
        {Object.entries(commentMap).map(([comment, items]) => (
          <div key={comment}>
            <WeeklySchedule items={items as TScheduleItem[]} />
            <MonthlySchedule items={items as TScheduleItem[]} />
            {comment !== "_no_comment_" && <div>{comment}</div>}
          </div>
        ))}
      </>
    );
  } catch {
    return null;
  }
};

export default Schedule;
