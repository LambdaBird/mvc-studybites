export default {
  left_bar: {
    lessons: 'LESSONS',
    add_new_lesson: 'New lesson',
  },
  right_bar: {
    analytics: 'Analytics',
    funnel: {
      title: 'Lesson funnel',
      description: 'Let`s find the part of the lesson where people are stuck',
    },
    no_students: 'Lesson has no students',
    anonymous_user: 'Anonymous user',
    share_modal: {
      title: 'Share to web',
      description: 'Anyone with the link can view',
      copy_button: 'Copy',
      link_placeholder: 'Link would be here...',
    },
    not_started: 'not started yet',
  },
  pages: {
    students: 'My students',
    lesson_students: 'Lesson students',
    create_lesson: 'Lesson creation',
    edit_lesson: 'Lesson edit',
    lesson_preview: 'Lesson preview',
    create_course: 'Course creation',
    edit_course: 'Course edit',
    home: 'Home page',
  },
  info: {
    greeting: 'Welcome back, {{fullName}}',
    lessons: 'Lessons',
    students: 'Students',
  },
  course_dashboard: {
    error: 'Can not fetch courses',
    title: 'My courses',
    add_button: 'Add course',
    search: {
      placeholder: 'Name',
    },
    menu: {
      archive: 'Archive Course',
      publish: 'Publish Course',
      restore: 'Restore Course',
      draft: 'Move to Draft',
    },
  },
  lesson_dashboard: {
    error: 'Can not fetch lessons',
    title: 'My lessons',
    add_button: 'Add lesson',

    card: {
      edit: 'Edit',
      no_students: 'No students',
      students: 'students',
    },
    search: {
      placeholder: 'Name',
    },
    status: {
      draft: 'Draft',
      archived: 'Archived',
      public: 'Public',
      private: 'Private',
      course_only: 'Course Only',
      none: 'None',
    },
    status_select: {
      all: 'All statuses',
      draft: 'Draft',
      archived: 'Archived',
      public: 'Public',
      private: 'Private',
      course_only: 'Courses Only',
    },
    menu: {
      archive: 'Archive Lesson',
      publish: 'Publish Lesson',
      restore: 'Restore Lesson',
      course_only: 'Make Course only',
      draft: 'Move to Draft',
    },
    status_modal: {
      title: 'Do you want to also change course status?',
      content:
        'Lesson status will change and all related courses ({{ coursesCount }}) will also change statuses',
      ok: 'Ok',
      cancel: 'Cancel',
    },
  },
  students_list: {
    title: 'My students',
    invite: 'Invite Now',
    no_students: 'No students yet!',
    all: 'View all',
  },
  lesson_funnel: {
    finish_bite: 'Finish',
    start_bite: 'Start',
    mean: 'Average',
    median: 'Median',
    bar_title: 'Students funnel',
    content_title: 'Bite content',
    spark_title: 'Time distribution',
  },
  editor_js: {
    tool_names: {
      text: 'Text',
      next: 'Next',
    },
    message: {
      success_created: 'Successfully created',
      success_updated: 'Successfully updated',
      error_created: 'Create error',
      error_updated: 'Update error',
      error_lesson_name: 'Missing lesson name',
      error_empty_blocks: 'Missing lesson blocks',
      error_lesson_not_found: 'Lesson not found',
    },
    header: {
      placeholder: 'Enter a header',
    },
    toolbar: {
      toolbox_add: 'Add',
    },
    tools: {
      warning_title: 'Title',
      warning_message: 'Message',
    },
  },
  course_edit: {
    keywords: 'Keywords',
    error_course_name: 'Missing course name',
    lesson_search: {
      placeholder: 'Choose lesson',
    },
    to_lesson_button: 'Go to lesson',
    title: {
      placeholder: 'Course title',
    },
    publish_modal_success: {
      title: 'The course is now available to all students',
      ok: 'Ok',
    },
    publish_modal_fail: {
      title: 'Can not publish course',
      content:
        'Can not publish course if at least one of its Lesson have status ???Archived???',
      ok: 'Ok',
    },
    message: {
      success_created: 'Successfully created',
      success_updated: 'Successfully updated',
      error_created: 'Create error',
      error_updated: 'Update error',
      error_course_name: 'Missing course name',
    },
  },
  lesson_edit: {
    unsaved_modal: {
      title: 'You have unsaved changes',
      content: `You've made updates in Lesson, but you haven't saved these changes. Do you want to discard this changes?`,
      ok_text: 'Discard',
      cancel_text: 'Cancel',
    },
    buttons: {
      publish: 'Publish',
      save: 'Save',
      back: 'Back',
      forward: 'Forward',
      preview: 'Preview',
      share: 'Share',
      move_to_draft: 'Move to draft',
      upload: 'Click to select file',
      analytics: 'Analytics ({{user}})',
      analytics_user: 'user',
    },
    cover_image: {
      title: 'Cover image link',
      input_placeholder: 'Your image link',
      not_found: 'Not found',
    },
    title: {
      placeholder: 'Untitled',
    },
    links: {
      invite: 'Invite Collaborators',
      students: 'Students',
      analytics: 'Analytics',
      archive: 'Archive',
    },
    description: {
      title: 'Description',
      placeholder: 'Your description',
    },
    publish_modal: {
      title: 'The lesson is now available to all students',
      ok: 'Ok',
    },
  },
  lesson_students: {
    title: 'Lesson students ({{studentsCount}})',
    table: {
      full_name: 'Full Name',
      email: 'Email',
      last_activity: 'Last activity',
      first_activity: 'First activity',
      not_started: 'Not started',
      action: 'Action',
      progress: 'Progress',
      edit: 'Edit',
      no_data: 'No data',
      action_remove: 'Remove',
    },
    search: {
      placeholder: 'Email or name',
    },
    buttons: {
      invite_student: 'Invite student',
    },
  },
  lesson_students_results: {
    start: 'Start',
    finish: 'Finish',
    seconds: '{{time}} seconds',
    short_seconds: '{{time}} sec.',
  },
  students: {
    title: 'Lessons students ({{studentsCount}})',
    table: {
      full_name: 'Full Name',
      email: 'Email',
      last_activity: 'Last activity',
      not_started: 'Not started',
      no_data: 'No data',
      lessons: 'Lessons',
      no_lessons: 'No lessons',
    },
    search: {
      placeholder: 'Email or name',
    },
    buttons: {
      invite_student: 'Invite student',
    },
  },
  lesson_list: {
    untitled: 'Untitled',
    title: 'LESSONS',
    confirm_title: 'Are you sure?',
    confirm_ok: 'Yes',
    confirm_cancel: 'No',
    link_copy_successfully: 'Link copied successfully',
    copy_link: 'Copy link',
    delete_lesson: 'Delete',
  },
};
