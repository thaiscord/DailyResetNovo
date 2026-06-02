import { Lang } from '../hooks/useLanguage';
import { psEn, psPt, psEs, psFr, psDe } from './privateSpaceTranslations';

export type TranslationMap = Record<string, string>;

const en: TranslationMap = {
  // ── Tabs ────────────────────────────────────────────────────────────────────
  'tabs.today':    'Today',
  'tabs.habits':   'Habits',
  'tabs.progress': 'Progress',
  'tabs.mindset':  'Mindset',
  'tabs.profile':  'Profile',

  // ── Today ───────────────────────────────────────────────────────────────────
  'greeting.morning':   'Good morning. You showed up. That already matters.',
  'greeting.afternoon': 'Good afternoon. One reset can change the direction of your day.',
  'greeting.evening':   'Good evening. Even a quiet day deserves a reset.',
  'today.headline':     'Begin again\nfrom here.',
  'today.subheadline':  'One action today is enough.',
  'today.checklist.title':          'DAILY CHECKLIST',
  'today.checklist.morning':        'Morning Routine',
  'today.checklist.action':         "Today's Action",
  'today.checklist.deepwork':       'Deep Work',
  'today.checklist.nodistractions': 'No Distractions',
  'today.checklist.evening':        'Evening Reflection',
  'today.complete':     "Complete Today's Reset",
  'today.focus':        'Focus Timer',
  'today.focus.short':  'Focus',
  'today.detox':        'Digital Detox',
  'future.self.eyebrow':    'YOUR FUTURE SELF',
  'future.self.question':   'A QUESTION FOR YOU',
  'future.self.prompt.sub': "Take a moment. There's no right answer.",
  'today.card.action':  "Today's Action",
  'today.card.why':     'Why it matters',
  'today.card.reflect': 'Reflection',
  'today.badge.today':  'TODAY',
  'today.day':          'Day {{day}}',
  'today.done.title':   'Reset completed.',
  'today.done.sub':     'You showed up today.',
  'today.done.day':     'Day {{day}} done',
  'today.locked.title':  'Day {{day}} Locked',
  'today.locked.sub':   'Unlock your full 365-day reset journey.',
  'today.locked.cta':   'Unlock Full Access →',

  // ── Habits ──────────────────────────────────────────────────────────────────
  'habits.eyebrow':      'TODAY',
  'habits.title':        'Habits',
  'habits.subtitle':     'Build gently',
  'habits.locked.title': 'Habits unlock on Day 7',
  'habits.locked.sub':   'Right now, the only thing that matters is your daily reset. Show up for 7 days — your habits will be here waiting.',
  'habits.locked.days':  '{{n}} days until habits unlock',
  'habits.pct.label':    'completed today',
  'habits.section':      'DAILY HABITS',
  'habit.morning':        'Morning Routine',
  'habit.workout':        'Workout',
  'habit.deepwork':       'Deep Work',
  'habit.read':           'Read 20 Pages',
  'habit.water':          'Drink Water',
  'habit.nodistractions': 'No Distractions',
  'habit.sleep':          'Sleep Earlier',
  'habit.plan':           'Plan Tomorrow',
  'habit.gratitude':      'Gratitude',
  'habit.detox':          'Digital Detox',

  // ── Progress ────────────────────────────────────────────────────────────────
  'progress.eyebrow':        'YOUR JOURNEY',
  'progress.title':          'Progress',
  'progress.subtitle':       'Your consistency, visualized',
  'progress.card.label':     'Journey Progress',
  'progress.of365':          'of 365 days',
  'progress.today':          'Today',
  'progress.week':           'This week',
  'stat.streak':             'Streak',
  'stat.best':               'Best',
  'stat.done':               'Done',
  'stat.weekly':             'Weekly',
  'stat.monthly':            'Monthly',
  'stat.day':                'Day',
  'progress.journey.title':  '365-Day Journey',
  'progress.journey.day':    'Day {{day}} of 365',
  'progress.journey.rem':    '{{days}} days remaining',

  // ── Mindset ─────────────────────────────────────────────────────────────────
  'mindset.eyebrow':    'MINDSET',
  'mindset.title':      'Mindset',
  'mindset.subtitle.one':   '{{count}} insight unlocked',
  'mindset.subtitle.other': '{{count}} insights unlocked',
  'mindset.all':           'All',
  'mindset.today':         'TODAY',
  'mindset.filter.today':  'Today',
  'mindset.header.daily':  'Daily insight.',
  'mindset.header.count':  '{{n}} insight{{s}} unlocked.',
  'mindset.locked':     'Unlock with Premium',
  'mindset.empty':      'Complete your first Daily Reset\nto unlock Mindset insights.',
  'mindset.min':        '{{n}} min',
  'mindset.minread':    '{{n}} min read',
  'mindset.pro':        'PRO',
  'cat.focus':          'Focus',
  'cat.discipline':     'Rhythm',
  'cat.confidence':     'Self-Trust',
  'cat.productivity':   'Clarity',
  'cat.emotional':      'emotional reset',
  'cat.detox':          'Digital Detox',
  'cat.focus.label':        'Focus',
  'cat.discipline.label':   'Rhythm',
  'cat.confidence.label':   'Self-Trust',
  'cat.productivity.label': 'Clarity',
  'cat.emotional.label':    'Emotional Reset',
  'cat.detox.label':        'Digital Detox',
  'cat.calm.label':         'Calm',
  'cat.courage.label':      'Courage',
  'cat.rest.label':         'Rest',
  'cat.momentum.label':     'Momentum',

  // ── Profile ─────────────────────────────────────────────────────────────────
  'profile.goals.title':       'YOUR GOALS',
  'profile.settings.title':    'SETTINGS',
  'profile.name.placeholder':  'Tap to set your name',
  'profile.premium':           'PREMIUM',
  'profile.upgrade':           'Access the Full Experience',
  'profile.version':           'Daily Reset v1.0.0',
  'profile.row.notification':  'Notification Time',
  'profile.row.language':      'Language',
  'profile.row.restore':       'Restore Purchase',
  'profile.row.privacy':       'Privacy Policy',
  'profile.row.terms':         'Terms of Service',
  'profile.row.reset':         'Clear My Data',
  'profile.restore.title':     'Restore Purchase',
  'profile.restore.msg':       'No previous purchase found.',
  'profile.reset.title':       'Clear My Data',
  'profile.reset.msg':         'Your local progress will be cleared. This cannot be undone.',
  'profile.reset.cancel':      'Cancel',
  'profile.reset.confirm':     'Clear',
  'profile.modal.privacy':     'Privacy Policy',
  'profile.modal.terms':       'Terms of Service',
  'profile.modal.journey.title': 'Your Recovery Path',
  'profile.modal.journey.sub':   'The app adapts to support your recovery.',
  'profile.modal.eyebrow':     'DAILY RESET APP',
  'profile.modal.date':        'Last updated: May 2026',
  'profile.modal.privacy.footer': 'By using Daily Reset, you agree to this Privacy Policy.',
  'profile.modal.terms.footer':   'By using Daily Reset, you agree to these Terms of Service.',
  'notif.morning':   'Morning',
  'notif.afternoon': 'Afternoon',
  'notif.evening':   'Evening',
  'notif.settings.eyebrow':       'SETTINGS',
  'notif.settings.title':         'Daily Reminder',
  'notif.settings.sub':           'Choose the best moment for your reset.',
  'notif.period.label':           'PERIOD',
  'notif.period.morning.label':   'Morning',
  'notif.period.morning.sub':     'Start your day intentionally',
  'notif.period.afternoon.label': 'Afternoon',
  'notif.period.afternoon.sub':   'Midday reset and refocus',
  'notif.period.evening.label':   'Evening',
  'notif.period.evening.sub':     'End your day with awareness',
  'notif.hour.label':             'NOTIFICATION HOUR',
  'notif.preview.text':           'Reminder every day at',
  'notif.saved':                  'Reminder updated successfully.',
  'notif.saving':                 'Saving...',
  'notif.save':                   'Save Reminder',
  'notif.evening.sectionLabel':   'EVENING CHECK-IN',
  'notif.evening.toggleLabel':    'Evening check-in',
  'notif.evening.toggleSub':      "A quiet moment at day's end",
  'notif.word.sectionLabel':      'WORD OF THE DAY',
  'notif.word.toggleLabel':       'Word of the day',
  'notif.word.toggleSub':         'Sent 30 min before your reminder',
  'notif.milestone.sectionLabel': 'MILESTONE MOMENTS',
  'notif.milestone.toggleLabel':  'Milestone moments',
  'notif.milestone.toggleSub':    'When something meaningful happens',
  'notif.quiet.sectionLabel':     'QUIET DAYS',
  'notif.quiet.sub':              'No reminders on these days',
  'notif.promise.text':           "We send one notification per day, maximum.\nNever more. That's a promise.",
  'notif.web.unavailable':        "Reminders work best in the installed app.\nFor now, your resets are fully available here.",
  'notif.day.0': 'Sun', 'notif.day.1': 'Mon', 'notif.day.2': 'Tue', 'notif.day.3': 'Wed',
  'notif.day.4': 'Thu', 'notif.day.5': 'Fri', 'notif.day.6': 'Sat',
  'lang.chooseLang':      'LANGUAGE',
  'lang.chooseLangTitle': 'Choose your language',
  'lang.en': 'English',
  'lang.es': 'Spanish',
  'lang.pt': 'Português',
  'lang.eyebrow':         'CHOOSE YOUR SPACE',
  'lang.sub':             'This experience adapts to your language and emotional rhythm.',

  // ── Common ──────────────────────────────────────────────────────────────────
  'common.continue':     'Continue',
  'common.skip':         'Skip',

  // ── Onboarding — arrival question (Screen 3) ─────────────────────────────
  'onboarding.arrival.label':              'ONE QUESTION',
  'onboarding.arrival.title':              "How are you\narriving today?",
  'onboarding.arrival.subtitle':           "There's no right answer here.",
  'onboarding.arrival.options.exhausted':  "I'm exhausted, but I didn't give up.",
  'onboarding.arrival.options.anxious':    "My mind won't slow down.",
  'onboarding.arrival.options.empty':      'Everything feels too heavy right now.',
  'onboarding.arrival.options.breathe':    'I just need a moment to breathe.',
  'onboarding.arrival.options.returning':  "I'm trying to find my way back.",
  'onboarding.arrival.cta':               'This is me today',

  // ── Onboarding Promise (Screen 3) ───────────────────────────────────────────
  'onboarding.promise.heading':         "One moment.\nEvery day.\nJust yours.",
  'onboarding.promise.body':            "One small thing each day. Not to fix you —\nbut to help you get through.",
  'onboarding.promise.pill.nopressure': 'No pressure',
  'onboarding.promise.pill.minutes':    '2 minutes',
  'onboarding.promise.pill.pace':       'At your pace',
  'onboarding.promise.cta':            'Begin my reset →',
  'onboarding.promise.hint':           'No account needed. Start in seconds.',

  // ── Today — greetings ─────────────────────────────────────────────────────
  'today.greeting.morning':   'GOOD MORNING.',
  'today.greeting.afternoon': 'GOOD AFTERNOON.',
  'today.greeting.evening':   'GOOD EVENING.',
  'today.greeting.done':      'STILL HERE.',

  // ── Today — rotating subheadlines ─────────────────────────────────────────
  'today.subheadline.0': 'Some changes only show up weeks after they begin.',
  'today.subheadline.1': 'The version of you still here has already done something.',
  'today.subheadline.2': 'Nothing built in silence looks like much from the outside.',
  'today.subheadline.3': 'Momentum doesn\'t need every day to be the same.',
  'today.subheadline.4': 'Even a slow return is still a return.',
  'today.subheadline.5': 'Presence isn\'t a performance.',
  'today.subheadline.6': 'The distance between where you were and where you are is real.',

  // ── Today — mood check-in ─────────────────────────────────────────────────
  'today.mood.label': 'How are you right now?',
  'today.mood.hard':  'Hard',
  'today.mood.okay':  'Okay',
  'today.mood.good':  'Good',

  // ── Today — word of the day ───────────────────────────────────────────────
  'today.word.label': 'YOUR WORD TODAY',

  // ── Today — card section titles ───────────────────────────────────────────
  'today.section.action':     'Your reset today',
  'today.section.why':        'Why this helps',
  'today.section.reflection': 'Reflection',

  // ── Today — CTA ───────────────────────────────────────────────────────────
  'today.cta.complete': "Finish today's reset",

  // ── Today — streak state ──────────────────────────────────────────────────
  'today.streak.paused':    'Paused — welcome back',
  'today.streak.resting':   "Resting — that's okay",
  'today.streak.returning': 'You came back.',

  // ── Today — dynamic day label ─────────────────────────────────────────────
  'today.day.label': 'DAY {{day}}',

  // ── Journal ───────────────────────────────────────────────────────────────
  'journal.title':            'Your entries.',
  'journal.subtitle':         '{{n}} days recorded',
  'journal.empty.title':      'Nothing here yet.',
  'journal.empty.sub':        "Your entries will appear here\nafter your first reset.",
  'journal.day':              'DAY {{day}}',
  'journal.completed':        '✓ Reset done',
  'journal.pill.action':      'Action',
  'journal.pill.reflection':  'Reflection',
  'journal.nonotes':          'Reset completed. No notes added.',
  'journal.norecord':         'No notes recorded.',
  'journal.recent.title':     'Recent resets',
  'journal.calendar.title':   'Your reset calendar',
  'journal.modal.label.today':      "TODAY'S RESET",
  'journal.modal.label.action':     'YOUR RESET TODAY',
  'journal.modal.label.why':        'WHY THIS HELPED',
  'journal.modal.label.reflection': 'REFLECTION',
  'journal.modal.label.moment':     'MOMENT TO REFLECT',
  'journal.modal.label.after':      'AFTER THE RESET',
  'journal.modal.after.sub':        'What stayed with you today',
  'journal.modal.nonote':       'No note added.',
  'journal.modal.noreflection': 'No reflection added.',
  'journal.modal.completed':    '✓ Reset completed',

  // ── Quiet Reflections ─────────────────────────────────────────────────────
  'qr.title':         'Quiet Reflections',
  'qr.subtitle':      'Your private moments, kept softly.',
  'qr.empty.title':   'Some thoughts pass quietly. Some stay.',
  'qr.empty.body':    'A quiet space for what matters.',
  'qr.view.older':    'View older reflections quietly',
  'qr.closing':       'These moments belong to you.',
  'qr.group.week':    'This Week',
  'qr.group.month':   'Earlier This Month',
  'qr.group.before':  'Quietly Kept Before',
  'qr.echo.0':        "You've been carrying a lot quietly.",
  'qr.echo.1':        'You keep returning anyway.',
  'qr.echo.2':        'Some things are better held than solved.',
  'qr.echo.3':        'Not everything heavy needs to be solved right now.',
  'qr.echo.4':        'You showed up for yourself, quietly.',
  'qr.echo.5':        'One gentle thought stayed with you.',
  'qr.echo.6':        'Some thoughts ask to be heard more than solved.',
  'qr.echo.7':        "You've been here for yourself.",

  // ── Progress — private space ──────────────────────────────────────────────
  'progress.privatespace.eyebrow':        'YOUR PRIVATE SPACE',
  'progress.privatespace.headline':       "A quiet place to unload what's heavy.",
  'progress.privatespace.start':          'Write here...',
  'progress.privatespace.placeholder':    'Let it come...',
  'progress.privatespace.done':           'Ready',
  'progress.privatespace.keep':           'Hold this',
  'progress.privatespace.letgo':          'Release it',
  'progress.privatespace.kept.title':     'Kept quietly.',
  'progress.privatespace.kept.sub':       'This reflection stayed with you.',
  'progress.privatespace.released.title': 'Let go softly.',
  'progress.privatespace.released.sub':   'Some thoughts are allowed to pass.',
  'progress.qr.title':                    'Quiet Reflections',
  'progress.qr.sub.empty':               'Your private moments, kept softly.',
  'progress.qr.sub.count':               '{{n}} reflection{{s}} saved quietly.',
  'progress.qr.sub.count.one':           '1 reflection saved quietly.',
  'progress.qr.sub.count.other':         '{{n}} reflections saved quietly.',
  'progress.story.weeklySubCount.one':   '1 week of your journey',
  'progress.story.weeklySubCount.other': '{{n}} weeks of your journey',
  'progress.section.yourjourney':         'YOUR JOURNEY',
  'progress.section.wordtoday':           'YOUR WORD TODAY',

  // ── Onboarding ──────────────────────────────────────────────────────────────
  'onboard.skip':        'Skip',
  'onboard.s1.headline': 'Your daily space\nto reset.',
  'onboard.s1.sub':      'Daily Reset helps you recover from exhaustion and rebuild steadiness — one small action per day. No pressure.',
  'onboard.s1.cta':      'Start My Reset',
  'onboard.s2.headline': 'One small action.\nEach day.',
  'onboard.s2.sub':      "Every day you'll receive one gentle action designed for where you are right now. Not where you think you should be.",
  'onboard.s2.cta':      'Continue',
  'onboard.s3.headline': 'Small steps.\nReal progress.',
  'onboard.s3.sub':      "You don't need to fix everything. You don't need to be productive. You just need to show up — even on the hard days.",
  'onboard.s3.cta':      'Begin Today',

  // ── Goal Selection ──────────────────────────────────────────────────────────
  'goals.step':          'STEP 1 OF 2',
  'goals.title':         'What do you want to\nimprove first?',
  'goals.subtitle':      'Select all that apply',
  'goals.selected':      '{{n}} selected',
  'goals.cta':           'Continue',
  'goals.alert.title':   'Select at least one goal',
  'goals.alert.msg':     'Choose what you want to work on first.',
  'goal.procrastination': 'Stop procrastinating',
  'goal.discipline':      'Build rhythm',
  'goal.distractions':    'Reduce distractions',
  'goal.routine':         'Create a routine',
  'goal.control':         'Feel in control again',

  // ── Notification Setup ──────────────────────────────────────────────────────
  'notif.step':              'STEP 2 OF 2',
  'notif.title':             "When should we send\nyour daily reset?",
  'notif.subtitle':          "We'll remind you at the perfect time for your routine.",
  'notif.morning.sublabel':  '7:00 AM • Morning reset',
  'notif.afternoon.sublabel':'12:00 PM • Midday refocus',
  'notif.evening.sublabel':  '8:00 PM • End with intention',
  'notif.bridge':            'Consistency begins with timing.',
  'notif.cta':               'Start My Reset',

  // ── Paywall ─────────────────────────────────────────────────────────────────
  'paywall.title':       'Unlock Your Full\nReset Journey',
  'paywall.sub':         'Get access to 365 daily resets, focus tools, habit tracking and progress insights designed to help you return to your rhythm one day at a time.',
  'paywall.benefits.title': "WHAT'S INCLUDED",
  'benefit.0': '365 Daily Resets',
  'benefit.1': 'Daily actions & guidance',
  'benefit.2': 'Habit tracker',
  'benefit.3': 'Focus timer',
  'benefit.4': 'Progress dashboard',
  'benefit.5': 'Mindset library',
  'benefit.6': 'Streak tracking',
  'benefit.7': 'Daily reminders',
  'plan.annual.label':  'Annual',
  'plan.annual.per':    '$2.50 / month',
  'plan.annual.badge':  'BEST VALUE',
  'plan.annual.saving': 'Save 50%',
  'plan.monthly.label': 'Monthly',
  'plan.monthly.per':   'per month',
  'paywall.disclaimer': 'Cancel anytime. Secure payment via App Store / Google Play.',
  'paywall.cta':        'Start My Reset Journey',
  'paywall.skip':       'Continue with limited free access',

  // ── Today remaining ──────────────────────────────────────────────────────────
  'today.ritual.name':              'Reset Ritual',
  'today.ritual.sub':               'A quiet moment to reset yourself.',
  'today.reflect.eyebrow':          'A MOMENT TO REFLECT',
  'today.reflect.done':             '✓ You left something here.',
  'today.tomorrow.label':           'TOMORROW',
  'today.tomorrow.day2begins':      'Tomorrow, Day 2 begins.',
  'today.tomorrow.dayArrives':      'Day {{day}} arrives tomorrow.',
  'today.tomorrow.eyebrow':         "TOMORROW'S RESET",
  'today.tomorrow.continues.top':   'YOUR JOURNEY CONTINUES',
  'today.tomorrow.continues.msg':   'Rest. Come back when you\'re ready.',
  'today.tomorrow.nopressure':      'No pressure. It will be here when you\'re ready.',
  'today.tomorrow.continues.cta':   'It will be here tomorrow.',

  // ── Ritual subtitle — dynamic (state-based + generic rotation) ───────────────
  'today.ritual.sub.racing':      'Two minutes to slow down.',
  'today.ritual.sub.tired':       'A space to breathe.',
  'today.ritual.sub.overwhelmed': 'Less weight for a few minutes.',
  'today.ritual.sub.unclear':     'An exercise to clear your mind.',
  'today.ritual.sub.drained':     'No pressure. Just presence.',
  'today.ritual.sub.balanced':    'A moment to notice what\'s working.',
  'today.ritual.sub.g0':          'A moment created for today.',
  'today.ritual.sub.g1':          'Your reset is ready.',
  'today.ritual.sub.g2':          'Something simple for right now.',
  'today.ritual.sub.g3':          'A small return to yourself.',
  'today.ritual.sub.g4':          'Your next step is here.',

  // ── Tomorrow — stage-based messages ──────────────────────────────────────────
  'today.tomorrow.s1.0': "You don't need to do more. Just return.",
  'today.tomorrow.s1.1': 'The path begins exactly here.',
  'today.tomorrow.s1.2': 'Every return counts, even the quiet ones.',
  'today.tomorrow.s1.3': 'There is something waiting for you tomorrow.',
  'today.tomorrow.s1.4': 'One step at a time is already enough.',
  'today.tomorrow.s2.0': 'Sometimes clarity comes after rest.',
  'today.tomorrow.s2.1': 'The rhythm is starting to reveal itself.',
  'today.tomorrow.s2.2': 'Not every step forward makes noise.',
  'today.tomorrow.s2.3': 'Tomorrow belongs to you too.',
  'today.tomorrow.s2.4': 'A small detail can change the tone of a day.',
  'today.tomorrow.s3.0': 'Some answers come when the hurry is gone.',
  'today.tomorrow.s3.1': "What you've built here doesn't disappear.",
  'today.tomorrow.s3.2': 'Something quiet is settling in.',
  'today.tomorrow.s3.3': "Tomorrow you'll notice something today still doesn't show.",
  'today.tomorrow.s3.4': "There's always more to find, without rushing.",
  'today.tomorrow.s4.0': 'Silence has weight too. And you know that.',
  'today.tomorrow.s4.1': 'Every return is a choice made again.',
  'today.tomorrow.s4.2': 'What seems small is often what stays.',
  'today.tomorrow.s4.3': "There's a continuity here only you can see.",
  'today.tomorrow.s4.4': "Tomorrow doesn't need to prove anything. Just show up.",

  // ── Completion ceremony ───────────────────────────────────────────────────────
  'ceremony.whatsAhead': "WHAT'S AHEAD",

  // ── Today — dynamic messages ──────────────────────────────────────────────────
  'today.messages.welcomeBack': 'WELCOME BACK',

  // ── Today — category labels (DailyResetCard + TomorrowAnticipationCard) ──────
  'today.cat.Focus':      'Focus',
  'today.cat.Rhythm':     'Rhythm',
  'today.cat.Discipline': 'Discipline',
  'today.cat.Courage':    'Courage',
  'today.cat.Momentum':   'Momentum',
  'today.cat.Calm':       'Calm',
  'today.cat.Clarity':    'Clarity',
  'today.cat.Rest':       'Rest',

  // ── Reflection write screen ───────────────────────────────────────────────────
  'reflect.eyebrow':     'REFLECTION',
  'reflect.save':        'Save',
  'reflect.skip':        'Skip',
  'reflect.saved':       'Saved ✓',
  'reflect.microcopy':   'One thought is enough.',
  'reflect.placeholder': 'Begin writing here...',
  'reflect.privacy':     'Your reflections stay private.',

  // ── Journal ───────────────────────────────────────────────────────────────────
  'journal.subtitle.one':   '1 day recorded',
  'journal.subtitle.other': '{{n}} days recorded',

  // ── Reflection history ────────────────────────────────────────────────────────
  'reflection.header.eyebrow':      'YOUR JOURNEY',
  'reflection.header.title':        'Reflection Journal',
  'reflection.header.sub.empty':    'Your reflection space is waiting.',
  'reflection.header.sub.count':    '{{n}} reflection{{s}} written',
  'reflection.action.edit':         'Edit reflection',
  'reflection.action.delete':       'Delete reflection',
  'reflection.action.readmore':     'Read more',
  'reflection.dayBadge':            'Day {{n}}',
  'reflection.edit.title':          'Edit Reflection',
  'reflection.edit.save':           'Save',
  'reflection.edit.cancel':         'Cancel',
  'reflection.edit.privacy':        'Your reflections stay private.',
  'reflection.delete.title':        'Delete this reflection?',
  'reflection.delete.sub':          'This action cannot be undone.',
  'reflection.delete.cancel':       'Cancel',
  'reflection.delete.confirm':      'Delete',
  'reflection.empty.noyet':         'No reflections yet.',
  'reflection.empty.waiting':       'Your reflection space is waiting.',
  'reflection.empty.appear':        'Your reflections will appear here as you write them.',
  'reflection.empty.invite':        "After completing a daily reset, you'll be invited to write a short reflection.",
  'reflection.bottom.quote':        '"Every reflection is a small act of self-awareness."',

  // ── Weekly recap history ──────────────────────────────────────────────────────
  'recap.history.eyebrow':          'YOUR HISTORY',
  'recap.history.title':            'Weekly Recaps',
  'recap.history.sub.nodata':       'Your first recap arrives after a full week.',
  'recap.history.sub.building':     'Recaps appear as you build your journey.',
  'recap.history.sub.count':        '{{n}} week{{s}} of your journey',
  'recap.history.empty.title':      'Your weekly story is still unfolding.',
  'recap.history.empty.text':       'As you complete more resets, your reflections\nand patterns will appear here.',
  'recap.history.current.eyebrow':  'THIS WEEK · IN PROGRESS',
  'recap.history.coming.title':     'Past weeks will appear here.',
  'recap.history.coming.sub':       'Your first full-week recap unlocks after 7 days of use.',
  'recap.history.sum.weeks':        'weeks recorded',
  'recap.history.sum.resets':       'total resets',
  'recap.history.sum.streak':       'longest rhythm',
  'recap.history.quote':            '"Each week is a page in the story you\'re writing."',
  'recap.card.streakLabel':         'rhythm',
  'recap.card.habitsLabel':         '% habits',
  'recap.insight.sevenForSeven':    'Seven for seven. A steady week.',
  'recap.insight.showedUpN':        'You showed up {{n}} times this week.',
  'recap.insight.nResets':          '{{n}} resets this week. A rhythm is forming.',
  'recap.insight.twoReturns':       'There were returns this week. The space is still here.',
  'recap.insight.cameBackStreak':   'You came back, once more.',
  'recap.insight.cameBack':         'You came back. Once is enough to matter.',
  'recap.insight.stillYours':       'This week is still yours to shape.',
  'recap.subinsight.remarkable':    'Consistency like this changes things over time.',
  'recap.subinsight.strong':        'Quiet consistency is building something real.',
  'recap.subinsight.streakHolding': 'Your rhythm is holding.',
  'recap.subinsight.repetition':    'Small repetition becomes identity.',
  'recap.subinsight.eachReset':     'Each reset counts, however the week looks.',

  // ── Mindset remaining ─────────────────────────────────────────────────────────
  'mindset.empty.today.title':     "Today's insight is waiting.",
  'mindset.empty.lib.title':       'Your library is growing.',
  'mindset.empty.today.sub':       "Complete your first Daily Reset to unlock today's mindset insight.",
  'mindset.empty.lib.sub':         'Insights unlock as your journey progresses.',
  'mindset.library.text':          'Your mindset library.',
  'mindset.library.textCount':     '{{n}} insight{{s}} in your collection.',
  'mindset.library.sub1':          'New insights unlock as your journey progresses.',
  'mindset.library.sub2':          'Library expands daily with your practice.',

  // ── Paywall screen — full copy ───────────────────────────────────────────────
  'paywall.loading':               'Processing...',
  'paywall.legal.full':            'Billed through App Store or Google Play.',
  // Soft variant (post-ritual sheet)
  'paywall.v1.heading':            "This space is yours\nto continue.",
  'paywall.v1.body':               "A deeper space for when it's louder, heavier,\nor simply harder to return to yourself.",
  'paywall.v1.cta':                '⭐  Try 7 days free',
  'paywall.v1.ctaSub':             'Then $49.99/year',
  'paywall.v1.cancel':             'Cancel anytime',
  'paywall.v1.maybe':              'Maybe later',
  'paywall.v1.footer':             'No commitment. Cancel before trial ends.',
  // Medium variant (day 3 return)
  'paywall.v2.eyebrow':            'DAY 3',
  'paywall.v2.heading':            "You came back\nthree times.",
  'paywall.v2.sub':                "There is more here, whenever you want it.",
  'paywall.v2.tagline':            "A calmer mind. A softer routine.\nA place to return to every day.",
  'paywall.v2.why1':               "You do not need more pressure.\nYou need a place to return to.",
  'paywall.v2.why2':               'This space grows quieter the more you return.',
  'paywall.v2.cta':                'Continue Your Reset →',
  'paywall.v2.ctaSub':             'Cancel anytime. No pressure. Your pace stays yours.',
  // Feature grid labels
  'paywall.feat.mindLoud':         'mind feels loud',
  'paywall.feat.emoTired':         'emotionally tired',
  'paywall.feat.tryingAgain':      'trying again',
  'paywall.feat.needCalm':         'need calm',
  'paywall.feat.startingOver':     'starting over',
  'paywall.feat.hardWeek':         'hard week',
  // Testimonials
  'paywall.t1.quote':              'I open this before every stressful meeting.',
  'paywall.t1.name':               'Sarah, 34',
  'paywall.t2.quote':              "It's the only app I haven't deleted in a year.",
  'paywall.t2.name':               'Marcus, 41',
  'paywall.t3.quote':              'Feels like someone finally gets it.',
  'paywall.t3.name':               'Priya, 29',
  // Shared pricing section
  'paywall.plan.badge':            'MOST CHOSEN · 7 days free',
  'paywall.plan.annual.name':      'Annual — $49.99/year',
  'paywall.plan.annual.note':      'For a year of deeper support.',
  'paywall.plan.monthly.name':     'Monthly — $8.99/month',
  'paywall.plan.monthly.note':     'Gentle support, month by month.',
  // Direct variant (content gate)
  'paywall.v3.eyebrow':            'YOUR SPACE IS STILL HERE.',
  'paywall.v3.heading':            "There's more here, if you want it.",
  'paywall.v3.sub':                "For the moments when the day\nasks more than expected.",
  'paywall.v3.b1.title':           'A daily space to return to yourself',
  'paywall.v3.b1.sub':             'One reflection. One breath. One reset.',
  'paywall.v3.b2.title':           'Emotional clarity, one theme at a time',
  'paywall.v3.b2.sub':             'Focus, calm, courage, rest — whatever today asks.',
  'paywall.v3.b3.title':           'A curated mindset library',
  'paywall.v3.b3.sub':             'Reflections that meet you where you are.',
  'paywall.v3.annual.name':        'Annual',
  'paywall.v3.annual.free':        '7 days free',
  'paywall.v3.annual.price':       '$49.99/year',
  'paywall.v3.annual.priceSub':    '  ·  $4.16/month',
  'paywall.v3.annual.note':        'Less than a coffee. Every month.',
  'paywall.v3.monthly.name':       'Monthly',
  'paywall.v3.monthly.price':      '$8.99/month',
  'paywall.v3.monthly.note':       'Try it, cancel anytime.',
  'paywall.v3.cta.free':           'Start my free week →',
  'paywall.v3.cta.today':          'Begin today →',
  'paywall.v3.ctaSub':             'No commitment. Cancel in Settings anytime.',
  'paywall.v3.whatLabel':          'WHAT BECOMES QUIETER',
  'paywall.v3.what1':              'You stop white-knuckling every morning.',
  'paywall.v3.what2':              'The guilt about not doing enough gets quieter.',
  'paywall.v3.what3':              'You start to trust yourself again, slowly.',
  // Alert messages
  'paywall.alert.trial.title':     'Your 7-day trial has started.',
  'paywall.alert.trial.msg':       'Your full refuge is unlocked. Cancel anytime before the trial ends.',
  'paywall.alert.monthly.title':   'Welcome to Full Refuge.',
  'paywall.alert.monthly.msg':     'Everything is now unlocked. One day at a time.',

  // ── Mindset category labels (Mindset filter + card stripe + modal) ───────────
  'mindset.cat.Focus':    'Focus',
  'mindset.cat.Calm':     'Calm',
  'mindset.cat.Courage':  'Courage',
  'mindset.cat.Rest':     'Rest',
  'mindset.cat.Clarity':  'Clarity',
  'mindset.cat.Momentum': 'Momentum',
  'mindset.cat.Rhythm':   'Rhythm',

  // ── Mindset card titles (EN — used as fallback) ────────────────────────────
  'mindset.card.m1.title':    'One thing at a time.',
  'mindset.card.m2.title':    'The 2-Minute Rule',
  'mindset.card.m3.title':    'Evidence-Based Confidence',
  'mindset.card.m4.title':    'The MIT Method',
  'mindset.card.m5.title':    'Emotions as Data',
  'mindset.card.m6.title':    'The Attention Economy',
  'mindset.card.m7.title':    'The 90-Minute Work Block',
  'mindset.card.m8.title':    'Identity-Based Habits',
  'mindset.card.m9.title':    'Rejection as Redirection',
  'mindset.card.m10.title':   'Time Blocking Mastery',
  'mindset.card.m11.title':   'The Courage to Be Disliked',
  'mindset.card.m12.title':   'Reclaiming Boredom',
  'mindset.card.m13.title':   'The One Thing Principle',
  'mindset.card.m14.title':   'Never Miss Twice',
  'mindset.card.m15.title':   'Competence Creates Confidence',
  'mindset.card.m16.title':   'The Weekly Review',
  'mindset.card.m17.title':   'The Practice of Letting Go',
  'mindset.card.m18.title':   'Digital Minimalism',
  'mindset.card.m19.title':   'Deep Work',
  'mindset.card.m20.title':   'The Stockdale Paradox',
  'mindset.card.emo1.title':  'You Are Allowed to Start Again',
  'mindset.card.emo2.title':  'Rest Is Not Weakness',
  // Softer rewrites for coach-like discipline titles (Problem 2)
  'mindset.card.disc1.title': 'Your brain trusts what you repeat.',
  'mindset.card.disc2.title': 'Hard things get lighter when they become routine.',
  'mindset.card.disc3.title': 'Small repetitions shift the direction of your days.',

  // ── Mindset card m1 content (EN) ──────────────────────────────────────────
  'mindset.card.m1.content':  'Focus fades when divided. Every time you switch between tasks, your brain incurs a "switching cost" — an average of 23 minutes to fully regain focus. The most productive people in the world are not the ones doing the most things. They are doing the one most important thing with complete focus. Start each work session by choosing your single non-negotiable output. Put everything else out of reach. When you finish, then and only then do you move on.',

  // ── Mindset screen — all UI labels ───────────────────────────────────────────
  'mindset.subtitle.free':           'One meaningful insight each day.',
  'mindset.subtitle.premium':        'Reflections for your rhythm.',
  'mindset.subtitle.locked':         'Unlocks with Premium.',
  'mindset.subtitle.count.one':      '{{n}} insight unlocked.',
  'mindset.subtitle.count.other':    '{{n}} insights unlocked.',
  'mindset.badge.today':             'TODAY',
  'mindset.dayLabel':                'DAY {{day}}',
  'mindset.insightLabel':            'INSIGHT',
  'mindset.locked.journey':          'Arrives at its moment.',
  'mindset.locked.return':           'Arrives with time.',
  'mindset.modal.day':               'Day {{day}}',
  'mindset.modal.insight':           'Insight',
  'mindset.modal.minread':           '{{n}} min read',
  // For You Today
  'mindset.foryou.title':            'FOR YOU TODAY',
  'mindset.foryou.question':         'How are you showing up right now?',
  'mindset.foryou.recommended':      'RECOMMENDED FOR YOU',
  'mindset.foryou.curated':          'Curated for your journey',
  // Emotion labels + subtitles
  'mindset.emotion.overwhelmed':     'Pressure',
  'mindset.emotion.numb':            'Foggy',
  'mindset.emotion.frustrated':      'Overwhelm',
  'mindset.emotion.low_energy':      'Low energy',
  'mindset.emotion.anxious':         'Inner noise',
  'mindset.emotion.balanced':        'Balanced',
  'mindset.emotion.overwhelmed.sub': 'For when everything feels like too much.',
  'mindset.emotion.numb.sub':        'For when the mind goes quiet.',
  'mindset.emotion.frustrated.sub':  'For when the weight is hard to carry.',
  'mindset.emotion.low_energy.sub':  'For when the pace has slowed.',
  'mindset.emotion.anxious.sub':     "For when the noise doesn't stop.",
  'mindset.emotion.balanced.sub':    'For when things are feeling right.',
  // Coming Next / Unlock All (free)
  'mindset.coming.eyebrow':          'ARRIVING WITH YOUR JOURNEY',
  'mindset.unlock.title':            'YOUR SPACE CONTINUES HERE',
  'mindset.unlock.cta':              'Continue your journey →',
  // Library (premium)
  'mindset.library.title':           'PATHS TO RETURN',
  'mindset.library.insights':        'New moments arrive with time',
  'mindset.lib.burnout':             'Burnout Recovery',
  'mindset.lib.emotional':           'Emotional Reset',
  'mindset.lib.discipline':          'Gentle Discipline',
  'mindset.lib.detox':               'Digital Detox',
  'mindset.lib.focus':               'Focus Recovery',
  'mindset.lib.burnout.count':       'Burnout Recovery — 12 insights',
  'mindset.lib.emotional.count':     'Emotional Reset — 10 insights',
  'mindset.lib.discipline.count':    'Gentle Discipline — 8 insights',
  'mindset.lib.detox.count':         'Digital Detox — 8 insights',
  'mindset.lib.focus.count':         'Focus Recovery — 10 insights',
  // Per-category emotional subtitles (Problem 1)
  'mindset.lib.burnout.sub':         "Your body wasn't made to live on constant alert.",
  'mindset.lib.emotional.sub':       "You don't have to resolve everything right now.",
  'mindset.lib.discipline.sub':      'Consistency grows better without force.',
  'mindset.lib.detox.sub':           'Silence is also productivity.',
  'mindset.lib.focus.sub':           'Not every distraction is laziness.',

  // ── Profile remaining ──────────────────────────────────────────────────────────
  'profile.journey.eyebrow':       'YOUR RECOVERY PATH',
  'profile.journey.change':        'Change',
  'profile.journey.choose':        'Choose',
  'profile.journey.fallback':      'Your Journey',

  // ── Day / Month names ──────────────────────────────────────────────────────────
  'dayname.sunday': 'Sunday', 'dayname.monday': 'Monday', 'dayname.tuesday': 'Tuesday',
  'dayname.wednesday': 'Wednesday', 'dayname.thursday': 'Thursday',
  'dayname.friday': 'Friday', 'dayname.saturday': 'Saturday',

  // ── Focus Timer ─────────────────────────────────────────────────────────────
  // ── Habits (new keys) ────────────────────────────────────────────────────────
  'habits.alldone':        'All habits completed.',
  'habits.pct.completed':  'completed today',

  // ── Emotional Onboarding ─────────────────────────────────────────────────────
  'emotional.skip':          'Skip',
  'emotional.cta.continue':  'Continue',
  'emotional.cta.seeReset':  'See My Reset',
  'emotional.step':          '{{i}} OF {{total}}',
  'emotional.q1.question':   'What feels heaviest lately?',
  'emotional.q1.micro':      "There's no right answer here.",
  'emotional.q1.opt1':       'Mental overload',
  'emotional.q1.opt2':       'Anxiety',
  'emotional.q1.opt3':       'Emotional exhaustion',
  'emotional.q1.opt4':       'Lack of rhythm',
  'emotional.q1.opt5':       'Difficulty continuing',
  'emotional.q1.opt6':       'Lack of focus',
  'emotional.q1.opt7':       'Feeling disconnected',
  'emotional.q2.question':   "What do you feel you've been missing?",
  'emotional.q2.micro':      'Select what resonates most.',
  'emotional.q2.opt1':       'Calm',
  'emotional.q2.opt2':       'Clarity',
  'emotional.q2.opt3':       'Confidence',
  'emotional.q2.opt4':       'Consistency',
  'emotional.q2.opt5':       'Presence',
  'emotional.q2.opt6':       'Emotional balance',
  'emotional.q3.question':   'How would you like life to feel again?',
  'emotional.q3.micro':      "This is where we'll gently return together.",
  'emotional.q3.opt1':       'Lighter',
  'emotional.q3.opt2':       'Calmer',
  'emotional.q3.opt3':       'Slower',
  'emotional.q3.opt4':       'Clearer',
  'emotional.q3.opt5':       'More grounded',
  'emotional.q3.opt6':       'More emotionally organized',
  'emotional.q4.question':   'What pulls you away from yourself most often?',
  'emotional.q4.micro':      'No judgment here.',
  'emotional.q4.opt1':       'Too many screens',
  'emotional.q4.opt2':       'Work overload',
  'emotional.q4.opt3':       'Anxiety',
  'emotional.q4.opt4':       'Overthinking',
  'emotional.q4.opt5':       'Emotional fatigue',
  'emotional.q4.opt6':       'Lack of routine',

  // ── Weekly Recap ─────────────────────────────────────────────────────────────
  'recap.loading':            'Preparing your recap...',
  'recap.eyebrow':            'WEEKLY RECAP',
  'recap.section.focus':      'THIS WEEK IN FOCUS',
  'recap.section.highlights': 'HIGHLIGHTS OF THE WEEK',
  'recap.section.habits':     'HABIT RHYTHM',
  'recap.section.reflection': 'A QUESTION FOR YOU',
  'recap.cel.outstanding':    'Outstanding',
  'recap.cel.strong':         'Strong week',
  'recap.cel.good':           'Good week',
  'recap.habit.automatic':    'Your habits are becoming automatic.',
  'recap.habit.growing':      'Consistency is growing.',
  'recap.habit.small':        'Small steps build the path.',
  'recap.cta.ready':          "I'm Ready for Next Week",
  'recap.cta.close':          'Close',
  'recap.week.label':         'Week',

  // ── Paywall ──────────────────────────────────────────────────────────────────
  'paywall.theme.transformation.1': 'Feel progress again — one reset at a time.',
  'paywall.theme.transformation.2': 'Build consistency without overwhelm or pressure.',
  'paywall.theme.transformation.3': 'Your future self is shaped in quiet daily repetition.',
  'paywall.theme.transformation.4': 'One reset can change your entire direction.',
  'paywall.theme.future_self.1':    'In 7 days, momentum begins.',
  'paywall.theme.future_self.2':    'In 30 days, consistency becomes natural.',
  'paywall.theme.future_self.3':    'In 90 days, your identity shifts.',
  'paywall.theme.future_self.4':    'The version you want to become is built here.',
  'paywall.theme.calm.1':          'Consistency without pressure. Change without force.',
  'paywall.theme.calm.2':          "You don't need to be perfect. You just need to return.",
  'paywall.theme.calm.3':          'A gentle daily reset changes everything, slowly.',
  'paywall.theme.calm.4':          'Calm discipline is the most powerful kind.',
  'paywall.theme.trial.1':         'Experience the full Daily Reset journey, free.',
  'paywall.theme.trial.2':         'Personalized emotional resets — every single day.',
  'paywall.theme.trial.3':         'Comeback support, rituals, milestones — all included.',
  'paywall.theme.trial.4':         'No pressure. Cancel anytime before the trial ends.',
  'paywall.lock.ritual.label':     'Reset Ritual',
  'paywall.lock.ritual.sub':       'Your 2-min emotional anchor',
  'paywall.lock.recap.label':      'Weekly Recap',
  'paywall.lock.recap.sub':        'See how each week shaped you',
  'paywall.lock.milestone.label':  'Milestone Ceremonies',
  'paywall.lock.milestone.sub':    'Emotionally meaningful moments',
  'paywall.lock.profile.label':    'Emotional Profile',
  'paywall.lock.profile.sub':      'Your personalized journey',
  'paywall.lock.future.label':     'Future Self System',
  'paywall.lock.future.sub':       'Track your transformation',
  'paywall.lock.comeback.label':   'Comeback Psychology',
  'paywall.lock.comeback.sub':     'Return without judgment',
  'paywall.ben.0.label': '365-Day Reset Program',
  'paywall.ben.0.sub':   'A full year of guided daily transformation',
  'paywall.ben.1.label': 'Reset Ritual (Signature)',
  'paywall.ben.1.sub':   'Your 2-minute daily emotional anchor',
  'paywall.ben.2.label': 'Emotional Personalization',
  'paywall.ben.2.sub':   'The app adapts to what you need most',
  'paywall.ben.3.label': 'Daily Actions & Reflections',
  'paywall.ben.3.sub':   'Purposeful steps every day',
  'paywall.ben.4.label': 'Habit Architecture',
  'paywall.ben.4.sub':   'Build routines that actually last',
  'paywall.ben.5.label': 'Transformation Dashboard',
  'paywall.ben.5.sub':   'Watch your identity change over time',
  'paywall.ben.6.label': 'Focus & Detox Timers',
  'paywall.ben.6.sub':   'Reclaim your attention and stillness',
  'paywall.ben.7.label': 'Milestone Ceremonies',
  'paywall.ben.7.sub':   'Emotionally meaningful personal moments',
  'paywall.ben.8.label': 'Full Mindset Library',
  'paywall.ben.8.sub':   '48+ premium insights, unlocked over time',
  'paywall.ben.9.label': 'Comeback Support',
  'paywall.ben.9.sub':   'Never punished for difficult weeks',
  'paywall.identity.title': 'Small daily resets become identity over time.',
  'paywall.identity.sub':   'Built for consistency, not pressure.',
  'paywall.path.title':  'YOUR PATH FORWARD',
  'paywall.path.sub.future':  'See yourself 90 days from now.',
  'paywall.path.sub.default': "Imagine where you'll be after 30 resets.",
  'paywall.plan.title':         'CHOOSE YOUR PLAN',
  'paywall.included':           'EVERYTHING INCLUDED',
  'paywall.hero.eyebrow':       'YOUR FULL JOURNEY AWAITS',
  'paywall.manifesto.eyebrow':  'SMALL SHIFTS. LASTING CHANGE.',
  'paywall.manifesto.headline': 'Transformation is built quietly.',
  'paywall.manifesto.body':     "Most people wait for the right moment.\nReal change comes from returning daily.",
  'paywall.manifesto.b1':       'Clearer attention over time',
  'paywall.manifesto.b2':       'Stronger daily routines',
  'paywall.manifesto.b3':       'Less emotional noise',
  'paywall.manifesto.closing':  'Built gently. Repeated daily.',
  'paywall.what.changes':       'WHAT CHANGES',
  'paywall.unlocked':           'UNLOCKED WITH PREMIUM',

  // ── Focus Timer ─────────────────────────────────────────────────────────────
  'timer.focus.title':   'Focus Timer',
  'timer.detox.title':   'Digital Detox',
  'timer.idle':          'Ready when you are',
  'timer.focus.running': "Stay focused.",
  'timer.detox.running': "Stay present.",
  'timer.focus.done':    'Focus completed. You stayed in control.',
  'timer.detox.done':    'You stayed in control.',
  'timer.again':         'Start Again',

  // ── Progress — narrative card ─────────────────────────────────────────────────
  'progress.narrative.moments.pre':        '',
  'progress.narrative.moments.post.one':   ' moment, just yours.',
  'progress.narrative.moments.post.other': ' moments, just yours.',
  'progress.narrative.streak.pre':         '',
  'progress.narrative.streak.post.one':    ' day of continuity.',
  'progress.narrative.streak.post.other':  ' days of continuity.',

  // ── Progress — burnout recovery phases ───────────────────────────────────────
  'progress.phase.beginner.label':         'RETURN TO YOURSELF',
  'progress.phase.beginner.desc':          'Reclaim without guilt',
  'progress.phase.beginner.days':          'Days 1–7',
  'progress.phase.rebuilding.label':       'REBUILD TRUST',
  'progress.phase.rebuilding.desc':        'Small actions rebuild self-trust',
  'progress.phase.rebuilding.days':        'Days 8–21',
  'progress.phase.momentum.label':         'FIND YOUR RHYTHM',
  'progress.phase.momentum.desc':          'Consistency becomes identity',
  'progress.phase.momentum.days':          'Days 22–59',
  'progress.phase.identity.label':         'BECOME THE PERSON',
  'progress.phase.identity.desc':          'Identity shifts through repetition',
  'progress.phase.identity.days':          'Days 60–89',
  'progress.phase.transformation.label':   'FULL RECOVERY',
  'progress.phase.transformation.desc':    'You rebuilt yourself',
  'progress.phase.transformation.days':    'Days 90+',
  'progress.phase.comingNext':             'COMING NEXT',

  // ── Progress — journey group ──────────────────────────────────────────────────
  'progress.journey.here':                 'You are still here.',
  'progress.journey.returnsCount':         'Every return counts.',
  'progress.journey.nextMilestone':        'Next milestone — Day {{n}}',
  'progress.week.unwritten':               'The week is still unwritten.',
  'progress.week.allDays':                 'You showed up every day this week.',
  'progress.week.oneReturn':               'One quiet return this week.',
  'progress.week.nReturns':               'You came back {{n}} times this week.',

  // ── Progress — YOUR JOURNEY card ─────────────────────────────────────────────
  'progress.card.daysIn':                  'days in',
  'progress.card.resetsDone':              'resets done',

  // ── Progress — milestone chapter previews ─────────────────────────────────────
  'progress.chapter.week1':                'The first week. Something took hold.',
  'progress.chapter.week2':                'Two weeks. The rhythm is beginning to hold.',
  'progress.chapter.month1':               'One month. Returns became continuity.',

  // ── Progress screen ──────────────────────────────────────────────────────────
  'progress.ring.journeyStarted': 'journey started',
  'progress.ring.ofYourPath':     'of your path',
  'progress.ring.todayRhythm':    "Today's\nrhythm",
  'progress.ring.weekPattern':    "Week\npattern",
  'progress.ring.youreHere':      "Day {{day}} — you're here.",
  'progress.ring.daysAhead':      '{{days}} day{{s}} ahead',
  'progress.ring.tomorrowMilestone': 'Tomorrow you reach Day {{n}}.',
  'progress.ring.daysToMilestone':   '{{days}} days to your next milestone — Day {{n}}.',
  'progress.section.journey':        'YOUR JOURNEY',
  'progress.section.commitment':     'YOUR COMMITMENT',
  'progress.section.showingUp':      'SHOWING UP',
  'progress.section.storyNumbers':   'YOUR STORY IN NUMBERS',
  'progress.section.chapters':       'YOUR CHAPTERS',
  'progress.section.pathTitle':      'TRANSFORMATION PATH',
  'progress.section.yourStory':      'YOUR STORY',
  'progress.streak.choosingYou':     "quiet returns",
  'progress.streak.personalBest':    "You've never been better",
  'progress.streak.yourBest':        'Your best: {{n}} days',
  'progress.cal.title':              'The last 7 days you had',
  'progress.cal.sevenForSeven':      "Seven for seven. A full week.",
  'progress.cal.showedUpN':          'You showed up {{n}} times this week.',
  'progress.cal.daysShowedUp':       '{{n}} days of showing up. Keep the thread going.',
  'progress.cal.weekOpen':           'This week is still open. One reset changes it.',
  'progress.cal.returnedN':          'You returned {{n}} time{{s}}. That counts.',
  'progress.trend.label':            '14-day consistency',
  'progress.evidence.sectionTitle':  'EVIDENCE OF RETURNING',
  'progress.evidence.card1Title':    'You returned',
  'progress.evidence.card1Sub':      'moments completed',
  'progress.evidence.card2Title':    'Your rhythm',
  'progress.evidence.card2Sub':      'quiet returns',
  'progress.evidence.card3Title':    'Still here',
  'progress.evidence.card3Sub':      'times this week',
  'progress.evidence.card4Title':    'Strongest stretch',
  'progress.evidence.card4Sub':      'best return',
  'progress.stat.consecutiveDays':   'Days you returned',
  'progress.stat.choosingYourself':  'Quiet consistency.',
  'progress.stat.bestStreak':        'Longest return',
  'progress.stat.bestStreakSub':     'Your strongest rhythm.',
  'progress.stat.totalResets':       'Moments completed',
  'progress.stat.totalResetsSub':    'Small resets. Real evidence.',
  'progress.stat.thisWeek':          "This week's rhythm",
  'progress.stat.daysShowedUp':      'Times you showed up.',
  'progress.milestone.firstAwaits':  'Your first chapter is quietly ahead.',
  'progress.milestone.firstSub':     'A chapter begins at Day 3.',
  'progress.roadmap.7days':          '7 days',
  'progress.roadmap.1month':         '1 month',
  'progress.roadmap.2months':        '2 months',
  'progress.roadmap.3months':        '3 months',
  'progress.roadmap.6months':        '6 months',
  'progress.roadmap.momentum':       'Momentum',
  'progress.roadmap.clarity':        'Clarity',
  'progress.roadmap.identity':       'Identity',
  'progress.roadmap.rhythm':         'Rhythm',
  'progress.roadmap.transformation': 'Transformation',
  'progress.story.weeklyRecaps':     'Weekly Recaps',
  'progress.story.weeklySubEmpty':   'Your weekly journey, reflected.',
  'progress.story.weeklySubCount':   '{{n}} week{{s}} of your journey',
  'progress.story.reflection':       'Reflection Journal',
  'progress.story.reflectionSubEmpty': 'Your quiet emotional companion.',
  'progress.story.reflectionSubCount': '{{n}} reflection{{s}} written',

  // ── Progress v2 — new premium screen ─────────────────────────────────────────
  'progress2.hero.title':                  'Something in you keeps returning.',
  'progress2.hero.subtitle':               'Quietly, something shifted.',
  'progress2.hero.variation.0':            'You continued, even on lighter days.',
  'progress2.hero.variation.1':            'Your return has become gentler over time.',
  'progress2.hero.variation.2':            'Each visit left a small mark.',
  'progress2.hero.variation.3':            'You slowed down without disappearing.',
  'progress2.hero.variation.4':            'Your rhythm began to reappear.',
  'progress2.hero.variation.5':            'These returns are becoming more yours.',
  'progress2.rhythm.title':               'Weekly rhythm',
  'progress2.rhythm.label':               'accumulated presence',
  'progress2.rhythm.description':         'Based on the days you returned, wrote something, or completed a reset.',
  'progress2.rhythm.emptyTitle':          'Your presence is still forming.',
  'progress2.rhythm.emptyDescription':    'Come back for a few days and this area will begin to reflect your patterns.',
  'progress2.rhythm.returnMain':          'You came back.',
  'progress2.rhythm.returnLabel':         'presence recorded',
  'progress2.rhythm.tagline':             'Each return leaves a mark.',
  'progress2.signals.title':              'Real signs',
  'progress2.signals.return.title':       'You came back',
  'progress2.signals.return.text':        'You kept coming back.',
  'progress2.signals.presence.title':     'More presence',
  'progress2.signals.presence.text':      'You slowed down.',
  'progress2.signals.stability.title':    'A quiet consistency',
  'progress2.signals.stability.text':     'Consistency began to reappear.',
  'progress2.patterns.title':             'Patterns noticed',
  'progress2.patterns.empty':             'Keep recording small moments. Your patterns will appear over time.',
  'progress2.patterns.1':                 'You tend to return when the reset feels light.',
  'progress2.patterns.2':                 'Your progress appears more in repetition than in intensity.',
  'progress2.patterns.3':                 'Simple days have been helping you stay.',
  'progress2.patterns.4':                 'Small pauses seem to reduce the weight of the day.',
  'progress2.patterns.5':                 'You stay more present when you slow down.',
  'progress2.patterns.6':                 'Your return happens more easily without pressure.',
  'progress2.patterns.7':                 'Consistency begins to appear in small movements.',
  'progress2.patterns.8':                 'You seem to respond better to gentleness than to demand.',
  'progress2.patterns.9':                 'You move forward more easily when the day does not require perfection.',
  'progress2.patterns.10':                'You are creating space before reacting.',
  'progress2.timeline.title':             'Rebuilding line',
  'progress2.timeline.day1.title':        'You began.',
  'progress2.timeline.day1':              'Something shifted enough to bring you here.',
  'progress2.timeline.day7.title':        'First signals.',
  'progress2.timeline.day7':              'A rhythm started to emerge.',
  'progress2.timeline.day14.title':       'Less effort.',
  'progress2.timeline.day14':             'Coming back started to feel more natural.',
  'progress2.timeline.day30.title':       'A foundation.',
  'progress2.timeline.day30':             'You built something that continues between the days.',
  'progress2.timeline.day60.title':       'More stability.',
  'progress2.timeline.day60':             'Your progress stopped depending on perfect days.',
  'progress2.timeline.day90.title':       'Presence built.',
  'progress2.timeline.day90':             'You created a steadier relationship with yourself.',
  'progress2.summary.title':              'Signs Along the Way',
  'progress2.summary.resets':             'returns noticed',
  'progress2.summary.journal':            'moments recorded',
  'progress2.summary.returnDays':         'today\'s presence',
  'progress2.summary.weeks':              'best streak',
  'progress2.summary.resets.one':         'return noticed',
  'progress2.summary.journal.one':        'moment recorded',
  'progress2.summary.returnDays.one':     'today\'s presence',
  'progress2.milestone.7':               'Your return started creating rhythm.',
  'progress2.milestone.14':              'You started returning without forcing.',
  'progress2.milestone.30':              'Your rhythm began to trust you.',
  'progress2.milestone.60':              'Returning started feeling natural.',
  'progress2.milestone.90':              'You are no longer starting over.',

  // ── Private space card ────────────────────────────────────────────────────────
  'progress2.space.eyebrow':             'YOUR PRIVATE SPACE',
  'progress2.space.title':               'A quiet place to release what feels heavy.',
  'progress2.space.placeholder':         'You can leave this here.',
  'progress2.space.saved':               'Saved.',
  'progress2.space.action.keep':         'Keep this',
  'progress2.space.action.release':      'Let it go',
  'progress2.space.feedback.kept':       'Your moment has been kept.',
  'progress2.space.feedback.return':     'Come back whenever you\'d like.',
  'progress2.space.feedback.released':   "You don't need to carry this anymore.",
  'progress2.space.prompt.0':            'What drained your energy today?',
  'progress2.space.prompt.1':            "What don't you want to carry into tomorrow?",
  'progress2.space.prompt.2':            'What is your mind trying to process?',
  'progress2.space.prompt.3':            'What moment brought a little calm today?',
  'progress2.space.prompt.4':            'What would you like to let go of?',
  'progress2.space.prompt.5':            'What is your exhaustion trying to tell you?',
  'progress2.space.prompt.6':            'What did you miss today?',
  'progress2.space.prompt.7':            'What became too heavy to hold in silence?',
  'progress2.space.prompt.8':            'What deserves more gentleness inside you?',
  'progress2.space.prompt.9':            'What are you avoiding feeling?',
  'progress2.space.prompt.10':           'What part of you needs more patience today?',
  'progress2.space.prompt.11':           'What did you leave unsaid today?',
  'progress2.space.prompt.12':           'What is making it hard to rest?',
  'progress2.space.prompt.13':           'What thought stayed with you throughout the day?',

  // ── Weekly recap card ─────────────────────────────────────────────────────────
  'progress2.weekrecap.eyebrow':         'WEEK IN REVIEW',
  'progress2.weekrecap.subtitle':        'A calm look at your week.',
  'progress2.weekrecap.seeAll':          'See history',
  'progress2.weekrecap.n0':              'This week is still taking shape.',
  'progress2.weekrecap.n1':              'You returned once. That already counts.',
  'progress2.weekrecap.n2':              'Two returns this week. A rhythm is beginning.',
  'progress2.weekrecap.n3':              'Three returns. Something is starting to settle.',
  'progress2.weekrecap.n4':              'You showed up four times this week.',
  'progress2.weekrecap.n5':              'Five returns. Your routine is finding its shape.',
  'progress2.weekrecap.n6':              'Six days. Quiet consistency that rebuilds.',
  'progress2.weekrecap.n7':              'Seven days. A full week of presence.',
  'progress2.weekrecap.streakN':         '{{n}} days in a row. You keep returning.',

  // ── Quiet reflections card ────────────────────────────────────────────────────
  'progress2.quietref.eyebrow':          'QUIET REFLECTIONS',
  'progress2.quietref.subtitle':         'Your emotional records.',
  'progress2.quietref.seeAll':           'See all',
  'progress2.quietref.empty':            'Your reflections will appear here.',
  'progress2.quietref.today':            'Today',
  'progress2.quietref.yesterday':        'Yesterday',
  'progress2.quietref.daysAgo':          '{{n}} days ago',
  'progress2.quietref.countOne':         'Your moments are kept here.',
  'progress2.quietref.countMany':        'Your moments are kept here.',
  'progress2.history.weekrecap.title':   'Weekly Recap',
  'progress2.history.weekrecap.sub.many': 'You came back more times than you noticed.',
  'progress2.history.weekrecap.sub.some': 'The lighter days counted too.',

  // ── Days & months ────────────────────────────────────────────────────────────
  'day.sun': 'Sun', 'day.mon': 'Mon', 'day.tue': 'Tue', 'day.wed': 'Wed',
  'day.thu': 'Thu', 'day.fri': 'Fri', 'day.sat': 'Sat',
  'month.jan': 'Jan', 'month.feb': 'Feb', 'month.mar': 'Mar', 'month.apr': 'Apr',
  'month.may': 'May', 'month.jun': 'Jun', 'month.jul': 'Jul', 'month.aug': 'Aug',
  'month.sep': 'Sep', 'month.oct': 'Oct', 'month.nov': 'Nov', 'month.dec': 'Dec',

  // ── Profile ──────────────────────────────────────────────────────────────────
  'profile.section.transformation': 'MY TRANSFORMATION',
  'profile.section.journey':        'MY JOURNEY',
  'profile.section.intentions':     'MY INTENTIONS',
  'profile.streak.daysInRow':       'quiet returns',
  'profile.streak.personalBest':    'Longest rhythm',
  'profile.stat.resetsDone':        'resets done',
  'profile.stat.bestStreak':        'longest rhythm',
  'profile.stat.firstReturn':       'first return',
  'profile.stat.thisWeek':          'this week',
  'profile.milestone.dayReached':   'Day {{n}} reached',
  'profile.milestone.unlocked':     'Milestone unlocked',
  'profile.milestone.firstReset':   'Day 1 — First reset',
  'profile.milestone.beginToday':   "One reset starts the journey.",
  'profile.milestone.dayAhead':     'Day {{n}} ahead',
  'profile.milestone.youReThere':   "You're there. Complete today's reset.",
  'profile.milestone.oneDayAway':   'One day away. Keep going.',
  'profile.milestone.daysAway':     '{{n}} days away.',
  'profile.transform.zero.title':   'First Step',
  'profile.transform.zero.sub':     'Everything begins quietly.',
  'profile.greet.hi':               'Hi, {{name}}.',
  'profile.greet.becoming':         'Your moment.',
  'profile.greet.memberSince':      'Here since {{month}} {{year}}',
  'profile.greet.dayOne':           'Day 1 of your reset journey.',
  'profile.greet.namePlaceholder':  'Your name',
  'profile.footer.p1': 'Every reset changes the path.',
  'profile.footer.p2': 'Small consistency becomes identity.',
  'profile.footer.p3': 'Momentum begins quietly.',
  'profile.footer.p4': 'Growth is built softly.',
  'profile.footer.p5': 'Quiet progress still counts.',

  // ── Return experience ────────────────────────────────────────────────────────
  'return.heading':       "You're back.",
  'return.30plus.body':   "You were away for a while.\n\nNothing here kept score.\nNothing here needs an explanation.\n\nYou showed up.\nThat's the whole thing.",
  'return.30plus.extra':  "Long breaks aren't failure.\nThey're part of it.",
  'return.7plus.body':    "You were away for a bit.\n\nNothing here kept score.\nYou don't owe an explanation.\n\nYou showed up.\nThat's enough.",
  'return.3plus.body':    "No catching up.\nJust today.",
  'return.cta':           'Begin today',

  // ── Welcome back experience ───────────────────────────────────────────────────
  'wb.normal.0':      'Welcome back.',
  'wb.normal.1':      "Let's begin gently.",
  'wb.normal.2':      'A small pause for yourself.',
  'wb.normal.3':      'One quiet moment.',
  'wb.normal.4':      "You're here.",
  'wb.returning.0':   'You can always begin again.',
  'wb.returning.1':   'No pressure. Just today.',
  'wb.returning.2':   "There's nothing to catch up on.",
  'wb.returning.3':   'Welcome back to yourself.',
  'wb.returning.4':   'Still here. Still yours.',
  'wb.active.0':      'Quiet progress.',
  'wb.active.1':      "You've been showing up for yourself.",
  'wb.active.2':      'Small steps still matter.',
  'wb.active.3':      'Consistency can be soft.',
  'wb.active.4':      'A calmer rhythm.',
  'wb.late_night.0':  'A quiet moment before rest.',
  'wb.late_night.1':  "You're still here.",
  'wb.late_night.2':  'This is enough.',
  'wb.late_night.3':  'Let the day settle.',
  'wb.late_night.4':  'Stillness is also doing something.',

  ...psEn,
};

const es: TranslationMap = {
  // ── Tabs ────────────────────────────────────────────────────────────────────
  'tabs.today':    'Hoy',
  'tabs.habits':   'Hábitos',
  'tabs.progress': 'Progreso',
  'tabs.mindset':  'Mentalidad',
  'tabs.profile':  'Perfil',

  // ── Today ───────────────────────────────────────────────────────────────────
  'greeting.morning':   'Buenos días',
  'greeting.afternoon': 'Buenas tardes',
  'greeting.evening':   'Buenas noches',
  'today.headline':     'Retoma el control\nde tu vida.',
  'today.subheadline':  'Una acción hoy puede cambiar tu día.',
  'today.checklist.title':          'LISTA DIARIA',
  'today.checklist.morning':        'Rutina Matutina',
  'today.checklist.action':         'Acción de Hoy',
  'today.checklist.deepwork':       'Trabajo Profundo',
  'today.checklist.nodistractions': 'Sin Distracciones',
  'today.checklist.evening':        'Reflexión Nocturna',
  'today.complete':     'Completar el Reset de Hoy',
  'today.focus':        'Temporizador de enfoque',
  'today.focus.short':  'Enfoque',
  'today.detox':        'Detox digital',
  'future.self.eyebrow':    'MÁS ADELANTE',
  'future.self.question':   'UNA PREGUNTA PARA TI',
  'future.self.prompt.sub': 'Tómate un momento. No hay respuesta correcta.',
  'today.card.action':  'Acción de Hoy',
  'today.card.why':     'Por qué importa',
  'today.card.reflect': 'Reflexión',
  'today.badge.today':  'HOY',
  'today.day':          'Día {{day}}',
  'today.done.title':   'Reset completado.',
  'today.done.sub':     'Hoy estuviste presente.',
  'today.done.day':     'Día {{day}} completado',
  'today.locked.title':  'Día {{day}} bloqueado',
  'today.locked.sub':   'Desbloquea tu viaje completo de 365 días.',
  'today.locked.cta':   'Desbloquear acceso completo →',

  // ── Habits ──────────────────────────────────────────────────────────────────
  'habits.eyebrow':      'HOY',
  'habits.title':        'Hábitos',
  'habits.subtitle':     'Construye tu sistema diario',
  'habits.pct.label':    'completado hoy',
  'habits.section':      'HÁBITOS DIARIOS',
  'habit.morning':        'Rutina Matutina',
  'habit.workout':        'Ejercicio',
  'habit.deepwork':       'Trabajo Profundo',
  'habit.read':           'Leer 20 Páginas',
  'habit.water':          'Beber Agua',
  'habit.nodistractions': 'Sin Distracciones',
  'habit.sleep':          'Dormir Más Temprano',
  'habit.plan':           'Planificar el Mañana',
  'habit.gratitude':      'Gratitud',
  'habit.detox':          'Detox Digital',

  // ── Progress ────────────────────────────────────────────────────────────────
  'progress.eyebrow':        'TU VIAJE',
  'progress.title':          'Progreso',
  'progress.subtitle':       'Tu consistencia, visualizada',
  'progress.card.label':     'Progreso del Viaje',
  'progress.of365':          'de 365 días',
  'progress.today':          'Hoy',
  'progress.week':           'Esta semana',
  'stat.streak':             'Racha',
  'stat.best':               'Mejor',
  'stat.done':               'Hechos',
  'stat.weekly':             'Semanal',
  'stat.monthly':            'Mensual',
  'stat.day':                'Día',
  'progress.journey.title':  'Viaje de 365 Días',
  'progress.journey.day':    'Día {{day}} de 365',
  'progress.journey.rem':    '{{days}} días restantes',

  // ── Mindset ─────────────────────────────────────────────────────────────────
  'mindset.eyebrow':    'MENTALIDAD',
  'mindset.title':      'Mentalidad',
  'mindset.subtitle.one':   '{{count}} insight desbloqueado',
  'mindset.subtitle.other': '{{count}} insights desbloqueados',
  'mindset.all':           'Todo',
  'mindset.today':         'HOY',
  'mindset.filter.today':  'Hoy',
  'mindset.header.daily':  'Información diaria.',
  'mindset.header.count':  '{{n}} insight{{s}} desbloqueados.',
  'mindset.locked':     'Desbloquear con Premium',
  'mindset.empty':      'Completa tu primer Daily Reset\npara desbloquear los insights de Mentalidad.',
  'mindset.min':        '{{n}} min',
  'mindset.minread':    '{{n}} min de lectura',
  'mindset.pro':        'PRO',
  'cat.focus':          'Enfoque',
  'cat.discipline':     'Ritmo',
  'cat.confidence':     'Autoconfianza',
  'cat.productivity':   'Claridad',
  'cat.emotional':      'reset emocional',
  'cat.detox':          'Detox Digital',
  'cat.focus.label':        'Enfoque',
  'cat.discipline.label':   'Ritmo',
  'cat.confidence.label':   'Autoconfianza',
  'cat.productivity.label': 'Claridad',
  'cat.emotional.label':    'Reset Emocional',
  'cat.detox.label':        'Detox Digital',
  'cat.calm.label':         'Calma',
  'cat.courage.label':      'Coraje',
  'cat.rest.label':         'Descanso',
  'cat.momentum.label':     'Impulso',

  // ── Profile ─────────────────────────────────────────────────────────────────
  'profile.goals.title':       'TUS OBJETIVOS',
  'profile.settings.title':    'AJUSTES',
  'profile.name.placeholder':  'Toca para poner tu nombre',
  'profile.premium':           'PREMIUM',
  'profile.upgrade':           'Actualizar a Premium',
  'profile.version':           'Daily Reset v1.0.0',
  'profile.row.notification':  'Hora de Notificación',
  'profile.row.language':      'Idioma',
  'profile.row.restore':       'Restaurar Compra',
  'profile.row.privacy':       'Política de Privacidad',
  'profile.row.terms':         'Términos de Servicio',
  'profile.row.reset':         'Borrar mis datos',
  'profile.restore.title':     'Restaurar Compra',
  'profile.restore.msg':       'No se encontró ninguna compra anterior.',
  'profile.reset.title':       'Borrar mis datos',
  'profile.reset.msg':         'Tu progreso local se borrará. Esto no se puede deshacer.',
  'profile.reset.cancel':      'Cancelar',
  'profile.reset.confirm':     'Borrar',
  'profile.modal.privacy':     'Política de Privacidad',
  'profile.modal.terms':       'Términos de Servicio',
  'profile.modal.journey.title': 'Tu Viaje Emocional',
  'profile.modal.journey.sub':   'La app adapta su tono y contenido para apoyar lo que más necesitas.',
  'profile.modal.eyebrow':     'DAILY RESET APP',
  'profile.modal.date':        'Última actualización: Mayo 2026',
  'profile.modal.privacy.footer': 'Al usar Daily Reset, aceptas esta Política de Privacidad.',
  'profile.modal.terms.footer':   'Al usar Daily Reset, aceptas estos Términos de Servicio.',
  'notif.morning':   'Mañana',
  'notif.afternoon': 'Tarde',
  'notif.evening':   'Noche',
  'notif.settings.eyebrow':       'AJUSTES',
  'notif.settings.title':         'Recordatorio diario',
  'notif.settings.sub':           'Elige el mejor momento para tu reset.',
  'notif.period.label':           'PERÍODO',
  'notif.period.morning.label':   'Mañana',
  'notif.period.morning.sub':     'Comienza tu día con intención',
  'notif.period.afternoon.label': 'Tarde',
  'notif.period.afternoon.sub':   'Un momento para reenfocarte a mitad del día',
  'notif.period.evening.label':   'Noche',
  'notif.period.evening.sub':     'Termina tu día con consciencia',
  'notif.hour.label':             'HORA DE NOTIFICACIÓN',
  'notif.preview.text':           'Recordatorio todos los días a las',
  'notif.saved':                  'Recordatorio actualizado con éxito.',
  'notif.saving':                 'Guardando...',
  'notif.save':                   'Guardar recordatorio',
  'lang.en': 'English',
  'lang.es': 'Spanish',
  'lang.chooseLang':      'IDIOMA',
  'lang.chooseLangTitle': 'Elige tu idioma',
  'lang.eyebrow':         'ELIGE TU ESPACIO',
  'lang.sub':             'Esta experiencia se adapta a tu idioma y a tu ritmo emocional.',
  'common.continue':      'Continuar',

  // ── Onboarding ──────────────────────────────────────────────────────────────
  'onboard.skip':        'Omitir',
  'onboard.s1.headline': 'Tu espacio diario\npara volver a ti.',
  'onboard.s1.sub':      'Daily Reset te ayuda a recuperar tu ritmo y avanzar con calma — una pequeña acción al día.',
  'onboard.s1.cta':      'Comenzar mi Reset',
  'onboard.s2.headline': 'Una acción simple.\nCada día.',
  'onboard.s2.sub':      'Cada día, una acción sencilla pensada para donde estás ahora. No para donde crees que deberías estar.',
  'onboard.s2.cta':      'Continuar',
  'onboard.s3.headline': 'Pequeños pasos.\nProgreso real.',
  'onboard.s3.sub':      'No necesitas cambiarlo todo. Solo aparece — también en los días difíciles.',
  'onboard.s3.cta':      'Empezar Hoy',

  // ── Goal Selection ──────────────────────────────────────────────────────────
  'goals.step':          'PASO 1 DE 2',
  'goals.title':         '¿Qué quieres mejorar\nprimero?',
  'goals.subtitle':      'Selecciona todas las que apliquen',
  'goals.selected':      '{{n}} seleccionada(s)',
  'goals.cta':           'Continuar',
  'goals.alert.title':   'Selecciona al menos un objetivo',
  'goals.alert.msg':     'Elige en qué quieres trabajar primero.',
  'goal.procrastination': 'Dejar de procrastinar',
  'goal.discipline':      'Construir ritmo',
  'goal.distractions':    'Reducir distracciones',
  'goal.routine':         'Crear una rutina',
  'goal.control':         'Sentirme en control',

  // ── Notification Setup ──────────────────────────────────────────────────────
  'notif.step':              'PASO 2 DE 2',
  'notif.title':             '¿Cuándo enviamos\ntu reset diario?',
  'notif.subtitle':          'Te recordaremos a la hora perfecta para tu rutina.',
  'notif.morning.sublabel':  '7:00 AM • Empieza el día con intención.',
  'notif.afternoon.sublabel':'12:00 PM • Haz una pausa a mitad del día',
  'notif.evening.sublabel':  '8:00 PM • Cierra el día con intención',
  'notif.bridge':            'La constancia empieza con la regularidad.',
  'notif.cta':               'Comenzar mi Reset',

  // ── Paywall ─────────────────────────────────────────────────────────────────
  'paywall.title':       'Desbloquea tu Viaje\nCompleto de Reset',
  'paywall.sub':         'Accede a 365 resets diarios, herramientas de enfoque, seguimiento de hábitos e insights de progreso para reconstruir la disciplina un día a la vez.',
  'paywall.benefits.title': 'QUÉ INCLUYE',
  'benefit.0': '365 Resets Diarios',
  'benefit.1': 'Acciones y guía diaria',
  'benefit.2': 'Seguimiento de hábitos',
  'benefit.3': 'Temporizador de enfoque',
  'benefit.4': 'Panel de progreso',
  'benefit.5': 'Biblioteca de mentalidad',
  'benefit.6': 'Seguimiento de racha',
  'benefit.7': 'Recordatorios diarios',
  'plan.annual.label':  'Anual',
  'plan.annual.per':    '$2.50 / mes',
  'plan.annual.badge':  'MEJOR VALOR',
  'plan.annual.saving': 'Ahorra 50%',
  'plan.monthly.label': 'Mensual',
  'plan.monthly.per':   'por mes',
  'paywall.disclaimer': 'Cancela en cualquier momento. Pago seguro vía App Store / Google Play.',
  'paywall.cta':        'Comenzar mi Viaje de Reset',
  'paywall.skip':       'Continuar con acceso gratuito limitado',

  // ── Focus Timer ─────────────────────────────────────────────────────────────
  'timer.focus.title':   'Temporizador de Enfoque',
  'timer.detox.title':   'Detox Digital',
  'timer.idle':          'Listo cuando estés',
  'timer.focus.running': 'Mantén el enfoque.',
  'timer.detox.running': 'Permanece presente.',
  'timer.focus.done':    'Enfoque completado. Te mantuviste en control.',
  'timer.detox.done':    'Te mantuviste en control.',
  'timer.again':         'Empezar de Nuevo',

  // ── Habits (new keys) ────────────────────────────────────────────────────────
  'habits.alldone':        'Todos los hábitos completados.',
  'habits.pct.completed':  'completado hoy',

  // ── Today remaining ──────────────────────────────────────────────────────────
  'today.ritual.name':              'Ritual de Reset',
  'today.ritual.sub':               'Un momento tranquilo para reiniciarte.',
  'today.reflect.eyebrow':          'UN MOMENTO PARA REFLEXIONAR',
  'today.reflect.done':             '✓ Has dejado algo aquí.',
  'today.messages.welcomeBack':     'BIENVENIDO DE VUELTA',
  'ceremony.whatsAhead':            'LO QUE VIENE',
  'today.tomorrow.label':           'MAÑANA',
  'today.tomorrow.day2begins':      'Mañana comienza el Día 2.',
  'today.tomorrow.dayArrives':      'El Día {{day}} llega mañana.',
  'today.tomorrow.eyebrow':         'EL RESET DE MAÑANA',
  'today.tomorrow.continues.top':   'TU VIAJE CONTINÚA',
  'today.tomorrow.continues.msg':   'Descansa. Reflexiona. Mañana el espacio sigue aquí.',
  'today.tomorrow.continues.cta':   'Tu racha continúa mañana.',

  // ── Ritual — subtítulo dinámico (estado + rotación genérica) ─────────────────
  'today.ritual.sub.racing':      'Dos minutos para desacelerar.',
  'today.ritual.sub.tired':       'Un espacio para respirar.',
  'today.ritual.sub.overwhelmed': 'Menos peso por unos minutos.',
  'today.ritual.sub.unclear':     'Un ejercicio para aclarar la mente.',
  'today.ritual.sub.drained':     'Sin presión. Solo presencia.',
  'today.ritual.sub.balanced':    'Un momento para notar lo que funciona.',
  'today.ritual.sub.g0':          'Un momento creado para hoy.',
  'today.ritual.sub.g1':          'Tu reset está listo.',
  'today.ritual.sub.g2':          'Algo simple para hacer ahora.',
  'today.ritual.sub.g3':          'Un pequeño regreso a ti mismo.',
  'today.ritual.sub.g4':          'Tu próximo paso está aquí.',

  // ── Mañana — mensajes por etapa ──────────────────────────────────────────────
  'today.tomorrow.s1.0': 'No necesitas hacer más. Solo volver.',
  'today.tomorrow.s1.1': 'El camino empieza exactamente aquí.',
  'today.tomorrow.s1.2': 'Cada regreso cuenta, incluso los silenciosos.',
  'today.tomorrow.s1.3': 'Hay algo esperándote mañana.',
  'today.tomorrow.s1.4': 'Un paso a la vez ya es suficiente.',
  'today.tomorrow.s2.0': 'A veces la claridad llega después del descanso.',
  'today.tomorrow.s2.1': 'El ritmo está empezando a revelarse.',
  'today.tomorrow.s2.2': 'No todo avance hace ruido.',
  'today.tomorrow.s2.3': 'Mañana también es tuyo.',
  'today.tomorrow.s2.4': 'Un pequeño detalle puede cambiar el tono del día.',
  'today.tomorrow.s3.0': 'Algunas respuestas llegan cuando la prisa se va.',
  'today.tomorrow.s3.1': 'Lo que construiste aquí no desaparece.',
  'today.tomorrow.s3.2': 'Algo quieto se está asentando.',
  'today.tomorrow.s3.3': 'Mañana notarás algo que hoy todavía no está claro.',
  'today.tomorrow.s3.4': 'Siempre hay más por descubrir, sin prisa.',
  'today.tomorrow.s4.0': 'El silencio también tiene peso. Y tú lo sabes.',
  'today.tomorrow.s4.1': 'Cada regreso es una elección hecha de nuevo.',
  'today.tomorrow.s4.2': 'Lo que parece pequeño es a menudo lo que permanece.',
  'today.tomorrow.s4.3': 'Hay una continuidad aquí que solo tú puedes ver.',
  'today.tomorrow.s4.4': 'Mañana no necesita probar nada. Solo estar.',

  // ── Today — categorías ────────────────────────────────────────────────────────
  'today.cat.Focus':      'Enfoque',
  'today.cat.Rhythm':     'Ritmo',
  'today.cat.Discipline': 'Disciplina',
  'today.cat.Courage':    'Coraje',
  'today.cat.Momentum':   'Impulso',
  'today.cat.Calm':       'Calma',
  'today.cat.Clarity':    'Claridad',
  'today.cat.Rest':       'Descanso',

  // ── Reflection history ────────────────────────────────────────────────────────
  'reflection.header.eyebrow':      'TU VIAJE',
  'reflection.header.title':        'Diario de Reflexión',
  'reflection.header.sub.empty':    'Tu espacio de reflexión te espera.',
  'reflection.header.sub.count':    '{{n}} reflexión{{s}} escrita{{s}}',
  'reflection.action.edit':         'Editar reflexión',
  'reflection.action.delete':       'Eliminar reflexión',
  'reflection.action.readmore':     'Leer más',
  'reflection.dayBadge':            'Día {{n}}',
  'reflection.edit.title':          'Editar Reflexión',
  'reflection.edit.save':           'Guardar',
  'reflection.edit.cancel':         'Cancelar',
  'reflection.edit.privacy':        'Tus reflexiones son privadas.',
  'reflection.delete.title':        '¿Eliminar esta reflexión?',
  'reflection.delete.sub':          'Esta acción no se puede deshacer.',
  'reflection.delete.cancel':       'Cancelar',
  'reflection.delete.confirm':      'Eliminar',
  'reflection.empty.noyet':         'Sin reflexiones aún.',
  'reflection.empty.waiting':       'Tu espacio de reflexión te espera.',
  'reflection.empty.appear':        'Tus reflexiones aparecerán aquí a medida que las escribas.',
  'reflection.empty.invite':        'Después de completar un reset diario, serás invitado a escribir una breve reflexión.',
  'reflection.bottom.quote':        '"Cada reflexión es un pequeño acto de autoconciencia."',

  // ── Weekly recap history ──────────────────────────────────────────────────────
  'recap.history.eyebrow':          'TU HISTORIA',
  'recap.history.title':            'Resúmenes semanales',
  'recap.history.sub.nodata':       'Tu primer resumen llega después de una semana completa.',
  'recap.history.sub.building':     'Los resúmenes aparecen a medida que construyes tu viaje.',
  'recap.history.sub.count':        '{{n}} semana{{s}} de tu viaje',
  'recap.history.empty.title':      'Tu historia semanal aún se está revelando.',
  'recap.history.empty.text':       'A medida que completes más resets, tus reflexiones\ny patrones aparecerán aquí.',
  'recap.history.current.eyebrow':  'ESTA SEMANA · EN PROGRESO',
  'recap.history.coming.title':     'Las semanas anteriores aparecerán aquí.',
  'recap.history.coming.sub':       'Tu primer resumen semanal completo se desbloquea después de 7 días de uso.',
  'recap.history.sum.weeks':        'semanas registradas',
  'recap.history.sum.resets':       'resets totales',
  'recap.history.sum.streak':       'ritmo más largo',
  'recap.history.quote':            '"Cada semana es una página de la historia que estás escribiendo."',
  'recap.card.streakLabel':         'ritmo',
  'recap.card.habitsLabel':         '% hábitos',
  'recap.insight.sevenForSeven':    'Siete de siete. Una semana notable.',
  'recap.insight.showedUpN':        'Apareciste {{n}} veces esta semana.',
  'recap.insight.nResets':          '{{n}} resets esta semana. Un ritmo se está formando.',
  'recap.insight.twoReturns':       'Hubo regresos esta semana. El espacio sigue aquí.',
  'recap.insight.cameBackStreak':   'Volviste, una vez más.',
  'recap.insight.cameBack':         'Volviste. Una vez es suficiente para importar.',
  'recap.insight.stillYours':       'Esta semana todavía es tuya para moldear.',
  'recap.subinsight.remarkable':    'La consistencia como esta cambia las cosas con el tiempo.',
  'recap.subinsight.strong':        'La consistencia silenciosa está construyendo algo real.',
  'recap.subinsight.streakHolding': 'Tu ritmo continúa.',
  'recap.subinsight.repetition':    'La pequeña repetición se convierte en identidad.',
  'recap.subinsight.eachReset':     'Cada reset cuenta, sin importar cómo haya sido la semana.',

  // ── Mindset remaining ─────────────────────────────────────────────────────────
  'mindset.empty.today.title':     'El insight de hoy te espera.',
  'mindset.empty.lib.title':       'Tu biblioteca está creciendo.',
  'mindset.empty.today.sub':       'Completa tu primer Daily Reset para desbloquear el insight de mentalidad de hoy.',
  'mindset.empty.lib.sub':         'Los insights se desbloquean a medida que avanzas.',
  'mindset.library.text':          'Tu biblioteca de mentalidad.',
  'mindset.library.textCount':     '{{n}} insight{{s}} en tu colección.',
  'mindset.library.sub1':          'Nuevos insights se desbloquean a medida que avanzas.',
  'mindset.library.sub2':          'La biblioteca se expande cada día con tu práctica.',

  // ── Profile remaining ──────────────────────────────────────────────────────────
  'profile.journey.eyebrow':       'VIAJE EMOCIONAL',
  'profile.journey.change':        'Cambiar',
  'profile.journey.choose':        'Elegir',
  'profile.journey.fallback':      'Tu Viaje',

  // ── Day / Month names ──────────────────────────────────────────────────────────
  'dayname.sunday': 'Domingo', 'dayname.monday': 'Lunes', 'dayname.tuesday': 'Martes',
  'dayname.wednesday': 'Miércoles', 'dayname.thursday': 'Jueves',
  'dayname.friday': 'Viernes', 'dayname.saturday': 'Sábado',

  // ── Emotional Onboarding ─────────────────────────────────────────────────────
  'emotional.skip':          'Omitir',
  'emotional.cta.continue':  'Continuar',
  'emotional.cta.seeReset':  'Ver mi Reset',
  'emotional.step':          '{{i}} DE {{total}}',
  'emotional.q1.question':   '¿Qué se siente más pesado últimamente?',
  'emotional.q1.micro':      'No hay respuesta correcta aquí.',
  'emotional.q1.opt1':       'Sobrecarga mental',
  'emotional.q1.opt2':       'Ansiedad',
  'emotional.q1.opt3':       'Agotamiento emocional',
  'emotional.q1.opt4':       'Falta de ritmo',
  'emotional.q1.opt5':       'Dificultad para continuar',
  'emotional.q1.opt6':       'Falta de enfoque',
  'emotional.q1.opt7':       'Sentirme desconectado',
  'emotional.q2.question':   '¿Qué sientes que te ha estado faltando?',
  'emotional.q2.micro':      'Selecciona lo que más resuene contigo.',
  'emotional.q2.opt1':       'Calma',
  'emotional.q2.opt2':       'Claridad',
  'emotional.q2.opt3':       'Confianza',
  'emotional.q2.opt4':       'Consistencia',
  'emotional.q2.opt5':       'Presencia',
  'emotional.q2.opt6':       'Equilibrio emocional',
  'emotional.q3.question':   '¿Cómo te gustaría que se sintiera tu vida otra vez?',
  'emotional.q3.micro':      'Aquí es donde volveremos juntos.',
  'emotional.q3.opt1':       'Más ligera',
  'emotional.q3.opt2':       'Más tranquila',
  'emotional.q3.opt3':       'Más lenta',
  'emotional.q3.opt4':       'Más clara',
  'emotional.q3.opt5':       'Más arraigada',
  'emotional.q3.opt6':       'Más ordenada emocionalmente',
  'emotional.q4.question':   '¿Qué te aleja de ti mismo con más frecuencia?',
  'emotional.q4.micro':      'Sin juicios aquí.',
  'emotional.q4.opt1':       'Demasiadas pantallas',
  'emotional.q4.opt2':       'Sobrecarga laboral',
  'emotional.q4.opt3':       'Ansiedad',
  'emotional.q4.opt4':       'Pensamientos en exceso',
  'emotional.q4.opt5':       'Fatiga emocional',
  'emotional.q4.opt6':       'Falta de rutina',

  // ── Weekly Recap ─────────────────────────────────────────────────────────────
  'recap.loading':            'Preparando tu resumen...',
  'recap.eyebrow':            'RESUMEN SEMANAL',
  'recap.section.focus':      'ESTA SEMANA EN ENFOQUE',
  'recap.section.highlights': 'MOMENTOS DE LA SEMANA',
  'recap.section.habits':     'RITMO DE HÁBITOS',
  'recap.section.reflection': 'UNA PREGUNTA PARA TI',
  'recap.cel.outstanding':    'Sobresaliente',
  'recap.cel.strong':         'Semana fuerte',
  'recap.cel.good':           'Buena semana',
  'recap.habit.automatic':    'Tus hábitos se están volviendo automáticos.',
  'recap.habit.growing':      'La consistencia está creciendo.',
  'recap.habit.small':        'Pequeños pasos construyen el camino.',
  'recap.cta.ready':          'Listo para la próxima semana',
  'recap.cta.close':          'Cerrar',
  'recap.week.label':         'Semana',

  // ── Paywall ──────────────────────────────────────────────────────────────────
  'paywall.theme.transformation.1': 'Siente el progreso de nuevo — un reset a la vez.',
  'paywall.theme.transformation.2': 'Construye consistencia sin agobio ni presión.',
  'paywall.theme.transformation.3': 'Tu futuro se forma en la repetición diaria silenciosa.',
  'paywall.theme.transformation.4': 'Un reset puede cambiar toda tu dirección.',
  'paywall.theme.future_self.1':    'En 7 días, el impulso comienza.',
  'paywall.theme.future_self.2':    'En 30 días, la consistencia se vuelve natural.',
  'paywall.theme.future_self.3':    'En 90 días, tu identidad cambia.',
  'paywall.theme.future_self.4':    'La versión que quieres ser se construye aquí.',
  'paywall.theme.calm.1':          'Consistencia sin presión. Cambio sin fuerza.',
  'paywall.theme.calm.2':          'No necesitas ser perfecto. Solo necesitas volver.',
  'paywall.theme.calm.3':          'Un reset diario suave lo cambia todo, despacio.',
  'paywall.theme.calm.4':          'La disciplina tranquila es la más poderosa.',
  'paywall.theme.trial.1':         'Vive el viaje completo de Daily Reset, gratis.',
  'paywall.theme.trial.2':         'Resets emocionales personalizados, cada día.',
  'paywall.theme.trial.3':         'Apoyo, rituales, hitos — todo incluido.',
  'paywall.theme.trial.4':         'Sin presión. Cancela antes de que termine la prueba.',
  'paywall.lock.ritual.label':     'Reset Ritual',
  'paywall.lock.ritual.sub':       'Tu ancla emocional de 2 minutos',
  'paywall.lock.recap.label':      'Resumen Semanal',
  'paywall.lock.recap.sub':        'Ve cómo cada semana te moldeó',
  'paywall.lock.milestone.label':  'Ceremonias de Hitos',
  'paywall.lock.milestone.sub':    'Momentos emocionalmente significativos',
  'paywall.lock.profile.label':    'Perfil Emocional',
  'paywall.lock.profile.sub':      'Tu viaje personalizado',
  'paywall.lock.future.label':     'Tu Transformación',
  'paywall.lock.future.sub':       'Sigue tu transformación',
  'paywall.lock.comeback.label':   'Psicología del Regreso',
  'paywall.lock.comeback.sub':     'Regresa sin juicios',
  'paywall.ben.0.label': 'Programa de 365 Días',
  'paywall.ben.0.sub':   'Un año completo de transformación diaria guiada',
  'paywall.ben.1.label': 'Reset Ritual (Firma)',
  'paywall.ben.1.sub':   'Tu ancla emocional diaria de 2 minutos',
  'paywall.ben.2.label': 'Personalización Emocional',
  'paywall.ben.2.sub':   'La app se adapta a lo que más necesitas',
  'paywall.ben.3.label': 'Acciones y Reflexiones Diarias',
  'paywall.ben.3.sub':   'Pasos con propósito cada día',
  'paywall.ben.4.label': 'Arquitectura de Hábitos',
  'paywall.ben.4.sub':   'Construye rutinas que realmente duran',
  'paywall.ben.5.label': 'Panel de Transformación',
  'paywall.ben.5.sub':   'Observa cómo tu identidad cambia con el tiempo',
  'paywall.ben.6.label': 'Temporizadores de Enfoque y Detox',
  'paywall.ben.6.sub':   'Recupera tu atención y calma',
  'paywall.ben.7.label': 'Ceremonias de Hitos',
  'paywall.ben.7.sub':   'Momentos personales emocionalmente significativos',
  'paywall.ben.8.label': 'Biblioteca de Mentalidad Completa',
  'paywall.ben.8.sub':   'Más de 48 insights premium, desbloqueados con el tiempo',
  'paywall.ben.9.label': 'Apoyo al Regreso',
  'paywall.ben.9.sub':   'Nunca castigado por semanas difíciles',
  'paywall.identity.title': 'Los resets diarios pequeños se convierten en identidad con el tiempo.',
  'paywall.identity.sub':   'Construido para la consistencia, no la presión.',
  'paywall.path.title':  'TU CAMINO ADELANTE',
  'paywall.path.sub.future':  'Imagínate dentro de 90 días.',
  'paywall.path.sub.default': 'Imagina dónde estarás después de 30 resets.',
  'paywall.plan.title':  'ELIGE TU PLAN',
  'paywall.included':    'TODO INCLUIDO',

  // ── Progress screen ──────────────────────────────────────────────────────────
  'progress.ring.journeyStarted': 'el viaje ha comenzado',
  'progress.ring.ofYourPath':     'de tu camino',
  'progress.ring.todayRhythm':    "Ritmo\nde hoy",
  'progress.ring.weekPattern':    "Patrón\nsemanal",
  'progress.ring.youreHere':      'Día {{day}} — aquí estás.',
  'progress.ring.daysAhead':      '{{days}} día{{s}} por delante',
  'progress.ring.tomorrowMilestone': 'Mañana llegas al Día {{n}}.',
  'progress.ring.daysToMilestone':   '{{days}} días para tu próximo hito — Día {{n}}.',
  'progress.section.journey':        'TU VIAJE',
  'progress.section.commitment':     'TU COMPROMISO',
  'progress.section.showingUp':      'TUS REGRESOS',
  'progress.section.storyNumbers':   'TU HISTORIA EN NÚMEROS',
  'progress.section.chapters':       'TUS ETAPAS',
  'progress.section.pathTitle':      'CAMINO DE TRANSFORMACIÓN',
  'progress.section.yourStory':      'TU HISTORIA',
  'progress.streak.choosingYou':     "regresos tranquilos",
  'progress.streak.personalBest':    'Nunca has estado mejor',
  'progress.streak.yourBest':        'Tu mejor: {{n}} días',
  'progress.cal.title':              'Los últimos 7 días tuviste',
  'progress.cal.sevenForSeven':      'Siete de siete. Extraordinario.',
  'progress.cal.showedUpN':          'Apareciste {{n}} veces esta semana.',
  'progress.cal.daysShowedUp':       '{{n}} días presentándote. Mantén el hilo.',
  'progress.cal.weekOpen':           'Esta semana sigue abierta. Un reset lo cambia.',
  'progress.cal.returnedN':          'Regresaste {{n}} vez{{s}}. Eso cuenta.',
  'progress.trend.label':            'Consistencia de 14 días',
  'progress.evidence.sectionTitle':  'EVIDENCIA DE REGRESAR',
  'progress.evidence.card1Title':    'Regresaste',
  'progress.evidence.card1Sub':      'momentos completados',
  'progress.evidence.card2Title':    'Tu ritmo',
  'progress.evidence.card2Sub':      'regresos tranquilos',
  'progress.evidence.card3Title':    'Aquí sigues',
  'progress.evidence.card3Sub':      'veces esta semana',
  'progress.evidence.card4Title':    'Tu mejor tramo',
  'progress.evidence.card4Sub':      'mejor regreso',
  'progress.stat.consecutiveDays':   'Días que regresaste',
  'progress.stat.choosingYourself':  'Consistencia silenciosa.',
  'progress.stat.bestStreak':        'Regreso más largo',
  'progress.stat.bestStreakSub':     'Tu ritmo más fuerte.',
  'progress.stat.totalResets':       'Momentos completados',
  'progress.stat.totalResetsSub':    'Pequeños resets. Evidencia real.',
  'progress.stat.thisWeek':          'El ritmo de esta semana',
  'progress.stat.daysShowedUp':      'Veces que apareciste.',
  'progress.milestone.firstAwaits':  'Tu primer capítulo está tranquilamente adelante.',
  'progress.milestone.firstSub':     'Un capítulo comienza en el Día 3.',
  'progress.roadmap.7days':          '7 días',
  'progress.roadmap.1month':         '1 mes',
  'progress.roadmap.2months':        '2 meses',
  'progress.roadmap.3months':        '3 meses',
  'progress.roadmap.6months':        '6 meses',
  'progress.roadmap.momentum':       'Impulso',
  'progress.roadmap.clarity':        'Claridad',
  'progress.roadmap.identity':       'Identidad',
  'progress.roadmap.rhythm':         'Ritmo',
  'progress.roadmap.transformation': 'Transformación',
  'progress.story.weeklyRecaps':     'Resumen semanal',
  'progress.story.weeklySubEmpty':   'Tu viaje semanal, reflejado.',
  'progress.story.weeklySubCount':   '{{n}} semana{{s}} de tu viaje',
  'progress.story.weeklySubCount.one':   '1 semana de tu viaje',
  'progress.story.weeklySubCount.other': '{{n}} semanas de tu viaje',
  'progress.story.reflection':       'Diario de Reflexión',
  'progress.story.reflectionSubEmpty': 'Tu compañero emocional silencioso.',
  'progress.story.reflectionSubCount': '{{n}} reflexión{{s}} escritas',

  // ── Progress v2 — nueva pantalla premium ─────────────────────────────────────
  'progress2.hero.title':                  'Algo en ti sigue volviendo.',
  'progress2.hero.subtitle':               'Silenciosamente, algo cambió.',
  'progress2.hero.variation.0':            'Continuaste, incluso en los días más tranquilos.',
  'progress2.hero.variation.1':            'Tu retorno se ha vuelto más suave con el tiempo.',
  'progress2.hero.variation.2':            'Cada visita dejó una pequeña huella.',
  'progress2.hero.variation.3':            'Bajaste el ritmo sin desaparecer.',
  'progress2.hero.variation.4':            'Tu ritmo comenzó a reaparecer.',
  'progress2.hero.variation.5':            'Estos retornos se están volviendo más tuyos.',
  'progress2.rhythm.title':               'Ritmo de la semana',
  'progress2.rhythm.label':               'presencia acumulada',
  'progress2.rhythm.description':         'Basado en los días en que volviste, escribiste algo o completaste un reset.',
  'progress2.rhythm.emptyTitle':          'Tu presencia todavía se está formando.',
  'progress2.rhythm.emptyDescription':    'Vuelve durante algunos días y esta área empezará a reflejar tus patrones.',
  'progress2.rhythm.returnMain':          'Volviste.',
  'progress2.rhythm.returnLabel':         'presencia registrada',
  'progress2.rhythm.tagline':             'Cada retorno deja una marca.',
  'progress2.signals.title':              'Señales reales',
  'progress2.signals.return.title':       'Volviste',
  'progress2.signals.return.text':        'Seguiste volviendo.',
  'progress2.signals.presence.title':     'Más presencia',
  'progress2.signals.presence.text':      'Desaceleraste.',
  'progress2.signals.stability.title':    'Una constancia más presente',
  'progress2.signals.stability.text':     'Tu constancia comenzó a reaparecer.',
  'progress2.patterns.title':             'Patrones percibidos',
  'progress2.patterns.empty':             'Sigue registrando pequeños momentos. Tus patrones aparecerán con el tiempo.',
  'progress2.patterns.1':                 'Tiendes a volver cuando el reset parece ligero.',
  'progress2.patterns.2':                 'Tu progreso aparece más en la repetición que en la intensidad.',
  'progress2.patterns.3':                 'Los días simples te han ayudado a continuar.',
  'progress2.patterns.4':                 'Las pequeñas pausas parecen reducir el peso del día.',
  'progress2.patterns.5':                 'Mantienes más presencia cuando reduces el ritmo.',
  'progress2.patterns.6':                 'Tu retorno ocurre mejor sin presión.',
  'progress2.patterns.7':                 'La constancia empieza a aparecer en pequeños movimientos.',
  'progress2.patterns.8':                 'Pareces responder mejor a la suavidad que a la exigencia.',
  'progress2.patterns.9':                 'Avanzas más cuando el día no exige perfección.',
  'progress2.patterns.10':                'Estás creando espacio antes de reaccionar.',
  'progress2.timeline.title':             'Línea de reconstrucción',
  'progress2.timeline.day1.title':        'Empezaste.',
  'progress2.timeline.day1':              'Algo cambió lo suficiente para traerte hasta aquí.',
  'progress2.timeline.day7.title':        'Primeras señales.',
  'progress2.timeline.day7':              'Un ritmo comenzó a aparecer.',
  'progress2.timeline.day14.title':       'Menos esfuerzo.',
  'progress2.timeline.day14':             'Volver comenzó a sentirse más natural.',
  'progress2.timeline.day30.title':       'Una base.',
  'progress2.timeline.day30':             'Construiste algo que sigue existiendo entre los días.',
  'progress2.timeline.day60.title':       'Más estabilidad.',
  'progress2.timeline.day60':             'Tu progreso dejó de depender de días perfectos.',
  'progress2.timeline.day90.title':       'Presencia construida.',
  'progress2.timeline.day90':             'Creaste una relación más constante contigo mismo.',
  'progress2.summary.title':              'Señales del Camino',
  'progress2.summary.resets':             'retornos percibidos',
  'progress2.summary.journal':            'momentos registrados',
  'progress2.summary.returnDays':         'presencia de hoy',
  'progress2.summary.weeks':              'mejor racha',
  'progress2.summary.resets.one':         'retorno percibido',
  'progress2.summary.journal.one':        'momento registrado',
  'progress2.summary.returnDays.one':     'presencia de hoy',
  'progress2.milestone.7':               'Tu retorno comenzó a crear ritmo.',
  'progress2.milestone.14':              'Empezaste a volver sin forzarte.',
  'progress2.milestone.30':              'Tu ritmo empezó a confiar en ti.',
  'progress2.milestone.60':              'El retorno se volvió más natural.',
  'progress2.milestone.90':              'Ya no estás empezando de nuevo.',

  // ── Private space card ────────────────────────────────────────────────────────
  'progress2.space.eyebrow':             'TU ESPACIO PARTICULAR',
  'progress2.space.title':               'Un lugar tranquilo para soltar lo que pesa.',
  'progress2.space.placeholder':         'Puedes dejarlo aquí.',
  'progress2.space.saved':               'Guardado.',
  'progress2.space.action.keep':         'Guardar esto',
  'progress2.space.action.release':      'Soltar',
  'progress2.space.feedback.kept':       'Tu momento ha sido guardado.',
  'progress2.space.feedback.return':     'Puedes volver cuando quieras.',
  'progress2.space.feedback.released':   'No necesitas cargar esto ahora.',
  'progress2.space.prompt.0':            '¿Qué drenó tu energía hoy?',
  'progress2.space.prompt.1':            '¿Qué no quieres cargar para mañana?',
  'progress2.space.prompt.2':            '¿Qué está intentando procesar tu mente?',
  'progress2.space.prompt.3':            '¿Qué momento trajo un poco de calma hoy?',
  'progress2.space.prompt.4':            '¿Qué te gustaría soltar?',
  'progress2.space.prompt.5':            '¿Qué está intentando decirte tu agotamiento?',
  'progress2.space.prompt.6':            '¿Qué echaste de menos hoy?',
  'progress2.space.prompt.7':            '¿Qué se volvió demasiado pesado para cargar en silencio?',
  'progress2.space.prompt.8':            '¿Qué merece más gentileza dentro de ti?',
  'progress2.space.prompt.9':            '¿Qué estás evitando sentir?',
  'progress2.space.prompt.10':           '¿Qué parte de ti necesita más paciencia hoy?',
  'progress2.space.prompt.11':           '¿Qué dejaste sin decir hoy?',
  'progress2.space.prompt.12':           '¿Qué dificulta el descanso?',
  'progress2.space.prompt.13':           '¿Qué pensamiento te acompañó durante el día?',

  // ── Weekly recap card ─────────────────────────────────────────────────────────
  'progress2.weekrecap.eyebrow':         'RESUMEN DE LA SEMANA',
  'progress2.weekrecap.subtitle':        'Una mirada tranquila a tu semana.',
  'progress2.weekrecap.seeAll':          'Ver historial',
  'progress2.weekrecap.n0':              'Esta semana todavía está tomando forma.',
  'progress2.weekrecap.n1':              'Volviste una vez. Ya cuenta.',
  'progress2.weekrecap.n2':              'Dos retornos esta semana. Un ritmo comienza.',
  'progress2.weekrecap.n3':              'Tres retornos. Algo empieza a establecerse.',
  'progress2.weekrecap.n4':              'Apareciste cuatro veces esta semana.',
  'progress2.weekrecap.n5':              'Cinco retornos. Tu rutina está encontrando su forma.',
  'progress2.weekrecap.n6':              'Seis días. Consistencia tranquila que reconstruye.',
  'progress2.weekrecap.n7':              'Siete días. Una semana entera de presencia.',
  'progress2.weekrecap.streakN':         '{{n}} días seguidos. Sigues volviendo.',

  // ── Quiet reflections card ────────────────────────────────────────────────────
  'progress2.quietref.eyebrow':          'REFLEXIONES SILENCIOSAS',
  'progress2.quietref.subtitle':         'Tus registros emocionales.',
  'progress2.quietref.seeAll':           'Ver todas',
  'progress2.quietref.empty':            'Tus reflexiones aparecerán aquí.',
  'progress2.quietref.today':            'Hoy',
  'progress2.quietref.yesterday':        'Ayer',
  'progress2.quietref.daysAgo':          'hace {{n}} días',
  'progress2.quietref.countOne':         'Tus momentos guardados aquí.',
  'progress2.quietref.countMany':        'Tus momentos guardados aquí.',
  'progress2.history.weekrecap.title':   'Resumen Semanal',
  'progress2.history.weekrecap.sub.many': 'Volviste más veces de lo que notaste.',
  'progress2.history.weekrecap.sub.some': 'Los días tranquilos también contaron.',

  'progress.qr.sub.count.one':           '1 reflexión guardada en silencio.',
  'progress.qr.sub.count.other':         '{{n}} reflexiones guardadas en silencio.',

  // ── Days & months ────────────────────────────────────────────────────────────
  'day.sun': 'Dom', 'day.mon': 'Lun', 'day.tue': 'Mar', 'day.wed': 'Mié',
  'day.thu': 'Jue', 'day.fri': 'Vie', 'day.sat': 'Sáb',
  'month.jan': 'Ene', 'month.feb': 'Feb', 'month.mar': 'Mar', 'month.apr': 'Abr',
  'month.may': 'May', 'month.jun': 'Jun', 'month.jul': 'Jul', 'month.aug': 'Ago',
  'month.sep': 'Sep', 'month.oct': 'Oct', 'month.nov': 'Nov', 'month.dec': 'Dic',

  // ── Profile ──────────────────────────────────────────────────────────────────
  'profile.section.transformation': 'MI TRANSFORMACIÓN',
  'profile.section.journey':        'MI VIAJE',
  'profile.section.intentions':     'MIS INTENCIONES',
  'profile.streak.daysInRow':       'regresos tranquilos',
  'profile.streak.personalBest':    'Ritmo más largo',
  'profile.stat.resetsDone':        'resets realizados',
  'profile.stat.bestStreak':        'ritmo más largo',
  'profile.stat.firstReturn':       'primer retorno',
  'profile.stat.thisWeek':          'esta semana',
  'profile.milestone.dayReached':   'Día {{n}} alcanzado',
  'profile.milestone.unlocked':     'Hito desbloqueado',
  'profile.milestone.firstReset':   'Día 1 — Primer reset',
  'profile.milestone.beginToday':   'Completa el reset de hoy para comenzar.',
  'profile.milestone.dayAhead':     'Día {{n}} por delante',
  'profile.milestone.youReThere':   'Ya llegaste. Completa el reset de hoy.',
  'profile.milestone.oneDayAway':   'Un día más. Sigue.',
  'profile.milestone.daysAway':     '{{n}} días de distancia.',
  'profile.greet.hi':               'Hola, {{name}}.',
  'profile.greet.becoming':         'Tu momento.',
  'profile.greet.memberSince':      'Aquí desde {{month}} {{year}}',
  'profile.greet.dayOne':           'Día 1 de tu viaje de reset.',
  'profile.greet.namePlaceholder':  'Tu nombre',
  'profile.footer.p1': 'Cada reset cambia el camino.',
  'profile.footer.p2': 'La consistencia pequeña se convierte en identidad.',
  'profile.footer.p3': 'El impulso comienza en silencio.',
  'profile.footer.p4': 'El crecimiento se construye suavemente.',
  'profile.footer.p5': 'El progreso silencioso también cuenta.',

  // ── Habits — locked state ──────────────────────────────────────────────────
  'habits.locked.title': 'Los hábitos se desbloquean en el Día 7',
  'habits.locked.sub':   'Por ahora, lo único que importa es tu reset diario. Aparece durante 7 días — tus hábitos te estarán esperando.',
  'habits.locked.days':  '{{n}} días hasta desbloquear los hábitos',

  // ── Notification advanced settings ────────────────────────────────────────
  'notif.evening.sectionLabel':   'REVISIÓN NOCTURNA',
  'notif.evening.toggleLabel':    'Revisión nocturna',
  'notif.evening.toggleSub':      'Un momento tranquilo al final del día',
  'notif.word.sectionLabel':      'PALABRA DEL DÍA',
  'notif.word.toggleLabel':       'Palabra del día',
  'notif.word.toggleSub':         'Enviada 30 min antes de tu recordatorio',
  'notif.milestone.sectionLabel': 'MOMENTOS ESPECIALES',
  'notif.milestone.toggleLabel':  'Momentos especiales',
  'notif.milestone.toggleSub':    'Cuando algo significativo sucede',
  'notif.quiet.sectionLabel':     'DÍAS DE PAUSA',
  'notif.quiet.sub':              'Sin recordatorios estos días',
  'notif.promise.text':           'Enviamos un máximo de una notificación al día.\nNunca más. Es una promesa.',
  'notif.web.unavailable':        'Los recordatorios funcionan mejor en la app instalada.\nPor ahora, tus resets siguen disponibles aquí.',
  'notif.day.0': 'Dom', 'notif.day.1': 'Lun', 'notif.day.2': 'Mar', 'notif.day.3': 'Mié',
  'notif.day.4': 'Jue', 'notif.day.5': 'Vie', 'notif.day.6': 'Sáb',

  // ── Lang / common ──────────────────────────────────────────────────────────
  'lang.pt':    'Português',
  'common.skip': 'Omitir',

  // ── Onboarding — arrival screen ───────────────────────────────────────────
  'onboarding.arrival.label':              'UNA PREGUNTA',
  'onboarding.arrival.title':              '¿Cómo te sientes\nhoy?',
  'onboarding.arrival.subtitle':           'Aquí no hay respuesta correcta.',
  'onboarding.arrival.options.exhausted':  'Estoy agotado, pero no me rendí.',
  'onboarding.arrival.options.anxious':    'Mi mente no para.',
  'onboarding.arrival.options.empty':      'Todo se siente muy pesado ahora mismo.',
  'onboarding.arrival.options.breathe':    'Solo necesito un momento para respirar.',
  'onboarding.arrival.options.returning':  'Intento encontrar mi camino de vuelta.',
  'onboarding.arrival.cta':               'Así estoy hoy',

  // ── Onboarding — promise screen ───────────────────────────────────────────
  'onboarding.promise.heading':         'Un momento.\nCada día.\nSolo para ti.',
  'onboarding.promise.body':            'Algo pequeño cada día.\nNo para cambiar quién eres —\nsino para ayudarte a seguir adelante.',
  'onboarding.promise.pill.nopressure': 'Sin presión',
  'onboarding.promise.pill.minutes':    '2 minutos',
  'onboarding.promise.pill.pace':       'A tu ritmo',
  'onboarding.promise.cta':            'Comenzar mi reset →',
  'onboarding.promise.hint':           'Sin cuenta. Empieza en segundos.',

  // ── Today — uppercase greetings ───────────────────────────────────────────
  'today.greeting.morning':   'BUENOS DÍAS.',
  'today.greeting.afternoon': 'BUENAS TARDES.',
  'today.greeting.evening':   'BUENAS NOCHES.',
  'today.greeting.done':      'TODAVÍA AQUÍ.',

  // ── Today — rotating subheadlines ─────────────────────────────────────────
  'today.subheadline.0': 'Algunos cambios solo se notan semanas después de que comienzan.',
  'today.subheadline.1': 'La versión de ti que sigue aquí ya ha hecho algo.',
  'today.subheadline.2': 'Nada construido en silencio parece mucho desde afuera.',
  'today.subheadline.3': 'El ritmo no necesita que cada día sea igual.',
  'today.subheadline.4': 'Incluso un regreso lento sigue siendo un regreso.',
  'today.subheadline.5': 'La presencia no es una actuación.',
  'today.subheadline.6': 'La distancia entre dónde estabas y dónde estás ahora es real.',

  // ── Today — mood check-in ─────────────────────────────────────────────────
  'today.mood.label': '¿Cómo estás ahora mismo?',
  'today.mood.hard':  'Difícil',
  'today.mood.okay':  'Bien',
  'today.mood.good':  'Genial',

  // ── Today — word / sections / CTA ─────────────────────────────────────────
  'today.word.label':       'TU PALABRA DE HOY',
  'today.section.action':   'Tu reset de hoy',
  'today.section.why':      'Por qué ayuda',
  'today.section.reflection': 'Reflexión',
  'today.cta.complete':     'Terminar el reset de hoy',

  // ── Today — streak states ─────────────────────────────────────────────────
  'today.streak.paused':    'En pausa — bienvenido de vuelta',
  'today.streak.resting':   'Descansando — está bien',
  'today.streak.returning': 'Volviste.',

  // ── Today — day label / tomorrow ─────────────────────────────────────────
  'today.day.label':           'DÍA {{day}}',
  'today.tomorrow.nopressure': 'Sin presión. Estará aquí cuando estés listo.',

  // ── Journal ───────────────────────────────────────────────────────────────
  'journal.title':            'Tus entradas.',
  'journal.subtitle':         '{{n}} días registrados',
  'journal.subtitle.one':     '1 día registrado',
  'journal.subtitle.other':   '{{n}} días registrados',
  'journal.empty.title':      'Nada aquí todavía.',
  'journal.empty.sub':        'Tus entradas aparecerán aquí\ndespués de tu primer reset.',
  'journal.day':              'DÍA {{day}}',
  'journal.completed':        '✓ Reset completado',
  'journal.pill.action':      'Acción',
  'journal.pill.reflection':  'Reflexión',
  'journal.nonotes':          'Reset completado. Sin notas.',
  'journal.norecord':         'Sin notas registradas.',
  'journal.recent.title':     'Resets recientes',
  'journal.calendar.title':   'Calendario de tu camino',
  'journal.modal.label.today':      'TU RESET DE HOY',
  'journal.modal.label.action':     'TU RESET DE HOY',
  'journal.modal.label.why':        'POR QUÉ AYUDÓ',
  'journal.modal.label.reflection': 'REFLEXIÓN',
  'journal.modal.label.moment':     'MOMENTO PARA REFLEXIONAR',
  'journal.modal.label.after':      'DESPUÉS DEL RESET',
  'journal.modal.after.sub':        'Qué te quedó de hoy',
  'journal.modal.nonote':           'Sin nota añadida.',
  'journal.modal.noreflection':     'Sin reflexión añadida.',
  'journal.modal.completed':        '✓ Reset completado',

  // ── Quiet Reflections ─────────────────────────────────────────────────────
  'qr.title':        'Reflexiones Tranquilas',
  'qr.subtitle':     'Tus momentos privados, guardados con cuidado.',
  'qr.empty.title':  'Algunos pensamientos pasan. Otros se quedan.',
  'qr.empty.body':   'Un espacio tranquilo para lo que importa.',
  'qr.view.older':   'Ver reflexiones anteriores',
  'qr.closing':      'Estos momentos te pertenecen.',
  'qr.group.week':   'Esta semana',
  'qr.group.month':  'Antes este mes',
  'qr.group.before': 'Guardado antes',
  'qr.echo.0':       'Has estado cargando mucho en silencio.',
  'qr.echo.1':       'Sigues volviendo de todas formas.',
  'qr.echo.2':       'Algunas cosas están mejor sostenidas que resueltas.',
  'qr.echo.3':       'No todo lo que pesa necesita resolverse ahora.',
  'qr.echo.4':       'Te mostraste para ti mismo, en silencio.',
  'qr.echo.5':       'Un pensamiento suave se quedó contigo.',
  'qr.echo.6':       'Algunos pensamientos piden ser escuchados más que resueltos.',
  'qr.echo.7':       'Has estado aquí para ti mismo.',

  // ── Progress — private space ──────────────────────────────────────────────
  'progress.privatespace.eyebrow':        'TU ESPACIO PRIVADO',
  'progress.privatespace.headline':       'Un lugar tranquilo para soltar lo pesado.',
  'progress.privatespace.start':          'Escribe aquí...',
  'progress.privatespace.placeholder':    'Deja que salga...',
  'progress.privatespace.done':           'Listo',
  'progress.privatespace.keep':           'Guardar esto',
  'progress.privatespace.letgo':          'Soltarlo',
  'progress.privatespace.kept.title':     'Guardado en silencio.',
  'progress.privatespace.kept.sub':       'Esta reflexión se quedó contigo.',
  'progress.privatespace.released.title': 'Soltado suavemente.',
  'progress.privatespace.released.sub':   'Algunos pensamientos pueden pasar.',
  'progress.qr.title':                    'Reflexiones Tranquilas',
  'progress.qr.sub.empty':               'Tus momentos privados, guardados con cuidado.',
  'progress.qr.sub.count':               '{{n}} reflexión{{s}} guardadas.',
  'progress.section.yourjourney':         'TU RECORRIDO',
  'progress.section.wordtoday':           'TU PALABRA DE HOY',

  // ── Reflection write screen ───────────────────────────────────────────────
  'reflect.eyebrow':     'REFLEXIÓN',
  'reflect.save':        'Guardar',
  'reflect.skip':        'Omitir',
  'reflect.saved':       'Guardado ✓',
  'reflect.microcopy':   'Un pensamiento es suficiente.',
  'reflect.placeholder': 'Empieza a escribir aquí...',
  'reflect.privacy':     'Tus reflexiones son privadas.',

  // ── Mindset category labels (card stripe + modal) ─────────────────────────
  'mindset.cat.Focus':    'Enfoque',
  'mindset.cat.Calm':     'Calma',
  'mindset.cat.Courage':  'Coraje',
  'mindset.cat.Rest':     'Descanso',
  'mindset.cat.Clarity':  'Claridad',
  'mindset.cat.Momentum': 'Impulso',
  'mindset.cat.Rhythm':   'Ritmo',

  // ── Mindset card titles ───────────────────────────────────────────────────
  'mindset.card.m1.title':    'Una cosa a la vez.',
  'mindset.card.m2.title':    'Si tarda menos de dos minutos, hazlo ahora.',
  'mindset.card.m3.title':    'La confianza no se espera. Se recoge.',
  'mindset.card.m4.title':    'Lo más importante primero.',
  'mindset.card.m5.title':    'Las emociones también hablan.',
  'mindset.card.m6.title':    'Tu atención también tiene un valor.',
  'mindset.card.m7.title':    'El ritmo de 90 minutos.',
  'mindset.card.m8.title':    'Cada acción también vota por quién estás llegando a ser.',
  'mindset.card.m9.title':    'El rechazo también tiene algo que decirte.',
  'mindset.card.m10.title':   'Tu agenda debería reflejar lo que importa.',
  'mindset.card.m11.title':   'No necesitas la aprobación de todos.',
  'mindset.card.m12.title':   'El aburrimiento también crea.',
  'mindset.card.m13.title':   'Solo una cosa.',
  'mindset.card.m14.title':   'Un día perdido es humano. Volver al siguiente, también.',
  'mindset.card.m15.title':   'La confianza llega haciéndolo, no antes.',
  'mindset.card.m16.title':   'Revisar también es una forma de avanzar.',
  'mindset.card.m17.title':   'La práctica de soltar.',
  'mindset.card.m18.title':   'Menos herramientas, más presencia.',
  'mindset.card.m19.title':   'Trabajo profundo.',
  'mindset.card.m20.title':   'Ver claro y seguir creyendo en el camino.',
  'mindset.card.emo1.title':  'Siempre hay un momento para volver.',
  'mindset.card.emo2.title':  'Descansar no es rendirse. Es sostenerse.',
  'mindset.card.disc1.title': 'Tu cerebro confía en lo que repites.',
  'mindset.card.disc2.title': 'Las cosas difíciles se alivian cuando se convierten en rutina.',
  'mindset.card.disc3.title':  'Las pequeñas repeticiones cambian la dirección de tus días.',
  'mindset.card.disc4.title':  'La comodidad también puede frenarte sin que lo notes.',
  'mindset.card.disc5.title':  'La disciplina también crea libertad.',
  'mindset.card.disc6.title':  'Actuar antes de sentirte lista también crea ritmo.',
  'mindset.card.disc7.title':  'La disciplina también se construye en los días difíciles.',
  'mindset.card.disc8.title':  'Tu futuro también está siendo moldeado por lo que haces hoy.',
  'mindset.card.disc9.title':  'La disciplina también reduce la negociación interna.',
  'mindset.card.disc10.title': 'El autocontrol también es una forma de poder interior.',
  'mindset.card.disc11.title': 'La disciplina es repetición. No intensidad.',
  'mindset.card.disc12.title': 'La disciplina también protege lo que realmente quieres.',
  'mindset.card.disc13.title': 'Lo que sueltas ahora también construye lo que recibes después.',
  'mindset.card.disc14.title': 'Lo que repites también te dice quién eres.',
  'mindset.card.disc15.title': 'Las excusas también agotan el poder interior.',
  'mindset.card.disc16.title': 'La disciplina también es saber actuar más allá de cómo te sientes.',
  'mindset.card.disc17.title': 'La disciplina también construye confianza en silencio.',
  'mindset.card.disc18.title': 'La estructura también alivia la mente.',
  'mindset.card.disc19.title': 'La disciplina también es elegir lo que más importa.',
  'mindset.card.disc20.title': 'Esperar también puede ser una forma de poder.',
  'mindset.card.disc21.title': 'La constancia también necesita límites que la protejan.',
  'mindset.card.disc22.title': 'Las elecciones difíciles también construyen algo en ti.',
  'mindset.card.disc23.title': 'La disciplina también crea estabilidad cuando todo se mueve.',
  'mindset.card.disc24.title': 'Cada hábito también está construyendo o debilitando algo.',
  'mindset.card.disc25.title': 'Terminar lo que empiezas también forma el carácter.',
  'mindset.card.disc26.title': 'El descanso también es parte de la disciplina real.',
  'mindset.card.disc27.title': 'La disciplina también protege contra el arrepentimiento.',
  'mindset.card.disc28.title': 'En lo que practicas repetidamente también te conviertes.',
  'mindset.card.disc29.title': 'Cumplirte a ti misma también reconstruye la confianza propia.',
  'mindset.card.disc30.title': 'Lo que haces hoy también está creando un futuro diferente.',
  'mindset.card.disc31.title': 'Hacerlo de todas formas también es una forma de disciplina.',
  'mindset.card.disc32.title': 'Lo que toleras en silencio también te forma.',
  'mindset.card.disc33.title': 'El ritmo te reconecta con lo que realmente importa.',
  'mindset.card.disc34.title': 'La fortaleza mental se construye en la repetición.',
  'mindset.card.disc35.title': 'El orden también cuida.',
  'mindset.card.disc36.title': 'El progreso no espera condiciones perfectas.',
  'mindset.card.disc37.title': 'Las grandes transformaciones se construyen despacio.',
  'mindset.card.disc38.title': 'Volver es más importante que no fallar.',
  'mindset.card.disc39.title': 'A veces el progreso no se ve, pero sigue ocurriendo.',
  'mindset.card.disc40.title': 'Tu energía también merece ser cuidada.',
  'mindset.card.disc41.title': 'Lo difícil se vuelve más ligero con la práctica.',
  'mindset.card.disc42.title': 'Liderarte a ti misma es una forma de cuidarte.',
  'mindset.card.disc43.title': 'El ritmo se construye en silencio, sin testigos.',
  'mindset.card.disc44.title': 'No todo lo que se siente bien hoy cuida mañana.',
  'mindset.card.disc45.title': 'El ritmo crea estabilidad, incluso en los días difíciles.',
  'mindset.card.disc46.title': 'Cuanto más te sostienes, menos necesitas que te empujen.',
  'mindset.card.disc47.title': 'Incluso en los días de poca energía, un pequeño paso sostiene el ritmo.',
  'mindset.card.disc48.title': 'La incomodidad también forma parte del camino.',
  'mindset.card.disc49.title': 'Tu entorno también forma parte de tu ritmo.',
  'mindset.card.disc50.title': 'La constancia te vuelve confiable, primero para ti misma.',
  'mindset.card.disc51.title': 'El crecimiento real ocurre en el medio, no solo al principio.',
  'mindset.card.disc52.title': 'Cada acción hoy es un regalo para tu yo del futuro.',
  'mindset.card.disc53.title': 'Actuar también despeja la mente.',
  'mindset.card.disc54.title': 'El ritmo no evita los tropiezos, pero acorta el regreso.',
  'mindset.card.disc55.title': 'Tu identidad se construye en las decisiones de cada día.',
  'mindset.card.disc56.title': 'Con el tiempo, el ritmo fluye solo.',
  'mindset.card.disc57.title': 'La constancia acumula en silencio.',
  'mindset.card.conf1.title':  'La comparación roba el presente.',
  'mindset.card.conf2.title':  'La confianza tranquila es la más fuerte.',
  'mindset.card.emo5.title':   'La sanación necesita quietud.',
  'mindset.card.emo7.title':   'Estar agotada por dentro también cuenta.',
  'mindset.card.emo8.title':   'La sanación rara vez va en línea recta.',
  'mindset.card.emo9.title':   'No todo tiene que resolverse ahora.',
  'mindset.card.emo14.title':  'El silencio también cura.',
  'mindset.card.emo17.title':  'Desacelerar también crea claridad.',
  'mindset.card.emo22.title':  'Cuidarte también es parte de lo que ofreces.',
  'mindset.card.emo23.title':  'Simplificar también es una forma de descansar.',
  'mindset.card.emo24.title':  'Sanar en oleadas también es sanar.',
  'mindset.card.emo25.title':  'No todo en la vida necesita optimizarse.',
  'mindset.card.emo33.title':  'Alejarte de lo que drena también es cuidarte.',
  'mindset.card.emo35.title':  'El cuerpo también necesita sentirse seguro para sanar.',
  'mindset.card.emo37.title':  'La honestidad contigo misma también es descanso.',
  'mindset.card.emo43.title':  'A veces sanar parece pequeño. Pero no lo es.',
  'mindset.card.emo44.title':  'Cuando estás agotada, todo parece más pesado de lo que es.',
  'mindset.card.emo46.title':  'El descanso no se gana. Se necesita.',
  'mindset.card.emo51.title':  'Alejarte de lo que te daña también es protegerte.',
  'mindset.card.emo52.title':  'Tomarte tiempo para sanar también requiere valentía.',
  'mindset.card.emo54.title':  'La sanación no puede apresurarse. Necesita su tiempo.',
  'mindset.card.emo59.title':  'Soltar la presión constante también es descansar.',
  'mindset.card.detox1.title': 'Tu atención es valiosa. Trátala como tal.',
  'mindset.card.detox2.title':  'El ruido constante también cansa.',
  'mindset.card.detox3.title':  'El aburrimiento puede ser una puerta.',
  'mindset.card.detox4.title':  'La tecnología que controla ya no sirve.',
  'mindset.card.detox5.title':  'Cada notificación interrumpe el hilo.',
  'mindset.card.detox6.title':  'Hacer scroll no siempre es descansar.',
  'mindset.card.detox7.title':  'Lo que consumes también te moldea.',
  'mindset.card.detox8.title':  'Estar presente vale más que estar conectada.',
  'mindset.card.detox9.title':  'La claridad mental necesita quietud.',
  'mindset.card.detox10.title': 'No tienes que estar al día de todo, todo el tiempo.',
  'mindset.card.detox11.title': 'Tu capacidad de atención también puede recuperarse.',
  'mindset.card.detox12.title': 'Las redes muestran lo seleccionado. No lo real.',
  'mindset.card.detox13.title': 'No tienes que estar disponible para todos, siempre.',
  'mindset.card.detox14.title': 'A veces descansar de verdad significa desconectarse.',
  'mindset.card.detox15.title': 'La tecnología debería apoyar tu vida. No reemplazarla.',
  'mindset.card.detox16.title': 'El scroll interminable a veces evita lo que hay dentro.',
  'mindset.card.detox17.title': 'La mente necesita espacio para pensar por sí misma.',
  'mindset.card.detox18.title': 'El exceso de estimulación también agota el placer.',
  'mindset.card.detox19.title': 'No todo merece acceso ilimitado a tu mente.',
  'mindset.card.detox20.title': 'La presencia también es una forma de cuidar.',
  'mindset.card.detox21.title': 'El silencio también es bueno para el cerebro.',
  'mindset.card.detox22.title': 'El consumo constante también puede adormecer lo que sientes.',
  'mindset.card.detox23.title': 'Cómo empiezas la mañana también moldea el día.',
  'mindset.card.detox24.title': 'La vida también ocurre fuera de la pantalla.',
  'mindset.card.detox25.title': 'La mente saturada tiene menos espacio para crear.',
  'mindset.card.detox26.title': 'Tu relación con la tecnología también puede cambiar.',
  'mindset.card.detox27.title': 'Vivir más despacio puede sentirse extraño al principio.',
  'mindset.card.detox28.title': 'Tu atención también merece que la cuides.',
  'mindset.card.detox29.title': 'No todos los momentos necesitan ser documentados.',
  'mindset.card.detox30.title': 'Soltar lo digital también crea libertad interior.',
  'mindset.card.detox31.title': 'Estar siempre conectada no es lo mismo que conectar de verdad.',
  'mindset.card.detox32.title': 'El cerebro no fue diseñado para el scroll infinito.',
  'mindset.card.detox33.title': 'El ruido digital también agota sin que lo notes.',
  'mindset.card.detox34.title': 'No tienes que responder a todo de inmediato.',
  'mindset.card.detox35.title': 'Demasiada información también dificulta decidir.',
  'mindset.card.detox36.title': 'La mente también necesita momentos sin interrupciones.',
  'mindset.card.detox37.title': 'La estimulación excesiva también hace que lo simple pierda valor.',
  'mindset.card.detox38.title': 'Lo que ves en las redes no es la vida completa de nadie.',
  'mindset.card.detox39.title': 'Piensas con más claridad cuando consumes menos.',
  'mindset.card.detox40.title': 'Un detox digital no significa rechazar la tecnología.',
  'mindset.card.detox41.title': 'Lo que miras con atención va formando quién eres.',
  'mindset.card.detox42.title': 'Que al principio el silencio se sienta incómodo es normal.',
  'mindset.card.detox43.title': 'Cómo duermes también depende de cuándo sueltas la pantalla.',
  'mindset.card.detox44.title': 'Menos distracciones digitales, más claridad para hacer.',
  'mindset.card.detox45.title': 'Consumir contenido no es lo mismo que descansar.',
  'mindset.card.detox46.title': 'La mente también necesita espacio vacío a veces.',
  'mindset.card.detox47.title': 'La tecnología también puede aumentar la ansiedad sin que lo notes.',
  'mindset.card.detox48.title': 'No tienes que estar al tanto de todo lo que pasa.',
  'mindset.card.detox49.title': 'Los momentos sin pantalla también fortalecen el conocimiento de ti misma.',
  'mindset.card.detox50.title': 'La tecnología debería añadir algo real a tu vida.',
  'mindset.card.detox51.title': 'El scroll constante también debilita la presencia.',
  'mindset.card.detox52.title': 'Tu sistema nervioso registra más de lo que crees.',
  'mindset.card.detox53.title': 'La atención se recupera despacio. Y eso también está bien.',
  'mindset.card.detox54.title': 'Menos pantalla a veces crea más espacio interior.',
  'mindset.card.detox55.title': 'No necesitas estar entretenida todo el tiempo.',
  'mindset.card.detox56.title': 'Las personas que quieres también merecen tu atención completa.',
  'mindset.card.detox57.title': 'Ir más despacio también devuelve la conciencia.',
  'mindset.card.detox58.title': 'Reducir el ruido también devuelve la sensibilidad emocional.',
  'mindset.card.detox59.title': 'Tu tiempo vale más que el scroll interminable.',
  'mindset.card.detox60.title': 'La paz mental a veces necesita menos estimulación.',
  'mindset.card.detox61.title': 'Recuperar tu atención también cambia tu vida.',
  'mindset.card.prod1.title':   'Estar ocupada no siempre es avanzar.',
  'mindset.card.prod2.title':   'Empezar antes de sentirte lista también es válido.',
  'mindset.card.prod3.title':   'El progreso pequeño también cuenta.',
  'mindset.card.prod4.title':   'El enfoque también acelera el avance.',
  'mindset.card.prod5.title':   'El avance también depende de cómo cuidas tu energía.',
  'mindset.card.prod6.title':   'El ritmo también se construye con pequeñas estructuras.',
  'mindset.card.prod7.title':   'Hecho con honestidad suele ser mejor que perfecto.',
  'mindset.card.prod8.title':   'Lo que eliges primero define hacia dónde avanzas.',
  'mindset.card.prod9.title':   'La constancia suave construye más que los esfuerzos intensos.',
  'mindset.card.prod10.title':  'El movimiento también reduce la resistencia interior.',
  'mindset.card.prod11.title':  'Terminar también crea impulso.',
  'mindset.card.prod12.title':  'Los sistemas simples también son los más sostenibles.',
  'mindset.card.prod13.title':  'Tu entorno también da forma a lo que produces.',
  'mindset.card.prod14.title':  'El descanso también es parte del avance.',
  'mindset.card.prod15.title':  'Decir que no también protege el avance.',
  'mindset.card.prod16.title':  'La constancia también se mantiene cuando la motivación baja.',
  'mindset.card.prod17.title':  'Sacar las cosas de la mente también crea espacio para avanzar.',
  'mindset.card.prod18.title':  'La claridad también llega con el movimiento.',
  'mindset.card.prod19.title':  'El equilibrio emocional también sostiene el avance.',
  'mindset.card.prod20.title':  'Avanzar también significa elegir el progreso sobre la comodidad inmediata.',
  'mindset.card.prod21.title':  'Saber cuándo rindes mejor también es cuidar el avance.',
  'mindset.card.prod22.title':  'La repetición también construye el ritmo.',
  'mindset.card.prod23.title':  'Una mente menos cargada también avanza más limpio.',
  'mindset.card.prod24.title':  'Vivir con intención también mueve las cosas hacia adelante.',
  'mindset.card.prod25.title':  'El tiempo que cuidas también te cuida a ti.',
  'mindset.card.prod26.title':  'Menos interrupciones también significa más avance real.',
  'mindset.card.prod27.title':  'Cada avance también fortalece la confianza.',
  'mindset.card.prod28.title':  'El avance real no debería costar el bienestar.',
  'mindset.card.prod29.title':  'Saber qué importa también es la base del movimiento.',
  'mindset.card.prod30.title':  'Pensar demasiado también puede frenar el movimiento.',
  'mindset.card.prod31.title':  'Empezar bien también hace más fácil lo que sigue.',
  'mindset.card.prod32.title':  'La mente también necesita pausas para seguir avanzando bien.',
  'mindset.card.prod33.title':  'La constancia no espera a que llegue la motivación.',
  'mindset.card.prod34.title':  'Lo que haces cada día también construye lo que serás.',
  'mindset.card.prod35.title':  'No toda tarea merece tu mejor energía.',
  'mindset.card.prod36.title':  'El desorden también agota la energía mental.',
  'mindset.card.prod37.title':  'El agotamiento no es una medalla. Es una señal.',
  'mindset.card.prod38.title':  'El movimiento también alivia la ansiedad.',
  'mindset.card.prod39.title':  'Empezar pequeño también es empezar.',
  'mindset.card.prod40.title':  'Las interrupciones constantes también destruyen el avance.',
  'mindset.card.prod41.title':  'Dirigir la atención a lo que se puede hacer también mueve.',
  'mindset.card.prod42.title':  'Prepararse también reduce la fricción del día siguiente.',
  'mindset.card.prod43.title':  'La atención también se cuida a propósito.',
  'mindset.card.prod44.title':  'Soltar la perfección también libera el movimiento.',
  'mindset.card.prod45.title':  'Las rutinas constantes también crean estabilidad emocional.',
  'mindset.card.prod46.title':  'Quedarte con una tarea también profundiza el trabajo.',
  'mindset.card.prod47.title':  'El cerebro también necesita recuperarse para rendir bien.',
  'mindset.card.prod48.title':  'Lo que repites también se vuelve parte de ti.',
  'mindset.card.prod49.title':  'Enfocarte en lo que puedes hacer también libera energía.',
  'mindset.card.prod50.title':  'El avance profundo también tarda en hacerse visible.',
  'mindset.card.prod51.title':  'Las rutinas confiables también reducen el esfuerzo diario.',
  'mindset.card.prod52.title':  'Conocerte también mejora lo que produces.',
  'mindset.card.prod53.title':  'Los días imperfectos también son parte del camino.',
  'mindset.card.prod54.title':  'Hacer menos de lo que importa más también es avanzar.',
  'mindset.card.prod55.title':  'Demasiadas decisiones también agotan la mente.',
  'mindset.card.prod56.title':  'La disciplina también sostiene el movimiento cuando no hay motivación.',
  'mindset.card.prod57.title':  'El pensamiento a largo plazo también guía el movimiento de hoy.',
  'mindset.card.prod58.title':  'Lo que evitas también se convierte en carga mental.',
  'mindset.card.prod59.title':  'La productividad real también cuida tu calidad de vida.',
  'mindset.card.mom1.title':    'Los pasos pequeños también te llevan hacia adelante.',
  'mindset.card.mom2.title':    'Empezar siempre es la parte más difícil.',
  'mindset.card.mom3.title':    'El impulso se reconstruye. No se recupera.',
  'mindset.card.mom4.title':    'Terminar también genera energía para lo siguiente.',
  'mindset.card.mom5.title':    'La constancia también es una forma de impulso silencioso.',
  'mindset.card.mom6.title':    'El progreso también crece cuando lo notas.',
  'mindset.card.mom7.title':    'La preparación también llega actuando, no esperando.',
  'mindset.card.mom8.title':    'Lo que apareces a hacer hoy también se acumula.',

  // ── Courage card content (first 5) ───────────────────────────────────────
  'mindset.card.m3.content':
    'La confianza no es una sensación que llega sola — es evidencia que vas acumulando. Cada vez que haces algo difícil, cumples una promesa que te hiciste, o continúas a pesar del cansancio, añades una pequeña prueba de que eres capaz. La mayoría espera sentirse segura antes de actuar. Pero la confianza suele llegar después — no antes. El paso viene primero. La certeza viene después.',
  'mindset.card.m9.content':
    'Cada rechazo está protegiendo un camino que no era el tuyo, o preparándote para el que sí lo es. Las personas que más han avanzado en cualquier campo tienen un historial de rechazos que asustaría a cualquiera. Lo que las distingue no es el talento — es la manera de leer el rechazo. No como veredicto. Como información. La pregunta que ayuda: ¿hacia dónde me está señalando esto?',
  'mindset.card.m15.content':
    'No puedes pensar hasta llegar a la confianza. Solo puedes llegar haciendo. La confianza es consecuencia de la práctica — no su condición previa. Deja de esperar sentirte lista. Deja de esperar hasta estar segura para empezar. Empieza ahora, sabiendo que lo que buscas está al otro lado de hacer precisamente lo que todavía asusta. El paso crea el camino. El camino crea la certeza.',
  'mindset.card.conf1.content':
    'La comparación constante destruye la confianza de forma silenciosa. Siempre habrá alguien más adelante en algún área. La confianza crece cuando devuelves la atención a tu propio avance, en lugar de medirte con los demás. Tu recorrido es único. Compararte no te enseña lo que necesitas aprender de ti mismo. Solo te distrae de lo que ya está pasando dentro de ti.',
  'mindset.card.conf2.content':
    'La arrogancia busca superioridad. La confianza simplemente no necesita demostrar nada. Las personas verdaderamente seguras no sienten el impulso de justificarse en cada conversación. La seguridad interior crea calma, no ego. Cuando confías en ti mismo sin necesitar aprobación constante, lo que surge es una tranquilidad que no depende del exterior.',

  // ── Courage card content (next 30: conf3–conf32) ─────────────────────────
  'mindset.card.conf3.title':   'La confianza también necesita compasión.',
  'mindset.card.conf3.content':
    'Muchas personas intentan construir confianza a través de la autocrítica severa, pero el ataque constante debilita la resiliencia emocional. La confianza crece más deprisa cuando aprendes a tratarte con respeto durante los errores y los retrocesos. El crecimiento requiere paciencia. La compasión hacia uno mismo no es debilidad — es una de las bases más sólidas de la fortaleza interior.',
  'mindset.card.conf4.title':   'La confianza real nace en los momentos difíciles.',
  'mindset.card.conf4.content':
    'Cualquiera puede sentirse segura cuando la vida va bien. La confianza real se desarrolla cuando continúas a pesar del miedo, la incertidumbre o el malestar. Las experiencias difíciles te muestran lo resiliente que realmente eres. Cada desafío que superas se convierte en evidencia de que puedes con más de lo que creías. Las dificultades, a menudo, fortalecen lo que eres.',
  'mindset.card.conf5.title':   'La confianza no espera a la perfección.',
  'mindset.card.conf5.content':
    'El perfeccionismo a menudo esconde inseguridad. Esperar a ser perfecta antes de actuar crea una vacilación que no termina. La confianza te permite avanzar sin necesitar que todo esté resuelto primero. El crecimiento ocurre a través de los errores, el aprendizaje y el ajuste. La imperfección no reduce tu valor — forma parte del camino.',
  'mindset.card.conf6.title':   'Tu cuerpo también sostiene tu confianza.',
  'mindset.card.conf6.content':
    'La manera en que te mueves influye en cómo se siente el cerebro por dentro. La postura, la mirada, la respiración, la presencia física — afectan el estado emocional más de lo que se suele reconocer. La confianza es tanto mental como física. Una presencia física tranquila fortalece la estabilidad emocional. Pequeños ajustes crean cambios reales.',
  'mindset.card.conf7.title':   'La preparación también es una forma de confianza.',
  'mindset.card.conf7.content':
    'Una de las fuentes más sólidas de confianza es la preparación y el desarrollo de habilidades. Cuanto más capaz te vuelves, más segura te sientes de manera natural. La confianza se fortalece a través de la práctica, la repetición y la experiencia. El crecimiento crea evidencia. La preparación reduce el miedo — no lo elimina, pero lo reduce.',
  'mindset.card.conf8.title':   'El miedo y el valor conviven. Siempre.',
  'mindset.card.conf8.content':
    'El miedo es una respuesta humana normal ante la incertidumbre y el desafío. Las personas seguras también sienten miedo — simplemente no le permiten que controle cada decisión. El coraje es actuar a pesar del malestar. La confianza crece cada vez que avanzas aunque tengas miedo. El miedo y el crecimiento a menudo coexisten. No se excluyen.',
  'mindset.card.conf9.title':   'Confiar en ti mismo bajo presión también se aprende.',
  'mindset.card.conf9.content':
    'La vida no siempre será cómoda ni predecible. Confiar en ti mismo significa confiar en tu capacidad de adaptarte incluso cuando las situaciones se complican. No necesitas todas las respuestas de antemano para manejar la vida bien. La adaptabilidad crea resiliencia. Confiar en ti reduce el pánico — no porque los problemas desaparezcan, sino porque sientes que puedes con ellos.',
  'mindset.card.conf10.title':  'La confianza crece con cada vez que lo intentas.',
  'mindset.card.conf10.content':
    'El primer intento de cualquier cosa suele sentirse incómodo. La repetición reduce gradualmente la incertidumbre y aumenta la familiaridad. Cuanto más practicas situaciones difíciles, menos poder tiene el miedo sobre ti. La confianza se fortalece a través de la exposición. Lo familiar crea calma. Y la calma permite seguir.',
  'mindset.card.conf11.title':  'La voz interna también moldea quién eres.',
  'mindset.card.conf11.content':
    'El diálogo interno moldea tu estado emocional cada día. La autocrítica constante entrena a tu mente para esperar el fracaso y la inseguridad. Un lenguaje interno más compasivo crea una resiliencia emocional más sólida. La manera en que te hablas a ti mismo importa profundamente. Los pensamientos amables hacia uno mismo fortalecen la imagen propia despacio, pero de forma real.',
  'mindset.card.conf12.title':  'La confianza no es no dudar. Es seguir de todas formas.',
  'mindset.card.conf12.content':
    'Incluso las personas con más trayectoria sienten inseguridad a veces. La confianza no es eliminar la duda por completo — es aprender a no obedecerla de manera automática. La mente tiende a exagerar el miedo y la incertidumbre. Las personas seguras avanzan de todas formas. El progreso importa más que la certeza perfecta. Seguir a pesar de la duda también es una forma de confianza.',
  'mindset.card.conf13.title':  'La confianza crece donde la evitación disminuye.',
  'mindset.card.conf13.content':
    'Evitar situaciones reduce el miedo temporalmente, pero fortalece la inseguridad a largo plazo. Cada situación evitada le enseña a tu mente que no eres capaz de manejar el malestar. Enfrentar los desafíos gradualmente reentrena el sistema nervioso. La confianza se expande a través de la exposición. La acción debilita el miedo. No de golpe — despacio, con cada paso.',
  'mindset.card.conf14.title':  'La confianza se reconstruye en el regreso.',
  'mindset.card.conf14.content':
    'El fracaso no destruye la confianza — lo que la destruye es negarse a recuperarse de él. Las personas resilientes entienden que los retrocesos son parte del crecimiento. La confianza aumenta cuando aprendes que puedes recuperarte, adaptarte y continuar después de los errores. El regreso construye fortaleza emocional. La persistencia fortalece lo que eres.',
  'mindset.card.conf15.title':  'Tu valor existe más allá de lo que produces.',
  'mindset.card.conf15.content':
    'Muchas personas vinculan su confianza por completo a los logros y el éxito externo. Pero tu valor como persona no depende del rendimiento constante. La confianza saludable deja espacio para el descanso, la imperfección y la humanidad. El valor propio no debería desaparecer en las épocas difíciles. Existes con valor más allá de lo que produces.',
  'mindset.card.conf16.title':  'Poner límites también es una forma de confianza.',
  'mindset.card.conf16.content':
    'Las personas que ignoran constantemente sus propias necesidades a menudo luchan internamente con el respeto propio. La confianza crece cuando empiezas a proteger tu energía, tu tiempo y tu bienestar emocional. Los límites comunican valor propio. Respetarte a ti mismo también le enseña a los demás cómo tratarte. Los límites no alejan — sostienen.',
  'mindset.card.conf17.title':  'La confianza también se practica cada día.',
  'mindset.card.conf17.content':
    'La confianza no es un estado emocional permanente. Habrá días en que te sentirás más fuerte de forma natural, y días en que no. Construir confianza requiere hábitos diarios repetidos que refuercen la autoconfianza, la resiliencia y el coraje. La consistencia moldea la identidad con el tiempo. Las pequeñas acciones diarias importan más de lo que parecen.',
  'mindset.card.conf18.title':  'Lo que ya has sobrevivido también cuenta.',
  'mindset.card.conf18.content':
    'Muchas personas subestiman la resiliencia que ya poseen. Cada experiencia difícil que superas se convierte en evidencia de fortaleza interior. La confianza crece cuando reconoces cuánto ya has atravesado. Mirar hacia atrás fortalece la perspectiva. Lo que ya has sobrevivido contiene pruebas de lo que eres capaz — aunque no siempre lo veas así.',
  'mindset.card.conf19.title':  'La confianza despeja el camino para decidir.',
  'mindset.card.conf19.content':
    'La inseguridad a menudo crea vacilación, sobreanálisis y dudas constantes. La confianza permite decidir con más claridad porque confías en tu capacidad de manejar los resultados. No controlas todo, pero puedes confiar en tu capacidad de responder. La autoconfianza reduce la parálisis mental. No hace falta saber todo — solo confiar en que puedes seguir desde donde estás.',
  'mindset.card.conf20.title':  'La autenticidad también es una forma de confianza.',
  'mindset.card.conf20.content':
    'Pretender ser otra persona puede ganar aprobación temporal, pero debilita la estabilidad interior con el tiempo. La confianza crece cuando tu comportamiento externo se alinea con tus valores reales y tu personalidad. La autenticidad crea libertad emocional. No necesitas actuar constantemente para merecer respeto. Ser tú mismo — incluso imperfectamente — es ya una forma de fortaleza.',
  'mindset.card.conf21.title':  'La confianza crece despacio. Y eso también está bien.',
  'mindset.card.conf21.content':
    'La confianza más duradera se desarrolla gradualmente, a través de experiencias acumuladas. Pequeños momentos de coraje, constancia y resiliencia construyen silenciosamente una identidad más sólida con el tiempo. La confianza a menudo es invisible mientras crece. El progreso pequeño se acumula por dentro. No siempre se ve — pero está ahí.',
  'mindset.card.conf22.title':  'Tu valor no depende de la aprobación de todos.',
  'mindset.card.conf22.content':
    'Intentar complacer a todos crea agotamiento emocional e inseguridad. La confianza te permite tolerar la desaprobación sin perder el sentido de quién eres. No todo el mundo entenderá o validará tu camino. Tu valor no depende de la aprobación universal. Aceptar esto no es rendirse — es liberarse de una carga que nunca fue tuya.',
  'mindset.card.conf23.title':  'La confianza real habla suave.',
  'mindset.card.conf23.content':
    'La verdadera confianza suele aparecer más silenciosa de lo que la gente espera. No busca constantemente atención ni validación. La confianza tranquila viene de la seguridad interior, no de la actuación exterior. La certeza serena es poderosa. La estabilidad a menudo habla suave. No necesita demostrar nada.',
  'mindset.card.conf24.title':  'Cumplir contigo mismo también construye confianza.',
  'mindset.card.conf24.content':
    'La autodisciplina y la confianza están profundamente conectadas. Cada vez que sigues adelante a pesar de la resistencia, el respeto hacia ti mismo crece. La disciplina crea evidencia de que eres capaz de manejar cosas difíciles. La constancia fortalece la identidad. La acción confiable construye confianza interna — despacio, pero de forma sólida.',
  'mindset.card.conf25.title':  'Tu versión actual no es la definitiva.',
  'mindset.card.conf25.content':
    'Algunas personas quedan atrapadas en identidades antiguas porque les cuesta creer que pueden cambiar. La confianza incluye creer que eres capaz de ser más que tus errores pasados o tus limitaciones actuales. El crecimiento requiere apertura. Tu versión actual no es la definitiva. Cada paso hacia adelante ya es un comienzo.',
  'mindset.card.conf26.title':  'La confianza cambia la forma en que vives.',
  'mindset.card.conf26.content':
    'La confianza influye en las relaciones, las oportunidades, las decisiones, la comunicación y el bienestar emocional. Afecta la manera en que te mueves por el mundo. Cuando confías más profundamente en ti mismo, la vida a menudo se siente menos intimidante y más significativa. La confianza crea libertad por dentro antes de cambiar nada por fuera.',
  'mindset.card.conf27.title':  'La confianza empieza donde la autoexigencia se suaviza.',
  'mindset.card.conf27.content':
    'Muchas personas intentan volverse seguras mientras, en silencio, rechazan partes de sí mismas. La confianza real crece cuando dejas de luchar contra tu propia humanidad y empiezas a aceptar quién eres — mientras sigues dejando espacio para crecer. La autoaceptación crea estabilidad emocional. No necesitas ser perfecta para merecer respeto propio. Ya lo mereces ahora.',
  'mindset.card.conf28.title':  'La confianza también se aprende viviendo.',
  'mindset.card.conf28.content':
    'Leer, planificar y pensar pueden construir confianza hasta cierto punto. La confianza real se desarrolla a través de la experiencia vivida. Cada conversación difícil, cada desafío, cada error y cada regreso fortalecen tu capacidad de confiar en ti mismo. La experiencia le enseña al sistema nervioso que puedes sobrevivir el malestar. Que puedes continuar. Que ya lo has hecho antes.',
  'mindset.card.conf29.title':  'Mostrarte, aunque dé miedo, también construye.',
  'mindset.card.conf29.content':
    'Evitar oportunidades, quedarte en silencio, hacerte pequeña puede sentirse emocionalmente seguro por un momento — pero a menudo refuerza la inseguridad con el tiempo. La confianza crece cuando te permites ser vista, escuchada y presente. Mostrarte construye resiliencia. Esconderse refuerza el miedo. No hace falta hacerlo perfecto — solo hacerlo.',
  'mindset.card.conf30.title':  'Haberlo intentado de verdad también cuenta.',
  'mindset.card.conf30.content':
    'La confianza se siente más sólida cuando sabes que genuinamente lo intentaste. Aunque los resultados sean imperfectos, el esfuerzo crea respeto interno. Muchas personas se sienten inseguras cuando se abandonan a sí mismas a la mitad de los desafíos. El esfuerzo honesto fortalece la identidad — independientemente del resultado. Haberlo intentado de verdad ya importa.',
  'mindset.card.conf31.title':  'La confianza también es confiar en tu capacidad de aprender.',
  'mindset.card.conf31.content':
    'No necesitas saber todo de antemano para avanzar. La confianza crece cuando confías en tu capacidad de adaptarte, aprender y mejorar con el tiempo. Las mentes inseguras creen que los errores las definen de forma permanente. Las mentes seguras ven los errores como lecciones temporales. Aprender también es una forma de sostenerse.',
  'mindset.card.conf32.title':  'Validarte a ti mismo también es una forma de confianza.',
  'mindset.card.conf32.content':
    'La aprobación externa puede sentirse reconfortante por un momento, pero depender de ella constantemente debilita la autoconfianza. La confianza se fortalece cuando empiezas a validarte internamente en lugar de necesitar aprobación para cada decisión. La autovalidación crea independencia emocional. La estabilidad interna reduce la ansiedad. No necesitas permiso para confiar en lo que eres.',

  // ── Courage card content (final 25: conf33–conf57) ────────────────────────
  'mindset.card.conf33.title':  'Cómo te hablas después de fallar también importa.',
  'mindset.card.conf33.content':
    'La mayoría de las personas son mucho más duras consigo mismas de lo que jamás serían con alguien que quieren. La autocrítica constante daña la resiliencia emocional. La confianza crece cuando aprendes a recuperarte del fracaso sin atacar tu propio valor. La compasión fortalece el coraje. Hablarte con suavidad después de un error no es excusarte — es sostenerte para poder continuar.',
  'mindset.card.conf34.title':  'La confianza se expande donde la comodidad se estrecha.',
  'mindset.card.conf34.content':
    'Las zonas de comodidad se sienten seguras, pero a menudo limitan el crecimiento. La confianza se desarrolla a través de la exposición repetida a situaciones desconocidas. Cada vez que superas el malestar, tu mente se vuelve menos temerosa ante el desafío. El crecimiento le enseña al sistema nervioso que la incertidumbre es sobrevivible. Y lo que sobrevives, lo conviertes en parte de ti.',
  'mindset.card.conf35.title':  'Avanzar sin saberlo todo también es confianza.',
  'mindset.card.conf35.content':
    'Algunas personas creen que deben tener todas las respuestas antes de actuar. Pero la confianza real a menudo significa permanecer tranquilo incluso sin certeza total. La vida siempre contendrá incógnitas. Las personas seguras confían en su capacidad de ir descubriendo el camino a medida que avanzan. No se necesita el mapa completo para dar el siguiente paso.',
  'mindset.card.conf36.title':  'Tu energía también moldea cómo te sientes por dentro.',
  'mindset.card.conf36.content':
    'La falta de sueño, el agotamiento, la mala salud y el cansancio pueden debilitar profundamente la confianza. Muchas luchas emocionales se intensifican cuando el sistema nervioso está saturado. Cuidar el bienestar físico sostiene la estabilidad emocional. Un cuerpo más descansado apoya una mente más clara. A veces, la confianza empieza por el descanso.',
  'mindset.card.conf37.title':  'Dejar de sobreexplicarte también es una forma de confianza.',
  'mindset.card.conf37.content':
    'La inseguridad a menudo crea la necesidad de justificar constantemente las decisiones, los comportamientos o los límites. La confianza te permite comunicarte con calma sin explicaciones excesivas. No necesitas que todos estén de acuerdo para confiar en tus elecciones. La simplicidad refleja la certeza interior. No siempre hace falta dar más explicaciones de las necesarias.',
  'mindset.card.conf38.title':  'No es la perfección lo que construye. Es el regreso.',
  'mindset.card.conf38.content':
    'Las personas perfectas no existen. La confianza más sólida a menudo pertenece a quienes aprendieron a recuperarse después de la vergüenza, los errores, el rechazo o los retrocesos. El regreso crea resiliencia. La capacidad de volver a levantarse cambia profundamente la percepción de uno mismo. No hace falta no caerse — hace falta volver.',
  'mindset.card.conf39.title':  'Ocupar tu lugar también requiere confianza.',
  'mindset.card.conf39.content':
    'La inseguridad a menudo lleva a las personas a minimizarse — emocionalmente, físicamente, socialmente. La confianza significa permitirte existir plenamente sin pedir disculpas por tu presencia. Tus pensamientos, tu voz y tu existencia importan. El valor propio crea una presencia más sólida. Ocupar el espacio que te corresponde no es arrogancia — es respeto propio.',
  'mindset.card.conf40.title':  'Dejar de imaginar el juicio ajeno también libera.',
  'mindset.card.conf40.content':
    'La mayoría de las personas están mucho más centradas en sí mismas que en analizarte constantemente. Pensar demasiado en el juicio social crea ansiedad e inseguridad innecesarias. La confianza crece cuando dejas de imaginar una crítica constante. La libertad aparece cuando la autoconciencia se vuelve más saludable y menos obsesiva. No todos están mirando — y los que miran, probablemente no están pensando lo que crees.',
  'mindset.card.conf41.title':  'Conocerte con honestidad también construye confianza.',
  'mindset.card.conf41.content':
    'Ignorar las debilidades no crea confianza real. La confianza verdadera incluye la capacidad de reconocer las propias imperfecciones con honestidad — sin derrumbarse emocionalmente. La autoconciencia crea crecimiento. La confianza madura equilibra la autoaceptación con la responsabilidad personal. No se trata de ser duro contigo mismo — sino de ser honesto.',
  'mindset.card.conf42.title':  'Resistir sin perder quién eres también es confianza.',
  'mindset.card.conf42.content':
    'La crítica, el rechazo y la decepción son partes inevitables de la vida. La confianza se fortalece cuando aprendes a no interpretar cada experiencia negativa como prueba de que no eres suficiente. La resiliencia emocional te permite continuar sin perder tu identidad. La estabilidad importa más que la perfección. Lo que te sostiene después de cada golpe es lo que construye tu confianza.',
  'mindset.card.conf43.title':  'El coraje llega después de actuar, no antes.',
  'mindset.card.conf43.content':
    'Muchas oportunidades desaparecen porque las personas esperan una certeza que nunca llega. La confianza a menudo se desarrolla después de la acción — no antes de ella. El crecimiento requiere movimiento a pesar del malestar. El coraje crea experiencia. La experiencia construye confianza. No hace falta sentirte lista para empezar — hace falta empezar para empezar a sentirte lista.',
  'mindset.card.conf44.title':  'Lo que preparas también te sostiene cuando llega el momento.',
  'mindset.card.conf44.content':
    'La preparación reduce la incertidumbre y aumenta la seguridad emocional. Practicar habilidades, organizarte y desarrollar competencia fortalecen la confianza de manera natural con el tiempo. La confianza se siente más estable cuando está respaldada por el esfuerzo. Lo que trabajas antes sostiene tu presencia cuando llega el momento.',
  'mindset.card.conf45.title':  'A veces, alejarte de lo que no te cuida también es confianza.',
  'mindset.card.conf45.content':
    'La baja autoestima a menudo lleva a las personas a tolerar situaciones, relaciones o faltas de respeto que no merecen. La confianza se fortalece cuando dejas de abandonar tus propias necesidades en busca de aceptación. Los límites protegen la salud emocional. El respeto propio cambia las decisiones. A veces, irse requiere más confianza que quedarse.',
  'mindset.card.conf46.title':  'El rechazo no es un veredicto sobre ti.',
  'mindset.card.conf46.content':
    'El rechazo duele a menudo porque los seres humanos desean naturalmente pertenencia y validación. Pero el rechazo no define tu valor ni tu potencial futuro. Las personas seguras entienden que no toda oportunidad ni toda relación está destinada a ellas. El rechazo a veces redirige la vida más de lo que la limita. No es un veredicto — es una redirección.',
  'mindset.card.conf47.title':  'El progreso, aunque sea pequeño, también merece ser visto.',
  'mindset.card.conf47.content':
    'El perfeccionismo mantiene a muchas personas sintiéndose inadecuadas porque nada parece nunca suficientemente bueno. La confianza crece más rápido cuando reconoces la mejora en lugar de centrarte solo en los defectos. El progreso merece reconocimiento. Los pequeños logros construyen impulso emocional. Verte avanzar — aunque sea despacio — también alimenta la confianza.',
  'mindset.card.conf48.title':  'Permanecer tú mismo cuando todo aprieta también es fortaleza.',
  'mindset.card.conf48.content':
    'Es fácil perder la autenticidad cuando intentas impresionar a otros o evitar el juicio. La confianza te permite mantenerte conectado a tus valores incluso en situaciones incómodas. La autenticidad crea paz interior. Pretender crea agotamiento emocional. Permanecer tú mismo bajo presión — sin renunciar a lo que eres — es una de las formas más silenciosas y más reales de fortaleza.',
  'mindset.card.conf49.title':  'Lo que te cierra también puede estar abriéndote otro camino.',
  'mindset.card.conf49.content':
    'Cada rechazo está protegiendo un camino que no era el tuyo, o preparándote para el que sí lo es. Las personas que más lejos han llegado tienen un historial de rechazos que intimidaría a cualquiera. Lo que las distingue no es el talento — es su manera de leer el rechazo. No como veredicto. Como señal. La pregunta que ayuda: ¿hacia dónde me está orientando esto?',
  'mindset.card.conf50.title':  'Tu historia es más grande que cualquier capítulo difícil.',
  'mindset.card.conf50.content':
    'Un error, un rechazo o una situación vergonzosa no define tu identidad. El pensamiento inseguro convierte a menudo experiencias temporales en etiquetas permanentes. La confianza crece cuando entiendes que un solo momento no puede borrar tu valor ni tu potencial. Los seres humanos evolucionan constantemente. Tu historia es más grande que cualquier capítulo difícil.',
  'mindset.card.conf51.title':  'Enfrentar lo que evitas también te libera despacio.',
  'mindset.card.conf51.content':
    'Las situaciones que evitas a menudo se convierten en las que más controlan tus emociones. La confianza se fortalece cuando confrontas gradualmente las conversaciones incómodas, los miedos y los desafíos en lugar de escapar de ellos. La evitación mantiene viva la inseguridad. La exposición debilita el miedo con el tiempo. El coraje crece con la repetición — despacio, pero de forma real.',
  'mindset.card.conf52.title':  'Tu voz también merece espacio.',
  'mindset.card.conf52.content':
    'Muchas personas silencian sus opiniones porque temen el juicio o el rechazo. La confianza crece cuando te permites expresar pensamientos con honestidad y respeto — sin filtrar constantemente tu identidad en busca de aprobación. Tu perspectiva tiene valor. Hablar de forma auténtica fortalece el respeto propio. Tu voz también merece espacio en la conversación.',
  'mindset.card.conf53.title':  'Nadie muestra toda su historia.',
  'mindset.card.conf53.content':
    'Las redes sociales y la comparación a menudo crean la ilusión de que los demás son más exitosos, atractivos o seguros. La confianza crece cuando recuerdas que cada persona tiene sus propias luchas — que no siempre se ven. Comparar tu vida real con la versión editada de otra persona distorsiona la realidad. Una perspectiva más anclada restaura el valor propio. Nadie muestra toda su historia.',
  'mindset.card.conf54.title':  'La soledad también puede ser un lugar de fortaleza.',
  'mindset.card.conf54.content':
    'Las personas que se sienten muy incómodas a solas a menudo dependen excesivamente de la validación externa y la distracción. La confianza crece cuando aprendes a disfrutar de tu propia compañía y a sentirte emocionalmente estable sin la atención constante de los demás. La soledad puede fortalecer la identidad. La paz interior crea una confianza más sólida. Estar bien a solas también es una forma de libertad.',
  'mindset.card.conf55.title':  'El perfeccionismo constante bloquea más de lo que protege.',
  'mindset.card.conf55.content':
    'El perfeccionismo a menudo crea parálisis, miedo al fracaso y autoduda crónica. La confianza crece más rápido cuando te permites ser imperfecto mientras sigues mejorando. El progreso importa más que la ejecución impecable. Los errores son parte del crecimiento — no prueba de que algo está mal en ti. Soltar el perfeccionismo constante no es bajar el listón — es dejar de bloquearte.',
  'mindset.card.conf56.title':  'Ser honesto sobre tus límites también es respetarte.',
  'mindset.card.conf56.content':
    'Decir sí a todo a menudo debilita el respeto propio y la energía emocional. La confianza se fortalece cuando eres honesto sobre tus límites, tus necesidades y tus prioridades. Los límites no son egoístas cuando protegen tu bienestar mental. Respetarte a ti mismo le enseña a tu mente que tus necesidades también importan. Lo que proteges también lo valoras.',
  'mindset.card.conf57.title':  'Cuando confías en ti, todo se experimenta diferente.',
  'mindset.card.conf57.content':
    'Cuando confías más profundamente en ti mismo, te acercas a las oportunidades, las relaciones y los desafíos de una manera diferente. La confianza crea libertad emocional porque dejas de necesitar una prueba constante de tu valor. Empiezas a arriesgarte más, a hablar con más honestidad, a vivir con más intención. La seguridad interior cambia el comportamiento exterior — despacio y de forma natural.',

  // ── Rest card content (first 5) ──────────────────────────────────────────
  'mindset.card.emo2.content':
    'Muchas personas sienten culpa cuando desaceleran. Pero el agotamiento no es una medalla de honor. El equilibrio emocional necesita recuperación, silencio y momentos de pausa. La presión constante drena la energía mental y emocional, de forma lenta y silenciosa. El descanso restaura la claridad. Una mente que descansa vive la vida con más calma.',
  'mindset.card.emo5.content':
    'Muchas personas evitan el malestar emocional manteniéndose ocupadas sin parar o sobreestimuladas. Pero las emociones sin resolver a menudo permanecen debajo de la distracción. La recuperación emocional necesita momentos de quietud y honestidad. La sanación suele empezar cuando dejas de huir de ti mismo. No hace falta tenerlo todo resuelto — solo dejar de correr por un momento.',
  'mindset.card.emo7.content':
    'Puedes estar emocionalmente agotada incluso cuando aparentas funcionar bien. El estrés constante, el pensamiento excesivo, el agradar a los demás y la supresión emocional drenan la energía en silencio con el tiempo. Reconocer que tu mundo interior también necesita cuidado es parte de la recuperación. El cansancio emocional es real. No necesita justificarse para merecer descanso.',
  'mindset.card.emo8.content':
    'El crecimiento emocional rara vez es lineal. Habrá días que se sentirán tranquilos, y otros que volverán a sentirse pesados. Sanar no significa no volver a luchar — significa aprender a atravesar las emociones difíciles con más suavidad y conciencia. El progreso a menudo ocurre despacio, por debajo de la superficie. Lo que no se ve también avanza.',
  'mindset.card.emo9.content':
    'Las mentes abrumadas a menudo intentan resolver todo de forma inmediata. La recuperación emocional empieza cuando dejas de cargar el futuro entero de una sola vez. Enfócate en lo que puede manejarse ahora. Los pequeños momentos de calma crean espacio para pensar con más claridad. Un paso a la vez también es suficiente. No tienes que llegar a todo hoy.',

  // ── Rest card content (final 16: emo14–emo59) ────────────────────────────
  'mindset.card.emo14.content':
    'El mundo moderno llena la mente de estímulos sin pausa. Y a veces lo que más necesitas no es más información, más ruido, más movimiento — sino silencio. Momentos sin nada que procesar. El sistema nervioso necesita quietud para recuperarse. El silencio no es vacío — es espacio. Y en ese espacio, las emociones más hondas encuentran lugar para asentarse.',
  'mindset.card.emo17.content':
    'Cuando la mente se siente abrumada, acelerar rara vez resuelve nada. Lo que a veces necesitas es exactamente lo contrario: bajar el ritmo, respirar despacio, dejar que las cosas se asienten. La lentitud crea espacio para ver con más claridad. Desacelerar no es perder el tiempo — es devolverle a la mente la posibilidad de pensar bien.',
  'mindset.card.emo22.content':
    'Dar sin parar, sostener a todos, estar siempre disponible — puede parecer generoso. Pero el agotamiento emocional no te convierte en mejor persona para quienes quieres. Cuidar de ti misma no es egoísmo. Es lo que permite que sigas dando con presencia real. Lo que repones en ti también llega a los demás.',
  'mindset.card.emo23.content':
    'Las agendas llenas, el ruido constante, la presión de estar siempre ocupada — desgastan la mente de forma silenciosa. A veces la recuperación emocional no viene de hacer más, sino de hacer menos. Soltar compromisos, reducir el ruido, bajar el ritmo. La simplicidad crea espacio para respirar. Y ese espacio también sana.',
  'mindset.card.emo24.content':
    'Habrá días que se sentirán más tranquilos, y días que volverán a sentirse pesados. Eso no borra lo que has avanzado. Sanar no es un camino recto — se mueve en oleadas. Lo que parece un retroceso a veces es parte del proceso. La sanación no se mide por la constancia perfecta, sino por la capacidad de seguir volviendo.',
  'mindset.card.emo25.content':
    'La presión constante de mejorar, rendir y crecer puede agotar emocionalmente el cerebro. No todo momento de vida necesita ser productivo. No toda pausa necesita justificarse. La mente también necesita suavidad, quietud y espacio sin propósito. La calma también importa. El descanso también importa. Y no tienes que ganártelo.',
  'mindset.card.emo33.content':
    'La exposición constante a tensión, conflicto, malas noticias y pesadez emocional desgasta el sistema nervioso despacio. A veces la recuperación emocional empieza por tomar distancia de lo que agota tu mundo interior. No es huir. Es proteger el espacio donde puedes volver a respirar.',
  'mindset.card.emo35.content':
    'Un sistema nervioso sobreestimulado mantiene el cuerpo en alerta, en tensión, sin soltar. La recuperación emocional empieza cuando creas calma deliberadamente — con la respiración, el descanso, el silencio, la quietud. La seguridad interior no llega sola. A veces hay que construirla despacio. Y desde ahí, la sanación encuentra espacio.',
  'mindset.card.emo37.content':
    'Fingir que estás bien cuando por dentro estás agotada no protege — solo aplaza. La recuperación emocional comienza cuando te permites reconocer lo que realmente sientes, sin presión de que sea diferente. Nombrar lo que hay es el primer paso para aflojar. La honestidad no es una carga. A veces es el descanso más hondo que existe.',
  'mindset.card.emo43.content':
    'La sanación emocional no siempre se ve dramática ni evidente. A veces parece reaccionar con menos peso, descansar más hondo, recuperarte más deprisa de los momentos difíciles. Esos pequeños movimientos internos importan. El progreso silencioso también es progreso. Lo que va cambiando por dentro, aunque no se vea, también cuenta.',
  'mindset.card.emo44.content':
    'Cuando la mente está emocionalmente desbordada, tiende a leer las situaciones con más peso, más oscuridad, menos posibilidad. No porque sea la realidad — sino porque el agotamiento distorsiona la perspectiva. Reconocer que quizás lo que ves ahora está coloreado por el cansancio también es una forma de cuidarte. El descanso devuelve la claridad. Una mente descansada ve diferente.',
  'mindset.card.emo46.content':
    'Muchas personas sienten que no pueden detenerse hasta haberlo "merecido". Pero el descanso no es un premio al final del esfuerzo — es parte de lo que te sostiene. Los seres humanos necesitan recuperación de forma natural. No tienes que ganarte el derecho a pausar. La pausa no se justifica. Simplemente se necesita. Y eso es suficiente.',
  'mindset.card.emo51.content':
    'No toda relación, hábito o entorno apoya el bienestar emocional. A veces la recuperación emocional requiere crear distancia de lo que daña repetidamente la paz interior. Protegerte no es abandono. Es cuidado. Alejarte de lo que te hace daño también es una forma de volver a ti misma.',
  'mindset.card.emo52.content':
    'Tomarte tiempo para recuperarte emocionalmente no es señal de fragilidad. Requiere honestidad, conciencia y una dosis real de valentía. Ignorar el dolor emocional no crea fortaleza — solo lo aplaza. La sanación construye una resiliencia más sólida que cualquier resistencia forzada. Cuidarte con profundidad también es un acto de coraje.',
  'mindset.card.emo54.content':
    'Algunas heridas emocionales tardaron años en formarse. No pueden deshacerse en días. La recuperación emocional crece a través de la conciencia sostenida, no de la perfección apresurada. A veces sanar significa soltar la urgencia de ya estar bien. La paciencia contigo misma también es parte del proceso. Y ese proceso, despacio, también funciona.',
  'mindset.card.emo59.content':
    'Muchas personas se exigen estar siempre rindiendo, mejorando, sintiéndose bien. Pero la presión constante de ser productiva, positiva y emocionalmente fuerte agota. La recuperación emocional empieza cuando te das permiso de ser humana — sin performance, sin exigencia de que cada día sea perfecto. La calma crece cuando la presión afloja. Y aflojar también es una forma de descansar.',

  // ── Calm card content (first 5) ──────────────────────────────────────────
  'mindset.card.m5.content':
    'Las emociones no son obstáculos para pensar con claridad — son información. La frustración señala algo bloqueado. La ansiedad señala un riesgo que no ha tenido espacio. La tristeza señala una pérdida que merece atención. El problema no es sentir emociones — es ser arrastrado por ellas sin darse cuenta. La práctica es simple: nombra lo que sientes, busca su origen, y decide cómo responder. Con calma.',
  'mindset.card.m11.content':
    'Una de las comprensiones más liberadoras es esta: no todo el mundo va a aprobarte, y eso no es un problema que te corresponda resolver. La búsqueda constante de aprobación es, en el fondo, un alejamiento de uno mismo. Cuando tomas decisiones desde quien quieres ser — y no desde quien otros esperan — encuentras una libertad que ninguna validación externa puede darte. Quienes merecen acompañarte en el recorrido reconocerán esa autenticidad.',
  'mindset.card.m17.content':
    'Sostener el resentimiento, el arrepentimiento o el deseo de que las cosas sean distintas consume una cantidad inmensa de energía interna. Soltar no es aprobar lo que ocurrió — es dejar ir el peso para poder seguir. No se hace una sola vez. Es una práctica diaria. Hoy, elige una cosa que llevas apretada y decide, por hoy, depositarla. Solo por hoy.',
  'mindset.card.emo1.content':
    'Un día difícil no define todo lo que eres. El regreso emocional empieza cuando dejas de creer que los errores, los retrocesos o el agotamiento te definen de forma permanente. Cada nuevo momento ofrece una oportunidad para comenzar de otra manera. Sanar suele empezar con darte permiso de volver sin vergüenza.',
  'mindset.card.emo3.title':    'Tus emociones no son enemigas.',
  'mindset.card.emo3.content':
    'Las emociones no son problemas que eliminar. Son información sobre lo que ocurre dentro de ti. El regreso emocional sucede cuando dejas de combatir cada sensación y empiezas a escucharla con calma. La tristeza, la frustración, el miedo, el agobio — a menudo señalan necesidades que no han tenido espacio. La conciencia crea apertura. La apertura crea regreso.',

  // ── Calm card content (next 30: emo4–emo49) ──────────────────────────────
  'mindset.card.emo4.title':   'Los pensamientos pasan. Tú observas.',
  'mindset.card.emo4.content':
    'La mente produce miles de pensamientos al día, muchos de ellos cargados de miedo, inseguridad o cansancio acumulado. No todos merecen tu adhesión. Aprender a observar un pensamiento sin creerlo de inmediato es una forma de calma. Los pensamientos son eventos pasajeros — no son la realidad, ni son tú. La distancia crea claridad. La quietud crea espacio.',
  'mindset.card.emo6.title':   'Respirar despacio ya es hacer algo.',
  'mindset.card.emo6.content':
    'Cuando el estrés aumenta, el sistema nervioso entra en modo de alerta. Respirar despacio le dice al cuerpo que hay espacio, que no hay urgencia. La calma emocional no siempre empieza por resolver algo — a veces empieza por respirar de otra manera. Una respiración lenta no cambia los problemas. Pero cambia el espacio desde el que los miras.',
  'mindset.card.emo10.title':  'Soltar no es olvidar. Es elegir no cargar.',
  'mindset.card.emo10.content':
    'Mantener el resentimiento, el arrepentimiento o el dolor más tiempo del necesario agota la mente en silencio. A veces, la recuperación emocional comienza por soltar lo que ya no puede cambiar. Soltar no es olvidar — es dejar de cargar un peso que no te pertenece seguir sosteniendo. Cuando sueltas, aparece espacio. Y en ese espacio, puede entrar algo más suave.',
  'mindset.card.emo11.title':  'Tu sistema nervioso también necesita calma.',
  'mindset.card.emo11.content':
    'El estrés constante mantiene el cuerpo en estado de alerta — agotado, pero sin poder descansar del todo. La recuperación emocional a menudo empieza por crear entornos, rutinas y relaciones que se sientan seguros. La seguridad le permite a la mente volver a relajarse. No todo puede resolver el estrés. Pero sí puedes cuidar el espacio desde donde lo vives.',
  'mindset.card.emo12.title':  'Decir no también es cuidarte.',
  'mindset.card.emo12.content':
    'Decir sí a todo suele llevar al desbordamiento. Los límites protegen la energía mental y la estabilidad emocional. La recuperación emocional incluye reconocer cuándo tu energía se drena más deprisa de lo que se restaura. Proteger tu paz no es egoísmo — es la condición para seguir presente. Lo que cuidas permanece.',
  'mindset.card.emo13.title':  'Eres más que lo que sientes ahora.',
  'mindset.card.emo13.content':
    'Las emociones difíciles pueden sentirse enormes, pero son experiencias temporales — no son tú. La recuperación emocional ocurre cuando dejas de definirte completamente por cómo te sientes en un momento. Los sentimientos pasan. Tu valor no. Lo que estás sintiendo hoy no es el resultado final de quien eres.',
  'mindset.card.emo15.title':  'Contigo también puedes ser suave.',
  'mindset.card.emo15.content':
    'Muchas personas ofrecen amabilidad a los demás mientras se hablan a sí mismas con dureza. La recuperación emocional se vuelve más difícil bajo la crítica constante. Aprender a responderte con más paciencia — con la misma suavidad que darías a alguien que quieres — no es debilidad. Es una de las formas más profundas de cuidado.',
  'mindset.card.emo16.title':  'Sufrir no es sinónimo de estar roto.',
  'mindset.card.emo16.content':
    'Luchar emocionalmente no significa ser débil ni estar roto. Los seres humanos atraviesan duelo, estrés, confusión, miedo y tristeza como parte natural de la vida. La recuperación emocional empieza cuando dejas de tratar el dolor como evidencia de que no eres suficiente. La dificultad es parte de ser humano — no una señal de fracaso.',
  'mindset.card.emo18.title':  'La comparación silencia tu propio recorrido.',
  'mindset.card.emo18.content':
    'Comparar constantemente tu vida, tu proceso, tu manera de sanar con el de los demás crea un agotamiento sutil pero real. La recuperación emocional crece cuando la atención regresa a tu propio recorrido. Todos cargan con algo que no se ve. La comparación distorsiona la realidad. Lo que importa es lo que está pasando dentro de ti.',
  'mindset.card.emo19.title':  'El cuerpo también guarda lo que no se dice.',
  'mindset.card.emo19.content':
    'El estrés no es solo mental — afecta al cuerpo entero. La tensión, el cansancio, las molestias físicas, la respiración superficial, el entumecimiento emocional — a menudo son señales de que el sistema nervioso lleva demasiado. La recuperación emocional incluye cuidar el cuerpo, no solo la mente. A veces, lo que más necesitas no es pensar más, sino descansar de verdad.',
  'mindset.card.emo20.title':  'Puedes sentir cosas contradictorias a la vez.',
  'mindset.card.emo20.content':
    'Las emociones humanas son complejas. Puedes sentirte agradecido y abrumado, esperanzado y asustado, en proceso de sanar y dolido — al mismo tiempo. La recuperación emocional incluye permitir esa complejidad sin juzgarte por ella. Las emociones contradictorias no son una señal de confusión. Son una señal de que eres humano.',
  'mindset.card.emo21.title':  'La honestidad contigo mismo abre espacio.',
  'mindset.card.emo21.content':
    'Suprimir emociones no las elimina — las aplaza. La recuperación emocional comienza cuando eres honesto sobre lo que realmente sientes, en lugar de pretender constantemente que todo está bien. No tienes que tenerlo todo resuelto para reconocer cómo te sientes. La honestidad crea espacio. La conciencia crea algo parecido al alivio.',
  'mindset.card.emo26.title':  'Ser fuerte también significa poder abrirse.',
  'mindset.card.emo26.content':
    'Muchas personas confunden la fortaleza emocional con la supresión emocional. La verdadera fortaleza incluye honestidad, apertura y la capacidad de reconocer lo que duele sin vergüenza. La vulnerabilidad no es debilidad — es la condición desde la que la sanación más profunda puede ocurrir. La apertura crea conexión. La honestidad construye algo duradero.',
  'mindset.card.emo27.title':  'El pasado influyó. El presente también puede.',
  'mindset.card.emo27.content':
    'Las experiencias pasadas pueden moldear los hábitos emocionales, pero no controlan el futuro de forma permanente. La recuperación emocional comienza cuando te das cuenta de que nuevos patrones pueden aprenderse, despacio, con repetición. La conciencia crea elección. Y la elección repetida, con paciencia, crea cambio real.',
  'mindset.card.emo28.title':  'La calma también se aprende.',
  'mindset.card.emo28.content':
    'La calma emocional no es algo que se tiene o no se tiene por naturaleza. Se desarrolla a través de prácticas repetidas: respirar conscientemente, desacelerar, reflexionar, establecer límites, observar lo que se siente sin reaccionar de inmediato. La calma se fortalece con la repetición intencional. No es un destino — es un hábito que se construye despacio.',
  'mindset.card.emo29.title':  'El presente aquieta el ruido.',
  'mindset.card.emo29.content':
    'Pensar demasiado en el futuro y revivir el pasado constantemente tiran de la atención hacia afuera del momento presente. La recuperación emocional crece cuando vuelves a conectar con lo que está pasando ahora, en lugar de vivir dentro del ruido mental. La presencia calma el sistema nervioso. Estar aquí, aunque sea por un momento, ya es una forma de descanso.',
  'mindset.card.emo30.title':  'Proteger tu paz es una forma de respeto propio.',
  'mindset.card.emo30.content':
    'No todo entorno, conversación o relación merece acceso ilimitado a tu energía emocional. La recuperación emocional a veces significa elegir distancia de lo que daña repetidamente tu bienestar mental. Proteger tu paz no es frialdad. Es una forma de respeto hacia ti mismo — y hacia todo lo que quieres sostener.',
  'mindset.card.emo31.title':  'Algunas emociones estaban para sentirse, no para cargarse.',
  'mindset.card.emo31.content':
    'Algunas emociones estaban destinadas a sentirse, comprenderse y, con el tiempo, soltarse — no a cargarse indefinidamente. La recuperación emocional empieza cuando dejas de identificarte con el dolor de forma tan intensa que se convierte en parte de tu identidad permanente. Sanar crea espacio para que emociones más suaves puedan existir también. No tienes que seguir siendo quien fue lastimado.',
  'mindset.card.emo32.title':  'La conciencia interrumpe el piloto automático.',
  'mindset.card.emo32.content':
    'Muchas reacciones emocionales ocurren de forma automática porque se repitieron durante años sin reflexión. La recuperación emocional empieza cuando te detienes el tiempo suficiente para notar tus patrones, en lugar de reaccionar sin pensarlo. La observación interrumpe el piloto automático emocional. La conciencia abre la posibilidad de algo diferente.',
  'mindset.card.emo34.title':  'Puedes crecer más allá de lo que una vez te protegió.',
  'mindset.card.emo34.content':
    'Algunos hábitos emocionales te ayudaron a sobrevivir experiencias difíciles — pero puede que ya no sirvan a la vida que tienes ahora. La recuperación emocional incluye permitirte evolucionar emocionalmente sin culpa. Crecer a veces requiere soltar viejos mecanismos de defensa. No les debes lealtad eterna. El cambio es parte de sanar.',
  'mindset.card.emo36.title':  'Entre lo que sientes y lo que haces puede haber espacio.',
  'mindset.card.emo36.content':
    'Las emociones fuertes a menudo crean el impulso de reaccionar de inmediato. La recuperación emocional crece cuando aprendes a pausar antes de responder. La reflexión calma evita arrepentimientos innecesarios. El espacio entre lo que sientes y lo que haces no es debilidad — es donde vive la madurez emocional.',
  'mindset.card.emo38.title':  'Sentirse perdido no es estar roto.',
  'mindset.card.emo38.content':
    'Los períodos de confusión, incertidumbre o peso emocional son partes normales de la vida. La recuperación emocional comienza cuando dejas de interpretar la dificultad emocional temporal como prueba de que algo está permanentemente mal en ti. Los momentos de perderse no borran tu valor. Estar perdido es pasar por algo — no ser algo.',
  'mindset.card.emo39.title':  'La paz empieza donde la resistencia se suaviza.',
  'mindset.card.emo39.content':
    'Luchar constantemente contra la realidad crea un agotamiento emocional profundo. La recuperación emocional a veces significa aceptar lo que no puede cambiar en este momento, en lugar de resistirlo mentalmente de forma interminable. La aceptación crea espacio para respirar. La paz suele empezar exactamente donde la resistencia empieza a suavizarse.',
  'mindset.card.emo40.title':  'Mereces un entorno emocionalmente seguro.',
  'mindset.card.emo40.content':
    'Los entornos llenos de crítica constante, imprevisibilidad o manipulación emocional dañan el bienestar mental de forma lenta y silenciosa. La recuperación emocional incluye reconocer que la seguridad emocional importa profundamente. Las relaciones y los espacios tranquilos sostienen el proceso de sanación. Mereces lugares — y personas — donde puedas soltar la guardia.',
  'mindset.card.emo41.title':  'Tus emociones merecen atención, no vergüenza.',
  'mindset.card.emo41.content':
    'Muchas personas aprendieron a suprimir las emociones por miedo a parecer débiles o difíciles. La recuperación emocional empieza cuando dejas de juzgarte con dureza por tener emociones humanas. Los sentimientos merecen ser entendidos antes de ser corregidos. La compasión hacia lo que sientes — sin juicio — es una de las formas más directas de sanar.',
  'mindset.card.emo42.title':  'La mente sobreocupada también necesita soltar.',
  'mindset.card.emo42.content':
    'El pensamiento constante llena la mente de ruido emocional. La recuperación emocional crece cuando simplificas tus pensamientos en lugar de revivir mentalmente cada problema una y otra vez. Las mentes tranquilas procesan las emociones con más claridad. Soltar el exceso mental no es rendirse — es hacer espacio para que la quietud entre.',
  'mindset.card.emo45.title':  'La forma en que te hablas también importa.',
  'mindset.card.emo45.content':
    'La manera en que te hablas a ti mismo influye profundamente en la recuperación emocional. La crítica interna dura aumenta la tensión y la inseguridad. Un lenguaje interno más suave crea seguridad emocional. Los pensamientos compasivos sostienen la resiliencia. No tienes que convencerte de que todo está bien — solo de que mereces suavidad, incluso cuando es difícil.',
  'mindset.card.emo47.title':  'No tienes que absorber el peso emocional de todos.',
  'mindset.card.emo47.content':
    'Absorber el estrés, la negatividad o el caos emocional de los demás acaba siendo abrumador. La recuperación emocional a veces significa limitar la exposición a situaciones que drenan tu energía de forma constante. Proteger tu energía crea estabilidad. Los límites no alejan a las personas — preservan el espacio desde el que puedes estar presente de verdad.',
  'mindset.card.emo48.title':  'Tienes permiso de sentirte bien de nuevo.',
  'mindset.card.emo48.content':
    'Algunas personas se aferran inconscientemente al sufrimiento porque el dolor se volvió familiar — incluso protector. La recuperación emocional incluye permitirte experimentar paz, alegría y ligereza sin culpa. Sentirte bien no traiciona lo que atravesaste. Sanar no es olvidar — es dejar que algo más suave también tenga lugar.',
  'mindset.card.emo49.title':  'La cura emocional vive en el presente.',
  'mindset.card.emo49.content':
    'Revivir el pasado constantemente o temer el futuro aumenta el agobio emocional. La recuperación emocional crece cuando la atención regresa al momento presente. La presencia calma el sistema nervioso. Este momento — ahora mismo — suele ser más manejable de lo que los futuros imaginados hacen creer.',

  // ── Calm card content (final 7: emo50–emo60) ─────────────────────────────
  'mindset.card.emo50.title':  'El cuerpo también avisa antes que la mente.',
  'mindset.card.emo50.content':
    'El cuerpo a menudo revela el estrés emocional antes de que la mente lo reconozca del todo. La tensión, el cansancio, la irritabilidad, el entumecimiento emocional — son señales importantes. La conciencia emocional incluye también la conciencia física. Tu cuerpo no miente. Aprender a escucharlo es una forma de cuidado.',
  'mindset.card.emo53.title':  'La calma puede sentirse extraña antes de sentirse natural.',
  'mindset.card.emo53.content':
    'El estrés crónico puede entrenar al sistema nervioso para permanecer constantemente alerta y tenso. La recuperación emocional incluye reentrenar la mente y el cuerpo para reconocer los momentos de seguridad, calma y estabilidad. La paz puede sentirse extraña al principio — especialmente si el estrés fue durante mucho tiempo el estado habitual. La quietud es algo que vuelve, poco a poco.',
  'mindset.card.emo55.title':  'Soltar el control también es una forma de cuidarte.',
  'mindset.card.emo55.content':
    'Intentar controlar cada resultado posible crea un agotamiento emocional profundo. La recuperación emocional empieza cuando te enfocas más en la presencia y la adaptabilidad que en el control perfecto. Soltar no es rendirse — es dejar de gastar energía en lo que no depende de ti. La flexibilidad fortalece la paz. Hay descanso en lo que se deja ir.',
  'mindset.card.emo56.title':  'La calma interior no espera al exterior.',
  'mindset.card.emo56.content':
    'Las situaciones externas no siempre se calman de inmediato. Pero la calma interior puede desarrollarse de todas formas, de manera gradual. La recuperación emocional se fortalece cuando practicas desacelerar tus pensamientos, respirar con profundidad, responder con intención. La paz interior no cambia las circunstancias — cambia la forma en que las vives.',
  'mindset.card.emo57.title':  'Tu proceso emocional tiene su propio tiempo.',
  'mindset.card.emo57.content':
    'La sanación no ocurre según un calendario universal. Comparar tu crecimiento emocional con el de los demás crea una presión innecesaria. La recuperación emocional crece cuando respetas tu propio ritmo en lugar de apresurarte. No estás atrasado. Estás en tu recorrido. Y ese recorrido es profundamente tuyo.',
  'mindset.card.emo58.title':  'La estabilidad emocional se construye día a día.',
  'mindset.card.emo58.content':
    'Los pequeños hábitos calmantes practicados de forma repetida crean una mayor resiliencia emocional con el tiempo. El sueño, la reflexión, los límites, la respiración, el movimiento, la conciencia propia — todo ello fortalece la regulación emocional gradualmente. La estabilidad se construye en lo cotidiano. No se necesita perfección — se necesita presencia sostenida.',
  'mindset.card.emo60.title':  'La calma es una forma de fortaleza.',
  'mindset.card.emo60.content':
    'La reactividad emocional constante crea agotamiento e inestabilidad. Las personas calmas no están emocionalmente dormidas — han aprendido a pausar, a respirar, a responder con intención en lugar de reaccionar por impulso. La calma no es indiferencia. Es una forma de fortaleza que, con el tiempo, cambia cada área de la vida.',

  // ── Focus card content (first 5) ─────────────────────────────────────────
  'mindset.card.m1.content':
    'La atención se dispersa cuando se divide. Cada vez que cambias de tarea, tu mente tarda un promedio de 23 minutos en volver a estar del todo presente. Las personas que más avanzan no son las que hacen más cosas. Son las que hacen una sola cosa, con toda su presencia. Empieza cada sesión eligiendo lo único que no puede quedar sin hacer. Aparta lo demás. Cuando termines, y solo entonces, sigues.',
  'mindset.card.m7.content':
    'El cuerpo tiene su propio ritmo — ciclos de unos 90 minutos de alta y baja energía. Trabajar con esos ciclos, en lugar de ignorarlos, cambia profundamente cómo rinde la mente. Trabaja 90 minutos con toda tu presencia. Luego descansa de verdad: camina, cierra los ojos, para — sin pantalla. Regresa renovado. No es un truco. Es como tu mente fue diseñada para funcionar.',
  'mindset.card.m13.content':
    'Pregúntate: "¿Qué única cosa podría hacer hoy tal que, al hacerla, todo lo demás se volviese más fácil o innecesario?" Esta pregunta, aplicada a tu trabajo, tus relaciones, tu salud, atraviesa el ruido. La respuesta casi siempre es obvia cuando te la haces en serio. Haz esa única cosa primero, cada día, y observa cómo tu vida empieza a organizarse alrededor de lo que realmente importa.',
  'mindset.card.m19.content':
    'El trabajo profundo es la capacidad de concentrarse sin interrupciones en tareas que exigen presencia real. Es escaso en este mundo distraído — y cada vez más valioso. Lo que separa a quienes crean algo de los que solo están ocupados es, precisamente, esa capacidad de entrar hondo. Desarrolla tu profundidad como un músculo: empieza con sesiones cortas y expande el tiempo gradualmente.',
  'mindset.card.focus1.title':   'Lo superficial te ocupa. Lo profundo te transforma.',
  'mindset.card.focus1.content':
    'Lo superficial te mantiene ocupado. Lo profundo cambia tu vida. El crecimiento real sucede cuando te sumerges, sin interrupciones, en algo que importa de verdad. La capacidad de concentrarse en profundidad se vuelve más escasa — y más valiosa. Muchas personas no llegan hasta donde podrían porque se interrumpen constantemente a sí mismas. Los períodos largos de presencia crean resultados que los momentos dispersos nunca producen.',

  // ── Focus card content (next 30: focus2–focus31) ──────────────────────────
  'mindset.card.focus2.title':   'Primero, quita. Después, mejora.',
  'mindset.card.focus2.content':
    'Muchas personas buscan concentrarse mejor sin quitarle nada a su vida. Pero el enfoque mejora más deprisa eliminando que optimizando. Antes de añadir nuevos sistemas o herramientas, retira lo que drena tu atención. Las pestañas abiertas, las notificaciones, los compromisos que no recuerdas haber elegido — consumen energía en silencio. La simplicidad crea espacio para la presencia.',
  'mindset.card.focus3.title':   'Concentrarse se entrena.',
  'mindset.card.focus3.content':
    'La concentración no es algo que tienes o no tienes — es una habilidad que se fortalece con la práctica. Cada vez que resistes una distracción, entrenas tu mente para quedarse presente un poco más. Los pequeños momentos diarios de disciplina construyen una resistencia mental duradera. El mundo moderno debilita la atención a propósito. Concentrarse es entrenar en la dirección contraria.',
  'mindset.card.focus4.title':   'Termina antes de empezar lo siguiente.',
  'mindset.card.focus4.content':
    'Empezar cosas constantemente sin terminarlas crea ruido mental. Cada tarea incompleta queda abierta en la mente y consume energía sin que lo notes. El enfoque crece cuando terminas antes de saltar hacia lo próximo. Terminar genera impulso, claridad y algo parecido a la confianza. El hábito de completar vale más que la emoción de empezar siempre de nuevo.',
  'mindset.card.focus5.title':   'Tu entorno moldea tu mente.',
  'mindset.card.focus5.content':
    'El enfoque está profundamente influenciado por lo que te rodea. Los espacios desordenados suelen crear pensamientos desordenados. Las notificaciones, el ruido, las distracciones visuales fragmentan la atención durante todo el día, en silencio. Un entorno tranquilo ayuda a la mente a permanecer tranquila. Diseñar tu espacio con intención hace que concentrarse se sienta más natural.',
  'mindset.card.focus6.title':   'La energía importa más que el tiempo.',
  'mindset.card.focus6.content':
    'Tener más horas no sirve de nada si la mente está agotada. El enfoque depende más de la frescura mental que del tiempo disponible. Proteger el sueño, reducir la sobreestimulación y tomarte descansos reales mejoran la concentración de forma notable. Una hora enfocada vale más que cinco distraídas. Antes de gestionar el tiempo, gestiona la energía.',
  'mindset.card.focus7.title':   'Deja de consumir sin parar.',
  'mindset.card.focus7.content':
    'La mente no puede concentrarse en profundidad si está constantemente saturada de estímulos. El scroll interminable, los vídeos, las notificaciones entrenan la mente para buscar algo nuevo cada pocos segundos. El silencio y la quietud fortalecen la concentración. El enfoque necesita espacio para pensar. A veces, la mejor estrategia es simplemente consumir menos.',
  'mindset.card.focus8.title':   'La prisa destruye la precisión.',
  'mindset.card.focus8.content':
    'Correr crea errores, estrés y fragmentación mental. La calma produce mejores decisiones que la velocidad frenética. Muchas personas confunden el pánico con la productividad, pero la urgencia constante debilita la atención. Desacelerar lo suficiente para pensar con claridad antes de actuar — eso es lo que distingue al enfoque real. La precisión suele ahorrar más tiempo que la rapidez.',
  'mindset.card.focus9.title':   'Presencia es rendimiento.',
  'mindset.card.focus9.content':
    'Cuando tu atención está plenamente presente, incluso las acciones simples se vuelven más efectivas. El trabajo a medias produce resultados a medias. Estar mentalmente ausente mientras trabajas aumenta la fatiga, porque la mente salta constantemente entre pensamientos. El enfoque es aprender a llegar del todo al momento en que estás. La presencia mejora tanto el rendimiento como la paz interior.',
  'mindset.card.focus10.title':   'Una decisión a la vez.',
  'mindset.card.focus10.content':
    'El agotamiento mental a menudo viene de tomar demasiadas pequeñas decisiones. Cada elección consume energía a lo largo del día. Simplificar las rutinas libera más atención para lo que importa. Cuanto menos ruido mental creas, más claridad te queda disponible. Las personas enfocadas reducen las decisiones innecesarias siempre que pueden.',
  'mindset.card.focus11.title':   'La disciplina protege el enfoque.',
  'mindset.card.focus11.content':
    'La motivación cambia constantemente, pero la disciplina protege la constancia. El enfoque se fortalece cuando te comprometes a trabajar incluso cuando las distracciones llaman. La capacidad de permanecer con las tareas difíciles construye una resistencia mental que se acumula con el tiempo. No se espera a estar listo. Se empieza, y el ritmo llega solo.',
  'mindset.card.focus12.title':   'El silencio como ventaja.',
  'mindset.card.focus12.content':
    'La vida moderna está llena de ruido constante — notificaciones, opiniones, contenido, interrupciones. El silencio devuelve al cerebro el espacio para pensar con profundidad. Muchos momentos de claridad llegan cuando la mente por fin se aquieta lo suficiente para procesar con calma. El enfoque prospera en entornos tranquilos. El silencio restaura la agudeza mental.',
  'mindset.card.focus13.title':   'El enfoque necesita límites.',
  'mindset.card.focus13.content':
    'Cada "sí" a la distracción es un "no" a lo que importa. Las personas enfocadas protegen su tiempo con límites claros. No todo mensaje merece una respuesta inmediata. No toda oportunidad merece tu atención. Proteger tu espacio mental es esencial para avanzar de verdad.',
  'mindset.card.focus14.title':   'El movimiento vence al análisis.',
  'mindset.card.focus14.content':
    'El pensamiento excesivo suele desaparecer cuando el movimiento comienza. La mente tiende a exagerar la dificultad de las tareas antes de empezarlas. La acción crea claridad más deprisa que el análisis interminable. El enfoque mejora cuando dejas de negociar contigo mismo y simplemente empiezas. El pequeño progreso silencia la resistencia mental.',
  'mindset.card.focus15.title':   'El descanso mejora la concentración.',
  'mindset.card.focus15.content':
    'El trabajo constante sin recuperación debilita el enfoque con el tiempo. La mente necesita pausas para resetear la atención y procesar la información. El descanso no es pereza — es parte del rendimiento sostenido. Una mente descansada piensa con más claridad. El regreso después del descanso es más profundo que el que viene del agotamiento.',
  'mindset.card.focus16.title':   'Entrena tu mente para quedarse.',
  'mindset.card.focus16.content':
    'Las distracciones modernas entrenan al cerebro para buscar estimulación sin parar. Reenfocar requiere reentrenar la atención para quedarse con una sola cosa más tiempo. Al principio puede sentirse incómodo — la mente está acostumbrada a la interrupción. Pero esa incomodidad es parte del fortalecimiento. Quedarse mentalmente presente es una de las habilidades más valiosas que existen.',
  'mindset.card.focus17.title':   'Las pequeñas distracciones crean grandes retrasos.',
  'mindset.card.focus17.content':
    'Una notificación rápida puede parecer inofensiva, pero las pequeñas interrupciones rompen el flujo mental. Después de una distracción, la mente tarda un tiempo considerable en volver a concentrarse del todo. Las interrupciones pequeñas repetidas a lo largo del día destruyen el ritmo en silencio. Proteger la concentración significa respetar lo frágil que realmente es el enfoque profundo.',
  'mindset.card.focus18.title':   'El aburrimiento construye atención.',
  'mindset.card.focus18.content':
    'El entretenimiento constante debilita la capacidad de tolerar la quietud. Sin embargo, el aburrimiento suele convertirse en la puerta hacia la creatividad, la reflexión y el pensamiento profundo. Las personas enfocadas no temen los momentos tranquilos. Dejar que la mente se quede sin estimulación fortalece la atención de forma natural. La creatividad suele aparecer cuando la distracción desaparece.',
  'mindset.card.focus19.title':   'El enfoque crea confianza.',
  'mindset.card.focus19.content':
    'La confianza no viene solo del éxito — también viene de saber que puedes controlar tu atención. Cada sesión enfocada fortalece la confianza en ti mismo. Cuando completas con regularidad el trabajo importante, la mente empieza a creer en tu disciplina. El enfoque construye el respeto propio con el tiempo.',
  'mindset.card.focus20.title':   'Simplifica lo que importa.',
  'mindset.card.focus20.content':
    'Intentar priorizar todo significa no priorizar nada. El enfoque mejora cuando identificas qué es lo que más importa ahora mismo. Demasiados objetivos crean energía dividida y atención dispersa. La simplicidad afina la ejecución. Las prioridades claras crean un impulso más sólido.',
  'mindset.card.focus21.title':   'Tu teléfono compite por tu mente.',
  'mindset.card.focus21.content':
    'La mayoría de las plataformas digitales están diseñadas para capturar y retener tu atención el mayor tiempo posible. Cada notificación innecesaria aleja tu mente del trabajo que importa. Controlar la tecnología con intención, en lugar de dejar que te controle a ti — eso marca la diferencia. Proteger tu atención es proteger lo que quieres construir.',
  'mindset.card.focus22.title':   'El enfoque también es emocional.',
  'mindset.card.focus22.content':
    'La distracción no siempre viene de la tecnología. A veces la mente evita el enfoque por estrés, miedo, saturación o malestar emocional. Aprender a regular las emociones mejora la concentración de forma notable. La calma interior crea una mente más tranquila. La estabilidad interna fortalece el rendimiento externo.',
  'mindset.card.focus23.title':   'La repetición construye maestría.',
  'mindset.card.focus23.content':
    'La maestría rara vez viene de la intensidad sola. Viene de la repetición enfocada a lo largo del tiempo. Cada sesión de práctica profunda fortalece lo que vas construyendo. La constancia enfocada siempre supera al esfuerzo disperso. Las mejoras pequeñas se acumulan despacio — y después, de golpe.',
  'mindset.card.focus24.title':   'Desacelera para pensar mejor.',
  'mindset.card.focus24.content':
    'El pensamiento rápido es útil en emergencias. El pensamiento profundo requiere lentitud. Muchas personas reaccionan al instante sin darse espacio para pensar con claridad. Pausar lo suficiente para observar, reflexionar y elegir con intención — eso es lo que mejora las decisiones. Pensar mejor lleva a actuar mejor.',
  'mindset.card.focus25.title':   'Protege tu energía mental.',
  'mindset.card.focus25.content':
    'Tu mente tiene un ancho de banda limitado cada día. El estrés, el desorden, la multitarea y la sobreestimulación reducen la capacidad de pensar con claridad. El enfoque mejora cuando reduces intencionalmente la carga mental innecesaria. Proteger la mente es esencial para el rendimiento sostenido. La claridad mental es una forma de riqueza que pocas personas cuidan.',
  'mindset.card.focus26.title':   'El enfoque da forma a tu futuro.',
  'mindset.card.focus26.content':
    'Tu futuro no se construye en momentos dramáticos. Se construye en momentos repetidos de atención. Cada día, tu enfoque determina qué crece más en tu vida. La distracción debilita el potencial lentamente, mientras que la concentración acumula progreso. La dirección de tu atención acaba convirtiéndose en la dirección de tu vida.',
  'mindset.card.focus27.title':   'El coste oculto de cambiar de tarea.',
  'mindset.card.focus27.content':
    'Cada vez que saltas entre tareas, tu mente desperdicia energía intentando reorientarse. Incluso las interrupciones breves reducen la eficiencia mental y aumentan la fatiga. Muchas personas se sienten agotadas no porque hayan trabajado mucho, sino porque cambiaron el enfoque constantemente. Proteger la continuidad permite que la mente opere a un nivel mucho más alto. La concentración profunda requiere permanecer anclado.',
  'mindset.card.focus28.title':   'El enfoque empieza la noche anterior.',
  'mindset.card.focus28.content':
    'Una mañana distraída suele ser creada por una noche desorganizada. Preparar tus prioridades la noche anterior reduce la fricción mental cuando comienza el día. La mente rinde mejor cuando se despierta con claridad en lugar de incertidumbre. Reducir las decisiones al inicio del día libera más espacio mental. La preparación crea una ejecución más fluida.',
  'mindset.card.focus29.title':   'No todo merece tu reacción.',
  'mindset.card.focus29.content':
    'Muchas distracciones entran en tu vida disfrazadas de urgencia. Mensajes, opiniones y notificaciones compiten constantemente por tu atención emocional. El enfoque crece cuando dejas de reaccionar al instante a todo lo que te rodea. Las mentes tranquilas eligen a dónde va la atención, en lugar de dejar que el ruido externo la controle. La atención selectiva crea estabilidad interior.',
  'mindset.card.focus30.title':   'El enfoque necesita distancia emocional.',
  'mindset.card.focus30.content':
    'Las emociones fuertes pueden alejar fácilmente tu atención del trabajo importante. La ansiedad, la frustración y la comparación suelen crear turbulencia mental que debilita la concentración. El enfoque mejora cuando aprendes a observar las emociones sin obedecerlas de inmediato. El autocontrol emocional protege la claridad mental. Una mente tranquila rinde mejor bajo presión.',
  'mindset.card.focus31.title':   'La mente busca lo nuevo. El crecimiento vive en la repetición.',
  'mindset.card.focus31.content':
    'El cerebro busca naturalmente estimulación, variedad y entretenimiento. Pero el progreso real suele venir de repetir las acciones importantes con constancia a lo largo del tiempo. Las personas enfocadas resisten la tentación de la novedad constante. Entienden que la repetición construye habilidad, maestría y resultados. La disciplina suele sentirse aburrida antes de volverse transformadora.',

  // ── Focus card content (focus32–focus57) ─────────────────────────────────
  'mindset.card.focus32.title':   'Concentrarse crea paz interior.',
  'mindset.card.focus32.content':
    'La distracción crea caos interno. Cuando la mente salta constantemente entre pensamientos, resulta difícil sentirse tranquilo o presente. El enfoque simplifica la actividad mental y reduce la saturación. Sumergirse por completo en una sola tarea significativa puede crear una paz emocional inesperada. La atención y la tranquilidad están profundamente conectadas.',
  'mindset.card.focus33.title':   'El ruido digital debilita la mente.',
  'mindset.card.focus33.content':
    'La exposición constante a contenido rápido acorta la capacidad de atención con el tiempo. Cuanta más estimulación consume el cerebro, más difícil se vuelve concentrarse en tareas más lentas y significativas. Las personas enfocadas cuidan lo que entra en su espacio mental. Proteger tu atención es similar a proteger tu salud física. Lo que consumes mentalmente da forma a tu capacidad cognitiva.',
  'mindset.card.focus34.title':   'El enfoque se construye en el descanso.',
  'mindset.card.focus34.content':
    'Tu capacidad de concentrarte depende en gran medida de la recuperación. El agotamiento crónico debilita la memoria, la atención y el control emocional. El sueño, la quietud, el movimiento y el descanso adecuado protegen el rendimiento mental. Una mente agotada no puede concentrarse en profundidad. El regreso al enfoque empieza en el cuidado.',
  'mindset.card.focus35.title':   'La mente sigue lo que practicas.',
  'mindset.card.focus35.content':
    'Lo que practicas repetidamente se vuelve más fácil con el tiempo. Si practicas la distracción constantemente, el cerebro se entrena para evitar la atención sostenida. Pero cuando practicas la concentración con regularidad, el enfoque se fortalece gradualmente. Los hábitos mentales dan forma a la identidad mental. Tus patrones de atención se convierten en tu comportamiento predeterminado.',
  'mindset.card.focus36.title':   'Enfocarse significa decir no, a menudo.',
  'mindset.card.focus36.content':
    'La concentración no es solo elegir en qué trabajar — también es rechazar lo que no importa. Cada compromiso innecesario consume energía mental. Las personas enfocadas protegen sus prioridades. Entienden que la atención es limitada y no puede dividirse infinitamente. La claridad requiere límites.',
  'mindset.card.focus37.title':   'Empieza antes de sentirte listo.',
  'mindset.card.focus37.content':
    'Esperar la motivación perfecta suele crear un retraso interminable. El enfoque crece a través de la acción, no a través de la preparación emocional. Una vez que el movimiento comienza, la resistencia suele disminuir de forma natural. Las personas enfocadas se entrenan para empezar a pesar de la incomodidad. El impulso crea compromiso mental más deprisa que el análisis continuo.',
  'mindset.card.focus38.title':   'La simplicidad mental mejora la ejecución.',
  'mindset.card.focus38.content':
    'La complejidad suele crear vacilación y confusión. Cuando las tareas se vuelven demasiado complicadas, el cerebro busca naturalmente la escapatoria a través de la distracción. El enfoque mejora cuando los sistemas, los objetivos y las prioridades se vuelven más simples y claros. La simplicidad reduce la sobrecarga cognitiva. El pensamiento claro produce una ejecución más limpia.',
  'mindset.card.focus39.title':   'El enfoque fortalece la confianza en ti mismo.',
  'mindset.card.focus39.content':
    'Cada vez que honras tus compromisos contigo mismo, tu autoconfianza crece. La concentración constante construye confianza porque demuestra que puedes confiar en tu propia disciplina. Las personas enfocadas dejan de depender enteramente de la motivación. Confían en los sistemas y hábitos que han construido. La confianza interna crea estabilidad emocional.',
  'mindset.card.focus40.title':   'La estimulación superficial crea fatiga profunda.',
  'mindset.card.focus40.content':
    'El scroll interminable puede parecer relajante, pero la sobreestimulación agota el cerebro en silencio. La novedad constante obliga al sistema nervioso a procesar sin pausa. Muchas personas confunden la estimulación con el descanso. La recuperación real suele venir de desacelerar, desconectar y dejar que la mente repose. La quietud mental restaura la energía.',
  'mindset.card.focus41.title':   'El enfoque es una forma de respeto propio.',
  'mindset.card.focus41.content':
    'Proteger tu atención significa valorar tus objetivos, tu tiempo y lo que quieres construir. La distracción constante a menudo refleja un descuido silencioso de uno mismo. Las personas enfocadas entienden que la atención es uno de sus recursos más valiosos. Elegir la concentración es elegir el crecimiento. Tus hábitos revelan lo que realmente priorizas.',
  'mindset.card.focus42.title':   'La mente necesita espacio para pensar.',
  'mindset.card.focus42.content':
    'La creatividad y la intuición rara vez aparecen durante la estimulación constante. El cerebro necesita espacio para procesar la información en profundidad. Las personas enfocadas crean intencionalmente momentos sin ruido, sin contenido, sin interrupción. El silencio permite que los pensamientos más profundos emerjan de forma natural. La reflexión mejora la claridad.',
  'mindset.card.focus43.title':   'Los pequeños logros fortalecen el enfoque.',
  'mindset.card.focus43.content':
    'Los objetivos grandes pueden sentirse intimidantes, lo que aumenta la resistencia mental. Las pequeñas acciones completadas construyen impulso y refuerzan la concentración. Cada tarea terminada entrena al cerebro para asociar el enfoque con el progreso. Los pequeños logros crean energía interna. La constancia crece más deprisa a través de acciones manejables.',
  'mindset.card.focus44.title':   'El enfoque es más fácil cuando el cuerpo está bien.',
  'mindset.card.focus44.content':
    'La salud física influye profundamente en la claridad mental. El mal sueño, la deshidratación, el estrés y la inactividad debilitan la concentración de forma notable. El rendimiento cognitivo está profundamente conectado al bienestar físico. Gestionar la energía mejora la atención de forma natural. Un cuerpo más descansado sostiene una mente más aguda.',
  'mindset.card.focus45.title':   'Las mentes saturadas evitan lo importante.',
  'mindset.card.focus45.content':
    'Cuando el cerebro se siente saturado, busca naturalmente la estimulación más fácil. Por eso el estrés suele aumentar la procrastinación. El enfoque mejora cuando reduces el ruido mental innecesario y organizas tus prioridades con claridad. Los sistemas tranquilos crean pensamientos más tranquilos. La organización mental reduce la resistencia.',
  'mindset.card.focus46.title':   'El enfoque crece por repetición, no por perfección.',
  'mindset.card.focus46.content':
    'Muchas personas abandonan las rutinas de concentración porque esperan una perfección inmediata. Pero la concentración se desarrolla gradualmente a través del esfuerzo repetido. Algunos días se sentirán más fáciles que otros. Lo que más importa es volver con constancia a la práctica de la atención. El progreso se acumula despacio, en silencio.',
  'mindset.card.focus47.title':   'Protege tus mejores horas mentales.',
  'mindset.card.focus47.content':
    'Cada mente tiene períodos de mayor energía cognitiva durante el día. Las personas enfocadas identifican cuándo piensan con más claridad y protegen esas horas. El trabajo importante debería ocurrir durante los períodos de mayor atención. Las distracciones de bajo valor no deberían consumir tu mejor estado mental. El momento adecuado mejora el rendimiento de forma notable.',
  'mindset.card.focus48.title':   'El ruido interior también distrae.',
  'mindset.card.focus48.content':
    'La distracción no siempre viene del mundo exterior. La preocupación, la duda y el pensamiento excesivo pueden interrumpir la concentración con tanta fuerza como las notificaciones. El enfoque mejora cuando aprendes a calmar el ruido mental interno. La conciencia emocional fortalece el control cognitivo. Una mente en calma sostiene una atención más profunda.',
  'mindset.card.focus49.title':   'Tu enfoque determina la calidad de lo que creas.',
  'mindset.card.focus49.content':
    'La calidad de tu atención da forma a la calidad de tu trabajo. El esfuerzo apresurado y distraído suele producir resultados mediocres. El enfoque profundo mejora la creatividad, la precisión y la capacidad de resolver problemas. Las personas enfocadas entienden que la excelencia requiere presencia. Una mejor atención crea mejores resultados.',
  'mindset.card.focus50.title':   'La constancia supera a la intensidad.',
  'mindset.card.focus50.content':
    'Los esfuerzos intensos pero irregulares rara vez crean progreso sostenido. Las pequeñas sesiones diarias de concentración crean resultados más sólidos a largo plazo que las sesiones intensas ocasionales. La repetición construye impulso. El enfoque sostenible gana con el tiempo. No hay que hacer mucho cada día — solo volver.',
  'mindset.card.focus51.title':   'Saber ignorar es una habilidad.',
  'mindset.card.focus51.content':
    'La vida moderna exige tu atención constantemente. Las personas enfocadas desarrollan la capacidad de ignorar intencionalmente lo que no sirve a sus prioridades. No toda tendencia, conversación o distracción merece energía mental. La ignorancia selectiva protege la concentración. La atención se vuelve más fuerte cuando se dirige con intención.',
  'mindset.card.focus52.title':   'Lo que entra desordenado, piensa desordenado.',
  'mindset.card.focus52.content':
    'Tu estado mental está profundamente influenciado por lo que consumes cada día. El exceso de información dificulta pensar con claridad y priorizar de forma efectiva. El enfoque mejora cuando reduces las entradas innecesarias. Un entorno mental más limpio sostiene un pensamiento más agudo. La simplicidad mejora la cognición.',
  'mindset.card.focus53.title':   'El enfoque crea impulso más deprisa que la motivación.',
  'mindset.card.focus53.content':
    'La motivación fluctúa constantemente, pero la acción enfocada crea su propia energía. Una vez que la concentración comienza, el cerebro suele comprometerse de forma más natural. Esperar indefinidamente la inspiración retrasa el progreso. Las personas enfocadas se apoyan en la estructura y la acción en lugar del estado emocional. El movimiento crea impulso.',
  'mindset.card.focus54.title':   'La ejecución tranquila supera al caos.',
  'mindset.card.focus54.content':
    'La urgencia estresante suele crear un pensamiento descuidado y agotamiento emocional. La ejecución tranquila y enfocada produce un rendimiento más sostenible. La serenidad mental protege la capacidad de tomar decisiones. El enfoque prospera en la estabilidad emocional. La calma no es lentitud — es precisión.',
  'mindset.card.focus55.title':   'Cada distracción tiene un coste invisible.',
  'mindset.card.focus55.content':
    'Cuando pierdes el enfoque, no solo pierdes tiempo — pierdes potencial, creatividad y energía mental. Las pequeñas distracciones repetidas cada día se acumulan en oportunidades perdidas con el tiempo. Las personas enfocadas reconocen el valor real de la atención ininterrumpida. Proteger la concentración es proteger el recorrido.',
  'mindset.card.focus56.title':   'La atención crea identidad.',
  'mindset.card.focus56.content':
    'Aquello en lo que te concentras repetidamente da forma lentamente a cómo piensas, sientes y actúas. La atención no es neutral — refuerza patrones en la mente. Las personas enfocadas dirigen intencionalmente su atención hacia el crecimiento y los objetivos que importan. Tu enfoque influye en quién te conviertes. La atención da forma a la identidad.',
  'mindset.card.focus57.title':   'Una vida enfocada se siente más intencionada.',
  'mindset.card.focus57.content':
    'Cuando la atención está constantemente dispersa, la vida empieza a sentirse reactiva y caótica. El enfoque crea un sentido más sólido de dirección. La atención intencionada te permite experimentar la vida más profundamente en lugar de atravesarla inconscientemente. El enfoque no solo es cuestión de productividad — es cuestión de presencia. Una mente enfocada crea una vida más significativa.',

  // ── Clarity card content (first 5) ──────────────────────────────────────
  'mindset.card.m6.content':
    'Cada aplicación, cada notificación, cada feed está diseñado para capturar tu atención y retenerla. Tu atención tiene un valor real — y constantemente hay fuerzas compitiendo por ella. La pregunta no es si usas la tecnología, sino si lo haces con intención o por inercia. Empezar por una hora sin pantalla en la mañana es una forma suave de recuperar el control de hacia dónde miras.',
  'mindset.card.m12.content':
    'El aburrimiento no es un problema que resolver — es el estado en que la mente crea. Cuando el cerebro se queda sin estímulo externo, regresa a sí mismo: ahí viven la creatividad, la reflexión y las ideas más honestas. Al llenar cada momento silencioso con contenido, le robas a la mente el espacio donde mejor piensa. Deja que el silencio tenga lugar. Mira qué aparece cuando no hay nada que consumir.',
  'mindset.card.m18.content':
    'El minimalismo digital no es usar menos tecnología — es usar solo la que realmente tiene sentido para ti. Para cada aplicación en tu teléfono, pregúntate: ¿esto añade algo real a mi vida, o simplemente llena un momento que no he decidido cómo usar? A veces descubres que menos herramientas, usadas con intención, generan mucho más que muchas usadas por inercia.',
  'mindset.card.detox1.content':
    'Cada aplicación, notificación y plataforma está diseñada para mantenerte conectada el mayor tiempo posible. El primer paso de un detox digital es simplemente notar eso — ver que tu atención tiene valor y que constantemente hay fuerzas compitiendo por ella. Proteger hacia dónde miras también es proteger tu energía mental. La conciencia ya es el comienzo.',
  'mindset.card.detox2.content':
    'El cerebro no fue diseñado para procesar flujos interminables de información sin pausa. El scroll continuo, las notificaciones, el ruido digital — sobrecargan el sistema nervioso despacio y de forma silenciosa. El agotamiento mental a menudo no viene de hacer demasiado, sino de estar demasiado estimulada. El silencio también es una forma de claridad.',

  // ── Clarity card content (next 30: detox3–detox32) ───────────────────────
  'mindset.card.detox3.content':
    'Muchas personas alcanzan el teléfono en cuanto aparece el silencio. Pero el aburrimiento no es un problema — puede ser una puerta hacia la creatividad, la reflexión y el regreso a uno mismo. Un detox digital es, entre otras cosas, permitirle al cerebro volver a experimentar la quietud. La calma también fortalece la imaginación.',
  'mindset.card.detox4.content':
    'La tecnología se vuelve poco saludable cuando guía tu comportamiento de forma automática. Un detox digital empieza cuando decides conscientemente cómo y cuándo la tecnología sirve tu vida — y no al revés. El uso consciente crea libertad. El uso automático crea dependencia.',
  'mindset.card.detox5.content':
    'Cada notificación rompe el flujo mental y debilita la concentración. Incluso las interrupciones breves le cuestan al cerebro tiempo de recuperación invisible. Un detox digital suele empezar por reducir las alertas innecesarias. Proteger tu atención también es proteger tu claridad.',
  'mindset.card.detox6.content':
    'Muchas personas confunden el scroll interminable con relajación. Pero la sobreestimulación puede dejar la mente más agotada que antes. El descanso real a menudo necesita silencio, movimiento, naturaleza o presencia genuina. Un detox digital ayuda al sistema nervioso a desacelerar de verdad.',
  'mindset.card.detox7.content':
    'El contenido breve y constante entrena al cerebro a buscar estimulación rápida y debilita la atención sostenida. Un detox digital ayuda a reconstruir la paciencia, el enfoque y el pensamiento más profundo. Lo que consumes repetidamente moldea tus hábitos cognitivos con el tiempo.',
  'mindset.card.detox8.content':
    'Estar constantemente conectada en lo digital a menudo desconecta emocionalmente de lo que ocurre en la vida real. Un detox digital crea espacio para reconectarte con las conversaciones, los entornos y los momentos con más profundidad. La presencia fortalece el bienestar emocional.',
  'mindset.card.detox9.content':
    'El cerebro necesita periodos sin estímulo constante para procesar bien las emociones y los pensamientos. La estimulación sin pausa crea ruido mental. Un detox digital devuelve a la mente el espacio para respirar. El silencio sostiene el equilibrio emocional.',
  'mindset.card.detox10.content':
    'La cultura moderna suele crear presión para estar siempre informada, entretenida o actualizada. Pero el consumo constante satura el cerebro despacio. Un detox digital enseña el valor de recibir información con intención. La paz mental crece con la moderación.',
  'mindset.card.detox11.content':
    'La dificultad para concentrarse suele agravarse con la sobreestimulación digital repetida. Un detox digital ayuda a reentrenar al cerebro para tolerar una concentración más lenta y profunda. La atención es entrenable. El enfoque mejora con la práctica intencional.',
  'mindset.card.detox12.content':
    'La exposición constante a vidas curadas en línea genera comparaciones poco saludables y una insatisfacción emocional que a veces es difícil de nombrar. Un detox digital ayuda a reconectarte con la realidad en lugar de con la ilusión. La perspectiva protege la salud emocional.',
  'mindset.card.detox13.content':
    'Sentir la presión de responder de inmediato a cada mensaje genera tensión emocional y fatiga mental sostenida. Un detox digital incluye crear límites más saludables alrededor de la comunicación. No necesitas estar constantemente accesible para todos.',
  'mindset.card.detox14.content':
    'El sistema nervioso tiene dificultades para relajarse por completo mientras procesa estimulación digital de forma continua. Un detox digital permite una recuperación mental más profunda al reducir temporalmente la entrada de información. Desconectarse restaura la energía emocional.',
  'mindset.card.detox15.content':
    'Las herramientas digitales pueden mejorar mucho la vida cuando se usan con intención. Los problemas comienzan cuando la tecnología reemplaza las experiencias significativas, las relaciones y la conciencia de uno mismo. Un detox digital crea un equilibrio más saludable entre lo digital y lo real.',
  'mindset.card.detox16.content':
    'Muchas personas usan la estimulación constante para evitar temporalmente la soledad, el estrés, la ansiedad o el malestar emocional. Un detox digital ayuda a crear conciencia sobre esos patrones de evasión. La quietud a menudo revela lo que la distracción estaba tapando.',
  'mindset.card.detox17.content':
    'El consumo constante de contenido deja poco lugar para el pensamiento original o la reflexión propia. Un detox digital crea espacio mental para pensar con más profundidad, crear y encontrar perspectiva personal. El silencio sostiene el pensamiento independiente.',
  'mindset.card.detox18.content':
    'La estimulación digital rápida activa constantemente respuestas de dopamina en el cerebro. Con el tiempo, la vida ordinaria puede empezar a sentirse menos interesante o emocionalmente significativa. Un detox digital ayuda a recuperar la apreciación por las experiencias más lentas y simples.',
  'mindset.card.detox19.content':
    'No toda conversación, aplicación o entorno digital merece acceso sin límites a tu atención y tus emociones. Un detox digital incluye ser más intencional sobre lo que entra en tu espacio mental. Los límites reducen el agobio. La claridad empieza por ahí.',
  'mindset.card.detox20.content':
    'Estar físicamente presente mientras la mente está absorta en pantallas debilita la conexión y la comunicación real. Un detox digital fortalece la presencia emocional con las personas que te rodean. La atención real profundiza los vínculos. Estar presente también crea recuerdos más ricos.',
  'mindset.card.detox21.content':
    'El cerebro necesita momentos sin estimulación para recuperarse emocional y cognitivamente. Un detox digital ayuda a reintroducir el silencio en la vida cotidiana. Los entornos tranquilos reducen el estrés y mejoran el enfoque. El silencio restaura la energía mental.',
  'mindset.card.detox22.content':
    'Cuando el cerebro recibe estimulación sin pausa, el procesamiento emocional a menudo se vuelve más débil o más lento. Un detox digital permite que las emociones vuelvan a surgir con más naturalidad. La conciencia emocional mejora cuando baja la sobreestimulación.',
  'mindset.card.detox23.content':
    'Comenzar el día de inmediato con redes sociales o notificaciones suele colocar al cerebro en modo reactivo. Los hábitos de detox digital por la mañana crean mayor calma, enfoque y estabilidad emocional a lo largo del día. Proteger la mañana también es proteger el estado mental.',
  'mindset.card.detox24.content':
    'Los momentos importantes a menudo se pierden cuando la atención permanece atrapada en las pantallas. Un detox digital ayuda a reconectarte con las experiencias físicas, la naturaleza, el movimiento, las conversaciones y la presencia real. La vida también existe más allá de lo digital.',
  'mindset.card.detox25.content':
    'Al cerebro le cuesta pensar con creatividad cuando está constantemente sobrecargado de información. Un detox digital crea espacio mental para la imaginación y el pensamiento más profundo. La creatividad crece en entornos mentales más tranquilos.',
  'mindset.card.detox26.content':
    'Los hábitos digitales son comportamientos aprendidos, no rasgos de identidad permanentes. Un detox digital empieza con pequeños cambios intencionales repetidos con consistencia. La conciencia crea elecciones más saludables. El cambio es posible — despacio, pero es posible.',
  'mindset.card.detox27.content':
    'Las personas acostumbradas a la estimulación constante pueden sentirse inicialmente inquietas durante los periodos de detox digital. Ese malestar suele ser temporal. El sistema nervioso se ajusta gradualmente a ritmos más lentos. La calma se fortalece con el tiempo.',
  'mindset.card.detox28.content':
    'La atención es uno de tus recursos internos más valiosos. Las distracciones digitales la debilitan despacio: la concentración, la presencia emocional, la claridad. Un detox digital fortalece la capacidad de enfocar con intención. Proteger la atención también protege la calidad de vida.',
  'mindset.card.detox29.content':
    'Registrar constantemente las experiencias puede reducir la capacidad de vivirlas emocionalmente del todo. Un detox digital invita a experimentar los momentos de forma directa, en lugar de verlos siempre a través de una pantalla. La presencia crea recuerdos más ricos.',
  'mindset.card.detox30.content':
    'Reducir la dependencia digital poco saludable crea ligereza emocional, mayor enfoque y una presencia más plena en la vida cotidiana. Un detox digital no es rechazar la tecnología por completo — es recuperar el control consciente de tu atención y tu bienestar mental.',
  'mindset.card.detox31.content':
    'Pasar el día en línea puede igualmente dejar a las personas emocionalmente desconectadas y solas. Un detox digital ayuda a crear relaciones más profundas a través de la presencia genuina y las conversaciones significativas. La conexión real necesita atención — no solo acceso.',
  'mindset.card.detox32.content':
    'La mente humana busca estimulación de forma natural, y los feeds infinitos explotan ese instinto sin pausa. Un detox digital empieza cuando reconoces que el contenido interminable a menudo deja al cerebro sobrecargado en lugar de satisfecho. La conciencia crea elecciones digitales más saludables.',

  // ── Clarity card content (final 29: detox33–detox61) ─────────────────────
  'mindset.card.detox33.content':
    'Las notificaciones constantes, los vídeos, las actualizaciones, los mensajes — drenan la energía cognitiva a lo largo del día de forma silenciosa. Incluso cuando no lo percibes conscientemente, el cerebro sigue procesando estimulación. Reducir lo innecesario también reduce el agotamiento mental.',
  'mindset.card.detox34.content':
    'La tecnología moderna crea expectativas poco realistas de disponibilidad constante. Un detox digital incluye aprender que responder más tarde no te hace irresponsable. Los límites protegen la energía emocional y reducen el estrés.',
  'mindset.card.detox35.content':
    'El cerebro se satura cuando procesa constantemente contenido excesivo y demasiadas opciones. Un detox digital ayuda a reducir el desorden mental y mejora la claridad. Menos entrada de información a veces crea mejores decisiones. La simplicidad también apoya el pensamiento tranquilo.',
  'mindset.card.detox36.content':
    'Las interrupciones constantes debilitan el pensamiento profundo y la presencia emocional. Un detox digital crea espacio para la concentración, la reflexión y la calma sin cortes. La claridad mental mejora cuando el cerebro puede permanecer enfocado por más tiempo.',
  'mindset.card.detox37.content':
    'La estimulación digital rápida puede reducir gradualmente el disfrute de las experiencias más lentas del mundo real. Un detox digital ayuda a recuperar el placer en los momentos simples — una conversación, la naturaleza, el movimiento, el silencio. El equilibrio reconstruye la sensibilidad emocional.',
  'mindset.card.detox38.content':
    'Las plataformas digitales muestran con frecuencia momentos editados, filtrados y cuidadosamente seleccionados — no experiencias humanas completas. Un detox digital ayuda a reducir la comparación poco realista y la presión emocional que genera. La vida real es más equilibrada y compleja que lo que aparece en línea.',
  'mindset.card.detox39.content':
    'Cuando el cerebro consume información de forma constante, le queda poco espacio para la reflexión. Un detox digital crea espacio mental para el pensamiento más profundo y la autoconciencia. El silencio mejora la claridad. La reflexión fortalece la inteligencia emocional.',
  'mindset.card.detox40.content':
    'Los hábitos digitales saludables no requieren necesariamente abandonar la tecnología por completo. La meta es aprender a usarla con consciencia en lugar de por inercia. El equilibrio crea sostenibilidad. La conciencia crea libertad.',
  'mindset.card.detox41.content':
    'Lo que captura tu atención de forma repetida moldea lentamente tus emociones, tu enfoque y tu identidad. Un detox digital fortalece la atención intencional en lugar de la distracción automática. La atención consciente crea experiencias más significativas.',
  'mindset.card.detox42.content':
    'El cerebro puede sentirse inicialmente inquieto sin estimulación constante, porque se acostumbró a ciclos rápidos de dopamina. Un detox digital suele sentirse extraño antes de sentirse tranquilo. El sistema nervioso necesita tiempo para readaptarse. La calma se fortalece poco a poco.',
  'mindset.card.detox43.content':
    'La exposición a pantallas por la noche sobreestimula el cerebro y altera los patrones de sueño saludables. Un detox digital antes de dormir mejora la recuperación, la regulación emocional y la claridad cognitiva. Descansar mejor también fortalece la claridad mental.',
  'mindset.card.detox44.content':
    'Los hábitos de revisar constantemente debilitan la concentración y reducen la eficiencia de forma significativa. Un detox digital fortalece el enfoque al reducir la fragmentación mental. Proteger la atención también protege la calidad del trabajo.',
  'mindset.card.detox45.content':
    'Muchas personas consumen contenido sin pausa y aun así se sienten emocionalmente agotadas después. Un detox digital ayuda a distinguir entre la restauración genuina y la sobreestimulación disfrazada de relajación. El descanso real deja al sistema nervioso más tranquilo — no más cargado.',
  'mindset.card.detox46.content':
    'La creatividad, el procesamiento emocional y la perspectiva a menudo aparecen durante los momentos tranquilos sin estimulación. Un detox digital crea espacio mental para respirar de nuevo. El espacio vacío no es tiempo perdido. La quietud sostiene la creatividad.',
  'mindset.card.detox47.content':
    'La exposición constante a información, comparación, urgencia y notificaciones mantiene a muchos sistemas nerviosos en estado de activación emocional. Un detox digital ayuda a reducir el estrés de fondo y la sobreestimulación. Los entornos más tranquilos sostienen la estabilidad emocional.',
  'mindset.card.detox48.content':
    'Internet crea constantemente presión para estar actualizada en todo lo que ocurre en todos lados. Un detox digital incluye reconocer que no toda tendencia, debate o noticia merece tu atención. El consumo selectivo protege la paz mental.',
  'mindset.card.detox49.content':
    'Sin la distracción digital constante, los pensamientos y las emociones se vuelven más fáciles de notar con claridad. Un detox digital crea oportunidades para la reflexión más profunda. La conciencia mejora la regulación emocional y la claridad interior.',
  'mindset.card.detox50.content':
    'Las herramientas digitales son más saludables cuando apoyan el aprendizaje, la creatividad, la conexión o el trabajo significativo de forma intencional. Un detox digital consiste en eliminar el exceso poco saludable mientras se conserva lo que realmente tiene propósito. El uso consciente crea equilibrio.',
  'mindset.card.detox51.content':
    'Muchas personas existen físicamente en un lugar mientras mentalmente están absorbidas en otro lugar digital. Un detox digital fortalece la capacidad de vivir plenamente las conversaciones, las comidas, la naturaleza y los momentos ordinarios. La presencia mejora el bienestar emocional.',
  'mindset.card.detox52.content':
    'Incluso cuando te sientes "acostumbrada" a la estimulación constante, el sistema nervioso sigue experimentando estrés por la entrada continua de información. Un detox digital le da al cerebro y al cuerpo oportunidades de regularse de forma más natural. La recuperación fortalece la resiliencia.',
  'mindset.card.detox53.content':
    'La recuperación de la capacidad de concentración no ocurre de inmediato. El cerebro reapprende despacio a tolerar una concentración más profunda después de periodos de sobreestimulación. Los límites digitales consistentes fortalecen el enfoque con el tiempo. La paciencia también importa en el proceso.',
  'mindset.card.detox54.content':
    'Reducir la estimulación digital innecesaria puede generar mejoras notables en la calma, la claridad y la estabilidad emocional. Un detox digital permite que la mente se sienta menos saturada por dentro. La simplicidad sostiene la paz.',
  'mindset.card.detox55.content':
    'La cultura moderna suele enseñar a evitar el silencio, la quietud y el aburrimiento de forma continua. Un detox digital ayuda a reconstruir el bienestar en los momentos más lentos. La quietud no es vacío — es recuperación para la mente.',
  'mindset.card.detox56.content':
    'La atención dividida debilita la conexión emocional con el tiempo. Un detox digital fortalece la comunicación al fomentar una escucha más profunda y una presencia más real con los demás. La atención genuina comunica cuidado de una manera que la disponibilidad digital constante no puede reemplazar.',
  'mindset.card.detox57.content':
    'La sobreestimulación digital suele mantener a las personas mentalmente aceleradas y emocionalmente desconectadas. Un detox digital desacelera el ritmo interior y mejora la conciencia de los propios pensamientos, sentimientos y entorno. Una atención más lenta crea experiencias más profundas.',
  'mindset.card.detox58.content':
    'El exceso de estimulación puede adormecer la conciencia emocional de forma gradual. Reducir la sobrecarga digital permite que las emociones se sientan más claras y más naturales de nuevo. La conexión emocional se fortalece cuando la mente está menos sobreestimulada.',
  'mindset.card.detox59.content':
    'Las horas desaparecen rápido dentro de los hábitos digitales inconscientes. Un detox digital crea conciencia sobre cómo se está usando la atención y el tiempo cada día. El uso intencional del tiempo crea una vida más significativa.',
  'mindset.card.detox60.content':
    'El cerebro a menudo funciona mejor con menos interrupciones, entornos más tranquilos y una atención más intencional. Un detox digital crea las condiciones donde la calma emocional se vuelve más fácil de sostener. La simplicidad protege la salud mental.',
  'mindset.card.detox61.content':
    'La atención influye en la productividad, el bienestar emocional, las relaciones, la creatividad y la calidad de vida en general. Un detox digital es, en el fondo, recuperar el control consciente de hacia dónde va tu energía cada día. Lo que repites con tu atención va construyendo tu futuro.',

  // ── Momentum card content (first 5) ──────────────────────────────────────
  'mindset.card.m4.content':
    'Cada mañana, antes de que el día tome el control, identifica las tareas más importantes — las que, si las completas hoy, crearán el avance real. Hazlas primero. Antes del correo. Antes de las redes. Antes de que lo urgente desplace lo importante. Un solo paso bien elegido al día construye algo extraordinario con el tiempo.',
  'mindset.card.m10.content':
    'El calendario debería reflejar tus prioridades — no tus obligaciones reactivas. Asignar tiempo a lo que importa antes de que el día empiece es una forma de proteger el movimiento. Las personas que ejecutan lo planificado avanzan con más calma que las que responden a todo lo que llega. Empezar por proteger las mañanas ya es un paso.',
  'mindset.card.m16.content':
    'Una vez a la semana, dedica unos minutos a mirar la semana que pasó y preparar la que viene. ¿Qué avancé? ¿Qué evité? ¿Qué cargo conmigo que podría soltar? Esta pausa semanal convierte acciones dispersas en un ritmo con sentido. Y un ritmo con sentido es lo que crea movimiento real con el tiempo.',
  'mindset.card.prod1.content':
    'Estar ocupada no significa necesariamente estar avanzando. Muchas personas llenan sus días de actividad constante mientras evitan lo que realmente importa. El avance real viene de la acción enfocada, no del movimiento sin dirección. La productividad se mide por el impacto — no por cuánto agotamiento se siente al final del día.',
  'mindset.card.prod2.content':
    'Esperar a la motivación perfecta es una forma de no comenzar nunca. El movimiento crece cuando aprendes a empezar a pesar de la resistencia o la incertidumbre. La acción a menudo crea motivación — no al revés. Lo más difícil casi siempre es el primer paso. El impulso cambia el estado emocional más rápido que el análisis.',

  // ── Momentum card content (next 30: prod3–prod32) ─────────────────────────
  'mindset.card.prod3.content':
    'Muchas personas subestiman el poder de las acciones pequeñas y constantes. La productividad no siempre es dramática ni intensa. Los pasos pequeños repetidos a diario crean resultados que sorprenden con el tiempo. La constancia suave se acumula sin que lo notes. El progreso pequeño también evita el estancamiento.',
  'mindset.card.prod4.content':
    'Hacer varias cosas a la vez debilita la concentración, aumenta los errores y agota la energía mental. El avance mejora notablemente cuando te enfocas en una sola tarea significativa a la vez. La concentración profunda permite un trabajo de mayor calidad en menos tiempo. La atención dispersa crea resultados dispersos.',
  'mindset.card.prod5.content':
    'El tiempo solo no determina la productividad — la energía mental y física también importan profundamente. Una mente agotada tiene dificultades para pensar con claridad y mantener el enfoque. El sueño, la recuperación y el descanso influyen fuertemente en el rendimiento. Un avance sostenible depende de una energía sostenible.',
  'mindset.card.prod6.content':
    'Depender únicamente de la motivación crea inconsistencia. Las personas productivas crean sistemas, rutinas y estructuras que sostienen la acción de forma casi automática. Los sistemas reducen la fricción mental y las decisiones emocionales. Los buenos hábitos hacen que la constancia sea más fácil. La estructura protege el movimiento.',
  'mindset.card.prod7.content':
    'El perfeccionismo a menudo retrasa el avance. Muchas personas pasan demasiado tiempo refinando detalles pequeños mientras el trabajo importante permanece sin terminar. El avance real crece cuando priorizas completar en lugar de perfeccionar sin fin. La acción imperfecta casi siempre crea más resultados que la vacilación perfecta.',
  'mindset.card.prod8.content':
    'Intentar hacerlo todo a la vez a menudo crea agobio mental y resultados débiles. El avance mejora cuando identificas claramente lo que importa más. El trabajo importante debería recibir tu mejor energía primero. Las prioridades claras crean claridad. Y la claridad mejora la ejecución.',
  'mindset.card.prod9.content':
    'Los esfuerzos extremos pueden sentirse productivos por un momento, pero rara vez son sostenibles. La productividad a largo plazo viene de rutinas constantes repetidas con el tiempo. Las pequeñas acciones diarias crean un avance más confiable que las sesiones de trabajo intensas y ocasionales. El esfuerzo sostenible produce resultados duraderos.',
  'mindset.card.prod10.content':
    'El cerebro a menudo exagera la dificultad de comenzar las tareas. Una vez que la acción empieza, la resistencia suele disminuir de forma natural. El avance mejora cuando te enfocas en iniciar el movimiento en lugar de negociar contigo misma. El movimiento crea enganche. El impulso fortalece el enfoque.',
  'mindset.card.prod11.content':
    'Muchas personas adoran planificar y comenzar ideas nuevas, pero batallan con la finalización. La productividad real incluye seguir adelante hasta que las tareas estén terminadas. Completar crea impulso, confianza y claridad mental. Las tareas sin terminar crean ruido cognitivo. Terminar también importa.',
  'mindset.card.prod12.content':
    'Los sistemas demasiado complicados a menudo crean estrés innecesario y confusión. Las rutinas más simples son más fáciles de mantener de forma constante. El avance aumenta cuando reduces la fricción y te enfocas en lo esencial. La complejidad puede convertirse en una forma de procrastinación. La simplicidad mejora la ejecución.',
  'mindset.card.prod13.content':
    'Los espacios desordenados y las distracciones constantes reducen la concentración y la productividad de forma silenciosa. Un entorno tranquilo y organizado sostiene un pensamiento más claro. Las personas productivas diseñan intencionalmente espacios que fomentan el enfoque. El entorno influye en el comportamiento más de lo que la mayoría cree.',
  'mindset.card.prod14.content':
    'El trabajo constante sin recuperación debilita la creatividad, el enfoque y la resiliencia emocional. El descanso no es pereza — es parte del rendimiento sostenible. Las personas productivas entienden que la recuperación protege la constancia a largo plazo. Una mente descansada produce trabajo de mayor calidad.',
  'mindset.card.prod15.content':
    'Decir que sí a todo destruye el enfoque y agota la energía. El avance mejora cuando te vuelves más selectiva con tu tiempo y tu atención. No toda petición merece acceso inmediato a ti. Los límites protegen las prioridades. Y proteger las prioridades crea movimiento real.',
  'mindset.card.prod16.content':
    'La motivación puede iniciar la acción, pero la disciplina mantiene la constancia con el tiempo. Las personas productivas continúan trabajando incluso cuando las emociones fluctúan. Las rutinas reducen la dependencia del estado de ánimo. La acción constante produce resultados confiables. La disciplina suave fortalece el impulso.',
  'mindset.card.prod17.content':
    'El agobio a menudo viene de cargar mentalmente demasiadas cosas sin terminar a la vez. El avance mejora cuando organizas las tareas hacia afuera en lugar de almacenarlas todas dentro. Escribir las cosas crea claridad. Los sistemas claros reducen la presión mental.',
  'mindset.card.prod18.content':
    'Muchas personas esperan sentirse completamente seguras antes de actuar. Pero la claridad a menudo aparece a través del movimiento — no antes. El avance crece cuando dejas de esperar la certeza perfecta primero. El aprendizaje ocurre durante la ejecución. El progreso revela la dirección.',
  'mindset.card.prod19.content':
    'El estrés, la ansiedad y el agotamiento emocional pueden destruir silenciosamente la productividad. La regulación emocional mejora la concentración y la capacidad de tomar decisiones. Las personas productivas aprenden a calmar el ruido mental en lugar de permitir que las emociones controlen cada acción. La estabilidad emocional sostiene el rendimiento.',
  'mindset.card.prod20.content':
    'Hacer scroll, procrastinar y evitar las tareas difíciles puede sentirse reconfortante por un momento, pero a menudo crea estrés después. El avance real requiere elegir el progreso significativo en lugar de la gratificación inmediata. El malestar temporal a menudo crea recompensas a largo plazo. La constancia protege el futuro.',
  'mindset.card.prod21.content':
    'Todas las personas tienen periodos de mayor claridad mental y enfoque durante el día. Las personas productivas usan intencionalmente esas horas para el trabajo importante en lugar de las distracciones de bajo valor. El tiempo estratégico mejora la eficiencia de forma notable. La conciencia de la energía fortalece lo que produces.',
  'mindset.card.prod22.content':
    'La repetición fortalece los hábitos y reduce la resistencia con el tiempo. Cuanto más practicas el trabajo enfocado, más fácil se vuelve mantener la constancia. El comportamiento productivo eventualmente se vuelve automático a través de la repetición. Los hábitos crean estabilidad.',
  'mindset.card.prod23.content':
    'Demasiadas tareas, decisiones y distracciones saturan el cerebro. El avance mejora cuando reduces el desorden mental innecesario y simplificas las prioridades. Las mentes claras ejecutan con más eficiencia. La organización mental protege el enfoque.',
  'mindset.card.prod24.content':
    'La vida reactiva a menudo crea estrés y atención dispersa. Las personas productivas deciden intencionalmente cómo quieren usar su tiempo y su energía. El comportamiento intencional crea una alineación más sólida con lo que realmente importa. La conciencia mejora la toma de decisiones.',
  'mindset.card.prod25.content':
    'El tiempo es uno de los pocos recursos que no puede recuperarse una vez perdido. Las personas productivas lo tratan con conciencia y propósito. Los momentos pequeños desperdiciados repetidos a diario se acumulan en pérdidas significativas con los años. El uso consciente del tiempo crea un avance con sentido.',
  'mindset.card.prod26.content':
    'Cada distracción crea tiempo de recuperación invisible para el cerebro. Las interrupciones constantes fragmentan la concentración y reducen la calidad de lo que produces. Las personas productivas minimizan intencionalmente las notificaciones, el ruido y las interrupciones innecesarias. Proteger el enfoque mejora la eficiencia de forma natural.',
  'mindset.card.prod27.content':
    'Cada tarea completada fortalece la autoconfianza y el impulso. El avance crea un estado emocional positivo porque la acción demuestra capacidad. El progreso constante mejora la confianza con el tiempo. El movimiento reduce el estancamiento y la resistencia mental.',
  'mindset.card.prod28.content':
    'La productividad verdadera no se trata de burnout ni de presión constante. Se trata de crear un avance significativo mientras se mantiene la salud, el equilibrio y el bienestar emocional. La productividad sostenible apoya el crecimiento a largo plazo en lugar del agotamiento a corto plazo. El éxito real necesita equilibrio.',
  'mindset.card.prod29.content':
    'Muchas personas desperdician energía porque nunca definen claramente lo que realmente importa. El avance mejora cuando dejas de tratar todas las tareas con la misma urgencia. El trabajo importante merece tu mejor atención y energía. Las prioridades claras reducen la confusión y fortalecen la ejecución.',
  'mindset.card.prod30.content':
    'Pensar con profundidad puede ser valioso, pero el análisis interminable a menudo se convierte en procrastinación disfrazada. El avance crece cuando dejas de esperar la certeza perfecta antes de empezar. La mayoría de las respuestas se aclaran a través de la acción. El movimiento crea progreso más rápido que la planificación excesiva.',
  'mindset.card.prod31.content':
    'La manera en que comienzas el día influye en tu energía mental durante horas después. Las pequeñas acciones productivas temprano en el día crean impulso. Un buen comienzo reduce la resistencia más tarde. Las victorias tempranas fortalecen el enfoque y el ánimo.',
  'mindset.card.prod32.content':
    'La estimulación constante y el trabajo sin pausa eventualmente reducen la creatividad y el rendimiento cognitivo. Las personas productivas entienden la importancia de alejarse periódicamente para recuperarse mentalmente. La recuperación restaura la claridad. Una mente descansada resuelve los problemas de forma más eficiente.',

  // ── Momentum card content (final 35: prod33–mom8) ─────────────────────────
  'mindset.card.prod33.content':
    'La motivación fluctúa de forma natural a lo largo de la vida. Esperar a "tener ganas" crea inconsistencia y retraso. Las personas productivas confían más en las rutinas y la estructura que en la inspiración emocional. Los hábitos crean estabilidad cuando las emociones cambian.',
  'mindset.card.prod34.content':
    'El éxito a largo plazo rara vez viene de un momento extraordinario. Suele venir de acciones disciplinadas repetidas con consistencia a lo largo del tiempo. Los hábitos diarios moldean los resultados en silencio. La constancia se acumula en una transformación real.',
  'mindset.card.prod35.content':
    'No todas las tareas merecen tu mejor energía mental. Las personas productivas reservan intencionalmente su enfoque más fuerte para el trabajo significativo. Las distracciones de bajo valor no deberían consumir las horas de mayor claridad. La asignación estratégica de energía mejora notablemente lo que produces.',
  'mindset.card.prod36.content':
    'El desorden mental y físico a menudo crean un agobio emocional. Demasiadas tareas sin terminar, notificaciones y distracciones debilitan la concentración. Las personas productivas simplifican su entorno y sus sistemas cuando pueden. La simplicidad sostiene un pensamiento más claro.',
  'mindset.card.prod37.content':
    'El burnout no es señal de éxito. La productividad sostenible requiere entender los límites físicos, emocionales y mentales. Descansar estratégicamente protege el rendimiento a largo plazo. La productividad sin equilibrio eventualmente se vuelve autodestructiva.',
  'mindset.card.prod38.content':
    'Muchos pensamientos estresantes se vuelven más pequeños una vez que empieza el movimiento. La productividad crea alivio emocional porque la acción reemplaza la incertidumbre con progreso. La evasión aumenta la tensión mental. El impulso reduce el análisis excesivo y la resistencia emocional.',
  'mindset.card.prod39.content':
    'Las tareas grandes a menudo se sienten intimidantes porque el cerebro se enfoca en toda la carga a la vez. El avance mejora cuando reduces las metas a acciones manejables. Los comienzos pequeños crean impulso. La simplicidad reduce la resistencia.',
  'mindset.card.prod40.content':
    'Las interrupciones constantes destruyen silenciosamente el enfoque y la eficiencia. Las personas productivas protegen su atención de las distracciones, conversaciones y ruido digital innecesarios. Los límites ayudan a preservar la energía mental. El enfoque prospera en entornos protegidos.',
  'mindset.card.prod41.content':
    'Quejarse y enfocarse demasiado en los problemas drena la energía mental sin crear avance. Las personas productivas entrenan su atención para dirigirse hacia soluciones accionables. El pensamiento orientado a soluciones mejora la ejecución. La energía sigue la atención.',
  'mindset.card.prod42.content':
    'Prepararse con anticipación reduce la fricción y la fatiga mental durante las tareas importantes. Las personas productivas organizan herramientas, horarios y prioridades antes de necesitarlos. La preparación aumenta la eficiencia y reduce la fatiga de decisiones. La estructura sostiene el impulso.',
  'mindset.card.prod43.content':
    'Las distracciones modernas compiten constantemente por el espacio mental. La productividad depende en gran medida de la capacidad de dirigir la atención de forma intencional. El enfoque disperso debilita los resultados. La atención controlada fortalece lo que produces y la creatividad.',
  'mindset.card.prod44.content':
    'El perfeccionismo a menudo crea vacilación, retraso y estrés innecesario. Las personas productivas se enfocan en el progreso y la mejora en lugar de la ejecución impecable. La acción imperfecta crea aprendizaje e impulso. El progreso importa más que la perfección.',
  'mindset.card.prod45.content':
    'Las rutinas consistentes reducen el caos mental al crear previsibilidad y estructura. Los hábitos organizados ayudan a reducir el agobio y el estrés. La productividad a menudo mejora el bienestar emocional porque crea un mayor sentido de control. La estabilidad sostiene el rendimiento.',
  'mindset.card.prod46.content':
    'Cambiar de tarea frecuentemente agota la energía cognitiva y debilita la concentración. Las personas productivas permanecen comprometidas con una tarea importante el tiempo suficiente para crear impulso. El enfoque profundo crea resultados de mayor calidad en menos tiempo. La continuidad mejora la eficiencia.',
  'mindset.card.prod47.content':
    'El rendimiento mental disminuye cuando el cerebro nunca descansa del todo. La recuperación es necesaria para la creatividad, el equilibrio emocional y la concentración. Las personas productivas entienden que el descanso aumenta la eficiencia a largo plazo. El rendimiento sostenible requiere restauración.',
  'mindset.card.prod48.content':
    'Cuanto más practiques constantemente comportamientos productivos, más automáticos se vuelven. Los hábitos reducen la resistencia emocional con el tiempo. La productividad se vuelve más fácil cuando la acción ya no requiere una negociación interna constante. La repetición fortalece la disciplina.',
  'mindset.card.prod49.content':
    'Preocuparse en exceso por las circunstancias externas agota la energía y debilita la ejecución. El avance mejora cuando la atención permanece enfocada en los pasos accionables dentro de tu control. La acción crea movimiento. Obsesionarse con los resultados incontrolables crea parálisis.',
  'mindset.card.prod50.content':
    'Muchas metas valiosas requieren tiempo antes de que aparezca el progreso visible. Las personas productivas siguen trabajando de forma constante incluso cuando los resultados parecen lentos. La paciencia fortalece la persistencia. El progreso a largo plazo a menudo se desarrolla en silencio antes de volverse visible.',
  'mindset.card.prod51.content':
    'Las rutinas sólidas reducen la fatiga de decisiones y aumentan la constancia. Las personas productivas crean hábitos que sostienen la acción automática en lugar de depender enteramente de la fuerza de voluntad. Los sistemas confiables crean resultados confiables. La estructura simplifica la ejecución.',
  'mindset.card.prod52.content':
    'Entender tus patrones de energía, distracciones y hábitos ayuda a mejorar el rendimiento de forma significativa. Las personas productivas se observan a sí mismas con honestidad en lugar de ignorar los comportamientos poco útiles. La conciencia crea mejores decisiones. La reflexión mejora la ejecución.',
  'mindset.card.prod53.content':
    'No todos los días se sentirán igualmente enfocados o eficientes. La productividad no se destruye por los días ocasionales de baja energía. La constancia importa más que las fluctuaciones temporales. Las personas productivas siguen avanzando sin esperar la perfección constantemente.',
  'mindset.card.prod54.content':
    'Hacer más no siempre es la respuesta. La productividad a menudo mejora cuando eliminas intencionalmente las tareas de bajo valor. La priorización protege la energía para el trabajo significativo. La simplicidad crea un enfoque más sólido y mejores resultados.',
  'mindset.card.prod55.content':
    'Demasiadas decisiones agotan la energía cognitiva a lo largo del día. Las personas productivas simplifican sus rutinas y reducen las elecciones innecesarias cuando es posible. La energía mental debería reservarse para el pensamiento importante. La simplicidad protege el enfoque.',
  'mindset.card.prod56.content':
    'Sin disciplina, la productividad se vuelve inconsistente y emocionalmente dependiente. Las personas productivas continúan actuando incluso cuando la motivación disminuye. La acción constante produce resultados confiables. La disciplina protege el impulso con el tiempo.',
  'mindset.card.prod57.content':
    'La comodidad inmediata a menudo entra en conflicto con el progreso a largo plazo. Las personas productivas toman decisiones que apoyan las metas futuras en lugar de solo satisfacer las emociones presentes. El pensamiento a largo plazo mejora la constancia y la paciencia. La visión fortalece la disciplina.',
  'mindset.card.prod58.content':
    'Las tareas que evitas a menudo crean el mayor estrés mental. El avance mejora notablemente cuando abordas las responsabilidades importantes de forma directa en lugar de posponerlas repetidamente. La acción reduce el peso mental. La evasión aumenta la ansiedad.',
  'mindset.card.prod59.content':
    'La productividad real no se trata de hacer más de forma constante. Se trata de usar el tiempo, la energía y la atención de forma intencional para crear un avance significativo mientras se mantiene el equilibrio emocional y la salud. La productividad sostenible apoya tanto el logro como el bienestar.',
  'mindset.card.mom1.content':
    'El impulso no requiere grandes saltos. Requiere movimientos pequeños y constantes en la misma dirección. Los días en que menos motivación sientes son a menudo los días en que las acciones pequeñas más importan. Aparecer en silencio, sin fanfarria, es como se acumula el progreso real. Un paso hacia adelante hoy es suficiente.',
  'mindset.card.mom2.content':
    'La resistencia llega al máximo antes de comenzar. Una vez que el movimiento empieza, casi siempre se vuelve más fácil. El cerebro interpreta la acción como seguridad y gradualmente reduce la resistencia. No esperes a que el momento se sienta correcto — el momento correcto suele llegar después de que ya hayas empezado.',
  'mindset.card.mom3.content':
    'Después de una pausa, no estás volviendo a cero. Estás regresando al comienzo de una nueva racha, cargando todo lo que ya has aprendido. El impulso reconstruido a menudo es más sólido que el original porque viene con evidencia de que ya has hecho esto antes. Ya sabes que puedes. Ese conocimiento no se borra.',
  'mindset.card.mom4.content':
    'Cada tarea que terminas libera una pequeña recompensa psicológica que prepara al cerebro para la siguiente. Por eso empezar por cualquier lugar — incluso por lo más fácil — puede desencadenar una cadena de acción. El impulso es en parte biológico. Úsalo con intención. Termina una cosa y deja que la energía te lleve a la siguiente.',
  'mindset.card.mom5.content':
    'La forma más poderosa de impulso es invisible para los demás. Es el acto diario de aparecer cuando nadie lo nota, cuando los resultados todavía no son visibles, cuando la duda es más ruidosa que la confianza. Esta constancia silenciosa es donde vive el cambio real. No necesitas grandes avances. Solo necesitas seguir moviéndote.',
  'mindset.card.mom6.content':
    'El impulso se acelera cuando lo adviertes. Rastrear las pequeñas victorias, reconocer el movimiento hacia adelante y celebrar la constancia no es vanidad — es refuerzo. El cerebro construye motivación a partir de la evidencia del progreso. Haz tu impulso visible, aunque solo sea para ti. Lo que mides y celebras tiende a crecer.',
  'mindset.card.mom7.content':
    'Esperar a sentirte lista es el principal enemigo del impulso. La preparación rara vez llega sola — la crea la acción. El sentido de estar preparada viene después de los primeros pasos, no antes. Las personas con alto impulso actúan antes de la certeza, aprenden durante el movimiento y ajustan mientras avanzan. Empieza ahora. Ajusta después.',
  'mindset.card.mom8.content':
    'Cada día que apareces se suma a una base que se acumula de forma invisible en el corto plazo e innegable en el largo plazo. Las personas que parecen dar saltos repentinos hacia adelante suelen ser las que invirtieron meses de esfuerzo silencioso antes. Tu constancia actual está construyendo algo que todavía no puedes ver del todo.',

  // ── Rhythm card content (first 5) ────────────────────────────────────────
  'mindset.card.m2.content':
    'Si una tarea tarda menos de dos minutos, hazla de inmediato. No la programes, no la anotes — simplemente hazla. Esta regla sencilla elimina cientos de pequeñas procrastinaciones que se acumulan en una niebla de cosas sin terminar. La acumulación de tareas pequeñas incompletas agota la energía mental sin que te des cuenta. Líbrate de ellas al momento.',
  'mindset.card.m8.content':
    'Cada acción que tomas es un voto por el tipo de persona en la que te estás convirtiendo. No tienes que creerlo al principio — solo tienes que actuar con constancia. No preguntes "¿Qué necesito hacer?" sino "¿Quién quiero ser?" Cuando el hábito se convierte en identidad, la motivación deja de ser necesaria.',
  'mindset.card.m14.content':
    'Habrá un día en que no lo hagas. Eso no es fracasar — es ser humana. La regla es simple: nunca falles dos veces seguidas. Un día perdido es un accidente. Dos días perdidos son el comienzo de un hábito nuevo — el hábito de no aparecer. La mentalidad del reset dice: "Ayer fallé. Hoy vuelvo a empezar." Sin drama. Sin castigo. Solo: hoy vuelvo a empezar.',
  'mindset.card.m20.content':
    'El almirante Stockdale vivía con una paradoja: enfrentar los hechos más duros de su realidad, mientras mantenía una fe inquebrantable en que saldría adelante. No pretendas que las cosas van mejor de lo que van. Tampoco que van peor. Ve con claridad. Cree con firmeza. Actúa con constancia. Esa combinación es la base de la resiliencia real.',
  'mindset.card.disc1.content':
    'La disciplina no es un castigo — es una prueba de que valoras tu futuro lo suficiente como para protegerlo. Cada promesa que te cumples a ti misma fortalece tu identidad y tu autoconfianza. Las personas con disciplina no son necesariamente más motivadas; simplemente actúan según sus prioridades en lugar de sus emociones del momento. La confianza real viene de saber que puedes contar contigo misma.',

  // ── Rhythm card content (next 30: disc2–disc31) ───────────────────────────
  'mindset.card.disc2.content':
    'La motivación viene y va. Algunos días está aquí, clara y cercana. Otros días simplemente no aparece. El ritmo es lo que sigue cuando la motivación se ausenta — no porque seas perfecta, sino porque has aprendido a sostenerte. No hace falta esperar a sentirte inspirada para dar el siguiente paso. El ritmo cuida de eso.',
  'mindset.card.disc3.content':
    'La vida no cambia de un día para otro. Cambia en los momentos ordinarios — cuando te levantas a la hora que dijiste, cuando terminas lo que empezaste, cuando das un pequeño paso aunque no tengas ganas. No se necesita una gran decisión. Solo constancia tranquila. Los hábitos construyen el futuro en silencio, sin prisa.',
  'mindset.card.disc4.content':
    'El cuerpo busca lo cómodo. Es natural. Pero crecer casi siempre implica un momento de incomodidad — no de sufrimiento, sino de esfuerzo. Cada vez que eliges lo que importa sobre lo que es fácil, fortaleces algo en ti. La comodidad no es el problema. Lo es quedarse solo en ella.',
  'mindset.card.disc5.content':
    'Hay una idea de que el ritmo limita. Pero en realidad, lo que limita es el caos. Cuando tienes una estructura que sostiene tu vida, tus decisiones se vuelven más tranquilas. Menos debate interno. Más claridad. El ritmo no te encadena — te da espacio para moverte con más libertad.',
  'mindset.card.disc6.content':
    'No siempre te sentirás lista. Eso es normal. El ritmo no espera a que llegue la inspiración — empieza de todas formas, despacio, sin prisa. Una vez que el movimiento comienza, la resistencia se afloja. Lo más difícil suele ser el primer paso. Dar ese paso, aunque sea pequeño, ya es suficiente.',
  'mindset.card.disc7.content':
    'Cualquiera puede sostener el ritmo cuando todo va bien. La constancia real aparece en los días difíciles — cuando estás cansada, cuando no hay claridad, cuando sería mucho más fácil parar. Son esos días los que construyen algo duradero. Seguir en los momentos incómodos cambia lo que crees que eres capaz de hacer.',
  'mindset.card.disc8.content':
    'Lo que haces hoy en silencio va construyendo quién serás mañana. No hace falta hacer grandes cosas. Los pequeños hábitos repetidos con constancia suave van dejando huella. Tus rutinas votan, día a día, por la persona que estás llegando a ser. Eso importa mucho más de lo que parece.',
  'mindset.card.disc9.content':
    'La mente sin ritmo negocia constantemente consigo misma. "Luego lo hago." "Esta vez no importa." "Mañana será diferente." Cuando tienes una estructura, esas conversaciones internas se calman. No porque te estés controlando — sino porque el camino ya está claro. Menos debate, más presencia.',
  'mindset.card.disc10.content':
    'Vivimos rodeadas de cosas diseñadas para distraernos. En ese contexto, poder sostener tu atención donde la elegiste es algo valioso. No se trata de rigidez — se trata de saber qué importa y cuidarlo. Cada vez que eliges con calma sobre el impulso, te conoces un poco mejor.',
  'mindset.card.disc11.content':
    'No hace falta un esfuerzo enorme. Lo que construye resultados reales es la repetición tranquila — hacer un poco cada día, sin agotarse, sin presionarse. Los grandes cambios casi siempre se construyen despacio y en silencio. La constancia suave supera al esfuerzo intenso. Siempre.',
  'mindset.card.disc12.content':
    'Las intenciones no se sostienen solas. Sin una estructura que las cuide, se van diluyendo. La constancia es lo que convierte lo que quieres en algo real. No hace falta emoción permanente — hace falta seguir moviéndote, aunque sea despacio, en la dirección que elegiste.',
  'mindset.card.disc13.content':
    'A veces hacer lo que importa significa dejar pasar algo más cómodo. Ese momento de incomodidad no es un castigo — es una inversión. Lo que decides hoy con calma y claridad, tu yo del futuro lo va a agradecer. La constancia también se trata de eso: cuidarte a ti misma hacia adelante.',
  'mindset.card.disc14.content':
    'Lo que repites le enseña a tu mente quién eres. Cada vez que cumples lo que te dijiste — aunque sea algo pequeño — fortaleces la imagen que tienes de ti misma. La identidad no se declara, se construye. Acción a acción, en silencio, con constancia.',
  'mindset.card.disc15.content':
    'Las excusas se sienten bien en el momento — alivian la presión, justifican la pausa. Pero con el tiempo erosionan algo más profundo: la confianza que tienes en ti misma. El ritmo crece cuando empiezas a responsabilizarte de tus decisiones, no porque las circunstancias sean perfectas, sino porque tú importas.',
  'mindset.card.disc16.content':
    'Las emociones fluctúan. Eso es inevitable. El ritmo no depende de sentirte bien — depende de tener claro qué valoras. Actuar desde tus valores, y no solo desde lo que sientes en el momento, es una forma de cuidarte profundamente. La calma interna te permite seguir cuando las emociones no acompañan.',
  'mindset.card.disc17.content':
    'La confianza no solo viene de los logros. Viene de la constancia. De cumplirte. De cada pequeña promesa que te hiciste y que guardaste. Con el tiempo, tu mente empieza a saber que puede contar contigo. Esa seguridad interior no se ve, pero se siente en todo lo que haces.',
  'mindset.card.disc18.content':
    'El desorden cansa. No porque seas débil, sino porque la mente gasta mucha energía navegando el caos. Cuando tus rutinas tienen estructura, esa energía se libera. Menos decisiones pequeñas que tomar, más presencia disponible para lo que importa. La simplicidad también es una forma de sostenerse.',
  'mindset.card.disc19.content':
    'Cada acción con ritmo es una elección — entre lo que importa y lo que simplemente distrae. Cuando tienes claros tus valores, esa elección se vuelve más fácil. No hace falta fuerza de voluntad constante. Solo claridad sobre qué quieres que ocupe tu vida. La claridad sostiene la constancia.',
  'mindset.card.disc20.content':
    'No todo tiene que ser inmediato. Hay un tipo de bienestar que solo llega con tiempo — cuando miras hacia atrás y ves que seguiste, que esperaste, que confiaste en el proceso. La capacidad de posponer la gratificación es uno de los regalos más silenciosos de la constancia. Vale la pena cultivarla.',
  'mindset.card.disc21.content':
    'No puedes estar disponible para todo y aun así sostener tu ritmo. La constancia necesita límites — no como muros, sino como cuidado. Proteger tu atención es proteger lo que importa. Decir que no a algunas cosas es decir que sí a lo que valoras. Eso también es ritmo.',
  'mindset.card.disc22.content':
    'Las elecciones fáciles rara vez construyen algo duradero. Son los momentos difíciles — cuando podrías parar pero sigues, cuando podrías evitarlo pero lo enfrentas — los que van formando tu fortaleza. No hace falta buscar la dificultad. Solo no huir de ella cuando aparece.',
  'mindset.card.disc23.content':
    'Habrá momentos en que todo alrededor se sienta incierto. En esos momentos, tus pequeños ritmos — las cosas que haces de forma regular — se convierten en un ancla. No resuelven lo que está afuera, pero crean estabilidad adentro. El ritmo es un refugio tranquilo, incluso en los días complicados.',
  'mindset.card.disc24.content':
    'Lo que repites día a día no es neutral. Cada hábito va construyendo algo — hacia donde quieres ir, o en otra dirección. No hace falta ser perfecta. Hace falta ser consciente. Pequeños ajustes en lo que repites pueden cambiar mucho a lo largo del tiempo. Tus patrones diarios importan.',
  'mindset.card.disc25.content':
    'Empezar se siente bien. El ritmo está en lo que sigue después — cuando la emoción inicial se calma y aun así continúas. Terminar lo que empezaste es una forma de respetarte. De confiar en ti. Cada cosa que cierras bien te enseña que puedes contar contigo misma hasta el final.',
  'mindset.card.disc26.content':
    'El descanso no es lo contrario del ritmo — es parte de él. Sostenerse a largo plazo requiere también pausar, recuperarse, dormir bien. Las personas que mantienen la constancia real no son las que nunca paran — son las que saben cuándo parar para poder seguir. El cuidado también es ritmo.',
  'mindset.card.disc27.content':
    'Muchos de los arrepentimientos más profundos vienen de no haber actuado cuando podías. La constancia tranquila — hacer lo que necesitas hacer, aunque no sea fácil — va protegiendo tu paz futura. Lo que haces hoy con cuidado, tu yo del mañana lo va a agradecer en silencio.',
  'mindset.card.disc28.content':
    'Tu mente aprende de lo que repites. Si practicas presencia, poco a poco te vuelves más presente. Si practicas constancia, poco a poco te vuelves más constante. No eres un carácter fijo — eres lo que eliges practicar, día a día. La repetición forma quién eres.',
  'mindset.card.disc29.content':
    'Cada promesa rota que te haces a ti misma deja un rastro sutil. Con el tiempo, la confianza en ti misma se va erosionando. El ritmo empieza cuando comienzas a cumplirte — en pequeñas cosas, sin presión, con calma. Cada promesa guardada te acerca un poco más a confiar en ti de verdad.',
  'mindset.card.disc30.content':
    'La mayoría de las personas subestima cuánto impacta en su futuro lo que hacen cada día. Las pequeñas decisiones que repites — con constancia, sin dramatismo — van determinando en silencio las oportunidades, la confianza, la salud, la estabilidad. No hace falta controlarlo todo. Hace falta seguir moviéndote en la dirección que elegiste.',
  'mindset.card.disc31.content':
    'Habrá días en que no tengas ganas. En que estés cansada, distraída, sin claridad. El ritmo es lo que te permite seguir de todas formas — no porque debas ser perfecta, sino porque has aprendido a sostenerte incluso cuando no es fácil. Quien cambia su vida generalmente es quien sigue cuando sería más sencillo parar.',

  // ── Rhythm card content (final 26: disc32–disc57) ─────────────────────────
  'mindset.card.disc32.content':
    'El ritmo empieza con lo que decides aceptar. Lo que toleras de forma repetida acaba convirtiéndose en tu normalidad. Cuando elevas lo que te exiges — no por presión, sino por respeto hacia ti misma — tus acciones comienzan a cambiar de forma natural. Los estándares que estableces en silencio van determinando la vida que construyes.',
  'mindset.card.disc33.content':
    'Los impulsos son fugaces. Las consecuencias, no siempre. El ritmo te ayuda a pausar un momento antes de actuar — a reconectarte con lo que realmente quieres, más allá de lo que sientes ahora. En los momentos difíciles, recordar tus prioridades más profundas crea claridad. Tus metas a largo plazo merecen más autoridad que las emociones del instante.',
  'mindset.card.disc34.content':
    'La fortaleza mental no viene de los grandes esfuerzos ocasionales. Viene de los pequeños momentos repetidos — cada vez que sigues cuando preferirías parar, cada vez que te mantienes aunque sea incómodo. Con cada acción difícil que completas, tu resiliencia crece un poco más. La constancia entrena la mente a sostenerse con calma.',
  'mindset.card.disc35.content':
    'La falta de estructura crea un ruido interno constante. El ritmo trae orden — no como rigidez, sino como un espacio donde tu mente puede descansar. Cuando tus rutinas tienen forma, gastas menos energía en recuperarte del caos. La simplicidad sostiene. El orden también cuida.',
  'mindset.card.disc36.content':
    'Las excusas se sienten como alivio en el momento. Pero a lo largo del tiempo, van dejando un peso. El ritmo no pide condiciones perfectas — pide que te hagas responsable de lo que puedes hacer ahora. El progreso no depende de que todo esté bien. Depende de que sigas eligiendo avanzar.',
  'mindset.card.disc37.content':
    'Las transformaciones grandes casi nunca llegan de un solo golpe. Llegan de miles de pequeñas decisiones repetidas con constancia. La constancia rara vez es dramática — es silenciosa, invisible en el momento. Pero cada pequeña acción va dejando huella. Con el tiempo, la diferencia es enorme.',
  'mindset.card.disc38.content':
    'Muchas personas abandonan porque se exigen ser perfectas. La constancia no es eso. La constancia es volver — rápido, sin drama, sin castigarte. Un tropiezo no rompe el ritmo si eliges retomarlo. La consistencia a largo plazo crea cambios reales. La perfección, rara vez.',
  'mindset.card.disc39.content':
    'El crecimiento real casi siempre llega más despacio de lo que esperamos. El ritmo significa seguir trabajando incluso antes de ver resultados visibles. La impaciencia hace que muchas personas abandonen hábitos valiosos demasiado pronto. La paciencia es parte de la constancia. En silencio, el progreso invisible también avanza.',
  'mindset.card.disc40.content':
    'Los hábitos sin estructura gastan energía de formas que rara vez notamos. Las noches tarde, las distracciones constantes, la procrastinación — con el tiempo ese desgaste se acumula. El ritmo crea patrones más saludables que protegen tu energía mental, emocional y física. Cuidar tus hábitos es cuidarte a ti.',
  'mindset.card.disc41.content':
    'Lo que antes se sentía imposible, con el tiempo puede volverse natural. No porque hayas cambiado dramáticamente — sino porque la repetición reduce la resistencia interna. Cada vez que haces algo difícil, el siguiente intento pide un poco menos de energía. El ritmo transforma lo complicado en cotidiano.',
  'mindset.card.disc42.content':
    'Liderarte a ti misma significa guiar tus acciones desde lo que valoras, no desde el impulso del momento. La constancia fortalece esa capacidad poco a poco. No se trata de control rígido — se trata de aprender a dirigirte con calma. Con el tiempo, te vuelves más confiable para ti misma. Y eso cambia todo.',
  'mindset.card.disc43.content':
    'El carácter se construye en lo que haces cuando nadie está mirando. Las elecciones tranquilas, repetidas en silencio, son las que más forman quién eres. Las pequeñas acciones privadas — las que nadie celebra — suelen determinar los resultados que el mundo ve después. Tu ritmo invisible construye tu futuro visible.',
  'mindset.card.disc44.content':
    'Muchas decisiones impulsivas se sienten bien por un momento — pero dejan algo más pesado después. La constancia te enseña a hacer una pausa antes de actuar: a preguntarte cómo se sentirá esto mañana, no solo ahora. La contención sabia no es privarte — es cuidarte hacia adelante. Tu paz futura empieza en las decisiones de hoy.',
  'mindset.card.disc45.content':
    'Cuando tus acciones dependen completamente de cómo te sientes, la vida se vuelve emocionalmente impredecible. El ritmo crea una base estable que no fluctúa con el estado de ánimo. Tener rutinas que se sostienen — aunque las emociones cambien — reduce el caos interno. La calma en las decisiones diarias construye resiliencia.',
  'mindset.card.disc46.content':
    'A medida que desarrollas tu propio ritmo, dependes cada vez menos de que alguien te recuerde, te empuje o te valide. Empiezas a moverte desde adentro — desde tus propias razones. Esa independencia interna es una de las formas más silenciosas y poderosas de crecer. No esperas que nadie te salve. Tú misma te sostienes.',
  'mindset.card.disc47.content':
    'El impulso es frágil. Unos pocos días de inconsistencia pueden debilitar lo que llevaba semanas construyéndose. El ritmo protege ese impulso — especialmente en los días de poca energía, cuando lo más fácil sería parar. Incluso un pequeño esfuerzo mantiene el movimiento vivo. La constancia cuida el progreso.',
  'mindset.card.disc48.content':
    'La tendencia natural es evitar lo incómodo. Pero el ritmo te enseña a quedarte dentro de esos momentos con calma — sin huir inmediatamente. Crecer casi siempre implica algo de aburrimiento, repetición, incertidumbre o esfuerzo. Aprender a tolerarlo, despacio, fortalece tu equilibrio emocional.',
  'mindset.card.disc49.content':
    'La fuerza de voluntad sola raramente es suficiente. Tu entorno influye profundamente en tus hábitos. Cuando tu espacio apoya tus metas — en lugar de constantemente tentarte — la constancia se vuelve más natural. Diseñar tu entorno con cuidado también es una forma de cuidarte. El ritmo no solo vive dentro de ti.',
  'mindset.card.disc50.content':
    'Las personas que cumplen lo que dicen construyen confianza — primero en ellas mismas, luego en quienes las rodean. La constancia, repetida en el tiempo, te hace confiable. Cuando puedes contar contigo misma, tu confianza crece de forma natural. La constancia crea respeto — hacia afuera y hacia adentro.',
  'mindset.card.disc51.content':
    'Empezar es importante. Pero el ritmo también está en continuar cuando el entusiasmo inicial se calma. Muchas personas pierden la constancia justo en la fase del medio — cuando ya no hay novedad pero tampoco hay resultados claros. Es ahí donde ocurre el crecimiento real. La persistencia tranquila crea los resultados que transforman.',
  'mindset.card.disc52.content':
    'Cada acción consistente que haces hoy es un regalo para la versión futura de ti misma. Los hábitos saludables, la responsabilidad, el aprendizaje continuo — todos crean beneficios que quizás no se ven de inmediato. El ritmo es autocuidado a largo plazo. Tu estabilidad futura se construye con lo que haces hoy.',
  'mindset.card.disc53.content':
    'La procrastinación y la inconsistencia crean un ruido interno constante — tareas pendientes, culpa, tensión difusa. La constancia reduce ese ruido al crear acción y cierre. Cuanto más manejas tus responsabilidades con intención, más tranquila se vuelve tu mente. El orden también despeja. La claridad también cuida.',
  'mindset.card.disc54.content':
    'Mantener el ritmo no te protege de los días malos ni de los tropiezos. La diferencia está en lo que ocurre después. Quien tiene constancia vuelve más rápido — sin dramatismo, sin abandono total. La resiliencia no es no caer; es acortar la distancia entre el tropiezo y el regreso. El ritmo sobrevive los contratiempos.',
  'mindset.card.disc55.content':
    'Cada acción refuerza una versión de ti misma. La constancia te ayuda a elegir, una y otra vez, los comportamientos que se alinean con quien quieres llegar a ser. La identidad no llega de golpe — se construye en silencio, a través de la repetición. Tu carácter futuro está tomando forma en las pequeñas decisiones de hoy.',
  'mindset.card.disc56.content':
    'Cuando tus comportamientos positivos se vuelven automáticos, mantenerlos requiere cada vez menos energía. Los hábitos reducen la necesidad de tomar decisiones constantemente. El objetivo no es esforzarse para siempre — es construir sistemas que sostengan la constancia de forma natural. Con el tiempo, el ritmo fluye solo.',
  'mindset.card.disc57.content':
    'La mayoría de los actos de constancia parecen pequeños en el momento. Una hora enfocada. Una elección saludable. Una conversación difícil. Pero con meses y años, esas acciones se acumulan en una transformación real. El ritmo raramente crea resultados inmediatos. Su poder verdadero aparece despacio, en silencio, con el tiempo.',

  // ── Mindset screen UI labels ──────────────────────────────────────────────
  'mindset.subtitle.free':           'Un insight significativo cada día.',
  'mindset.subtitle.premium':        'Reflexiones para tu ritmo.',
  'mindset.subtitle.locked':         'Se desbloquea con Premium.',
  'mindset.subtitle.count.one':      '{{n}} insight desbloqueado.',
  'mindset.subtitle.count.other':    '{{n}} insights desbloqueados.',
  'mindset.badge.today':             'HOY',
  'mindset.dayLabel':                'DÍA {{day}}',
  'mindset.insightLabel':            'INSIGHT',
  'mindset.locked.journey':          'Llega en su momento.',
  'mindset.locked.return':           'Llega con el tiempo.',
  'mindset.modal.day':               'Día {{day}}',
  'mindset.modal.insight':           'Insight',
  'mindset.modal.minread':           '{{n}} min de lectura',
  'mindset.foryou.title':            'PARA TI HOY',
  'mindset.foryou.question':         '¿Cómo llegas hoy?',
  'mindset.foryou.recommended':      'RECOMENDADO PARA TI',
  'mindset.foryou.curated':          'Curado para tu viaje',
  'mindset.emotion.overwhelmed':     'Presión',
  'mindset.emotion.numb':            'Neblinoso',
  'mindset.emotion.frustrated':      'Agobio',
  'mindset.emotion.low_energy':      'Energía baja',
  'mindset.emotion.anxious':         'Ruido interior',
  'mindset.emotion.balanced':        'En equilibrio',
  'mindset.emotion.overwhelmed.sub': 'Para cuando todo parece demasiado.',
  'mindset.emotion.numb.sub':        'Para cuando la mente se queda en silencio.',
  'mindset.emotion.frustrated.sub':  'Para cuando el peso es difícil de llevar.',
  'mindset.emotion.low_energy.sub':  'Para cuando el ritmo ha bajado.',
  'mindset.emotion.anxious.sub':     'Para cuando el ruido no para.',
  'mindset.emotion.balanced.sub':    'Para cuando las cosas fluyen bien.',
  'mindset.coming.eyebrow':          'LLEGANDO CON TU VIAJE',
  'mindset.unlock.title':            'TU ESPACIO CONTINÚA AQUÍ',
  'mindset.unlock.cta':              'Continúa tu viaje →',
  'mindset.library.title':           'CAMINOS PARA VOLVER',
  'mindset.library.insights':        'Nuevos momentos llegan con el tiempo',
  'mindset.lib.burnout':             'Recuperación del Burnout',
  'mindset.lib.emotional':           'Reset Emocional',
  'mindset.lib.discipline':          'Disciplina Suave',
  'mindset.lib.detox':               'Detox Digital',
  'mindset.lib.focus':               'Recuperación del Enfoque',
  'mindset.lib.burnout.count':       'Recuperación del Burnout — 12 insights',
  'mindset.lib.emotional.count':     'Reset Emocional — 10 insights',
  'mindset.lib.discipline.count':    'Disciplina Suave — 8 insights',
  'mindset.lib.detox.count':         'Detox Digital — 8 insights',
  'mindset.lib.focus.count':         'Recuperación del Enfoque — 10 insights',
  'mindset.lib.burnout.sub':         'Tu cuerpo no fue hecho para vivir en alerta constante.',
  'mindset.lib.emotional.sub':       'No tienes que resolver todo ahora mismo.',
  'mindset.lib.discipline.sub':      'La consistencia crece mejor sin fuerza.',
  'mindset.lib.detox.sub':           'El silencio también es productividad.',
  'mindset.lib.focus.sub':           'No toda distracción es pereza.',

  // ── Paywall — full copy ───────────────────────────────────────────────────
  'paywall.loading':               'Procesando...',
  'paywall.legal.full':            'Facturado a través de App Store o Google Play.',
  'paywall.v1.heading':            'Este espacio es tuyo\npara continuar.',
  'paywall.v1.body':               'Un espacio más profundo para cuando es más ruidoso, más pesado,\no simplemente más difícil volver a ti.',
  'paywall.v1.cta':                '⭐  Prueba 7 días gratis',
  'paywall.v1.ctaSub':             'Luego $49.99/año',
  'paywall.v1.cancel':             'Cancela cuando quieras',
  'paywall.v1.maybe':              'Quizás más tarde',
  'paywall.v1.footer':             'Sin compromiso. Cancela antes de que termine la prueba.',
  'paywall.v2.eyebrow':            'DÍA 3',
  'paywall.v2.heading':            'Volviste\ntres veces.',
  'paywall.v2.sub':                'Hay más aquí, cuando quieras.',
  'paywall.v2.tagline':            'Una mente más tranquila. Una rutina más suave.\nUn lugar al que volver cada día.',
  'paywall.v2.why1':               'No necesitas más presión.\nNecesitas un lugar al que volver.',
  'paywall.v2.why2':               'Este espacio se vuelve más tranquilo cuanto más regresas.',
  'paywall.v2.cta':                'Continúa tu Reset →',
  'paywall.v2.ctaSub':             'Cancela cuando quieras. Sin presión. Tu ritmo es tuyo.',
  'paywall.feat.mindLoud':         'mente agitada',
  'paywall.feat.emoTired':         'emocionalmente cansado',
  'paywall.feat.tryingAgain':      'intentando de nuevo',
  'paywall.feat.needCalm':         'necesito calma',
  'paywall.feat.startingOver':     'empezando de nuevo',
  'paywall.feat.hardWeek':         'semana difícil',
  'paywall.t1.quote':              'Lo abro antes de cada reunión estresante.',
  'paywall.t1.name':               'Sarah, 34',
  'paywall.t2.quote':              'Es la única app que no he borrado en un año.',
  'paywall.t2.name':               'Marcus, 41',
  'paywall.t3.quote':              'Se siente como que alguien finalmente lo entiende.',
  'paywall.t3.name':               'Priya, 29',
  'paywall.plan.badge':            'MÁS ELEGIDO · 7 días gratis',
  'paywall.plan.annual.name':      'Anual — $49.99/año',
  'paywall.plan.annual.note':      'Para un año de apoyo más profundo.',
  'paywall.plan.monthly.name':     'Mensual — $8.99/mes',
  'paywall.plan.monthly.note':     'Apoyo suave, mes a mes.',
  'paywall.v3.eyebrow':            'TU ESPACIO SIGUE AQUÍ.',
  'paywall.v3.heading':            'Hay más aquí, si lo quieres.',
  'paywall.v3.sub':                'Para los momentos en que el día\npide más de lo esperado.',
  'paywall.v3.b1.title':           'Un espacio diario para volver a ti',
  'paywall.v3.b1.sub':             'Una reflexión. Un respiro. Un reset.',
  'paywall.v3.b2.title':           'Claridad emocional, un tema a la vez',
  'paywall.v3.b2.sub':             'Enfoque, calma, coraje, descanso — lo que hoy pida.',
  'paywall.v3.b3.title':           'Una biblioteca de mentalidad curada',
  'paywall.v3.b3.sub':             'Reflexiones que te encuentran donde estás.',
  'paywall.v3.annual.name':        'Anual',
  'paywall.v3.annual.free':        '7 días gratis',
  'paywall.v3.annual.price':       '$49.99/año',
  'paywall.v3.annual.priceSub':    '  ·  $4.16/mes',
  'paywall.v3.annual.note':        'Menos que un café. Cada mes.',
  'paywall.v3.monthly.name':       'Mensual',
  'paywall.v3.monthly.price':      '$8.99/mes',
  'paywall.v3.monthly.note':       'Pruébalo, cancela cuando quieras.',
  'paywall.v3.cta.free':           'Comienza mi semana gratis →',
  'paywall.v3.cta.today':          'Empieza hoy →',
  'paywall.v3.ctaSub':             'Sin compromiso. Cancela en Ajustes cuando quieras.',
  'paywall.v3.whatLabel':          'QUÉ SE VUELVE MÁS TRANQUILO',
  'paywall.v3.what1':              'Dejas de llegar a tus mañanas con tensión.',
  'paywall.v3.what2':              'La culpa de no hacer suficiente se calma.',
  'paywall.v3.what3':              'Empiezas a confiar en ti de nuevo, poco a poco.',
  'paywall.alert.trial.title':     'Tu prueba de 7 días ha comenzado.',
  'paywall.alert.trial.msg':       'Todo está desbloqueado. Cancela antes de que termine la prueba.',
  'paywall.alert.monthly.title':   'Bienvenido al acceso completo.',
  'paywall.alert.monthly.msg':     'Todo está desbloqueado. Un día a la vez.',
  'paywall.hero.eyebrow':          'TU VIAJE COMPLETO TE ESPERA',
  'paywall.manifesto.eyebrow':     'PEQUEÑOS CAMBIOS. CAMBIO DURADERO.',
  'paywall.manifesto.headline':    'La transformación se construye en silencio.',
  'paywall.manifesto.body':        'La mayoría espera el momento perfecto.\nEl cambio real viene de volver cada día.',
  'paywall.manifesto.b1':          'Atención más clara con el tiempo',
  'paywall.manifesto.b2':          'Rutinas diarias más sólidas',
  'paywall.manifesto.b3':          'Menos ruido emocional',
  'paywall.manifesto.closing':     'Construido suavemente. Repetido cada día.',
  'paywall.what.changes':          'QUÉ CAMBIA',
  'paywall.unlocked':              'DESBLOQUEADO CON PREMIUM',

  // ── Progress — narrative card ─────────────────────────────────────────────
  'progress.narrative.moments.pre':        '',
  'progress.narrative.moments.post.one':   ' momento, solo tuyo.',
  'progress.narrative.moments.post.other': ' momentos, solo tuyos.',
  'progress.narrative.streak.pre':         '',
  'progress.narrative.streak.post.one':    ' día de continuidad.',
  'progress.narrative.streak.post.other':  ' días de continuidad.',

  // ── Progress — burnout recovery phases ───────────────────────────────────
  'progress.phase.beginner.label':         'VOLVER A TI',
  'progress.phase.beginner.desc':          'Sin prisa.',
  'progress.phase.beginner.days':          'Días 1–7',
  'progress.phase.rebuilding.label':       'RECONSTRUIR LA CONFIANZA',
  'progress.phase.rebuilding.desc':        'La confianza regresa en silencio.',
  'progress.phase.rebuilding.days':        'Días 8–21',
  'progress.phase.momentum.label':         'ENCUENTRA TU RITMO',
  'progress.phase.momentum.desc':          'La consistencia se convierte en identidad',
  'progress.phase.momentum.days':          'Días 22–59',
  'progress.phase.identity.label':         'CONVIÉRTETE EN ESA PERSONA',
  'progress.phase.identity.desc':          'La identidad cambia a través de la repetición',
  'progress.phase.identity.days':          'Días 60–89',
  'progress.phase.transformation.label':   'RECUPERACIÓN TOTAL',
  'progress.phase.transformation.desc':    'Te reconstruiste',
  'progress.phase.transformation.days':    'Días 90+',
  'progress.phase.comingNext':             'LO QUE SIGUE',

  // ── Progress — journey / week / card / chapters ───────────────────────────
  'progress.journey.here':          'Todavía estás aquí.',
  'progress.journey.returnsCount':  'Cada regreso cuenta.',
  'progress.journey.nextMilestone': 'Próximo hito — Día {{n}}',
  'progress.week.unwritten':        'La semana todavía está por escribir.',
  'progress.week.allDays':          'Apareciste todos los días de esta semana.',
  'progress.week.oneReturn':        'Algo en ti volvió esta semana.',
  'progress.week.nReturns':         'Volviste {{n}} veces esta semana.',
  'progress.card.daysIn':           'días dentro',
  'progress.card.resetsDone':       'resets realizados',
  'progress.chapter.week1':         'La primera semana. Algo tomó forma.',
  'progress.chapter.week2':         'Dos semanas. El ritmo empieza a sostenerse.',
  'progress.chapter.month1':        'Un mes. El regreso ya tiene ritmo.',

  // ── Return experience ────────────────────────────────────────────────────────
  'return.heading':       'Volviste.',
  'return.30plus.body':   "Pasó un tiempo.\n\nAquí nada guardó rencor.\nAquí nada necesita explicación.\n\nApareciste.\nEso es suficiente.",
  'return.30plus.extra':  'Las pausas largas no son un fracaso.\nSon parte del camino.',
  'return.7plus.body':    "Estuviste fuera un tiempo.\n\nAquí nada guardó rencor.\nNo debes explicaciones.\n\nApareciste.\nEso es suficiente.",
  'return.3plus.body':    'Sin ponerse al día.\nSolo hoy.',
  'return.cta':           'Empezar hoy',

  // ── Welcome back experience ───────────────────────────────────────────────────
  'wb.normal.0':      'Qué bueno verte de nuevo.',
  'wb.normal.1':      'Empecemos con calma.',
  'wb.normal.2':      'Una pequeña pausa para ti.',
  'wb.normal.3':      'Un momento tranquilo.',
  'wb.normal.4':      'Estás aquí.',
  'wb.returning.0':   'Siempre puedes volver a empezar.',
  'wb.returning.1':   'Sin presión. Solo hoy.',
  'wb.returning.2':   'No hay nada que recuperar.',
  'wb.returning.3':   'Vuelve a ti, con calma.',
  'wb.returning.4':   'Sigue aquí. Sigue siendo tuyo.',
  'wb.active.0':      'Progreso silencioso.',
  'wb.active.1':      'Has estado presente para ti.',
  'wb.active.2':      'Los pasos pequeños también importan.',
  'wb.active.3':      'La constancia también puede ser suave.',
  'wb.active.4':      'Un ritmo más tranquilo.',
  'wb.late_night.0':  'Un momento tranquilo antes del descanso.',
  'wb.late_night.1':  'Todavía estás aquí.',
  'wb.late_night.2':  'Esto es suficiente.',
  'wb.late_night.3':  'Deja que el día se asiente.',
  'wb.late_night.4':  'La quietud también es algo.',

  ...psEs,
};

// ─── French ───────────────────────────────────────────────────────────────────
const fr: TranslationMap = {
  // ── Tabs ────────────────────────────────────────────────────────────────────
  'tabs.today':    'Aujourd\'hui',
  'tabs.habits':   'Habitudes',
  'tabs.progress': 'Progrès',
  'tabs.mindset':  'Mentalité',
  'tabs.profile':  'Profil',

  // ── Today ───────────────────────────────────────────────────────────────────
  'greeting.morning':   'Bonjour. Tu es là. Ça compte déjà.',
  'greeting.afternoon': 'Bon après-midi. Un seul reset peut changer la direction de ta journée.',
  'greeting.evening':   'Bonsoir. Même une journée calme mérite un reset.',
  'today.headline':     'Recommencer\nd\'ici.',
  'today.subheadline':  'Une action aujourd\'hui suffit.',
  'today.checklist.title':          'LISTE DU JOUR',
  'today.checklist.morning':        'Routine matinale',
  'today.checklist.action':         'Action du jour',
  'today.checklist.deepwork':       'Travail profond',
  'today.checklist.nodistractions': 'Sans distractions',
  'today.checklist.evening':        'Réflexion du soir',
  'today.complete':     'Terminer le reset du jour',
  'today.focus':        'Minuterie Focus',
  'today.focus.short':  'Focus',
  'today.detox':        'Détox Numérique',
  'future.self.eyebrow':    'TOI DANS LE FUTUR',
  'future.self.question':   'UNE QUESTION POUR TOI',
  'future.self.prompt.sub': 'Prends un moment. Il n\'y a pas de bonne réponse.',
  'today.card.action':  'Action du jour',
  'today.card.why':     'Pourquoi c\'est important',
  'today.card.reflect': 'Réflexion',
  'today.badge.today':  'AUJOURD\'HUI',
  'today.day':          'Jour {{day}}',
  'today.done.title':   'Reset complété.',
  'today.done.sub':     'Tu étais présent aujourd\'hui.',
  'today.done.day':     'Jour {{day}} terminé',
  'today.locked.title': 'Jour {{day}} — encore à venir',
  'today.locked.sub':   'Débloque ton voyage complet de 365 jours.',
  'today.locked.cta':   'Débloquer l\'accès complet →',

  // ── Habits ──────────────────────────────────────────────────────────────────
  'habits.eyebrow':      'AUJOURD\'HUI',
  'habits.title':        'Habitudes',
  'habits.subtitle':     'Construire doucement',
  'habits.locked.title': 'Les habitudes s\'ouvrent au Jour 7',
  'habits.locked.sub':   'Pour l\'instant, la seule chose qui compte est ton reset quotidien. Reviens pendant 7 jours — tes habitudes t\'attendent.',
  'habits.locked.days':  '{{n}} jours avant que les habitudes s\'ouvrent',
  'habits.pct.label':    'complété aujourd\'hui',
  'habits.section':      'HABITUDES QUOTIDIENNES',
  'habit.morning':        'Routine matinale',
  'habit.workout':        'Exercice',
  'habit.deepwork':       'Travail profond',
  'habit.read':           'Lire 20 pages',
  'habit.water':          'Boire de l\'eau',
  'habit.nodistractions': 'Sans distractions',
  'habit.sleep':          'Se coucher tôt',
  'habit.plan':           'Planifier demain',
  'habit.gratitude':      'Gratitude',
  'habit.detox':          'Détox numérique',

  // ── Progress ────────────────────────────────────────────────────────────────
  'progress.eyebrow':        'TON VOYAGE',
  'progress.title':          'Progrès',
  'progress.subtitle':       'Ta constance, visualisée',
  'progress.card.label':     'Progrès du voyage',
  'progress.of365':          'sur 365 jours',
  'progress.today':          'Aujourd\'hui',
  'progress.week':           'Cette semaine',
  'stat.streak':             'Série',
  'stat.best':               'Meilleur',
  'stat.done':               'Faits',
  'stat.weekly':             'Hebdo',
  'stat.monthly':            'Mensuel',
  'stat.day':                'Jour',
  'progress.journey.title':  'Voyage de 365 Jours',
  'progress.journey.day':    'Jour {{day}} sur 365',
  'progress.journey.rem':    '{{days}} jours restants',

  // ── Mindset ─────────────────────────────────────────────────────────────────
  'mindset.eyebrow':    'BIBLIOTHÈQUE',
  'mindset.title':      'Mentalité',
  'mindset.subtitle.one':   '{{count}} insight débloqué',
  'mindset.subtitle.other': '{{count}} insights débloqués',
  'mindset.all':           'Tout',
  'mindset.today':         'AUJOURD\'HUI',
  'mindset.filter.today':  'Aujourd\'hui',
  'mindset.header.daily':  'Insight du jour.',
  'mindset.header.count':  '{{n}} insight{{s}} débloqué{{s}}.',
  'mindset.locked':     'Débloquer avec Premium',
  'mindset.empty':      'Complète ton premier Daily Reset\npour débloquer les insights Mentalité.',
  'mindset.min':        '{{n}} min',
  'mindset.minread':    '{{n}} min de lecture',
  'mindset.pro':        'PRO',
  'cat.focus':          'Focus',
  'cat.discipline':     'Rythme',
  'cat.confidence':     'Confiance en soi',
  'cat.productivity':   'Clarté',
  'cat.emotional':      'reset émotionnel',
  'cat.detox':          'Détox Numérique',
  'cat.focus.label':        'Focus',
  'cat.discipline.label':   'Rythme',
  'cat.confidence.label':   'Confiance en soi',
  'cat.productivity.label': 'Clarté',
  'cat.emotional.label':    'Reset Émotionnel',
  'cat.detox.label':        'Détox Numérique',
  'cat.calm.label':         'Calme',
  'cat.courage.label':      'Courage',
  'cat.rest.label':         'Repos',
  'cat.momentum.label':     'Élan',

  // ── Profile ─────────────────────────────────────────────────────────────────
  'profile.goals.title':       'TES OBJECTIFS',
  'profile.settings.title':    'PARAMÈTRES',
  'profile.name.placeholder':  'Touche pour ajouter ton nom',
  'profile.premium':           'PREMIUM',
  'profile.upgrade':           'Accède à l\'expérience complète',
  'profile.version':           'Daily Reset v1.0.0',
  'profile.row.notification':  'Heure de notification',
  'profile.row.language':      'Langue',
  'profile.row.restore':       'Restaurer l\'achat',
  'profile.row.privacy':       'Politique de confidentialité',
  'profile.row.terms':         'Conditions d\'utilisation',
  'profile.row.reset':         'Effacer mes données',
  'profile.restore.title':     'Restaurer l\'achat',
  'profile.restore.msg':       'Aucun achat précédent trouvé.',
  'profile.reset.title':       'Effacer mes données',
  'profile.reset.msg':         'Ton progrès local sera effacé. Cette action est irréversible.',
  'profile.reset.cancel':      'Annuler',
  'profile.reset.confirm':     'Effacer',
  'profile.modal.privacy':     'Politique de confidentialité',
  'profile.modal.terms':       'Conditions d\'utilisation',
  'profile.modal.journey.title': 'Ton chemin de retour',
  'profile.modal.journey.sub':   'L\'appli s\'adapte pour soutenir ton retour.',
  'profile.modal.eyebrow':     'DAILY RESET APP',
  'profile.modal.date':        'Dernière mise à jour : Mai 2026',
  'profile.modal.privacy.footer': 'En utilisant Daily Reset, tu acceptes cette Politique de confidentialité.',
  'profile.modal.terms.footer':   'En utilisant Daily Reset, tu acceptes ces Conditions d\'utilisation.',
  'notif.morning':   'Matin',
  'notif.afternoon': 'Après-midi',
  'notif.evening':   'Soir',
  'notif.settings.eyebrow':       'PARAMÈTRES',
  'notif.settings.title':         'Rappel quotidien',
  'notif.settings.sub':           'Choisis le meilleur moment pour ton reset.',
  'notif.period.label':           'PÉRIODE',
  'notif.period.morning.label':   'Matin',
  'notif.period.morning.sub':     'Commence ta journée avec intention',
  'notif.period.afternoon.label': 'Après-midi',
  'notif.period.afternoon.sub':   'Reset et refocus de mi-journée',
  'notif.period.evening.label':   'Soir',
  'notif.period.evening.sub':     'Termine ta journée en conscience',
  'notif.hour.label':             'HEURE DE NOTIFICATION',
  'notif.preview.text':           'Rappel chaque jour à',
  'notif.saved':                  'Rappel mis à jour.',
  'notif.saving':                 'Enregistrement...',
  'notif.save':                   'Enregistrer le rappel',
  'notif.evening.sectionLabel':   'CHECK-IN DU SOIR',
  'notif.evening.toggleLabel':    'Check-in du soir',
  'notif.evening.toggleSub':      'Un moment calme en fin de journée',
  'notif.word.sectionLabel':      'MOT DU JOUR',
  'notif.word.toggleLabel':       'Mot du jour',
  'notif.word.toggleSub':         'Envoyé 30 min avant ton rappel',
  'notif.milestone.sectionLabel': 'MOMENTS IMPORTANTS',
  'notif.milestone.toggleLabel':  'Moments importants',
  'notif.milestone.toggleSub':    'Quand quelque chose de significatif arrive',
  'notif.quiet.sectionLabel':     'JOURS CALMES',
  'notif.quiet.sub':              'Aucun rappel ces jours-là',
  'notif.promise.text':           "On envoie une notification par jour, maximum.\nJamais plus. C'est une promesse.",
  'notif.web.unavailable':        "Les rappels fonctionnent mieux dans l'appli installée.\nPour l'instant, vos resets sont disponibles normalement.",
  'notif.day.0': 'Dim', 'notif.day.1': 'Lun', 'notif.day.2': 'Mar', 'notif.day.3': 'Mer',
  'notif.day.4': 'Jeu', 'notif.day.5': 'Ven', 'notif.day.6': 'Sam',
  'lang.chooseLang':      'LANGUE',
  'lang.chooseLangTitle': 'Choisissez votre langue',
  'lang.en': 'English',
  'lang.es': 'Spanish',
  'lang.pt': 'Português',
  'lang.fr': 'Français',
  'lang.de': 'Deutsch',
  'lang.eyebrow':         'CHOISISSEZ VOTRE ESPACE',
  'lang.sub':             "Cette expérience s'adapte à ta langue et à ton rythme émotionnel.",

  // ── Common ──────────────────────────────────────────────────────────────────
  'common.continue':     'Continuer',
  'common.skip':         'Passer',

  // ── Onboarding — arrival question ───────────────────────────────────────────
  'onboarding.arrival.label':              'UNE QUESTION',
  'onboarding.arrival.title':              'Comment tu arrives\naujourd\'hui ?',
  'onboarding.arrival.subtitle':           'Il n\'y a pas de bonne réponse ici.',
  'onboarding.arrival.options.exhausted':  'Je suis épuisé, mais je n\'ai pas abandonné.',
  'onboarding.arrival.options.anxious':    'Mon esprit n\'arrête pas de tourner.',
  'onboarding.arrival.options.empty':      'Tout semble trop lourd en ce moment.',
  'onboarding.arrival.options.breathe':    'J\'ai juste besoin d\'un moment pour respirer.',
  'onboarding.arrival.options.returning':  'J\'essaie de retrouver mon chemin.',
  'onboarding.arrival.cta':               'C\'est moi aujourd\'hui',

  // ── Onboarding Promise ───────────────────────────────────────────────────────
  'onboarding.promise.heading':         'Un moment.\nChaque jour.\nRien qu\'à toi.',
  'onboarding.promise.body':            'Une petite chose chaque jour. Pas pour te réparer —\nmais pour t\'aider à traverser.',
  'onboarding.promise.pill.nopressure': 'Sans pression',
  'onboarding.promise.pill.minutes':    '2 minutes',
  'onboarding.promise.pill.pace':       'À ton rythme',
  'onboarding.promise.cta':            'Commencer mon reset →',
  'onboarding.promise.hint':           'Aucun compte requis. Commence en quelques secondes.',

  // ── Today — greetings ─────────────────────────────────────────────────────
  'today.greeting.morning':   'BONJOUR.',
  'today.greeting.afternoon': 'BON APRÈS-MIDI.',
  'today.greeting.evening':   'BONSOIR.',
  'today.greeting.done':      'TOUJOURS LÀ.',

  // ── Today — rotating subheadlines ─────────────────────────────────────────
  'today.subheadline.0': 'Certains changements n\'apparaissent que des semaines après avoir commencé.',
  'today.subheadline.1': 'La version de toi qui est encore là a déjà accompli quelque chose.',
  'today.subheadline.2': 'Rien de construit dans le silence ne semble beaucoup de l\'extérieur.',
  'today.subheadline.3': 'L\'élan n\'a pas besoin que chaque jour soit identique.',
  'today.subheadline.4': 'Même un retour lent reste un retour.',
  'today.subheadline.5': 'La présence n\'est pas une performance.',
  'today.subheadline.6': 'La distance entre où tu étais et où tu en es maintenant est réelle.',

  // ── Today — mood check-in ─────────────────────────────────────────────────
  'today.mood.label': 'Comment tu te sens maintenant ?',
  'today.mood.hard':  'Difficile',
  'today.mood.okay':  'Ça va',
  'today.mood.good':  'Bien',

  // ── Today — word of the day ───────────────────────────────────────────────
  'today.word.label': 'TON MOT DU JOUR',

  // ── Today — card section titles ───────────────────────────────────────────
  'today.section.action':     'Ton reset aujourd\'hui',
  'today.section.why':        'Pourquoi ça aide',
  'today.section.reflection': 'Réflexion',

  // ── Today — CTA ───────────────────────────────────────────────────────────
  'today.cta.complete': 'Terminer le reset du jour',

  // ── Today — streak state ──────────────────────────────────────────────────
  'today.streak.paused':    'Pause — bon retour',
  'today.streak.resting':   'Au repos — c\'est normal',
  'today.streak.returning': 'Te voilà de retour.',

  // ── Today — dynamic day label ─────────────────────────────────────────────
  'today.day.label': 'JOUR {{day}}',

  // ── Journal ───────────────────────────────────────────────────────────────
  'journal.title':            'Tes entrées.',
  'journal.subtitle':         '{{n}} jours enregistrés',
  'journal.empty.title':      'Rien encore ici.',
  'journal.empty.sub':        'Tes entrées apparaîtront ici\naprès ton premier reset.',
  'journal.day':              'JOUR {{day}}',
  'journal.completed':        '✓ Reset effectué',
  'journal.pill.action':      'Action',
  'journal.pill.reflection':  'Réflexion',
  'journal.nonotes':          'Reset effectué. Aucune note ajoutée.',
  'journal.norecord':         'Aucune note enregistrée.',
  'journal.recent.title':     'Réinitialisations récentes',
  'journal.calendar.title':   'Calendrier de votre parcours',
  'journal.modal.label.today':      'RESET DU JOUR',
  'journal.modal.label.action':     'TON RESET AUJOURD\'HUI',
  'journal.modal.label.why':        'POURQUOI ÇA AIDE',
  'journal.modal.label.reflection': 'RÉFLEXION',
  'journal.modal.label.moment':     'UN MOMENT DE RÉFLEXION',
  'journal.modal.label.after':      'APRÈS LE RESET',
  'journal.modal.after.sub':        'Ce qui est resté avec toi aujourd\'hui',
  'journal.modal.nonote':       'Aucune note ajoutée.',
  'journal.modal.noreflection': 'Aucune réflexion ajoutée.',
  'journal.modal.completed':    '✓ Reset effectué',

  // ── Quiet Reflections ─────────────────────────────────────────────────────
  'qr.title':         'Réflexions silencieuses',
  'qr.subtitle':      'Tes moments privés, gardés doucement.',
  'qr.empty.title':   'Certaines pensées passent. D\'autres restent.',
  'qr.empty.body':    'Un espace calme pour ce qui compte.',
  'qr.view.older':    'Voir les réflexions passées',
  'qr.closing':       'Ces moments t\'appartiennent.',
  'qr.group.week':    'Cette semaine',
  'qr.group.month':   'Plus tôt ce mois-ci',
  'qr.group.before':  'Gardées avant',
  'qr.echo.0':        'Tu portes beaucoup en silence.',
  'qr.echo.1':        'Tu reviens quand même.',
  'qr.echo.2':        'Certaines choses valent mieux être portées que résolues.',
  'qr.echo.3':        "Tout ce qui pèse n'a pas besoin d'être résolu maintenant.",
  'qr.echo.4':        'Tu as été là pour toi, discrètement.',
  'qr.echo.5':        'Une pensée douce est restée avec toi.',
  'qr.echo.6':        "Certaines pensées demandent à être entendues plus que résolues.",
  'qr.echo.7':        'Tu as été présent pour toi-même.',

  // ── Progress — private space ──────────────────────────────────────────────
  'progress.privatespace.eyebrow':        'TON ESPACE PRIVÉ',
  'progress.privatespace.headline':       'Un endroit calme pour déposer ce qui pèse.',
  'progress.privatespace.start':          'Écris ici...',
  'progress.privatespace.placeholder':    'Laisse venir...',
  'progress.privatespace.done':           'Prêt',
  'progress.privatespace.keep':           'Garder',
  'progress.privatespace.letgo':          'Lâcher',
  'progress.privatespace.kept.title':     'Gardé doucement.',
  'progress.privatespace.kept.sub':       'Cette réflexion reste avec toi.',
  'progress.privatespace.released.title': 'Lâché en douceur.',
  'progress.privatespace.released.sub':   'Certaines pensées ont le droit de passer.',
  'progress.qr.title':                    'Réflexions silencieuses',
  'progress.qr.sub.empty':               'Tes moments privés, gardés doucement.',
  'progress.qr.sub.count':               '{{n}} réflexion{{s}} gardée{{s}} doucement.',
  'progress.qr.sub.count.one':           '1 réflexion gardée doucement.',
  'progress.qr.sub.count.other':         '{{n}} réflexions gardées doucement.',
  'progress.story.weeklySubCount.one':   '1 semaine de ton voyage',
  'progress.story.weeklySubCount.other': '{{n}} semaines de ton voyage',
  'progress.section.yourjourney':         'TON VOYAGE',
  'progress.section.wordtoday':           'TON MOT DU JOUR',

  // ── Onboarding ──────────────────────────────────────────────────────────────
  'onboard.skip':        'Passer',
  'onboard.s1.headline': 'Ton espace quotidien\npour revenir à toi.',
  'onboard.s1.sub':      'Daily Reset t\'aide à retrouver ton équilibre et à créer des progrès durables — une action par jour. Sans pression.',
  'onboard.s1.cta':      'Commencer mon Reset',
  'onboard.s2.headline': 'Une action douce.\nChaque jour.',
  'onboard.s2.sub':      'Chaque jour tu recevras une action simple conçue pour où tu en es maintenant. Pas où tu penses devoir être.',
  'onboard.s2.cta':      'Continuer',
  'onboard.s3.headline': 'Petits pas.\nVrais progrès.',
  'onboard.s3.sub':      'Tu n\'as pas besoin de tout réparer. Tu n\'as pas besoin d\'être productif. Tu as juste besoin d\'être là — même les jours difficiles.',
  'onboard.s3.cta':      'Commencer aujourd\'hui',

  // ── Goal Selection ──────────────────────────────────────────────────────────
  'goals.step':          'ÉTAPE 1 SUR 2',
  'goals.title':         'Que veux-tu améliorer\nen premier ?',
  'goals.subtitle':      'Sélectionne tout ce qui s\'applique',
  'goals.selected':      '{{n}} sélectionné(s)',
  'goals.cta':           'Continuer',
  'goals.alert.title':   'Sélectionne au moins un objectif',
  'goals.alert.msg':     'Choisis sur quoi tu veux travailler en premier.',
  'goal.procrastination': 'Arrêter de procrastiner',
  'goal.discipline':      'Construire un rythme',
  'goal.distractions':    'Réduire les distractions',
  'goal.routine':         'Créer une routine',
  'goal.control':         'Me sentir en contrôle',

  // ── Notification Setup ──────────────────────────────────────────────────────
  'notif.step':              'ÉTAPE 2 SUR 2',
  'notif.title':             'Quand envoyer\nton reset quotidien ?',
  'notif.subtitle':          'On te rappellera au moment idéal pour ta routine.',
  'notif.morning.sublabel':  '7h00 • Commence ta journée fort',
  'notif.afternoon.sublabel':'12h00 • Refocus de mi-journée',
  'notif.evening.sublabel':  '20h00 • Termine avec intention',
  'notif.bridge':            'La constance commence avec le timing.',
  'notif.cta':               'Commencer mon Reset',

  // ── Paywall ─────────────────────────────────────────────────────────────────
  'paywall.title':       'Débloque ton Voyage\nde Reset Complet',
  'paywall.sub':         'Accède à 365 resets quotidiens, outils de focus, suivi d\'habitudes et insights de progrès pour reconstruire ton équilibre un jour à la fois.',
  'paywall.benefits.title': 'CE QUI EST INCLUS',
  'benefit.0': '365 Resets quotidiens',
  'benefit.1': 'Actions et guidage quotidiens',
  'benefit.2': 'Suivi d\'habitudes',
  'benefit.3': 'Minuterie focus',
  'benefit.4': 'Tableau de bord de progrès',
  'benefit.5': 'Bibliothèque Mentalité',
  'benefit.6': 'Suivi de série',
  'benefit.7': 'Rappels quotidiens',
  'plan.annual.label':  'Annuel',
  'plan.annual.per':    '2,50 € / mois',
  'plan.annual.badge':  'MEILLEURE VALEUR',
  'plan.annual.saving': 'Économise 50 %',
  'plan.monthly.label': 'Mensuel',
  'plan.monthly.per':   'par mois',
  'paywall.disclaimer': 'Annulable à tout moment. Paiement sécurisé via App Store / Google Play.',
  'paywall.cta':        'Commencer mon Voyage de Reset',
  'paywall.skip':       'Continuer avec l\'accès gratuit limité',

  // ── Today remaining ──────────────────────────────────────────────────────────
  'today.ritual.name':              'Rituel de reset',
  'today.ritual.sub':               'Un moment calme pour te recentrer.',
  'today.reflect.eyebrow':          'UN MOMENT DE RÉFLEXION',
  'today.reflect.done':             '✓ Tu as laissé quelque chose ici.',
  'today.tomorrow.label':           'DEMAIN',
  'today.tomorrow.day2begins':      'Demain, le Jour 2 commence.',
  'today.tomorrow.dayArrives':      'Le Jour {{day}} arrive demain.',
  'today.tomorrow.eyebrow':         'RESET DE DEMAIN',
  'today.tomorrow.continues.top':   'TON VOYAGE CONTINUE',
  'today.tomorrow.continues.msg':   'Repose-toi. Reviens quand le moment sera juste.',
  'today.tomorrow.nopressure':      'Sans pression. Ce sera là quand le moment sera juste.',
  'today.tomorrow.continues.cta':   'Ça sera là demain.',

  // ── Rituel — sous-titre dynamique (état + rotation générique) ────────────────
  'today.ritual.sub.racing':      'Deux minutes pour ralentir.',
  'today.ritual.sub.tired':       'Un espace pour souffler.',
  'today.ritual.sub.overwhelmed': 'Moins de poids pour quelques minutes.',
  'today.ritual.sub.unclear':     "Un exercice pour clarifier l'esprit.",
  'today.ritual.sub.drained':     'Sans pression. Juste être là.',
  'today.ritual.sub.balanced':    'Un moment pour remarquer ce qui fonctionne.',
  'today.ritual.sub.g0':          "Un moment créé pour aujourd'hui.",
  'today.ritual.sub.g1':          'Ton reset est prêt.',
  'today.ritual.sub.g2':          'Quelque chose de simple pour maintenant.',
  'today.ritual.sub.g3':          'Un petit retour à toi-même.',
  'today.ritual.sub.g4':          'Ta prochaine étape est ici.',

  // ── Demain — messages par étape ──────────────────────────────────────────────
  'today.tomorrow.s1.0': "Tu n'as pas besoin de faire plus. Juste revenir.",
  'today.tomorrow.s1.1': 'Le chemin commence exactement ici.',
  'today.tomorrow.s1.2': 'Chaque retour compte, même les plus discrets.',
  'today.tomorrow.s1.3': "Il y a quelque chose qui t'attend demain.",
  'today.tomorrow.s1.4': "Un pas à la fois, c'est déjà suffisant.",
  'today.tomorrow.s2.0': 'Parfois la clarté vient après le repos.',
  'today.tomorrow.s2.1': 'Le rythme commence à se révéler.',
  'today.tomorrow.s2.2': 'Tout progrès ne fait pas de bruit.',
  'today.tomorrow.s2.3': "Demain t'appartient aussi.",
  'today.tomorrow.s2.4': "Un petit détail peut changer le ton d'une journée.",
  'today.tomorrow.s3.0': "Certaines réponses arrivent quand la hâte s'en va.",
  'today.tomorrow.s3.1': 'Ce que tu as construit ici ne disparaît pas.',
  'today.tomorrow.s3.2': "Quelque chose de calme est en train de s'installer.",
  'today.tomorrow.s3.3': "Demain tu remarqueras quelque chose qui n'est pas encore visible.",
  'today.tomorrow.s3.4': "Il y a toujours plus à découvrir, sans se presser.",
  'today.tomorrow.s4.0': 'Le silence a aussi du poids. Et tu le sais.',
  'today.tomorrow.s4.1': 'Chaque retour est un choix fait à nouveau.',
  'today.tomorrow.s4.2': "Ce qui semble petit est souvent ce qui reste.",
  'today.tomorrow.s4.3': "Il y a une continuité ici que seul toi peux voir.",
  'today.tomorrow.s4.4': "Demain n'a pas besoin de prouver quoi que ce soit. Juste être là.",

  // ── Completion ceremony ───────────────────────────────────────────────────────
  'ceremony.whatsAhead': 'CE QUI T\'ATTEND',

  // ── Today — dynamic messages ──────────────────────────────────────────────────
  'today.messages.welcomeBack': 'BON RETOUR',

  // ── Today — category labels ──────────────────────────────────────────────────
  'today.cat.Focus':      'Focus',
  'today.cat.Rhythm':     'Rythme',
  'today.cat.Discipline': 'Discipline',
  'today.cat.Courage':    'Courage',
  'today.cat.Momentum':   'Élan',
  'today.cat.Calm':       'Calme',
  'today.cat.Clarity':    'Clarté',
  'today.cat.Rest':       'Repos',

  // ── Reflection write screen ───────────────────────────────────────────────────
  'reflect.eyebrow':     'RÉFLEXION',
  'reflect.save':        'Enregistrer',
  'reflect.skip':        'Passer',
  'reflect.saved':       'Enregistré ✓',
  'reflect.microcopy':   'Une pensée suffit.',
  'reflect.placeholder': 'Commence à écrire ici...',
  'reflect.privacy':     'Tes réflexions restent privées.',

  // ── Journal subtitle ──────────────────────────────────────────────────────────
  'journal.subtitle.one':   '1 jour enregistré',
  'journal.subtitle.other': '{{n}} jours enregistrés',

  // ── Reflection history ────────────────────────────────────────────────────────
  'reflection.header.eyebrow':      'TON VOYAGE',
  'reflection.header.title':        'Journal de réflexion',
  'reflection.header.sub.empty':    'Ton espace de réflexion t\'attend.',
  'reflection.header.sub.count':    '{{n}} réflexion{{s}} écrite{{s}}',
  'reflection.action.edit':         'Modifier la réflexion',
  'reflection.action.delete':       'Supprimer la réflexion',
  'reflection.action.readmore':     'Lire la suite',
  'reflection.dayBadge':            'Jour {{n}}',
  'reflection.edit.title':          'Modifier la réflexion',
  'reflection.edit.save':           'Enregistrer',
  'reflection.edit.cancel':         'Annuler',
  'reflection.edit.privacy':        'Tes réflexions restent privées.',
  'reflection.delete.title':        'Supprimer cette réflexion ?',
  'reflection.delete.sub':          'Cette action est irréversible.',
  'reflection.delete.cancel':       'Annuler',
  'reflection.delete.confirm':      'Supprimer',
  'reflection.empty.noyet':         'Aucune réflexion pour l\'instant.',
  'reflection.empty.waiting':       'Ton espace de réflexion t\'attend.',
  'reflection.empty.appear':        'Tes réflexions apparaîtront ici au fil du temps.',
  'reflection.empty.invite':        'Après avoir complété un reset quotidien, tu seras invité à écrire une courte réflexion.',
  'reflection.bottom.quote':        '"Chaque réflexion est un petit acte de connaissance de soi."',

  // ── Weekly recap history ──────────────────────────────────────────────────────
  'recap.history.eyebrow':          'TON HISTORIQUE',
  'recap.history.title':            'Récapitulatifs hebdomadaires',
  'recap.history.sub.nodata':       'Ton premier récapitulatif arrive après une semaine complète.',
  'recap.history.sub.building':     'Les récapitulatifs apparaissent au fil de ton voyage.',
  'recap.history.sub.count':        '{{n}} semaine{{s}} de ton voyage',
  'recap.history.empty.title':      'Ton histoire hebdomadaire est encore en train de s\'écrire.',
  'recap.history.empty.text':       'Au fil des resets, tes réflexions\net tes tendances apparaîtront ici.',
  'recap.history.current.eyebrow':  'CETTE SEMAINE · EN COURS',
  'recap.history.coming.title':     'Les semaines passées apparaîtront ici.',
  'recap.history.coming.sub':       'Ton premier récapitulatif complet se débloque après 7 jours d\'utilisation.',
  'recap.history.sum.weeks':        'semaines enregistrées',
  'recap.history.sum.resets':       'resets au total',
  'recap.history.sum.streak':       'rythme le plus long',
  'recap.history.quote':            '"Chaque semaine est une page de l\'histoire que tu écris."',
  'recap.card.streakLabel':         'rythme',
  'recap.card.habitsLabel':         '% habitudes',
  'recap.insight.sevenForSeven':    'Sept sur sept. Une semaine pleine.',
  'recap.insight.showedUpN':        'Tu es revenu {{n}} fois cette semaine.',
  'recap.insight.nResets':          '{{n}} resets cette semaine. Un rythme se dessine.',
  'recap.insight.twoReturns':       'Il y a eu des retours cette semaine. L\'espace est toujours là.',
  'recap.insight.cameBackStreak':   'Tu es revenu, une fois de plus.',
  'recap.insight.cameBack':         'Tu es revenu. Une seule fois suffit.',
  'recap.insight.stillYours':       'Cette semaine est encore à toi.',
  'recap.subinsight.remarkable':    'Une telle constance change les choses avec le temps.',
  'recap.subinsight.strong':        'Une constance tranquille qui construit quelque chose de réel.',
  'recap.subinsight.streakHolding': 'Ton rythme se maintient.',
  'recap.subinsight.repetition':    'La petite répétition devient identité.',
  'recap.subinsight.eachReset':     'Chaque reset compte, quelle que soit la semaine.',

  // ── Mindset remaining ─────────────────────────────────────────────────────────
  'mindset.empty.today.title':     'L\'insight du jour t\'attend.',
  'mindset.empty.lib.title':       'Ta bibliothèque grandit.',
  'mindset.empty.today.sub':       'Complète ton premier Daily Reset pour débloquer l\'insight mentalité du jour.',
  'mindset.empty.lib.sub':         'Les insights se débloquent au fil de ton voyage.',
  'mindset.library.text':          'Ta bibliothèque mentalité.',
  'mindset.library.textCount':     '{{n}} insight{{s}} dans ta collection.',
  'mindset.library.sub1':          'De nouveaux insights se débloquent au fil de ton voyage.',
  'mindset.library.sub2':          'La bibliothèque s\'enrichit chaque jour avec ta pratique.',

  // ── Mindset screen — all UI labels ───────────────────────────────────────────
  'mindset.subtitle.free':           'Un insight précieux chaque jour.',
  'mindset.subtitle.premium':        'Des réflexions pour ton rythme.',
  'mindset.subtitle.locked':         'Se débloque avec Premium.',
  'mindset.subtitle.count.one':      '{{n}} insight débloqué.',
  'mindset.subtitle.count.other':    '{{n}} insights débloqués.',
  'mindset.badge.today':             'AUJOURD\'HUI',
  'mindset.dayLabel':                'JOUR {{day}}',
  'mindset.insightLabel':            'INSIGHT',
  'mindset.locked.journey':          'Arrive en son temps.',
  'mindset.locked.return':           'Arrive avec le temps.',
  'mindset.modal.day':               'Jour {{day}}',
  'mindset.modal.insight':           'Insight',
  'mindset.modal.minread':           '{{n}} min de lecture',
  'mindset.foryou.title':            'POUR TOI AUJOURD\'HUI',
  'mindset.foryou.question':         'Comment tu te montres en ce moment ?',
  'mindset.foryou.recommended':      'RECOMMANDÉ POUR TOI',
  'mindset.foryou.curated':          'Sélectionné pour ton voyage',
  'mindset.emotion.overwhelmed':     'Pression',
  'mindset.emotion.numb':            'Brouillard mental',
  'mindset.emotion.frustrated':      'Débordement',
  'mindset.emotion.low_energy':      'Énergie basse',
  'mindset.emotion.anxious':         'Bruit intérieur',
  'mindset.emotion.balanced':        'En équilibre',
  'mindset.emotion.overwhelmed.sub': 'Pour quand tout semble trop.',
  'mindset.emotion.numb.sub':        'Pour quand l\'esprit se tait.',
  'mindset.emotion.frustrated.sub':  'Pour quand le poids est difficile à porter.',
  'mindset.emotion.low_energy.sub':  'Pour quand le rythme a ralenti.',
  'mindset.emotion.anxious.sub':     'Pour quand le bruit ne s\'arrête pas.',
  'mindset.emotion.balanced.sub':    'Pour quand les choses vont bien.',
  'mindset.coming.eyebrow':          'AVEC TON VOYAGE',
  'mindset.unlock.title':            'TON ESPACE CONTINUE ICI',
  'mindset.unlock.cta':              'Continuer ton voyage →',
  'mindset.library.title':           'CHEMINS DE RETOUR',
  'mindset.library.insights':        'De nouveaux moments arrivent avec le temps',
  'mindset.lib.burnout':             'Récupération du Burnout',
  'mindset.lib.emotional':           'Reset Émotionnel',
  'mindset.lib.discipline':          'Discipline Douce',
  'mindset.lib.detox':               'Détox Numérique',
  'mindset.lib.focus':               'Récupération du Focus',
  'mindset.lib.burnout.count':       'Récupération du Burnout — 12 insights',
  'mindset.lib.emotional.count':     'Reset Émotionnel — 10 insights',
  'mindset.lib.discipline.count':    'Discipline Douce — 8 insights',
  'mindset.lib.detox.count':         'Détox Numérique — 8 insights',
  'mindset.lib.focus.count':         'Récupération du Focus — 10 insights',
  'mindset.lib.burnout.sub':         'Ton corps n\'a pas été conçu pour vivre en alerte constante.',
  'mindset.lib.emotional.sub':       'Tu n\'as pas à tout résoudre maintenant.',
  'mindset.lib.discipline.sub':      'La constance grandit mieux sans force.',
  'mindset.lib.detox.sub':           'Le silence est aussi une forme de productivité.',
  'mindset.lib.focus.sub':           'Toute distraction n\'est pas de la paresse.',

  // ── Mindset category labels ───────────────────────────────────────────────
  'mindset.cat.Focus':    'Focus',
  'mindset.cat.Calm':     'Calme',
  'mindset.cat.Courage':  'Courage',
  'mindset.cat.Rest':     'Repos',
  'mindset.cat.Clarity':  'Clarté',
  'mindset.cat.Momentum': 'Élan',
  'mindset.cat.Rhythm':   'Rythme',

  // ── Mindset card titles ────────────────────────────────────────────────────
  'mindset.card.m1.title':    'Une chose à la fois.',
  'mindset.card.m2.title':    'La règle des 2 minutes',
  'mindset.card.m3.title':    'La confiance fondée sur les preuves',
  'mindset.card.m4.title':    'La méthode MIT',
  'mindset.card.m5.title':    'Les émotions comme données',
  'mindset.card.m6.title':    'L\'économie de l\'attention',
  'mindset.card.m7.title':    'Le bloc de travail de 90 minutes',
  'mindset.card.m8.title':    'Les habitudes fondées sur l\'identité',
  'mindset.card.m9.title':    'Le refus comme redirection',
  'mindset.card.m10.title':   'Maîtrise du time blocking',
  'mindset.card.m11.title':   'Le courage d\'être soi-même',
  'mindset.card.m12.title':   'Retrouver l\'ennui',
  'mindset.card.m13.title':   'Le principe de l\'unique chose',
  'mindset.card.m14.title':   'Ne jamais rater deux fois',
  'mindset.card.m15.title':   'La compétence crée la confiance',
  'mindset.card.m16.title':   'La revue hebdomadaire',
  'mindset.card.m17.title':   'La pratique du lâcher-prise',
  'mindset.card.m18.title':   'Le minimalisme numérique',
  'mindset.card.m19.title':   'Le travail profond',
  'mindset.card.m20.title':   'Le paradoxe de Stockdale',
  'mindset.card.emo1.title':  'Tu as le droit de recommencer',
  'mindset.card.emo2.title':  'Le repos n\'est pas une faiblesse',
  'mindset.card.disc1.title': 'Ton cerveau fait confiance à ce que tu répètes.',
  'mindset.card.disc2.title': 'Les choses difficiles s\'allègent quand elles deviennent habitude.',
  'mindset.card.disc3.title': 'De petites répétitions changent la direction de tes journées.',

  // ── Mindset card m1 content ────────────────────────────────────────────────
  'mindset.card.m1.content':  'Le focus s\'épuise quand il est divisé. Chaque fois que tu passes d\'une tâche à l\'autre, ton cerveau subit un "coût de commutation" — en moyenne 23 minutes pour retrouver une concentration totale. Les personnes les plus efficaces ne font pas le plus de choses. Elles font la seule chose la plus importante avec une concentration totale. Commence chaque session de travail en choisissant ton unique résultat non négociable. Mets tout le reste hors de portée. Quand tu as terminé, et seulement alors, tu passes à la suite.',

  // ── Mindset Focus cards — Français ────────────────────────────────────────
  'mindset.card.m7.content':
    'Le cerveau fonctionne par cycles naturels — environ 90 minutes d\'attention soutenue, suivies d\'une baisse inévitable. Ce n\'est pas un signe de faiblesse. C\'est simplement comment nous sommes faits.\n\nTravailler avec ce rythme plutôt que contre lui change tout. 90 minutes de présence réelle. Puis une vraie pause — marcher, souffler, t\'éloigner des écrans. Revenir reposé.\n\nCe n\'est pas un truc de productivité. C\'est du respect pour la façon dont ton esprit fonctionne vraiment.',

  'mindset.card.m13.content':
    'Il existe une question qui coupe à travers le bruit : "Qu\'est-ce que je pourrais faire maintenant — qui rendrait tout le reste plus simple, ou même inutile ?"\n\nQuand tu te poses cette question vraiment, la réponse est presque toujours évidente. Elle était là depuis le début.\n\nFais cette chose en premier. Chaque jour. Observe comment ta journée se réorganise autour de ce qui compte vraiment.',

  'mindset.card.m19.content':
    'Le travail profond, c\'est la capacité à rester avec quelque chose de difficile — sans se disperser, sans chercher une sortie facile.\n\nC\'est rare aujourd\'hui. Et c\'est précisément pour ça que c\'est précieux.\n\nLa différence entre ceux qui créent quelque chose de vrai et ceux qui restent simplement occupés se joue souvent là. Traite cette capacité comme un muscle. Commence doucement. Reviens régulièrement. Elle se construit.',

  'mindset.card.focus1.title':   'Ce n\'est pas l\'agitation qui avance. C\'est la profondeur.',
  'mindset.card.focus1.content':
    'Être occupé et avancer, ce n\'est pas la même chose. La vraie progression arrive quand tu t\'accordes du temps sans interruption pour ce qui compte vraiment.\n\nLa capacité à se concentrer profondément devient rare. Ce qui la rend d\'autant plus précieuse.\n\nDe longues plages de concentration créent des résultats que l\'agitation ne peut jamais produire. Pas en travaillant plus longtemps — mais en travaillant avec une vraie présence.',

  'mindset.card.focus2.title':   'Enlever vaut mieux qu\'optimiser.',
  'mindset.card.focus2.content':
    'Avant d\'ajouter un nouveau système, une nouvelle méthode ou un nouvel outil — regarde d\'abord ce qui draine ton attention sans te servir vraiment.\n\nLes onglets ouverts, les notifications, les engagements inutiles. Ils consomment de l\'énergie mentale en silence.\n\nLa concentration s\'améliore plus vite par ce qu\'on retire que par ce qu\'on ajoute. La simplicité crée de l\'espace pour penser.',

  'mindset.card.focus3.title':   'La concentration, ça s\'entraîne.',
  'mindset.card.focus3.content':
    'Ce n\'est pas quelque chose que tu as ou que tu n\'as pas. C\'est une capacité qui se renforce chaque fois que tu choisis de rester avec quelque chose au lieu de t\'en éloigner.\n\nLe monde moderne entraîne l\'esprit à chercher de la nouveauté en permanence. La concentration entraîne le contraire.\n\nChaque petit moment de présence intentionnelle construit quelque chose. Doucement, mais sûrement.',

  'mindset.card.focus4.title':   'Terminer avant de commencer.',
  'mindset.card.focus4.content':
    'Chaque tâche inachevée reste ouverte dans l\'esprit. Elle consomme de l\'énergie, même en silence.\n\nQuand tu finis ce que tu as commencé avant de passer à autre chose, tu libères une sorte de charge mentale.\n\nCe n\'est pas une question de vitesse. C\'est une question de présence. Finir crée de l\'espace pour vraiment commencer la suite.',

  'mindset.card.focus5.title':   'Ce qui t\'entoure façonne comment tu penses.',
  'mindset.card.focus5.content':
    'Un espace encombré crée souvent une pensée encombrée. Les notifications, le bruit, les objets qui sollicitent ton regard — tout cela fragmente l\'attention sans qu\'on s\'en rende vraiment compte.\n\nUn environnement calme aide l\'esprit à rester calme.\n\nCe n\'est pas une question d\'esthétique. C\'est une question d\'espace mental. Concevoir ton espace avec intention rend la concentration plus naturelle.',

  'mindset.card.focus6.title':   'L\'énergie mentale compte plus que le temps.',
  'mindset.card.focus6.content':
    'Avoir plus d\'heures ne change rien si l\'esprit est épuisé. La concentration dépend davantage de la fraîcheur mentale que du temps disponible.\n\nProtéger ton sommeil, réduire la surstimulation, prendre de vraies pauses — tout cela améliore la concentration plus efficacement qu\'une heure de plus sur l\'agenda.\n\nUne heure de focus sincère vaut mieux que cinq heures de dispersion.',

  'mindset.card.focus7.title':   'Tout ne mérite pas ton attention.',
  'mindset.card.focus7.content':
    'Le cerveau ne peut pas se concentrer profondément s\'il est constamment sollicité. Le scroll infini, les vidéos, les notifications — ils entraînent l\'esprit à chercher de la nouveauté toutes les quelques secondes.\n\nLe calme et l\'immobilité renforcent la concentration. Se concentrer demande de l\'espace pour penser clairement.\n\nParfois, la meilleure stratégie est simplement de consommer moins. De laisser l\'esprit respirer.',

  'mindset.card.focus8.title':   'La précipitation coûte plus qu\'elle ne gagne.',
  'mindset.card.focus8.content':
    'Aller vite crée des erreurs, du stress et de la fragmentation mentale. Un focus calme produit de meilleures décisions qu\'une vitesse fébrile.\n\nBeaucoup de gens confondent l\'agitation avec la productivité. Mais l\'urgence permanente affaiblit l\'attention.\n\nRalentir suffisamment pour penser clairement avant d\'agir — c\'est souvent ce qui fait gagner du temps.',

  'mindset.card.focus9.title':   'Être vraiment là change tout.',
  'mindset.card.focus9.content':
    'Quand ton attention est pleinement présente, même les actions simples deviennent plus efficaces. Un travail fait à moitié donne des résultats à moitié.\n\nÊtre mentalement absent pendant qu\'on travaille augmente la fatigue — parce que le cerveau passe son temps à jongler entre les pensées plutôt qu\'à être là.\n\nLa concentration, c\'est apprendre à vraiment arriver dans ce qu\'on fait. La présence améliore à la fois la performance et la paix intérieure.',

  'mindset.card.focus10.title':   'Une décision à la fois.',
  'mindset.card.focus10.content':
    'La fatigue mentale vient souvent de trop de petites décisions accumulées. Chaque choix — même minuscule — consomme de l\'énergie cognitive.\n\nSimplifier ses routines libère de l\'attention pour ce qui compte vraiment.\n\nMoins de bruit mental, c\'est plus de clarté disponible. Choisir simplement est une forme de concentration.',

  'mindset.card.focus11.title':   'La régularité protège ce qui compte.',
  'mindset.card.focus11.content':
    'La motivation change tout le temps. La régularité, elle, protège la constance.\n\nLa concentration se renforce quand tu choisis de travailler même quand les distractions semblent plus attrayantes. Rester avec quelque chose de difficile construit une résistance mentale durable.\n\nLes gens qui avancent vraiment n\'attendent pas de "se sentir prêts". Ils créent de l\'élan par l\'action.',

  'mindset.card.focus12.title':   'Le silence est une ressource rare.',
  'mindset.card.focus12.content':
    'La vie moderne est remplie de bruit permanent — notifications, opinions, contenu, interruptions. Le silence redonne à l\'esprit l\'espace pour penser profondément.\n\nBeaucoup de percées arrivent quand l\'esprit devient enfin assez calme pour traiter clairement.\n\nLa concentration s\'épanouit dans les environnements calmes. Le silence restaure la clarté mentale.',

  'mindset.card.focus13.title':   'Ce à quoi tu dis non définit ce à quoi tu peux dire oui.',
  'mindset.card.focus13.content':
    'Chaque "oui" donné à une distraction est un "non" donné à ce qui compte vraiment. La concentration demande des limites claires.\n\nTout message ne mérite pas une réponse immédiate. Toute opportunité ne mérite pas ton attention.\n\nProtéger ton espace mental est essentiel pour avancer sur ce qui a du sens.',

  'mindset.card.focus14.title':   'L\'action dissout l\'analyse.',
  'mindset.card.focus14.content':
    'La suranalyse disparaît souvent dès que le mouvement commence. Le cerveau a tendance à exagérer la difficulté d\'une tâche avant de la commencer.\n\nL\'action crée de la clarté plus vite que l\'analyse infinie.\n\nLa concentration s\'améliore quand tu arrêtes de négocier mentalement avec toi-même — et que tu commences. Même petit. Même imparfait.',

  'mindset.card.focus15.title':   'Le repos fait partie du travail.',
  'mindset.card.focus15.content':
    'Travailler sans récupération affaiblit la concentration avec le temps. L\'esprit a besoin de pauses pour réinitialiser l\'attention et traiter l\'information correctement.\n\nSe reposer, ce n\'est pas de la paresse. C\'est une partie intégrante de la performance durable.\n\nUn esprit reposé pense plus clairement. La récupération protège la capacité à se concentrer sur le long terme.',

  'mindset.card.focus16.title':   'Apprendre à rester.',
  'mindset.card.focus16.content':
    'Les distractions modernes entraînent le cerveau à chercher constamment de la stimulation. La concentration demande de réapprendre à l\'attention à rester avec une seule chose un peu plus longtemps.\n\nAu début, ça peut sembler inconfortable — parce que l\'esprit est habitué à l\'interruption. Mais l\'inconfort fait partie du renforcement.\n\nLa capacité à être pleinement présent est une force rare aujourd\'hui.',

  'mindset.card.focus17.title':   'Les petites interruptions ont un grand coût.',
  'mindset.card.focus17.content':
    'Une notification rapide peut sembler anodine. Mais les petites interruptions brisent le flux mental — et le cerveau met souvent du temps avant de vraiment se reconcentrer.\n\nDe minuscules distractions répétées tout au long de la journée détruisent silencieusement la productivité.\n\nProtéger sa concentration, c\'est reconnaître à quel point le focus profond est fragile.',

  'mindset.card.focus18.title':   'L\'ennui ouvre quelque chose.',
  'mindset.card.focus18.content':
    'Le divertissement permanent affaiblit la capacité à tolérer le calme. Pourtant, l\'ennui est souvent la porte d\'entrée vers la créativité, la réflexion et la pensée profonde.\n\nLes gens qui savent se concentrer n\'ont pas peur des moments silencieux.\n\nLaisser l\'esprit s\'asseoir sans stimulation renforce l\'attention naturellement. La créativité apparaît souvent quand la distraction disparaît.',

  'mindset.card.focus19.title':   'La concentration construit quelque chose de solide.',
  'mindset.card.focus19.content':
    'La confiance ne vient pas seulement du succès. Elle vient aussi de savoir que tu peux diriger ton attention là où tu le décides.\n\nChaque session de focus sincère renforce la confiance en toi. Quand tu complètes ce qui compte, l\'esprit commence à croire en ta propre constance.\n\nLa concentration construit le respect de soi — lentement, mais vraiment.',

  'mindset.card.focus20.title':   'Tout prioriser revient à ne rien prioriser.',
  'mindset.card.focus20.content':
    'Trop d\'objectifs crée une énergie divisée et une attention dispersée. La concentration s\'améliore quand tu identifies ce qui compte vraiment en ce moment — et rien d\'autre.\n\nLa simplicité affûte l\'exécution. Des priorités claires créent un élan plus fort.\n\nCe n\'est pas de renoncer à des choses. C\'est de choisir ce qui mérite vraiment ta présence.',

  'mindset.card.focus21.title':   'Ton téléphone a été conçu pour capturer ton attention.',
  'mindset.card.focus21.content':
    'La plupart des plateformes numériques sont construites pour retenir ton attention aussi longtemps que possible. Chaque notification inutile éloigne ton cerveau d\'un travail qui a du sens.\n\nLes gens qui avancent vraiment choisissent de contrôler la technologie — plutôt que de la laisser les contrôler.\n\nProtéger ton attention, c\'est protéger ce que tu construis.',

  'mindset.card.focus22.title':   'La distraction n\'est pas toujours une question de technologie.',
  'mindset.card.focus22.content':
    'Parfois, l\'esprit évite de se concentrer à cause du stress, de la peur, de l\'épuisement ou d\'une gêne émotionnelle.\n\nApprendre à réguler ses émotions améliore la concentration de façon significative. Des émotions calmes créent un esprit calme.\n\nLa stabilité intérieure renforce les performances extérieures. Le focus commence souvent par là.',

  'mindset.card.focus23.title':   'La maîtrise naît de la répétition.',
  'mindset.card.focus23.content':
    'La maîtrise ne vient que rarement de l\'intensité seule. Elle vient d\'une répétition concentrée sur de longues périodes.\n\nChaque session de pratique profonde renforce les chemins neuronaux et développe la compétence.\n\nLa constance ciblée bat toujours l\'effort dispersé. Les petites améliorations s\'accumulent en résultats extraordinaires.',

  'mindset.card.focus24.title':   'Ralentir pour penser plus juste.',
  'mindset.card.focus24.content':
    'Penser vite est utile dans les urgences. Penser profondément demande de la lenteur.\n\nBeaucoup de gens réagissent immédiatement sans se laisser l\'espace de penser clairement. Mais une pause — même courte — permet d\'observer, de réfléchir, et de choisir avec intention.\n\nMieux penser crée de meilleures décisions. La lenteur a parfois plus de valeur que la vitesse.',

  'mindset.card.focus25.title':   'L\'espace mental est une ressource limitée.',
  'mindset.card.focus25.content':
    'Le stress, le désordre, le multitâche et la surstimulation réduisent ta capacité à penser clairement. Le cerveau n\'est pas illimité.\n\nLa concentration s\'améliore quand on réduit intentionnellement la charge mentale inutile. Protéger son esprit est essentiel pour une performance durable.\n\nLa clarté mentale est une forme de richesse. Elle se protège, elle s\'entretient.',

  'mindset.card.focus26.title':   'Ce sur quoi tu reviens en dit long sur qui tu deviens.',
  'mindset.card.focus26.content':
    'Ton avenir ne se construit pas dans les grands moments dramatiques. Il se construit dans les moments répétés d\'attention.\n\nChaque jour, ce sur quoi tu te concentres détermine ce qui grandit dans ta vie.\n\nLa distraction affaiblit lentement le potentiel. La concentration, elle, l\'accumule. La direction de ton attention devient, avec le temps, la direction de ta vie.',

  'mindset.card.focus27.title':   'Changer de tâche coûte plus qu\'on ne le croit.',
  'mindset.card.focus27.content':
    'Chaque fois que tu passes d\'une chose à une autre, le cerveau dépense de l\'énergie à se réorienter. Même de courtes interruptions réduisent l\'efficacité mentale et augmentent la fatigue.\n\nBeaucoup de gens se sentent épuisés non pas parce qu\'ils ont travaillé dur, mais parce qu\'ils ont constamment changé de focus.\n\nProtéger la continuité permet à l\'esprit de fonctionner à un niveau bien plus élevé. La concentration profonde demande un ancrage mental.',

  'mindset.card.focus28.title':   'Le focus commence la veille.',
  'mindset.card.focus28.content':
    'Une matinée dispersée se prépare souvent la veille. Identifier ses priorités avant de dormir réduit la friction mentale quand le jour commence.\n\nLe cerveau fonctionne mieux quand il se réveille avec de la clarté plutôt qu\'avec de l\'incertitude.\n\nLa préparation crée une exécution plus fluide. Et une exécution fluide commence avant même que la journée soit commencée.',

  'mindset.card.focus29.title':   'Tout ne mérite pas ta réaction.',
  'mindset.card.focus29.content':
    'Beaucoup de distractions arrivent déguisées en urgences. Messages, opinions, notifications — tout se bat pour ton attention émotionnelle.\n\nLa concentration grandit quand tu arrêtes de réagir instantanément à tout ce qui t\'entoure.\n\nUn esprit calme choisit où va son attention — plutôt que de laisser le bruit extérieur décider à sa place. Cette sélectivité crée une stabilité intérieure.',

  'mindset.card.focus30.title':   'Les émotions fortes peuvent dérouter l\'attention.',
  'mindset.card.focus30.content':
    'L\'anxiété, la frustration et la comparaison créent souvent une turbulence mentale qui affaiblit la concentration.\n\nLa concentration s\'améliore quand on apprend à observer ses émotions sans leur obéir immédiatement.\n\nLe contrôle émotionnel protège la clarté mentale. Un esprit calme performe mieux sous pression — pas parce qu\'il ressent moins, mais parce qu\'il est moins dirigé par ce qu\'il ressent.',

  'mindset.card.focus31.title':   'Le cerveau aime la nouveauté. La croissance préfère la répétition.',
  'mindset.card.focus31.content':
    'L\'esprit cherche naturellement la stimulation, la variété, le changement. Mais le progrès réel vient presque toujours de la répétition d\'actions importantes dans la durée.\n\nLes gens qui avancent vraiment résistent à la tentation de la nouveauté constante. Ils comprennent que la répétition construit la compétence, la maîtrise, les résultats.\n\nLa régularité semble parfois ennuyeuse — avant de devenir transformatrice.',

  'mindset.card.focus32.title':   'La concentration apaise quelque chose.',
  'mindset.card.focus32.content':
    'La distraction crée un chaos intérieur. Quand l\'esprit saute constamment d\'une pensée à une autre, il devient difficile de se sentir calme ou vraiment présent.\n\nLa concentration simplifie l\'activité mentale et réduit la surcharge.\n\nS\'immerger complètement dans une seule tâche qui a du sens peut créer une paix émotionnelle surprenante. L\'attention et la tranquillité sont profondément liées.',

  'mindset.card.focus33.title':   'Le bruit numérique use quelque chose.',
  'mindset.card.focus33.content':
    'Une exposition constante à des contenus rapides raccourcit l\'attention avec le temps. Plus ton cerveau consomme de stimulation, plus il devient difficile de rester concentré sur quelque chose de lent et de significatif.\n\nLes gens qui savent se concentrer font attention à ce qui entre dans leur espace mental.\n\nProtéger ton attention ressemble à protéger ta santé physique. Ce que tu consommes mentalement façonne ta capacité cognitive.',

  'mindset.card.focus34.title':   'La concentration se nourrit de récupération.',
  'mindset.card.focus34.content':
    'Ta capacité à te concentrer dépend beaucoup de ta récupération. L\'épuisement chronique affaiblit la mémoire, l\'attention et le contrôle émotionnel.\n\nLes gens qui avancent vraiment prennent la récupération au sérieux — parce qu\'ils comprennent que la netteté mentale demande de l\'entretien.\n\nSommeil, silence, mouvement, repos vrai — ils protègent les performances cognitives. Un esprit épuisé ne peut pas se concentrer profondément.',

  'mindset.card.focus35.title':   'L\'esprit suit ce que tu répètes.',
  'mindset.card.focus35.content':
    'Tout ce que tu pratiques régulièrement devient plus facile avec le temps. Si tu pratiques constamment la distraction, ton cerveau s\'entraîne à éviter l\'attention soutenue.\n\nMais si tu pratiques régulièrement la concentration, elle se renforce progressivement.\n\nLes habitudes mentales façonnent l\'identité mentale. Tes schémas d\'attention deviennent ton comportement par défaut.',

  'mindset.card.focus36.title':   'La concentration, c\'est aussi apprendre à dire non.',
  'mindset.card.focus36.content':
    'Se concentrer, ce n\'est pas seulement choisir sur quoi travailler. C\'est aussi rejeter ce qui ne compte pas.\n\nChaque engagement inutile consomme de l\'énergie mentale. Les gens qui savent se concentrer protègent leurs priorités avec soin.\n\nL\'attention est limitée. Elle ne peut pas être infiniment divisée. La clarté demande des limites — et des limites demandent du courage.',

  'mindset.card.focus37.title':   'Commencer sans se sentir prêt.',
  'mindset.card.focus37.content':
    'Attendre la motivation parfaite crée souvent des délais sans fin. La concentration grandit par l\'action — pas par la préparation émotionnelle.\n\nUne fois le mouvement commencé, la résistance diminue généralement d\'elle-même.\n\nLes gens qui avancent s\'entraînent à commencer malgré l\'inconfort. L\'élan crée l\'engagement mental plus vite que la suranalyse ne le fera jamais.',

  'mindset.card.focus38.title':   'La simplicité mentale améliore l\'exécution.',
  'mindset.card.focus38.content':
    'La complexité crée souvent de l\'hésitation et de la confusion. Quand les tâches deviennent trop compliquées, le cerveau cherche naturellement une échappatoire dans la distraction.\n\nLa concentration s\'améliore quand les systèmes, les objectifs et les priorités deviennent plus simples et plus clairs.\n\nLa simplicité réduit la surcharge cognitive. Une pensée claire produit une exécution plus propre.',

  'mindset.card.focus39.title':   'Tenir ses engagements envers soi-même construit quelque chose.',
  'mindset.card.focus39.content':
    'Chaque fois que tu honores ce que tu t\'es promis, ta confiance en toi augmente. Une concentration cohérente construit de la confiance parce qu\'elle prouve que tu peux compter sur ta propre constance.\n\nLes gens qui avancent cessent de dépendre entièrement de la motivation. Ils font confiance aux systèmes et aux habitudes qu\'ils ont construits.\n\nLa confiance intérieure crée une stabilité émotionnelle. C\'est de là que vient le vrai élan.',

  'mindset.card.focus40.title':   'Le scroll repose moins qu\'il n\'épuise.',
  'mindset.card.focus40.content':
    'Défiler sans fin peut sembler relaxant. Mais la surstimulation épuise silencieusement le cerveau.\n\nLa nouveauté constante force le système nerveux à un traitement continu. Beaucoup de gens confondent la stimulation avec la récupération.\n\nLa vraie récupération vient souvent du ralentissement, de la déconnexion, du repos de l\'esprit. Le silence intérieur restaure l\'énergie.',

  'mindset.card.focus41.title':   'Protéger son attention, c\'est se respecter.',
  'mindset.card.focus41.content':
    'Protéger son attention signifie accorder de la valeur à ses objectifs, à son temps, à son avenir.\n\nLa distraction constante reflète souvent une forme d\'abandon de soi — sans qu\'on s\'en rende compte.\n\nLes gens qui savent se concentrer comprennent que l\'attention est l\'une de leurs ressources les plus précieuses. Choisir la concentration, c\'est choisir sa propre croissance.',

  'mindset.card.focus42.title':   'L\'esprit a besoin de vide pour créer.',
  'mindset.card.focus42.content':
    'La créativité et l\'insight apparaissent rarement dans la stimulation constante. Le cerveau a besoin d\'espace vide pour traiter l\'information en profondeur.\n\nLes gens qui savent se concentrer créent intentionnellement des moments sans bruit, sans contenu, sans interruption.\n\nLe silence permet aux pensées plus profondes d\'émerger naturellement. La réflexion améliore la clarté.',

  'mindset.card.focus43.title':   'Les petites victoires alimentent le focus.',
  'mindset.card.focus43.content':
    'Les grands objectifs peuvent sembler intimidants — ce qui augmente la résistance mentale. Les petites actions accomplies créent de l\'élan et renforcent la concentration.\n\nChaque tâche terminée entraîne le cerveau à associer focus et progression.\n\nLa constance grandit plus vite à travers des actions gérables. Les petites victoires créent une énergie psychologique réelle.',

  'mindset.card.focus44.title':   'Corps en forme, esprit plus présent.',
  'mindset.card.focus44.content':
    'La santé physique influence fortement la clarté mentale. Un mauvais sommeil, la déshydratation, le stress et l\'inactivité affaiblissent la concentration de façon significative.\n\nLes gens qui savent se concentrer comprennent que la performance cognitive est profondément liée au bien-être physique.\n\nPrendre soin de son corps, c\'est aussi prendre soin de sa capacité à penser. Un corps mieux traité soutient un esprit plus précis.',

  'mindset.card.focus45.title':   'Un esprit surchargé cherche la sortie facile.',
  'mindset.card.focus45.content':
    'Quand le cerveau se sent submergé, il cherche naturellement une stimulation plus simple. C\'est pourquoi le stress augmente souvent la procrastination.\n\nLa concentration s\'améliore quand on réduit le désordre mental inutile et qu\'on organise ses priorités clairement.\n\nDes systèmes calmes créent une pensée plus calme. L\'organisation mentale réduit la résistance.',

  'mindset.card.focus46.title':   'La concentration grandit par la répétition, pas par la perfection.',
  'mindset.card.focus46.content':
    'Beaucoup abandonnent leurs habitudes de focus parce qu\'ils attendent la perfection immédiate. Mais la concentration se développe progressivement — à travers un effort répété.\n\nCertains jours seront plus faciles que d\'autres. Ce qui compte le plus, c\'est de revenir régulièrement à la pratique de l\'attention.\n\nLe progrès s\'accumule tranquillement avec le temps. La régularité compte plus que la performance.',

  'mindset.card.focus47.title':   'Connaître ses meilleures heures change tout.',
  'mindset.card.focus47.content':
    'Chaque cerveau a des périodes de plus haute énergie cognitive dans la journée. Les gens qui savent se concentrer identifient quand ils pensent le plus clairement — et protègent ces heures avec soin.\n\nLe travail important devrait avoir lieu pendant les périodes d\'attention la plus forte. Les distractions à faible valeur ne devraient pas consommer ton meilleur état mental.\n\nChoisir le bon moment améliore les performances de façon significative.',

  'mindset.card.focus48.title':   'Le bruit intérieur distrait autant que le bruit extérieur.',
  'mindset.card.focus48.content':
    'La distraction ne vient pas toujours du monde extérieur. Les inquiétudes, le doute sur soi, la suranalyse peuvent interrompre la concentration aussi fortement que les notifications.\n\nLa concentration s\'améliore quand on apprend à calmer le dialogue intérieur.\n\nLa conscience émotionnelle renforce le contrôle cognitif. Un esprit en paix soutient une attention plus profonde.',

  'mindset.card.focus49.title':   'L\'attention détermine la qualité du travail.',
  'mindset.card.focus49.content':
    'La qualité de ton attention façonne la qualité de ce que tu produis. Un travail précipité et dispersé donne généralement des résultats médiocres.\n\nUn focus profond améliore la créativité, la précision et la capacité à résoudre des problèmes.\n\nLes gens qui avancent vraiment comprennent que l\'excellence demande de la présence. Une meilleure attention crée de meilleurs résultats — pas en faisant plus, mais en étant vraiment là.',

  'mindset.card.focus50.title':   'La constance l\'emporte sur l\'intensité.',
  'mindset.card.focus50.content':
    'Les grands éclats d\'effort créent rarement des progrès durables. Les gens qui avancent vraiment privilégient la constance sur la motivation temporaire.\n\nDe petites sessions quotidiennes de concentration créent des résultats à long terme plus solides qu\'un travail intense et occasionnel.\n\nLa répétition construit de l\'élan. Une concentration durable l\'emporte avec le temps.',

  'mindset.card.focus51.title':   'Savoir ignorer est une force.',
  'mindset.card.focus51.content':
    'La vie moderne sollicite ton attention en permanence. Les gens qui savent se concentrer développent la capacité à ignorer intentionnellement ce qui ne sert pas leurs priorités.\n\nChaque tendance, conversation ou distraction ne mérite pas d\'énergie mentale.\n\nL\'ignorance sélective protège la concentration. L\'attention devient plus forte quand elle est dirigée intentionnellement — plutôt que dispersée par réflexe.',

  'mindset.card.focus52.title':   'Ce que tu consommes façonne comment tu penses.',
  'mindset.card.focus52.content':
    'Ton état mental est fortement influencé par ce que tu ingères quotidiennement. La surcharge d\'informations rend plus difficile la pensée claire et la hiérarchisation des priorités.\n\nLa concentration s\'améliore quand on réduit les entrées inutiles.\n\nUn environnement mental plus propre soutient une pensée plus précise. La simplicité améliore la cognition.',

  'mindset.card.focus53.title':   'Le focus crée son propre élan.',
  'mindset.card.focus53.content':
    'La motivation fluctue constamment. Mais l\'action concentrée crée sa propre énergie.\n\nUne fois la concentration engagée, le cerveau s\'implique souvent davantage de façon naturelle. Attendre indéfiniment l\'inspiration retarde le progrès.\n\nLes gens qui avancent s\'appuient sur la structure et l\'action plutôt que sur l\'humeur du moment. Le mouvement crée l\'élan.',

  'mindset.card.focus54.title':   'Exécuter avec calme produit plus qu\'agir sous pression.',
  'mindset.card.focus54.content':
    'L\'urgence stressante crée souvent une pensée bâclée et une fatigue émotionnelle. Une exécution calme et concentrée produit une performance plus durable.\n\nLes gens qui avancent vraiment apprennent à opérer avec constance plutôt qu\'avec panique.\n\nLe calme mental protège la capacité à décider. La concentration s\'épanouit dans la stabilité émotionnelle.',

  'mindset.card.focus55.title':   'Chaque distraction a un coût invisible.',
  'mindset.card.focus55.content':
    'Quand tu perds le focus, tu ne perds pas seulement du temps. Tu perds du progrès potentiel, de la créativité et de l\'énergie mentale.\n\nDe petites distractions répétées quotidiennement s\'accumulent en opportunités massivement perdues avec le temps.\n\nLes gens qui savent se concentrer reconnaissent la vraie valeur d\'une attention ininterrompue. Protéger sa concentration, c\'est protéger sa croissance.',

  'mindset.card.focus56.title':   'Ce sur quoi tu te concentres construit qui tu es.',
  'mindset.card.focus56.content':
    'Ce sur quoi tu te concentres régulièrement façonne lentement la façon dont tu penses, ressens et te comportes.\n\nL\'attention n\'est pas neutre — elle renforce des schémas à l\'intérieur de l\'esprit.\n\nLes gens qui avancent dirigent intentionnellement leur attention vers ce qui a du sens pour eux. Ton focus influence qui tu deviens. L\'attention façonne l\'identité.',

  'mindset.card.focus57.title':   'Une vie concentrée se sent différemment.',
  'mindset.card.focus57.content':
    'Quand l\'attention est constamment dispersée, la vie commence à sembler réactive et chaotique. La concentration crée un sens plus fort de la direction et du contrôle.\n\nUne attention intentionnelle permet de vivre l\'expérience plus profondément — plutôt que de la traverser inconsciemment.\n\nLa concentration ne concerne pas seulement la productivité. C\'est une façon de vivre avec conscience. Un esprit concentré crée une vie plus significative.',

  // ── Mindset Calm cards — Français ────────────────────────────────────────────
  'mindset.card.m5.content':
    'Les émotions ne sont pas des obstacles à la pensée claire. Ce sont des signaux.\n\nLa frustration indique un objectif bloqué. L\'anxiété indique un risque non adressé. La tristesse indique une perte qui mérite d\'être traversée. Le problème n\'est pas de les ressentir — c\'est d\'en être mené sans s\'en rendre compte.\n\nNommer ce qu\'on ressent, en comprendre l\'origine, et choisir consciemment comment répondre — cette seule habitude change tout.',

  'mindset.card.m11.content':
    'L\'une des choses les plus libératrices à comprendre : tout le monde ne t\'approuvera pas — et ce n\'est pas ton problème à résoudre.\n\nChercher une validation constante est une façon de s\'abandonner soi-même. Quand tu prends des décisions fondées sur qui tu veux être plutôt que sur ce que les autres attendent, tu accèdes à une liberté qu\'aucune approbation extérieure ne peut donner.\n\nLes personnes qui valent la peine d\'être gardées dans ta vie respecteront ton authenticité.',

  'mindset.card.m17.content':
    'S\'accrocher au ressentiment, aux regrets, ou au désir que les choses soient différentes de ce qu\'elles sont — c\'est l\'une des plus grandes sources de fatigue intérieure.\n\nLâcher prise, ce n\'est pas cautionner ce qui s\'est passé. C\'est choisir de ne plus porter ce poids pour pouvoir avancer.\n\nCe n\'est pas fait une fois pour toutes. C\'est une pratique quotidienne. Aujourd\'hui, choisis une chose à poser. Pas pour toujours. Juste pour aujourd\'hui.',

  'mindset.card.emo1.content':
    'Une journée difficile ne définit pas toute ta vie.\n\nLe retour à soi commence quand tu arrêtes de croire que les erreurs, les faux départs ou l\'épuisement émotionnel te définissent de façon permanente.\n\nChaque nouveau moment offre une autre chance de recommencer différemment. Guérir commence souvent par se donner la permission de repartir — sans se juger.',

  'mindset.card.emo3.title':  'Tes émotions ne sont pas tes ennemies.',
  'mindset.card.emo3.content':
    'Les émotions ne sont pas des problèmes à éliminer. Ce sont des informations sur ce que tu vis intérieurement.\n\nLe retour au calme arrive quand tu arrêtes de combattre chaque sentiment — et que tu commences à l\'écouter avec attention.\n\nLa tristesse, la frustration, la peur, la surcharge — elles révèlent souvent des besoins non satisfaits ou des tensions non résolues. La conscience crée la guérison.',

  'mindset.card.emo4.title':  'Chaque pensée ne mérite pas d\'être crue.',
  'mindset.card.emo4.content':
    'L\'esprit produit des milliers de pensées chaque jour — beaucoup d\'entre elles alimentées par le stress, la peur ou l\'insécurité.\n\nRevenir à soi demande d\'apprendre à observer ses pensées sans les accepter automatiquement comme vraies.\n\nLes pensées sont des événements mentaux temporaires, pas la réalité absolue. Prendre de la distance crée de la clarté.',

  'mindset.card.emo6.title':  'Ralentir la respiration change quelque chose de réel.',
  'mindset.card.emo6.content':
    'Quand le stress monte, le système nerveux entre en mode survie. Respirer lentement aide à signaler à l\'esprit et au corps qu\'il y a de la sécurité ici.\n\nRevenir au calme ne signifie pas toujours résoudre chaque problème immédiatement — parfois, cela commence simplement par apaiser le système nerveux d\'abord.\n\nUne respiration calme crée de l\'espace émotionnel. C\'est un point de départ, pas une solution magique.',

  'mindset.card.emo10.title':  'Lâcher crée de l\'espace pour la légèreté.',
  'mindset.card.emo10.content':
    'S\'accrocher trop longtemps au ressentiment, aux regrets ou à la douleur émotionnelle épuise silencieusement l\'esprit.\n\nRevenir au calme demande parfois de relâcher ce qui ne peut plus être changé.\n\nLâcher prise n\'est pas oublier. C\'est choisir de ne plus porter une souffrance inutile indéfiniment. Ce relâchement crée de la légèreté.',

  'mindset.card.emo11.title':  'L\'esprit a besoin de se sentir en sécurité.',
  'mindset.card.emo11.content':
    'Un stress constant maintient le corps en alerte émotionnelle et l\'esprit épuisé.\n\nRevenir au calme commence souvent par créer des environnements, des routines et des relations qui se sentent émotionnellement sûrs.\n\nLa sécurité permet à l\'esprit de se détendre à nouveau. Les espaces calmes soutiennent la guérison.',

  'mindset.card.emo12.title':  'Dire oui à tout mène à l\'épuisement.',
  'mindset.card.emo12.content':
    'Les limites protègent l\'énergie mentale et la stabilité émotionnelle.\n\nRevenir à l\'équilibre émotionnel signifie reconnaître quand ton énergie se vide plus vite qu\'elle ne se restaure.\n\nProtéger ta paix n\'est pas de l\'égoïsme. C\'est de l\'entretien.',

  'mindset.card.emo13.title':  'Tu es plus que ce que tu ressens en ce moment.',
  'mindset.card.emo13.content':
    'Les émotions difficiles peuvent sembler écrasantes. Mais elles sont des expériences temporaires — pas ton identité.\n\nLe retour au calme arrive quand tu arrêtes de te définir entièrement par ton état émotionnel du moment.\n\nLes sentiments passent. Ta valeur, elle, reste.',

  'mindset.card.emo15.title':  'Tu mérites aussi ta propre douceur.',
  'mindset.card.emo15.content':
    'Beaucoup de gens offrent de la gentillesse aux autres tout en se parlant intérieurement avec dureté.\n\nLa guérison émotionnelle devient plus difficile sous une autocritique constante. Revenir à soi demande d\'apprendre à se répondre avec plus de patience et de compréhension.\n\nLa bienveillance envers soi-même renforce la résilience. Elle ne rend pas faible — elle rend plus solide.',

  'mindset.card.emo16.title':  'Souffrir ne veut pas dire échouer.',
  'mindset.card.emo16.content':
    'Traverser des difficultés émotionnelles ne signifie pas que tu es fragile ou brisé.\n\nLes êtres humains vivent naturellement le deuil, le stress, la confusion, la peur et la tristesse tout au long de leur vie.\n\nRevenir à soi commence quand tu arrêtes de traiter la douleur comme une preuve d\'insuffisance. La difficulté fait partie d\'être humain.',

  'mindset.card.emo18.title':  'La comparaison use la paix intérieure.',
  'mindset.card.emo18.content':
    'Se comparer constamment — sa vie, son apparence, ses progrès ou son rythme de guérison — crée une fatigue émotionnelle silencieuse.\n\nRevenir à l\'équilibre grandit quand l\'attention retourne à son propre chemin.\n\nChacun traverse des choses en coulisses. La comparaison déforme la réalité.',

  'mindset.card.emo19.title':  'Le corps garde la trace du stress.',
  'mindset.card.emo19.content':
    'Le stress n\'est pas seulement mental — il traverse tout le corps. Tensions, fatigue, maux de tête, respiration courte, engourdissement émotionnel — ce sont souvent des signes de surcharge du système nerveux.\n\nRevenir à soi inclut prendre soin du corps autant que de l\'esprit.\n\nLa récupération physique soutient la guérison émotionnelle. Les deux sont liés.',

  'mindset.card.emo20.title':  'Ressentir plusieurs choses à la fois est normal.',
  'mindset.card.emo20.content':
    'Les émotions humaines sont complexes. On peut se sentir reconnaissant et débordé, plein d\'espoir et effrayé, en train de guérir et encore blessé — en même temps.\n\nRevenir au calme signifie permettre cette complexité émotionnelle sans se juger durement pour cela.\n\nDes émotions contradictoires sont normales. Elles ne signifient pas que quelque chose ne va pas.',

  'mindset.card.emo21.title':  'L\'honnêteté libère ce que la suppression garde captif.',
  'mindset.card.emo21.content':
    'Supprimer ses émotions ne les élimine pas durablement. Elles reviennent, souvent plus fort.\n\nRevenir à soi commence quand tu deviens honnête sur ce que tu ressens vraiment — plutôt que de faire semblant que tout va bien.\n\nL\'honnêteté crée un relâchement émotionnel. La conscience crée la guérison.',

  'mindset.card.emo26.title':  'La force émotionnelle inclut la vulnérabilité.',
  'mindset.card.emo26.content':
    'Beaucoup confondent force émotionnelle et suppression émotionnelle.\n\nLa vraie force inclut souvent l\'honnêteté, l\'ouverture, et la capacité d\'accueillir des sentiments difficiles sans honte.\n\nLa vulnérabilité crée une guérison plus profonde et une connexion plus authentique. L\'honnêteté émotionnelle construit la résilience.',

  'mindset.card.emo27.title':  'Tu peux choisir un schéma émotionnel différent.',
  'mindset.card.emo27.content':
    'Les expériences passées influencent les habitudes émotionnelles, mais elles ne contrôlent pas définitivement l\'avenir.\n\nRevenir à soi commence quand tu réalises que de nouveaux schémas peuvent être appris progressivement.\n\nLa conscience crée le choix. Des habitudes de guérison répétées créent le changement.',

  'mindset.card.emo28.title':  'Le calme est quelque chose qui s\'apprend.',
  'mindset.card.emo28.content':
    'La tranquillité émotionnelle n\'est pas quelque chose que certains ont naturellement et d\'autres pas.\n\nElle se développe souvent à travers des pratiques répétées — ralentir, respirer, observer, poser des limites, prendre conscience.\n\nLe calme se renforce avec la répétition intentionnelle. C\'est une compétence, pas un état qu\'on a ou qu\'on n\'a pas.',

  'mindset.card.emo29.title':  'La paix vit dans le moment présent.',
  'mindset.card.emo29.content':
    'Ressasser le passé et anticiper l\'avenir en permanence éloignent l\'attention du moment présent.\n\nRevenir au calme grandit quand on se reconnecte à ce qui se passe maintenant — plutôt que de vivre entièrement dans le bruit mental.\n\nLa présence apaise le système nerveux. Ce moment-ci est souvent plus gérable qu\'on ne le croit.',

  'mindset.card.emo30.title':  'Tu as le droit de protéger ta paix.',
  'mindset.card.emo30.content':
    'Tout environnement, toute conversation, toute relation ne mérite pas un accès illimité à ton énergie émotionnelle.\n\nRevenir à soi signifie parfois choisir de la distance par rapport à ce qui nuit régulièrement à ton bien-être mental.\n\nProtéger sa paix est une forme de respect de soi — pas de la fuite.',

  'mindset.card.emo31.title':  'Tu n\'as pas besoin de porter chaque émotion pour toujours.',
  'mindset.card.emo31.content':
    'Certaines émotions étaient destinées à être ressenties, comprises — puis relâchées. Pas portées indéfiniment pendant des années.\n\nRevenir à soi commence quand tu arrêtes de t\'identifier à la douleur si fortement qu\'elle devient une partie permanente de ton identité.\n\nGuérir crée de l\'espace pour que des émotions plus légères puissent exister à nouveau.',

  'mindset.card.emo32.title':  'Remarquer est déjà un début.',
  'mindset.card.emo32.content':
    'Beaucoup de réactions émotionnelles se produisent automatiquement — parce qu\'elles ont été répétées pendant des années sans réflexion.\n\nRevenir à soi commence quand tu t\'arrêtes assez longtemps pour observer tes schémas plutôt que de réagir inconsciemment.\n\nLa conscience crée la possibilité du changement. L\'observation interrompt le pilote automatique émotionnel.',

  'mindset.card.emo34.title':  'Tu as le droit d\'évoluer.',
  'mindset.card.emo34.content':
    'Certaines habitudes émotionnelles t\'ont peut-être aidé à traverser des expériences difficiles, mais elles ne servent peut-être plus ta vie actuelle.\n\nRevenir à soi signifie te permettre d\'évoluer émotionnellement sans culpabilité.\n\nLa croissance demande parfois de laisser aller de vieux mécanismes de défense. Le changement fait partie de la guérison.',

  'mindset.card.emo36.title':  'Chaque réaction émotionnelle n\'a pas besoin d\'une action immédiate.',
  'mindset.card.emo36.content':
    'Les émotions fortes créent souvent l\'envie de réagir vite. Revenir au calme grandit quand tu apprends à faire une pause avant de répondre impulsivement.\n\nUne réflexion tranquille évite des regrets inutiles.\n\nL\'espace entre le ressenti et l\'action crée une maturité émotionnelle.',

  'mindset.card.emo38.title':  'Se sentir perdu ne veut pas dire être brisé.',
  'mindset.card.emo38.content':
    'Les périodes de confusion, d\'incertitude ou de lourdeur émotionnelle font partie de la vie humaine.\n\nRevenir à soi commence quand tu arrêtes d\'interpréter une difficulté émotionnelle temporaire comme la preuve que quelque chose ne va pas définitivement.\n\nLes moments de perte ne effacent pas ta valeur.',

  'mindset.card.emo39.title':  'Accepter ce qui est crée de l\'espace pour respirer.',
  'mindset.card.emo39.content':
    'Résister constamment à la réalité crée une fatigue émotionnelle profonde. Revenir au calme signifie parfois accepter ce qui ne peut pas encore être changé — plutôt que de lui résister mentalement sans cesse.\n\nL\'acceptation crée de l\'espace pour respirer émotionnellement.\n\nLa paix commence souvent là où la résistance s\'adoucit.',

  'mindset.card.emo40.title':  'Tu mérites de te sentir en sécurité émotionnellement.',
  'mindset.card.emo40.content':
    'Les environnements remplis de critiques constantes, d\'imprévisibilité ou de manipulation émotionnelle endommagent lentement le bien-être mental.\n\nRevenir à soi inclut reconnaître que la sécurité émotionnelle compte profondément.\n\nDes relations et des espaces calmes soutiennent la guérison. Les environnements paisibles restaurent l\'énergie.',

  'mindset.card.emo41.title':  'Tes émotions méritent d\'être entendues, pas jugées.',
  'mindset.card.emo41.content':
    'Beaucoup ont appris à supprimer leurs émotions parce qu\'ils craignaient de paraître faibles ou difficiles.\n\nRevenir à soi commence quand tu arrêtes de te juger durement pour avoir des émotions humaines.\n\nLes sentiments méritent d\'être compris avant d\'être corrigés. La bienveillance soutient la guérison.',

  'mindset.card.emo42.title':  'Un esprit encombré de pensées mérite d\'être simplifié.',
  'mindset.card.emo42.content':
    'La surréflexion constante remplit l\'esprit de bruit émotionnel. Revenir au calme grandit quand tu simplifies tes pensées — plutôt que de rejouer mentalement chaque problème en boucle.\n\nUn esprit plus calme traite les émotions plus clairement.\n\nLa simplicité crée de la tranquillité.',

  'mindset.card.emo45.title':  'La façon dont tu te parles change la façon dont tu te remets.',
  'mindset.card.emo45.content':
    'La façon dont tu te parles intérieurement influence profondément la récupération émotionnelle. Une critique interne dure augmente la tension et l\'insécurité.\n\nUn langage intérieur doux crée de la sécurité émotionnelle.\n\nDes pensées bienveillantes soutiennent la résilience et la guérison.',

  'mindset.card.emo47.title':  'Tu n\'es pas obligé d\'absorber le stress des autres.',
  'mindset.card.emo47.content':
    'Absorber le stress, la négativité ou le chaos émotionnel des autres finit par devenir écrasant.\n\nRevenir au calme signifie parfois limiter son exposition aux situations émotionnellement épuisantes.\n\nProtéger son énergie crée de la stabilité. Les limites préservent la paix.',

  'mindset.card.emo48.title':  'Tu as le droit de te sentir mieux.',
  'mindset.card.emo48.content':
    'Certaines personnes s\'accrochent inconsciemment à la souffrance parce que la douleur est devenue familière ou émotionnellement protectrice.\n\nRevenir à soi inclut te permettre de vivre à nouveau la paix, la joie et la légèreté sans culpabilité.\n\nGuérir ne trahit pas ce que tu as traversé.',

  'mindset.card.emo49.title':  'Le présent est souvent plus gérable qu\'on ne le croit.',
  'mindset.card.emo49.content':
    'Rejouer le passé ou redouter l\'avenir en permanence augmente la surcharge émotionnelle.\n\nRevenir au calme grandit quand l\'attention retourne au moment présent. La présence apaise le système nerveux.\n\nCe qui se passe maintenant est souvent plus gérable que les futurs imaginaires que l\'esprit construit.',

  'mindset.card.emo50.title':  'Le corps dit ce que les mots ne formulent pas encore.',
  'mindset.card.emo50.content':
    'Le corps révèle souvent le stress émotionnel avant que l\'esprit ne l\'ait pleinement reconnu. Tensions, fatigue, maux de tête, irritabilité, engourdissement — ce sont des signaux importants.\n\nLa conscience émotionnelle inclut aussi la conscience physique.\n\nLe corps communique clairement la surcharge émotionnelle — si on accepte de l\'écouter.',

  'mindset.card.emo53.title':  'Revenir au calme, c\'est réapprendre à se sentir en sécurité.',
  'mindset.card.emo53.content':
    'Un stress chronique peut entraîner le système nerveux à rester constamment en alerte et tendu.\n\nRevenir au calme inclut ré-entraîner l\'esprit et le corps à reconnaître les moments de sécurité, de calme et de stabilité.\n\nLa paix peut sembler étrange avant de sembler naturelle à nouveau. C\'est normal.',

  'mindset.card.emo55.title':  'Tout ne peut pas être contrôlé — et c\'est une forme de soulagement.',
  'mindset.card.emo55.content':
    'Essayer de contrôler chaque résultat possible crée une fatigue émotionnelle et de l\'anxiété.\n\nRevenir à soi commence quand tu te concentres davantage sur la présence et l\'adaptabilité — plutôt que sur un contrôle parfait.\n\nLâcher prise crée un soulagement émotionnel réel. La flexibilité renforce la paix.',

  'mindset.card.emo56.title':  'Le calme intérieur peut se construire même quand l\'extérieur ne l\'est pas.',
  'mindset.card.emo56.content':
    'Les situations extérieures ne deviennent pas toujours paisibles immédiatement — mais un calme intérieur peut quand même se développer progressivement.\n\nRevenir au calme se renforce quand tu pratiques le ralentissement de tes pensées, et que tu choisis de répondre avec intention.\n\nLa paix intérieure change la façon dont tu vis les choses.',

  'mindset.card.emo57.title':  'Tu ne prends pas de retard émotionnellement.',
  'mindset.card.emo57.content':
    'Guérir n\'obéit pas à un calendrier universel. Comparer sa croissance émotionnelle à celle des autres crée une pression inutile.\n\nRevenir à soi grandit quand tu respectes ton propre rythme — plutôt que de précipiter ta récupération.\n\nLa croissance personnelle est profondément individuelle. Il n\'y a pas de retard.',

  'mindset.card.emo58.title':  'La stabilité émotionnelle se construit jour après jour.',
  'mindset.card.emo58.content':
    'De petites habitudes apaisantes pratiquées régulièrement créent une résilience émotionnelle plus forte avec le temps.\n\nLe sommeil, la réflexion, les limites, la respiration, le mouvement, la conscience de soi — tout cela renforce progressivement la régulation émotionnelle.\n\nLa stabilité se construit chaque jour. La répétition façonne la santé émotionnelle.',

  'mindset.card.emo60.title':  'Le calme est une forme de force — pas d\'absence.',
  'mindset.card.emo60.content':
    'Vivre dans la réactivité émotionnelle constante crée de l\'épuisement et de l\'instabilité.\n\nLes personnes calmes ne sont pas émotionnellement absentes — elles ont appris à faire une pause, à respirer, et à répondre avec intention plutôt que de réagir impulsivement.\n\nLe calme est une forme de force qui crée de meilleurs résultats dans chaque domaine de la vie.',

  // ── Mindset Courage cards — Français ────────────────────────────────────────────

  'mindset.card.m3.content':
    'La confiance n\'est pas un état dans lequel tu entres un matin. Elle se construit, discrètement, chaque fois que tu tiens une promesse faite à toi-même, que tu traverses quelque chose de difficile, que tu continues malgré le doute.\n\nBeaucoup attendent de se sentir prêts avant d\'agir. Mais la confiance arrive après le mouvement — pas avant.\n\nCommence à noter tes petites victoires. Pas pour les exhiber — mais pour te rappeler, quand le doute revient, que tu as déjà traversé des choses.',

  'mindset.card.m9.content':
    'Un refus ne dit pas forcément que tu n\'es pas assez. Parfois, il dit simplement que ce chemin-là n\'était pas le tien.\n\nLes personnes qui avancent malgré tout ne sont pas immunisées contre le rejet — elles ont appris à ne pas en faire une sentence définitive.\n\nQuand une porte se ferme, la question qui aide : "Vers quoi est-ce que ça me redirige ?"',

  'mindset.card.m15.content':
    'Tu ne peux pas penser ta façon d\'arriver à la confiance. Tu ne peux que te mettre en mouvement — et la laisser apparaître.\n\nLa confiance est un sous-produit de ce que tu fais, pas un prérequis pour le faire. Elle vient avec la pratique, pas avant.\n\nArrête d\'attendre de te sentir prêt. Ce sentiment arrive de l\'autre côté de ce qui te fait peur.',

  'mindset.card.conf1.title':   'La comparaison silencieuse épuise.',
  'mindset.card.conf1.content':
    'Quelqu\'un sera toujours plus avancé dans certains domaines. C\'est inévitable — et pourtant, continuer à se mesurer à quelqu\'un d\'autre ne fait qu\'éloigner de soi-même.\n\nLa confiance grandit quand tu reviens à ton propre chemin. Non par arrogance — mais parce que ta progression n\'appartient qu\'à toi.\n\nLes comparaisons ne motivent pas. Elles fatiguent.',

  'mindset.card.conf2.title':   'Confiance et arrogance ne sont pas la même chose.',
  'mindset.card.conf2.content':
    'L\'arrogance cherche à se sentir supérieure aux autres. La confiance, elle, n\'a pas besoin de ce contraste.\n\nLes personnes vraiment solides intérieurement n\'ont pas besoin de se prouver dans chaque échange. Elles n\'ont simplement pas ce besoin.\n\nLa confiance calme se reconnaît à cela : elle n\'est pas bruyante.',

  'mindset.card.conf3.title':   'Se traiter durement ne construit pas la confiance.',
  'mindset.card.conf3.content':
    'Beaucoup essaient de se construire par la critique permanente. Mais s\'attaquer à soi-même fragilise la résilience émotionnelle — elle ne la renforce pas.\n\nLa confiance grandit quand tu apprends à traverser tes erreurs sans te condamner.\n\nSe respecter pendant les moments difficiles n\'est pas une faiblesse. C\'est exactement ce qui permet de continuer.',

  'mindset.card.conf4.title':   'La vraie confiance naît dans les moments difficiles.',
  'mindset.card.conf4.content':
    'N\'importe qui peut se sentir solide quand la vie est douce. Mais la confiance durable — celle qui reste — se construit souvent dans les périodes d\'inconfort.\n\nChaque difficulté traversée devient une preuve intérieure de ce dont tu es capable.\n\nCe que tu as surmonté est déjà une forme de force.',

  'mindset.card.conf5.title':   'Attendre la perfection bloque plus qu\'elle ne protège.',
  'mindset.card.conf5.content':
    'Le perfectionnisme ressemble souvent à de la rigueur. Mais il cache parfois une peur de décevoir — soi-même, ou les autres.\n\nLa confiance n\'attend pas que tout soit parfait pour avancer. Elle avance malgré l\'imperfection.\n\nL\'erreur fait partie du processus. Elle ne réduit pas ta valeur.',

  'mindset.card.conf6.title':   'La façon dont tu portes ton corps parle aussi à ton esprit.',
  'mindset.card.conf6.content':
    'La posture, le regard, la respiration, la présence physique — tout cela influence l\'état émotionnel plus qu\'on ne le réalise souvent.\n\nLa confiance est à la fois mentale et corporelle. De petits ajustements dans la façon d\'occuper l\'espace créent des changements perceptibles.\n\nTon corps n\'est pas séparé de ce que tu ressens intérieurement.',

  'mindset.card.conf7.title':   'La préparation est aussi une forme de confiance.',
  'mindset.card.conf7.content':
    'Plus tu développes une capacité, plus tu te sens naturellement à ta place. La confiance n\'est pas toujours une question de mentalité — c\'est aussi une question de compétence.\n\nL\'entraînement, la répétition, l\'expérience — tout cela réduit la peur silencieusement.\n\nPréparer soigneusement quelque chose, c\'est déjà s\'accorder un peu plus de stabilité intérieure.',

  'mindset.card.conf8.title':   'Avoir peur ne signifie pas être faible.',
  'mindset.card.conf8.content':
    'La peur est une réponse humaine normale face à l\'incertitude. Les personnes confiantes la ressentent aussi — elles ne la laissent simplement pas dicter chaque décision.\n\nLe courage n\'est pas l\'absence de peur. C\'est avancer malgré elle.\n\nChaque fois que tu bouges en ayant peur, tu construis quelque chose de réel.',

  'mindset.card.conf9.title':   'Se faire confiance sous pression, ça s\'apprend aussi.',
  'mindset.card.conf9.content':
    'La vie ne sera pas toujours prévisible. La confiance, c\'est croire en ta capacité à t\'adapter — même quand les circonstances changent sans prévenir.\n\nTu n\'as pas besoin de toutes les réponses à l\'avance pour traverser les situations difficiles.\n\nFaire confiance à ta propre capacité à naviguer réduit la panique.',

  'mindset.card.conf10.title':  'La confiance grandit à chaque tentative.',
  'mindset.card.conf10.content':
    'La première fois qu\'on tente quelque chose, c\'est souvent inconfortable. La répétition réduit progressivement l\'incertitude — et l\'incertitude est souvent la principale source de la peur.\n\nPlus tu t\'exposes à ce qui te challenge, moins ça a de prise sur toi.\n\nLa familiarité crée du calme. Et le calme crée de la place pour avancer.',

  'mindset.card.conf11.title':  'Ce que tu te dis à toi-même construit aussi qui tu es.',
  'mindset.card.conf11.content':
    'Le dialogue intérieur façonne l\'état émotionnel jour après jour. Une critique interne permanente entraîne le cerveau à anticiper l\'échec.\n\nSe parler avec un peu plus de bienveillance crée une résilience émotionnelle plus solide.\n\nLa façon dont tu te parles mérite autant d\'attention que ce que tu dis aux autres.',

  'mindset.card.conf12.title':  'La confiance avance malgré le doute — pas en l\'effaçant.',
  'mindset.card.conf12.content':
    'Même les personnes les plus solides doutent parfois. La confiance ne consiste pas à faire taire toutes les pensées incertaines — elle consiste à ne pas leur obéir entièrement.\n\nL\'esprit amplifie souvent ce qui fait peur. Les personnes confiantes continuent malgré cette amplification.\n\nLe mouvement compte plus que la certitude parfaite.',

  'mindset.card.conf13.title':  'L\'évitement préserve la peur. L\'exposition la réduit.',
  'mindset.card.conf13.content':
    'Éviter les situations difficiles diminue l\'anxiété sur le moment — mais renforce l\'insécurité sur le long terme.\n\nChaque situation évitée apprend au cerveau que tu es incapable de la gérer. Chaque situation affrontée lui apprend le contraire.\n\nLa confiance se construit en traversant ce qu\'on redoutait de traverser.',

  'mindset.card.conf14.title':  'La confiance se reconstruit dans le retour.',
  'mindset.card.conf14.content':
    'L\'échec ne détruit pas la confiance en soi. C\'est souvent le refus de se relever qui le fait.\n\nLes personnes résilientes savent que les revers font partie du chemin. La confiance augmente quand tu réalises que tu peux tomber — et revenir quand même.\n\nLa capacité à recommencer après une difficulté construit quelque chose de solide.',

  'mindset.card.conf15.title':  'Ta valeur ne se mesure pas à ce que tu produis.',
  'mindset.card.conf15.content':
    'Beaucoup de gens lient entièrement leur confiance à la performance et aux résultats. Mais ta valeur en tant que personne n\'est pas conditionnelle à ta productivité.\n\nUne confiance saine laisse de la place au repos, à l\'imperfection, à l\'humanité.\n\nTa valeur intérieure existe au-delà de ce que tu accomplis.',

  'mindset.card.conf16.title':  'Se poser des limites, c\'est aussi se respecter.',
  'mindset.card.conf16.content':
    'Les personnes qui ignorent constamment leurs propres besoins finissent souvent par perdre confiance en leur propre jugement.\n\nLa confiance grandit quand tu commences à protéger ton énergie, ton temps, et ton équilibre émotionnel.\n\nLes limites ne sont pas de l\'égoïsme. Elles apprennent aux autres comment te traiter — et à toi-même que tu comptes.',

  'mindset.card.conf17.title':  'La confiance, ça se pratique chaque jour.',
  'mindset.card.conf17.content':
    'Ce n\'est pas un état permanent que tu atteins une fois pour toutes. Certains jours, tu te sentiras plus solide. D\'autres, moins.\n\nConstruire la confiance demande de petites habitudes quotidiennes qui nourrissent la confiance en soi, la résilience, et le courage.\n\nLa constance façonne l\'identité avec le temps. Ce que tu fais chaque jour finit par décider qui tu es.',

  'mindset.card.conf18.title':  'Ce que tu as déjà traversé compte aussi.',
  'mindset.card.conf18.content':
    'Beaucoup de gens sous-estiment la résilience qu\'ils ont déjà construite. Chaque expérience difficile traversée devient une preuve intérieure de ce dont tu es capable.\n\nLa confiance grandit quand tu prends le temps de reconnaître tout ce que tu as déjà surmonté.\n\nTon passé contient plus de preuves de force que tu ne le remarques souvent.',

  'mindset.card.conf19.title':  'Se faire confiance clarifie aussi les décisions.',
  'mindset.card.conf19.content':
    'L\'insécurité crée de l\'hésitation, de la suranalyse, du doute constant. La confiance permet des décisions plus claires — parce que tu fais confiance à ta capacité à gérer les résultats.\n\nTu ne contrôles pas tout ce qui arrive. Mais tu peux faire confiance à ta capacité à y répondre.\n\nLa confiance en soi réduit la paralysie mentale. Elle libère de la place pour agir.',

  'mindset.card.conf20.title':  'Rester soi-même est aussi une forme de confiance.',
  'mindset.card.conf20.content':
    'Prétendre être quelqu\'un d\'autre peut attirer une approbation temporaire — mais affaiblit la stabilité intérieure sur le long terme.\n\nLa confiance grandit quand ce que tu fais correspond à ce que tu es vraiment.\n\nL\'authenticité crée une liberté émotionnelle. Tu n\'as pas besoin de te performer constamment pour mériter le respect.',

  'mindset.card.conf21.title':  'La confiance grandit lentement. Et c\'est normal.',
  'mindset.card.conf21.content':
    'La plupart des confiances durables se construisent progressivement, à travers des expériences accumulées.\n\nDe petits moments de courage, de constance, de résilience — ils bâtissent une identité plus solide, discrètement, avec le temps.\n\nLa confiance est souvent invisible pendant qu\'elle grandit. Mais elle grandit quand même.',

  'mindset.card.conf22.title':  'Tout le monde n\'approuvera pas ton chemin. Et c\'est bien.',
  'mindset.card.conf22.content':
    'Chercher à plaire à tout le monde crée de l\'épuisement émotionnel et de l\'insécurité.\n\nLa confiance te permet de tolérer la désapprobation sans perdre ton sens de toi-même. Toutes les personnes ne comprendront pas ton chemin — ni ne le valideront.\n\nTa valeur ne dépend pas d\'une approbation universelle.',

  'mindset.card.conf23.title':  'La vraie confiance parle souvent doucement.',
  'mindset.card.conf23.content':
    'Elle ne cherche pas constamment l\'attention ou la validation. Elle n\'a pas besoin de se prouver dans chaque échange.\n\nLa confiance calme vient d\'une sécurité intérieure — pas d\'une performance extérieure.\n\nLa stabilité tranquille est puissante. Elle n\'a pas besoin d\'être bruyante pour être réelle.',

  'mindset.card.conf24.title':  'Tenir ce que tu t\'es promis renforce aussi la confiance.',
  'mindset.card.conf24.content':
    'Chaque fois que tu avances malgré la résistance, ton estime de toi-même grandit un peu.\n\nLa discipline construit de la confiance parce qu\'elle crée une preuve que tu peux compter sur toi-même — même quand c\'est difficile.\n\nLa constance façonne l\'identité. Les petites actions répétées créent une confiance réelle.',

  'mindset.card.conf25.title':  'Tu n\'es pas définitivement qui tu es maintenant.',
  'mindset.card.conf25.content':
    'Certaines personnes restent coincées dans de vieilles identités parce qu\'elles ont du mal à croire qu\'elles peuvent changer.\n\nLa confiance inclut la croyance que tu es capable de devenir plus que tes anciennes erreurs ou limitations.\n\nLa croissance nécessite de l\'ouverture. Ta version actuelle n\'est pas ta version finale.',

  'mindset.card.conf26.title':  'Quand tu te fais confiance, tout se vit différemment.',
  'mindset.card.conf26.content':
    'La confiance influence les relations, les opportunités, les décisions, la communication, et le bien-être émotionnel.\n\nQuand tu te fais confiance plus profondément, la vie semble moins intimidante — et plus significative.\n\nLa confiance crée de la liberté intérieure avant même de changer quoi que ce soit à l\'extérieur.',

  'mindset.card.conf27.title':  'La confiance commence là où la lutte contre soi s\'arrête.',
  'mindset.card.conf27.content':
    'Beaucoup essaient de construire une confiance tout en rejetant secrètement des parties d\'eux-mêmes.\n\nLa vraie confiance grandit quand tu arrêtes de te combattre — et que tu commences à t\'accepter tel que tu es, tout en laissant de la place pour évoluer.\n\nTu n\'as pas besoin d\'être parfait pour mériter le respect de toi-même.',

  'mindset.card.conf28.title':  'La confiance s\'apprend en vivant vraiment.',
  'mindset.card.conf28.content':
    'Lire, planifier, réfléchir — tout cela peut construire la confiance jusqu\'à un certain point. Mais la vraie confiance se développe à travers l\'expérience vécue.\n\nChaque conversation difficile, chaque défi, chaque erreur et chaque retour — tout cela renforce ta capacité à te faire confiance.\n\nL\'expérience apprend au système nerveux que tu peux traverser l\'inconfort.',

  'mindset.card.conf29.title':  'Se montrer, même quand c\'est difficile, construit quelque chose.',
  'mindset.card.conf29.content':
    'Éviter les opportunités, rester silencieux, se rétrécir — ça peut sembler émotionnellement sûr sur le moment. Mais ça renforce souvent l\'insécurité avec le temps.\n\nLa confiance grandit quand tu te permets d\'être vu, entendu, présent.\n\nLa visibilité construit la résilience. Se cacher renforce la peur.',

  'mindset.card.conf30.title':  'Avoir vraiment essayé compte aussi.',
  'mindset.card.conf30.content':
    'La confiance se sent plus solide quand tu sais que tu as honnêtement donné ce que tu pouvais.\n\nMême si les résultats ne sont pas parfaits, l\'effort crée un respect intérieur. Beaucoup de gens perdent confiance quand ils savent qu\'ils ne se sont pas pleinement impliqués.\n\nL\'effort sincère renforce l\'identité — peu importe le résultat.',

  'mindset.card.conf31.title':  'Tu n\'as pas besoin de tout savoir pour commencer.',
  'mindset.card.conf31.content':
    'La confiance grandit quand tu fais confiance à ta capacité à t\'adapter, apprendre, et progresser avec le temps.\n\nLes esprits insécures pensent que les erreurs les définissent de façon permanente. Les esprits confiants voient les erreurs comme des leçons temporaires.\n\nTa capacité à apprendre est plus précieuse que de tout savoir au départ.',

  'mindset.card.conf32.title':  'Se valider soi-même aussi, c\'est une forme de confiance.',
  'mindset.card.conf32.content':
    'La réassurance extérieure peut sembler rassurante sur le moment — mais en dépendre constamment fragilise la confiance en soi.\n\nLa confiance se renforce quand tu commences à te valider intérieurement plutôt qu\'à chercher une approbation extérieure pour chaque décision.\n\nL\'indépendance émotionnelle se construit doucement. La stabilité intérieure réduit l\'anxiété.',

  'mindset.card.conf33.title':  'Comment tu te parles après un échec aussi.',
  'mindset.card.conf33.content':
    'La plupart des gens sont bien plus durs avec eux-mêmes qu\'ils ne le seraient jamais avec quelqu\'un qu\'ils aiment.\n\nLa critique interne constante fragilise la résilience émotionnelle. La confiance grandit quand tu apprends à traverser un échec sans attaquer ta propre valeur.\n\nLa compassion renforce le courage — pas la sévérité.',

  'mindset.card.conf34.title':  'La confiance s\'étend là où le confort se réduit.',
  'mindset.card.conf34.content':
    'Les zones de confort semblent sûres — mais elles limitent souvent la croissance. La confiance se développe par une exposition répétée à des situations inhabituelles.\n\nChaque fois que tu survis à l\'inconfort, ton cerveau devient un peu moins effrayé par le défi.\n\nLa croissance apprend au système nerveux que l\'incertitude est traversable.',

  'mindset.card.conf35.title':  'Avancer sans tout savoir aussi, c\'est de la confiance.',
  'mindset.card.conf35.content':
    'Certaines personnes croient qu\'elles doivent avoir toutes les réponses avant d\'agir. Mais la vraie confiance signifie souvent rester calme même sans certitude totale.\n\nLa vie contiendra toujours des inconnues. Les personnes confiantes se font confiance pour trouver leur chemin en avançant.\n\nNe pas savoir n\'est pas la même chose que ne pas être capable.',

  'mindset.card.conf36.title':  'Ton niveau d\'énergie aussi façonne ce que tu ressens.',
  'mindset.card.conf36.content':
    'Le manque de sommeil, l\'épuisement, une mauvaise santé — tout cela peut fragiliser considérablement la confiance. Beaucoup de luttes émotionnelles s\'intensifient quand le système nerveux est déjà dépassé.\n\nPrendre soin de ton corps soutient la stabilité émotionnelle.\n\nUn corps mieux reposé soutient un esprit plus solide.',

  'mindset.card.conf37.title':  'Arrêter de se justifier constamment libère aussi.',
  'mindset.card.conf37.content':
    'L\'insécurité crée souvent le besoin de justifier continuellement ses décisions, ses comportements ou ses limites.\n\nLa confiance te permet de communiquer calmement sans explication excessive. Tu n\'as pas besoin d\'un accord universel pour avoir confiance en tes choix.\n\nLa simplicité reflète une certitude intérieure.',

  'mindset.card.conf38.title':  'Ce qui construit, c\'est le retour — pas la perfection.',
  'mindset.card.conf38.content':
    'Les personnes parfaites n\'existent pas. La confiance la plus solide appartient souvent à ceux qui ont appris à se relever après l\'embarras, les erreurs, les refus ou les revers.\n\nLa capacité à se remettre debout change profondément la perception de soi.\n\nLe retour construit ce que la perfection n\'aurait jamais pu construire.',

  'mindset.card.conf39.title':  'Occuper ton espace aussi requiert de la confiance.',
  'mindset.card.conf39.content':
    'L\'insécurité pousse souvent à se minimiser — émotionnellement, physiquement, socialement.\n\nLa confiance signifie se permettre d\'exister pleinement sans s\'excuser de sa présence.\n\nTes pensées, ta voix, ton existence ont de la valeur. S\'accorder de la place est une forme de respect de soi.',

  'mindset.card.conf40.title':  'Arrêter d\'imaginer un jugement permanent libère de l\'espace.',
  'mindset.card.conf40.content':
    'La plupart des gens sont bien plus concentrés sur eux-mêmes que sur une analyse constante de ce que tu fais.\n\nLa surinterprétation du regard social crée une anxiété inutile et une auto-conscience excessive.\n\nLa confiance grandit quand tu arrêtes d\'imaginer une critique permanente. La liberté apparaît quand la conscience de soi devient plus saine.',

  'mindset.card.conf41.title':  'Se connaître honnêtement aussi construit la confiance.',
  'mindset.card.conf41.content':
    'Ignorer ses faiblesses ne crée pas une vraie confiance. La vraie confiance inclut la capacité de reconnaître ses fragilités honnêtement — sans s\'effondrer pour autant.\n\nLa conscience de soi crée la croissance. Une confiance mature équilibre l\'acceptation de soi avec la responsabilité personnelle.',

  'mindset.card.conf42.title':  'La stabilité compte plus que la perfection.',
  'mindset.card.conf42.content':
    'La critique, le rejet, la déception — ils font partie de la vie de manière inévitable. La confiance se renforce quand tu apprends à ne pas interpréter chaque expérience négative comme une preuve d\'inadéquation.\n\nLa résilience émotionnelle te permet de continuer sans perdre ton identité.\n\nLa stabilité s\'entretient — doucement, régulièrement.',

  'mindset.card.conf43.title':  'Le courage arrive souvent après l\'action — pas avant.',
  'mindset.card.conf43.content':
    'Beaucoup d\'opportunités disparaissent parce que les gens attendent une certitude qui n\'arrive jamais.\n\nLa confiance se développe souvent après avoir agi — pas avant. La croissance demande du mouvement malgré l\'inconfort.\n\nCommencer sans se sentir complètement prêt, c\'est parfois la seule façon d\'aller de l\'avant.',

  'mindset.card.conf44.title':  'La préparation réduit l\'incertitude — et renforce la confiance.',
  'mindset.card.conf44.content':
    'Préparer soigneusement, s\'organiser, développer des compétences — tout cela renforce naturellement la confiance avec le temps.\n\nLa confiance se sent plus stable quand elle est soutenue par un effort réel.\n\nCe que tu prépares te soutient quand le moment arrive.',

  'mindset.card.conf45.title':  'Savoir s\'éloigner aussi, c\'est du respect de soi.',
  'mindset.card.conf45.content':
    'Un manque d\'estime de soi pousse souvent à tolérer des situations, des relations ou des traitements qui ne sont pas sains.\n\nLa confiance se renforce quand tu cesses d\'abandonner tes propres besoins pour l\'acceptation des autres.\n\nLes limites protègent la santé émotionnelle. Se respecter change les décisions.',

  'mindset.card.conf46.title':  'Un refus ne définit pas ta valeur ni ton avenir.',
  'mindset.card.conf46.content':
    'Le rejet fait souvent mal parce que les êtres humains cherchent naturellement l\'appartenance et la validation. Mais un refus ne définit pas ta valeur ni ton potentiel futur.\n\nLes personnes confiantes comprennent que toutes les opportunités ou relations ne sont pas destinées à elles.\n\nParfois, un refus redirige plus qu\'il ne limite.',

  'mindset.card.conf47.title':  'Le progrès, même petit, mérite aussi d\'être reconnu.',
  'mindset.card.conf47.content':
    'Le perfectionnisme maintient beaucoup de gens dans un sentiment d\'insuffisance perpétuelle parce que rien ne semble jamais "assez bien".\n\nLa confiance grandit plus vite quand tu reconnais tes améliorations plutôt que de te focaliser uniquement sur ce qui manque encore.\n\nLes petites victoires construisent un élan émotionnel.',

  'mindset.card.conf48.title':  'Rester toi-même quand tout comprime aussi, c\'est de la force.',
  'mindset.card.conf48.content':
    'Il est facile de perdre son authenticité en essayant d\'impressionner ou d\'éviter le jugement. La confiance te permet de rester connecté à tes valeurs même dans les situations inconfortables.\n\nL\'authenticité crée une paix intérieure.\n\nSe performer continuellement crée de l\'épuisement émotionnel.',

  'mindset.card.conf49.title':  'Ce qui ferme peut aussi ouvrir quelque chose d\'autre.',
  'mindset.card.conf49.content':
    'Chaque refus protège soit d\'un mauvais chemin, soit prépare au bon. Les personnes qui avancent malgré les refus ne sont pas immunisées — elles ont appris à ne pas en faire une sentence définitive.\n\nLe rejet est de l\'information, pas un verdict.\n\nQuand une porte se ferme : "Vers quoi est-ce que ça me redirige ?"',

  'mindset.card.conf50.title':  'Une erreur n\'est pas le résumé de qui tu es.',
  'mindset.card.conf50.content':
    'Une erreur, un refus, un moment difficile — tout cela ne définit pas ton identité. La pensée insécure transforme souvent des expériences temporaires en étiquettes permanentes.\n\nLa confiance grandit quand tu comprends qu\'un seul moment ne peut pas effacer ta valeur ni ton potentiel.\n\nTon histoire est bien plus grande qu\'un seul chapitre difficile.',

  'mindset.card.conf51.title':  'Affronter ce qu\'on évite libère doucement.',
  'mindset.card.conf51.content':
    'Les situations que tu évites deviennent souvent celles qui contrôlent le plus tes émotions.\n\nLa confiance se renforce quand tu confrontes lentement les conversations difficiles, les peurs, et les défis — plutôt que de les fuir.\n\nL\'exposition affaiblit la peur avec le temps. Le courage grandit par la répétition.',

  'mindset.card.conf52.title':  'Ta voix aussi mérite d\'être entendue.',
  'mindset.card.conf52.content':
    'Beaucoup de gens font taire leurs opinions par peur du jugement ou du rejet. La confiance grandit quand tu te permets d\'exprimer tes pensées honnêtement et respectueusement — sans filtrer constamment ton identité pour obtenir une approbation.\n\nTa perspective a de la valeur. S\'exprimer authentiquement renforce le respect de soi.',

  'mindset.card.conf53.title':  'Personne ne montre toute son histoire.',
  'mindset.card.conf53.content':
    'Les réseaux sociaux et les comparaisons créent souvent l\'illusion que tout le monde est plus réussi, plus épanoui, plus assuré.\n\nLa confiance grandit quand tu te rappelles que chaque personne traverse des difficultés en privé — des choses que tu ne peux pas toujours voir.\n\nComparer ta vraie vie à la version montrée de la vie des autres crée une distorsion. Un regard plus ancré restaure l\'estime de soi.',

  'mindset.card.conf54.title':  'Se sentir bien seul aussi renforce quelque chose.',
  'mindset.card.conf54.content':
    'Les personnes profondément mal à l\'aise dans la solitude finissent souvent par dépendre excessivement de la validation externe et de la distraction.\n\nLa confiance grandit quand tu apprends à apprécier ta propre compagnie — et à te sentir émotionnellement stable sans attention constante.\n\nLa solitude peut renforcer l\'identité. La paix intérieure crée une confiance plus solide.',

  'mindset.card.conf55.title':  'Le perfectionnisme constant bloque plus qu\'il ne protège.',
  'mindset.card.conf55.content':
    'Le perfectionnisme crée souvent de la paralysie, une peur de l\'échec, et un doute chronique.\n\nLa confiance grandit plus vite quand tu te permets d\'être imparfait tout en continuant à progresser.\n\nL\'erreur fait partie de la croissance — pas la preuve d\'une insuffisance.',

  'mindset.card.conf56.title':  'Être honnête sur ses limites aussi, c\'est se respecter.',
  'mindset.card.conf56.content':
    'Dire "oui" à tout fragilise souvent l\'estime de soi et l\'énergie émotionnelle.\n\nLa confiance se renforce quand tu deviens honnête par rapport à tes limites, tes besoins, et tes priorités.\n\nLes limites ne sont pas égoïstes quand elles protègent ton équilibre mental. Se respecter apprend à ton esprit que tes besoins comptent aussi.',

  'mindset.card.conf57.title':  'Quand tu te fais confiance, la vie se traverse autrement.',
  'mindset.card.conf57.content':
    'Quand tu te fais davantage confiance, tu abordes les opportunités, les relations et les défis différemment. La confiance crée une liberté émotionnelle — parce que tu cesses d\'avoir besoin d\'une preuve constante de ta valeur.\n\nTu commences à prendre plus de risques, à parler plus honnêtement, à vivre plus intentionnellement.\n\nLa sécurité intérieure change naturellement le comportement extérieur.',

  // ── Mindset Rest cards — Français ─────────────────────────────────────────────

  'mindset.card.emo2.content':
    'Beaucoup de gens se sentent coupables de ralentir. Mais l\'épuisement n\'est pas un signe de force — c\'est un signal que quelque chose a besoin d\'espace.\n\nL\'équilibre émotionnel demande de la récupération, du silence, des moments de pause.\n\nUn esprit reposé traverse la vie plus calmement. Ça n\'a pas besoin de justification.',

  'mindset.card.emo5.title':   'La distraction constante repousse ce qui attend d\'être entendu.',
  'mindset.card.emo5.content':
    'Beaucoup de gens évitent l\'inconfort émotionnel en restant perpétuellement occupés ou surstimulés. Mais les émotions non résolues restent là, sous la surface.\n\nLe vrai repos commence souvent quand tu arrêtes de t\'éloigner de toi-même.\n\nQuelques moments de quietude honnête valent plus que des heures de distraction.',

  'mindset.card.emo7.title':   'La fatigue émotionnelle est réelle — même quand rien ne l\'explique.',
  'mindset.card.emo7.content':
    'On peut être épuisé émotionnellement tout en continuant à fonctionner de l\'extérieur. Le stress chronique, la surréflexion, la suppression des émotions — tout cela draine l\'énergie silencieusement avec le temps.\n\nReconnaître que ton monde intérieur a besoin de soin aussi, c\'est déjà une forme de lucidité.\n\nLa récupération émotionnelle n\'est pas un luxe. C\'est une nécessité.',

  'mindset.card.emo8.title':   'Guérir n\'obéit pas toujours à un rythme régulier.',
  'mindset.card.emo8.content':
    'La croissance émotionnelle est rarement linéaire. Certains jours semblent apaisés. D\'autres, des émotions anciennes reviennent sans prévenir.\n\nGuérir ne signifie pas ne plus jamais souffrir — ça signifie apprendre à traverser les émotions difficiles avec un peu plus de douceur et de conscience.\n\nLe progrès se passe souvent sous la surface, doucement, sans que ça se voie.',

  'mindset.card.emo9.title':   'Tout n\'a pas besoin d\'être résolu aujourd\'hui.',
  'mindset.card.emo9.content':
    'Les esprits débordés essaient souvent de régler chaque problème immédiatement. Mais porter l\'avenir entier en même temps crée plus de tension qu\'il n\'en résout.\n\nLe vrai repos commence parfois quand tu acceptes de poser ce que tu ne peux pas gérer maintenant.\n\nUn seul pas à la fois suffit. Certaines choses peuvent attendre.',

  'mindset.card.emo14.title':  'Le silence aussi peut apaiser quelque chose.',
  'mindset.card.emo14.content':
    'Le monde moderne remplit constamment l\'esprit de stimulation et de bruit. La récupération émotionnelle demande souvent des moments tranquilles, sans distraction.\n\nLe silence donne au système nerveux l\'espace de ralentir. La quietude permet à ce qui est enfoui de remonter et de se poser naturellement.\n\nTu n\'as pas besoin de remplir chaque moment.',

  'mindset.card.emo17.title':  'Ralentir peut rendre les choses plus claires.',
  'mindset.card.emo17.content':
    'Quand l\'esprit est saturé, accélérer encore résout rarement le problème. Parfois, la récupération demande de décélérer intentionnellement — mentalement et physiquement.\n\nLa lenteur crée de l\'espace pour réfléchir et pour que le système nerveux se régule.\n\nPenser calmement prend de meilleures décisions que penser vite sous pression.',

  'mindset.card.emo22.title':  'Un esprit vide ne peut pas longtemps donner ce qu\'il n\'a plus.',
  'mindset.card.emo22.content':
    'Donner constamment de l\'énergie à tout le monde sauf à soi-même finit par créer un épuisement émotionnel profond.\n\nReconnaître tes propres besoins comme valides — c\'est une partie essentielle du repos émotionnel.\n\nPrendre soin de toi n\'est pas de l\'égoïsme. C\'est ce qui rend possible de continuer.',

  'mindset.card.emo23.title':  'La paix vient souvent de moins — pas de plus.',
  'mindset.card.emo23.content':
    'Les agendas surchargés, la stimulation permanente, la pression constante — tout cela fragilise silencieusement l\'équilibre émotionnel.\n\nLe repos émotionnel vient souvent de simplifier, de réduire le bruit inutile, d\'alléger la charge mentale.\n\nLa simplicité crée de l\'espace intérieur pour respirer.',

  'mindset.card.emo24.title':  'La récupération émotionnelle ne suit pas une ligne droite.',
  'mindset.card.emo24.content':
    'Certains jours, tu te sens solide et calme. D\'autres, des émotions anciennes reviennent de façon inattendue. Ce n\'est pas un recul — c\'est la façon dont ça fonctionne.\n\nLe repos émotionnel est un processus, pas une progression parfaite.\n\nLa guérison avance souvent en vagues plutôt qu\'en ligne droite.',

  'mindset.card.emo25.title':  'Ton esprit a besoin de moments doux aussi.',
  'mindset.card.emo25.content':
    'La pression constante d\'améliorer, de performer, d\'accomplir peut épuiser le cerveau émotionnellement avec le temps.\n\nLe repos émotionnel demande des moments de douceur, de réflexion, de légèreté intérieure.\n\nTous les moments de vie n\'ont pas besoin d\'être optimisés. La paix compte aussi.',

  'mindset.card.emo33.title':  'L\'esprit aussi a besoin de pause — pas seulement le corps.',
  'mindset.card.emo33.content':
    'Une exposition constante au stress, aux conflits, aux mauvaises nouvelles et à la tension émotionnelle surcharge le système nerveux avec le temps.\n\nLa récupération émotionnelle demande parfois de s\'éloigner temporairement de ce qui draine l\'énergie.\n\nProtéger ton environnement émotionnel, c\'est aussi prendre soin de ta santé mentale.',

  'mindset.card.emo35.title':  'Guérir commence souvent par se laisser ralentir.',
  'mindset.card.emo35.content':
    'Un système nerveux surstimulé maintient souvent le corps dans la tension, l\'anxiété et l\'épuisement émotionnel.\n\nLe repos émotionnel commence quand tu crées intentionnellement du calme — par la respiration, le silence, le mouvement, la quietude.\n\nLa sécurité intérieure permet à la guérison de se produire.',

  'mindset.card.emo37.title':  'Prétendre aller bien alors qu\'on est épuisé retarde quelque chose.',
  'mindset.card.emo37.content':
    'Faire semblant d\'être intact émotionnellement quand on est épuisé intérieurement retarde la guérison.\n\nLe vrai repos commence par reconnaître honnêtement ce qu\'on ressent vraiment.\n\nLe déni crée une pression intérieure. L\'honnêteté crée une forme de soulagement.',

  'mindset.card.emo43.title':  'La guérison se passe souvent en silence — et c\'est bien.',
  'mindset.card.emo43.content':
    'La guérison émotionnelle n\'est pas toujours spectaculaire ou évidente. Parfois, guérir ressemble à réagir plus calmement, à dormir plus profondément, à se remettre plus vite d\'un moment difficile.\n\nLes petits changements émotionnels comptent aussi.\n\nUn progrès discret reste un progrès.',

  'mindset.card.emo44.title':  'L\'épuisement émotionnel déforme la façon de voir les choses.',
  'mindset.card.emo44.content':
    'Quand on est émotionnellement dépassé, le cerveau interprète souvent les situations de manière plus négative et plus désespérée qu\'elles ne le sont réellement.\n\nLe repos émotionnel passe aussi par reconnaître quand l\'épuisement influence la perception.\n\nUn esprit reposé voit plus clairement. La fatigue déforme — le repos réajuste.',

  'mindset.card.emo46.title':  'Tu n\'as pas besoin de mériter le repos.',
  'mindset.card.emo46.content':
    'Beaucoup de gens se sentent coupables de ralentir ou de faire des pauses. Comme si le repos devait être "gagné" par l\'épuisement.\n\nMais les êtres humains ont naturellement besoin de récupération. Ce n\'est pas une récompense — c\'est une condition.\n\nTu n\'as rien à justifier pour t\'arrêter.',

  'mindset.card.emo51.title':  'La paix demande parfois de créer un peu de distance.',
  'mindset.card.emo51.content':
    'Toutes les relations, habitudes, environnements ou conversations ne soutiennent pas l\'équilibre émotionnel.\n\nLe repos émotionnel demande parfois de s\'éloigner de ce qui épuise systématiquement la paix mentale.\n\nSe protéger n\'est pas de l\'égoïsme quand la guérison en dépend.',

  'mindset.card.emo52.title':  'Prendre le temps de récupérer n\'est pas une faiblesse.',
  'mindset.card.emo52.content':
    'Prendre du temps pour se remettre émotionnellement ne signifie pas qu\'on est fragile ou incapable.\n\nLa récupération émotionnelle demande du courage, de la lucidité, et de l\'honnêteté.\n\nIgnorer la douleur émotionnelle ne crée pas de force. La guérison construit une résilience plus durable.',

  'mindset.card.emo54.title':  'Guérir demande aussi de la patience envers soi-même.',
  'mindset.card.emo54.content':
    'Certaines blessures émotionnelles ont mis des années à se former — elles peuvent prendre du temps à cicatriser.\n\nLe repos émotionnel grandit par une conscience de soi régulière, pas par une perfection précipitée.\n\nLa guérison ne peut pas toujours être forcée. La patience crée une douceur intérieure.',

  'mindset.card.emo59.title':  'Lâcher la pression permanente sur soi-même aussi, c\'est du repos.',
  'mindset.card.emo59.content':
    'Beaucoup de gens s\'imposent une pression énorme pour être constamment productifs, positifs, et émotionnellement solides.\n\nLe vrai repos émotionnel signifie se permettre d\'être humain — sans performance constante.\n\nLa paix intérieure grandit quand la pression se relâche un peu.',

  // ── Mindset Clarity cards — Français ─────────────────────────────────────────

  'mindset.card.m6.content':
    'Chaque application, chaque notification, chaque fil d\'actualité a été conçu pour capter ton attention et la retenir le plus longtemps possible. Ton attention est convoitée. La question est : en reçois-tu quelque chose de valable en échange ?\n\nUn détox numérique ne consiste pas à rejeter la technologie — c\'est à l\'utiliser avec intention plutôt que par réflexe.\n\nCommence par une heure sans écran le matin. Redécouvre la capacité de diriger toi-même ton attention.',

  'mindset.card.m12.content':
    'L\'ennui n\'est pas un problème à résoudre — c\'est un état qui crée. Le cerveau, laissé sans stimulation, revient à son mode par défaut : là où la créativité, l\'intuition et la réflexion sur soi vivent.\n\nEn remplissant chaque moment de silence avec du contenu, tu te prives de l\'espace mental où naissent tes meilleures idées.\n\nLaisse-toi ennuyer. Emporte un carnet, pas ton téléphone. Observe ce que ton esprit crée quand il a de la place.',

  'mindset.card.m18.content':
    'Le minimalisme numérique ne consiste pas à utiliser moins de technologie — c\'est à n\'utiliser que la technologie qui sert vraiment tes valeurs.\n\nPour chaque application sur ton téléphone, pose la question : est-ce que ça apporte quelque chose de réel à ma vie, ou est-ce que ça remplit simplement un moment que je n\'ai pas encore décidé comment utiliser ?\n\nPeut-être que quelques outils utilisés avec une vraie intention créent plus que douze outils utilisés par habitude.',

  'mindset.card.detox1.title':  'Ton attention est sollicitée de toutes parts, chaque jour.',
  'mindset.card.detox1.content':
    'Chaque application, notification et plateforme est conçue pour te garder engagé le plus longtemps possible. Un détox numérique commence quand tu réalises que ton attention a de la valeur — et qu\'elle est constamment convoitée.\n\nProtéger ta concentration, c\'est protéger ton énergie mentale.\n\nEn être conscient crée déjà des habitudes numériques plus saines.',

  'mindset.card.detox2.title':  'La stimulation constante fatigue l\'esprit — même sans qu\'on le remarque.',
  'mindset.card.detox2.content':
    'Le cerveau n\'a pas été conçu pour traiter des flux d\'informations ininterrompus sans pause. Le défilement continu, les notifications, le bruit numérique — tout cela surcharge silencieusement le système nerveux.\n\nLa fatigue mentale vient souvent de la surstimulation, pas de la paresse.\n\nLe silence restaure la clarté cognitive.',

  'mindset.card.detox3.title':  'L\'ennui n\'est pas l\'ennemi.',
  'mindset.card.detox3.content':
    'Beaucoup de gens attrapent leur téléphone dès que le silence apparaît. Mais l\'ennui peut devenir une porte vers la créativité, la réflexion et le recentrage intérieur.\n\nUn détox numérique, c\'est permettre au cerveau de retrouver des moments tranquilles.\n\nLa quietude renforce l\'attention et l\'imagination.',

  'mindset.card.detox4.title':  'Ton téléphone devrait être un outil — pas ce qui décide à ta place.',
  'mindset.card.detox4.content':
    'La technologie devient malsaine quand elle contrôle automatiquement ton comportement. Un détox numérique commence quand tu décides consciemment comment et quand la technologie sert ta vie.\n\nUn usage conscient crée de la liberté.\n\nUn usage automatique crée de la dépendance.',

  'mindset.card.detox5.title':  'Les notifications fragmentent l\'attention sans qu\'on s\'en rende compte.',
  'mindset.card.detox5.content':
    'Chaque notification interrompt le flux mental et affaiblit la concentration. Même de brèves distractions créent un temps de récupération caché pour le cerveau.\n\nUn détox numérique commence souvent par réduire les alertes inutiles.\n\nProtéger l\'attention améliore la clarté mentale.',

  'mindset.card.detox6.title':  'Défiler n\'est pas vraiment se reposer.',
  'mindset.card.detox6.content':
    'Beaucoup confondent le défilement sans fin avec la relaxation. Mais la surstimulation peut laisser l\'esprit plus épuisé qu\'avant.\n\nLa vraie récupération demande souvent du silence, du mouvement, de la nature, ou une présence à ce qui est là.\n\nUn détox numérique aide le système nerveux à vraiment ralentir.',

  'mindset.card.detox7.title':  'Ton cerveau s\'adapte à ce que tu lui donnes à consommer.',
  'mindset.card.detox7.content':
    'Le contenu court en permanence entraîne le cerveau à chercher une stimulation rapide — et fragilise l\'attention soutenue.\n\nUn détox numérique aide à reconstruire la patience, la concentration, et la pensée en profondeur.\n\nCe que tu consommes régulièrement façonne tes habitudes cognitives avec le temps.',

  'mindset.card.detox8.title':  'Être présent vaut plus que d\'être constamment connecté.',
  'mindset.card.detox8.content':
    'Être sans cesse connecté numériquement déconnecte souvent des expériences réelles émotionnellement.\n\nUn détox numérique crée l\'espace pour se reconnecter aux conversations, aux environnements, et aux moments de façon plus pleine.\n\nLa présence renforce le bien-être émotionnel.',

  'mindset.card.detox9.title':  'La clarté mentale demande des moments de silence.',
  'mindset.card.detox9.content':
    'Le cerveau a besoin de périodes sans flux constant d\'informations pour traiter correctement les émotions et les pensées.\n\nLa stimulation permanente crée du bruit mental. Un détox numérique redonne à l\'esprit de l\'espace pour respirer.\n\nLe calme soutient l\'équilibre émotionnel.',

  'mindset.card.detox10.title': 'Tu n\'as pas besoin d\'être informé à chaque minute.',
  'mindset.card.detox10.content':
    'La culture moderne crée souvent une pression de rester constamment à jour, diverti ou informé. Mais la consommation permanente surcharge le cerveau avec le temps.\n\nUn détox numérique apprend la valeur d\'une consommation d\'information intentionnelle.\n\nLa paix mentale grandit par la modération.',

  'mindset.card.detox11.title': 'Ta capacité de concentration peut se reconstruire.',
  'mindset.card.detox11.content':
    'La difficulté à se concentrer se renforce souvent par la surstimulation numérique répétée. Un détox numérique aide à réapprendre au cerveau à tolérer une concentration plus lente et plus profonde.\n\nL\'attention est entraînable.\n\nLa concentration s\'améliore par une pratique intentionnelle.',

  'mindset.card.detox12.title': 'Les réseaux sociaux montrent des fragments — pas des vies entières.',
  'mindset.card.detox12.content':
    'L\'exposition constante à des vies en ligne soigneusement mises en scène crée souvent des comparaisons malsaines et une insatisfaction émotionnelle.\n\nUn détox numérique aide à revenir à la réalité plutôt qu\'à l\'illusion.\n\nLa plupart des gens cachent leurs difficultés en ligne. La perspective protège la santé émotionnelle.',

  'mindset.card.detox13.title': 'Se sentir obligé de répondre immédiatement à tout crée de la tension.',
  'mindset.card.detox13.content':
    'La pression de répondre instantanément à chaque message crée de la fatigue émotionnelle et mentale.\n\nUn détox numérique inclut des limites plus saines autour de la communication.\n\nTu n\'as pas besoin d\'être constamment accessible à tout le monde.',

  'mindset.card.detox14.title': 'Le vrai repos demande parfois de se déconnecter vraiment.',
  'mindset.card.detox14.content':
    'Le système nerveux a du mal à se détendre pleinement quand il traite en permanence des stimulations numériques.\n\nUn détox numérique permet une récupération mentale plus profonde en réduisant temporairement les entrées.\n\nSe déconnecter restaure l\'énergie émotionnelle.',

  'mindset.card.detox15.title': 'La technologie devrait soutenir ta vie — pas la remplacer.',
  'mindset.card.detox15.content':
    'Les outils numériques peuvent améliorer la vie significativement quand ils sont utilisés avec intention. Les problèmes commencent quand la technologie remplace des expériences, des relations et une conscience de soi significatives.\n\nUn détox numérique crée un équilibre plus sain entre vie en ligne et hors ligne.',

  'mindset.card.detox16.title': 'Le défilement infini évite souvent quelque chose de plus profond.',
  'mindset.card.detox16.content':
    'Beaucoup de gens utilisent la stimulation constante pour éviter temporairement la solitude, le stress, l\'anxiété ou l\'inconfort émotionnel.\n\nUn détox numérique crée une conscience autour des schémas d\'évitement émotionnel.\n\nLa quietude révèle souvent ce que la distraction cachait.',

  'mindset.card.detox17.title': 'Ton esprit a besoin d\'espace pour penser par lui-même.',
  'mindset.card.detox17.content':
    'La consommation constante de contenu laisse peu de place pour la réflexion originale ou la pensée personnelle.\n\nUn détox numérique crée un espace mental pour une pensée plus profonde, la créativité et l\'intuition personnelle.\n\nLe silence soutient la pensée indépendante.',

  'mindset.card.detox18.title': 'La surstimulation constante érode le plaisir pour les choses simples.',
  'mindset.card.detox18.content':
    'La stimulation numérique rapide déclenche constamment des réponses dopaminergiques dans le cerveau. Avec le temps, la vie ordinaire peut commencer à sembler moins intéressante ou satisfaisante émotionnellement.\n\nUn détox numérique aide à restaurer l\'appréciation pour des expériences plus lentes et plus simples.',

  'mindset.card.detox19.title': 'Protéger son espace numérique aussi protège sa santé émotionnelle.',
  'mindset.card.detox19.content':
    'Toutes les conversations, applications ou environnements en ligne ne méritent pas un accès illimité à ton attention et tes émotions.\n\nUn détox numérique inclut le fait de devenir plus intentionnel sur ce qui entre dans ton espace mental.\n\nLes limites réduisent la surcharge.',

  'mindset.card.detox20.title': 'La présence réelle crée des liens plus forts que la disponibilité constante.',
  'mindset.card.detox20.content':
    'Être physiquement présent tout en étant mentalement absorbé par un écran fragilise la connexion et la communication.\n\nUn détox numérique renforce la présence émotionnelle avec les autres.\n\nUne vraie attention approfondit les relations. La présence crée aussi des souvenirs plus riches.',

  'mindset.card.detox21.title': 'Le silence fait du bien au cerveau — vraiment.',
  'mindset.card.detox21.content':
    'Le cerveau a besoin de moments sans stimulation pour se réinitialiser émotionnellement et cognitivement.\n\nUn détox numérique réintroduit le silence dans le quotidien. Les environnements calmes réduisent le stress et améliorent la concentration.\n\nLa tranquillité restaure l\'énergie mentale.',

  'mindset.card.detox22.title': 'La consommation permanente peut engourdir la sensibilité émotionnelle.',
  'mindset.card.detox22.content':
    'Quand le cerveau reçoit une stimulation ininterrompue, le traitement émotionnel devient souvent plus faible ou retardé.\n\nUn détox numérique permet aux émotions de remonter plus naturellement.\n\nLa conscience émotionnelle s\'améliore par une réduction de la surstimulation.',

  'mindset.card.detox23.title': 'La façon dont tu commences le matin façonne ton état mental pour la journée.',
  'mindset.card.detox23.content':
    'Commencer la journée immédiatement avec les réseaux sociaux ou les notifications place souvent le cerveau en mode réactif.\n\nDes habitudes de détox numérique le matin créent plus de calme, de concentration et de stabilité émotionnelle tout au long de la journée.\n\nProtéger tes matins protège ton état d\'esprit.',

  'mindset.card.detox24.title': 'La vraie vie se passe aussi hors ligne.',
  'mindset.card.detox24.content':
    'Des moments importants sont souvent manqués quand l\'attention reste piégée dans les écrans. Un détox numérique aide à se reconnecter aux expériences physiques, à la nature, au mouvement, aux conversations et à une vraie présence.\n\nLa vie existe au-delà de la stimulation numérique.',

  'mindset.card.detox25.title': 'La surcharge mentale réduit la créativité.',
  'mindset.card.detox25.content':
    'Le cerveau a du mal à penser de façon créative quand il est constamment surchargé d\'informations.\n\nUn détox numérique crée un espace de respiration mentale pour l\'imagination et la pensée plus profonde.\n\nLa créativité s\'épanouit dans des environnements mentaux plus calmes.',

  'mindset.card.detox26.title': 'Tu peux changer ta relation à la technologie.',
  'mindset.card.detox26.content':
    'Les habitudes numériques sont des comportements appris — pas des traits permanents. Un détox numérique commence par de petits changements intentionnels répétés régulièrement.\n\nLa conscience crée des choix plus sains.\n\nChanger est possible progressivement.',

  'mindset.card.detox27.title': 'Vivre plus lentement peut sembler inconfortable au début.',
  'mindset.card.detox27.content':
    'Les personnes habituées à la stimulation constante peuvent d\'abord se sentir agitées pendant les périodes de détox numérique. Cet inconfort est souvent temporaire.\n\nLe système nerveux s\'adapte progressivement à des rythmes plus lents.\n\nLe calme se renforce avec le temps.',

  'mindset.card.detox28.title': 'Ton attention mérite d\'être protégée.',
  'mindset.card.detox28.content':
    'L\'attention est l\'une de tes ressources internes les plus précieuses. Les distractions numériques fragilisent silencieusement la concentration, la productivité et la présence émotionnelle.\n\nUn détox numérique renforce la capacité à se concentrer intentionnellement à nouveau.\n\nProtéger l\'attention protège la qualité de vie.',

  'mindset.card.detox29.title': 'Tu n\'as pas besoin de tout documenter pour que ça compte.',
  'mindset.card.detox29.content':
    'Enregistrer constamment les expériences peut réduire la capacité à les vivre pleinement émotionnellement.\n\nUn détox numérique encourage à vivre les moments directement plutôt que de toujours voir la vie à travers un écran.\n\nLa présence crée des souvenirs plus riches.',

  'mindset.card.detox30.title': 'Réduire la surcharge numérique crée une légèreté intérieure.',
  'mindset.card.detox30.content':
    'Diminuer une dépendance numérique malsaine crée de la légèreté émotionnelle, une meilleure concentration et une présence plus forte dans le quotidien.\n\nUn détox numérique ne consiste pas à rejeter la technologie — c\'est à reprendre le contrôle conscient de ton attention et de ton bien-être mental.',

  'mindset.card.detox31.title': 'Être constamment connecté ne signifie pas vraiment se connecter.',
  'mindset.card.detox31.content':
    'Être en ligne toute la journée peut encore laisser les gens émotionnellement déconnectés et seuls.\n\nUn détox numérique aide à créer des relations plus profondes par une présence attentive et des conversations significatives.\n\nLa vraie connexion demande de l\'attention — pas seulement un accès.',

  'mindset.card.detox32.title': 'Ton cerveau n\'a pas été conçu pour le défilement infini.',
  'mindset.card.detox32.content':
    'L\'esprit humain cherche naturellement la stimulation — et les fils infinis exploitent en permanence cet instinct. Un détox numérique commence quand tu réalises que le contenu infini laisse souvent le cerveau mentalement surchargé plutôt qu\'accompli.\n\nLa conscience crée des choix numériques plus sains.',

  'mindset.card.detox33.title': 'Le bruit numérique augmente la fatigue mentale silencieusement.',
  'mindset.card.detox33.content':
    'Les notifications constantes, les vidéos, les mises à jour et les messages drainent silencieusement l\'énergie cognitive tout au long de la journée. Même quand tu ne le remarques pas consciemment, le cerveau traite encore la stimulation.\n\nUn détox numérique réduit l\'épuisement mental en abaissant les entrées inutiles.',

  'mindset.card.detox34.title': 'Tu n\'as pas besoin de répondre immédiatement à tout.',
  'mindset.card.detox34.content':
    'La technologie moderne crée des attentes irréalistes de disponibilité constante. Un détox numérique inclut d\'apprendre que des réponses différées ne te rendent pas irresponsable.\n\nLes limites protègent l\'énergie émotionnelle et réduisent le stress.',

  'mindset.card.detox35.title': 'Trop d\'information crée de la fatigue décisionnelle.',
  'mindset.card.detox35.content':
    'Le cerveau se sature quand il traite continuellement du contenu et des choix excessifs. Un détox numérique aide à réduire l\'encombrement mental et améliore la clarté.\n\nDes entrées plus simples soutiennent une pensée plus calme.\n\nMoins d\'information crée parfois de meilleures décisions.',

  'mindset.card.detox36.title': 'L\'esprit a besoin de moments sans interruption.',
  'mindset.card.detox36.content':
    'Les interruptions constantes fragilisent la pensée profonde et la présence émotionnelle. Un détox numérique crée de l\'espace pour une concentration, une réflexion et un calme ininterrompus.\n\nLa clarté mentale s\'améliore quand le cerveau peut rester concentré plus longtemps.',

  'mindset.card.detox37.title': 'La surstimulation rapide peut rendre les plaisirs simples moins savoureux.',
  'mindset.card.detox37.content':
    'La stimulation numérique rapide peut progressivement réduire l\'appréciation pour les expériences du monde réel plus lentes. Un détox numérique aide à restaurer le plaisir dans les moments simples — les conversations, la nature, la lecture, le mouvement, la quietude.\n\nL\'équilibre reconstruit la sensibilité émotionnelle.',

  'mindset.card.detox38.title': 'Les réseaux sociaux déforment souvent la réalité.',
  'mindset.card.detox38.content':
    'Les plateformes en ligne montrent fréquemment des moments édités, filtrés et soigneusement sélectionnés plutôt que des expériences humaines complètes.\n\nUn détox numérique aide à réduire la comparaison irréaliste et la pression émotionnelle.\n\nLa vraie vie est plus équilibrée et complexe que ce que les apparences en ligne suggèrent.',

  'mindset.card.detox39.title': 'Tu penses plus clairement quand il y a moins d\'entrées constantes.',
  'mindset.card.detox39.content':
    'Quand le cerveau consomme constamment de l\'information, il reste peu de temps pour la réflexion. Un détox numérique crée un espace mental pour une pensée plus profonde et une conscience de soi.\n\nLe silence améliore la clarté.\n\nLa réflexion renforce l\'intelligence émotionnelle.',

  'mindset.card.detox40.title': 'Un détox numérique, c\'est une question d\'intention — pas d\'extrêmes.',
  'mindset.card.detox40.content':
    'Des habitudes numériques saines ne nécessitent pas d\'abandonner complètement la technologie. L\'objectif est d\'apprendre à utiliser la technologie consciemment plutôt que de manière compulsive.\n\nL\'équilibre crée la durabilité.\n\nLa conscience crée la liberté.',

  'mindset.card.detox41.title': 'Ce à quoi tu accordes ton attention façonne ton expérience de la vie.',
  'mindset.card.detox41.content':
    'Ce qui capte régulièrement ton attention façonne lentement tes émotions, ta concentration et ton identité. Un détox numérique renforce l\'attention intentionnelle plutôt que la distraction automatique.\n\nUne attention consciente crée des expériences plus significatives.',

  'mindset.card.detox42.title': 'L\'agitation pendant un détox numérique est normale.',
  'mindset.card.detox42.content':
    'Le cerveau peut initialement se sentir mal à l\'aise sans stimulation constante parce qu\'il s\'est habitué à des cycles rapides. Un détox numérique semble souvent étrange avant de sembler apaisé.\n\nLes systèmes nerveux ont besoin de temps pour se réajuster.\n\nLe calme se renforce progressivement.',

  'mindset.card.detox43.title': 'Ton sommeil dépend aussi de tes habitudes numériques.',
  'mindset.card.detox43.content':
    'L\'exposition aux écrans en soirée surstimule le cerveau et perturbe les schémas de sommeil sains. Un détox numérique avant le coucher améliore la récupération, la régulation émotionnelle et les performances cognitives.\n\nUn meilleur sommeil renforce la clarté mentale.',

  'mindset.card.detox44.title': 'La concentration s\'améliore quand les distractions numériques diminuent.',
  'mindset.card.detox44.content':
    'Les habitudes de vérification constante fragilisent la concentration et réduisent significativement l\'efficacité. Un détox numérique renforce la concentration en réduisant la fragmentation mentale.\n\nUne attention protégée crée un travail de meilleure qualité.',

  'mindset.card.detox45.title': 'La vraie relaxation est différente de la consommation passive.',
  'mindset.card.detox45.content':
    'Beaucoup de gens consomment du contenu sans fin tout en se sentant encore émotionnellement fatigués ensuite. Un détox numérique aide à distinguer la vraie récupération de la surstimulation déguisée en relaxation.\n\nLe vrai repos laisse le système nerveux plus calme, pas surchargé.',

  'mindset.card.detox46.title': 'Ton esprit a parfois besoin d\'espace vide.',
  'mindset.card.detox46.content':
    'La créativité, le traitement émotionnel et l\'intuition apparaissent souvent pendant des moments calmes sans stimulation. Un détox numérique recrée un espace de respiration mentale.\n\nL\'espace vide n\'est pas de l\'espace gaspillé.\n\nLa quietude soutient la créativité.',

  'mindset.card.detox47.title': 'La technologie peut silencieusement augmenter l\'anxiété.',
  'mindset.card.detox47.content':
    'L\'exposition constante à l\'information, aux comparaisons, à l\'urgence et aux notifications maintient de nombreux systèmes nerveux émotionnellement activés.\n\nUn détox numérique aide à réduire le stress de fond et la surstimulation émotionnelle.\n\nDes environnements calmes soutiennent la stabilité émotionnelle.',

  'mindset.card.detox48.title': 'Tu n\'as pas besoin de consommer chaque tendance.',
  'mindset.card.detox48.content':
    'Internet crée constamment une pression de rester à jour sur tout ce qui se passe partout. Un détox numérique inclut de reconnaître que toutes les tendances, débats ou informations ne méritent pas ton attention.\n\nUne consommation sélective protège la paix mentale.',

  'mindset.card.detox49.title': 'Les moments hors ligne renforcent la conscience de soi.',
  'mindset.card.detox49.content':
    'Sans distraction numérique constante, les pensées et les émotions deviennent plus faciles à remarquer clairement. Un détox numérique crée des opportunités de réflexion plus profonde.\n\nLa conscience améliore la régulation émotionnelle et la clarté.',

  'mindset.card.detox50.title': 'La technologie devrait ajouter de la valeur à ta vie.',
  'mindset.card.detox50.content':
    'Les outils numériques sont plus sains quand ils soutiennent l\'apprentissage, la créativité, la connexion ou un travail significatif intentionnellement. Un détox numérique consiste à supprimer l\'excès malsain tout en préservant un usage utile.\n\nUn usage conscient crée de l\'équilibre.',

  'mindset.card.detox51.title': 'Le défilement constant affaiblit la présence.',
  'mindset.card.detox51.content':
    'Beaucoup de gens existent physiquement dans un endroit tout en étant mentalement absorbés ailleurs numériquement. Un détox numérique renforce la capacité à vivre pleinement les conversations, les repas, la nature et les moments ordinaires.\n\nLa présence améliore le bien-être émotionnel.',

  'mindset.card.detox52.title': 'Ton système nerveux absorbe plus que tu ne le réalises.',
  'mindset.card.detox52.content':
    'Même quand tu te sens "habitué" à la stimulation constante, le système nerveux ressent encore le stress d\'un flux ininterrompu. Un détox numérique donne au cerveau et au corps des opportunités de se réguler plus naturellement.\n\nLa récupération soutient la résilience.',

  'mindset.card.detox53.title': 'Un détox numérique renforce la concentration progressivement.',
  'mindset.card.detox53.content':
    'La récupération de la capacité d\'attention ne se produit pas instantanément. Le cerveau réapprend lentement à tolérer une concentration plus profonde après des périodes de surstimulation.\n\nDes limites numériques cohérentes renforcent la concentration avec le temps.\n\nLa patience compte pendant le processus.',

  'mindset.card.detox54.title': 'Moins de temps sur les écrans crée souvent plus d\'espace intérieur.',
  'mindset.card.detox54.content':
    'Réduire la stimulation numérique inutile peut créer des améliorations notables dans le calme, la clarté et la stabilité émotionnelle. Un détox numérique permet à l\'esprit de se sentir moins encombré intérieurement.\n\nLa simplicité soutient la paix.',

  'mindset.card.detox55.title': 'Tu n\'as pas besoin de divertissement constant.',
  'mindset.card.detox55.content':
    'La culture moderne apprend souvent aux gens à éviter en permanence le silence, la quietude et l\'ennui. Un détox numérique aide à reconstruire le confort avec les moments plus lents.\n\nLa quietude n\'est pas du vide — c\'est une récupération pour l\'esprit.',

  'mindset.card.detox56.title': 'Tes relations méritent une attention entière.',
  'mindset.card.detox56.content':
    'Une attention divisée fragilise la connexion émotionnelle avec le temps. Un détox numérique renforce la communication en encourageant une écoute plus profonde et une présence avec les autres.\n\nL\'attention communique le soin plus puissamment que la disponibilité numérique constante.',

  'mindset.card.detox57.title': 'Ralentir améliore la conscience de ce qui se passe en soi.',
  'mindset.card.detox57.content':
    'La surstimulation numérique maintient souvent les gens mentalement pressés et émotionnellement déconnectés. Un détox numérique ralentit le rythme intérieur et améliore la conscience des pensées, des émotions et de l\'environnement.\n\nUne attention plus lente crée des expériences plus profondes.',

  'mindset.card.detox58.title': 'Un détox numérique aide à retrouver une sensibilité émotionnelle plus fine.',
  'mindset.card.detox58.content':
    'La stimulation excessive peut progressivement engourdir la conscience émotionnelle. Réduire la surcharge numérique permet aux émotions de se sentir plus claires et plus naturelles à nouveau.\n\nLa connexion émotionnelle se renforce quand l\'esprit devient moins surstimulé.',

  'mindset.card.detox59.title': 'Ton temps vaut plus que le défilement sans fin.',
  'mindset.card.detox59.content':
    'Les heures disparaissent rapidement dans des habitudes numériques inconscientes. Un détox numérique crée une conscience sur la façon dont l\'attention et le temps sont dépensés quotidiennement.\n\nUn usage intentionnel du temps crée une vie plus significative.',

  'mindset.card.detox60.title': 'La paix mentale demande parfois moins de stimulation.',
  'mindset.card.detox60.content':
    'Le cerveau fonctionne souvent mieux avec moins d\'interruptions, des environnements plus calmes et une attention plus intentionnelle. Un détox numérique crée des conditions où le calme émotionnel devient plus facile à maintenir.\n\nLa simplicité protège la santé mentale.',

  'mindset.card.detox61.title': 'Reprendre le contrôle de ton attention change vraiment quelque chose.',
  'mindset.card.detox61.content':
    'L\'attention influence la productivité, le bien-être émotionnel, les relations, la créativité et la qualité de vie globale. Un détox numérique consiste finalement à reprendre le contrôle conscient de l\'endroit où va ton énergie chaque jour.\n\nCe à quoi tu accordes régulièrement ton attention façonne ton avenir.',

  // ── Mindset Momentum cards — Français ────────────────────────────────────────

  'mindset.card.m4.content':
    'Chaque matin, identifie ta tâche la plus importante — celle qui, si elle était faite aujourd\'hui, créerait le plus de mouvement réel. Fais-la avant tout le reste. Avant les emails. Avant les réseaux. Avant que les demandes réactives de la journée prennent le dessus.\n\nLa plupart des gens remplissent leurs journées avec l\'urgent qui compte peu. Ce qui compte vraiment est souvent remis à plus tard.\n\nUne chose importante faite par jour change la direction d\'une année entière.',

  'mindset.card.m10.content':
    'Ton calendrier devrait refléter tes priorités — pas seulement tes obligations réactives. Bloquer du temps, c\'est décider à l\'avance comment tu veux que ta journée se passe — avant que les autres décident à ta place.\n\nLes personnes réactives répondent à ce qui arrive. Les personnes proactives exécutent ce qui était prévu.\n\nCommence par protéger tes matins pour ce qui compte vraiment. Avec le temps, étends cette protection à toute ta journée.',

  'mindset.card.m16.content':
    'Une fois par semaine, prends 30 minutes pour regarder en arrière et préparer ce qui vient. Qu\'est-ce que j\'ai accompli ? Qu\'est-ce que j\'ai évité ? Qu\'est-ce que je porte encore ? Qu\'est-ce que je peux lâcher ?\n\nLa revue hebdomadaire transforme des actions quotidiennes dispersées en une progression cohérente.\n\nLes personnes qui la pratiquent vivent avec moins d\'anxiété — et beaucoup plus de clarté.',

  'mindset.card.prod1.title':   'Avancer compte plus qu\'être occupé.',
  'mindset.card.prod1.content':
    'Être occupé ne signifie pas toujours avancer. Beaucoup de gens remplissent leurs journées d\'activité constante tout en évitant ce qui compte vraiment.\n\nLa vraie progression crée un mouvement significatif vers ce qui importe. Une action ciblée produit des résultats — l\'agitation permanente produit surtout de l\'épuisement.\n\nLe vrai élan se mesure à l\'impact, pas à l\'agitation.',

  'mindset.card.prod2.title':   'Commencer avant de se sentir prêt — c\'est possible aussi.',
  'mindset.card.prod2.content':
    'Attendre la motivation parfaite gaspille du temps et de l\'énergie. L\'élan grandit quand tu apprends à commencer malgré la résistance ou l\'incertitude.\n\nL\'action crée souvent la motivation après que le mouvement a commencé — rarement avant.\n\nLa partie la plus difficile est presque toujours de démarrer. Une fois lancé, le reste devient plus facile.',

  'mindset.card.prod3.title':   'Le petit progrès compte aussi — vraiment.',
  'mindset.card.prod3.content':
    'Beaucoup de gens sous-estiment la puissance des petites actions régulières. L\'élan n\'est pas toujours spectaculaire ou intense.\n\nDe petits pas répétés chaque jour créent des résultats immenses sur le long terme. La constance se compose silencieusement.\n\nUn petit progrès empêche l\'immobilisme.',

  'mindset.card.prod4.title':   'Le focus crée des résultats plus vite — pas l\'agitation.',
  'mindset.card.prod4.content':
    'Faire plusieurs choses à la fois affaiblit la concentration, augmente les erreurs et épuise l\'énergie mentale.\n\nL\'élan s\'améliore quand tu te concentres sur une tâche significative à la fois. Une concentration profonde permet un travail de meilleure qualité en moins de temps.\n\nUne attention dispersée crée des résultats dispersés.',

  'mindset.card.prod5.title':   'L\'énergie compte autant que le temps.',
  'mindset.card.prod5.content':
    'Le temps seul ne détermine pas l\'élan — l\'énergie mentale et physique comptent profondément aussi. Un esprit épuisé peine à penser clairement et à maintenir la concentration.\n\nLe sommeil, la récupération et le repos influencent fortement ce qu\'on est capable de faire.\n\nUn élan durable dépend d\'une énergie durable.',

  'mindset.card.prod6.title':   'L\'élan se construit avec des systèmes — pas seulement de la volonté.',
  'mindset.card.prod6.content':
    'S\'appuyer entièrement sur la motivation crée de l\'inconstance. Les personnes qui avancent créent des systèmes, des routines et des structures qui soutiennent l\'action automatiquement.\n\nLes systèmes réduisent la prise de décision émotionnelle et la friction mentale.\n\nDe bonnes habitudes rendent la constance plus facile. La structure protège l\'élan.',

  'mindset.card.prod7.title':   'Fini vaut souvent mieux que parfait.',
  'mindset.card.prod7.content':
    'Le perfectionnisme retarde souvent le mouvement. Beaucoup de gens passent un temps excessif à peaufiner des détails pendant que l\'essentiel reste inachevé.\n\nL\'élan grandit quand tu priorises la complétion sur le polissage sans fin.\n\nUne action imparfaite crée généralement plus de résultats qu\'une hésitation parfaite.',

  'mindset.card.prod8.title':   'Ce que tu mets en priorité détermine ce qui avance vraiment.',
  'mindset.card.prod8.content':
    'Essayer de tout faire en même temps crée souvent une surcharge mentale et des résultats faibles. L\'élan s\'améliore quand tu identifies clairement ce qui compte le plus.\n\nLe travail important mérite ta meilleure énergie en premier.\n\nLa clarté des priorités réduit la confusion et renforce l\'exécution.',

  'mindset.card.prod9.title':   'La constance fait plus que l\'intensité.',
  'mindset.card.prod9.content':
    'Des éclats extrêmes d\'effort peuvent sembler productifs temporairement — mais ils sont rarement durables. L\'élan à long terme vient de routines régulières répétées dans le temps.\n\nDe petites actions quotidiennes créent une progression plus fiable que des sessions intenses occasionnelles.\n\nUn effort durable produit des résultats durables.',

  'mindset.card.prod10.title':  'Une fois lancé, la résistance diminue souvent d\'elle-même.',
  'mindset.card.prod10.content':
    'Le cerveau exagère souvent la difficulté de démarrer une tâche. Une fois le mouvement commencé, la résistance diminue généralement naturellement.\n\nL\'élan s\'améliore quand tu te concentres sur initier le mouvement plutôt que de négocier émotionnellement avec toi-même.\n\nLe mouvement crée de l\'engagement. L\'élan renforce le focus.',

  'mindset.card.prod11.title':  'Ce qui fait avancer, c\'est finir — pas seulement commencer.',
  'mindset.card.prod11.content':
    'Beaucoup de gens adorent planifier et commencer de nouvelles idées — mais peinent à compléter.\n\nUn vrai élan inclut de suivre jusqu\'à ce que les tâches soient finies. La complétion crée de la confiance et de la clarté mentale.\n\nLes tâches inachevées créent de l\'encombrement cognitif. Finir compte.',

  'mindset.card.prod12.title':  'La simplicité fait avancer mieux que la complexité.',
  'mindset.card.prod12.content':
    'Les systèmes trop compliqués créent souvent du stress et de la confusion inutiles. Les routines plus simples sont plus faciles à maintenir régulièrement.\n\nL\'élan augmente quand tu réduis la friction et te concentres sur l\'essentiel.\n\nLa complexité peut devenir une forme de procrastination. La simplicité améliore l\'exécution.',

  'mindset.card.prod13.title':  'Ton environnement influence aussi ce que tu accomplis.',
  'mindset.card.prod13.content':
    'Les espaces encombrés et les distractions constantes réduisent silencieusement la concentration et l\'élan. Un environnement calme et organisé soutient une pensée plus claire.\n\nLes personnes qui avancent bien créent intentionnellement des espaces qui encouragent le focus.\n\nL\'environnement influence le comportement plus que beaucoup ne le réalisent.',

  'mindset.card.prod14.title':  'Le repos fait partie de l\'élan — pas son opposé.',
  'mindset.card.prod14.content':
    'Un travail constant sans récupération affaiblit la créativité, la concentration et la résilience émotionnelle. Le repos n\'est pas de la paresse — c\'est une partie de la performance durable.\n\nLes personnes qui avancent comprennent que la récupération protège la constance sur le long terme.\n\nUn esprit reposé produit un travail de meilleure qualité.',

  'mindset.card.prod15.title':  'Dire non à certaines choses protège ce qui avance vraiment.',
  'mindset.card.prod15.content':
    'Dire oui à tout détruit la concentration et draine l\'énergie. L\'élan s\'améliore quand tu deviens plus sélectif avec ton temps et ton attention.\n\nToutes les demandes ne méritent pas un accès immédiat à toi.\n\nLes limites protègent les priorités. La protection crée le mouvement.',

  'mindset.card.prod16.title':  'La discipline maintient le mouvement quand la motivation fluctue.',
  'mindset.card.prod16.content':
    'La motivation peut démarrer l\'action — mais la discipline maintient la constance dans le temps. Les personnes qui avancent continuent à travailler même quand les émotions varient.\n\nLes routines réduisent la dépendance à l\'humeur.\n\nUne action régulière produit des résultats fiables.',

  'mindset.card.prod17.title':  'Sortir les tâches de la tête réduit la surcharge.',
  'mindset.card.prod17.content':
    'La surcharge vient souvent de porter mentalement trop de choses inachevées en même temps. L\'élan s\'améliore quand tu organises les tâches de façon externe plutôt que de tout stocker mentalement.\n\nÉcrire les choses crée de la clarté.\n\nDes systèmes clairs réduisent la pression mentale.',

  'mindset.card.prod18.title':  'L\'action crée la clarté — souvent mieux que la réflexion seule.',
  'mindset.card.prod18.content':
    'Beaucoup de gens attendent d\'être totalement certains avant d\'agir. Mais la clarté apparaît souvent à travers le mouvement — pas avant lui.\n\nL\'élan grandit quand tu arrêtes d\'attendre une certitude parfaite.\n\nApprentissage et direction se révèlent souvent en avançant.',

  'mindset.card.prod19.title':  'L\'état émotionnel influe aussi sur ce qu\'on arrive à faire.',
  'mindset.card.prod19.content':
    'Le stress, l\'anxiété et l\'épuisement émotionnel peuvent silencieusement détruire l\'élan. La régulation émotionnelle améliore la concentration et la prise de décision.\n\nLes personnes qui avancent apprennent à calmer le bruit mental plutôt que de laisser les émotions contrôler chaque action.\n\nLa stabilité émotionnelle soutient le mouvement.',

  'mindset.card.prod20.title':  'Choisir le mouvement plutôt que le confort immédiat — souvent ça suffit.',
  'mindset.card.prod20.content':
    'Défiler, procrastiner, éviter les tâches difficiles — ça semble réconfortant sur le moment mais crée du stress plus tard.\n\nL\'élan demande de choisir un progrès significatif plutôt que la gratification instantanée.\n\nUn inconfort temporaire crée souvent une récompense durable.',

  'mindset.card.prod21.title':  'Tes meilleures heures méritent d\'être réservées pour ce qui compte.',
  'mindset.card.prod21.content':
    'Chaque personne a des périodes de clarté mentale et de concentration plus fortes dans la journée. Les personnes qui avancent utilisent intentionnellement ces heures pour le travail important.\n\nUne planification stratégique améliore l\'efficacité.\n\nLa conscience de l\'énergie renforce ce qu\'on produit.',

  'mindset.card.prod22.title':  'La répétition renforce l\'élan — doucement, mais sûrement.',
  'mindset.card.prod22.content':
    'La répétition renforce les habitudes et réduit la résistance avec le temps. Plus tu pratiques le travail concentré, plus il devient facile de maintenir la constance.\n\nLe comportement productif finit par devenir automatique par la répétition.\n\nLes habitudes créent la stabilité.',

  'mindset.card.prod23.title':  'Moins de charge mentale crée plus de place pour avancer.',
  'mindset.card.prod23.content':
    'Trop de tâches, de décisions et de distractions surchargent le cerveau. L\'élan s\'améliore quand tu réduis l\'encombrement mental inutile et simplifies les priorités.\n\nUn esprit clair exécute plus efficacement.\n\nL\'organisation mentale protège la concentration.',

  'mindset.card.prod24.title':  'Avancer avec intention crée plus que de simplement réagir.',
  'mindset.card.prod24.content':
    'Une vie réactive crée souvent du stress et une attention dispersée. Les personnes qui avancent décident intentionnellement comment elles veulent utiliser leur temps et leur énergie.\n\nUn comportement intentionnel crée un meilleur alignement avec ce qui compte vraiment.\n\nLa conscience améliore la prise de décision.',

  'mindset.card.prod25.title':  'Le temps est la seule ressource qu\'on ne peut pas récupérer.',
  'mindset.card.prod25.content':
    'Le temps est l\'une des rares ressources qui ne peut pas être récupérée une fois perdue. Les personnes qui avancent traitent le temps avec conscience et intention.\n\nDe petits moments gaspillés répétés quotidiennement se composent en pertes majeures sur des années.\n\nUn usage conscient du temps crée un progrès significatif.',

  'mindset.card.prod26.title':  'Réduire les distractions améliore naturellement l\'élan.',
  'mindset.card.prod26.content':
    'Chaque distraction crée un temps de récupération caché pour le cerveau. Les interruptions constantes fragmentent la concentration et réduisent la qualité de ce qu\'on produit.\n\nLes personnes qui avancent minimisent intentionnellement les notifications et les interruptions inutiles.\n\nProtéger la concentration améliore l\'efficacité naturellement.',

  'mindset.card.prod27.title':  'Le progrès construit la confiance — même en petite quantité.',
  'mindset.card.prod27.content':
    'Chaque tâche terminée renforce la confiance en soi et crée une forme d\'énergie. L\'élan construit une confiance émotionnelle parce que l\'action prouve la capacité.\n\nUn progrès régulier améliore la confiance avec le temps.\n\nLe mouvement réduit l\'immobilisme et la résistance mentale.',

  'mindset.card.prod28.title':  'Un élan durable crée mieux qu\'un sprint épuisant.',
  'mindset.card.prod28.content':
    'La vraie progression n\'est pas une question d\'épuisement ou de pression constante. C\'est créer un mouvement significatif tout en maintenant la santé, l\'équilibre et le bien-être émotionnel.\n\nUn élan durable soutient la croissance à long terme plutôt que l\'épuisement à court terme.\n\nLe vrai progrès demande de l\'équilibre.',

  'mindset.card.prod29.title':  'Décider ce qui compte vraiment, c\'est déjà commencer.',
  'mindset.card.prod29.content':
    'Beaucoup de gens gaspillent de l\'énergie parce qu\'ils ne définissent jamais clairement ce qui est vraiment important.\n\nL\'élan s\'améliore quand tu arrêtes de traiter chaque tâche avec une urgence égale. Le travail important mérite une attention ciblée.\n\nDes priorités claires réduisent la confusion et renforcent l\'exécution.',

  'mindset.card.prod30.title':  'La surréflexion retarde souvent plus qu\'elle n\'aide.',
  'mindset.card.prod30.content':
    'Réfléchir profondément peut être utile — mais une analyse sans fin devient souvent de la procrastination déguisée.\n\nL\'élan grandit quand tu arrêtes d\'attendre une certitude parfaite avant de commencer. La plupart des réponses deviennent plus claires à travers l\'action.\n\nLe mouvement crée le progrès plus vite que la planification excessive.',

  'mindset.card.prod31.title':  'Un bon début crée de l\'élan pour le reste de la journée.',
  'mindset.card.prod31.content':
    'La façon dont tu commences ta journée influence ton énergie mentale pendant des heures. De petites actions tôt dans la journée créent un élan psychologique.\n\nUn bon début réduit la résistance plus tard.\n\nLes premières victoires renforcent la concentration et l\'envie de continuer.',

  'mindset.card.prod32.title':  'L\'esprit aussi a besoin de récupérer pour bien fonctionner.',
  'mindset.card.prod32.content':
    'La stimulation constante et le travail sans arrêt finissent par réduire la créativité et les performances cognitives. Les personnes qui avancent comprennent l\'importance de s\'éloigner périodiquement pour se réinitialiser mentalement.\n\nLa récupération restaure la clarté.\n\nUn cerveau reposé résout les problèmes plus efficacement.',

  'mindset.card.prod33.title':  'Attendre d\'avoir envie crée de l\'inconstance. Les routines, non.',
  'mindset.card.prod33.content':
    'La motivation fluctue naturellement tout au long de la vie. Attendre d\'avoir "envie" crée de l\'inconstance et du retard.\n\nLes personnes qui avancent s\'appuient davantage sur des routines et une structure que sur l\'inspiration émotionnelle.\n\nLes habitudes créent la stabilité quand les émotions changent.',

  'mindset.card.prod34.title':  'Les journées simples et régulières construisent plus que les grands élans.',
  'mindset.card.prod34.content':
    'Le progrès durable vient rarement d\'un moment extraordinaire. Il vient généralement d\'actions régulières répétées dans le temps.\n\nLes habitudes quotidiennes façonnent silencieusement les résultats.\n\nLa constance se compose en transformation significative.',

  'mindset.card.prod35.title':  'Pas toutes les tâches méritent ta meilleure énergie.',
  'mindset.card.prod35.content':
    'Les personnes qui avancent réservent intentionnellement leur meilleure concentration pour le travail significatif.\n\nLes distractions à faible valeur ne devraient pas consommer les heures de pic mental.\n\nUne allocation stratégique de l\'énergie améliore considérablement ce qu\'on accomplit.',

  'mindset.card.prod36.title':  'L\'encombrement — mental ou physique — ralentit l\'élan.',
  'mindset.card.prod36.content':
    'L\'encombrement mental et physique crée souvent une surcharge émotionnelle. Trop de tâches inachevées, de notifications et de distractions affaiblissent la concentration.\n\nLes personnes qui avancent simplifient leur environnement et leurs systèmes dès que possible.\n\nLa simplicité soutient une pensée plus claire.',

  'mindset.card.prod37.title':  'Respecter ses limites aussi, c\'est de l\'élan durable.',
  'mindset.card.prod37.content':
    'L\'épuisement n\'est pas un signe de réussite. Un élan durable demande de comprendre ses limites physiques, émotionnelles et mentales.\n\nSe reposer stratégiquement protège la performance à long terme.\n\nUne progression sans équilibre finit par se retourner contre soi.',

  'mindset.card.prod38.title':  'Commencer réduit souvent l\'anxiété mieux que de continuer à réfléchir.',
  'mindset.card.prod38.content':
    'Beaucoup de pensées stressantes diminuent une fois que le mouvement commence. L\'élan crée un soulagement émotionnel parce que l\'action remplace l\'incertitude par du progrès.\n\nL\'évitement augmente la tension mentale.\n\nLe mouvement réduit la surréflexion et la résistance émotionnelle.',

  'mindset.card.prod39.title':  'Commencer petit crée souvent plus d\'élan qu\'attendre d\'être prêt pour grand.',
  'mindset.card.prod39.content':
    'Les grandes tâches semblent souvent intimidantes parce que le cerveau se concentre sur l\'ensemble de la charge de travail en une fois. L\'élan s\'améliore quand tu réduis les objectifs en actions gérables.\n\nDe petits débuts créent de l\'élan.\n\nLa simplicité réduit la résistance.',

  'mindset.card.prod40.title':  'Des limites claires protègent l\'espace pour avancer.',
  'mindset.card.prod40.content':
    'Les interruptions constantes détruisent silencieusement la concentration et l\'efficacité. Les personnes qui avancent protègent leur attention des distractions, conversations et bruits numériques inutiles.\n\nLes limites aident à préserver l\'énergie mentale.\n\nLa concentration s\'épanouit dans des environnements protégés.',

  'mindset.card.prod41.title':  'Orienter l\'attention vers les solutions déplace l\'énergie vers l\'avant.',
  'mindset.card.prod41.content':
    'Se plaindre et se concentrer excessivement sur les problèmes draine l\'énergie mentale sans créer de progrès. Les personnes qui avancent s\'entraînent à déplacer leur attention vers des solutions actionnables.\n\nUne pensée orientée vers les solutions améliore l\'exécution.\n\nL\'énergie suit l\'attention.',

  'mindset.card.prod42.title':  'Se préparer à l\'avance réduit la friction au moment d\'agir.',
  'mindset.card.prod42.content':
    'Se préparer à l\'avance réduit la friction et la fatigue mentale pendant les tâches importantes. Les personnes qui avancent organisent leurs outils, horaires et priorités avant d\'en avoir besoin.\n\nLa préparation augmente l\'efficacité et réduit la fatigue décisionnelle.\n\nLa structure soutient l\'élan.',

  'mindset.card.prod43.title':  'Diriger son attention intentionnellement crée de meilleurs résultats.',
  'mindset.card.prod43.content':
    'Les distractions modernes se disputent constamment l\'espace mental. L\'élan dépend fortement de la capacité à diriger l\'attention intentionnellement.\n\nUne concentration dispersée affaiblit les résultats.\n\nUne attention contrôlée renforce ce qu\'on produit et la créativité.',

  'mindset.card.prod44.title':  'Lâcher la perfection débloque souvent le mouvement.',
  'mindset.card.prod44.content':
    'Le perfectionnisme crée souvent de l\'hésitation, du retard et du stress inutile. Les personnes qui avancent se concentrent sur le progrès et l\'amélioration plutôt que sur une exécution sans faute.\n\nUne action imparfaite crée de l\'apprentissage et de l\'élan.\n\nLe progrès compte plus que la perfection.',

  'mindset.card.prod45.title':  'Des habitudes régulières créent aussi de la stabilité émotionnelle.',
  'mindset.card.prod45.content':
    'Des routines régulières réduisent le chaos mental en créant de la prévisibilité et de la structure. Des habitudes organisées aident à réduire la surcharge et le stress.\n\nL\'élan améliore souvent le bien-être émotionnel parce qu\'il crée un sentiment de contrôle plus fort.\n\nLa stabilité soutient la performance.',

  'mindset.card.prod46.title':  'Rester sur une chose assez longtemps suffit parfois à tout débloquer.',
  'mindset.card.prod46.content':
    'Changer fréquemment de tâche draine l\'énergie cognitive et affaiblit la concentration. Les personnes qui avancent restent engagées avec une tâche importante assez longtemps pour construire de l\'élan.\n\nUne concentration profonde crée des résultats de meilleure qualité en moins de temps.\n\nLa continuité améliore l\'efficacité.',

  'mindset.card.prod47.title':  'Respecter le temps de récupération aussi protège l\'élan.',
  'mindset.card.prod47.content':
    'Les performances mentales déclinent quand le cerveau ne se repose jamais vraiment. La récupération est nécessaire pour la créativité, l\'équilibre émotionnel et la concentration.\n\nLes personnes qui avancent comprennent que le repos augmente l\'efficacité à long terme.\n\nUne performance durable demande de la restauration.',

  'mindset.card.prod48.title':  'La répétition régulière construit l\'élan — doucement.',
  'mindset.card.prod48.content':
    'Plus tu pratiques des comportements réguliers de façon constante, plus ils deviennent automatiques. Les habitudes réduisent la résistance émotionnelle avec le temps.\n\nL\'élan devient plus facile quand l\'action ne nécessite plus de négociation interne constante.\n\nLa répétition renforce la discipline.',

  'mindset.card.prod49.title':  'Se concentrer sur ce qu\'on peut contrôler libère de l\'énergie pour avancer.',
  'mindset.card.prod49.content':
    'S\'inquiéter excessivement des circonstances extérieures draine l\'énergie et affaiblit l\'exécution. L\'élan s\'améliore quand l\'attention reste concentrée sur des étapes actionnables dans ton contrôle.\n\nL\'action crée du mouvement. S\'obséder par des résultats incontrôlables crée de la paralysie.',

  'mindset.card.prod50.title':  'Parfois le progrès ne se voit pas encore — mais il se construit quand même.',
  'mindset.card.prod50.content':
    'De nombreux objectifs importants prennent du temps avant que le progrès visible n\'apparaisse. Les personnes qui avancent continuent à travailler régulièrement même quand les résultats semblent lents.\n\nLa patience renforce la persistance.\n\nLe progrès à long terme se développe souvent discrètement avant de devenir visible.',

  'mindset.card.prod51.title':  'Des routines fiables réduisent la charge de décision et protègent l\'élan.',
  'mindset.card.prod51.content':
    'Des routines solides réduisent la fatigue décisionnelle et augmentent la constance. Les personnes qui avancent créent des habitudes qui soutiennent l\'action automatiquement plutôt que de s\'appuyer entièrement sur la volonté.\n\nDes systèmes fiables créent des résultats fiables.\n\nLa structure simplifie l\'exécution.',

  'mindset.card.prod52.title':  'Se connaître soi-même aide aussi à mieux avancer.',
  'mindset.card.prod52.content':
    'Comprendre tes schémas d\'énergie, tes distractions et tes habitudes aide à améliorer significativement ce qu\'on accomplit. Les personnes qui avancent s\'observent honnêtement plutôt que d\'ignorer les comportements peu utiles.\n\nLa conscience crée de meilleures décisions.\n\nLa réflexion améliore l\'exécution.',

  'mindset.card.prod53.title':  'Les jours imparfaits font partie du chemin — pas des exceptions.',
  'mindset.card.prod53.content':
    'Tous les jours ne seront pas également concentrés ou efficaces. L\'élan n\'est pas détruit par des journées à faible énergie occasionnelles.\n\nLa constance compte plus que les fluctuations temporaires.\n\nLes personnes qui avancent continuent sans attendre la perfection.',

  'mindset.card.prod54.title':  'Éliminer ce qui importe peu libère ce qui importe vraiment.',
  'mindset.card.prod54.content':
    'Faire davantage n\'est pas toujours la réponse. L\'élan s\'améliore souvent quand tu élimines intentionnellement les tâches à faible valeur.\n\nLa priorisation protège l\'énergie pour le travail significatif.\n\nLa simplicité crée une concentration plus forte et de meilleurs résultats.',

  'mindset.card.prod55.title':  'Trop de décisions épuise l\'énergie — la simplicité la protège.',
  'mindset.card.prod55.content':
    'Trop de décisions drainent l\'énergie cognitive tout au long de la journée. Les personnes qui avancent simplifient les routines et réduisent les choix inutiles dès que possible.\n\nL\'énergie mentale devrait être réservée pour la réflexion importante.\n\nLa simplicité protège la concentration.',

  'mindset.card.prod56.title':  'Sans discipline, l\'élan devient émotionnellement dépendant.',
  'mindset.card.prod56.content':
    'Sans discipline, l\'élan devient inconstant et émotionnellement dépendant. Les personnes qui avancent continuent à agir même quand la motivation diminue.\n\nUne action régulière crée des résultats fiables.\n\nLa discipline protège l\'élan dans le temps.',

  'mindset.card.prod57.title':  'Penser à long terme aide à traverser les moments difficiles à court terme.',
  'mindset.card.prod57.content':
    'Le confort immédiat entre souvent en conflit avec le progrès à long terme. Les personnes qui avancent prennent des décisions qui soutiennent les objectifs futurs plutôt que de satisfaire uniquement les émotions présentes.\n\nUne pensée à long terme améliore la constance et la patience.\n\nLa vision renforce la discipline.',

  'mindset.card.prod58.title':  'Les tâches qu\'on évite créent souvent le plus de poids mental.',
  'mindset.card.prod58.content':
    'Les tâches qu\'on évite créent souvent le plus de stress mentalement. L\'élan s\'améliore considérablement quand tu traites les responsabilités importantes directement plutôt que de les retarder.\n\nL\'action réduit le poids mental.\n\nL\'évitement augmente l\'anxiété.',

  'mindset.card.prod59.title':  'Le vrai élan, c\'est une vie plus alignée — pas seulement plus productive.',
  'mindset.card.prod59.content':
    'La vraie progression n\'est pas une question de toujours faire davantage. C\'est d\'utiliser le temps, l\'énergie et l\'attention intentionnellement pour créer un mouvement significatif tout en maintenant l\'équilibre émotionnel et la santé.\n\nUn élan durable soutient à la fois l\'accomplissement et le bien-être.',

  'mindset.card.mom1.title':   'Même un petit pas, c\'est du mouvement.',
  'mindset.card.mom1.content':
    'L\'élan ne demande pas de grands sauts. Il demande des petits mouvements réguliers dans la même direction.\n\nLes jours où tu te sens le moins motivé sont souvent ceux où les petites actions comptent le plus. Se montrer discrètement, sans fanfare — c\'est comme ça que le progrès réel s\'accumule.\n\nUn pas en avant aujourd\'hui suffit.',

  'mindset.card.mom2.title':   'Commencer est souvent la partie la plus difficile.',
  'mindset.card.mom2.content':
    'La résistance est à son pic avant de commencer. Une fois le mouvement lancé, ça devient presque toujours plus facile.\n\nLe cerveau interprète l\'action comme de la sécurité et réduit progressivement la résistance. N\'attends pas que le moment semble juste — le bon moment arrive souvent après que tu as déjà commencé.\n\nL\'élan commence par une seule décision de bouger.',

  'mindset.card.mom3.title':   'L\'élan se reconstruit — il ne se récupère pas.',
  'mindset.card.mom3.content':
    'Après une pause, tu ne reviens pas à zéro. Tu reviens au début d\'un nouveau chemin, en portant tout ce que tu as déjà appris.\n\nUn élan reconstruit est souvent plus solide que l\'élan original — parce qu\'il vient avec la preuve que tu l\'as déjà fait.\n\nTu sais que tu en es capable. Cette connaissance n\'est pas effacée.',

  'mindset.card.mom4.title':   'Finir quelque chose crée son propre élan.',
  'mindset.card.mom4.content':
    'Chaque tâche terminée libère une petite récompense psychologique qui prépare le cerveau pour la suivante. C\'est pourquoi commencer n\'importe où — même avec la chose la plus simple — peut déclencher une cascade de mouvement.\n\nL\'élan est en partie biologique. Utilise-le intentionnellement.\n\nFinis une chose, puis laisse l\'énergie te porter vers la suivante.',

  'mindset.card.mom5.title':   'La constance, c\'est de l\'élan silencieux.',
  'mindset.card.mom5.content':
    'La forme d\'élan la plus puissante est invisible pour les autres. C\'est l\'acte quotidien de se montrer quand personne ne remarque, quand les résultats ne sont pas encore visibles, quand le doute est plus fort que la confiance.\n\nCette constance silencieuse — c\'est là que vit le vrai changement.\n\nTu n\'as pas besoin de percées dramatiques. Tu as besoin de continuer à bouger.',

  'mindset.card.mom6.title':   'L\'élan s\'accélère quand on le remarque.',
  'mindset.card.mom6.content':
    'Suivre les petites victoires, reconnaître les avancées, reconnaître la constance — ce n\'est pas de la vanité. C\'est du renforcement.\n\nLe cerveau construit de la motivation à partir des preuves de progrès. Rends ton élan visible, même juste pour toi.\n\nCe qu\'on mesure et célèbre a tendance à grandir.',

  'mindset.card.mom7.title':   'Agir avant de se sentir prêt — c\'est souvent ce qui débloque l\'élan.',
  'mindset.card.mom7.content':
    'Attendre de se sentir prêt est l\'ennemi principal de l\'élan. La préparation arrive rarement seule — elle est créée par l\'action.\n\nLe sentiment d\'être préparé vient après les premiers pas — pas avant. Les personnes qui avancent agissent avant la certitude, apprennent en mouvement, et ajustent en cours de route.\n\nCommence maintenant. Ajuste après.',

  'mindset.card.mom8.title':   'Chaque jour où tu te montres construit quelque chose d\'invisible pour l\'instant.',
  'mindset.card.mom8.content':
    'Chaque jour où tu te montres s\'ajoute à une base qui se compose — invisible à court terme, indéniable à long terme.\n\nLes personnes qui semblent faire de grands bonds en avant sont souvent celles qui ont investi des mois d\'effort calme et non reconnu.\n\nTa constance actuelle construit quelque chose que tu ne peux pas encore tout à fait voir.',

  // ── Mindset Rhythm cards — Français ─────────────────────────────────────────
  'mindset.card.m2.content':
    'Si quelque chose prend moins de deux minutes — fais-le maintenant. Pas de liste, pas d\'organisation. Juste un geste, et c\'est terminé.\n\nCe qui s\'accumule sans être fait crée un bruit de fond invisible. Des dizaines de petites choses en suspens qui pèsent sans qu\'on s\'en rende vraiment compte.\n\nCertaines fatigues mentales ne viennent pas des grandes tâches. Elles viennent des petites qui attendent depuis trop longtemps.',

  'mindset.card.m8.content':
    'Chaque geste que tu répètes dit quelque chose sur qui tu deviens. Pas sur qui tu es en ce moment — sur qui tu construis en silence.\n\nLa question n\'est pas "Qu\'est-ce que je dois faire ?" mais "Quel genre de personne est-ce que je veux être ?"\n\nQuand l\'habitude devient une partie de toi, elle n\'a plus besoin d\'être décidée tous les matins. Elle se pose d\'elle-même.',

  'mindset.card.m14.content':
    'Il y aura des jours où tu ne te montreras pas. C\'est inévitable — et ça ne définit pas ton chemin.\n\nCe qui compte, c\'est ce qui se passe après. Un seul jour manqué reste un accident. Deux jours d\'affilée, et l\'absence commence à ressembler à une habitude.\n\nLe reset ne demande pas la perfection. Il demande de revenir — sans dramatiser, sans se punir. Juste : aujourd\'hui, je recommence.',

  'mindset.card.m20.content':
    'Voir les choses clairement — sans les embellir, sans les noircir davantage. Et continuer quand même.\n\nC\'est une forme rare d\'équilibre : tenir la réalité d\'un côté et la confiance de l\'autre, sans que l\'un écrase l\'autre.\n\nNi l\'illusion, ni le désespoir. Juste une présence lucide, et l\'habitude de revenir malgré tout.',

  'mindset.card.disc1.content':
    'Le rythme n\'est pas une punition. C\'est une façon de tenir sa parole envers soi-même.\n\nChaque petite promesse tenue — même silencieuse, même invisible — construit quelque chose. Pas de la discipline au sens rigide du terme. Plutôt une confiance douce dans le fait qu\'on peut compter sur soi.\n\nCe que tu répètes devient peu à peu ce à quoi tu crois.',

  'mindset.card.disc2.content':
    'La motivation arrive et repart. Elle n\'est pas fiable — et ce n\'est pas grave.\n\nCe qui tient sur le long terme, ce n\'est pas l\'élan du premier jour. C\'est le geste qu\'on retrouve même quand l\'envie n\'est pas là.\n\nLe rythme ne demande pas d\'être inspirée. Il demande juste de revenir — doucement, sans pression, au niveau où on en est.',

  'mindset.card.disc3.content':
    'Les grandes transformations ne s\'annoncent pas. Elles s\'accumulent dans les moments ordinaires — quand tu te lèves à l\'heure que tu t\'étais fixée, quand tu finis ce que tu as commencé, quand tu fais un petit pas sans avoir envie.\n\nPas besoin d\'une décision fracassante. Juste une continuité tranquille.\n\nLes habitudes dessinent le futur en silence, sans qu\'on s\'en rende compte sur le moment.',

  'mindset.card.disc4.title':   'Le confort retarde souvent la croissance.',
  'mindset.card.disc4.content':
    'Le corps cherche ce qui est confortable. C\'est naturel, et ce n\'est pas un défaut.\n\nMais presque tout ce qui compte implique un moment d\'inconfort — pas de souffrance, juste un peu d\'effort là où il aurait été plus simple de s\'arrêter.\n\nChaque fois qu\'on choisit ce qui compte plutôt que ce qui est facile, quelque chose se renforce en soi. En douceur, sans que ça se voit.',

  'mindset.card.disc5.title':   'Le rythme crée de la liberté — pas des contraintes.',
  'mindset.card.disc5.content':
    'On imagine souvent que le rythme confine. Mais c\'est souvent le contraire : c\'est le chaos qui épuise.\n\nQuand la vie a une forme, les décisions se font plus facilement. Moins de débat intérieur. Moins d\'énergie gaspillée à naviguer l\'incertitude de chaque matin.\n\nLe rythme ne limite pas — il crée un espace où on peut se déposer.',

  'mindset.card.disc6.title':   'Agir avant de se sentir prête crée aussi un rythme.',
  'mindset.card.disc6.content':
    'On n\'attend pas toujours le bon moment — parce que le bon moment ne vient pas seul.\n\nLe rythme commence souvent par un geste petit, un peu hésitant. Pas d\'élan, pas d\'inspiration. Juste une décision tranquille de commencer quand même.\n\nUne fois que le mouvement est là, même doucement, la résistance diminue. C\'est presque toujours le premier pas qui coûte le plus.',

  'mindset.card.disc7.title':   'La continuité se forge aussi dans les jours difficiles.',
  'mindset.card.disc7.content':
    'Tenir le rythme quand tout va bien, c\'est facile. La vraie continuité apparaît dans les jours ternes — quand on est fatiguée, quand il n\'y a pas de clarté, quand s\'arrêter semblerait presque raisonnable.\n\nCe sont ces jours-là qui construisent quelque chose de durable.\n\nContinuer dans l\'inconfort change doucement ce qu\'on croit être capable de faire.',

  'mindset.card.disc8.title':   'Ce qu\'on fait aujourd\'hui construit qui on sera demain.',
  'mindset.card.disc8.content':
    'Ce qu\'on fait en silence aujourd\'hui construit qui on sera demain. Pas besoin de grands actes.\n\nLes petites habitudes répétées avec douceur laissent une empreinte. Chaque routine vote, jour après jour, pour la personne qu\'on est en train de devenir.\n\nC\'est souvent invisible sur le moment — et pourtant, c\'est là que ça se joue vraiment.',

  'mindset.card.disc9.title':   'Le rythme réduit la négociation intérieure.',
  'mindset.card.disc9.content':
    'Sans rituel ni structure, l\'esprit négocie constamment avec lui-même. "Je le ferai plus tard." "Cette fois, ça ne compte pas." "Demain sera différent."\n\nQuand un rythme est en place, ces conversations s\'espacent. Pas parce qu\'on se contrôle davantage — mais parce que le chemin est déjà tracé.\n\nMoins de débat intérieur. Plus de présence.',

  'mindset.card.disc10.title':  'L\'autocontrôle est une forme de pouvoir intérieur.',
  'mindset.card.disc10.content':
    'On vit entourées de choses conçues pour capter l\'attention — et pour la garder.\n\nDans ce contexte, savoir orienter son regard vers ce qu\'on a choisi est devenu quelque chose de précieux. Pas de la rigidité. Juste la capacité de rester là où ça compte.\n\nChaque fois qu\'on choisit avec calme plutôt que sur l\'impulsion, on se connaît un peu mieux.',

  'mindset.card.disc11.title':  'Le rythme, c\'est la répétition — pas l\'intensité.',
  'mindset.card.disc11.content':
    'Pas besoin d\'un effort énorme. Ce qui construit quelque chose de réel, c\'est la répétition tranquille — un peu chaque jour, sans s\'épuiser, sans se presser.\n\nLes grands changements se bâtissent presque toujours lentement et en silence.\n\nLa constance douce dépasse l\'intensité. Toujours.',

  'mindset.card.disc12.title':  'Le rythme protège ce qui compte vraiment.',
  'mindset.card.disc12.content':
    'Les intentions s\'effacent sans une structure qui les tient. Ce qu\'on ne nourrit pas régulièrement finit par se dissoudre.\n\nLa continuité transforme les envies en quelque chose de réel. Pas besoin d\'émotion permanente — il suffit de continuer à avancer, même lentement, dans la direction qu\'on a choisie.\n\nLe rythme protège ce qui compte.',

  'mindset.card.disc13.title':  'Ce qu\'on lâche maintenant construit aussi ce qu\'on reçoit plus tard.',
  'mindset.card.disc13.content':
    'Parfois, choisir ce qui compte vraiment implique de laisser passer quelque chose de plus facile.\n\nCet inconfort du moment n\'est pas une punition. C\'est une forme de soin — vers la version future de soi-même.\n\nCe qu\'on décide aujourd\'hui avec calme et clarté, on finit toujours par en être reconnaissante, même si ça ne se voit pas tout de suite.',

  'mindset.card.disc14.title':  'Ce qu\'on répète dit aussi qui on est.',
  'mindset.card.disc14.content':
    'Ce qu\'on répète enseigne à l\'esprit qui on est. Chaque fois qu\'on tient ce qu\'on s\'est dit — même pour quelque chose de petit — quelque chose se consolide.\n\nL\'identité ne se déclare pas. Elle se construit.\n\nGeste après geste, en silence, avec une continuité tranquille.',

  'mindset.card.disc15.title':  'Les excuses érodent doucement la confiance en soi.',
  'mindset.card.disc15.content':
    'Les excuses soulagent sur le moment. Elles justifient la pause, allègent la pression.\n\nMais avec le temps, elles érodent quelque chose de plus profond : la confiance qu\'on a en soi-même.\n\nLe rythme se renforce quand on commence à se reconnaître dans ses décisions — pas parce que les conditions sont parfaites, mais parce qu\'on se choisit.',

  'mindset.card.disc16.title':  'Agir depuis ses valeurs, pas seulement depuis ses émotions.',
  'mindset.card.disc16.content':
    'Les émotions fluctuent. C\'est inévitable — et ça n\'a pas besoin d\'être résolu.\n\nLe rythme ne dépend pas de se sentir bien. Il dépend de savoir ce qu\'on valorise. Agir depuis ce qui compte, et non depuis ce qu\'on ressent à l\'instant, c\'est une façon de se respecter profondément.\n\nLe calme intérieur permet de continuer même quand les émotions ne suivent pas.',

  'mindset.card.disc17.title':  'Le rythme construit la confiance silencieusement.',
  'mindset.card.disc17.content':
    'La confiance ne vient pas seulement des réussites. Elle vient de la continuité.\n\nDe chaque petite promesse qu\'on s\'est faite — et qu\'on a tenue. Avec le temps, l\'esprit commence à savoir qu\'il peut compter sur soi.\n\nCette sécurité intérieure ne se voit pas. Mais elle se ressent dans tout ce qu\'on fait.',

  'mindset.card.disc18.title':  'La structure allège l\'esprit.',
  'mindset.card.disc18.content':
    'Le désordre fatigue. Pas parce qu\'on est fragile — mais parce que l\'esprit dépense beaucoup d\'énergie à naviguer le chaos.\n\nQuand les routines ont une forme, cette énergie se libère. Moins de petites décisions à prendre, plus de présence disponible pour ce qui compte vraiment.\n\nLa simplicité soutient. L\'ordre aussi prend soin.',

  'mindset.card.disc19.title':  'Le rythme, c\'est aussi choisir ce qui compte le plus.',
  'mindset.card.disc19.content':
    'Chaque geste dans la continuité est un choix — entre ce qui compte et ce qui distrait simplement.\n\nQuand les valeurs sont claires, ce choix devient plus naturel. Pas besoin d\'une volonté de fer. Juste une clarté sur ce qu\'on veut que sa vie contienne.\n\nLa clarté soutient la constance.',

  'mindset.card.disc20.title':  'L\'attente peut aussi être une forme de pouvoir.',
  'mindset.card.disc20.content':
    'Tout n\'a pas besoin d\'arriver tout de suite. Il existe un bien-être qui ne vient qu\'avec le temps — quand on regarde en arrière et qu\'on voit qu\'on a tenu, qu\'on a attendu, qu\'on a fait confiance au processus.\n\nLa capacité de différer une gratification est l\'un des fruits les plus silencieux de la constance.\n\nElle se cultive doucement.',

  'mindset.card.disc21.title':  'La continuité a besoin de limites qui la protègent.',
  'mindset.card.disc21.content':
    'On ne peut pas être disponible pour tout et encore tenir son rythme.\n\nLa continuité a besoin de limites — pas comme des murs, mais comme une forme de soin. Protéger son attention, c\'est protéger ce qui compte. Dire non à certaines choses, c\'est dire oui à ce qu\'on valorise.\n\nÇa aussi, c\'est du rythme.',

  'mindset.card.disc22.title':  'Les choix difficiles construisent quelque chose en soi.',
  'mindset.card.disc22.content':
    'Les choix faciles bâtissent rarement quelque chose de durable. Ce sont les moments difficiles — quand on pourrait s\'arrêter mais qu\'on continue, quand on pourrait éviter mais qu\'on fait face — qui forment la profondeur.\n\nPas besoin de chercher la difficulté. Il suffit de ne pas en fuir lorsqu\'elle apparaît.',

  'mindset.card.disc23.title':  'Le rythme crée de la stabilité quand tout bouge.',
  'mindset.card.disc23.content':
    'Il y aura des moments où tout autour semble instable. Dans ces moments-là, les petits rythmes — les choses qu\'on fait régulièrement — deviennent une ancre.\n\nIls ne résolvent pas ce qui se passe à l\'extérieur. Mais ils créent une stabilité à l\'intérieur.\n\nLe rythme est un refuge tranquille, même dans les jours compliqués.',

  'mindset.card.disc24.title':  'Chaque habitude construit ou fragilise quelque chose.',
  'mindset.card.disc24.content':
    'Ce qu\'on répète chaque jour n\'est pas neutre. Chaque habitude construit quelque chose — vers là où on veut aller, ou dans une autre direction.\n\nPas besoin d\'être parfaite. Juste un peu consciente.\n\nDe petits ajustements dans ce qu\'on répète peuvent changer beaucoup sur la durée.',

  'mindset.card.disc25.title':  'Finir ce qu\'on commence forme aussi le caractère.',
  'mindset.card.disc25.content':
    'Commencer, c\'est facile. Le rythme est dans ce qui suit — quand l\'élan du début se calme et qu\'on continue quand même.\n\nFinir ce qu\'on a commencé est une façon de se respecter. De se faire confiance.\n\nChaque chose qu\'on referme bien enseigne qu\'on peut compter sur soi-même jusqu\'au bout.',

  'mindset.card.disc26.title':  'Le repos fait partie de la vraie continuité.',
  'mindset.card.disc26.content':
    'Le repos n\'est pas l\'opposé du rythme — il en fait partie.\n\nSe tenir dans la durée demande aussi de faire des pauses, de récupérer, de dormir. Les personnes qui maintiennent une vraie continuité ne sont pas celles qui ne s\'arrêtent jamais — ce sont celles qui savent quand s\'arrêter pour mieux continuer.\n\nPrendre soin, c\'est aussi du rythme.',

  'mindset.card.disc27.title':  'La continuité protège aussi du regret.',
  'mindset.card.disc27.content':
    'Beaucoup des regrets les plus profonds viennent de ne pas avoir agi quand on pouvait.\n\nLa continuité tranquille — faire ce qu\'on a à faire, même quand ce n\'est pas facile — protège la paix future.\n\nCe qu\'on fait aujourd\'hui avec soin, la version future de soi-même le remarquera, en silence.',

  'mindset.card.disc28.title':  'On devient ce qu\'on pratique régulièrement.',
  'mindset.card.disc28.content':
    'L\'esprit apprend de ce qu\'on répète. Si on pratique la présence, on devient peu à peu plus présente. Si on pratique la continuité, elle finit par se déposer naturellement.\n\nOn n\'est pas un caractère figé. On est ce qu\'on choisit de pratiquer, jour après jour.\n\nLa répétition façonne qui on est.',

  'mindset.card.disc29.title':  'Se tenir parole à soi-même reconstruit la confiance.',
  'mindset.card.disc29.content':
    'Chaque promesse non tenue à soi-même laisse une trace subtile. Avec le temps, la confiance en soi s\'effrite.\n\nLe rythme commence quand on commence à se tenir parole — dans de petites choses, sans pression, avec douceur.\n\nChaque promesse gardée rapproche un peu plus de la confiance réelle.',

  'mindset.card.disc30.title':  'Ce qu\'on fait aujourd\'hui crée un avenir différent.',
  'mindset.card.disc30.content':
    'La plupart des gens sous-estiment l\'impact de ce qu\'ils font chaque jour sur leur futur.\n\nLes petites décisions répétées — avec constance, sans dramatisme — déterminent en silence les opportunités, la confiance, la santé, la stabilité.\n\nPas besoin de tout contrôler. Il suffit de continuer à avancer dans la direction qu\'on a choisie.',

  'mindset.card.disc31.title':  'Le rythme, c\'est continuer quand même.',
  'mindset.card.disc31.content':
    'Il y aura des jours sans envie. Des jours de fatigue, de distraction, sans clarté.\n\nLe rythme, c\'est ce qui permet de continuer quand même — pas parce qu\'on doit être parfaite, mais parce qu\'on a appris à se soutenir même quand ce n\'est pas facile.\n\nCeux qui transforment leur vie, c\'est souvent ceux qui continuent quand il aurait été plus simple de s\'arrêter.',

  'mindset.card.disc32.title':  'Ce qu\'on tolère en silence façonne aussi ce qu\'on devient.',
  'mindset.card.disc32.content':
    'Le rythme commence avec ce qu\'on décide d\'accepter. Ce qu\'on tolère de façon répétée finit par devenir notre normal.\n\nQuand on élève ce qu\'on attend de soi — pas par pression, mais par respect envers soi-même — les actions commencent à changer naturellement.\n\nLes standards qu\'on se fixe en silence déterminent la vie qu\'on construit.',

  'mindset.card.disc33.title':  'Le rythme reconnecte à ce qui compte vraiment.',
  'mindset.card.disc33.content':
    'Les impulsions passent vite. Les conséquences, elles, durent parfois.\n\nLe rythme aide à marquer une pause avant d\'agir — à se reconnecter à ce qu\'on veut vraiment, au-delà de ce qu\'on ressent à l\'instant.\n\nDans les moments difficiles, se souvenir de ses priorités profondes crée une clarté qui tient.',

  'mindset.card.disc34.title':  'La force intérieure se construit dans la répétition.',
  'mindset.card.disc34.content':
    'La force mentale ne vient pas des grands efforts ponctuels. Elle vient des petits moments répétés — chaque fois qu\'on continue quand on préférerait s\'arrêter, chaque fois qu\'on tient malgré l\'inconfort.\n\nÀ chaque action difficile complétée, la résilience grandit un peu.\n\nLa constance entraîne l\'esprit à se soutenir avec calme.',

  'mindset.card.disc35.title':  'L\'ordre prend aussi soin.',
  'mindset.card.disc35.content':
    'L\'absence de structure crée un bruit intérieur constant. Le rythme apporte de l\'ordre — pas de la rigidité, mais un espace où l\'esprit peut se déposer.\n\nQuand les routines ont une forme, on dépense moins d\'énergie à récupérer du chaos.\n\nLa simplicité soutient. L\'ordre aussi prend soin.',

  'mindset.card.disc36.title':  'Le progrès n\'attend pas les conditions parfaites.',
  'mindset.card.disc36.content':
    'Les excuses ressemblent à un soulagement sur le moment. Mais avec le temps, elles laissent un poids.\n\nLe rythme ne demande pas des conditions parfaites — il demande qu\'on se charge de ce qu\'on peut faire maintenant.\n\nLe progrès ne dépend pas que tout soit bien en place. Il dépend qu\'on continue à choisir d\'avancer.',

  'mindset.card.disc37.title':  'Les grandes transformations se construisent lentement.',
  'mindset.card.disc37.content':
    'Les grandes transformations ne surgissent presque jamais d\'un seul moment.\n\nElles viennent de milliers de petites décisions répétées avec constance. La constance est rarement spectaculaire — elle est silencieuse, invisible à l\'instant.\n\nMais chaque petite action laisse une empreinte. Avec le temps, la différence devient immense.',

  'mindset.card.disc38.title':  'La constance bat la perfection — toujours.',
  'mindset.card.disc38.content':
    'Beaucoup abandonnent parce qu\'elles exigent d\'elles-mêmes d\'être parfaites.\n\nLa constance, ce n\'est pas ça. C\'est revenir — vite, sans drame, sans se punir. Un faux pas ne brise pas le rythme si on choisit de le reprendre.\n\nLa cohérence sur la durée crée des changements réels. La perfection, rarement.',

  'mindset.card.disc39.title':  'Parfois le progrès ne se voit pas, mais il continue.',
  'mindset.card.disc39.content':
    'La croissance réelle arrive presque toujours plus lentement qu\'on ne l\'espère.\n\nLe rythme signifie continuer à se montrer, même avant que les résultats soient visibles. L\'impatience fait abandonner des habitudes précieuses beaucoup trop tôt.\n\nLa patience fait partie de la constance. En silence, le progrès invisible continue d\'avancer.',

  'mindset.card.disc40.title':  'Ton énergie mérite aussi d\'être prise en soin.',
  'mindset.card.disc40.content':
    'Les habitudes sans structure dépensent de l\'énergie de façons qu\'on remarque rarement. Les nuits tardives, les distractions constantes, la procrastination — avec le temps, cette usure s\'accumule.\n\nLe rythme crée des patterns plus sains qui protègent l\'énergie mentale, émotionnelle, physique.\n\nPrendre soin de ses habitudes, c\'est aussi prendre soin de soi.',

  'mindset.card.disc41.title':  'Ce qui est difficile s\'allège avec la pratique.',
  'mindset.card.disc41.content':
    'Ce qui semblait impossible peut, avec le temps, devenir naturel. Pas parce qu\'on a changé radicalement — mais parce que la répétition réduit la résistance intérieure.\n\nChaque fois qu\'on fait quelque chose de difficile, la tentative suivante demande un peu moins d\'énergie.\n\nLe rythme transforme le compliqué en quotidien.',

  'mindset.card.disc42.title':  'Se guider soi-même est une forme de soin.',
  'mindset.card.disc42.content':
    'Se guider soi-même, c\'est orienter ses actions depuis ce qu\'on valorise — pas depuis l\'impulsion du moment.\n\nLa continuité renforce cette capacité peu à peu. Pas de contrôle rigide — plutôt apprendre à se diriger avec calme.\n\nAvec le temps, on devient plus fiable pour soi-même. Et ça change tout.',

  'mindset.card.disc43.title':  'Le rythme se construit en silence, sans témoins.',
  'mindset.card.disc43.content':
    'Le caractère se construit dans ce qu\'on fait quand personne ne regarde.\n\nLes choix tranquilles, répétés en silence, sont ceux qui façonnent le plus profondément qui on est. Les petites actions privées — celles que personne ne célèbre — sont souvent celles qui déterminent les résultats que le monde voit après.\n\nTon rythme invisible construit ton futur visible.',

  'mindset.card.disc44.title':  'Tout ce qui plaît maintenant ne prend pas forcément soin de demain.',
  'mindset.card.disc44.content':
    'Beaucoup de décisions impulsives semblent bonnes sur le moment — mais laissent quelque chose de plus lourd après.\n\nLa constance apprend à marquer une pause avant d\'agir : à se demander comment ça se sentira demain, pas seulement maintenant.\n\nLa retenue sage n\'est pas une privation — c\'est une façon de prendre soin de soi vers l\'avenir.',

  'mindset.card.disc45.title':  'Le rythme crée de la stabilité, même dans les jours difficiles.',
  'mindset.card.disc45.content':
    'Quand les actions dépendent entièrement de comment on se sent, la vie devient émotionnellement imprévisible.\n\nLe rythme crée une base stable qui ne fluctue pas avec l\'humeur. Avoir des routines qui tiennent — même quand les émotions changent — réduit le chaos intérieur.\n\nLa calme dans les décisions quotidiennes construit de la résilience.',

  'mindset.card.disc46.title':  'Plus on se soutient, moins on a besoin d\'être poussée.',
  'mindset.card.disc46.content':
    'À mesure qu\'on développe son propre rythme, on dépend de moins en moins que quelqu\'un nous rappelle, nous pousse ou nous valide.\n\nOn commence à se mouvoir depuis l\'intérieur — depuis ses propres raisons. Cette indépendance intérieure est l\'une des formes les plus silencieuses et puissantes de croissance.\n\nOn n\'attend plus que quelqu\'un vienne nous sauver. On se soutient soi-même.',

  'mindset.card.disc47.title':  'Même dans les jours de faible énergie, un petit pas maintient le rythme.',
  'mindset.card.disc47.content':
    'L\'élan est fragile. Quelques jours d\'inconsistance peuvent fragiliser ce qui a mis des semaines à se construire.\n\nLe rythme protège cet élan — surtout dans les jours de faible énergie, quand s\'arrêter semblerait presque justifié.\n\nMême un petit effort maintient le mouvement vivant. La constance prend soin du progrès.',

  'mindset.card.disc48.title':  'L\'inconfort fait aussi partie du chemin.',
  'mindset.card.disc48.content':
    'La tendance naturelle est d\'éviter l\'inconfort. Mais le rythme apprend à rester dans ces moments avec calme — sans fuir immédiatement.\n\nCroître implique presque toujours un peu d\'ennui, de répétition, d\'incertitude ou d\'effort. Apprendre à le tolérer doucement renforce l\'équilibre émotionnel.',

  'mindset.card.disc49.title':  'Ton environnement fait aussi partie de ton rythme.',
  'mindset.card.disc49.content':
    'La volonté seule suffit rarement. L\'environnement influence profondément les habitudes.\n\nQuand l\'espace dans lequel on vit soutient ses objectifs — plutôt que de constamment tenter — la continuité devient plus naturelle.\n\nConcevoir son environnement avec soin, c\'est aussi une façon de prendre soin de soi. Le rythme ne vit pas seulement à l\'intérieur.',

  'mindset.card.disc50.title':  'La constance te rend fiable, d\'abord pour toi-même.',
  'mindset.card.disc50.content':
    'Les personnes qui tiennent leur parole construisent de la confiance — d\'abord en elles-mêmes, ensuite autour d\'elles.\n\nLa constance, répétée dans le temps, rend fiable. Quand on peut compter sur soi-même, la confiance grandit naturellement.\n\nLa continuité crée du respect — vers l\'extérieur et vers l\'intérieur.',

  'mindset.card.disc51.title':  'La vraie croissance se passe au milieu, pas seulement au début.',
  'mindset.card.disc51.content':
    'Commencer est important. Mais le rythme est aussi dans la continuité quand l\'enthousiasme initial se calme.\n\nBeaucoup perdent la constance juste dans la phase du milieu — quand il n\'y a plus de nouveauté, mais pas encore de résultats clairs. C\'est là que la vraie croissance se passe.\n\nLa persévérance tranquille crée les résultats qui transforment.',

  'mindset.card.disc52.title':  'Chaque action d\'aujourd\'hui est un cadeau pour ton soi de demain.',
  'mindset.card.disc52.content':
    'Chaque action cohérente d\'aujourd\'hui est un cadeau pour la version future de soi-même.\n\nLes habitudes saines, la responsabilité, l\'apprentissage continu — tout crée des bénéfices qu\'on ne voit peut-être pas tout de suite.\n\nLe rythme est une forme de soin à long terme. La stabilité de demain se construit avec ce qu\'on fait aujourd\'hui.',

  'mindset.card.disc53.title':  'Agir dégage aussi l\'esprit.',
  'mindset.card.disc53.content':
    'La procrastination et l\'inconsistance créent un bruit intérieur constant — tâches en suspens, culpabilité, tension diffuse.\n\nLa constance réduit ce bruit en créant de l\'action et de la clôture. Plus on gère ses responsabilités avec intention, plus l\'esprit se calme.\n\nL\'ordre dégage. La clarté aussi prend soin.',

  'mindset.card.disc54.title':  'Le rythme ne protège pas des faux pas — il raccourcit le retour.',
  'mindset.card.disc54.content':
    'Tenir le rythme ne protège pas des mauvais jours ni des faux pas.\n\nLa différence est dans ce qui se passe après. Qui a de la constance revient plus vite — sans drame, sans abandon total.\n\nLa résilience n\'est pas de ne jamais tomber. C\'est de raccourcir la distance entre le faux pas et le retour. Le rythme survit aux revers.',

  'mindset.card.disc55.title':  'Ton identité se construit dans les décisions de chaque jour.',
  'mindset.card.disc55.content':
    'Chaque action renforce une version de soi-même. La constance aide à choisir, encore et encore, les comportements qui s\'alignent avec qui on veut devenir.\n\nL\'identité n\'arrive pas d\'un coup — elle se construit en silence, par la répétition.\n\nLe caractère de demain prend forme dans les petites décisions d\'aujourd\'hui.',

  'mindset.card.disc56.title':  'Avec le temps, le rythme coule seul.',
  'mindset.card.disc56.content':
    'Quand les comportements positifs deviennent automatiques, les maintenir demande de moins en moins d\'énergie.\n\nLes habitudes réduisent le besoin de décider constamment. L\'objectif n\'est pas de lutter pour toujours — c\'est de construire des patterns qui soutiennent la constance naturellement.\n\nAvec le temps, le rythme coule seul.',

  'mindset.card.disc57.title':  'Le rythme se compose silencieusement — et ça finit par tout changer.',
  'mindset.card.disc57.content':
    'La plupart des gestes de constance semblent petits sur le moment. Une heure concentrée. Un choix sain. Une conversation difficile.\n\nMais avec les mois et les années, ces actions s\'accumulent en une transformation réelle. Le rythme crée rarement des résultats immédiats. Son vrai pouvoir apparaît lentement, en silence, avec le temps.',

  // ── Profile remaining ──────────────────────────────────────────────────────────
  'profile.journey.eyebrow':       'TON CHEMIN DE RETOUR',
  'profile.journey.change':        'Modifier',
  'profile.journey.choose':        'Choisir',
  'profile.journey.fallback':      'Ton Voyage',
  'profile.greet.hi':               'Bonjour, {{name}}.',
  'profile.greet.becoming':         'Ton moment.',
  'profile.greet.memberSince':      'Ici depuis {{month}} {{year}}',
  'profile.greet.dayOne':           'Jour 1 de ton voyage reset.',
  'profile.greet.namePlaceholder':  'Ton prénom',
  'profile.footer.p1': 'Chaque reset change la trajectoire.',
  'profile.footer.p2': 'La petite constance devient identité.',
  'profile.footer.p3': 'L\'élan commence doucement.',
  'profile.footer.p4': 'La croissance se construit en douceur.',
  'profile.footer.p5': 'Le progrès silencieux compte aussi.',
  'profile.section.transformation': 'MA TRANSFORMATION',
  'profile.section.journey':        'MON VOYAGE',
  'profile.section.intentions':     'MES INTENTIONS',
  'profile.streak.daysInRow':       'retours calmes',
  'profile.streak.personalBest':    'Rythme le plus long',
  'profile.stat.resetsDone':        'resets effectués',
  'profile.stat.bestStreak':        'rythme le plus long',
  'profile.stat.firstReturn':       'premier retour',
  'profile.stat.thisWeek':          'cette semaine',
  'profile.milestone.dayReached':   'Jour {{n}} atteint',
  'profile.milestone.unlocked':     'Étape débloquée',
  'profile.milestone.firstReset':   'Jour 1 — Premier reset',
  'profile.milestone.beginToday':   'Un reset commence le voyage.',
  'profile.milestone.dayAhead':     'Jour {{n}} à venir',
  'profile.milestone.youReThere':   'Tu y es. Complète le reset du jour.',
  'profile.milestone.oneDayAway':   'Plus qu\'un jour. Continue.',
  'profile.milestone.daysAway':     '{{n}} jours restants.',

  // ── Day / Month names ──────────────────────────────────────────────────────────
  'dayname.sunday':    'Dimanche', 'dayname.monday':   'Lundi',  'dayname.tuesday': 'Mardi',
  'dayname.wednesday': 'Mercredi', 'dayname.thursday': 'Jeudi',
  'dayname.friday':    'Vendredi', 'dayname.saturday': 'Samedi',

  // ── Habits (new keys) ────────────────────────────────────────────────────────
  'habits.alldone':        'Toutes les habitudes complétées.',
  'habits.pct.completed':  'complété aujourd\'hui',

  // ── Emotional Onboarding ─────────────────────────────────────────────────────
  'emotional.skip':          'Passer',
  'emotional.cta.continue':  'Continuer',
  'emotional.cta.seeReset':  'Voir mon Reset',
  'emotional.step':          '{{i}} SUR {{total}}',
  'emotional.q1.question':   'Qu\'est-ce qui pèse le plus en ce moment ?',
  'emotional.q1.micro':      'Il n\'y a pas de bonne réponse ici.',
  'emotional.q1.opt1':       'Surcharge mentale',
  'emotional.q1.opt2':       'Anxiété',
  'emotional.q1.opt3':       'Épuisement émotionnel',
  'emotional.q1.opt4':       'Manque de rythme',
  'emotional.q1.opt5':       'Difficulté à continuer',
  'emotional.q1.opt6':       'Manque de focus',
  'emotional.q1.opt7':       'Sentiment de déconnexion',
  'emotional.q2.question':   'Qu\'est-ce qui te manque en ce moment ?',
  'emotional.q2.micro':      'Sélectionne ce qui résonne le plus.',
  'emotional.q2.opt1':       'Calme',
  'emotional.q2.opt2':       'Clarté',
  'emotional.q2.opt3':       'Confiance',
  'emotional.q2.opt4':       'Constance',
  'emotional.q2.opt5':       'Présence',
  'emotional.q2.opt6':       'Équilibre émotionnel',
  'emotional.q3.question':   'Comment aimerais-tu te sentir à nouveau ?',
  'emotional.q3.micro':      'C\'est là où nous reviendrons ensemble, doucement.',
  'emotional.q3.opt1':       'Plus léger',
  'emotional.q3.opt2':       'Plus calme',
  'emotional.q3.opt3':       'Plus lent',
  'emotional.q3.opt4':       'Plus clair',
  'emotional.q3.opt5':       'Plus ancré',
  'emotional.q3.opt6':       'Plus équilibré émotionnellement',
  'emotional.q4.question':   'Qu\'est-ce qui t\'éloigne de toi-même le plus souvent ?',
  'emotional.q4.micro':      'Sans jugement ici.',
  'emotional.q4.opt1':       'Trop d\'écrans',
  'emotional.q4.opt2':       'Surcharge de travail',
  'emotional.q4.opt3':       'Anxiété',
  'emotional.q4.opt4':       'Surréflexion',
  'emotional.q4.opt5':       'Fatigue émotionnelle',
  'emotional.q4.opt6':       'Manque de routine',

  // ── Weekly Recap ─────────────────────────────────────────────────────────────
  'recap.loading':            'Préparation de ton récapitulatif...',
  'recap.eyebrow':            'RÉCAPITULATIF HEBDOMADAIRE',
  'recap.section.focus':      'CETTE SEMAINE EN FOCUS',
  'recap.section.highlights': 'MOMENTS FORTS DE LA SEMAINE',
  'recap.section.habits':     'RYTHME DES HABITUDES',
  'recap.section.reflection': 'UNE QUESTION POUR TOI',
  'recap.cel.outstanding':    'Exceptionnel',
  'recap.cel.strong':         'Belle semaine',
  'recap.cel.good':           'Bonne semaine',
  'recap.habit.automatic':    'Tes habitudes deviennent automatiques.',
  'recap.habit.growing':      'La constance grandit.',
  'recap.habit.small':        'Les petits pas tracent le chemin.',
  'recap.cta.ready':          'Prêt pour la semaine prochaine',
  'recap.cta.close':          'Fermer',
  'recap.week.label':         'Semaine',

  // ── Paywall screen — full copy ───────────────────────────────────────────────
  'paywall.loading':               'Traitement en cours...',
  'paywall.legal.full':            'Facturé via l\'App Store ou Google Play.',
  'paywall.v1.heading':            'Cet espace est le tien\npour continuer.',
  'paywall.v1.body':               'Un espace plus profond pour les moments intenses,\nplus lourds, ou simplement plus difficiles à traverser.',
  'paywall.v1.cta':                '⭐  Essayer 7 jours gratuits',
  'paywall.v1.ctaSub':             'Puis 49,99 €/an',
  'paywall.v1.cancel':             'Annulable à tout moment',
  'paywall.v1.maybe':              'Peut-être plus tard',
  'paywall.v1.footer':             'Sans engagement. Annule avant la fin de l\'essai.',
  'paywall.v2.eyebrow':            'JOUR 3',
  'paywall.v2.heading':            'Tu es revenu\ntrois fois.',
  'paywall.v2.sub':                'Il y a plus ici, quand tu le voudras.',
  'paywall.v2.tagline':            'Un esprit plus calme. Une routine plus douce.\nUn endroit où revenir chaque jour.',
  'paywall.v2.why1':               'Tu n\'as pas besoin de plus de pression.\nTu as besoin d\'un endroit où revenir.',
  'paywall.v2.why2':               'Cet espace devient plus calme à chaque retour.',
  'paywall.v2.cta':                'Continuer ton Reset →',
  'paywall.v2.ctaSub':             'Annulable à tout moment. Sans pression. Ton rythme reste le tien.',
  'paywall.feat.mindLoud':         'esprit agité',
  'paywall.feat.emoTired':         'épuisement émotionnel',
  'paywall.feat.tryingAgain':      'recommencer',
  'paywall.feat.needCalm':         'besoin de calme',
  'paywall.feat.startingOver':     'repartir de zéro',
  'paywall.feat.hardWeek':         'semaine difficile',
  'paywall.t1.quote':              'J\'ouvre ça avant chaque réunion stressante.',
  'paywall.t1.name':               'Sarah, 34 ans',
  'paywall.t2.quote':              'C\'est la seule appli que je n\'ai pas supprimée depuis un an.',
  'paywall.t2.name':               'Marcus, 41 ans',
  'paywall.t3.quote':              'On a enfin l\'impression d\'être vraiment compris.',
  'paywall.t3.name':               'Priya, 29 ans',
  'paywall.plan.badge':            'LE PLUS CHOISI · 7 jours gratuits',
  'paywall.plan.annual.name':      'Annuel — 49,99 €/an',
  'paywall.plan.annual.note':      'Pour une année de soutien profond.',
  'paywall.plan.monthly.name':     'Mensuel — 8,99 €/mois',
  'paywall.plan.monthly.note':     'Un soutien doux, mois après mois.',
  'paywall.v3.eyebrow':            'TON ESPACE EST TOUJOURS LÀ.',
  'paywall.v3.heading':            'Il y a plus ici, si tu le veux.',
  'paywall.v3.sub':                'Pour les moments où la journée\ndemande plus que prévu.',
  'paywall.v3.b1.title':           'Un espace quotidien pour revenir à toi',
  'paywall.v3.b1.sub':             'Une réflexion. Un souffle. Un reset.',
  'paywall.v3.b2.title':           'Clarté émotionnelle, un thème à la fois',
  'paywall.v3.b2.sub':             'Focus, calme, courage, repos — ce que la journée demande.',
  'paywall.v3.b3.title':           'Une bibliothèque mentalité sélectionnée',
  'paywall.v3.b3.sub':             'Des réflexions qui te rejoignent là où tu es.',
  'paywall.v3.annual.name':        'Annuel',
  'paywall.v3.annual.free':        '7 jours gratuits',
  'paywall.v3.annual.price':       '49,99 €/an',
  'paywall.v3.annual.priceSub':    '  ·  4,16 €/mois',
  'paywall.v3.annual.note':        'Moins qu\'un café. Chaque mois.',
  'paywall.v3.monthly.name':       'Mensuel',
  'paywall.v3.monthly.price':      '8,99 €/mois',
  'paywall.v3.monthly.note':       'Essaie, annule à tout moment.',
  'paywall.v3.cta.free':           'Commencer ma semaine gratuite →',
  'paywall.v3.cta.today':          'Commencer aujourd\'hui →',
  'paywall.v3.ctaSub':             'Sans engagement. Annule dans les Paramètres à tout moment.',
  'paywall.v3.whatLabel':          'CE QUI DEVIENT PLUS CALME',
  'paywall.v3.what1':              'Tu cesses de te battre contre toi-même chaque matin.',
  'paywall.v3.what2':              'La culpabilité de ne pas en faire assez s\'apaise.',
  'paywall.v3.what3':              'Tu commences à te faire confiance à nouveau, doucement.',
  'paywall.alert.trial.title':     'Ton essai de 7 jours a commencé.',
  'paywall.alert.trial.msg':       'Ton accès complet est débloqué. Annule à tout moment avant la fin de l\'essai.',
  'paywall.alert.monthly.title':   'Bienvenue dans l\'Accès Complet.',
  'paywall.alert.monthly.msg':     'Tout est désormais débloqué. Un jour à la fois.',
  'paywall.theme.transformation.1': 'Ressentir le progrès à nouveau — un reset à la fois.',
  'paywall.theme.transformation.2': 'Bâtir la constance sans accablement ni pression.',
  'paywall.theme.transformation.3': 'Ton futur toi se construit dans la répétition quotidienne silencieuse.',
  'paywall.theme.transformation.4': 'Un reset peut changer toute ta direction.',
  'paywall.theme.future_self.1':    'Dans 7 jours, l\'élan commence.',
  'paywall.theme.future_self.2':    'Dans 30 jours, la constance devient naturelle.',
  'paywall.theme.future_self.3':    'Dans 90 jours, ton identité se transforme.',
  'paywall.theme.future_self.4':    'La version que tu veux devenir se construit ici.',
  'paywall.theme.calm.1':          'Constance sans pression. Changement sans force.',
  'paywall.theme.calm.2':          'Tu n\'as pas besoin d\'être parfait. Tu as juste besoin de revenir.',
  'paywall.theme.calm.3':          'Un reset quotidien doux change tout, lentement.',
  'paywall.theme.calm.4':          'La discipline calme est la plus puissante.',
  'paywall.theme.trial.1':         'Vis le voyage Daily Reset complet, gratuitement.',
  'paywall.theme.trial.2':         'Resets émotionnels personnalisés — chaque jour.',
  'paywall.theme.trial.3':         'Soutien au retour, rituels, étapes — tout inclus.',
  'paywall.theme.trial.4':         'Sans pression. Annule à tout moment avant la fin de l\'essai.',
  'paywall.lock.ritual.label':     'Rituel Reset',
  'paywall.lock.ritual.sub':       'Ton ancrage émotionnel de 2 min',
  'paywall.lock.recap.label':      'Récapitulatif hebdomadaire',
  'paywall.lock.recap.sub':        'Vois comment chaque semaine t\'a façonné',
  'paywall.lock.milestone.label':  'Cérémonies d\'étapes',
  'paywall.lock.milestone.sub':    'Moments émotionnellement significatifs',
  'paywall.lock.profile.label':    'Profil Émotionnel',
  'paywall.lock.profile.sub':      'Ton voyage personnalisé',
  'paywall.lock.future.label':     'Système Futur Toi',
  'paywall.lock.future.sub':       'Suis ta transformation',
  'paywall.lock.comeback.label':   'Psychologie du Retour',
  'paywall.lock.comeback.sub':     'Revenir sans jugement',
  'paywall.ben.0.label': 'Programme Reset 365 Jours',
  'paywall.ben.0.sub':   'Une année complète de transformation quotidienne guidée',
  'paywall.ben.1.label': 'Rituel Reset (Signature)',
  'paywall.ben.1.sub':   'Ton ancrage émotionnel quotidien de 2 minutes',
  'paywall.ben.2.label': 'Personnalisation émotionnelle',
  'paywall.ben.2.sub':   'L\'appli s\'adapte à ce dont tu as besoin',
  'paywall.ben.3.label': 'Actions et réflexions quotidiennes',
  'paywall.ben.3.sub':   'Des étapes intentionnelles chaque jour',
  'paywall.ben.4.label': 'Architecture des habitudes',
  'paywall.ben.4.sub':   'Construis des routines qui durent vraiment',
  'paywall.ben.5.label': 'Tableau de bord de transformation',
  'paywall.ben.5.sub':   'Observe ton identité changer avec le temps',
  'paywall.ben.6.label': 'Minuteries Focus et Détox',
  'paywall.ben.6.sub':   'Retrouve ton attention et ta sérénité',
  'paywall.ben.7.label': 'Cérémonies d\'étapes',
  'paywall.ben.7.sub':   'Moments personnels chargés de sens',
  'paywall.ben.8.label': 'Bibliothèque Mentalité complète',
  'paywall.ben.8.sub':   '48+ insights premium, débloqués avec le temps',
  'paywall.ben.9.label': 'Soutien au retour',
  'paywall.ben.9.sub':   'Jamais pénalisé pour les semaines difficiles',
  'paywall.identity.title': 'Les petits resets quotidiens deviennent identité avec le temps.',
  'paywall.identity.sub':   'Conçu pour la constance, pas la pression.',
  'paywall.path.title':  'TON CHEMIN DEVANT TOI',
  'paywall.path.sub.future':  'Vois-toi dans 90 jours.',
  'paywall.path.sub.default': 'Imagine où tu seras après 30 resets.',
  'paywall.plan.title':         'CHOISIS TON OFFRE',
  'paywall.included':           'TOUT INCLUS',
  'paywall.hero.eyebrow':       'TON VOYAGE COMPLET T\'ATTEND',
  'paywall.manifesto.eyebrow':  'PETITS CHANGEMENTS. GRANDS IMPACTS.',
  'paywall.manifesto.headline': 'La transformation se construit en silence.',
  'paywall.manifesto.body':     "La plupart attendent le bon moment.\nLe vrai changement vient de revenir chaque jour.",
  'paywall.manifesto.b1':       'Une attention plus claire avec le temps',
  'paywall.manifesto.b2':       'Des routines quotidiennes plus solides',
  'paywall.manifesto.b3':       'Moins de bruit émotionnel',
  'paywall.manifesto.closing':  'Construit doucement. Répété quotidiennement.',
  'paywall.what.changes':       'CE QUI CHANGE',
  'paywall.unlocked':           'DÉBLOQUÉ AVEC PREMIUM',

  // ── Focus Timer ─────────────────────────────────────────────────────────────
  'timer.focus.title':   'Minuterie Focus',
  'timer.detox.title':   'Détox Numérique',
  'timer.idle':          'Prêt quand tu l\'es',
  'timer.focus.running': 'Reste concentré.',
  'timer.detox.running': 'Reste présent.',
  'timer.focus.done':    'Focus accompli. Tu es resté maître de toi.',
  'timer.detox.done':    'Tu es resté maître de toi.',
  'timer.again':         'Recommencer',

  // ── Progress — narrative card ─────────────────────────────────────────────────
  'progress.narrative.moments.pre':        '',
  'progress.narrative.moments.post.one':   ' moment, rien qu\'à toi.',
  'progress.narrative.moments.post.other': ' moments, rien qu\'à toi.',
  'progress.narrative.streak.pre':         '',
  'progress.narrative.streak.post.one':    ' jour de continuité.',
  'progress.narrative.streak.post.other':  ' jours de continuité.',

  // ── Progress — burnout recovery phases ───────────────────────────────────────
  'progress.phase.beginner.label':         'REVENIR À SOI',
  'progress.phase.beginner.desc':          'Retrouver sans culpabilité',
  'progress.phase.beginner.days':          'Jours 1–7',
  'progress.phase.rebuilding.label':       'RECONSTRUIRE LA CONFIANCE',
  'progress.phase.rebuilding.desc':        'Les petites actions reconstruisent la confiance en soi',
  'progress.phase.rebuilding.days':        'Jours 8–21',
  'progress.phase.momentum.label':         'TROUVER SON RYTHME',
  'progress.phase.momentum.desc':          'La constance devient identité',
  'progress.phase.momentum.days':          'Jours 22–59',
  'progress.phase.identity.label':         'DEVENIR SOI-MÊME',
  'progress.phase.identity.desc':          'L\'identité se transforme par la répétition',
  'progress.phase.identity.days':          'Jours 60–89',
  'progress.phase.transformation.label':   'PLEINE RENAISSANCE',
  'progress.phase.transformation.desc':    'Tu t\'es reconstruit',
  'progress.phase.transformation.days':    'Jours 90+',
  'progress.phase.comingNext':             'À VENIR',

  // ── Progress — journey group ──────────────────────────────────────────────────
  'progress.journey.here':                 'Tu es encore là.',
  'progress.journey.returnsCount':         'Chaque retour compte.',
  'progress.journey.nextMilestone':        'Prochaine étape — Jour {{n}}',
  'progress.week.unwritten':               'La semaine est encore à écrire.',
  'progress.week.allDays':                 'Tu t\'es montré chaque jour cette semaine.',
  'progress.week.oneReturn':               'Un retour calme cette semaine.',
  'progress.week.nReturns':               'Tu es revenu {{n}} fois cette semaine.',

  // ── Progress — YOUR JOURNEY card ─────────────────────────────────────────────
  'progress.card.daysIn':                  'jours de voyage',
  'progress.card.resetsDone':              'resets effectués',

  // ── Progress — milestone chapter previews ─────────────────────────────────────
  'progress.chapter.week1':                'La première semaine. Quelque chose a pris racine.',
  'progress.chapter.week2':                'Deux semaines. Le rythme commence à tenir.',
  'progress.chapter.month1':               'Un mois. Les retours sont devenus continuité.',

  // ── Progress screen ──────────────────────────────────────────────────────────
  'progress.ring.journeyStarted': 'voyage commencé',
  'progress.ring.ofYourPath':     'de ton chemin',
  'progress.ring.todayRhythm':    "Rythme\nd'aujourd'hui",
  'progress.ring.weekPattern':    "Tendance\nde la semaine",
  'progress.ring.youreHere':      'Jour {{day}} — tu es là.',
  'progress.ring.daysAhead':      '{{days}} jour{{s}} à venir',
  'progress.ring.tomorrowMilestone': 'Demain tu atteins le Jour {{n}}.',
  'progress.ring.daysToMilestone':   '{{days}} jours jusqu\'à ta prochaine étape — Jour {{n}}.',
  'progress.section.journey':        'TON VOYAGE',
  'progress.section.commitment':     'TON ENGAGEMENT',
  'progress.section.showingUp':      'TA PRÉSENCE',
  'progress.section.storyNumbers':   'TON HISTOIRE EN CHIFFRES',
  'progress.section.chapters':       'TES CHAPITRES',
  'progress.section.pathTitle':      'CHEMIN DE TRANSFORMATION',
  'progress.section.yourStory':      'TON HISTOIRE',
  'progress.streak.choosingYou':     'retours calmes',
  'progress.streak.personalBest':    'Jamais aussi régulier',
  'progress.streak.yourBest':        'Ton meilleur : {{n}} jours',
  'progress.cal.title':              'Les 7 derniers jours',
  'progress.cal.sevenForSeven':      'Sept sur sept. Une semaine complète.',
  'progress.cal.showedUpN':          'Tu t\'es montré {{n}} fois cette semaine.',
  'progress.cal.daysShowedUp':       '{{n}} jours de présence. Garde le fil.',
  'progress.cal.weekOpen':           'La semaine est encore ouverte. Un reset peut tout changer.',
  'progress.cal.returnedN':          'Tu es revenu {{n}} fois. Ça compte.',
  'progress.trend.label':            'Constance sur 14 jours',
  'progress.evidence.sectionTitle':  'PREUVES DE TON RETOUR',
  'progress.evidence.card1Title':    'Tu es revenu',
  'progress.evidence.card1Sub':      'moments complétés',
  'progress.evidence.card2Title':    'Ton rythme',
  'progress.evidence.card2Sub':      'retours calmes',
  'progress.evidence.card3Title':    'Toujours là',
  'progress.evidence.card3Sub':      'fois cette semaine',
  'progress.evidence.card4Title':    'Plus longue série',
  'progress.evidence.card4Sub':      'meilleur retour',
  'progress.stat.consecutiveDays':   'Jours de retour',
  'progress.stat.choosingYourself':  'Constance silencieuse.',
  'progress.stat.bestStreak':        'Retour le plus long',
  'progress.stat.bestStreakSub':     'Ton rythme le plus solide.',
  'progress.stat.totalResets':       'Moments complétés',
  'progress.stat.totalResetsSub':    'Petits resets. Vraies preuves.',
  'progress.stat.thisWeek':          'Rythme de cette semaine',
  'progress.stat.daysShowedUp':      'Fois où tu t\'es montré.',
  'progress.milestone.firstAwaits':  'Ton premier chapitre est doucement à venir.',
  'progress.milestone.firstSub':     'Un chapitre commence au Jour 3.',
  'progress.roadmap.7days':          '7 jours',
  'progress.roadmap.1month':         '1 mois',
  'progress.roadmap.2months':        '2 mois',
  'progress.roadmap.3months':        '3 mois',
  'progress.roadmap.6months':        '6 mois',
  'progress.roadmap.momentum':       'Élan',
  'progress.roadmap.clarity':        'Clarté',
  'progress.roadmap.identity':       'Identité',
  'progress.roadmap.rhythm':         'Rythme',
  'progress.roadmap.transformation': 'Transformation',
  'progress.story.weeklyRecaps':     'Récapitulatifs hebdomadaires',
  'progress.story.weeklySubEmpty':   'Ton voyage hebdomadaire, reflété.',
  'progress.story.weeklySubCount':   '{{n}} semaine{{s}} de ton voyage',
  'progress.story.reflection':       'Journal de réflexion',
  'progress.story.reflectionSubEmpty': 'Ton compagnon émotionnel silencieux.',
  'progress.story.reflectionSubCount': '{{n}} réflexion{{s}} écrite{{s}}',

  // ── Progress v2 ───────────────────────────────────────────────────────────────
  'progress2.hero.title':                  'Quelque chose en toi continue de revenir.',
  'progress2.hero.subtitle':               'Doucement, quelque chose a changé.',
  'progress2.hero.variation.0':            'Tu as continué, même les jours plus légers.',
  'progress2.hero.variation.1':            'Ton retour est devenu plus doux avec le temps.',
  'progress2.hero.variation.2':            'Chaque visite a laissé une petite trace.',
  'progress2.hero.variation.3':            'Tu as ralenti sans disparaître.',
  'progress2.hero.variation.4':            'Ton rythme a commencé à réapparaître.',
  'progress2.hero.variation.5':            'Ces retours deviennent de plus en plus les tiens.',
  'progress2.rhythm.title':               'Rythme hebdomadaire',
  'progress2.rhythm.label':               'présence accumulée',
  'progress2.rhythm.description':         'Basé sur les jours où tu es revenu, as écrit quelque chose, ou complété un reset.',
  'progress2.rhythm.emptyTitle':          'Ta présence est encore en train de se former.',
  'progress2.rhythm.emptyDescription':    'Reviens quelques jours et cet espace commencera à refléter tes tendances.',
  'progress2.rhythm.returnMain':          'Tu es revenu.',
  'progress2.rhythm.returnLabel':         'présence enregistrée',
  'progress2.rhythm.tagline':             'Chaque retour laisse une trace.',
  'progress2.signals.title':              'Signes réels',
  'progress2.signals.return.title':       'Tu es revenu',
  'progress2.signals.return.text':        'Tu as continué à revenir.',
  'progress2.signals.presence.title':     'Plus de présence',
  'progress2.signals.presence.text':      'Tu as ralenti.',
  'progress2.signals.stability.title':    'Une constance calme',
  'progress2.signals.stability.text':     'La constance a recommencé à apparaître.',
  'progress2.patterns.title':             'Tendances remarquées',
  'progress2.patterns.empty':             'Continue à enregistrer de petits moments. Tes tendances apparaîtront avec le temps.',
  'progress2.patterns.1':                 'Tu as tendance à revenir quand le reset semble léger.',
  'progress2.patterns.2':                 'Ton progrès apparaît plus dans la répétition que dans l\'intensité.',
  'progress2.patterns.3':                 'Les journées simples t\'ont aidé à rester.',
  'progress2.patterns.4':                 'Les petites pauses semblent alléger le poids de la journée.',
  'progress2.patterns.5':                 'Tu es plus présent quand tu ralentis.',
  'progress2.patterns.6':                 'Ton retour se produit plus facilement sans pression.',
  'progress2.patterns.7':                 'La constance commence à apparaître dans de petits mouvements.',
  'progress2.patterns.8':                 'Tu sembles mieux répondre à la douceur qu\'à l\'exigence.',
  'progress2.patterns.9':                 'Tu avances plus facilement quand la journée ne requiert pas la perfection.',
  'progress2.patterns.10':                'Tu crées de l\'espace avant de réagir.',
  'progress2.timeline.title':             'Ligne de reconstruction',
  'progress2.timeline.day1.title':        'Tu as commencé.',
  'progress2.timeline.day1':              "Quelque chose a changé suffisamment pour t'amener ici.",
  'progress2.timeline.day7.title':        'Premiers signes.',
  'progress2.timeline.day7':              'Un rythme a commencé à apparaître.',
  'progress2.timeline.day14.title':       "Moins d'effort.",
  'progress2.timeline.day14':             'Revenir a commencé à paraître plus naturel.',
  'progress2.timeline.day30.title':       'Une base.',
  'progress2.timeline.day30':             "Tu as construit quelque chose qui continue d'exister entre les jours.",
  'progress2.timeline.day60.title':       'Plus de stabilité.',
  'progress2.timeline.day60':             'Ton progrès a cessé de dépendre des journées parfaites.',
  'progress2.timeline.day90.title':       'Présence construite.',
  'progress2.timeline.day90':             'Tu as créé une relation plus constante avec toi-même.',
  'progress2.summary.title':              'Signes en chemin',
  'progress2.summary.resets':             'retours remarqués',
  'progress2.summary.journal':            'moments enregistrés',
  'progress2.summary.returnDays':         'présence aujourd\'hui',
  'progress2.summary.weeks':              'meilleure série',
  'progress2.summary.resets.one':         'retour remarqué',
  'progress2.summary.journal.one':        'moment enregistré',
  'progress2.summary.returnDays.one':     'présence aujourd\'hui',
  'progress2.milestone.7':               'Ton retour a commencé à créer du rythme.',
  'progress2.milestone.14':              'Tu as commencé à revenir sans te forcer.',
  'progress2.milestone.30':              'Ton rythme a commencé à te faire confiance.',
  'progress2.milestone.60':              'Revenir a commencé à sembler naturel.',
  'progress2.milestone.90':              'Tu ne recommences plus de zéro.',

  // ── Private space card ────────────────────────────────────────────────────────
  'progress2.space.eyebrow':             'TON ESPACE PRIVÉ',
  'progress2.space.title':               'Un endroit calme pour libérer ce qui pèse.',
  'progress2.space.placeholder':         'Tu peux laisser ça ici.',
  'progress2.space.saved':               'Enregistré.',
  'progress2.space.action.keep':         'Garder',
  'progress2.space.action.release':      'Lâcher',
  'progress2.space.feedback.kept':       'Ton moment a été gardé.',
  'progress2.space.feedback.return':     'Tu peux revenir quand tu veux.',
  'progress2.space.feedback.released':   'Tu n\'as plus besoin de porter ça.',
  'progress2.space.prompt.0':            'Qu\'est-ce qui a épuisé ton énergie aujourd\'hui ?',
  'progress2.space.prompt.1':            'Qu\'est-ce que tu ne veux pas emmener dans demain ?',
  'progress2.space.prompt.2':            'Qu\'est-ce que ton esprit essaie de traiter ?',
  'progress2.space.prompt.3':            'Quel moment a apporté un peu de calme aujourd\'hui ?',
  'progress2.space.prompt.4':            'Qu\'est-ce que tu aimerais lâcher ?',
  'progress2.space.prompt.5':            'Qu\'est-ce que ton épuisement essaie de te dire ?',
  'progress2.space.prompt.6':            'Qu\'est-ce qui t\'a manqué aujourd\'hui ?',
  'progress2.space.prompt.7':            'Qu\'est-ce qui est devenu trop lourd à porter en silence ?',
  'progress2.space.prompt.8':            'Quelle partie de toi mérite plus de douceur ?',
  'progress2.space.prompt.9':            'Qu\'est-ce que tu évites de ressentir ?',
  'progress2.space.prompt.10':           'Quelle partie de toi a besoin de plus de patience aujourd\'hui ?',
  'progress2.space.prompt.11':           'Qu\'est-ce que tu n\'as pas dit aujourd\'hui ?',
  'progress2.space.prompt.12':           'Qu\'est-ce qui rend le repos difficile ?',
  'progress2.space.prompt.13':           'Quelle pensée est restée avec toi toute la journée ?',

  // ── Weekly recap card ─────────────────────────────────────────────────────────
  'progress2.weekrecap.eyebrow':         'SEMAINE EN REVUE',
  'progress2.weekrecap.subtitle':        'Un regard calme sur ta semaine.',
  'progress2.weekrecap.seeAll':          'Voir l\'historique',
  'progress2.weekrecap.n0':              'Cette semaine prend encore forme.',
  'progress2.weekrecap.n1':              'Tu es revenu une fois. Ça compte déjà.',
  'progress2.weekrecap.n2':              'Deux retours cette semaine. Un rythme commence.',
  'progress2.weekrecap.n3':              'Trois retours. Quelque chose commence à se stabiliser.',
  'progress2.weekrecap.n4':              'Tu t\'es montré quatre fois cette semaine.',
  'progress2.weekrecap.n5':              'Cinq retours. Ta routine trouve sa forme.',
  'progress2.weekrecap.n6':              'Six jours. Une constance calme qui reconstruit.',
  'progress2.weekrecap.n7':              'Sept jours. Une semaine complète de présence.',
  'progress2.weekrecap.streakN':         '{{n}} jours de suite. Tu continues de revenir.',

  // ── Quiet reflections card ────────────────────────────────────────────────────
  'progress2.quietref.eyebrow':          'RÉFLEXIONS SILENCIEUSES',
  'progress2.quietref.subtitle':         'Tes archives émotionnelles.',
  'progress2.quietref.seeAll':           'Tout voir',
  'progress2.quietref.empty':            'Tes réflexions apparaîtront ici.',
  'progress2.quietref.today':            'Aujourd\'hui',
  'progress2.quietref.yesterday':        'Hier',
  'progress2.quietref.daysAgo':          'il y a {{n}} jours',
  'progress2.quietref.countOne':         'Tes moments gardés ici.',
  'progress2.quietref.countMany':        'Tes moments gardés ici.',
  'progress2.history.weekrecap.title':   'Récapitulatif hebdomadaire',
  'progress2.history.weekrecap.sub.many': 'Tu es revenu plus souvent que tu ne l\'as remarqué.',
  'progress2.history.weekrecap.sub.some': 'Les jours calmes ont aussi compté.',

  // ── Days & months ────────────────────────────────────────────────────────────
  'day.sun': 'Dim', 'day.mon': 'Lun', 'day.tue': 'Mar', 'day.wed': 'Mer',
  'day.thu': 'Jeu', 'day.fri': 'Ven', 'day.sat': 'Sam',
  'month.jan': 'Jan',  'month.feb': 'Fév',  'month.mar': 'Mar',  'month.apr': 'Avr',
  'month.may': 'Mai',  'month.jun': 'Juin', 'month.jul': 'Juil', 'month.aug': 'Août',
  'month.sep': 'Sep',  'month.oct': 'Oct',  'month.nov': 'Nov',  'month.dec': 'Déc',

  // ── Return experience ────────────────────────────────────────────────────────
  'return.heading':       'Tu es de retour.',
  'return.30plus.body':   'Tu étais absent un moment.\n\nRien ici n\'a gardé le score.\nRien ici n\'a besoin d\'explication.\n\nTu es revenu.\nC\'est tout ce qui compte.',
  'return.30plus.extra':  'Les longues absences ne sont pas des échecs.\nElles en font partie.',
  'return.7plus.body':    'Tu étais absent un moment.\n\nRien ici n\'a gardé le score.\nTu ne dois pas d\'explication.\n\nTu es revenu.\nC\'est suffisant.',
  'return.3plus.body':    'Pas de rattrapage.\nJuste aujourd\'hui.',
  'return.cta':           'Commencer aujourd\'hui',

  // ── Welcome back experience ───────────────────────────────────────────────────
  'wb.normal.0':      'Heureux de te revoir.',
  'wb.normal.1':      'Commençons doucement.',
  'wb.normal.2':      'Une petite pause pour toi.',
  'wb.normal.3':      'Un moment au calme.',
  'wb.normal.4':      'Tu es là.',
  'wb.returning.0':   'Tu peux toujours recommencer.',
  'wb.returning.1':   "Sans pression. Juste aujourd'hui.",
  'wb.returning.2':   'Rien à rattraper.',
  'wb.returning.3':   'Reviens doucement à toi.',
  'wb.returning.4':   'Toujours là. Toujours à toi.',
  'wb.active.0':      'Un progrès discret.',
  'wb.active.1':      'Tu continues à être là pour toi.',
  'wb.active.2':      'Les petits pas comptent aussi.',
  'wb.active.3':      'La constance peut être douce.',
  'wb.active.4':      'Un rythme plus apaisé.',
  'wb.late_night.0':  'Un moment calme avant le repos.',
  'wb.late_night.1':  'Tu es encore là.',
  'wb.late_night.2':  "C'est suffisant.",
  'wb.late_night.3':  'Laisse la journée se poser.',
  'wb.late_night.4':  "Le silence aussi, c'est quelque chose.",

  ...psFr,
};

// ─── German ───────────────────────────────────────────────────────────────────
const de: TranslationMap = {
  // ── Tabs ────────────────────────────────────────────────────────────────────
  'tabs.today':    'Heute',
  'tabs.habits':   'Gewohnheiten',
  'tabs.progress': 'Fortschritt',
  'tabs.mindset':  'Mindset',
  'tabs.profile':  'Profil',

  // ── Today ───────────────────────────────────────────────────────────────────
  'greeting.morning':   'Guten Morgen. Du bist da. Das zählt schon.',
  'greeting.afternoon': 'Guten Nachmittag. Ein Reset kann die Richtung deines Tages verändern.',
  'greeting.evening':   'Guten Abend. Selbst ein stiller Tag verdient einen Reset.',
  'today.headline':     'Neu beginnen\nvon hier aus.',
  'today.subheadline':  'Eine Aktion heute reicht.',
  'today.checklist.title':          'TAGESLISTE',
  'today.checklist.morning':        'Morgenroutine',
  'today.checklist.action':         'Heutige Aktion',
  'today.checklist.deepwork':       'Tiefes Arbeiten',
  'today.checklist.nodistractions': 'Keine Ablenkungen',
  'today.checklist.evening':        'Abendreflexion',
  'today.complete':     'Heutigen Reset abschließen',
  'today.focus':        'Fokus-Timer',
  'today.focus.short':  'Fokus',
  'today.detox':        'Digitaler Detox',
  'future.self.eyebrow':    'DEIN ZUKÜNFTIGES ICH',
  'future.self.question':   'EINE FRAGE FÜR DICH',
  'future.self.prompt.sub': 'Nimm dir einen Moment. Es gibt keine richtige Antwort.',
  'today.card.action':  'Heutige Aktion',
  'today.card.why':     'Warum es wichtig ist',
  'today.card.reflect': 'Reflexion',
  'today.badge.today':  'HEUTE',
  'today.day':          'Tag {{day}}',
  'today.done.title':   'Reset abgeschlossen.',
  'today.done.sub':     'Du warst heute dabei.',
  'today.done.day':     'Tag {{day}} erledigt',
  'today.locked.title': 'Tag {{day}} — noch nicht verfügbar',
  'today.locked.sub':   'Schalte deine vollständige 365-Tage-Reise frei.',
  'today.locked.cta':   'Vollen Zugang freischalten →',

  // ── Habits ──────────────────────────────────────────────────────────────────
  'habits.eyebrow':      'HEUTE',
  'habits.title':        'Gewohnheiten',
  'habits.subtitle':     'Sanft aufbauen',
  'habits.locked.title': 'Gewohnheiten werden an Tag 7 verfügbar',
  'habits.locked.sub':   'Im Moment zählt nur dein täglicher Reset. Erscheine 7 Tage lang — deine Gewohnheiten warten auf dich.',
  'habits.locked.days':  'Noch {{n}} Tage bis Gewohnheiten verfügbar sind',
  'habits.pct.label':    'heute abgeschlossen',
  'habits.section':      'TÄGLICHE GEWOHNHEITEN',
  'habit.morning':        'Morgenroutine',
  'habit.workout':        'Training',
  'habit.deepwork':       'Tiefes Arbeiten',
  'habit.read':           '20 Seiten lesen',
  'habit.water':          'Wasser trinken',
  'habit.nodistractions': 'Keine Ablenkungen',
  'habit.sleep':          'Früher schlafen',
  'habit.plan':           'Morgen planen',
  'habit.gratitude':      'Dankbarkeit',
  'habit.detox':          'Digitaler Detox',

  // ── Progress ────────────────────────────────────────────────────────────────
  'progress.eyebrow':        'DEINE REISE',
  'progress.title':          'Fortschritt',
  'progress.subtitle':       'Deine Beständigkeit, visualisiert',
  'progress.card.label':     'Reisefortschritt',
  'progress.of365':          'von 365 Tagen',
  'progress.today':          'Heute',
  'progress.week':           'Diese Woche',
  'stat.streak':             'Serie',
  'stat.best':               'Bestes',
  'stat.done':               'Erledigt',
  'stat.weekly':             'Wöchentlich',
  'stat.monthly':            'Monatlich',
  'stat.day':                'Tag',
  'progress.journey.title':  '365-Tage-Reise',
  'progress.journey.day':    'Tag {{day}} von 365',
  'progress.journey.rem':    'Noch {{days}} Tage',

  // ── Mindset ─────────────────────────────────────────────────────────────────
  'mindset.eyebrow':    'BIBLIOTHEK',
  'mindset.title':      'Mindset',
  'mindset.subtitle.one':   '{{count}} Einsicht freigeschaltet',
  'mindset.subtitle.other': '{{count}} Einsichten freigeschaltet',
  'mindset.all':           'Alle',
  'mindset.today':         'HEUTE',
  'mindset.filter.today':  'Heute',
  'mindset.header.daily':  'Einsicht des Tages.',
  'mindset.header.count':  '{{n}} Einsicht{{s}} freigeschaltet.',
  'mindset.locked':     'Mit Premium freischalten',
  'mindset.empty':      'Schließe deinen ersten Daily Reset ab,\num Mindset-Einsichten freizuschalten.',
  'mindset.min':        '{{n}} Min',
  'mindset.minread':    '{{n}} Min Lesezeit',
  'mindset.pro':        'PRO',
  'cat.focus':          'Fokus',
  'cat.discipline':     'Rhythmus',
  'cat.confidence':     'Selbstvertrauen',
  'cat.productivity':   'Klarheit',
  'cat.emotional':      'Emotionaler Reset',
  'cat.detox':          'Digitaler Detox',
  'cat.focus.label':        'Fokus',
  'cat.discipline.label':   'Rhythmus',
  'cat.confidence.label':   'Selbstvertrauen',
  'cat.productivity.label': 'Klarheit',
  'cat.emotional.label':    'Emotionaler Reset',
  'cat.detox.label':        'Digitaler Detox',
  'cat.calm.label':         'Ruhe',
  'cat.courage.label':      'Mut',
  'cat.rest.label':         'Erholung',
  'cat.momentum.label':     'Schwung',

  // ── Profile ─────────────────────────────────────────────────────────────────
  'profile.goals.title':       'DEINE ZIELE',
  'profile.settings.title':    'EINSTELLUNGEN',
  'profile.name.placeholder':  'Tippe um deinen Namen einzugeben',
  'profile.premium':           'PREMIUM',
  'profile.upgrade':           'Volle Erfahrung freischalten',
  'profile.version':           'Daily Reset v1.0.0',
  'profile.row.notification':  'Benachrichtigungszeit',
  'profile.row.language':      'Sprache',
  'profile.row.restore':       'Kauf wiederherstellen',
  'profile.row.privacy':       'Datenschutzrichtlinie',
  'profile.row.terms':         'Nutzungsbedingungen',
  'profile.row.reset':         'Daten löschen',
  'profile.restore.title':     'Kauf wiederherstellen',
  'profile.restore.msg':       'Kein früherer Kauf gefunden.',
  'profile.reset.title':       'Daten löschen',
  'profile.reset.msg':         'Dein lokaler Fortschritt wird gelöscht. Das kann nicht rückgängig gemacht werden.',
  'profile.reset.cancel':      'Abbrechen',
  'profile.reset.confirm':     'Löschen',
  'profile.modal.privacy':     'Datenschutzrichtlinie',
  'profile.modal.terms':       'Nutzungsbedingungen',
  'profile.modal.journey.title': 'Dein Rückweg',
  'profile.modal.journey.sub':   'Die App passt sich an, um deinen Rückweg zu begleiten.',
  'profile.modal.eyebrow':     'DAILY RESET APP',
  'profile.modal.date':        'Zuletzt aktualisiert: Mai 2026',
  'profile.modal.privacy.footer': 'Durch die Nutzung von Daily Reset stimmst du dieser Datenschutzrichtlinie zu.',
  'profile.modal.terms.footer':   'Durch die Nutzung von Daily Reset stimmst du diesen Nutzungsbedingungen zu.',
  'notif.morning':   'Morgen',
  'notif.afternoon': 'Nachmittag',
  'notif.evening':   'Abend',
  'notif.settings.eyebrow':       'EINSTELLUNGEN',
  'notif.settings.title':         'Tägliche Erinnerung',
  'notif.settings.sub':           'Wähle den besten Moment für deinen Reset.',
  'notif.period.label':           'TAGESZEIT',
  'notif.period.morning.label':   'Morgen',
  'notif.period.morning.sub':     'Starte deinen Tag mit Intention',
  'notif.period.afternoon.label': 'Nachmittag',
  'notif.period.afternoon.sub':   'Mittags neu orientieren',
  'notif.period.evening.label':   'Abend',
  'notif.period.evening.sub':     'Den Tag bewusst abschließen',
  'notif.hour.label':             'UHRZEIT DER BENACHRICHTIGUNG',
  'notif.preview.text':           'Erinnerung jeden Tag um',
  'notif.saved':                  'Erinnerung aktualisiert.',
  'notif.saving':                 'Wird gespeichert...',
  'notif.save':                   'Erinnerung speichern',
  'notif.evening.sectionLabel':   'ABEND-CHECK-IN',
  'notif.evening.toggleLabel':    'Abend-Check-in',
  'notif.evening.toggleSub':      'Ein stiller Moment am Ende des Tages',
  'notif.word.sectionLabel':      'WORT DES TAGES',
  'notif.word.toggleLabel':       'Wort des Tages',
  'notif.word.toggleSub':         '30 Min vor deiner Erinnerung gesendet',
  'notif.milestone.sectionLabel': 'BESONDERE MOMENTE',
  'notif.milestone.toggleLabel':  'Besondere Momente',
  'notif.milestone.toggleSub':    'Wenn etwas Bedeutsames passiert',
  'notif.quiet.sectionLabel':     'RUHIGE TAGE',
  'notif.quiet.sub':              'An diesen Tagen keine Erinnerungen',
  'notif.promise.text':           'Wir senden maximal eine Benachrichtigung pro Tag.\nNie mehr. Das ist ein Versprechen.',
  'notif.web.unavailable':        'Erinnerungen funktionieren am besten in der installierten App.\nDeine Resets sind hier weiterhin vollständig verfügbar.',
  'notif.day.0': 'So', 'notif.day.1': 'Mo', 'notif.day.2': 'Di', 'notif.day.3': 'Mi',
  'notif.day.4': 'Do', 'notif.day.5': 'Fr', 'notif.day.6': 'Sa',
  'lang.chooseLang':      'SPRACHE',
  'lang.chooseLangTitle': 'Wähle deine Sprache',
  'lang.en': 'English',
  'lang.es': 'Spanish',
  'lang.pt': 'Português',
  'lang.fr': 'Français',
  'lang.de': 'Deutsch',
  'lang.eyebrow':         'WÄHLE DEINEN RAUM',
  'lang.sub':             'Diese Erfahrung passt sich deiner Sprache und deinem emotionalen Rhythmus an.',

  // ── Common ──────────────────────────────────────────────────────────────────
  'common.continue':     'Weiter',
  'common.skip':         'Überspringen',

  // ── Onboarding — arrival ────────────────────────────────────────────────────
  'onboarding.arrival.label':              'EINE FRAGE',
  'onboarding.arrival.title':              'Wie kommst du\nheute an?',
  'onboarding.arrival.subtitle':           'Es gibt keine richtige Antwort.',
  'onboarding.arrival.options.exhausted':  'Ich bin erschöpft, aber habe nicht aufgegeben.',
  'onboarding.arrival.options.anxious':    'Mein Kopf kommt nicht zur Ruhe.',
  'onboarding.arrival.options.empty':      'Alles fühlt sich gerade zu schwer an.',
  'onboarding.arrival.options.breathe':    'Ich brauche nur einen Moment zum Durchatmen.',
  'onboarding.arrival.options.returning':  'Ich versuche, meinen Weg zurückzufinden.',
  'onboarding.arrival.cta':               'So bin ich heute',

  // ── Onboarding Promise ───────────────────────────────────────────────────────
  'onboarding.promise.heading':         'Ein Moment.\nJeden Tag.\nGanz für dich.',
  'onboarding.promise.body':            'Eine kleine Sache jeden Tag. Nicht um dich zu reparieren —\nsondern um dir zu helfen, durchzukommen.',
  'onboarding.promise.pill.nopressure': 'Kein Druck',
  'onboarding.promise.pill.minutes':    '2 Minuten',
  'onboarding.promise.pill.pace':       'In deinem Tempo',
  'onboarding.promise.cta':            'Meinen Reset beginnen →',
  'onboarding.promise.hint':           'Kein Konto nötig. In Sekunden starten.',

  // ── Today — greetings ─────────────────────────────────────────────────────
  'today.greeting.morning':   'GUTEN MORGEN.',
  'today.greeting.afternoon': 'GUTEN NACHMITTAG.',
  'today.greeting.evening':   'GUTEN ABEND.',
  'today.greeting.done':      'IMMER NOCH DA.',

  // ── Today — rotating subheadlines ─────────────────────────────────────────
  'today.subheadline.0': 'Manche Veränderungen zeigen sich erst Wochen nachdem sie begonnen haben.',
  'today.subheadline.1': 'Die Version von dir, die noch hier ist, hat bereits etwas geleistet.',
  'today.subheadline.2': 'Nichts, was im Stillen aufgebaut wird, sieht von außen nach viel aus.',
  'today.subheadline.3': 'Beständigkeit braucht nicht jeden Tag gleich.',
  'today.subheadline.4': 'Auch eine langsame Rückkehr ist eine Rückkehr.',
  'today.subheadline.5': 'Anwesenheit ist keine Aufführung.',
  'today.subheadline.6': 'Der Abstand zwischen dem, wo du warst, und dem, wo du jetzt bist, ist real.',

  // ── Today — mood check-in ─────────────────────────────────────────────────
  'today.mood.label': 'Wie geht es dir gerade?',
  'today.mood.hard':  'Schwer',
  'today.mood.okay':  'Geht so',
  'today.mood.good':  'Gut',

  // ── Today — word of the day ───────────────────────────────────────────────
  'today.word.label': 'DEIN WORT HEUTE',

  // ── Today — card section titles ───────────────────────────────────────────
  'today.section.action':     'Dein Reset heute',
  'today.section.why':        'Warum das hilft',
  'today.section.reflection': 'Reflexion',

  // ── Today — CTA / streak / day label ─────────────────────────────────────
  'today.cta.complete':      'Heutigen Reset abschließen',
  'today.streak.paused':    'Pause — willkommen zurück',
  'today.streak.resting':   'Erholung — das ist in Ordnung',
  'today.streak.returning': 'Du bist zurück.',
  'today.day.label':        'TAG {{day}}',

  // ── Journal ───────────────────────────────────────────────────────────────
  'journal.title':            'Deine Einträge.',
  'journal.subtitle':         '{{n}} Tage festgehalten',
  'journal.empty.title':      'Noch nichts hier.',
  'journal.empty.sub':        'Deine Einträge erscheinen hier\nnach deinem ersten Reset.',
  'journal.day':              'TAG {{day}}',
  'journal.completed':        '✓ Reset abgeschlossen',
  'journal.pill.action':      'Aktion',
  'journal.pill.reflection':  'Reflexion',
  'journal.nonotes':          'Reset abgeschlossen. Keine Notizen hinzugefügt.',
  'journal.norecord':         'Keine Notizen aufgezeichnet.',
  'journal.recent.title':     'Letzte Resets',
  'journal.calendar.title':   'Kalender deiner Reise',
  'journal.modal.label.today':      'HEUTIGER RESET',
  'journal.modal.label.action':     'DEIN RESET HEUTE',
  'journal.modal.label.why':        'WARUM DAS HILFT',
  'journal.modal.label.reflection': 'REFLEXION',
  'journal.modal.label.moment':     'EIN MOMENT ZUM NACHDENKEN',
  'journal.modal.label.after':      'NACH DEM RESET',
  'journal.modal.after.sub':        'Was heute bei dir geblieben ist',
  'journal.modal.nonote':       'Keine Notiz hinzugefügt.',
  'journal.modal.noreflection': 'Keine Reflexion hinzugefügt.',
  'journal.modal.completed':    '✓ Reset abgeschlossen',

  // ── Quiet Reflections ─────────────────────────────────────────────────────
  'qr.title':         'Stille Reflexionen',
  'qr.subtitle':      'Deine privaten Momente, sanft bewahrt.',
  'qr.empty.title':   'Manche Gedanken ziehen weiter. Andere bleiben.',
  'qr.empty.body':    'Ein ruhiger Raum für das, was zählt.',
  'qr.view.older':    'Ältere Reflexionen ruhig ansehen',
  'qr.closing':       'Diese Momente gehören dir.',
  'qr.group.week':    'Diese Woche',
  'qr.group.month':   'Früher diesen Monat',
  'qr.group.before':  'Ruhig bewahrt',
  'qr.echo.0':        'Du trägst vieles still mit dir.',
  'qr.echo.1':        'Du kehrst trotzdem zurück.',
  'qr.echo.2':        'Manche Dinge lassen sich besser tragen als lösen.',
  'qr.echo.3':        'Nicht alles, was schwer wiegt, muss jetzt gelöst werden.',
  'qr.echo.4':        'Du warst für dich selbst da, leise.',
  'qr.echo.5':        'Ein sanfter Gedanke ist bei dir geblieben.',
  'qr.echo.6':        'Manche Gedanken wollen gehört, nicht gelöst werden.',
  'qr.echo.7':        'Du bist für dich selbst da gewesen.',

  // ── Progress — private space ──────────────────────────────────────────────
  'progress.privatespace.eyebrow':        'DEIN PRIVATER RAUM',
  'progress.privatespace.headline':       'Ein ruhiger Ort, um abzulegen, was schwer ist.',
  'progress.privatespace.start':          'Hier schreiben...',
  'progress.privatespace.placeholder':    'Lass es kommen...',
  'progress.privatespace.done':           'Fertig',
  'progress.privatespace.keep':           'Behalten',
  'progress.privatespace.letgo':          'Loslassen',
  'progress.privatespace.kept.title':     'Sanft bewahrt.',
  'progress.privatespace.kept.sub':       'Diese Reflexion bleibt bei dir.',
  'progress.privatespace.released.title': 'Sanft losgelassen.',
  'progress.privatespace.released.sub':   'Manche Gedanken dürfen weiterziehen.',
  'progress.qr.title':                    'Stille Reflexionen',
  'progress.qr.sub.empty':               'Deine privaten Momente, sanft bewahrt.',
  'progress.qr.sub.count':               '{{n}} Reflexion{{s}} sanft bewahrt.',
  'progress.qr.sub.count.one':           '1 Reflexion sanft bewahrt.',
  'progress.qr.sub.count.other':         '{{n}} Reflexionen sanft bewahrt.',
  'progress.story.weeklySubCount.one':   '1 Woche deiner Reise',
  'progress.story.weeklySubCount.other': '{{n}} Wochen deiner Reise',
  'progress.section.yourjourney':         'DEINE REISE',
  'progress.section.wordtoday':           'DEIN WORT HEUTE',

  // ── Onboarding ──────────────────────────────────────────────────────────────
  'onboard.skip':        'Überspringen',
  'onboard.s1.headline': 'Dein täglicher Raum\nzum Zurückkehren.',
  'onboard.s1.sub':      'Daily Reset hilft dir, von Erschöpfung zu erholen und wieder zu dir zu finden — eine kleine Aktion pro Tag. Kein Druck.',
  'onboard.s1.cta':      'Meinen Reset starten',
  'onboard.s2.headline': 'Eine kleine Aktion.\nJeden Tag.',
  'onboard.s2.sub':      'Jeden Tag bekommst du eine sanfte Aktion, die auf dich zugeschnitten ist — nicht darauf, wo du sein solltest.',
  'onboard.s2.cta':      'Weiter',
  'onboard.s3.headline': 'Kleine Schritte.\nEchter Fortschritt.',
  'onboard.s3.sub':      'Du musst nicht alles reparieren. Du musst nicht produktiv sein. Du musst nur da sein — auch an schweren Tagen.',
  'onboard.s3.cta':      'Heute beginnen',

  // ── Goal Selection ──────────────────────────────────────────────────────────
  'goals.step':          'SCHRITT 1 VON 2',
  'goals.title':         'Was möchtest du zuerst\nverbessern?',
  'goals.subtitle':      'Wähle alles Zutreffende aus',
  'goals.selected':      '{{n}} ausgewählt',
  'goals.cta':           'Weiter',
  'goals.alert.title':   'Wähle mindestens ein Ziel',
  'goals.alert.msg':     'Entscheide, woran du zuerst arbeiten möchtest.',
  'goal.procrastination': 'Aufhören aufzuschieben',
  'goal.discipline':      'Rhythmus aufbauen',
  'goal.distractions':    'Ablenkungen reduzieren',
  'goal.routine':         'Eine Routine schaffen',
  'goal.control':         'Wieder Kontrolle fühlen',

  // ── Notification Setup ──────────────────────────────────────────────────────
  'notif.step':              'SCHRITT 2 VON 2',
  'notif.title':             'Wann sollen wir deinen\ntäglichen Reset senden?',
  'notif.subtitle':          'Wir erinnern dich zum perfekten Zeitpunkt für deine Routine.',
  'notif.morning.sublabel':  '7:00 Uhr • Starte deinen Tag bewusst',
  'notif.afternoon.sublabel':'12:00 Uhr • Mittagsorientierung',
  'notif.evening.sublabel':  '20:00 Uhr • Den Tag mit Absicht beenden',
  'notif.bridge':            'Beständigkeit beginnt mit dem richtigen Timing.',
  'notif.cta':               'Meinen Reset starten',

  // ── Paywall ─────────────────────────────────────────────────────────────────
  'paywall.title':       'Schalte deine vollständige\nReset-Reise frei',
  'paywall.sub':         'Erhalte Zugang zu 365 täglichen Resets, Fokus-Tools, Gewohnheitsverfolgung und Fortschritts-Einsichten, um Tag für Tag neu zu beginnen.',
  'paywall.benefits.title': 'WAS ENTHALTEN IST',
  'benefit.0': '365 Tägliche Resets',
  'benefit.1': 'Tägliche Aktionen & Anleitung',
  'benefit.2': 'Gewohnheitsverfolgung',
  'benefit.3': 'Fokus-Timer',
  'benefit.4': 'Fortschritts-Dashboard',
  'benefit.5': 'Mindset-Bibliothek',
  'benefit.6': 'Serienüberwachung',
  'benefit.7': 'Tägliche Erinnerungen',
  'plan.annual.label':  'Jährlich',
  'plan.annual.per':    '2,50 € / Monat',
  'plan.annual.badge':  'BESTES ANGEBOT',
  'plan.annual.saving': '50 % sparen',
  'plan.monthly.label': 'Monatlich',
  'plan.monthly.per':   'pro Monat',
  'paywall.disclaimer': 'Jederzeit kündbar. Sichere Zahlung über App Store / Google Play.',
  'paywall.cta':        'Meine Reset-Reise starten',
  'paywall.skip':       'Mit eingeschränktem kostenlosem Zugang fortfahren',

  // ── Today remaining ──────────────────────────────────────────────────────────
  'today.ritual.name':              'Reset-Ritual',
  'today.ritual.sub':               'Ein stiller Moment zum Zurückfinden.',
  'today.reflect.eyebrow':          'EIN MOMENT ZUM NACHDENKEN',
  'today.reflect.done':             '✓ Du hast etwas hier hinterlassen.',
  'today.tomorrow.label':           'MORGEN',
  'today.tomorrow.day2begins':      'Morgen beginnt Tag 2.',
  'today.tomorrow.dayArrives':      'Tag {{day}} kommt morgen.',
  'today.tomorrow.eyebrow':         'MORGIGER RESET',
  'today.tomorrow.continues.top':   'DEINE REISE GEHT WEITER',
  'today.tomorrow.continues.msg':   'Ruh dich aus. Komm zurück, wenn du bereit bist.',
  'today.tomorrow.nopressure':      'Kein Druck. Es wird da sein, wenn du bereit bist.',
  'today.tomorrow.continues.cta':   'Es wird morgen da sein.',

  // ── Ritual-Untertitel — dynamisch (Zustand + generische Rotation) ────────────
  'today.ritual.sub.racing':      'Zwei Minuten zum Entschleunigen.',
  'today.ritual.sub.tired':       'Ein Raum zum Durchatmen.',
  'today.ritual.sub.overwhelmed': 'Weniger Last für ein paar Minuten.',
  'today.ritual.sub.unclear':     'Eine Übung, um den Kopf zu klären.',
  'today.ritual.sub.drained':     'Kein Druck. Nur Anwesenheit.',
  'today.ritual.sub.balanced':    'Ein Moment, um zu bemerken, was funktioniert.',
  'today.ritual.sub.g0':          'Ein Moment, der für heute geschaffen wurde.',
  'today.ritual.sub.g1':          'Dein Reset ist bereit.',
  'today.ritual.sub.g2':          'Etwas Einfaches für jetzt.',
  'today.ritual.sub.g3':          'Eine kleine Rückkehr zu dir.',
  'today.ritual.sub.g4':          'Dein nächster Schritt ist hier.',

  // ── Morgen — Nachrichten nach Phase ──────────────────────────────────────────
  'today.tomorrow.s1.0': 'Du musst nicht mehr tun. Nur zurückkehren.',
  'today.tomorrow.s1.1': 'Der Weg beginnt genau hier.',
  'today.tomorrow.s1.2': 'Jede Rückkehr zählt, auch die stillen.',
  'today.tomorrow.s1.3': 'Morgen wartet etwas auf dich.',
  'today.tomorrow.s1.4': 'Ein Schritt nach dem anderen ist schon genug.',
  'today.tomorrow.s2.0': 'Manchmal kommt Klarheit nach der Ruhe.',
  'today.tomorrow.s2.1': 'Der Rhythmus beginnt sich zu zeigen.',
  'today.tomorrow.s2.2': 'Nicht jeder Fortschritt macht Lärm.',
  'today.tomorrow.s2.3': 'Morgen gehört auch dir.',
  'today.tomorrow.s2.4': 'Ein kleines Detail kann den Ton des Tages verändern.',
  'today.tomorrow.s3.0': 'Manche Antworten kommen, wenn die Eile vergeht.',
  'today.tomorrow.s3.1': 'Was du hier aufgebaut hast, verschwindet nicht.',
  'today.tomorrow.s3.2': 'Etwas Stilles setzt sich fest.',
  'today.tomorrow.s3.3': 'Morgen wirst du etwas bemerken, das heute noch nicht sichtbar ist.',
  'today.tomorrow.s3.4': 'Es gibt immer mehr zu entdecken, ohne Eile.',
  'today.tomorrow.s4.0': 'Stille hat auch Gewicht. Und du weißt das.',
  'today.tomorrow.s4.1': 'Jede Rückkehr ist eine erneute Entscheidung.',
  'today.tomorrow.s4.2': 'Was klein erscheint, ist oft das, was bleibt.',
  'today.tomorrow.s4.3': 'Es gibt eine Kontinuität hier, die nur du siehst.',
  'today.tomorrow.s4.4': 'Morgen muss nichts beweisen. Einfach da sein.',

  'ceremony.whatsAhead':            'WAS DICH ERWARTET',
  'today.messages.welcomeBack':     'WILLKOMMEN ZURÜCK',

  // ── Today — category labels ──────────────────────────────────────────────────
  'today.cat.Focus':      'Fokus',
  'today.cat.Rhythm':     'Rhythmus',
  'today.cat.Discipline': 'Disziplin',
  'today.cat.Courage':    'Mut',
  'today.cat.Momentum':   'Schwung',
  'today.cat.Calm':       'Ruhe',
  'today.cat.Clarity':    'Klarheit',
  'today.cat.Rest':       'Erholung',

  // ── Reflection write screen ───────────────────────────────────────────────────
  'reflect.eyebrow':     'REFLEXION',
  'reflect.save':        'Speichern',
  'reflect.skip':        'Überspringen',
  'reflect.saved':       'Gespeichert ✓',
  'reflect.microcopy':   'Ein Gedanke reicht.',
  'reflect.placeholder': 'Hier beginnen...',
  'reflect.privacy':     'Deine Reflexionen bleiben privat.',

  // ── Journal subtitle ──────────────────────────────────────────────────────────
  'journal.subtitle.one':   '1 Tag festgehalten',
  'journal.subtitle.other': '{{n}} Tage festgehalten',

  // ── Reflection history ────────────────────────────────────────────────────────
  'reflection.header.eyebrow':      'DEINE REISE',
  'reflection.header.title':        'Reflexions-Tagebuch',
  'reflection.header.sub.empty':    'Dein Reflexionsraum wartet auf dich.',
  'reflection.header.sub.count':    '{{n}} Reflexion{{s}} geschrieben',
  'reflection.action.edit':         'Reflexion bearbeiten',
  'reflection.action.delete':       'Reflexion löschen',
  'reflection.action.readmore':     'Mehr lesen',
  'reflection.dayBadge':            'Tag {{n}}',
  'reflection.edit.title':          'Reflexion bearbeiten',
  'reflection.edit.save':           'Speichern',
  'reflection.edit.cancel':         'Abbrechen',
  'reflection.edit.privacy':        'Deine Reflexionen bleiben privat.',
  'reflection.delete.title':        'Diese Reflexion löschen?',
  'reflection.delete.sub':          'Diese Aktion kann nicht rückgängig gemacht werden.',
  'reflection.delete.cancel':       'Abbrechen',
  'reflection.delete.confirm':      'Löschen',
  'reflection.empty.noyet':         'Noch keine Reflexionen.',
  'reflection.empty.waiting':       'Dein Reflexionsraum wartet auf dich.',
  'reflection.empty.appear':        'Deine Reflexionen erscheinen hier, während du sie schreibst.',
  'reflection.empty.invite':        'Nach einem täglichen Reset wirst du eingeladen, eine kurze Reflexion zu schreiben.',
  'reflection.bottom.quote':        '"Jede Reflexion ist ein kleiner Akt der Selbstwahrnehmung."',

  // ── Weekly recap history ──────────────────────────────────────────────────────
  'recap.history.eyebrow':          'DEINE GESCHICHTE',
  'recap.history.title':            'Wöchentliche Rückblicke',
  'recap.history.sub.nodata':       'Dein erster Rückblick kommt nach einer vollen Woche.',
  'recap.history.sub.building':     'Rückblicke erscheinen, während du deine Reise aufbaust.',
  'recap.history.sub.count':        '{{n}} Woche{{s}} deiner Reise',
  'recap.history.empty.title':      'Deine wöchentliche Geschichte wird noch geschrieben.',
  'recap.history.empty.text':       'Mit mehr Resets erscheinen deine Reflexionen\nund Muster hier.',
  'recap.history.current.eyebrow':  'DIESE WOCHE · IN BEARBEITUNG',
  'recap.history.coming.title':     'Vergangene Wochen erscheinen hier.',
  'recap.history.coming.sub':       'Dein erster vollständiger Wochenrückblick wird nach 7 Tagen freigeschaltet.',
  'recap.history.sum.weeks':        'Wochen aufgezeichnet',
  'recap.history.sum.resets':       'Resets insgesamt',
  'recap.history.sum.streak':       'längster Rhythmus',
  'recap.history.quote':            '"Jede Woche ist eine Seite der Geschichte, die du schreibst."',
  'recap.card.streakLabel':         'Rhythmus',
  'recap.card.habitsLabel':         '% Gewohnheiten',
  'recap.insight.sevenForSeven':    'Sieben von sieben. Eine volle Woche.',
  'recap.insight.showedUpN':        'Du warst diese Woche {{n}} Mal da.',
  'recap.insight.nResets':          '{{n}} Resets diese Woche. Ein Rhythmus entsteht.',
  'recap.insight.twoReturns':       'Es gab Rückkehren diese Woche. Der Raum ist noch da.',
  'recap.insight.cameBackStreak':   'Du bist zurückgekehrt, noch einmal.',
  'recap.insight.cameBack':         'Du bist zurückgekehrt. Einmal reicht.',
  'recap.insight.stillYours':       'Diese Woche gehört noch dir.',
  'recap.subinsight.remarkable':    'Solche Beständigkeit verändert die Dinge mit der Zeit.',
  'recap.subinsight.strong':        'Stille Beständigkeit baut etwas Echtes auf.',
  'recap.subinsight.streakHolding': 'Dein Rhythmus hält.',
  'recap.subinsight.repetition':    'Kleine Wiederholung wird zur Identität.',
  'recap.subinsight.eachReset':     'Jeder Reset zählt, wie auch immer die Woche aussieht.',

  // ── Mindset remaining ─────────────────────────────────────────────────────────
  'mindset.empty.today.title':     'Die Einsicht des Tages wartet.',
  'mindset.empty.lib.title':       'Deine Bibliothek wächst.',
  'mindset.empty.today.sub':       'Schließe deinen ersten Daily Reset ab, um die heutige Mindset-Einsicht freizuschalten.',
  'mindset.empty.lib.sub':         'Einsichten werden freigeschaltet, während deine Reise fortschreitet.',
  'mindset.library.text':          'Deine Mindset-Bibliothek.',
  'mindset.library.textCount':     '{{n}} Einsicht{{s}} in deiner Sammlung.',
  'mindset.library.sub1':          'Neue Einsichten werden freigeschaltet, während deine Reise fortschreitet.',
  'mindset.library.sub2':          'Die Bibliothek wächst täglich mit deiner Praxis.',
  'mindset.subtitle.free':           'Eine bedeutungsvolle Einsicht jeden Tag.',
  'mindset.subtitle.premium':        'Reflexionen für deinen Rhythmus.',
  'mindset.subtitle.locked':         'Wird mit Premium freigeschaltet.',
  'mindset.subtitle.count.one':      '{{n}} Einsicht freigeschaltet.',
  'mindset.subtitle.count.other':    '{{n}} Einsichten freigeschaltet.',
  'mindset.badge.today':             'HEUTE',
  'mindset.dayLabel':                'TAG {{day}}',
  'mindset.insightLabel':            'EINSICHT',
  'mindset.locked.journey':          'Kommt zu seiner Zeit.',
  'mindset.locked.return':           'Kommt mit der Zeit.',
  'mindset.modal.day':               'Tag {{day}}',
  'mindset.modal.insight':           'Einsicht',
  'mindset.modal.minread':           '{{n}} Min Lesezeit',
  'mindset.foryou.title':            'HEUTE FÜR DICH',
  'mindset.foryou.question':         'Wie kommst du gerade an?',
  'mindset.foryou.recommended':      'FÜR DICH EMPFOHLEN',
  'mindset.foryou.curated':          'Für deine Reise ausgewählt',
  'mindset.emotion.overwhelmed':     'Druck',
  'mindset.emotion.numb':            'Gedankennebel',
  'mindset.emotion.frustrated':      'Überwältigt',
  'mindset.emotion.low_energy':      'Wenig Energie',
  'mindset.emotion.anxious':         'Innere Unruhe',
  'mindset.emotion.balanced':        'Im Gleichgewicht',
  'mindset.emotion.overwhelmed.sub': 'Für wenn alles zu viel erscheint.',
  'mindset.emotion.numb.sub':        'Für wenn der Kopf verstummt.',
  'mindset.emotion.frustrated.sub':  'Für wenn die Last schwer zu tragen ist.',
  'mindset.emotion.low_energy.sub':  'Für wenn das Tempo langsamer geworden ist.',
  'mindset.emotion.anxious.sub':     'Für wenn die Stille nicht einkehrt.',
  'mindset.emotion.balanced.sub':    'Für wenn sich alles richtig anfühlt.',
  'mindset.coming.eyebrow':          'MIT DEINER REISE',
  'mindset.unlock.title':            'DEIN RAUM GEHT HIER WEITER',
  'mindset.unlock.cta':              'Deine Reise fortsetzen →',
  'mindset.library.title':           'WEGE ZURÜCK',
  'mindset.library.insights':        'Neue Momente kommen mit der Zeit',
  'mindset.lib.burnout':             'Burnout-Erholung',
  'mindset.lib.emotional':           'Emotionaler Reset',
  'mindset.lib.discipline':          'Sanfte Disziplin',
  'mindset.lib.detox':               'Digitaler Detox',
  'mindset.lib.focus':               'Fokus-Erholung',
  'mindset.lib.burnout.count':       'Burnout-Erholung — 12 Einsichten',
  'mindset.lib.emotional.count':     'Emotionaler Reset — 10 Einsichten',
  'mindset.lib.discipline.count':    'Sanfte Disziplin — 8 Einsichten',
  'mindset.lib.detox.count':         'Digitaler Detox — 8 Einsichten',
  'mindset.lib.focus.count':         'Fokus-Erholung — 10 Einsichten',
  'mindset.lib.burnout.sub':         'Dein Körper war nicht dafür gemacht, in ständiger Alarmbereitschaft zu leben.',
  'mindset.lib.emotional.sub':       'Du musst jetzt nicht alles lösen.',
  'mindset.lib.discipline.sub':      'Beständigkeit wächst besser ohne Zwang.',
  'mindset.lib.detox.sub':           'Stille ist auch Produktivität.',
  'mindset.lib.focus.sub':           'Nicht jede Ablenkung ist Faulheit.',
  'mindset.cat.Focus':    'Fokus',
  'mindset.cat.Calm':     'Ruhe',
  'mindset.cat.Courage':  'Mut',
  'mindset.cat.Rest':     'Erholung',
  'mindset.cat.Clarity':  'Klarheit',
  'mindset.cat.Momentum': 'Schwung',
  'mindset.cat.Rhythm':   'Rhythmus',
  'mindset.card.m1.title':    'Eine Sache nach der anderen.',
  'mindset.card.m2.title':    'Die 2-Minuten-Regel',
  'mindset.card.m3.title':    'Vertrauen durch Beweise',
  'mindset.card.m4.title':    'Die MIT-Methode',
  'mindset.card.m5.title':    'Emotionen als Daten',
  'mindset.card.m6.title':    'Die Aufmerksamkeitsökonomie',
  'mindset.card.m7.title':    'Der 90-Minuten-Arbeitsblock',
  'mindset.card.m8.title':    'Identitätsbasierte Gewohnheiten',
  'mindset.card.m9.title':    'Ablehnung als Umleitung',
  'mindset.card.m10.title':   'Time-Blocking meistern',
  'mindset.card.m11.title':   'Der Mut, unbeliebt zu sein',
  'mindset.card.m12.title':   'Langeweile zurückgewinnen',
  'mindset.card.m13.title':   'Das Eine-Ding-Prinzip',
  'mindset.card.m14.title':   'Nie zweimal in Folge auslassen',
  'mindset.card.m15.title':   'Kompetenz schafft Vertrauen',
  'mindset.card.m16.title':   'Der wöchentliche Rückblick',
  'mindset.card.m17.title':   'Die Praxis des Loslassens',
  'mindset.card.m18.title':   'Digitaler Minimalismus',
  'mindset.card.m19.title':   'Tiefes Arbeiten',
  'mindset.card.m20.title':   'Das Stockdale-Paradox',
  'mindset.card.emo1.title':  'Du darfst neu anfangen',
  'mindset.card.emo2.title':  'Ruhe ist keine Schwäche',
  'mindset.card.disc1.title': 'Dein Gehirn vertraut dem, was du wiederholst.',
  'mindset.card.disc2.title': 'Schweres wird leichter, wenn es zur Gewohnheit wird.',
  'mindset.card.disc3.title': 'Kleine Wiederholungen verändern die Richtung deiner Tage.',
  'mindset.card.m1.content':  'Fokus schwindet, wenn er aufgeteilt wird. Jedes Mal, wenn du zwischen Aufgaben wechselst, entstehen für dein Gehirn Wechselkosten — durchschnittlich 23 Minuten, um wieder vollständig konzentriert zu sein. Die produktivsten Menschen tun nicht die meisten Dinge. Sie tun die eine wichtigste Sache mit voller Konzentration. Beginne jede Arbeitssession damit, deinen einzigen nicht verhandelbaren Output zu wählen. Lege alles andere außer Reichweite. Wenn du fertig bist — erst dann machst du weiter.',

  // ── Mindset m-series content — Deutsch ─────────────────────────────────────────
  'mindset.card.m2.content':
    'Dauert eine Aufgabe weniger als zwei Minuten — tu sie sofort. Nicht einplanen, nicht aufschreiben, einfach tun. Diese eine Regel beseitigt hunderte kleiner Aufschübe, die sich zu einem Nebel unerledigter Dinge verdichten.\n\nDer Berg kleiner halbfertiger Aufgaben saugt still Energie, ohne dass du es merkst. Räume sie sofort weg und behalte deinen mentalen Freiraum für das, was wirklich zählt.',

  'mindset.card.m3.content':
    'Selbstvertrauen ist kein Gefühl, auf das du wartest — es ist Beweis, den du sammelst. Jedes Mal, wenn du etwas Schwieriges tust, ein Versprechen an dich hältst oder Widerstand überwindest, fügst du deiner inneren Akte einen weiteren Beleg hinzu: Du kannst das.\n\nDie meisten Menschen warten auf Selbstvertrauen, bevor sie handeln. Beginne heute dein kleines Erfolgstagebuch. Notiere jeden kleinen Sieg. Mit der Zeit wird die Beweislage unbestreitbar.',

  'mindset.card.m4.content':
    'Identifiziere jeden Morgen deine wichtigsten Aufgaben — die ein bis drei Dinge, deren Erledigung heute den größten Fortschritt bringen würde. Tue diese, bevor alles andere beginnt. Vor E-Mails. Vor dem Handy. Bevor der Tag dich in reaktives Handeln zieht.\n\nDie meisten Menschen füllen ihre Tage mit dem Dringlichen, aber Unwichtigen. Wer bewusst priorisiert, baut sein Leben auf dem auf, was wirklich zählt. Der Unterschied, über ein Jahr hinweg — ist außerordentlich.',

  'mindset.card.m5.content':
    'Emotionen sind keine Hindernisse für klares Denken — sie sind Daten. Frustration zeigt ein blockiertes Ziel. Angst zeigt ein unbeachtetes Risiko. Trauer zeigt einen Verlust, der Raum verdient.\n\nDas Problem ist nicht, Emotionen zu fühlen — es ist, von ihnen unbewusst gesteuert zu werden. Die Übung: Benenne, was du fühlst. Spüre seiner Quelle nach. Und entscheide dann bewusst, wie du antwortest. Diese eine Fähigkeit verwandelt reaktive Menschen in Menschen, die wählen.',

  'mindset.card.m6.content':
    'Jede App, jede Benachrichtigung, jeder Feed wurde von klugen Köpfen so gebaut, dass er deine Aufmerksamkeit einfängt und hält. Deine Aufmerksamkeit wird verkauft. Die Frage ist: Bekommst du dafür etwas Wertvolles zurück?\n\nEin digitaler Detox bedeutet nicht, Technologie zu hassen — es bedeutet, sie bewusst statt zwanghaft zu nutzen. Beginne mit einer bildschirmfreien Stunde jeden Morgen und baue die Fähigkeit wieder auf, deine eigene Aufmerksamkeit zu lenken.',

  'mindset.card.m7.content':
    'Der menschliche Körper folgt ultradian Rhythmen — ungefähr 90-minütige Zyklen aus Wachheit und Erholung. Mit diesen Zyklen statt gegen sie zu arbeiten ist eine der wirkungsvollsten Veränderungen, die du vornehmen kannst.\n\nArbeite 90 Minuten mit voller Präsenz. Dann gönn dir eine echte 20-minütige Pause: gehen, dösen oder einfach ohne Bildschirm ruhen. Dann zurück, erholt. Das ist kein Trick — so ist dein Gehirn gebaut.',

  'mindset.card.m8.content':
    'Jede Handlung, die du wiederholst, ist eine Stimme für die Person, die du werden möchtest. Du musst es am Anfang nicht glauben — du musst nur beständig handeln. Frage nicht „Was muss ich tun?", sondern „Wer möchte ich sein?"\n\nJemand, der sich bewegt, fragt nicht, ob er heute Lust hat. Jemand, der liest, fragt nicht, ob er Zeit hat. Wenn eine Gewohnheit zur Identität wird, wird Motivation überflüssig.',

  'mindset.card.m9.content':
    'Jede Ablehnung schützt dich entweder vor dem falschen Weg oder bereitet dich auf den richtigen vor. Die erfolgreichsten Menschen in jedem Bereich haben Stapel von Ablehnungen gesammelt, die andere zerbrochen hätten.\n\nWas sie unterscheidet, ist nicht Talent — es ist der Glaube, dass Ablehnung eine Information ist, kein Urteil. Wenn du das nächste Mal abgelehnt wirst, frage: „Was sagt mir das darüber, wohin ich stattdessen gehen sollte?"',

  'mindset.card.m10.content':
    'Dein Kalender sollte deine Prioritäten widerspiegeln — nicht deine reaktiven Verpflichtungen. Time-Blocking bedeutet, jeder Stunde deines Tages eine bestimmte Aufgabe zuzuweisen, bevor der Tag beginnt.\n\nReaktive Menschen antworten auf alles, was ankommt. Vorausschauende Menschen setzen das um, was geplant war. Beginne damit, deine Morgen für das Wichtigste zu schützen. Wenn das zur Gewohnheit wird, erweitere den Schutz auf den ganzen Tag.',

  'mindset.card.m11.content':
    'Eine der befreiendsten Erkenntnisse ist diese: Nicht alle werden dich mögen, und das ist nicht dein Problem. Ständige Zustimmung zu suchen ist eine Form der Selbstaufgabe.\n\nWenn du Entscheidungen danach triffst, wer du sein möchtest statt wer andere von dir erwarten, erlebst du eine Freiheit, die keine externe Bestätigung geben kann. Die Menschen, die es wert sind, in deinem Leben zu bleiben, werden deine Echtheit respektieren.',

  'mindset.card.m12.content':
    'Langeweile ist kein Problem, das gelöst werden muss — sie ist ein Zustand, aus dem etwas entsteht. Das Gehirn wechselt in seinen Default-Modus, wenn es keine Stimulation erhält: genau dort leben Kreativität, Einsicht und Selbstreflexion.\n\nWenn du jeden stillen Moment mit Inhalten füllst, raubst du dir den mentalen Raum, in dem deine besten Ideen entstehen. Lass dich ruhig mal langweilen. Nimm ein Notizbuch mit, kein Handy. Sieh, was dein Geist schafft, wenn er Platz hat.',

  'mindset.card.m13.content':
    'Frage dich: „Was ist die EINE Sache, die ich tun könnte, sodass durch sie alles andere leichter oder unnötig wird?" Diese Frage, auf Arbeit, Beziehungen, Gesundheit und Ziele angewendet, schneidet durch das Rauschen endloser Möglichkeiten.\n\nDie Antwort ist fast immer offensichtlich, sobald du ehrlich fragst. Tu diese eine Sache zuerst, jeden Tag — und beobachte, wie schnell sich dein Leben um das neu ordnet, was wirklich zählt.',

  'mindset.card.m14.content':
    'Du wirst einen Tag auslassen. Das ist kein Versagen — das ist Menschsein. Die Regel ist einfach: nie zweimal hintereinander. Ein verpasster Tag ist ein Ausrutscher. Zwei verpasste Tage sind der Beginn einer neuen Gewohnheit — der Gewohnheit, nicht zu erscheinen.\n\nDas Reset-Mindset sagt: „Gestern habe ich es verpasst. Heute beginne ich neu." Kein Drama, keine Selbstkritik. Einfach: heute beginne ich neu.',

  'mindset.card.m15.content':
    'Du kannst dich nicht in Selbstvertrauen hineindenken. Du kannst dich nur hindurchhandeln. Selbstvertrauen ist ein Nebenprodukt von Kompetenz — und Kompetenz entsteht nur durch beständige Übung.\n\nHör auf zu warten, bis du dich bereit fühlst. Fang jetzt an, in dem Wissen, dass das Selbstvertrauen, das du suchst, auf der anderen Seite des Tuns liegt. Wiederholung schafft den Beweis. Beweis schafft den Glauben.',

  'mindset.card.m16.content':
    'Investiere einmal pro Woche 30 Minuten darin, die vergangene Woche zu überdenken und die nächste zu planen. Frage: Was habe ich geschafft? Was habe ich vermieden? Was nehme ich mit? Was darf ich loslassen?\n\nDer wöchentliche Rückblick ist die wirkungsvollste Praxis für mentale Klarheit — weil er zufällige Alltagshandlungen in eine kohärente Geschichte des Fortschritts verwandelt. Menschen, die das tun, erleben spürbar weniger innere Unruhe.',

  'mindset.card.m17.content':
    'An Groll, Bedauern oder dem Wunsch festzuhalten, dass Dinge anders wären als sie sind, gehört zu den größten Energiefressern in der menschlichen Psyche. Loslassen bedeutet nicht, das Geschehene gutzuheißen — es bedeutet, das Gewicht davon abzulegen, um wieder vorwärts gehen zu können.\n\nEs geschieht nicht einmal für immer — es ist eine tägliche Übung. Wähle heute eine Sache, an der du fest festhältst, und entscheide dich, sie für heute niederzulegen.',

  'mindset.card.m18.content':
    'Digitaler Minimalismus bedeutet nicht, weniger Technologie zu nutzen — es bedeutet, nur die Technologie zu nutzen, die deinen Werten wirklich dient. Frage für jede App auf deinem Handy: Fügt sie echten Wert zu meinem Leben hinzu, oder füllt sie nur Momente, über die ich noch nicht nachgedacht habe?\n\nVielleicht wirst du entdecken, dass weniger Werkzeuge, mit voller Intention genutzt, mehr bedeutungsvolle Wirkung erzeugen als ein Dutzend zwanghaft genutzter Tools.',

  'mindset.card.m19.content':
    'Tiefes Arbeiten ist die Fähigkeit, ohne Ablenkung an kognitiv anspruchsvollen Aufgaben zu arbeiten. Es ist selten in unserer zerstreuten Welt — und entsprechend wertvoll. Die Fähigkeit zum tiefen Arbeiten trennt jene, die außergewöhnliche Ergebnisse erzielen, von jenen, die beschäftigt bleiben, ohne echten Fortschritt zu machen.\n\nBaue deine Kapazität für tiefes Arbeiten wie einen Muskel auf: Beginne mit kurzen fokussierten Einheiten und steigere die Dauer allmählich.',

  'mindset.card.m20.content':
    'Admiral James Stockdale, ein Kriegsgefangener, der jahrelange Folter überlebte, lebte nach einem Paradox: Stelle dir die brutalsten Fakten deiner aktuellen Realität, während du gleichzeitig den unerschütterlichen Glauben bewahrst, dass du bestehen wirst.\n\nDas Stockdale-Paradox ist das Fundament beständiger Resilienz. Tu nicht so, als wäre alles besser als es ist. Tu nicht so, als wäre es schlimmer. Sieh klar. Glaube fest. Handle beständig.',

  // ── Mindset emo content — Deutsch ──────────────────────────────────────────────
  'mindset.card.emo1.content':
    'Ein schwieriger Tag definiert nicht dein ganzes Leben. Der emotionale Neustart beginnt, wenn du aufhörst zu glauben, dass Fehler, Rückschläge oder Erschöpfung dauerhaft bestimmen, wer du bist.\n\nJeder neue Moment bietet eine neue Möglichkeit, anders zu beginnen. Heilung fängt oft damit an, dir selbst die Erlaubnis zu geben, ohne Scham wieder anzufangen.',

  'mindset.card.emo2.content':
    'Viele Menschen fühlen sich schuldig, wenn sie langsamer werden — aber Erschöpfung ist keine Auszeichnung. Emotionales Gleichgewicht braucht Erholung, Stille und Momente des Innehaltens.\n\nKonstanter Druck saugt still mentale und emotionale Energie aus. Ruhe stellt Klarheit wieder her. Ein ausgeruhter Geist begegnet dem Leben ruhiger.',

  // ── Mindset disc content (disc3 onwards) — Deutsch ────────────────────────────
  'mindset.card.disc1.content':
    'Beständigkeit ist kein Bestrafungswerkzeug — sie ist der Beweis, dass du deine Zukunft für schützenswert hältst. Jedes Versprechen, das du dir selbst hältst, stärkt dein Selbstbild und das Vertrauen in dich.\n\nMenschen mit Beständigkeit sind nicht unbedingt motivierter — sie handeln nach ihren Prioritäten statt nach kurzfristigen Gefühlen. Echtes Selbstvertrauen entsteht, wenn du weißt, dass du dich auf dich verlassen kannst. Beständigkeit baut dieses Vertrauen täglich auf.',

  'mindset.card.disc2.content':
    'Motivation ist emotional und unberechenbar. Manchmal erscheint sie von selbst, manchmal verschwindet sie völlig. Beständigkeit ist das, was Fortschritt ermöglicht, auch wenn die Gefühle schwanken.\n\nErfolgreiche Menschen verlassen sich nicht allein auf Inspiration. Sie schaffen Systeme und Gewohnheiten, die unabhängig von der Stimmung weiterlaufen.',

  'mindset.card.disc3.content':
    'Das Leben verändert sich selten durch eine einzige große Entscheidung. Es verändert sich durch kleine, beständig wiederholte Entscheidungen. Beständigkeit entsteht in gewöhnlichen Momenten — aufstehen wie geplant, beenden was begonnen wurde, Ablenkungen widerstehen.\n\nKleine beständige Handlungen summieren sich zu großen Veränderungen. Deine Gewohnheiten werden still zu deiner Zukunft.',

  'mindset.card.disc4.title':  'Komfort hält uns oft still, ohne dass wir es merken.',
  'mindset.card.disc4.content':
    'Das Gehirn sucht von Natur aus Komfort, Bequemlichkeit und sofortige Freude. Aber Wachstum erfordert meist vorübergehende Unbequemlichkeit. Beständigkeit bedeutet, den langfristigen Nutzen über kurzfristige Leichtigkeit zu stellen.\n\nJedes Mal, wenn du der leichteren Option widerstehst, stärkst du deine mentale Resilienz. Komfort kann sich sicher anfühlen, während er dich still festhält.',

  'mindset.card.disc5.title':  'Beständigkeit schafft Freiheit — keine Enge.',
  'mindset.card.disc5.content':
    'Viele glauben, Beständigkeit schränke Freiheit ein — aber das Gegenteil ist oft wahr. Mangel an Beständigkeit schafft Chaos, Stress, Schulden, Aufschub und Bedauern. Beständigkeit schafft Struktur, Stabilität und Kontrolle über dein Leben.\n\nJe mehr du deine Gewohnheiten meisterst, desto weniger bestimmen Impulse über dich. Echte Freiheit entsteht durch Selbstmeisterschaft.',

  'mindset.card.disc6.title':  'Handeln, bevor man sich bereit fühlt, erzeugt auch Rhythmus.',
  'mindset.card.disc6.content':
    'Auf das richtige Gefühl zu warten schafft oft endlose Verzögerung. Beständigkeit beginnt, wenn du handelst, bevor deine Emotionen vollständig mitmachen. Sobald Bewegung entsteht, lässt Widerstand meist nach.\n\nDer schwerste Teil ist oft der Beginn. Handeln erzeugt Schwung schneller als jedes Nachdenken.',

  'mindset.card.disc7.title':  'Beständigkeit entsteht auch an schwierigen Tagen.',
  'mindset.card.disc7.content':
    'Jeder kann beständig sein, wenn das Leben leicht ist. Echte Beständigkeit zeigt sich in stressigen, emotionalen oder unbequemen Momenten. Schwierige Tage sind der Ort, wo mentale Stärke entsteht.\n\nJedes Mal, wenn du trotz Unbehagen weitermachst, wächst deine Resilienz. Beständigkeit in harten Momenten verändert Identität.',

  'mindset.card.disc8.title':  'Deine Zukunft wird durch das geformt, was du heute täglich tust.',
  'mindset.card.disc8.content':
    'Die zukünftige Version deines Lebens wird durch deine heutigen Routinen gestaltet. Beständigkeit ist keine dramatische Transformation über Nacht — es ist wiederholtes Verhalten, das lange genug geübt wird, um Wandel zu schaffen.\n\nDeine Routinen stimmen beständig dafür ab, wer du wirst. Kleine Handlungen zählen mehr, als die meisten Menschen ahnen.',

  'mindset.card.disc9.title':  'Beständigkeit reduziert innere Verhandlungen.',
  'mindset.card.disc9.content':
    'Unbeständige Geister verhandeln ständig mit sich selbst. „Vielleicht später." „Nur diesmal." „Morgen wird besser." Beständigkeit reduziert diese inneren Debatten, indem sie klare Standards und Routinen schafft.\n\nJe weniger du emotional mit dir verhandelst, desto mehr Energie bleibt übrig. Struktur schützt Beständigkeit.',

  'mindset.card.disc10.title': 'Selbstkontrolle ist eine stille Form innerer Kraft.',
  'mindset.card.disc10.content':
    'In einer Welt voller Ablenkungen und sofortiger Befriedigung ist Selbstkontrolle außerordentlich wertvoll. Beständigkeit ermöglicht es dir, Impulsen zu widerstehen, die deine langfristigen Ziele schwächen.\n\nJeder Moment der Zurückhaltung stärkt deine mentale Souveränität über dich selbst. Die Fähigkeit, deine Handlungen zu steuern, schafft Stabilität und innere Ruhe.',

  'mindset.card.disc11.title': 'Beständigkeit ist Wiederholung — nicht Intensität.',
  'mindset.card.disc11.content':
    'Extreme Anstrengung über wenige Tage verändert selten ein Leben. Nachhaltige Beständigkeit entsteht durch beständige Wiederholung über lange Zeiträume. Kleine täglich wiederholte Handlungen schaffen stärkere Ergebnisse als gelegentliche Motivationsausbrüche.\n\nLangfristiger Erfolg wird meist still und langsam aufgebaut. Beständigkeit potenziert sich kraftvoll über die Zeit.',

  'mindset.card.disc12.title': 'Beständigkeit schützt das, was dir wirklich wichtig ist.',
  'mindset.card.disc12.content':
    'Ohne Beständigkeit bleiben Ziele Ideen statt Wirklichkeit. Begeisterung verblasst schnell, aber beständiges Handeln hält Fortschritt am Leben. Fokussierte Bemühung schützt Träume vor Ablenkung und Aufschub.\n\nBeständigkeit ist die Brücke zwischen Absicht und Verwirklichung. Ziele brauchen Struktur, um zu überleben.',

  'mindset.card.disc13.title': 'Vorübergehendes Loslassen schafft dauerhafte Geschenke.',
  'mindset.card.disc13.content':
    'Beständigkeit erfordert oft, sofortige Freude für zukünftigen Gewinn aufzugeben. Dieses Opfer mag im Moment unangenehm sein, aber die langfristigen Belohnungen sind meist weit größer.\n\nJede beständige Entscheidung ist eine Investition in dein zukünftiges Ich. Kurzfristiges Unbehagen kann zu lebenslanger Verbesserung führen.',

  'mindset.card.disc14.title': 'Was du wiederholst, sagt dir auch, wer du bist.',
  'mindset.card.disc14.content':
    'Jede wiederholte Handlung verstärkt dein Selbstbild. Wenn du beständig durchhältst, beginnst du dich als verlässlich, fähig und beständig zu sehen. Identität wächst aus Verhalten, nicht allein aus Absichten.\n\nDeine Handlungen lehren deinem Gehirn, wer du bist. Beständigkeit formt das Selbstbild.',

  'mindset.card.disc15.title': 'Ausreden erschöpfen die innere Kraft.',
  'mindset.card.disc15.content':
    'Ausreden schützen kurzfristig Komfort, schwächen aber langfristig das Selbstrespekt. Beständigkeit wächst, wenn du aufhörst, Umständen vollständige Kontrolle über deine Handlungen zu geben.\n\nFortschritt erfordert selten Perfektion — er erfordert Verantwortung. Eigentümerschaft schafft innere Kraft. Ausreden schaffen Stillstand.',

  'mindset.card.disc16.title': 'Beständigkeit ist auch emotionale Steuerung.',
  'mindset.card.disc16.content':
    'Viele Menschen bleiben nicht beständig, weil Emotionen ständig ihre Entscheidungen lenken. Beständigkeit bedeutet, nach Werten statt nach flüchtigen Gefühlen zu handeln.\n\nEmotionales Unbehagen bedeutet nicht immer, dass du aufhören solltest. Ruhige Selbstkontrolle schützt langfristigen Fortschritt. Stabilität verbessert Leistung.',

  'mindset.card.disc17.title': 'Beständigkeit baut Selbstvertrauen still auf.',
  'mindset.card.disc17.content':
    'Selbstvertrauen entsteht nicht nur durch Erfolg. Es entsteht auch durch Beständigkeit. Jedes Mal, wenn du eine Verpflichtung dir selbst gegenüber hältst, vertieft sich dein Selbstvertrauen.\n\nBeständigkeit schafft den Beweis, dass du in der Lage bist, durchzuhalten. Kleine Siege schaffen allmählich starkes inneres Vertrauen.',

  'mindset.card.disc18.title': 'Struktur beruhigt den Geist.',
  'mindset.card.disc18.content':
    'Desorganisation schafft mentale Überforderung. Beständigkeit bringt Ordnung, Klarheit und Vorhersehbarkeit in den Alltag. Strukturierte Routinen reduzieren Entscheidungsermüdung und mentales Chaos.\n\nWenn Gewohnheiten automatisch werden, verschwendet das Gehirn weniger Energie damit, Handlungen zu widerstehen. Einfachheit unterstützt Beständigkeit.',

  'mindset.card.disc19.title': 'Beständigkeit ist auch, das Wichtigste zu wählen.',
  'mindset.card.disc19.content':
    'Jede beständige Handlung ist letztlich eine Entscheidung über Prioritäten. Du wählst langfristigen Sinn über vorübergehende Ablenkung. Beständigkeit wird leichter, wenn deine Werte klar sind.\n\nStarke Prioritäten reduzieren innere Konflikte. Klarheit stärkt Engagement.',

  'mindset.card.disc20.title': 'Verzögerte Freude verändert Leben.',
  'mindset.card.disc20.content':
    'Die Fähigkeit, sofortige Freude für zukünftige Belohnung aufzuschieben, ist einer der stärksten Prädiktoren für langfristigen Erfolg. Beständigkeit stärkt diese Fähigkeit über die Zeit.\n\nSofortige Befriedigung fühlt sich oft befriedigend an, schafft aber schwache langfristige Ergebnisse. Geduld und Zurückhaltung schaffen stärkere Zukünfte. Langfristiges Denken verändert Entscheidungen.',

  'mindset.card.disc21.title': 'Beständigkeit braucht auch Grenzen, die sie schützen.',
  'mindset.card.disc21.content':
    'Beständigkeit wird schwierig, wenn alles unbegrenzten Zugang zu deiner Aufmerksamkeit hat. Beständigkeit bedeutet oft, Grenzen gegenüber Ablenkungen, Technologie, Menschen und ungesunden Gewohnheiten zu setzen.\n\nDeine Prioritäten zu schützen bedeutet, deine Zukunft zu schützen. Grenzen schaffen mentale Klarheit und innere Kontrolle.',

  'mindset.card.disc22.title': 'Schwierige Entscheidungen bauen auch etwas in dir auf.',
  'mindset.card.disc22.content':
    'Leichte Entscheidungen entwickeln selten Resilienz. Schwierige Entscheidungen bauen Ausdauer, Weisheit und Charakter auf. Beständigkeit lehrt dich, Unbehagen zu tolerieren, ohne sofort zu fliehen.\n\nMentale Stärke wächst durch Herausforderung. Wachstum versteckt sich meist in der Unbequemlichkeit.',

  'mindset.card.disc23.title': 'Beständigkeit schafft Stabilität, wenn alles sich bewegt.',
  'mindset.card.disc23.content':
    'Das Leben wird immer Unsicherheit, Stress und emotionale Schwankungen enthalten. Beständigkeit schafft innere Stabilität, wenn äußere Situationen unberechenbar sind. Starke Routinen bieten Halt in schwierigen Zeiten.\n\nBeständige Gewohnheiten schaffen emotionale Struktur. Stabilität schützt Schwung.',

  'mindset.card.disc24.title': 'Jede Gewohnheit baut entweder auf oder schwächt ab.',
  'mindset.card.disc24.content':
    'Kein wiederholtes Verhalten ist neutral. Jede Gewohnheit stärkt entweder deine Zukunft oder schwächt sie still ab. Beständigkeit bedeutet, bewusster zu werden über das, was du wiederholt in dein Leben lässt.\n\nWiederholung formt Ergebnisse. Deine täglichen Muster zählen tief.',

  'mindset.card.disc25.title': 'Vollenden, was begonnen wurde, formt auch Charakter.',
  'mindset.card.disc25.content':
    'Viele Menschen lieben Anfänge, weil Anfänge sich aufregend anfühlen. Beständigkeit ist das, was dich weitermachen lässt, nachdem die Aufregung verblasst ist. Vollenden entwickelt Zuverlässigkeit, Geduld und Resilienz.\n\nVollendung baut stärkeren Charakter als endloses Anfangen. Beständigkeit schafft Ergebnisse.',

  'mindset.card.disc26.title': 'Erholung ist auch Teil echter Beständigkeit.',
  'mindset.card.disc26.content':
    'Erholung ist nicht der Feind von Beständigkeit. Burnout schwächt Beständigkeit und mentale Klarheit. Beständige Menschen verstehen die Wichtigkeit von Erholung, Schlaf und Balance.\n\nNachhaltige Leistung erfordert echte Wiederherstellung. Langfristige Beständigkeit hängt von Energiemanagement ab.',

  'mindset.card.disc27.title': 'Beständigkeit schützt auch vor dem Bedauern.',
  'mindset.card.disc27.content':
    'Die meisten Bedauern kommen vom Vermeiden schwieriger, aber notwendiger Handlungen. Beständigkeit hilft dir, Entscheidungen zu treffen, die dein zukünftiges Ich schätzen wird. Vorübergehendes Unbehagen verhindert oft langfristige Frustration.\n\nBeständige Bemühung schützt den inneren Frieden. Handeln reduziert Bedauern.',

  'mindset.card.disc28.title': 'Du wirst zu dem, was du beständig übst.',
  'mindset.card.disc28.content':
    'Dein Gehirn passt sich wiederholtem Verhalten an. Wenn du beständig Ablenkung, Vermeidung und Unbeständigkeit übst, stärken sich diese Muster. Aber wenn du beständig Fokus und Durchhaltevermögen übst, werden auch diese stärker.\n\nWiederholung baut Identität. Übung formt Charakter.',

  'mindset.card.disc29.title': 'Dir selbst Versprechen halten baut inneres Vertrauen wieder auf.',
  'mindset.card.disc29.content':
    'Gebrochene Selbstversprechen schwächen still Selbstvertrauen und Vertrauen in sich. Beständigkeit baut diese Beziehung zu sich selbst wieder auf. Jede Verpflichtung, die du ehrst, stärkt Selbstrespekt.\n\nZuverlässigkeit dir selbst gegenüber zählt tief. Inneres Vertrauen verändert, wie du durchs Leben gehst.',

  'mindset.card.disc30.title': 'Was du heute tust, schafft auch eine andere Zukunft.',
  'mindset.card.disc30.content':
    'Die meisten Menschen unterschätzen, wie stark ihre tägliche Beständigkeit ihre Zukunft beeinflusst. Die kleinen Entscheidungen, die du heute wiederholst, bestimmen still die Chancen, das Selbstvertrauen, die Gesundheit und die Stabilität, die du später erlebst.\n\nBeständigkeit bedeutet nicht, jeden Moment perfekt zu kontrollieren. Es bedeutet, beständig in die richtige Richtung zu gehen.',

  'mindset.card.disc31.title': 'Es trotzdem tun ist auch eine Form von Beständigkeit.',
  'mindset.card.disc31.content':
    'Es wird Tage geben, an denen du dich müde, uninspiriert, abgelenkt oder emotional ausgelaugt fühlst. Beständigkeit ist die Fähigkeit, trotz dieser Gefühle weiterzumachen, statt auf perfekte Bedingungen zu warten.\n\nFortschritt wird oft in Momenten aufgebaut, in denen Motivation fehlt. Die Menschen, die ihr Leben verändern, sind meist jene, die weitergehen, wenn es leichter wäre, aufzuhören.',

  'mindset.card.disc32.title': 'Was du beständig tolerierst, formt auch dich.',
  'mindset.card.disc32.content':
    'Beständigkeit beginnt mit persönlichen Standards. Was du beständig tolerierst, wird zu deiner Normalität. Wenn deine Standards steigen, beginnen sich deine Handlungen natürlich zu verändern.\n\nBeständige Menschen entscheiden im Voraus, wie sie leben möchten, statt emotional im Moment zu reagieren. Starke Standards schaffen stärkere Leben.',

  'mindset.card.disc33.title': 'Beständigkeit reconnects dich mit dem, was wirklich wichtig ist.',
  'mindset.card.disc33.content':
    'Impulse sind vorübergehend, aber Konsequenzen halten oft viel länger an. Beständigkeit hilft dir, dich mit deinen tieferen Prioritäten zu verbinden, bevor du Entscheidungen triffst. In schwierigen Momenten schafft die Erinnerung an deine größeren Ziele Klarheit.\n\nVorübergehende Emotionen sollten nicht mehr Autorität haben als deine langfristige Vision. Beständigkeit schützt, was am meisten zählt.',

  'mindset.card.disc34.title': 'Mentale Stärke entsteht in der Wiederholung.',
  'mindset.card.disc34.content':
    'Mentale Stärke wird nicht durch gelegentliche Anstrengung aufgebaut. Sie entsteht durch wiederholte Momente der Beständigkeit über die Zeit. Jede schwierige Handlung, die du abschließt, stärkt deine Resilienz ein kleines bisschen mehr.\n\nBeständigkeit wird leichter, je öfter du sie übst. Wiederholung trainiert den Geist, Unbehagen ruhig zu tolerieren.',

  'mindset.card.disc35.title': 'Ordnung pflegt auch den inneren Raum.',
  'mindset.card.disc35.content':
    'Mangel an Struktur schafft oft unnötigen Stress und Verwirrung. Beständigkeit bringt Ordnung in Routinen, Prioritäten und Verantwortlichkeiten. Organisierte Gewohnheiten reduzieren mentale Überlastung und emotionale Erschöpfung.\n\nWenn das Leben Struktur hat, verschwendet das Gehirn weniger Energie damit, sich von Unordnung zu erholen. Einfachheit schafft Stabilität.',

  'mindset.card.disc36.title': 'Fortschritt wartet nicht auf perfekte Bedingungen.',
  'mindset.card.disc36.content':
    'Ausreden fühlen sich kurzfristig tröstlich, aber langfristig destruktiv an. Beständigkeit erfordert Verantwortung, auch wenn die Umstände nicht ideal sind. Fortschritt erfordert keine idealen Bedingungen — er erfordert beständige Bemühung.\n\nEigentümerschaft schafft Schwung. Verantwortung stärkt innere Kraft.',

  'mindset.card.disc37.title': 'Große Transformationen entstehen langsam.',
  'mindset.card.disc37.content':
    'Große Veränderungen sind in der Regel das Ergebnis tausender kleiner beständiger Entscheidungen. Jede gesunde Wahl verstärkt stärkere Gewohnheiten und Identität. Beständigkeit ist selten dramatisch — sie ist oft still, repetitiv und im Moment unsichtbar.\n\nKleine Handlungen schaffen irgendwann riesige Unterschiede.',

  'mindset.card.disc38.title': 'Zurückkehren ist wichtiger als nie zu straucheln.',
  'mindset.card.disc38.content':
    'Viele Menschen geben auf, weil sie makelloses Verhalten von sich erwarten. Beständigkeit bedeutet nicht, jeden Tag perfekt zu sein. Es bedeutet, nach Fehlern oder Rückschlägen schnell zurückzukehren.\n\nLangfristige Beständigkeit zählt weit mehr als vorübergehende Perfektion. Nachhaltiges Bemühen schafft dauerhaften Wandel.',

  'mindset.card.disc39.title': 'Manchmal ist Fortschritt nicht sichtbar — er passiert trotzdem.',
  'mindset.card.disc39.content':
    'Echtes Wachstum geschieht in der Regel langsamer als Menschen erwarten. Beständigkeit bedeutet, weiterzumachen, auch bevor sichtbare Ergebnisse erscheinen. Ungeduld bringt viele Menschen dazu, wertvolle Gewohnheiten zu früh aufzugeben.\n\nNachhaltiger Erfolg erfordert oft lange Perioden unsichtbaren Fortschritts. Geduld stärkt Beständigkeit.',

  'mindset.card.disc40.title': 'Deine Energie verdient auch Pflege.',
  'mindset.card.disc40.content':
    'Unbeständige Gewohnheiten erschöpfen oft mentale, emotionale und körperliche Energie. Späte Nächte, ständige Ablenkungen, Aufschieben und emotionale Impulsivität schwächen Leistung über Zeit. Beständigkeit schützt deine Energie, indem sie gesündere Muster schafft.\n\nBessere Gewohnheiten schaffen stärkeren Fokus und Resilienz.',

  'mindset.card.disc41.title': 'Schwieriges wird leichter mit Übung.',
  'mindset.card.disc41.content':
    'Je öfter du schwierige Verhaltensweisen übst, desto weniger Widerstand erzeugen sie. Wiederholung reduziert emotionale Reibung. Was sich einmal unmöglich anfühlte, wird durch Beständigkeit allmählich normal.\n\nWachstum passiert, wenn schwierige Handlungen zu regelmäßigen Gewohnheiten werden. Beständigkeit verändert die Wahrnehmung.',

  'mindset.card.disc42.title': 'Dich selbst führen ist auch eine Form der Selbstfürsorge.',
  'mindset.card.disc42.content':
    'Selbstführung ist die Fähigkeit, das eigene Handeln bewusst zu steuern statt sich von Impulsen oder Umständen kontrollieren zu lassen. Beständigkeit stärkt deine Fähigkeit, dein eigenes Verhalten zu lenken.\n\nStarke Selbstführung schafft Selbstvertrauen und emotionale Stabilität. Mit der Zeit wirst du dir selbst zuverlässiger.',

  'mindset.card.disc43.title': 'Beständigkeit entsteht in stillen Momenten, ohne Zeugen.',
  'mindset.card.disc43.content':
    'Charakter wird durch das geformt, was du beständig tust, wenn niemand zuschaut. Beständigkeit wächst durch stille Entscheidungen, die beständig im Verborgenen getroffen werden. Kleine private Handlungen bestimmen oft später sichtbare Ergebnisse.\n\nIntegrität stärkt Identität. Deine unsichtbaren Gewohnheiten formen deine sichtbare Zukunft.',

  'mindset.card.disc44.title': 'Nicht alles, was sich heute gut anfühlt, pflegt das Morgen.',
  'mindset.card.disc44.content':
    'Viele impulsive Entscheidungen fühlen sich vorübergehend gut an, schaffen aber später Stress, Bedauern oder Schwäche. Beständigkeit lehrt dich, langfristige Konsequenzen zu evaluieren, bevor du emotional reagierst.\n\nKurzfristiger Komfort kann langfristige Ziele still sabotieren. Weise Zurückhaltung schützt zukünftigen Frieden.',

  'mindset.card.disc45.title': 'Beständigkeit schafft Stabilität auch an schwierigen Tagen.',
  'mindset.card.disc45.content':
    'Wenn deine Handlungen ständig von der Stimmung abhängen, wird das Leben emotional unberechenbar. Beständigkeit schafft Gleichmäßigkeit auch in stressigen Perioden. Strukturierte Gewohnheiten reduzieren emotionales Chaos durch Beständigkeit.\n\nStabilität verbessert Entscheidungsfindung. Ruhige Routinen stärken Resilienz.',

  'mindset.card.disc46.title': 'Je mehr du dich trägst, desto weniger brauchst du Antrieb von außen.',
  'mindset.card.disc46.content':
    'Je beständiger du wirst, desto weniger bist du auf externen Druck, Erinnerungen oder Bestätigung angewiesen, um zu handeln. Selbstbeständigkeit schafft persönliche Unabhängigkeit. Du hörst auf, darauf zu warten, dass andere dich motivieren oder retten.\n\nInnere Verantwortung schafft Freiheit und Reife.',

  'mindset.card.disc47.title': 'Auch an energiearmen Tagen erhält ein kleiner Schritt den Rhythmus.',
  'mindset.card.disc47.content':
    'Schwung ist fragil. Kleine Perioden von Unbeständigkeit können Fortschritt und Motivation schnell schwächen. Beständigkeit schützt Schwung durch stetes Handeln, besonders an energiearmen Tagen.\n\nSogar kleine Bemühungen helfen, Vorwärtsbewegung aufrechtzuerhalten. Beständigkeit hält Wachstum am Leben.',

  'mindset.card.disc48.title': 'Unbehagen gehört auch zum Weg.',
  'mindset.card.disc48.content':
    'Die meisten Menschen weichen instinktiv Unbehagen aus, aber Beständigkeit lehrt dich, in schwierigen Momenten ruhig zu bleiben. Wachstum erfordert oft Langeweile, Wiederholung, Unsicherheit oder Anstrengung.\n\nAllem Unbehagen auszuweichen schwächt Resilienz. Lernen, vorübergehendes Unbehagen zu tolerieren, stärkt emotionale Kontrolle.',

  'mindset.card.disc49.title': 'Deine Umgebung beeinflusst auch deinen Rhythmus.',
  'mindset.card.disc49.content':
    'Willenskraft allein reicht oft nicht. Deine Umgebung beeinflusst deine Gewohnheiten und dein Verhalten stark. Beständigkeit wird leichter, wenn deine Umgebung deine Ziele unterstützt statt ständig Ablenkungen zu bieten.\n\nStruktur reduziert unnötigen Widerstand. Kluge Umgebungen unterstützen bessere Entscheidungen.',

  'mindset.card.disc50.title': 'Beständigkeit macht dich verlässlich — zuerst für dich selbst.',
  'mindset.card.disc50.content':
    'Menschen vertrauen jenen, die beständig durchhalten. Verlässlichkeit entsteht durch wiederholte beständige Handlungen über die Zeit. Wenn du dir selbst und anderen gegenüber verlässlich wirst, wächst Selbstvertrauen natürlich.\n\nBeständigkeit stärkt sowohl Beziehungen als auch Identität. Verlässlichkeit schafft Respekt.',

  'mindset.card.disc51.title': 'Echtes Wachstum passiert in der Mitte, nicht nur am Anfang.',
  'mindset.card.disc51.content':
    'Beginnen ist wichtig, aber Beständigkeit bedeutet auch weiterzumachen, wenn Dinge repetitiv oder schwierig werden. Viele Menschen verlieren Schwung, nachdem die anfängliche Begeisterung verblasst ist. Echtes Wachstum passiert oft in der weniger aufregenden Mittelphase.\n\nAusdauer schafft Vollendung. Vollendung schafft Transformation.',

  'mindset.card.disc52.title': 'Jede Handlung heute ist auch ein Geschenk an dein zukünftiges Ich.',
  'mindset.card.disc52.content':
    'Jede beständige Handlung ist ein Geschenk an deine zukünftige Version. Gesunde Gewohnheiten, Verantwortungsbewusstsein, Lernen und Beständigkeit schaffen langfristige Vorteile, die sich nicht immer sofort zeigen.\n\nBeständigkeit ist langfristige Selbstfürsorge. Zukünftige Stabilität entsteht durch heutige Verantwortung.',

  'mindset.card.disc53.title': 'Handeln klärt auch den Kopf.',
  'mindset.card.disc53.content':
    'Aufschieben und Unbeständigkeit schaffen mentales Rauschen und Schuld. Beständigkeit reduziert innere Spannung durch Handeln und Vollendung. Je mehr Verantwortlichkeiten du bewusst wahrnehmst, desto ruhiger wird dein Geist oft.\n\nOrdnung verbessert Klarheit. Klarheit verbessert Leistung.',

  'mindset.card.disc54.title': 'Beständigkeit verkürzt auch den Weg zurück nach einem Stolpern.',
  'mindset.card.disc54.content':
    'Beständige Menschen sind nicht immun gegen Rückschläge oder schlechte Tage. Der Unterschied ist, dass sie sich schneller erholen, statt ihre Ziele vollständig aufzugeben. Resilienz bedeutet zurückkehren statt aufgeben.\n\nBeständigkeit verkürzt die Distanz zwischen Scheitern und Erholung. Beständigkeit überlebt Rückschläge.',

  'mindset.card.disc55.title': 'Deine Identität entsteht auch in den Entscheidungen von heute.',
  'mindset.card.disc55.content':
    'Jede Handlung verstärkt eine bestimmte Version von dir. Beständigkeit hilft dir, wiederholt Verhaltensweisen zu wählen, die mit der Person übereinstimmen, die du werden möchtest. Identität wird durch Wiederholung geformt.\n\nDein zukünftiger Charakter wird täglich durch kleine Entscheidungen aufgebaut.',

  'mindset.card.disc56.title': 'Mit der Zeit fließt Beständigkeit von selbst.',
  'mindset.card.disc56.content':
    'Wenn positive Verhaltensweisen automatisch werden, erfordert Beständigkeit weniger emotionale Energie. Gewohnheiten reduzieren die Notwendigkeit ständiger Entscheidungsfindung und Willenskraft. Das Ziel ist nicht, für immer zu kämpfen — es ist, Systeme aufzubauen, die Beständigkeit natürlich unterstützen.\n\nAutomatisierung stärkt Stabilität.',

  'mindset.card.disc57.title': 'Beständigkeit akkumuliert still über die Zeit.',
  'mindset.card.disc57.content':
    'Die meisten beständigen Handlungen erscheinen im Moment klein. Ein Training, eine fokussierte Stunde, eine gesunde Wahl, ein schwieriges Gespräch. Aber über Monate und Jahre summieren sich diese Handlungen zu bedeutender Transformation.\n\nBeständigkeit schafft selten sofortige Ergebnisse. Ihre wahre Kraft zeigt sich durch Anhäufung.',

  // ── Mindset Focus cards — Deutsch ──────────────────────────────────────────────
  'mindset.card.focus1.title':  'Tiefe Arbeit schafft echten Fortschritt.',
  'mindset.card.focus1.content':
    'Oberflächliche Arbeit hält dich beschäftigt. Tiefe Arbeit verändert dein Leben. Echtes Wachstum entsteht, wenn du ungestörte Zeit vollständig in bedeutungsvolle Arbeit eintauchst.\n\nDie Fähigkeit, sich tief zu konzentrieren, wird seltener — und damit wertvoller. Die meisten Menschen schöpfen ihr Potenzial nie aus, weil sie sich ständig selbst unterbrechen. Lange Perioden der Konzentration schaffen außerordentliche Ergebnisse.',

  'mindset.card.focus2.title':  'Eliminiere, bevor du optimierst.',
  'mindset.card.focus2.content':
    'Viele Menschen versuchen produktiver zu werden, während sie unnötige Ablenkungen in ihrem Leben behalten. Fokus verbessert sich schneller durch Eliminierung als durch Optimierung.\n\nBevor du neue Systeme oder Werkzeuge hinzufügst, entferne, was deine Aufmerksamkeit belastet. Unnötige Tabs, Benachrichtigungen, Gespräche und Verpflichtungen verbrauchen still mentale Energie. Einfachheit schafft mentalen Raum für Fokus.',

  'mindset.card.focus3.title':  'Fokus ist tägliches Training.',
  'mindset.card.focus3.content':
    'Konzentration ist keine Eigenschaft, die man hat oder nicht hat — sie ist eine Fähigkeit, die durch Wiederholung wächst. Jedes Mal, wenn du einer Ablenkung widerstehst, trainierst du dein Gehirn, länger präsent zu bleiben.\n\nKleine tägliche Momente der Beständigkeit bauen allmählich starke mentale Ausdauer auf. Die moderne Welt schwächt Aufmerksamkeitsspannen bewusst. Fokussierte Menschen trainieren bewusst die entgegengesetzte Gewohnheit.',

  'mindset.card.focus4.title':  'Beende, bevor du etwas Neues anfängst.',
  'mindset.card.focus4.content':
    'Ständig neue Aufgaben zu beginnen schafft mentalen Lärm. Jede unerledigte Aufgabe bleibt offen in deinem Geist und zieht kognitive Energie. Fokus wächst, wenn du Dinge vollendest, bevor du zur nächsten Stimulation springst.\n\nVollenden schafft Schwung, Selbstvertrauen und Klarheit. Die Gewohnheit der Vollendung ist wertvoller als die Aufregung endloser Anfänge.',

  'mindset.card.focus5.title':  'Deine Umgebung formt deinen Geist.',
  'mindset.card.focus5.content':
    'Fokus wird stark von dem beeinflusst, was dich umgibt. Unaufgeräumte Räume schaffen oft unaufgeräumtes Denken. Benachrichtigungen, Lärm und visuelle Ablenkungen fragmentieren still die Aufmerksamkeit durch den ganzen Tag.\n\nEine ruhige Umgebung hilft deinem Gehirn, ruhig zu bleiben. Deinen Raum bewusst zu gestalten macht Konzentration leichter und natürlicher.',

  'mindset.card.focus6.title':  'Mentale Energie zählt mehr als Zeit.',
  'mindset.card.focus6.content':
    'Mehr Stunden zu haben bedeutet nichts, wenn der Geist erschöpft ist. Fokus hängt mehr von mentaler Frische ab als von verfügbarer Zeit. Schlaf zu schützen, Überstimulation zu reduzieren und strategische Pausen zu nehmen verbessert Konzentration dramatisch.\n\nEine fokussierte Stunde ist mehr wert als fünf abgelenkte.',

  'mindset.card.focus7.title':  'Hör auf, ständig zu konsumieren.',
  'mindset.card.focus7.content':
    'Dein Gehirn kann sich nicht tief konzentrieren, wenn es ständig mit Stimulation überflutet wird. Endloses Scrollen, Videos und Benachrichtigungen trainieren deinen Geist, alle paar Sekunden Neuheit zu suchen.\n\nStille und Ruhe stärken Konzentration. Fokus braucht Raum zum klaren Denken. Manchmal ist die beste Produktivitätsstrategie einfach, weniger Informationen zu konsumieren.',

  'mindset.card.focus8.title':  'Eile zerstört Präzision.',
  'mindset.card.focus8.content':
    'Hetze schafft Fehler, Stress und mentale Fragmentierung. Ruhiger Fokus produziert bessere Entscheidungen als hektische Schnelligkeit. Viele Menschen verwechseln Panik mit Produktivität, aber ständige Dringlichkeit schwächt Aufmerksamkeit.\n\nFokussierte Menschen verlangsamen sich genug, um klar zu denken, bevor sie handeln. Präzision spart oft mehr Zeit als Schnelligkeit.',

  'mindset.card.focus9.title':  'Präsenz verbessert alles.',
  'mindset.card.focus9.content':
    'Wenn deine Aufmerksamkeit vollständig präsent ist, werden selbst einfache Handlungen effektiver. Halbfokussierte Arbeit produziert halbwertige Ergebnisse. Geistig abwesend zu arbeiten erhöht Müdigkeit, weil das Gehirn ständig zwischen Gedanken wechselt.\n\nFokus ist zu lernen, vollständig im gegenwärtigen Moment anzukommen. Präsenz verbessert sowohl Leistung als auch inneren Frieden.',

  'mindset.card.focus10.title': 'Eine Entscheidung nach der anderen.',
  'mindset.card.focus10.content':
    'Mentale Erschöpfung kommt oft davon, zu viele kleine Entscheidungen zu treffen. Jede Wahl verbraucht im Laufe des Tages kognitive Energie. Routinen zu vereinfachen befreit mehr Aufmerksamkeit für wichtige Arbeit.\n\nFokussierte Menschen reduzieren unnötige Entscheidungen wann immer möglich. Je weniger mentalen Lärm du erzeugst, desto mehr Klarheit bleibt verfügbar.',

  'mindset.card.focus11.title': 'Beständigkeit schützt den Fokus.',
  'mindset.card.focus11.content':
    'Motivation verändert sich ständig, aber Beständigkeit schützt Kontinuität. Fokus wird stärker, wenn du dich verpflichtest, auch dann zu arbeiten, wenn Ablenkungen verlockend erscheinen. Die Fähigkeit, bei schwierigen Aufgaben zu bleiben, baut über Zeit mentale Resilienz auf.\n\nFokussierte Menschen warten nicht darauf, sich „bereit" zu fühlen. Sie schaffen Schwung durch Handeln.',

  'mindset.card.focus12.title': 'Stille ist ein stiller Vorteil.',
  'mindset.card.focus12.content':
    'Das moderne Leben ist gefüllt mit konstantem Lärm — Benachrichtigungen, Meinungen, Inhalte und Unterbrechungen. Stille gibt deinem Gehirn wieder Raum, tief zu denken. Viele Durchbrüche entstehen, wenn der Geist endlich ruhig genug wird, um klar zu verarbeiten.\n\nFokus gedeiht in ruhigen Umgebungen. Stille stellt mentale Schärfe wieder her.',

  'mindset.card.focus13.title': 'Fokus braucht Grenzen.',
  'mindset.card.focus13.content':
    'Jedes „Ja" zur Ablenkung ist ein „Nein" zu deinen Prioritäten. Fokussierte Menschen schützen ihre Zeit mit klaren Grenzen. Nicht jede Nachricht verdient eine sofortige Antwort. Nicht jede Gelegenheit verdient deine Aufmerksamkeit.\n\nDeinen mentalen Raum zu schützen ist für bedeutenden Fortschritt unerlässlich.',

  'mindset.card.focus14.title': 'Bewegung besiegt Grübeln.',
  'mindset.card.focus14.content':
    'Grübeln verschwindet oft, sobald Bewegung beginnt. Das Gehirn neigt dazu, die Schwierigkeit von Aufgaben zu übertreiben, bevor man anfängt. Handeln schafft Klarheit schneller als endlose Analyse.\n\nFokus verbessert sich, wenn du aufhörst, mental mit dir zu verhandeln, und einfach beginnst. Kleiner Fortschritt stillt mentalen Widerstand.',

  'mindset.card.focus15.title': 'Erholung verbessert Konzentration.',
  'mindset.card.focus15.content':
    'Konstantes Arbeiten ohne Erholung schwächt Fokus über Zeit. Dein Gehirn braucht Pausen, um Aufmerksamkeit zurückzusetzen und Informationen richtig zu verarbeiten. Erholung ist keine Faulheit — sie ist Teil nachhaltiger Leistung.\n\nFokussierte Menschen verstehen, dass Erholung langfristige Produktivität schützt. Ein ausgeruhter Geist denkt klarer.',

  'mindset.card.focus16.title': 'Trainiere deinen Geist zum Bleiben.',
  'mindset.card.focus16.content':
    'Moderne Ablenkungen lehren das Gehirn, ständig Stimulation zu suchen. Fokus erfordert, deine Aufmerksamkeit neu zu trainieren, bei einer Sache länger zu bleiben. Am Anfang kann sich Konzentration unangenehm anfühlen, weil dein Geist Unterbrechung gewohnt ist.\n\nAber Unbehagen ist Teil davon, Aufmerksamkeit zu stärken. Die Fähigkeit, mental präsent zu bleiben, ist eine besondere Kraft.',

  'mindset.card.focus17.title': 'Kleine Ablenkungen werden zu großen Verzögerungen.',
  'mindset.card.focus17.content':
    'Eine schnelle Benachrichtigung mag harmlos erscheinen, aber kleine Unterbrechungen unterbrechen den mentalen Fluss. Nach einer Ablenkung braucht das Gehirn oft erhebliche Zeit, um sich vollständig neu zu fokussieren.\n\nKleine Unterbrechungen, den ganzen Tag wiederholt, zerstören still die Produktivität. Konzentration zu schützen bedeutet, zu respektieren, wie fragil tiefer Fokus wirklich ist.',

  'mindset.card.focus18.title': 'Langeweile stärkt Aufmerksamkeit.',
  'mindset.card.focus18.content':
    'Konstante Unterhaltung schwächt deine Fähigkeit, Stille zu tolerieren. Doch Langeweile wird oft zum Eingang zu Kreativität, Reflexion und tiefem Denken. Fokussierte Menschen fürchten keine ruhigen Momente.\n\nDein Gehirn ohne Stimulation sitzen zu lassen stärkt Aufmerksamkeit auf natürliche Weise. Kreativität erscheint oft, nachdem Ablenkung verschwunden ist.',

  'mindset.card.focus19.title': 'Fokus baut Selbstvertrauen.',
  'mindset.card.focus19.content':
    'Selbstvertrauen kommt nicht nur aus Erfolg — es kommt auch davon, zu wissen, dass du deine Aufmerksamkeit kontrollieren kannst. Jede fokussierte Sitzung stärkt das Vertrauen in dich. Wenn du beständig wichtige Arbeit abschließt, beginnt dein Geist an deine Beständigkeit zu glauben.\n\nFokus baut Selbstrespekt über Zeit auf.',

  'mindset.card.focus20.title': 'Vereinfache deine Prioritäten.',
  'mindset.card.focus20.content':
    'Alles zu priorisieren bedeutet, nichts zu priorisieren. Fokus verbessert sich, wenn du erkennst, was jetzt wirklich am meisten zählt. Zu viele Ziele schaffen geteilte Energie und zerstreute Aufmerksamkeit.\n\nEinfachheit schärft Ausführung. Klare Prioritäten schaffen stärkeren Schwung.',

  'mindset.card.focus21.title': 'Dein Handy konkurriert um deinen Geist.',
  'mindset.card.focus21.content':
    'Die meisten digitalen Plattformen sind so gestaltet, dass sie deine Aufmerksamkeit so lange wie möglich einfangen und halten. Jede unnötige Benachrichtigung zieht dein Gehirn weg von bedeutungsvoller Arbeit.\n\nFokussierte Menschen kontrollieren Technologie bewusst, statt Technologie sie kontrollieren zu lassen. Deine Aufmerksamkeit zu schützen bedeutet, deine Zukunft zu schützen.',

  'mindset.card.focus22.title': 'Fokus ist auch emotional.',
  'mindset.card.focus22.content':
    'Ablenkung wird nicht immer durch Technologie verursacht. Manchmal meidet der Geist Fokus wegen Stress, Angst, Überforderung oder emotionalem Unbehagen. Emotionale Regulierung zu lernen verbessert Konzentration dramatisch.\n\nRuhige Emotionen schaffen einen ruhigeren Geist. Innere Stabilität stärkt äußere Leistung.',

  'mindset.card.focus23.title': 'Wiederholung schafft Meisterschaft.',
  'mindset.card.focus23.content':
    'Meisterschaft entsteht selten durch Intensität allein. Sie kommt aus fokussierter Wiederholung über lange Zeiträume. Jede Sitzung tiefer Übung stärkt neuronale Pfade und Kompetenzentwicklung.\n\nFokussierte Beständigkeit schlägt immer zerstreute Bemühung. Kleine Verbesserungen summieren sich zu außerordentlichen Ergebnissen.',

  'mindset.card.focus24.title': 'Langsamer werden, um besser zu denken.',
  'mindset.card.focus24.content':
    'Schnelles Denken ist nützlich für Notfälle. Tiefes Denken erfordert Langsamkeit. Viele Menschen reagieren sofort, ohne sich Raum zu lassen, klar zu denken. Fokussierte Menschen pausieren lange genug, um zu beobachten, zu reflektieren und bewusst zu wählen.\n\nBesseres Denken schafft bessere Entscheidungen.',

  'mindset.card.focus25.title': 'Schütze deine kognitive Kapazität.',
  'mindset.card.focus25.content':
    'Dein Gehirn hat täglich begrenzte mentale Kapazität. Stress, Unordnung, Multitasking und Überstimulation reduzieren deine Fähigkeit, klar zu denken. Fokus verbessert sich, wenn du unnötige mentale Belastung bewusst reduzierst.\n\nDeinen Geist zu schützen ist für nachhaltige Leistung unerlässlich. Mentale Klarheit ist eine Form von Reichtum.',

  'mindset.card.focus26.title': 'Fokus formt deine Zukunft.',
  'mindset.card.focus26.content':
    'Deine Zukunft wird nicht in dramatischen Momenten gebaut. Sie wird durch wiederholte Aufmerksamkeitsmomente aufgebaut. Jeden Tag bestimmt dein Fokus, was in deinem Leben stärker wird. Ablenkung schwächt still Potenzial, während Konzentration Fortschritt potenziert.\n\nDie Richtung deiner Aufmerksamkeit wird irgendwann zur Richtung deines Lebens.',

  'mindset.card.focus27.title': 'Die versteckten Kosten des Aufgabenwechsels.',
  'mindset.card.focus27.content':
    'Jedes Mal, wenn du zwischen Aufgaben springst, verschwendet dein Gehirn Energie dabei, sich neu zu orientieren. Selbst kurze Unterbrechungen reduzieren mentale Effizienz und erhöhen Ermüdung. Viele Menschen fühlen sich nicht erschöpft, weil sie hart gearbeitet haben, sondern weil sie ständig den Fokus gewechselt haben.\n\nKontinuität zu schützen ermöglicht dem Geist, auf einem viel höheren Niveau zu arbeiten. Tiefe Konzentration erfordert mentales Verankert-Bleiben.',

  'mindset.card.focus28.title': 'Fokus beginnt am Vorabend.',
  'mindset.card.focus28.content':
    'Ein abgelenkter Morgen wird oft durch einen unorganisierten Abend erzeugt. Deine Prioritäten am Vorabend vorzubereiten reduziert mentale Reibung, wenn der Tag beginnt. Dein Gehirn leistet besser, wenn es mit Klarheit aufwacht statt mit Ungewissheit.\n\nFokussierte Menschen reduzieren früh am Tag Entscheidungsfindung. Vorbereitung schafft reibungslosere Ausführung.',

  'mindset.card.focus29.title': 'Nicht alles verdient deine Reaktion.',
  'mindset.card.focus29.content':
    'Viele Ablenkungen treten in dein Leben verkleidet als Dringlichkeit ein. Nachrichten, Meinungen und Benachrichtigungen konkurrieren ständig um deine emotionale Aufmerksamkeit. Fokus wächst, wenn du aufhörst, sofort auf alles um dich herum zu reagieren.\n\nRuhige Geister wählen, wohin Aufmerksamkeit geht, statt externem Lärm die Kontrolle zu überlassen. Selektive Aufmerksamkeit schafft innere Stabilität.',

  'mindset.card.focus30.title': 'Fokus braucht auch emotionale Distanz.',
  'mindset.card.focus30.content':
    'Starke Emotionen können deine Aufmerksamkeit leicht von bedeutungsvoller Arbeit wegziehen. Angst, Frustration und Vergleich schaffen oft mentale Turbulenzen, die Konzentration schwächen. Fokus verbessert sich, wenn du lernst, Emotionen zu beobachten, ohne ihnen sofort zu gehorchen.\n\nEmotionale Selbstkontrolle schützt mentale Klarheit. Ein ruhiger Geist leistet besser unter Druck.',

  'mindset.card.focus31.title': 'Dein Gehirn liebt Neuheit — aber Wachstum liebt Wiederholung.',
  'mindset.card.focus31.content':
    'Das Gehirn sucht natürlich Stimulation, Abwechslung und Unterhaltung. Aber bedeutender Fortschritt kommt meist davon, wichtige Handlungen beständig über Zeit zu wiederholen. Fokussierte Menschen widerstehen der Versuchung konstanter Neuheit.\n\nSie verstehen, dass Wiederholung Fähigkeiten, Meisterschaft und Ergebnisse aufbaut. Beständigkeit fühlt sich oft langweilig an, bevor sie transformativ wird.',

  'mindset.card.focus32.title': 'Konzentration schafft inneren Frieden.',
  'mindset.card.focus32.content':
    'Ablenkung schafft inneres Chaos. Wenn dein Geist ständig zwischen Gedanken springt, wird es schwierig, sich ruhig oder präsent zu fühlen. Fokus vereinfacht mentale Aktivität und reduziert Überforderung.\n\nSich vollständig auf eine bedeutungsvolle Aufgabe einzulassen kann überraschenden emotionalen Frieden schaffen. Aufmerksamkeit und Stille sind tief miteinander verbunden.',

  'mindset.card.focus33.title': 'Digitaler Lärm schwächt mentale Stärke.',
  'mindset.card.focus33.content':
    'Konstante Exposition gegenüber schnellen Inhalten verkürzt über Zeit Aufmerksamkeitsspannen. Je mehr Stimulation dein Gehirn konsumiert, desto schwieriger wird es, bei langsameren, bedeutungsvollen Aufgaben fokussiert zu bleiben.\n\nFokussierte Menschen sind vorsichtig mit dem, was in ihren mentalen Raum eintritt. Deine Aufmerksamkeit zu schützen ähnelt dem Schutz deiner körperlichen Gesundheit. Was du mental konsumierst, formt deine kognitive Fähigkeit.',

  'mindset.card.focus34.title': 'Fokus entsteht auch durch Erholung.',
  'mindset.card.focus34.content':
    'Deine Fähigkeit zur Konzentration hängt stark von Erholung und Wiederherstellung ab. Chronische Erschöpfung schwächt Gedächtnis, Aufmerksamkeit und emotionale Kontrolle. Spitzenleister nehmen Erholung ernst, weil sie verstehen, dass mentale Schärfe Wartung erfordert.\n\nSchlaf, Stille, Bewegung und echte Ruhe schützen kognitive Leistung. Ein ausgebrannter Geist kann sich nicht tief konzentrieren.',

  'mindset.card.focus35.title': 'Der Geist folgt dem, was du übst.',
  'mindset.card.focus35.content':
    'Was du beständig übst, wird über Zeit leichter. Wenn du beständig Ablenkung übst, wird dein Gehirn trainiert, nachhaltige Aufmerksamkeit zu vermeiden. Aber wenn du beständig Konzentration übst, stärkt sich Fokus allmählich.\n\nMentale Gewohnheiten formen mentale Identität. Deine Aufmerksamkeitsmuster werden zu deinem Standardverhalten.',

  'mindset.card.focus36.title': 'Fokus bedeutet auch wiederholtes Nein-Sagen.',
  'mindset.card.focus36.content':
    'Konzentration geht nicht nur darum, was du bearbeitest — sie geht auch darum, abzulehnen, was nicht zählt. Jede unnötige Verpflichtung verbraucht mentale Energie. Fokussierte Menschen schützen ihre Prioritäten entschlossen.\n\nSie verstehen, dass Aufmerksamkeit begrenzt ist und nicht endlos geteilt werden kann. Klarheit erfordert Grenzen.',

  'mindset.card.focus37.title': 'Beginne, bevor du dich bereit fühlst.',
  'mindset.card.focus37.content':
    'Auf perfekte Motivation zu warten schafft oft endlose Verzögerung. Fokus wächst durch Handeln, nicht durch emotionale Bereitschaft. Sobald Bewegung beginnt, nimmt Widerstand meist natürlich ab.\n\nFokussierte Menschen trainieren sich, trotz Unbehagen zu beginnen. Schwung schafft mentales Engagement schneller als jedes Nachdenken.',

  'mindset.card.focus38.title': 'Mentale Einfachheit verbessert Ausführung.',
  'mindset.card.focus38.content':
    'Komplexität schafft oft Zögern und Verwirrung. Wenn Aufgaben zu kompliziert werden, sucht das Gehirn natürlich Flucht durch Ablenkung. Fokus verbessert sich, wenn Systeme, Ziele und Prioritäten einfacher und klarer werden.\n\nEinfachheit reduziert kognitive Überlastung. Klares Denken produziert sauberere Ausführung.',

  'mindset.card.focus39.title': 'Fokus stärkt Selbstvertrauen.',
  'mindset.card.focus39.content':
    'Jedes Mal, wenn du deine Verpflichtungen dir selbst gegenüber ehrst, wächst dein Selbstvertrauen. Beständige Konzentration baut Selbstvertrauen auf, weil sie beweist, dass du dich auf deine eigene Beständigkeit verlassen kannst.\n\nFokussierte Menschen verlassen sich nicht mehr vollständig auf Motivation. Sie vertrauen den Systemen und Gewohnheiten, die sie aufgebaut haben. Inneres Vertrauen schafft emotionale Stabilität.',

  'mindset.card.focus40.title': 'Oberflächliche Stimulation schafft tiefe Erschöpfung.',
  'mindset.card.focus40.content':
    'Endloses Scrollen mag entspannend erscheinen, aber Überstimulation erschöpft das Gehirn still. Konstante Neuheit zwingt dein Nervensystem in kontinuierlichen Verarbeitungsmodus. Viele Menschen verwechseln Stimulation mit Erholung.\n\nEchte Erholung kommt oft davon, zu verlangsamen, zu trennen und den Geist zu erholen. Mentale Stille stellt Energie wieder her.',

  'mindset.card.focus41.title': 'Fokus ist eine Form des Selbstrespekts.',
  'mindset.card.focus41.content':
    'Deine Aufmerksamkeit zu schützen bedeutet, deine Ziele, deine Zeit und deine Zukunft zu wertschätzen. Konstante Ablenkung spiegelt oft unbewusste Selbstvernachlässigung wider. Fokussierte Menschen verstehen, dass Aufmerksamkeit eine ihrer wertvollsten Ressourcen ist.\n\nKonzentration zu wählen bedeutet, persönliches Wachstum zu wählen. Deine Gewohnheiten zeigen, was du wirklich priorisierst.',

  'mindset.card.focus42.title': 'Das Gehirn braucht Raum zum Denken.',
  'mindset.card.focus42.content':
    'Kreativität und Einsicht erscheinen selten während konstanter Stimulation. Das Gehirn benötigt leeren Raum, um Informationen tief zu verarbeiten. Fokussierte Menschen schaffen bewusst Momente ohne Lärm, Inhalte oder Unterbrechung.\n\nStille ermöglicht tieferen Gedanken, natürlich aufzutauchen. Reflexion verbessert Klarheit.',

  'mindset.card.focus43.title': 'Kleine Gewinne stärken Fokus.',
  'mindset.card.focus43.content':
    'Große Ziele können einschüchternd wirken, was mentalen Widerstand erhöht. Kleine abgeschlossene Handlungen bauen Schwung auf und stärken Konzentration. Jede erledigte Aufgabe trainiert das Gehirn, Fokus mit Fortschritt zu verbinden.\n\nKleine Gewinne schaffen psychologische Energie. Beständigkeit wächst schneller durch handhabbare Handlungen.',

  'mindset.card.focus44.title': 'Fokus ist leichter, wenn dein Körper sich gut fühlt.',
  'mindset.card.focus44.content':
    'Körperliche Gesundheit beeinflusst stark mentale Klarheit. Schlechter Schlaf, Dehydrierung, Stress und Inaktivität schwächen Konzentration erheblich. Fokussierte Menschen verstehen, dass kognitive Leistung tief mit körperlichem Wohlbefinden verbunden ist.\n\nEnergiemanagement verbessert Aufmerksamkeit auf natürliche Weise. Ein gesünderer Körper unterstützt einen schärferen Geist.',

  'mindset.card.focus45.title': 'Überlastete Geister meiden wichtige Arbeit.',
  'mindset.card.focus45.content':
    'Wenn sich dein Gehirn überfordert fühlt, sucht es natürlich leichtere Stimulation. Deshalb erhöht Stress oft Aufschieben. Fokus verbessert sich, wenn du unnötigen mentalen Lärm reduzierst und deine Prioritäten klar organisierst.\n\nRuhige Systeme schaffen ruhigeres Denken. Mentale Organisation reduziert Widerstand.',

  'mindset.card.focus46.title': 'Fokus wächst durch Wiederholung, nicht Perfektion.',
  'mindset.card.focus46.content':
    'Viele Menschen geben Fokus-Routinen auf, weil sie sofortige Perfektion erwarten. Aber Konzentration entwickelt sich allmählich durch wiederholte Bemühung. Manche Tage werden sich leichter anfühlen als andere.\n\nWas am meisten zählt, ist beständig zur Praxis der Aufmerksamkeit zurückzukehren. Fortschritt summiert sich still über Zeit.',

  'mindset.card.focus47.title': 'Schütze deine mentalen Spitzenstunden.',
  'mindset.card.focus47.content':
    'Jedes Gehirn hat Perioden höchster kognitiver Energie im Laufe des Tages. Fokussierte Menschen erkennen, wann sie am klarsten denken, und schützen diese Stunden sorgfältig. Wichtige Arbeit sollte während Perioden stärkster Aufmerksamkeit stattfinden.\n\nAblenku­ngen mit geringem Wert sollten deinen mentalen Spitzenzustand nicht verbrauchen. Strategisches Timing verbessert Leistung dramatisch.',

  'mindset.card.focus48.title': 'Innerer Lärm ist auch eine Ablenkung.',
  'mindset.card.focus48.content':
    'Ablenkung kommt nicht immer von außen. Sorgen, Selbstzweifel und Grübeln können Konzentration genauso stark unterbrechen wie Benachrichtigungen. Fokus verbessert sich, wenn du lernst, inneres mentales Geschwätz zu beruhigen.\n\nEmotionales Bewusstsein stärkt kognitive Kontrolle. Ein friedlicher Geist hält tiefere Aufmerksamkeit aufrecht.',

  'mindset.card.focus49.title': 'Dein Fokus bestimmt deine Ergebnisqualität.',
  'mindset.card.focus49.content':
    'Die Qualität deiner Aufmerksamkeit formt die Qualität deiner Arbeit. Gehetzt, abgelenkte Bemühung produziert in der Regel mittelmäßige Ergebnisse. Tiefer Fokus verbessert Kreativität, Präzision und Problemlösungsfähigkeit.\n\nFokussierte Menschen verstehen, dass Exzellenz Präsenz erfordert. Bessere Aufmerksamkeit schafft bessere Ergebnisse.',

  'mindset.card.focus50.title': 'Beständigkeit schlägt Intensität.',
  'mindset.card.focus50.content':
    'Extreme Bemühungsschübe schaffen selten nachhaltigen Fortschritt. Fokussierte Menschen priorisieren Beständigkeit über vorübergehende Motivation. Kleine tägliche Konzentrationssitzungen schaffen stärkere langfristige Ergebnisse als gelegentliche intensive Arbeitssitzungen.\n\nWiederholung baut Schwung. Nachhaltiger Fokus gewinnt über Zeit.',

  'mindset.card.focus51.title': 'Die Fähigkeit zu ignorieren ist eine Kraft.',
  'mindset.card.focus51.content':
    'Das moderne Leben verlangt ständig deine Aufmerksamkeit. Fokussierte Menschen entwickeln die Fähigkeit, bewusst zu ignorieren, was ihren Prioritäten nicht dient. Nicht jeder Trend, jedes Gespräch oder jede Ablenkung verdient mentale Energie.\n\nSelektive Ignoranz schützt Konzentration. Aufmerksamkeit wird stärker, wenn sie bewusst gelenkt wird.',

  'mindset.card.focus52.title': 'Chaotische Eingaben schaffen chaotisches Denken.',
  'mindset.card.focus52.content':
    'Dein mentaler Zustand wird stark von dem beeinflusst, was du täglich konsumierst. Übermäßige Informationsflut macht es schwieriger, klar zu denken und effektiv zu priorisieren. Fokus verbessert sich, wenn du unnötige Eingaben reduzierst.\n\nEine sauberere mentale Umgebung unterstützt schärferes Denken. Einfachheit verbessert Kognition.',

  'mindset.card.focus53.title': 'Fokus baut Schwung schneller als Motivation.',
  'mindset.card.focus53.content':
    'Motivation schwankt ständig, aber fokussiertes Handeln schafft seine eigene Energie. Sobald Konzentration beginnt, wird das Gehirn oft natürlicher engagiert. Endlos auf Inspiration zu warten verzögert Fortschritt.\n\nFokussierte Menschen verlassen sich auf Struktur und Handeln statt auf emotionale Stimmung. Bewegung schafft Schwung.',

  'mindset.card.focus54.title': 'Ruhige Ausführung übertrifft Chaos.',
  'mindset.card.focus54.content':
    'Stressige Dringlichkeit schafft oft unscharfes Denken und emotionale Erschöpfung. Ruhige, fokussierte Ausführung produziert nachhaltigere Leistung. Spitzenleister lernen, mit Gleichmäßigkeit statt Panik zu arbeiten.\n\nMentale Gelassenheit schützt Entscheidungsfähigkeit. Fokus gedeiht in emotionaler Stabilität.',

  'mindset.card.focus55.title': 'Jede Ablenkung hat Opportunitätskosten.',
  'mindset.card.focus55.content':
    'Wenn du Fokus verlierst, verlierst du nicht nur Zeit — du verlierst potenzielle Fortschritte, Kreativität und mentale Energie. Kleine täglich wiederholte Ablenkungen summieren sich über Zeit zu massiven verpassten Gelegenheiten.\n\nFokussierte Menschen erkennen den wahren Wert ununterbrocheher Aufmerksamkeit. Konzentration zu schützen schützt Wachstum.',

  'mindset.card.focus56.title': 'Aufmerksamkeit formt Identität.',
  'mindset.card.focus56.content':
    'Worauf du dich beständig konzentrierst, formt langsam, wie du denkst, fühlst und verhältst. Aufmerksamkeit ist nicht neutral — sie verstärkt Muster im Geist. Fokussierte Menschen lenken ihre Aufmerksamkeit bewusst auf Wachstum und bedeutungsvolle Ziele.\n\nDein Fokus beeinflusst, wer du wirst. Aufmerksamkeit formt Identität.',

  'mindset.card.focus57.title': 'Ein fokussiertes Leben fühlt sich bewusster an.',
  'mindset.card.focus57.content':
    'Wenn Aufmerksamkeit ständig zerstreut ist, fühlt sich das Leben reaktiv und chaotisch an. Fokus schafft ein stärkeres Gefühl von Richtung und innerem Steuer. Bewusste Aufmerksamkeit ermöglicht es dir, das Leben tiefer zu erleben statt unbewusst durchzueilen.\n\nFokus geht nicht nur um Produktivität — er geht darum, mit Bewusstsein zu leben. Ein fokussierter Geist schafft ein bedeutungsvolleres Leben.',

  // ── Mindset Clarity (detox) cards — Deutsch ────────────────────────────────────
  'mindset.card.detox1.title':  'Deine Aufmerksamkeit ist wertvoll. Behandle sie so.',
  'mindset.card.detox1.content':
    'Jede App, Benachrichtigung und Plattform ist darauf ausgelegt, dich so lange wie möglich zu binden. Ein digitaler Detox beginnt, wenn du erkennst, dass deine Aufmerksamkeit wertvoll ist und ständig umkämpft wird.\n\nDeine Aufmerksamkeit zu schützen bedeutet, deine mentale Energie zu schützen. Bewusstsein schafft gesündere digitale Gewohnheiten.',

  'mindset.card.detox2.title':  'Dauerstimulation erschöpft auch.',
  'mindset.card.detox2.content':
    'Das Gehirn wurde nicht darauf ausgelegt, endlose Informationsströme ohne Pause zu verarbeiten. Permanentes Scrollen, Benachrichtigungen und digitaler Lärm überlasten das Nervensystem still.\n\nMentale Erschöpfung kommt oft von Überstimulation, nicht von Faulheit. Stille stellt kognitive Klarheit wieder her.',

  'mindset.card.detox3.title':  'Langeweile kann eine Tür sein.',
  'mindset.card.detox3.content':
    'Viele Menschen greifen sofort zum Handy, sobald Stille entsteht. Doch Langeweile kann zur Tür für Kreativität, Reflexion und emotionalen Reset werden.\n\nDigitaler Detox bedeutet, dem Gehirn wieder stille Momente zu erlauben. Stille stärkt Aufmerksamkeit und Vorstellungskraft.',

  'mindset.card.detox4.title':  'Technologie, die kontrolliert, dient nicht mehr.',
  'mindset.card.detox4.content':
    'Technologie wird ungesund, wenn sie dein Verhalten automatisch steuert. Digitaler Detox beginnt, wenn du bewusst entscheidest, wie und wann Technologie deinem Leben dient.\n\nBewusste Nutzung schafft Freiheit. Automatische Nutzung schafft Abhängigkeit.',

  'mindset.card.detox5.title':  'Jede Benachrichtigung unterbricht den Gedankenfluss.',
  'mindset.card.detox5.content':
    'Jede Benachrichtigung unterbricht den mentalen Fluss und schwächt Konzentration. Selbst kurze Ablenkungen schaffen versteckte Erholungszeit für das Gehirn.\n\nDigitaler Detox beginnt oft damit, unnötige Alerts und Unterbrechungen zu reduzieren. Fokus zu schützen verbessert mentale Klarheit.',

  'mindset.card.detox6.title':  'Scrollen ist nicht immer Erholung.',
  'mindset.card.detox6.content':
    'Viele Menschen verwechseln endloses Scrollen mit Entspannung, aber Überstimulation kann den Geist erschöpfter zurücklassen als zuvor. Echte Erholung erfordert oft Stille, Bewegung, Natur oder wirkliche Präsenz.\n\nDigitaler Detox hilft dem Nervensystem, wieder zu verlangsamen.',

  'mindset.card.detox7.title':  'Was du konsumierst, formt auch dich.',
  'mindset.card.detox7.content':
    'Konstante Kurzform-Inhalte trainieren das Gehirn, schnelle Stimulation zu suchen, und schwächen anhaltende Aufmerksamkeit. Digitaler Detox hilft, Geduld, Fokus und tieferes Denken wieder aufzubauen.\n\nWas du beständig konsumierst, formt deine kognitiven Gewohnheiten über Zeit.',

  'mindset.card.detox8.title':  'Präsenz ist wertvoller als ständige Verbundenheit.',
  'mindset.card.detox8.content':
    'Ständig digital verbunden zu sein trennt Menschen oft emotional von echten Erlebnissen. Digitaler Detox schafft Raum, mit Gesprächen, Umgebungen und Momenten tiefer in Kontakt zu kommen.\n\nPräsenz stärkt emotionales Wohlbefinden.',

  'mindset.card.detox9.title':  'Mentale Klarheit braucht Stille.',
  'mindset.card.detox9.content':
    'Das Gehirn braucht Perioden ohne konstante Eingabe, um Emotionen und Gedanken richtig zu verarbeiten. Endlose Stimulation erzeugt mentalen Lärm. Digitaler Detox gibt dem Geist wieder Raum zum Atmen.\n\nRuhe unterstützt emotionale Balance.',

  'mindset.card.detox10.title': 'Du musst nicht immer und über alles auf dem Laufenden sein.',
  'mindset.card.detox10.content':
    'Die moderne Kultur erzeugt oft Druck, immer informiert, unterhalten oder vernetzt zu bleiben. Doch ständiger Konsum überwältigt das Gehirn über Zeit. Digitaler Detox lehrt den Wert bewusster Informationsaufnahme.\n\nMentaler Frieden wächst durch Mäßigung.',

  'mindset.card.detox11.title': 'Deine Aufmerksamkeitsspanne kann sich erholen.',
  'mindset.card.detox11.content':
    'Konzentrationsschwierigkeiten werden oft durch wiederholte digitale Überstimulation verstärkt. Digitaler Detox hilft, das Gehirn wieder zu trainieren, tiefere Konzentration zu tolerieren.\n\nAufmerksamkeit ist trainierbar. Fokus verbessert sich durch bewusste Übung.',

  'mindset.card.detox12.title': 'Social Media zeigt Highlights — nicht das ganze Leben.',
  'mindset.card.detox12.content':
    'Konstante Exposition gegenüber kuratierten Online-Leben erzeugt oft ungesunden Vergleich und emotionale Unzufriedenheit. Digitaler Detox hilft, dich wieder mit der Realität statt mit Illusionen zu verbinden.\n\nDie meisten Menschen verstecken ihre Schwierigkeiten online. Perspektive schützt emotionale Gesundheit.',

  'mindset.card.detox13.title': 'Du musst nicht für alle ständig erreichbar sein.',
  'mindset.card.detox13.content':
    'Der Druck, auf jede Nachricht sofort zu antworten, schafft emotionale Spannung und mentale Erschöpfung. Digitaler Detox beinhaltet, gesündere Grenzen rund um Kommunikation zu schaffen.\n\nDu musst nicht ständig für alle zugänglich sein.',

  'mindset.card.detox14.title': 'Echte Erholung braucht manchmal Trennung.',
  'mindset.card.detox14.content':
    'Das Nervensystem hat Schwierigkeiten, sich vollständig zu entspannen, wenn es ständig digitale Stimulation verarbeitet. Digitaler Detox ermöglicht tiefere mentale Erholung durch vorübergehende Reduzierung von Eingaben.\n\nTrennen stellt emotionale Energie wieder her. Echte Erholung verbessert kognitive Leistung.',

  'mindset.card.detox15.title': 'Technologie sollte dein Leben unterstützen — nicht ersetzen.',
  'mindset.card.detox15.content':
    'Digitale Werkzeuge können das Leben deutlich verbessern, wenn sie bewusst genutzt werden. Probleme beginnen, wenn Technologie bedeutungsvolle Erfahrungen, Beziehungen und Selbstbewusstsein ersetzt.\n\nDigitaler Detox schafft eine gesündere Balance zwischen Online- und Offline-Leben.',

  'mindset.card.detox16.title': 'Endloses Scrollen vermeidet manchmal tiefere Gefühle.',
  'mindset.card.detox16.content':
    'Viele Menschen nutzen konstante Stimulation, um Einsamkeit, Stress, Angst oder emotionales Unbehagen vorübergehend zu vermeiden. Digitaler Detox hilft, Bewusstsein für emotionale Vermeidungsmuster zu schaffen.\n\nStille offenbart oft, was Ablenkung verborgen hat.',

  'mindset.card.detox17.title': 'Der Geist braucht Raum, um eigenständig zu denken.',
  'mindset.card.detox17.content':
    'Konstanter Inhaltskonsum lässt wenig Raum für ursprüngliche Gedanken oder Reflexion. Digitaler Detox schafft mentalen Raum für tieferes Denken, Kreativität und persönliche Einsicht.\n\nStille unterstützt unabhängiges Denken.',

  'mindset.card.detox18.title': 'Dopamin-Überflutung schwächt die Freude am Alltag.',
  'mindset.card.detox18.content':
    'Schnelle digitale Stimulation löst ständig Dopaminreaktionen im Gehirn aus. Mit der Zeit kann das gewöhnliche Leben weniger interessant oder emotional befriedigend erscheinen. Digitaler Detox hilft, die Wertschätzung für langsamere und einfachere Erfahrungen wiederherzustellen.',

  'mindset.card.detox19.title': 'Nicht alles verdient unbegrenzten Zugang zu deiner Aufmerksamkeit.',
  'mindset.card.detox19.content':
    'Nicht jedes Gespräch, jede App oder jede Online-Umgebung verdient unbegrenzten Zugang zu deiner Aufmerksamkeit und deinen Emotionen. Digitaler Detox beinhaltet, bewusster zu werden, was in deinen mentalen Raum eintritt.\n\nGrenzen reduzieren Überforderung.',

  'mindset.card.detox20.title': 'Präsenz ist auch eine Form des Füreinander-Daseins.',
  'mindset.card.detox20.content':
    'Körperlich anwesend, aber mental in Bildschirmen versunken zu sein, schwächt Verbindung und Kommunikation. Digitaler Detox stärkt emotionale Präsenz mit anderen Menschen.\n\nEchte Aufmerksamkeit vertieft Beziehungen. Präsenz schafft stärkere Erinnerungen.',

  'mindset.card.detox21.title': 'Stille ist gut für das Gehirn.',
  'mindset.card.detox21.content':
    'Das Gehirn braucht Momente ohne Stimulation, um sich emotional und kognitiv zu erholen. Digitaler Detox hilft, Stille wieder in den Alltag einzubringen. Ruhige Umgebungen reduzieren Stress und verbessern Fokus.\n\nStille stellt mentale Energie wieder her.',

  'mindset.card.detox22.title': 'Dauerstimulation kann auch emotional abstumpfen.',
  'mindset.card.detox22.content':
    'Wenn das Gehirn nonstop Stimulation erhält, wird die emotionale Verarbeitung oft schwächer oder verzögert. Digitaler Detox ermöglicht, dass Emotionen wieder natürlicher auftauchen.\n\nEmotionales Bewusstsein verbessert sich durch reduzierte Überstimulation.',

  'mindset.card.detox23.title': 'Wie du den Morgen beginnst, formt den Tag.',
  'mindset.card.detox23.content':
    'Den Tag sofort mit Social Media oder Benachrichtigungen zu beginnen versetzt das Gehirn oft in reaktiven Modus. Digitale Detox-Gewohnheiten am Morgen schaffen mehr Ruhe, Fokus und emotionale Stabilität für den ganzen Tag.\n\nDeine Morgen zu schützen bedeutet, dein Mindset zu schützen.',

  'mindset.card.detox24.title': 'Das Leben passiert auch abseits des Bildschirms.',
  'mindset.card.detox24.content':
    'Wichtige Momente werden oft verpasst, wenn die Aufmerksamkeit ständig in Bildschirmen gefangen bleibt. Digitaler Detox hilft dir, wieder mit körperlichen Erfahrungen, Natur, Bewegung, Gesprächen und echter Präsenz in Berührung zu kommen.\n\nLeben existiert jenseits digitaler Stimulation.',

  'mindset.card.detox25.title': 'Ein überlasteter Geist hat weniger Raum zum Erschaffen.',
  'mindset.card.detox25.content':
    'Das Gehirn hat Schwierigkeiten, kreativ zu denken, wenn es ständig mit Informationen überlastet ist. Digitaler Detox schafft mentalen Atemraum für Vorstellungskraft und tieferes Denken.\n\nKreativität wächst in ruhigeren mentalen Umgebungen.',

  'mindset.card.detox26.title': 'Deine Beziehung zur Technologie kann sich verändern.',
  'mindset.card.detox26.content':
    'Digitale Gewohnheiten sind erlernte Verhaltensweisen, keine dauerhaften Eigenschaften. Digitaler Detox beginnt mit bewussten kleinen Veränderungen, die über Zeit beständig wiederholt werden.\n\nBewusstsein schafft gesündere Entscheidungen. Veränderung ist allmählich möglich.',

  'mindset.card.detox27.title': 'Langsamer zu leben kann sich zunächst fremd anfühlen.',
  'mindset.card.detox27.content':
    'Menschen, die an konstante Stimulation gewöhnt sind, können sich in Detox-Perioden anfangs unruhig fühlen. Dieses Unbehagen ist oft vorübergehend. Das Nervensystem passt sich allmählich wieder an langsamere Rhythmen an.\n\nRuhe stärkt sich über Zeit.',

  'mindset.card.detox28.title': 'Deine Aufmerksamkeit verdient Pflege.',
  'mindset.card.detox28.content':
    'Aufmerksamkeit ist eine deiner wertvollsten inneren Ressourcen. Digitale Ablenkungen schwächen still Konzentration, Produktivität und emotionale Präsenz. Digitaler Detox stärkt die Fähigkeit, wieder bewusst zu fokussieren.\n\nAufmerksamkeit zu schützen schützt Lebensqualität.',

  'mindset.card.detox29.title': 'Nicht jeder Moment muss festgehalten werden.',
  'mindset.card.detox29.content':
    'Erfahrungen ständig aufzuzeichnen kann deine Fähigkeit verringern, sie emotional vollständig zu erleben. Digitaler Detox ermutigt dazu, Momente direkt zu erleben statt das Leben immer durch Bildschirme zu betrachten.\n\nPräsenz schafft reichhaltigere Erinnerungen.',

  'mindset.card.detox30.title': 'Digitalen Überfluss loszulassen schafft innere Freiheit.',
  'mindset.card.detox30.content':
    'Ungesunde digitale Abhängigkeit zu reduzieren schafft emotionale Leichtigkeit, stärkeren Fokus und tiefere Präsenz im Alltag. Digitaler Detox bedeutet nicht, Technologie vollständig abzulehnen — es bedeutet, bewusste Kontrolle über Aufmerksamkeit und mentales Wohlbefinden zurückzugewinnen.',

  'mindset.card.detox31.title': 'Ständig verbunden zu sein bedeutet nicht, wirklich zu verbinden.',
  'mindset.card.detox31.content':
    'Den ganzen Tag online zu sein kann dennoch emotional isoliert und einsam lassen. Digitaler Detox hilft, durch echte Präsenz und bedeutungsvolle Gespräche tiefere Beziehungen zu schaffen.\n\nEchte Verbindung erfordert Aufmerksamkeit, nicht nur Zugang.',

  'mindset.card.detox32.title': 'Das Gehirn wurde nicht für endloses Scrollen gemacht.',
  'mindset.card.detox32.content':
    'Der menschliche Geist sucht natürlich Stimulation, und endlose Feeds nutzen diesen Instinkt kontinuierlich aus. Digitaler Detox beginnt, wenn du erkennst, dass unendliche Inhalte das Gehirn oft mental überlastet statt erfüllt zurücklassen.\n\nBewusstsein schafft gesündere digitale Entscheidungen.',

  'mindset.card.detox33.title': 'Digitaler Lärm erschöpft auch unbemerkt.',
  'mindset.card.detox33.content':
    'Konstante Benachrichtigungen, Videos, Updates und Nachrichten erschöpfen still kognitive Energie durch den ganzen Tag. Selbst wenn du es nicht bewusst bemerkst, verarbeitet das Gehirn weiterhin Stimulation.\n\nDigitaler Detox reduziert mentale Erschöpfung durch Verringerung unnötiger Eingaben.',

  'mindset.card.detox34.title': 'Du musst nicht sofort auf alles antworten.',
  'mindset.card.detox34.content':
    'Moderne Technologie schafft unrealistische Erwartungen ständiger Verfügbarkeit. Digitaler Detox beinhaltet zu lernen, dass verzögerte Antworten dich nicht unverantwortlich oder gleichgültig machen.\n\nGrenzen schützen emotionale Energie und reduzieren Stress.',

  'mindset.card.detox35.title': 'Zu viele Informationen führen auch zu Entscheidungserschöpfung.',
  'mindset.card.detox35.content':
    'Das Gehirn wird überfordert, wenn es ständig übermäßige Inhalte und Entscheidungen verarbeitet. Digitaler Detox hilft, mentalen Lärm zu reduzieren und Klarheit zu verbessern. Einfachere Eingaben unterstützen ruhigeres Denken.\n\nWeniger Information kann manchmal zu besseren Entscheidungen führen.',

  'mindset.card.detox36.title': 'Der Geist braucht auch ungestörte Momente.',
  'mindset.card.detox36.content':
    'Konstante Unterbrechungen schwächen tiefes Denken und emotionale Präsenz. Digitaler Detox schafft Raum für ungestörte Konzentration, Reflexion und Ruhe.\n\nMentale Klarheit verbessert sich, wenn das Gehirn erlaubt wird, länger fokussiert zu bleiben.',

  'mindset.card.detox37.title': 'Dopaminsucht lässt das Gewöhnliche kleiner erscheinen.',
  'mindset.card.detox37.content':
    'Schnelle digitale Stimulation kann allmählich die Wertschätzung für langsamere reale Erfahrungen verringern. Digitaler Detox hilft, Freude an einfachen Momenten wie Gesprächen, Natur, Lesen, Bewegung und Stille wiederherzustellen.\n\nBalance baut emotionale Sensibilität wieder auf.',

  'mindset.card.detox38.title': 'Social Media verzerrt oft die Realität.',
  'mindset.card.detox38.content':
    'Online-Plattformen zeigen häufig bearbeitete, gefilterte und sorgfältig ausgewählte Momente statt vollständiger menschlicher Erfahrungen. Digitaler Detox hilft, unrealistischen Vergleich und emotionalen Druck zu reduzieren.\n\nDas echte Leben ist ausgewogener und komplexer als Online-Auftritte suggerieren.',

  'mindset.card.detox39.title': 'Du denkst klarer mit weniger Eingaben.',
  'mindset.card.detox39.content':
    'Wenn das Gehirn ständig Informationen konsumiert, bleibt wenig Zeit für Reflexion. Digitaler Detox schafft mentalen Raum für tieferes Denken und Selbstbewusstsein.\n\nStille verbessert Klarheit. Reflexion stärkt emotionale Intelligenz.',

  'mindset.card.detox40.title': 'Digitaler Detox ist Absicht — keine Extreme.',
  'mindset.card.detox40.content':
    'Gesunde digitale Gewohnheiten erfordern nicht unbedingt, Technologie vollständig aufzugeben. Das Ziel ist, Technologie bewusst statt zwanghaft zu nutzen. Balance schafft Nachhaltigkeit.\n\nBewusstsein schafft Freiheit.',

  'mindset.card.detox41.title': 'Was du aufmerksam beobachtest, formt langsam, wer du bist.',
  'mindset.card.detox41.content':
    'Was beständig deine Aufmerksamkeit einfängt, formt langsam deine Emotionen, Fokus und Identität. Digitaler Detox stärkt bewusste Aufmerksamkeit statt automatischer Ablenkung.\n\nBewusste Aufmerksamkeit schafft bedeutungsvollere Erfahrungen.',

  'mindset.card.detox42.title': 'Dass sich Stille zunächst ungewohnt anfühlt, ist normal.',
  'mindset.card.detox42.content':
    'Das Gehirn kann sich anfangs ohne konstante Stimulation unwohl fühlen, weil es sich an schnelle Dopaminzyklen gewöhnt hat. Digitaler Detox fühlt sich oft seltsam an, bevor er friedlich wirkt.\n\nNervensysteme brauchen Zeit zur Anpassung. Ruhe stärkt sich allmählich.',

  'mindset.card.detox43.title': 'Dein Schlaf hängt auch davon ab, wann du den Bildschirm loslässt.',
  'mindset.card.detox43.content':
    'Bildschirmexposition am späten Abend überstimuliert das Gehirn und stört gesunde Schlafmuster. Digitaler Detox vor dem Schlafengehen verbessert Erholung, emotionale Regulation und kognitive Leistung.\n\nBesserer Schlaf stärkt mentale Klarheit.',

  'mindset.card.detox44.title': 'Weniger digitale Ablenkung bedeutet auch mehr echten Fortschritt.',
  'mindset.card.detox44.content':
    'Ständige Überprüfungsgewohnheiten schwächen Konzentration und reduzieren Effizienz erheblich. Digitaler Detox stärkt Fokus durch Reduzierung mentaler Fragmentierung.\n\nGeschützte Aufmerksamkeit schafft stärkere Produktivität und qualitativ bessere Arbeit.',

  'mindset.card.detox45.title': 'Inhalte konsumieren ist nicht dasselbe wie wirklich auszuruhen.',
  'mindset.card.detox45.content':
    'Viele Menschen konsumieren Inhalte endlos und fühlen sich danach dennoch emotional erschöpft. Digitaler Detox hilft, echte Erholung von Überstimulation, die als Entspannung getarnt ist, zu unterscheiden.\n\nEchte Erholung lässt das Nervensystem ruhiger, nicht überlastet zurück.',

  'mindset.card.detox46.title': 'Der Geist braucht auch manchmal leere Momente.',
  'mindset.card.detox46.content':
    'Kreativität, emotionale Verarbeitung und Einsicht erscheinen oft in stillen Momenten ohne Stimulation. Digitaler Detox schafft mentalen Atemraum. Leerer Raum ist kein verschwendeter Raum.\n\nStille unterstützt Kreativität.',

  'mindset.card.detox47.title': 'Technologie kann auch unbemerkt Angst steigern.',
  'mindset.card.detox47.content':
    'Konstante Exposition gegenüber Informationen, Vergleichen, Dringlichkeit und Benachrichtigungen hält viele Nervensysteme emotional aktiviert. Digitaler Detox hilft, Hintergrundstress und emotionale Überstimulation zu reduzieren.\n\nRuhige Umgebungen unterstützen emotionale Stabilität.',

  'mindset.card.detox48.title': 'Du musst nicht jeden Trend mitverfolgen.',
  'mindset.card.detox48.content':
    'Das Internet erzeugt ständig Druck, über alles überall auf dem Laufenden zu bleiben. Digitaler Detox beinhaltet zu erkennen, dass nicht jeder Trend, jede Debatte oder jede Information deine Aufmerksamkeit verdient.\n\nSelektiver Konsum schützt inneren Frieden.',

  'mindset.card.detox49.title': 'Offline-Momente stärken das Wissen um dich selbst.',
  'mindset.card.detox49.content':
    'Ohne konstante digitale Ablenkung werden Gedanken und Emotionen leichter klar wahrnehmbar. Digitaler Detox schafft Gelegenheiten für tiefere Selbstreflexion.\n\nBewusstsein verbessert emotionale Regulation und Klarheit.',

  'mindset.card.detox50.title': 'Technologie sollte dem Leben echten Wert hinzufügen.',
  'mindset.card.detox50.content':
    'Digitale Werkzeuge werden am gesündesten, wenn sie Lernen, Kreativität, Verbindung oder bedeutungsvolle Arbeit bewusst unterstützen. Digitaler Detox bedeutet, ungesunden Überfluss zu entfernen und nützlichen Zweck zu bewahren.\n\nBewusste Nutzung schafft Balance.',

  'mindset.card.detox51.title': 'Ständiges Scrollen schwächt auch Präsenz.',
  'mindset.card.detox51.content':
    'Viele Menschen existieren körperlich an einem Ort, während sie mental woanders digital absorbiert sind. Digitaler Detox stärkt die Fähigkeit, Gespräche, Mahlzeiten, Natur und gewöhnliche Momente vollständig zu erleben.\n\nPräsenz verbessert emotisches Wohlbefinden.',

  'mindset.card.detox52.title': 'Dein Nervensystem registriert mehr als du weißt.',
  'mindset.card.detox52.content':
    'Auch wenn du dich emotional an konstante Stimulation „gewöhnt" fühlst, erlebt das Nervensystem weiterhin Stress durch nonstop Eingaben. Digitaler Detox gibt Gehirn und Körper Gelegenheit, sich wieder natürlicher zu regulieren.\n\nErholung unterstützt Resilienz.',

  'mindset.card.detox53.title': 'Aufmerksamkeit erholt sich langsam — und das ist auch gut so.',
  'mindset.card.detox53.content':
    'Die Erholung der Aufmerksamkeitsspanne geschieht nicht sofort. Das Gehirn lernt langsam wieder, tiefere Konzentration nach Perioden der Überstimulation zu tolerieren. Beständige digitale Grenzen stärken Fokus über Zeit.\n\nGeduld ist während des Prozesses wichtig.',

  'mindset.card.detox54.title': 'Weniger Bildschirmzeit schafft oft mehr inneren Raum.',
  'mindset.card.detox54.content':
    'Unnötige digitale Stimulation zu reduzieren kann spürbare Verbesserungen in Ruhe, Klarheit und emotionaler Stabilität bringen. Digitaler Detox lässt den Geist innerlich weniger überfüllt fühlen.\n\nEinfachheit unterstützt Frieden.',

  'mindset.card.detox55.title': 'Du brauchst nicht ständig Unterhaltung.',
  'mindset.card.detox55.content':
    'Die moderne Kultur lehrt Menschen oft, Stille, Ruhe und Langeweile kontinuierlich zu vermeiden. Digitaler Detox hilft, Komfort mit langsameren Momenten wieder aufzubauen.\n\nStille ist keine Leere — sie ist Erholung für den Geist.',

  'mindset.card.detox56.title': 'Die Menschen, die du liebst, verdienen auch deine volle Aufmerksamkeit.',
  'mindset.card.detox56.content':
    'Geteilte Aufmerksamkeit schwächt emotionale Verbindung über Zeit. Digitaler Detox stärkt Kommunikation, indem er tieferes Zuhören und Präsenz mit anderen ermutigt.\n\nAufmerksamkeit kommuniziert Fürsorge mächtiger als ständige digitale Verfügbarkeit.',

  'mindset.card.detox57.title': 'Langsamer werden gibt auch die Wahrnehmung zurück.',
  'mindset.card.detox57.content':
    'Digitale Überstimulation hält Menschen oft mental gehetzt und emotional getrennt. Digitaler Detox verlangsamt das innere Tempo und verbessert das Bewusstsein für Gedanken, Gefühle und Umgebung.\n\nLangsamere Aufmerksamkeit schafft tiefere Erfahrungen.',

  'mindset.card.detox58.title': 'Weniger Lärm gibt auch emotionale Sensibilität zurück.',
  'mindset.card.detox58.content':
    'Übermäßige Stimulation kann emotionales Bewusstsein allmählich abstumpfen. Digitale Überlastung zu reduzieren ermöglicht, dass Emotionen wieder klarer und natürlicher wahrgenommen werden.\n\nEmotionale Verbindung stärkt sich, wenn der Geist weniger überstimuliert ist.',

  'mindset.card.detox59.title': 'Deine Zeit ist wertvoller als endloses Scrollen.',
  'mindset.card.detox59.content':
    'Stunden verschwinden schnell in unbewussten digitalen Gewohnheiten. Digitaler Detox schafft Bewusstsein dafür, wie Aufmerksamkeit und Zeit täglich verwendet werden.\n\nBewusste Zeitnutzung schafft bedeutungsvolleres Leben.',

  'mindset.card.detox60.title': 'Innerer Frieden braucht manchmal weniger Stimulation.',
  'mindset.card.detox60.content':
    'Das Gehirn funktioniert oft am besten mit weniger Unterbrechungen, ruhigeren Umgebungen und bewussterer Aufmerksamkeit. Digitaler Detox schafft Bedingungen, unter denen emotionale Ruhe leichter aufrechtzuerhalten ist.\n\nEinfachheit schützt mentale Gesundheit.',

  'mindset.card.detox61.title': 'Deine Aufmerksamkeit zurückzugewinnen verändert auch dein Leben.',
  'mindset.card.detox61.content':
    'Aufmerksamkeit beeinflusst Produktivität, emotisches Wohlbefinden, Beziehungen, Kreativität und allgemeine Lebensqualität. Digitaler Detox bedeutet letztlich, bewusste Kontrolle darüber zurückzugewinnen, wohin deine Energie täglich geht.\n\nWas du beständig mit Aufmerksamkeit schenkst, formt deine Zukunft.',

  // ── Mindset Calm/Rest (emo) cards emo3–emo60 — Deutsch ─────────────────────────
  'mindset.card.emo3.title':  'Deine Gefühle sind Signale — keine Feinde.',
  'mindset.card.emo3.content':
    'Emotionen sind keine Probleme, die beseitigt werden müssen. Sie sind Informationen über dein inneres Erleben. Heilung beginnt, wenn du aufhörst, gegen jedes Gefühl zu kämpfen, und anfängst, mit Bewusstsein zuzuhören.\n\nTrauer, Frustration, Angst und Überforderung zeigen oft unerfüllte Bedürfnisse oder ungelöste Spannungen. Bewusstsein schafft Heilung.',

  'mindset.card.emo4.title':  'Nicht jeder Gedanke verdient deinen Glauben.',
  'mindset.card.emo4.content':
    'Der Geist produziert täglich tausende von Gedanken, viele davon getrieben von Stress, Angst oder Unsicherheit. Emotionaler Neustart erfordert zu lernen, Gedanken zu beobachten, ohne sie automatisch als Wahrheit zu akzeptieren.\n\nGedanken sind vorübergehende mentale Ereignisse, keine absolute Realität. Distanz schafft Klarheit.',

  'mindset.card.emo5.title':  'Heilung braucht Stille.',
  'mindset.card.emo5.content':
    'Viele Menschen vermeiden emotionales Unbehagen, indem sie endlos beschäftigt oder überstimuliert bleiben. Aber ungelöste Emotionen bleiben oft unter der Ablenkung bestehen.\n\nEmotionaler Neustart erfordert Momente der Stille und Ehrlichkeit. Heilung beginnt meist, wenn du aufhörst, vor dir selbst zu fliehen.',

  'mindset.card.emo6.title':  'Langsames Atmen verändert dein Nervensystem.',
  'mindset.card.emo6.content':
    'Wenn Stress zunimmt, versetzt sich das Nervensystem in Überlebensmodus. Langsames Atmen hilft, dem Gehirn und Körper Sicherheit zu signalisieren. Emotionaler Neustart bedeutet nicht immer, sofort jedes Problem zu lösen — manchmal beginnt er damit, zuerst das Nervensystem zu beruhigen.\n\nRuhiges Atmen schafft emotionalen Raum.',

  'mindset.card.emo7.title':  'Innerlich erschöpft zu sein zählt auch.',
  'mindset.card.emo7.content':
    'Du kannst emotional erschöpft sein, auch wenn du nach außen hin funktionierst. Konstanter Stress, Grübeln, People-Pleasing und emotionale Unterdrückung erschöpfen über Zeit still die Energie.\n\nEmotionaler Neustart bedeutet zu erkennen, wann deine innere Welt auch Fürsorge braucht. Emotionale Erholung zählt.',

  'mindset.card.emo8.title':  'Heilung verläuft selten geradlinig.',
  'mindset.card.emo8.content':
    'Emotioneles Wachstum ist selten linear. Manche Tage werden sich friedlich anfühlen, andere wieder schwer. Heilung bedeutet nicht, nie mehr zu kämpfen — es bedeutet, durch schwierige Emotionen sanfter und bewusster zu gehen.\n\nFortschritt geschieht oft still unterhalb der Oberfläche.',

  'mindset.card.emo9.title':  'Nicht alles muss heute gelöst werden.',
  'mindset.card.emo9.content':
    'Überwältigte Geister versuchen oft, jedes Problem sofort zu lösen. Emotionaler Neustart beginnt, wenn du aufhörst, die ganze Zukunft gleichzeitig zu tragen. Konzentriere dich auf das, was jetzt bewältigt werden kann.\n\nKleine ruhige Momente schaffen Raum für klareres Denken. Ein Schritt nach dem anderen ist genug.',

  'mindset.card.emo10.title': 'Loslassen schafft Raum für Frieden.',
  'mindset.card.emo10.content':
    'Zu lange an Groll, Bedauern oder emotionalem Schmerz festzuhalten erschöpft den Geist still. Emotionaler Neustart erfordert manchmal loszulassen, was nicht mehr verändert werden kann. Loslassen bedeutet nicht vergessen — es bedeutet zu entscheiden, unnötiges Leid nicht für immer zu tragen.\n\nLoslassen schafft Leichtigkeit.',

  'mindset.card.emo11.title': 'Dein Nervensystem braucht Sicherheit.',
  'mindset.card.emo11.content':
    'Konstanter Stress hält den Körper emotional wachsam und mental erschöpft. Emotionaler Neustart beginnt oft damit, Umgebungen, Routinen und Beziehungen zu schaffen, die sich emotional sicher anfühlen.\n\nSicherheit ermöglicht dem Geist, sich wieder zu entspannen. Ruhige Umgebungen unterstützen Heilung.',

  'mindset.card.emo12.title': 'Emotionale Balance braucht Grenzen.',
  'mindset.card.emo12.content':
    'Zu allem Ja zu sagen führt oft zu emotionaler Überlastung. Grenzen schützen mentale Energie und emotionale Stabilität. Emotionaler Neustart bedeutet zu erkennen, wann deine Energie schneller erschöpft als wiederhergestellt wird.\n\nDeinen Frieden zu schützen zählt.',

  'mindset.card.emo13.title': 'Du bist mehr als deine aktuellen Gefühle.',
  'mindset.card.emo13.content':
    'Schwierige Emotionen können überwältigend wirken, aber sie sind vorübergehende Erfahrungen — nicht deine Identität. Emotionaler Neustart geschieht, wenn du aufhörst, dich vollständig durch deinen emotionalen Zustand zu definieren.\n\nGefühle vergehen. Dein Wert bleibt.',

  'mindset.card.emo14.title': 'Stille kann auch heilen.',
  'mindset.card.emo14.content':
    'Die moderne Welt füllt den Geist ständig mit Stimulation und Lärm. Emotionaler Neustart erfordert oft stille Momente ohne Ablenkung. Stille gibt dem Nervensystem Raum zum Verlangsamen.\n\nRuhe ermöglicht tieferen Emotionen, auf natürliche Weise aufzutauchen und sich zu setzen.',

  'mindset.card.emo15.title': 'Auch du verdienst dein eigenes Mitgefühl.',
  'mindset.card.emo15.content':
    'Viele Menschen bieten anderen Freundlichkeit an, während sie innerlich hart mit sich selbst sind. Emotionale Heilung wird unter ständiger Selbstkritik schwerer. Emotionaler Neustart erfordert zu lernen, mit mehr Geduld und Verständnis auf dich selbst zu reagieren.\n\nSelbstmitgefühl stärkt Resilienz.',

  'mindset.card.emo16.title': 'Emotionaler Schmerz bedeutet kein Versagen.',
  'mindset.card.emo16.content':
    'Emotional zu kämpfen bedeutet nicht, schwach oder kaputt zu sein. Menschen erleben im Laufe des Lebens natürlich Trauer, Stress, Verwirrung, Angst und Traurigkeit. Emotionaler Neustart beginnt, wenn du aufhörst, Schmerz als Beweis für Unzulänglichkeit zu behandeln.\n\nSchwierigkeit ist Teil des Menschseins.',

  'mindset.card.emo17.title': 'Verlangsamen schafft auch Klarheit.',
  'mindset.card.emo17.content':
    'Wenn der Geist überfordert ist, löst schneller werden das Problem selten. Emotionaler Neustart erfordert manchmal, mental und körperlich bewusst zu verlangsamen. Langsamkeit schafft Raum für Reflexion und Erholung des Nervensystems.\n\nRuhiges Denken verbessert Entscheidungsfindung.',

  'mindset.card.emo18.title': 'Vergleich beschädigt still den inneren Frieden.',
  'mindset.card.emo18.content':
    'Ständig das eigene Leben, Aussehen, Erfolg oder Heilungsprozess mit anderen zu vergleichen schafft emotionale Erschöpfung. Emotionaler Neustart wächst, wenn die Aufmerksamkeit zur eigenen Reise zurückkehrt.\n\nJeder kämpft im Verborgenen anders. Vergleich verzerrt die Realität.',

  'mindset.card.emo19.title': 'Dein Körper trägt auch Stress.',
  'mindset.card.emo19.content':
    'Stress ist nicht nur mental — er betrifft den ganzen Körper. Verspannungen, Erschöpfung, Kopfschmerzen, flaches Atmen und emotionale Taubheit sind oft Zeichen einer Überlastung des Nervensystems.\n\nEmotionaler Neustart beinhaltet auch, für den Körper zu sorgen. Körperliche Erholung unterstützt emotionale Heilung.',

  'mindset.card.emo20.title': 'Es ist in Ordnung, mehrere Emotionen gleichzeitig zu fühlen.',
  'mindset.card.emo20.content':
    'Menschliche Emotionen sind komplex. Du kannst gleichzeitig dankbar und überfordert, hoffnungsvoll und ängstlich, heilend und verletzt sein. Emotionaler Neustart bedeutet, emotionale Komplexität zuzulassen, ohne dich hart dafür zu verurteilen.\n\nWidersprüchliche Emotionen sind normal.',

  'mindset.card.emo21.title': 'Emotionale Heilung braucht Ehrlichkeit.',
  'mindset.card.emo21.content':
    'Emotionen zu unterdrücken beseitigt sie nicht dauerhaft. Emotionaler Neustart beginnt, wenn du ehrlich darüber wirst, was du wirklich fühlst, statt ständig so zu tun, als wäre alles in Ordnung.\n\nEhrlichkeit schafft emotionale Entlastung. Bewusstsein schafft Heilung.',

  'mindset.card.emo22.title': 'Auch dich selbst zu versorgen ist Teil von dem, was du gibst.',
  'mindset.card.emo22.content':
    'Ständig Energie an alle anderen zu geben, während man sich selbst vernachlässigt, führt schließlich zu emotionalem Burnout. Emotionaler Neustart beinhaltet, auch die eigenen Bedürfnisse als gültig anzuerkennen.\n\nSich selbst zu erholen ist nicht egoistisch. Selbstfürsorge schützt emotionale Nachhaltigkeit.',

  'mindset.card.emo23.title': 'Vereinfachen ist auch eine Form von Erholung.',
  'mindset.card.emo23.content':
    'Überfüllte Terminkalender, endlose Stimulation und konstanter Druck schwächen still emotisches Wohlbefinden. Emotionaler Neustart kommt oft davon, das Leben zu vereinfachen, unnötigen Lärm zu reduzieren und mentale Überlastung zu verlangsamen.\n\nEinfachheit schafft emotionalen Atemraum.',

  'mindset.card.emo24.title': 'In Wellen zu heilen ist auch Heilung.',
  'mindset.card.emo24.content':
    'Manche Tage fühlst du dich stark und ruhig, während an anderen Tagen alte Emotionen unerwartet wiederkehren. Das löscht deinen Fortschritt nicht aus. Emotionaler Neustart ist ein Prozess, keine gerade Linie.\n\nHeilung bewegt sich oft in Wellen statt in perfekter Beständigkeit.',

  'mindset.card.emo25.title': 'Nicht alles im Leben muss optimiert werden.',
  'mindset.card.emo25.content':
    'Konstanter Druck zu leisten, sich zu verbessern und zu erreichen kann das Gehirn über Zeit emotional erschöpfen. Emotionaler Neustart erfordert Momente der Sanftheit, Reflexion und emotionalen Zartheit.\n\nNicht jeder Moment des Lebens muss optimiert werden. Frieden zählt auch.',

  'mindset.card.emo26.title': 'Emotionale Stärke schließt Verletzlichkeit ein.',
  'mindset.card.emo26.content':
    'Viele Menschen verwechseln emotionale Stärke mit emotionaler Unterdrückung. Echte Stärke beinhaltet oft Ehrlichkeit, Offenheit und die Fähigkeit, schwierige Gefühle ohne Scham anzuerkennen.\n\nVerletzlichkeit schafft tiefere Heilung und Verbindung. Emotionale Ehrlichkeit baut Resilienz auf.',

  'mindset.card.emo27.title': 'Du kannst ein anderes emotionales Muster wählen.',
  'mindset.card.emo27.content':
    'Vergangene Erfahrungen können emotionale Gewohnheiten beeinflussen, aber sie kontrollieren deine Zukunft nicht dauerhaft. Emotionaler Neustart beginnt, wenn du erkennst, dass neue Muster allmählich erlernt werden können.\n\nBewusstsein schafft Wahlmöglichkeit. Wiederholte Heilungsgewohnheiten schaffen Veränderung.',

  'mindset.card.emo28.title': 'Innere Ruhe ist eine Fähigkeit.',
  'mindset.card.emo28.content':
    'Emotionale Ruhe ist nichts, das Menschen entweder von Natur aus haben oder nicht haben. Sie wird oft durch wiederholte Übungen wie Atmen, Verlangsamen, Reflexion, Grenzen und emotionales Bewusstsein entwickelt.\n\nRuhe stärkt sich durch bewusste Wiederholung.',

  'mindset.card.emo29.title': 'Emotionaler Frieden wächst durch Präsenz.',
  'mindset.card.emo29.content':
    'Über die Zukunft zu grübeln und die Vergangenheit ständig wiederzuerleben zieht Aufmerksamkeit weg vom gegenwärtigen Moment. Emotionaler Neustart wächst, wenn du dich mit dem verbindest, was gerade jetzt passiert, statt vollständig im mentalen Lärm zu leben.\n\nPräsenz beruhigt das Nervensystem.',

  'mindset.card.emo30.title': 'Du darfst deinen inneren Frieden schützen.',
  'mindset.card.emo30.content':
    'Nicht jede Umgebung, jedes Gespräch oder jede Beziehung verdient unbegrenzten Zugang zu deiner emotionalen Energie. Emotionaler Neustart bedeutet manchmal, Distanz von dem zu wählen, was dein mentales Wohlbefinden wiederholt beschädigt.\n\nDeinen Frieden zu schützen ist eine Form des Selbstrespekts.',

  'mindset.card.emo31.title': 'Du musst nicht jede Emotion für immer tragen.',
  'mindset.card.emo31.content':
    'Manche Emotionen sollen gefühlt, verstanden und schließlich losgelassen werden — nicht jahrelang getragen werden. Emotionaler Neustart beginnt, wenn du aufhörst, dich so stark mit Schmerz zu identifizieren, dass er zu einem dauerhaften Teil deiner Identität wird.\n\nHeilung schafft Raum für leichtere Emotionen.',

  'mindset.card.emo32.title': 'Emotionaler Neustart beginnt mit Bewusstsein.',
  'mindset.card.emo32.content':
    'Viele emotionale Reaktionen geschehen automatisch, weil sie jahrelang ohne Reflexion wiederholt wurden. Emotionaler Neustart beginnt, wenn du lange genug pausierst, um deine Muster zu bemerken, statt unbewusst zu reagieren.\n\nBewusstsein schafft die Möglichkeit zur Veränderung. Beobachtung unterbricht emotischen Autopiloten.',

  'mindset.card.emo33.title': 'Manchmal ist Abstand von dem, was erschöpft, auch Selbstfürsorge.',
  'mindset.card.emo33.content':
    'Konstante Exposition gegenüber Stress, Konflikten, schlechten Nachrichten und emotionaler Spannung überwältigt das Nervensystem über Zeit. Emotionaler Neustart erfordert manchmal, vorübergehend von emotional erschöpfenden Eingaben Abstand zu nehmen.\n\nDeine emotionale Umgebung zu schützen unterstützt mentale Erholung.',

  'mindset.card.emo34.title': 'Du darfst auch über emotionale Muster hinauswachsen.',
  'mindset.card.emo34.content':
    'Manche emotionalen Gewohnheiten halfen dir einst, schwierige Erfahrungen zu überstehen, aber sie dienen vielleicht nicht mehr deinem heutigen Leben. Emotionaler Neustart bedeutet, dir ohne Schuldgefühle zu erlauben, emotional zu wachsen.\n\nWachstum erfordert manchmal, alte Schutzmechanismen loszulassen. Veränderung ist Teil der Heilung.',

  'mindset.card.emo35.title': 'Der Körper braucht auch Sicherheit, um zu heilen.',
  'mindset.card.emo35.content':
    'Ein überstimuliertes Nervensystem hält den Körper oft in Spannung, Angst und emotionaler Erschöpfung gefangen. Emotionaler Neustart beginnt, wenn du durch Atmen, Ruhe, Stille, Bewegung oder Innehalten bewusst Ruhe schaffst.\n\nSicherheit ermöglicht innere Heilung.',

  'mindset.card.emo36.title': 'Nicht jede emotionale Reaktion braucht sofortiges Handeln.',
  'mindset.card.emo36.content':
    'Starke Emotionen erzeugen oft den Drang, schnell zu reagieren. Emotionaler Neustart wächst, wenn du lernst, vor impulsiven Reaktionen innezuhalten. Ruhige Reflexion verhindert unnötiges Bedauern.\n\nRaum zwischen Fühlen und Handeln schafft emotionale Reife.',

  'mindset.card.emo37.title': 'Sich selbst gegenüber ehrlich zu sein ist auch Erholung.',
  'mindset.card.emo37.content':
    'Vorzugeben, emotional in Ordnung zu sein, wenn man innerlich erschöpft ist, verzögert Heilung. Emotionaler Neustart erfordert ehrliche Anerkennung dessen, was du wirklich fühlst.\n\nVerleugnung schafft emotionalen Druck. Ehrlichkeit schafft emotionale Entlastung.',

  'mindset.card.emo38.title': 'Verloren sein bedeutet nicht, kaputt zu sein.',
  'mindset.card.emo38.content':
    'Perioden der Verwirrung, Unsicherheit oder emotionaler Schwere sind normale Teile des menschlichen Lebens. Emotionaler Neustart beginnt, wenn du aufhörst, vorübergehende emotionale Schwierigkeit als Beweis dafür zu interpretieren, dass dauerhaft etwas mit dir nicht stimmt.\n\nVerlorene Momente löschen deinen Wert nicht aus.',

  'mindset.card.emo39.title': 'Emotionaler Frieden wächst durch Annahme.',
  'mindset.card.emo39.content':
    'Die Realität ständig zu bekämpfen schafft emotionale Erschöpfung. Emotionaler Neustart bedeutet manchmal zu akzeptieren, was aktuell nicht verändert werden kann, statt ihm endlos mental zu widerstehen.\n\nAnnahme schafft emotionalen Atemraum. Frieden beginnt oft dort, wo Widerstand weicher wird.',

  'mindset.card.emo40.title': 'Du verdienst emotionale Sicherheit.',
  'mindset.card.emo40.content':
    'Umgebungen voller konstanter Kritik, Unberechenbarkeit oder emotionaler Manipulation schädigen still das mentale Wohlbefinden. Emotionaler Neustart beinhaltet zu erkennen, dass emotionale Sicherheit tief zählt.\n\nRuhige Beziehungen und Umgebungen unterstützen Heilung. Friedliche Räume stellen Energie wieder her.',

  'mindset.card.emo41.title': 'Deine Gefühle verdienen Verständnis, keine Beschämung.',
  'mindset.card.emo41.content':
    'Viele Menschen lernten, Emotionen zu unterdrücken, weil sie befürchteten, schwach oder schwierig zu erscheinen. Emotionaler Neustart beginnt, wenn du aufhörst, dich hart für menschliche Gefühle zu verurteilen.\n\nGefühle verdienen Verständnis vor Korrektur. Mitgefühl unterstützt Heilung.',

  'mindset.card.emo42.title': 'Emotionaler Neustart bedeutet auch, mentales Gepäck loszulassen.',
  'mindset.card.emo42.content':
    'Ständiges Grübeln füllt den Geist mit emotionalem Lärm. Emotionaler Neustart wächst, wenn du deine Gedanken vereinfachst, statt jedes Problem mental endlos wiederzuspielen.\n\nRuhige Geister verarbeiten Emotionen klarer. Einfachheit schafft Ruhe.',

  'mindset.card.emo43.title': 'Manchmal sieht Heilen klein aus. Aber es ist es nicht.',
  'mindset.card.emo43.content':
    'Emotionale Heilung ist nicht immer dramatisch oder offensichtlich. Manchmal sieht Heilung so aus, ruhiger zu reagieren, tiefer zu ruhen oder sich von schwierigen Momenten schneller zu erholen.\n\nKleine emotionale Verschiebungen zählen. Stiller Fortschritt ist auch Fortschritt.',

  'mindset.card.emo44.title': 'Wenn du erschöpft bist, erscheint alles schwerer als es ist.',
  'mindset.card.emo44.content':
    'Wenn man emotional überfordert ist, interpretiert das Gehirn Situationen oft negativer und hoffnungsloser als sie wirklich sind. Emotionaler Neustart beinhaltet zu erkennen, wann Erschöpfung deine Wahrnehmung beeinflusst.\n\nErholung stellt emotionale Klarheit wieder her. Erschöpfte Geister sehen schwer klar.',

  'mindset.card.emo45.title': 'Emotionaler Neustart braucht auch sanfte innere Sprache.',
  'mindset.card.emo45.content':
    'Wie du mit dir selbst sprichst, beeinflusst emotionale Erholung tief. Harsche innere Kritik erhöht emotionale Spannung und Unsicherheit. Sanfte innere Sprache schafft emotionale Sicherheit.\n\nMitfühlende Gedanken unterstützen Resilienz und Heilung.',

  'mindset.card.emo46.title': 'Erholung muss nicht verdient werden.',
  'mindset.card.emo46.content':
    'Viele Menschen fühlen sich schuldig, wann immer sie verlangsamen oder Pausen einlegen. Emotionaler Neustart beginnt, wenn du aufhörst, Erholung als etwas zu behandeln, das durch Erschöpfung „verdient" werden muss.\n\nMenschen brauchen Erholung von Natur aus. Ruhe unterstützt emotionale Gesundheit.',

  'mindset.card.emo47.title': 'Emotionale Balance braucht auch emotionale Grenzen.',
  'mindset.card.emo47.content':
    'Den Stress, die Negativität oder das emotionale Chaos anderer aufzunehmen wird irgendwann überwältigend. Emotionaler Neustart bedeutet manchmal, die Exposition gegenüber emotional erschöpfenden Situationen zu begrenzen.\n\nDeine Energie zu schützen schafft Stabilität. Grenzen bewahren Frieden.',

  'mindset.card.emo48.title': 'Du darfst dich auch wieder besser fühlen.',
  'mindset.card.emo48.content':
    'Manche Menschen halten unbewusst an Leiden fest, weil Schmerz vertraut oder emotional schützend wurde. Emotionaler Neustart beinhaltet, dir zu erlauben, Frieden, Freude und emotionale Leichtigkeit ohne Schuldgefühle zu erleben.\n\nHeilung verrät nicht deine vergangenen Kämpfe.',

  'mindset.card.emo49.title': 'Emotionale Heilung braucht Präsenz.',
  'mindset.card.emo49.content':
    'Die Vergangenheit ständig wiederzuerleben oder die Zukunft zu befürchten erhöht emotionale Überforderung. Emotionaler Neustart wächst, wenn Aufmerksamkeit in den gegenwärtigen Moment zurückkehrt.\n\nPräsenz beruhigt das Nervensystem. Jetzt ist oft handhabbarer als vorgestellte Zukünfte.',

  'mindset.card.emo50.title': 'Emotionaler Neustart bedeutet auch, auf den Körper zu hören.',
  'mindset.card.emo50.content':
    'Der Körper offenbart emotionalen Stress oft, bevor der Geist ihn vollständig erkennt. Verspannung, Erschöpfung, Kopfschmerzen, Reizbarkeit und emotionale Taubheit sind wichtige Signale.\n\nEmotionales Bewusstsein schließt körperliches Bewusstsein ein. Der Körper kommuniziert emotionale Überlastung deutlich.',

  'mindset.card.emo51.title': 'Manchmal ist Abstand auch Selbstschutz.',
  'mindset.card.emo51.content':
    'Nicht jede Beziehung, Gewohnheit, Umgebung oder jedes Gespräch unterstützt emotisches Wohlbefinden. Emotionaler Neustart erfordert gelegentlich, Distanz von dem zu schaffen, was deinen mentalen Frieden wiederholt verletzt.\n\nDich selbst zu schützen ist nicht egoistisch, wenn Heilung notwendig ist.',

  'mindset.card.emo52.title': 'Sich Zeit zur emotionalen Erholung zu nehmen ist auch Mut.',
  'mindset.card.emo52.content':
    'Sich Zeit zur emotionalen Erholung zu nehmen bedeutet nicht, zerbrechlich oder unfähig zu sein. Emotionale Erholung erfordert Mut, Bewusstsein und Ehrlichkeit.\n\nEmotionalen Schmerz zu ignorieren schafft keine Stärke. Heilung schafft über Zeit stärkere Resilienz.',

  'mindset.card.emo53.title': 'Emotionaler Neustart ist lernen, sich wieder sicher zu fühlen.',
  'mindset.card.emo53.content':
    'Chronischer Stress kann das Nervensystem trainieren, ständig wachsam und angespannt zu bleiben. Emotionaler Neustart beinhaltet, Geist und Körper neu zu trainieren, Momente der Sicherheit, Ruhe und Stabilität zu erkennen.\n\nFrieden fühlt sich oft unvertraut an, bevor er sich wieder natürlich anfühlt.',

  'mindset.card.emo54.title': 'Heilung kann nicht erzwungen werden — sie braucht Zeit.',
  'mindset.card.emo54.content':
    'Manche emotionalen Wunden brauchten Jahre, um zu entstehen, und können Zeit benötigen, um vollständig zu heilen. Emotionaler Neustart wächst durch beständiges Selbstbewusstsein, nicht durch gehetzten Perfektionismus.\n\nHeilung kann nicht immer erzwungen werden. Geduld schafft emotionale Sanftheit.',

  'mindset.card.emo55.title': 'Du kannst den Drang nach Kontrolle loslassen.',
  'mindset.card.emo55.content':
    'Ständig zu versuchen, jeden möglichen Ausgang zu kontrollieren, schafft emotionale Erschöpfung und Angst. Emotionaler Neustart beginnt, wenn du dich mehr auf Präsenz und Anpassungsfähigkeit konzentrierst statt auf perfekte Kontrolle.\n\nLoslassen schafft emotische Erleichterung. Flexibilität stärkt Frieden.',

  'mindset.card.emo56.title': 'Emotionaler Neustart bedeutet, innere Ruhe aufzubauen.',
  'mindset.card.emo56.content':
    'Äußere Situationen werden nicht immer sofort friedlich, aber innere Ruhe kann dennoch allmählich entwickelt werden. Emotionaler Neustart stärkt sich, wenn du übst, Gedanken zu verlangsamen, tief zu atmen und bewusst zu reagieren.\n\nInnerer Frieden verändert, wie du das Leben erlebst.',

  'mindset.card.emo57.title': 'Du bist emotional nicht zurückgeblieben.',
  'mindset.card.emo57.content':
    'Heilung geschieht nicht nach einem universellen Zeitplan. Dein emotionales Wachstum mit anderen zu vergleichen schafft unnötigen Druck. Emotionaler Neustart wächst, wenn du dein eigenes Tempo respektierst statt deine Erholung zu überstürzen.\n\nPersönliches Wachstum ist zutiefst individuell.',

  'mindset.card.emo58.title': 'Emotionale Stabilität wächst durch Beständigkeit.',
  'mindset.card.emo58.content':
    'Kleine beruhigende Gewohnheiten, beständig geübt, schaffen über Zeit stärkere emotionale Resilienz. Schlaf, Reflexion, Grenzen, Atmen, Bewegung und Selbstbewusstsein stärken alle allmählich emotionale Regulation.\n\nStabilität entsteht täglich. Wiederholung formt emotische Gesundheit.',

  'mindset.card.emo59.title': 'Lass den konstanten Druck auf dich selbst auch los.',
  'mindset.card.emo59.content':
    'Viele Menschen üben enormen Druck auf sich aus, immer produktiv, positiv und emotional stark zu sein. Emotionaler Neustart bedeutet, dir zu erlauben, Mensch zu sein ohne ständige Selbstperformance.\n\nFrieden wächst, wenn Druck sanfter wird.',

  'mindset.card.emo60.title': 'Ruhe ist mächtiger als ständige Reaktivität.',
  'mindset.card.emo60.content':
    'Emotional reaktiv zu leben schafft Erschöpfung und Instabilität. Ruhige Menschen sind nicht emotional taub — sie haben gelernt, innezuhalten, zu atmen und mit Absicht statt impulsiv zu reagieren.\n\nRuhe ist eine Form der Stärke, die in jedem Lebensbereich bessere Ergebnisse schafft.',

  // ── Mindset Courage (conf) cards — Deutsch ────────────────────────────────────
  'mindset.card.conf1.title':  'Vergleiche rauben die Gegenwart.',
  'mindset.card.conf1.content':
    'Ständiger Vergleich zerstört still Selbstvertrauen. Jemand wird in bestimmten Lebensbereichen immer weiter sein. Selbstvertrauen wächst, wenn du dich mehr auf deinen eigenen Fortschritt konzentrierst, statt dich an anderen zu messen.\n\nDeine Reise ist einzigartig. Vergleiche lenken dich von deinem eigenen Wachstum ab.',

  'mindset.card.conf2.title':  'Stilles Selbstvertrauen ist das stärkste.',
  'mindset.card.conf2.content':
    'Arroganz sucht Überlegenheit über andere. Selbstvertrauen fühlt sich einfach sicher — ohne ständige Bestätigung zu benötigen. Wirklich selbstsichere Menschen müssen sich nicht in jedem Gespräch beweisen.\n\nInnere Sicherheit schafft Ruhe, keine Ego-Aufführung. Selbstvertrauen lässt Menschen geerdet bleiben.',

  'mindset.card.conf3.title':  'Selbstvertrauen braucht Selbstmitgefühl.',
  'mindset.card.conf3.content':
    'Viele Menschen versuchen, Selbstvertrauen durch harte Selbstkritik aufzubauen, aber ständige Selbstattacken schwächen emotionale Resilienz. Selbstvertrauen wächst schneller, wenn du lernst, dich bei Fehlern und Rückschlägen mit Respekt zu behandeln.\n\nWachstum erfordert Geduld. Selbstmitgefühl schafft emotionale Stärke, keine Schwäche.',

  'mindset.card.conf4.title':  'Echtes Selbstvertrauen entsteht in schwierigen Momenten.',
  'mindset.card.conf4.content':
    'Jeder kann sich selbstsicher fühlen, wenn das Leben leicht ist. Echtes Selbstvertrauen entwickelt sich, wenn du trotz Angst, Unsicherheit oder Unbehagen weitermachst. Schwierige Erfahrungen zeigen dir, wie resilient du wirklich bist.\n\nJede überstandene Herausforderung wird zum Beweis, dass du mehr aushalten kannst, als du einst geglaubt hast.',

  'mindset.card.conf5.title':  'Selbstvertrauen bedeutet, Unvollkommenheit zu akzeptieren.',
  'mindset.card.conf5.content':
    'Perfektionismus verbirgt oft Unsicherheit. Makellos zu sein abzuwarten, bevor man handelt, schafft endloses Zögern. Selbstvertrauen erlaubt dir, vorwärts zu gehen, ohne dass alles zuerst perfekt sein muss.\n\nWachstum geschieht durch Fehler, Lernen und Anpassen. Unvollkommenheit vermindert nicht deinen Wert.',

  'mindset.card.conf6.title':  'Deine Körpersprache formt auch deinen Geist.',
  'mindset.card.conf6.content':
    'Wie du dich trägst, beeinflusst, wie sich dein Gehirn innerlich fühlt. Haltung, Augenkontakt, Atmen und körperliche Präsenz beeinflussen den emotionalen Zustand mehr als viele Menschen erkennen.\n\nSelbstvertrauen ist sowohl mental als auch körperlich. Ruhige körperliche Präsenz stärkt emotionale Stabilität. Kleine Anpassungen schaffen spürbare Veränderungen.',

  'mindset.card.conf7.title':  'Selbstvertrauen kommt aus Kompetenz.',
  'mindset.card.conf7.content':
    'Eine der stärksten Quellen für Selbstvertrauen ist Vorbereitung und Kompetenzentwicklung. Je fähiger du wirst, desto sicherer fühlst du dich auf natürliche Weise.\n\nSelbstvertrauen wird durch Übung, Wiederholung und Erfahrung gestärkt. Wachstum schafft Beweis. Vorbereitung reduziert Angst.',

  'mindset.card.conf8.title':  'Angst bedeutet nicht, dass du schwach bist.',
  'mindset.card.conf8.content':
    'Angst ist eine normale menschliche Reaktion auf Unsicherheit und Herausforderung. Selbstsichere Menschen fühlen immer noch Angst — sie erlauben ihr nur nicht, jede Entscheidung zu kontrollieren. Mut bedeutet, trotz Unbehagen zu handeln.\n\nSelbstvertrauen wächst jedes Mal, wenn du dich vorwärts bewegst, obwohl du Angst hast. Angst und Wachstum existieren oft zusammen.',

  'mindset.card.conf9.title':  'Selbstvertrauen ist, dir selbst unter Druck zu vertrauen.',
  'mindset.card.conf9.content':
    'Das Leben wird nicht immer bequem oder vorhersehbar sein. Selbstvertrauen bedeutet, deiner Fähigkeit zu vertrauen, dich anzupassen, auch wenn Situationen schwierig werden. Du brauchst nicht alle Antworten im Voraus, um das Leben erfolgreich zu meistern.\n\nAnpassungsfähigkeit schafft Resilienz. Dir selbst zu vertrauen reduziert Panik.',

  'mindset.card.conf10.title': 'Selbstvertrauen verbessert sich durch Wiederholung.',
  'mindset.card.conf10.content':
    'Der erste Versuch bei irgendetwas fühlt sich in der Regel unangenehm an. Wiederholung reduziert allmählich Unsicherheit und erhöht Vertrautheit. Je öfter du schwierige Situationen übst, desto weniger Macht hat Angst über dich.\n\nSelbstvertrauen stärkt sich durch Exposition. Vertrautheit schafft Ruhe.',

  'mindset.card.conf11.title': 'Selbstvertrauen bedeutet, anders mit dir zu sprechen.',
  'mindset.card.conf11.content':
    'Dein innerer Dialog formt täglich deinen emotionalen Zustand. Ständige Selbstkritik trainiert dein Gehirn, Versagen und Unsicherheit zu erwarten. Unterstützende innere Sprache schafft stärkere emotionale Resilienz.\n\nWie du mit dir selbst sprichst, zählt tief. Gesunde Gedanken stärken das Selbstbild.',

  'mindset.card.conf12.title': 'Selbstvertrauen schließt Zweifel nicht aus.',
  'mindset.card.conf12.content':
    'Selbst sehr erfolgreiche Menschen erleben manchmal Unsicherheit. Selbstvertrauen bedeutet nicht, Zweifel vollständig zu beseitigen — es bedeutet zu lernen, nicht jedem zweifelhaften Gedanken zu gehorchen.\n\nDer Geist übertreibt oft Angst und Unsicherheit. Selbstsichere Menschen bewegen sich trotzdem vorwärts. Fortschritt zählt mehr als perfekte Gewissheit.',

  'mindset.card.conf13.title': 'Selbstvertrauen wächst, wenn du Herausforderungen nicht mehr vermeidest.',
  'mindset.card.conf13.content':
    'Vermeidung reduziert vorübergehend Angst, stärkt aber Unsicherheit langfristig. Jede vermiedene Situation lehrt das Gehirn, dass du mit Unbehagen nicht umgehen kannst. Herausforderungen schrittweise zu begegnen trainiert dein Nervensystem neu.\n\nSelbstvertrauen expandiert durch Exposition. Handeln schwächt Angst.',

  'mindset.card.conf14.title': 'Selbstvertrauen entsteht durch Erholung nach Rückschlägen.',
  'mindset.card.conf14.content':
    'Versagen zerstört Selbstvertrauen nicht — sich zu weigern, sich davon zu erholen, tut es oft. Resiliente Menschen verstehen, dass Rückschläge Teil des Wachstums sind. Selbstvertrauen wächst, wenn du lernst, dass du dich erholen, anpassen und nach Fehlern weitermachen kannst.\n\nErholung baut emotionale Stärke auf. Ausdauer stärkt Identität.',

  'mindset.card.conf15.title': 'Dein Wert hängt nicht allein von Produktivität ab.',
  'mindset.card.conf15.content':
    'Viele Menschen verbinden Selbstvertrauen vollständig mit Leistung und äußerem Erfolg. Aber dein Wert als Person ist nicht von konstanter Performance abhängig. Gesundes Selbstvertrauen schafft Raum für Erholung, Unvollkommenheit und Menschlichkeit.\n\nSelbstwert sollte in schwierigen Zeiten nicht verschwinden. Innerer Wert existiert jenseits von Produktivität.',

  'mindset.card.conf16.title': 'Selbstvertrauen braucht Grenzen.',
  'mindset.card.conf16.content':
    'Menschen, die ständig ihre eigenen Bedürfnisse ignorieren, kämpfen oft innerlich mit Selbstrespekt. Selbstvertrauen wächst, wenn du beginnst, deine Energie, Zeit und emotisches Wohlbefinden zu schützen.\n\nGrenzen kommunizieren Selbstwert. Sich selbst zu respektieren lehrt andere, wie sie dich behandeln sollen. Grenzen stärken Identität.',

  'mindset.card.conf17.title': 'Selbstvertrauen ist tägliche Übung.',
  'mindset.card.conf17.content':
    'Selbstvertrauen ist kein dauerhafter emotionaler Zustand. Manche Tage wirst du dich von Natur aus stärker fühlen als andere. Selbstvertrauen aufzubauen erfordert tägliche Wiederholung von Gewohnheiten, die Selbstvertrauen, Resilienz und Mut stärken.\n\nBeständigkeit formt Identität über Zeit. Kleine tägliche Handlungen zählen tief.',

  'mindset.card.conf18.title': 'Du wirst selbstsicherer, indem du schwere Dinge überlebst.',
  'mindset.card.conf18.content':
    'Viele Menschen unterschätzen, wie viel Resilienz sie bereits besitzen. Jede schwierige Erfahrung, die du überlebst, wird zum Beweis innerer Stärke. Selbstvertrauen wächst, wenn du erkennst, wie viel du bereits überwunden hast.\n\nReflexion stärkt Perspektive. Dein vergangenes Überleben enthält den Beweis deiner Fähigkeit.',

  'mindset.card.conf19.title': 'Selbstvertrauen verbessert Entscheidungen.',
  'mindset.card.conf19.content':
    'Unsicherheit schafft oft Zögern, Grübeln und ständiges Zweite-Raten. Selbstvertrauen ermöglicht klarere Entscheidungen, weil du deiner Fähigkeit vertraust, mit Ergebnissen umzugehen. Du kontrollierst nicht jedes Ergebnis, aber du kannst dir vertrauen, effektiv zu reagieren.\n\nSelbstvertrauen reduziert mentale Lähmung.',

  'mindset.card.conf20.title': 'Selbstvertrauen bedeutet, authentisch zu bleiben.',
  'mindset.card.conf20.content':
    'Jemand anderen vorzuspielen kann vorübergehend Zustimmung gewinnen, schwächt aber langfristig innere Stabilität. Selbstvertrauen wächst, wenn dein äußeres Verhalten mit deinen wahren Werten und deiner Persönlichkeit übereinstimmt.\n\nAuthentizität schafft emotionale Freiheit. Du musst nicht ständig auftreten, um Respekt zu verdienen.',

  'mindset.card.conf21.title': 'Selbstvertrauen wächst langsam, aber kraftvoll.',
  'mindset.card.conf21.content':
    'Die meisten dauerhaften Selbstvertrauen entwickeln sich allmählich durch angesammelte Erfahrungen. Winzige Momente des Muts, der Beständigkeit und Resilienz bauen über Zeit still stärkere Identität auf.\n\nSelbstvertrauen ist oft unsichtbar, während es wächst. Kleiner Fortschritt akkumuliert innerlich.',

  'mindset.card.conf22.title': 'Selbstsichere Menschen akzeptieren, dass nicht alle sie mögen.',
  'mindset.card.conf22.content':
    'Alles zu versuchen, um alle zufrieden zu stellen, schafft emotionale Erschöpfung und Unsicherheit. Selbstvertrauen ermöglicht dir, Missbilligung zu tolerieren, ohne dein Selbstgefühl zu verlieren.\n\nNicht jeder wird deinen Weg verstehen oder bestätigen. Dein Wert hängt nicht von universeller Zustimmung ab. Akzeptanz schafft Freiheit.',

  'mindset.card.conf23.title': 'Echtes Selbstvertrauen ist leise, nicht laut.',
  'mindset.card.conf23.content':
    'Echtes Selbstvertrauen erscheint oft ruhiger als Menschen erwarten. Es sucht nicht ständig Aufmerksamkeit oder Bestätigung. Ruhiges Selbstvertrauen kommt aus innerer Sicherheit statt äußerer Aufführung.\n\nFriedliche Gewissheit ist mächtig. Stabilität spricht oft leise.',

  'mindset.card.conf24.title': 'Selbstvertrauen stärkt sich durch Beständigkeit.',
  'mindset.card.conf24.content':
    'Selbstbeständigkeit und Selbstvertrauen sind tief verbunden. Jedes Mal, wenn du trotz Widerstand durchhältst, wächst dein Selbstrespekt. Beständigkeit schafft den Beweis, dass du mit schwierigen Dingen umgehen kannst.\n\nBeständigkeit stärkt Identität. Verlässliches Handeln baut inneres Vertrauen auf.',

  'mindset.card.conf25.title': 'Selbstvertrauen bedeutet, dir selbst Wachstum zu erlauben.',
  'mindset.card.conf25.content':
    'Manche Menschen bleiben in alten Identitäten stecken, weil sie sich schwer tun zu glauben, dass sie sich verändern können. Selbstvertrauen beinhaltet zu glauben, dass du mehr sein kannst als deine vergangenen Fehler oder Grenzen.\n\nWachstum erfordert Offenheit. Deine aktuelle Version ist nicht deine endgültige Version.',

  'mindset.card.conf26.title': 'Selbstvertrauen verändert, wie du das Leben erlebst.',
  'mindset.card.conf26.content':
    'Selbstvertrauen beeinflusst Beziehungen, Chancen, Entscheidungen, Kommunikation und emotisches Wohlbefinden. Es beeinflusst, wie mutig du dich durch die Welt bewegst. Wenn du dir selbst tiefer vertraust, fühlt sich das Leben oft weniger einschüchternd und bedeutungsvoller an.\n\nSelbstvertrauen schafft innerlich Freiheit, bevor es äußerlich etwas verändert.',

  'mindset.card.conf27.title': 'Selbstvertrauen beginnt mit Selbstannahme.',
  'mindset.card.conf27.content':
    'Viele Menschen versuchen selbstsicher zu werden, während sie heimlich Teile von sich ablehnen. Echtes Selbstvertrauen wächst, wenn du aufhörst, deine eigene Menschlichkeit zu bekämpfen, und beginnst anzunehmen, wer du bist, während du noch Raum für Wachstum lässt.\n\nSelbstannahme schafft emotionale Stabilität. Du musst nicht erst perfekt werden, bevor du Selbstrespekt verdienst.',

  'mindset.card.conf28.title': 'Selbstvertrauen wird durch Erfahrung verdient.',
  'mindset.card.conf28.content':
    'Lesen, Planen und Denken kann Selbstvertrauen nur bis zu einem gewissen Punkt aufbauen. Echtes Selbstvertrauen entwickelt sich durch gelebte Erfahrung. Jedes schwierige Gespräch, jede Herausforderung, jeder Fehler und jede Erholung stärkt deine Fähigkeit, dir selbst zu vertrauen.\n\nErfahrung lehrt das Nervensystem, dass du mit Unbehagen umgehen kannst.',

  'mindset.card.conf29.title': 'Du wirst selbstsicherer, wenn du aufhörst, dich zu verstecken.',
  'mindset.card.conf29.content':
    'Gelegenheiten zu vermeiden, still zu bleiben und dich selbst zu verkleinern mag sich vorübergehend emotional sicher anfühlen, stärkt aber oft langfristig Unsicherheit. Selbstvertrauen wächst, wenn du dich zeigst, gehört wirst und präsent bist.\n\nSichtbarkeit baut Resilienz auf. Verstecken verstärkt Angst.',

  'mindset.card.conf30.title': 'Selbstvertrauen wird durch ehrliche Bemühung aufgebaut.',
  'mindset.card.conf30.content':
    'Selbstvertrauen fühlt sich stärker an, wenn du weißt, dass du wirklich dein Bestes gegeben hast. Selbst wenn Ergebnisse unvollkommen sind, schafft Bemühung inneren Respekt. Menschen fühlen sich oft unsicher, wenn sie sich bei Herausforderungen wiederholt selbst aufgeben.\n\nEhrliche Bemühung stärkt Identität unabhängig vom Ergebnis.',

  'mindset.card.conf31.title': 'Selbstvertrauen bedeutet, deiner Fähigkeit zum Lernen zu vertrauen.',
  'mindset.card.conf31.content':
    'Du musst nicht alles bereits wissen, um vorwärts zu gehen. Selbstvertrauen wächst, wenn du deiner Fähigkeit vertraust, dich anzupassen, zu lernen und über Zeit zu verbessern. Unsichere Geister glauben, dass Fehler sie dauerhaft definieren.\n\nSelbstsichere Geister betrachten Fehler als vorübergehende Lektionen.',

  'mindset.card.conf32.title': 'Selbstvertrauen verbessert sich, wenn du aufhörst, ständige Bestätigung zu suchen.',
  'mindset.card.conf32.content':
    'Externe Bestätigung mag sich kurz tröstlich anfühlen, aber ständig darauf zu verlassen schwächt Selbstvertrauen. Selbstvertrauen stärkt sich, wenn du beginnst, dich selbst innerlich zu validieren statt für jede Entscheidung Zustimmung zu benötigen.\n\nSelbstvalidierung schafft emotionale Unabhängigkeit. Innere Stabilität reduziert Angst.',

  'mindset.card.conf33.title': 'Selbstvertrauen bedeutet, sanft mit dir bei Versagen zu sprechen.',
  'mindset.card.conf33.content':
    'Die meisten Menschen sind weit härter mit sich selbst als sie je mit jemandem wären, den sie lieben. Ständige Selbstkritik schädigt emotische Resilienz. Selbstvertrauen wächst, wenn du lernst, nach Versagen ohne Selbstangriff zu erholen.\n\nMitgefühl stärkt Mut.',

  'mindset.card.conf34.title': 'Selbstvertrauen wächst außerhalb deiner Komfortzone.',
  'mindset.card.conf34.content':
    'Komfortzonen fühlen sich sicher an, begrenzen aber oft Wachstum. Selbstvertrauen entwickelt sich durch wiederholte Exposition gegenüber unvertrauten Situationen. Jedes Mal, wenn du Unbehagen überlebst, fürchtet dein Gehirn Herausforderung weniger.\n\nWachstum lehrt das Nervensystem, dass Unsicherheit überlebbar ist.',

  'mindset.card.conf35.title': 'Selbstvertrauen bedeutet nicht, alles zu wissen.',
  'mindset.card.conf35.content':
    'Manche Menschen glauben, alle Antworten haben zu müssen, bevor sie handeln. Aber echtes Selbstvertrauen bedeutet oft, ruhig zu bleiben, selbst ohne vollständige Gewissheit. Das Leben wird immer Unbekanntes enthalten.\n\nSelbstsichere Menschen vertrauen sich darauf, Dinge unterwegs herauszufinden.',

  'mindset.card.conf36.title': 'Deine Energie beeinflusst auch, wie du dich selbst wahrnimmst.',
  'mindset.card.conf36.content':
    'Schlafmangel, Burnout, schlechte Gesundheit und Erschöpfung können Selbstvertrauen erheblich schwächen. Viele emotionale Kämpfe werden intensiviert, wenn das Nervensystem überfordert ist.\n\nAuf dein körperliches Wohlbefinden zu achten unterstützt emotionale Stabilität. Ein gesünderer Körper unterstützt einen stärkeren Geist.',

  'mindset.card.conf37.title': 'Selbstvertrauen wächst, wenn du aufhörst, dich zu überrechtfertigen.',
  'mindset.card.conf37.content':
    'Unsicherheit erzeugt oft die Notwendigkeit, Entscheidungen, Verhalten oder Grenzen ständig zu rechtfertigen. Selbstvertrauen erlaubt dir, ruhig zu kommunizieren ohne übermäßige Erklärung. Du brauchst keine universelle Zustimmung, um deinen Entscheidungen zu vertrauen.\n\nEinfachheit spiegelt innere Gewissheit wider.',

  'mindset.card.conf38.title': 'Selbstvertrauen entsteht durch Erholung, nicht Perfektion.',
  'mindset.card.conf38.content':
    'Perfekte Menschen existieren nicht. Das stärkste Selbstvertrauen gehört oft Menschen, die gelernt haben, nach Peinlichkeit, Fehlern, Ablehnung oder Rückschlägen zu erholen. Erholung schafft Resilienz.\n\nDie Fähigkeit, wieder aufzustehen, verändert Selbstwahrnehmung tief.',

  'mindset.card.conf39.title': 'Selbstsichere Menschen erlauben sich, Raum einzunehmen.',
  'mindset.card.conf39.content':
    'Unsicherheit veranlasst Menschen oft, sich emotional, körperlich oder sozial zu verkleinern. Selbstvertrauen bedeutet, dir zu erlauben, vollständig zu existieren, ohne dich für deine Präsenz zu entschuldigen.\n\nDeine Gedanken, deine Stimme und dein Dasein zählen. Selbstwert schafft stärkere Präsenz.',

  'mindset.card.conf40.title': 'Selbstvertrauen wächst, wenn du aufhörst anzunehmen, dass alle dich beurteilen.',
  'mindset.card.conf40.content':
    'Die meisten Menschen sind weit mehr auf sich selbst fokussiert, als dich ständig zu analysieren. Soziales Urteil zu überdenken schafft unnötige Angst und Selbstbewusstsein. Selbstvertrauen wächst, wenn du aufhörst, dir konstante Kritik vorzustellen.\n\nFreiheit erscheint, wenn Selbstbewusstsein gesünder und weniger besessen wird.',

  'mindset.card.conf41.title': 'Selbstvertrauen wird durch ehrliche Selbstreflexion aufgebaut.',
  'mindset.card.conf41.content':
    'Schwächen zu ignorieren schafft kein echtes Selbstvertrauen. Echtes Selbstvertrauen beinhaltet die Fähigkeit, Fehler ehrlich anzuerkennen, ohne emotional zu kollabieren. Selbstbewusstsein schafft Wachstum.\n\nReifes Selbstvertrauen balanciert Selbstannahme mit persönlicher Verantwortung.',

  'mindset.card.conf42.title': 'Selbstvertrauen braucht emotionale Resilienz.',
  'mindset.card.conf42.content':
    'Kritik, Ablehnung und Enttäuschung sind unvermeidliche Teile des Lebens. Selbstvertrauen stärkt sich, wenn du lernst, nicht jede negative Erfahrung als Beweis für Unzulänglichkeit zu interpretieren.\n\nEmotionale Resilienz ermöglicht dir, weiterzumachen, ohne deine Identität zu verlieren. Stabilität zählt mehr als Perfektion.',

  'mindset.card.conf43.title': 'Selbstvertrauen bedeutet, zu handeln, bevor du dich völlig bereit fühlst.',
  'mindset.card.conf43.content':
    'Viele Gelegenheiten verschwinden, weil Menschen auf eine Gewissheit warten, die nie kommt. Selbstvertrauen entwickelt sich oft nach einer Handlung, nicht davor. Wachstum erfordert Bewegung trotz Unbehagen.\n\nMut schafft Erfahrung. Erfahrung baut Selbstvertrauen auf.',

  'mindset.card.conf44.title': 'Selbstvertrauen wächst durch Vorbereitung.',
  'mindset.card.conf44.content':
    'Vorbereitung reduziert Unsicherheit und erhöht emotionale Sicherheit. Fähigkeiten zu üben, sich zu organisieren und Kompetenz zu entwickeln stärkt Selbstvertrauen über Zeit auf natürliche Weise.\n\nSelbstvertrauen fühlt sich stabiler an, wenn es durch Bemühung unterstützt wird. Vorbereitung schafft Bereitschaft.',

  'mindset.card.conf45.title': 'Selbstvertrauen bedeutet, dir selbst genug zu respektieren, um zu gehen.',
  'mindset.card.conf45.content':
    'Geringes Selbstwertgefühl veranlasst Menschen oft, ungesunde Situationen, Beziehungen oder Respektlosigkeit zu tolerieren. Selbstvertrauen stärkt sich, wenn du aufhörst, deine eigenen Bedürfnisse für Akzeptanz aufzugeben.\n\nGrenzen schützen emotische Gesundheit. Selbstrespekt verändert Entscheidungen.',

  'mindset.card.conf46.title': 'Selbstvertrauen wird nicht durch Ablehnung zerstört.',
  'mindset.card.conf46.content':
    'Ablehnung tut oft weh, weil Menschen natürlich Zugehörigkeit und Bestätigung wünschen. Aber Ablehnung definiert nicht deinen Wert oder zukünftiges Potenzial. Selbstsichere Menschen verstehen, dass nicht jede Gelegenheit oder Beziehung für sie bestimmt ist.\n\nAblehnung lenkt das Leben manchmal mehr, als sie es begrenzt.',

  'mindset.card.conf47.title': 'Selbstvertrauen verbessert sich, wenn du auf Fortschritt fokussierst.',
  'mindset.card.conf47.content':
    'Perfektionismus lässt viele Menschen sich unzulänglich fühlen, weil sich nichts jemals „gut genug" anfühlt. Selbstvertrauen wächst schneller, wenn du Verbesserung anerkennst statt nur Fehler zu fokussieren.\n\nFortschritt verdient Anerkennung. Kleine Gewinne bauen emotionalen Schwung auf.',

  'mindset.card.conf48.title': 'Selbstvertrauen bedeutet, unter Druck du selbst zu bleiben.',
  'mindset.card.conf48.content':
    'Es ist leicht, Authentizität zu verlieren, wenn man versucht, andere zu beeindrucken oder Urteile zu vermeiden. Selbstvertrauen ermöglicht dir, mit deinen Werten verbunden zu bleiben, auch in unbequemen Situationen.\n\nAuthentizität schafft inneren Frieden. Vorzutäuschen schafft emotische Erschöpfung.',

  'mindset.card.conf49.title': 'Ablehnung ist auch Umleitung.',
  'mindset.card.conf49.content':
    'Jede Ablehnung schützt dich entweder vor dem falschen Weg oder bereitet dich auf den richtigen vor. Die erfolgreichsten Menschen in jedem Bereich haben Stapel von Ablehnungen gesammelt, die andere zerbrochen hätten.\n\nWas sie unterscheidet, ist nicht Talent — es ist der Glaube, dass Ablehnung eine Information ist, kein Urteil. Wenn du das nächste Mal abgelehnt wirst, frage: Was sagt mir das darüber, wohin ich stattdessen gehen sollte?',

  'mindset.card.conf50.title': 'Selbstvertrauen wächst, wenn du aufhörst, dich durch einen einzigen Moment zu definieren.',
  'mindset.card.conf50.content':
    'Ein Fehler, eine Ablehnung oder eine peinliche Situation definiert nicht deine Identität. Unsicheres Denken verwandelt oft vorübergehende Erfahrungen in permanente Etiketten. Selbstvertrauen wächst, wenn du verstehst, dass ein einziger Moment deinen Wert oder dein Potenzial nicht auslöschen kann.\n\nMenschen entwickeln sich ständig. Deine Geschichte ist größer als ein einziges Kapitel.',

  'mindset.card.conf51.title': 'Selbstvertrauen entsteht, indem du dich dem stellst, was du vermeidest.',
  'mindset.card.conf51.content':
    'Die Situationen, die du vermeidest, werden oft zu denen, die deine Emotionen am meisten kontrollieren. Selbstvertrauen stärkt sich, wenn du langsam unbequeme Gespräche, Ängste und Herausforderungen konfrontierst statt vor ihnen zu fliehen.\n\nVermeidung hält Unsicherheit am Leben. Exposition schwächt Angst über Zeit. Mut wächst durch Wiederholung.',

  'mindset.card.conf52.title': 'Selbstvertrauen bedeutet, deiner eigenen Stimme zu vertrauen.',
  'mindset.card.conf52.content':
    'Viele Menschen bringen ihre Meinungen zum Schweigen, weil sie Urteile oder Ablehnung fürchten. Selbstvertrauen wächst, wenn du dich erlaubst, Gedanken ehrlich und respektvoll auszudrücken, ohne deine Identität ständig für Zustimmung zu filtern.\n\nDeine Perspektive hat Wert. Authentisch zu sprechen stärkt Selbstrespekt.',

  'mindset.card.conf53.title': 'Selbstvertrauen verbessert sich, wenn du aufhörst, das Leben anderer zu romantisieren.',
  'mindset.card.conf53.content':
    'Social Media und Vergleiche schaffen oft die Illusion, dass alle anderen erfolgreicher, attraktiver oder sicherer sind. Selbstvertrauen wächst, wenn du dich daran erinnerst, dass jede Person privat kämpft auf eine Weise, die du nicht vollständig sehen kannst.\n\nDein echtes Leben mit jemandes Highlight-Reel zu vergleichen schafft Verzerrung. Geerdet bleiben stellt Selbstwert wieder her.',

  'mindset.card.conf54.title': 'Selbstvertrauen bedeutet, sich allein wohl zu fühlen.',
  'mindset.card.conf54.content':
    'Menschen, die sich allein tief unwohl fühlen, verlassen sich oft übermäßig auf externe Bestätigung und Ablenkung. Selbstvertrauen wächst, wenn du lernst, die eigene Gesellschaft zu genießen und emotional stabil zu sein ohne ständige Aufmerksamkeit von anderen.\n\nEinsamkeit kann Identität stärken. Innerer Frieden schafft stärkeres Selbstvertrauen.',

  'mindset.card.conf55.title': 'Selbstvertrauen erfordert, Perfektionismus loszulassen.',
  'mindset.card.conf55.content':
    'Perfektionismus schafft oft Lähmung, Versagensangst und chronischen Selbstzweifel. Selbstvertrauen wächst schneller, wenn du dich erlaubst, unvollkommen zu sein und dich trotzdem weiter zu verbessern.\n\nFortschritt zählt mehr als makellose Leistung. Fehler sind Teil des Wachstums, kein Beweis für Unzulänglichkeit.',

  'mindset.card.conf56.title': 'Selbstvertrauen entsteht durch ehrliche Grenzen.',
  'mindset.card.conf56.content':
    'Zu allem Ja zu sagen schwächt oft Selbstrespekt und emotische Energie. Selbstvertrauen stärkt sich, wenn du ehrlich über deine Grenzen, Bedürfnisse und Prioritäten wirst. Grenzen sind nicht egoistisch, wenn sie dein mentales Wohlbefinden schützen.\n\nDich selbst zu respektieren lehrt deinen Geist, dass deine Bedürfnisse auch zählen.',

  'mindset.card.conf57.title': 'Selbstvertrauen verändert, wie du durchs Leben gehst.',
  'mindset.card.conf57.content':
    'Wenn du dir selbst tiefer vertraust, gehst du mit Gelegenheiten, Beziehungen und Herausforderungen anders um. Selbstvertrauen schafft emotionale Freiheit, weil du aufhörst, ständig Beweis für deinen Wert zu benötigen. Du beginnst mehr Risiken einzugehen, ehrlicher zu sprechen und bewusster zu leben.\n\nInnere Sicherheit verändert äußeres Verhalten auf natürliche Weise.',

  // ── Mindset Momentum (prod) cards — Deutsch ───────────────────────────────────
  'mindset.card.prod1.title':  'Beschäftigt sein ist nicht immer Vorwärtskommen.',
  'mindset.card.prod1.content':
    'Beschäftigt zu sein bedeutet nicht immer, voranzukommen. Viele Menschen füllen ihre Tage mit ständiger Aktivität, während sie das vermeiden, was wirklich zählt. Echter Schwung bedeutet, bedeutsamen Fortschritt in Richtung wichtiger Ziele zu schaffen.\n\nFokussiertes Handeln bringt Ergebnisse; endlose Bewegung bringt oft Erschöpfung. Schwung wird an Wirkung gemessen, nicht daran, wie überfordert du dich fühlst.',

  'mindset.card.prod2.title':  'Anfangen, bevor du dich bereit fühlst, ist auch gültig.',
  'mindset.card.prod2.content':
    'Auf perfekte Motivation zu warten verschwendet wertvolle Zeit und Energie. Schwung wächst, wenn du lernst, trotz Widerstand oder Unsicherheit zu beginnen. Handeln schafft oft Motivation, nachdem Bewegung begonnen hat.\n\nDer schwerste Teil ist usually der Beginn. Schwung verändert emotionale Zustände schneller als Grübeln.',

  'mindset.card.prod3.title':  'Kleiner Fortschritt zählt auch.',
  'mindset.card.prod3.content':
    'Viele Menschen unterschätzen die Kraft kleiner beständiger Handlungen. Schwung ist nicht immer dramatisch oder intensiv. Winzige täglich wiederholte Schritte schaffen enorme langfristige Ergebnisse.\n\nBeständigkeit summiert sich still über Zeit. Kleiner Fortschritt verhindert Stillstand.',

  'mindset.card.prod4.title':  'Fokus beschleunigt auch den Fortschritt.',
  'mindset.card.prod4.content':
    'Multitasking schwächt Konzentration, erhöht Fehler und erschöpft mentale Energie. Schwung verbessert sich erheblich, wenn du dich auf eine bedeutungsvolle Aufgabe nach der anderen fokussierst. Tiefe Konzentration ermöglicht hochwertigere Arbeit in weniger Zeit.\n\nZerstreute Aufmerksamkeit schafft zerstreute Ergebnisse. Fokus schützt Effizienz.',

  'mindset.card.prod5.title':  'Schwung hängt auch davon ab, wie du deine Energie pflegst.',
  'mindset.card.prod5.content':
    'Zeit allein bestimmt Schwung nicht — mentale und körperliche Energie zählen auch tief. Erschöpfte Geister haben Schwierigkeiten, klar zu denken und Fokus zu halten. Schlaf, Erholung, Ernährung und Ruhe beeinflussen Leistung stark.\n\nNachhaltiger Schwung hängt von nachhaltiger Energie ab.',

  'mindset.card.prod6.title':  'Schwung entsteht auch durch kleine Strukturen.',
  'mindset.card.prod6.content':
    'Sich vollständig auf Motivation zu verlassen schafft Inkonsistenz. Menschen mit Schwung schaffen Systeme, Routinen und Strukturen, die Handeln automatisch unterstützen. Systeme reduzieren emotionale Entscheidungsfindung und mentale Reibung.\n\nGute Gewohnheiten machen Beständigkeit leichter. Struktur schützt Schwung.',

  'mindset.card.prod7.title':  'Fertig ist oft besser als perfekt.',
  'mindset.card.prod7.content':
    'Perfektionismus verzögert häufig Fortschritt. Viele Menschen verbringen übermäßige Zeit damit, kleine Details zu verfeinern, während wichtige Arbeit unvollendet bleibt. Schwung wächst, wenn du Vollendung und Verbesserung gegenüber endlosem Polieren priorisierst.\n\nUnvollkommenes Handeln schafft in der Regel mehr Ergebnisse als perfektes Zögern.',

  'mindset.card.prod8.title':  'Was du zuerst wählst, bestimmt, wohin du dich bewegst.',
  'mindset.card.prod8.content':
    'Alles auf einmal zu versuchen schafft oft mentale Überforderung und schwache Ergebnisse. Schwung verbessert sich, wenn du klar erkennst, was am meisten zählt. Wichtige Arbeit sollte zuerst deine beste Energie erhalten.\n\nPriorisierung schafft Klarheit. Klarheit verbessert Ausführung.',

  'mindset.card.prod9.title':  'Sanfte Beständigkeit baut mehr als intensive Ausbrüche.',
  'mindset.card.prod9.content':
    'Extreme Bemühungsausbrüche mögen sich vorübergehend produktiv anfühlen, sind aber selten nachhaltig. Langfristiger Schwung kommt aus beständigen Routinen, die über Zeit wiederholt werden. Kleine täglich Handlungen schaffen zuverlässigeren Fortschritt als gelegentliche intensive Arbeitssitzungen.\n\nNachhaltige Bemühung bringt dauerhafte Ergebnisse.',

  'mindset.card.prod10.title': 'Bewegung reduziert auch inneren Widerstand.',
  'mindset.card.prod10.content':
    'Das Gehirn übertreibt oft die Schwierigkeit, Aufgaben zu beginnen. Sobald Handeln beginnt, nimmt Widerstand meist natürlich ab. Schwung verbessert sich, wenn du dich auf das Einleiten von Bewegung konzentrierst statt mental mit dir zu verhandeln.\n\nBewegung schafft Engagement. Schwung stärkt Fokus.',

  'mindset.card.prod11.title': 'Dinge fertigstellen schafft auch Schwung.',
  'mindset.card.prod11.content':
    'Viele Menschen lieben es zu planen und neue Ideen anzufangen, kämpfen aber mit der Vollendung. Echter Schwung beinhaltet, Aufgaben zu Ende zu führen. Vollendung schafft Schwung, Selbstvertrauen und mentale Klarheit.\n\nUnfertige Aufgaben schaffen kognitive Unordnung. Vollenden zählt.',

  'mindset.card.prod12.title': 'Einfache Systeme sind auch die nachhaltigsten.',
  'mindset.card.prod12.content':
    'Überkomplizierte Systeme schaffen oft unnötigen Stress und Verwirrung. Einfachere Routinen sind leichter beständig beizubehalten. Schwung wächst, wenn du Reibung reduzierst und dich auf das Wesentliche fokussierst.\n\nKomplexität kann eine Form von Aufschieben sein. Einfachheit verbessert Ausführung.',

  'mindset.card.prod13.title': 'Deine Umgebung formt auch, was du produzierst.',
  'mindset.card.prod13.content':
    'Unaufgeräumte Räume und konstante Ablenkungen reduzieren still Konzentration und Schwung. Eine ruhige und organisierte Umgebung unterstützt klareres Denken. Menschen mit Schwung gestalten bewusst Räume, die Fokus fördern.\n\nUmgebung beeinflusst Verhalten mehr als viele Menschen erkennen.',

  'mindset.card.prod14.title': 'Erholung ist auch Teil des Schwungs.',
  'mindset.card.prod14.content':
    'Konstante Arbeit ohne Erholung schwächt Kreativität, Fokus und emotionale Resilienz. Erholung ist keine Faulheit — sie ist Teil nachhaltiger Leistung. Menschen mit Schwung verstehen, dass Erholung langfristige Beständigkeit schützt.\n\nEin ausgeruhter Geist produziert qualitativ hochwertigere Arbeit.',

  'mindset.card.prod15.title': 'Nein zu sagen schützt auch den Schwung.',
  'mindset.card.prod15.content':
    'Zu allem Ja zu sagen zerstört Fokus und erschöpft Energie. Schwung verbessert sich, wenn du selektiver mit deiner Zeit und Aufmerksamkeit wirst. Nicht jede Anfrage verdient sofortigen Zugang zu dir.\n\nGrenzen schützen Prioritäten. Schutz schafft Fortschritt.',

  'mindset.card.prod16.title': 'Beständigkeit erhält sich auch, wenn die Motivation sinkt.',
  'mindset.card.prod16.content':
    'Motivation mag Handeln starten, aber Beständigkeit hält Konsistenz über Zeit aufrecht. Menschen mit Schwung machen weiter, auch wenn Emotionen schwanken. Routinen reduzieren Abhängigkeit von Stimmung.\n\nBeständiges Handeln bringt verlässliche Ergebnisse. Beständigkeit stärkt Schwung.',

  'mindset.card.prod17.title': 'Dinge aus dem Kopf schreiben schafft auch Raum zum Vorwärtsgehen.',
  'mindset.card.prod17.content':
    'Überforderung entsteht oft dadurch, zu viele unfertige Gedanken gleichzeitig mental zu tragen. Schwung verbessert sich, wenn du Aufgaben extern organisierst statt alles mental zu speichern. Aufzuschreiben schafft Klarheit.\n\nKlare Systeme reduzieren mentalen Druck.',

  'mindset.card.prod18.title': 'Klarheit kommt auch durch Bewegung.',
  'mindset.card.prod18.content':
    'Viele Menschen warten, bis sie sich vollständig sicher fühlen, bevor sie handeln. Aber Klarheit erscheint oft durch Bewegung, nicht davor. Schwung wächst, wenn du aufhörst, zuerst perfekte Gewissheit zu erwarten.\n\nLernen geschieht während der Ausführung. Fortschritt zeigt Richtung.',

  'mindset.card.prod19.title': 'Emotionales Gleichgewicht unterstützt auch den Schwung.',
  'mindset.card.prod19.content':
    'Stress, Angst und emotionale Erschöpfung können Schwung still zerstören. Emotionale Regulation verbessert Konzentration und Entscheidungsfähigkeit. Menschen mit Schwung lernen, mentalen Lärm zu beruhigen statt Emotionen jede Handlung kontrollieren zu lassen.\n\nEmotionale Stabilität unterstützt Leistung.',

  'mindset.card.prod20.title': 'Vorwärtsgehen bedeutet auch, Fortschritt über sofortigen Komfort zu wählen.',
  'mindset.card.prod20.content':
    'Zu scrollen, aufzuschieben und schwierige Aufgaben zu vermeiden mag sich vorübergehend tröstlich anfühlen, schafft aber oft später Stress. Schwung erfordert, bedeutsamen Fortschritt statt sofortiger Befriedigung zu wählen.\n\nVorübergehendes Unbehagen schafft oft langfristige Belohnung. Beständigkeit schützt zukünftigen Erfolg.',

  'mindset.card.prod21.title': 'Wissen, wann du am besten leistest, schützt auch den Schwung.',
  'mindset.card.prod21.content':
    'Jeder Mensch hat Perioden stärkster mentaler Klarheit und Fokus im Laufe des Tages. Menschen mit Schwung nutzen diese Stunden bewusst für wichtige Arbeit statt für Ablenkungen mit geringem Wert.\n\nStrategisches Timing verbessert Effizienz erheblich. Energiebewusstsein stärkt Ergebnisse.',

  'mindset.card.prod22.title': 'Wiederholung baut auch den Rhythmus.',
  'mindset.card.prod22.content':
    'Wiederholung stärkt Gewohnheiten und reduziert Widerstand über Zeit. Je öfter du fokussierte Arbeit übst, desto leichter wird es, Beständigkeit aufrechtzuerhalten. Schwungvolles Verhalten wird durch Wiederholung schließlich automatisch.\n\nGewohnheiten schaffen Stabilität.',

  'mindset.card.prod23.title': 'Ein weniger belasteter Geist kommt auch klarer voran.',
  'mindset.card.prod23.content':
    'Zu viele Aufgaben, Entscheidungen und Ablenkungen überfordern das Gehirn. Schwung verbessert sich, wenn du unnötigen mentalen Lärm reduzierst und Prioritäten vereinfachst. Klare Geister führen effektiver aus.\n\nMentale Organisation schützt Fokus.',

  'mindset.card.prod24.title': 'Bewusst leben bewegt auch die Dinge vorwärts.',
  'mindset.card.prod24.content':
    'Reaktives Leben schafft oft Stress und zerstreute Aufmerksamkeit. Menschen mit Schwung entscheiden bewusst, wie sie ihre Zeit und Energie verwenden möchten. Bewusstes Verhalten schafft stärkere Ausrichtung auf langfristige Ziele.\n\nBewusstsein verbessert Entscheidungsfindung.',

  'mindset.card.prod25.title': 'Die Zeit, die du pflegst, pflegt auch dich.',
  'mindset.card.prod25.content':
    'Zeit ist eine der wenigen Ressourcen, die nicht wiederhergestellt werden kann, wenn sie verloren ist. Menschen mit Schwung behandeln Zeit mit Bewusstsein und Zweck. Kleine täglich verschwendete Momente summieren sich über Jahre zu großen Verlusten.\n\nBewusster Umgang mit Zeit schafft bedeutsamen Fortschritt.',

  'mindset.card.prod26.title': 'Weniger Ablenkungen bedeutet auch mehr echter Fortschritt.',
  'mindset.card.prod26.content':
    'Jede Ablenkung schafft versteckte Erholungszeit für das Gehirn. Konstante Unterbrechungen fragmentieren Konzentration und reduzieren Ergebnisqualität. Menschen mit Schwung minimieren bewusst unnötige Benachrichtigungen, Lärm und Unterbrechungen.\n\nFokus zu schützen verbessert Effizienz auf natürliche Weise.',

  'mindset.card.prod27.title': 'Jeder Fortschritt stärkt auch das Selbstvertrauen.',
  'mindset.card.prod27.content':
    'Jede erledigte Aufgabe stärkt Selbstvertrauen und Motivation. Schwung schafft emotionalen Schwung, weil Handeln Fähigkeit beweist. Beständiger Fortschritt verbessert Selbstvertrauen über Zeit.\n\nBewegung reduziert Stillstand und mentalen Widerstand.',

  'mindset.card.prod28.title': 'Echter Schwung sollte das Wohlbefinden nicht kosten.',
  'mindset.card.prod28.content':
    'Echte Produktivität geht nicht um Burnout oder konstanten Druck. Es geht darum, bedeutsamen Fortschritt zu schaffen, während man Gesundheit, Balance und emotionales Wohlbefinden aufrechterhält. Nachhaltiger Schwung unterstützt langfristiges Wachstum statt kurzfristiger Erschöpfung.\n\nEchter Erfolg erfordert Balance.',

  'mindset.card.prod29.title': 'Wissen, was zählt, ist auch die Grundlage des Schwungs.',
  'mindset.card.prod29.content':
    'Viele Menschen verschwenden Energie, weil sie nie klar definieren, was wirklich wichtig ist. Schwung verbessert sich, wenn du aufhörst, jede Aufgabe mit gleicher Dringlichkeit zu behandeln. Wichtige Arbeit verdient fokussierte Aufmerksamkeit.\n\nKlare Prioritäten reduzieren Verwirrung und stärken Ausführung.',

  'mindset.card.prod30.title': 'Zu viel Denken bremst auch die Bewegung.',
  'mindset.card.prod30.content':
    'Tiefes Denken kann wertvoll sein, aber endlose Analyse wird oft zu verkleideten Aufschieben. Schwung wächst, wenn du aufhörst, vor dem Beginnen auf perfekte Gewissheit zu warten. Die meisten Antworten werden durch Handeln klarer.\n\nBewegung schafft Fortschritt schneller als übermäßiges Planen.',

  'mindset.card.prod31.title': 'Früh gut anfangen erleichtert auch, was folgt.',
  'mindset.card.prod31.content':
    'Wie du deinen Tag beginnst, beeinflusst deine mentale Energie für Stunden danach. Kleine produktive Handlungen früh am Tag schaffen psychologischen Schwung. Ein starker Start reduziert späteren Widerstand.\n\nFrühe Erfolge stärken Fokus und Motivation.',

  'mindset.card.prod32.title': 'Der Geist braucht auch Pausen, um weiter gut voranzukommen.',
  'mindset.card.prod32.content':
    'Konstante Stimulation und nonstop Arbeit reduzieren schließlich Kreativität und kognitive Leistung. Menschen mit Schwung verstehen die Wichtigkeit, sich periodisch zurückzuziehen, um sich mental zurückzusetzen.\n\nErholung stellt Klarheit wieder her. Ein ausgeruhter Geist löst Probleme effektiver.',

  'mindset.card.prod33.title': 'Beständigkeit wartet nicht auf die Motivation.',
  'mindset.card.prod33.content':
    'Motivation schwankt natürlich durchs Leben. Darauf zu warten, sich „danach zu fühlen", schafft Inkonsistenz und Verzögerung. Menschen mit Schwung verlassen sich mehr auf Routinen und Struktur als auf emotionale Inspiration.\n\nGewohnheiten schaffen Stabilität, wenn Emotionen sich ändern.',

  'mindset.card.prod34.title': 'Was du täglich tust, baut auch, wer du wirst.',
  'mindset.card.prod34.content':
    'Langfristiger Erfolg kommt selten aus einem außerordentlichen Moment. Er entsteht in der Regel aus wiederholten beständigen Handlungen, die über Zeit beständig geübt werden. Tägliche Gewohnheiten formen still Ergebnisse.\n\nBeständigkeit potenziert sich zu wesentlicher Transformation.',

  'mindset.card.prod35.title': 'Nicht jede Aufgabe verdient deine beste Energie.',
  'mindset.card.prod35.content':
    'Nicht alle Aufgaben verdienen deine beste mentale Energie. Menschen mit Schwung reservieren bewusst ihren stärksten Fokus für bedeutungsvolle Arbeit. Ablenkungen mit geringem Wert sollten keine mentalen Spitzenstunden verbrauchen.\n\nStrategische Energieverteilung verbessert Leistung erheblich.',

  'mindset.card.prod36.title': 'Unordnung erschöpft auch die mentale Energie.',
  'mindset.card.prod36.content':
    'Mentale Unordnung und körperliche Unordnung schaffen oft emotionale Überforderung. Zu viele unfertige Aufgaben, Benachrichtigungen und Ablenkungen schwächen Konzentration. Menschen mit Schwung vereinfachen ihre Umgebung und Systeme wann immer möglich.\n\nEinfachheit unterstützt klareres Denken.',

  'mindset.card.prod37.title': 'Erschöpfung ist keine Medaille. Sie ist ein Signal.',
  'mindset.card.prod37.content':
    'Burnout ist kein Zeichen von Erfolg. Nachhaltiger Schwung erfordert, körperliche, emotionale und mentale Grenzen zu verstehen. Strategisch zu erholen schützt langfristige Leistung.\n\nSchwung ohne Balance wird schließlich selbstzerstörerisch.',

  'mindset.card.prod38.title': 'Bewegung lindert auch Angst.',
  'mindset.card.prod38.content':
    'Viele stressige Gedanken werden kleiner, sobald Bewegung beginnt. Schwung schafft emotionale Erleichterung, weil Handeln Unsicherheit durch Fortschritt ersetzt. Vermeidung erhöht mentale Spannung.\n\nSchwung reduziert Grübeln und emotionalen Widerstand.',

  'mindset.card.prod39.title': 'Klein anfangen ist auch anfangen.',
  'mindset.card.prod39.content':
    'Große Aufgaben fühlen sich oft einschüchternd an, weil das Gehirn auf die gesamte Arbeitslast auf einmal fokussiert. Schwung verbessert sich, wenn du Ziele in handhabbare Handlungen reduzierst. Kleine Anfänge schaffen Schwung.\n\nEinfachheit reduziert Widerstand.',

  'mindset.card.prod40.title': 'Ständige Unterbrechungen zerstören auch den Schwung.',
  'mindset.card.prod40.content':
    'Konstante Unterbrechungen zerstören still Fokus und Effizienz. Menschen mit Schwung schützen ihre Aufmerksamkeit vor unnötigen Ablenkungen, Gesprächen und digitalem Lärm. Grenzen helfen, mentale Energie zu bewahren.\n\nFokus gedeiht in geschützten Umgebungen.',

  'mindset.card.prod41.title': 'Aufmerksamkeit auf das Machbare lenken bewegt auch vorwärts.',
  'mindset.card.prod41.content':
    'Sich zu beschweren und Probleme zu überfokussieren erschöpft mentale Energie ohne Fortschritt zu schaffen. Menschen mit Schwung trainieren sich, Aufmerksamkeit auf umsetzbare Lösungen zu verlagern. Lösungsorientiertes Denken verbessert Ausführung.\n\nEnergie folgt Aufmerksamkeit.',

  'mindset.card.prod42.title': 'Vorbereitung reduziert auch die Reibung des nächsten Tages.',
  'mindset.card.prod42.content':
    'Vorausschauend vorzubereiten reduziert Reibung und mentale Erschöpfung bei wichtigen Aufgaben. Menschen mit Schwung organisieren Werkzeuge, Zeitpläne und Prioritäten, bevor sie benötigt werden. Vorbereitung erhöht Effizienz und reduziert Entscheidungsermüdung.\n\nStruktur unterstützt Schwung.',

  'mindset.card.prod43.title': 'Aufmerksamkeit wird auch gezielt gepflegt.',
  'mindset.card.prod43.content':
    'Moderne Ablenkungen konkurrieren ständig um mentalen Raum. Schwung hängt stark von der Fähigkeit ab, Aufmerksamkeit bewusst zu lenken. Zerstreuter Fokus schwächt Ergebnisse.\n\nKontrollierte Aufmerksamkeit stärkt Ergebnisse und Kreativität.',

  'mindset.card.prod44.title': 'Perfektion loszulassen befreit auch die Bewegung.',
  'mindset.card.prod44.content':
    'Perfektionismus schafft oft Zögern, Verzögerung und unnötigen Stress. Menschen mit Schwung fokussieren sich auf Fortschritt und Verbesserung statt auf makellose Ausführung. Unvollkommenes Handeln schafft Lernen und Schwung.\n\nFortschritt zählt mehr als Perfektion.',

  'mindset.card.prod45.title': 'Beständige Routinen schaffen auch emotionale Stabilität.',
  'mindset.card.prod45.content':
    'Beständige Routinen reduzieren mentales Chaos durch Schaffung von Vorhersehbarkeit und Struktur. Organisierte Gewohnheiten reduzieren Überforderung und Stress. Schwung verbessert oft emotisches Wohlbefinden, weil es ein stärkeres Kontrollgefühl schafft.\n\nStabilität unterstützt Leistung.',

  'mindset.card.prod46.title': 'Bei einer Aufgabe zu bleiben vertieft auch die Arbeit.',
  'mindset.card.prod46.content':
    'Häufiger Aufgabenwechsel erschöpft kognitive Energie und schwächt Konzentration. Menschen mit Schwung bleiben lange genug bei einer wichtigen Aufgabe engagiert, um Schwung aufzubauen. Tiefer Fokus schafft qualitativ hochwertigere Ergebnisse in weniger Zeit.\n\nKontinuität verbessert Effizienz.',

  'mindset.card.prod47.title': 'Das Gehirn braucht Erholung, um gut zu leisten.',
  'mindset.card.prod47.content':
    'Mentale Leistung nimmt ab, wenn das Gehirn sich nie vollständig erholt. Erholung ist für Kreativität, emotionale Balance und Konzentration notwendig. Menschen mit Schwung verstehen, dass Ruhe langfristige Effizienz erhöht.\n\nNachhaltige Leistung erfordert Wiederherstellung.',

  'mindset.card.prod48.title': 'Was du wiederholst, wird auch Teil von dir.',
  'mindset.card.prod48.content':
    'Je beständiger du produktives Verhalten übst, desto automatischer wird es. Gewohnheiten reduzieren emotionalen Widerstand über Zeit. Schwung wird leichter, wenn Handeln keine ständige innere Verhandlung mehr erfordert.\n\nWiederholung stärkt Beständigkeit.',

  'mindset.card.prod49.title': 'Dich auf das Machbare zu fokussieren befreit auch Energie.',
  'mindset.card.prod49.content':
    'Übermäßig über externe Umstände zu sorgen erschöpft Energie und schwächt Ausführung. Schwung verbessert sich, wenn Aufmerksamkeit auf umsetzbare Schritte innerhalb deiner Kontrolle fokussiert bleibt.\n\nHandeln schafft Bewegung. Unkontrollierbare Ergebnisse zu obsessieren schafft Lähmung.',

  'mindset.card.prod50.title': 'Tiefer Fortschritt braucht Zeit, um sichtbar zu werden.',
  'mindset.card.prod50.content':
    'Viele wertvolle Ziele brauchen Zeit, bevor sichtbarer Fortschritt erscheint. Menschen mit Schwung machen weiter, auch wenn Ergebnisse sich langsam anfühlen. Geduld stärkt Ausdauer.\n\nLangfristiger Fortschritt entwickelt sich oft still, bevor er sichtbar wird.',

  'mindset.card.prod51.title': 'Verlässliche Routinen reduzieren auch den täglichen Aufwand.',
  'mindset.card.prod51.content':
    'Starke Routinen reduzieren Entscheidungsermüdung und erhöhen Beständigkeit. Menschen mit Schwung schaffen Gewohnheiten, die automatisches Handeln unterstützen, statt sich vollständig auf Willenskraft zu verlassen. Verlässliche Systeme schaffen verlässliche Ergebnisse.\n\nStruktur vereinfacht Ausführung.',

  'mindset.card.prod52.title': 'Dich selbst zu kennen verbessert auch, was du produzierst.',
  'mindset.card.prod52.content':
    'Deine Energiemuster, Ablenkungen und Gewohnheiten zu verstehen hilft, Leistung erheblich zu verbessern. Menschen mit Schwung beobachten sich ehrlich statt unhilfreiche Verhaltensweisen zu ignorieren.\n\nBewusstsein schafft bessere Entscheidungen. Reflexion verbessert Ausführung.',

  'mindset.card.prod53.title': 'Menschen mit Schwung akzeptieren auch unvollkommene Tage.',
  'mindset.card.prod53.content':
    'Nicht jeder Tag wird sich gleich fokussiert oder effizient anfühlen. Schwung wird nicht durch gelegentliche energiearme Tage zerstört. Beständigkeit zählt mehr als vorübergehende Schwankungen.\n\nMenschen mit Schwung bewegen sich weiter, ohne ständig Perfektion zu erwarten.',

  'mindset.card.prod54.title': 'Lernen zu priorisieren ist auch Schwung.',
  'mindset.card.prod54.content':
    'Mehr zu tun ist nicht immer die Antwort. Schwung verbessert sich oft, wenn du bewusst Aufgaben mit geringem Wert eliminierst. Priorisierung schützt Energie für bedeutungsvolle Arbeit.\n\nEinfachheit schafft stärkeren Fokus und bessere Ergebnisse.',

  'mindset.card.prod55.title': 'Menschen mit Schwung vermeiden Entscheidungsüberlastung.',
  'mindset.card.prod55.content':
    'Zu viele Entscheidungen erschöpfen kognitive Energie durch den ganzen Tag. Menschen mit Schwung vereinfachen Routinen und reduzieren unnötige Entscheidungen wann immer möglich. Mentale Energie sollte für wichtiges Denken reserviert werden.\n\nEinfachheit schützt Fokus.',

  'mindset.card.prod56.title': 'Schwung hängt auch stark mit Beständigkeit zusammen.',
  'mindset.card.prod56.content':
    'Ohne Beständigkeit wird Schwung inkonsistent und emotional abhängig. Menschen mit Schwung handeln weiter, auch wenn Motivation abnimmt. Beständiges Handeln bringt verlässliche Ergebnisse.\n\nBeständigkeit schützt Schwung über Zeit.',

  'mindset.card.prod57.title': 'Menschen mit Schwung denken auch langfristig.',
  'mindset.card.prod57.content':
    'Sofortiger Komfort steht oft im Konflikt mit langfristigem Fortschritt. Menschen mit Schwung treffen Entscheidungen, die zukünftige Ziele unterstützen statt nur gegenwärtige Emotionen zu befriedigen.\n\nLangfristiges Denken verbessert Beständigkeit und Geduld. Vision stärkt Beständigkeit.',

  'mindset.card.prod58.title': 'Schwung wächst, wenn du aufhörst, schwierige Aufgaben zu meiden.',
  'mindset.card.prod58.content':
    'Die Aufgaben, die du vermeidest, schaffen oft den meisten mentalen Stress. Schwung verbessert sich erheblich, wenn du wichtige Verantwortlichkeiten direkt angehst statt sie wiederholt zu verschieben.\n\nHandeln reduziert mentale Last. Vermeidung erhöht Angst.',

  'mindset.card.prod59.title': 'Echter Schwung schafft eine bessere Lebensqualität.',
  'mindset.card.prod59.content':
    'Echte Produktivität bedeutet nicht, ständig mehr zu tun. Es bedeutet, Zeit, Energie und Aufmerksamkeit bewusst zu nutzen, um bedeutsamen Fortschritt zu schaffen, während man emotionale Balance und Gesundheit aufrechterhält.\n\nNachhaltiger Schwung unterstützt sowohl Leistung als auch Wohlbefinden.',

  // ── Mindset Momentum (mom) cards — Deutsch ────────────────────────────────────
  'mindset.card.mom1.title':  'Kleine Schritte bewegen dich auch vorwärts.',
  'mindset.card.mom1.content':
    'Schwung braucht keine riesigen Sprünge. Er braucht beständige, kleine Bewegungen in die gleiche Richtung. Die Tage, an denen du dich am wenigsten motiviert fühlst, sind oft die Tage, an denen kleine Handlungen am meisten zählen.\n\nStill aufzutauchen, ohne Fanfare, ist, wo echter Fortschritt akkumuliert. Ein Schritt vorwärts heute reicht.',

  'mindset.card.mom2.title':  'Anfangen ist der schwerste Teil.',
  'mindset.card.mom2.content':
    'Widerstand erreicht seinen Höhepunkt vor dem Beginn. Sobald Bewegung beginnt, wird es fast immer leichter. Das Gehirn interpretiert Handeln als Sicherheit und reduziert allmählich Widerstand.\n\nWarte nicht, bis sich der Moment richtig anfühlt — der richtige Moment kommt meist, nachdem du bereits begonnen hast. Schwung beginnt mit einer einzigen Entscheidung zur Bewegung.',

  'mindset.card.mom3.title':  'Schwung wird neu aufgebaut, nicht wiederhergestellt.',
  'mindset.card.mom3.content':
    'Nach einer Pause gehst du nicht zurück zu null. Du kehrst zum Beginn einer neuen Serie zurück und trägst alles mit dir, was du bereits gelernt hast. Wieder aufgebauter Schwung ist oft stärker als ursprünglicher Schwung, weil er mit Beweis kommt, dass du das schon getan hast.\n\nDu weißt bereits, dass du kannst. Dieses Wissen wird nicht ausgelöscht.',

  'mindset.card.mom4.title':  'Vollenden erzeugt seine eigene Energie.',
  'mindset.card.mom4.content':
    'Jede Aufgabe, die du abschließt, setzt eine kleine psychologische Belohnung frei, die das Gehirn für die nächste vorbereitet. Deshalb kann das Beginnen irgendwo — sogar mit dem leichtesten Punkt — eine Kaskade produktiver Handlungen auslösen.\n\nSchwung ist teils biologisch. Nutze ihn bewusst. Schließe eine Sache ab und lass dann die Energie dich zur nächsten tragen.',

  'mindset.card.mom5.title':  'Beständigkeit ist stiller Schwung.',
  'mindset.card.mom5.content':
    'Die mächtigste Form des Schwungs ist für andere unsichtbar. Es ist der tägliche Akt des Auftauchens, wenn niemand es bemerkt, wenn die Ergebnisse noch nicht sichtbar sind, wenn Zweifel lauter ist als Selbstvertrauen.\n\nDiese stille Beständigkeit ist, wo echter Wandel lebt. Du brauchst keine dramatischen Durchbrüche. Du musst nur weiterhin in Bewegung bleiben.',

  'mindset.card.mom6.title':  'Fortschritt wird sichtbarer, wenn du ihn bemerkst.',
  'mindset.card.mom6.content':
    'Schwung beschleunigt sich, wenn du ihn wahrnimmst. Kleine Gewinne zu verfolgen, Vorwärtsbewegung anzuerkennen und Beständigkeit zu erkennen ist keine Eitelkeit — es ist Verstärkung. Das Gehirn baut Motivation aus Fortschrittsbeweis auf.\n\nMache deinen Schwung sichtbar, auch dir selbst. Was du misst und feierst, wächst tendenziell.',

  'mindset.card.mom7.title':  'Handeln vor Bereitschaft.',
  'mindset.card.mom7.content':
    'Auf Bereitschaft zu warten ist der Hauptfeind des Schwungs nach vorne. Bereitschaft kommt selten von selbst — sie wird durch Handeln geschaffen. Das Gefühl, vorbereitet zu sein, kommt nach den ersten Schritten, nicht davor.\n\nMenschen mit hohem Schwung handeln vor Gewissheit, lernen während der Bewegung und passen sich unterwegs an. Beginne jetzt. Passe später an.',

  'mindset.card.mom8.title':  'Der Effekt des beständigen Auftauchens.',
  'mindset.card.mom8.content':
    'Jeder Tag, an dem du auftauchst, trägt zu einem sich summierenden Fundament bei, das kurzfristig unsichtbar und langfristig unbestreitbar ist. Menschen, die scheinbar plötzliche Sprünge vorwärts machen, sind in der Regel jene, die Monate stiller, unbekannter Bemühung im Voraus investiert haben.\n\nDeine aktuelle Beständigkeit baut etwas auf, das du noch nicht vollständig sehen kannst.',

  // ── Profile remaining ──────────────────────────────────────────────────────────
  'profile.journey.eyebrow':       'DEIN RÜCKWEG',
  'profile.journey.change':        'Ändern',
  'profile.journey.choose':        'Wählen',
  'profile.journey.fallback':      'Deine Reise',
  'profile.greet.hi':               'Hallo, {{name}}.',
  'profile.greet.becoming':         'Dein Moment.',
  'profile.greet.memberSince':      'Dabei seit {{month}} {{year}}',
  'profile.greet.dayOne':           'Tag 1 deiner Reset-Reise.',
  'profile.greet.namePlaceholder':  'Dein Name',
  'profile.footer.p1': 'Jeder Reset verändert den Weg.',
  'profile.footer.p2': 'Stille Beständigkeit wird zur Identität.',
  'profile.footer.p3': 'Schwung beginnt leise.',
  'profile.footer.p4': 'Wachstum entsteht sanft.',
  'profile.footer.p5': 'Stiller Fortschritt zählt auch.',
  'profile.section.transformation': 'MEINE TRANSFORMATION',
  'profile.section.journey':        'MEINE REISE',
  'profile.section.intentions':     'MEINE ABSICHTEN',
  'profile.streak.daysInRow':       'stille Rückkehren',
  'profile.streak.personalBest':    'Längster Rhythmus',
  'profile.stat.resetsDone':        'Resets abgeschlossen',
  'profile.stat.bestStreak':        'längster Rhythmus',
  'profile.stat.firstReturn':       'erster Reset',
  'profile.stat.thisWeek':          'diese Woche',
  'profile.milestone.dayReached':   'Tag {{n}} erreicht',
  'profile.milestone.unlocked':     'Meilenstein freigeschaltet',
  'profile.milestone.firstReset':   'Tag 1 — Erster Reset',
  'profile.milestone.beginToday':   'Ein Reset beginnt die Reise.',
  'profile.milestone.dayAhead':     'Tag {{n}} liegt vor dir',
  'profile.milestone.youReThere':   'Du bist da. Schließe den heutigen Reset ab.',
  'profile.milestone.oneDayAway':   'Noch ein Tag. Bleib dabei.',
  'profile.milestone.daysAway':     'Noch {{n}} Tage.',
  'profile.transform.zero.title':   'Erster Schritt',
  'profile.transform.zero.sub':     'Alles beginnt leise.',

  // ── Day / Month names ──────────────────────────────────────────────────────────
  'dayname.sunday':    'Sonntag',   'dayname.monday':   'Montag',    'dayname.tuesday': 'Dienstag',
  'dayname.wednesday': 'Mittwoch',  'dayname.thursday': 'Donnerstag',
  'dayname.friday':    'Freitag',   'dayname.saturday': 'Samstag',

  // ── Habits (new keys) ────────────────────────────────────────────────────────
  'habits.alldone':        'Alle Gewohnheiten abgeschlossen.',
  'habits.pct.completed':  'heute abgeschlossen',

  // ── Emotional Onboarding ─────────────────────────────────────────────────────
  'emotional.skip':          'Überspringen',
  'emotional.cta.continue':  'Weiter',
  'emotional.cta.seeReset':  'Meinen Reset sehen',
  'emotional.step':          '{{i}} VON {{total}}',
  'emotional.q1.question':   'Was lastet gerade am schwersten?',
  'emotional.q1.micro':      'Es gibt keine richtige Antwort.',
  'emotional.q1.opt1':       'Gedankenüberlastung',
  'emotional.q1.opt2':       'Angst',
  'emotional.q1.opt3':       'Emotionale Erschöpfung',
  'emotional.q1.opt4':       'Fehlender Rhythmus',
  'emotional.q1.opt5':       'Schwierigkeiten weiterzumachen',
  'emotional.q1.opt6':       'Mangelnder Fokus',
  'emotional.q1.opt7':       'Gefühl der Entfremdung',
  'emotional.q2.question':   'Was vermisst du gerade?',
  'emotional.q2.micro':      'Wähle aus, was am meisten anspricht.',
  'emotional.q2.opt1':       'Ruhe',
  'emotional.q2.opt2':       'Klarheit',
  'emotional.q2.opt3':       'Selbstvertrauen',
  'emotional.q2.opt4':       'Beständigkeit',
  'emotional.q2.opt5':       'Präsenz',
  'emotional.q2.opt6':       'Emotionales Gleichgewicht',
  'emotional.q3.question':   'Wie soll sich das Leben wieder anfühlen?',
  'emotional.q3.micro':      'Dahin kehren wir sanft gemeinsam zurück.',
  'emotional.q3.opt1':       'Leichter',
  'emotional.q3.opt2':       'Ruhiger',
  'emotional.q3.opt3':       'Langsamer',
  'emotional.q3.opt4':       'Klarer',
  'emotional.q3.opt5':       'Geerdet',
  'emotional.q3.opt6':       'Emotional ausgeglichener',
  'emotional.q4.question':   'Was entfernt dich am häufigsten von dir selbst?',
  'emotional.q4.micro':      'Ohne Urteil.',
  'emotional.q4.opt1':       'Zu viele Bildschirme',
  'emotional.q4.opt2':       'Arbeitsüberlastung',
  'emotional.q4.opt3':       'Angst',
  'emotional.q4.opt4':       'Übermäßiges Nachdenken',
  'emotional.q4.opt5':       'Emotionale Müdigkeit',
  'emotional.q4.opt6':       'Fehlende Routine',

  // ── Weekly Recap ─────────────────────────────────────────────────────────────
  'recap.loading':            'Dein Rückblick wird vorbereitet...',
  'recap.eyebrow':            'WÖCHENTLICHER RÜCKBLICK',
  'recap.section.focus':      'DIESE WOCHE IM FOKUS',
  'recap.section.highlights': 'HIGHLIGHTS DER WOCHE',
  'recap.section.habits':     'GEWOHNHEITSRHYTHMUS',
  'recap.section.reflection': 'EINE FRAGE FÜR DICH',
  'recap.cel.outstanding':    'Außergewöhnlich',
  'recap.cel.strong':         'Starke Woche',
  'recap.cel.good':           'Gute Woche',
  'recap.habit.automatic':    'Deine Gewohnheiten werden automatisch.',
  'recap.habit.growing':      'Beständigkeit wächst.',
  'recap.habit.small':        'Kleine Schritte bauen den Weg.',
  'recap.cta.ready':          'Bereit für nächste Woche',
  'recap.cta.close':          'Schließen',
  'recap.week.label':         'Woche',

  // ── Paywall screen — full copy ───────────────────────────────────────────────
  'paywall.loading':               'Wird verarbeitet...',
  'paywall.legal.full':            'Abrechnung über App Store oder Google Play.',
  'paywall.v1.heading':            'Dieser Raum ist deiner\num fortzufahren.',
  'paywall.v1.body':               'Ein tieferer Raum für die Momente, die lauter,\nschwerer oder einfach schwieriger zu durchleben sind.',
  'paywall.v1.cta':                '⭐  7 Tage kostenlos testen',
  'paywall.v1.ctaSub':             'Dann 49,99 €/Jahr',
  'paywall.v1.cancel':             'Jederzeit kündbar',
  'paywall.v1.maybe':              'Vielleicht später',
  'paywall.v1.footer':             'Keine Verpflichtung. Kündige vor Ende der Testphase.',
  'paywall.v2.eyebrow':            'TAG 3',
  'paywall.v2.heading':            'Du bist\ndreimal zurückgekehrt.',
  'paywall.v2.sub':                'Es gibt hier mehr, wann immer du möchtest.',
  'paywall.v2.tagline':            'Ein ruhigerer Kopf. Eine sanftere Routine.\nEin Ort, zu dem du jeden Tag zurückkehren kannst.',
  'paywall.v2.why1':               'Du brauchst keinen zusätzlichen Druck.\nDu brauchst einen Ort, zu dem du zurückkehren kannst.',
  'paywall.v2.why2':               'Dieser Raum wird ruhiger, je öfter du zurückkehrst.',
  'paywall.v2.cta':                'Deinen Reset fortsetzen →',
  'paywall.v2.ctaSub':             'Jederzeit kündbar. Kein Druck. Dein Tempo bleibt deins.',
  'paywall.feat.mindLoud':         'Kopf voller Gedanken',
  'paywall.feat.emoTired':         'Emotional erschöpft',
  'paywall.feat.tryingAgain':      'Neu versuchen',
  'paywall.feat.needCalm':         'Ruhe brauchen',
  'paywall.feat.startingOver':     'Neu beginnen',
  'paywall.feat.hardWeek':         'Schwere Woche',
  'paywall.t1.quote':              'Ich öffne das vor jedem stressigen Meeting.',
  'paywall.t1.name':               'Sarah, 34',
  'paywall.t2.quote':              'Die einzige App, die ich ein Jahr lang nicht gelöscht habe.',
  'paywall.t2.name':               'Marcus, 41',
  'paywall.t3.quote':              'Endlich fühlt sich etwas wirklich verstanden an.',
  'paywall.t3.name':               'Priya, 29',
  'paywall.plan.badge':            'AM HÄUFIGSTEN GEWÄHLT · 7 Tage kostenlos',
  'paywall.plan.annual.name':      'Jährlich — 49,99 €/Jahr',
  'paywall.plan.annual.note':      'Für ein Jahr tieferer Unterstützung.',
  'paywall.plan.monthly.name':     'Monatlich — 8,99 €/Monat',
  'paywall.plan.monthly.note':     'Sanfte Begleitung, Monat für Monat.',
  'paywall.v3.eyebrow':            'DEIN RAUM IST NOCH DA.',
  'paywall.v3.heading':            'Es gibt hier mehr, wenn du möchtest.',
  'paywall.v3.sub':                'Für die Momente, wenn der Tag\nmehr verlangt als erwartet.',
  'paywall.v3.b1.title':           'Ein täglicher Raum, um zu dir zurückzukehren',
  'paywall.v3.b1.sub':             'Eine Reflexion. Ein Atemzug. Ein Reset.',
  'paywall.v3.b2.title':           'Emotionale Klarheit, ein Thema nach dem anderen',
  'paywall.v3.b2.sub':             'Fokus, Ruhe, Mut, Erholung — was der Tag verlangt.',
  'paywall.v3.b3.title':           'Eine kuratierte Mindset-Bibliothek',
  'paywall.v3.b3.sub':             'Reflexionen, die dich dort abholen, wo du bist.',
  'paywall.v3.annual.name':        'Jährlich',
  'paywall.v3.annual.free':        '7 Tage kostenlos',
  'paywall.v3.annual.price':       '49,99 €/Jahr',
  'paywall.v3.annual.priceSub':    '  ·  4,16 €/Monat',
  'paywall.v3.annual.note':        'Weniger als ein Kaffee. Jeden Monat.',
  'paywall.v3.monthly.name':       'Monatlich',
  'paywall.v3.monthly.price':      '8,99 €/Monat',
  'paywall.v3.monthly.note':       'Probiere es aus, kündige jederzeit.',
  'paywall.v3.cta.free':           'Meine kostenlose Woche starten →',
  'paywall.v3.cta.today':          'Heute beginnen →',
  'paywall.v3.ctaSub':             'Keine Verpflichtung. Jederzeit in den Einstellungen kündbar.',
  'paywall.v3.whatLabel':          'WAS RUHIGER WIRD',
  'paywall.v3.what1':              'Du hörst auf, jeden Morgen gegen dich selbst zu kämpfen.',
  'paywall.v3.what2':              'Das Schuldgefühl, nicht genug zu tun, wird stiller.',
  'paywall.v3.what3':              'Du beginnst langsam wieder dir selbst zu vertrauen.',
  'paywall.alert.trial.title':     'Deine 7-tägige Testphase hat begonnen.',
  'paywall.alert.trial.msg':       'Dein vollständiger Zugang ist freigeschaltet. Kündige jederzeit vor Ende der Testphase.',
  'paywall.alert.monthly.title':   'Willkommen im vollen Zugang.',
  'paywall.alert.monthly.msg':     'Alles ist jetzt freigeschaltet. Ein Tag nach dem anderen.',
  'paywall.theme.transformation.1': 'Wieder Fortschritt spüren — einen Reset nach dem anderen.',
  'paywall.theme.transformation.2': 'Beständigkeit ohne Überwältigung oder Druck aufbauen.',
  'paywall.theme.transformation.3': 'Dein zukünftiges Ich entsteht in stiller täglicher Wiederholung.',
  'paywall.theme.transformation.4': 'Ein Reset kann deine gesamte Richtung verändern.',
  'paywall.theme.future_self.1':    'In 7 Tagen beginnt der Schwung.',
  'paywall.theme.future_self.2':    'In 30 Tagen wird Beständigkeit natürlich.',
  'paywall.theme.future_self.3':    'In 90 Tagen verändert sich deine Identität.',
  'paywall.theme.future_self.4':    'Die Version, die du werden möchtest, entsteht hier.',
  'paywall.theme.calm.1':          'Beständigkeit ohne Druck. Veränderung ohne Zwang.',
  'paywall.theme.calm.2':          'Du musst nicht perfekt sein. Du musst nur zurückkehren.',
  'paywall.theme.calm.3':          'Ein sanfter täglicher Reset verändert alles, langsam.',
  'paywall.theme.calm.4':          'Stille Disziplin ist die wirksamste.',
  'paywall.theme.trial.1':         'Die vollständige Daily-Reset-Reise kostenlos erleben.',
  'paywall.theme.trial.2':         'Personalisierte emotionale Resets — jeden Tag.',
  'paywall.theme.trial.3':         'Rückkehr-Unterstützung, Rituale, Meilensteine — alles enthalten.',
  'paywall.theme.trial.4':         'Kein Druck. Jederzeit vor Ende der Testphase kündbar.',
  'paywall.lock.ritual.label':     'Reset-Ritual',
  'paywall.lock.ritual.sub':       'Dein 2-minütiger emotionaler Anker',
  'paywall.lock.recap.label':      'Wöchentlicher Rückblick',
  'paywall.lock.recap.sub':        'Sieh, wie jede Woche dich geformt hat',
  'paywall.lock.milestone.label':  'Meilenstein-Zeremonien',
  'paywall.lock.milestone.sub':    'Emotional bedeutsame Momente',
  'paywall.lock.profile.label':    'Emotionales Profil',
  'paywall.lock.profile.sub':      'Deine personalisierte Reise',
  'paywall.lock.future.label':     'System Zukünftiges Ich',
  'paywall.lock.future.sub':       'Verfolge deine Transformation',
  'paywall.lock.comeback.label':   'Rückkehr-Psychologie',
  'paywall.lock.comeback.sub':     'Zurückkehren ohne Urteil',
  'paywall.ben.0.label': '365-Tage-Reset-Programm',
  'paywall.ben.0.sub':   'Ein ganzes Jahr geführter täglicher Transformation',
  'paywall.ben.1.label': 'Reset-Ritual (Signature)',
  'paywall.ben.1.sub':   'Dein 2-minütiger täglicher emotionaler Anker',
  'paywall.ben.2.label': 'Emotionale Personalisierung',
  'paywall.ben.2.sub':   'Die App passt sich an, was du gerade brauchst',
  'paywall.ben.3.label': 'Tägliche Aktionen & Reflexionen',
  'paywall.ben.3.sub':   'Bewusste Schritte jeden Tag',
  'paywall.ben.4.label': 'Gewohnheitsarchitektur',
  'paywall.ben.4.sub':   'Routinen aufbauen, die wirklich halten',
  'paywall.ben.5.label': 'Transformations-Dashboard',
  'paywall.ben.5.sub':   'Beobachte, wie sich deine Identität verändert',
  'paywall.ben.6.label': 'Fokus- & Detox-Timer',
  'paywall.ben.6.sub':   'Gewinne deine Aufmerksamkeit und Stille zurück',
  'paywall.ben.7.label': 'Meilenstein-Zeremonien',
  'paywall.ben.7.sub':   'Emotional bedeutsame persönliche Momente',
  'paywall.ben.8.label': 'Vollständige Mindset-Bibliothek',
  'paywall.ben.8.sub':   '48+ Premium-Einsichten, mit der Zeit freigeschaltet',
  'paywall.ben.9.label': 'Rückkehr-Unterstützung',
  'paywall.ben.9.sub':   'Nie bestraft für schwere Wochen',
  'paywall.identity.title': 'Kleine tägliche Resets werden mit der Zeit zur Identität.',
  'paywall.identity.sub':   'Für Beständigkeit konzipiert, nicht Druck.',
  'paywall.path.title':  'DEIN WEG NACH VORNE',
  'paywall.path.sub.future':  'Sieh dich selbst in 90 Tagen.',
  'paywall.path.sub.default': 'Stell dir vor, wo du nach 30 Resets sein wirst.',
  'paywall.plan.title':         'WÄHLE DEINEN PLAN',
  'paywall.included':           'ALLES ENTHALTEN',
  'paywall.hero.eyebrow':       'DEINE VOLLSTÄNDIGE REISE WARTET',
  'paywall.manifesto.eyebrow':  'KLEINE VERÄNDERUNGEN. ECHTE WIRKUNG.',
  'paywall.manifesto.headline': 'Transformation entsteht im Stillen.',
  'paywall.manifesto.body':     'Die meisten warten auf den richtigen Moment.\nEchte Veränderung kommt durch tägliches Zurückkehren.',
  'paywall.manifesto.b1':       'Klarere Aufmerksamkeit mit der Zeit',
  'paywall.manifesto.b2':       'Stärkere tägliche Routinen',
  'paywall.manifesto.b3':       'Weniger emotionales Rauschen',
  'paywall.manifesto.closing':  'Sanft aufgebaut. Täglich wiederholt.',
  'paywall.what.changes':       'WAS SICH VERÄNDERT',
  'paywall.unlocked':           'MIT PREMIUM FREIGESCHALTET',

  // ── Focus Timer ─────────────────────────────────────────────────────────────
  'timer.focus.title':   'Fokus-Timer',
  'timer.detox.title':   'Digitaler Detox',
  'timer.idle':          'Bereit wenn du es bist',
  'timer.focus.running': 'Bleib konzentriert.',
  'timer.detox.running': 'Bleib präsent.',
  'timer.focus.done':    'Fokus abgeschlossen. Du bist in Kontrolle geblieben.',
  'timer.detox.done':    'Du bist in Kontrolle geblieben.',
  'timer.again':         'Nochmal starten',

  // ── Progress — narrative card ─────────────────────────────────────────────────
  'progress.narrative.moments.pre':        '',
  'progress.narrative.moments.post.one':   ' Moment, ganz deiner.',
  'progress.narrative.moments.post.other': ' Momente, ganz deine.',
  'progress.narrative.streak.pre':         '',
  'progress.narrative.streak.post.one':    ' Tag Kontinuität.',
  'progress.narrative.streak.post.other':  ' Tage Kontinuität.',

  // ── Progress — burnout recovery phases ───────────────────────────────────────
  'progress.phase.beginner.label':         'ZU DIR ZURÜCKKEHREN',
  'progress.phase.beginner.desc':          'Ohne Schuldgefühle zurückfinden',
  'progress.phase.beginner.days':          'Tage 1–7',
  'progress.phase.rebuilding.label':       'VERTRAUEN AUFBAUEN',
  'progress.phase.rebuilding.desc':        'Kleine Aktionen bauen Selbstvertrauen auf',
  'progress.phase.rebuilding.days':        'Tage 8–21',
  'progress.phase.momentum.label':         'DEINEN RHYTHMUS FINDEN',
  'progress.phase.momentum.desc':          'Beständigkeit wird zur Identität',
  'progress.phase.momentum.days':          'Tage 22–59',
  'progress.phase.identity.label':         'ZUR PERSON WERDEN',
  'progress.phase.identity.desc':          'Identität wandelt sich durch Wiederholung',
  'progress.phase.identity.days':          'Tage 60–89',
  'progress.phase.transformation.label':   'VOLLSTÄNDIGE ERNEUERUNG',
  'progress.phase.transformation.desc':    'Du hast dich neu aufgebaut',
  'progress.phase.transformation.days':    'Tage 90+',
  'progress.phase.comingNext':             'KOMMT ALS NÄCHSTES',

  // ── Progress — journey ────────────────────────────────────────────────────────
  'progress.journey.here':                 'Du bist noch hier.',
  'progress.journey.returnsCount':         'Jede Rückkehr zählt.',
  'progress.journey.nextMilestone':        'Nächster Meilenstein — Tag {{n}}',
  'progress.week.unwritten':               'Die Woche ist noch nicht geschrieben.',
  'progress.week.allDays':                 'Du warst diese Woche jeden Tag dabei.',
  'progress.week.oneReturn':               'Eine stille Rückkehr diese Woche.',
  'progress.week.nReturns':               'Du bist diese Woche {{n}} Mal zurückgekehrt.',
  'progress.card.daysIn':                  'Tage unterwegs',
  'progress.card.resetsDone':              'Resets abgeschlossen',
  'progress.chapter.week1':                'Die erste Woche. Etwas hat begonnen.',
  'progress.chapter.week2':                'Zwei Wochen. Der Rhythmus beginnt zu halten.',
  'progress.chapter.month1':               'Ein Monat. Rückkehren wurde zur Kontinuität.',

  // ── Progress screen ──────────────────────────────────────────────────────────
  'progress.ring.journeyStarted': 'Reise begonnen',
  'progress.ring.ofYourPath':     'deines Weges',
  'progress.ring.todayRhythm':    "Rhythmus\nvon heute",
  'progress.ring.weekPattern':    "Muster\ndieser Woche",
  'progress.ring.youreHere':      'Tag {{day}} — du bist hier.',
  'progress.ring.daysAhead':      'Noch {{days}} Tage',
  'progress.ring.tomorrowMilestone': 'Morgen erreichst du Tag {{n}}.',
  'progress.ring.daysToMilestone':   'Noch {{days}} Tage bis zu deinem nächsten Meilenstein — Tag {{n}}.',
  'progress.section.journey':        'DEINE REISE',
  'progress.section.commitment':     'DEIN ENGAGEMENT',
  'progress.section.showingUp':      'DEINE PRÄSENZ',
  'progress.section.storyNumbers':   'DEINE GESCHICHTE IN ZAHLEN',
  'progress.section.chapters':       'DEINE KAPITEL',
  'progress.section.pathTitle':      'TRANSFORMATIONSPFAD',
  'progress.section.yourStory':      'DEINE GESCHICHTE',
  'progress.streak.choosingYou':     'stille Rückkehren',
  'progress.streak.personalBest':    'Dein persönliches Bestes',
  'progress.streak.yourBest':        'Dein Bestes: {{n}} Tage',
  'progress.cal.title':              'Die letzten 7 Tage',
  'progress.cal.sevenForSeven':      'Sieben von sieben. Eine volle Woche.',
  'progress.cal.showedUpN':          'Du warst diese Woche {{n}} Mal da.',
  'progress.cal.daysShowedUp':       '{{n}} Tage Präsenz. Behalte den Faden.',
  'progress.cal.weekOpen':           'Die Woche ist noch offen. Ein Reset verändert sie.',
  'progress.cal.returnedN':          'Du bist {{n}} Mal zurückgekehrt. Das zählt.',
  'progress.trend.label':            '14-Tage-Beständigkeit',
  'progress.evidence.sectionTitle':  'BEWEISE DEINER RÜCKKEHR',
  'progress.evidence.card1Title':    'Du bist zurück',
  'progress.evidence.card1Sub':      'Momente abgeschlossen',
  'progress.evidence.card2Title':    'Dein Rhythmus',
  'progress.evidence.card2Sub':      'stille Rückkehren',
  'progress.evidence.card3Title':    'Noch hier',
  'progress.evidence.card3Sub':      'Mal diese Woche',
  'progress.evidence.card4Title':    'Längste Periode',
  'progress.evidence.card4Sub':      'beste Rückkehr',
  'progress.stat.consecutiveDays':   'Tage der Rückkehr',
  'progress.stat.choosingYourself':  'Stille Beständigkeit.',
  'progress.stat.bestStreak':        'Längste Rückkehr',
  'progress.stat.bestStreakSub':     'Dein stärkster Rhythmus.',
  'progress.stat.totalResets':       'Abgeschlossene Momente',
  'progress.stat.totalResetsSub':    'Kleine Resets. Echte Beweise.',
  'progress.stat.thisWeek':          'Rhythmus dieser Woche',
  'progress.stat.daysShowedUp':      'Mal dabei gewesen.',
  'progress.milestone.firstAwaits':  'Dein erstes Kapitel wartet still.',
  'progress.milestone.firstSub':     'Ein Kapitel beginnt an Tag 3.',
  'progress.roadmap.7days':          '7 Tage',
  'progress.roadmap.1month':         '1 Monat',
  'progress.roadmap.2months':        '2 Monate',
  'progress.roadmap.3months':        '3 Monate',
  'progress.roadmap.6months':        '6 Monate',
  'progress.roadmap.momentum':       'Schwung',
  'progress.roadmap.clarity':        'Klarheit',
  'progress.roadmap.identity':       'Identität',
  'progress.roadmap.rhythm':         'Rhythmus',
  'progress.roadmap.transformation': 'Transformation',
  'progress.story.weeklyRecaps':     'Wöchentliche Rückblicke',
  'progress.story.weeklySubEmpty':   'Deine wöchentliche Reise, gespiegelt.',
  'progress.story.weeklySubCount':   '{{n}} Woche{{s}} deiner Reise',
  'progress.story.reflection':       'Reflexions-Tagebuch',
  'progress.story.reflectionSubEmpty': 'Dein stiller emotionaler Begleiter.',
  'progress.story.reflectionSubCount': '{{n}} Reflexion{{s}} geschrieben',

  // ── Progress v2 ───────────────────────────────────────────────────────────────
  'progress2.hero.title':                  'Etwas in dir kehrt immer wieder zurück.',
  'progress2.hero.subtitle':               'Still hat sich etwas verändert.',
  'progress2.hero.variation.0':            'Du hast weitergemacht, auch an leichteren Tagen.',
  'progress2.hero.variation.1':            'Deine Rückkehr ist mit der Zeit sanfter geworden.',
  'progress2.hero.variation.2':            'Jeder Besuch hat eine kleine Spur hinterlassen.',
  'progress2.hero.variation.3':            'Du hast verlangsamt, ohne zu verschwinden.',
  'progress2.hero.variation.4':            'Dein Rhythmus begann wieder aufzutauchen.',
  'progress2.hero.variation.5':            'Diese Rückkehren werden immer mehr zu deinen.',
  'progress2.rhythm.title':               'Wöchentlicher Rhythmus',
  'progress2.rhythm.label':               'angesammelte Präsenz',
  'progress2.rhythm.description':         'Basierend auf Tagen, an denen du zurückgekehrt bist, etwas geschrieben oder einen Reset abgeschlossen hast.',
  'progress2.rhythm.emptyTitle':          'Deine Präsenz formt sich noch.',
  'progress2.rhythm.emptyDescription':    'Kehre einige Tage zurück und dieser Bereich beginnt deine Muster widerzuspiegeln.',
  'progress2.rhythm.returnMain':          'Du bist zurück.',
  'progress2.rhythm.returnLabel':         'Präsenz aufgezeichnet',
  'progress2.rhythm.tagline':             'Jede Rückkehr hinterlässt eine Spur.',
  'progress2.signals.title':              'Echte Zeichen',
  'progress2.signals.return.title':       'Du bist zurück',
  'progress2.signals.return.text':        'Du bist immer wieder zurückgekehrt.',
  'progress2.signals.presence.title':     'Mehr Präsenz',
  'progress2.signals.presence.text':      'Du hast verlangsamt.',
  'progress2.signals.stability.title':    'Eine stille Beständigkeit',
  'progress2.signals.stability.text':     'Beständigkeit hat wieder begonnen zu erscheinen.',
  'progress2.patterns.title':             'Bemerkte Muster',
  'progress2.patterns.empty':             'Halte weiterhin kleine Momente fest. Deine Muster erscheinen mit der Zeit.',
  'progress2.patterns.1':                 'Du neigst dazu, zurückzukehren, wenn sich der Reset leicht anfühlt.',
  'progress2.patterns.2':                 'Dein Fortschritt erscheint mehr in Wiederholung als in Intensität.',
  'progress2.patterns.3':                 'Einfache Tage haben dir geholfen, dabei zu bleiben.',
  'progress2.patterns.4':                 'Kleine Pausen scheinen das Gewicht des Tages zu erleichtern.',
  'progress2.patterns.5':                 'Du bist präsenter, wenn du verlangsamst.',
  'progress2.patterns.6':                 'Deine Rückkehr geschieht leichter ohne Druck.',
  'progress2.patterns.7':                 'Beständigkeit beginnt in kleinen Bewegungen zu erscheinen.',
  'progress2.patterns.8':                 'Du scheinst besser auf Sanftheit als auf Forderung zu reagieren.',
  'progress2.patterns.9':                 'Du kommst leichter voran, wenn der Tag keine Perfektion verlangt.',
  'progress2.patterns.10':                'Du schaffst Raum, bevor du reagierst.',
  'progress2.timeline.title':             'Wiederaufbaulinie',
  'progress2.timeline.day1.title':        'Du hast begonnen.',
  'progress2.timeline.day1':              'Etwas hat sich genug verändert, um dich hierher zu bringen.',
  'progress2.timeline.day7.title':        'Erste Zeichen.',
  'progress2.timeline.day7':              'Ein Rhythmus begann sich zu zeigen.',
  'progress2.timeline.day14.title':       'Weniger Aufwand.',
  'progress2.timeline.day14':             'Zurückzukehren begann sich natürlicher anzufühlen.',
  'progress2.timeline.day30.title':       'Eine Grundlage.',
  'progress2.timeline.day30':             'Du hast etwas aufgebaut, das zwischen den Tagen weiter existiert.',
  'progress2.timeline.day60.title':       'Mehr Stabilität.',
  'progress2.timeline.day60':             'Dein Fortschritt hörte auf, von perfekten Tagen abzuhängen.',
  'progress2.timeline.day90.title':       'Aufgebaute Präsenz.',
  'progress2.timeline.day90':             'Du hast eine beständigere Beziehung zu dir selbst aufgebaut.',
  'progress2.summary.title':              'Zeichen auf dem Weg',
  'progress2.summary.resets':             'bemerkte Rückkehren',
  'progress2.summary.journal':            'festgehaltene Momente',
  'progress2.summary.returnDays':         'heutige Präsenz',
  'progress2.summary.weeks':              'beste Serie',
  'progress2.summary.resets.one':         'bemerkte Rückkehr',
  'progress2.summary.journal.one':        'festgehaltener Moment',
  'progress2.summary.returnDays.one':     'heutige Präsenz',
  'progress2.milestone.7':               'Deine Rückkehr hat begonnen, Rhythmus zu schaffen.',
  'progress2.milestone.14':              'Du hast begonnen, ohne Zwang zurückzukehren.',
  'progress2.milestone.30':              'Dein Rhythmus hat begonnen, dir zu vertrauen.',
  'progress2.milestone.60':              'Zurückkehren hat sich natürlich angefühlt.',
  'progress2.milestone.90':              'Du fängst nicht mehr von vorne an.',

  // ── Private space card ────────────────────────────────────────────────────────
  'progress2.space.eyebrow':             'DEIN PRIVATER RAUM',
  'progress2.space.title':               'Ein ruhiger Ort, um das Schwere loszulassen.',
  'progress2.space.placeholder':         'Du kannst das hier lassen.',
  'progress2.space.saved':               'Gespeichert.',
  'progress2.space.action.keep':         'Behalten',
  'progress2.space.action.release':      'Loslassen',
  'progress2.space.feedback.kept':       'Dein Moment wurde bewahrt.',
  'progress2.space.feedback.return':     'Du kannst zurückkommen, wann du möchtest.',
  'progress2.space.feedback.released':   'Du musst das nicht mehr tragen.',
  'progress2.space.prompt.0':            'Was hat heute deine Energie erschöpft?',
  'progress2.space.prompt.1':            'Was willst du nicht in den nächsten Tag mitnehmen?',
  'progress2.space.prompt.2':            'Was versucht dein Geist gerade zu verarbeiten?',
  'progress2.space.prompt.3':            'Welcher Moment hat heute etwas Ruhe gebracht?',
  'progress2.space.prompt.4':            'Was würdest du gerne loslassen?',
  'progress2.space.prompt.5':            'Was versucht dir deine Erschöpfung zu sagen?',
  'progress2.space.prompt.6':            'Was hat dir heute gefehlt?',
  'progress2.space.prompt.7':            'Was ist zu schwer geworden, um es schweigend zu tragen?',
  'progress2.space.prompt.8':            'Welcher Teil von dir verdient mehr Sanftheit?',
  'progress2.space.prompt.9':            'Was vermeidest du zu fühlen?',
  'progress2.space.prompt.10':           'Welcher Teil von dir braucht heute mehr Geduld?',
  'progress2.space.prompt.11':           'Was hast du heute ungesagt gelassen?',
  'progress2.space.prompt.12':           'Was erschwert die Ruhe?',
  'progress2.space.prompt.13':           'Welcher Gedanke ist den ganzen Tag bei dir geblieben?',

  // ── Weekly recap card ─────────────────────────────────────────────────────────
  'progress2.weekrecap.eyebrow':         'WOCHE IM RÜCKBLICK',
  'progress2.weekrecap.subtitle':        'Ein ruhiger Blick auf deine Woche.',
  'progress2.weekrecap.seeAll':          'Verlauf ansehen',
  'progress2.weekrecap.n0':              'Diese Woche nimmt noch Form an.',
  'progress2.weekrecap.n1':              'Du bist einmal zurückgekehrt. Das zählt schon.',
  'progress2.weekrecap.n2':              'Zwei Rückkehren diese Woche. Ein Rhythmus beginnt.',
  'progress2.weekrecap.n3':              'Drei Rückkehren. Etwas beginnt sich zu stabilisieren.',
  'progress2.weekrecap.n4':              'Du warst diese Woche viermal dabei.',
  'progress2.weekrecap.n5':              'Fünf Rückkehren. Deine Routine findet ihre Form.',
  'progress2.weekrecap.n6':              'Sechs Tage. Stille Beständigkeit, die wiederaufbaut.',
  'progress2.weekrecap.n7':              'Sieben Tage. Eine vollständige Woche der Präsenz.',
  'progress2.weekrecap.streakN':         '{{n}} Tage hintereinander. Du kehrst immer zurück.',

  // ── Quiet reflections card ────────────────────────────────────────────────────
  'progress2.quietref.eyebrow':          'STILLE REFLEXIONEN',
  'progress2.quietref.subtitle':         'Deine emotionalen Aufzeichnungen.',
  'progress2.quietref.seeAll':           'Alle ansehen',
  'progress2.quietref.empty':            'Deine Reflexionen erscheinen hier.',
  'progress2.quietref.today':            'Heute',
  'progress2.quietref.yesterday':        'Gestern',
  'progress2.quietref.daysAgo':          'vor {{n}} Tagen',
  'progress2.quietref.countOne':         'Deine Momente sind hier.',
  'progress2.quietref.countMany':        'Deine Momente sind hier.',
  'progress2.history.weekrecap.title':   'Wöchentlicher Rückblick',
  'progress2.history.weekrecap.sub.many': 'Du bist öfter zurückgekehrt als du bemerkt hast.',
  'progress2.history.weekrecap.sub.some': 'Auch die leichteren Tage haben gezählt.',

  // ── Days & months ────────────────────────────────────────────────────────────
  'day.sun': 'So',  'day.mon': 'Mo',  'day.tue': 'Di',  'day.wed': 'Mi',
  'day.thu': 'Do',  'day.fri': 'Fr',  'day.sat': 'Sa',
  'month.jan': 'Jan', 'month.feb': 'Feb', 'month.mar': 'Mär', 'month.apr': 'Apr',
  'month.may': 'Mai', 'month.jun': 'Jun', 'month.jul': 'Jul', 'month.aug': 'Aug',
  'month.sep': 'Sep', 'month.oct': 'Okt', 'month.nov': 'Nov', 'month.dec': 'Dez',

  // ── Return experience ────────────────────────────────────────────────────────
  'return.heading':       'Du bist zurück.',
  'return.30plus.body':   'Du warst eine Weile weg.\n\nHier hat niemand gezählt.\nHier braucht es keine Erklärung.\n\nDu bist zurückgekehrt.\nDas ist alles, was zählt.',
  'return.30plus.extra':  'Lange Abwesenheiten sind kein Scheitern.\nSie gehören dazu.',
  'return.7plus.body':    'Du warst kurz weg.\n\nHier hat niemand gezählt.\nDu schuldest niemandem eine Erklärung.\n\nDu bist zurückgekehrt.\nDas reicht.',
  'return.3plus.body':    'Kein Aufholen.\nNur heute.',
  'return.cta':           'Heute beginnen',

  // ── Welcome back experience ───────────────────────────────────────────────────
  'wb.normal.0':      'Schön, dass du wieder da bist.',
  'wb.normal.1':      'Fangen wir ruhig an.',
  'wb.normal.2':      'Eine kleine Pause nur für dich.',
  'wb.normal.3':      'Ein stiller Moment.',
  'wb.normal.4':      'Du bist da.',
  'wb.returning.0':   'Du kannst jederzeit neu beginnen.',
  'wb.returning.1':   'Kein Druck. Nur heute.',
  'wb.returning.2':   'Du musst nichts nachholen.',
  'wb.returning.3':   'Willkommen zurück bei dir.',
  'wb.returning.4':   'Noch da. Noch deins.',
  'wb.active.0':      'Leiser Fortschritt.',
  'wb.active.1':      'Du bist für dich da geblieben.',
  'wb.active.2':      'Kleine Schritte zählen auch.',
  'wb.active.3':      'Beständigkeit darf sanft sein.',
  'wb.active.4':      'Ein ruhigerer Rhythmus.',
  'wb.late_night.0':  'Ein stiller Moment vor der Ruhe.',
  'wb.late_night.1':  'Du bist noch hier.',
  'wb.late_night.2':  'Das ist genug.',
  'wb.late_night.3':  'Lass den Tag sich setzen.',
  'wb.late_night.4':  'Stille ist auch etwas.',

  ...psDe,
};

// ── Português (pt) — Phase 1: onboarding keys fully translated ───────────────
const pt: TranslationMap = {
  // Common
  'common.continue':    'Continuar',
  'common.skip':        'Pular',

  // Mirror screen (kept for future use)
  'onboarding.mirror.eyebrow':   'ANTES DE COMEÇAR',
  'onboarding.mirror.headline':  'Você está carregando\nmuita coisa agora.',
  'onboarding.mirror.body':      'Isso não é um problema a resolver.\nÉ só onde você está.',
  'onboarding.mirror.cta':       'Eu conheço esse sentimento',

  // Arrival question (Screen 3 — active)
  'onboarding.arrival.label':              'UMA PERGUNTA',
  'onboarding.arrival.title':              'Como você\nchegou hoje?',
  'onboarding.arrival.subtitle':           'Não existe resposta errada aqui.',
  'onboarding.arrival.options.exhausted':  'Cheguei como consegui.',
  'onboarding.arrival.options.anxious':    'Minha mente não desacelera.',
  'onboarding.arrival.options.empty':      'Tudo está pesado demais agora.',
  'onboarding.arrival.options.breathe':    'Só preciso de um momento para respirar.',
  'onboarding.arrival.options.returning':  'Estou tentando me encontrar de volta.',
  'onboarding.arrival.cta':               'É assim que estou hoje',

  // Onboarding Promise
  'onboarding.promise.heading':         "Um momento.\nTodos os dias.\nSó seu.",
  'onboarding.promise.body':            "Uma pequena pausa por dia. Não para consertar você —\nmas para ajudar você a atravessar.",
  'onboarding.promise.pill.nopressure': 'Sem pressão',
  'onboarding.promise.pill.minutes':    '2 minutos',
  'onboarding.promise.pill.pace':       'No seu ritmo',
  'onboarding.promise.cta':            'Começar meu reset →',
  'onboarding.promise.hint':           'Sem conta. Comece em segundos.',

  // Notificações (setup)
  'notif.morning':          'Manhã',
  'notif.afternoon':        'Tarde',
  'notif.evening':          'Noite',
  'notif.step':             'PASSO 2 DE 2',
  'notif.title':            "Qual momento do dia\nparece mais seu?",
  'notif.subtitle':         "Seu reset pode chegar com calma —\nquando você mais precisar respirar.",
  'notif.bridge':           'Constância começa com gentileza.',
  'notif.morning.sublabel':   '7:00 · Reset da manhã',
  'notif.afternoon.sublabel': '12:00 · Pausa para respirar',
  'notif.evening.sublabel':   '20:00 · Fechar o dia com calma',
  'notif.cta':              'Começar meu reset',

  // ── Emotional Onboarding ─────────────────────────────────────────────────────
  'emotional.skip':          'Pular',
  'emotional.cta.continue':  'Continuar',
  'emotional.cta.seeReset':  'Ver meu reset',
  'emotional.step':          '{{i}} DE {{total}}',
  'emotional.q1.question':   'O que está mais pesado ultimamente?',
  'emotional.q1.micro':      'Não existe resposta certa aqui.',
  'emotional.q1.opt1':       'Sobrecarga mental',
  'emotional.q1.opt2':       'Ansiedade',
  'emotional.q1.opt3':       'Esgotamento emocional',
  'emotional.q1.opt4':       'Falta de ritmo',
  'emotional.q1.opt5':       'Dificuldade de continuar',
  'emotional.q1.opt6':       'Falta de foco',
  'emotional.q1.opt7':       'Sensação de desconexão',
  'emotional.q2.question':   'O que você sente que tem faltado?',
  'emotional.q2.micro':      'Escolha o que mais ressoa com você.',
  'emotional.q2.opt1':       'Calma',
  'emotional.q2.opt2':       'Clareza',
  'emotional.q2.opt3':       'Autoconfiança',
  'emotional.q2.opt4':       'Consistência',
  'emotional.q2.opt5':       'Presença',
  'emotional.q2.opt6':       'Equilíbrio emocional',
  'emotional.q3.question':   'Como você gostaria de se sentir de novo?',
  'emotional.q3.micro':      'É pra cá que estamos voltando.',
  'emotional.q3.opt1':       'Mais leve',
  'emotional.q3.opt2':       'Mais em paz',
  'emotional.q3.opt3':       'Mais devagar',
  'emotional.q3.opt4':       'Com mais clareza',
  'emotional.q3.opt5':       'Com mais chão',
  'emotional.q3.opt6':       'Com mais equilíbrio interno',
  'emotional.q4.question':   'O que mais te afasta de você?',
  'emotional.q4.micro':      'Sem julgamentos aqui.',
  'emotional.q4.opt1':       'Excesso de telas',
  'emotional.q4.opt2':       'Sobrecarga no trabalho',
  'emotional.q4.opt3':       'Ansiedade',
  'emotional.q4.opt4':       'Excesso de pensamentos',
  'emotional.q4.opt5':       'Fadiga emocional',
  'emotional.q4.opt6':       'Falta de rotina',

  // Today — greetings
  'today.greeting.morning':   'BOM DIA.',
  'today.greeting.afternoon': 'BOA TARDE.',
  'today.greeting.evening':   'BOA NOITE.',
  'today.greeting.done':      'AINDA AQUI.',

  // Today — subheadlines rotativas
  'today.subheadline.0': 'Algumas mudanças só aparecem semanas depois de começarem.',
  'today.subheadline.1': 'A versão de você que ainda está aqui já fez algo.',
  'today.subheadline.2': 'Nada construído em silêncio parece muito por fora.',
  'today.subheadline.3': 'O ritmo não precisa que todo dia seja igual.',
  'today.subheadline.4': 'Mesmo um retorno lento é um retorno.',
  'today.subheadline.5': 'Presença não é uma performance.',
  'today.subheadline.6': 'A distância entre onde você estava e onde está agora é real.',

  // Today — mood check-in
  'today.mood.label': 'Como você está agora?',
  'today.mood.hard':  'Difícil',
  'today.mood.okay':  'Ok',
  'today.mood.good':  'Bem',

  // Today — palavra do dia
  'today.word.label': 'SUA PALAVRA DE HOJE',

  // Today — títulos de seção
  'today.section.action':     'Para soltar hoje',
  'today.section.why':        'Por que isso ajuda',
  'today.section.reflection': 'Uma pausa',

  // Today — CTA
  'today.cta.complete': 'Finalizar o reset de hoje',

  // Today — ritual e tomorrow
  'today.ritual.name': 'Ritual de Reset',
  'today.ritual.sub':  'Um momento calmo para voltar para si.',
  'today.reflect.eyebrow':        'UM MOMENTO PARA REFLETIR',
  'today.reflect.done':           '✓ Você deixou algo aqui.',
  'today.messages.welcomeBack':   'BEM-VINDA DE VOLTA',

  // Completion ceremony
  'ceremony.whatsAhead': 'O QUE VEM A SEGUIR',

  // Future Self
  'future.self.eyebrow':    'SEU EU FUTURO',
  'future.self.question':   'UMA PERGUNTA PARA VOCÊ',
  'future.self.prompt.sub': 'Um momento. Não existe resposta certa.',
  'today.tomorrow.label':         'AMANHÃ',
  'today.tomorrow.day2begins':    'Amanhã começa o Dia 2.',
  'today.tomorrow.dayArrives':    'Amanhã continua.',
  'today.tomorrow.eyebrow':       'RESET DE AMANHÃ',
  'today.tomorrow.nopressure':    'No seu ritmo.',
  'today.tomorrow.continues.top': 'SUA JORNADA CONTINUA',
  'today.tomorrow.continues.msg': 'Descanse. Volte quando estiver pronta.',
  'today.tomorrow.continues.cta': 'Vai estar aqui amanhã.',

  // Ritual — subtítulo dinâmico (estado emocional + rotação genérica)
  'today.ritual.sub.racing':      'Dois minutos para desacelerar.',
  'today.ritual.sub.tired':       'Um espaço para respirar.',
  'today.ritual.sub.overwhelmed': 'Menos peso por alguns minutos.',
  'today.ritual.sub.unclear':     'Um exercício para organizar a mente.',
  'today.ritual.sub.drained':     'Sem pressão. Só presença.',
  'today.ritual.sub.balanced':    'Um momento para observar o que está funcionando.',
  'today.ritual.sub.g0':          'Um momento criado para hoje.',
  'today.ritual.sub.g1':          'Seu reset está pronto.',
  'today.ritual.sub.g2':          'Algo simples para fazer agora.',
  'today.ritual.sub.g3':          'Um pequeno retorno para você.',
  'today.ritual.sub.g4':          'Seu próximo passo está aqui.',

  // Amanhã — mensagens por estágio
  'today.tomorrow.s1.0': 'Você não precisa fazer mais. Só voltar.',
  'today.tomorrow.s1.1': 'O caminho começa exatamente aqui.',
  'today.tomorrow.s1.2': 'Cada retorno conta, mesmo os pequenos.',
  'today.tomorrow.s1.3': 'Há algo te esperando amanhã.',
  'today.tomorrow.s1.4': 'Um passo de cada vez já é suficiente.',
  'today.tomorrow.s2.0': 'Às vezes a clareza aparece depois do descanso.',
  'today.tomorrow.s2.1': 'O ritmo está começando a se revelar.',
  'today.tomorrow.s2.2': 'Nem todo avanço faz barulho.',
  'today.tomorrow.s2.3': 'Amanhã também é seu.',
  'today.tomorrow.s2.4': 'Um detalhe pequeno pode mudar o tom do dia.',
  'today.tomorrow.s3.0': 'Algumas respostas chegam quando a pressa vai embora.',
  'today.tomorrow.s3.1': 'O que você construiu aqui não desaparece.',
  'today.tomorrow.s3.2': 'Algo quieto está se consolidando.',
  'today.tomorrow.s3.3': 'Amanhã você vai notar algo que hoje ainda não está claro.',
  'today.tomorrow.s3.4': 'Há sempre mais a descobrir, sem pressa.',
  'today.tomorrow.s4.0': 'O silêncio também tem peso. E você sabe disso.',
  'today.tomorrow.s4.1': 'Cada retorno é uma escolha feita de novo.',
  'today.tomorrow.s4.2': 'O que parece pequeno muitas vezes é o que fica.',
  'today.tomorrow.s4.3': 'Há uma continuidade aqui que só você enxerga.',
  'today.tomorrow.s4.4': 'Amanhã não precisa provar nada. Só estar.',

  // Today — categorias
  'today.cat.Focus':      'Foco',
  'today.cat.Rhythm':     'Ritmo',
  'today.cat.Discipline': 'Disciplina',
  'today.cat.Courage':    'Coragem',
  'today.cat.Momentum':   'Ritmo',
  'today.cat.Calm':       'Calma',
  'today.cat.Clarity':    'Clareza',
  'today.cat.Rest':       'Descanso',

  // Today — streak state
  'today.streak.paused':    'Pausada — bem-vinda de volta',
  'today.streak.resting':   'Descansando — tudo bem',
  'today.streak.returning': 'Você voltou.',
  'today.day.label':        'DIA {{day}}',

  // Reflection write screen
  'reflect.eyebrow':     'REFLEXÃO',
  'reflect.save':        'Salvar',
  'reflect.skip':        'Agora não',
  'reflect.saved':       'Salvo ✓',
  'reflect.microcopy':   'Uma frase já basta.',
  'reflect.placeholder': 'Escreva sem pressa...',
  'reflect.privacy':     'Só você pode ver isso.',

  // Journal
  'journal.title':            'Suas reflexões',
  'journal.subtitle':         '{{n}} dias registrados',
  'journal.subtitle.one':     '1 dia registrado',
  'journal.subtitle.other':   '{{n}} dias registrados',
  'journal.empty.title':      'Ainda nada aqui.',
  'journal.empty.sub':        "Suas entradas vão aparecer aqui\ndepois do seu primeiro reset.",
  'journal.day':              'DIA {{day}}',
  'journal.completed':        '✓ Reset feito',
  'journal.pill.action':      'Ação',
  'journal.pill.reflection':  'Reflexão',
  'journal.nonotes':          'Reset concluído. Sem anotações adicionadas.',
  'journal.norecord':         'Nenhuma anotação registrada.',
  'journal.recent.title':     'Resets recentes',
  'journal.calendar.title':   'Calendário da sua jornada',
  'journal.modal.label.today':      'O RESET DE HOJE',
  'journal.modal.label.action':     'SEU RESET DE HOJE',
  'journal.modal.label.why':        'POR QUE ISSO AJUDA',
  'journal.modal.label.reflection': 'REFLEXÃO',
  'journal.modal.label.moment':     'MOMENTO PARA REFLETIR',
  'journal.modal.label.after':      'APÓS O RESET',
  'journal.modal.after.sub':        'O que ficou com você hoje',
  'journal.modal.nonote':       'Nenhuma anotação adicionada.',
  'journal.modal.noreflection': 'Nenhuma reflexão adicionada.',
  'journal.modal.completed':    '✓ Reset concluído',

  // Quiet Reflections
  'qr.title':         'Reflexões Silenciosas',
  'qr.subtitle':      'Seus momentos particulares, guardados com cuidado.',
  'qr.empty.title':   'Alguns pensamentos passam em silêncio. Outros ficam.',
  'qr.empty.body':    'Um espaço tranquilo para o que importa.',
  'qr.view.older':    'Ver reflexões mais antigas com calma',
  'qr.closing':       'Esses momentos pertencem a você.',
  'qr.group.week':    'Esta Semana',
  'qr.group.month':   'No Começo do Mês',
  'qr.group.before':  'Guardados com carinho',
  'qr.echo.0':        'Você tem carregado muita coisa em silêncio.',
  'qr.echo.1':        'Você continua voltando mesmo assim.',
  'qr.echo.2':        'Algumas coisas são melhor sustentadas do que resolvidas.',
  'qr.echo.3':        'Nem tudo o que pesa precisa ser resolvido agora.',
  'qr.echo.4':        'Você esteve presente para si mesmo, quietamente.',
  'qr.echo.5':        'Um pensamento suave ficou com você.',
  'qr.echo.6':        'Alguns pensamentos pedem para ser ouvidos, não resolvidos.',
  'qr.echo.7':        'Você tem estado aqui por si mesmo.',

  // Progress — espaço particular
  'progress.privatespace.eyebrow':        'SEU ESPAÇO PARTICULAR',
  'progress.privatespace.headline':       'Um lugar tranquilo para soltar o que está pesado.',
  'progress.privatespace.start':          'Escreva aqui...',
  'progress.privatespace.placeholder':    'Deixe vir...',
  'progress.privatespace.done':           'Pronto',
  'progress.privatespace.keep':           'Ficar com isso',
  'progress.privatespace.letgo':          'Deixar ir',
  'progress.privatespace.kept.title':     'Guardado em silêncio.',
  'progress.privatespace.kept.sub':       'Essa reflexão ficou com você.',
  'progress.privatespace.released.title': 'Solto com cuidado.',
  'progress.privatespace.released.sub':   'Alguns pensamentos podem passar.',
  'progress.qr.title':                    'Reflexões Silenciosas',
  'progress.qr.sub.empty':               'Seus momentos particulares, guardados com cuidado.',
  'progress.qr.sub.count':               '{{n}} reflexão{{s}} guardadas com cuidado.',
  'progress.qr.sub.count.one':           '1 reflexão guardada em silêncio.',
  'progress.qr.sub.count.other':         '{{n}} reflexões guardadas em silêncio.',
  'progress.story.weeklySubCount.one':   '1 semana da sua jornada',
  'progress.story.weeklySubCount.other': '{{n}} semanas da sua jornada',
  'progress.section.yourjourney':         'SUA JORNADA',
  'progress.section.wordtoday':           'SUA PALAVRA DE HOJE',
  'progress.section.chapters':            'SEUS CAPÍTULOS',
  'progress.section.yourStory':           'SUA HISTÓRIA',
  'progress.milestone.firstAwaits':       'Seu primeiro capítulo está quietamente à frente.',
  'progress.milestone.firstSub':          'Um capítulo começa no Dia 3.',
  'progress.story.weeklyRecaps':          'Resumo da Semana',
  'progress.story.weeklySubEmpty':        'Um olhar calmo sobre sua semana.',
  'progress.story.weeklySubCount':        '{{n}} semana{{s}} da sua jornada',
  'progress.story.reflection':            'Reflexões Silenciosas',
  'progress.story.reflectionSubEmpty':    'Seus pensamentos guardados com cuidado.',
  'progress.story.reflectionSubCount':    '{{n}} reflexão{{s}} escrita{{s}}',

  // ── Progress v2 — nova tela premium ──────────────────────────────────────────
  'progress2.hero.title':                  'Algo em você continua voltando.',
  'progress2.hero.subtitle':               'Quietamente, algo mudou.',
  'progress2.hero.variation.0':            'Você continuou, mesmo nos dias mais leves.',
  'progress2.hero.variation.1':            'Seu retorno ficou mais suave com o tempo.',
  'progress2.hero.variation.2':            'Cada visita deixou uma marca pequena.',
  'progress2.hero.variation.3':            'Você diminuiu o ritmo sem desaparecer.',
  'progress2.hero.variation.4':            'Seu ritmo começou a reaparecer.',
  'progress2.hero.variation.5':            'Esses retornos estão se tornando mais seus.',
  'progress2.rhythm.title':               'Ritmo da semana',
  'progress2.rhythm.label':               'presença acumulada',
  'progress2.rhythm.description':         'Baseado nos dias em que você voltou, registrou algo ou concluiu um reset.',
  'progress2.rhythm.emptyTitle':          'Sua presença ainda está se formando.',
  'progress2.rhythm.emptyDescription':    'Volte alguns dias e esta área começará a refletir seus padrões.',
  'progress2.rhythm.returnMain':          'Você voltou.',
  'progress2.rhythm.returnLabel':         'presença registrada',
  'progress2.rhythm.tagline':             'Cada retorno deixa uma marca.',
  'progress2.signals.title':              'Sinais reais',
  'progress2.signals.return.title':       'Você voltou',
  'progress2.signals.return.text':        'Você continuou voltando.',
  'progress2.signals.presence.title':     'Mais presença',
  'progress2.signals.presence.text':      'Você desacelerou.',
  'progress2.signals.stability.title':    'Constância mais presente',
  'progress2.signals.stability.text':     'Sua constância começou a reaparecer.',
  'progress2.patterns.title':             'Padrões percebidos',
  'progress2.patterns.empty':             'Continue registrando pequenos momentos. Seus padrões vão aparecer com o tempo.',
  'progress2.patterns.1':                 'Você tem voltado mais quando o reset parece leve.',
  'progress2.patterns.2':                 'Seu progresso aparece mais na repetição do que na intensidade.',
  'progress2.patterns.3':                 'Dias simples têm ajudado você a continuar.',
  'progress2.patterns.4':                 'Pequenas pausas parecem reduzir o peso do dia.',
  'progress2.patterns.5':                 'Você mantém mais presença quando reduz o ritmo.',
  'progress2.patterns.6':                 'Seu retorno acontece melhor sem pressão.',
  'progress2.patterns.7':                 'Constância começa a aparecer em pequenos movimentos.',
  'progress2.patterns.8':                 'Você parece responder melhor à leveza do que à cobrança.',
  'progress2.patterns.9':                 'Você avança mais quando o dia não exige perfeição.',
  'progress2.patterns.10':                'Você está criando espaço antes de reagir.',
  'progress2.timeline.title':             'Linha de reconstrução',
  'progress2.timeline.day1.title':        'Você começou.',
  'progress2.timeline.day1':              'Algo mudou o suficiente para você estar aqui.',
  'progress2.timeline.day7.title':        'Primeiros sinais.',
  'progress2.timeline.day7':              'Um ritmo começou a aparecer.',
  'progress2.timeline.day14.title':       'Menos esforço.',
  'progress2.timeline.day14':             'Seu retorno começou a parecer mais natural.',
  'progress2.timeline.day30.title':       'Uma base.',
  'progress2.timeline.day30':             'Você construiu algo que continua existindo entre os dias.',
  'progress2.timeline.day60.title':       'Mais estabilidade.',
  'progress2.timeline.day60':             'Seu progresso deixou de depender de dias perfeitos.',
  'progress2.timeline.day90.title':       'Presença construída.',
  'progress2.timeline.day90':             'Você criou uma relação mais constante consigo mesmo.',
  'progress2.summary.title':              'Sinais do Caminho',
  'progress2.summary.resets':             'retornos percebidos',
  'progress2.summary.journal':            'momentos registrados',
  'progress2.summary.returnDays':         'presença de hoje',
  'progress2.summary.weeks':              'melhor sequência',
  'progress2.summary.resets.one':         'retorno percebido',
  'progress2.summary.journal.one':        'momento registrado',
  'progress2.summary.returnDays.one':     'presença de hoje',
  'progress2.milestone.7':               'Seu retorno começou a criar ritmo.',
  'progress2.milestone.14':              'Você começou a voltar sem forçar.',
  'progress2.milestone.30':              'Seu ritmo começou a confiar em você.',
  'progress2.milestone.60':              'O retorno ficou mais natural.',
  'progress2.milestone.90':              'Você já não está começando de novo.',

  // ── Private space card ────────────────────────────────────────────────────────
  'progress2.space.eyebrow':             'SEU ESPAÇO PARTICULAR',
  'progress2.space.title':               'Um lugar tranquilo para soltar o que está pesado.',
  'progress2.space.placeholder':         'Você pode deixar isso aqui.',
  'progress2.space.saved':               'Salvo em silêncio.',
  'progress2.space.action.keep':         'Guardar isso',
  'progress2.space.action.release':      'Soltar',
  'progress2.space.feedback.kept':       'Seu momento foi guardado.',
  'progress2.space.feedback.return':     'Você pode voltar quando quiser.',
  'progress2.space.feedback.released':   'Você não precisa carregar isso agora.',
  'progress2.space.prompt.0':            'O que drenou sua energia hoje?',
  'progress2.space.prompt.1':            'O que você não quer carregar para amanhã?',
  'progress2.space.prompt.2':            'O que sua mente está tentando processar?',
  'progress2.space.prompt.3':            'Qual momento trouxe um pouco de calma hoje?',
  'progress2.space.prompt.4':            'O que você gostaria de deixar ir?',
  'progress2.space.prompt.5':            'O que sua exaustão está tentando te dizer?',
  'progress2.space.prompt.6':            'O que você sentiu falta hoje?',
  'progress2.space.prompt.7':            'O que ficou pesado demais em silêncio?',
  'progress2.space.prompt.8':            'O que merece mais gentileza dentro de você?',
  'progress2.space.prompt.9':            'O que você está evitando sentir?',
  'progress2.space.prompt.10':           'Que parte de você precisa de mais paciência hoje?',
  'progress2.space.prompt.11':           'O que você não disse hoje?',
  'progress2.space.prompt.12':           'O que está dificultando o descanso?',
  'progress2.space.prompt.13':           'Que pensamento ficou com você ao longo do dia?',

  // ── Weekly recap card ─────────────────────────────────────────────────────────
  'progress2.weekrecap.eyebrow':         'RESUMO DA SEMANA',
  'progress2.weekrecap.subtitle':        'Um olhar calmo sobre sua semana.',
  'progress2.weekrecap.seeAll':          'Ver histórico',
  'progress2.weekrecap.n0':              'Esta semana ainda está começando.',
  'progress2.weekrecap.n1':              'Você voltou uma vez. Isso já conta.',
  'progress2.weekrecap.n2':              'Dois retornos esta semana. O ritmo começa a se formar.',
  'progress2.weekrecap.n3':              'Três retornos. Algo começa a se estabelecer.',
  'progress2.weekrecap.n4':              'Você apareceu quatro vezes esta semana.',
  'progress2.weekrecap.n5':              'Cinco retornos. Sua rotina está ganhando forma.',
  'progress2.weekrecap.n6':              'Seis dias. Consistência silenciosa que reconstrói.',
  'progress2.weekrecap.n7':              'Sete dias. Uma semana inteira de presença.',
  'progress2.weekrecap.streakN':         '{{n}} dias seguidos. Você continua voltando.',

  // ── Quiet reflections card ────────────────────────────────────────────────────
  'progress2.quietref.eyebrow':          'REFLEXÕES SILENCIOSAS',
  'progress2.quietref.subtitle':         'Seus registros emocionais.',
  'progress2.quietref.seeAll':           'Ver todas',
  'progress2.quietref.empty':            'Suas reflexões aparecerão aqui.',
  'progress2.quietref.today':            'Hoje',
  'progress2.quietref.yesterday':        'Ontem',
  'progress2.quietref.daysAgo':          'há {{n}} dias',
  'progress2.quietref.countOne':         'Seus momentos guardados aqui.',
  'progress2.quietref.countMany':        'Seus momentos guardados aqui.',
  'progress2.history.weekrecap.title':   'Resumo da Semana',
  'progress2.history.weekrecap.sub.many': 'Você voltou mais vezes do que percebeu.',
  'progress2.history.weekrecap.sub.some': 'Os dias leves também contaram.',

  // ── Progress — narrative card ─────────────────────────────────────────────────
  'progress.narrative.moments.pre':        '',
  'progress.narrative.moments.post.one':   ' presença, só sua.',
  'progress.narrative.moments.post.other': ' presenças, só suas.',
  'progress.narrative.streak.pre':         '',
  'progress.narrative.streak.post.one':    ' dia de continuidade.',
  'progress.narrative.streak.post.other':  ' dias de continuidade.',

  // ── Progress — fases de recuperação ──────────────────────────────────────────
  'progress.phase.beginner.label':         'VOLTANDO PARA SI',
  'progress.phase.beginner.desc':          'Recomece sem culpa',
  'progress.phase.beginner.days':          'Dias 1–7',
  'progress.phase.rebuilding.label':       'RECONSTRUIR A CONFIANÇA',
  'progress.phase.rebuilding.desc':        'Pequenos passos restauram sua confiança.',
  'progress.phase.rebuilding.days':        'Dias 8–21',
  'progress.phase.momentum.label':         'ENCONTRAR SEU RITMO',
  'progress.phase.momentum.desc':          'A constância se torna identidade.',
  'progress.phase.momentum.days':          'Dias 22–59',
  'progress.phase.identity.label':         'TORNAR-SE A PESSOA',
  'progress.phase.identity.desc':          'A identidade muda através da repetição.',
  'progress.phase.identity.days':          'Dias 60–89',
  'progress.phase.transformation.label':   'RECUPERAÇÃO COMPLETA',
  'progress.phase.transformation.desc':    'Você se reconstruiu.',
  'progress.phase.transformation.days':    'Dia 90+',
  'progress.phase.comingNext':             'EM BREVE',

  // ── Progress — grupo de jornada ───────────────────────────────────────────────
  'progress.journey.here':                 'Você ainda está aqui.',
  'progress.journey.returnsCount':         'Cada retorno importa.',
  'progress.journey.nextMilestone':        'Próximo marco — Dia {{n}}',
  'progress.week.unwritten':               'A semana ainda não foi escrita.',
  'progress.week.allDays':                 'Você apareceu todos os dias desta semana.',
  'progress.week.oneReturn':               'Um retorno tranquilo nesta semana.',
  'progress.week.nReturns':               'Você voltou {{n}} vezes nesta semana.',

  // ── Progress — card SUA JORNADA ───────────────────────────────────────────────
  'progress.card.daysIn':                  'dias de presença',
  'progress.card.resetsDone':              'resets feitos',

  // ── Progress — prévia de capítulos ────────────────────────────────────────────
  'progress.chapter.week1':                'A primeira semana. Algo começou aqui.',
  'progress.chapter.week2':                'Duas semanas. O ritmo começa a existir.',
  'progress.chapter.month1':               'Um mês. Os retornos viraram continuidade.',

  // ── Weekly Recap — PT ────────────────────────────────────────────────────────
  'recap.loading':            'Preparando seu resumo...',
  'recap.eyebrow':            'RESUMO DA SEMANA',
  'recap.section.focus':      'ESTA SEMANA',
  'recap.section.highlights': 'MOMENTOS DA SEMANA',
  'recap.section.habits':     'RITMO DOS HÁBITOS',
  'recap.section.reflection': 'UMA PERGUNTA PARA VOCÊ',
  'recap.cel.outstanding':    'Semana excepcional',
  'recap.cel.strong':         'Semana forte',
  'recap.cel.good':           'Boa semana',
  'recap.habit.automatic':    'Seus hábitos estão se tornando automáticos.',
  'recap.habit.growing':      'A constância está crescendo.',
  'recap.habit.small':        'Pequenos passos constroem o caminho.',
  'recap.cta.ready':          'Pronta para a próxima semana',
  'recap.cta.close':          'Fechar',
  'recap.week.label':         'Semana',
  'recap.history.eyebrow':          'SUA HISTÓRIA',
  'recap.history.title':            'Resumos Semanais',
  'recap.history.sub.nodata':       'Seu primeiro resumo chega depois de uma semana completa.',
  'recap.history.sub.building':     'Os resumos aparecem conforme você constrói sua jornada.',
  'recap.history.sub.count':        '{{n}} semana{{s}} da sua jornada',
  'recap.history.empty.title':      'Sua história semanal ainda está se revelando.',
  'recap.history.empty.text':       'Conforme você completa mais resets, suas reflexões\ne padrões aparecerão aqui.',
  'recap.history.current.eyebrow':  'ESTA SEMANA · EM ANDAMENTO',
  'recap.history.coming.title':     'As semanas anteriores aparecerão aqui.',
  'recap.history.coming.sub':       'Seu primeiro resumo semanal completo se desbloqueia após 7 dias de uso.',
  'recap.history.sum.weeks':        'semanas registradas',
  'recap.history.sum.resets':       'resets totais',
  'recap.history.sum.streak':       'ritmo mais longo',
  'recap.history.quote':            '"Cada semana é uma página da história que você está escrevendo."',
  'recap.card.streakLabel':         'ritmo',
  'recap.card.habitsLabel':         '% hábitos',
  'recap.insight.sevenForSeven':    'Sete de sete. Uma semana tranquila.',
  'recap.insight.showedUpN':        'Você voltou {{n}} vezes nesta semana.',
  'recap.insight.nResets':          '{{n}} resets nesta semana. Um ritmo está se formando.',
  'recap.insight.twoReturns':       'Esta semana houve retorno. O espaço continua aqui.',
  'recap.insight.cameBackStreak':   'Você voltou mais uma vez.',
  'recap.insight.cameBack':         'Você voltou. Uma vez já é suficiente para importar.',
  'recap.insight.stillYours':       'Esta semana ainda é sua para escrever.',
  'recap.subinsight.remarkable':    'A constância assim muda as coisas com o tempo.',
  'recap.subinsight.strong':        'A constância quieta está construindo algo real.',
  'recap.subinsight.streakHolding': 'Seu ritmo está se mantendo.',
  'recap.subinsight.repetition':    'A pequena repetição se torna identidade.',
  'recap.subinsight.eachReset':     'Cada reset conta, seja como for a semana.',

  // ── Paywall — tela completa em pt-BR ─────────────────────────────────────────
  'paywall.loading':               'Processando...',
  'paywall.legal.full':            'Cobrado via App Store ou Google Play.',
  // Variante soft (sheet pós-ritual)
  'paywall.v1.heading':            "Este espaço é seu\npara continuar.",
  'paywall.v1.body':               "Um espaço mais profundo para quando está mais pesado, mais barulhento,\nou simplesmente mais difícil de voltar para si.",
  'paywall.v1.cta':                '⭐  7 dias gratuitos',
  'paywall.v1.ctaSub':             'Depois R$97,90/ano',
  'paywall.v1.cancel':             'Cancele quando quiser',
  'paywall.v1.maybe':              'Talvez depois',
  'paywall.v1.footer':             'Sem compromisso. Cancele antes do período gratuito.',
  // Variante medium (retorno dia 3)
  'paywall.v2.eyebrow':            'DIA 3',
  'paywall.v2.heading':            "Você voltou\ntrês vezes.",
  'paywall.v2.sub':                'Há mais aqui, quando você quiser.',
  'paywall.v2.tagline':            "Uma mente mais calma. Uma rotina mais gentil.\nUm lugar para voltar todo dia.",
  'paywall.v2.why1':               "Você não precisa de mais pressão.\nVocê precisa de um lugar para voltar.",
  'paywall.v2.why2':               'Este espaço fica mais quieto conforme você volta.',
  'paywall.v2.cta':                'Continue seu reset →',
  'paywall.v2.ctaSub':             'Sem pressão. Cancele quando quiser. Seu ritmo é seu.',
  // Grades de situações
  'paywall.feat.mindLoud':         'mente agitada',
  'paywall.feat.emoTired':         'emocionalmente cansada',
  'paywall.feat.tryingAgain':      'tentando voltar',
  'paywall.feat.needCalm':         'preciso de calma',
  'paywall.feat.startingOver':     'recomeçando',
  'paywall.feat.hardWeek':         'semana difícil',
  // Depoimentos
  'paywall.t1.quote':              'Abro isso antes de toda reunião difícil.',
  'paywall.t1.name':               'Sarah, 34',
  'paywall.t2.quote':              'É o único app que não deletei em um ano.',
  'paywall.t2.name':               'Marcus, 41',
  'paywall.t3.quote':              'Parece que alguém finalmente entendeu.',
  'paywall.t3.name':               'Priya, 29',
  // Seção de planos (compartilhada)
  'paywall.plan.badge':            'MAIS ESCOLHIDO · 7 dias gratuitos',
  'paywall.plan.annual.name':      'Plano anual — R$97,90/ano',
  'paywall.plan.annual.note':      'R$8,15/mês · Menos que mais uma assinatura esquecida.',
  'paywall.plan.monthly.name':     'Plano mensal — R$14,90/mês',
  'paywall.plan.monthly.note':     'Experimente no seu tempo. Cancele quando quiser.',
  // Variante direta (bloqueio de conteúdo)
  'paywall.v3.eyebrow':            'SEU ESPAÇO CONTINUA AQUI.',
  'paywall.v3.heading':            'Você pode continuar no seu ritmo.',
  'paywall.v3.sub':                'Para os momentos em que o dia\npede mais do que o esperado.',
  'paywall.v3.b1.title':           'Um espaço diário para voltar a si',
  'paywall.v3.b1.sub':             'Uma reflexão. Uma pausa. Um reset.',
  'paywall.v3.b2.title':           'Clareza emocional, um tema por vez',
  'paywall.v3.b2.sub':             'Foco, calma, coragem, descanso — o que este dia pedir.',
  'paywall.v3.b3.title':           'Uma biblioteca curada de reflexões',
  'paywall.v3.b3.sub':             'Reflexões que chegam no momento certo.',
  'paywall.v3.annual.name':        'Plano anual',
  'paywall.v3.annual.free':        '7 dias gratuitos',
  'paywall.v3.annual.price':       'R$97,90/ano',
  'paywall.v3.annual.priceSub':    '  ·  R$8,15/mês',
  'paywall.v3.annual.note':        'Menos que mais uma assinatura esquecida.',
  'paywall.v3.monthly.name':       'Plano mensal',
  'paywall.v3.monthly.price':      'R$14,90/mês',
  'paywall.v3.monthly.note':       'Experimente no seu tempo. Cancele quando quiser.',
  'paywall.v3.cta.free':           'Começar minha semana gratuita →',
  'paywall.v3.cta.today':          'Começar hoje →',
  'paywall.v3.ctaSub':             'Sem compromisso. Você pode cancelar quando quiser.',
  'paywall.v3.whatLabel':          'O QUE FICA MAIS QUIETO',
  'paywall.v3.what1':              'As manhãs começam a ficar mais leves.',
  'paywall.v3.what2':              'A pressão constante começa a perder força.',
  'paywall.v3.what3':              'Você começa a confiar em si novamente, aos poucos.',
  // Alertas
  'paywall.alert.trial.title':     'Sua semana gratuita começou.',
  'paywall.alert.trial.msg':       'Seu acesso completo está desbloqueado. Cancele antes do período gratuito.',
  'paywall.alert.monthly.title':   'Bem-vinda ao Full Refuge.',
  'paywall.alert.monthly.msg':     'Tudo está desbloqueado. Um dia de cada vez.',

  // ── Mindset — categorias (filtro + stripe do card + modal) ──────────────────
  'mindset.cat.Focus':    'Foco',
  'mindset.cat.Calm':     'Calma',
  'mindset.cat.Courage':  'Coragem',
  'mindset.cat.Rest':     'Descanso',
  'mindset.cat.Clarity':  'Clareza',
  'mindset.cat.Momentum': 'Impulso',
  'mindset.cat.Rhythm':   'Ritmo',

  // ── Mindset — títulos dos cards em PT ────────────────────────────────────────
  'mindset.card.m1.title':    'Uma coisa de cada vez.',
  'mindset.card.m2.title':    'A Regra dos 2 Minutos',
  'mindset.card.m3.title':    'Confiança Construída aos Poucos',
  'mindset.card.m4.title':    'O Método MIT',
  'mindset.card.m5.title':    'Emoções Também Dizem Muito',
  'mindset.card.m6.title':    'A Economia da Atenção',
  'mindset.card.m7.title':    'O Bloco de 90 Minutos',
  'mindset.card.m8.title':    'Hábitos Baseados em Identidade',
  'mindset.card.m9.title':    'Rejeição como Redirecionamento',
  'mindset.card.m10.title':   'Dominando o Bloqueio de Tempo',
  'mindset.card.m11.title':   'A Coragem de Não Agradar Todo Mundo',
  'mindset.card.m12.title':   'Recuperando o Espaço Mental',
  'mindset.card.m13.title':   'O Princípio de Uma Coisa',
  'mindset.card.m14.title':   'Nunca Falhe Duas Vezes',
  'mindset.card.m15.title':   'Competência Cria Confiança',
  'mindset.card.m16.title':   'A Revisão Semanal',
  'mindset.card.m17.title':   'A Prática de Soltar',
  'mindset.card.m18.title':   'Minimalismo Digital',
  'mindset.card.m19.title':   'Trabalho Profundo',
  'mindset.card.m20.title':   'O Paradoxo de Stockdale',
  'mindset.card.emo1.title':  'Você Tem Permissão para Recomeçar',
  'mindset.card.emo2.title':  'Descansar Não É Fraqueza',

  // ── Mindset — conteúdo dos cards FOCO em PT (primeiros 10) ──────────────────
  'mindset.card.m1.content':
    'O foco se enfraquece quando é dividido. Cada vez que você muda de tarefa, sua mente gasta energia para reencontrar a atenção — em média, mais de 20 minutos para voltar ao estado de concentração plena. As pessoas mais realizadas não são as que fazem mais coisas ao mesmo tempo. São as que conseguem permanecer presentes no que realmente importa.\n\nEscolha uma prioridade. Termine ela primeiro. O resto pode esperar um pouco.',

  'mindset.card.m7.content':
    'Nosso organismo funciona em ciclos — cerca de 90 minutos de alta concentração seguidos de uma queda natural de energia. Trabalhar a favor desse ritmo, em vez de ignorá-lo, é uma das mudanças mais simples e poderosas que você pode fazer.\n\nTrabalhe com atenção plena durante 90 minutos. Depois, faça uma pausa real de 20 minutos: caminhe, descanse, afaste-se das telas. Volte renovado.\n\nNão é produtividade forçada. É respeitar como a mente funciona de verdade.',

  'mindset.card.m13.content':
    'Existe uma pergunta que corta o ruído de tudo: "Qual é a única coisa que eu poderia fazer agora que tornaria tudo o resto mais fácil — ou até desnecessário?"\n\nAplicada ao trabalho, às relações, à saúde ou aos seus objetivos, essa pergunta quase sempre tem uma resposta óbvia — quando você para de verdade para se perguntar.\n\nFaça essa coisa primeiro. Todo dia. E observe como a vida começa a se reorganizar em torno do que realmente importa.',

  'mindset.card.m19.content':
    'Trabalho profundo é a capacidade de se concentrar sem interrupções em algo que exige esforço mental real. Ele é raro no mundo atual — e exatamente por isso, é valioso.\n\nA diferença entre quem produz algo com significado e quem apenas fica ocupado está, em grande parte, aqui: na capacidade de mergulhar com presença.\n\nTrate o foco como um músculo. Comece com sessões curtas de concentração intensa. Vá ampliando aos poucos. Os resultados aparecem.',

  'mindset.card.focus1.title':   'Profundidade cria progresso.',
  'mindset.card.focus1.content':
    'Ficar ocupado não é o mesmo que avançar. O crescimento real acontece quando você dedica tempo ininterrupto a algo que importa de verdade.\n\nA capacidade de focar profundamente está se tornando rara — o que a torna cada vez mais valiosa. A maioria das pessoas não chega ao seu potencial porque vive se interrompendo antes mesmo de começar.\n\nLongos períodos de concentração criam resultados extraordinários. Não pela quantidade de horas, mas pela profundidade delas.',

  'mindset.card.focus2.title':   'Elimine antes de otimizar.',
  'mindset.card.focus2.content':
    'Muita gente tenta ser mais produtiva sem remover o que drena sua atenção. Mas o foco melhora mais rápido pela eliminação do que pela otimização.\n\nAntes de adicionar novos sistemas ou ferramentas, remova o que ocupa sua mente sem necessidade. Abas abertas, notificações, conversas vazias, compromissos desnecessários — tudo isso consome energia mental em silêncio.\n\nSimplicidade cria espaço. Espaço cria foco.',

  'mindset.card.focus3.title':   'Foco é treino diário.',
  'mindset.card.focus3.content':
    'Concentração não é um dom que você tem ou não tem. É uma habilidade que se fortalece com repetição.\n\nCada vez que você resiste à distração, treina sua mente para permanecer presente por mais tempo. O mundo moderno foi projetado para enfraquecer a atenção. Pessoas com foco desenvolvido escolhem conscientemente treinar o oposto.\n\nPequenos momentos diários de presença constroem uma resistência mental poderosa. Devagar, e com consistência.',

  'mindset.card.focus4.title':   'Termine antes de começar algo novo.',
  'mindset.card.focus4.content':
    'Começar muitas coisas ao mesmo tempo cria um barulho mental constante. Cada tarefa inacabada permanece aberta na sua mente, consumindo energia sem produzir nada.\n\nO foco cresce quando você termina o que começou antes de partir para o próximo estímulo. Concluir algo cria ritmo, clareza e confiança real.\n\nO hábito de finalizar vale mais do que a animação dos começos infinitos.',

  'mindset.card.focus5.title':   'Seu ambiente molda sua mente.',
  'mindset.card.focus5.content':
    'O foco é profundamente influenciado pelo que te cerca. Espaços desorganizados frequentemente criam pensamentos desorganizados. Notificações, ruído e distrações visuais fragmentam a atenção ao longo do dia sem que você perceba.\n\nUm ambiente calmo ajuda a mente a permanecer calma.\n\nDesenhar seu espaço com intenção não é detalhe — é a base invisível da sua concentração.',

  'mindset.card.focus6.title':   'Energia mental importa mais do que tempo.',
  'mindset.card.focus6.content':
    'Ter mais horas não adianta nada se a mente está esgotada. O foco depende mais da qualidade da sua presença mental do que do tempo disponível.\n\nProteger o sono, reduzir a superestimulação e fazer pausas estratégicas melhoram a concentração de forma dramática.\n\nPessoas com alto desempenho gerenciam energia antes de gerenciar agenda. Uma hora focada vale mais do que cinco horas dispersas.',

  'mindset.card.focus7.title':   'Consuma menos, pense mais.',
  'mindset.card.focus7.content':
    'O cérebro não consegue se concentrar se está constantemente sobrecarregado de estímulos. Rolagem infinita, vídeos e notificações treinam a mente a buscar novidade a cada segundo.\n\nSilêncio e quietude fortalecem a capacidade de atenção.\n\nÀs vezes a melhor estratégia de produtividade é simplesmente consumir menos.',

  'mindset.card.focus8.title':   'Urgência destrói precisão.',
  'mindset.card.focus8.content':
    'Pressa cria erros, estresse e fragmentação mental. Foco calmo produz decisões melhores do que velocidade frenética.\n\nMuita gente confunde pânico com produtividade — mas urgência constante enfraquece a atenção.\n\nDesacelerar o suficiente para pensar com clareza antes de agir economiza mais tempo do que qualquer atalho.',

  'mindset.card.focus9.title':   'Presença melhora tudo.',
  'mindset.card.focus9.content':
    'Quando a atenção está completamente presente, até ações simples se tornam mais eficazes. Trabalho com meio foco entrega metade da qualidade.\n\nEstar mentalmente ausente enquanto trabalha aumenta o cansaço, porque a mente fica dividida o tempo todo.\n\nFoco é aprender a chegar de verdade no momento atual. Presença melhora o desempenho — e a paz.',

  'mindset.card.focus10.title':  'Uma decisão de cada vez.',
  'mindset.card.focus10.content':
    'O cansaço mental muitas vezes vem de tomar decisões pequenas em excesso. Cada escolha consome energia cognitiva ao longo do dia.\n\nSimplificar rotinas libera mais atenção para o que realmente importa.\n\nQuanto menos ruído mental você gera, mais clareza sobra.',

  'mindset.card.focus11.title':  'Disciplina protege o foco.',
  'mindset.card.focus11.content':
    'A motivação muda o tempo todo. A disciplina protege a consistência.\n\nO foco fica mais forte quando você se compromete a trabalhar mesmo quando as distrações parecem tentadoras. A capacidade de permanecer em tarefas difíceis constrói resiliência mental com o tempo.\n\nPessoas focadas não esperam "estar prontas". Elas criam movimento pela ação.',

  'mindset.card.focus12.title':  'Silêncio é uma vantagem.',
  'mindset.card.focus12.content':
    'A vida moderna é cheia de ruído constante — notificações, opiniões, conteúdo e interrupções. O silêncio devolve ao cérebro o espaço para pensar com profundidade.\n\nMuitas descobertas acontecem quando a mente finalmente fica quieta o suficiente para processar com clareza.\n\nO foco prospera em ambientes calmos. O silêncio restaura a nitidez mental.',

  'mindset.card.focus13.title':  'Foco exige limites.',
  'mindset.card.focus13.content':
    'Todo "sim" à distração é um "não" às suas prioridades. Pessoas focadas protegem seu tempo com limites claros.\n\nNem toda mensagem precisa de resposta imediata. Nem toda oportunidade merece sua atenção.\n\nProteger seu espaço mental é essencial para qualquer progresso real.',

  'mindset.card.focus14.title':  'Movimento vence a paralisia.',
  'mindset.card.focus14.content':
    'O excesso de análise tende a desaparecer assim que o movimento começa. O cérebro costuma exagerar a dificuldade de uma tarefa antes de iniciá-la.\n\nA ação cria clareza mais rápido do que qualquer análise. O foco melhora quando você para de negociar mentalmente e simplesmente começa.\n\nPequeno progresso silencia a resistência interna.',

  'mindset.card.focus15.title':  'Descanso afina a mente.',
  'mindset.card.focus15.content':
    'Trabalho constante sem recuperação enfraquece o foco com o tempo. O cérebro precisa de pausas para redefinir a atenção e processar informações corretamente.\n\nDescanso não é preguiça — é parte da performance sustentada.\n\nUma mente descansada pensa com mais clareza. Pessoas focadas entendem que a recuperação protege a produtividade a longo prazo.',

  'mindset.card.focus16.title':  'Treine sua mente para ficar.',
  'mindset.card.focus16.content':
    'As distrações modernas ensinam o cérebro a buscar estímulo constantemente. Foco exige retreinar a atenção para permanecer com uma coisa por mais tempo.\n\nNo início, a concentração pode parecer desconfortável — porque a mente está habituada à interrupção. Mas o desconforto faz parte do fortalecimento da atenção.\n\nA capacidade de permanecer mentalmente presente é um superpoder.',

  'mindset.card.focus17.title':  'Pequenas distrações, grandes atrasos.',
  'mindset.card.focus17.content':
    'Uma notificação pode parecer inofensiva, mas pequenas interrupções quebram o fluxo mental. Depois de se distrair, o cérebro precisa de tempo para retomar o foco com a mesma profundidade.\n\nInterrupções repetidas ao longo do dia destroem a produtividade em silêncio.\n\nProteger a concentração é respeitar o quanto o foco profundo é frágil.',

  'mindset.card.focus18.title':  'O tédio fortalece a atenção.',
  'mindset.card.focus18.content':
    'O entretenimento constante enfraquece a capacidade de ficar em quietude. Mas o tédio costuma ser a porta de entrada para a criatividade, a reflexão e o pensamento profundo.\n\nPermitir que o cérebro descanse sem estímulo fortalece a atenção de forma natural.\n\nA criatividade tende a aparecer quando a distração desaparece.',

  'mindset.card.focus19.title':  'Foco constrói confiança.',
  'mindset.card.focus19.content':
    'A confiança não vem só do sucesso — ela também vem de saber que você consegue controlar sua atenção. Cada sessão focada fortalece a confiança em si mesmo.\n\nQuando você conclui o que importa de forma consistente, a mente começa a acreditar na sua disciplina.\n\nO foco constrói autoestima com o tempo.',

  'mindset.card.focus20.title':  'Simplifique o que importa.',
  'mindset.card.focus20.content':
    'Tentar priorizar tudo é o mesmo que não priorizar nada. O foco melhora quando você identifica o que realmente importa mais agora.\n\nMetas em excesso dividem a energia e dispersam a atenção.\n\nSimplicidade afina a execução. Prioridades claras criam momentum mais forte.',

  'mindset.card.focus21.title':  'Seu celular compete com você.',
  'mindset.card.focus21.content':
    'A maioria das plataformas digitais foi criada para capturar — e manter — sua atenção pelo maior tempo possível. Cada notificação desnecessária afasta o cérebro do que realmente importa.\n\nPessoas focadas controlam a tecnologia conscientemente em vez de deixar a tecnologia controlá-las.\n\nProteger sua atenção é proteger seu futuro.',

  'mindset.card.focus22.title':  'Foco também é emocional.',
  'mindset.card.focus22.content':
    'A distração nem sempre tem a ver com tecnologia. Às vezes a mente foge do foco por causa do estresse, do medo, da sobrecarga ou do desconforto emocional.\n\nAprender a regular as emoções melhora a concentração de forma profunda.\n\nEmoções calmas criam uma mente mais calma. Equilíbrio interno fortalece o desempenho externo.',

  'mindset.card.focus23.title':  'A repetição cria excelência.',
  'mindset.card.focus23.content':
    'A maestria raramente nasce de intensidade. Ela vem da repetição focada ao longo do tempo. Cada sessão de prática profunda fortalece conexões neurais e o desenvolvimento de habilidades.\n\nConsistência focada sempre vence o esforço disperso.\n\nMelhorias pequenas se acumulam em resultados extraordinários.',

  'mindset.card.focus24.title':  'Desacelere para pensar melhor.',
  'mindset.card.focus24.content':
    'Pensar rápido é útil em emergências. Pensar com profundidade exige lentidão. Muitas pessoas reagem de imediato sem se dar espaço para pensar com clareza.\n\nPessoas focadas pausam o suficiente para observar, refletir e escolher com intenção.\n\nPensar melhor cria decisões melhores.',

  'mindset.card.focus25.title':  'Clareza mental é um recurso.',
  'mindset.card.focus25.content':
    'Seu cérebro tem uma capacidade mental limitada a cada dia. Estresse, desorganização, multitarefa e superestimulação reduzem sua capacidade de pensar com clareza.\n\nO foco melhora quando você reduz intencionalmente a carga mental desnecessária.\n\nCuidar da sua mente é essencial para uma performance sustentada. Clareza mental é uma forma de riqueza.',

  'mindset.card.focus26.title':  'Sua atenção molda sua vida.',
  'mindset.card.focus26.content':
    'Seu futuro não se constrói em momentos dramáticos. Ele se constrói em momentos repetidos de atenção.\n\nCada dia, seu foco determina o que fica mais forte na sua vida. A distração enfraquece o potencial em silêncio, enquanto a concentração acumula progresso.\n\nPara onde vai sua atenção, vai sua vida.',

  'mindset.card.focus27.title':  'Trocar de tarefa tem um custo.',
  'mindset.card.focus27.content':
    'Cada vez que você muda de tarefa, o cérebro gasta energia tentando se reorientar. Mesmo interrupções breves reduzem a eficiência mental e aumentam o cansaço.\n\nMuitas pessoas se sentem esgotadas não porque trabalharam demais, mas porque mudaram o foco constantemente.\n\nProteger a continuidade permite que a mente opere em um nível muito mais alto.',

  'mindset.card.focus28.title':  'O foco começa na noite anterior.',
  'mindset.card.focus28.content':
    'Uma manhã dispersa costuma nascer de uma noite desorganizada. Preparar as prioridades na véspera reduz o atrito mental quando o dia começa.\n\nSeu cérebro funciona melhor quando acorda com clareza em vez de incerteza.\n\nPreparação cria execução mais fluida.',

  'mindset.card.focus29.title':  'Nem tudo merece sua reação.',
  'mindset.card.focus29.content':
    'Muitas distrações entram na sua vida disfarçadas de urgência. Mensagens, opiniões e notificações competem constantemente pela sua atenção emocional.\n\nO foco cresce quando você para de reagir instantaneamente a tudo ao redor.\n\nMentes calmas escolhem para onde vai a atenção — e não deixam o ruído externo decidir.',

  'mindset.card.focus30.title':  'Aprenda a observar sem obedecer.',
  'mindset.card.focus30.content':
    'Emoções intensas podem facilmente desviar sua atenção do que importa. Ansiedade, frustração e comparação criam turbulência mental que enfraquece a concentração.\n\nO foco melhora quando você aprende a observar as emoções sem obedecer a elas de imediato.\n\nAutocontrole emocional protege a clareza mental. Uma mente calma performa melhor sob pressão.',

  'mindset.card.focus31.title':  'Novidade distrai. Repetição transforma.',
  'mindset.card.focus31.content':
    'O cérebro naturalmente busca estimulação, variedade e entretenimento. Mas o progresso real costuma vir de ações importantes repetidas de forma consistente ao longo do tempo.\n\nPessoas focadas resistem à tentação da novidade constante.\n\nA disciplina muitas vezes parece entediante antes de se tornar transformadora.',

  'mindset.card.focus32.title':  'Concentração cria paz interior.',
  'mindset.card.focus32.content':
    'A distração cria caos interno. Quando a mente salta constantemente entre pensamentos, fica difícil se sentir calmo ou presente.\n\nO foco simplifica a atividade mental e reduz a sobrecarga.\n\nSe entregar de verdade a uma tarefa significativa pode criar uma paz emocional surpreendente. Atenção e tranquilidade estão profundamente conectadas.',

  'mindset.card.focus33.title':  'O ruído digital enfraquece a mente.',
  'mindset.card.focus33.content':
    'A exposição constante a conteúdo rápido reduz a capacidade de atenção ao longo do tempo. Quanto mais estímulo o cérebro consome, mais difícil fica manter o foco em tarefas mais lentas e significativas.\n\nPessoas focadas são cuidadosas com o que entra no seu espaço mental.\n\nO que você consome mentalmente molda sua capacidade cognitiva.',

  'mindset.card.focus34.title':  'O foco se constrói no descanso.',
  'mindset.card.focus34.content':
    'Sua capacidade de concentração depende muito de recuperação e restauração. O esgotamento crônico enfraquece a memória, a atenção e o controle emocional.\n\nPessoas de alta performance levam a recuperação a sério, porque entendem que a nitidez mental exige manutenção.\n\nUma mente esgotada não consegue se concentrar com profundidade.',

  'mindset.card.focus35.title':  'A mente segue o que você pratica.',
  'mindset.card.focus35.content':
    'O que você pratica repetidamente fica mais fácil com o tempo. Se você pratica distração constantemente, o cérebro aprende a evitar a atenção sustentada.\n\nMas quando você pratica concentração com regularidade, o foco se fortalece gradualmente.\n\nHábitos mentais moldam a identidade mental. Seus padrões de atenção se tornam seu comportamento padrão.',

  'mindset.card.focus36.title':  'Foco é aprender a dizer não.',
  'mindset.card.focus36.content':
    'Concentração não é só sobre escolher no que trabalhar — é também sobre recusar o que não importa. Cada compromisso desnecessário consome energia mental.\n\nPessoas focadas protegem suas prioridades com firmeza. Elas entendem que a atenção é limitada e não pode ser dividida infinitamente.\n\nClareza exige limites.',

  'mindset.card.focus37.title':  'Comece antes de estar pronto.',
  'mindset.card.focus37.content':
    'Esperar pela motivação perfeita costuma gerar um atraso sem fim. O foco cresce pela ação, não pela prontidão emocional.\n\nAssim que o movimento começa, a resistência tende a diminuir naturalmente.\n\nO momentum cria engajamento mental mais rápido do que qualquer análise excessiva jamais criará.',

  'mindset.card.focus38.title':  'Simplicidade melhora a execução.',
  'mindset.card.focus38.content':
    'A complexidade costuma criar hesitação e confusão. Quando as tarefas ficam complicadas demais, o cérebro naturalmente busca uma saída na distração.\n\nO foco melhora quando sistemas, objetivos e prioridades ficam mais simples e claros.\n\nPensar com clareza produz uma execução mais limpa.',

  'mindset.card.focus39.title':  'Foco fortalece a confiança em si.',
  'mindset.card.focus39.content':
    'Cada vez que você honra seus compromissos consigo mesmo, a confiança em si cresce. A concentração consistente constrói autoconfiança — ela prova que você pode depender da sua própria disciplina.\n\nPessoas focadas param de depender totalmente da motivação. Elas confiam nos sistemas e hábitos que construíram.\n\nConfiança interna cria estabilidade emocional.',

  'mindset.card.focus40.title':  'Estimulação rasa cria cansaço profundo.',
  'mindset.card.focus40.content':
    'Rolar a tela sem parar pode parecer relaxante, mas a superestimulação esgota o cérebro em silêncio. A novidade constante força o sistema nervoso a um modo de processamento contínuo.\n\nMuita gente confunde estimulação com descanso. O descanso real costuma vir de desacelerar, se desconectar e deixar a mente em quietude.\n\nA quietude mental restaura a energia.',

  'mindset.card.focus41.title':  'Foco é uma forma de autorrespeito.',
  'mindset.card.focus41.content':
    'Proteger sua atenção significa valorizar seus objetivos, seu tempo e seu futuro. A distração constante muitas vezes reflete um descuido inconsciente consigo mesmo.\n\nPessoas focadas entendem que a atenção é um dos seus recursos mais valiosos.\n\nEscolher a concentração é escolher crescimento pessoal. Seus hábitos revelam o que você realmente prioriza.',

  'mindset.card.focus42.title':  'A mente precisa de espaço para pensar.',
  'mindset.card.focus42.content':
    'Criatividade e insight raramente aparecem durante estimulação constante. O cérebro precisa de espaço vazio para processar informações com profundidade.\n\nPessoas focadas criam intencionalmente momentos sem ruído, conteúdo ou interrupção.\n\nO silêncio permite que pensamentos mais profundos emergam naturalmente.',

  'mindset.card.focus43.title':  'Pequenas vitórias fortalecem o foco.',
  'mindset.card.focus43.content':
    'Objetivos grandes podem parecer intimidadores, o que aumenta a resistência mental. Ações pequenas e concluídas constroem momentum e reforçam a concentração.\n\nCada tarefa finalizada treina o cérebro a associar foco a progresso.\n\nPequenas vitórias criam energia. A consistência cresce mais rápido quando as ações são manejáveis.',

  'mindset.card.focus44.title':  'Corpo bem cuidado, mente mais focada.',
  'mindset.card.focus44.content':
    'A saúde física influencia profundamente a clareza mental. Sono ruim, desidratação, estresse e inatividade enfraquecem a concentração de forma significativa.\n\nPessoas focadas entendem que o desempenho cognitivo está profundamente conectado ao bem-estar físico.\n\nCuidar da energia melhora a atenção naturalmente. Um corpo mais saudável sustenta uma mente mais nítida.',

  'mindset.card.focus45.title':  'Mente sobrecarregada evita o que importa.',
  'mindset.card.focus45.content':
    'Quando o cérebro se sente sobrecarregado, ele naturalmente busca estímulos mais fáceis. É por isso que o estresse costuma aumentar a procrastinação.\n\nO foco melhora quando você reduz a desordem mental desnecessária e organiza suas prioridades com clareza.\n\nSistemas calmos criam um pensamento mais calmo. Organização mental reduz a resistência.',

  'mindset.card.focus46.title':  'Foco cresce pela repetição, não pela perfeição.',
  'mindset.card.focus46.content':
    'Muitas pessoas abandonam as rotinas de foco porque esperam perfeição imediata. Mas a concentração se desenvolve gradualmente através do esforço repetido.\n\nAlguns dias serão mais fáceis do que outros. O que mais importa é voltar consistentemente à prática da atenção.\n\nO progresso se acumula em silêncio com o tempo.',

  'mindset.card.focus47.title':  'Proteja suas melhores horas.',
  'mindset.card.focus47.content':
    'Todo cérebro tem períodos de maior energia cognitiva durante o dia. Pessoas focadas identificam quando pensam com mais clareza — e protegem essas horas com cuidado.\n\nO trabalho importante deve acontecer nos momentos de maior atenção. Distrações de baixo valor não devem consumir o seu estado mental de pico.\n\nO momento certo melhora o desempenho de forma significativa.',

  'mindset.card.focus48.title':  'O ruído interno também distrai.',
  'mindset.card.focus48.content':
    'A distração nem sempre vem de fora. A preocupação, a dúvida sobre si mesmo e o excesso de pensamentos podem interromper a concentração com a mesma força que uma notificação.\n\nO foco melhora quando você aprende a acalmar o barulho mental interno.\n\nConsciência emocional fortalece o controle cognitivo. Uma mente em paz sustenta uma atenção mais profunda.',

  'mindset.card.focus49.title':  'Atenção define qualidade.',
  'mindset.card.focus49.content':
    'A qualidade da sua atenção molda a qualidade do seu trabalho. O esforço apressado e distraído costuma produzir resultados mediocres.\n\nO foco profundo melhora a criatividade, a precisão e a capacidade de resolver problemas.\n\nExcelência exige presença. Uma atenção melhor cria resultados melhores.',

  'mindset.card.focus50.title':  'Consistência vence a intensidade.',
  'mindset.card.focus50.content':
    'Explosões extremas de esforço raramente criam progresso sustentável. Pessoas focadas priorizam a consistência em vez da motivação temporária.\n\nPequenas sessões diárias de concentração criam resultados mais sólidos a longo prazo do que sessões intensas e esporádicas.\n\nA repetição constrói momentum. Foco sustentável vence com o tempo.',

  'mindset.card.focus51.title':  'Saber ignorar é um superpoder.',
  'mindset.card.focus51.content':
    'A vida moderna exige sua atenção a todo momento. Pessoas focadas desenvolvem a capacidade de ignorar intencionalmente o que não serve às suas prioridades.\n\nNem toda tendência, conversa ou distração merece energia mental.\n\nIgnorar com consciência protege a concentração. A atenção fica mais forte quando é direcionada com intenção.',

  'mindset.card.focus52.title':  'O que você consome molda como você pensa.',
  'mindset.card.focus52.content':
    'Seu estado mental é profundamente influenciado pelo que você consome diariamente. O excesso de informação torna mais difícil pensar com clareza e priorizar de forma eficaz.\n\nO foco melhora quando você reduz entradas desnecessárias.\n\nUm ambiente mental mais limpo sustenta um pensamento mais nítido. Simplicidade melhora a cognição.',

  'mindset.card.focus53.title':  'Foco cria momentum mais rápido do que a motivação.',
  'mindset.card.focus53.content':
    'A motivação flutua o tempo todo, mas a ação focada cria sua própria energia. Uma vez que a concentração começa, o cérebro costuma ficar mais engajado naturalmente.\n\nEsperar pela inspiração atrasa o progresso. Pessoas focadas dependem de estrutura e ação, não do humor emocional.\n\nMovimento cria momentum.',

  'mindset.card.focus54.title':  'Execução calma supera o caos.',
  'mindset.card.focus54.content':
    'A urgência estressante costuma criar pensamentos desleixados e esgotamento emocional. Uma execução calma e focada produz uma performance mais sustentável.\n\nPessoas de alta performance aprendem a operar com firmeza em vez de pânico.\n\nEquilíbrio mental protege a capacidade de decisão. O foco prospera na estabilidade emocional.',

  'mindset.card.focus55.title':  'Toda distração tem um custo invisível.',
  'mindset.card.focus55.content':
    'Quando você perde o foco, não está apenas perdendo tempo — está perdendo progresso potencial, criatividade e energia mental.\n\nPequenas distrações repetidas diariamente se acumulam em oportunidades enormes perdidas ao longo do tempo.\n\nPessoas focadas reconhecem o valor real da atenção ininterrupta. Proteger a concentração é proteger o crescimento.',

  'mindset.card.focus56.title':  'A atenção cria identidade.',
  'mindset.card.focus56.content':
    'No que você foca repetidamente molda lentamente como você pensa, sente e age. A atenção não é neutra — ela reforça padrões dentro da mente.\n\nPessoas focadas direcionam intencionalmente sua atenção para o crescimento, a disciplina e objetivos significativos.\n\nSua atenção influencia quem você se torna.',

  'mindset.card.focus57.title':  'Uma vida focada tem mais sentido.',
  'mindset.card.focus57.content':
    'Quando a atenção está constantemente dispersa, a vida começa a parecer reativa e caótica. O foco cria um senso mais forte de direção e controle.\n\nA atenção intencional permite que você vivencie a vida com mais profundidade, em vez de passar por ela inconscientemente.\n\nFoco não é só produtividade — é viver com presença. Uma mente focada cria uma vida mais significativa.',

  // ── Mindset — conteúdo dos cards CALMA em PT ──────────────────────────────────
  'mindset.card.m5.content':
    'As emoções não são obstáculos ao pensamento claro — são informação. Frustração sinaliza um objetivo bloqueado. Ansiedade sinaliza um risco não tratado. Tristeza sinaliza uma perda que merece ser reconhecida.\n\nO problema não é sentir. É ser conduzido por emoções sem perceber.\n\nNomeie o que você sente. Trace a origem. Depois escolha conscientemente como responder. Essa habilidade transforma pessoas reativas em pessoas presentes.',

  'mindset.card.m11.content':
    'Uma das percepções mais libertadoras é esta: nem todos vão aprovar você — e isso não é o seu problema para resolver.\n\nBuscar aprovação constante é uma forma de abandono de si mesmo. Quando você toma decisões com base em quem quer ser, e não em quem os outros querem que você seja, experimenta uma liberdade que nenhuma validação externa consegue dar.\n\nAs pessoas que valem a pena na sua vida vão respeitar a sua autenticidade.',

  'mindset.card.m17.content':
    'Segurar ressentimentos, arrependimentos ou o desejo de que as coisas fossem diferentes do que são — é uma das maiores fontes de desgaste na psicologia humana.\n\nSoltar não é aprovar o que aconteceu. É largar o peso para poder continuar.\n\nNão acontece de uma vez. É uma prática diária. Hoje, escolha uma coisa que você tem segurado com força — e decida apenas pousar. Não para sempre. Só por hoje.',

  'mindset.card.emo1.content':
    'Um dia difícil não define a sua vida. A recuperação emocional começa quando você para de acreditar que erros, recaídas ou exaustão emocional determinam quem você é de forma permanente.\n\nCada novo momento oferece uma chance de recomeçar de forma diferente.\n\nMuitas vezes, curar-se começa com uma permissão simples: a de começar de novo, sem vergonha.',

  'mindset.card.emo3.title':   'Suas emoções são sinais, não inimigos.',
  'mindset.card.emo3.content':
    'Emoções não são problemas a eliminar. São informação sobre o que você está vivendo por dentro. A recuperação emocional acontece quando você para de lutar contra cada sentimento — e começa a ouvir com atenção.\n\nTristeza, frustração, medo e sobrecarga muitas vezes revelam necessidades não atendidas ou tensões não resolvidas.\n\nConsciência cria cura.',

  'mindset.card.emo4.title':   'Nem todo pensamento merece sua crença.',
  'mindset.card.emo4.content':
    'A mente produz milhares de pensamentos por dia — muitos deles movidos por estresse, medo ou insegurança. A recuperação emocional exige aprender a observar pensamentos sem aceitá-los automaticamente como verdade.\n\nPensamentos são eventos mentais passageiros, não realidade absoluta.\n\nDistância cria clareza.',

  'mindset.card.emo6.title':   'Respirar devagar muda o sistema nervoso.',
  'mindset.card.emo6.content':
    'Quando o estresse aumenta, o sistema nervoso entra em modo de sobrevivência. A respiração lenta ajuda a sinalizar segurança para o cérebro e o corpo.\n\nRecuperar-se emocionalmente não é sempre sobre resolver cada problema de imediato — às vezes começa por acalmar o sistema nervoso primeiro.\n\nRespirar com calma cria espaço emocional.',

  'mindset.card.emo10.title':  'Soltar cria espaço para a paz.',
  'mindset.card.emo10.content':
    'Segurar ressentimentos, arrependimentos ou dor emocional por tempo demais esgota a mente em silêncio. A recuperação emocional às vezes exige liberar o que não pode mais ser mudado.\n\nSoltar não é esquecer — é escolher não carregar sofrimento desnecessário para sempre.\n\nLibertar cria leveza.',

  'mindset.card.emo11.title':  'Seu sistema nervoso precisa de segurança.',
  'mindset.card.emo11.content':
    'O estresse constante mantém o corpo em alerta emocional e a mente mentalmente esgotada. A recuperação emocional muitas vezes começa pela criação de ambientes, rotinas e relações que parecem emocionalmente seguros.\n\nSegurança permite que a mente relaxe novamente.\n\nAmbientes calmos sustentam a cura.',

  'mindset.card.emo12.title':  'Equilíbrio emocional exige limites.',
  'mindset.card.emo12.content':
    'Dizer sim para tudo frequentemente leva à sobrecarga emocional. Limites protegem a energia mental e a estabilidade emocional.\n\nRecuperar-se emocionalmente significa reconhecer quando sua energia está sendo drenada mais rápido do que é restaurada.\n\nProteger sua paz importa.',

  'mindset.card.emo13.title':  'Você é mais do que o que está sentindo agora.',
  'mindset.card.emo13.content':
    'Emoções difíceis podem parecer avassaladoras, mas são experiências passageiras — não sua identidade. A recuperação emocional acontece quando você para de se definir completamente pelo seu estado emocional.\n\nSentimentos passam. Seu valor permanece.',

  'mindset.card.emo15.title':  'Você também merece compaixão de si mesmo.',
  'mindset.card.emo15.content':
    'Muitas pessoas oferecem bondade aos outros enquanto falam com dureza para si mesmas internamente. A cura emocional fica mais difícil sob autocrítica constante.\n\nRecuperar-se emocionalmente exige aprender a responder a si mesmo com mais paciência e compreensão.\n\nAutocompaixão fortalece a resiliência.',

  'mindset.card.emo16.title':  'Dor emocional não é fracasso.',
  'mindset.card.emo16.content':
    'Estar emocionalmente difícil não significa que você é fraco ou que quebrou. Seres humanos naturalmente vivenciam luto, estresse, confusão, medo e tristeza ao longo da vida.\n\nA recuperação emocional começa quando você para de tratar a dor como prova de inadequação.\n\nDificuldade faz parte de ser humano.',

  'mindset.card.emo18.title':  'A comparação corrói a paz em silêncio.',
  'mindset.card.emo18.content':
    'Comparar constantemente sua vida, aparência, sucesso ou processo de cura com o dos outros cria esgotamento emocional. A recuperação emocional cresce quando a atenção volta para a sua própria jornada.\n\nTodo mundo luta de formas diferentes, por trás das cenas.\n\nComparação distorce a realidade.',

  'mindset.card.emo19.title':  'Seu corpo guarda o estresse.',
  'mindset.card.emo19.content':
    'O estresse não é só mental — ele afeta o corpo inteiro. Tensão, fadiga, dores de cabeça, respiração superficial e entorpecimento emocional são frequentemente sinais de sobrecarga do sistema nervoso.\n\nRecuperar-se emocionalmente inclui cuidar do corpo tanto quanto da mente.\n\nRecuperação física sustenta a cura emocional.',

  'mindset.card.emo20.title':  'Sentir várias coisas ao mesmo tempo é normal.',
  'mindset.card.emo20.content':
    'As emoções humanas são complexas. Você pode se sentir grato e sobrecarregado, esperançoso e com medo, em cura e ainda doendo — tudo ao mesmo tempo.\n\nRecuperar-se emocionalmente significa permitir essa complexidade sem se julgar duramente por ela.\n\nEmoções contraditórias são normais.',

  'mindset.card.emo21.title':  'Cura emocional começa com honestidade.',
  'mindset.card.emo21.content':
    'Suprimir emoções não as elimina de verdade. A recuperação emocional começa quando você se torna honesto sobre o que realmente sente, em vez de fingir constantemente que está tudo bem.\n\nHonestidade cria liberação emocional.\n\nConsciência cria cura.',

  'mindset.card.emo26.title':  'Força emocional inclui vulnerabilidade.',
  'mindset.card.emo26.content':
    'Muita gente confunde força emocional com supressão emocional. A força real muitas vezes inclui honestidade, abertura e a capacidade de reconhecer sentimentos difíceis sem vergonha.\n\nVulnerabilidade cria cura mais profunda e conexão genuína.\n\nHonestidade emocional constrói resiliência.',

  'mindset.card.emo27.title':  'Você pode escolher padrões emocionais diferentes.',
  'mindset.card.emo27.content':
    'Experiências passadas podem influenciar hábitos emocionais, mas não controlam permanentemente o seu futuro. A recuperação emocional começa quando você percebe que novos padrões podem ser aprendidos gradualmente.\n\nConsciência cria escolha.\n\nHábitos de cura repetidos criam mudança.',

  'mindset.card.emo28.title':  'Calma é uma habilidade.',
  'mindset.card.emo28.content':
    'A calma emocional não é algo que você tem ou não tem naturalmente. Ela costuma ser desenvolvida através de práticas repetidas: respiração, desaceleração, reflexão, limites e consciência emocional.\n\nA calma se fortalece com repetição intencional.',

  'mindset.card.emo29.title':  'Paz emocional exige presença.',
  'mindset.card.emo29.content':
    'Pensar demais no futuro e rever o passado constantemente tiram a atenção do momento presente. A recuperação emocional cresce quando você se reconecta com o que está acontecendo agora, em vez de viver completamente dentro do ruído mental.\n\nPresença acalma o sistema nervoso.',

  'mindset.card.emo30.title':  'Você pode proteger sua paz.',
  'mindset.card.emo30.content':
    'Nem todo ambiente, conversa ou relacionamento merece acesso ilimitado à sua energia emocional. A recuperação emocional às vezes significa escolher distância do que prejudica repetidamente o seu bem-estar mental.\n\nProteger sua paz é uma forma de autorrespeito.',

  'mindset.card.emo31.title':  'Você não precisa carregar cada emoção para sempre.',
  'mindset.card.emo31.content':
    'Algumas emoções foram feitas para ser sentidas, compreendidas e eventualmente liberadas — não carregadas por anos a fio. A recuperação emocional começa quando você para de se identificar com a dor tão intensamente que ela se torna parte permanente da sua identidade.\n\nCura cria espaço para emoções mais leves existirem novamente.',

  'mindset.card.emo32.title':  'A recuperação emocional começa com consciência.',
  'mindset.card.emo32.content':
    'Muitas reações emocionais acontecem automaticamente porque foram repetidas por anos sem reflexão. A recuperação emocional começa quando você pausa o suficiente para notar seus padrões, em vez de reagir inconscientemente.\n\nConsciência cria a possibilidade de mudança.\n\nObservação interrompe o piloto automático emocional.',

  'mindset.card.emo34.title':  'Você pode superar velhos padrões emocionais.',
  'mindset.card.emo34.content':
    'Alguns hábitos emocionais uma vez te ajudaram a sobreviver a experiências difíceis, mas podem não servir mais à sua vida atual. A recuperação emocional significa permitir-se evoluir emocionalmente sem culpa.\n\nO crescimento às vezes exige soltar mecanismos de defesa antigos.\n\nMudança faz parte da cura.',

  'mindset.card.emo36.title':  'Nem toda reação emocional precisa de ação imediata.',
  'mindset.card.emo36.content':
    'Emoções fortes frequentemente criam o impulso de reagir rapidamente. A recuperação emocional cresce quando você aprende a pausar antes de responder impulsivamente.\n\nA reflexão calma previne arrependimentos desnecessários.\n\nO espaço entre sentir e agir cria maturidade emocional.',

  'mindset.card.emo38.title':  'Sentir-se perdido não é estar quebrado.',
  'mindset.card.emo38.content':
    'Períodos de confusão, incerteza ou peso emocional são partes normais da vida humana. A recuperação emocional começa quando você para de interpretar dificuldade emocional temporária como prova de que algo está permanentemente errado com você.\n\nMomentos de perda não apagam o seu valor.',

  'mindset.card.emo39.title':  'A paz emocional cresce pela aceitação.',
  'mindset.card.emo39.content':
    'Lutar contra a realidade constantemente cria esgotamento emocional. A recuperação emocional às vezes significa aceitar o que não pode ser mudado agora, em vez de resistir mentalmente de forma interminável.\n\nAceitação cria espaço emocional para respirar.\n\nA paz frequentemente começa onde a resistência amolece.',

  'mindset.card.emo40.title':  'Você merece segurança emocional.',
  'mindset.card.emo40.content':
    'Ambientes cheios de crítica constante, imprevisibilidade ou manipulação emocional danificam lentamente o bem-estar mental. A recuperação emocional inclui reconhecer que segurança emocional importa profundamente.\n\nRelacionamentos e ambientes calmos sustentam a cura.\n\nEspaços de paz restauram a energia.',

  'mindset.card.emo41.title':  'Suas emoções merecem atenção, não vergonha.',
  'mindset.card.emo41.content':
    'Muitas pessoas aprenderam a suprimir emoções porque temiam parecer fracas ou difíceis. A recuperação emocional começa quando você para de se julgar duramente por ter emoções humanas.\n\nSentimentos merecem compreensão antes de correção.\n\nCompaixão sustenta a cura.',

  'mindset.card.emo42.title':  'Recuperação emocional é soltar o excesso mental.',
  'mindset.card.emo42.content':
    'O excesso de análise enche a mente de ruído emocional. A recuperação emocional cresce quando você simplifica os pensamentos em vez de rever mentalmente cada problema de forma repetida.\n\nMentes quietas processam emoções com mais clareza.\n\nSimplicidade cria calma.',

  'mindset.card.emo45.title':  'A forma como você fala consigo importa.',
  'mindset.card.emo45.content':
    'A forma como você fala consigo mesmo influencia profundamente a recuperação emocional. A autocrítica severa aumenta a tensão emocional e a insegurança.\n\nUma linguagem interna gentil cria segurança emocional.\n\nPensamentos compassivos sustentam a resiliência e a cura.',

  'mindset.card.emo47.title':  'Equilíbrio emocional exige limites com o mundo.',
  'mindset.card.emo47.content':
    'Absorver o estresse, a negatividade ou o caos emocional de todo mundo eventualmente se torna esmagador. A recuperação emocional às vezes significa limitar a exposição a situações que drenam sua energia.\n\nProteger sua energia cria estabilidade.\n\nLimites preservam a paz.',

  'mindset.card.emo48.title':  'Você tem permissão para se sentir bem de novo.',
  'mindset.card.emo48.content':
    'Algumas pessoas inconscientemente se agarram ao sofrimento porque a dor se tornou familiar ou emocionalmente protetora. A recuperação emocional inclui permitir-se experimentar paz, alegria e leveza emocional sem culpa.\n\nCurar-se não trai as lutas do passado.',

  'mindset.card.emo49.title':  'Cura emocional exige presença.',
  'mindset.card.emo49.content':
    'Rever o passado constantemente ou temer o futuro aumenta a sobrecarga emocional. A recuperação emocional cresce quando a atenção volta para o momento presente.\n\nPresença acalma o sistema nervoso.\n\nO agora costuma ser muito mais manejável do que os futuros imaginados.',

  'mindset.card.emo50.title':  'Recuperação emocional é ouvir o próprio corpo.',
  'mindset.card.emo50.content':
    'O corpo frequentemente revela estresse emocional antes que a mente o reconheça completamente. Tensão, fadiga, dores de cabeça, irritabilidade e entorpecimento emocional são sinais importantes.\n\nConsciência emocional inclui consciência física também.\n\nO corpo comunica sobrecarga emocional com clareza.',

  'mindset.card.emo53.title':  'Recuperação emocional é reaprender a se sentir seguro.',
  'mindset.card.emo53.content':
    'O estresse crônico pode treinar o sistema nervoso para permanecer constantemente em alerta e tenso. A recuperação emocional inclui retreinar a mente e o corpo a reconhecer momentos de segurança, calma e estabilidade.\n\nA paz muitas vezes parece estranha antes de voltar a parecer natural.',

  'mindset.card.emo55.title':  'Você pode soltar a necessidade de controlar tudo.',
  'mindset.card.emo55.content':
    'Tentar controlar cada resultado possível cria esgotamento emocional e ansiedade. A recuperação emocional começa quando você foca mais em presença e adaptabilidade do que em controle perfeito.\n\nSoltar cria alívio emocional.\n\nFlexibilidade fortalece a paz.',

  'mindset.card.emo56.title':  'Recuperação emocional é criar calma por dentro.',
  'mindset.card.emo56.content':
    'As situações externas nem sempre se tornam imediatamente pacíficas, mas a calma interna ainda pode ser desenvolvida gradualmente. A recuperação emocional se fortalece quando você pratica desacelerar os pensamentos, respirar profundamente e responder com intenção.\n\nPaz interior muda como você experimenta a vida.',

  'mindset.card.emo57.title':  'Você não está atrasado emocionalmente.',
  'mindset.card.emo57.content':
    'A cura não acontece de acordo com um cronograma universal. Comparar seu crescimento emocional com o dos outros cria pressão desnecessária.\n\nA recuperação emocional cresce quando você respeita o seu próprio ritmo em vez de se apressar na cura.\n\nCrescimento pessoal é profundamente individual.',

  'mindset.card.emo58.title':  'Estabilidade emocional cresce pela consistência.',
  'mindset.card.emo58.content':
    'Pequenos hábitos calmantes praticados repetidamente criam uma resiliência emocional mais forte com o tempo. Sono, reflexão, limites, respiração, movimento e autoconsciência fortalecem a regulação emocional gradualmente.\n\nEstabilidade se constrói diariamente.\n\nRepetição molda a saúde emocional.',

  'mindset.card.emo60.title':  'Calma é mais poderosa do que reatividade constante.',
  'mindset.card.emo60.content':
    'Viver em reatividade emocional cria esgotamento e instabilidade. Pessoas calmas não são emocionalmente entorpecidas — elas aprenderam a pausar, respirar e responder com intenção em vez de reagir impulsivamente.\n\nCalma é uma forma de força que cria resultados melhores em todas as áreas da vida.',

  // ── Mindset — conteúdo dos cards DESCANSO em PT ───────────────────────────────
  'mindset.card.emo2.content':
    'Muitas pessoas se sentem culpadas quando desaceleram. Mas o esgotamento não é uma conquista. O equilíbrio emocional precisa de recuperação, silêncio e momentos de pausa.\n\nA pressão constante drena a energia devagar — quase sem que você perceba.\n\nO descanso restaura a clareza. Uma mente descansada enfrenta a vida com muito mais calma.',

  'mindset.card.emo5.title':   'Você não se cura enquanto está sempre se distraindo.',
  'mindset.card.emo5.content':
    'Muitas pessoas evitam o desconforto emocional ficando ocupadas demais ou superestimuladas. Mas as emoções não resolvidas costumam permanecer ali, embaixo de tudo.\n\nO reset emocional exige momentos de quietude e honestidade.\n\nA cura geralmente começa quando você para de fugir de si mesma.',

  'mindset.card.emo7.title':   'O cansaço emocional é real.',
  'mindset.card.emo7.content':
    'Você pode estar emocionalmente exausta mesmo quando aparenta estar bem por fora. Estresse constante, excesso de pensamentos, o hábito de agradar os outros e suprimir emoções drenam a energia em silêncio.\n\nRecuperar-se emocionalmente começa por reconhecer quando o seu mundo interno também precisa de cuidado.',

  'mindset.card.emo8.title':   'Curar-se leva tempo.',
  'mindset.card.emo8.content':
    'O crescimento emocional raramente é linear. Alguns dias parecem leves. Outros voltam a pesar.\n\nCurar-se não é nunca mais sofrer — é aprender a atravessar as emoções difíceis com mais gentileza e consciência.\n\nO progresso costuma acontecer devagar, abaixo da superfície.',

  'mindset.card.emo9.title':   'Você não precisa resolver tudo hoje.',
  'mindset.card.emo9.content':
    'Mentes sobrecarregadas tentam consertar tudo de uma vez. O reset emocional começa quando você para de carregar o futuro inteiro ao mesmo tempo.\n\nFoque no que pode ser feito agora. Pequenos momentos de calma abrem espaço para pensar com mais clareza.\n\nUm passo de cada vez já é suficiente.',

  'mindset.card.emo14.title':  'O silêncio também pode curar.',
  'mindset.card.emo14.content':
    'O mundo moderno enche a mente constantemente com estímulos e ruído. O reset emocional muitas vezes exige momentos quietos, sem distração.\n\nO silêncio dá ao sistema nervoso espaço para desacelerar. A quietude permite que emoções mais profundas venham à tona e se assentem naturalmente.',

  'mindset.card.emo17.title':  'Desacelerar pode restaurar a clareza.',
  'mindset.card.emo17.content':
    'Quando a mente está sobrecarregada, correr mais rápido raramente resolve. O reset emocional às vezes exige desacelerar intencionalmente — mental e fisicamente.\n\nA lentidão cria espaço para reflexão e recuperação do sistema nervoso.\n\nPensar com calma melhora as decisões.',

  'mindset.card.emo22.title':  'Você não pode dar o que não tem.',
  'mindset.card.emo22.content':
    'Dar energia para todo mundo enquanto se descuida de si mesma cria esgotamento emocional com o tempo. O reset emocional inclui reconhecer que as suas próprias necessidades também são válidas.\n\nRecuperar-se não é egoísmo.\n\nCuidar de si mesma protege o que você tem a oferecer.',

  'mindset.card.emo23.title':  'A paz muitas vezes vem da simplicidade.',
  'mindset.card.emo23.content':
    'Agendas sobrecarregadas, estimulação constante e pressão contínua enfraquecem o bem-estar emocional silenciosamente. O reset emocional muitas vezes vem de simplificar a vida — reduzir o ruído desnecessário e deixar a mente desacelerar.\n\nSimplicidade cria espaço para respirar.',

  'mindset.card.emo24.title':  'A recuperação emocional não é linear.',
  'mindset.card.emo24.content':
    'Alguns dias você pode se sentir forte e em paz. Outros dias, emoções antigas voltam inesperadamente. Isso não apaga o seu progresso.\n\nO reset emocional é um processo, não uma linha reta.\n\nA cura costuma se mover em ondas — e não em consistência perfeita.',

  'mindset.card.emo25.title':  'Sua mente também precisa de momentos de suavidade.',
  'mindset.card.emo25.content':
    'A pressão constante de performar, melhorar e alcançar vai esgotando o cérebro emocionalmente com o tempo. O reset emocional exige momentos de suavidade, reflexão e gentileza.\n\nNem todo momento da vida precisa ser otimizado.\n\nPaz também importa.',

  'mindset.card.emo33.title':  'Sua mente precisa de pausas da negatividade.',
  'mindset.card.emo33.content':
    'A exposição constante a estresse, conflito, más notícias e tensão emocional sobrecarrega o sistema nervoso com o tempo. O reset emocional às vezes exige se afastar temporariamente do que drena emocionalmente.\n\nProteger o seu ambiente emocional apoia a recuperação mental.',

  'mindset.card.emo35.title':  'A cura emocional começa por desacelerar o sistema nervoso.',
  'mindset.card.emo35.content':
    'Um sistema nervoso superestimulado frequentemente mantém o corpo preso em tensão, ansiedade e esgotamento emocional. O reset emocional começa quando você cria calma intencionalmente — através da respiração, do descanso, do silêncio, do movimento ou da quietude.\n\nA sensação de segurança permite que a cura aconteça por dentro.',

  'mindset.card.emo37.title':  'A recuperação emocional exige honestidade consigo mesma.',
  'mindset.card.emo37.content':
    'Fingir estar bem quando você está exausta por dentro atrasa a cura. O reset emocional exige um reconhecimento honesto do que você realmente sente.\n\nNegar cria pressão emocional.\n\nHonestidade cria alívio.',

  'mindset.card.emo43.title':  'A cura muitas vezes acontece em silêncio.',
  'mindset.card.emo43.content':
    'A cura emocional nem sempre é dramática ou óbvia. Às vezes curar-se parece reagir com mais calma, descansar mais fundo ou se recuperar mais rápido dos momentos difíceis.\n\nPequenas mudanças emocionais importam.\n\nProgresso silencioso ainda é progresso.',

  'mindset.card.emo44.title':  'O esgotamento emocional distorce a forma como você vê as coisas.',
  'mindset.card.emo44.content':
    'Quando emocionalmente sobrecarregada, a mente frequentemente interpreta situações com mais negatividade e desesperança do que realmente existe. O reset emocional inclui reconhecer quando o cansaço está influenciando a sua percepção.\n\nO descanso restaura a clareza emocional.\n\nMentes cansadas têm dificuldade de enxergar com clareza.',

  'mindset.card.emo46.title':  'Você não precisa merecer o descanso.',
  'mindset.card.emo46.content':
    'Muitas pessoas se sentem culpadas sempre que desaceleram ou fazem pausas. O reset emocional começa quando você para de tratar o descanso como algo que precisa ser "conquistado" pelo esgotamento.\n\nDescansar faz parte da natureza humana.\n\nO descanso sustenta a saúde emocional.',

  'mindset.card.emo51.title':  'A paz às vezes exige distância.',
  'mindset.card.emo51.content':
    'Nem todo relacionamento, hábito, ambiente ou conversa apoia o bem-estar emocional. O reset emocional às vezes exige criar distância do que repetidamente prejudica a sua paz mental.\n\nSe proteger não é egoísmo quando a cura é necessária.',

  'mindset.card.emo52.title':  'Recuperar-se emocionalmente não é fraqueza.',
  'mindset.card.emo52.content':
    'Dar tempo para se recuperar emocionalmente não significa que você é frágil ou incapaz. A recuperação emocional exige coragem, consciência e honestidade.\n\nIgnorar a dor emocional não cria força.\n\nA cura constrói uma resiliência mais sólida com o tempo.',

  'mindset.card.emo54.title':  'A cura emocional exige paciência consigo mesma.',
  'mindset.card.emo54.content':
    'Algumas feridas emocionais levaram anos para se formar e podem precisar de tempo para sarar completamente. O reset emocional cresce pela autoconsciência consistente — não pela perfeição apressada.\n\nA cura nem sempre pode ser forçada.\n\nPaciência cria suavidade emocional.',

  'mindset.card.emo59.title':  'O reset emocional exige soltar a pressão constante sobre si mesma.',
  'mindset.card.emo59.content':
    'Muitas pessoas colocam uma pressão enorme em si mesmas para estar sempre produtivas, positivas e emocionalmente fortes. O reset emocional significa se permitir ser humana sem a necessidade constante de performar.\n\nA paz cresce quando a pressão afrouxa.',

  // ── Mindset — conteúdo dos cards CORAGEM em PT ────────────────────────────────
  'mindset.card.m3.content':
    'Confiança não é um sentimento que você espera aparecer — é uma evidência que você constrói. Cada vez que você faz algo difícil, cumpre uma promessa para si mesmo ou empurra contra a resistência, adiciona uma prova de que é capaz.\n\nA maioria das pessoas espera sentir confiança antes de agir. Quem performa bem age primeiro — e coleta as evidências depois.\n\nRegistre cada pequena vitória. Com o tempo, as provas se tornam inegáveis.',

  'mindset.card.m9.content':
    'Cada rejeição está ou te protegendo do caminho errado ou te preparando para o certo. As pessoas mais realizadas em qualquer área têm histórias de rejeição que quebrariam a maioria.\n\nO que as diferencia não é talento — é a crença de que rejeição é informação, não veredicto.\n\nNa próxima vez que você encontrar uma rejeição, pergunte: "O que isso está me dizendo sobre para onde eu deveria ir?"',

  'mindset.card.m15.content':
    'Você não pode pensar seu caminho até a confiança. Só é possível agir até lá. A confiança é um subproduto da competência — e a competência só vem da prática consistente.\n\nPare de tentar se sentir pronto. Pare de esperar ter confiança suficiente para começar.\n\nComece agora. A confiança que você busca está do outro lado de fazer exatamente aquilo que te assusta. A repetição constrói as evidências. As evidências constroem a crença.',

  'mindset.card.conf1.title':   'A insegurança diminui quando você para de se comparar.',
  'mindset.card.conf1.content':
    'A comparação constante destrói silenciosamente a autoconfiança. Sempre haverá alguém à frente em certas áreas da vida. A confiança cresce quando você foca mais no seu próprio progresso em vez de se medir em relação a todos os outros.\n\nSua jornada é única.\n\nComparação distrai você do seu próprio crescimento.',

  'mindset.card.conf2.title':   'Confiança não é arrogância.',
  'mindset.card.conf2.content':
    'A arrogância busca superioridade sobre os outros. A confiança simplesmente se sente segura sem precisar de validação constante. Pessoas verdadeiramente confiantes não precisam se provar em toda conversa ou situação.\n\nSegurança interna cria calma, não ego.\n\nConfiança permite que as pessoas permaneçam centradas.',

  'mindset.card.conf3.title':   'Confiança exige autocompaixão.',
  'mindset.card.conf3.content':
    'Muitas pessoas tentam construir confiança através da autocrítica severa, mas o constante ataque a si mesmo enfraquece a resiliência emocional. A confiança cresce mais rápido quando você aprende a se tratar com respeito durante erros e recaídas.\n\nCrescimento exige paciência.\n\nAutocompaixão cria força emocional, não fraqueza.',

  'mindset.card.conf4.title':   'A confiança se constrói nos momentos difíceis.',
  'mindset.card.conf4.content':
    'Qualquer pessoa pode se sentir confiante quando a vida é fácil. A confiança real se desenvolve quando você continua apesar do medo, da incerteza ou do desconforto.\n\nExperiências difíceis ensinam o quanto você realmente é resiliente. Cada desafio superado se torna evidência de que você consegue lidar com mais do que acreditava.\n\nA luta muitas vezes fortalece a identidade.',

  'mindset.card.conf5.title':   'Confiança significa aceitar a imperfeição.',
  'mindset.card.conf5.content':
    'O perfeccionismo muitas vezes esconde insegurança. Esperar ser impecável antes de agir cria hesitação sem fim.\n\nA confiança permite que você avance sem precisar que tudo esteja perfeito primeiro. O crescimento acontece através de erros, aprendizado e ajuste.\n\nImperfeição não reduz o seu valor.',

  'mindset.card.conf6.title':   'Sua linguagem corporal molda sua mente.',
  'mindset.card.conf6.content':
    'A forma como você se porta influencia como seu cérebro se sente internamente. Postura, contato visual, respiração e presença física afetam o estado emocional mais do que muitas pessoas percebem.\n\nConfiança é tanto mental quanto física. Presença física calma fortalece a estabilidade emocional.\n\nPequenos ajustes criam mudanças perceptíveis.',

  'mindset.card.conf7.title':   'Confiança vem da competência.',
  'mindset.card.conf7.content':
    'Uma das fontes mais fortes de confiança é a preparação e o desenvolvimento de habilidades. Quanto mais capaz você se torna, mais seguro naturalmente se sente.\n\nA confiança se fortalece através da prática, da repetição e da experiência. Crescimento cria evidência.\n\nPreparação reduz o medo.',

  'mindset.card.conf8.title':   'Medo não significa fraqueza.',
  'mindset.card.conf8.content':
    'O medo é uma resposta humana normal à incerteza e ao desafio. Pessoas confiantes ainda sentem medo — elas simplesmente não permitem que o medo controle todas as decisões.\n\nCoragem é agir apesar do desconforto. A confiança cresce cada vez que você avança mesmo com medo.\n\nMedo e crescimento muitas vezes coexistem.',

  'mindset.card.conf9.title':   'Confiar em si mesmo sob pressão.',
  'mindset.card.conf9.content':
    'A vida nem sempre será confortável ou previsível. Confiança significa confiar na sua capacidade de se adaptar mesmo quando as situações se tornam difíceis. Você não precisa de todas as respostas com antecedência para lidar bem com a vida.\n\nAdaptabilidade cria resiliência.\n\nConfiar em si mesmo reduz o pânico.',

  'mindset.card.conf10.title':  'A confiança melhora pela repetição.',
  'mindset.card.conf10.content':
    'A primeira tentativa em qualquer coisa geralmente parece desconfortável. A repetição gradualmente reduz a incerteza e aumenta a familiaridade. Quanto mais frequentemente você pratica situações difíceis, menos poder o medo tem sobre você.\n\nA confiança se fortalece através da exposição.\n\nFamiliaridade cria calma.',

  'mindset.card.conf11.title':  'Confiança é mudar como você fala consigo mesmo.',
  'mindset.card.conf11.content':
    'Seu diálogo interno molda seu estado emocional diariamente. A autocrítica constante treina o cérebro a esperar fracasso e insegurança. Uma linguagem interna de suporte cria uma resiliência emocional mais forte.\n\nA forma como você fala consigo mesmo importa profundamente.\n\nPensamentos saudáveis fortalecem a autoimagem.',

  'mindset.card.conf12.title':  'Confiança não é ausência de dúvida.',
  'mindset.card.conf12.content':
    'Até pessoas muito bem-sucedidas experienciam insegurança às vezes. Confiança não é eliminar a dúvida completamente — é aprender a não obedecer todo pensamento duvidoso.\n\nA mente frequentemente exagera o medo e a incerteza. Pessoas confiantes continuam avançando de qualquer forma.\n\nProgresso importa mais do que certeza perfeita.',

  'mindset.card.conf13.title':  'A confiança cresce quando você para de evitar desafios.',
  'mindset.card.conf13.content':
    'Evitar temporariamente reduz o medo, mas fortalece a insegurança a longo prazo. Cada situação evitada ensina ao cérebro que você é incapaz de lidar com o desconforto.\n\nEnfrentar desafios gradualmente retreina o sistema nervoso. A confiança se expande pela exposição.\n\nAção enfraquece o medo.',

  'mindset.card.conf14.title':  'A confiança se constrói pela recuperação.',
  'mindset.card.conf14.content':
    'O fracasso não destrói a confiança — recusar-se a se recuperar do fracasso muitas vezes sim. Pessoas resilientes entendem que reveses fazem parte do crescimento.\n\nA confiança aumenta quando você descobre que pode se recuperar, adaptar e continuar após os erros.\n\nRecuperação constrói força emocional. Persistência fortalece a identidade.',

  'mindset.card.conf15.title':  'Seu valor não se mede só pela produtividade.',
  'mindset.card.conf15.content':
    'Muitas pessoas vinculam a confiança inteiramente ao desempenho e ao sucesso externo. Mas o seu valor como pessoa não depende de performance constante.\n\nConfiança saudável cria espaço para descanso, imperfeição e humanidade. Autoestima não deveria desaparecer nos momentos difíceis.\n\nValor interno existe além da produtividade.',

  'mindset.card.conf16.title':  'Confiança exige limites.',
  'mindset.card.conf16.content':
    'Pessoas que constantemente ignoram suas próprias necessidades frequentemente lutam com o autorrespeito internamente. A confiança cresce quando você começa a proteger sua energia, tempo e bem-estar emocional.\n\nLimites comunicam autovalor. Respeitar-se ensina os outros como te tratar.\n\nLimites fortalecem a identidade.',

  'mindset.card.conf17.title':  'Confiança é uma prática diária.',
  'mindset.card.conf17.content':
    'Confiança não é um estado emocional permanente. Haverá dias em que você naturalmente se sentirá mais forte do que outros. Construir confiança exige hábitos diários repetidos que reforçam a autoconfiança, a resiliência e a coragem.\n\nConsistência molda a identidade com o tempo.\n\nPequenas ações diárias importam profundamente.',

  'mindset.card.conf18.title':  'Você se fortalece ao sobreviver momentos difíceis.',
  'mindset.card.conf18.content':
    'Muitas pessoas subestimam quanta resiliência já possuem. Cada experiência difícil que você supera se torna evidência de força interior. A confiança cresce quando você reconhece o quanto já superou.\n\nReflexão fortalece a perspectiva.\n\nSua sobrevivência passada contém prova da sua capacidade.',

  'mindset.card.conf19.title':  'Confiança melhora a tomada de decisões.',
  'mindset.card.conf19.content':
    'A insegurança frequentemente cria hesitação, excesso de análise e constante questionamento. A confiança permite uma tomada de decisão mais clara porque você confia na sua capacidade de lidar com os resultados.\n\nVocê pode não controlar cada resultado, mas pode confiar em si mesmo para responder com eficácia.\n\nAutoconfiança reduz a paralisia mental.',

  'mindset.card.conf20.title':  'Confiança é permanecer autêntico.',
  'mindset.card.conf20.content':
    'Fingir ser outra pessoa pode ganhar aprovação temporária, mas enfraquece a estabilidade interna com o tempo. A confiança cresce quando seu comportamento externo se alinha com seus valores e personalidade reais.\n\nAutenticidade cria liberdade emocional.\n\nVocê não precisa se performar constantemente para merecer respeito.',

  'mindset.card.conf21.title':  'A confiança cresce devagar, mas com força.',
  'mindset.card.conf21.content':
    'A maioria das confianças duradouras se desenvolve gradualmente através de experiências acumuladas. Pequenos momentos de coragem, consistência e resiliência constroem silenciosamente uma identidade mais forte com o tempo.\n\nA confiança muitas vezes é invisível enquanto está crescendo.\n\nPequeno progresso se acumula internamente.',

  'mindset.card.conf22.title':  'Pessoas confiantes aceitam que nem todos vão gostar delas.',
  'mindset.card.conf22.content':
    'Tentar agradar a todos cria esgotamento emocional e insegurança. A confiança permite que você tolere a desaprovação sem perder o senso de si mesmo.\n\nNem toda pessoa vai entender ou validar o seu caminho. Seu valor não depende de aprovação universal.\n\nAceitação cria liberdade.',

  'mindset.card.conf23.title':  'Confiança é calma, não barulhenta.',
  'mindset.card.conf23.content':
    'A verdadeira confiança muitas vezes parece mais quieta do que as pessoas esperam. Ela não busca constantemente atenção ou validação.\n\nConfiança calma vem da segurança interna, não da performance externa.\n\nCerteza tranquila é poderosa. Estabilidade muitas vezes fala baixo.',

  'mindset.card.conf24.title':  'A confiança se fortalece pela disciplina.',
  'mindset.card.conf24.content':
    'Autodisciplina e confiança estão profundamente conectadas. Cada vez que você avança apesar da resistência, seu autorrespeito cresce. A disciplina cria evidência de que você é capaz de lidar com coisas difíceis.\n\nConsistência fortalece a identidade.\n\nAção confiável constrói confiança interna.',

  'mindset.card.conf25.title':  'Confiança é permitir-se crescer.',
  'mindset.card.conf25.content':
    'Algumas pessoas ficam presas dentro de identidades antigas porque lutam para acreditar que podem mudar. Confiança inclui acreditar que você é capaz de se tornar mais do que seus erros ou limitações passadas.\n\nCrescimento exige abertura.\n\nSua versão atual não é sua versão final.',

  'mindset.card.conf26.title':  'Confiança muda como você experiencia a vida.',
  'mindset.card.conf26.content':
    'A confiança influencia relacionamentos, oportunidades, decisões, comunicação e bem-estar emocional. Ela afeta o quanto ousadamente você se move pelo mundo.\n\nQuando você confia em si mesmo mais profundamente, a vida frequentemente parece menos intimidadora e mais significativa.\n\nConfiança cria liberdade internamente antes de mudar qualquer coisa externamente.',

  'mindset.card.conf27.title':  'Confiança começa pela autoaceitação.',
  'mindset.card.conf27.content':
    'Muitas pessoas tentam se tornar confiantes enquanto secretamente rejeitam partes de si mesmas. A confiança real cresce quando você para de lutar contra sua própria humanidade e começa a aceitar quem você é — enquanto ainda permite espaço para crescimento.\n\nAutoaceitação cria estabilidade emocional.\n\nVocê não precisa se tornar perfeito para merecer autorrespeito.',

  'mindset.card.conf28.title':  'A confiança se conquista pela experiência.',
  'mindset.card.conf28.content':
    'Ler, planejar e pensar podem construir confiança até certo ponto. A confiança real se desenvolve pela experiência vivida. Cada conversa difícil, desafio, erro e recuperação fortalece sua capacidade de confiar em si mesmo.\n\nA experiência ensina ao sistema nervoso que você consegue sobreviver ao desconforto.',

  'mindset.card.conf29.title':  'Você se torna mais confiante quando para de se esconder.',
  'mindset.card.conf29.content':
    'Evitar oportunidades, ficar em silêncio e se diminuir pode parecer emocionalmente seguro temporariamente, mas muitas vezes fortalece a insegurança com o tempo. A confiança cresce quando você se permite ser visto, ouvido e presente.\n\nVisibilidade constrói resiliência.\n\nEsconder-se reforça o medo.',

  'mindset.card.conf30.title':  'A confiança se constrói pelo esforço honesto.',
  'mindset.card.conf30.content':
    'A confiança parece mais forte quando você sabe que genuinamente deu o seu melhor. Mesmo que os resultados sejam imperfeitos, o esforço cria respeito interno. Pessoas muitas vezes se sentem inseguras quando repetidamente se abandonam no meio dos desafios.\n\nEsforço honesto fortalece a identidade independentemente do resultado.',

  'mindset.card.conf31.title':  'Confiança é confiar na sua capacidade de aprender.',
  'mindset.card.conf31.content':
    'Você não precisa já saber tudo para avançar. A confiança cresce quando você confia na sua capacidade de se adaptar, aprender e melhorar com o tempo.\n\nMentes inseguras acreditam que erros as definem permanentemente. Mentes confiantes veem erros como lições temporárias.',

  'mindset.card.conf32.title':  'Confiar em si mesmo reduz a necessidade de aprovação constante.',
  'mindset.card.conf32.content':
    'Reasseguramento externo pode parecer reconfortante brevemente, mas depender dele constantemente enfraquece a autoconfiança. A confiança se fortalece quando você começa a se validar internamente em vez de precisar de aprovação para cada decisão.\n\nAutovalidação cria independência emocional.\n\nEstabilidade interna reduz a ansiedade.',

  'mindset.card.conf33.title':  'Confiança é ser gentil consigo mesmo no fracasso.',
  'mindset.card.conf33.content':
    'A maioria das pessoas é muito mais dura consigo mesma do que seria com alguém que ama. A autocrítica constante danifica a resiliência emocional.\n\nA confiança cresce quando você aprende a se recuperar do fracasso sem atacar o seu próprio valor.\n\nCompaixão fortalece a coragem.',

  'mindset.card.conf34.title':  'A confiança cresce além da zona de conforto.',
  'mindset.card.conf34.content':
    'Zonas de conforto parecem seguras mas frequentemente limitam o crescimento. A confiança se desenvolve pela exposição repetida a situações desconhecidas. Cada vez que você sobrevive ao desconforto, seu cérebro fica menos com medo do desafio.\n\nO crescimento ensina ao sistema nervoso que a incerteza é sobrevivível.',

  'mindset.card.conf35.title':  'Confiança não é ter todas as respostas.',
  'mindset.card.conf35.content':
    'Algumas pessoas acreditam que devem ter todas as respostas antes de agir. Mas a verdadeira confiança muitas vezes significa permanecer calmo mesmo sem certeza total.\n\nA vida sempre conterá incertezas. Pessoas confiantes confiam em si mesmas para descobrir as coisas ao longo do caminho.',

  'mindset.card.conf36.title':  'Sua energia muda como você se sente sobre si mesmo.',
  'mindset.card.conf36.content':
    'Privação de sono, esgotamento, saúde precária e exaustão podem enfraquecer dramaticamente a confiança. Muitas lutas emocionais se intensificam quando o sistema nervoso está sobrecarregado.\n\nCuidar do seu bem-estar físico sustenta a estabilidade emocional.\n\nUm corpo mais saudável sustenta uma mente mais forte.',

  'mindset.card.conf37.title':  'A confiança cresce quando você para de se justificar demais.',
  'mindset.card.conf37.content':
    'A insegurança frequentemente cria a necessidade de justificar constantemente decisões, comportamentos ou limites. A confiança permite que você se comunique com calma sem explicação excessiva.\n\nVocê não precisa de concordância universal para confiar nas suas escolhas.\n\nSimplicidade reflete certeza interna.',

  'mindset.card.conf38.title':  'A confiança se constrói pela recuperação, não pela perfeição.',
  'mindset.card.conf38.content':
    'Pessoas perfeitas não existem. A confiança mais forte muitas vezes pertence a pessoas que aprenderam como se recuperar após constrangimento, erros, rejeição ou reveses.\n\nRecuperação cria resiliência.\n\nA capacidade de se levantar novamente muda profundamente a autopercepção.',

  'mindset.card.conf39.title':  'Pessoas confiantes se permitem ocupar espaço.',
  'mindset.card.conf39.content':
    'A insegurança frequentemente faz as pessoas se minimizarem emocionalmente, fisicamente ou socialmente. Confiança significa permitir-se existir plenamente sem se desculpar pela sua presença.\n\nSeus pensamentos, voz e existência importam.\n\nAutovaloração cria uma presença mais forte.',

  'mindset.card.conf40.title':  'A confiança melhora quando você para de imaginar que todos te julgam.',
  'mindset.card.conf40.content':
    'A maioria das pessoas está muito mais focada em si mesma do que em te analisar constantemente. Pensar demais no julgamento social cria ansiedade desnecessária e autoconsciência excessiva.\n\nA confiança cresce quando você para de imaginar crítica constante.\n\nLiberdade aparece quando a autoconsciência se torna mais saudável e menos obsessiva.',

  'mindset.card.conf41.title':  'A confiança se constrói pela autorreflexão honesta.',
  'mindset.card.conf41.content':
    'Ignorar fraquezas não cria confiança real. A verdadeira confiança inclui a capacidade de reconhecer falhas honestamente sem desmoronar emocionalmente.\n\nAutoconsciência cria crescimento.\n\nConfiança madura equilibra autoaceitação com responsabilidade pessoal.',

  'mindset.card.conf42.title':  'Confiança exige resiliência emocional.',
  'mindset.card.conf42.content':
    'Crítica, rejeição e decepção são partes inevitáveis da vida. A confiança se fortalece quando você aprende a não interpretar cada experiência negativa como prova de inadequação.\n\nResiliência emocional permite que você continue sem perder sua identidade.\n\nEstabilidade importa mais do que perfeição.',

  'mindset.card.conf43.title':  'Confiança é agir antes de se sentir completamente pronto.',
  'mindset.card.conf43.content':
    'Muitas oportunidades desaparecem porque as pessoas esperam por uma certeza que nunca chega. A confiança muitas vezes surge depois da ação, não antes. Crescer exige movimento mesmo com desconforto.\n\nCoragem cria experiência.\n\nExperiência constrói confiança.',

  'mindset.card.conf44.title':  'A confiança cresce pela preparação.',
  'mindset.card.conf44.content':
    'A preparação reduz a incerteza e aumenta a segurança emocional. Praticar habilidades, se organizar e desenvolver competência fortalecem a confiança naturalmente com o tempo. A confiança parece mais estável quando sustentada pelo esforço.\n\nPreparação cria prontidão.',

  'mindset.card.conf45.title':  'Confiança é se respeitar o suficiente para ir embora.',
  'mindset.card.conf45.content':
    'A baixa autoestima frequentemente leva as pessoas a tolerar situações, relacionamentos ou desrespeitos que não deveriam suportar. A confiança se fortalece quando você para de abandonar suas próprias necessidades em troca de aceitação.\n\nLimites protegem a saúde emocional.\n\nAutorrespeito muda decisões.',

  'mindset.card.conf46.title':  'A confiança não é destruída pela rejeição.',
  'mindset.card.conf46.content':
    'A rejeição dói porque as pessoas naturalmente desejam pertencimento e validação. Mas a rejeição não define seu valor nem seu potencial futuro. Pessoas confiantes entendem que nem toda oportunidade ou relacionamento é para elas.\n\nA rejeição redireciona a vida às vezes mais do que a limita.',

  'mindset.card.conf47.title':  'A confiança melhora quando você foca no progresso.',
  'mindset.card.conf47.content':
    'O perfeccionismo mantém muitas pessoas se sentindo inadequadas porque nada parece "bom o suficiente". A confiança cresce mais rápido quando você reconhece a melhora em vez de focar apenas nas falhas.\n\nProgresso merece reconhecimento.\n\nPequenas vitórias constroem impulso emocional.',

  'mindset.card.conf48.title':  'Confiança é permanecer você mesmo sob pressão.',
  'mindset.card.conf48.content':
    'É fácil perder a autenticidade quando tentamos impressionar os outros ou evitar julgamentos. A confiança permite que você permaneça conectado aos seus valores mesmo em situações desconfortáveis.\n\nAutenticidade cria paz interna.\n\nFingir cria esgotamento emocional.',

  'mindset.card.conf49.title':  'Rejeição como redirecionamento.',
  'mindset.card.conf49.content':
    'Cada rejeição ou te protege de um caminho errado ou te prepara para o certo. As pessoas mais bem-sucedidas em qualquer área acumulam rejeições que quebrariam a maioria. O que as diferencia não é o talento — é a crença de que rejeição é informação, não veredicto.\n\nDa próxima vez que enfrentar uma rejeição, pergunte: "O que isso está me dizendo sobre para onde devo ir?"',

  'mindset.card.conf50.title':  'A confiança cresce quando você para de se definir por um único momento.',
  'mindset.card.conf50.content':
    'Um erro, uma rejeição ou uma situação constrangedora não definem sua identidade. O pensamento inseguro frequentemente transforma experiências temporárias em rótulos permanentes. A confiança cresce quando você entende que um único momento não pode apagar seu valor ou potencial.\n\nAs pessoas estão em constante evolução. Sua história é maior do que um único capítulo.',

  'mindset.card.conf51.title':  'A confiança se constrói ao enfrentar o que você evita.',
  'mindset.card.conf51.content':
    'As situações que você evita frequentemente se tornam as que mais controlam suas emoções. A confiança se fortalece quando você enfrenta gradualmente conversas desconfortáveis, medos e desafios em vez de fugir deles.\n\nEvitar mantém a insegurança viva.\n\nA exposição enfraquece o medo com o tempo. Coragem cresce pela repetição.',

  'mindset.card.conf52.title':  'Confiança é confiar na sua própria voz.',
  'mindset.card.conf52.content':
    'Muitas pessoas silenciam suas opiniões por medo de julgamento ou rejeição. A confiança cresce quando você se permite expressar pensamentos com honestidade e respeito sem filtrar constantemente sua identidade em busca de aprovação.\n\nSua perspectiva tem valor.\n\nFalar com autenticidade fortalece o autorrespeito.',

  'mindset.card.conf53.title':  'A confiança melhora quando você para de romantizar a vida dos outros.',
  'mindset.card.conf53.content':
    'As redes sociais e a comparação frequentemente criam a ilusão de que todos os outros são mais bem-sucedidos, atraentes ou seguros. A confiança cresce quando você se lembra de que toda pessoa enfrenta dificuldades em particular que você não consegue ver por completo.\n\nComparar sua vida real com os momentos em destaque de outra pessoa cria distorção. Uma perspectiva mais realista restaura a autoestima.',

  'mindset.card.conf54.title':  'Confiança é aprender a estar bem consigo mesmo.',
  'mindset.card.conf54.content':
    'Pessoas que se sentem profundamente desconfortáveis sozinhas frequentemente dependem em excesso de validação externa e distração. A confiança cresce quando você aprende a aproveitar a própria companhia e se sentir emocionalmente estável sem a atenção constante dos outros.\n\nA solidão pode fortalecer a identidade.\n\nPaz interior cria confiança mais sólida.',

  'mindset.card.conf55.title':  'Confiança exige abrir mão do perfeccionismo constante.',
  'mindset.card.conf55.content':
    'O perfeccionismo frequentemente cria paralisia, medo de fracassar e dúvida crônica sobre si mesmo. A confiança cresce mais rápido quando você se permite ser imperfeito enquanto continua melhorando.\n\nProgresso importa mais do que desempenho impecável.\n\nErros fazem parte do crescimento, não são prova de inadequação.',

  'mindset.card.conf56.title':  'A confiança se constrói através de limites honestos.',
  'mindset.card.conf56.content':
    'Dizer "sim" para tudo frequentemente enfraquece o autorrespeito e a energia emocional. A confiança se fortalece quando você é honesto sobre seus limites, necessidades e prioridades.\n\nLimites não são egoísmo quando protegem seu bem-estar mental.\n\nRespeitar a si mesmo ensina sua mente que suas necessidades também importam.',

  'mindset.card.conf57.title':  'A confiança muda a forma como você percorre a vida.',
  'mindset.card.conf57.content':
    'Quando você confia mais profundamente em si mesmo, se aproxima de oportunidades, relacionamentos e desafios de forma diferente. A confiança cria liberdade emocional porque você para de precisar de provas constantes do seu valor.\n\nVocê começa a arriscar mais, falar com mais honestidade e viver com mais intenção.\n\nSegurança interna muda o comportamento externo naturalmente.',

  // ── Mindset — conteúdo dos cards CLAREZA em PT ────────────────────────────────
  'mindset.card.m6.content':
    'Cada aplicativo, cada notificação, cada feed foi projetado para capturar a sua atenção — e mantê-la. Sua atenção está sendo vendida. A questão é: você está recebendo algo valioso em troca?\n\nDesconectar-se digitalmente não é sobre odiar a tecnologia. É sobre usá-la com intenção em vez de compulsão.\n\nComece com uma hora sem tela pela manhã e recupere a habilidade de dirigir a sua própria atenção.',

  'mindset.card.m12.content':
    'O tédio não é um problema a ser resolvido — é um estado que cria. Quando deixado sem estimulação, o cérebro entra no lugar onde vivem a criatividade, as percepções e a autorreflexão.\n\nAo preencher cada momento de silêncio com conteúdo, você rouba de si mesmo o espaço mental onde suas melhores ideias nascem.\n\nPermita-se entediar. Leve um caderno, não o celular. Observe o que a sua mente cria quando tem espaço.',

  'mindset.card.m18.content':
    'Minimalismo digital não é usar menos tecnologia — é usar apenas a tecnologia que genuinamente serve seus valores. Para cada aplicativo no seu celular, pergunte: isso acrescenta valor real à minha vida, ou apenas preenche um momento que não decidi como usar?\n\nVocê pode descobrir que menos ferramentas, usadas com intenção, produzem algo mais significativo do que uma dúzia delas usadas compulsivamente.',

  'mindset.card.detox1.title':  'Sua atenção está sendo disputada todos os dias.',
  'mindset.card.detox1.content':
    'Cada aplicativo, notificação e plataforma foi criado para manter você engajada pelo maior tempo possível. O detox digital começa quando você percebe que sua atenção é valiosa — e está sendo constantemente disputada.\n\nProteger o seu foco é proteger a sua energia mental.\n\nConsciência cria hábitos digitais mais saudáveis.',

  'mindset.card.detox2.title':  'Estimulação constante esgota a mente.',
  'mindset.card.detox2.content':
    'O cérebro não foi projetado para processar fluxos infinitos de informação sem pausa. Rolagem contínua, notificações e ruído digital sobrecarregam o sistema nervoso silenciosamente.\n\nO esgotamento mental muitas vezes vem da superestimulação, não da preguiça.\n\nO silêncio restaura a clareza cognitiva.',

  'mindset.card.detox3.title':  'O tédio não é o inimigo.',
  'mindset.card.detox3.content':
    'Muitas pessoas pegam o celular imediatamente quando a quietude aparece. Mas o tédio pode se tornar uma porta para a criatividade, a reflexão e o reset emocional.\n\nO detox digital significa permitir que o cérebro experimente momentos de silêncio novamente.\n\nA quietude fortalece a atenção e a imaginação.',

  'mindset.card.detox4.title':  'Seu celular deve ser uma ferramenta, não um mestre.',
  'mindset.card.detox4.content':
    'A tecnologia se torna prejudicial quando controla seu comportamento automaticamente. O detox digital começa quando você decide intencionalmente como e quando a tecnologia serve à sua vida.\n\nUso consciente cria liberdade.\n\nUso automático cria dependência.',

  'mindset.card.detox5.title':  'Notificações fragmentam sua atenção.',
  'mindset.card.detox5.content':
    'Cada notificação interrompe o fluxo mental e enfraquece a concentração. Até as distrações mais breves criam um tempo oculto de recuperação para o cérebro.\n\nO detox digital muitas vezes começa por reduzir alertas e interrupções desnecessários.\n\nProteger o foco melhora a clareza mental.',

  'mindset.card.detox6.title':  'Rolar o feed não é sempre descanso.',
  'mindset.card.detox6.content':
    'Muitas pessoas confundem a rolagem infinita com relaxamento, mas a superestimulação pode deixar a mente mais esgotada depois. A recuperação de verdade muitas vezes exige silêncio, movimento, natureza ou presença genuína.\n\nO detox digital ajuda o sistema nervoso a desacelerar novamente.',

  'mindset.card.detox7.title':  'Seu cérebro se adapta ao que você consome repetidamente.',
  'mindset.card.detox7.content':
    'Conteúdos curtos e constantes treinam o cérebro a buscar estimulação rápida e enfraquecem a atenção sustentada. O detox digital ajuda a reconstruir a paciência, o foco e o pensamento mais profundo.\n\nO que você consome repetidamente molda seus hábitos cognitivos com o tempo.',

  'mindset.card.detox8.title':  'Presença vale mais do que conexão constante.',
  'mindset.card.detox8.content':
    'Estar constantemente conectada digitalmente frequentemente desconecta as pessoas das experiências reais. O detox digital cria espaço para se reconectar com conversas, ambientes e momentos com mais profundidade.\n\nPresença fortalece o bem-estar emocional.',

  'mindset.card.detox9.title':  'Clareza mental exige silêncio.',
  'mindset.card.detox9.content':
    'O cérebro precisa de períodos sem input constante para processar emoções e pensamentos adequadamente. Estimulação infinita cria ruído mental.\n\nO detox digital dá à mente espaço para respirar novamente.\n\nO silêncio apoia o equilíbrio emocional.',

  'mindset.card.detox10.title':  'Você não precisa consumir informação a cada minuto.',
  'mindset.card.detox10.content':
    'A cultura moderna frequentemente cria pressão para estar sempre atualizada, entretida ou informada. Mas o consumo constante sobrecarrega o cérebro com o tempo.\n\nO detox digital ensina o valor de ingerir informação com intenção.\n\nA paz mental cresce pela moderação.',

  'mindset.card.detox11.title':  'Sua capacidade de atenção pode se recuperar.',
  'mindset.card.detox11.content':
    'A dificuldade de concentração é frequentemente reforçada pela superestimulação digital repetida. O detox digital ajuda a retreinar o cérebro para tolerar uma concentração mais lenta e profunda novamente.\n\nAtenção é treinável.\n\nO foco melhora com prática intencional.',

  'mindset.card.detox12.title':  'As redes sociais mostram os melhores momentos, não a vida inteira.',
  'mindset.card.detox12.content':
    'A exposição constante a vidas curadas online frequentemente cria comparações prejudiciais e insatisfação emocional. O detox digital ajuda a reconectar você com a realidade em vez de com a ilusão.\n\nA maioria das pessoas esconde suas dificuldades online.\n\nPerspectiva protege a saúde emocional.',

  'mindset.card.detox13.title':  'Estar sempre disponível cria estresse.',
  'mindset.card.detox13.content':
    'Sentir pressão para responder instantaneamente a cada mensagem cria tensão emocional e fadiga mental. O detox digital inclui criar limites mais saudáveis em torno da comunicação.\n\nVocê não precisa ser constantemente acessível para todo mundo.',

  'mindset.card.detox14.title':  'O descanso real às vezes exige desconexão.',
  'mindset.card.detox14.content':
    'O sistema nervoso tem dificuldade em relaxar completamente enquanto processa estimulação digital constante. O detox digital permite uma recuperação mental mais profunda ao reduzir os inputs temporariamente.\n\nDesconectar restaura a energia emocional.\n\nO descanso melhora a clareza cognitiva.',

  'mindset.card.detox15.title':  'A tecnologia deve apoiar sua vida, não substituí-la.',
  'mindset.card.detox15.content':
    'As ferramentas digitais podem melhorar significativamente a vida quando usadas com intenção. Os problemas começam quando a tecnologia substitui experiências significativas, relacionamentos e autoconsciência.\n\nO detox digital cria um equilíbrio mais saudável entre a vida online e a offline.',

  'mindset.card.detox16.title':  'A rolagem infinita muitas vezes evita sentimentos mais profundos.',
  'mindset.card.detox16.content':
    'Muitas pessoas usam a estimulação constante para evitar solidão, estresse, ansiedade ou desconforto emocional. O detox digital ajuda a criar consciência sobre os padrões de evitação emocional.\n\nA quietude muitas vezes revela o que a distração estava escondendo.',

  'mindset.card.detox17.title':  'Sua mente precisa de espaço para pensar por conta própria.',
  'mindset.card.detox17.content':
    'O consumo constante de conteúdo deixa pouco espaço para pensamentos originais ou reflexão. O detox digital cria espaço mental para um pensamento mais profundo, criatividade e percepções pessoais.\n\nO silêncio apoia o pensamento independente.',

  'mindset.card.detox18.title':  'O excesso de dopamina enfraquece a satisfação.',
  'mindset.card.detox18.content':
    'A estimulação digital rápida dispara constantemente respostas de dopamina no cérebro. Com o tempo, a vida comum pode começar a parecer menos interessante ou emocionalmente recompensadora.\n\nO detox digital ajuda a restaurar a apreciação por experiências mais lentas e simples.',

  'mindset.card.detox19.title':  'Limites digitais protegem a saúde emocional.',
  'mindset.card.detox19.content':
    'Nem toda conversa, aplicativo ou ambiente online merece acesso ilimitado à sua atenção e às suas emoções. O detox digital inclui se tornar mais intencional sobre o que entra no seu espaço mental.\n\nLimites reduzem a sobrecarga.',

  'mindset.card.detox20.title':  'Presença fortalece os relacionamentos.',
  'mindset.card.detox20.content':
    'Estar fisicamente presente enquanto mentalmente absorta nas telas enfraquece a conexão e a comunicação. O detox digital fortalece a presença emocional com outras pessoas.\n\nAtenção real aprofunda relacionamentos.\n\nPresença também cria memórias mais vívidas.',

  'mindset.card.detox21.title':  'O silêncio faz bem ao cérebro.',
  'mindset.card.detox21.content':
    'O cérebro precisa de momentos sem estimulação para se resetar emocional e cognitivamente. O detox digital ajuda a reintroduzir o silêncio na vida diária.\n\nAmbientes calmos reduzem o estresse e melhoram o foco.\n\nA quietude restaura a energia mental.',

  'mindset.card.detox22.title':  'O consumo constante pode criar entorpecimento emocional.',
  'mindset.card.detox22.content':
    'Quando o cérebro recebe estimulação ininterrupta, o processamento emocional muitas vezes se torna mais fraco ou atrasado. O detox digital permite que as emoções venham à tona mais naturalmente.\n\nA consciência emocional melhora quando a superestimulação diminui.',

  'mindset.card.detox23.title':  'Sua manhã molda seu estado mental.',
  'mindset.card.detox23.content':
    'Começar o dia imediatamente com redes sociais ou notificações frequentemente coloca o cérebro em modo reativo. Hábitos de detox digital pela manhã criam mais calma, foco e estabilidade emocional ao longo do dia.\n\nProteger as suas manhãs protege o seu estado mental.',

  'mindset.card.detox24.title':  'A vida real também acontece offline.',
  'mindset.card.detox24.content':
    'Momentos importantes muitas vezes são perdidos quando a atenção fica constantemente presa nas telas. O detox digital ajuda a reconectar você com experiências físicas, natureza, movimento, conversas e presença genuína.\n\nA vida existe além da estimulação digital.',

  'mindset.card.detox25.title':  'A sobrecarga mental reduz a criatividade.',
  'mindset.card.detox25.content':
    'O cérebro tem dificuldade de pensar criativamente quando está constantemente sobrecarregado de informação. O detox digital cria espaço mental para a imaginação e o pensamento mais profundo.\n\nA criatividade floresce em ambientes mentais mais calmos.',

  'mindset.card.detox26.title':  'Você pode reaprender a se relacionar com a tecnologia.',
  'mindset.card.detox26.content':
    'Hábitos digitais são comportamentos aprendidos, não traços permanentes de identidade. O detox digital começa com pequenas mudanças intencionais repetidas consistentemente com o tempo.\n\nConsciência cria escolhas mais saudáveis.\n\nA mudança é possível, gradualmente.',

  'mindset.card.detox27.title':  'Viver mais devagar pode parecer desconfortável no começo.',
  'mindset.card.detox27.content':
    'Pessoas acostumadas à estimulação constante podem inicialmente se sentir inquietas durante períodos de detox digital. Esse desconforto é frequentemente temporário.\n\nO sistema nervoso se ajusta gradualmente a ritmos mais lentos.\n\nA calma se fortalece com o tempo.',

  'mindset.card.detox28.title':  'Seu foco merece proteção.',
  'mindset.card.detox28.content':
    'A atenção é um dos seus recursos internos mais valiosos. As distrações digitais enfraquecem silenciosamente a concentração e a presença emocional.\n\nO detox digital fortalece a capacidade de focar intencionalmente novamente.\n\nProteger a atenção é proteger a qualidade de vida.',

  'mindset.card.detox29.title':  'Você não precisa documentar cada momento.',
  'mindset.card.detox29.content':
    'Gravar constantemente as experiências pode reduzir sua capacidade de vivê-las emocionalmente. O detox digital encoraja experienciar os momentos diretamente em vez de sempre ver a vida através das telas.\n\nPresença cria memórias mais ricas.',

  'mindset.card.detox30.title':  'O detox digital cria liberdade mental.',
  'mindset.card.detox30.content':
    'Reduzir a dependência digital não saudável cria leveza emocional, maior foco e presença mais forte na vida diária. O detox digital não é sobre rejeitar a tecnologia completamente — é sobre retomar o controle consciente da sua atenção e do seu bem-estar mental.',

  'mindset.card.detox31.title':  'Estar sempre conectada não significa se conectar de verdade.',
  'mindset.card.detox31.content':
    'Estar online o dia todo ainda pode deixar as pessoas emocionalmente desconectadas e solitárias. O detox digital ajuda a criar relacionamentos mais profundos através da presença genuína e de conversas com significado.\n\nConexão real exige atenção, não apenas acesso.',

  'mindset.card.detox32.title':  'Seu cérebro não foi criado para a rolagem infinita.',
  'mindset.card.detox32.content':
    'A mente humana naturalmente busca estimulação, e os feeds infinitos exploram esse instinto continuamente. O detox digital começa quando você reconhece que o conteúdo infinito frequentemente deixa o cérebro sobrecarregado em vez de satisfeito.\n\nConsciência cria escolhas digitais mais saudáveis.',

  'mindset.card.detox33.title':  'O ruído digital aumenta o cansaço mental.',
  'mindset.card.detox33.content':
    'Notificações constantes, vídeos, atualizações e mensagens drenam energia cognitiva ao longo do dia silenciosamente. Mesmo quando você não percebe conscientemente, o cérebro ainda está processando estimulação.\n\nO detox digital reduz o esgotamento mental ao diminuir os inputs desnecessários.',

  'mindset.card.detox34.title':  'Você não precisa responder tudo imediatamente.',
  'mindset.card.detox34.content':
    'A tecnologia moderna cria expectativas irreais de disponibilidade constante. O detox digital inclui aprender que respostas atrasadas não fazem de você uma pessoa irresponsável ou indiferente.\n\nLimites protegem a energia emocional e reduzem o estresse.',

  'mindset.card.detox35.title':  'Informação demais cria fadiga de decisão.',
  'mindset.card.detox35.content':
    'O cérebro fica sobrecarregado quando processa constantemente conteúdo e escolhas excessivos. O detox digital ajuda a reduzir a desordem mental e melhora a clareza.\n\nInputs mais simples apoiam um pensamento mais calmo.\n\nMenos informação às vezes cria decisões melhores.',

  'mindset.card.detox36.title':  'A mente precisa de momentos sem interrupção.',
  'mindset.card.detox36.content':
    'Interrupções constantes enfraquecem o pensamento profundo e a presença emocional. O detox digital cria espaço para concentração, reflexão e calma sem interrupções.\n\nA clareza mental melhora quando o cérebro tem permissão de manter o foco por mais tempo.',

  'mindset.card.detox37.title':  'A dependência de dopamina faz a vida comum parecer menor.',
  'mindset.card.detox37.content':
    'A estimulação digital rápida pode gradualmente reduzir a apreciação por experiências mais lentas do mundo real. O detox digital ajuda a restaurar o prazer em momentos simples — conversas, natureza, leitura, movimento e quietude.\n\nEquilíbrio reconstrói a sensibilidade emocional.',

  'mindset.card.detox38.title':  'As redes sociais frequentemente distorcem a realidade.',
  'mindset.card.detox38.content':
    'As plataformas online frequentemente mostram momentos editados, filtrados e cuidadosamente selecionados — não a experiência humana completa. O detox digital ajuda a reduzir a comparação irreal e a pressão emocional.\n\nA vida real é mais equilibrada e complexa do que as aparências online sugerem.',

  'mindset.card.detox39.title':  'Você pensa com mais clareza sem input constante.',
  'mindset.card.detox39.content':
    'Quando o cérebro está constantemente consumindo informação, sobra pouco espaço para a reflexão. O detox digital cria espaço mental para um pensamento mais profundo e autoconsciência.\n\nO silêncio melhora a clareza.\n\nReflexão fortalece a inteligência emocional.',

  'mindset.card.detox40.title':  'Detox digital é sobre intenção, não extremos.',
  'mindset.card.detox40.content':
    'Hábitos digitais saudáveis não exigem necessariamente abandonar a tecnologia completamente. O objetivo é aprender a usá-la conscientemente em vez de compulsivamente.\n\nEquilíbrio cria sustentabilidade.\n\nConsciência cria liberdade.',

  'mindset.card.detox41.title':  'Sua atenção determina como você experimenta a vida.',
  'mindset.card.detox41.content':
    'O que captura repetidamente a sua atenção molda lentamente suas emoções, foco e identidade. O detox digital fortalece a atenção intencional em vez da distração automática.\n\nAtenção consciente cria experiências mais significativas.',

  'mindset.card.detox42.title':  'A inquietação durante o detox é normal.',
  'mindset.card.detox42.content':
    'O cérebro pode inicialmente se sentir desconfortável sem estimulação constante porque se acostumou aos ciclos rápidos de dopamina. O detox digital muitas vezes parece estranho antes de parecer tranquilo.\n\nO sistema nervoso precisa de tempo para se readaptar.\n\nA calma se fortalece gradualmente.',

  'mindset.card.detox43.title':  'Seu sono depende dos seus hábitos digitais.',
  'mindset.card.detox43.content':
    'A exposição às telas tarde da noite superestimula o cérebro e perturba os padrões saudáveis de sono. O detox digital antes de dormir melhora a recuperação, a regulação emocional e o desempenho cognitivo.\n\nUm sono melhor fortalece a clareza mental.',

  'mindset.card.detox44.title':  'A produtividade melhora quando as distrações digitais diminuem.',
  'mindset.card.detox44.content':
    'Hábitos de verificação constante enfraquecem a concentração e reduzem a eficiência significativamente. O detox digital fortalece o foco ao reduzir a fragmentação mental.\n\nAtenção protegida cria uma produtividade mais sólida e um trabalho de melhor qualidade.',

  'mindset.card.detox45.title':  'Relaxamento de verdade é diferente de consumo passivo.',
  'mindset.card.detox45.content':
    'Muitas pessoas consomem conteúdo infinitamente e ainda assim se sentem emocionalmente cansadas depois. O detox digital ajuda a distinguir entre restauração genuína e superestimulação disfarçada de descanso.\n\nO descanso real deixa o sistema nervoso mais calmo — não sobrecarregado.',

  'mindset.card.detox46.title':  'Sua mente precisa de espaço vazio às vezes.',
  'mindset.card.detox46.content':
    'Criatividade, processamento emocional e percepções muitas vezes aparecem durante momentos quietos sem estimulação. O detox digital recria o espaço mental para respirar.\n\nEspaço vazio não é espaço desperdiçado.\n\nA quietude apoia a criatividade.',

  'mindset.card.detox47.title':  'A tecnologia pode aumentar a ansiedade silenciosamente.',
  'mindset.card.detox47.content':
    'A exposição constante a informação, comparação, urgência e notificações mantém muitos sistemas nervosos emocionalmente ativados. O detox digital ajuda a reduzir o estresse de fundo e a superestimulação emocional.\n\nAmbientes calmos apoiam a estabilidade emocional.',

  'mindset.card.detox48.title':  'Você não precisa consumir cada tendência.',
  'mindset.card.detox48.content':
    'A internet cria constantemente pressão para ficar atualizada sobre tudo que acontece em todo lugar. O detox digital inclui reconhecer que nem toda tendência, debate ou informação merece a sua atenção.\n\nConsumo seletivo protege a paz mental.',

  'mindset.card.detox49.title':  'Momentos offline fortalecem a autoconsciência.',
  'mindset.card.detox49.content':
    'Sem a distração digital constante, pensamentos e emoções ficam mais fáceis de perceber com clareza. O detox digital cria oportunidades para uma autorreflexão mais profunda.\n\nConsciência melhora a regulação emocional e a clareza.',

  'mindset.card.detox50.title':  'A tecnologia deve acrescentar valor à vida.',
  'mindset.card.detox50.content':
    'As ferramentas digitais funcionam melhor quando apoiam intencionalmente o aprendizado, a criatividade, a conexão ou um trabalho com significado. O detox digital é sobre remover o excesso prejudicial enquanto preserva o propósito útil.\n\nUso consciente cria equilíbrio.',

  'mindset.card.detox51.title':  'A rolagem constante enfraquece a presença.',
  'mindset.card.detox51.content':
    'Muitas pessoas existem fisicamente em um lugar enquanto estão mentalmente absortas em outro lugar digitalmente. O detox digital fortalece a capacidade de experienciar plenamente conversas, refeições, natureza e momentos comuns.\n\nPresença melhora o bem-estar emocional.',

  'mindset.card.detox52.title':  'Seu sistema nervoso percebe mais do que você imagina.',
  'mindset.card.detox52.content':
    'Mesmo quando você se sente emocionalmente "acostumada" à estimulação constante, o sistema nervoso ainda experimenta estresse com o input ininterrupto. O detox digital dá ao cérebro e ao corpo a oportunidade de se regular mais naturalmente.\n\nRecuperação apoia a resiliência.',

  'mindset.card.detox53.title':  'O detox digital fortalece o foco gradualmente.',
  'mindset.card.detox53.content':
    'A recuperação da capacidade de atenção não acontece instantaneamente. O cérebro reaprende lentamente a tolerar uma concentração mais profunda após períodos de superestimulação. Limites digitais consistentes fortalecem o foco com o tempo.\n\nPaciência importa durante o processo.',

  'mindset.card.detox54.title':  'Menos tempo de tela frequentemente cria mais espaço emocional.',
  'mindset.card.detox54.content':
    'Reduzir a estimulação digital desnecessária pode criar melhorias perceptíveis em calma, clareza e estabilidade emocional. O detox digital permite que a mente se sinta menos lotada internamente.\n\nSimplicidade apoia a paz.',

  'mindset.card.detox55.title':  'Você não precisa de entretenimento constante.',
  'mindset.card.detox55.content':
    'A cultura moderna frequentemente ensina as pessoas a evitar o silêncio, a quietude e o tédio continuamente. O detox digital ajuda a reconstruir o conforto com momentos mais lentos.\n\nQuietude não é vazio — é recuperação para a mente.',

  'mindset.card.detox56.title':  'Seus relacionamentos merecem atenção plena.',
  'mindset.card.detox56.content':
    'Atenção dividida enfraquece a conexão emocional com o tempo. O detox digital fortalece a comunicação ao encorajar uma escuta mais profunda e presença com os outros.\n\nAtenção comunica cuidado de forma mais poderosa do que a disponibilidade digital constante.',

  'mindset.card.detox57.title':  'Desacelerar melhora a consciência.',
  'mindset.card.detox57.content':
    'A superestimulação digital frequentemente mantém as pessoas mentalmente apressadas e emocionalmente desconectadas. O detox digital desacelera o ritmo interno e melhora a consciência de pensamentos, sentimentos e arredores.\n\nAtenção mais lenta cria experiências mais profundas.',

  'mindset.card.detox58.title':  'O detox digital ajuda a reconstruir a sensibilidade emocional.',
  'mindset.card.detox58.content':
    'O excesso de estimulação pode entorpecer a consciência emocional gradualmente. Reduzir a sobrecarga digital permite que as emoções se sintam mais claras e naturais novamente.\n\nA conexão emocional se fortalece quando a mente fica menos superestimulada.',

  'mindset.card.detox59.title':  'Seu tempo vale mais do que a rolagem infinita.',
  'mindset.card.detox59.content':
    'As horas desaparecem rapidamente dentro de hábitos digitais inconscientes. O detox digital cria consciência sobre como atenção e tempo estão sendo gastos diariamente.\n\nO uso intencional do tempo cria uma vida mais significativa.',

  'mindset.card.detox60.title':  'A paz mental às vezes exige menos estimulação.',
  'mindset.card.detox60.content':
    'O cérebro frequentemente funciona melhor com menos interrupções, ambientes mais calmos e atenção mais intencional. O detox digital cria condições onde a calma emocional se torna mais fácil de manter.\n\nSimplicidade protege a saúde mental.',

  'mindset.card.detox61.title':  'Recuperar sua atenção muda sua vida.',
  'mindset.card.detox61.content':
    'A atenção influencia produtividade, bem-estar emocional, relacionamentos, criatividade e qualidade de vida em geral. O detox digital é, em última análise, sobre retomar o controle consciente de para onde sua energia vai diariamente.\n\nO que você dá atenção repetidamente molda o seu futuro.',

  // ── Mindset — conteúdo dos cards IMPULSO em PT ────────────────────────────────
  'mindset.card.m4.content':
    'Toda manhã, identifique suas Tarefas Mais Importantes — as 1 a 3 tarefas que, se concluídas hoje, criariam o maior progresso. Faça essas antes de qualquer outra coisa. Antes dos e-mails. Antes das redes sociais. Antes que as demandas reativas do dia tomem conta.\n\nA maioria das pessoas preenche seus dias com o urgente, mas não importante. Quem pratica o Método MIT constrói sua vida sobre o que outros adiam.\n\nA diferença, composta ao longo de um ano, é extraordinária.',

  'mindset.card.m10.content':
    'Sua agenda deve refletir suas prioridades — não suas obrigações reativas. O bloqueio de tempo significa reservar cada hora do seu dia para uma categoria específica de trabalho antes do dia começar.\n\nPessoas reativas respondem ao que chega. Pessoas proativas executam o que foi planejado.\n\nComece protegendo suas manhãs para o seu trabalho mais importante. À medida que isso se torna natural, expanda essa proteção para o seu dia inteiro.',

  'mindset.card.m16.content':
    'Uma vez por semana, dedique 30 minutos para revisar a semana anterior e planejar a próxima. Pergunte: O que eu realizei? O que eu evitei? O que estou carregando adiante? O que preciso soltar?\n\nA revisão semanal é a prática mais poderosa porque transforma suas ações diárias aleatórias em uma narrativa coerente de progresso.\n\nPessoas que fazem revisões semanais experimentam dramaticamente menos ansiedade e muito mais clareza.',

  'mindset.card.prod1.title':  'Produtividade é progresso, não agitação.',
  'mindset.card.prod1.content':
    'Estar ocupada nem sempre significa ser produtiva. Muitas pessoas preenchem seus dias com atividade constante enquanto evitam o que realmente importa. Produtividade real significa criar progresso significativo em direção ao que importa.\n\nAção focada produz resultados. Movimento sem fim produz esgotamento.\n\nProdutividade é medida pelo impacto, não por quão sobrecarregada você se sente.',

  'mindset.card.prod2.title':  'Comece antes de se sentir pronta.',
  'mindset.card.prod2.content':
    'Esperar pela motivação perfeita desperdiça tempo e energia valiosos. A produtividade cresce quando você aprende a começar apesar da resistência ou da incerteza. A ação frequentemente cria motivação depois que o movimento começa.\n\nA parte mais difícil geralmente é iniciar.\n\nO impulso muda o estado emocional mais rápido do que o excesso de pensamento.',

  'mindset.card.prod3.title':  'Pequeno progresso ainda conta.',
  'mindset.card.prod3.content':
    'Muitas pessoas subestimam o poder das pequenas ações consistentes. Produtividade nem sempre é dramática ou intensa. Pequenos passos repetidos diariamente criam resultados enormes a longo prazo.\n\nConsistência se compõe silenciosamente com o tempo.\n\nPequeno progresso previne a estagnação.',

  'mindset.card.prod4.title':  'Foco cria resultados mais rápidos.',
  'mindset.card.prod4.content':
    'Multitarefa enfraquece a concentração, aumenta erros e drena a energia mental. A produtividade melhora dramaticamente quando você foca em uma tarefa significativa de cada vez. Concentração profunda permite trabalho de maior qualidade em menos tempo.\n\nAtenção dispersa cria resultados dispersos.\n\nFoco protege a eficiência.',

  'mindset.card.prod5.title':  'Produtividade exige gestão de energia.',
  'mindset.card.prod5.content':
    'Tempo sozinho não determina produtividade — energia mental e física também importam profundamente. Mentes esgotadas lutam para pensar com clareza e manter o foco. Sono, recuperação, alimentação e descanso influenciam fortemente o desempenho.\n\nProdutividade sustentável depende de energia sustentável.',

  'mindset.card.prod6.title':  'Produtividade se constrói através de sistemas.',
  'mindset.card.prod6.content':
    'Depender inteiramente da motivação cria inconsistência. Pessoas produtivas criam sistemas, rotinas e estruturas que apoiam a ação automaticamente. Sistemas reduzem a tomada de decisão emocional e o atrito mental.\n\nBons hábitos tornam a consistência mais fácil.\n\nEstrutura protege o impulso.',

  'mindset.card.prod7.title':  'Feito frequentemente é melhor do que perfeito.',
  'mindset.card.prod7.content':
    'O perfeccionismo frequentemente atrasa o progresso. Muitas pessoas gastam tempo excessivo refinando pequenos detalhes enquanto trabalhos importantes permanecem inacabados. A produtividade cresce quando você prioriza a conclusão e a melhoria sobre o polimento infinito.\n\nAção imperfeita geralmente cria mais resultados do que hesitação perfeita.',

  'mindset.card.prod8.title':  'Prioridades determinam a produtividade.',
  'mindset.card.prod8.content':
    'Tentar fazer tudo de uma vez frequentemente cria sobrecarga mental e resultados fracos. A produtividade melhora quando você identifica claramente o que mais importa. O trabalho importante deve receber sua melhor energia primeiro.\n\nPriorização cria clareza.\n\nClareza melhora a execução.',

  'mindset.card.prod9.title':  'Produtividade é consistência, não intensidade.',
  'mindset.card.prod9.content':
    'Explosões extremas de esforço podem parecer produtivas temporariamente, mas raramente são sustentáveis. Produtividade a longo prazo vem de rotinas consistentes repetidas com o tempo. Pequenas ações diárias criam progresso mais confiável do que sessões intensas ocasionais.\n\nEsforço sustentável produz resultados duradouros.',

  'mindset.card.prod10.title':  'O impulso reduz a resistência.',
  'mindset.card.prod10.content':
    'O cérebro frequentemente exagera a dificuldade de começar as tarefas. Uma vez que a ação começa, a resistência geralmente diminui naturalmente. A produtividade melhora quando você foca em iniciar o movimento em vez de negociar emocionalmente consigo mesma.\n\nMovimento cria engajamento.\n\nImpulso fortalece o foco.',

  'mindset.card.prod11.title':  'Pessoas produtivas terminam o que começam.',
  'mindset.card.prod11.content':
    'Muitas pessoas adoram planejar e começar novas ideias, mas lutam com a conclusão. Produtividade real inclui cumprir até que as tarefas estejam concluídas. Conclusão cria impulso, confiança e clareza mental.\n\nTarefas inacabadas criam desordem cognitiva.\n\nTerminar importa.',

  'mindset.card.prod12.title':  'Produtividade melhora com a simplicidade.',
  'mindset.card.prod12.content':
    'Sistemas supercomplexos frequentemente criam estresse e confusão desnecessários. Rotinas mais simples são mais fáceis de manter consistentemente. A produtividade aumenta quando você reduz o atrito e foca no essencial.\n\nComplexidade pode se tornar uma forma de procrastinação.\n\nSimplicidade melhora a execução.',

  'mindset.card.prod13.title':  'Seu ambiente afeta o que você produz.',
  'mindset.card.prod13.content':
    'Espaços desordenados e distrações constantes reduzem silenciosamente a concentração e a produtividade. Um ambiente calmo e organizado apoia um pensamento mais claro. Pessoas produtivas intencionalmente projetam espaços que encorajam o foco.\n\nO ambiente influencia o comportamento mais do que muitas pessoas percebem.',

  'mindset.card.prod14.title':  'Descanso faz parte da produtividade.',
  'mindset.card.prod14.content':
    'Trabalho constante sem recuperação enfraquece a criatividade, o foco e a resiliência emocional. Descanso não é preguiça — é parte do desempenho sustentável. Pessoas produtivas entendem que a recuperação protege a consistência a longo prazo.\n\nUma mente descansada produz trabalho de maior qualidade.',

  'mindset.card.prod15.title':  'Produtividade exige limites.',
  'mindset.card.prod15.content':
    'Dizer sim para tudo destrói o foco e drena a energia. A produtividade melhora quando você se torna mais seletiva com seu tempo e atenção. Nem toda solicitação merece acesso imediato a você.\n\nLimites protegem prioridades.\n\nProteção cria progresso.',

  'mindset.card.prod16.title':  'Disciplina cria produtividade.',
  'mindset.card.prod16.content':
    'Motivação pode iniciar a ação, mas disciplina mantém a consistência com o tempo. Pessoas produtivas continuam trabalhando mesmo quando as emoções flutuam. Rotinas reduzem a dependência do humor.\n\nAção consistente produz resultados confiáveis.\n\nDisciplina fortalece o impulso.',

  'mindset.card.prod17.title':  'Pensar de forma produtiva reduz a sobrecarga.',
  'mindset.card.prod17.content':
    'A sobrecarga muitas vezes vem de carregar mentalmente muitos pensamentos inacabados de uma vez. A produtividade melhora quando você organiza as tarefas externamente em vez de armazenar tudo mentalmente.\n\nEscrever as coisas cria clareza.\n\nSistemas claros reduzem a pressão mental.',

  'mindset.card.prod18.title':  'A ação cria clareza.',
  'mindset.card.prod18.content':
    'Muitas pessoas esperam se sentir completamente certas antes de agir. Mas a clareza frequentemente aparece através do movimento, não antes dele. A produtividade cresce quando você para de esperar pela certeza perfeita primeiro.\n\nO aprendizado acontece durante a execução.\n\nO progresso revela a direção.',

  'mindset.card.prod19.title':  'Produtividade exige gestão emocional.',
  'mindset.card.prod19.content':
    'Estresse, ansiedade e esgotamento emocional podem destruir silenciosamente a produtividade. A regulação emocional melhora a concentração e a capacidade de tomar decisões. Pessoas produtivas aprendem a acalmar o ruído mental em vez de permitir que as emoções controlem cada ação.\n\nEstabilidade emocional apoia o desempenho.',

  'mindset.card.prod20.title':  'Produtividade é escolher resultados de longo prazo em vez de conforto imediato.',
  'mindset.card.prod20.content':
    'Rolar o feed, procrastinar e evitar tarefas difíceis pode parecer reconfortante temporariamente, mas frequentemente cria estresse depois. Produtividade exige escolher progresso significativo em vez de gratificação instantânea.\n\nDesconforto temporário frequentemente cria recompensa a longo prazo.\n\nDisciplina protege o futuro.',

  'mindset.card.prod21.title':  'Pessoas produtivas protegem suas horas de pico.',
  'mindset.card.prod21.content':
    'Toda pessoa tem períodos de maior clareza e foco mental durante o dia. Pessoas produtivas intencionalmente usam essas horas para trabalho importante em vez de distrações de baixo valor.\n\nTiming estratégico melhora a eficiência dramaticamente.\n\nConsciência de energia fortalece o output.',

  'mindset.card.prod22.title':  'Produtividade cresce pela repetição.',
  'mindset.card.prod22.content':
    'Repetição fortalece hábitos e reduz a resistência com o tempo. Quanto mais você pratica o trabalho focado, mais fácil fica manter a consistência. Comportamento produtivo eventualmente se torna automático pela repetição.\n\nHábitos criam estabilidade.',

  'mindset.card.prod23.title':  'Produtividade significa gerenciar a carga cognitiva.',
  'mindset.card.prod23.content':
    'Tarefas demais, decisões e distrações sobrecarregam o cérebro. A produtividade melhora quando você reduz a desordem mental desnecessária e simplifica as prioridades.\n\nMentes claras executam com mais eficácia.\n\nOrganização mental protege o foco.',

  'mindset.card.prod24.title':  'Produtividade é sobre viver com intenção.',
  'mindset.card.prod24.content':
    'Viver reativamente frequentemente cria estresse e atenção dispersa. Pessoas produtivas decidem intencionalmente como querem usar seu tempo e energia. Comportamento intencional cria alinhamento mais forte com objetivos de longo prazo.\n\nConsciência melhora a tomada de decisão.',

  'mindset.card.prod25.title':  'Pessoas produtivas respeitam o tempo.',
  'mindset.card.prod25.content':
    'O tempo é um dos poucos recursos que não podem ser recuperados uma vez perdidos. Pessoas produtivas tratam o tempo com consciência e propósito. Pequenos momentos desperdiçados repetidos diariamente se compõem em perdas grandes ao longo dos anos.\n\nUso consciente do tempo cria progresso significativo.',

  'mindset.card.prod26.title':  'Produtividade melhora quando você reduz distrações.',
  'mindset.card.prod26.content':
    'Cada distração cria um tempo oculto de recuperação para o cérebro. Interrupções constantes fragmentam a concentração e reduzem a qualidade do output. Pessoas produtivas intencionalmente minimizam notificações, ruído e interrupções desnecessárias.\n\nProteger o foco melhora a eficiência naturalmente.',

  'mindset.card.prod27.title':  'Progresso constrói confiança.',
  'mindset.card.prod27.content':
    'Cada tarefa concluída fortalece a autoconfiança e a motivação. A produtividade cria impulso emocional porque a ação prova capacidade. Progresso consistente melhora a confiança com o tempo.\n\nMovimento reduz a estagnação e a resistência mental.',

  'mindset.card.prod28.title':  'Produtividade sustentável cria vidas melhores.',
  'mindset.card.prod28.content':
    'Produtividade real não é sobre esgotamento ou pressão constante. É sobre criar progresso significativo enquanto mantém saúde, equilíbrio e bem-estar emocional. Produtividade sustentável apoia o crescimento a longo prazo em vez do esgotamento de curto prazo.\n\nSucesso real exige equilíbrio.',

  'mindset.card.prod29.title':  'Produtividade começa por decidir o que importa.',
  'mindset.card.prod29.content':
    'Muitas pessoas desperdiçam energia porque nunca definem claramente o que é realmente importante. A produtividade melhora quando você para de tratar cada tarefa com urgência igual. Trabalho importante merece atenção focada.\n\nPrioridades claras reduzem a confusão e fortalecem a execução.',

  'mindset.card.prod30.title':  'Pensar demais atrasa a execução.',
  'mindset.card.prod30.content':
    'Pensar profundamente pode ser valioso, mas a análise interminável frequentemente se torna procrastinação disfarçada. A produtividade cresce quando você para de esperar pela certeza perfeita antes de começar.\n\nA maioria das respostas fica mais clara através da ação.\n\nMovimento cria progresso mais rápido do que planejamento excessivo.',

  'mindset.card.prod31.title':  'Pessoas produtivas criam impulso cedo.',
  'mindset.card.prod31.content':
    'A forma como você começa o dia influencia sua energia mental por horas depois. Pequenas ações produtivas no início do dia criam impulso psicológico. Um começo forte reduz a resistência mais tarde.\n\nVitórias iniciais fortalecem o foco e a motivação.',

  'mindset.card.prod32.title':  'Produtividade exige recuperação mental.',
  'mindset.card.prod32.content':
    'Estimulação constante e trabalho sem pausa eventualmente reduzem a criatividade e o desempenho cognitivo. Pessoas produtivas entendem a importância de se afastar periodicamente para resetar mentalmente.\n\nRecuperação restaura a clareza.\n\nUm cérebro descansado resolve problemas com mais eficácia.',

  'mindset.card.prod33.title':  'Produtividade melhora quando você para de buscar motivação constante.',
  'mindset.card.prod33.content':
    'A motivação naturalmente flutua ao longo da vida. Esperar para "ter vontade" cria inconsistência e atraso. Pessoas produtivas dependem mais de rotinas e estrutura do que de inspiração emocional.\n\nHábitos criam estabilidade quando as emoções mudam.',

  'mindset.card.prod34.title':  'Vidas produtivas são construídas pela disciplina diária.',
  'mindset.card.prod34.content':
    'Sucesso a longo prazo raramente vem de um momento extraordinário. Geralmente vem de ações disciplinadas repetidas consistentemente com o tempo. Hábitos diários moldam silenciosamente os resultados.\n\nConsistência se compõe em transformação significativa.',

  'mindset.card.prod35.title':  'Produtividade significa usar sua energia com intenção.',
  'mindset.card.prod35.content':
    'Nem todas as tarefas merecem sua melhor energia mental. Pessoas produtivas intencionalmente reservam seu foco mais forte para trabalhos com significado. Distrações de baixo valor não devem consumir as horas de pico mental.\n\nAlocação estratégica de energia melhora dramaticamente o desempenho.',

  'mindset.card.prod36.title':  'Desordem reduz a produtividade.',
  'mindset.card.prod36.content':
    'Desordem mental e física frequentemente criam sobrecarga emocional. Tarefas inacabadas demais, notificações e distrações enfraquecem a concentração. Pessoas produtivas simplificam seu ambiente e sistemas sempre que possível.\n\nSimplicidade apoia um pensamento mais claro.',

  'mindset.card.prod37.title':  'Pessoas produtivas respeitam seus limites.',
  'mindset.card.prod37.content':
    'Esgotamento não é sinal de sucesso. Produtividade sustentável exige entender limites físicos, emocionais e mentais. Descansar estrategicamente protege o desempenho a longo prazo.\n\nProdutividade sem equilíbrio eventualmente se torna autodestrutiva.',

  'mindset.card.prod38.title':  'A ação dissolve a ansiedade.',
  'mindset.card.prod38.content':
    'Muitos pensamentos pesados diminuem quando o movimento começa. Agir traz alívio emocional porque substitui a incerteza por progresso concreto. A evitação alimenta a tensão mental.\n\nO impulso reduz o excesso de pensamento e a resistência interna.',

  'mindset.card.prod39.title':  'Comece pequeno. O caminho abre no ritmo.',
  'mindset.card.prod39.content':
    'Tarefas grandes parecem intimidantes porque a mente tenta processar o todo de uma vez. Quando você reduz os objetivos em ações menores, o caminho fica mais claro.\n\nComeços simples criam impulso. A simplicidade diminui a resistência interna.',

  'mindset.card.prod40.title':  'Foco floresce em espaços protegidos.',
  'mindset.card.prod40.content':
    'Interrupções constantes corroem a concentração de forma silenciosa. Proteger sua atenção de distrações desnecessárias, conversas sem foco e ruído digital é uma forma de respeitar o próprio tempo.\n\nLimites claros preservam energia mental. Ambientes protegidos sustentam o foco.',

  'mindset.card.prod41.title':  'A mente produtiva busca caminhos.',
  'mindset.card.prod41.content':
    'Reclamar e se fixar no que não funciona drena energia sem gerar progresso. Treinar a atenção para soluções possíveis muda o que você consegue executar.\n\nPensamento orientado a soluções melhora a execução. A energia segue a atenção.',

  'mindset.card.prod42.title':  'Preparação reduz o atrito.',
  'mindset.card.prod42.content':
    'Organizar com antecedência reduz o cansaço mental e o atrito durante o que importa. Quando ferramentas, horários e prioridades já estão no lugar, a execução flui naturalmente.\n\nA preparação aumenta a eficiência e reduz o desgaste de tomar decisões. Estrutura sustenta o impulso.',

  'mindset.card.prod43.title':  'Atenção é recurso — use com intenção.',
  'mindset.card.prod43.content':
    'Distrações modernas competem o tempo todo pelo espaço mental. A capacidade de direcionar a atenção com intenção é o que separa o esforço do resultado real.\n\nFoco disperso enfraquece a execução. Atenção direcionada potencializa entrega e criatividade.',

  'mindset.card.prod44.title':  'Imperfeito em movimento vale mais que perfeito parado.',
  'mindset.card.prod44.content':
    'O perfeccionismo frequentemente cria hesitação, atraso e estresse desnecessário. Focar no progresso e na melhora contínua gera mais resultado do que buscar execução impecável.\n\nA ação imperfeita cria aprendizado e impulso. O progresso importa mais do que a perfeição.',

  'mindset.card.prod45.title':  'Hábitos produtivos criam estabilidade emocional.',
  'mindset.card.prod45.content':
    'Rotinas consistentes reduzem o caos mental criando previsibilidade e estrutura. Hábitos organizados ajudam a diminuir a sobrecarga e o estresse.\n\nA produtividade melhora o bem-estar emocional porque cria uma sensação mais sólida de controle. Estabilidade sustenta o desempenho.',

  'mindset.card.prod46.title':  'Ficar em uma coisa por mais tempo muda o resultado.',
  'mindset.card.prod46.content':
    'Alternar entre tarefas com frequência drena energia cognitiva e enfraquece a concentração. Permanecer em algo importante por tempo suficiente cria impulso real.\n\nO foco profundo gera resultados de maior qualidade em menos tempo. A continuidade melhora a eficiência.',

  'mindset.card.prod47.title':  'Recuperação faz parte da produtividade.',
  'mindset.card.prod47.content':
    'O desempenho mental cai quando o cérebro nunca descansa de verdade. A recuperação é necessária para criatividade, equilíbrio emocional e concentração.\n\nDescansar aumenta a eficiência a longo prazo. Desempenho sustentável exige restauração.',

  'mindset.card.prod48.title':  'Repetição constrói produtividade.',
  'mindset.card.prod48.content':
    'Quanto mais você pratica comportamentos produtivos com consistência, mais automáticos eles se tornam. Hábitos reduzem a resistência emocional ao longo do tempo.\n\nA produtividade fica mais fácil quando a ação não exige mais negociação interna constante. A repetição fortalece a disciplina.',

  'mindset.card.prod49.title':  'Foque no que está ao seu alcance.',
  'mindset.card.prod49.content':
    'Preocupar-se excessivamente com circunstâncias externas drena energia e enfraquece a execução. A produtividade melhora quando a atenção permanece voltada para passos possíveis dentro do seu controle.\n\nA ação cria movimento. Obsessão com resultados incontroláveis cria paralisia.',

  'mindset.card.prod50.title':  'Resultados que valem levam tempo para aparecer.',
  'mindset.card.prod50.content':
    'Muitos objetivos valiosos demoram antes de mostrar progresso visível. Continuar trabalhando de forma consistente, mesmo quando os resultados parecem lentos, é o que sustenta o longo prazo.\n\nA paciência fortalece a persistência. O progresso duradouro muitas vezes se desenvolve em silêncio antes de se tornar visível.',

  'mindset.card.prod51.title':  'Rotinas confiáveis sustentam a consistência.',
  'mindset.card.prod51.content':
    'Rotinas sólidas reduzem o cansaço de tomar decisões e aumentam a consistência. Criar hábitos que sustentam a ação automática, em vez de depender totalmente da força de vontade, é o que mantém o longo prazo.\n\nSistemas confiáveis criam resultados confiáveis. Estrutura simplifica a execução.',

  'mindset.card.prod52.title':  'Autoconhecimento melhora a produtividade.',
  'mindset.card.prod52.content':
    'Entender seus padrões de energia, distrações e hábitos ajuda a melhorar o desempenho de forma significativa. Pessoas produtivas se observam com honestidade em vez de ignorar comportamentos que não servem.\n\nConsciência cria melhores decisões. Reflexão melhora a execução.',

  'mindset.card.prod53.title':  'Nem todo dia será perfeito — e tudo bem.',
  'mindset.card.prod53.content':
    'Nem todo dia vai parecer igualmente focado ou eficiente. A produtividade não é destruída por dias ocasionais de baixa energia.\n\nA consistência importa mais do que flutuações temporárias. Pessoas produtivas continuam avançando sem esperar perfeição o tempo todo.',

  'mindset.card.prod54.title':  'Priorizar é uma habilidade — não uma limitação.',
  'mindset.card.prod54.content':
    'Fazer mais nem sempre é a resposta. A produtividade frequentemente melhora quando você elimina intencionalmente tarefas de baixo valor.\n\nPriorizar protege energia para o trabalho que importa. Simplicidade cria foco mais sólido e melhores resultados.',

  'mindset.card.prod55.title':  'Decisões demais cansam — simplifique o que puder.',
  'mindset.card.prod55.content':
    'Decisões em excesso drenam energia cognitiva ao longo do dia. Simplificar rotinas e reduzir escolhas desnecessárias sempre que possível é uma forma de proteger o que importa.\n\nEnergia mental deve ser reservada para o pensamento que faz diferença. Simplicidade protege o foco.',

  'mindset.card.prod56.title':  'Produtividade e disciplina caminham juntas.',
  'mindset.card.prod56.content':
    'Sem disciplina, a produtividade se torna inconsistente e dependente de emoções. Pessoas produtivas continuam agindo mesmo quando a motivação diminui.\n\nAção consistente cria resultados confiáveis. A disciplina protege o impulso ao longo do tempo.',

  'mindset.card.prod57.title':  'Pensar no longo prazo muda as decisões de hoje.',
  'mindset.card.prod57.content':
    'O conforto imediato frequentemente conflita com o progresso a longo prazo. Pessoas produtivas tomam decisões que apoiam objetivos futuros em vez de satisfazer apenas as emoções do momento.\n\nPensar no longo prazo melhora a consistência e a paciência. A visão fortalece a disciplina.',

  'mindset.card.prod58.title':  'O que você evita costuma ser o que mais pesa.',
  'mindset.card.prod58.content':
    'As tarefas que você evita frequentemente criam mais estresse mental. A produtividade melhora drasticamente quando você enfrenta responsabilidades importantes de forma direta, em vez de adiá-las repetidamente.\n\nA ação reduz o peso mental. A evitação aumenta a ansiedade.',

  'mindset.card.prod59.title':  'Produtividade real melhora a qualidade de vida.',
  'mindset.card.prod59.content':
    'Produtividade real não é sobre fazer mais constantemente. É sobre usar tempo, energia e atenção com intenção para criar progresso significativo enquanto mantém equilíbrio emocional e saúde.\n\nProdutividade sustentável apoia tanto a conquista quanto o bem-estar.',

  'mindset.card.mom1.title':  'Passos pequenos ainda te movem.',
  'mindset.card.mom1.content':
    'O impulso não precisa de grandes saltos. Ele precisa de movimentos pequenos e consistentes na mesma direção. Os dias em que você sente menos vontade costumam ser exatamente aqueles em que as pequenas ações importam mais.\n\nAparecer discretamente, sem alarde, é como o progresso real se acumula. Um passo hoje já é suficiente.',

  'mindset.card.mom2.title':  'Começar é a parte mais difícil.',
  'mindset.card.mom2.content':
    'A resistência chega ao pico antes de você começar. Quando o movimento começa, quase sempre fica mais fácil. O cérebro interpreta a ação como segurança e gradualmente reduz a resistência.\n\nNão espere o momento perfeito — ele costuma aparecer depois que você já começou. O impulso nasce de uma única decisão de se mover.',

  'mindset.card.mom3.title':  'O impulso se reconstrói — não se recupera.',
  'mindset.card.mom3.content':
    'Depois de uma pausa, você não volta ao zero. Você retorna ao início de uma nova sequência, carregando tudo que já aprendeu. O impulso reconstruído costuma ser mais forte do que o original, porque vem acompanhado da evidência de que você já fez isso antes.\n\nVocê já sabe que consegue. Esse conhecimento não se apaga.',

  'mindset.card.mom4.title':  'Concluir cria sua própria energia.',
  'mindset.card.mom4.content':
    'Cada tarefa que você termina libera uma pequena recompensa psicológica que prepara o cérebro para a próxima. É por isso que começar por qualquer coisa — mesmo pela mais simples — pode desencadear uma sequência de ações produtivas.\n\nO impulso é parcialmente biológico. Use-o intencionalmente. Termine uma coisa e deixe a energia te levar à próxima.',

  'mindset.card.mom5.title':  'Consistência é impulso silencioso.',
  'mindset.card.mom5.content':
    'A forma mais poderosa de impulso é invisível para os outros. É o ato diário de aparecer quando ninguém percebe, quando os resultados ainda não são visíveis, quando a dúvida fala mais alto do que a confiança.\n\nEssa consistência silenciosa é onde a mudança real vive. Você não precisa de grandes conquistas. Precisa continuar se movendo.',

  'mindset.card.mom6.title':  'O progresso cresce quando você o percebe.',
  'mindset.card.mom6.content':
    'O impulso acelera quando você o nota. Registrar pequenas conquistas, reconhecer o avanço e valorizar a consistência não é vaidade — é reforço. O cérebro constrói motivação a partir de evidências de progresso.\n\nTorne seu impulso visível, mesmo que só para você. O que você mede e celebra tende a crescer.',

  'mindset.card.mom7.title':  'Agir antes de se sentir pronto.',
  'mindset.card.mom7.content':
    'Esperar se sentir pronto é o principal inimigo do impulso. A prontidão raramente chega sozinha — ela é criada pela ação. A sensação de estar preparado vem depois dos primeiros passos, não antes deles.\n\nQuem tem impulso age antes da certeza, aprende durante o movimento e ajusta ao longo do caminho. Comece agora. Ajuste depois.',

  'mindset.card.mom8.title':  'O efeito composto de aparecer.',
  'mindset.card.mom8.content':
    'Cada dia que você aparece adiciona a uma base que é invisível no curto prazo e inegável no longo prazo. As pessoas que parecem dar saltos repentinos costumam ser as que investiram meses de esforço silencioso e não reconhecido antes.\n\nSua consistência atual está construindo algo que você ainda não consegue ver completamente.',

  // ── Mindset — conteúdo dos cards RITMO em PT ──────────────────────────────────

  'mindset.card.m2.content':
    'Se uma tarefa leva menos de 2 minutos — faça agora. Não agende, não anote, simplesmente faça. Essa regra simples elimina centenas de pequenas procrastinações que se acumulam e formam uma névoa de coisas inacabadas. A pilha de tarefas pequenas e incompletas drena sua energia mental sem que você perceba.\n\nResolva-as na hora e libere espaço mental para o que realmente importa.',

  'mindset.card.m8.content':
    'Cada ação que você toma é um voto pela pessoa que quer se tornar. Não precisa acreditar nisso de início — só precisa agir com consistência. Não se pergunte o que precisa fazer. Pergunte quem quer ser.\n\nQuem se exercita não questiona se está com vontade hoje. Quem lê não se pergunta se tem tempo. Quando o hábito vira identidade, a motivação se torna irrelevante.',

  'mindset.card.m14.content':
    'Você vai falhar um dia. Isso não é fracasso — é ser humano. A regra é simples: nunca falhe duas vezes. Um dia perdido é um acidente. Dois dias perdidos já é o começo de um novo hábito — o hábito de não aparecer.\n\nA mentalidade do recomeço diz: faltei ontem. Hoje começo de novo. Sem drama, sem autopunição, sem narrativa de fracasso. Apenas: hoje começo de novo.',

  'mindset.card.m20.content':
    'O almirante James Stockdale sobreviveu a anos de tortura como prisioneiro de guerra vivendo um paradoxo: encarar os fatos mais brutais da realidade atual enquanto mantinha uma fé inabalável de que iria superar. O Paradoxo de Stockdale é a base da resiliência disciplinada.\n\nNão finja que as coisas estão melhores do que estão. Não finja que estão piores. Veja com clareza. Acredite com firmeza. Aja com consistência.',

  'mindset.card.disc1.title':  'Seu cérebro confia no que você repete.',
  'mindset.card.disc1.content':
    'Disciplina não é punição — é a prova de que você valoriza seu futuro o suficiente para protegê-lo. Cada promessa que você cumpre consigo mesmo fortalece sua identidade e sua autoconfiança.\n\nPessoas disciplinadas não são necessariamente mais motivadas; elas simplesmente agem de acordo com suas prioridades em vez de ceder a emoções passageiras. A verdadeira confiança vem de saber que você pode contar consigo mesmo. A disciplina constrói essa confiança todos os dias.',

  'mindset.card.disc2.title':  'O difícil fica mais leve quando vira rotina.',
  'mindset.card.disc2.content':
    'A motivação é emocional e imprevisível. Em alguns dias ela aparece naturalmente; em outros, some por completo. A disciplina é o que permite que o progresso continue mesmo quando as emoções oscilam.\n\nPessoas que alcançam o que querem não dependem de se sentir inspiradas. Elas criam sistemas e hábitos que funcionam independentemente do humor.',

  'mindset.card.disc3.title':  'Pequenas repetições mudam a direção dos dias.',
  'mindset.card.disc3.content':
    'A vida raramente muda por uma decisão enorme. Ela muda por escolhas pequenas repetidas com consistência ao longo do tempo. A disciplina se constrói nos momentos ordinários — acordar quando planejou, terminar o que começou, resistir à distração, cumprir o que prometeu.\n\nPequenas ações disciplinadas se acumulam em transformações profundas. Seus hábitos, silenciosamente, vão se tornando seu futuro.',

  'mindset.card.disc4.title':  'O conforto frequentemente atrasa o crescimento.',
  'mindset.card.disc4.content':
    'O cérebro naturalmente busca conforto, conveniência e prazer imediato. Mas o crescimento geralmente exige desconforto temporário. Disciplina é escolher o benefício de longo prazo em vez da facilidade de agora.\n\nCada vez que você resiste à opção mais fácil, fortalece sua resiliência mental. O conforto pode parecer seguro enquanto, silenciosamente, te mantém parado.',

  'mindset.card.disc5.title':  'Disciplina cria liberdade.',
  'mindset.card.disc5.content':
    'Muita gente acredita que disciplina restringe a liberdade, mas o oposto costuma ser verdade. A falta de disciplina cria caos, estresse, procrastinação e arrependimento. A disciplina cria estrutura, estabilidade e controle sobre a própria vida.\n\nQuanto mais você domina seus hábitos, menos seus impulsos te controlam. A verdadeira liberdade nasce do autodomínio.',

  'mindset.card.disc6.title':  'A ação cria impulso.',
  'mindset.card.disc6.content':
    'Esperar estar pronto muitas vezes cria um atraso sem fim. A disciplina começa quando você age antes que suas emoções cooperem completamente. Uma vez que o movimento começa, a resistência costuma enfraquecer.\n\nA parte mais difícil é sempre o começo. A ação cria impulso muito mais rápido do que qualquer excesso de pensamento.',

  'mindset.card.disc7.title':  'A disciplina se forja nos dias difíceis.',
  'mindset.card.disc7.content':
    'Qualquer pessoa consegue manter a consistência quando a vida está fácil. A disciplina real aparece nos momentos de estresse, emoção ou inconveniência. Os dias difíceis são onde a força mental se desenvolve.\n\nCada vez que você continua apesar do desconforto, sua resiliência cresce. A consistência nos momentos duros muda a identidade.',

  'mindset.card.disc8.title':  'Seu futuro está observando seus hábitos de hoje.',
  'mindset.card.disc8.content':
    'A versão futura da sua vida está sendo moldada pelas suas rotinas de agora. Disciplina não é sobre transformação dramática da noite para o dia — é sobre comportamentos repetidos por tempo suficiente para criar mudança. Suas rotinas estão constantemente votando pela pessoa que você está se tornando.\n\nAs pequenas ações importam mais do que a maioria das pessoas percebe.',

  'mindset.card.disc9.title':  'Disciplina elimina a negociação interna.',
  'mindset.card.disc9.content':
    'Mentes indisciplinadas estão sempre negociando consigo mesmas. Talvez depois. Só dessa vez. Amanhã vai ser melhor. A disciplina reduz o debate interno criando padrões e rotinas claras. Quanto menos decisões você negocia emocionalmente, mais energia você preserva.\n\nEstrutura protege a consistência.',

  'mindset.card.disc10.title':  'Autocontrole é um superpoder.',
  'mindset.card.disc10.content':
    'Em um mundo cheio de distrações e gratificação instantânea, o autocontrole se tornou algo extremamente valioso. A disciplina permite resistir a impulsos que enfraquecem seus objetivos de longo prazo. Cada momento de contenção fortalece sua autoridade mental sobre si mesmo.\n\nA capacidade de controlar suas próprias ações cria estabilidade e confiança.',

  'mindset.card.disc11.title':  'Disciplina é repetição, não intensidade.',
  'mindset.card.disc11.content':
    'Esforço extremo por alguns dias raramente muda uma vida. A disciplina sustentável vem da repetição consistente ao longo de longos períodos. Pequenas ações repetidas diariamente criam resultados mais sólidos do que explosões ocasionais de motivação.\n\nO sucesso de longo prazo geralmente é construído de forma lenta e silenciosa. A consistência se acumula com um poder impressionante ao longo do tempo.',

  'mindset.card.disc12.title':  'Disciplina protege seus objetivos.',
  'mindset.card.disc12.content':
    'Sem disciplina, os objetivos permanecem como ideias em vez de realidade. O entusiasmo desaparece rápido, mas a ação disciplinada mantém o progresso vivo. Esforço focado protege seus sonhos da distração e da procrastinação.\n\nA disciplina é a ponte entre a intenção e a conquista. Objetivos precisam de estrutura para sobreviver.',

  'mindset.card.disc13.title':  'Sacrifício temporário cria recompensas duradouras.',
  'mindset.card.disc13.content':
    'A disciplina frequentemente exige abrir mão do prazer imediato em favor de um benefício futuro. Esse sacrifício pode parecer desconfortável no momento, mas as recompensas a longo prazo costumam ser muito maiores.\n\nCada decisão disciplinada é um investimento no seu eu futuro. O desconforto de curto prazo pode criar melhorias que duram uma vida inteira.',

  'mindset.card.disc14.title':  'Disciplina fortalece a identidade.',
  'mindset.card.disc14.content':
    'Cada ação repetida reforça a forma como você se vê. Quando você cumpre o que planeja de forma consistente, começa a se identificar como disciplinado, capaz e confiável. A identidade cresce a partir do comportamento, não apenas da intenção.\n\nSuas ações ensinam ao seu cérebro quem você é. A consistência reconstrói a autoimagem.',

  'mindset.card.disc15.title':  'Desculpas drenam seu poder pessoal.',
  'mindset.card.disc15.content':
    'Desculpas protegem o conforto temporariamente, mas enfraquecem o autorrespeito ao longo do tempo. A disciplina cresce quando você para de dar às circunstâncias controle total sobre suas ações. O progresso raramente exige perfeição — exige responsabilidade.\n\nA responsabilidade cria poder pessoal. As desculpas criam estagnação.',

  'mindset.card.disc16.title':  'Disciplina é regulação emocional.',
  'mindset.card.disc16.content':
    'Muitas pessoas falham em manter a consistência porque as emoções dirigem constantemente suas decisões. Disciplina é aprender a agir de acordo com os próprios valores em vez de sentimentos passageiros. Desconforto emocional nem sempre significa que você deve parar.\n\nAutocontrole calmo protege o progresso de longo prazo. Estabilidade melhora o desempenho.',

  'mindset.card.disc17.title':  'Disciplina constrói confiança silenciosamente.',
  'mindset.card.disc17.content':
    'A confiança não se constrói apenas através do sucesso. Ela também se constrói pela consistência. Cada vez que você cumpre um compromisso consigo mesmo, sua autoconfiança se aprofunda.\n\nA disciplina cria evidências de que você é capaz de seguir em frente. Pequenas vitórias vão gradualmente construindo uma confiança interna sólida.',

  'mindset.card.disc18.title':  'Estrutura reduz o estresse.',
  'mindset.card.disc18.content':
    'A desorganização cria sobrecarga mental. A disciplina introduz ordem, clareza e previsibilidade na vida cotidiana. Rotinas estruturadas reduzem o cansaço de tomar decisões e o caos mental.\n\nQuando seus hábitos se tornam automáticos, seu cérebro desperdiça menos energia resistindo à ação. Simplicidade sustenta a consistência.',

  'mindset.card.disc19.title':  'Disciplina é escolher o que importa mais.',
  'mindset.card.disc19.content':
    'Cada ação disciplinada é, em última análise, uma decisão sobre prioridades. Você está escolhendo um propósito de longo prazo em vez de uma distração temporária. A disciplina fica mais fácil quando seus valores estão claros.\n\nPrioridades fortes reduzem o conflito interno. Clareza fortalece o compromisso.',

  'mindset.card.disc20.title':  'Gratificação adiada muda vidas.',
  'mindset.card.disc20.content':
    'A capacidade de adiar o prazer em troca de uma recompensa futura é um dos preditores mais fortes de sucesso a longo prazo. A disciplina fortalece essa habilidade com o tempo. A gratificação imediata muitas vezes parece satisfatória, mas cria resultados fracos no longo prazo.\n\nPaciência e contenção criam futuros mais sólidos. Pensar no longo prazo muda as decisões.',

  'mindset.card.disc21.title':  'Disciplina exige limites.',
  'mindset.card.disc21.content':
    'A consistência se torna difícil quando tudo tem acesso ilimitado à sua atenção. Disciplina frequentemente significa estabelecer limites com distrações, tecnologia, pessoas e hábitos que te enfraquecem. Proteger suas prioridades é proteger seu futuro.\n\nLimites criam clareza mental e controle.',

  'mindset.card.disc22.title':  'A escolha difícil constrói a melhor versão de você.',
  'mindset.card.disc22.content':
    'Escolhas fáceis raramente desenvolvem resiliência. Escolhas difíceis constroem resistência, sabedoria e caráter. A disciplina te ensina a tolerar o desconforto sem fugir imediatamente.\n\nA força mental cresce através do desafio. O crescimento costuma se esconder dentro da inconveniência.',

  'mindset.card.disc23.title':  'Disciplina cria estabilidade no caos.',
  'mindset.card.disc23.content':
    'A vida sempre vai conter incerteza, estresse e oscilações emocionais. A disciplina cria estabilidade interna quando as situações externas parecem imprevisíveis. Rotinas sólidas oferecem ancoragem nos períodos difíceis.\n\nHábitos consistentes criam estrutura emocional. A estabilidade protege o impulso.',

  'mindset.card.disc24.title':  'Seus hábitos estão te construindo ou te enfraquecendo.',
  'mindset.card.disc24.content':
    'Nenhum comportamento repetido é neutro. Cada hábito ou fortalece seu futuro ou o enfraquece lentamente. A disciplina é se tornar mais intencional sobre o que você permite repetidamente na sua vida.\n\nA repetição molda os resultados. Seus padrões diários importam profundamente.',

  'mindset.card.disc25.title':  'Disciplina é terminar o que você começa.',
  'mindset.card.disc25.content':
    'Muitas pessoas adoram começos porque eles parecem empolgantes. A disciplina é o que permite continuar depois que o entusiasmo desaparece. Terminar desenvolve confiabilidade, paciência e resiliência.\n\nA conclusão constrói um caráter mais forte do que recomeços infinitos. A consistência cria resultados.',

  'mindset.card.disc26.title':  'Disciplina também se constrói na recuperação.',
  'mindset.card.disc26.content':
    'Descanso não é inimigo da disciplina. O esgotamento enfraquece a consistência e a clareza mental. Pessoas disciplinadas entendem a importância da recuperação, do sono e do equilíbrio. Desempenho sustentável exige restauração adequada.\n\nA consistência de longo prazo depende de como você gerencia sua energia.',

  'mindset.card.disc27.title':  'Disciplina reduz o arrependimento.',
  'mindset.card.disc27.content':
    'A maior parte do arrependimento vem de evitar ações difíceis mas necessárias. A disciplina te ajuda a tomar decisões que seu eu futuro vai agradecer. O desconforto temporário frequentemente previne frustrações de longo prazo.\n\nEsforço consistente protege a paz de espírito. A ação reduz o arrependimento.',

  'mindset.card.disc28.title':  'Você se torna o que pratica repetidamente.',
  'mindset.card.disc28.content':
    'Seu cérebro se adapta ao comportamento repetido. Se você pratica repetidamente distração, evitação e inconsistência, esses padrões se fortalecem. Mas se você pratica repetidamente disciplina, foco e comprometimento, esses padrões também se tornam mais fortes.\n\nA repetição constrói a identidade. A prática molda o caráter.',

  'mindset.card.disc29.title':  'Disciplina é honrar as promessas que você faz a si mesmo.',
  'mindset.card.disc29.content':
    'Promessas quebradas a si mesmo enfraquecem lentamente a confiança interna. A disciplina reconstrói essa relação consigo mesmo. Cada compromisso que você honra fortalece o autorrespeito.\n\nSer confiável para você mesmo importa profundamente. A confiança interna muda a forma como você vive.',

  'mindset.card.disc30.title':  'Disciplina cria um futuro diferente.',
  'mindset.card.disc30.content':
    'A maioria das pessoas subestima o quanto sua disciplina diária influencia o futuro. As pequenas escolhas que você repete hoje determinam silenciosamente as oportunidades, a confiança, a saúde e a estabilidade que você vai experimentar mais tarde.\n\nDisciplina não é controlar cada momento com perfeição. É se mover consistentemente na direção certa.',

  'mindset.card.disc31.title':  'Disciplina é fazer mesmo assim.',
  'mindset.card.disc31.content':
    'Haverá dias em que você se sentirá cansado, sem inspiração, distraído ou emocionalmente esgotado. Disciplina é a capacidade de continuar apesar desses sentimentos, em vez de esperar por condições perfeitas. O progresso frequentemente é construído nos momentos em que a motivação está ausente.\n\nAs pessoas que mudam suas vidas geralmente são as que continuam se movendo quando seria mais fácil parar.',

  'mindset.card.disc32.title':  'Seus padrões moldam seus resultados.',
  'mindset.card.disc32.content':
    'A disciplina começa com padrões pessoais. O que você tolera repetidamente se torna seu normal. Quando seus padrões sobem, suas ações naturalmente começam a mudar.\n\nPessoas disciplinadas decidem com antecedência como querem viver em vez de reagir emocionalmente no momento. Padrões elevados criam vidas mais sólidas.',

  'mindset.card.disc33.title':  'Disciplina é lembrar o que você realmente quer.',
  'mindset.card.disc33.content':
    'Impulsos são temporários, mas as consequências frequentemente duram muito mais. A disciplina te ajuda a reconectar com suas prioridades mais profundas antes de tomar decisões. Nos momentos difíceis, lembrar dos seus objetivos maiores cria clareza.\n\nEmoções temporárias não deveriam ter mais autoridade do que sua visão de longo prazo. A disciplina protege o que importa mais.',

  'mindset.card.disc34.title':  'Repetição cria força mental.',
  'mindset.card.disc34.content':
    'A força mental não se constrói através de esforço ocasional. Ela se constrói através de momentos repetidos de consistência ao longo do tempo. Cada ação difícil que você conclui fortalece um pouco mais sua resiliência.\n\nA disciplina fica mais fácil quanto mais você a pratica. A repetição treina a mente para tolerar o desconforto com calma.',

  'mindset.card.disc35.title':  'Disciplina reduz o caos.',
  'mindset.card.disc35.content':
    'A falta de estrutura frequentemente cria estresse e confusão desnecessários. A disciplina traz ordem para suas rotinas, prioridades e responsabilidades. Hábitos organizados reduzem a sobrecarga mental e o esgotamento emocional.\n\nQuando sua vida tem estrutura, seu cérebro gasta menos energia se recuperando da desordem. Simplicidade cria estabilidade.',

  'mindset.card.disc36.title':  'Disciplina é escolher o progresso em vez das desculpas.',
  'mindset.card.disc36.content':
    'Desculpas frequentemente parecem reconfortantes no curto prazo, mas se tornam destrutivas ao longo do tempo. A disciplina exige assumir a responsabilidade mesmo quando as circunstâncias são imperfeitas. O progresso não exige condições ideais — exige esforço consistente.\n\nA responsabilidade cria impulso. Assumir o controle fortalece o poder pessoal.',

  'mindset.card.disc37.title':  'Disciplina se constrói uma decisão de cada vez.',
  'mindset.card.disc37.content':
    'Grandes transformações são geralmente o resultado de milhares de pequenas decisões disciplinadas. Cada escolha saudável reforça hábitos e identidade mais fortes. A disciplina raramente é dramática. Ela costuma ser silenciosa, repetitiva e invisível no momento.\n\nPequenas ações eventualmente criam diferenças enormes.',

  'mindset.card.disc38.title':  'Consistência supera a perfeição.',
  'mindset.card.disc38.content':
    'Muitas pessoas desistem porque esperam desempenho impecável de si mesmas. Disciplina não é ser perfeito todos os dias. É voltar rapidamente após erros ou contratempos.\n\nA consistência de longo prazo importa muito mais do que a perfeição temporária. Esforço sustentável cria mudança duradoura.',

  'mindset.card.disc39.title':  'Disciplina exige paciência.',
  'mindset.card.disc39.content':
    'O crescimento real geralmente acontece mais devagar do que as pessoas esperam. Disciplina significa continuar trabalhando mesmo antes que os resultados visíveis apareçam. A impaciência leva muitas pessoas a abandonar hábitos valiosos cedo demais.\n\nO sucesso duradouro frequentemente exige longos períodos de progresso invisível. A paciência fortalece a consistência.',

  'mindset.card.disc40.title':  'Disciplina protege sua energia.',
  'mindset.card.disc40.content':
    'Hábitos indisciplinados frequentemente drenam energia mental, emocional e física. Noites tardias, distrações constantes, procrastinação e impulsividade emocional enfraquecem o desempenho ao longo do tempo. A disciplina protege sua energia criando padrões mais saudáveis.\n\nMelhores hábitos criam foco mais forte e resiliência.',

  'mindset.card.disc41.title':  'Disciplina torna as coisas difíceis mais fáceis.',
  'mindset.card.disc41.content':
    'Quanto mais você pratica comportamentos difíceis, menos resistência eles criam. A repetição reduz o atrito emocional. O que antes parecia impossível gradualmente se torna normal através da disciplina.\n\nO crescimento acontece quando ações difíceis se tornam hábitos regulares. A consistência muda a percepção.',

  'mindset.card.disc42.title':  'Disciplina é se liderar.',
  'mindset.card.disc42.content':
    'Autoliderança é a capacidade de guiar suas ações com intenção em vez de ser controlado por impulso ou circunstância. A disciplina fortalece sua capacidade de dirigir seu próprio comportamento.\n\nAutoliderança forte cria confiança e estabilidade emocional. Com o tempo, você se torna mais confiável para si mesmo.',

  'mindset.card.disc43.title':  'Disciplina se constrói nos momentos privados.',
  'mindset.card.disc43.content':
    'O caráter é moldado pelo que você faz repetidamente quando ninguém está assistindo. A disciplina cresce através de escolhas silenciosas feitas consistentemente nos bastidores. Pequenas ações privadas frequentemente determinam resultados visíveis mais tarde.\n\nIntegridade fortalece a identidade. Seus hábitos invisíveis moldam seu futuro visível.',

  'mindset.card.disc44.title':  'Prazer imediato pode criar dor duradoura.',
  'mindset.card.disc44.content':
    'Muitas decisões impulsivas parecem boas temporariamente, mas criam estresse, arrependimento ou fraqueza depois. A disciplina te ensina a avaliar as consequências de longo prazo antes de reagir emocionalmente.\n\nO conforto de curto prazo pode silenciosamente sabotar objetivos de longo prazo. Contenção sábia protege a paz futura.',

  'mindset.card.disc45.title':  'Disciplina cria estabilidade emocional.',
  'mindset.card.disc45.content':
    'Quando suas ações dependem constantemente do humor, a vida se torna emocionalmente imprevisível. A disciplina cria constância mesmo durante períodos estressantes. Hábitos estruturados reduzem o caos emocional ao criar consistência.\n\nEstabilidade melhora a tomada de decisões. Rotinas calmas fortalecem a resiliência.',

  'mindset.card.disc46.title':  'Autodisciplina constrói independência.',
  'mindset.card.disc46.content':
    'Quanto mais disciplinado você se torna, menos você depende de pressão externa, lembretes ou validação para agir. A autodisciplina cria independência pessoal. Você para de esperar que outros te motivem ou te resgatem.\n\nResponsabilidade interna cria liberdade e maturidade.',

  'mindset.card.disc47.title':  'Disciplina é manter o impulso vivo.',
  'mindset.card.disc47.content':
    'O impulso é frágil. Pequenos períodos de inconsistência podem rapidamente enfraquecer o progresso e a motivação. A disciplina protege o impulso através de ação constante, especialmente nos dias de baixa energia.\n\nAté os pequenos esforços ajudam a manter o movimento para frente. A consistência mantém o crescimento vivo.',

  'mindset.card.disc48.title':  'Disciplina te ensina a lidar com o desconforto.',
  'mindset.card.disc48.content':
    'A maioria das pessoas instintivamente evita o desconforto, mas a disciplina te ensina a permanecer calmo dentro dos momentos difíceis. O crescimento frequentemente exige tédio, repetição, incerteza ou esforço. Evitar todo o desconforto enfraquece a resiliência.\n\nAprender a tolerar o desconforto temporário fortalece o controle emocional.',

  'mindset.card.disc49.title':  'Seu ambiente influencia sua disciplina.',
  'mindset.card.disc49.content':
    'A força de vontade sozinha frequentemente não é suficiente. Seu entorno influencia fortemente seus hábitos e comportamentos. A disciplina fica mais fácil quando seu ambiente apoia seus objetivos em vez de oferecer distrações constantemente.\n\nEstrutura reduz a resistência desnecessária. Ambientes inteligentes apoiam melhores decisões.',

  'mindset.card.disc50.title':  'Disciplina cria confiabilidade.',
  'mindset.card.disc50.content':
    'As pessoas confiam naquelas que consistentemente cumprem o que prometem. A confiabilidade é construída através de ações disciplinadas repetidas ao longo do tempo. Quando você se torna confiável para si mesmo e para os outros, a confiança naturalmente aumenta.\n\nA consistência fortalece tanto os relacionamentos quanto a identidade. Confiabilidade cria respeito.',

  'mindset.card.disc51.title':  'Disciplina é terminar também a parte difícil.',
  'mindset.card.disc51.content':
    'Começar é importante, mas disciplina também significa continuar quando as coisas se tornam repetitivas ou difíceis. Muitas pessoas perdem o impulso depois que o entusiasmo inicial desaparece. O crescimento real frequentemente acontece durante a fase intermediária menos empolgante.\n\nA persistência cria conclusão. A conclusão cria transformação.',

  'mindset.card.disc52.title':  'Disciplina é proteger seu eu futuro.',
  'mindset.card.disc52.content':
    'Cada ação disciplinada é um presente para a sua versão futura. Hábitos saudáveis, responsabilidade financeira, aprendizado e consistência criam benefícios de longo prazo que podem não aparecer imediatamente. Disciplina é autocuidado de longo prazo.\n\nA estabilidade futura é construída através da responsabilidade presente.',

  'mindset.card.disc53.title':  'Disciplina fortalece a clareza mental.',
  'mindset.card.disc53.content':
    'Procrastinação e inconsistência criam ruído mental e culpa. A disciplina reduz a tensão interna criando ação e conclusão. Quanto mais responsabilidades você lida intencionalmente, mais calma sua mente costuma ficar.\n\nOrdem melhora a clareza. Clareza melhora o desempenho.',

  'mindset.card.disc54.title':  'Disciplina acelera a recuperação.',
  'mindset.card.disc54.content':
    'Pessoas disciplinadas não são imunes a contratempos ou dias ruins. A diferença é que elas se recuperam mais rapidamente em vez de abandonar completamente seus objetivos. Resiliência significa retornar em vez de desistir.\n\nA disciplina encurta a distância entre o fracasso e a recuperação. A consistência sobrevive aos contratempos.',

  'mindset.card.disc55.title':  'Disciplina é escolher uma identidade de longo prazo.',
  'mindset.card.disc55.content':
    'Cada ação reforça uma certa versão de você mesmo. A disciplina te ajuda a escolher repetidamente comportamentos que se alinham com a pessoa que você quer se tornar. A identidade é moldada através da repetição.\n\nSeu caráter futuro está sendo construído diariamente através de pequenas decisões.',

  'mindset.card.disc56.title':  'Hábitos fortes reduzem o esforço mental.',
  'mindset.card.disc56.content':
    'Quando comportamentos positivos se tornam automáticos, a disciplina exige menos energia emocional. Hábitos reduzem a necessidade de tomada de decisão constante e força de vontade. O objetivo não é lutar para sempre — é construir sistemas que apoiam a consistência naturalmente.\n\nAutomatização fortalece a estabilidade.',

  'mindset.card.disc57.title':  'Disciplina se acumula silenciosamente com o tempo.',
  'mindset.card.disc57.content':
    'A maioria das ações disciplinadas parece pequena no momento. Um treino, uma hora de foco, uma escolha saudável, uma conversa difícil. Mas ao longo de meses e anos, essas ações se acumulam em transformação significativa.\n\nA disciplina raramente cria resultados instantâneos. Seu verdadeiro poder aparece através da acumulação.',

  // ── Mindset ───────────────────────────────────────────────────────────────────
  'mindset.eyebrow':    'REFLEXÕES',
  'mindset.title':      'Reflexões',
  'mindset.all':        'Tudo',
  'mindset.today':      'HOJE',
  'mindset.filter.today': 'Hoje',
  'mindset.locked':     'Desbloquear com Premium',
  'mindset.min':        '{{n}} min',
  'mindset.minread':    '{{n}} min de leitura',
  'mindset.pro':        'PRO',
  'mindset.empty.today.title':  'Sua reflexão de hoje está esperando.',
  'mindset.empty.lib.title':    'Sua biblioteca está crescendo.',
  'mindset.empty.today.sub':    'Conclua seu primeiro reset diário para desbloquear a reflexão de hoje.',
  'mindset.empty.lib.sub':      'As reflexões são liberadas conforme sua jornada avança.',

  // Mindset UI labels
  'mindset.subtitle.free':           'Uma reflexão importante por dia.',
  'mindset.subtitle.premium':        'Reflexões para o seu ritmo.',
  'mindset.subtitle.locked':         'Desbloqueado com Premium.',
  'mindset.subtitle.count.one':      '{{n}} reflexão desbloqueada.',
  'mindset.subtitle.count.other':    '{{n}} reflexões desbloqueadas.',
  'mindset.badge.today':             'HOJE',
  'mindset.dayLabel':                'DIA {{day}}',
  'mindset.insightLabel':            'REFLEXÃO',
  'mindset.locked.journey':          'Chega no momento certo.',
  'mindset.locked.return':           'Chega com o tempo.',
  'mindset.modal.day':               'Dia {{day}}',
  'mindset.modal.insight':           'Reflexão',
  'mindset.modal.minread':           '{{n}} min de leitura',
  // Para você hoje
  'mindset.foryou.title':            'PARA VOCÊ HOJE',
  'mindset.foryou.question':         'Como você está chegando agora?',
  'mindset.foryou.recommended':      'RECOMENDADO PARA VOCÊ',
  'mindset.foryou.curated':          'Selecionado para sua jornada',
  // Emoções
  'mindset.emotion.overwhelmed':     'Pressão',
  'mindset.emotion.numb':            'Nublado',
  'mindset.emotion.frustrated':      'Esgotamento',
  'mindset.emotion.low_energy':      'Baixa energia',
  'mindset.emotion.anxious':         'Ruído interno',
  'mindset.emotion.balanced':        'Em equilíbrio',
  'mindset.emotion.overwhelmed.sub': 'Para quando tudo pesa demais.',
  'mindset.emotion.numb.sub':        'Para quando a mente silencia.',
  'mindset.emotion.frustrated.sub':  'Para quando o peso é difícil de carregar.',
  'mindset.emotion.low_energy.sub':  'Para quando o ritmo desacelerou.',
  'mindset.emotion.anxious.sub':     'Para quando o ruído não para.',
  'mindset.emotion.balanced.sub':    'Para quando as coisas estão fluindo.',
  // A seguir / Acesso completo (usuários gratuitos)
  'mindset.coming.eyebrow':          'CHEGANDO NA SUA JORNADA',
  'mindset.unlock.title':            'SEU ESPAÇO CONTINUA AQUI',
  'mindset.unlock.cta':              'Continuar sua jornada →',
  // Biblioteca (premium)
  'mindset.library.title':           'CAMINHOS PARA VOLTAR',
  'mindset.library.insights':        'Novos momentos chegam com o tempo',
  'mindset.lib.burnout':             'Recuperação do Burnout',
  'mindset.lib.emotional':           'Reset Emocional',
  'mindset.lib.discipline':          'Disciplina Leve',
  'mindset.lib.detox':               'Detox Digital',
  'mindset.lib.focus':               'Recuperando o Foco',
  'mindset.lib.burnout.count':       'Recuperação do Burnout — 12 reflexões',
  'mindset.lib.emotional.count':     'Reset Emocional — 10 reflexões',
  'mindset.lib.discipline.count':    'Disciplina Leve — 8 reflexões',
  'mindset.lib.detox.count':         'Detox Digital — 8 reflexões',
  'mindset.lib.focus.count':         'Recuperando o Foco — 10 reflexões',
  // Legendas emocionais por categoria (Problema 1)
  'mindset.lib.burnout.sub':         'Seu corpo não foi feito para viver em alerta o tempo inteiro.',
  'mindset.lib.emotional.sub':       'Você não precisa resolver tudo agora.',
  'mindset.lib.discipline.sub':      'Constância cresce melhor sem violência.',
  'mindset.lib.detox.sub':           'Silêncio também é produtividade.',
  'mindset.lib.focus.sub':           'Nem toda distração é preguiça.',

  // ── Notification settings screen ────────────────────────────────────────────
  'notif.settings.eyebrow':       'AJUSTES',
  'notif.settings.title':         'Lembrete diário',
  'notif.settings.sub':           'Escolha o melhor momento para o seu reset.',
  'notif.period.label':           'PERÍODO',
  'notif.period.morning.label':   'Manhã',
  'notif.period.morning.sub':     'Comece o dia com intenção.',
  'notif.period.afternoon.label': 'Tarde',
  'notif.period.afternoon.sub':   'Uma pausa no meio do dia.',
  'notif.period.evening.label':   'Noite',
  'notif.period.evening.sub':     'Feche o dia com presença.',
  'notif.hour.label':             'HORÁRIO DO LEMBRETE',
  'notif.preview.text':           'Lembrete todos os dias às',
  'notif.saved':                  'Lembrete salvo com sucesso.',
  'notif.saving':                 'Salvando...',
  'notif.save':                   'Salvar lembrete',
  'notif.evening.sectionLabel':   'CHECK-IN DA NOITE',
  'notif.evening.toggleLabel':    'Check-in da noite',
  'notif.evening.toggleSub':      'Um momento tranquilo no fim do dia.',
  'notif.word.sectionLabel':      'PALAVRA DO DIA',
  'notif.word.toggleLabel':       'Palavra do dia',
  'notif.word.toggleSub':         'Enviada 30 min antes do lembrete.',
  'notif.milestone.sectionLabel': 'MOMENTOS DE MARCO',
  'notif.milestone.toggleLabel':  'Momentos de marco',
  'notif.milestone.toggleSub':    'Quando algo importante acontecer.',
  'notif.quiet.sectionLabel':     'DIAS SILENCIOSOS',
  'notif.quiet.sub':              'Sem lembretes nesses dias.',
  'notif.promise.text':           'Enviamos no máximo uma notificação por dia. Nunca mais que isso.',
  'notif.web.unavailable':        'Os lembretes funcionam melhor no aplicativo instalado pela loja.\nPor enquanto, você ainda pode usar seus resets normalmente.',
  'notif.day.0': 'Dom', 'notif.day.1': 'Seg', 'notif.day.2': 'Ter', 'notif.day.3': 'Qua',
  'notif.day.4': 'Qui', 'notif.day.5': 'Sex', 'notif.day.6': 'Sáb',
  'lang.chooseLang':      'IDIOMA',
  'lang.chooseLangTitle': 'Escolha seu idioma',
  'lang.pt':              'Português',
  'lang.eyebrow':         'ESCOLHA SEU ESPAÇO',
  'lang.sub':             'Esta experiência se adapta ao seu idioma e ao seu ritmo emocional.',

  // ── Profile / You tab ───────────────────────────────────────────────────────
  'profile.goals.title':       'SUAS METAS',
  'profile.settings.title':    'AJUSTES',
  'profile.name.placeholder':  'Toque para adicionar seu nome',
  'profile.premium':           'PREMIUM',
  'profile.upgrade':           'Desbloquear experiência completa',
  'profile.version':           'Daily Reset v1.0.0',
  'profile.row.notification':  'Horário do lembrete',
  'profile.row.language':      'Idioma',
  'profile.row.restore':       'Restaurar compra',
  'profile.row.privacy':       'Política de privacidade',
  'profile.row.terms':         'Termos de uso',
  'profile.row.reset':         'Apagar meus dados',
  'profile.restore.title':     'Restaurar compra',
  'profile.restore.msg':       'Nenhuma compra anterior encontrada.',
  'profile.reset.title':       'Apagar meus dados',
  'profile.reset.msg':         'Seu progresso local será apagado. Essa ação não pode ser desfeita.',
  'profile.reset.cancel':      'Cancelar',
  'profile.reset.confirm':     'Apagar',
  'profile.modal.privacy':     'Política de privacidade',
  'profile.modal.terms':       'Termos de uso',
  'profile.modal.journey.title': 'Seu caminho de recuperação',
  'profile.modal.journey.sub':   'O app se adapta para apoiar a sua recuperação.',
  'profile.modal.eyebrow':     'DAILY RESET APP',
  'profile.modal.date':        'Atualizado em maio de 2026',
  'profile.modal.privacy.footer': 'Ao usar o Daily Reset, você concorda com esta Política de privacidade.',
  'profile.modal.terms.footer':   'Ao usar o Daily Reset, você concorda com estes Termos de uso.',
  'profile.journey.eyebrow':       'SEU CAMINHO DE RECUPERAÇÃO',
  'profile.journey.change':        'Alterar',
  'profile.journey.choose':        'Escolher',
  'profile.journey.fallback':      'Sua jornada',
  'profile.section.transformation': 'MINHA TRANSFORMAÇÃO',
  'profile.section.journey':        'SUA JORNADA',
  'profile.section.intentions':     'MINHAS INTENÇÕES',
  'profile.streak.daysInRow':       'retornos tranquilos',
  'profile.streak.personalBest':    'Melhor sequência',
  'profile.stat.resetsDone':        'resets feitos',
  'profile.stat.bestStreak':        'melhor sequência',
  'profile.stat.firstReturn':       'primeiro retorno',
  'profile.stat.thisWeek':          'esta semana',
  'profile.milestone.dayReached':   'Dia {{n}} alcançado',
  'profile.milestone.unlocked':     'Marco desbloqueado',
  'profile.milestone.firstReset':   'Dia 1 — Primeiro reset',
  'profile.milestone.beginToday':   'Um pequeno começo já muda algo.',
  'profile.milestone.dayAhead':     'Dia {{n}} chegando',
  'profile.milestone.youReThere':   'Você chegou. Complete o reset de hoje.',
  'profile.milestone.oneDayAway':   'Falta um dia. Continue.',
  'profile.milestone.daysAway':     'Faltam {{n}} dias.',
  'month.jan': 'Janeiro', 'month.feb': 'Fevereiro', 'month.mar': 'Março',   'month.apr': 'Abril',
  'month.may': 'Maio',   'month.jun': 'Junho',     'month.jul': 'Julho',   'month.aug': 'Agosto',
  'month.sep': 'Setembro', 'month.oct': 'Outubro', 'month.nov': 'Novembro', 'month.dec': 'Dezembro',

  'profile.transform.zero.title':   'Comece seu reset',
  'profile.transform.zero.sub':     'Sua jornada começa com um único reset.',
  'profile.greet.hi':               'Olá, {{name}}.',
  'profile.greet.becoming':         'Seu momento.',
  'profile.greet.memberSince':      'Aqui desde {{month}} de {{year}}',
  'profile.greet.dayOne':           'Dia 1 da sua jornada.',
  'profile.greet.namePlaceholder':  'Seu nome',
  'profile.footer.p1': 'Cada reset muda o caminho.',
  'profile.footer.p2': 'Pequenos retornos criam transformação.',
  'profile.footer.p3': 'O ritmo começa em silêncio.',
  'profile.footer.p4': 'O crescimento acontece devagar.',
  'profile.footer.p5': 'Progresso silencioso também conta.',

  // ── Return experience ────────────────────────────────────────────────────────
  'return.heading':       'Você voltou.',
  'return.30plus.body':   "Faz um tempo.\n\nNada aqui guardou rancor.\nNada aqui precisa de explicação.\n\nVocê apareceu.\nÉ o suficiente.",
  'return.30plus.extra':  'Pausas longas não são fracasso.\nFazem parte do caminho.',
  'return.7plus.body':    "Você ficou um tempo fora.\n\nNada aqui guardou rancor.\nVocê não deve explicações.\n\nVocê apareceu.\nÉ o suficiente.",
  'return.3plus.body':    'Sem recuperar o tempo perdido.\nSó hoje.',
  'return.cta':           'Começar hoje',

  // ── Welcome back experience ───────────────────────────────────────────────────
  'wb.normal.0':      'Que bom te ver de novo.',
  'wb.normal.1':      'Vamos começar com calma.',
  'wb.normal.2':      'Uma pequena pausa só sua.',
  'wb.normal.3':      'Um momento em silêncio.',
  'wb.normal.4':      'Você voltou.',
  'wb.returning.0':   'Você sempre pode recomeçar.',
  'wb.returning.1':   'Sem pressão. Só hoje.',
  'wb.returning.2':   'Não há nada para compensar.',
  'wb.returning.3':   'Bem-vinda de volta para si.',
  'wb.returning.4':   'Ainda aqui. Ainda seu.',
  'wb.active.0':      'Progresso silencioso.',
  'wb.active.1':      'Você tem aparecido por você.',
  'wb.active.2':      'Pequenos passos ainda contam.',
  'wb.active.3':      'Constância também pode ser leve.',
  'wb.active.4':      'Um ritmo mais calmo.',
  'wb.late_night.0':  'Um momento tranquilo antes do descanso.',
  'wb.late_night.1':  'Você ainda está aqui.',
  'wb.late_night.2':  'Isso é suficiente.',
  'wb.late_night.3':  'Deixe o dia se assentar.',
  'wb.late_night.4':  'A quietude também é algo.',

  ...psPt,

  // All other keys fall back to English automatically via translate()
};

export const translations: Record<Lang, TranslationMap> = { en, pt, es, fr, de };

export function t(lang: Lang, key: string, vars?: Record<string, string | number>): string {
  const dict = translations[lang];
  let str = dict[key] ?? translations['en'][key] ?? key;
  if (vars) {
    Object.entries(vars).forEach(([k, v]) => {
      str = str.replace(new RegExp(`\\{\\{${k}\\}\\}`, 'g'), String(v));
    });
  }
  return str;
}
