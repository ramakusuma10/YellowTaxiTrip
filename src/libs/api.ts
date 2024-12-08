import CONFIG from '../config/config';
import axios, { AxiosRequestConfig } from 'axios';

export const fetchAllTrips = async (): Promise<any> => {
    return await fetchData(CONFIG.API_URL);
}

export const fetchTripsFilter = async (filters: Record<string, any>): Promise<any> => {
    return await fetchData(CONFIG.API_URL_FILTER, { params: filters });
};

const fetchData = async (url: string, config: AxiosRequestConfig = {}): Promise<any> => {
    try {
        const response = await axios.get(url, config);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Error fetching data:", error.message);
            throw new Error(`Fetching data failed: ${error.message}`);
        } else {
            console.error("Unexpected error:", error);
            throw new Error(`Fetching data failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
};