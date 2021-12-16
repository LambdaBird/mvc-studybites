const getTimeFromData = (data) => (data ? new Date(data).getTime() : null);

const isTimeInRange = ({ fromTime, toTime, time }) => {
  if (fromTime && toTime) {
    return time >= fromTime && time <= toTime;
  }
  if (fromTime && !toTime) {
    return time >= fromTime;
  }
  if (!fromTime && toTime) {
    return time <= toTime;
  }
  return true;
};

export const createMapTimeRangeStudent = (rangeData) => {
  const fromTime = getTimeFromData(rangeData?.from);
  const toTime = getTimeFromData(rangeData?.to);

  return (student) => {
    if (student.results.length === 0) {
      return student;
    }
    const results = student.results.filter(({ createdAt }) =>
      isTimeInRange({ fromTime, toTime, time: new Date(createdAt).getTime() }),
    );

    if (results.length === 0) {
      return null;
    }
    return {
      ...student,
      results,
    };
  };
};
