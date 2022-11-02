
interface ICredential {
    email: string;
}

const adminCredentialsL: ICredential[] = [{ email: 'admin28953hrw@gmail.com' }];

export const checkIsAdmin = (email: string | null | undefined):boolean => {
    return !!adminCredentialsL.find((credential) => credential.email === email)
}

 