export type TabParamList = {
    Home: undefined,
    Store: undefined,
    Chart: undefined,
    Input: undefined,
}

export type StackParamList = {
    Tabs: TabParamList,
    Detail: { id: number, reFresh: () => Promise<void> },
    AddProduct: { reFresh: () => Promise<void> },
    ChartDay: undefined,
    PickFile: undefined,
}

