export const getStorageLessons = () =>
  JSON.parse(localStorage.getItem('lessons') || '[]');

export const setStorageLessons = (lessons) =>
  localStorage.setItem('lessons', JSON.stringify(lessons));

export const setStorageLesson = (lesson) => {
  const lessons = getStorageLessons();
  const storageLesson = lessons.find((x) => x.id === lesson.id);
  if (storageLesson) {
    if (lesson.name) {
      storageLesson.name = lesson.name;
    }
    if (lesson.status) {
      storageLesson.status = lesson.status;
    }
  } else {
    lessons.unshift(lesson);
  }
  setStorageLessons(lessons);
};
