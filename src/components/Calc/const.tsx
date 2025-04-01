export type Column = {
    title: string,
    
    setVal?: (s: string) => ({} | undefined |  null)
};

export type Config = { columns: Column[] };

export const config: Config = {
    columns: [
        { title: 'Ваш возраст', setVal: Age => ({ Age }) },
        { title: 'Ваш рост, в см', setVal: Height => ({ Height }) },
        { title: 'Ваш вес, в кг:', setVal: Weight => ({ Weight }), }
    ]
};

