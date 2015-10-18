export class EntityOp {
	public static GET = 'get';
	public static PUT = 'put';
	public static DELETE = 'delete';
	public static COUNT = 'count';
	public static QUERY = 'query';
	public static SELECT = 'select';
    public static SEARCH = 'search';
}
export const Name = "WebEF";
export const READY = "ready";

export interface Response {
	originId: number;
	response: any;
}