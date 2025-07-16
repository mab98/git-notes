import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'timeAgo', pure: false, standalone: false })
export class TimeAgoPipe implements PipeTransform {
  transform(value: string | Date): string {
    if (!value) return '';
    const updated = new Date(value).getTime();
    const now = Date.now();
    const seconds = Math.floor((now - updated) / 1000);

    if (seconds < 60) return 'Last updated just now';
    const intervals: { [key: string]: number } = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const key in intervals) {
      const interval = Math.floor(seconds / intervals[key]);
      if (interval >= 1) {
        return `Last updated ${interval} ${key}${
          interval !== 1 ? 's' : ''
        } ago`;
      }
    }

    return 'Last updated just now';
  }
}
