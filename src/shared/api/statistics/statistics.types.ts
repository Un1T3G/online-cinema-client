export interface TopMovie {
	title: string;
	views: number;
}

export interface SalesByWeek {
	date: string;
	total: number;
}

export interface StatisticsItem {
	id: string;
	name: string;
	value: string;
}

export interface MiddleStatisticsResponse {
	topMovies: TopMovie[];
	salesByWeek: SalesByWeek[];
}
