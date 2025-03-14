import { Endpoint } from "./EndpointType";

export const generateStandardEndpoints = (baseUrl: string): Endpoint[] => {
    return [
        {
            method: "GET",
            type: "LIST",
            url: `${baseUrl}`,
            queryParam: [],
            pathParam: [],
        },
        {
            method: "GET",
            type: "ITEM",
            url: `${baseUrl}/{{id}}`,
            queryParam: [],
            pathParam: ["id"],
        },
        {
            method: "PUT",
            type: "UPDATE",
            url: `${baseUrl}/{{id}}`,
            queryParam: [],
            pathParam: ["id"],
        },
        {
            method: "POST",
            type: "CREATE",
            url: `${baseUrl}`,
            queryParam: [],
            pathParam: [],
        },
        {
            method: "DELETE",
            type: "DELETE",
            url: `${baseUrl}/{{id}}`,
            queryParam: [],
            pathParam: ["id"],
        },
    ];
}