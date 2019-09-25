import { TScheduleType } from '../../types';

interface TCategoryQuestionValue {
  value: string;
  synonyms: string[];
}
export interface TCategoryQuestionMap {
  questionNum: number;
  values: TCategoryQuestionValue[];
  [key: string]: TCategoryQuestionValue[] | number;
}

interface TDayPeriodQuestionMap {
  open: number;
  close: number;
  [key: string]: number;
}
export interface TWeeklyDayQuestionMap {
  isOpen: number;
  periods: TDayPeriodQuestionMap[];
  [key: string]: number | TDayPeriodQuestionMap[];
}

export interface TWeeklyQuestionMap {
  Sunday: TWeeklyDayQuestionMap;
  Monday: TWeeklyDayQuestionMap;
  Tuesday: TWeeklyDayQuestionMap;
  Wednesday: TWeeklyDayQuestionMap;
  Thursday: TWeeklyDayQuestionMap;
  Friday: TWeeklyDayQuestionMap;
  Saturday: TWeeklyDayQuestionMap;
  [key: string]: TWeeklyDayQuestionMap;
}

export interface TMonthlyQuestionMap {
  frequency: number;
  day: number;
  periods: TDayPeriodQuestionMap[];
  areMoreDays?: number;
}

export interface TQuestionMap {
  [key: string]: number;
}

interface TScheduleTypeValues {
  'Open 24/7': string;
  Weekly: string;
  Monthly: string;
  'Date Range': string;
  [key: TScheduleType]: string;
}

export interface TScheduleTypeMap {
  questionNum: 1777246851;
  values: TScheduleTypeValues;
  [key: string]: number | TScheduleTypeValues;
}
