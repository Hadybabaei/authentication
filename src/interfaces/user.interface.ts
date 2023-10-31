export default interface Users {
    id:number ,
    first_name:string |null,
    googleId:string | null,
    last_name:string |null,
    password:string|null,
    middle_name:string |null
    email:string  | null,
    phone_number:string |null,
    country:string |null,
    country_tag:string |null,
    verification_code:string |null,
    verification_expire_time:Date |null,
}