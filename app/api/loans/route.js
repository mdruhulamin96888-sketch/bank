import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "data", "loans.json");

async function getLoans() {
  try {
    const file = await fs.readFile(filePath, "utf8");
    return JSON.parse(file);
  } catch {
    return [];
  }
}

export async function GET() {
  try {
    const loans = await getLoans();

    return NextResponse.json(loans);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to load loans" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const loans = await getLoans();

    const newLoan = {
      id: Date.now().toString(),
      ...body,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    loans.unshift(newLoan);

    await fs.writeFile(
      filePath,
      JSON.stringify(loans, null, 2),
      "utf8"
    );

    return NextResponse.json(
      {
        message: "Loan application submitted successfully",
        loan: newLoan,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to submit loan application" },
      { status: 500 }
    );
  }
}