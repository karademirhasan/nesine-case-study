export interface IBetsTableColumns {
    field: string
    title: string
}

export const BETS_TABLE_COLuMNS: IBetsTableColumns[] = [
    {
        field: 'name',
        title: 'Event Count',
    },
    {
        field: 'comments',
        title: 'Yorumlar',
    },
    {
        field: 'mbs',
        title: '',
    },
    {
        field: '',
        title: '1',
    },
    {
        field: '',
        title: 'x',
    },
    {
        field: '',
        title: '2',
    },
    {
        field: '',
        title: 'Alt',
    },
    {
        field: '',
        title: 'Üst',
    },
    {
        field: '',
        title: 'H1',
    },
    {
        field: '',
        title: '1',
    },
    {
        field: '',
        title: 'x',
    },
    {
        field: '',
        title: '2',
    },
    {
        field: '',
        title: 'H2',
    },
    {
        field: '',
        title: '1-X',
    },
    {
        field: '',
        title: '1-2',
    },
    {
        field: '',
        title: 'X-2',
    },
    {
        field: '',
        title: 'Var',
    },
    {
        field: '',
        title: 'Yok',
    },
    {
        field: '',
        title: '+99',
    }
]

export const BETS_ODDS_GROUPS = {
    MATCH_RESULT: 1,
    DOUBLE_CHANCE: 2,
    OVER_UNDER: 5,
} as const;

export const MATCH_RESULT_SELECTIONS = {
    HOME: 0,
    DRAW: 1,
    AWAY: 2,
} as const;

export const DOUBLE_CHANCE_SELECTIONS = {
    HOME_OR_DRAW: 3,
    HOME_OR_AWAY: 4,
    DRAW_OR_AWAY: 5
} as const;

export const OVER_UNDER_SELECTIONS = {
    UNDER: 25,
    OVER: 26,
} as const;