import { Between, FindOperator, Like } from 'typeorm';

export class UtilsService {
  public transformSearchByString(text: string): FindOperator<string> {
    return Like(`%${text}%`);
  }

  public transformSearchByDate(
    startDate: number,
    endDate: number,
  ): FindOperator<number> {
    return Between<number>(
      new Date(startDate).getTime(),
      new Date(endDate).getTime(),
    );
  }
}
