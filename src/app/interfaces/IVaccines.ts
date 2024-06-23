export interface IVaccines {
  id: number;
  name: string;
  recommended_age: number;
  doses: number;
  observation: string;
  date_limit: Date;
  user_id: number;
}
