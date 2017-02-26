export interface IStoryblokTokens {
    public?: string,
    private?: string
}

export interface IStorySingle {
    story: IStory;
}

export interface IStoryArray {
    stories: IStory[];
}

export interface IStory {
    name: string;
    created_at: Date;
    published_at: Date;
    alternates: IAlternateStory[];
    id: number;
    uuid: string;
    content: IBlok;
    slug: string;
    full_slug: string;
    sort_by_date?: any;
    tag_list: string[];
    is_startpage?: any;
}

export interface IBlok {
    _uid: string,
    component: string,
    body?: IBlok[]
}

export interface IAlternateStory {
    id: number,
    name: string,
    slug: string,
    full_slug: string
}
