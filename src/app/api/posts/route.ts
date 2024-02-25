// import { NextResponse } from "next/server";
// import connect from "@/utils/db";
// import Post from "@/models/Post";

// export const GET = async (request: any) => {
//   const url = new URL(request.url);

//   const username = url.searchParams.get("username");

//   try {
//     await connect();

//     let posts;
//     if (username) {
//       posts = await Post.find({ username });
//     } else {
//       posts = await Post.find();
//     }

//     return new NextResponse(JSON.stringify(posts), { status: 200 });
//   } catch (err) {
//     return new NextResponse("Database Error", { status: 500 });
//   }
// };

// export const POST = async (request: any) => {
//   const body = await request.json();

//   const newPost = new Post(body);

//   try {
//     await connect();

//     await newPost.save();

//     return new NextResponse("Post has been created", { status: 201 });
//   } catch (err) {
//     return new NextResponse("Database Error", { status: 500 });
//   }
// };
