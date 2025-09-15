type UserProps = {
    i18n: (phrase: string) => string;
    logout: () => void;
    username: string | null;
};
export default function User({ i18n, logout, username }: UserProps): import("preact").JSX.Element;
export {};
//# sourceMappingURL=User.d.ts.map