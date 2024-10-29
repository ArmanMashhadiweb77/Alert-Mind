import axios from "axios";
import DBConfig from "~/server/db/DB.Config";

export const useApi = async () => {
    const appConfig = useAppConfig();
    // const db_config = new DBConfig()
    const AccessToken = await IndexDBGet('config', 'Access-Token')
    // const AVLAccessToken = await db_config.get("AVL-Access-Token", true);
    return axios.create({
        baseURL: appConfig.baseUrl,
        withCredentials: true,
        headers: {
            // Authorization: AccessToken ? `Bearer ${AccessToken}` : '',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIyOTEyMTllMS03YzVjLTQ1MTYtY2Q4Ny0wOGRjNjNiMjk3MjYiLCJVc2VybmFtZSI6ImFybWFubWFzaGhhZGkiLCJqdGkiOiIwMTk1ZWMwMS1lZGQxLTRlMjQtYTU0OS01MTdiZDEyNzA1NzUiLCJBcHBJZCI6ImMzMGU1OWQ0LThlYWEtNDY5OC1hMTU3LWIxODkxMzY0NmNhNyIsImV4cCI6MTcyMDAwNTA5MywiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo0MjAwIn0.wF6-B-6QEskV_rWhEMq0L8ZfCYzFkAEfrk-fi_rjFtc`,

        }
    });
};



