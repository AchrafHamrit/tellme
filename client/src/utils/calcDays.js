const calcDays = (date) => {
  let oneDay = 24 * 60 * 60 * 1000;
  date = new Date(date).getTime();
  let today = new Date().getTime();

  let diffDays = Math.round(Math.abs((date - today) / oneDay));

  let result = diffDays ? diffDays + 'd ago' : 'Today';

  return result;
};

export default calcDays;
