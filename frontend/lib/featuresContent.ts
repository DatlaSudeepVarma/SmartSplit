export type FeatureSlug =
    | 'real-time-settling'
    | 'smart-reminders'
    | 'multi-currency-support'
    | 'activity-timelines'
    | 'group-chats';

export type FeatureIconName =
    | 'hand-coins'
    | 'bell'
    | 'globe'
    | 'clock'
    | 'messages-square';

export type FeatureContent = {
    slug: FeatureSlug;
    title: string;
    tagline: string;
    summary: string;
    whatItMeans: string;
    highlights: string[];
    iconName: FeatureIconName;
    ctaHref: string;
    ctaLabel: string;
};

export const FEATURES: FeatureContent[] = [
    {
        slug: 'real-time-settling',
        title: 'Real-time settling',
        tagline: 'Know who owes whom — instantly.',
        summary:
            'SmartSplit recalculates group balances the moment an expense is added, edited, or removed.',
        whatItMeans:
            'Real-time settling means you never wait until the end of a trip or month to figure out debts. Every time someone logs who paid and how the cost should be split, SmartSplit updates each person’s balance and shows the simplest way to settle up — with the fewest payments possible.',
        highlights: [
            'Balances update automatically when expenses change — no manual spreadsheet formulas.',
            'Settlement suggestions minimize back-and-forth (“you pay Alex $12, then Alex pays Sam $8”).',
            'Works across trips, activities, and shared bills so pending amounts stay visible on your dashboard.',
            'Record settlement payments to keep the ledger accurate after money changes hands.',
        ],
        iconName: 'hand-coins',
        ctaHref: '/trips',
        ctaLabel: 'Open trips',
    },
    {
        slug: 'smart-reminders',
        title: 'Smart reminders',
        tagline: 'Never miss a shared bill again.',
        summary:
            'Set how many days before a due date you want a heads-up on rent, subscriptions, and recurring shared costs.',
        whatItMeans:
            'Smart reminders help roommates and groups stay on top of recurring obligations. When you add a shared bill, you choose a due day and how early SmartSplit should flag it. The bills dashboard surfaces what is coming due and when your reminder window starts — so nobody has to chase each other in chat.',
        highlights: [
            'Configure reminder lead time per bill (for example, 2 days before rent is due).',
            'See upcoming due dates and reminder status in one place on the Bills page.',
            'Track autopay status and monthly totals alongside reminders.',
            'Split recurring costs across roommates so everyone knows their share before the due date.',
        ],
        iconName: 'bell',
        ctaHref: '/bills',
        ctaLabel: 'Manage bills',
    },
    {
        slug: 'multi-currency-support',
        title: 'Multi-currency support',
        tagline: 'Split fairly across borders.',
        summary:
            'Create trips in local currency, keep a default currency on your profile, and convert amounts with live rates.',
        whatItMeans:
            'Multi-currency support means international trips and mixed-currency groups do not break your ledger. Each trip can use its own currency, your profile stores a default for personal views, and the built-in converter helps compare or translate amounts when planning and settling.',
        highlights: [
            'Assign a currency when you create a trip so all expenses stay in context.',
            'Set your profile default currency for dashboard and personal expense views.',
            'Use the navbar currency converter for quick live exchange-rate lookups.',
            'Avoid confusion when travelers pay in different currencies during the same trip.',
        ],
        iconName: 'globe',
        ctaHref: '/register',
        ctaLabel: 'Create an account',
    },
    {
        slug: 'activity-timelines',
        title: 'Activity timelines',
        tagline: 'See what happened, day by day.',
        summary:
            'Expenses are grouped into clear chronological timelines so you can retrace how a trip or event unfolded.',
        whatItMeans:
            'An activity timeline is a running history of your group’s spending, organized by date. Instead of one long list, SmartSplit groups expenses under each day — newest first — so you can answer “what did we spend on Tuesday?” or spot patterns over a trip without digging through messages.',
        highlights: [
            'Trip and event views group expenses by date for easy scanning.',
            'Combine with categories to see how spending evolved over time.',
            'Helpful for reconciling receipts and explaining splits to the group later.',
            'Pairs with analytics charts for both daily trends and category breakdowns.',
        ],
        iconName: 'clock',
        ctaHref: '/activities',
        ctaLabel: 'Browse activities',
    },
    {
        slug: 'group-chats',
        title: 'Group chats',
        tagline: 'Less arguing, more clarity.',
        summary:
            'SmartSplit’s AI assistant and shared ledgers keep everyone aligned — so expense questions get answered with real data.',
        whatItMeans:
            'Group chats in SmartSplit are about coordinated communication around shared money. The AI assistant on your profile understands your trips, balances, and spending context, so you can ask natural questions instead of scrolling old messages. Share links and a single source of truth reduce duplicate spreadsheets and “I thought you paid” moments.',
        highlights: [
            'Ask the SmartSplit AI about settlements, trip totals, and budgeting in plain language.',
            'Answers are grounded in your live account data — not generic tips.',
            'Share trip summaries so others can stay informed without full account access.',
            'Keep discussions focused: the ledger shows who paid, who owes, and what changed.',
        ],
        iconName: 'messages-square',
        ctaHref: '/profile',
        ctaLabel: 'Try the AI assistant',
    },
];

export const FEATURE_BY_SLUG = Object.fromEntries(
    FEATURES.map((f) => [f.slug, f]),
) as Record<FeatureSlug, FeatureContent>;

export function isFeatureSlug(slug: string): slug is FeatureSlug {
    return slug in FEATURE_BY_SLUG;
}
