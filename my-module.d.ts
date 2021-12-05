export interface PolygonData{
    ticker: string;
    name: string;
    market: string;
    locale: string;
    active: bool;
    currency_symbol: string;
    currency_name: string;
    base_currency_symbol: string;
    base_currency_name: string;
    last_updated_utc: string;
}

export interface CoinName{
    ticker: string;
    name: string;
    base_currency_symbol: string;
    base_currency_name: string;
}

export interface PolygonCoinData{
    symbol: string,
    isUTC: boolean,
    day: string,
    open: number,
    close: number,
    openTrades: Trades[],
}

export interface Trades{
    x: number,
    p: number,
    s: number,
    c: number[],
    i: string,
    t: number
}

// coin info custom obj 
export interface CoinInfo{
    symbol: string,
    day: string,
    open: number,
    close: number
}

export interface PolygonCoinNews{
    id: string,
    publisher: {
        name: string,
        homepage_url: string,
        logo_url: string,
        favicon_url: string
    },
    title: string,
    author: string,
    published_utc: string,
    article_url: string,
    tickers: string[],
    amp_url: string,
    image_url: string,
    description: string,
    keywords: string[]
}

export interface CoinNews{
    title: string,
    author: string,
    article_url: string,
    description: string,
    keywords: string[]
}

export interface MarketoListType{
    url: string,
    coins?: CoinDB[]
}
export interface CoinDB{
    name: string,
    ticker: string,
    date: string,
    last_price: number
}