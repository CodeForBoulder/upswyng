import Grid from "@material-ui/core/Grid";
import React from "react";
import { TScheduleItem } from "@upswyng/upswyng-core";
import Typography from "@material-ui/core/Typography";

const groupByRRuleText = (items: TScheduleItem[]) =>
  items.reduce(
    (groupedItems: Record<string, TScheduleItem[]>, item: TScheduleItem) => {
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
  if (!items.length) {
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

export default MonthlySchedule;
