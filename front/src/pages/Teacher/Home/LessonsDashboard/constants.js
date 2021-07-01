export const Statuses = {
  DRAFT: 'Draft',
  PUBLIC: 'Public',
  PRIVATE: 'Private',
  ARCHIVED: 'Archived',
};

export const statusesOptions = [
  {
    value: null,
    labelKey: 'lesson_dashboard.status_select.all',
  },
  {
    value: Statuses.DRAFT,
    labelKey: 'lesson_dashboard.status_select.draft',
  },
  {
    value: Statuses.PUBLIC,
    labelKey: 'lesson_dashboard.status_select.public',
  },
  {
    value: Statuses.PRIVATE,
    labelKey: 'lesson_dashboard.status_select.private',
  },
  {
    value: Statuses.ARCHIVED,
    labelKey: 'lesson_dashboard.status_select.archived',
  },
];

export const pageLimit = 8;
