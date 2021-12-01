export const LessonsStorage = {
  handlers: [],
  getLessons() {
    return JSON.parse(localStorage.getItem('lessons') || '[]');
  },
  setLessons(lessons) {
    localStorage.setItem('lessons', JSON.stringify(lessons));
    this.onChangeLessons(lessons);
  },
  setLesson(lesson) {
    const lessons = this.getLessons();
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
    this.setLessons(lessons);
    this.onChangeLessons();
  },
  removeLesson(lessonId) {
    const newLessons = this.getLessons().filter(
      (lesson) => lesson.id !== lessonId,
    );

    this.setLessons(newLessons);
  },
  getNearestLesson(lessonId) {
    const lessons = this.getLessons();
    const index = lessons.findIndex((lesson) => lesson.id === lessonId);

    return {
      prevLesson: lessons[index - 1] || null,
      nextLesson: lessons[index + 1] || null,
    };
  },
  clearNonexistentLessons(lessonId) {
    const lessons = this.getLessons();
    const newLessons = lessons.filter((lesson) => lesson.id !== lessonId);
    this.setLessons(newLessons);
  },
  onChangeLessons() {
    this.handlers.forEach((handler) => {
      handler?.(this.getLessons());
    });
  },
  addChangeHandler(func) {
    if (!this.handlers.find((x) => x === func)) {
      this.handlers.push(func);
    }
  },
  removeChangeHandler(func) {
    const index = this.handlers.findIndex((x) => x === func);
    if (index !== -1) {
      this.handlers.splice(index, 1);
    }
  },
};
