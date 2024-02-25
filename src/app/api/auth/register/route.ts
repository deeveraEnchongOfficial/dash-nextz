import { NextResponse } from "next/server";
import prisma from "@/utils/connect";
import bcrypt from "bcryptjs";
import { connect } from "@/utils/db";

export const POST = async (request: any) => {
  try {
    const { name, email, password } = await request.json();
    if (!name || !email || !password) return NextResponse.json({ message: "Please fill in all fields" }, { status: 422 });
    await connect();
    const hashedPassword = await bcrypt.hash(password, 5);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return NextResponse.json({ message: "User has been created" }, { status: 201 });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  } finally {
    await prisma.$disconnect()
  }
};