import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;

    const body = await request.json();

    const { status } = body;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Loan ID is required.",
        },
        { status: 400 }
      );
    }

    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid loan status.",
        },
        { status: 400 }
      );
    }

    /*
     * এখানে ভবিষ্যতে PostgreSQL / Prisma / MongoDB
     * database update করতে পারবে।
     *
     * এখন আমরা API validation করছি।
     */

    return NextResponse.json(
      {
        success: true,
        message: `Loan ${status.toLowerCase()} successfully.`,
        loan: {
          id,
          status,
          updatedAt: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Loan status update error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update loan status.",
      },
      { status: 500 }
    );
  }
}