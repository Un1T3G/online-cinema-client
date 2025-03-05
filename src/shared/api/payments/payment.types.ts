import { UserResponse } from "../users";

interface Amount {
	value: string;
	currency: string;
}

interface Recipient {
	account_id: string;
	gateway_id: string;
}

interface PaymentMethod {
	type: string;
	id: string;
	saved: boolean;
}

interface Confirmation {
	type: string;
	return_url: string;
	confirmation_url: string;
}

export interface PaymentCheckoutResponse {
	id: string;
	status: string;
	amount: Amount;
	recipient: Recipient;
	payment_method: PaymentMethod;
	created_at: Date;
	confirmation: Confirmation;
}

export enum PaymentStatus {
	PENDING = "PENDING",
	PAYED = "PAYED",
}

export interface PaymentResponse {
	id: string;
	createdAt: string;
	status: PaymentStatus;
	user: UserResponse;
	amount: number;
}
