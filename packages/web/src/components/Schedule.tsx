import { ResourceSchedule, TScheduleItem } from "@upswyng/common";
import WeeklySchedule, { days } from "./WeeklySchedule";

import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import MonthlySchedule from "./MonthlySchedule";
import { RRule } from "rrule";
import React from "react";
import { TResourceScheduleData } from "@upswyng/types";

interface ScheduleProps {
  schedule: TResourceScheduleData;
}

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
        {Object.entries(commentMap).map(([comment, items]) => {
          const weeklyItems = items.filter(
            item => item.recurrenceRule.options.freq === RRule.WEEKLY
          ) as TScheduleItem[];
          const monthlyItems = items.filter(
            item => item.recurrenceRule.options.freq === RRule.MONTHLY
          ) as TScheduleItem[];
          return (
            <React.Fragment key={comment}>
              {!!weeklyItems.length && (
                <Grid item>
                  <WeeklySchedule items={weeklyItems} />
                </Grid>
              )}
              {!!weeklyItems.length && !!monthlyItems.length && (
                <Grid item>
                  <Divider />
                </Grid>
              )}
              {!!monthlyItems.length && (
                <Grid item>
                  <MonthlySchedule items={monthlyItems} />
                </Grid>
              )}
              {comment !== "_no_comment_" && <div>{comment}</div>}
            </React.Fragment>
          );
        })}
      </Grid>
    );
  } catch {
    return null;
  }
};

export default Schedule;
