// general purpose helpers
export class is {
    public static array(x:any){
        return Array.isArray(x);
    }
    public static number(x:any){
        return (typeof(x)==='number');
    }
    public static string(x:any){
        return (typeof(x)==='string');
    }    
    public static object(x:any){
        return (typeof(x)==='object');
    }
    public static undefined(x:any){
        return x === undefined;
    }
}