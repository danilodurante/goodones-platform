import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalyticsService {
  async getRadioOverview(releaseId: string) {
    // Dati mock, in futuro si leggerà da analytics_events
    const series = [
      { date: '2025-01-01', opens: 10, plays: 4, downloads: 1 },
      { date: '2025-01-02', opens: 18, plays: 9, downloads: 2 },
      { date: '2025-01-03', opens: 25, plays: 14, downloads: 5 },
    ];

    const totals = series.reduce(
      (acc, p) => ({
        opens: acc.opens + p.opens,
        plays: acc.plays + p.plays,
        downloads: acc.downloads + p.downloads,
      }),
      { opens: 0, plays: 0, downloads: 0 },
    );

    return {
      releaseId,
      campaignId: null,
      totals,
      series,
    };
  }
}
