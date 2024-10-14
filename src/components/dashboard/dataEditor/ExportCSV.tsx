import GetRequest from "@/lib/requestHelpers/GetRequest";
import { Customer } from "@/lib/types/dataEditor/dataEditor";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaFileExport } from "react-icons/fa";

export default function ExportCSV({ limit, type }: { limit: number, type: string }) {
    const [data, setData] = useState("")

    function dataToCSV(data: Customer[]) {
        if (!data || data?.length <= 0) return "";
        const header =
            Object.keys(data[0]).slice(1).join(",").replace("productId", "product") +
            "\r\n";
        const csvData =
            header +
            data
                .map((customer: Customer) => {
                    return Object.values(customer)
                        .slice(1)
                        .map((cell: string) => {
                            return cell ?? "";
                        })
                        .join(",");
                })
                .join("\r\n");

        return csvData;
    };

    function csvURI(data: Customer[]): string {
        return encodeURI(dataToCSV(data));
    };



    useEffect(() => {
        async function getDataString() {
            let queryParams = `?limit=${limit}`
            if(type !== ""){
                queryParams += "type=" + type
            }

            const data = await GetRequest(`/customers${queryParams}`);
            if (data?.data) {
                console.log(data.data)
                return csvURI(data.data)
            }
        }
        getDataString()
            .then(dataString => {
                if (dataString)
                    setData(dataString)
            })
            .catch(e => {
                console.log(e)
            })
    }, [])

    return (
        <div>
            <Link
                href={"data:text/csv;charset=utf-8," + data}
                download="Customer Details.csv"
                target="_blank"
                className="flex items-center gap-1 border border-gray-400 bg-background px-3 py-2 text-xs text-foreground hover:border-gray-700 hover:bg-gray-700 hover:text-white lg:px-4 lg:py-2 lg:text-base"
            >
                <FaFileExport className="h-3 w-3 lg:h-4 lg:w-4" />
                Export <span className="hidden md:inline">CSV</span>
            </Link>
        </div>
    );
}
