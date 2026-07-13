import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { slugify } from "@/lib/utils";

function parseCSV(text: string): string[][] {
  const lines = text.split("\n").filter(Boolean);
  return lines.map((line) => {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;
    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        result.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  });
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const text = await file.text();
    const rows = parseCSV(text);

    if (rows.length < 2) {
      return NextResponse.json(
        { error: "CSV must have a header row and at least one data row" },
        { status: 400 }
      );
    }

    const headers = rows[0].map((h) => h.toLowerCase());
    const imported: any[] = [];
    const errors: string[] = [];

    for (let i = 1; i < rows.length; i++) {
      try {
        const row = rows[i];
        const data: Record<string, string> = {};
        headers.forEach((header, idx) => {
          data[header] = row[idx] || "";
        });

        if (!data.name || !data.price) {
          errors.push(`Row ${i}: Name and price are required`);
          continue;
        }

        const category = await prisma.category.findFirst({
          where: { slug: data.category?.toLowerCase() },
        });

        const product = await prisma.product.create({
          data: {
            name: data.name,
            slug: slugify(data.name) + "-" + Date.now(),
            description: data.description || "",
            price: parseFloat(data.price),
            salePrice: data.saleprice ? parseFloat(data.saleprice) : null,
            images: data.images ? data.images.split(";").map((s: string) => s.trim()) : [],
            sizes: data.sizes ? data.sizes.split(",").map((s: string) => s.trim()) : [],
            colors: data.colors ? data.colors.split(",").map((c: string) => c.trim()) : [],
            stock: parseInt(data.stock || "0"),
            categoryId: category?.id || "",
            featured: data.featured?.toLowerCase() === "true",
            isNew: data.isnew?.toLowerCase() !== "false",
          },
        });

        imported.push(product);
      } catch (err: any) {
        errors.push(`Row ${i}: ${err.message}`);
      }
    }

    return NextResponse.json({
      imported: imported.length,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to process import" },
      { status: 500 }
    );
  }
}
