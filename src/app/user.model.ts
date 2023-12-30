export interface BaseUser {
    avatarUrl:            string;
    birthDate:            string;
    createdOn:            Date;
    email:                string;
    expireDate:           Date;
    freeSubscriptionUsed: Boolean;
    id:                   string;
    isAnonymous:          boolean;
    isEmailConfirmed:     boolean;
    isPhoneConfirmed:     boolean;
    lastLogin:            Date;
    name:                 null;
    phone:                string;
    username:             string;
}