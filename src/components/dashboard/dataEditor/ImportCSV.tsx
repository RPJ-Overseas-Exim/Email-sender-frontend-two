"use client";
import { CustomerZod } from "@/lib/types/dataEditor/dataEditor";
import { CiImport } from "react-icons/ci";
import { toast } from "sonner";
import GetRequest from "@/lib/requestHellpers/GetRequest";
import PostRequest from "@/lib/requestHellpers/PostRequest";
import { useSearchParams } from "next/navigation";
import revalPath from "@/lib/serverActions/revalPath";

export default function ImportCSV() {
  const searchParams = useSearchParams();
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".csv")) {
      return toast.error("File is not a csv file");
    }

    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = async (e: ProgressEvent<FileReader>) => {
      if (reader?.result) {
        const jsonFile = await csvToJson(String(reader.result));
        const type = searchParams.get("tab") || "enquiry";
        try {
          console.log(jsonFile);
          const res = await PostRequest("/customers/" + type, {
            customersData: jsonFile,
          });
          if (res.data) {
            revalPath("/dashboard");
            toast.success("Customers added into " + type + " table");
          } else {
            toast.error("Customers couldn't be added");
          }
        } catch (error) {
          console.error(error);
          toast.error("Customers couldn't be added");
        }
      }
    };
  };

  return (
    <div>
      <label
        className="flex items-center gap-1 border border-gray-400 bg-background px-4 py-2 text-foreground hover:border-gray-700 hover:bg-gray-700 hover:text-white"
        htmlFor="import-csv"
      >
        <CiImport className="text-lg" />
        <span className="inline-block">Import CSV</span>
      </label>
      <input
        type="file"
        id="import-csv"
        onChange={(e) => handleFileUpload(e)}
        accept=".csv"
        hidden
      />
    </div>
  );
}

const csvToJson = async (file: string) => {
  if (!file.length) return;
  const jsonArray = file.split("\r\n"),
    nameIndex = jsonArray[0].split(",").indexOf("name"),
    emailIndex = jsonArray[0].split(",").indexOf("email"),
    numberIndex = jsonArray[0].split(",").indexOf("number"),
    productIndex = jsonArray[0].split(",").indexOf("product");

  try {
    const productsArray = (await GetRequest("/products")).data;
    const productsJson: { [x: string]: string } = {};

    productsArray.forEach((product: { name: string; id: string }) => {
      if (product.name && product.id)
        productsJson[product.name.toLowerCase()] = product.id;
    });

    const jsonFile = [];

    for (const line of jsonArray.slice(1)) {
      const lineArray = line.split(",");
      const name = lineArray[nameIndex],
        email = lineArray[emailIndex],
        product = lineArray[productIndex],
        number = lineArray[numberIndex];

      const jsonObj = {
        name,
        email,
        productId: productsJson[product?.toLowerCase()],
        number,
        status: "pending",
      };
      const valid = CustomerZod.safeParse(jsonObj);
      if (valid.success) jsonFile.push(jsonObj);
    }
    return jsonFile;
  } catch (error) {
    console.error(error);
  }
};
