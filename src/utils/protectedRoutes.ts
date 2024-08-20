import { Role } from "@prisma/client";

export interface ProtectedRoutes {
  title: string;
  path: string;
  regex: RegExp;
  icon: string;
  roles: Role[] | "All";
}

export const protectedRoutes: ProtectedRoutes[] = [
  {
    title: "Competition",
    path: "/admin/competition",
    regex: /\/admin\/competition(\/|)[A-Za-z]?/i,
    icon: `
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg" >
      <path
        d="M21.6602 10.94L20.6802 15.12C19.8402 18.73 18.1802 20.19 15.0602 19.89C14.5602 19.85 14.0202 19.76 13.4402 19.62L11.7602 19.22C7.59018 18.23 6.30018 16.17 7.28018 11.99L8.26018 7.80001C8.46018 6.95001 8.70018 6.21001 9.00018 5.60001C10.1702 3.18001 12.1602 2.53001 15.5002 3.32001L17.1702 3.71001C21.3602 4.69001 22.6402 6.76001 21.6602 10.94Z"
        stroke="#E04E4E"
        strokeWidth="1.5"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.0603 19.89C14.4403 20.31 13.6603 20.66 12.7103 20.97L11.1303 21.49C7.16034 22.77 5.07034 21.7 3.78034 17.73L2.50034 13.78C1.22034 9.80998 2.28034 7.70998 6.25034 6.42998L7.83034 5.90998C8.24034 5.77998 8.63034 5.66998 9.00034 5.59998C8.70034 6.20998 8.46034 6.94998 8.26034 7.79998L7.28034 11.99C6.30034 16.17 7.59034 18.23 11.7603 19.22L13.4403 19.62C14.0203 19.76 14.5603 19.85 15.0603 19.89Z"
        stroke="#E04E4E"
        strokeWidth="1.5"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.6396 9.03003L17.4896 10.26"
        stroke="#E04E4E"
        strokeWidth="1.5"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.6602 12.9L14.5602 13.64"
        stroke="#E04E4E"
        strokeWidth="1.5"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
    </svg>`,
    roles: ["ADMIN", "SUPERADMIN"],
  },
  {
    title: "Users",
    path: "/admin/user",
    regex: /\/admin\/user(\/|)[A-Za-z]?/i,
    icon: `
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.15957 11.37C9.05957 11.36 8.93957 11.36 8.82957 11.37C6.44957 11.29 4.55957 9.34 4.55957 6.94C4.55957 4.49 6.53957 2.5 8.99957 2.5C11.4496 2.5 13.4396 4.49 13.4396 6.94C13.4296 9.34 11.5396 11.29 9.15957 11.37Z" stroke="#E04E4E" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
      <path d="M16.4103 4.5C18.3503 4.5 19.9103 6.07 19.9103 8C19.9103 9.89 18.4103 11.43 16.5403 11.5C16.4603 11.49 16.3703 11.49 16.2803 11.5" stroke="#E04E4E" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
      <path d="M4.15973 15.06C1.73973 16.68 1.73973 19.32 4.15973 20.93C6.90973 22.77 11.4197 22.77 14.1697 20.93C16.5897 19.31 16.5897 16.67 14.1697 15.06C11.4297 13.23 6.91973 13.23 4.15973 15.06Z" stroke="#E04E4E" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
      <path d="M18.3398 20.5C19.0598 20.35 19.7398 20.06 20.2998 19.63C21.8598 18.46 21.8598 16.53 20.2998 15.36C19.7498 14.94 19.0798 14.66 18.3698 14.5" stroke="#E04E4E" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
    </svg>
    `,
    roles: ["ADMIN", "SUPERADMIN"],
  },
  {
    title: "Category",
    path: "/admin/category",
    regex: /\/admin\/category(\/|)[A-Za-z]?/i,
    icon: `
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 8.75V18.5C20 21.5 18.21 22.5 16 22.5H8C5.79 22.5 4 21.5 4 18.5V8.75C4 5.5 5.79 4.75 8 4.75C8 5.37 8.24997 5.93 8.65997 6.34C9.06997 6.75 9.63 7 10.25 7H13.75C14.99 7 16 5.99 16 4.75C18.21 4.75 20 5.5 20 8.75Z" stroke="#E04E4E" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
      <path d="M16 4.75C16 5.99 14.99 7 13.75 7H10.25C9.63 7 9.06997 6.75 8.65997 6.34C8.24997 5.93 8 5.37 8 4.75C8 3.51 9.01 2.5 10.25 2.5H13.75C14.37 2.5 14.93 2.75 15.34 3.16C15.75 3.57 16 4.13 16 4.75Z" stroke="#E04E4E" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
      <path d="M8 13.5H12" stroke="#E04E4E" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
      <path d="M8 17.5H16" stroke="#E04E4E" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
    </svg>
    `,
    roles: ["ADMIN", "SUPERADMIN"],
  },
  {
    title: "Stages",
    path: "/admin/stage",
    regex: /\/admin\/stage(\/|)[A-Za-z]?/i,
    icon: `
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 8.75V18.5C20 21.5 18.21 22.5 16 22.5H8C5.79 22.5 4 21.5 4 18.5V8.75C4 5.5 5.79 4.75 8 4.75C8 5.37 8.24997 5.93 8.65997 6.34C9.06997 6.75 9.63 7 10.25 7H13.75C14.99 7 16 5.99 16 4.75C18.21 4.75 20 5.5 20 8.75Z" stroke="#E04E4E" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
      <path d="M16 4.75C16 5.99 14.99 7 13.75 7H10.25C9.63 7 9.06997 6.75 8.65997 6.34C8.24997 5.93 8 5.37 8 4.75C8 3.51 9.01 2.5 10.25 2.5H13.75C14.37 2.5 14.93 2.75 15.34 3.16C15.75 3.57 16 4.13 16 4.75Z" stroke="#E04E4E" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
      <path d="M8 13.5H12" stroke="#E04E4E" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
      <path d="M8 17.5H16" stroke="#E04E4E" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
    </svg>
    `,
    roles: ["ADMIN", "SUPERADMIN"],
  },
  {
    title: "Announcements",
    path: "/admin/announcement",
    regex: /\/admin\/announcement(\/|)[A-Za-z]?/i,
    icon: `
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 8.75V18.5C20 21.5 18.21 22.5 16 22.5H8C5.79 22.5 4 21.5 4 18.5V8.75C4 5.5 5.79 4.75 8 4.75C8 5.37 8.24997 5.93 8.65997 6.34C9.06997 6.75 9.63 7 10.25 7H13.75C14.99 7 16 5.99 16 4.75C18.21 4.75 20 5.5 20 8.75Z" stroke="#E04E4E" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
      <path d="M16 4.75C16 5.99 14.99 7 13.75 7H10.25C9.63 7 9.06997 6.75 8.65997 6.34C8.24997 5.93 8 5.37 8 4.75C8 3.51 9.01 2.5 10.25 2.5H13.75C14.37 2.5 14.93 2.75 15.34 3.16C15.75 3.57 16 4.13 16 4.75Z" stroke="#E04E4E" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
      <path d="M8 13.5H12" stroke="#E04E4E" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
      <path d="M8 17.5H16" stroke="#E04E4E" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
    </svg>
    `,
    roles: ["ADMIN", "SUPERADMIN"],
  },
];
