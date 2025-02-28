export interface TurnAttention {
  id?: number;
  turnNumber?: string;
  identification: string;
  accountNumber?: string;
  clientPhone: string;
  clientMail: string;
  serviceId: number;
  problem: string;
  solution: string;
  comments?: string;
}
