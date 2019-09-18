const QUESTION_PARAM_KEY = 'entry.';

const getUrlParam = (
  questionNumber: number,
  value: string,
  encode: boolean = false
): string => {
  if (!questionNumber || !value) {
    return '';
  }

  return `${QUESTION_PARAM_KEY}${questionNumber}=${
    encode ? encodeURIComponent(value) : value
  }`;
};

export default getUrlParam;
