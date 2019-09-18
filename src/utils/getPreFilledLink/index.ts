import { TResource } from '../../types';
import { questionMap } from './questionMaps';

import getQuestionUrlParam from './getQuestionUrlParam';
import getCategoryQuestionUrlParams from './getCategoryUrlParams';

const baseUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLScr5GdjaHNjRkdWY-MoASJlb1lnH0iM2gm3wuwgX_0ZZqu5Mg/viewform?usp=pp_url';

const getQuestionUrlParams = (questionKey: string, resource: TResource) => {
  if (!resource[questionKey]) {
    return '';
  }

  let modifiedValue: string;
  switch (questionKey) {
    case 'category':
      modifiedValue = resource[questionKey]
        .split(',')
        .map(value =>
          getQuestionUrlParam(questionMap[questionKey], value, true)
        )
        .join('&');
      break;
    default:
      modifiedValue = `${encodeURIComponent(`${resource[questionKey]}`)}`;
  }

  const questionNum = questionMap[questionKey];

  return getQuestionUrlParam(questionNum, modifiedValue);
};

const generatePreFilledLink = (resource: TResource) => {
  const questionUrlParams = Object.entries(questionMap)
    .map(([resourceProp]) => getQuestionUrlParams(resourceProp, resource))
    .filter(value => value)
    .join('&');
  const categoryQuestionUrlParams = getCategoryQuestionUrlParams(resource);

  return `${baseUrl}&${questionUrlParams}&${categoryQuestionUrlParams}`;
};

export default generatePreFilledLink;

// const schedules = {
//   closeschedule: TCloseSchedule[];
//   schedule: TSchedule[];
// }

// //NOT IN DB

// const contactPersonInfo = {
//   contactPersonName: 2033960682,
//   contactPersonPhone: 1972742378,
//   contactPersonEmail: 14414236,
// };

// const socialMediaLinks = {
//   facebook: 1792737995,
//   instagram: 1965878317,
//   twitter: 223349880,
// }

// const UNUSED = {
//   lat: number,
//   lng: number,
//   selectedAll: boolean,
//   showflag: boolean,
//   updateshelter: string,
//   userid: string,
// }

// entry.1957797771=what+should+clients+know+before+using+service?

// entry.1777246851=weekly

// entry.339162976=__other_option__
// entry.339162976.other_option_response=food+other

// entry.692757337=__other_option__
// entry.692757337.other_option_response=health+other

// entry.163376122=__other_option__
// entry.163376122.other_option_response=hygiene+other

// entry.287762356=__other_option__
// entry.287762356.other_option_response=job+training+other

// entry.2146328654=__other_option__
// entry.2146328654.other_option_response=job+training+other

// entry.2146328654=__other_option__
// entry.2146328654.other_option_response=resources+other

// entry.1736089063=__other_option__
// entry.1736089063.other_option_response=shelters+other

// entry.757691226=__other_option__
// entry.757691226.other_option_response=social+services+other

// entry.656504316=__other_option__
// entry.656504316.other_option_response=transit+other

// entry.239744685=__other_option__
// entry.239744685.other_option_response=wifi+other
