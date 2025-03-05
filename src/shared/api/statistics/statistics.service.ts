import { fetchAuth } from "../fetch";
import { MiddleStatisticsResponse, StatisticsItem } from "./statistics.types";

class StatisticsService {
	async getMain() {
		return fetchAuth.get<StatisticsItem[]>("statistics/main");
	}

	async getMiddle() {
		return fetchAuth.get<MiddleStatisticsResponse>("statistics/middle");
	}
}

export const statisticsService = new StatisticsService();
