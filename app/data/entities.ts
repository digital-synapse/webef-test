export interface Item {
	id?: number;
	description?: string;
	deadline: Date;
	done: boolean;
	userId?: number;
	user?: User;
	tasks?: Task[];
	_ix?: number;
	_rm?: boolean;
}

export interface Task {
	id?: number;
	itemId?: number;
	description: string;
	done: boolean;
	_ix?: number;
	_rm?: boolean;
}

export interface User {
	id?: number;
	name: string;
	_ix?: number;
	_rm?: boolean;
}
