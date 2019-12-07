import { font } from "../App.styles";
import { TDay, TSchedule, TResourceScheduleData } from "@upswyng/upswyng-types";
import React from "react";
import styled from "styled-components";
import { ResourceSchedule, TScheduleItem } from "@upswyng/upswyng-core";
import { RRule } from "rrule";

interface ScheduleProps {
  schedule: TResourceScheduleData;
}

const dayToCode = {
  sunday: "SU",
  monday: "MO",
  tuesday: "TU",
  wednesday: "WE",
  thursday: "TH",
  friday: "FR",
  saturday: "SA",
};

const WeeklyContainer = styled.div`
  display: flex;
`;

const WeeklyDay = styled.h3`
  && {
    flex: 0 1 30%;
    font-size: inherit;
    font-weight: 400;
    margin: 0;
    &::after {
      content: ":";
    }
  }
`;

const WeeklyTimes = styled.p`
  && {
    display: flex;
    flex: 1 1 70%;
    flex-direction: column;
    margin: 0;
  }
`;

const WeeklyTime = styled.span`
  && {
    margin: 0;
    && + && {
      margin-top: ${font.helpers.convertPixelsToRems(4)};
    }
  }
`;

const renderDaySchedule = (schedule: TSchedule[]) => {
  const { day } = schedule[0];
  return (
    <WeeklyContainer key={day}>
      <WeeklyDay>{day}</WeeklyDay>
      <WeeklyTimes>
        {schedule.map(({ day, from, to }) => (
          <WeeklyTime key={`${day}-${from}`}>
            {from} - {to}
          </WeeklyTime>
        ))}
      </WeeklyTimes>
    </WeeklyContainer>
  );
};

const renderWeeklySchedule = (schedule: TSchedule[]) => {
  const renderedDays: (TDay | undefined)[] = [];

  return schedule.map(({ day: currentDay }) => {
    if (!renderedDays.includes(currentDay)) {
      renderedDays.push(currentDay);
      const currentDaySchedule = schedule.filter(
        ({ day }) => day === currentDay
      );
      return renderDaySchedule(currentDaySchedule);
    }
    return null;
  });
};

const renderMonthlySchedule = (schedule: TSchedule[]) =>
  schedule.map(({ day, from, period, to }) => {
    if (period) {
      return (
        <p key={`${period}-${day}-${from}`}>
          every {period.toLowerCase()} {day} from {from} - {to}
        </p>
      );
    }
    return null;
  });

const WeeklySchedule = ({ items }: { items: TScheduleItem[] }) => {
  const dayItemsMap = Object.keys(dayToCode).map(day => {
    return {
      day,
      items: items.filter(
        item =>
          item.recurrenceRule.options.freq === RRule.WEEKLY &&
          item.recurrenceRule.options.byweekday.includes(
            (RRule as any)[dayToCode[day as keyof typeof dayToCode]] as number
          )
      ),
    };
  });
  return (
    <div>
      {dayItemsMap
        .filter(x => x.items.length)
        .map(x => (
          <div key={x.day}>
            <div>{x.day}</div>
            <div>
              {x.items.map(i => (
                <div key={`${i.fromTime.value}${i.toTime.value}`}>
                  {i.fromTime.label} - {i.toTime.label}
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

const Schedule = ({ schedule }: ScheduleProps) => {
  try {
    const resourceSchedule = ResourceSchedule.parse(schedule);

    // group together schedule items that have the same comments
    const commentMap = resourceSchedule.getItems().reduce((result, item) => {
      const comment = item.comment || "_no_comment_";
      result[comment as keyof typeof dayToCode] = [
        ...(result[comment as keyof typeof dayToCode] || []),
        item,
      ];
      return result;
    }, {} as Record<keyof typeof dayToCode, TScheduleItem[]>);

    return (
      <div>
        {Object.entries(commentMap).map(([comment, items]) => (
          <div key={comment}>
            {comment !== "_no_comment_" && <div>{comment}</div>}
            <WeeklySchedule items={items as TScheduleItem[]} />
          </div>
        ))}
      </div>
    );
  } catch {
    return <p>not available</p>;
  }
};

export default Schedule;
