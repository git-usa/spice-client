import {ladyDate} from "./_lady";

export function lat_toCount(obj : object) : number;

export function lat_objectCount(obj : object) : number;

export function lat_toKeys(obj : object) : string[];

export function lat_toValues<T>(obj : {[key : string] : T}) : T[];

export function lat_isValidArray(obj : any, minLen? : number, maxLen? : number) : boolean;

export function lat_isValidObject(obj : any, notArray? : boolean, minLen? : number, maxLen? : number) : boolean;

export function lat_isValidJsonString(obj : any) : boolean;

export function lat_eachProperty<T>(obj : T, next : (key : keyof T, value : T[keyof T]) => void) : void;

export function lat_eachItem<T>(obj : T, next : (key : keyof T, value : T[keyof T]) => void) : void;

export function lat_mapToArray<T, U>(obj : T, next : (key : keyof T, value : T[keyof T]) => U) : U[];

export function lat_cloneArray<T>(arr : T[]) : T[];

export function lat_copyArray<T>(arr : T[]) : T[];

export function lat_cloneObject<T>(obj : T) : T;

export function lat_copyObject<T>(obj : T) : T;

export function lat_sortBy<T>(obj : {[key : string] : any}, field : string) : {[key : string] : any};

export function lat_renameKey<T>(obj : T, oldKey : keyof T, newKey : string) : void;

export function lat_reverseArray<T>(arr : T[]) : T[] | null;

export function lat_capital(text : string) : string;

export function lat_mongoDate(dateValue : string, toUtc ? : boolean) : typeof ladyDate;

export function lat_getCookie(cookieName : string) : string;

export function lat_onEnter(event : KeyboardEvent<HTMLInputElement>, next : () => void) : void;